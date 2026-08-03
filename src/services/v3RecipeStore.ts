import type { VisualRecipeV3 } from '@/types/recipeV3'
import { normalizeIngredientCategory } from '@/types/recipeV3'
import { calculateSuggestedDifficulty, type CookingMethodCode, type CuisineStyleCode } from '@/constants/taxonomy'
import { validateRecipe } from '@/utils/taxonomyMatcher'
import { upsertIngredientUsage } from './ingredientRegistryStore'
import { HOME_SWEET_HOME_RECIPES } from '@/data/homeSweetHomeRecipes'
import { CHINESE_HEALTHY_RECIPES } from '@/data/chineseHealthyRecipes'

const V3_RECIPES_KEY = 'what-to-eat-v3-recipes'
const V3_DRAFT_KEY = 'what-to-eat-v3-draft'

/**
 * 烹饪方式旧值到标准 CookingMethodCode 映射字典
 */
export function mapLegacyMethodToTaxonomy(legacyMethod?: string, label?: string): CookingMethodCode {
    if (!legacyMethod && !label) return 'other'
    const str = `${legacyMethod || ''} ${label || ''}`.toLowerCase()

    if (str.includes('bake') || str.includes('烘焙') || str.includes('烤')) return 'bake'
    if (str.includes('stew') || str.includes('慢炖') || str.includes('焖') || str.includes('烧')) return 'stew'
    if (str.includes('fry') || str.includes('爆炒') || str.includes('炒') || str.includes('煎')) return 'fry'
    if (str.includes('sear') || str.includes('煎香') || str.includes('煎炙')) return 'sear'
    if (str.includes('steam') || str.includes('蒸')) return 'steam'
    if (str.includes('boil') || str.includes('煮') || str.includes('焯水')) return 'boil'
    if (str.includes('raw') || str.includes('冷') || str.includes('生')) return 'raw'
    if (str.includes('serve') || str.includes('拌') || str.includes('即享')) return 'serve'
    return 'other'
}

/**
 * 菜系旧文本到标准 CuisineStyleCode 映射字典
 */
export function mapLegacyCuisineToTaxonomy(legacyCuisine?: string, title?: string): CuisineStyleCode {
    if (!legacyCuisine && !title) return 'chinese'
    const str = `${legacyCuisine || ''} ${title || ''}`.toLowerCase()

    if (str.includes('意') || str.includes('美') || str.includes('法') || str.includes('西') || str.includes('american') || str.includes('western')) return 'western'
    if (str.includes('日') || str.includes('韩') || str.includes('japanese') || str.includes('korean')) return 'japanese_korean'
    if (str.includes('泰') || str.includes('越') || str.includes('东南亚') || str.includes('thai')) return 'southeast_asian'
    if (str.includes('跨界') || str.includes('融合') || str.includes('fusion')) return 'fusion'
    return 'chinese'
}

/**
 * 规范化格式化单条食谱:
 * - 自动归一化 Taxonomy 字段
 * - 自动迁移旧 IngredientCategory (produce/grain/dairy/liquid → 标准枚举)
 * - 自动合并 note/notes 冗余字段 (notes 废弃，合并到 note)
 * - 确保 formulas 始终为数组
 */
