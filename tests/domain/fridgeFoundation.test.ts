import assert from 'node:assert/strict'
import { CHINESE_HEALTHY_RECIPES } from '../../src/data/chineseHealthyRecipes'
import { HOME_SWEET_HOME_RECIPES } from '../../src/data/homeSweetHomeRecipes'
import { caesarSaladV3, espressoBrowniesV3, hongShaoRouV3 } from '../../src/data/v3Examples'
import { normalizeRecipe } from '../../src/services/recipeNormalizer'
import {
  AI_SUGGESTION_IDENTITY,
  beginAiSuggestion,
  buildFridgeIngredientIndex,
  completeAiSuggestion,
  createAiIngredientSnapshot,
  createAiSuggestionState,
  matchPublishedRecipes,
  reconcileAiSuggestionSnapshot,
  resolveUserIngredientText,
  validateAiInstantSuggestion,
} from '../../src/domain/fridge'

const RAW_RECIPES = [
  ...CHINESE_HEALTHY_RECIPES,
  ...HOME_SWEET_HOME_RECIPES,
  espressoBrowniesV3,
  hongShaoRouV3,
  caesarSaladV3,
]
const ALL_RECIPES = RAW_RECIPES.map(normalizeRecipe)

function requireConceptId(value: string | null, label: string): string {
  assert.ok(value, `必须能够安全解析 ${label}`)
  return value
}

