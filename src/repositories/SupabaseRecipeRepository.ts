import type { VisualRecipeV3 } from '@/types/recipeV3'
import { validateRecipe } from '@/utils/taxonomyMatcher'
import { normalizeRecipe } from '@/services/recipeNormalizer'
import { supabase, isSupabaseConfigured } from '@/services/supabaseClient'
import { LocalRecipeRepository } from './LocalRecipeRepository'
import { resolveRecipeMutationState } from './recipeMutationState'
import type {
    IRecipeRepository,
    RecipeMutationAction,
    RecipeMutationResult,
    RecipeSaveResult,
} from './IRecipeRepository'

interface RecipeRow {
    id?: string
    content: unknown
    content_version?: number | null
    deleted_at?: string | null
}

interface SaveRecipeRpcResult {
    content_version?: number
}

function stableJson(value: unknown): string {
    if (Array.isArray(value)) {
        return `[${value.map(stableJson).join(',')}]`
    }
    if (value && typeof value === 'object') {
        const record = value as Record<string, unknown>
        return `{${Object.keys(record).sort().map(key => `${JSON.stringify(key)}:${stableJson(record[key])}`).join(',')}}`
    }
    return JSON.stringify(value) ?? 'undefined'
}

function comparableRecipeContent(recipe: VisualRecipeV3): string {
    const normalized = normalizeRecipe(recipe)
    const { contentVersion: _contentVersion, deletedAt: _deletedAt, ...content } = normalized
    return stableJson(content)
}

/**
 * PostSoma Kitchen · Supabase Staging 持久化 Repository
 *
 * 安全机制：
 * 1. 当 Supabase URL/Key 未配置或 VITE_STORAGE_MODE='local' 时，无缝安全降级至 LocalRecipeRepository；
 * 2. 读出操作从 JSONB 经 normalizeRecipe 规范化；
 * 3. 写入前经 validateRecipe 强类型评估，阻断非法 published 数据落库；
 * 4. 写入操作经由原子 RPC save_recipe_with_revision，在同一事务中完成 recipes 更新与 recipe_revisions 快照生成，支持乐观锁。
 */
export class SupabaseRecipeRepository implements IRecipeRepository {
    private localFallback = new LocalRecipeRepository({
        seedPresets: false,
        recipesKey: 'what-to-eat-v3-supabase-cache',
    })
    private shadowReadEnabled = false

    constructor(shadowRead = false) {
        this.shadowReadEnabled = shadowRead
    }

    private get isEnabled(): boolean {
        return Boolean(isSupabaseConfigured && supabase)
    }

    private normalizeRow(row: RecipeRow): VisualRecipeV3 {
        const content = normalizeRecipe(row.content)
        return {
            ...content,
            contentVersion: row.content_version ?? content.contentVersion,
            deletedAt: row.deleted_at === null
                ? undefined
                : (row.deleted_at ?? content.deletedAt),
        }
    }

    private mutationResult(
        action: RecipeMutationAction,
        id: string,
        status: RecipeMutationResult['status'],
        message?: string,
        recipe?: VisualRecipeV3 | null,
    ): RecipeMutationResult {
        return {
            ok: status === 'confirmed',
            action,
            id,
            status,
            message,
            recipe,
            contentVersion: recipe?.contentVersion,
        }
    }

    private async requireAdminForMutation(
        action: RecipeMutationAction,
        id: string,
    ): Promise<RecipeMutationResult | null> {
        try {
            const { data: sessionData, error: sessionError } = await supabase!.auth.getSession()
            if (sessionError) {
                return this.mutationResult(action, id, 'unknown', '无法确认当前登录会话，操作结果尚未确定。')
            }

            const userId = sessionData.session?.user?.id
            if (!userId) {
                return this.mutationResult(action, id, 'rejected', '权限不足：请先以管理员身份登录。')
            }

            const { data: profile, error: profileError } = await supabase!
                .from('profiles')
                .select('role')
                .eq('id', userId)
                .maybeSingle()

            if (profileError) {
                return this.mutationResult(action, id, 'unknown', '无法确认管理员权限，未执行写操作。')
            }
            if (profile?.role !== 'admin') {
                return this.mutationResult(action, id, 'rejected', '权限不足：只有 Kitchen Studio 管理员可以执行此操作。')
            }

            return null
        } catch (error) {
            console.error('[SupabaseRepo] 管理员权限确认异常:', error)
            return this.mutationResult(action, id, 'unknown', '网络异常，无法确认管理员权限，未执行写操作。')
        }
    }