export function normalizeRecipe(r: any): VisualRecipeV3 {
    if (!r) return r

    const status = (!r.status || r.status === 'complete') ? 'published' : r.status

    const rawMethod = r.finalBlock?.method || ''
    const rawLabel = r.finalBlock?.label || ''
    const legacyBackup = r.legacyMethodLabel || `${rawMethod} (${rawLabel})`.trim()

    const stdMethod = mapLegacyMethodToTaxonomy(rawMethod, rawLabel)
    const stdCuisine = mapLegacyCuisineToTaxonomy(r.cuisine, r.title)

    const stepCount = Array.isArray(r.actionBlocks) ? r.actionBlocks.length : 0
    const stdDifficulty = r.difficulty || calculateSuggestedDifficulty(stepCount)

    // 食材列表：迁移旧 category + 合并 note/notes
    const normalizedIngredients = Array.isArray(r.ingredients)
        ? r.ingredients.map((ing: any) => ({
              ...ing,
              category: normalizeIngredientCategory(ing.category),
              note: ing.note || ing.notes || undefined,
              notes: undefined, // 废弃字段，清空
          }))
        : []

    // 工序节点：合并 note/notes
    const normalizedActionBlocks = Array.isArray(r.actionBlocks)
        ? r.actionBlocks.map((block: any) => ({
              ...block,
              note: block.note || block.notes || undefined,
              notes: undefined,
          }))
        : []

    // finalBlock：合并 note/notes
    const normalizedFinalBlock = r.finalBlock ? {
        ...r.finalBlock,
        method: stdMethod,
        note: r.finalBlock.note || r.finalBlock.notes || undefined,
        notes: undefined,
    } : undefined

    return {
        ...r,
        status: status as 'draft' | 'published',
        deletedAt: r.deletedAt || undefined,
        legacyMethodLabel: legacyBackup,
        cuisine: stdCuisine,
        difficulty: stdDifficulty,
        occasions: r.occasions && r.occasions.length > 0 ? r.occasions : ['family_dinner'],
        formulas: Array.isArray(r.formulas) ? r.formulas : [],
        ingredients: normalizedIngredients,
        actionBlocks: normalizedActionBlocks,
        finalBlock: normalizedFinalBlock,
    }
}

/**
 * 获取底层原始未过滤数据列表
 */
function getV3RecipesRaw(): VisualRecipeV3[] {
    try {
        const stored = localStorage.getItem(V3_RECIPES_KEY)
        if (!stored) return []
        const parsed = JSON.parse(stored)
        return Array.isArray(parsed) ? parsed.map(normalizeRecipe) : []
    } catch (e) {
        return []
    }
}

/**
 * 获取所有正常的 V3 食谱 (过滤掉已软删除记录)
 */
export function getV3Recipes(): VisualRecipeV3[] {
    const list = getV3RecipesRaw()
    if (list.length === 0) {
        importAllPresets()
        return getV3RecipesRaw().filter(r => !r.deletedAt)
    }
    return list.filter(r => !r.deletedAt)
}

/**
 * 获取已被软删除放置于回收站的食谱列表
 */
export function getDeletedRecipes(): VisualRecipeV3[] {
    const list = getV3RecipesRaw()
    return list.filter(r => Boolean(r.deletedAt))
}

/**
 * 获取公开已发布的 V3 食谱列表 (过滤掉未发布及已被软删除的记录)
 */
export function getPublishedRecipes(): VisualRecipeV3[] {
    const all = getV3Recipes()
    return all.filter(r => r.status === 'published' && !r.deletedAt)
}

/**
 * 目标 A: 软删除食谱 (标记 deletedAt 时间戳)
 */
export function softDeleteRecipe(id: string): boolean {
    try {
        const recipes = getV3RecipesRaw()
        const index = recipes.findIndex(r => r.id === id)
        if (index < 0) return false

        recipes[index].deletedAt = new Date().toISOString()
        localStorage.setItem(V3_RECIPES_KEY, JSON.stringify(recipes))
        return true
    } catch (e) {
        console.error('软删除食谱失败:', e)
        return false
    }
}

/**
 * 目标 C: 恢复已被软删除的食谱 (清除 deletedAt 标记)
 */
export function restoreRecipe(id: string): boolean {
    try {
        const recipes = getV3RecipesRaw()
        const index = recipes.findIndex(r => r.id === id)
        if (index < 0) return false

        delete recipes[index].deletedAt
        localStorage.setItem(V3_RECIPES_KEY, JSON.stringify(recipes))
        return true
    } catch (e) {
        console.error('恢复食谱失败:', e)
        return false
    }
}

/**
 * 目标 C: 永久物理删除食谱 (从存储中完全抹除，不可恢复)
 */
export function permanentlyDeleteRecipe(id: string): boolean {
    try {
        const recipes = getV3RecipesRaw()
        const filtered = recipes.filter(r => r.id !== id)
        localStorage.setItem(V3_RECIPES_KEY, JSON.stringify(filtered))
        return true
    } catch (e) {
        console.error('永久删除食谱失败:', e)
        return false
    }
}

/**
 * 一键导入中西全部预置食谱
 */
export function importAllPresets(): { addedCount: number; totalCount: number } {
    const res1 = importHomeSweetHomeCookbook()
    const res2 = importChineseHealthyCookbook()
    return {
        addedCount: res1.addedCount + res2.addedCount,
        totalCount: res1.totalCount + res2.totalCount
    }
}

