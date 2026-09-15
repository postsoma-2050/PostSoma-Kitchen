import { CHINESE_HEALTHY_RECIPES } from '../src/data/chineseHealthyRecipes'
import { buildV3MatrixLayout } from '../src/utils/matrixFlowLayout'

const r = CHINESE_HEALTHY_RECIPES.find((x: any) => x.id === 'cn-24-jianzhi-fanqie-doufugeng')!

console.log('Recipe title:', r.title)
console.log('Ingredients:')
r.ingredients.forEach((ing: any, i: any) => console.log(' ', i, ing.id, ing.name))
console.log('Action blocks:')
r.actionBlocks.forEach((b: any) => console.log(' ', b.id, b.label, 'ingredientIds:', b.ingredientIds))

const layout = buildV3MatrixLayout(r)
layout.actionBlockLayouts.forEach((b: any) => {
  console.log('Layout block:', b.block.id, b.block.label, 'Col:', b.computedColIndex, 'RowSpan:', [b.computedStartRow, b.computedEndRow], 'h:', b.h)
})
