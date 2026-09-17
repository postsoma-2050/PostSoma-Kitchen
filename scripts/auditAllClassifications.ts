import { CHINESE_HEALTHY_RECIPES } from '../src/data/chineseHealthyRecipes'
import { HOME_SWEET_HOME_RECIPES } from '../src/data/homeSweetHomeRecipes'
import { espressoBrowniesV3, hongShaoRouV3, caesarSaladV3 } from '../src/data/v3Examples'
import type { VisualRecipeV3, IngredientCategory } from '../src/types/recipeV3'
import { COOKING_METHODS, CUISINE_STYLES, DIFFICULTIES } from '../src/constants/taxonomy'

const allRecipes: VisualRecipeV3[] = [
  ...CHINESE_HEALTHY_RECIPES,
  ...HOME_SWEET_HOME_RECIPES,
  espressoBrowniesV3,
  hongShaoRouV3,
  caesarSaladV3,
]

const validCategories = new Set<IngredientCategory>([
  'main', 'produce', 'seasoning', 'liquid', 'dairy', 'grain', 'formula'
])
const validCuisines = new Set(CUISINE_STYLES.map(c => c.code))
const validMethods = new Set(COOKING_METHODS.map(m => m.code))
const validDifficulties = new Set(DIFFICULTIES.map(d => d.code))

console.log('================================================================')
console.log('   PostSoma Kitchen 数据库全量食谱分类与格式规范深度审计        ')
console.log('================================================================\n')

let totalIngredients = 0
let totalSteps = 0

// 1. 食材层统计
const ingredientIssues: {
  recipeId: string
  recipeTitle: string
  ingredientId: string
  name: string
  amountText?: string
  category: string
  issue: string
}[] = []

const categoryCounts: Record<string, number> = {}

// 2. 步骤层统计
const stepIssues: {
  recipeId: string
  recipeTitle: string
  stepId: string
  stepLabel: string
  issue: string
}[] = []

// 3. 食谱层统计
const recipeIssues: {
  recipeId: string
  recipeTitle: string
  issue: string
}[] = []

