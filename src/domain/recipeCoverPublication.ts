import type { VisualRecipeV3 } from '@/types/recipeV3'
import { resolveRecipeCover } from '@/utils/recipeCoverAsset'

export type CoverPublicationTargetStatus = 'published' | 'draft'

export interface CoverPublicationPlanItem {
  recipe: VisualRecipeV3
  currentStatus: VisualRecipeV3['status']
  targetStatus: CoverPublicationTargetStatus
  hasConfirmedCover: boolean
  coverUrl?: string
}

export interface CoverPublicationPlan {
  total: number
  confirmedCoverCount: number
  missingCoverCount: number
  targetPublishedCount: number
  targetDraftCount: number
  toPublish: CoverPublicationPlanItem[]
  toDraft: CoverPublicationPlanItem[]
  unchanged: CoverPublicationPlanItem[]
}

/**
 * “已确认封面”只认 recipe.coverImageUrl；prototype manifest 与品牌 fallback
 * 从不进入该判定。公开 HTTPS 链接和站内绝对路径均视为可发布封面地址。
 */
export function resolveConfirmedRecipeCover(recipe: VisualRecipeV3): string | null {
  const cover = resolveRecipeCover(recipe)
  if (!cover) return null

  if (/^\/(?!\/)/.test(cover.url)) return cover.url

  try {
    const url = new URL(cover.url)
    return url.protocol === 'https:' ? cover.url : null
  } catch {
    return null
  }
}

export function buildCoverPublicationPlan(recipes: VisualRecipeV3[]): CoverPublicationPlan {
  const activeRecipes = recipes.filter(recipe => !recipe.deletedAt)
  const items = activeRecipes.map<CoverPublicationPlanItem>(recipe => {
    const coverUrl = resolveConfirmedRecipeCover(recipe)
    return {
      recipe,
      currentStatus: recipe.status,
      targetStatus: coverUrl ? 'published' : 'draft',
      hasConfirmedCover: Boolean(coverUrl),
      coverUrl: coverUrl || undefined,
    }
  })
  const toPublish = items.filter(item => item.targetStatus === 'published' && item.currentStatus !== 'published')
  const toDraft = items.filter(item => item.targetStatus === 'draft' && item.currentStatus !== 'draft')

  return {
    total: items.length,
    confirmedCoverCount: items.filter(item => item.hasConfirmedCover).length,
    missingCoverCount: items.filter(item => !item.hasConfirmedCover).length,
    targetPublishedCount: items.filter(item => item.targetStatus === 'published').length,
    targetDraftCount: items.filter(item => item.targetStatus === 'draft').length,
    toPublish,
    toDraft,
    unchanged: items.filter(item => item.currentStatus === item.targetStatus),
  }
}
