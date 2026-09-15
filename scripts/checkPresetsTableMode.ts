import { CHINESE_HEALTHY_RECIPES } from '../src/data/chineseHealthyRecipes'
import { HOME_SWEET_HOME_RECIPES } from '../src/data/homeSweetHomeRecipes'
import { espressoBrowniesV3, hongShaoRouV3, caesarSaladV3 } from '../src/data/v3Examples'
import { canRenderContinuousTable } from '../src/utils/continuousTableLayout'

const allRecipes = [
  ...CHINESE_HEALTHY_RECIPES,
  ...HOME_SWEET_HOME_RECIPES,
  espressoBrowniesV3,
  hongShaoRouV3,
  caesarSaladV3
]

let tableCount = 0
let flowCount = 0
const flowRecipes: { id: string; title: string; reason?: string }[] = []

for (const r of allRecipes) {
  const res = canRenderContinuousTable(r)
  if (res.canRender) {
    tableCount++
  } else {
    flowCount++
    flowRecipes.push({ id: r.id, title: r.title, reason: res.reason })
  }
}

console.log('Total presets:', allRecipes.length)
console.log('Table mode compatible:', tableCount)
console.log('Branch Flow fallback:', flowCount)
console.log('Sample Flow recipes (first 10):')
flowRecipes.slice(0, 10).forEach(f => console.log(' -', f.id, f.title, ':', f.reason))
