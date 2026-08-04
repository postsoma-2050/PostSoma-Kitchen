import type { VisualRecipeV3 } from '@/types/recipeV3'
import { validateRecipe } from '@/utils/taxonomyMatcher'
import { normalizeRecipe } from '@/services/recipeNormalizer'
import { upsertIngredientUsage } from '@/services/ingredientRegistryStore'
import type {
    IRecipeRepository,
    RecipeMutationAction,
    RecipeMutationResult,
    RecipeSaveResult,
} from './IRecipeRepository'

interface LocalRepositoryOptions {
    seedPresets?: boolean
    recipesKey?: string
    draftKey?: string
}

/**
 * 纯本地 LocalStorage 存储实现 (保持 100% 同步和后向兼容)
 */
export class LocalRecipeRepository implements IRecipeRepository {
    private readonly seedPresets: boolean
    private readonly recipesKey: string
    private readonly draftKey: string

    constructor(options: LocalRepositoryOptions = {}) {
        this.seedPresets = options.seedPresets ?? true
        this.recipesKey = options.recipesKey ?? 'what-to-eat-v3-recipes'
        this.draftKey = options.draftKey ?? 'what-to-eat-v3-draft'
    }

    private getRawRecipes(): VisualRecipeV3[] {
        try {
            const stored = localStorage.getItem(this.recipesKey)
            if (!stored) return []
            const parsed = JSON.parse(stored)
            return Array.isArray(parsed) ? parsed.map(normalizeRecipe) : []
        } catch (e) {
            console.error('[LocalRepo] 读取原始列表失败:', e)
            return []
        }
    }

    private saveRawRecipes(recipes: VisualRecipeV3[]): void {
        localStorage.setItem(this.recipesKey, JSON.stringify(recipes))
    }

    private async ensurePresetsImported(): Promise<VisualRecipeV3[]> {
        let list = this.getRawRecipes()
        if (this.seedPresets) {
            const result = await this.importAllPresets()
            if (result.addedCount > 0 || list.length === 0) {
                list = this.getRawRecipes()
            }
        }
        return list
    }

    public async importAllPresets(): Promise<{ addedCount: number; totalCount: number }> {
        const [chineseModule, homeModule, examplesModule] = await Promise.all([
            import('@/data/chineseHealthyRecipes'),
            import('@/data/homeSweetHomeRecipes'),
            import('@/data/v3Examples'),
        ])
        const recipes = this.getRawRecipes()
        let addedCount = 0
        const allPresets = [
            ...homeModule.HOME_SWEET_HOME_RECIPES,
            ...chineseModule.CHINESE_HEALTHY_RECIPES,
            examplesModule.espressoBrowniesV3,
            examplesModule.hongShaoRouV3,
            examplesModule.caesarSaladV3,
        ]

        allPresets.forEach(rawRecipe => {
            const newRecipe = normalizeRecipe(rawRecipe)
            const index = recipes.findIndex(r => r.id === newRecipe.id)
            if (index < 0) {
                recipes.push(newRecipe)
                addedCount++
                if (Array.isArray(newRecipe.ingredients)) {
                    newRecipe.ingredients.forEach(ing => {
                        if (ing.name && ing.name.trim()) {
                            upsertIngredientUsage(ing.name, newRecipe.id)
                        }
                    })
                }
            }
        })

        this.saveRawRecipes(recipes)
        return { addedCount, totalCount: allPresets.length }
    }

    async getPublishedRecipes(): Promise<VisualRecipeV3[]> {
        const all = await this.ensurePresetsImported()
        return all.filter(r => r.status === 'published' && !r.deletedAt)
    }

    async getPublishedRecipeById(id: string): Promise<VisualRecipeV3 | null> {
        if (!id) return null
        const recipe = (await this.ensurePresetsImported()).find(r => r.id === id)
        return recipe?.status === 'published' && !recipe.deletedAt ? recipe : null
    }

    async getAllRecipes(): Promise<VisualRecipeV3[]> {
        const list = await this.ensurePresetsImported()
        return list.filter(r => !r.deletedAt)
    }

    async getDeletedRecipes(): Promise<VisualRecipeV3[]> {
        const list = this.getRawRecipes()
        return list.filter(r => Boolean(r.deletedAt))
    }

    async getRecipeById(id: string): Promise<VisualRecipeV3 | null> {
        if (!id) return null
        const list = this.getRawRecipes()
        return list.find(r => r.id === id) || null
    }

    async saveRecipe(recipe: VisualRecipeV3): Promise<RecipeSaveResult> {
        const normalized = normalizeRecipe(recipe)
        const validation = validateRecipe(normalized)

        if (normalized.status === 'published' && !validation.canPublish) {
            return { ok: false, validation, syncStatus: 'failed' }
        }

        if (!validation.canSaveDraft) {
            return { ok: false, validation, syncStatus: 'failed' }
        }

        try {
            const recipes = this.getRawRecipes()
            const index = recipes.findIndex(r => r.id === recipe.id)
            const updatedRecipe = {
                ...normalized,
                updatedAt: new Date().toISOString()
            }

            if (index >= 0) {
                recipes[index] = updatedRecipe
            } else {
                recipes.unshift(updatedRecipe)
            }

            this.saveRawRecipes(recipes)

            if (Array.isArray(recipe.ingredients)) {
                recipe.ingredients.forEach(ing => {
                    if (ing.name && ing.name.trim()) {
                        upsertIngredientUsage(ing.name, recipe.id)
                    }
                })
            }

            return { ok: true, validation, syncStatus: 'local' }
        } catch (e) {
            console.error('[LocalRepo] 保存食谱失败:', e)
            return { ok: false, validation, syncStatus: 'failed', message: 'LocalStorage 保存失败' }
        }
    }

