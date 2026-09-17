import fs from 'fs'
import path from 'path'
import type { VisualRecipeV3, V3Ingredient, V3ActionBlock } from '../src/types/recipeV3'
import { buildRecipeV3 } from './buildAuthenticChineseRecipes'

// 1. 读取原书 151 道提取出来的食谱
const rawEpubRecipes = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'reports', 'epub_authentic_151_recipes.json'), 'utf8')
)

// 2. 读取 legacy 102 食谱源码并以模块化动态导入
// 为了获取旧版前 52 道的强类型对象，我们使用 runTs 或在 node 环境直接解析旧版
const legacyPath = path.join(process.cwd(), 'src', 'data', 'chineseHealthyRecipes.legacy-102.ts')
const legacyContent = fs.readFileSync(legacyPath, 'utf8')

/**
 * 拆解复合食材的规则字典：
 * 将旧版 64 处复合食材名称，映射为原子食材数组
 */
function decompoundIngredient(ing: V3Ingredient): V3Ingredient[] {
  const name = ing.name
  if (!name.includes('、') && !name.includes('与') && !name.includes('和') && !name.includes('及')) {
    return [ing]
  }

  // 规则拆解
  if (name === '泡椒末与葱姜蒜') {
    return [
      { id: `${ing.id}_1`, name: '泡红椒末', amountText: '10 g', category: 'seasoning' },
      { id: `${ing.id}_2`, name: '葱姜蒜末', amountText: '15 g', category: 'seasoning' }
    ]
  }
  if (name === '姜末与白糖盐') {
    return [
      { id: `${ing.id}_1`, name: '生姜末', amountText: '5 g', category: 'seasoning' },
      { id: `${ing.id}_2`, name: '食盐', amountText: '2 g', category: 'seasoning' },
      { id: `${ing.id}_3`, name: '白糖', amountText: '3 g', category: 'seasoning' }
    ]
  }
  if (name === '蒸鱼豉油与葱花') {
    return [
      { id: `${ing.id}_1`, name: '蒸鱼豉油', amountText: '15 ml', category: 'seasoning' },
      { id: `${ing.id}_2`, name: '鲜葱花', amountText: '5 g', category: 'seasoning' }
    ]
  }
  if (name === '姜末与葱末') {
    return [
      { id: `${ing.id}_1`, name: '生姜末', amountText: '5 g', category: 'seasoning' },
      { id: `${ing.id}_2`, name: '大葱末', amountText: '5 g', category: 'seasoning' }
    ]
  }
  if (name === '料酒与酱油') {
    return [
      { id: `${ing.id}_1`, name: '料酒', amountText: '10 ml', category: 'seasoning' },
      { id: `${ing.id}_2`, name: '生抽酱油', amountText: '15 ml', category: 'seasoning' }
    ]
  }
  if (name === '食盐与胡椒粉') {
    return [
      { id: `${ing.id}_1`, name: '食盐', amountText: '3 g', category: 'seasoning' },
      { id: `${ing.id}_2`, name: '白胡椒粉', amountText: '1 g', category: 'seasoning' }
    ]
  }
  if (name.includes('酱油与料酒')) {
    return [
      { id: `${ing.id}_1`, name: '酱油', amountText: '10 ml', category: 'seasoning' },
      { id: `${ing.id}_2`, name: '料酒', amountText: '10 ml', category: 'seasoning' }
    ]
  }
  if (name.includes('白胡椒粉与水淀粉')) {
    return [
      { id: `${ing.id}_1`, name: '白胡椒粉', amountText: '2 g', category: 'seasoning' },
      { id: `${ing.id}_2`, name: '水淀粉', amountText: '15 ml', category: 'seasoning' }
    ]
  }
  if (name.includes('香醋与香油')) {
    return [
      { id: `${ing.id}_1`, name: '保宁香醋', amountText: '5 ml', category: 'seasoning' },
      { id: `${ing.id}_2`, name: '芝麻香油', amountText: '3 ml', category: 'seasoning' }
    ]
  }
  if (name.includes('蛋清与水淀粉')) {
    return [
      { id: `${ing.id}_1`, name: '新鲜蛋清', amountText: '1 个', category: 'main' },
      { id: `${ing.id}_2`, name: '上浆水淀粉', amountText: '10 g', category: 'seasoning' }
    ]
  }
  if (name.includes('干红辣椒段与花椒')) {
    return [
      { id: `${ing.id}_1`, name: '干红辣椒段', amountText: '5 g', category: 'seasoning' },
      { id: `${ing.id}_2`, name: '花椒粒', amountText: '2 g', category: 'seasoning' }
    ]
  }
  if (name.includes('葱段与姜片') || name.includes('葱段、姜片')) {
    return [
      { id: `${ing.id}_1`, name: '大葱段', amountText: '10 g', category: 'seasoning' },
      { id: `${ing.id}_2`, name: '生姜片', amountText: '5 g', category: 'seasoning' }
    ]
  }
  if (name.includes('料酒与植物油')) {
    return [
      { id: `${ing.id}_1`, name: '料酒', amountText: '10 ml', category: 'seasoning' },
      { id: `${ing.id}_2`, name: '植物油', amountText: '15 ml', category: 'seasoning' }
    ]
  }
  if (name.includes('盐与香菜段')) {
    return [
      { id: `${ing.id}_1`, name: '食盐', amountText: '2 g', category: 'seasoning' },
      { id: `${ing.id}_2`, name: '鲜香菜段', amountText: '5 g', category: 'produce' }
    ]
  }

  // 通用自动按分隔符拆解
  const parts = name.split(/[、与和及]/).map(p => p.trim()).filter(Boolean)
  if (parts.length > 1) {
    return parts.map((part, pIdx) => ({
      id: `${ing.id}_${pIdx + 1}`,
      name: part.replace(/[\(\)（）]/g, '').trim(),
      amountText: ing.amountText || '适量',
      category: ing.category
    }))
  }

  return [ing]
}

/**
 * 清洗并重构旧版单道食谱
 */
export function cleanLegacyRecipe(recipe: VisualRecipeV3): VisualRecipeV3 {
  const idMap = new Map<string, string[]>()
  const newIngredients: V3Ingredient[] = []

  recipe.ingredients.forEach(ing => {
    const decompounded = decompoundIngredient(ing)
    idMap.set(ing.id, decompounded.map(d => d.id))
    newIngredients.push(...decompounded)
  })

  // 更新 actionBlocks 中的 ingredientIds
  const newBlocks: V3ActionBlock[] = recipe.actionBlocks.map(block => {
    const updatedIds: string[] = []
    block.ingredientIds.forEach(oldId => {
      const mapped = idMap.get(oldId)
      if (mapped) updatedIds.push(...mapped)
      else updatedIds.push(oldId)
    })
    return {
      ...block,
      ingredientIds: updatedIds
    }
  })

  return {
    ...recipe,
    ingredients: newIngredients,
    actionBlocks: newBlocks
  }
}
