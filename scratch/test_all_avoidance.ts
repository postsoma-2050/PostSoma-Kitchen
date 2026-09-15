import { buildV3MatrixLayout } from '../src/utils/matrixFlowLayout'
import { CHINESE_HEALTHY_RECIPES } from '../src/data/chineseHealthyRecipes'
import { HOME_SWEET_HOME_RECIPES } from '../src/data/homeSweetHomeRecipes'
import { espressoBrowniesV3, hongShaoRouV3, caesarSaladV3 } from '../src/data/v3Examples'
import { caseARaw } from './inspect_case_a_layout'
import { normalizeRecipe } from '../src/services/recipeNormalizer'

const allRecipes = [
  normalizeRecipe(caseARaw),
  ...CHINESE_HEALTHY_RECIPES,
  ...HOME_SWEET_HOME_RECIPES,
  espressoBrowniesV3,
  hongShaoRouV3,
  caesarSaladV3
]

function computeWaitingAvoidancePaths(layout: any) {
  const blocks = layout.actionBlockLayouts
  const contentStartY = layout.contentStartY
  const totalMatrixHeight = layout.numRows * layout.ingredientRows[0].h

  return layout.ingredientWaitingPaths.map((wp: any) => {
    // Find all obstacle blocks that lie between startX and endX and collide with wp.startY
    const collidingObstacles = blocks.filter((b: any) => {
      if (b.block.id === wp.targetBlockId) return false
      // Horizontally intermediate
      const isIntermediate = b.x >= wp.startX - 4 && (b.x + b.w) <= wp.endX + 4
      if (!isIntermediate) return false
      // Vertically colliding (within card bounds + 2px margin)
      const isColliding = wp.startY >= (b.y - 2) && wp.startY <= (b.y + b.h + 2)
      return isColliding
    }).sort((a: any, b: any) => a.x - b.x)

    if (collidingObstacles.length === 0) {
      return { ...wp, pathD: null }
    }

    let currentX = wp.startX
    let currentY = wp.startY
    const pathParts: string[] = [`M ${currentX} ${currentY}`]
    const r = 4

    collidingObstacles.forEach((obs: any) => {
      const turnX1 = Math.max(currentX + 4, obs.x - 8)
      const turnX2 = Math.min(wp.endX - 4, obs.x + obs.w + 8)

      const preferAbove = wp.startY < (obs.y + obs.h / 2)
      let corridorY: number
      if (preferAbove && (obs.y - 12 >= contentStartY + 4)) {
        corridorY = obs.y - 12
      } else {
        corridorY = obs.y + obs.h + 12
      }

      pathParts.push(`L ${turnX1 - r} ${currentY}`)
      const signY1 = corridorY > currentY ? 1 : -1
      pathParts.push(`Q ${turnX1} ${currentY}, ${turnX1} ${currentY + signY1 * r}`)
      pathParts.push(`L ${turnX1} ${corridorY - signY1 * r}`)
      pathParts.push(`Q ${turnX1} ${corridorY}, ${turnX1 + r} ${corridorY}`)
      pathParts.push(`L ${turnX2 - r} ${corridorY}`)
      const signY2 = wp.startY > corridorY ? 1 : -1
      pathParts.push(`Q ${turnX2} ${corridorY}, ${turnX2} ${corridorY + signY2 * r}`)
      pathParts.push(`L ${turnX2} ${wp.startY - signY2 * r}`)
      pathParts.push(`Q ${turnX2} ${wp.startY}, ${turnX2 + r} ${wp.startY}`)

      currentX = turnX2 + r
      currentY = wp.startY
    })

    pathParts.push(`L ${wp.endX} ${wp.startY}`)
    return {
      ...wp,
      pathD: pathParts.join(' ')
    }
  })
}

let routedCount = 0
allRecipes.forEach(r => {
  const layout = buildV3MatrixLayout(r)
  const paths = computeWaitingAvoidancePaths(layout)
  paths.forEach(p => {
    if (p.pathD) {
      routedCount++
      console.log(`Routed bypass in recipe ${r.id}: ing=${p.ingredientId}, y=${p.startY}`)
    }
  })
})
console.log(`Total waiting paths that needed bypass routing: ${routedCount}`)
