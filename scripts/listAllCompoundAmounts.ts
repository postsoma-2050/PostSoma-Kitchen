import { CHINESE_HEALTHY_RECIPES } from '../src/data/chineseHealthyRecipes'

console.log('=== 中餐食谱中所有复合用量 (amountText) 明细 ===\n')
let count = 0
for (const recipe of CHINESE_HEALTHY_RECIPES) {
  const bad = recipe.ingredients.filter(i => i.amountText && (/[+＋]|(?:\b各\b)|(?:\S各\d)/.test(i.amountText) || /与|及|、/.test(i.amountText)))
  if (bad.length > 0) {
    console.log(`[${recipe.id}] ${recipe.title}:`)
    for (const b of bad) {
      count++
      console.log(`   - id: ${b.id}, name: "${b.name}", amountText: "${b.amountText}"`)
    }
  }
}
console.log(`\n总计发现 ${count} 项复合用量`)
