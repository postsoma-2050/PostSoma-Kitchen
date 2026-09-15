import { arrangeIngredientRows, getProcessingIngredientSets } from './ingredientDisplayOrder'
import type { VisualRecipeV3, V3Ingredient, V3ActionBlock, V3FinalBlock, V3DependencyType } from '@/types/recipeV3'
import { measureTextWidth, wrapTextToLines } from './textMeasurement'

export interface V3LayoutRow {
    ingredient: V3Ingredient
    rowIndex: number
    x: number
    y: number
    w: number
    h: number
}

export interface V3LayoutActionBlock {
    block: V3ActionBlock
    computedStartRow: number
    computedEndRow: number
    computedColIndex: number
    isEmptyPlaceholder: boolean
    labelLines: string[]
    sublabelLines: string[]
    equipmentLines: string[]
    guidanceLines: string[]
    x: number
    y: number
    w: number
    h: number
    envelopeY: number
    envelopeH: number
    intakeRowYs: number[]
    hasMultiRowIntake: boolean
}

export interface V3LayoutFinalBlock {
    finalBlock: V3FinalBlock
    isPlaceholder: boolean
    instructionLines?: string[]
    x: number
    y: number
    w: number
    h: number
}

export interface V3GridLine {
    x1: number
    y1: number
    x2: number
    y2: number
}

export interface V3CollisionNotice {
    blockId: string
    blockLabel: string
    originalStage: number
    adjustedStage: number
    reason: 'dependency' | 'collision'
}

export interface V3IngredientConnectorLayout {
    id: string
    ingredientId: string
    targetBlockId: string
    sourceX: number
    sourceY: number
    targetX: number
    targetY: number
    pathD: string
    category?: string
}

export interface V3IngredientWaitingPath {
    id: string
    ingredientId: string
    rowIndex: number
    startY: number
    startX: number
    endX: number
    targetBlockId?: string
    isFinal: boolean
    pathD?: string
}

export interface V3IngredientIntakeFeed {
    id: string
    ingredientId: string
    blockId: string
    rowIndex: number
    pinX: number
    pinY: number
    feedStartX: number
}

export interface V3IntakeRailSegment {
    id: string
    blockId: string
    x: number
    startY: number
    endY: number
    participatingRowIndices: number[]
}

export interface V3FlowConnectorLayout {
    id: string
    sourceBlockId: string
    targetBlockId?: string
    targetType: 'action' | 'final'
    explicit: boolean
    type?: V3DependencyType
    isOrder?: boolean
    isMaterial?: boolean
    label?: string
    pathD: string
    midPoint?: { x: number; y: number }
}

export interface V3MatrixLayoutResult {
    canvasWidth: number
    canvasHeight: number
    hasHeader: boolean
    hasContainer: boolean
    hasPreheat: boolean
    headerLineCount: number
    headerHeight: number
    headerY: number
    contentStartY: number
    ingredientRows: V3LayoutRow[]
    actionBlockLayouts: V3LayoutActionBlock[]
    connectorLayouts: V3FlowConnectorLayout[]
    ingredientConnectors: V3IngredientConnectorLayout[]
    ingredientWaitingPaths: V3IngredientWaitingPath[]
    ingredientIntakeFeeds: V3IngredientIntakeFeed[]
    intakeRailSegments: V3IntakeRailSegment[]
    actionColWidths: number[]
    finalBlockLayout: V3LayoutFinalBlock
    gridLines: V3GridLine[]
    collisionNotices: V3CollisionNotice[]
    numRows: number
    numActionCols: number
}

const BASE_ROW_HEIGHT = 44
const GAP_Y = 0
const GAP_X = 16
const INGREDIENT_COL_WIDTH = 320
const MIN_ACTION_COL_WIDTH = 120
const MAX_ACTION_COL_WIDTH = 210
const FINAL_COL_WIDTH = 135
const PADDING = 16
const STRIP_ROW_HEIGHT = 28

function rangesOverlap(startA: number, endA: number, startB: number, endB: number): boolean {
    return startA <= endB && startB <= endA
}

function sampleBezierPoint(
    p0: { x: number; y: number },
    p1: { x: number; y: number },
    p2: { x: number; y: number },
    p3: { x: number; y: number },
    t: number
): { x: number; y: number } {
    const mt = 1 - t
    const mt2 = mt * mt
    const mt3 = mt2 * mt
    const t2 = t * t
    const t3 = t2 * t
    return {
        x: mt3 * p0.x + 3 * mt2 * t * p1.x + 3 * mt * t2 * p2.x + t3 * p3.x,
        y: mt3 * p0.y + 3 * mt2 * t * p1.y + 3 * mt * t2 * p2.y + t3 * p3.y,
    }
}

function doesBezierHitObstacle(
    p0: { x: number; y: number },
    p1: { x: number; y: number },
    p2: { x: number; y: number },
    p3: { x: number; y: number },
    obstacle: { x: number; y: number; w: number; h: number }
): boolean {
    const margin = 4
    const minX = obstacle.x - margin
    const maxX = obstacle.x + obstacle.w + margin
    const minY = obstacle.y - margin
    const maxY = obstacle.y + obstacle.h + margin

    for (let i = 1; i < 20; i++) {
        const t = i / 20
        const pt = sampleBezierPoint(p0, p1, p2, p3, t)
        if (pt.x >= minX && pt.x <= maxX && pt.y >= minY && pt.y <= maxY) {
            return true
        }
    }
    return false
}

function routeAvoidancePath(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    gutterX: number,
    corridorY: number
): string {
    const turnX = Math.min(gutterX, x2 - 10)
    const r = Math.min(8, Math.abs(y2 - corridorY) / 2, Math.max(4, (turnX - x1) / 4), Math.max(4, (x2 - turnX) / 2))
    const pathParts: string[] = []

    pathParts.push(`M ${x1} ${y1}`)

    if (Math.abs(y1 - corridorY) > 2) {
        const midX = (x1 + turnX) / 2
        pathParts.push(`C ${x1 + (midX - x1) * 0.5} ${y1}, ${midX - (midX - x1) * 0.5} ${corridorY}, ${midX} ${corridorY}`)
        pathParts.push(`L ${turnX - r} ${corridorY}`)
    } else {
        pathParts.push(`L ${turnX - r} ${y1}`)
    }

    const dy = y2 - corridorY
    if (Math.abs(dy) > 1) {
        const signY = dy > 0 ? 1 : -1
        pathParts.push(`Q ${turnX} ${corridorY}, ${turnX} ${corridorY + signY * r}`)
        pathParts.push(`L ${turnX} ${y2 - signY * r}`)
        pathParts.push(`Q ${turnX} ${y2}, ${turnX + r} ${y2}`)
    }

    pathParts.push(`L ${x2} ${y2}`)
    return pathParts.join(' ')
}