function run() {
  assert.equal(ALL_RECIPES.length, 121, '食材台账必须基于统一的 121 道正式预置食谱口径')
  const sourceSnapshot = JSON.stringify(RAW_RECIPES)
  const index = buildFridgeIngredientIndex(ALL_RECIPES)
  assert.equal(JSON.stringify(RAW_RECIPES), sourceSnapshot, '建立索引不得改写任何原始 recipe 数据')
  assert.equal(index.audit.recipeCount, 121)
  assert.equal(index.audit.ingredientSourceCount, 517)
  assert.equal(index.audit.formulaItemSourceCount, 21)
  assert.equal(
    index.audit.safelyNormalizedSourceCount + index.audit.needsReviewSourceCount + index.audit.unresolvedSourceCount,
    538,
    '每一条 ingredients / Formula item 来源都必须具有可追溯状态',
  )
  assert.equal(
    Object.values(index.audit.categoryConceptCounts).reduce((sum, count) => sum + count, 0),
    index.audit.conceptCount,
    '每个概念只能进入一个用户可见主分类',
  )
  assert.ok(index.concepts.every(concept => concept.sourceReferences.length > 0), '台账不应暴露没有真实 recipe 引用的空概念')

  const chickenId = requireConceptId(resolveUserIngredientText(index, '鸡肉'), '鸡肉')
  const saltId = requireConceptId(resolveUserIngredientText(index, '盐'), '盐')
  const sugarId = requireConceptId(resolveUserIngredientText(index, '白糖'), '白糖')
  const riceId = requireConceptId(resolveUserIngredientText(index, '米'), '米')
  const waterId = requireConceptId(resolveUserIngredientText(index, '水'), '水')
  const tomatoId = requireConceptId(resolveUserIngredientText(index, '番茄'), '番茄')
  const ketchupId = requireConceptId(resolveUserIngredientText(index, '番茄酱'), '番茄酱')
  const oilId = requireConceptId(resolveUserIngredientText(index, '食用油'), '食用油')
  const lightSoyId = requireConceptId(resolveUserIngredientText(index, '生抽'), '生抽')

  assert.equal(resolveUserIngredientText(index, '油'), null, '短词“油”不得被猜测映射，避免油菜/黄油/蚝油冲突')
  assert.notEqual(tomatoId, ketchupId, '鲜番茄与番茄酱必须是不同概念')

  const chickenMatches = matchPublishedRecipes(index, { conceptIds: [chickenId] }, { limit: 100 })
  assert.ok(chickenMatches.total > 0)
  assert.ok(chickenMatches.results.some(result => result.recipe.id === 'cn-05-gongbao-jiding'), '鸡肉应安全匹配鸡腿肉丁')
  assert.ok(chickenMatches.results.some(result => result.recipe.id === 'hsh-03-chicken-ritz'), '鸡肉应安全匹配明确的英文鸡胸肉变体')

  assert.equal(matchPublishedRecipes(index, { conceptIds: [saltId] }).total, 0, '盐不能单独触发正式候选')
  assert.equal(matchPublishedRecipes(index, { conceptIds: [oilId] }).total, 0, '植物油不能单独触发正式候选')
  assert.equal(matchPublishedRecipes(index, { conceptIds: [waterId] }).total, 0, '水不能单独触发正式候选')
  assert.equal(matchPublishedRecipes(index, { conceptIds: [lightSoyId] }).total, 0, '生抽不能单独触发正式候选')

  const riceMatches = matchPublishedRecipes(index, { conceptIds: [riceId] }, { limit: 100 })
  assert.ok(riceMatches.results.some(result => result.recipe.id === 'hsh-08-pecan-rice'), '大米应匹配明确的长粒米食谱')
  assert.ok(!riceMatches.results.some(result => result.recipe.id === 'cn-35-haimi-youcai'), '“米”不得误匹配“海米”')
  assert.ok(!index.conceptById.get(riceId)?.sourceNames.some(name => name.includes('玉米')), '“米”概念不得吞并玉米')

  const tomatoMatches = matchPublishedRecipes(index, { conceptIds: [tomatoId] }, { limit: 100 })
  assert.ok(tomatoMatches.total > 0)
  assert.ok(!tomatoMatches.results.some(result => result.recipe.id === 'hsh-06-bbq-butter-beans'), '鲜番茄不得因番茄酱进入候选')
  assert.ok(!index.conceptById.get(waterId)?.sourceNames.some(name => name.includes('焯水')), '水概念不得从烹饪状态“焯水”提取')
  assert.ok(!index.conceptById.get(oilId)?.sourceNames.some(name => name.includes('油菜')), '植物油概念不得吞并油菜')
  assert.ok(!index.conceptById.get(lightSoyId)?.sourceNames.some(name => name.includes('&')), '生抽与老抽的复合表达不得强行并入单一概念')

  const chickenWithUnknown = matchPublishedRecipes(index, {
    conceptIds: [chickenId],
    customInputs: ['紫苏叶', '  紫苏叶  '],
  }, { limit: 100 })
  assert.equal(chickenWithUnknown.total, chickenMatches.total, '未识别输入不得虚增数据库匹配结果')
  assert.equal(chickenWithUnknown.results[0].unrecognizedUserInputs.length, 1, '自定义食材应去重并保留为未识别输入')
  const unknownOnly = matchPublishedRecipes(index, { conceptIds: [], customInputs: ['紫苏叶'] })
  assert.equal(unknownOnly.total, 0, '仅有未知食材时不得猜测候选')
  assert.equal(unknownOnly.unrecognizedUserInputs[0].displayName, '紫苏叶', '即使没有候选，自定义食材也必须保留')

  const yuxiangIndex = index.recipes.find(item => item.recipe.id === 'cn-01-yuxiang-rousi')
  assert.ok(yuxiangIndex?.ingredients.some(item => item.sourceKind === 'formula-item'), 'Formula 内部食材必须进入只读匹配索引')
  assert.ok(yuxiangIndex?.ingredients.some(item => item.originalName === '白糖' && item.conceptId === sugarId), 'Formula 食材必须复用同一稳定概念')

  const firstPage = matchPublishedRecipes(index, { conceptIds: [chickenId] }, { offset: 0, limit: 2 })
  const secondPage = matchPublishedRecipes(index, { conceptIds: [chickenId] }, { offset: 2, limit: 2 })
  assert.equal(firstPage.results.length, Math.min(2, firstPage.total), '匹配结果应支持 limit')
  assert.ok(firstPage.results.every(result => !secondPage.results.some(other => other.recipe.id === result.recipe.id)), 'offset 分页不得重复首批结果')

  const snapshotResult = createAiIngredientSnapshot(index, {
    conceptIds: [chickenId, saltId],
    customInputs: ['紫苏叶'],
  })
  assert.equal(snapshotResult.ok, true)
  if (!snapshotResult.ok) throw new Error((snapshotResult as any).errors.join('；'))
  const snapshot = snapshotResult.value
  assert.equal(snapshot.customIngredients[0].status, 'unrecognized')
  assert.ok(snapshot.relatedRecipeIds.every(id => chickenMatches.results.some(result => result.recipe.id === id)), 'AI 相关正式食谱只能来自本地匹配结果')

  const unconfigured = createAiSuggestionState(snapshot, false)
  assert.equal(unconfigured.status, 'unconfigured')
  assert.equal(beginAiSuggestion(unconfigured).status, 'unconfigured', '未配置时不得伪装开始生成')
  const ready = createAiSuggestionState(snapshot, true)
  assert.equal(completeAiSuggestion(ready, {}).status, 'failure', '未进入生成中状态的输出不得被接受')
  const generating = beginAiSuggestion(ready)
  assert.equal(generating.status, 'generating')

  const validSuggestion = {
    identity: AI_SUGGESTION_IDENTITY,
    title: '紫苏鸡肉快炒方向',
    summary: '用鸡肉与紫苏叶做一份清爽快炒。',
    usedConceptIds: [chickenId, saltId],
    usedCustomIngredientIds: [snapshot.customIngredients[0].id],
    criticalMissing: [],
    optionalAdditions: ['葱段'],
    steps: ['鸡肉彻底加热至熟。', '加入紫苏叶快速翻炒后离火。'],
    timeExpectation: 'moderate',
    difficulty: 'easy',
    safetyNotes: ['禽肉中心必须完全熟透，避免交叉污染。'],
    relatedRecipeIds: snapshot.relatedRecipeIds.slice(0, 1),
  }
  assert.equal(validateAiInstantSuggestion(validSuggestion, snapshot).ok, true)
  const completed = completeAiSuggestion(generating, validSuggestion)
  assert.equal(completed.status, 'success')

  const inventedRecipeSuggestion = { ...validSuggestion, relatedRecipeIds: ['invented-recipe-id'] }
  assert.equal(validateAiInstantSuggestion(inventedRecipeSuggestion, snapshot).ok, false, '模型不得虚构正式 recipe ID')
  assert.equal(completeAiSuggestion(generating, inventedRecipeSuggestion).status, 'failure', '无效输出不得进入成功状态')

  const changedSnapshotResult = createAiIngredientSnapshot(index, { conceptIds: [tomatoId] })
  assert.equal(changedSnapshotResult.ok, true)
  if (!changedSnapshotResult.ok) throw new Error((changedSnapshotResult as any).errors.join('；'))
  const stale = reconcileAiSuggestionSnapshot(completed, changedSnapshotResult.value, true)
  assert.equal(stale.status, 'stale', '食材变化后旧 AI 结果必须失效')

  const conceptReviewCounts = index.concepts.reduce((counts, concept) => {
    counts[concept.reviewStatus] += 1
    return counts
  }, { reviewed: 0, 'needs-review': 0, unresolved: 0 })
  const formulaReviewCounts = index.recipes.flatMap(recipe => recipe.ingredients)
    .filter(item => item.sourceKind === 'formula-item')
    .reduce((counts, item) => {
      const status = index.conceptById.get(item.conceptId)!.reviewStatus
      counts[status] += 1
      return counts
    }, { reviewed: 0, 'needs-review': 0, unresolved: 0 })

  console.log('ℹ️ 食材台账审计：', JSON.stringify(index.audit))
  console.log('ℹ️ 概念审核状态：', JSON.stringify(conceptReviewCounts))
  console.log('ℹ️ Formula 来源审核状态：', JSON.stringify(formulaReviewCounts))
  console.log('ℹ️ 代表性候选数：', JSON.stringify({
    chicken: chickenMatches.total,
    salt: matchPublishedRecipes(index, { conceptIds: [saltId] }).total,
    oil: matchPublishedRecipes(index, { conceptIds: [oilId] }).total,
    rice: riceMatches.total,
    water: matchPublishedRecipes(index, { conceptIds: [waterId] }).total,
    tomato: tomatoMatches.total,
  }))
  console.log('✅ Fridge 内部基础测试通过：独立台账、确定性匹配、AI 快照与失效边界均正常')
}

run()
