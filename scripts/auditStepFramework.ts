import { CHINESE_HEALTHY_RECIPES } from '../src/data/chineseHealthyRecipes'
import { HOME_SWEET_HOME_RECIPES } from '../src/data/homeSweetHomeRecipes'
import { espressoBrowniesV3, hongShaoRouV3, caesarSaladV3 } from '../src/data/v3Examples'
import { checkStepIngredientContiguity, resolveEffectiveStepIngredients } from '../src/types/recipeStepFramework'

const allRecipes = [
  ...CHINESE_HEALTHY_RECIPES,
  ...HOME_SWEET_HOME_RECIPES,
  espressoBrowniesV3,
  hongShaoRouV3,
  caesarSaladV3,
]

console.log('================================================================')
console.log('  Visual Recipe Step & Skill Framework 全量食谱规范审计报告     ')
console.log('================================================================\n')

let passCount = 0
const issues: { id: string; title: string; blockId: string; blockLabel: string; missing: string[] }[] = []

for (const recipe of allRecipes) {
  const effectiveMap = resolveEffectiveStepIngredients(recipe.ingredients, recipe.actionBlocks)
  let recipeOk = true

  for (const block of recipe.actionBlocks) {
    const effIds = effectiveMap.get(block.id) || block.ingredientIds || []
    const res = checkStepIngredientContiguity(effIds, recipe.ingredients)
    if (!res.isContiguous) {
      recipeOk = false
      issues.push({
        id: recipe.id,
        title: recipe.title,
        blockId: block.id,
        blockLabel: block.label,
        missing: res.missingIngredientNames,
      })
    }
  }
  if (recipeOk) passCount++
}

console.log(`• 全量检测食谱总数: ${allRecipes.length} 道`)
console.log(`• 满足 Cooking for Engineers 严密时序与技法连续律的食谱: ${passCount} / ${allRecipes.length} 道 (${((passCount / allRecipes.length) * 100).toFixed(1)}%)`)

if (issues.length > 0) {
  console.log(`\n• 存在跨度问题的工序数: ${issues.length}`)
  issues.slice(0, 10).forEach(item => {
    console.log(`  - [${item.id}] ${item.title}`)
    console.log(`    工序: "${item.blockLabel}" (${item.blockId})`)
    console.log(`    夹带食材: ${item.missing.join('、')}`)
  })
} else {
  console.log('🎉 恭喜！全量 121 道食谱 100% 通过严密工序与技法连续律校验，无任何空洞与夹带跨度！')
}
console.log('\n================================================================\n')