function getMaterialUpstreamBlockIds(block: V3ActionBlock): string[] {
    const ids: string[] = []
    if (block.dependencies && block.dependencies.length > 0) {
        for (const dep of block.dependencies) {
            if (dep && dep.type === 'material' && dep.sourceBlockId && dep.sourceBlockId !== block.id) {
                ids.push(dep.sourceBlockId)
            }
        }
    } else if (block.inputBlockIds && block.inputBlockIds.length > 0) {
        for (const id of block.inputBlockIds) {
            if (id && id !== block.id) ids.push(id)
        }
    }
    return ids
}

function routeConnectorPath(
    source: V3LayoutActionBlock,
    target: V3LayoutActionBlock,
    allBlocks: V3LayoutActionBlock[],
    contentStartY: number,
    targetYOffset: number = 0
): { pathD: string; midPoint: { x: number; y: number } } {
    const x1 = source.x + source.w
    const y1 = source.y + source.h / 2
    const targetMinY = target.y + Math.min(16, target.h / 2)
    const targetMaxY = target.y + target.h - Math.min(16, target.h / 2)
    let y2 = target.y + target.h / 2
    if (targetYOffset !== 0) {
        y2 = Math.max(targetMinY, Math.min(targetMaxY, target.y + targetYOffset))
    } else if (y1 >= target.y && y1 <= target.y + target.h) {
        y2 = y1
    } else if (y1 < target.y) {
        y2 = targetMinY
    } else {
        y2 = targetMaxY
    }
    const x2 = target.x

    const controlOffset = Math.max(10, (x2 - x1) * 0.45)
    const p0 = { x: x1, y: y1 }
    const p1 = { x: x1 + controlOffset, y: y1 }
    const p2 = { x: x2 - controlOffset, y: y2 }
    const p3 = { x: x2, y: y2 }

    // Adjacent or same column
    if (target.computedColIndex <= source.computedColIndex + 1) {
        return {
            pathD: `M ${x1} ${y1} C ${p1.x} ${p1.y}, ${p2.x} ${p2.y}, ${x2} ${y2}`,
            midPoint: { x: (x1 + x2) / 2, y: (y1 + y2) / 2 }
        }
    }

    // Intermediate blocks between source and target columns
    const intermediateBlocks = allBlocks.filter(
        b => b.computedColIndex > source.computedColIndex && b.computedColIndex < target.computedColIndex
    )

    const hasCollision = intermediateBlocks.some(b => doesBezierHitObstacle(p0, p1, p2, p3, b))
    if (!hasCollision) {
        return {
            pathD: `M ${x1} ${y1} C ${p1.x} ${p1.y}, ${p2.x} ${p2.y}, ${x2} ${y2}`,
            midPoint: { x: (x1 + x2) / 2, y: (y1 + y2) / 2 }
        }
    }

    // Route through corridor avoiding intermediate blocks
    const maxIntermediateRight = Math.max(...intermediateBlocks.map(b => b.x + b.w))
    const gutterX = Math.max(x1 + 10, Math.min(x2 - 12, (maxIntermediateRight + x2) / 2))

    const minBlockY = Math.min(...intermediateBlocks.map(b => b.y))
    const maxBlockBottom = Math.max(...intermediateBlocks.map(b => b.y + b.h))

    let corridorY: number
    if (y1 <= minBlockY - 14 || minBlockY - 14 >= contentStartY) {
        corridorY = Math.min(y1, minBlockY - 14)
    } else {
        corridorY = Math.max(y1, maxBlockBottom + 14)
    }

    const pathD = routeAvoidancePath(x1, y1, x2, y2, gutterX, corridorY)
    const turnX = Math.min(gutterX, x2 - 10)
    const midPoint = {
        x: (x1 + turnX) / 2,
        y: corridorY
    }
    return { pathD, midPoint }
}

function createConnectorPath(startX: number, startY: number, endX: number, endY: number): string {
    const controlOffset = Math.max(10, (endX - startX) * 0.45)
    return `M ${startX} ${startY} C ${startX + controlOffset} ${startY}, ${endX - controlOffset} ${endY}, ${endX} ${endY}`
}

function routeWaitingPathWithAvoidance(
    startX: number,
    endX: number,
    startY: number,
    targetBlockId: string | undefined,
    allBlocks: V3LayoutActionBlock[],
    contentStartY: number
): string | undefined {
    const collidingObstacles = allBlocks.filter(b => {
        if (targetBlockId && b.block.id === targetBlockId) return false
        const isIntermediate = b.x >= startX - 4 && (b.x + b.w) <= endX + 4
        if (!isIntermediate) return false
        return startY >= (b.y - 2) && startY <= (b.y + b.h + 2)
    }).sort((a, b) => a.x - b.x)

    if (collidingObstacles.length === 0) {
        return undefined
    }

    let currentX = startX
    let currentY = startY
    const pathParts: string[] = [`M ${currentX} ${currentY}`]
    const r = 4

    collidingObstacles.forEach(obs => {
        const turnX1 = Math.max(currentX + 4, obs.x - 8)
        const turnX2 = Math.min(endX - 4, obs.x + obs.w + 8)

        const preferAbove = startY < (obs.y + obs.h / 2)
        let corridorY: number
        if (preferAbove && (obs.y - 12 >= contentStartY + 4)) {
            corridorY = obs.y - 12
        } else {
            corridorY = obs.y + obs.h + 12
        }

        pathParts.push(`L ${turnX1 - r} ${currentY}`)
        const signY1 = corridorY > currentY ? 1 : -1
        pathParts.push(`Q ${turnX1} ${currentY}, ${turnX1} ${currentY + signY1 * r}`)
        pathParts.push(`L ${turnX1} ${corridorY - signY1 * r}`)
        pathParts.push(`Q ${turnX1} ${corridorY}, ${turnX1 + r} ${corridorY}`)
        pathParts.push(`L ${turnX2 - r} ${corridorY}`)
        const signY2 = startY > corridorY ? 1 : -1
        pathParts.push(`Q ${turnX2} ${corridorY}, ${turnX2} ${corridorY + signY2 * r}`)
        pathParts.push(`L ${turnX2} ${startY - signY2 * r}`)
        pathParts.push(`Q ${turnX2} ${startY}, ${turnX2 + r} ${startY}`)

        currentX = turnX2 + r
        currentY = startY
    })

    pathParts.push(`L ${endX} ${startY}`)
    return pathParts.join(' ')
}

