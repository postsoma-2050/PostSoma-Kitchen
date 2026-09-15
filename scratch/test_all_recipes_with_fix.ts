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

function computeExtendedRails(layout: any) {
  const rails: any[] = []
  layout.actionBlockLayouts.forEach((lb: any) => {
    const cardTop = lb.y
    const cardBottom = lb.y + lb.h

    // Group participating rows into contiguous clusters
    const usedIngIds = lb.block.ingredientIds || []
    const participatingRows = usedIngIds
      .map((id: string) => ({ id, row: layout.ingredientRows.findIndex((r: any) => r.ingredient.id === id) }))
      .filter((item: any) => item.row !== -1)
      .sort((a: any, b: any) => a.row - b.row)

    if (participatingRows.length === 0) return

    const clusters: number[][] = []
    let currentCluster: number[] = []
    participatingRows.forEach((item: any) => {
      if (currentCluster.length === 0) {
        currentCluster.push(item.row)
      } else {
        const prev = currentCluster[currentCluster.length - 1]
        if (item.row === prev + 1) {
          currentCluster.push(item.row)
        } else {
          clusters.push(currentCluster)
          currentCluster = [item.row]
        }
      }
    })
    if (currentCluster.length > 0) {
      clusters.push(currentCluster)
    }

    clusters.forEach((cluster, cIdx) => {
      const rowYs = cluster.map(r => layout.contentStartY + r * layout.ingredientRows[0].h + layout.ingredientRows[0].h / 2)
      const minRowY = Math.min(...rowYs)
      const maxRowY = Math.max(...rowYs)

      let startY: number | null = null
      let endY: number | null = null

      if (maxRowY < cardTop) {
        // Entire cluster is above card: extend from minRowY down to cardTop
        startY = minRowY
        endY = cardTop
      } else if (minRowY > cardBottom) {
        // Entire cluster is below card: extend from cardBottom down to maxRowY
        startY = cardBottom
        endY = maxRowY
      } else {
        // Cluster intersects or is inside card
        if (cluster.length > 1) {
          startY = minRowY
          endY = maxRowY
          if (minRowY < cardTop) startY = minRowY
          if (maxRowY > cardBottom) endY = maxRowY
        } else {
          if (minRowY < cardTop) {
            startY = minRowY
            endY = cardTop
          } else if (minRowY > cardBottom) {
            startY = cardBottom
            endY = minRowY
          }
        }
      }

      if (startY !== null && endY !== null && Math.abs(endY - startY) > 0.5) {
        rails.push({
          id: `rail-${lb.block.id}-c${cIdx}`,
          blockId: lb.block.id,
          x: lb.x,
          startY,
          endY,
          participatingRowIndices: cluster,
        })
      }
    })
  })
  return rails
}

let remainingIsolatedPins = 0

allRecipes.forEach(r => {
  const layout = buildV3MatrixLayout(r)
  const newRails = computeExtendedRails(layout)

  layout.actionBlockLayouts.forEach(lb => {
    const usedIngIds = lb.block.ingredientIds || []
    const participatingRows = usedIngIds
      .map(id => ({ id, row: layout.ingredientRows.findIndex(row => row.ingredient.id === id) }))
      .filter(item => item.row !== -1)
    
    participatingRows.forEach(item => {
      const pinY = layout.contentStartY + item.row * layout.ingredientRows[0].h + layout.ingredientRows[0].h / 2
      const isInsideCard = pinY >= lb.y && pinY <= (lb.y + lb.h)
      const hasRail = newRails.some(rail => rail.blockId === lb.block.id && pinY >= Math.min(rail.startY, rail.endY) - 0.5 && pinY <= Math.max(rail.startY, rail.endY) + 0.5)
      if (!isInsideCard && !hasRail) {
        remainingIsolatedPins++
        console.log(`STILL ISOLATED: recipe=${r.id}, block=${lb.block.id}, ing=${item.id}, pinY=${pinY}, card=[${lb.y}..${lb.y+lb.h}]`)
      }
    })
  })
})

console.log(`Remaining isolated pins after fix across all 122 recipes: ${remainingIsolatedPins}`)