    private mutationConflict(
        action: RecipeMutationAction,
        id: string,
        recipe: VisualRecipeV3,
    ): RecipeMutationResult {
        return {
            ok: false,
            action,
            id,
            status: 'conflict',
            recipe,
            contentVersion: recipe.contentVersion,
            message: '食谱版本已变化，请重新载入后再试。',
        }
    }

    async softDeleteRecipe(id: string, expectedVersion?: number): Promise<RecipeMutationResult> {
        const action: RecipeMutationAction = 'soft-delete'
        try {
            const recipes = this.getRawRecipes()
            const index = recipes.findIndex(r => r.id === id)
            if (index < 0) {
                return { ok: false, action, id, status: 'rejected', message: '未找到要删除的食谱。' }
            }

            const current = recipes[index]
            if (current.deletedAt) {
                return { ok: true, action, id, status: 'confirmed', recipe: current, contentVersion: current.contentVersion }
            }
            if (expectedVersion !== undefined && current.contentVersion !== undefined && current.contentVersion !== expectedVersion) {
                return this.mutationConflict(action, id, current)
            }

            current.deletedAt = new Date().toISOString()
            this.saveRawRecipes(recipes)
            return { ok: true, action, id, status: 'confirmed', recipe: current, contentVersion: current.contentVersion }
        } catch (e) {
            console.error('[LocalRepo] 软删除失败:', e)
            return { ok: false, action, id, status: 'rejected', message: '本地软删除失败。' }
        }
    }

    async restoreRecipe(id: string, expectedVersion?: number): Promise<RecipeMutationResult> {
        const action: RecipeMutationAction = 'restore'
        try {
            const recipes = this.getRawRecipes()
            const index = recipes.findIndex(r => r.id === id)
            if (index < 0) {
                return { ok: false, action, id, status: 'rejected', message: '未找到要恢复的食谱。' }
            }

            const current = recipes[index]
            if (!current.deletedAt) {
                return { ok: true, action, id, status: 'confirmed', recipe: current, contentVersion: current.contentVersion }
            }
            if (expectedVersion !== undefined && current.contentVersion !== undefined && current.contentVersion !== expectedVersion) {
                return this.mutationConflict(action, id, current)
            }

            delete current.deletedAt
            this.saveRawRecipes(recipes)
            return { ok: true, action, id, status: 'confirmed', recipe: current, contentVersion: current.contentVersion }
        } catch (e) {
            console.error('[LocalRepo] 恢复失败:', e)
            return { ok: false, action, id, status: 'rejected', message: '本地恢复失败。' }
        }
    }

    async permanentlyDeleteRecipe(id: string, expectedVersion?: number): Promise<RecipeMutationResult> {
        const action: RecipeMutationAction = 'permanent-delete'
        try {
            const recipes = this.getRawRecipes()
            const current = recipes.find(r => r.id === id)
            if (!current) {
                return { ok: true, action, id, status: 'confirmed', recipe: null }
            }
            if (!current.deletedAt) {
                return { ok: false, action, id, status: 'rejected', recipe: current, message: '请先将食谱移入回收站，再执行永久删除。' }
            }
            if (expectedVersion !== undefined && current.contentVersion !== undefined && current.contentVersion !== expectedVersion) {
                return this.mutationConflict(action, id, current)
            }

            const filtered = recipes.filter(r => r.id !== id)
            this.saveRawRecipes(filtered)
            return { ok: true, action, id, status: 'confirmed', recipe: null }
        } catch (e) {
            console.error('[LocalRepo] 永久删除失败:', e)
            return { ok: false, action, id, status: 'rejected', message: '本地永久删除失败。' }
        }
    }

    async getDraft(): Promise<VisualRecipeV3 | null> {
        try {
            const stored = localStorage.getItem(this.draftKey)
            if (!stored) return null
            return normalizeRecipe(JSON.parse(stored))
        } catch (e) {
            console.error('[LocalRepo] 读取草稿失败:', e)
            return null
        }
    }

    async saveDraft(recipe: VisualRecipeV3): Promise<boolean> {
        try {
            localStorage.setItem(this.draftKey, JSON.stringify(normalizeRecipe(recipe)))
            return true
        } catch (e) {
            console.error('[LocalRepo] 保存草稿失败:', e)
            return false
        }
    }

    async clearDraft(): Promise<void> {
        try {
            localStorage.removeItem(this.draftKey)
        } catch (e) {
            console.error('[LocalRepo] 清除草稿失败:', e)
        }
    }
}
