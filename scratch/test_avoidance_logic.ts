import { buildV3MatrixLayout } from '../src/utils/matrixFlowLayout'
import { normalizeRecipe } from '../src/services/recipeNormalizer'
import { caseARaw } from './inspect_case_a_layout'

function computeWaitingAvoidancePaths(layout: any) {
  const blocks = layout.actionBlockLayouts
  const contentStartY = layout.contentStartY

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

    // Build avoidance path through all obstacles
    let currentX = wp.startX
    let currentY = wp.startY
    const pathParts: string[] = [`M ${currentX} ${currentY}`]
    const r = 4 // Corner radius

    collidingObstacles.forEach((obs: any) => {
      const turnX1 = Math.max(currentX + 4, obs.x - 8)
      const turnX2 = Math.min(wp.endX - 4, obs.x + obs.w + 8)

      // Decide whether to route above or below
      const preferAbove = wp.startY < (obs.y + obs.h / 2)
      let corridorY: number
      if (preferAbove && (obs.y - 12 >= contentStartY + 4)) {
        corridorY = obs.y - 12
      } else {
        corridorY = obs.y + obs.h + 12
      }

      // 1. Horizontal line to turnX1
      pathParts.push(`L ${turnX1 - r} ${currentY}`)
      // 2. Turn towards corridorY
      const signY1 = corridorY > currentY ? 1 : -1
      pathParts.push(`Q ${turnX1} ${currentY}, ${turnX1} ${currentY + signY1 * r}`)
      // 3. Vertical line to corridorY
      pathParts.push(`L ${turnX1} ${corridorY - signY1 * r}`)
      // 4. Turn to horizontal at corridorY
      pathParts.push(`Q ${turnX1} ${corridorY}, ${turnX1 + r} ${corridorY}`)
      // 5. Horizontal line across obstacle to turnX2
      pathParts.push(`L ${turnX2 - r} ${corridorY}`)
      // 6. Turn back towards wp.startY
      const signY2 = wp.startY > corridorY ? 1 : -1
      pathParts.push(`Q ${turnX2} ${corridorY}, ${turnX2} ${corridorY + signY2 * r}`)
      // 7. Vertical line back to wp.startY
      pathParts.push(`L ${turnX2} ${wp.startY - signY2 * r}`)
      // 8. Turn to horizontal at wp.startY
      pathParts.push(`Q ${turnX2} ${wp.startY}, ${turnX2 + r} ${wp.startY}`)

      currentX = turnX2 + r
      currentY = wp.startY
    })

    // Final segment to endX
    pathParts.push(`L ${wp.endX} ${wp.startY}`)
    return {
      ...wp,
      pathD: pathParts.join(' ')
    }
  })
}

const caseANorm = normalizeRecipe(caseARaw)
const layoutA = buildV3MatrixLayout(caseANorm)
const pathsA = computeWaitingAvoidancePaths(layoutA)

console.log('=== Case A Waiting Paths with Avoidance ===')
pathsA.forEach((p: any) => {
  console.log(`Path ${p.id} (ing=${p.ingredientId}, y=${p.startY}):`)
  console.log(`  hasAvoidance: ${Boolean(p.pathD)}`)
  if (p.pathD) console.log(`  pathD: ${p.pathD}`)
})