    private async readCloudRecipeForMutation(id: string): Promise<{
        ok: true
        recipe: VisualRecipeV3 | null
    } | {
        ok: false
        message: string
    }> {
        try {
            const { data, error } = await supabase!
                .from('recipes')
                .select('id, content, content_version, deleted_at')
                .eq('id', id)
                .maybeSingle()

            if (error) {
                return { ok: false, message: error.message || '云端状态读取失败' }
            }

            return {
                ok: true,
                recipe: data ? this.normalizeRow(data as RecipeRow) : null,
            }
        } catch (error) {
            console.error('[SupabaseRepo] 云端状态确认异常:', error)
            return {
                ok: false,
                message: error instanceof Error ? error.message : '云端状态读取异常',
            }
        }
    }

    private async syncConfirmedMutationToCache(result: RecipeMutationResult): Promise<void> {
        if (!result.ok) return
        try {
            if (result.action === 'permanent-delete') {
                await this.localFallback.softDeleteRecipe(result.id)
                await this.localFallback.permanentlyDeleteRecipe(result.id)
                return
            }
            if (result.recipe) {
                await this.localFallback.saveRecipe(result.recipe)
            }
        } catch (error) {
            console.warn('[SupabaseRepo] 云端操作已确认，但本地缓存同步失败:', error)
        }
    }

    private async confirmCloudMutation(
        action: RecipeMutationAction,
        id: string,
        expectedVersion?: number,
        mutationError?: string,
    ): Promise<RecipeMutationResult> {
        const state = await this.readCloudRecipeForMutation(id)
        if (!state.ok) {
            return resolveRecipeMutationState({
                action,
                id,
                expectedVersion,
                recipe: null,
                readError: state.message,
                mutationError,
            })
        }

        const result = resolveRecipeMutationState({
            action,
            id,
            expectedVersion,
            recipe: state.recipe,
            mutationError,
        })
        if (result.ok) {
            await this.syncConfirmedMutationToCache(result)
        }
        return result
    }

    private async confirmSaveAfterResponseIssue(
        normalized: VisualRecipeV3,
        validation: RecipeSaveResult['validation'],
        message: string,
        explicitServerError: boolean,
    ): Promise<RecipeSaveResult> {
        const state = await this.readCloudRecipeForMutation(normalized.id)
        if (!state.ok) {
            return {
                ok: false,
                validation,
                syncStatus: 'unknown',
                message: `保存请求结果暂时无法确认：${state.message}`,
            }
        }

        const remote = state.recipe
        const expectedVersion = normalized.contentVersion
        const versionMatches = remote?.contentVersion !== undefined
            && (expectedVersion === undefined || remote.contentVersion === expectedVersion + 1)
        const contentMatches = Boolean(
            remote
            && comparableRecipeContent(remote) === comparableRecipeContent(normalized),
        )

        if (remote && versionMatches && contentMatches) {
            await this.localFallback.saveRecipe(remote)
            return {
                ok: true,
                validation,
                syncStatus: 'synced',
                contentVersion: remote.contentVersion,
                message: '响应异常后已重新读取并确认云端保存成功。',
            }
        }

        if (
            remote
            && expectedVersion !== undefined
            && remote.contentVersion !== undefined
            && remote.contentVersion !== expectedVersion
        ) {
            return {
                ok: false,
                validation,
                syncStatus: 'conflict',
                contentVersion: remote.contentVersion,
                message: '云端食谱版本已变化，本次保存没有覆盖远端内容。',
            }
        }

        return {
            ok: false,
            validation,
            syncStatus: explicitServerError ? 'failed' : 'unknown',
            message: explicitServerError
                ? message
                : `保存请求结果仍无法确认：${message}`,
        }
    }

