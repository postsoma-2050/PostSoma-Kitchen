import type { VisualRecipeV3 } from '@/types/recipeV3'

const MINUTE_PATTERN = /\bmins?\b/gi
const HOUR_PATTERN = /\bhours?\b/gi
const RANGE_PATTERN = /\s+to\s+/gi

export function getRecipeDisplayTitle(title: string): string {
  const withoutLeadingSymbols = title.replace(/^[^\p{L}\p{N}]+/u, '').trim()
  return withoutLeadingSymbols || title.trim()
}

export function getRecipeMethodLabel(method?: string): string {
  switch (method) {
    case 'bake': return '烘焙'
    case 'stew': return '炖煮'
    case 'fry': return '煎炒'
    case 'steam': return '蒸制'
    case 'serve':
    case 'raw': return '冷拌'
    default: return '其他做法'
  }
}

export function getRecipeDifficultyLabel(difficulty?: VisualRecipeV3['difficulty']): string {
  switch (difficulty) {
    case 'easy': return '简单'
    case 'medium': return '中等'
    case 'hard': return '繁复'
    default: return '难度待补充'
  }
}

export interface RecipeServingsPresentation {
  kind: 'servings' | 'yield'
  label: '原始份量' | '原始产量'
  value: string
}

/**
 * 忠实呈现 recipe data 中的原始 servings 语义。
 * 这里只做中文标点本地化，不推断人数、产量或任何换算基准。
 */
export function getRecipeServingsPresentation(
  servings?: string,
): RecipeServingsPresentation | null {
  const raw = servings?.trim()
  if (!raw) return null

  const value = raw
    .replace(/(\d)\s*[-~～–—]\s*(\d)/g, '$1–$2')
    .replace(/\s*\(([^()]*)\)/g, '（$1）')

  if (raw.includes('人份')) {
    return { kind: 'servings', label: '原始份量', value }
  }

  return { kind: 'yield', label: '原始产量', value }
}

function localizeDurationText(value: string): string {
  return value
    .trim()
    .replace(RANGE_PATTERN, '–')
    .replace(MINUTE_PATTERN, '分钟')
    .replace(HOUR_PATTERN, '小时')
}

export function getRecipeDurationLabel(recipe: VisualRecipeV3): string {
  if (recipe.cookingTimeText?.trim()) {
    return `总耗时 ${localizeDurationText(recipe.cookingTimeText)}`
  }

  if (recipe.finalBlock?.durationText?.trim()) {
    return `烹饪 ${localizeDurationText(recipe.finalBlock.durationText)}`
  }

  const durations = recipe.actionBlocks
    .map(block => block.durationMinutes)
    .filter((duration): duration is number => typeof duration === 'number' && duration > 0)

  if (durations.length > 0 && durations.length === recipe.actionBlocks.length) {
    const totalMinutes = durations.reduce((total, duration) => total + duration, 0)
    return `约 ${totalMinutes} 分钟`
  }

  return '时间见流程'
}