for (const recipe of allRecipes) {
  // 食谱层校验
  if (!validCuisines.has(recipe.cuisine as any)) {
    recipeIssues.push({ recipeId: recipe.id, recipeTitle: recipe.title, issue: `非标菜系分类: ${recipe.cuisine}` })
  }
  if (!validDifficulties.has(recipe.difficulty as any)) {
    recipeIssues.push({ recipeId: recipe.id, recipeTitle: recipe.title, issue: `非标难度分类: ${recipe.difficulty}` })
  }
  if (!recipe.finalBlock || !recipe.finalBlock.method) {
    recipeIssues.push({ recipeId: recipe.id, recipeTitle: recipe.title, issue: `缺失最终烹饪方式 finalBlock.method` })
  } else if (!validMethods.has(recipe.finalBlock.method as any)) {
    recipeIssues.push({ recipeId: recipe.id, recipeTitle: recipe.title, issue: `非标最终烹饪方式: ${recipe.finalBlock.method}` })
  }

  // 食材层校验
  const ingredientIdSet = new Set<string>()
  const usedIngredientIds = new Set<string>()

  for (const block of recipe.actionBlocks || []) {
    for (const id of block.ingredientIds || []) {
      usedIngredientIds.add(id)
    }
  }

  for (const ing of recipe.ingredients || []) {
    totalIngredients++
    ingredientIdSet.add(ing.id)
    categoryCounts[ing.category] = (categoryCounts[ing.category] || 0) + 1

    // 分类检查
    if (!ing.category) {
      ingredientIssues.push({
        recipeId: recipe.id, recipeTitle: recipe.title, ingredientId: ing.id,
        name: ing.name, amountText: ing.amountText, category: ing.category,
        issue: '未指定食材分类 (category 为空)'
      })
    } else if (!validCategories.has(ing.category) && ing.category !== 'other') {
      ingredientIssues.push({
        recipeId: recipe.id, recipeTitle: recipe.title, ingredientId: ing.id,
        name: ing.name, amountText: ing.amountText, category: ing.category,
        issue: `非标食材分类: ${ing.category}`
      })
    } else if (ing.category === 'other') {
      ingredientIssues.push({
        recipeId: recipe.id, recipeTitle: recipe.title, ingredientId: ing.id,
        name: ing.name, amountText: ing.amountText, category: ing.category,
        issue: '使用兜底 other 分类，缺少明确细分分类'
      })
    }

    // 原子化检查：名称中是否有复合连字符
    if (ing.category !== 'formula' && /[、&]|(?:\S与\S)|(?:\S和\S)|(?:\S及\S)/.test(ing.name)) {
      ingredientIssues.push({
        recipeId: recipe.id, recipeTitle: recipe.title, ingredientId: ing.id,
        name: ing.name, amountText: ing.amountText, category: ing.category,
        issue: `食材名称疑似复合连写 (含顿号/与/和/及/&)`
      })
    }

    // 原子化检查：用量文本中是否有复合连写
    if (ing.amountText && /[+＋]|(?:\b各\b)|(?:\S各\d)/.test(ing.amountText)) {
      ingredientIssues.push({
        recipeId: recipe.id, recipeTitle: recipe.title, ingredientId: ing.id,
        name: ing.name, amountText: ing.amountText, category: ing.category,
        issue: `用量文本疑似复合连写 (含+/各等合并用量)`
      })
    }

    // 悬空检查
    if (!usedIngredientIds.has(ing.id)) {
      ingredientIssues.push({
        recipeId: recipe.id, recipeTitle: recipe.title, ingredientId: ing.id,
        name: ing.name, amountText: ing.amountText, category: ing.category,
        issue: `食材未被任何工序使用 (悬空食材)`
      })
    }
  }

  // 步骤层校验
  const blockIds = new Set((recipe.actionBlocks || []).map(b => b.id))
  for (const block of recipe.actionBlocks || []) {
    totalSteps++

    // 检查引用的食材是否存在
    for (const ingId of block.ingredientIds || []) {
      if (!ingredientIdSet.has(ingId)) {
        stepIssues.push({
          recipeId: recipe.id, recipeTitle: recipe.title, stepId: block.id,
          stepLabel: block.label, issue: `引用了不存在的食材 ID: ${ingId}`
        })
      }
    }

    // 检查依赖分类
    const hasTypedDeps = Array.isArray(block.dependencies) && block.dependencies.length > 0
    const hasInputBlocks = Array.isArray(block.inputBlockIds) && block.inputBlockIds.length > 0
    const hasAfterBlocks = Array.isArray(block.afterBlockIds) && block.afterBlockIds.length > 0

    if (block.stageIndex > 0 && !hasTypedDeps && !hasInputBlocks && !hasAfterBlocks) {
      stepIssues.push({
        recipeId: recipe.id, recipeTitle: recipe.title, stepId: block.id,
        stepLabel: block.label, issue: `后续阶段 (stageIndex=${block.stageIndex}) 缺少上游关系分类声明 (material/order)`
      })
    }

    // 检查依赖源是否存在
    if (block.dependencies) {
      for (const dep of block.dependencies) {
        if (!blockIds.has(dep.sourceBlockId)) {
          stepIssues.push({
            recipeId: recipe.id, recipeTitle: recipe.title, stepId: block.id,
            stepLabel: block.label, issue: `依赖引用了不存在的源工序: ${dep.sourceBlockId}`
          })
        }
        if (!['material', 'order', 'legacy'].includes(dep.type)) {
          stepIssues.push({
            recipeId: recipe.id, recipeTitle: recipe.title, stepId: block.id,
            stepLabel: block.label, issue: `非标依赖关系分类: ${dep.type}`
          })
        }
      }
    }

    // 检查加热工序是否缺乏火候分类
    const isHeating = /炒|煎|炸|蒸|煮|炖|焖|烤|焯|烧|汆|熬|爆|烘|sear|fry|bake|boil|steam|stew|simmer|brown|sauté/i.test(block.label + (block.notes || '') + (block.note || ''))
    if (isHeating && !block.heatLevel) {
      stepIssues.push({
        recipeId: recipe.id, recipeTitle: recipe.title, stepId: block.id,
        stepLabel: block.label, issue: `加热工序缺少火候分类 (heatLevel 未标注)`
      })
    }
  }
}

