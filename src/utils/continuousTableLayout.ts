import { arrangeIngredientRows } from './ingredientDisplayOrder'
import type { VisualRecipeV3, V3Ingredient, V3ActionBlock, V3FinalBlock } from '@/types/recipeV3'
import { measureTextWidth, wrapTextToLines } from './textMeasurement'

export interface TableLayoutIngredientCell {
  ingredient: V3Ingredient
  rowIndex: number
  x: number
  y: number
  w: number
  h: number
  amountText: string
  nameText: string
  prepText?: string
}

export interface TableLayoutProcessCell {
  id: string
  block?: V3ActionBlock
  isFinalBlock?: boolean
  finalBlock?: V3FinalBlock
  startRow: number
  endRow: number
  spanRows: number
  colIndex: number
  x: number
  y: number
  w: number
  h: number
  label: string
  sublabel?: string
  heatLevel?: string
  durationText?: string
  equipment?: string
  labelLines: string[]
  sublabelLines: string[]
  isHoldAside?: boolean
  holdAsideLabel?: string
  // 语义化烹饪事实展示
  incomingMaterials?: string[]     // 承接的上游产物 (如 ["焯透五花肉"])
  incomingMaterialLines?: string[] // 承接物料折行文本
  newIngredients?: string[]        // 本步新加入食材名称 (如 ["白糖", "植物油"])
  newIngredientLines?: string[]    // 新放入食材折行文本
  completionState?: string        // 关键操作指导 / 达成准出状态
  outputItem?: string             // 本步产出半成品 (如 "焯透五花肉")
  stateLines?: string[]           // 达成状态折行文本
}

export interface TableLayoutWaitingLane {
  ingredientId: string
  rowIndex: number
  colIndex: number
  x: number
  y: number
  w: number
  h: number
  isJoinTarget?: boolean          // 是否在下一个阶段入锅
  joinLabel?: string             // 入锅提示文字 (如 "+ 入锅 ➔")
}

export interface TableLayoutHoldAsideBridge {
  id: string
  sourceBlockId: string
  targetBlockId: string
  startRow: number
  endRow: number
  fromCol: number
  toCol: number
  x: number
  y: number
  w: number
  h: number
  label: string
}

export interface TableHeaderLayout {
  hasHeader: boolean
  hasContainer: boolean
  hasPreheat: boolean
  containerText?: string
  preheatText?: string
  headerHeight: number
  headerY: number
}

export interface ContinuousTableLayoutResult {
  mode: 'continuous-table'
  canvasWidth: number
  canvasHeight: number
  header: TableHeaderLayout
  ingredientColWidth: number
  actionColWidths: number[]
  finalColWidth: number
  rowHeights: number[]
  rowYPositions: number[]
  ingredientCells: TableLayoutIngredientCell[]
  processCells: TableLayoutProcessCell[]
  waitingLanes: TableLayoutWaitingLane[]
  holdAsideBridges: TableLayoutHoldAsideBridge[]
  horizontalLines: Array<{ x1: number; y1: number; x2: number; y2: number }>
  verticalLines: Array<{ x1: number; y1: number; x2: number; y2: number }>
  outerRect: { x: number; y: number; w: number; h: number }
  displayIngredients: V3Ingredient[]
}

export interface TableLayoutOptions {
  padding?: number
  minRowHeight?: number
  minColWidth?: number
}

/**
 * 提取工序的所有上游工序 ID (从权威 dependencies 优先读取，兼容 inputBlockIds/afterBlockIds)
 */
export function getUpstreamBlockIds(block: V3ActionBlock): string[] {
  const ids = new Set<string>()
  for (const d of block.dependencies || []) {
    if (d && d.sourceBlockId && d.sourceBlockId !== block.id) {
      ids.add(d.sourceBlockId)
    }
  }
  for (const id of block.inputBlockIds || []) {
    if (id && id !== block.id) ids.add(id)
  }
  for (const id of block.afterBlockIds || []) {
    if (id && id !== block.id) ids.add(id)
  }
  return [...ids]
}

/**
 * 提取工序的物料流向上游工序 ID (严格仅接受已确认的 material 边，排除纯 order 等待边与未确认 legacy 边)
 */
export function getMaterialUpstreamIds(block: V3ActionBlock): string[] {
  if (Array.isArray(block.dependencies) && block.dependencies.length > 0) {
    return block.dependencies
      .filter(d => d && typeof d === 'object' && d.type === 'material' && typeof d.sourceBlockId === 'string' && d.sourceBlockId.trim() !== '' && d.sourceBlockId !== block.id && !(d as any).targetBlockId)
      .map(d => d.sourceBlockId.trim())
  }
  return []
}

