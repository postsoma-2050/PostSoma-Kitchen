import type { SubRecipeFormula, ScaledFormulaItem } from '@/types/formula'

/**
 * 格式化数值与单位，自动做智能小数化整
 */
export function formatAmount(val: number, unit: string): string {
  if (isNaN(val) || val <= 0) return unit
  let rounded = Math.round(val * 100) / 100
  if (rounded % 1 === 0) {
    return `${rounded} ${unit}`.trim()
  }
  return `${rounded.toFixed(1)} ${unit}`.trim()
}

/**
 * 根据目标份数 (targetServings) 对 SubRecipeFormula 进行动态换算
 */
export function calculateScaledFormula(
  formula: SubRecipeFormula,
  targetServings: number
): ScaledFormulaItem[] {
  const base = formula.baseServings && formula.baseServings > 0 ? formula.baseServings : 2
  const ratio = targetServings / base

  return formula.items.map(item => {
    const scaledAmount = Math.round(item.baseAmount * ratio * 100) / 100
    const formattedAmountText = formatAmount(scaledAmount, item.unit)

    return {
      ...item,
      scaledAmount,
      formattedAmountText
    }
  })
}
