import type { VisualRecipeV3 } from '@/types/recipeV3'
import type { RecipeValidationResult } from '@/utils/taxonomyMatcher'
import { validateRecipe } from '@/utils/taxonomyMatcher'
import { normalizeRecipe } from '@/services/v3RecipeStore'
import { supabase, isSupabaseConfigured } from '@/services/supabaseClient'
import { LocalRecipeRepository } from './LocalRecipeRepository'
import type { IRecipeRepository } from './IRecipeRepository'

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
    private localFallback = new LocalRecipeRepository()
    private shadowReadEnabled = false

    constructor(shadowRead = false) {
        this.shadowReadEnabled = shadowRead
    }

    private get isEnabled(): boolean {
        return Boolean(isSupabaseConfigured && supabase)
    }

    async getPublishedRecipes(): Promise<VisualRecipeV3[]> {
        const localData = await this.localFallback.getPublishedRecipes()

        if (!this.isEnabled) {
            return localData
        }

        try {
            const { data, error } = await supabase!
                .from('recipes')
                .select('content')
                .eq('status', 'published')
                .eq('visibility', 'public')
                .is('deleted_at', null)
                .order('updated_at', { ascending: false })

            if (error || !data) {
                console.warn('[SupabaseRepo] 从云端拉取已发布食谱失败，降级读取本地:', error?.message)
                return localData
            }

            const cloudRecipes = data.map((row: any) => normalizeRecipe(row.content)).filter(Boolean)

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

    async getAllRecipes(): Promise<VisualRecipeV3[]> {
        if (!this.isEnabled) {
            return this.localFallback.getAllRecipes()
        }

        try {
            const { data, error } = await supabase!
                .from('recipes')
                .select('content')
                .is('deleted_at', null)
                .order('updated_at', { ascending: false })

            if (error || !data) {
                return this.localFallback.getAllRecipes()
            }

            return data.map((row: any) => normalizeRecipe(row.content)).filter(Boolean)
        } catch (e) {
            return this.localFallback.getAllRecipes()
        }
    }

    async getDeletedRecipes(): Promise<VisualRecipeV3[]> {
        if (!this.isEnabled) {
            return this.localFallback.getDeletedRecipes()
        }

        try {
            const { data, error } = await supabase!
                .from('recipes')
                .select('content')
                .not('deleted_at', 'is', null)

            if (error || !data) {
                return this.localFallback.getDeletedRecipes()
            }

            return data.map((row: any) => normalizeRecipe(row.content)).filter(Boolean)
        } catch (e) {
            return this.localFallback.getDeletedRecipes()
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
                .select('content')
                .eq('id', id)
                .single()

            if (error || !data) {
                return this.localFallback.getRecipeById(id)
            }

            return normalizeRecipe(data.content)
        } catch (e) {
            return this.localFallback.getRecipeById(id)
        }
    }

    async saveRecipe(recipe: VisualRecipeV3): Promise<{ ok: boolean; validation: RecipeValidationResult }> {
        const normalized = normalizeRecipe(recipe)
        const validation = validateRecipe(normalized)

        // 1. 发布阻断控制
        if (normalized.status === 'published' && !validation.canPublish) {
            return { ok: false, validation }
        }

        if (!validation.canSaveDraft) {
            return { ok: false, validation }
        }

        // 先写入本地保证离线无感体验
        await this.localFallback.saveRecipe(normalized)

        if (!this.isEnabled) {
            return { ok: true, validation }
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
                p_recipe: payload
            })

            if (error) {
                console.error('[SupabaseRepo] 呼叫 save_recipe_with_revision RPC 失败:', error.message)
                // 若为 RPC 权限问题，警告开发者
                if (error.message.includes('PERMISSION_DENIED')) {
                    alert('保存阻断：只有 Kitchen Studio 管理员登录后才能向云端保存或发布食谱！')
                    return { ok: false, validation }
                }
            } else {
                console.log('[SupabaseRepo] 成功原子保存食谱并生成 Revision 快照:', data)
            }

            return { ok: true, validation }
        } catch (e) {
            console.error('[SupabaseRepo] 云端保存异常:', e)
            return { ok: true, validation }
        }
    }

    async softDeleteRecipe(id: string): Promise<boolean> {
        await this.localFallback.softDeleteRecipe(id)
        if (!this.isEnabled) return true

        try {
            const { error } = await supabase!
                .from('recipes')
                .update({ deleted_at: new Date().toISOString() })
                .eq('id', id)

            return !error
        } catch (e) {
            return true
        }
    }

    async restoreRecipe(id: string): Promise<boolean> {
        await this.localFallback.restoreRecipe(id)
        if (!this.isEnabled) return true

        try {
            const { error } = await supabase!
                .from('recipes')
                .update({ deleted_at: null })
                .eq('id', id)

            return !error
        } catch (e) {
            return true
        }
    }

    async permanentlyDeleteRecipe(id: string): Promise<boolean> {
        await this.localFallback.permanentlyDeleteRecipe(id)
        if (!this.isEnabled) return true

        try {
            const { error } = await supabase!
                .from('recipes')
                .delete()
                .eq('id', id)

            return !error
        } catch (e) {
            return true
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
