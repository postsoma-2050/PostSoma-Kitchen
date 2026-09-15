import { buildV3MatrixLayout } from '../src/utils/matrixFlowLayout'
import { normalizeRecipe } from '../src/services/recipeNormalizer'
import { caseARaw } from './inspect_case_a_layout'

const caseANorm = normalizeRecipe(caseARaw)
const layoutA = buildV3MatrixLayout(caseANorm)

console.log('Case A Waiting Paths:')
layoutA.ingredientWaitingPaths.forEach(w => {
  console.log(`  ${w.id}: pathD = ${w.pathD || '(straight line)'}`)
})