    async getPublishedRecipes(): Promise<VisualRecipeV3[]> {
        const localData = await this.localFallback.getPublishedRecipes()

        if (!this.isEnabled) {
            return localData
        }

        try {
            const { data, error } = await supabase!
                .from('recipes')
                .select('content, content_version, deleted_at')
                .eq('status', 'published')
                .eq('visibility', 'public')
                .is('deleted_at', null)
                .order('updated_at', { ascending: false })

            if (error || !data) {
                console.warn('[SupabaseRepo] 从云端拉取已发布食谱失败，降级读取本地:', error?.message)
                return localData
            }

            const cloudRecipes = data.map(row => this.normalizeRow(row as RecipeRow))

            if (this.shadowReadEnabled) {
                console.log(`[ShadowRead] 本地数据: ${localData.length} 条 | Supabase 数据: ${cloudRecipes.length} 条`)
                return localData // Shadow read 仍返回本地数据
            }

            return cloudRecipes
        } catch (e) {
            console.error('[SupabaseRepo] 异常，降级读取本地:', e)
            return localData
        }
    }

    async getPublishedRecipeById(id: string): Promise<VisualRecipeV3 | null> {
        if (!id) return null
        if (!this.isEnabled) {
            return this.localFallback.getPublishedRecipeById(id)
        }

        try {
            const { data, error } = await supabase!
                .from('recipes')
                .select('content, content_version, deleted_at')
                .eq('id', id)
                .eq('status', 'published')
                .eq('visibility', 'public')
                .is('deleted_at', null)
                .maybeSingle()

            if (error || !data) return null
            return this.normalizeRow(data as RecipeRow)
        } catch (error) {
            console.error('[SupabaseRepo] 读取公开食谱详情失败:', error)
            return null
        }
    }

    async getAllRecipes(): Promise<VisualRecipeV3[]> {
        if (!this.isEnabled) {
            return this.localFallback.getAllRecipes()
        }

        try {
            const { data, error } = await supabase!
                .from('recipes')
                .select('content, content_version, deleted_at')
                .is('deleted_at', null)
                .order('updated_at', { ascending: false })

            if (error || !data) {
                throw new Error(error?.message || '云端未返回 Admin 食谱列表')
            }

            return data.map(row => this.normalizeRow(row as RecipeRow))
        } catch (e) {
            console.error('[SupabaseRepo] Admin 食谱列表读取失败:', e)
            throw e instanceof Error ? e : new Error('Admin 食谱列表读取失败')
        }
    }

    async getDeletedRecipes(): Promise<VisualRecipeV3[]> {
        if (!this.isEnabled) {
            return this.localFallback.getDeletedRecipes()
        }

        try {
            const { data, error } = await supabase!
                .from('recipes')
                .select('content, content_version, deleted_at')
                .not('deleted_at', 'is', null)

            if (error || !data) {
                throw new Error(error?.message || '云端未返回回收站列表')
            }

            return data.map(row => this.normalizeRow(row as RecipeRow))
        } catch (e) {
            console.error('[SupabaseRepo] 回收站列表读取失败:', e)
            throw e instanceof Error ? e : new Error('回收站列表读取失败')
        }
    }

    async getRecipeById(id: string): Promise<VisualRecipeV3 | null> {
        if (!id) return null
        if (!this.isEnabled) {
            return this.localFallback.getRecipeById(id)
        }

        try {
            const { data, error } = await supabase!
                .from('recipes')
                .select('content, content_version, deleted_at')
                .eq('id', id)
                .maybeSingle()

            if (error || !data) {
                if (!error && !data) return null
                throw new Error(error?.message || '云端未返回食谱详情')
            }

            return this.normalizeRow(data as RecipeRow)
        } catch (e) {
            console.error('[SupabaseRepo] Admin 食谱详情读取失败:', e)
            throw e instanceof Error ? e : new Error('Admin 食谱详情读取失败')
        }
    }

