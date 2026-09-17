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
  for (const r of b.list) {
    for (const ing of r.ingredients) {
      if (/葱姜|姜蒜/.test(ing.name)) {
        console.log(`File: ${b.name}, Recipe: [${r.id}] "${r.title}", ing: [${ing.id}] "${ing.name}" "${ing.amountText}"`)
      }
    }
  }
}
