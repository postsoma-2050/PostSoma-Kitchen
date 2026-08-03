import type { VisualRecipeV3 } from '@/types/recipeV3'
import type { RecipeValidationResult } from '@/utils/taxonomyMatcher'
import { validateRecipe } from '@/utils/taxonomyMatcher'
import { normalizeRecipe } from '@/services/v3RecipeStore'
import { HOME_SWEET_HOME_RECIPES } from '@/data/homeSweetHomeRecipes'
import { CHINESE_HEALTHY_RECIPES } from '@/data/chineseHealthyRecipes'
import { upsertIngredientUsage } from '@/services/ingredientRegistryStore'
import type { IRecipeRepository } from './IRecipeRepository'

const V3_RECIPES_KEY = 'what-to-eat-v3-recipes'
const V3_DRAFT_KEY = 'what-to-eat-v3-draft'

/**
 * 纯本地 LocalStorage 存储实现 (保持 100% 同步和后向兼容)
 */
export class LocalRecipeRepository implements IRecipeRepository {

    private getRawRecipes(): VisualRecipeV3[] {
        try {
            const stored = localStorage.getItem(V3_RECIPES_KEY)
            if (!stored) return []
            const parsed = JSON.parse(stored)
            return Array.isArray(parsed) ? parsed.map(normalizeRecipe) : []
        } catch (e) {
            console.error('[LocalRepo] 读取原始列表失败:', e)
            return []
        }
    }

    private saveRawRecipes(recipes: VisualRecipeV3[]): void {
        localStorage.setItem(V3_RECIPES_KEY, JSON.stringify(recipes))
    }

    private ensurePresetsImported(): VisualRecipeV3[] {
        let list = this.getRawRecipes()
        if (list.length === 0) {
            this.importAllPresets()
            list = this.getRawRecipes()
        }
        return list
    }

    public importAllPresets(): { addedCount: number; totalCount: number } {
        const recipes = this.getRawRecipes()
        let addedCount = 0
        const allPresets = [...HOME_SWEET_HOME_RECIPES, ...CHINESE_HEALTHY_RECIPES]

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
        const all = this.ensurePresetsImported()
        return all.filter(r => r.status === 'published' && !r.deletedAt)
    }

    async getAllRecipes(): Promise<VisualRecipeV3[]> {
        const list = this.ensurePresetsImported()
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

    async saveRecipe(recipe: VisualRecipeV3): Promise<{ ok: boolean; validation: RecipeValidationResult }> {
        const normalized = normalizeRecipe(recipe)
        const validation = validateRecipe(normalized)

        if (normalized.status === 'published' && !validation.canPublish) {
            return { ok: false, validation }
        }

        if (!validation.canSaveDraft) {
            return { ok: false, validation }
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

            return { ok: true, validation }
        } catch (e) {
            console.error('[LocalRepo] 保存食谱失败:', e)
            return { ok: false, validation }
        }
    }

    async softDeleteRecipe(id: string): Promise<boolean> {
        try {
            const recipes = this.getRawRecipes()
            const index = recipes.findIndex(r => r.id === id)
            if (index < 0) return false

            recipes[index].deletedAt = new Date().toISOString()
            this.saveRawRecipes(recipes)
            return true
        } catch (e) {
            console.error('[LocalRepo] 软删除失败:', e)
            return false
        }
    }

    async restoreRecipe(id: string): Promise<boolean> {
        try {
            const recipes = this.getRawRecipes()
            const index = recipes.findIndex(r => r.id === id)
            if (index < 0) return false

            delete recipes[index].deletedAt
            this.saveRawRecipes(recipes)
            return true
        } catch (e) {
            console.error('[LocalRepo] 恢复失败:', e)
            return false
        }
    }

    async permanentlyDeleteRecipe(id: string): Promise<boolean> {
        try {
            const recipes = this.getRawRecipes()
            const filtered = recipes.filter(r => r.id !== id)
            this.saveRawRecipes(filtered)
            return true
        } catch (e) {
            console.error('[LocalRepo] 永久删除失败:', e)
            return false
        }
    }

    async getDraft(): Promise<VisualRecipeV3 | null> {
        try {
            const stored = localStorage.getItem(V3_DRAFT_KEY)
            if (!stored) return null
            return normalizeRecipe(JSON.parse(stored))
        } catch (e) {
            console.error('[LocalRepo] 读取草稿失败:', e)
            return null
        }
    }

    async saveDraft(recipe: VisualRecipeV3): Promise<boolean> {
        try {
            localStorage.setItem(V3_DRAFT_KEY, JSON.stringify(normalizeRecipe(recipe)))
            return true
        } catch (e) {
            console.error('[LocalRepo] 保存草稿失败:', e)
            return false
        }
    }

    async clearDraft(): Promise<void> {
        try {
            localStorage.removeItem(V3_DRAFT_KEY)
        } catch (e) {
            console.error('[LocalRepo] 清除草稿失败:', e)
        }
    }
}
