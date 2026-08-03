import type { RecipeAnalysis } from '@/types/recipeAnalysis'

const V3_ANALYSIS_KEY = 'what-to-eat-v3-analysis'

/**
 * 获取所有本地已保存的 RecipeAnalysis 字典 (recipeId -> RecipeAnalysis)
 */
function getAllAnalysisMap(): Record<string, RecipeAnalysis> {
    try {
        const stored = localStorage.getItem(V3_ANALYSIS_KEY)
        if (!stored) return {}
        return JSON.parse(stored) || {}
    } catch (e) {
        console.error('读取 V3 Analysis 存储失败:', e)
        return {}
    }
}

/**
 * 根据 recipeId 获取指定食谱的 RecipeAnalysis 记录
 */
export function getRecipeAnalysis(recipeId: string): RecipeAnalysis | null {
    if (!recipeId) return null
    const map = getAllAnalysisMap()
    return map[recipeId] || null
}

/**
 * 保存指定食谱的 RecipeAnalysis 记录 (按 recipeId 索引)
 */
export function saveRecipeAnalysis(analysis: RecipeAnalysis): void {
    if (!analysis || !analysis.recipeId) return
    try {
        const map = getAllAnalysisMap()
        map[analysis.recipeId] = {
            ...analysis,
            generatedAt: new Date().toISOString()
        }
        localStorage.setItem(V3_ANALYSIS_KEY, JSON.stringify(map))
    } catch (e) {
        console.error('保存 V3 Analysis 存储失败:', e)
    }
}
