import assert from 'node:assert/strict'
import { arrangeIngredientRows, getProcessingIngredientSets } from '../../src/utils/ingredientDisplayOrder'
import { buildV3MatrixLayout } from '../../src/utils/matrixFlowLayout'
import { buildV3ContinuousTableLayout, canRenderContinuousTable, canRenderArrangedTable, resolveLayoutMode } from '../../src/utils/continuousTableLayout'
import { CHINESE_HEALTHY_RECIPES } from '../../src/data/chineseHealthyRecipes'
import { HOME_SWEET_HOME_RECIPES } from '../../src/data/homeSweetHomeRecipes'
import { espressoBrowniesV3, hongShaoRouV3, caesarSaladV3 } from '../../src/data/v3Examples'
import { generatePageSvgString } from '../../src/utils/exportFlowCard'
import type { VisualRecipeV3 } from '../../src/types/recipeV3'
import fs from 'node:fs'

const base = CHINESE_HEALTHY_RECIPES.find(r => r.id === 'cn-59-qincai-niurou')!
const fixture: VisualRecipeV3 = { ...base, id: 'region-fixture', ingredients: [
  {id:'meat',name:'牛肉',amountText:'200 g',category:'main'},
  {id:'veg',name:'芹菜',amountText:'200 g',category:'produce'},
  {id:'sauce',name:'腌料',amountText:'1 碗',category:'seasoning'}
], actionBlocks: [
  {id:'a',label:'滑炒盛出',ingredientIds:['meat','sauce'],stageIndex:0},
  {id:'b',label:'合炒',ingredientIds:['veg'],stageIndex:1,dependencies:[{sourceBlockId:'a',type:'material'}]}
] }
const before = JSON.stringify(fixture)
const arranged = arrangeIngredientRows(fixture)
assert.deepEqual(arranged.ingredients.map(i => i.id), ['meat','sauce','veg'])
assert.equal(JSON.stringify(fixture), before)
assert.strictEqual(arrangeIngredientRows(arranged), arranged)
assert.equal(canRenderContinuousTable(fixture).canRender, false)
assert.equal(resolveLayoutMode(fixture), 'table')
const table = buildV3ContinuousTableLayout(fixture)
const a = table.processCells.find(c => c.id === 'a')!
const b = table.processCells.find(c => c.id === 'b')!
assert.equal(a.spanRows, 2)
assert.equal(b.spanRows, 3)
assert.equal(a.h, table.rowHeights[0] + table.rowHeights[1])
assert.ok(table.waitingLanes.some(l => l.ingredientId === 'veg' && l.y >= a.y + a.h))
assert.ok(!table.horizontalLines.some(l => l.y1 === table.rowYPositions[1] && l.x1 === a.x))
const flow = buildV3MatrixLayout(fixture)
assert.equal(flow.actionBlockLayouts.find(c => c.block.id === 'a')!.h, flow.ingredientRows[0].h * 2)
const impossible: VisualRecipeV3 = { ...fixture, actionBlocks: [
  {id:'a',label:'A',stageIndex:0,ingredientIds:['meat','veg']},
  {id:'b',label:'B',stageIndex:1,ingredientIds:['veg','sauce']},
  {id:'c',label:'C',stageIndex:2,ingredientIds:['meat','sauce']}
] }
assert.equal(resolveLayoutMode(impossible), 'flow', '三组两两交叉不存在连续排列，必须保留分支')
const orderOnly = {...fixture, actionBlocks:[fixture.actionBlocks[0], {...fixture.actionBlocks[1], dependencies:[{sourceBlockId:'a',type:'order' as const}]}]}
assert.deepEqual([...getProcessingIngredientSets(orderOnly).get('b')!], ['veg'])

const all = [...CHINESE_HEALTHY_RECIPES,...HOME_SWEET_HOME_RECIPES,espressoBrowniesV3,hongShaoRouV3,caesarSaladV3]
const entries = all.map(recipe => {
  const snapshot = JSON.stringify(recipe)
  const display = arrangeIngredientRows(recipe)
  const admissible = canRenderArrangedTable(recipe)
  const layout = buildV3MatrixLayout(recipe)
  if (admissible.canRender) {
    const t = buildV3ContinuousTableLayout(recipe)
    for (const cell of t.processCells.filter(c => c.block)) {
      const scope = getProcessingIngredientSets(recipe).get(cell.id)!
      const rowIds = t.ingredientCells.slice(cell.startRow, cell.endRow + 1).map(c => c.ingredient.id)
      assert.deepEqual(new Set(rowIds), scope, `${recipe.id}/${cell.id}不能夹带无关行`)
    }
  }
  assert.equal(JSON.stringify(recipe), snapshot, `${recipe.id}事实不得被布局修改`)
  assert.deepEqual(arrangeIngredientRows(display).ingredients, display.ingredients)
  return {id:recipe.id,reordered:display !== recipe,mode:resolveLayoutMode(recipe),reason:admissible.reason,
    ingredientOrder:display.ingredients.map(i=>i.id),regions:layout.actionBlockLayouts.filter(c=>c.h === c.envelopeH).length}
})
fs.mkdirSync('reports/ingredient-regions',{recursive:true})
fs.writeFileSync('reports/ingredient-regions/audit.json',JSON.stringify({total:all.length,table:entries.filter(e=>e.mode==='table').length,reordered:entries.filter(e=>e.reordered).length,entries},null,2))
for (const recipe of [fixture,base,espressoBrowniesV3,...all.filter(r=>['cn-12-xihongshi-jidan','cn-24-jianzhi-fanqie-doufugeng','cn-14-zhurou-dun-fentiao'].includes(r.id))]) {
  for (const mode of ['table','flow'] as const) {
    const svg = generatePageSvgString(recipe,0,1,undefined,'full',mode)
    fs.writeFileSync(`reports/ingredient-regions/${recipe.id}-${mode}.svg`,svg.svgString)
  }
}
console.log(`PASS: ${all.length} 道全库区域与事实不变检查；${entries.filter(e=>e.mode==='table').length} 道可连续排布；${entries.filter(e=>e.reordered).length} 道显示重排。`)
