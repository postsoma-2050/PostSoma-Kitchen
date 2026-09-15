import { canRenderContinuousTable, resolveLayoutMode } from '../src/utils/continuousTableLayout'
import { normalizeRecipe } from '../src/services/recipeNormalizer'
import { CHINESE_HEALTHY_RECIPES } from '../src/data/chineseHealthyRecipes'
import { caseARaw } from './inspect_case_a_layout'

const caseANorm = normalizeRecipe(caseARaw)
const cn59Local = CHINESE_HEALTHY_RECIPES.find(r => r.id === 'cn-59-qincai-niurou')!

console.log('Case A canRenderContinuousTable:', canRenderContinuousTable(caseANorm))
console.log('Case A resolved mode (auto):', resolveLayoutMode(caseANorm, 'auto'))
console.log('Case A resolved mode (table):', resolveLayoutMode(caseANorm, 'table'))

console.log('Case B canRenderContinuousTable:', canRenderContinuousTable(cn59Local))
console.log('Case B resolved mode (auto):', resolveLayoutMode(cn59Local, 'auto'))
console.log('Case B resolved mode (table):', resolveLayoutMode(cn59Local, 'table'))
