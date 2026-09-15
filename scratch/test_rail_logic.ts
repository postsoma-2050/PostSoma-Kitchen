import { buildV3MatrixLayout } from '../src/utils/matrixFlowLayout'
import { normalizeRecipe } from '../src/services/recipeNormalizer'
import { CHINESE_HEALTHY_RECIPES } from '../src/data/chineseHealthyRecipes'
import { caseARaw } from './inspect_case_a_layout'

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
          startY = Math.min(minRowY, cardTop)
          endY = Math.max(maxRowY, cardBottom)
          // Actually, if it's inside the card and cluster.length > 1, startY is minRowY and endY is maxRowY
          startY = minRowY
          endY = maxRowY
          if (minRowY < cardTop) startY = minRowY
          if (maxRowY > cardBottom) endY = maxRowY
        } else {
          // Single row inside card: if it's strictly inside, it's on the card border.
          // But if it's slightly outside cardTop or cardBottom:
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

const caseANorm = normalizeRecipe(caseARaw)
const layoutA = buildV3MatrixLayout(caseANorm)
console.log('=== Extended Rails for Case A ===')
console.log(computeExtendedRails(layoutA))

const cn59Local = CHINESE_HEALTHY_RECIPES.find(r => r.id === 'cn-59-qincai-niurou')!
const layoutB = buildV3MatrixLayout(cn59Local)
console.log('\n=== Extended Rails for Case B ===')
console.log(computeExtendedRails(layoutB))