/**
 * 统一的内容高度测量函数，消除行高与实体卡片测量差异（彻底杜绝 2px 重叠 bug）
 * 支持包含卡片内核心操作要点指导（guidanceLines）
 */
export function measureBlockContentHeight(
    lines: { labelLines: string[]; sublabelLines: string[]; equipmentLines: string[]; guidanceLines?: string[] },
    hasHeat: boolean
): number {
    return lines.labelLines.length * 16
        + lines.sublabelLines.length * 14
        + ((lines.guidanceLines?.length || 0) * 14)
        + (hasHeat ? 14 : 0)
        + lines.equipmentLines.length * 13
        + 24
}

/**
 * 判定工序副标题/英文标签是否应当渲染：
 * 若数据中提供有效副标题且非空，则作为双语说明如实渲染，不再由字符编码偶然性决定。
 */
export function shouldRenderSublabel(_cuisine?: string, sublabel?: string): boolean {
    if (!sublabel || !sublabel.trim()) return false
    return true
}

/**
 * 正向加热火候关键词与非加热明确关键词
 */
const POSITIVE_HEAT_REGEX = /(大火|中火|小火|微火|文火|高火|低火|沸水|hot|high|medium|low|boil|simmer|温油|热油|开水)/i
const EXPLICIT_NO_HEAT_REGEX = /^(none|off|无|不加热|常温|室温|冷藏|冰镇|冷|生食)$/i
const POSITIVE_COOKING_VERBS = /(炒|蒸|炖|煮|烧|烤|炸|焖|焯|煎|滑油|炝|煨|煲)/

function stripNegatedCookingText(text: string): string {
    return text.replace(/(无需|免|不用|不需|切忌|无须)\s*([^\s,，。；;]{0,6}(煮|沸|热|炒|蒸|炸|煎|焖|烤|烧))/g, '')
}

/**
 * 判定烹饪过程中是否经历过加热步骤
 */
export function hasCookingHeat(recipe: VisualRecipeV3): boolean {
    const m = recipe.finalBlock?.method
    const hotMethods = new Set(['fry', 'stew', 'steam', 'bake', 'boil', 'braise', 'roast', 'saute', 'stir_fry'])
    if (m && hotMethods.has(m)) return true

    for (const b of recipe.actionBlocks || []) {
        const heat = (b.heatLevel || '').trim()
        const isExplicitNoHeat = EXPLICIT_NO_HEAT_REGEX.test(heat)
        if (isExplicitNoHeat) {
            continue
        }
        if (heat && POSITIVE_HEAT_REGEX.test(heat)) {
            return true
        }
        const rawText = `${b.label || ''} ${b.note || ''} ${b.notes || ''}`
        const strippedText = stripNegatedCookingText(rawText)
        if (POSITIVE_COOKING_VERBS.test(strippedText)) {
            return true
        }
    }
    return false
}

/**
 * 是否具有明确的放凉/冷藏/过凉水工序
 */
export function hasExplicitCoolingDown(recipe: VisualRecipeV3): boolean {
    const allText = [
        recipe.title || '',
        recipe.description || '',
        recipe.finalBlock?.label || '',
        recipe.finalBlock?.instructions || '',
        ...(recipe.actionBlocks || []).map(b => `${b.label || ''} ${b.note || ''} ${b.notes || ''}`),
    ].join(' ')
    return /(放凉|凉透|冷却|冷藏|冰镇|晾凉|冰水镇|过凉水)/.test(allText)
}

/**
 * 判定是否属于凉菜、沙拉或冷盘类食谱风格
 */
export function isColdDishStyle(recipe: VisualRecipeV3): boolean {
    const m = recipe.finalBlock?.method
    if (m === 'raw') return true
    const text = `${recipe.title || ''} ${recipe.description || ''} ${recipe.finalBlock?.label || ''} ${recipe.prerequisites?.containerSize || ''} ${recipe.prerequisites?.preheat || ''}`
    if (/(凉拌|沙拉|冷盘|冰品|刺身|冷面|凉爽|salad|cold)/i.test(text)) {
        return true
    }
    if (m === 'serve' && !hasCookingHeat(recipe)) {
        return true
    }
    return false
}

export type ServingTemperature = 'hot' | 'cold' | 'room_temp' | 'unknown'

/**
 * 获取最终上桌温态 (解耦“是否经历加热”、“上桌温态”与“操作指令”)
 */
export function getServingTemperature(recipe: VisualRecipeV3): ServingTemperature {
    const hasHeat = hasCookingHeat(recipe)
    const isCold = isColdDishStyle(recipe) || hasExplicitCoolingDown(recipe)

    if (isCold) {
        return 'cold'
    }
    if (hasHeat) {
        return 'hot'
    }

    let hasExplicitNoHeat = false
    let hasAnyHeatSpec = false
    for (const b of recipe.actionBlocks || []) {
        const heat = (b.heatLevel || '').trim()
        if (heat) {
            hasAnyHeatSpec = true
            if (EXPLICIT_NO_HEAT_REGEX.test(heat)) {
                hasExplicitNoHeat = true
            }
        }
    }

    if (hasExplicitNoHeat && !hasHeat) {
        return 'room_temp'
    }

    if (!hasAnyHeatSpec && !recipe.finalBlock?.method) {
        return 'unknown'
    }

    return 'unknown'
}

/**
 * 获取最终成品上桌温态 (保持向后兼容性)
 */
export function getFinalServingState(recipe: VisualRecipeV3): 'hot' | 'cold' {
    const temp = getServingTemperature(recipe)
    if (temp === 'cold' || temp === 'room_temp') return 'cold'
    if (temp === 'hot') return 'hot'
    return hasCookingHeat(recipe) ? 'hot' : 'cold'
}

/**
 * 判定最终装盘是否应呈现为免加热/冷食视觉
 */
export function isColdFinalBlock(recipe: VisualRecipeV3): boolean {
    if (!recipe.finalBlock) return false
    const temp = getServingTemperature(recipe)
    return temp === 'cold' || temp === 'room_temp'
}

/**
 * 获取终点卡片展示文本：分离操作指令与温态，禁止未经数据支持的“免加热”或“趁热享用”
 */
