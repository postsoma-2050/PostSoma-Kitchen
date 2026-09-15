import { buildV3MatrixLayout } from '../src/utils/matrixFlowLayout'
import { normalizeRecipe } from '../src/services/recipeNormalizer'
import { CHINESE_HEALTHY_RECIPES } from '../src/data/chineseHealthyRecipes'

// Case A: Exact remote data from Supabase
export const caseARaw = {
  id: "cn-59-qincai-niurou",
  title: "🥩 经典平肝芹菜炒牛肉丝",
  status: "published",
  cuisine: "chinese",
  version: "3.0",
  prerequisites: {
    containerSize: "中式炒锅",
    preheat: "牛肉切细丝上浆",
    servings: "3 人份"
  },
  ingredients: [
    { id: "i1", name: "嫩牛肉丝 (上浆)", category: "main", amountText: "200 g" },
    { id: "i2", name: "香芹菜段", category: "produce", amountText: "200 g" },
    { id: "i3", name: "泡野山椒碎与姜丝", category: "produce", amountText: "野山椒+姜丝" },
    { id: "i4", name: "老抽料酒盐鸡精水淀粉", category: "seasoning", amountText: "老抽+料酒+盐+鸡精+水淀粉" }
  ],
  actionBlocks: [
    {
      id: "b1",
      label: "牛肉丝滑油变色盛出",
      sublabel: "Flash Sear Beef",
      heatLevel: "大火",
      stageIndex: 0,
      ingredientIds: ["i1", "i4"],
      inputBlockIds: [],
      durationMinutes: 2
    },
    {
      id: "b2",
      label: "爆香野山椒炒芹菜合炒",
      sublabel: "Stir-Fry Celery & Combine",
      heatLevel: "大火",
      stageIndex: 1,
      ingredientIds: ["i1", "i2", "i3", "i4"],
      inputBlockIds: [],
      durationMinutes: 2
    }
  ],
  finalBlock: {
    label: "辣香鲜嫩 🥩",
    method: "fry",
    instructions: "牛肉滑嫩，芹菜清脆微辣开胃"
  }
}

const caseANorm = normalizeRecipe(caseARaw)
const layoutA = buildV3MatrixLayout(caseANorm)

console.log('=== CASE A (2-step Remote) ===')
console.log('Canvas:', { w: layoutA.canvasWidth, h: layoutA.canvasHeight })
console.log('Action blocks:')
layoutA.actionBlockLayouts.forEach(b => {
  console.log(`  ${b.block.id} "${b.block.label}": col=${b.computedColIndex}, x=${b.x}, y=${b.y}, w=${b.w}, h=${b.h}, rows=[${b.computedStartRow}..${b.computedEndRow}], intakeRowYs=[${b.intakeRowYs}]`)
})
console.log('Intake Feeds:')
layoutA.ingredientIntakeFeeds.forEach(f => {
  console.log(`  feed ${f.id}: ing=${f.ingredientId}, block=${f.blockId}, row=${f.rowIndex}, pin=(${f.pinX}, ${f.pinY}), feedStartX=${f.feedStartX}`)
})
console.log('Intake Rail Segments:')
layoutA.intakeRailSegments.forEach(r => {
  console.log(`  rail ${r.id}: block=${r.blockId}, x=${r.x}, y=[${r.startY}..${r.endY}], rows=[${r.participatingRowIndices}]`)
})
console.log('Waiting Paths:')
layoutA.ingredientWaitingPaths.forEach(w => {
  console.log(`  wait ${w.id}: ing=${w.ingredientId}, row=${w.rowIndex}, y=${w.startY}, x=[${w.startX}..${w.endX}], target=${w.targetBlockId}, isFinal=${w.isFinal}`)
})
console.log('Connectors:')
layoutA.connectorLayouts.forEach(c => {
  console.log(`  conn ${c.id}: ${c.sourceBlockId} -> ${c.targetBlockId}, explicit=${c.explicit}, pathD=${c.pathD}`)
})

const cn59Local = CHINESE_HEALTHY_RECIPES.find(r => r.id === 'cn-59-qincai-niurou')!
const layoutB = buildV3MatrixLayout(cn59Local)

console.log('\n=== CASE B (4-step Local) ===')
console.log('Canvas:', { w: layoutB.canvasWidth, h: layoutB.canvasHeight })
console.log('Action blocks:')
layoutB.actionBlockLayouts.forEach(b => {
  console.log(`  ${b.block.id} "${b.block.label}": col=${b.computedColIndex}, x=${b.x}, y=${b.y}, w=${b.w}, h=${b.h}, rows=[${b.computedStartRow}..${b.computedEndRow}], intakeRowYs=[${b.intakeRowYs}]`)
})
console.log('Intake Feeds:')
layoutB.ingredientIntakeFeeds.forEach(f => {
  console.log(`  feed ${f.id}: ing=${f.ingredientId}, block=${f.blockId}, row=${f.rowIndex}, pin=(${f.pinX}, ${f.pinY})`)
})
console.log('Intake Rail Segments:')
layoutB.intakeRailSegments.forEach(r => {
  console.log(`  rail ${r.id}: block=${r.blockId}, x=${r.x}, y=[${r.startY}..${r.endY}], rows=[${r.participatingRowIndices}]`)
})
console.log('Waiting Paths:')
layoutB.ingredientWaitingPaths.forEach(w => {
  console.log(`  wait ${w.id}: ing=${w.ingredientId}, row=${w.rowIndex}, y=${w.startY}, x=[${w.startX}..${w.endX}], target=${w.targetBlockId}`)
})
console.log('Connectors:')
layoutB.connectorLayouts.forEach(c => {
  console.log(`  conn ${c.id}: ${c.sourceBlockId} -> ${c.targetBlockId}, explicit=${c.explicit}, label=${c.label}, pathD=${c.pathD}`)
})
