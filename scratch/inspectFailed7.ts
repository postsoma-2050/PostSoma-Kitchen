import { CHINESE_HEALTHY_RECIPES } from '../src/data/chineseHealthyRecipes'
import { HOME_SWEET_HOME_RECIPES } from '../src/data/homeSweetHomeRecipes'
import { canRenderArrangedTable } from '../src/utils/continuousTableLayout'

const allRecipes = [...CHINESE_HEALTHY_RECIPES, ...HOME_SWEET_HOME_RECIPES]
const failed = allRecipes.filter(r => !canRenderArrangedTable(r).canRender)

console.log('Failed recipes count:', failed.length)
for (const r of failed) {
  console.log(`\n=== Recipe: ${r.id} (${r.title}) ===`)
  console.log('Reason:', canRenderArrangedTable(r).reason)
  console.log('Ingredients:')
  r.ingredients.forEach((ing, i) => console.log(`  ${i + 1}. [${ing.id}] ${ing.name}`))
  console.log('ActionBlocks:')
  r.actionBlocks.forEach(b => console.log(`  - [${b.id}] "${b.label}": stage ${b.stageIndex}, ingredients: [${b.ingredientIds.join(', ')}]`))
}
