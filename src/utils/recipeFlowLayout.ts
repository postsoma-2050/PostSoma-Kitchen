import type { V2Recipe, Ingredient, FlowNode, FinalCooking } from '../types/recipeV2'

export interface HeaderLayout {
    x: number
    y: number
    width: number
    height: number
    preheatTempC?: number
    targetServings?: number
    containersNeeded: string[]
}

export interface IngredientRowLayout {
    id: string
    ingredient: Ingredient
    x: number
    y: number
    width: number
    height: number
    centerY: number
}

export interface NodeLayout {
    id: string
    node: FlowNode
    column: number
    x: number
    y: number
    width: number
    height: number
    centerY: number
    targetAnchorYMap: Record<string, number>
}

export interface FinalCookingLayout {
    id: string
    finalCooking: FinalCooking
    x: number
    y: number
    width: number
    height: number
    centerY: number
}

export interface EdgeLayout {
    id: string
    sourceId: string
    targetId: string
    sourceType: 'ingredient' | 'node'
    targetType: 'node' | 'finalCooking'
    startX: number
    startY: number
    endX: number
    endY: number
    pathD: string
}

export interface RecipeFlowLayout {
    canvasWidth: number
    canvasHeight: number
    headerLayout: HeaderLayout
    ingredientRows: IngredientRowLayout[]
    nodeLayouts: NodeLayout[]
    finalCookingLayouts: FinalCookingLayout[]
    edgeLayouts: EdgeLayout[]
}

// 布局布局常量
const PADDING_LEFT = 24
const PADDING_TOP = 20
const HEADER_HEIGHT = 56
const INGREDIENT_WIDTH = 220
const ROW_HEIGHT = 44
const ROW_GAP = 10
const COL_WIDTH = 110
const COL_GAP = 36
const FINAL_WIDTH = 140
const MIN_NODE_HEIGHT = 48

/**
 * 构建确定性的 Recipe Flow 布局，纯函数无副作用
 */
