import { CHINESE_HEALTHY_RECIPES } from '../src/data/chineseHealthyRecipes'
import { buildV3MatrixLayout } from '../src/utils/matrixFlowLayout'

const cn59 = CHINESE_HEALTHY_RECIPES.find((r: any) => r.id === 'cn-59-qincai-niurou')!
console.log('Title:', cn59.title)
console.log('Ingredients count:', cn59.ingredients.length)
cn59.ingredients.forEach((ing: any, idx: any) => console.log(` [Row ${idx}] ${ing.id}: ${ing.name} (${ing.amountText})`))

console.log('\nAction Blocks in Data:')
cn59.actionBlocks.forEach((b: any) => console.log(` - ${b.id}: "${b.label}" (stage: ${b.stageIndex}, ings: ${b.ingredientIds?.join(',')}, inputs: ${b.inputBlockIds?.join(',') || 'none'})`))

const layout = buildV3MatrixLayout(cn59)
console.log('\nMatrix Layout Blocks:')
layout.actionBlockLayouts.forEach((b: any) => {
  console.log(` - Block [${b.block.id}] "${b.block.label}" => Col ${b.computedColIndex}, Rows ${b.computedStartRow}..${b.computedEndRow} (Span: ${b.computedEndRow - b.computedStartRow + 1} rows), x=${b.x}, y=${b.y}, w=${b.w}, h=${b.h}`)
})
console.log(`\nFinal Block => Col X=${layout.finalBlockLayout.x}, Rows 0..${layout.numRows - 1}, h=${layout.finalBlockLayout.h}`)
