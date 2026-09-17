import fs from 'fs'
import path from 'path'
import { CHINESE_HEALTHY_RECIPES } from '../src/data/chineseHealthyRecipes'
import { HOME_SWEET_HOME_RECIPES } from '../src/data/homeSweetHomeRecipes'
import { espressoBrowniesV3, hongShaoRouV3, caesarSaladV3 } from '../src/data/v3Examples'
import type { VisualRecipeV3 } from '../src/types/recipeV3'

const allRecipes: VisualRecipeV3[] = [
  ...CHINESE_HEALTHY_RECIPES,
  ...HOME_SWEET_HOME_RECIPES,
  espressoBrowniesV3,
  hongShaoRouV3,
  caesarSaladV3,
]

// 找出每个食谱在哪个文件中
// 8 batches in src/data/recipes/chinese/
// homeSweetHomeRecipes.ts
// v3Examples.ts

const report = {
  missingDeps: [] as any[],
  missingHeat: [] as any[]
}

for (const recipe of allRecipes) {
  for (let i = 0; i < recipe.actionBlocks.length; i++) {
    const block = recipe.actionBlocks[i]
    
    const hasTypedDeps = Array.isArray(block.dependencies) && block.dependencies.length > 0
    const hasInputBlocks = Array.isArray(block.inputBlockIds) && block.inputBlockIds.length > 0
    const hasAfterBlocks = Array.isArray(block.afterBlockIds) && block.afterBlockIds.length > 0

    if (block.stageIndex > 0 && !hasTypedDeps && !hasInputBlocks && !hasAfterBlocks) {
      report.missingDeps.push({
        recipeId: recipe.id,
        recipeTitle: recipe.title,
        stepId: block.id,
        stageIndex: block.stageIndex,
        label: block.label,
        notes: block.notes || block.note,
        prevStepId: recipe.actionBlocks[i - 1]?.id,
        prevStepLabel: recipe.actionBlocks[i - 1]?.label
      })
    }

    const isHeating = /炒|煎|炸|蒸|煮|炖|焖|烤|焯|烧|汆|熬|爆|烘|sear|fry|bake|boil|steam|stew|simmer|brown|sauté/i.test(
      block.label + (block.notes || '') + (block.note || '')
    )
    if (isHeating && !block.heatLevel) {
      report.missingHeat.push({
        recipeId: recipe.id,
        recipeTitle: recipe.title,
        stepId: block.id,
        stageIndex: block.stageIndex,
        label: block.label,
        notes: block.notes || block.note
      })
    }
  }
}

fs.writeFileSync(
  path.join(__dirname, 'stepIssuesReport.json'),
  JSON.stringify(report, null, 2),
  'utf8'
)

console.log(`Saved step issues report:`)
console.log(`Missing Deps: ${report.missingDeps.length}`)
console.log(`Missing Heat: ${report.missingHeat.length}`)
