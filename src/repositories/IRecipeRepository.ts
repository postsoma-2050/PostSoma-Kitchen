import type { VisualRecipeV3 } from '@/types/recipeV3'
import type { RecipeValidationResult } from '@/utils/taxonomyMatcher'

export type RecipeSyncStatus = 'local' | 'synced' | 'failed' | 'conflict' | 'unknown'

export type RecipeMutationAction = 'soft-delete' | 'restore' | 'permanent-delete'
export type RecipeMutationStatus = 'confirmed' | 'rejected' | 'conflict' | 'unknown'

export interface RecipeMutationResult {
    ok: boolean
    action: RecipeMutationAction
    status: RecipeMutationStatus
    id: string
    message?: string
    recipe?: VisualRecipeV3 | null
    contentVersion?: number
}

export interface RecipeSaveResult {
    ok: boolean
    validation: RecipeValidationResult
    syncStatus: RecipeSyncStatus
    message?: string
    contentVersion?: number
}

/**
 * 食谱存储与检索 Repository 标准接口
 */
export interface IRecipeRepository {
    /** 获取公开已发布的食谱列表 (过滤掉草稿与软删除) */
    getPublishedRecipes(): Promise<VisualRecipeV3[]>

    /** 根据 ID 获取公开、已发布且未软删除的单条食谱 */
    getPublishedRecipeById(id: string): Promise<VisualRecipeV3 | null>

    /** 获取所有未软删除的食谱列表 (含草稿与已发布) */
    getAllRecipes(): Promise<VisualRecipeV3[]>

    /** 获取回收站中已软删除的食谱列表 */
    getDeletedRecipes(): Promise<VisualRecipeV3[]>

    /** 根据 ID 获取单条食谱 */
    getRecipeById(id: string): Promise<VisualRecipeV3 | null>

    /** 保存/更新食谱（草稿或发布），返回校验结果 */
    saveRecipe(recipe: VisualRecipeV3): Promise<RecipeSaveResult>

    /** 软删除食谱 (移至回收站) */
    softDeleteRecipe(id: string, expectedVersion?: number): Promise<RecipeMutationResult>

    /** 从回收站恢复食谱 */
    restoreRecipe(id: string, expectedVersion?: number): Promise<RecipeMutationResult>

    /** 永久物理删除食谱 */
    permanentlyDeleteRecipe(id: string, expectedVersion?: number): Promise<RecipeMutationResult>

    /** 读取当前前端独立编辑草稿 */
    getDraft(): Promise<VisualRecipeV3 | null>

    /** 保存当前前端独立编辑草稿 */
    saveDraft(recipe: VisualRecipeV3): Promise<boolean>

    /** 清除独立编辑草稿 */
    clearDraft(): Promise<void>
}
