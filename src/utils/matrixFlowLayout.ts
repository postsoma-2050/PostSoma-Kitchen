import type { VisualRecipeV3, V3Ingredient, V3ActionBlock, V3FinalBlock } from '@/types/recipeV3'
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
    x: number
    y: number
    w: number
    h: number
}

export interface V3LayoutFinalBlock {
    finalBlock: V3FinalBlock
    isPlaceholder: boolean
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

export interface V3FlowConnectorLayout {
    id: string
    sourceBlockId: string
    targetBlockId?: string
    targetType: 'action' | 'final'
    explicit: boolean
    pathD: string
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
    actionColWidths: number[]
    finalBlockLayout: V3LayoutFinalBlock
    gridLines: V3GridLine[]
    collisionNotices: V3CollisionNotice[]
    numRows: number
    numActionCols: number
}

const BASE_ROW_HEIGHT = 46
const GAP_Y = 2
// 仅保留卡片之间的 16px 阅读留白；不再为连接箭头预留通道。
const GAP_X = 16
const INGREDIENT_COL_WIDTH = 330
const MIN_ACTION_COL_WIDTH = 115
const MAX_ACTION_COL_WIDTH = 200
const FINAL_COL_WIDTH = 135
const PADDING = 16
const STRIP_ROW_HEIGHT = 28

function rangesOverlap(startA: number, endA: number, startB: number, endB: number): boolean {
    return startA <= endB && startB <= endA
}

function createConnectorPath(startX: number, startY: number, endX: number, endY: number): string {
    const controlOffset = Math.max(10, (endX - startX) * 0.45)
    return `M ${startX} ${startY} C ${startX + controlOffset} ${startY}, ${endX - controlOffset} ${endY}, ${endX} ${endY}`
}

/**
 * 构建确定性的 V3 矩阵布局。
 * - inputBlockIds 决定最低依赖层级；stageIndex 作为人工偏好列。
 * - 全局列占用表保证任何自动右移都不会再次覆盖其他阶段。
 * - 显式依赖继续生成可供领域审计使用的关系；默认视觉不再渲染连接线。
 */
export function buildV3MatrixLayout(recipe: VisualRecipeV3): V3MatrixLayoutResult {
    const ingredients = recipe.ingredients || []
    const numRows = Math.max(ingredients.length, 1)
    const prerequisites = recipe.prerequisites || {}
    const hasContainer = Boolean(prerequisites.containerSize?.trim())
    const hasPreheat = Boolean(prerequisites.preheat?.trim())
    const headerLineCount = Number(hasContainer) + Number(hasPreheat)
    const hasHeader = headerLineCount > 0
    const headerHeight = headerLineCount === 2
        ? STRIP_ROW_HEIGHT * 2 + GAP_Y
        : headerLineCount === 1 ? STRIP_ROW_HEIGHT : 0
    const headerY = PADDING
    const contentStartY = PADDING + (hasHeader ? headerHeight + GAP_Y : 0)

    const ingredientRowMap = new Map<string, number>()
    ingredients.forEach((ingredient, index) => ingredientRowMap.set(ingredient.id, index))

    const actionBlocks = recipe.actionBlocks || []
    const actionBlockMap = new Map(actionBlocks.map(block => [block.id, block]))
    const originalOrder = new Map(actionBlocks.map((block, index) => [block.id, index]))

    const processedBlocks = actionBlocks.map(block => {
        const rows = (block.ingredientIds || [])
            .map(id => ingredientRowMap.get(id))
            .filter((row): row is number => row !== undefined)
        const isEmpty = rows.length === 0
        const rawStage = Number.isFinite(block.stageIndex) ? Math.floor(block.stageIndex) : 0

        return {
            block,
            stageIndex: Math.max(0, rawStage),
            startRow: isEmpty ? 0 : Math.min(...rows),
            endRow: isEmpty ? 0 : Math.max(...rows),
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
        const dependencyColumns = (item.block.inputBlockIds || [])
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
        const placedDependencyColumns = (item.block.inputBlockIds || [])
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
    const blockTextLines = new Map<string, { labelLines: string[]; sublabelLines: string[]; equipmentLines: string[] }>()

    finalPlacedBlocks.forEach(item => {
        if (item.isEmpty) {
            blockTextLines.set(item.block.id, { labelLines: ['请选择相关食材'], sublabelLines: [], equipmentLines: [] })
            return
        }
        const labelWidth = measureTextWidth(item.block.label || '', 13, true)
        const sublabelWidth = measureTextWidth(item.block.sublabel || '', 11, false)
        const heatText = `${item.block.heatLevel || ''} ${item.block.durationMinutes ? `${item.block.durationMinutes}m` : ''}`.trim()
        const heatWidth = measureTextWidth(heatText, 10, false)
        const equipmentWidth = measureTextWidth(item.block.equipment ? `器具 ${item.block.equipment}` : '', 10, false)
        const requiredWidth = Math.min(
            MAX_ACTION_COL_WIDTH,
            Math.max(MIN_ACTION_COL_WIDTH, Math.max(labelWidth, sublabelWidth, heatWidth, equipmentWidth) + 24),
        )
        actionColWidths[item.computedCol] = Math.max(actionColWidths[item.computedCol], requiredWidth)
    })

    finalPlacedBlocks.forEach(item => {
        const availableWidth = actionColWidths[item.computedCol] - 20
        blockTextLines.set(item.block.id, {
            labelLines: wrapTextToLines(item.block.label || '', availableWidth, 13, true),
            sublabelLines: wrapTextToLines(item.block.sublabel || '', availableWidth, 11, false),
            equipmentLines: item.block.equipment
                ? wrapTextToLines(`器具 ${item.block.equipment}`, availableWidth, 10, false)
                : [],
        })
    })

    let dynamicRowHeight = BASE_ROW_HEIGHT
    finalPlacedBlocks.forEach(item => {
        const lines = blockTextLines.get(item.block.id)
        if (!lines) return
        const hasHeat = Boolean(item.block.heatLevel || item.block.durationMinutes)
        const contentHeight = lines.labelLines.length * 16
            + lines.sublabelLines.length * 14
            + (hasHeat ? 14 : 0)
            + lines.equipmentLines.length * 13
            + 20
        const span = Math.max(1, item.endRow - item.startRow + 1)
        dynamicRowHeight = Math.max(dynamicRowHeight, Math.ceil(contentHeight / span))
    })
    const rowHeight = dynamicRowHeight

    const ingredientRows: V3LayoutRow[] = ingredients.map((ingredient, index) => ({
        ingredient,
        rowIndex: index,
        x: PADDING,
        y: contentStartY + index * (rowHeight + GAP_Y),
        w: INGREDIENT_COL_WIDTH,
        h: rowHeight,
    }))

    const actionColXOffsets = new Array<number>(numActionCols).fill(0)
    let currentX = PADDING + INGREDIENT_COL_WIDTH + GAP_X
    for (let column = 0; column < numActionCols; column += 1) {
        actionColXOffsets[column] = currentX
        currentX += actionColWidths[column] + GAP_X
    }

    const actionBlockLayouts: V3LayoutActionBlock[] = finalPlacedBlocks.map(item => {
        const startRow = Math.max(0, item.startRow)
        const endRow = Math.min(numRows - 1, Math.max(startRow, item.endRow))
        const spanRows = endRow - startRow + 1
        const lines = blockTextLines.get(item.block.id) || { labelLines: [item.block.label || ''], sublabelLines: [], equipmentLines: [] }
        return {
            block: item.block,
            computedStartRow: startRow,
            computedEndRow: endRow,
            computedColIndex: item.computedCol,
            isEmptyPlaceholder: item.isEmpty,
            labelLines: lines.labelLines,
            sublabelLines: lines.sublabelLines,
            equipmentLines: lines.equipmentLines,
            x: actionColXOffsets[item.computedCol],
            y: contentStartY + startRow * (rowHeight + GAP_Y),
            w: actionColWidths[item.computedCol],
            h: spanRows * rowHeight + (spanRows - 1) * GAP_Y,
        }
    })

    const finalBlockLayout: V3LayoutFinalBlock = {
        finalBlock: recipe.finalBlock || {
            method: 'other',
            label: '完成方式待补充',
            instructions: '设定最终烹饪或装盘方式',
        },
        isPlaceholder: !recipe.finalBlock,
        x: currentX,
        y: contentStartY,
        w: FINAL_COL_WIDTH,
        h: numRows * rowHeight + (numRows - 1) * GAP_Y,
    }

    const layoutById = new Map(actionBlockLayouts.map(layout => [layout.block.id, layout]))
    const explicitTargetsBySource = new Map<string, string[]>()
    actionBlocks.forEach(targetBlock => {
        for (const sourceId of targetBlock.inputBlockIds || []) {
            if (!layoutById.has(sourceId) || sourceId === targetBlock.id) continue
            const targets = explicitTargetsBySource.get(sourceId) || []
            if (!targets.includes(targetBlock.id)) targets.push(targetBlock.id)
            explicitTargetsBySource.set(sourceId, targets)
        }
    })

    const connectorLayouts: V3FlowConnectorLayout[] = []
    const addActionConnector = (source: V3LayoutActionBlock, target: V3LayoutActionBlock, explicit: boolean) => {
        connectorLayouts.push({
            id: `flow-${source.block.id}-${target.block.id}`,
            sourceBlockId: source.block.id,
            targetBlockId: target.block.id,
            targetType: 'action',
            explicit,
            pathD: createConnectorPath(
                source.x + source.w,
                source.y + source.h / 2,
                target.x,
                target.y + target.h / 2,
            ),
        })
    }

    actionBlockLayouts.forEach(source => {
        const explicitTargetIds = explicitTargetsBySource.get(source.block.id) || []
        const explicitTargets = explicitTargetIds
            .map(id => layoutById.get(id))
            .filter((target): target is V3LayoutActionBlock => Boolean(target))

        if (explicitTargets.length > 0) {
            explicitTargets.forEach(target => addActionConnector(source, target, true))
            return
        }

        const laterOverlapping = actionBlockLayouts.filter(target =>
            target.computedColIndex > source.computedColIndex
            && (target.block.inputBlockIds || []).length === 0
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
            inferredTargets.forEach(target => addActionConnector(source, target, false))
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

    const gridLines: V3GridLine[] = []
    const totalMatrixWidth = finalBlockLayout.x + FINAL_COL_WIDTH - PADDING
    const totalMatrixHeight = numRows * rowHeight + (numRows - 1) * GAP_Y
    for (let index = 1; index < numRows; index += 1) {
        const y = contentStartY + index * (rowHeight + GAP_Y) - GAP_Y / 2
        gridLines.push({ x1: PADDING, y1: y, x2: PADDING + totalMatrixWidth, y2: y })
    }
    for (let column = 0; column <= numActionCols; column += 1) {
        const x = column < numActionCols
            ? actionColXOffsets[column] - GAP_X / 2
            : finalBlockLayout.x - GAP_X / 2
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
        actionColWidths,
        finalBlockLayout,
        gridLines,
        collisionNotices,
        numRows,
        numActionCols,
    }
}
