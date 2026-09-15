import type { VisualRecipeV3 } from '@/types/recipeV3'
import type { RecipeMutationResult, RecipeSaveResult } from '@/repositories/IRecipeRepository'
import { recipeRepository } from '@/repositories'
import { normalizeRecipe } from './recipeNormalizer'

export { normalizeRecipe, mapLegacyCuisineToTaxonomy, mapLegacyMethodToTaxonomy } from './recipeNormalizer'

/**
 * 获取本地静态预置食谱 (隔离预览模式使用，不经过云端或缓存)
 */
export async function getLocalPresetRecipeById(id: string): Promise<VisualRecipeV3 | null> {
  const [chineseModule, homeModule, examplesModule] = await Promise.all([
    import('@/data/chineseHealthyRecipes'),
    import('@/data/homeSweetHomeRecipes'),
    import('@/data/v3Examples'),
  ])
  const allPresets = [
    ...chineseModule.CHINESE_HEALTHY_RECIPES,
    ...homeModule.HOME_SWEET_HOME_RECIPES,
    examplesModule.espressoBrowniesV3,
    examplesModule.hongShaoRouV3,
    examplesModule.caesarSaladV3,
  ]
  const found = allPresets.find(r => r.id === id)
  return found ? normalizeRecipe(found) : null
}

/**
 * 页面层唯一的食谱数据入口。
 * 所有持久化操作统一交给根据 VITE_STORAGE_MODE 注入的 Repository。
 */
export function getV3Recipes(): Promise<VisualRecipeV3[]> {
  return recipeRepository.getAllRecipes()
}

export function getDeletedRecipes(): Promise<VisualRecipeV3[]> {
  return recipeRepository.getDeletedRecipes()
}

export function getPublishedRecipes(): Promise<VisualRecipeV3[]> {
  return recipeRepository.getPublishedRecipes()
}

export function getPublishedRecipeById(id: string): Promise<VisualRecipeV3 | null> {
  return recipeRepository.getPublishedRecipeById(id)
}

export function getV3RecipeById(id: string): Promise<VisualRecipeV3 | null> {
  return recipeRepository.getRecipeById(id)
}

export function saveV3Recipe(recipe: VisualRecipeV3): Promise<RecipeSaveResult> {
  return recipeRepository.saveRecipe(recipe)
}

export function softDeleteRecipe(id: string, expectedVersion?: number): Promise<RecipeMutationResult> {
  return recipeRepository.softDeleteRecipe(id, expectedVersion)
}

export function restoreRecipe(id: string, expectedVersion?: number): Promise<RecipeMutationResult> {
  return recipeRepository.restoreRecipe(id, expectedVersion)
}

export function permanentlyDeleteRecipe(id: string, expectedVersion?: number): Promise<RecipeMutationResult> {
  return recipeRepository.permanentlyDeleteRecipe(id, expectedVersion)
}

export function getV3Draft(): Promise<VisualRecipeV3 | null> {
  return recipeRepository.getDraft()
}

export function saveV3Draft(recipe: VisualRecipeV3): Promise<boolean> {
  return recipeRepository.saveDraft(recipe)
}

export function clearV3Draft(): Promise<void> {
  return recipeRepository.clearDraft()
}

/**
 * 幂等导入全部正式预置数据。示例数据也纳入统一口径，共 121 道。
 */
export async function importAllPresets(): Promise<{ addedCount: number; totalCount: number; failedCount: number }> {
  const [chineseModule, homeModule, examplesModule] = await Promise.all([
    import('@/data/chineseHealthyRecipes'),
    import('@/data/homeSweetHomeRecipes'),
    import('@/data/v3Examples'),
  ])
  const presets = [
    ...chineseModule.CHINESE_HEALTHY_RECIPES,
    ...homeModule.HOME_SWEET_HOME_RECIPES,
    examplesModule.espressoBrowniesV3,
    examplesModule.hongShaoRouV3,
    examplesModule.caesarSaladV3,
  ].filter(Boolean).map(normalizeRecipe)

  const existingIds = new Set((await recipeRepository.getAllRecipes()).map(recipe => recipe.id))
  let addedCount = 0
  let failedCount = 0

  for (const recipe of presets) {
    if (existingIds.has(recipe.id)) continue
    const result = await recipeRepository.saveRecipe(recipe)
    if (result.ok) {
      addedCount += 1
      existingIds.add(recipe.id)
    } else {
      failedCount += 1
    }
  }

  return { addedCount, totalCount: presets.length, failedCount }
}
