import type { VisualRecipeV3 } from '@/types/recipeV3'
import type { RecipeValidationResult } from '@/utils/taxonomyMatcher'

/**
 * 食谱存储与检索 Repository 标准接口
 */
export interface IRecipeRepository {
    /** 获取公开已发布的食谱列表 (过滤掉草稿与软删除) */
    getPublishedRecipes(): Promise<VisualRecipeV3[]>

    /** 获取所有未软删除的食谱列表 (含草稿与已发布) */
    getAllRecipes(): Promise<VisualRecipeV3[]>

    /** 获取回收站中已软删除的食谱列表 */
    getDeletedRecipes(): Promise<VisualRecipeV3[]>

    /** 根据 ID 获取单条食谱 */
    getRecipeById(id: string): Promise<VisualRecipeV3 | null>

    /** 保存/更新食谱（草稿或发布），返回校验结果 */
    saveRecipe(recipe: VisualRecipeV3): Promise<{ ok: boolean; validation: RecipeValidationResult }>

    /** 软删除食谱 (移至回收站) */
    softDeleteRecipe(id: string): Promise<boolean>

    /** 从回收站恢复食谱 */
    restoreRecipe(id: string): Promise<boolean>

    /** 永久物理删除食谱 */
    permanentlyDeleteRecipe(id: string): Promise<boolean>

    /** 读取当前前端独立编辑草稿 */
    getDraft(): Promise<VisualRecipeV3 | null>

    /** 保存当前前端独立编辑草稿 */
    saveDraft(recipe: VisualRecipeV3): Promise<boolean>

    /** 清除独立编辑草稿 */
    clearDraft(): Promise<void>
}
