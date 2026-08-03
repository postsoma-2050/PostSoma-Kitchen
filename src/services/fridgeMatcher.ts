import type { VisualRecipeV3 } from '@/types/recipeV3'
import { getByokConfig, hasValidByokConfig, sanitizeHeaderValue, isValidHeaderByteString } from './byokService'
import axios from 'axios'

export interface MatchedRecipeResult {
    recipe: VisualRecipeV3
    matchedCount: number
    totalRecipeIngredientsCount: number
    matchPercentage: number // 0 ~ 100
    matchedIngredientNames: string[]
    missingIngredientNames: string[]
}

/**
 * 纯本地食材重合度匹配算法 (不需要 API Key)
 */
export function matchRecipesByIngredients(
    userIngredients: string[],
    recipes: VisualRecipeV3[]
): MatchedRecipeResult[] {
    if (!userIngredients || userIngredients.length === 0 || !recipes) return []

    const cleanUserIngs = userIngredients.map(i => i.trim().toLowerCase()).filter(Boolean)

    const results: MatchedRecipeResult[] = recipes.map(recipe => {
        const recipeIngs = recipe.ingredients || []
        const matchedNames: string[] = []
        const missingNames: string[] = []

        recipeIngs.forEach(ing => {
            const ingName = (ing.name || '').trim().toLowerCase()
            const isMatch = cleanUserIngs.some(uIng => uIng.includes(ingName) || ingName.includes(uIng))
            if (isMatch) {
                matchedNames.push(ing.name)
            } else {
                missingNames.push(ing.name)
            }
        })

        const totalCount = Math.max(recipeIngs.length, 1)
        const matchPercentage = Math.round((matchedNames.length / totalCount) * 100)

        return {
            recipe,
            matchedCount: matchedNames.length,
            totalRecipeIngredientsCount: recipeIngs.length,
            matchPercentage,
            matchedIngredientNames: matchedNames,
            missingIngredientNames: missingNames
        }
    })

    return results
        .filter(r => r.matchedCount > 0)
        .sort((a, b) => b.matchPercentage - a.matchPercentage || b.matchedCount - a.matchedCount)
}

/**
 * 使用 BYOK API 生成 AI 清冰箱搭配分析建议 (包含 Header 编码安全校验)
 */
export async function generateFridgeAiAdvice(
    userIngredients: string[],
    matchedResults: MatchedRecipeResult[]
): Promise<string> {
    if (!hasValidByokConfig()) {
        throw new Error('未配置 API Key，无法使用 AI 大厨建议。请在配置中填入你的 API Key。')
    }

    const byok = getByokConfig()
    const cleanApiKey = sanitizeHeaderValue(byok.apiKey)
    const cleanBaseUrl = sanitizeHeaderValue(byok.baseUrl)

    if (!cleanApiKey) {
        throw new Error('检测到 API Key 为空或包含无效字符，请重新检查配置。')
    }

    const authHeaderValue = `Bearer ${cleanApiKey}`
    const contentTypeHeaderValue = 'application/json'

    // 通用 HTTP Header ByteString 安全校验
    if (!isValidHeaderByteString(authHeaderValue)) {
        throw new Error('API Key 中包含非标准 Latin-1 字符或中文符号，请重新检查并输入正确的 Key。')
    }
    if (!isValidHeaderByteString(contentTypeHeaderValue)) {
        throw new Error('HTTP Header 格式异常，无法发送请求。')
    }

    const url = cleanBaseUrl.replace(/\/$/, '') + '/chat/completions'

    // 业务食材数据只放在 POST Request Body 中，绝不出嵌在 Header 内部
    const topRecipesText = matchedResults.slice(0, 3).map(r => {
        return `- 《${r.recipe.title}》 (匹配度 ${r.matchPercentage}%, 需补食材: ${r.missingIngredientNames.join(', ') || '无'})`
    }).join('\n')

    const prompt = `用户现有冰箱剩余食材：${userIngredients.join(', ')}。
根据食谱库本地匹配算法，得出最佳候选食谱：
${topRecipesText}

请以专业亲切的"厨房管家"口吻，撰写 2~3 句简短的清冰箱烹饪建议（指出哪道最推荐先做、顺便清理什么食材、需要补买什么），语言幽默鼓励，150字以内。`

    try {
        const response = await axios.post(url, {
            model: byok.model,
            messages: [
                {
                    role: 'system',
                    content: '你是一位精通食材搭配的贴心厨房管家，请给出简短实用的清冰箱建议。'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            temperature: 0.7,
            stream: false
        }, {
            headers: {
                'Content-Type': contentTypeHeaderValue,
                Authorization: authHeaderValue
            },
            timeout: 15000
        })

        return response.data?.choices?.[0]?.message?.content || 'AI 未返回有效回复'
    } catch (e: any) {
        console.error('BYOK AI 请求失败:', e)
        throw new Error(e.response?.data?.error?.message || e.message || 'AI 请求失败，请检查 Base URL 与 API Key')
    }
}