    async saveRecipe(recipe: VisualRecipeV3): Promise<RecipeSaveResult> {
        const normalized = normalizeRecipe(recipe)
        const validation = validateRecipe(normalized)

        // 1. 发布阻断控制
        if (normalized.status === 'published' && !validation.canPublish) {
            return { ok: false, validation, syncStatus: 'failed' }
        }

        if (!validation.canSaveDraft) {
            return { ok: false, validation, syncStatus: 'failed' }
        }

        if (!this.isEnabled) {
            return this.localFallback.saveRecipe(normalized)
        }

        try {
            // 2. 构造嵌入 JSONB payload
            const payload = {
                ...normalized,
                completeness_score: validation.completenessScore,
                validation_snapshot: {
                    errors: validation.errors,
                    warnings: validation.warnings
                }
            }

            // 3. 调用 Supabase 原子事务 RPC save_recipe_with_revision
            const { data, error } = await supabase!.rpc('save_recipe_with_revision', {
                p_recipe: payload,
                p_expected_version: normalized.contentVersion ?? null,
            })

            if (error) {
                console.error('[SupabaseRepo] 呼叫 save_recipe_with_revision RPC 失败:', error.message)
                return this.confirmSaveAfterResponseIssue(
                    normalized,
                    validation,
                    error.message,
                    Boolean(error.code),
                )
            }

            const rpcResult = data as SaveRecipeRpcResult | null
            const contentVersion = rpcResult?.content_version
            await this.localFallback.saveRecipe({ ...normalized, contentVersion })
            return { ok: true, validation, syncStatus: 'synced', contentVersion }
        } catch (error) {
            console.error('[SupabaseRepo] 云端保存响应异常，开始重新确认状态:', error)
            return this.confirmSaveAfterResponseIssue(
                normalized,
                validation,
                error instanceof Error ? error.message : '云端保存响应异常',
                false,
            )
        }
    }

    async softDeleteRecipe(id: string, expectedVersion?: number): Promise<RecipeMutationResult> {
        const action: RecipeMutationAction = 'soft-delete'
        if (!this.isEnabled) return this.localFallback.softDeleteRecipe(id, expectedVersion)

        const permissionResult = await this.requireAdminForMutation(action, id)
        if (permissionResult) return permissionResult

        const before = await this.readCloudRecipeForMutation(id)
        if (!before.ok) {
            return this.mutationResult(action, id, 'unknown', `无法读取删除前的云端状态：${before.message}`)
        }
        if (!before.recipe) {
            return this.mutationResult(action, id, 'rejected', '未找到要删除的云端食谱。')
        }
        if (before.recipe.deletedAt) {
            const result = this.mutationResult(action, id, 'confirmed', undefined, before.recipe)
            await this.syncConfirmedMutationToCache(result)
            return result
        }
        if (
            expectedVersion !== undefined
            && before.recipe.contentVersion !== undefined
            && before.recipe.contentVersion !== expectedVersion
        ) {
            return this.mutationResult(action, id, 'conflict', '食谱版本已变化，请重新载入后再删除。', before.recipe)
        }

        try {
            let request = supabase!
                .from('recipes')
                .update({ deleted_at: new Date().toISOString() })
                .eq('id', id)
                .is('deleted_at', null)
            if (expectedVersion !== undefined) {
                request = request.eq('content_version', expectedVersion)
            }
            const { error } = await request.select('id, deleted_at, content_version').maybeSingle()
            return this.confirmCloudMutation(action, id, expectedVersion, error?.message)
        } catch (error) {
            console.error('[SupabaseRepo] 云端软删除响应异常，开始重新确认状态:', error)
            return this.confirmCloudMutation(
                action,
                id,
                expectedVersion,
                error instanceof Error ? error.message : '请求响应异常',
            )
        }
    }