/**
 * 检验食谱是否适合以“连续工序表”展现
 * 准入硬性约束：
 * 1. 参与汇合的依赖必须明确为物料边 (material)，严禁以 legacy 未确认依赖假定汇合，且严禁格式错误条目；
 * 2. 输入食材行必须严格连续 (span === rows.length)，严禁跳行或隐式夹带中间原料；
 * 3. 同一阶段/列内的各个工序，其食材行范围不得相互重叠冲突；
 * 4. 暂存备用跨列走廊在中间阶段必须有畅通无阻的空闲通道。
 */
export function canRenderContinuousTable(recipe: VisualRecipeV3): { canRender: boolean; reason?: string } {
  if (!recipe || !recipe.ingredients || recipe.ingredients.length === 0) {
    return { canRender: false, reason: '缺少食材清单' }
  }
  if (!recipe.actionBlocks || recipe.actionBlocks.length === 0) {
    return { canRender: false, reason: '缺少工序步骤' }
  }

  // 1. 严格校验依赖类型与格式：严禁非法/格式错误依赖或未确认语义的 legacy 依赖直接进入连续工序表
  for (const block of recipe.actionBlocks) {
    for (const dep of block.dependencies || []) {
      if (!dep || typeof dep !== 'object' || !dep.sourceBlockId || typeof dep.sourceBlockId !== 'string' || dep.sourceBlockId.trim() === '' || (dep as any).targetBlockId !== undefined) {
        return {
          canRender: false,
          reason: `工序 "${block.label || block.id}" 包含格式错误或无效的依赖声明`,
        }
      }
      if (dep.type === 'legacy') {
        return {
          canRender: false,
          reason: `工序 "${block.label || block.id}" 包含未确认语义的旧式依赖 (legacy)，需先明确为物料流 (material) 或先后次序 (order)`,
        }
      }
    }
    // 若未声明 dependencies 却存在旧式 inputBlockIds，需提示先标准化
    if ((!block.dependencies || block.dependencies.length === 0) && (block.inputBlockIds && block.inputBlockIds.length > 0)) {
      return {
        canRender: false,
        reason: `工序 "${block.label || block.id}" 包含未确认物料关系的旧式依赖 (inputBlockIds)，需先标准化依赖类型`,
      }
    }
  }

  // 食材行映射
  const ingredientRowMap = new Map<string, number>()
  recipe.ingredients.forEach((ing, index) => {
    ingredientRowMap.set(ing.id, index)
  })

  // 拓扑阶段与列映射
  const blockMap = new Map(recipe.actionBlocks.map(b => [b.id, b]))
  const blockColMemo = new Map<string, number>()
  const visitingCol = new Set<string>()

  function getBlockCol(blockId: string): number {
    if (blockColMemo.has(blockId)) return blockColMemo.get(blockId)!
    if (visitingCol.has(blockId)) return 0
    visitingCol.add(blockId)

    const block = blockMap.get(blockId)
    if (!block) return 0

    const upColList = getUpstreamBlockIds(block)
      .filter(id => blockMap.has(id))
      .map(id => getBlockCol(id) + 1)

    visitingCol.delete(blockId)
    const stage = Number.isFinite(block.stageIndex) ? Math.max(0, Math.floor(block.stageIndex)) : 0
    const finalCol = Math.max(stage, ...upColList, 0)
    blockColMemo.set(blockId, finalCol)
    return finalCol
  }

  recipe.actionBlocks.forEach(b => getBlockCol(b.id))

  // 递归计算每个工序涉及的食材行集合 (直接原料 + 严格 material 上游)
  const memoRows = new Map<string, number[]>()
  const visitingRows = new Set<string>()

  function getBlockRows(blockId: string): number[] {
    if (memoRows.has(blockId)) return memoRows.get(blockId)!
    if (visitingRows.has(blockId)) return []
    visitingRows.add(blockId)

    const block = blockMap.get(blockId)
    if (!block) return []

    const rows = new Set<number>()
    // 直接关联食材
    for (const id of block.ingredientIds || []) {
      const r = ingredientRowMap.get(id)
      if (r !== undefined) rows.add(r)
    }
    // 上游物料延续 (仅限 material)
    for (const upId of getMaterialUpstreamIds(block)) {
      for (const r of getBlockRows(upId)) {
        rows.add(r)
      }
    }

    visitingRows.delete(blockId)
    const sorted = [...rows].sort((a, b) => a - b)
    memoRows.set(blockId, sorted)
    return sorted
  }

  // 2. 严格连续性检查：覆盖跨度必须完全等于实际参与食材数，严禁跳行或隐式吸收无关行
  for (const block of recipe.actionBlocks) {
    const rows = getBlockRows(block.id)
    if (rows.length === 0) {
      return {
        canRender: false,
        reason: `工序 "${block.label}" 未关联任何食材或上游物料，无法确定表格行位`,
      }
    }
    const minR = rows[0]
    const maxR = rows[rows.length - 1]
    const span = maxR - minR + 1

    if (span !== rows.length) {
      const missing: number[] = []
      for (let r = minR; r <= maxR; r++) {
        if (!rows.includes(r)) missing.push(r + 1)
      }
      return {
        canRender: false,
        reason: `工序 "${block.label}" 的食材行不连续 (涉及行: ${rows.map(r => r + 1).join(', ')}，跳过第 ${missing.join(', ')} 行食材)，无法以连续合并表格表达`,
      }
    }
  }

  // 3. 严格同阶段区域防冲突检查：同一列内的工序绝对禁止占用相同食材行
  const colBlocksMap = new Map<number, V3ActionBlock[]>()
  for (const block of recipe.actionBlocks) {
    const col = getBlockCol(block.id)
    if (!colBlocksMap.has(col)) colBlocksMap.set(col, [])
    colBlocksMap.get(col)!.push(block)
  }

  for (const [col, blocksInCol] of colBlocksMap.entries()) {
    const rowOccupant = new Map<number, V3ActionBlock>()
    for (const block of blocksInCol) {
      const rows = getBlockRows(block.id)
      for (const r of rows) {
        if (rowOccupant.has(r)) {
          const other = rowOccupant.get(r)!
          return {
            canRender: false,
            reason: `工序 "${other.label}" 与工序 "${block.label}" 在第 ${col + 1} 阶段存在行冲突 (均占用第 ${r + 1} 行食材)，实体重叠，已切换分支流程图`,
          }
        }
        rowOccupant.set(r, block)
      }
    }
  }

  // 4. 暂存备用跨列走廊防阻断检查
  for (const block of recipe.actionBlocks) {
    const isHoldAside = Boolean(
      block.notes?.includes('盛出') ||
      block.label?.includes('盛出') ||
      (recipe.actionBlocks.some(other => {
        const upIds = getMaterialUpstreamIds(other)
        const afterIds = other.afterBlockIds || []
        return upIds.includes(block.id) && afterIds.length > 0 && getBlockCol(other.id) > getBlockCol(block.id) + 1
      }))
    )
    if (isHoldAside) {
      const sourceCol = getBlockCol(block.id)
      const downstream = recipe.actionBlocks.find(target => {
        return getMaterialUpstreamIds(target).includes(block.id)
      })
      if (downstream) {
        const targetCol = getBlockCol(downstream.id)
        if (targetCol > sourceCol + 1) {
          const sourceRows = getBlockRows(block.id)
          const sourceStartRow = sourceRows[0]
          const sourceEndRow = sourceRows[sourceRows.length - 1]

          // 检查跨越列中是否有完全封死走廊的工序
          for (let c = sourceCol + 1; c < targetCol; c++) {
            const blocksInCol = colBlocksMap.get(c) || []
            let hasFreeRow = false
            for (let r = sourceStartRow; r <= sourceEndRow; r++) {
              const blocked = blocksInCol.some(b => {
                const bRows = getBlockRows(b.id)
                return bRows.includes(r)
              })
              if (!blocked) {
                hasFreeRow = true
                break
              }
            }
            if (!hasFreeRow) {
              return {
                canRender: false,
                reason: `工序 "${block.label}" 的暂存回锅通道在第 ${c + 1} 阶段被其他工序完全阻挡，无法无损穿透`,
              }
            }
          }
        }
      }
    }
  }

  return { canRender: true }
}

