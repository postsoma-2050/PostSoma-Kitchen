import { buildV3MatrixLayout } from '../src/utils/matrixFlowLayout'
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

console.log(`Auditing all ${allRecipes.length} recipes for rail & waiting collisions...`)

let recipesWithCollision = 0
let totalCollisions = 0
let recipesWithIsolatedPins = 0
let totalIsolatedPins = 0

allRecipes.forEach(r => {
  const layout = buildV3MatrixLayout(r)
  const blocks = layout.actionBlockLayouts

  // Check waiting path collisions
  let recipeCollisionCount = 0
  layout.ingredientWaitingPaths.forEach(wp => {
    const colliding = blocks.filter(b => {
      if (b.block.id === wp.targetBlockId) return false
      const isIntermediate = b.x >= wp.startX - 4 && (b.x + b.w) <= wp.endX + 4
      if (!isIntermediate) return false
      return wp.startY >= (b.y - 2) && wp.startY <= (b.y + b.h + 2)
    })
    if (colliding.length > 0) {
      recipeCollisionCount += colliding.length
    }
  })
  if (recipeCollisionCount > 0) {
    recipesWithCollision++
    totalCollisions += recipeCollisionCount
    console.log(`[COLLISION] ${r.id} (${r.title}): ${recipeCollisionCount} waiting path collisions with cards`)
  }

  // Check isolated pins (current layout)
  let recipeIsolatedPins = 0
  layout.actionBlockLayouts.forEach(lb => {
    const usedIngIds = lb.block.ingredientIds || []
    const participatingRows = usedIngIds
      .map(id => ({ id, row: layout.ingredientRows.findIndex(row => row.ingredient.id === id) }))
      .filter(item => item.row !== -1)
    
    participatingRows.forEach(item => {
      const pinY = layout.contentStartY + item.row * layout.ingredientRows[0].h + layout.ingredientRows[0].h / 2
      const isInsideCard = pinY >= lb.y && pinY <= (lb.y + lb.h)
      // Check if covered by any rail
      const hasRail = layout.intakeRailSegments.some(rail => rail.blockId === lb.block.id && pinY >= rail.startY && pinY <= rail.endY)
      if (!isInsideCard && !hasRail) {
        recipeIsolatedPins++
      }
    })
  })
  if (recipeIsolatedPins > 0) {
    recipesWithIsolatedPins++
    totalIsolatedPins += recipeIsolatedPins
    console.log(`[ISOLATED PIN] ${r.id} (${r.title}): ${recipeIsolatedPins} isolated pins not on card or rail`)
  }
})

console.log(`\nSummary of Current Baseline Issues:`)
console.log(`Recipes with waiting collisions: ${recipesWithCollision} / ${allRecipes.length} (${totalCollisions} total collisions)`)
console.log(`Recipes with isolated pins: ${recipesWithIsolatedPins} / ${allRecipes.length} (${totalIsolatedPins} total isolated pins)`)
