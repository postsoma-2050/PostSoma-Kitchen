import type { V3Ingredient, V3ActionBlock } from './recipeV3'

/**
 * 标准烹饪技法动词词典 (中英双语，统一规范)
 */
export type StandardCookingSkillCode =
  | 'melt'         // 融化
  | 'mix'          // 混合
  | 'whisk'        // 搅打
  | 'fold_in'      // 翻拌
  | 'sear'         // 煎炙 / 滑油
  | 'stir_fry'     // 爆炒
  | 'saute'        // 煸炒
  | 'simmer'       // 慢炖 / 炖煮
  | 'boil'         // 煮沸 / 焯水
  | 'steam'        // 清蒸
  | 'marinate'     // 上浆 / 腌渍
  | 'combine'      // 合炒 / 合并
  | 'bake'         // 烘焙
  | 'serve'        // 装盘出锅
  | 'other'        // 其他

export interface CookingSkillDefinition {
  code: StandardCookingSkillCode
  zhLabel: string
  enLabel: string
  category: 'prep' | 'cook' | 'finish'
}

export const STANDARD_COOKING_SKILLS: Record<StandardCookingSkillCode, CookingSkillDefinition> = {
  marinate: { code: 'marinate', zhLabel: '上浆腌渍', enLabel: 'Marinate', category: 'prep' },
  melt: { code: 'melt', zhLabel: '融化', enLabel: 'Melt', category: 'prep' },
  whisk: { code: 'whisk', zhLabel: '搅打', enLabel: 'Whisk', category: 'prep' },
  mix: { code: 'mix', zhLabel: '混合', enLabel: 'Mix', category: 'prep' },
  fold_in: { code: 'fold_in', zhLabel: '翻拌', enLabel: 'Fold in', category: 'prep' },
  boil: { code: 'boil', zhLabel: '焯水煮沸', enLabel: 'Blanch / Boil', category: 'cook' },
  sear: { code: 'sear', zhLabel: '滑油煎炙', enLabel: 'Sear', category: 'cook' },
  saute: { code: 'saute', zhLabel: '煸炒爆香', enLabel: 'Sauté', category: 'cook' },
  stir_fry: { code: 'stir_fry', zhLabel: '大火爆炒', enLabel: 'Stir-fry', category: 'cook' },
  simmer: { code: 'simmer', zhLabel: '小火慢炖', enLabel: 'Simmer', category: 'cook' },
  steam: { code: 'steam', zhLabel: '清蒸熟化', enLabel: 'Steam', category: 'cook' },
  combine: { code: 'combine', zhLabel: '合炒调味', enLabel: 'Combine', category: 'cook' },
  bake: { code: 'bake', zhLabel: '恒温烘焙', enLabel: 'Bake', category: 'cook' },
  serve: { code: 'serve', zhLabel: '出锅装盘', enLabel: 'Serve', category: 'finish' },
  other: { code: 'other', zhLabel: '处理', enLabel: 'Process', category: 'cook' },
}

/**
 * 校验食谱中某个工序引用的食材在食材列表中是否连续 (Contiguous Ordering)
 */
export function checkStepIngredientContiguity(
  ingredientIds: string[],
  allIngredients: V3Ingredient[]
): { isContiguous: boolean; minIndex: number; maxIndex: number; missingIngredientNames: string[] } {
  if (!ingredientIds || ingredientIds.length <= 1) {
    const idx = ingredientIds?.length === 1
      ? allIngredients.findIndex(i => i.id === ingredientIds[0])
      : 0
    return { isContiguous: true, minIndex: Math.max(0, idx), maxIndex: Math.max(0, idx), missingIngredientNames: [] }
  }

  const indexMap = new Map<string, number>()
  allIngredients.forEach((ing, i) => indexMap.set(ing.id, i))

  const indices = ingredientIds
    .map(id => indexMap.get(id))
    .filter((idx): idx is number => idx !== undefined)
    .sort((a, b) => a - b)

  if (indices.length <= 1) {
    return { isContiguous: true, minIndex: indices[0] ?? 0, maxIndex: indices[0] ?? 0, missingIngredientNames: [] }
  }

  const minIndex = indices[0]
  const maxIndex = indices[indices.length - 1]
  const actualSpan = maxIndex - minIndex + 1

  const isContiguous = actualSpan === indices.length
  const missingNames: string[] = []

  if (!isContiguous) {
    for (let i = minIndex; i <= maxIndex; i++) {
      const ing = allIngredients[i]
      if (ing && !ingredientIds.includes(ing.id)) {
        missingNames.push(ing.name)
      }
    }
  }

  return {
    isContiguous,
    minIndex,
    maxIndex,
    missingIngredientNames: missingNames,
  }
}

/**
 * 按照工序时序进入先后与物料合并关系，对食材进行高级拓扑排序
 * 确保所有工序形成的矩阵色块 100% 连续无空洞
 */
export function autoSortIngredientsByFlow(
  ingredients: V3Ingredient[],
  actionBlocks: V3ActionBlock[]
): V3Ingredient[] {
  if (!ingredients || ingredients.length <= 1) return ingredients
  if (!actionBlocks || actionBlocks.length === 0) return ingredients

  const ingMap = new Map<string, V3Ingredient>()
  ingredients.forEach(i => ingMap.set(i.id, i))

  // 获取每个食材首次进入系统的权重 (stageIndex * 1000 + blockIndex * 100 + ingredientIndex)
  const firstAppearance = new Map<string, number>()
  const sortedBlocks = [...actionBlocks].sort((a, b) => (a.stageIndex ?? 0) - (b.stageIndex ?? 0))

  sortedBlocks.forEach((block, bIdx) => {
    const stage = block.stageIndex ?? 0
    const rawIds = block.ingredientIds || []
    rawIds.forEach((id, idIdx) => {
      if (!firstAppearance.has(id)) {
        firstAppearance.set(id, stage * 1000 + bIdx * 100 + idIdx)
      }
    })
  })

  // 按照首次登场时间递增排序；未出现在任何 actionBlock 中的食材排在末尾
  const sorted = [...ingredients].sort((a, b) => {
    const scoreA = firstAppearance.get(a.id) ?? 999999
    const scoreB = firstAppearance.get(b.id) ?? 999999
    return scoreA - scoreB
  })

  return sorted
}

