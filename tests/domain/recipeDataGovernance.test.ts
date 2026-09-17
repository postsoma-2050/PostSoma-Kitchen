import assert from 'node:assert/strict'
import { CHINESE_HEALTHY_RECIPES } from '../../src/data/chineseHealthyRecipes'
import { HOME_SWEET_HOME_RECIPES } from '../../src/data/homeSweetHomeRecipes'
import { espressoBrowniesV3, hongShaoRouV3, caesarSaladV3 } from '../../src/data/v3Examples'
import { normalizeRecipe } from '../../src/services/recipeNormalizer'
import { validateRecipe } from '../../src/utils/taxonomyMatcher'

const allRecipes = [
  ...CHINESE_HEALTHY_RECIPES,
  ...HOME_SWEET_HOME_RECIPES,
  espressoBrowniesV3,
  hongShaoRouV3,
  caesarSaladV3,
]

assert.equal(allRecipes.length, 170, '全量预置食谱必须严格为 170 道 (151 中餐原书真品 + 16 西餐 + 3 样例)')
assert.ok(allRecipes.every(recipe => recipe.provenance?.title), '所有预置食谱必须声明来源标题')
assert.ok(allRecipes.every(recipe => recipe.dataReview), '所有预置食谱必须声明独立事实核验状态')
assert.ok(
  allRecipes.every(recipe => !['source_verified', 'kitchen_verified'].includes(recipe.dataReview?.overall || '')),
  '未提供页码或实测证据前，不得把预置食谱标成已核验',
)

const oldRecipe = structuredClone(espressoBrowniesV3)
delete oldRecipe.provenance
delete oldRecipe.dataReview
const normalizedOld = normalizeRecipe(oldRecipe)
assert.equal(normalizedOld.dataReview?.overall, 'unreviewed', '旧记录必须安全归一化为未核验')
const oldValidation = validateRecipe(normalizedOld)
assert.ok(oldValidation.warnings.some(issue => issue.code === 'MISSING_PROVENANCE'))
assert.ok(oldValidation.warnings.some(issue => issue.code === 'UNVERIFIED_RECIPE_FACTS'))

const reviewed = normalizeRecipe({
  ...espressoBrowniesV3,
  provenance: {
    sourceType: 'book',
    title: 'Verified source',
    locator: 'p. 42',
  },
  dataReview: {
    overall: 'source_verified',
    ingredients: 'source_verified',
    quantities: 'source_verified',
    topology: 'source_verified',
    heatAndTiming: 'source_verified',
    reviewedBy: 'test-reviewer',
    reviewedAt: '2026-09-16T00:00:00Z',
    evidence: ['逐项对照 p. 42'],
  },
})
const reviewedValidation = validateRecipe(reviewed)
assert.ok(!reviewedValidation.warnings.some(issue => issue.code === 'MISSING_PROVENANCE'))
assert.ok(!reviewedValidation.warnings.some(issue => issue.code === 'UNVERIFIED_RECIPE_FACTS'))

const unsupportedClaim = normalizeRecipe({
  ...espressoBrowniesV3,
  dataReview: {
    ...espressoBrowniesV3.dataReview,
    overall: 'source_verified',
  },
})
assert.ok(
  validateRecipe(unsupportedClaim).errors.some(issue => issue.code === 'UNSUPPORTED_SOURCE_VERIFICATION'),
  '缺少定位、审核人或审核时间的已核验声明必须阻断发布',
)

const inconsistentClaim = normalizeRecipe({
  ...reviewed,
  dataReview: {
    ...reviewed.dataReview,
    topology: 'modeled',
  },
})
assert.ok(
  validateRecipe(inconsistentClaim).errors.some(issue => issue.code === 'INCONSISTENT_REVIEW_STATUS'),
  '整体已核验时，任何仍处于建模状态的事实分项都必须阻断该声明',
)

const materialContinuation = structuredClone(espressoBrowniesV3)
materialContinuation.actionBlocks[1].ingredientIds = []
materialContinuation.actionBlocks[1].dependencies = [
  { sourceBlockId: 'b0', type: 'material', label: '融化黄油' },
]
const continuationValidation = validateRecipe(normalizeRecipe(materialContinuation))
assert.ok(
  !continuationValidation.errors.some(issue => issue.code === 'ISOLATED_ACTION_BLOCK'),
  '只继续加工上游半成品的工序无需重复声明历史食材',
)

const orderOnlyContinuation = structuredClone(materialContinuation)
orderOnlyContinuation.actionBlocks[1].dependencies = [
  { sourceBlockId: 'b0', type: 'order', label: '等待前序' },
]
assert.ok(
  validateRecipe(normalizeRecipe(orderOnlyContinuation)).errors.some(issue => issue.code === 'ISOLATED_ACTION_BLOCK'),
  '只有先后关系且没有任何直接食材的工序仍应被识别为孤立工序',
)

console.log('✅ recipeDataGovernance: 来源与事实核验状态解耦通过')
