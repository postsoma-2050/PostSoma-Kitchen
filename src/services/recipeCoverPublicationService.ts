import type { RecipeSaveResult } from '@/repositories/IRecipeRepository'
import type { VisualRecipeV3 } from '@/types/recipeV3'
import {
  buildCoverPublicationPlan,
  type CoverPublicationPlan,
  type CoverPublicationPlanItem,
} from '@/domain/recipeCoverPublication'
import { getDeletedRecipes, getV3Recipes, saveV3Recipe } from './v3RecipeStore'

export interface CoverPublicationPreview {
  plan: CoverPublicationPlan
  deletedCount: number
}

export interface CoverPublicationFailure {
  id: string
  title: string
  targetStatus: CoverPublicationPlanItem['targetStatus']
  result?: RecipeSaveResult
  message: string
}

export interface CoverPublicationExecutionResult extends CoverPublicationPreview {
  applied: Array<{ id: string; title: string; status: CoverPublicationPlanItem['targetStatus']; contentVersion?: number }>
  failures: CoverPublicationFailure[]
}

export async function previewCoverPublicationReconciliation(): Promise<CoverPublicationPreview> {
  const [recipes, deletedRecipes] = await Promise.all([getV3Recipes(), getDeletedRecipes()])
  return {
    plan: buildCoverPublicationPlan(recipes),
    deletedCount: deletedRecipes.length,
  }
}

/**
 * 逐条通过现有 Repository 保存，保留 RPC revision 与乐观锁语义。
 * 任一结果无法确认时立即停止，避免在未知状态下继续扩大批量写入。
 */
export async function reconcileRecipePublicationByCover(): Promise<CoverPublicationExecutionResult> {
  const preview = await previewCoverPublicationReconciliation()
  const changes = [...preview.plan.toPublish, ...preview.plan.toDraft]
  const applied: CoverPublicationExecutionResult['applied'] = []
  const failures: CoverPublicationFailure[] = []

  for (const item of changes) {
    const updatedRecipe: VisualRecipeV3 = { ...item.recipe, status: item.targetStatus }
    try {
      const result = await saveV3Recipe(updatedRecipe)
      if (!result.ok || result.syncStatus !== 'synced') {
        failures.push({
          id: item.recipe.id,
          title: item.recipe.title,
          targetStatus: item.targetStatus,
          result,
          message: result.message || '云端未确认本次状态更新',
        })
        break
      }
      applied.push({
        id: item.recipe.id,
        title: item.recipe.title,
        status: item.targetStatus,
        contentVersion: result.contentVersion,
      })
    } catch (error) {
      failures.push({
        id: item.recipe.id,
        title: item.recipe.title,
        targetStatus: item.targetStatus,
        message: error instanceof Error ? error.message : '状态更新出现未知异常',
      })
      break
    }
  }

  return { ...preview, applied, failures }
}