/**
 * 导入《Home Sweet Home Cookbook 2003》经典食谱全集
 */
export function importHomeSweetHomeCookbook(): { addedCount: number; totalCount: number } {
    try {
        const recipes = getV3RecipesRaw()
        let addedCount = 0

        HOME_SWEET_HOME_RECIPES.forEach(rawRecipe => {
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

        localStorage.setItem(V3_RECIPES_KEY, JSON.stringify(recipes))
        return {
            addedCount,
            totalCount: HOME_SWEET_HOME_RECIPES.length
        }
    } catch (e) {
        console.error('导入 Home Sweet Home 食谱全集失败:', e)
        return { addedCount: 0, totalCount: HOME_SWEET_HOME_RECIPES.length }
    }
}

/**
 * 导入张晔《蒸炖炒，健康食谱》经典中式食谱集
 */
export function importChineseHealthyCookbook(): { addedCount: number; totalCount: number } {
    try {
        const recipes = getV3RecipesRaw()
        let addedCount = 0

        CHINESE_HEALTHY_RECIPES.forEach(rawRecipe => {
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

        localStorage.setItem(V3_RECIPES_KEY, JSON.stringify(recipes))
        return {
            addedCount,
            totalCount: CHINESE_HEALTHY_RECIPES.length
        }
    } catch (e) {
        console.error('导入中式健康食谱全集失败:', e)
        return { addedCount: 0, totalCount: CHINESE_HEALTHY_RECIPES.length }
    }
}

/**
 * 保存一道 V3 食谱到 LocalStorage
 *
 * 草稿 (draft)：通过 canSaveDraft 基础校验即可保存
 * 发布 (published)：必须通过全部 error 级校验 (canPublish)
 *
 * @returns false 代表保存/发布被拒绝（已内部处理错误通知）
 */
export function saveV3Recipe(recipe: VisualRecipeV3): { ok: boolean; validation: ReturnType<typeof validateRecipe> } {
    const normalized = normalizeRecipe(recipe)
    const validation = validateRecipe(normalized)

    if (normalized.status === 'published' && !validation.canPublish) {
        // 调用方（编辑器）负责渲染结构化错误，这里不再用 alert
        return { ok: false, validation }
    }

    if (!validation.canSaveDraft) {
        return { ok: false, validation }
    }

    try {

        const recipes = getV3RecipesRaw()
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

        localStorage.setItem(V3_RECIPES_KEY, JSON.stringify(recipes))

        if (Array.isArray(recipe.ingredients)) {
            recipe.ingredients.forEach(ing => {
                if (ing.name && ing.name.trim()) {
                    upsertIngredientUsage(ing.name, recipe.id)
                }
            })
        }

        return { ok: true, validation }
    } catch (e) {
        console.error('保存 V3 食谱失败:', e)
        const emptyValidation = validateRecipe(normalized)
        return { ok: false, validation: emptyValidation }
    }
}

/**
 * 根据 ID 获取单条 V3 食谱
 */
export function getV3RecipeById(id: string): VisualRecipeV3 | null {
    if (!id) return null
    const recipes = getV3RecipesRaw()
    return recipes.find(r => r.id === id) || null
}

/**
 * 读取当前编辑草稿
 */
export function getV3Draft(): VisualRecipeV3 | null {
    try {
        const stored = localStorage.getItem(V3_DRAFT_KEY)
        if (!stored) return null
        return normalizeRecipe(JSON.parse(stored))
    } catch (e) {
        console.error('读取 V3 草稿失败:', e)
        return null
    }
}

/**
 * 保存当前编辑草稿
 */
export function saveV3Draft(recipe: VisualRecipeV3): boolean {
    try {
        localStorage.setItem(V3_DRAFT_KEY, JSON.stringify(normalizeRecipe(recipe)))
        return true
    } catch (e) {
        console.error('保存 V3 草稿失败:', e)
        return false
    }
}

/**
 * 清除草稿
 */
export function clearV3Draft(): void {
    try {
        localStorage.removeItem(V3_DRAFT_KEY)
    } catch (e) {
        console.error('清除 V3 草稿失败:', e)
    }
}
