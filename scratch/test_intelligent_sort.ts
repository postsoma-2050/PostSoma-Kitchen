import { CHINESE_HEALTHY_RECIPES } from '../src/data/chineseHealthyRecipes'
import { HOME_SWEET_HOME_RECIPES } from '../src/data/homeSweetHomeRecipes'
import { espressoBrowniesV3, hongShaoRouV3, caesarSaladV3 } from '../src/data/v3Examples'
import { checkStepIngredientContiguity } from '../src/types/recipeStepFramework'
import type { V3Ingredient, V3ActionBlock } from '../src/types/recipeV3'

export function intelligentSortIngredientsByFlow(
  ingredients: V3Ingredient[],
  actionBlocks: V3ActionBlock[]
): V3Ingredient[] {
  if (!ingredients || ingredients.length <= 1) return ingredients
  if (!actionBlocks || actionBlocks.length === 0) return ingredients

  const ingMap = new Map<string, V3Ingredient>()
  ingredients.forEach(i => ingMap.set(i.id, i))

  // 1. 找到每个食材首次被哪一个 ActionBlock 吃进
  const firstBlockOfIng = new Map<string, { block: V3ActionBlock; index: number }>()

  // 按 stageIndex 与自然顺序排列 blocks
  const sortedBlocks = [...actionBlocks].sort((a, b) => (a.stageIndex ?? 0) - (b.stageIndex ?? 0))

  sortedBlocks.forEach((block, bIdx) => {
    (block.ingredientIds || []).forEach(id => {
      if (!firstBlockOfIng.has(id)) {
        firstBlockOfIng.set(id, { block, index: bIdx })
      }
    })
  })

  // 2. 将食材按首次被消耗的 block 归组
  const blockBuckets = new Map<string, string[]>()
  const unassigned: string[] = []

  ingredients.forEach(ing => {
    const info = firstBlockOfIng.get(ing.id)
    if (info) {
      const bId = info.block.id
      if (!blockBuckets.has(bId)) {
        blockBuckets.set(bId, [])
      }
      blockBuckets.get(bId)!.push(ing.id)
    } else {
      unassigned.push(ing.id)
    }
  })

  // 3. 按照 sortedBlocks 的顺序，将同一 block 的食材物理相邻排放
  const orderedIds: string[] = []
  sortedBlocks.forEach(b => {
    const bucket = blockBuckets.get(b.id)
    if (bucket && bucket.length > 0) {
      orderedIds.push(...bucket)
    }
  })

  // 4. 追加未在 actionBlocks 中直接使用的食材 (点缀/出锅调料)
  orderedIds.push(...unassigned)

  return orderedIds.map(id => ingMap.get(id)!).filter(Boolean)
}

const allRecipes = [
  ...CHINESE_HEALTHY_RECIPES,
  ...HOME_SWEET_HOME_RECIPES,
  espressoBrowniesV3,
  hongShaoRouV3,
  caesarSaladV3,
]

let perfectCount = 0
const imperfectList: string[] = []

allRecipes.forEach((recipe: any) => {
  const sorted = intelligentSortIngredientsByFlow(recipe.ingredients, recipe.actionBlocks)
  const allGood = recipe.actionBlocks.every(
    (b: any) => checkStepIngredientContiguity(b.ingredientIds, sorted).isContiguous
  )
  if (allGood) {
    perfectCount++
  } else {
    imperfectList.push(recipe.id)
  }
})

console.log(`Intelligent Sort Results:`)
console.log(`Perfect contiguity: ${perfectCount} / ${allRecipes.length} (${((perfectCount / allRecipes.length) * 100).toFixed(1)}%)`)
if (imperfectList.length > 0) {
  console.log('Remaining imperfect recipes count:', imperfectList.length)
  console.log('Examples:', imperfectList.slice(0, 5))
}
