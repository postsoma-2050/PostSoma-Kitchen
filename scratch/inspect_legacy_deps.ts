import { CHINESE_HEALTHY_RECIPES } from '../src/data/chineseHealthyRecipes'
import { HOME_SWEET_HOME_RECIPES } from '../src/data/homeSweetHomeRecipes'
import { espressoBrowniesV3, hongShaoRouV3, caesarSaladV3 } from '../src/data/v3Examples'

const all = [...CHINESE_HEALTHY_RECIPES, ...HOME_SWEET_HOME_RECIPES, espressoBrowniesV3, hongShaoRouV3, caesarSaladV3]
let legacyCount = 0
let materialCount = 0
let orderCount = 0
const legacyRecipes: string[] = []

for (const r of all) {
  let hasLegacy = false
  for (const b of r.actionBlocks || []) {
    for (const d of b.dependencies || []) {
      if (d.type === 'legacy') {
        legacyCount++
        hasLegacy = true
      }
      if (d.type === 'material') materialCount++
      if (d.type === 'order') orderCount++
    }
  }
  if (hasLegacy) legacyRecipes.push(r.id)
}
console.log({ totalRecipes: all.length, legacyCount, materialCount, orderCount, legacyRecipes })