export function buildRecipeFlowLayout(recipe: V2Recipe): RecipeFlowLayout {
    const ingredients = recipe.ingredients || []
    const flowNodes = recipe.flowNodes || []
    const finalCookings = recipe.finalCooking || []
    const prereqs = recipe.prerequisites

    // 1. Header Layout
    const headerY = PADDING_TOP
    const headerLayout: HeaderLayout = {
        x: PADDING_LEFT,
        y: headerY,
        width: 600, // 初始预估，后续根据 canvasWidth 扩展
        height: HEADER_HEIGHT,
        preheatTempC: prereqs?.preheatTempC,
        targetServings: prereqs?.targetServings,
        containersNeeded: prereqs?.containersNeeded || []
    }

    // 2. Ingredient Rows Layout (严格保持原数组顺序)
    const contentStartY = headerY + HEADER_HEIGHT + 16
    const ingredientRows: IngredientRowLayout[] = ingredients.map((ing, idx) => {
        const y = contentStartY + idx * (ROW_HEIGHT + ROW_GAP)
        return {
            id: ing.id,
            ingredient: ing,
            x: PADDING_LEFT,
            y,
            width: INGREDIENT_WIDTH,
            height: ROW_HEIGHT,
            centerY: y + ROW_HEIGHT / 2
        }
    })

    const ingredientMap = new Map<string, IngredientRowLayout>()
    ingredientRows.forEach(row => ingredientMap.set(row.id, row))

    // 3. FlowNodes Column Layout 计算
    const nodeColMap = new Map<string, number>()

    // 防死循环的拓扑层级迭代计算
    let changed = true
    let iterations = 0
    const maxIterations = Math.max(flowNodes.length * 2, 10)

    while (changed && iterations < maxIterations) {
        changed = false
        iterations++
        for (const node of flowNodes) {
            const deps = node.dependsOnNodeIds || []
            if (deps.length === 0) {
                if (!nodeColMap.has(node.id)) {
                    nodeColMap.set(node.id, 0)
                    changed = true
                }
            } else {
                let maxDepCol = -1
                for (const depId of deps) {
                    if (nodeColMap.has(depId)) {
                        maxDepCol = Math.max(maxDepCol, nodeColMap.get(depId)!)
                    }
                }
                const targetCol = maxDepCol + 1
                if (nodeColMap.get(node.id) !== targetCol) {
                    nodeColMap.set(node.id, targetCol)
                    changed = true
                }
            }
        }
    }

    // 兜底：如有未计算列的节点，赋予 0
    flowNodes.forEach(node => {
        if (!nodeColMap.has(node.id)) {
            nodeColMap.set(node.id, 0)
        }
    })

    // 4. Node Position Calculation
    const nodeLayoutMap = new Map<string, NodeLayout>()
    const nodeLayouts: NodeLayout[] = []

    // 按照列递增顺序处理节点，确保上游节点的位置已被确定
    const sortedNodes = [...flowNodes].sort((a, b) => (nodeColMap.get(a.id) || 0) - (nodeColMap.get(b.id) || 0))

    for (const node of sortedNodes) {
        const col = nodeColMap.get(node.id) || 0
        const ingInputIds = node.ingredientIds || []
        const nodeInputIds = node.dependsOnNodeIds || []

        // 收集所有输入的 Y 坐标
        const inputYs: { id: string; y: number }[] = []

        ingInputIds.forEach(id => {
            if (ingredientMap.has(id)) {
                inputYs.push({ id, y: ingredientMap.get(id)!.centerY })
            }
        })

        nodeInputIds.forEach(id => {
            if (nodeLayoutMap.has(id)) {
                inputYs.push({ id, y: nodeLayoutMap.get(id)!.centerY })
            }
        })

        let centerY = contentStartY + 50
        let nodeHeight = MIN_NODE_HEIGHT

        if (inputYs.length > 0) {
            const minY = Math.min(...inputYs.map(i => i.y))
            const maxY = Math.max(...inputYs.map(i => i.y))
            centerY = (minY + maxY) / 2
            const spanHeight = maxY - minY + 24
            nodeHeight = Math.max(MIN_NODE_HEIGHT, spanHeight)
        }

        const x = PADDING_LEFT + INGREDIENT_WIDTH + COL_GAP + col * (COL_WIDTH + COL_GAP)
        const y = centerY - nodeHeight / 2

        // 多输入的 targetAnchorY 避免重叠
        const targetAnchorYMap: Record<string, number> = {}
        const sortedInputs = [...inputYs].sort((a, b) => a.y - b.y)
        const K = sortedInputs.length

        if (K === 1) {
            targetAnchorYMap[sortedInputs[0].id] = centerY
        } else if (K > 1) {
            const topMargin = Math.min(12, nodeHeight / 4)
            const availableH = nodeHeight - topMargin * 2
            sortedInputs.forEach((inp, idx) => {
                targetAnchorYMap[inp.id] = y + topMargin + (idx * availableH) / (K - 1)
            })
        }

        const layout: NodeLayout = {
            id: node.id,
            node,
            column: col,
            x,
            y,
            width: COL_WIDTH,
            height: nodeHeight,
            centerY,
            targetAnchorYMap
        }

        nodeLayoutMap.set(node.id, layout)
        nodeLayouts.push(layout)
    }

    // 5. Final Cooking Layout
    let maxCol = 0
    nodeLayouts.forEach(n => {
        if (n.column > maxCol) maxCol = n.column
    })
    const hasNodes = nodeLayouts.length > 0
    const finalCol = hasNodes ? maxCol + 1 : 0

    const finalX = PADDING_LEFT + INGREDIENT_WIDTH + COL_GAP + finalCol * (COL_WIDTH + COL_GAP)
    const ingredientTotalHeight = ingredients.length > 0
        ? ingredients.length * ROW_HEIGHT + (ingredients.length - 1) * ROW_GAP
        : 120

    const finalCookingLayouts: FinalCookingLayout[] = finalCookings.map((fc, idx) => {
        const height = Math.max(ingredientTotalHeight, 120)
        const y = contentStartY
        return {
            id: `final-${idx}`,
            finalCooking: fc,
            x: finalX,
            y,
            width: FINAL_WIDTH,
            height,
            centerY: y + height / 2
        }
    })

    // 6. Edge Layouts
    const edgeLayouts: EdgeLayout[] = []

    // Helper: 构建三次贝塞尔曲线路径
    const createBezierPath = (x1: number, y1: number, x2: number, y2: number) => {
        const dx = Math.max((x2 - x1) * 0.45, 12)
        return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`
    }

    // A. Ingredient -> Node
    nodeLayouts.forEach(targetNode => {
        (targetNode.node.ingredientIds || []).forEach(ingId => {
            const ingRow = ingredientMap.get(ingId)
            if (ingRow) {
                const startX = ingRow.x + ingRow.width
                const startY = ingRow.centerY
                const endX = targetNode.x
                const endY = targetNode.targetAnchorYMap[ingId] ?? targetNode.centerY

                edgeLayouts.push({
                    id: `edge-${ingId}-${targetNode.id}`,
                    sourceId: ingId,
                    targetId: targetNode.id,
                    sourceType: 'ingredient',
                    targetType: 'node',
                    startX,
                    startY,
                    endX,
                    endY,
                    pathD: createBezierPath(startX, startY, endX, endY)
                })
            }
        })
    })

    // B. Node -> Node
    nodeLayouts.forEach(targetNode => {
        (targetNode.node.dependsOnNodeIds || []).forEach(upId => {
            const upNode = nodeLayoutMap.get(upId)
            if (upNode) {
                const startX = upNode.x + upNode.width
                const startY = upNode.centerY
                const endX = targetNode.x
                const endY = targetNode.targetAnchorYMap[upId] ?? targetNode.centerY

                edgeLayouts.push({
                    id: `edge-${upId}-${targetNode.id}`,
                    sourceId: upId,
                    targetId: targetNode.id,
                    sourceType: 'node',
                    targetType: 'node',
                    startX,
                    startY,
                    endX,
                    endY,
                    pathD: createBezierPath(startX, startY, endX, endY)
                })
            }
        })
    })

    // C. Node / Ingredient -> Final Cooking
    if (finalCookingLayouts.length > 0) {
        const finalFc = finalCookingLayouts[0]
        // 找到没有任何 downstream 节点的终端节点
        const downstreamNodeIds = new Set<string>()
        flowNodes.forEach(n => (n.dependsOnNodeIds || []).forEach(dep => downstreamNodeIds.add(dep)))

        const leafNodes = nodeLayouts.filter(n => !downstreamNodeIds.has(n.id))

        if (leafNodes.length > 0) {
            leafNodes.forEach(leaf => {
                const startX = leaf.x + leaf.width
                const startY = leaf.centerY
                const endX = finalFc.x
                const endY = finalFc.centerY

                edgeLayouts.push({
                    id: `edge-${leaf.id}-${finalFc.id}`,
                    sourceId: leaf.id,
                    targetId: finalFc.id,
                    sourceType: 'node',
                    targetType: 'finalCooking',
                    startX,
                    startY,
                    endX,
                    endY,
                    pathD: createBezierPath(startX, startY, endX, endY)
                })
            })
        } else if (ingredientRows.length > 0 && nodeLayouts.length === 0) {
            // 无中间节点时，直接从食材连线至 FinalCooking
            ingredientRows.forEach(ingRow => {
                const startX = ingRow.x + ingRow.width
                const startY = ingRow.centerY
                const endX = finalFc.x
                const endY = finalFc.centerY

                edgeLayouts.push({
                    id: `edge-${ingRow.id}-${finalFc.id}`,
                    sourceId: ingRow.id,
                    targetId: finalFc.id,
                    sourceType: 'ingredient',
                    targetType: 'finalCooking',
                    startX,
                    startY,
                    endX,
                    endY,
                    pathD: createBezierPath(startX, startY, endX, endY)
                })
            })
        }
    }

    // 7. Dynamic Canvas Dimensions Calculation
    const maxItemRightX = finalCookingLayouts.length > 0
        ? finalX + FINAL_WIDTH
        : (hasNodes ? finalX : PADDING_LEFT + INGREDIENT_WIDTH)

    const canvasWidth = Math.max(maxItemRightX + PADDING_LEFT + 20, 640)

    const lastIngY = ingredientRows.length > 0 ? ingredientRows[ingredientRows.length - 1].y + ROW_HEIGHT : 0
    const maxNodeBottomY = nodeLayouts.length > 0 ? Math.max(...nodeLayouts.map(n => n.y + n.height)) : 0
    const finalBottomY = finalCookingLayouts.length > 0 ? finalCookingLayouts[0].y + finalCookingLayouts[0].height : 0

    const canvasHeight = Math.max(lastIngY, maxNodeBottomY, finalBottomY, 300) + 30

    headerLayout.width = canvasWidth - PADDING_LEFT * 2

    return {
        canvasWidth,
        canvasHeight,
        headerLayout,
        ingredientRows,
        nodeLayouts,
        finalCookingLayouts,
        edgeLayouts
    }
}
