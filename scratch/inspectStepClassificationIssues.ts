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

interface StepIssue {
  recipeId: string
  recipeTitle: string
  stepId: string
  stepLabel: string
  stageIndex: number
  issue: string
  notes?: string
  rawSteps?: string[]
}

const missingDeps: StepIssue[] = []
const missingHeat: StepIssue[] = []

for (const recipe of allRecipes) {
  const blockIds = new Set(recipe.actionBlocks.map(b => b.id))
  
  for (let i = 0; i < recipe.actionBlocks.length; i++) {
    const block = recipe.actionBlocks[i]
    
    // 依赖分类
    const hasTypedDeps = Array.isArray(block.dependencies) && block.dependencies.length > 0
    const hasInputBlocks = Array.isArray(block.inputBlockIds) && block.inputBlockIds.length > 0
    const hasAfterBlocks = Array.isArray(block.afterBlockIds) && block.afterBlockIds.length > 0

    if (block.stageIndex > 0 && !hasTypedDeps && !hasInputBlocks && !hasAfterBlocks) {
      missingDeps.push({
        recipeId: recipe.id,
        recipeTitle: recipe.title,
        stepId: block.id,
        stepLabel: block.label,
        stageIndex: block.stageIndex,
        issue: '缺少上游依赖分类声明',
        notes: block.notes || block.note,
        rawSteps: recipe.actionBlocks.map(b => `${b.id}(stage:${b.stageIndex}, ${b.label})`)
      })
    }

    // 火候分类
    const isHeating = /炒|煎|炸|蒸|煮|炖|焖|烤|焯|烧|汆|熬|爆|烘|sear|fry|bake|boil|steam|stew|simmer|brown|sauté/i.test(
      block.label + (block.notes || '') + (block.note || '')
    )
    if (isHeating && !block.heatLevel) {
      missingHeat.push({
        recipeId: recipe.id,
        recipeTitle: recipe.title,
        stepId: block.id,
        stepLabel: block.label,
        stageIndex: block.stageIndex,
        issue: '加热工序缺少火候分类',
        notes: block.notes || block.note
      })
    }
  }
}

console.log(`=== 缺少依赖分类声明: ${missingDeps.length} 处 ===`)
const depsByRecipe = new Map<string, StepIssue[]>()
for (const item of missingDeps) {
  const arr = depsByRecipe.get(item.recipeId) || []
  arr.push(item)
  depsByRecipe.set(item.recipeId, arr)
}
console.log(`涉及食谱数: ${depsByRecipe.size} 道`)
for (const [rId, items] of depsByRecipe) {
  console.log(`[${rId}] ${items[0].recipeTitle}:`)
  for (const it of items) {
    console.log(`  - 阶段 ${it.stageIndex} [${it.stepId}] "${it.stepLabel}"`)
  }
}

console.log(`\n=== 加热工序缺少火候分类: ${missingHeat.length} 处 ===`)
const heatByRecipe = new Map<string, StepIssue[]>()
for (const item of missingHeat) {
  const arr = heatByRecipe.get(item.recipeId) || []
  arr.push(item)
  heatByRecipe.set(item.recipeId, arr)
}
console.log(`涉及食谱数: ${heatByRecipe.size} 道`)
for (const [rId, items] of heatByRecipe) {
  console.log(`[${rId}] ${items[0].recipeTitle}:`)
  for (const it of items) {
    console.log(`  - 阶段 ${it.stageIndex} [${it.stepId}] "${it.stepLabel}" (说明: ${it.notes || '无'})`)
  }
}