export function getFinalServingInstructions(recipe: VisualRecipeV3): string {
    if (recipe.finalBlock?.durationText) {
        return recipe.finalBlock.durationText
    }
    const temp = getServingTemperature(recipe)
    const hasHeat = hasCookingHeat(recipe)
    const hasCooled = hasExplicitCoolingDown(recipe)

    if (temp === 'unknown') {
        return '出锅装盘'
    }

    if (temp === 'cold') {
        if (hasHeat || hasCooled) {
            return '放凉后装盘享用'
        }
        const text = `${recipe.title || ''} ${recipe.description || ''} ${recipe.finalBlock?.label || ''} ${recipe.prerequisites?.containerSize || ''}`
        if (/拌|沙拉|salad/.test(text)) {
            return '免加热 · 拌匀即享'
        }
        return '免加热 · 装盘即享'
    }

    if (temp === 'room_temp') {
        return '常温装盘享用'
    }

    return '出锅装盘 · 趁热享用'
}

export interface FormattedIngredientDisplay {
    amount: string
    nameLine1: string
    nameLine2: string
    isFormula: boolean
    isDuplicate: boolean
}

/**
 * 格式化左侧食材行的展示文本，严格限制为确定性去重抑制，严禁生成“组合”等无依据字样
 */
export function formatIngredientRowDisplay(ing: V3Ingredient): FormattedIngredientDisplay {
    const isFormula = ing.category === 'formula' || Boolean(ing.formulaId)
    const rawAmt = (ing.amountText || '').trim()
    const rawName = (ing.name || '').trim()

    // 严禁模糊包含 includes()，严禁凭空生成无依据文字如“组合”
    // 仅在规范化（去掉空白与标点）后完全相等（即名称与用量互抄）时进行抑制
    const normAmt = rawAmt.replace(/[\s+与和、,，]/g, '').toLowerCase()
    const normName = rawName.replace(/[\s+与和、,，]/g, '').toLowerCase()
    const isExactDuplicate = Boolean(normAmt && normName && normAmt === normName)

    let amount = rawAmt
    let name = rawName

    if (isExactDuplicate) {
        if (rawAmt.includes('+')) {
            name = rawAmt
            amount = ''
        } else {
            name = rawName
            amount = ''
        }
    }

    const parts = name.split(/\s(?=[\u4e00-\u9fa5])/)
    return {
        amount: amount ? (isFormula ? `🥣 ${amount}` : amount) : (isFormula ? '🥣 配方' : ''),
        nameLine1: parts[0] || name,
        nameLine2: parts.length >= 2 ? parts.slice(1).join(' ') : '',
        isFormula,
        isDuplicate: isExactDuplicate,
    }
}

/**
 * 构建确定性的 V3 矩阵布局。
 * - inputBlockIds 决定最低依赖层级；stageIndex 作为人工偏好列。
 * - 全局列占用表保证任何自动右移都不会再次覆盖其他阶段。
 * - 显式依赖继续生成可供领域审计使用的关系；默认视觉不再渲染连接线。
 */
