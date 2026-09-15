import { CHINESE_HEALTHY_RECIPES } from '../src/data/chineseHealthyRecipes'
import { espressoBrowniesV3 } from '../src/data/v3Examples'
import { canRenderContinuousTable, buildV3ContinuousTableLayout } from '../src/utils/continuousTableLayout'

const cn20 = CHINESE_HEALTHY_RECIPES.find(r => r.id === 'cn-20-banli-jiding')!
const cn59 = CHINESE_HEALTHY_RECIPES.find(r => r.id === 'cn-59-qincai-niurou')!

console.log('Brownie canRender:', canRenderContinuousTable(espressoBrowniesV3))
console.log('CN-20 canRender:', canRenderContinuousTable(cn20))
console.log('CN-59 canRender:', canRenderContinuousTable(cn59))

const brownieLayout = buildV3ContinuousTableLayout(espressoBrowniesV3)
console.log('Brownie layout:', {
  canvasWidth: brownieLayout.canvasWidth,
  canvasHeight: brownieLayout.canvasHeight,
  ingredientColWidth: brownieLayout.ingredientColWidth,
  actionColWidths: brownieLayout.actionColWidths,
  processCellsCount: brownieLayout.processCells.length,
  waitingLanesCount: brownieLayout.waitingLanes.length,
  horizontalLinesCount: brownieLayout.horizontalLines.length,
  verticalLinesCount: brownieLayout.verticalLines.length,
})

const cn20Layout = buildV3ContinuousTableLayout(cn20)
console.log('CN-20 layout:', {
  canvasWidth: cn20Layout.canvasWidth,
  canvasHeight: cn20Layout.canvasHeight,
  processCells: cn20Layout.processCells.map(p => ({
    id: p.id,
    label: p.label,
    col: p.colIndex,
    startRow: p.startRow,
    endRow: p.endRow,
    spanRows: p.spanRows,
  })),
  waitingLanes: cn20Layout.waitingLanes.map(w => ({
    ingId: w.ingredientId,
    row: w.rowIndex,
    col: w.colIndex,
  })),
})

const cn59Layout = buildV3ContinuousTableLayout(cn59)
console.log('CN-59 layout:', {
  canvasWidth: cn59Layout.canvasWidth,
  canvasHeight: cn59Layout.canvasHeight,
  processCells: cn59Layout.processCells.map(p => ({
    id: p.id,
    label: p.label,
    col: p.colIndex,
    startRow: p.startRow,
    endRow: p.endRow,
    spanRows: p.spanRows,
    isHoldAside: p.isHoldAside,
  })),
  holdAsideBridges: cn59Layout.holdAsideBridges,
})
