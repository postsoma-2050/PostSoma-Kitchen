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
    actionColWidths: number[]
    finalBlockLayout: V3LayoutFinalBlock
    gridLines: V3GridLine[]
    collisionNotices: V3CollisionNotice[]
    numRows: number
    numActionCols: number
}

// 布局常量参数
const BASE_ROW_HEIGHT = 46      // 默认基础每行食材高度 (px)
const GAP_Y = 2                 // 行与行之间的边框间距 (px)
const GAP_X = 2                 // 列与列之间的边框间距 (px)
const INGREDIENT_COL_WIDTH = 330// 左侧食材列宽度 (px)
const MIN_ACTION_COL_WIDTH = 115// 中间工序列最小下限宽度 (px)
const MAX_ACTION_COL_WIDTH = 200// 中间工序列最大上限宽度 (超越则自动折行) (px)
const FINAL_COL_WIDTH = 135     // 右侧最终烹饪列宽度 (px)
const PADDING = 16              // 外边距 (px)
const STRIP_ROW_HEIGHT = 28     // 顶栏每条 Strip 横栏高度 (px)

/**
 * 构建 V3 矩阵工序卡片布局 (支持上限列宽文本自动折行与行高自适应同步)
 */
export function buildV3MatrixLayout(recipe: VisualRecipeV3): V3MatrixLayoutResult {
    const ingredients = recipe.ingredients || []
    const numRows = Math.max(ingredients.length, 1)

    // 1. Header 高度计算
    const p = recipe.prerequisites || {}
    const hasContainer = Boolean(p.containerSize && p.containerSize.trim())
    const hasPreheat = Boolean(p.preheat && p.preheat.trim())
    
    const headerLineCount = (hasContainer ? 1 : 0) + (hasPreheat ? 1 : 0)
    const hasHeader = headerLineCount > 0
    const headerHeight = headerLineCount === 2 ? (STRIP_ROW_HEIGHT * 2 + GAP_Y) : (headerLineCount === 1 ? STRIP_ROW_HEIGHT : 0)
    const headerY = PADDING
    const contentStartY = PADDING + (hasHeader ? headerHeight + GAP_Y : 0)

    const ingredientRowMap = new Map<string, number>()
    ingredients.forEach((ing, index) => {
        ingredientRowMap.set(ing.id, index)
    })

    // 2. 自动推导 ActionBlock 的 startRowIndex 和 endRowIndex
    const actionBlocks = recipe.actionBlocks || []
    const processedBlocks = actionBlocks.map(block => {
        const ingIds = block.ingredientIds || []
        let startRow = 0
        let endRow = 0
        let isEmpty = false

        if (ingIds.length === 0) {
            isEmpty = true
            startRow = 0
            endRow = 0
        } else {
            const rows = ingIds
                .map(id => ingredientRowMap.get(id))
                .filter((r): r is number => r !== undefined)

            if (rows.length === 0) {
                isEmpty = true
                startRow = 0
                endRow = 0
            } else {
                startRow = Math.min(...rows)
                endRow = Math.max(...rows)
            }
        }

        return {
            block,
            stageIndex: block.stageIndex !== undefined ? block.stageIndex : 0,
            startRow,
            endRow,
            isEmpty
        }
    })

    // 3. 同阶段工序碰撞规避与平移
    const collisionNotices: V3CollisionNotice[] = []
    const stageMap = new Map<number, typeof processedBlocks>()
    processedBlocks.forEach(item => {
        const stage = item.stageIndex
        if (!stageMap.has(stage)) {
            stageMap.set(stage, [])
        }
        stageMap.get(stage)!.push(item)
    })

    const finalPlacedBlocks: Array<typeof processedBlocks[0] & { computedCol: number }> = []
    const sortedStages = Array.from(stageMap.keys()).sort((a, b) => a - b)

    sortedStages.forEach(stage => {
        const itemsInStage = stageMap.get(stage)!
        itemsInStage.sort((a, b) => a.startRow - b.startRow)

        let currentStageCol = stage
        let lastEndRow = -1

        itemsInStage.forEach(item => {
            let targetCol = item.stageIndex

            if (lastEndRow !== -1 && item.startRow <= lastEndRow) {
                targetCol = currentStageCol + 1
                currentStageCol = targetCol
                collisionNotices.push({
                    blockId: item.block.id,
                    blockLabel: item.block.label || '新工序',
                    originalStage: item.stageIndex,
                    adjustedStage: targetCol
                })
            } else {
                currentStageCol = targetCol
            }

            lastEndRow = item.endRow
            finalPlacedBlocks.push({
                ...item,
                computedCol: targetCol
            })
        })
    })

    let maxCol = 0
    finalPlacedBlocks.forEach(b => {
        if (b.computedCol > maxCol) maxCol = b.computedCol
    })

    const numActionCols = Math.max(maxCol + 1, 1)

    // 4. 计算工序列宽与文本自动折行 (受上限 MAX_ACTION_COL_WIDTH 约束)
    const actionColWidths: number[] = new Array(numActionCols).fill(MIN_ACTION_COL_WIDTH)
    const blockTextLines = new Map<string, { labelLines: string[]; sublabelLines: string[] }>()

    finalPlacedBlocks.forEach(item => {
        const col = item.computedCol
        if (item.isEmpty) {
            blockTextLines.set(item.block.id, { labelLines: ['请选择相关食材'], sublabelLines: [] })
            return
        }

        const b = item.block
        const labelW = measureTextWidth(b.label || '', 13, true)
        const sublabelW = measureTextWidth(b.sublabel || '', 11, false)
        const heatText = `${b.heatLevel || ''} ${b.durationMinutes ? `${b.durationMinutes}m` : ''}`.trim()
        const heatW = measureTextWidth(heatText, 10, false)

        const maxTextW = Math.max(labelW, sublabelW, heatW)
        const requiredColW = Math.min(MAX_ACTION_COL_WIDTH, Math.max(MIN_ACTION_COL_WIDTH, maxTextW + 24))

        if (requiredColW > actionColWidths[col]) {
            actionColWidths[col] = requiredColW
        }
    })

    // 根据最终确定的列宽，对超出宽度的文本进行折行
    finalPlacedBlocks.forEach(item => {
        const col = item.computedCol
        const availableTextW = actionColWidths[col] - 20
        const b = item.block

        const labelLines = wrapTextToLines(b.label || '', availableTextW, 13, true)
        const sublabelLines = wrapTextToLines(b.sublabel || '', availableTextW, 11, false)

        blockTextLines.set(b.id, { labelLines, sublabelLines })
    })

    // 5. 校验各单元格折行后的最小渲染高度，若超出则调整基础 ROW_HEIGHT
    let dynamicRowHeight = BASE_ROW_HEIGHT

    finalPlacedBlocks.forEach(item => {
        const linesInfo = blockTextLines.get(item.block.id)
        if (!linesInfo) return

        const labelCount = linesInfo.labelLines.length
        const sublabelCount = linesInfo.sublabelLines.length
        const hasHeat = Boolean(item.block.heatLevel || item.block.durationMinutes)

        // 估算折行后的文本高 (label每行15px, sublabel每行13px, heat 12px, 留边距20px)
        const contentH = (labelCount * 16) + (sublabelCount * 14) + (hasHeat ? 14 : 0) + 20
        const span = Math.max(1, item.endRow - item.startRow + 1)
        const neededPerSpanRow = Math.ceil(contentH / span)

        if (neededPerSpanRow > dynamicRowHeight) {
            dynamicRowHeight = neededPerSpanRow
        }
    })

    const ROW_H = dynamicRowHeight

    // 食材行物理坐标重构
    const ingredientRows: V3LayoutRow[] = ingredients.map((ing, idx) => {
        const y = contentStartY + idx * (ROW_H + GAP_Y)
        return {
            ingredient: ing,
            rowIndex: idx,
            x: PADDING,
            y,
            w: INGREDIENT_COL_WIDTH,
            h: ROW_H
        }
    })

    // 6. 计算工序列前缀 X 偏移与 ActionBlock 的坐标
    const actionColXOffsets: number[] = new Array(numActionCols).fill(0)
    let currentX = PADDING + INGREDIENT_COL_WIDTH + GAP_X

    for (let c = 0; c < numActionCols; c++) {
        actionColXOffsets[c] = currentX
        currentX += actionColWidths[c] + GAP_X
    }

    const actionBlockLayouts: V3LayoutActionBlock[] = finalPlacedBlocks.map(item => {
        const colIndex = item.computedCol
        const startRow = Math.max(0, item.startRow)
        const endRow = Math.min(numRows - 1, Math.max(startRow, item.endRow))
        const spanRows = endRow - startRow + 1

        const x = actionColXOffsets[colIndex]
        const y = contentStartY + startRow * (ROW_H + GAP_Y)
        const w = actionColWidths[colIndex]
        const h = spanRows * ROW_H + (spanRows - 1) * GAP_Y

        const linesInfo = blockTextLines.get(item.block.id) || { labelLines: [item.block.label || ''], sublabelLines: [] }

        return {
            block: item.block,
            computedStartRow: startRow,
            computedEndRow: endRow,
            computedColIndex: colIndex,
            isEmptyPlaceholder: item.isEmpty,
            labelLines: linesInfo.labelLines,
            sublabelLines: linesInfo.sublabelLines,
            x,
            y,
            w,
            h
        }
    })

    // 7. 计算 FinalBlock 终点列
    const finalX = currentX
    const finalY = contentStartY
    const finalW = FINAL_COL_WIDTH
    const finalH = numRows * ROW_H + (numRows - 1) * GAP_Y

    const isFinalPlaceholder = !recipe.finalBlock
    const finalBlockObj: V3FinalBlock = recipe.finalBlock || {
        method: 'other',
        label: '完成方式待补充',
        instructions: '设定最终烹饪或装盘方式'
    }

    const finalBlockLayout: V3LayoutFinalBlock = {
        finalBlock: finalBlockObj,
        isPlaceholder: isFinalPlaceholder,
        x: finalX,
        y: finalY,
        w: finalW,
        h: finalH
    }

    // 8. 计算底图网格线
    const gridLines: V3GridLine[] = []
    const totalMatrixW = (finalX + FINAL_COL_WIDTH) - PADDING
    const totalMatrixH = numRows * ROW_H + (numRows - 1) * GAP_Y

    for (let i = 1; i < numRows; i++) {
        const y = contentStartY + i * (ROW_H + GAP_Y) - GAP_Y / 2
        gridLines.push({
            x1: PADDING,
            y1: y,
            x2: PADDING + totalMatrixW,
            y2: y
        })
    }

    for (let c = 0; c <= numActionCols; c++) {
        const x = c < numActionCols ? actionColXOffsets[c] - GAP_X / 2 : finalX - GAP_X / 2
        gridLines.push({
            x1: x,
            y1: contentStartY,
            x2: x,
            y2: contentStartY + totalMatrixH
        })
    }

    const canvasWidth = finalX + finalW + PADDING
    const canvasHeight = contentStartY + totalMatrixH + PADDING

    return {
        canvasWidth,
        canvasHeight,
        hasHeader,
        hasContainer,
        hasPreheat,
        headerLineCount,
        headerHeight,
        headerY,
        contentStartY,
        ingredientRows,
        actionBlockLayouts,
        actionColWidths,
        finalBlockLayout,
        gridLines,
        collisionNotices,
        numRows,
        numActionCols
    }
}
