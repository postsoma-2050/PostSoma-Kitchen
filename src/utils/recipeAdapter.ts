import type { Recipe as V1Recipe } from '../types'
import type { V2Recipe, Ingredient, FlowNode, FinalCooking } from '../types/recipeV2'
import { isV2Recipe } from '../types/recipeV2'

export { isV2Recipe }

/**
 * 尝试解析旧版食材字符串（例如 "五花肉 500g"、"砂糖 200g"、"盐 少许"）
 * 若无法可靠解析数值与单位，将完整文本保留在 name 或 amountText 中，绝不虚构数值。
 */
export function parseV1IngredientString(raw: string, index: number): Ingredient {
    const trimmed = raw.trim()
    const id = `ing-${index}-${Math.random().toString(36).substr(2, 6)}`

    if (!trimmed) {
        return {
            id,
            name: '未命名食材'
        }
    }

    // 匹配常规模式："名称 数量单位"，例如 "五花肉 500g" 或 "细砂糖 1/2 cup"
    const match = trimmed.match(/^(.+?)\s+([0-9./\s]+)\s*([a-zA-Z\u4e00-\u9fa5%]+)$/)
    if (match) {
        const name = match[1].trim()
        const amountStr = match[2].trim()
        const unit = match[3].trim()

        // 尝试转换数值（支持分数，如 "1/2"）
        let amount: number | undefined
        if (amountStr.includes('/')) {
            const parts = amountStr.split('/')
            if (parts.length === 2) {
                const num = parseFloat(parts[0])
                const den = parseFloat(parts[1])
                if (!isNaN(num) && !isNaN(den) && den !== 0) {
                    amount = num / den
                }
            }
        } else {
            const parsed = parseFloat(amountStr)
            if (!isNaN(parsed)) {
                amount = parsed
            }
        }

        return {
            id,
            name: name || trimmed,
            amount,
            unit,
            amountText: amount === undefined ? amountStr + unit : undefined
        }
    }

    // 无法精准拆分数值与单位时（例如 "适量"、"少许" 或无分隔），保留完整文本
    return {
        id,
        name: trimmed,
        amountText: undefined
    }
}

/**
 * 将 V1 旧版食谱转换为 V2 格式食谱
 */
export function convertV1ToV2(v1: V1Recipe): V2Recipe {
    const ingredients: Ingredient[] = (v1.ingredients || []).map((raw, idx) =>
        parseV1IngredientString(raw, idx)
    )

    const allIngredientIds = ingredients.map(ing => ing.id)

    // 将旧版线性 steps 转化为连贯的 FlowNode 链
    const flowNodes: FlowNode[] = (v1.steps || []).map((step, idx) => {
        const nodeId = `node-v1-${step.step || idx + 1}`

        // 第一个节点关联所有食材输入，后续节点依赖前一节点
        const ingredientIds = idx === 0 ? allIngredientIds : []
        const dependsOnNodeIds = idx > 0 ? [`node-v1-${(v1.steps || [])[idx - 1].step || idx}`] : []

        return {
            id: nodeId,
            action: 'step',
            label: step.description ? step.description.slice(0, 12) : `步骤 ${idx + 1}`,
            ingredientIds,
            dependsOnNodeIds,
            durationMinutes: step.time,
            heatLevel: step.temperature,
            note: step.description
        }
    })

    const finalCooking: FinalCooking[] = []

    return {
        id: v1.id,
        version: '2.0',
        title: v1.name || '未命名食谱',
        description: `从旧版食谱转换 (${v1.cuisine || '未指定菜系'})`,
        coverImageUrl: v1.imageUrl,
        prerequisites: {
            targetServings: undefined,
            containersNeeded: []
        },
        ingredients,
        preparations: [],
        flowNodes,
        finalCooking,
        tips: v1.tips || [],
        visibility: 'private',
        createdAt: v1.createdAt || new Date().toISOString(),
        updatedAt: v1.updatedAt || new Date().toISOString()
    }
}
