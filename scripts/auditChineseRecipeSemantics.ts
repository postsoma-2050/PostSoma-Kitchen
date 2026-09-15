import { CHINESE_HEALTHY_RECIPES } from '../src/data/chineseHealthyRecipes'
import { buildV3MatrixLayout } from '../src/utils/matrixFlowLayout'
import { validateRecipe } from '../src/utils/taxonomyMatcher'
import { normalizeRecipe } from '../src/services/recipeNormalizer'

// Read-only triage: heuristics are review candidates, not automatic corrections.
const compact = (s: string) => s.replace(/[\s+＋、与和&（）()]/g, '')
const details = CHINESE_HEALTHY_RECIPES.map(recipe => {
  const findings: { code: string; field: string; evidence: string }[] = []
  const add = (code: string, field: string, evidence: string) => findings.push({ code, field, evidence })
  recipe.ingredients.forEach((i, n) => {
    if (i.amountText && compact(i.amountText) === compact(i.name))
      add('DUPLICATE_NAME_AMOUNT', `ingredients[${n}]`, `${i.name} | ${i.amountText}`)
    if (i.category !== 'formula' && /[+＋与、]/.test(`${i.name} ${i.amountText || ''}`))
      add('COMPOSITE_REVIEW', `ingredients[${n}]`, `${i.name} | ${i.amountText || ''}`)
    if (i.category !== 'formula' && i.amountText && !/\d|[一二三四五六七八九十半少适]/.test(i.amountText))
      add('QUANTITY_REVIEW', `ingredients[${n}].amountText`, i.amountText)
  })
  recipe.actionBlocks.forEach((b, n) => {
    if (b.sublabel && /[A-Za-z]/.test(b.sublabel) && !/[\u4e00-\u9fff]/.test(b.sublabel))
      add('ENGLISH_SUBLABEL', `actionBlocks[${n}].sublabel`, b.sublabel)
    if (!b.inputBlockIds?.length && b.stageIndex > 0)
      add('DEPENDENCY_REVIEW', `actionBlocks[${n}].inputBlockIds`, b.label)
  })
  const layout = buildV3MatrixLayout(recipe)
  const fullSpan = layout.actionBlockLayouts.filter(b => b.computedStartRow === 0 && b.computedEndRow === recipe.ingredients.length - 1)
  const validated = validateRecipe(normalizeRecipe(recipe))
  return {
    id: recipe.id, ingredients: recipe.ingredients.length, actions: recipe.actionBlocks.length,
    formulas: recipe.formulas?.length || 0, explicitDependencies: recipe.actionBlocks.reduce((n, b) => n + (b.inputBlockIds?.length || 0), 0),
    currentCanPublish: validated.canPublish, currentWarnings: validated.warnings.length,
    fullSpanActions: fullSpan.map(b => b.block.id), findings,
    ...(recipe.id === 'cn-59-qincai-niurou' ? {
      raw: recipe,
      geometry: layout.actionBlockLayouts.map(b => ({ id: b.block.id, start: b.computedStartRow, end: b.computedEndRow, h: b.h })),
      finalHeight: layout.finalBlockLayout.h,
    } : {}),
  }
})
const counts: Record<string, { findings: number; recipes: number }> = {}
for (const r of details) for (const code of new Set(r.findings.map(f => f.code))) {
  const c = counts[code] ||= { findings: 0, recipes: 0 }
  c.findings += r.findings.filter(f => f.code === code).length
  c.recipes++
}
console.log(JSON.stringify({
  scope: 'Local static presets only; heuristic review candidates, not cooking verification',
  summary: {
    recipes: details.length, ingredients: details.reduce((n, r) => n + r.ingredients, 0),
    actions: details.reduce((n, r) => n + r.actions, 0),
    recipesWithFormulas: details.filter(r => r.formulas).length,
    recipesWithDependencies: details.filter(r => r.explicitDependencies).length,
    recipesWithFullSpanActions: details.filter(r => r.fullSpanActions.length).length,
    currentCanPublish: details.filter(r => r.currentCanPublish).length,
    counts,
  }, details,
}, null, 2))
if (process.argv.includes('--strict') && details.some(r => r.findings.some(f => f.code === 'DUPLICATE_NAME_AMOUNT')))
  process.exitCode = 1
