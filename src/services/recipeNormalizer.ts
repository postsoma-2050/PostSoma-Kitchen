import type { VisualRecipeV3 } from '@/types/recipeV3'
import { normalizeIngredientCategory } from '@/types/recipeV3'
import {
  calculateSuggestedDifficulty,
  type CookingMethodCode,
  type CuisineStyleCode,
} from '@/constants/taxonomy'

export function mapLegacyMethodToTaxonomy(legacyMethod?: string, label?: string): CookingMethodCode {
  if (!legacyMethod && !label) return 'other'
  const value = `${legacyMethod || ''} ${label || ''}`.toLowerCase()

  if (value.includes('bake') || value.includes('烘焙') || value.includes('烤')) return 'bake'
  if (value.includes('stew') || value.includes('慢炖') || value.includes('焖') || value.includes('烧')) return 'stew'
  if (value.includes('sear') || value.includes('煎香') || value.includes('煎炙')) return 'sear'
  if (value.includes('fry') || value.includes('爆炒') || value.includes('炒') || value.includes('煎')) return 'fry'
  if (value.includes('steam') || value.includes('蒸')) return 'steam'
  if (value.includes('boil') || value.includes('煮') || value.includes('焯水')) return 'boil'
  if (value.includes('raw') || value.includes('冷') || value.includes('生')) return 'raw'
  if (value.includes('serve') || value.includes('拌') || value.includes('即享')) return 'serve'
  return 'other'
}

export function mapLegacyCuisineToTaxonomy(legacyCuisine?: string, title?: string): CuisineStyleCode {
  if (!legacyCuisine && !title) return 'chinese'
  const value = `${legacyCuisine || ''} ${title || ''}`.toLowerCase()

  if (value.includes('意') || value.includes('美') || value.includes('法') || value.includes('西') || value.includes('american') || value.includes('western')) return 'western'
  if (value.includes('日') || value.includes('韩') || value.includes('japanese') || value.includes('korean')) return 'japanese_korean'
  if (value.includes('泰') || value.includes('越') || value.includes('东南亚') || value.includes('thai')) return 'southeast_asian'
  if (value.includes('跨界') || value.includes('融合') || value.includes('fusion')) return 'fusion'
  return 'chinese'
}

/**
 * 将历史或外部数据转换为当前 VisualRecipeV3 运行时结构。
 * 此函数保持纯粹，不访问 Repository 或浏览器存储。
 */
export function normalizeRecipe(raw: unknown): VisualRecipeV3 {
  const recipe = raw as Record<string, any>
  if (!recipe) return recipe as unknown as VisualRecipeV3

  const status = !recipe.status || recipe.status === 'complete' ? 'published' : recipe.status
  const rawMethod = recipe.finalBlock?.method || ''
  const rawLabel = recipe.finalBlock?.label || ''
  const legacyBackup = recipe.legacyMethodLabel || `${rawMethod} (${rawLabel})`.trim()
  const stepCount = Array.isArray(recipe.actionBlocks) ? recipe.actionBlocks.length : 0

  const ingredients = Array.isArray(recipe.ingredients)
    ? recipe.ingredients.map((ingredient: Record<string, any>) => ({
        ...ingredient,
        category: normalizeIngredientCategory(ingredient.category),
        note: ingredient.note || ingredient.notes || undefined,
        notes: undefined,
      }))
    : []

  const actionBlocks = Array.isArray(recipe.actionBlocks)
    ? recipe.actionBlocks.map((block: Record<string, any>) => ({
        ...block,
        inputBlockIds: Array.isArray(block.inputBlockIds) ? [...new Set(block.inputBlockIds)] : [],
        note: block.note || block.notes || undefined,
        notes: undefined,
      }))
    : []

  const finalBlock = recipe.finalBlock
    ? {
        ...recipe.finalBlock,
        method: mapLegacyMethodToTaxonomy(rawMethod, rawLabel),
        note: recipe.finalBlock.note || recipe.finalBlock.notes || undefined,
        notes: undefined,
      }
    : undefined

  return {
    ...recipe,
    status,
    deletedAt: recipe.deletedAt || undefined,
    legacyMethodLabel: legacyBackup,
    cuisine: mapLegacyCuisineToTaxonomy(recipe.cuisine, recipe.title),
    difficulty: recipe.difficulty || calculateSuggestedDifficulty(stepCount),
    occasions: recipe.occasions?.length ? recipe.occasions : ['family_dinner'],
    formulas: Array.isArray(recipe.formulas) ? recipe.formulas : [],
    ingredients,
    actionBlocks,
    finalBlock,
  } as VisualRecipeV3
}