/**
 * 统一解析食谱最终排版模式：
 * 任何显式或隐式请求 'table' 的场景，都必须经过 canRenderContinuousTable 准入校验；
 * 不合格食谱即使显式请求 'table'，页面组件与导出也必须安全降级为 'flow' 分支流程图模式。
 */
export function canRenderArrangedTable(recipe: VisualRecipeV3): { canRender: boolean; reason?: string } {
  return canRenderContinuousTable(arrangeIngredientRows(recipe))
}

export function resolveLayoutMode(
  recipe: VisualRecipeV3,
  requestedMode: 'auto' | 'table' | 'flow' = 'auto'
): 'table' | 'flow' {
  if (!recipe) return 'flow'
  if (requestedMode === 'flow') return 'flow'
  return canRenderArrangedTable(recipe).canRender ? 'table' : 'flow'
}

/**
 * 构建连续工序表布局数据 (Continuous Process Table Layout Engine)
 */
export function buildV3ContinuousTableLayout(
  recipe: VisualRecipeV3,
  options: TableLayoutOptions = {}
): ContinuousTableLayoutResult {
  recipe = arrangeIngredientRows(recipe)
  const padding = options.padding ?? 16
  const minRowH = options.minRowHeight ?? 44
  const minActionColW = options.minColWidth ?? 124

  const ingredients = recipe.ingredients || []
  const actionBlocks = recipe.actionBlocks || []
  const finalBlock = recipe.finalBlock
  const renderFinalAsProcess = Boolean(finalBlock && finalBlock.role !== 'outcome')

  const ingredientRowMap = new Map<string, number>()
  ingredients.forEach((ing, index) => {
    ingredientRowMap.set(ing.id, index)
  })

  // 1. 拆分原料名称与预备说明
  const parsedIngredients = ingredients.map(ing => {
    let nameText = ing.name.trim()
    let prepText: string | undefined = undefined
    const parenMatch = nameText.match(/^(.*?)\s*([（(].*?[）)])$/)
    if (parenMatch) {
      nameText = parenMatch[1].trim()
      prepText = parenMatch[2].trim()
    }
    let amountText = (ing.amountText || '').trim()
    // 防御抑制：如果 amountText 与 nameText 存在包含/重复，避免页面渲染出 "10g 泡椒 泡椒" 两次
    if (amountText && nameText && amountText.includes(nameText)) {
      amountText = amountText.replace(nameText, '').trim()
    }
    return {
      ingredient: ing,
      amountText,
      nameText,
      prepText,
    }
  })

  // 2. 测量原料列宽与行高
  let maxIngTextW = 0
  const rowHeights = ingredients.map((_, idx) => {
    const item = parsedIngredients[idx]
    const amountW = measureTextWidth(item.amountText, 12, true)
    const nameW = measureTextWidth(item.nameText, 12, false)
    const prepW = item.prepText ? measureTextWidth(item.prepText, 11, false) : 0
    const totalW = amountW + (amountW ? 8 : 0) + nameW + (prepW ? 6 : 0) + prepW
    if (totalW > maxIngTextW) maxIngTextW = totalW
    return minRowH
  })

  const ingredientColWidth = Math.max(220, Math.min(360, maxIngTextW + 36))

  // 3. 拓扑列划分与物料延续推导
  const blockMap = new Map(actionBlocks.map(b => [b.id, b]))

  // 计算依赖列号 (保证下游列严格大于所有上游列)
  const blockColMemo = new Map<string, number>()
  const visitingCol = new Set<string>()

  function getBlockCol(blockId: string): number {
    if (blockColMemo.has(blockId)) return blockColMemo.get(blockId)!
    if (visitingCol.has(blockId)) return 0
    visitingCol.add(blockId)

    const block = blockMap.get(blockId)
    if (!block) return 0

    const upColList = getUpstreamBlockIds(block)
      .filter(id => blockMap.has(id))
      .map(id => getBlockCol(id) + 1)

    visitingCol.delete(blockId)
    const stage = Number.isFinite(block.stageIndex) ? Math.max(0, Math.floor(block.stageIndex)) : 0
    const finalCol = Math.max(stage, ...upColList, 0)
    blockColMemo.set(blockId, finalCol)
    return finalCol
  }

  actionBlocks.forEach(b => getBlockCol(b.id))

  // 获取各工序关联食材行
  const blockRowMemo = new Map<string, { startRow: number; endRow: number; rows: number[] }>()
  const visitingRows = new Set<string>()

  function getBlockRowCoverage(blockId: string): { startRow: number; endRow: number; rows: number[] } {
    if (blockRowMemo.has(blockId)) return blockRowMemo.get(blockId)!
    if (visitingRows.has(blockId)) return { startRow: 0, endRow: 0, rows: [] }
    visitingRows.add(blockId)

    const block = blockMap.get(blockId)
    if (!block) return { startRow: 0, endRow: 0, rows: [] }

    const set = new Set<number>()
    for (const id of block.ingredientIds || []) {
      const r = ingredientRowMap.get(id)
      if (r !== undefined) set.add(r)
    }

    for (const upId of getMaterialUpstreamIds(block)) {
      const up = getBlockRowCoverage(upId)
      for (const r of up.rows) set.add(r)
    }

    visitingRows.delete(blockId)
    const rows = [...set].sort((a, b) => a - b)
    const startRow = rows.length > 0 ? rows[0] : 0
    const endRow = rows.length > 0 ? rows[rows.length - 1] : 0
    const res = { startRow, endRow, rows }
    blockRowMemo.set(blockId, res)
    return res
  }

  // 计算每列包含的工序
  const colBlocksMap = new Map<number, V3ActionBlock[]>()
  actionBlocks.forEach(b => {
    const c = getBlockCol(b.id)
    if (!colBlocksMap.has(c)) colBlocksMap.set(c, [])
    colBlocksMap.get(c)!.push(b)
  })

  // 如果阶段列号之间有空隙，重新压缩列号为 0..M-1
  const sortedCols = [...colBlocksMap.keys()].sort((a, b) => a - b)
  const colIndexRemap = new Map<number, number>()
  sortedCols.forEach((oldCol, newCol) => {
    colIndexRemap.set(oldCol, newCol)
  })

  const numCols = sortedCols.length
  const actionColWidths: number[] = []

  // 4. 测量各工序列宽 (支持语义事实标签)
  for (let c = 0; c < numCols; c++) {
    const origCol = sortedCols[c]
    const blocksInCol = colBlocksMap.get(origCol) || []
    let maxW = Math.max(minActionColW, 140)
    for (const b of blocksInCol) {
      const labelW = measureTextWidth(b.label || '', 14, true)
      const sublabelW = b.sublabel ? measureTextWidth(b.sublabel, 11, false) : 0
      const heatW = b.heatLevel ? measureTextWidth(b.heatLevel, 10, true) + 20 : 0
      const actionDurationText = b.durationText || (b.durationMinutes ? `${b.durationMinutes}m` : '')
      const durW = actionDurationText ? measureTextWidth(actionDurationText, 10, true) + 14 : 0
      const badgeW = heatW + (heatW && durW ? 4 : 0) + durW
      const needed = Math.max(labelW, sublabelW, badgeW) + 24
      if (needed > maxW) maxW = needed
    }
    actionColWidths.push(maxW)
  }

  // 4.5 预计算各工序高度需求，动态扩展行高 (保证单行/多行工序均有充足垂直空间，杜绝文本挤压与裁切)
  for (let c = 0; c < numCols; c++) {
    const origCol = sortedCols[c]
    const blocksInCol = colBlocksMap.get(origCol) || []
    for (const b of blocksInCol) {
      const colW = actionColWidths[c]
      const labelLines = wrapTextToLines(b.label || '', colW - 16, 13.5, true)
      const sublabelLines = b.sublabel ? wrapTextToLines(b.sublabel, colW - 16, 10.5, false) : []

      let neededH = 20 // 基础内边距
      neededH += labelLines.length * 18
      neededH += sublabelLines.length * 14
      if (b.heatLevel || b.durationText || b.durationMinutes || b.equipment) neededH += 16
      if (b.notes?.includes('盛出') || b.label?.includes('盛出')) neededH += 16

      const cov = getBlockRowCoverage(b.id)
      let currSpanH = 0
      for (let r = cov.startRow; r <= cov.endRow; r++) {
        currSpanH += rowHeights[r]
      }

      if (currSpanH < neededH) {
        const deficit = neededH - currSpanH
        const span = Math.max(1, cov.endRow - cov.startRow + 1)
        const perRow = Math.ceil(deficit / span)
        for (let r = cov.startRow; r <= cov.endRow; r++) {
          rowHeights[r] += perRow
        }
      }
    }
  }

  // 终点列宽度
  let finalColWidth = 0
  if (renderFinalAsProcess && finalBlock) {
    const finalLabelW = measureTextWidth(finalBlock.label || '出锅装盘', 15, true) + 28
    const durationWidth = measureTextWidth(finalBlock.durationText || '', 11, true) + 24
    finalColWidth = Math.max(140, finalLabelW, durationWidth)
  }

  // 5. Header 布局
  const hasContainer = Boolean(recipe.prerequisites?.containerSize)
  const hasPreheat = Boolean(recipe.prerequisites?.preheat)
  const hasHeader = hasContainer || hasPreheat
  const headerHeight = hasHeader ? (hasContainer && hasPreheat ? 56 : 28) : 0
  const headerY = padding

  const contentStartY = padding + headerHeight
  const headerLayout: TableHeaderLayout = {
    hasHeader,
    hasContainer,
    hasPreheat,
    containerText: recipe.prerequisites?.containerSize,
    preheatText: recipe.prerequisites?.preheat,
    headerHeight,
    headerY,
  }

  // 6. 计算各行 Y 坐标
  const rowYPositions: number[] = []
  let currY = contentStartY
  for (let r = 0; r < ingredients.length; r++) {
    rowYPositions.push(currY)
    currY += rowHeights[r]
  }
  const tableContentHeight = currY - contentStartY

  // 各列 X 坐标
  const colXPositions: number[] = []
  let currX = padding + ingredientColWidth
  for (let c = 0; c < numCols; c++) {
    colXPositions.push(currX)
    currX += actionColWidths[c]
  }
  const finalBlockX = currX
  const totalTableWidth = ingredientColWidth + actionColWidths.reduce((a, b) => a + b, 0) + finalColWidth
  const canvasWidth = totalTableWidth + padding * 2
  const canvasHeight = headerHeight + tableContentHeight + padding * 2

  // 7. 构建原料单元格
  const ingredientCells: TableLayoutIngredientCell[] = ingredients.map((ing, idx) => {
    const parsed = parsedIngredients[idx]
    return {
      ingredient: ing,
      rowIndex: idx,
      x: padding,
      y: rowYPositions[idx],
      w: ingredientColWidth,
      h: rowHeights[idx],
      amountText: parsed.amountText,
      nameText: parsed.nameText,
      prepText: parsed.prepText,
    }
  })

  // 8. 构建工序合并单元格与等待通道
  const processCells: TableLayoutProcessCell[] = []
  const waitingLanes: TableLayoutWaitingLane[] = []
  const holdAsideBridges: TableLayoutHoldAsideBridge[] = []

  // 记录每个食材首次被加工的列号
  const ingredientFirstCol = new Map<number, number>()
  // 记录每个单元格网格占用 (col -> row -> blockId)
  const gridOccupancy = new Map<string, string>() // `${c}_${r}` -> blockId

  for (let c = 0; c < numCols; c++) {
    const origCol = sortedCols[c]
    const blocks = colBlocksMap.get(origCol) || []

    for (const b of blocks) {
      const cov = getBlockRowCoverage(b.id)
      const startRow = cov.startRow
      const endRow = cov.endRow
      const spanRows = endRow - startRow + 1

      const cellX = colXPositions[c]
      const cellY = rowYPositions[startRow]
      const cellW = actionColWidths[c]
      let cellH = 0
      for (let r = startRow; r <= endRow; r++) {
        cellH += rowHeights[r]
        gridOccupancy.set(`${c}_${r}`, b.id)
        if (!ingredientFirstCol.has(r)) {
          ingredientFirstCol.set(r, c)
        }
      }

      // 文本折行处理
      const labelLines = wrapTextToLines(b.label || '', cellW - 16, 13.5, true)
      const sublabelLines = b.sublabel ? wrapTextToLines(b.sublabel, cellW - 16, 10.5, false) : []
      const stateLines = b.completionState ? wrapTextToLines(b.completionState, cellW - 16, 9.5, false) : []

      // 语义事实推导：
      // 1) 承接上游半成品物料名称 (从权威 material dependencies 获取 outputItem 或 label)
      const upMatIds = getMaterialUpstreamIds(b)
      const incomingMaterials: string[] = []
      for (const upId of upMatIds) {
        const upBlock = blockMap.get(upId)
        if (upBlock) {
          const matName = upBlock.outputItem || upBlock.label
          if (matName && !incomingMaterials.includes(matName)) {
            incomingMaterials.push(matName)
          }
        }
      }

      // 2) 本工序新加入的原料 (排除上游步骤已经引入过的食材)
      const priorIngIds = new Set<string>()
      const collectPriorIngs = (currBlockId: string) => {
        const blk = blockMap.get(currBlockId)
        if (!blk) return
        for (const upId of getUpstreamBlockIds(blk)) {
          const upBlk = blockMap.get(upId)
          if (upBlk) {
            for (const iid of upBlk.ingredientIds || []) {
              priorIngIds.add(iid)
            }
            collectPriorIngs(upId)
          }
        }
      }
      collectPriorIngs(b.id)

      const newIngredients: string[] = []
      for (const ingId of b.ingredientIds || []) {
        if (!priorIngIds.has(ingId)) {
          const ing = ingredients.find(i => i.id === ingId)
          if (ing) {
            const cleanName = ing.name.replace(/（.*?）|\(.*?\)/g, '').trim()
            if (cleanName && !newIngredients.includes(cleanName)) {
              newIngredients.push(cleanName)
            }
          }
        }
      }

      // 承接上游半成品物料折行
      const incomingText = incomingMaterials.length > 0 ? `承接: ${incomingMaterials.join('、')}` : ''
      const incomingMaterialLines = incomingText ? wrapTextToLines(incomingText, cellW - 16, 9.5, false) : []

      // 本工序新加入原料折行
      const newIngText = newIngredients.length > 0 ? `+ 放入: ${newIngredients.join('、')}` : ''
      const newIngredientLines = newIngText ? wrapTextToLines(newIngText, cellW - 16, 9.5, false) : []

      // 检查是否为暂存备用工序 (例如牛肉滑炒后盛出，下一步留底油炒芹菜)
      const isHoldAside = Boolean(
        b.notes?.includes('盛出') ||
        b.label?.includes('盛出') ||
        (actionBlocks.some(other => {
          const upIds = getMaterialUpstreamIds(other)
          const afterIds = other.afterBlockIds || []
          return upIds.includes(b.id) && afterIds.length > 0 && getBlockCol(other.id) > c + 1
        }))
      )

      processCells.push({
        id: b.id,
        block: b,
        startRow,
        endRow,
        spanRows,
        colIndex: c,
        x: cellX,
        y: cellY,
        w: cellW,
        h: cellH,
        label: b.label || '',
        sublabel: b.sublabel,
        heatLevel: b.heatLevel,
        durationText: b.durationText || (b.durationMinutes ? `${b.durationMinutes}m` : undefined),
        equipment: b.equipment,
        labelLines,
        sublabelLines,
        isHoldAside,
        holdAsideLabel: isHoldAside ? '盛出备用 ⏳' : undefined,
        incomingMaterials: incomingMaterials.length > 0 ? incomingMaterials : undefined,
        incomingMaterialLines: incomingMaterialLines.length > 0 ? incomingMaterialLines : undefined,
        newIngredients: newIngredients.length > 0 ? newIngredients : undefined,
        newIngredientLines: newIngredientLines.length > 0 ? newIngredientLines : undefined,
        completionState: b.completionState,
        outputItem: b.outputItem,
        stateLines: stateLines.length > 0 ? stateLines : undefined,
      })
    }
  }

  // 9. 暂存备用跨列走廊 (Hold-Aside Bridges, 例如 cn-59 牛肉跨过芹菜列回锅)
  processCells.filter(p => p.isHoldAside).forEach(sourceCell => {
    // 寻找使用此物料的下游合并工序
    const downstream = processCells.find(target => {
      if (!target.block) return false
      return getMaterialUpstreamIds(target.block).includes(sourceCell.id)
    })
    if (downstream && downstream.colIndex > sourceCell.colIndex + 1) {
      const fromCol = sourceCell.colIndex + 1
      const toCol = downstream.colIndex - 1
      const bridgeX = colXPositions[fromCol]
      const bridgeEndX = colXPositions[downstream.colIndex]
      const bridgeW = bridgeEndX - bridgeX

      // 检查跨越列中是否有其他工序占用部分行，计算非重叠通道 (如 cn-59 中牛肉盛出备用只占 rows 0..1，不占芹菜与油的 rows 2..4)
      let bridgeStartRow = sourceCell.startRow
      let bridgeEndRow = sourceCell.endRow
      for (let c = fromCol; c <= toCol; c++) {
        const otherCellsInCol = processCells.filter(p => p.colIndex === c)
        for (const oc of otherCellsInCol) {
          if (oc.startRow > bridgeStartRow && oc.startRow <= bridgeEndRow) {
            bridgeEndRow = oc.startRow - 1
          }
        }
      }

      const bridgeY = rowYPositions[bridgeStartRow]
      let bridgeH = 0
      for (let r = bridgeStartRow; r <= bridgeEndRow; r++) {
        bridgeH += rowHeights[r]
        for (let c = fromCol; c <= toCol; c++) {
          gridOccupancy.set(`${c}_${r}`, `bridge-${sourceCell.id}`)
        }
      }

      holdAsideBridges.push({
        id: `bridge-${sourceCell.id}-${downstream.id}`,
        sourceBlockId: sourceCell.id,
        targetBlockId: downstream.id,
        startRow: bridgeStartRow,
        endRow: bridgeEndRow,
        fromCol,
        toCol,
        x: bridgeX,
        y: bridgeY,
        w: bridgeW,
        h: bridgeH,
        label: '暂存备用 (稍后回锅)',
      })
    }
  })

  // 10. 构造等待通道 (原料尚未加入阶段的横向延续行，支持在接入前一阶段标记入锅引导)
  for (let r = 0; r < ingredients.length; r++) {
    const firstCol = ingredientFirstCol.get(r) ?? numCols
    for (let c = 0; c < firstCol; c++) {
      // 若该位置已被其他工序合并区域或暂存走廊覆盖，则不生成独立等待通道
      if (!gridOccupancy.has(`${c}_${r}`)) {
        const isJoinTarget = (c === firstCol - 1)
        const joinLabel = isJoinTarget ? '+ 入锅 ➔' : undefined
        waitingLanes.push({
          ingredientId: ingredients[r].id,
          rowIndex: r,
          colIndex: c,
          x: colXPositions[c],
          y: rowYPositions[r],
          w: actionColWidths[c],
          h: rowHeights[r],
          isJoinTarget,
          joinLabel,
        })
      }
    }
  }

  // 11. 成品单元格 (Final Outcome Cell)
  if (renderFinalAsProcess && finalBlock) {
    const finalStartRow = 0
    const finalEndRow = ingredients.length - 1
    let finalH = 0
    for (let r = finalStartRow; r <= finalEndRow; r++) {
      finalH += rowHeights[r]
    }

    const finalLines = wrapTextToLines(finalBlock.label || '出锅装盘', finalColWidth - 20, 15, true)
    processCells.push({
      id: 'final-outcome-cell',
      isFinalBlock: true,
      finalBlock,
      startRow: finalStartRow,
      endRow: finalEndRow,
      spanRows: ingredients.length,
      colIndex: numCols,
      x: finalBlockX,
      y: rowYPositions[0],
      w: finalColWidth,
      h: finalH,
      label: finalBlock.label || '出锅装盘',
      durationText: finalBlock.durationText,
      labelLines: finalLines,
      sublabelLines: [],
    })
  }

  // 12. 共享网格线生成 (严格保证每个线段只画一次，合并区域内部横线彻底终止)
  const horizontalLines: Array<{ x1: number; y1: number; x2: number; y2: number }> = []
  const verticalLines: Array<{ x1: number; y1: number; x2: number; y2: number }> = []

  // 表格内部行水平线 (介于 row r 与 row r+1 之间)
  for (let r = 0; r < ingredients.length - 1; r++) {
    const lineY = rowYPositions[r] + rowHeights[r]

    // 1) 原料列内部横线 (永远绘制)
    horizontalLines.push({
      x1: padding,
      y1: lineY,
      x2: padding + ingredientColWidth,
      y2: lineY,
    })

    // 2) 各工序列内部横线：仅当行 r 与行 r+1 处于不同处理对象时绘制；处于同一合并单元格时终止！
    for (let c = 0; c < numCols; c++) {
      const cellCoveringBoth = processCells.find(p =>
        p.colIndex === c && p.startRow <= r && p.endRow >= r + 1
      )
      const bridgeCoveringBoth = holdAsideBridges.find(b =>
        b.fromCol <= c && b.toCol >= c && b.startRow <= r && b.endRow >= r + 1
      )
      // 若处于同一合并工序内部或暂存走廊内部，水平分割线终止！
      if (!cellCoveringBoth && !bridgeCoveringBoth) {
        horizontalLines.push({
          x1: colXPositions[c],
          y1: lineY,
          x2: colXPositions[c] + actionColWidths[c],
          y2: lineY,
        })
      }
    }
  }

  // 垂直分割线：
  // 1) 原料列右边缘 (第一道主竖线)
  verticalLines.push({
    x1: padding + ingredientColWidth,
    y1: contentStartY,
    x2: padding + ingredientColWidth,
    y2: contentStartY + tableContentHeight,
  })

  // 2) 各工序列之间的垂直分割线
  for (let c = 0; c < numCols; c++) {
    const lineX = colXPositions[c] + actionColWidths[c]
    verticalLines.push({
      x1: lineX,
      y1: contentStartY,
      x2: lineX,
      y2: contentStartY + tableContentHeight,
    })
  }

  const outerRect = {
    x: padding,
    y: padding,
    w: totalTableWidth,
    h: headerHeight + tableContentHeight,
  }

  return {
    mode: 'continuous-table',
    canvasWidth,
    canvasHeight,
    header: headerLayout,
    ingredientColWidth,
    actionColWidths,
    finalColWidth,
    rowHeights,
    rowYPositions,
    ingredientCells,
    processCells,
    waitingLanes,
    holdAsideBridges,
    horizontalLines,
    verticalLines,
    outerRect,
    displayIngredients: ingredients,
  }
}
