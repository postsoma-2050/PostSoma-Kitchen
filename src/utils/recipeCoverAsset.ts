import type { VisualRecipeV3 } from '@/types/recipeV3'

export type RecipeCoverState = 'manual' | 'fallback'

export interface ResolvedRecipeCover {
  state: RecipeCoverState
  url: string
}

export const DEFAULT_RECIPE_COVER = '/images/default-recipe-cover.jpg'

/**
 * 食谱封面解析策略：
 * 1. 【最高优先级】若用户在后台设置/更新了照片 (recipe.coverImageUrl)，以用户的真实照片为准。
 * 2. 【优雅保底】若未设置照片或链接为空，使用统一高质量、充满食欲与烹饪准备氛围感的通用大图 (DEFAULT_RECIPE_COVER)，
 *    不限定为某一道具体菜肴，确保无论炒菜、蒸点、甜品还是汤品均自然和谐。
 */
export function resolveRecipeCover(recipe: VisualRecipeV3): ResolvedRecipeCover {
  if (recipe.coverImageUrl?.trim()) {
    return { state: 'manual', url: recipe.coverImageUrl.trim() }
  }

  return { state: 'fallback', url: DEFAULT_RECIPE_COVER }
}