    async restoreRecipe(id: string, expectedVersion?: number): Promise<RecipeMutationResult> {
        const action: RecipeMutationAction = 'restore'
        if (!this.isEnabled) return this.localFallback.restoreRecipe(id, expectedVersion)

        const permissionResult = await this.requireAdminForMutation(action, id)
        if (permissionResult) return permissionResult

        const before = await this.readCloudRecipeForMutation(id)
        if (!before.ok) {
            return this.mutationResult(action, id, 'unknown', `无法读取恢复前的云端状态：${before.message}`)
        }
        if (!before.recipe) {
            return this.mutationResult(action, id, 'rejected', '未找到要恢复的云端食谱。')
        }
        if (!before.recipe.deletedAt) {
            const result = this.mutationResult(action, id, 'confirmed', undefined, before.recipe)
            await this.syncConfirmedMutationToCache(result)
            return result
        }
        if (
            expectedVersion !== undefined
            && before.recipe.contentVersion !== undefined
            && before.recipe.contentVersion !== expectedVersion
        ) {
            return this.mutationResult(action, id, 'conflict', '食谱版本已变化，请重新载入后再恢复。', before.recipe)
        }

        try {
            let request = supabase!
                .from('recipes')
                .update({ deleted_at: null })
                .eq('id', id)
                .not('deleted_at', 'is', null)
            if (expectedVersion !== undefined) {
                request = request.eq('content_version', expectedVersion)
            }
            const { error } = await request.select('id, deleted_at, content_version').maybeSingle()
            return this.confirmCloudMutation(action, id, expectedVersion, error?.message)
        } catch (error) {
            console.error('[SupabaseRepo] 云端恢复响应异常，开始重新确认状态:', error)
            return this.confirmCloudMutation(
                action,
                id,
                expectedVersion,
                error instanceof Error ? error.message : '请求响应异常',
            )
        }
    }

    async permanentlyDeleteRecipe(id: string, expectedVersion?: number): Promise<RecipeMutationResult> {
        const action: RecipeMutationAction = 'permanent-delete'
        if (!this.isEnabled) return this.localFallback.permanentlyDeleteRecipe(id, expectedVersion)

        const permissionResult = await this.requireAdminForMutation(action, id)
        if (permissionResult) return permissionResult

        const before = await this.readCloudRecipeForMutation(id)
        if (!before.ok) {
            return this.mutationResult(action, id, 'unknown', `无法读取永久删除前的云端状态：${before.message}`)
        }
        if (!before.recipe) {
            const result = this.mutationResult(action, id, 'confirmed', undefined, null)
            await this.syncConfirmedMutationToCache(result)
            return result
        }
        if (!before.recipe.deletedAt) {
            return this.mutationResult(action, id, 'rejected', '请先将食谱移入回收站，再执行永久删除。', before.recipe)
        }
        if (
            expectedVersion !== undefined
            && before.recipe.contentVersion !== undefined
            && before.recipe.contentVersion !== expectedVersion
        ) {
            return this.mutationResult(action, id, 'conflict', '食谱版本已变化，请重新载入后再永久删除。', before.recipe)
        }

        try {
            let request = supabase!
                .from('recipes')
                .delete()
                .eq('id', id)
                .not('deleted_at', 'is', null)
            if (expectedVersion !== undefined) {
                request = request.eq('content_version', expectedVersion)
            }
            const { error } = await request.select('id').maybeSingle()
            return this.confirmCloudMutation(action, id, expectedVersion, error?.message)
        } catch (error) {
            console.error('[SupabaseRepo] 云端永久删除响应异常，开始重新确认状态:', error)
            return this.confirmCloudMutation(
                action,
                id,
                expectedVersion,
                error instanceof Error ? error.message : '请求响应异常',
            )
        }
    }

    async getDraft(): Promise<VisualRecipeV3 | null> {
        return this.localFallback.getDraft()
    }

    async saveDraft(recipe: VisualRecipeV3): Promise<boolean> {
        return this.localFallback.saveDraft(recipe)
    }

    async clearDraft(): Promise<void> {
        return this.localFallback.clearDraft()
    }
}
