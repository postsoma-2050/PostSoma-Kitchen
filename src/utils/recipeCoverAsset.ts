import type { VisualRecipeV3 } from '@/types/recipeV3'

export type RecipeCoverState = 'manual' | 'fallback'

export interface ResolvedRecipeCover {
  state: 'manual'
  url: string
}

/**
 * Public cover resolution is intentionally explicit and conservative:
 * only a URL saved on the recipe may render. Missing or failed images return
 * null so the existing branded fallback is used by the public views.
 */
export function resolveRecipeCover(recipe: VisualRecipeV3): ResolvedRecipeCover | null {
  if (recipe.coverImageUrl?.trim()) {
    return { state: 'manual', url: recipe.coverImageUrl.trim() }
  }

  return null
}