export function buildV3MatrixLayout(recipe: VisualRecipeV3): V3MatrixLayoutResult {
    recipe = arrangeIngredientRows(recipe)
    const processingSets = getProcessingIngredientSets(recipe)
    const ingredients = recipe.ingredients || []
    const numRows = Math.max(ingredients.length, 1)
    const prerequisites = recipe.prerequisites || {}
    const hasContainer = Boolean(prerequisites.containerSize?.trim())
    const hasPreheat = Boolean(prerequisites.preheat?.trim())
    const headerLineCount = Number(hasContainer) + Number(hasPreheat)
    const hasHeader = headerLineCount > 0
    const headerHeight = headerLineCount === 2
        ? STRIP_ROW_HEIGHT * 2
        : headerLineCount === 1 ? STRIP_ROW_HEIGHT : 0
    const headerY = PADDING
    const contentStartY = PADDING + (hasHeader ? headerHeight : 0)

    const ingredientRowMap = new Map<string, number>()
    ingredients.forEach((ingredient, index) => ingredientRowMap.set(ingredient.id, index))

    const actionBlocks = recipe.actionBlocks || []
    const actionBlockMap = new Map(actionBlocks.map(block => [block.id, block]))
    const originalOrder = new Map(actionBlocks.map((block, index) => [block.id, index]))

    const blockRowMemo = new Map<string, { startRow: number; endRow: number }>()
    const visitingRows = new Set<string>()
    const getBlockRowSpan = (blockId: string): { startRow: number; endRow: number } => {
        const memo = blockRowMemo.get(blockId)
        if (memo !== undefined) return memo
        const block = actionBlockMap.get(blockId)
        if (!block) return { startRow: 0, endRow: 0 }
        if (visitingRows.has(blockId)) return { startRow: 0, endRow: 0 }

        visitingRows.add(blockId)
        const directRows = (block.ingredientIds || [])
            .map(id => ingredientRowMap.get(id))
            .filter((row): row is number => row !== undefined)

        const allRows = [...directRows]
        const materialInputIds = [
            ...(block.inputBlockIds || []),
            ...(block.dependencies?.filter(d => d.type === 'material').map(d => d.sourceBlockId) || [])
        ]
        const uniqueInputIds = [...new Set(materialInputIds)]
        uniqueInputIds.forEach(inId => {
            if (actionBlockMap.has(inId) && inId !== blockId) {
                const parentSpan = getBlockRowSpan(inId)
                allRows.push(parentSpan.startRow, parentSpan.endRow)
            }
        })

        // 隐式同锅流转支持：若当前块未声明显式物料或先后依赖，但与前一工序共享核心食材，自动承接其跨度
        const hasExplicitDependencies = (block.dependencies && block.dependencies.length > 0)
            || (block.inputBlockIds && block.inputBlockIds.length > 0)
            || (block.afterBlockIds && block.afterBlockIds.length > 0)
        if (!hasExplicitDependencies && uniqueInputIds.length === 0) {
            const currentIdx = originalOrder.get(blockId) ?? 0
            if (currentIdx > 0) {
                const prevBlock = actionBlocks[currentIdx - 1]
                if (prevBlock && (block.ingredientIds || []).some(id => (prevBlock.ingredientIds || []).includes(id))) {
                    if (actionBlockMap.has(prevBlock.id)) {
                        const parentSpan = getBlockRowSpan(prevBlock.id)
                        allRows.push(parentSpan.startRow, parentSpan.endRow)
                    }
                }
            }
        }
        visitingRows.delete(blockId)

        const startRow = allRows.length > 0 ? Math.min(...allRows) : 0
        const endRow = allRows.length > 0 ? Math.max(...allRows) : 0
        const res = { startRow, endRow }
        blockRowMemo.set(blockId, res)
        return res
    }

    function getUpstreamActionBlockIds(block: V3ActionBlock): string[] {
        const ids = new Set<string>()
        for (const d of block.dependencies || []) {
            if (d && d.sourceBlockId && d.sourceBlockId !== block.id) {
                ids.add(d.sourceBlockId)
            }
        }
        for (const id of block.inputBlockIds || []) {
            if (id && id !== block.id) {
                ids.add(id)
            }
        }
        for (const id of block.afterBlockIds || []) {
            if (id && id !== block.id) {
                ids.add(id)
            }
        }
        return [...ids]
    }

    const processedBlocks = actionBlocks.map(block => {
        const directRows = (block.ingredientIds || [])
            .map(id => ingredientRowMap.get(id))
            .filter((row): row is number => row !== undefined)
        const rowSpan = getBlockRowSpan(block.id)
        const hasUpstream = getUpstreamActionBlockIds(block).length > 0
        const isEmpty = directRows.length === 0 && !hasUpstream
        const rawStage = Number.isFinite(block.stageIndex) ? Math.floor(block.stageIndex) : 0

        return {
            block,
            stageIndex: Math.max(0, rawStage),
            startRow: isEmpty ? 0 : rowSpan.startRow,
            endRow: isEmpty ? 0 : rowSpan.endRow,
            isEmpty,
        }
    })
    const processedById = new Map(processedBlocks.map(item => [item.block.id, item]))

    // 依赖深度只提高最低列，不会把用户手动设置的更后阶段向左移动。
    const preferredColumnMemo = new Map<string, number>()
    const visiting = new Set<string>()
    const getPreferredColumn = (blockId: string): number => {
        const memo = preferredColumnMemo.get(blockId)
        if (memo !== undefined) return memo
        const item = processedById.get(blockId)
        if (!item) return 0
        if (visiting.has(blockId)) return item.stageIndex

        visiting.add(blockId)
        const upstreamIds = getUpstreamActionBlockIds(item.block)
        const dependencyColumns = upstreamIds
            .filter(id => id !== blockId && actionBlockMap.has(id))
            .map(id => getPreferredColumn(id) + 1)
        visiting.delete(blockId)

        const preferred = Math.max(item.stageIndex, ...dependencyColumns, 0)
        preferredColumnMemo.set(blockId, preferred)
        return preferred
    }
    actionBlocks.forEach(block => getPreferredColumn(block.id))

    type PlacedBlock = typeof processedBlocks[number] & { computedCol: number }
    const occupiedRanges = new Map<number, Array<{ startRow: number; endRow: number }>>()
    const placedById = new Map<string, PlacedBlock>()
    const collisionNotices: V3CollisionNotice[] = []

    const placementOrder = [...processedBlocks].sort((a, b) => {
        const preferredDiff = getPreferredColumn(a.block.id) - getPreferredColumn(b.block.id)
        if (preferredDiff !== 0) return preferredDiff
        const rowDiff = a.startRow - b.startRow
        if (rowDiff !== 0) return rowDiff
        return (originalOrder.get(a.block.id) || 0) - (originalOrder.get(b.block.id) || 0)
    })

    placementOrder.forEach(item => {
        const upstreamIds = getUpstreamActionBlockIds(item.block)
        const placedDependencyColumns = upstreamIds
            .map(id => placedById.get(id)?.computedCol)
            .filter((column): column is number => column !== undefined)
        const dependencyColumn = Math.max(
            getPreferredColumn(item.block.id),
            ...placedDependencyColumns.map(column => column + 1),
            0,
        )
        let targetColumn = dependencyColumn

        while ((occupiedRanges.get(targetColumn) || []).some(range =>
            rangesOverlap(item.startRow, item.endRow, range.startRow, range.endRow)
        )) {
            targetColumn += 1
        }

        if (targetColumn !== item.stageIndex) {
            collisionNotices.push({
                blockId: item.block.id,
                blockLabel: item.block.label || '新工序',
                originalStage: item.stageIndex,
                adjustedStage: targetColumn,
                reason: targetColumn > dependencyColumn ? 'collision' : 'dependency',
            })
        }

        const placed: PlacedBlock = { ...item, computedCol: targetColumn }
        placedById.set(item.block.id, placed)
        const ranges = occupiedRanges.get(targetColumn) || []
        ranges.push({ startRow: item.startRow, endRow: item.endRow })
        occupiedRanges.set(targetColumn, ranges)
    })

    const finalPlacedBlocks = actionBlocks
        .map(block => placedById.get(block.id))
        .filter((item): item is PlacedBlock => Boolean(item))
    const maxColumn = finalPlacedBlocks.reduce((max, item) => Math.max(max, item.computedCol), 0)
    const numActionCols = Math.max(maxColumn + 1, 1)

    const actionColWidths = new Array<number>(numActionCols).fill(MIN_ACTION_COL_WIDTH)
    const blockTextLines = new Map<string, { labelLines: string[]; sublabelLines: string[]; equipmentLines: string[]; guidanceLines: string[] }>()

    finalPlacedBlocks.forEach(item => {
        if (item.isEmpty) {
            blockTextLines.set(item.block.id, { labelLines: ['请选择相关食材'], sublabelLines: [], equipmentLines: [], guidanceLines: [] })
            return
        }
        const showSub = shouldRenderSublabel(recipe.cuisine, item.block.sublabel)
        const effectiveSublabel = showSub ? (item.block.sublabel || '') : ''

        const labelWidth = measureTextWidth(item.block.label || '', 13, true)
        const sublabelWidth = effectiveSublabel ? measureTextWidth(effectiveSublabel, 11, false) : 0
        const rawNote = (item.block.note || item.block.notes || '').trim()
        const cleanNote = rawNote.replace(/^(注[：:]|注意[：:]|要点[：:]|提示[：:])/g, '').trim()
        const noteWidth = cleanNote ? measureTextWidth(cleanNote.slice(0, 10), 10.5, false) : 0
        const heatText = `${item.block.heatLevel || ''} ${item.block.durationMinutes ? `${item.block.durationMinutes}m` : ''}`.trim()
        const heatWidth = measureTextWidth(heatText, 10, false)
        const equipmentWidth = measureTextWidth(item.block.equipment ? `器具 ${item.block.equipment}` : '', 10, false)
        const requiredWidth = Math.min(
            MAX_ACTION_COL_WIDTH,
            Math.max(MIN_ACTION_COL_WIDTH, Math.max(labelWidth, sublabelWidth, noteWidth, heatWidth, equipmentWidth) + 24),
        )
        actionColWidths[item.computedCol] = Math.max(actionColWidths[item.computedCol], requiredWidth)
    })

    finalPlacedBlocks.forEach(item => {
        const availableWidth = actionColWidths[item.computedCol] - 20
        const showSub = shouldRenderSublabel(recipe.cuisine, item.block.sublabel)
        const effectiveSublabel = showSub ? (item.block.sublabel || '') : ''

        blockTextLines.set(item.block.id, {
            labelLines: wrapTextToLines(item.block.label || '', availableWidth, 13, true),
            sublabelLines: effectiveSublabel ? wrapTextToLines(effectiveSublabel, availableWidth, 11, false) : [],
            equipmentLines: item.block.equipment
                ? wrapTextToLines(`器具 ${item.block.equipment}`, availableWidth, 10, false)
                : [],
            guidanceLines: [], // 操作长句退出单元格主视觉，保持绝对简约 (Cooking for Engineers 规范)
        })
    })

    let dynamicRowHeight = BASE_ROW_HEIGHT
    finalPlacedBlocks.forEach(item => {
        const lines = blockTextLines.get(item.block.id)
        if (!lines) return
        const hasHeat = Boolean(item.block.heatLevel || item.block.durationMinutes)
        const contentHeight = measureBlockContentHeight(lines, hasHeat)
        const span = Math.max(1, item.endRow - item.startRow + 1)
        dynamicRowHeight = Math.max(dynamicRowHeight, Math.ceil(contentHeight / span))
    })
    const rowHeight = dynamicRowHeight

    const actionColXOffsets = new Array<number>(numActionCols).fill(0)
    let currentX = PADDING + INGREDIENT_COL_WIDTH + GAP_X
    for (let column = 0; column < numActionCols; column += 1) {
        actionColXOffsets[column] = currentX
        currentX += actionColWidths[column] + GAP_X
    }

    // 记录每种食材首次被工序消耗的动作列索引，用于将食材行横向延伸贴合至该工序（Cooking for Engineers 纯表格规范）
    const ingredientFirstCol = new Map<string, number>()
    finalPlacedBlocks.forEach(item => {
        if (!item.block.ingredientIds) return
        item.block.ingredientIds.forEach(id => {
            const cur = ingredientFirstCol.get(id)
            if (cur === undefined || item.computedCol < cur) {
                ingredientFirstCol.set(id, item.computedCol)
            }
        })
    })

    const ingredientRows: V3LayoutRow[] = ingredients.map((ingredient, index) => {
        return {
            ingredient,
            rowIndex: index,
            x: PADDING,
            y: contentStartY + index * (rowHeight + GAP_Y),
            w: INGREDIENT_COL_WIDTH,
            h: rowHeight,
        }
    })

    const actionBlockLayouts: V3LayoutActionBlock[] = finalPlacedBlocks.map(item => {
        const startRow = Math.max(0, item.startRow)
        const endRow = Math.min(numRows - 1, Math.max(startRow, item.endRow))
        const spanRows = endRow - startRow + 1
        const lines = blockTextLines.get(item.block.id) || { labelLines: [item.block.label || ''], sublabelLines: [], equipmentLines: [], guidanceLines: [] }

        const envelopeY = contentStartY + startRow * rowHeight
        const envelopeH = spanRows * rowHeight

        const intakeRowYs = (item.block.ingredientIds || [])
            .map(id => ingredientRowMap.get(id))
            .filter((r): r is number => r !== undefined)
            .map(r => contentStartY + r * rowHeight + rowHeight / 2)

        // 结合直接食材行与上游物料半成品输入，准确定位工序卡片的纵向焦点，杜绝下沉错位
        const upstreamBlockIds = getMaterialUpstreamBlockIds(item.block)
        const upstreamYs: number[] = []
        upstreamBlockIds.forEach(upId => {
            const upItem = placedById.get(upId)
            if (upItem) {
                const upY = contentStartY + (upItem.startRow + (upItem.endRow - upItem.startRow) / 2) * rowHeight + rowHeight / 2
                upstreamYs.push(upY)
            }
        })
        const allInputYs = [...intakeRowYs, ...upstreamYs]

        const hasHeat = Boolean(item.block.heatLevel || item.block.durationMinutes)
        const contentH = measureBlockContentHeight(lines, hasHeat)
        const scopeRows = [...(processingSets.get(item.block.id) || [])]
            .map(id => ingredientRowMap.get(id)).filter((r): r is number => r !== undefined)
        const exactRegion = scopeRows.length === spanRows && scopeRows.every(r => r >= startRow && r <= endRow)
        const cardH = exactRegion ? envelopeH : Math.min(envelopeH, Math.max(rowHeight, contentH))

        let cardY = envelopeY
        if (envelopeH > cardH) {
            if (allInputYs.length > 0) {
                const avgInputY = allInputYs.reduce((a, b) => a + b, 0) / allInputYs.length
                cardY = Math.max(envelopeY, Math.min(envelopeY + envelopeH - cardH, Math.round(avgInputY - cardH / 2)))
            } else {
                cardY = envelopeY + Math.round((envelopeH - cardH) / 2)
            }
        }

        return {
            block: item.block,
            computedStartRow: startRow,
            computedEndRow: endRow,
            computedColIndex: item.computedCol,
            isEmptyPlaceholder: item.isEmpty,
            labelLines: lines.labelLines,
            sublabelLines: lines.sublabelLines,
            equipmentLines: lines.equipmentLines,
            guidanceLines: lines.guidanceLines,
            x: actionColXOffsets[item.computedCol],
            y: cardY,
            w: actionColWidths[item.computedCol],
            h: cardH,
            envelopeY,
            envelopeH,
            intakeRowYs,
            hasMultiRowIntake: spanRows > 1,
        }
    })

    const finalBlockLayout: V3LayoutFinalBlock = {
        finalBlock: recipe.finalBlock || {
            method: 'other',
            label: '完成方式待补充',
            instructions: '设定最终烹饪或装盘方式',
        },
        isPlaceholder: !recipe.finalBlock,
        instructionLines: [], // 操作长句退出单元格主视觉，保持绝对简约，详细指导保留在 Tooltip
        x: currentX,
        y: contentStartY,
        w: FINAL_COL_WIDTH,
        h: numRows * rowHeight,
    }

    const layoutById = new Map(actionBlockLayouts.map(layout => [layout.block.id, layout]))
    const explicitEdges = new Map<string, { sourceId: string; targetId: string; type: V3DependencyType; label?: string }>()
    const sourcesWithExplicitTargets = new Set<string>()

    actionBlocks.forEach(targetBlock => {
        if (targetBlock.dependencies && targetBlock.dependencies.length > 0) {
            for (const dep of targetBlock.dependencies) {
                if (!layoutById.has(dep.sourceBlockId) || dep.sourceBlockId === targetBlock.id) continue
                const key = `${dep.sourceBlockId}->${targetBlock.id}`
                explicitEdges.set(key, { sourceId: dep.sourceBlockId, targetId: targetBlock.id, type: dep.type, label: dep.label })
                sourcesWithExplicitTargets.add(dep.sourceBlockId)
            }
        } else {
            for (const srcId of targetBlock.afterBlockIds || []) {
                if (!layoutById.has(srcId) || srcId === targetBlock.id) continue
                const key = `${srcId}->${targetBlock.id}`
                explicitEdges.set(key, { sourceId: srcId, targetId: targetBlock.id, type: 'order' })
                sourcesWithExplicitTargets.add(srcId)
            }
            for (const srcId of targetBlock.inputBlockIds || []) {
                if (!layoutById.has(srcId) || srcId === targetBlock.id) continue
                const key = `${srcId}->${targetBlock.id}`
                if (!explicitEdges.has(key)) {
                    explicitEdges.set(key, { sourceId: srcId, targetId: targetBlock.id, type: 'legacy' })
                    sourcesWithExplicitTargets.add(srcId)
                }
            }
        }
    })

    const connectorLayouts: V3FlowConnectorLayout[] = []
    const addActionConnector = (
        source: V3LayoutActionBlock,
        target: V3LayoutActionBlock,
        explicit: boolean,
        depType?: V3DependencyType,
        label?: string,
        targetYOffset: number = 0
    ) => {
        let type: V3DependencyType = depType || (explicit ? 'legacy' : 'legacy')
        if (explicit && !depType) {
            const explicitDep = target.block.dependencies?.find(d => d.sourceBlockId === source.block.id)
            if (explicitDep) {
                type = explicitDep.type
                label = label || explicitDep.label
            } else if (target.block.afterBlockIds?.includes(source.block.id)) {
                type = 'order'
            } else if (target.block.inputBlockIds?.includes(source.block.id)) {
                type = 'legacy'
            }
        }

        const isOrder = type === 'order'
        const isMaterial = type === 'material'
        const { pathD, midPoint } = routeConnectorPath(source, target, actionBlockLayouts, contentStartY, targetYOffset)

        connectorLayouts.push({
            id: `flow-${source.block.id}-${target.block.id}`,
            sourceBlockId: source.block.id,
            targetBlockId: target.block.id,
            targetType: 'action',
            explicit,
            type,
            isOrder,
            isMaterial,
            label,
            pathD,
            midPoint,
        })
    }

    // 按目标工序聚合显式依赖，为多输入半成品分配独立接入高度端口
    const targetEdgeMap = new Map<string, Array<{ sourceId: string; targetId: string; type: V3DependencyType; label?: string }>>()
    explicitEdges.forEach(edge => {
        const list = targetEdgeMap.get(edge.targetId) || []
        list.push(edge)
        targetEdgeMap.set(edge.targetId, list)
    })

    targetEdgeMap.forEach((edges, targetId) => {
        const target = layoutById.get(targetId)
        if (!target) return

        const sorted = [...edges].sort((a, b) => {
            const sA = layoutById.get(a.sourceId)
            const sB = layoutById.get(b.sourceId)
            return (sA ? sA.y : 0) - (sB ? sB.y : 0)
        })

        sorted.forEach((edge, idx) => {
            const source = layoutById.get(edge.sourceId)
            if (!source) return
            let targetYOffset = 0
            if (sorted.length > 1) {
                const step = (target.h - 28) / (sorted.length - 1)
                targetYOffset = Math.round(14 + idx * step)
            }
            addActionConnector(source, target, true, edge.type, edge.label, targetYOffset)
        })
    })

    actionBlockLayouts.forEach(source => {
        if (sourcesWithExplicitTargets.has(source.block.id)) {
            return
        }

        const laterOverlapping = actionBlockLayouts.filter(target =>
            target.computedColIndex > source.computedColIndex
            && (target.block.inputBlockIds || []).length === 0
            && (target.block.dependencies || []).length === 0
            && (target.block.afterBlockIds || []).length === 0
            && rangesOverlap(
                source.computedStartRow,
                source.computedEndRow,
                target.computedStartRow,
                target.computedEndRow,
            )
        )
        const nextColumn = laterOverlapping.reduce(
            (min, target) => Math.min(min, target.computedColIndex),
            Number.POSITIVE_INFINITY,
        )
        const inferredTargets = laterOverlapping.filter(target => target.computedColIndex === nextColumn)

        if (inferredTargets.length > 0) {
            inferredTargets.forEach(target => addActionConnector(source, target, false, 'legacy'))
            return
        }

        connectorLayouts.push({
            id: `flow-${source.block.id}-final`,
            sourceBlockId: source.block.id,
            targetType: 'final',
            explicit: false,
            pathD: createConnectorPath(
                source.x + source.w,
                source.y + source.h / 2,
                finalBlockLayout.x,
                finalBlockLayout.y + finalBlockLayout.h / 2,
            ),
        })
    })

    // 1. 构建左侧食材未加工阶段的等待路径 (Waiting Paths)
    const ingredientWaitingPaths: V3IngredientWaitingPath[] = []
    const ingredientColRightX = PADDING + INGREDIENT_COL_WIDTH // 336

    ingredients.forEach((ing, rowIndex) => {
        const rowY = contentStartY + rowIndex * rowHeight + rowHeight / 2
        // 查找所有使用此食材的工序，按列排序
        const usingBlocks = actionBlockLayouts
            .filter(lb => (lb.block.ingredientIds || []).includes(ing.id))
            .sort((a, b) => a.computedColIndex - b.computedColIndex)

        if (usingBlocks.length > 0) {
            const firstBlock = usingBlocks[0]
            // 若首次使用该食材的工序晚于第 0 列 (即 firstBlock.x > 336)
            if (firstBlock.x > ingredientColRightX) {
                const pathD = routeWaitingPathWithAvoidance(
                    ingredientColRightX,
                    firstBlock.x,
                    rowY,
                    firstBlock.block.id,
                    actionBlockLayouts,
                    contentStartY
                )
                ingredientWaitingPaths.push({
                    id: `wait-${ing.id}-initial`,
                    ingredientId: ing.id,
                    rowIndex,
                    startX: ingredientColRightX,
                    endX: firstBlock.x,
                    startY: rowY,
                    targetBlockId: firstBlock.block.id,
                    isFinal: false,
                    pathD,
                })
            }
            // 分次追加：若后续还有工序使用此食材
            for (let i = 0; i < usingBlocks.length - 1; i++) {
                const curBlock = usingBlocks[i]
                const nextBlock = usingBlocks[i + 1]
                const curRight = curBlock.x + curBlock.w
                if (nextBlock.x > curRight) {
                    const pathD = routeWaitingPathWithAvoidance(
                        curRight,
                        nextBlock.x,
                        rowY,
                        nextBlock.block.id,
                        actionBlockLayouts,
                        contentStartY
                    )
                    ingredientWaitingPaths.push({
                        id: `wait-${ing.id}-step-${i + 1}`,
                        ingredientId: ing.id,
                        rowIndex,
                        startX: curRight,
                        endX: nextBlock.x,
                        startY: rowY,
                        targetBlockId: nextBlock.block.id,
                        isFinal: false,
                        pathD,
                    })
                }
            }
        } else {
            // 未在任何动作工序中消耗的食材，横向延伸至最终成品列
            if (finalBlockLayout.x > ingredientColRightX) {
                const pathD = routeWaitingPathWithAvoidance(
                    ingredientColRightX,
                    finalBlockLayout.x,
                    rowY,
                    undefined,
                    actionBlockLayouts,
                    contentStartY
                )
                ingredientWaitingPaths.push({
                    id: `wait-${ing.id}-final`,
                    ingredientId: ing.id,
                    rowIndex,
                    startX: ingredientColRightX,
                    endX: finalBlockLayout.x,
                    startY: rowY,
                    isFinal: true,
                    pathD,
                })
            }
        }
    })

    // 2. 构建食材接入点与不跨无关行的聚成分段导轨 (Intake Feeds & Non-swallowing Rail Segments)
    const ingredientIntakeFeeds: V3IngredientIntakeFeed[] = []
    const intakeRailSegments: V3IntakeRailSegment[] = []
    const ingredientConnectors: V3IngredientConnectorLayout[] = []

    actionBlockLayouts.forEach(layoutBlock => {
        const usedIngIds = layoutBlock.block.ingredientIds || []
        const participatingRows = usedIngIds
            .map(id => ({ id, row: ingredientRowMap.get(id) }))
            .filter((item): item is { id: string; row: number } => item.row !== undefined)
            .sort((a, b) => a.row - b.row)

        if (participatingRows.length === 0) return

        participatingRows.forEach(item => {
            const pinY = contentStartY + item.row * rowHeight + rowHeight / 2
            ingredientIntakeFeeds.push({
                id: `feed-${layoutBlock.block.id}-${item.id}`,
                ingredientId: item.id,
                blockId: layoutBlock.block.id,
                rowIndex: item.row,
                pinX: layoutBlock.x,
                pinY,
                feedStartX: layoutBlock.x - 8,
            })
            ingredientConnectors.push({
                id: `ing-${item.id}-${layoutBlock.block.id}`,
                ingredientId: item.id,
                targetBlockId: layoutBlock.block.id,
                sourceX: ingredientColRightX,
                sourceY: pinY,
                targetX: layoutBlock.x,
                targetY: pinY,
                pathD: `M ${layoutBlock.x - 8} ${pinY} L ${layoutBlock.x} ${pinY}`,
            })
        })

        // 对参与行聚类为连续段，杜绝单条实线吞并中间未参与食材行
        const clusters: number[][] = []
        let currentCluster: number[] = []
        participatingRows.forEach(item => {
            if (currentCluster.length === 0) {
                currentCluster.push(item.row)
            } else {
                const prev = currentCluster[currentCluster.length - 1]
                if (item.row === prev + 1) {
                    currentCluster.push(item.row)
                } else {
                    clusters.push(currentCluster)
                    currentCluster = [item.row]
                }
            }
        })
        if (currentCluster.length > 0) {
            clusters.push(currentCluster)
        }

        // 对聚类的每一簇食材绘制连续进料导轨，并延伸至工序卡片边界，杜绝孤立悬空点
        const cardTop = layoutBlock.y
        const cardBottom = layoutBlock.y + layoutBlock.h

        clusters.forEach((cluster, cIdx) => {
            const rowYs = cluster.map(r => contentStartY + r * rowHeight + rowHeight / 2)
            const minRowY = Math.min(...rowYs)
            const maxRowY = Math.max(...rowYs)

            let startY: number | null = null
            let endY: number | null = null

            if (maxRowY < cardTop) {
                // 簇完全在卡片上方：从最顶端食材行向下延伸至卡片顶边界
                startY = minRowY
                endY = cardTop
            } else if (minRowY > cardBottom) {
                // 簇完全在卡片下方：从卡片底边界向下延伸至最低食材行
                startY = cardBottom
                endY = maxRowY
            } else {
                // 簇与卡片纵向相交或处于卡片内部
                if (cluster.length > 1) {
                    startY = minRowY
                    endY = maxRowY
                    if (minRowY < cardTop) startY = minRowY
                    if (maxRowY > cardBottom) endY = maxRowY
                } else {
                    // 单行输入：若略微超出卡片边界，微调连接至卡片边缘
                    if (minRowY < cardTop) {
                        startY = minRowY
                        endY = cardTop
                    } else if (minRowY > cardBottom) {
                        startY = cardBottom
                        endY = minRowY
                    }
                }
            }

            if (startY !== null && endY !== null && Math.abs(endY - startY) > 0.5) {
                intakeRailSegments.push({
                    id: `rail-${layoutBlock.block.id}-c${cIdx}`,
                    blockId: layoutBlock.block.id,
                    x: layoutBlock.x,
                    startY,
                    endY,
                    participatingRowIndices: cluster,
                })
            }
        })
    })

    const gridLines: V3GridLine[] = []
    const totalMatrixWidth = finalBlockLayout.x + FINAL_COL_WIDTH - PADDING
    const totalMatrixHeight = numRows * rowHeight
    for (let index = 1; index < numRows; index += 1) {
        const y = contentStartY + index * rowHeight
        gridLines.push({ x1: PADDING, y1: y, x2: PADDING + totalMatrixWidth, y2: y })
    }
    for (let column = 0; column <= numActionCols; column += 1) {
        const x = column < numActionCols
            ? actionColXOffsets[column]
            : finalBlockLayout.x
        gridLines.push({
            x1: x,
            y1: contentStartY,
            x2: x,
            y2: contentStartY + totalMatrixHeight,
        })
    }

    return {
        canvasWidth: finalBlockLayout.x + finalBlockLayout.w + PADDING,
        canvasHeight: contentStartY + totalMatrixHeight + PADDING,
        hasHeader,
        hasContainer,
        hasPreheat,
        headerLineCount,
        headerHeight,
        headerY,
        contentStartY,
        ingredientRows,
        actionBlockLayouts,
        connectorLayouts,
        ingredientConnectors,
        ingredientWaitingPaths,
        ingredientIntakeFeeds,
        intakeRailSegments,
        actionColWidths,
        finalBlockLayout,
        gridLines,
        collisionNotices,
        numRows,
        numActionCols,
    }
}
