import { buildV3MatrixLayout } from '../src/utils/matrixFlowLayout'
import { normalizeRecipe } from '../src/services/recipeNormalizer'
import { CHINESE_HEALTHY_RECIPES } from '../src/data/chineseHealthyRecipes'
import { caseARaw } from './inspect_case_a_layout'

const caseANorm = normalizeRecipe(caseARaw)
const layoutA = buildV3MatrixLayout(caseANorm)
const cn59Local = CHINESE_HEALTHY_RECIPES.find(r => r.id === 'cn-59-qincai-niurou')!
const layoutB = buildV3MatrixLayout(cn59Local)

console.log('Current Layout A Rail Segments:', layoutA.intakeRailSegments)
console.log('Current Layout B Rail Segments:', layoutB.intakeRailSegments)
