import { CHINESE_HEALTHY_RECIPES } from '../src/data/chineseHealthyRecipes'
import { HOME_SWEET_HOME_RECIPES } from '../src/data/homeSweetHomeRecipes'
import { espressoBrowniesV3, hongShaoRouV3, caesarSaladV3 } from '../src/data/v3Examples'
import { canRenderArrangedTable } from '../src/utils/continuousTableLayout'

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
const issues: { id: string; title: string; reason: string }[] = []

for (const recipe of allRecipes) {
  const admission = canRenderArrangedTable(recipe)
  if (admission.canRender) passCount++
  else issues.push({ id: recipe.id, title: recipe.title, reason: admission.reason || '未知原因' })
}

console.log(`• 全量检测食谱总数: ${allRecipes.length} 道`)
console.log(`• 可由真实输入集合安全渲染为连续工序表: ${passCount} / ${allRecipes.length} 道 (${((passCount / allRecipes.length) * 100).toFixed(1)}%)`)

if (issues.length > 0) {
  console.log(`\n• 必须保留分支流程图的食谱数: ${issues.length}`)
  issues.forEach(item => {
    console.log(`  - [${item.id}] ${item.title}`)
    console.log(`    原因: ${item.reason}`)
  })
} else {
  console.log('全量食谱均可安全渲染为连续工序表。')
}
console.log('\n================================================================\n')