console.log(`• 全库食谱总数: ${allRecipes.length} 道`)
console.log(`• 全库食材总数: ${totalIngredients} 项`)
console.log(`• 全库步骤总数: ${totalSteps} 道工序\n`)

console.log('--- 食材分类分布 ---')
console.table(categoryCounts)

console.log('\n--- 审计发现的问题汇总 ---')
console.log(`• 食谱级分类问题: ${recipeIssues.length} 个`)
if (recipeIssues.length > 0) console.table(recipeIssues)

console.log(`\n• 食材级分类与原子化问题: ${ingredientIssues.length} 个`)
const compoundNames = ingredientIssues.filter(i => i.issue.includes('食材名称疑似复合'))
const compoundAmounts = ingredientIssues.filter(i => i.issue.includes('用量文本疑似复合'))
const otherCategory = ingredientIssues.filter(i => i.issue.includes('other'))
const unusedIngs = ingredientIssues.filter(i => i.issue.includes('未被任何工序使用'))
console.log(`   - 食材名称复合连写: ${compoundNames.length} 项`)
console.log(`   - 用量文本复合连写: ${compoundAmounts.length} 项`)
console.log(`   - 兜底 other 缺少细分分类: ${otherCategory.length} 项`)
console.log(`   - 悬空未用食材: ${unusedIngs.length} 项`)

console.log(`\n• 步骤级分类与关系问题: ${stepIssues.length} 个`)
const missingDeps = stepIssues.filter(s => s.issue.includes('缺少上游关系分类声明'))
const missingHeat = stepIssues.filter(s => s.issue.includes('加热工序缺少火候分类'))
const brokenRef = stepIssues.filter(s => s.issue.includes('不存在'))
console.log(`   - 后续步骤缺少上游分类声明: ${missingDeps.length} 个`)
console.log(`   - 加热步骤缺少火候分类: ${missingHeat.length} 个`)
console.log(`   - 损坏引用: ${brokenRef.length} 个`)


console.log('\n================================================================')
console.log('            28 项复合食材名称明细清单                           ')
console.log('================================================================')
for (const item of compoundNames) {
  console.log(`[${item.recipeId}] ${item.ingredientId}: "${item.name}" | 用量: "${item.amountText}" | 分类: ${item.category}`)
}

console.log('\n================================================================')
console.log('            7 项未明确分类 (category: other) 明细清单          ')
console.log('================================================================')
for (const item of otherCategory) {
  console.log(`[${item.recipeId}] ${item.ingredientId}: "${item.name}" | 用量: "${item.amountText}"`)
}


console.log('\n================================================================')
console.log('            84 项复合用量文本 (amountText) 采样清单             ')
console.log('================================================================')
for (const item of compoundAmounts.slice(0, 30)) {
  console.log(`[${item.recipeId}] ${item.ingredientId}: "${item.name}" | 用量: "${item.amountText}"`)
}


console.log('\n================================================================')
console.log('            损坏引用与悬空未用食材明细                           ')
console.log('================================================================')
for (const s of brokenRef) {
  console.log(`[BrokenRef] [${s.recipeId}] ${s.stepId}: ${s.issue}`)
}
for (const u of unusedIngs) {
  console.log(`[UnusedIng] [${u.recipeId}] ${u.ingredientId}: "${u.name}"`)
}

