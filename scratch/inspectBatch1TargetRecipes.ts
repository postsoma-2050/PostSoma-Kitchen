import { BATCH1_MEAT_EGG } from '../src/data/recipes/chinese/batch1_meat_egg'
import { BATCH2_VEGETABLES } from '../src/data/recipes/chinese/batch2_vegetables'
import { BATCH3_MUSHROOMS_TUBERS } from '../src/data/recipes/chinese/batch3_mushrooms_tubers'
import { BATCH4_SEAFOOD } from '../src/data/recipes/chinese/batch4_seafood'
import { BATCH5_FIVE_VISCERA } from '../src/data/recipes/chinese/batch5_five_viscera'
import { BATCH6_CHRONIC_DISEASES } from '../src/data/recipes/chinese/batch6_chronic_diseases'
import { BATCH7_SPECIAL_CARE } from '../src/data/recipes/chinese/batch7_special_care'
import { BATCH8_ELDERLY_BREAKFAST } from '../src/data/recipes/chinese/batch8_elderly_breakfast'

const batches = [
  { name: 'batch1_meat_egg.ts', list: BATCH1_MEAT_EGG },
  { name: 'batch2_vegetables.ts', list: BATCH2_VEGETABLES },
  { name: 'batch3_mushrooms_tubers.ts', list: BATCH3_MUSHROOMS_TUBERS },
  { name: 'batch4_seafood.ts', list: BATCH4_SEAFOOD },
  { name: 'batch5_five_viscera.ts', list: BATCH5_FIVE_VISCERA },
  { name: 'batch6_chronic_diseases.ts', list: BATCH6_CHRONIC_DISEASES },
  { name: 'batch7_special_care.ts', list: BATCH7_SPECIAL_CARE },
  { name: 'batch8_elderly_breakfast.ts', list: BATCH8_ELDERLY_BREAKFAST },
]

for (const b of batches) {
  const problems = []
  for (const r of b.list) {
    const badIngredients = r.ingredients.filter(i => {
      const isCompoundName = /&|与|、|\band\b|\+|＋/.test(i.name)
      const isCompoundAmount = /[+＋]|(?:\b各\b)|(?:\S各\d)|与|及|、/.test(i.amountText || '')
      const isOther = i.category === 'other'
      return isCompoundName || isCompoundAmount || isOther
    })
    if (badIngredients.length > 0) {
      problems.push({ recipeId: r.id, title: r.title, badIngredients })
    }
  }
  if (problems.length > 0) {
    console.log(`\n========================================`)
    console.log(`File: ${b.name} (${problems.length} recipes with issues)`)
    console.log(`========================================`)
    for (const p of problems) {
      console.log(`\n[${p.recipeId}] ${p.title}:`)
      for (const ing of p.badIngredients) {
        console.log(`  - id: "${ing.id}", name: "${ing.name}", amount: "${ing.amountText}", category: "${ing.category}"`)
      }
    }
  }
}
