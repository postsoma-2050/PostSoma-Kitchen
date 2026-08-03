/**
 * RecipeAnalysis 独立数据结构
 * 与 VisualRecipeV3 解耦，保存在 what-to-eat-v3-analysis
 */

export interface RecipeNutrition {
    caloriesPerServing: number
    protein: string
    carbs: string
    fat: string
    fiber?: string
    sugar?: string
}

export interface RecipeAnalysis {
    recipeId: string
    nutrition?: RecipeNutrition
    generatedAt: string
    status: 'idle' | 'loading' | 'ready' | 'failed'
    errorMessage?: string
}
