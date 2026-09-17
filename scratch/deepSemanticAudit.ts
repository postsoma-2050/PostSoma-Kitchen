import { CHINESE_HEALTHY_RECIPES } from '../src/data/chineseHealthyRecipes'
import { HOME_SWEET_HOME_RECIPES } from '../src/data/homeSweetHomeRecipes'
import { espressoBrowniesV3, hongShaoRouV3, caesarSaladV3 } from '../src/data/v3Examples'

const allRecipes = [
  ...CHINESE_HEALTHY_RECIPES,
  ...HOME_SWEET_HOME_RECIPES,
  espressoBrowniesV3,
  hongShaoRouV3,
  caesarSaladV3
]

const warnings: { recipeId: string; title: string; ingId: string; name: string; amountText: string; reason: string }[] = []

for (const r of allRecipes) {
  for (const ing of r.ingredients) {
    const n = (ing.name || '').trim()
    const a = (ing.amountText || '').trim()

    // 1. Any '+'
    if (n.includes('+') || a.includes('+')) {
      warnings.push({ recipeId: r.id, title: r.title, ingId: ing.id, name: n, amountText: a, reason: 'Contains "+"' })
    }

    // 2. Dunhao '、'
    if (n.includes('、') || a.includes('、')) {
      warnings.push({ recipeId: r.id, title: r.title, ingId: ing.id, name: n, amountText: a, reason: 'Contains "、"' })
    }

    // 3. '与' or '和' or '及'
    if (/[与和及]/.test(n)) {
      warnings.push({ recipeId: r.id, title: r.title, ingId: ing.id, name: n, amountText: a, reason: 'Contains conjunction' })
    }

    // 4. '葱姜蒜' or '葱姜'
    if (/葱姜/.test(n) || /姜蒜/.test(n)) {
      warnings.push({ recipeId: r.id, title: r.title, ingId: ing.id, name: n, amountText: a, reason: 'Combines 葱/姜/蒜' })
    }

    // 5. Check if amountText contains ingredient name
    if (a && n && a.includes(n)) {
      warnings.push({ recipeId: r.id, title: r.title, ingId: ing.id, name: n, amountText: a, reason: 'amountText repeats name' })
    }
  }
}

console.log(`Total presets: ${allRecipes.length}`)
console.log(`Total warnings found: ${warnings.length}`)

for (const w of warnings) {
  console.log(`[${w.recipeId}] "${w.title}" -> [${w.ingId}] name: "${w.name}", amount: "${w.amountText}" (${w.reason})`)
}
