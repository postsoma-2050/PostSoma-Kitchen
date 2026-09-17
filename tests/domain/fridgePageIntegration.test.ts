import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { CHINESE_HEALTHY_RECIPES } from '../../src/data/chineseHealthyRecipes'
import { HOME_SWEET_HOME_RECIPES } from '../../src/data/homeSweetHomeRecipes'
import { caesarSaladV3, espressoBrowniesV3, hongShaoRouV3 } from '../../src/data/v3Examples'
import { normalizeRecipe } from '../../src/services/recipeNormalizer'
import {
  addFridgeIngredientInput,
  buildFridgeIngredientIndex,
  getPublicSelectableConcepts,
  matchPublishedRecipes,
  resolveUserIngredientText,
  splitFridgeIngredientInput,
} from '../../src/domain/fridge'
import { FRIDGE_CATEGORY_PRESENTATIONS } from '../../src/config/fridgePresentation'

const ALL_RECIPES = [
  ...CHINESE_HEALTHY_RECIPES,
  ...HOME_SWEET_HOME_RECIPES,
  espressoBrowniesV3,
  hongShaoRouV3,
  caesarSaladV3,
].map(normalizeRecipe)

function requireConceptId(index: ReturnType<typeof buildFridgeIngredientIndex>, value: string): string {
  const conceptId = resolveUserIngredientText(index, value)
  assert.ok(conceptId, `必须识别 ${value}`)
  return conceptId
}

function run() {
  const index = buildFridgeIngredientIndex(ALL_RECIPES)
  const selectable = getPublicSelectableConcepts(index)
  assert.equal(selectable.length, 39, '公开快捷选择只能暴露已审核高置信概念')
  assert.ok(selectable.every(concept => concept.reviewStatus === 'reviewed' && concept.confidence === 'high'))
  assert.ok(index.concepts.some(concept => concept.reviewStatus !== 'reviewed'), '待审核概念必须继续留在内部台账，而非被删除')

  const categoryCounts = FRIDGE_CATEGORY_PRESENTATIONS.reduce<Record<string, number>>((counts, category) => {
    counts[category.label] = selectable.filter(concept => !concept.isBasicPantry && concept.category === category.id).length
    return counts
  }, {})
  assert.equal(Object.values(categoryCounts).reduce((sum, count) => sum + count, 0), selectable.filter(concept => !concept.isBasicPantry).length)

  assert.deepEqual(splitFridgeIngredientInput('菠菜、鸡蛋，豆腐\n菠菜'), ['菠菜', '鸡蛋', '豆腐'])
  const parsed = addFridgeIngredientInput(index, { conceptIds: [], customInputs: [] }, '菠菜、鸡蛋、豆腐')
  assert.equal(parsed.addedConceptIds.length, 3, '三个安全概念必须作为三个独立库存项加入')
  assert.equal(parsed.addedCustomInputs.length, 0)
  assert.deepEqual(
    parsed.selection.conceptIds.map(id => index.conceptById.get(id)?.displayName),
    ['菠菜', '鸡蛋', '豆腐'],
  )

  const withUnknown = addFridgeIngredientInput(index, parsed.selection, '紫苏叶、紫苏叶')
  assert.deepEqual(withUnknown.addedCustomInputs, ['紫苏叶'], '未识别输入必须原样保留且去重')
  const unknownOnly = matchPublishedRecipes(index, { conceptIds: [], customInputs: withUnknown.addedCustomInputs })
  assert.equal(unknownOnly.total, 0)
  assert.equal(unknownOnly.unrecognizedUserInputs[0].displayName, '紫苏叶')

  const chickenId = requireConceptId(index, '鸡肉')
  const tomatoId = requireConceptId(index, '番茄')
  const saltId = requireConceptId(index, '盐')
  const oilId = requireConceptId(index, '食用油')
  const waterId = requireConceptId(index, '水')
  const lightSoyId = requireConceptId(index, '生抽')
  const chickenMatches = matchPublishedRecipes(index, { conceptIds: [chickenId] }, { limit: 6 })
  assert.ok(chickenMatches.total > 0, '鸡肉必须能够返回正式食谱候选')
  assert.equal(chickenMatches.results.length, Math.min(6, chickenMatches.total), '首批结果必须限制为 6 道')
  assert.equal(matchPublishedRecipes(index, { conceptIds: [saltId] }).total, 0)
  assert.equal(matchPublishedRecipes(index, { conceptIds: [oilId] }).total, 0)
  assert.equal(matchPublishedRecipes(index, { conceptIds: [waterId] }).total, 0)
  assert.equal(matchPublishedRecipes(index, { conceptIds: [lightSoyId] }).total, 0)

  const tomatoMatches = matchPublishedRecipes(index, { conceptIds: [tomatoId] }, { limit: 100 })
  assert.ok(!tomatoMatches.results.some(result => result.recipe.id === 'hsh-06-bbq-butter-beans'), '鲜番茄不得命中仅含番茄酱的食谱')

  const draftChicken = {
    ...ALL_RECIPES.find(recipe => recipe.id === 'cn-11')!,
    id: 'fridge-draft-chicken',
    status: 'draft' as const,
  }
  const deletedChicken = {
    ...ALL_RECIPES.find(recipe => recipe.id === 'cn-11')!,
    id: 'fridge-deleted-chicken',
    deletedAt: '2026-08-04T00:00:00.000Z',
  }
  const boundaryIndex = buildFridgeIngredientIndex([...ALL_RECIPES, draftChicken, deletedChicken])
  const boundaryChickenId = requireConceptId(boundaryIndex, '鸡肉')
  const boundaryMatches = matchPublishedRecipes(boundaryIndex, { conceptIds: [boundaryChickenId] }, { limit: 100 })
  assert.ok(!boundaryMatches.results.some(result => result.recipe.id === draftChicken.id), '草稿不得进入候选')
  assert.ok(!boundaryMatches.results.some(result => result.recipe.id === deletedChicken.id), '软删除食谱不得进入候选')

  const viewSource = fs.readFileSync(path.join(process.cwd(), 'src/views/FridgeMatch.vue'), 'utf8')
  const cardSource = fs.readFileSync(path.join(process.cwd(), 'src/components/fridge/FridgeRecipeMatchCard.vue'), 'utf8')
  const aiCardSource = fs.readFileSync(path.join(process.cwd(), 'src/components/fridge/FridgeAiSuggestionCard.vue'), 'utf8')
  const aiConfigSource = fs.readFileSync(path.join(process.cwd(), 'src/components/fridge/FridgeAiByokConfigPanel.vue'), 'utf8')
  assert.match(viewSource, /getPublishedRecipes\(\)/, '页面必须只从公开 Repository 读取入口取得食谱')
  assert.match(viewSource, /buildFridgeIngredientIndex\(publishedRecipes\)/, '页面必须以公开返回集建立独立索引')
  assert.match(viewSource, /matchPublishedRecipes\(/, '页面必须使用新确定性匹配引擎')
  assert.match(viewSource, /selectedConceptIds = ref<string\[]>\(\[\]\)/, '页面初次进入不得预选食材')
  assert.match(viewSource, /RESULT_BATCH_SIZE = 6/, '页面首批不得渲染过多候选')
  assert.doesNotMatch(viewSource, /fridgeMatcher|ByokSettingsModal|byokService|generateFridgeAiAdvice|hasValidByokConfig/, '公开页不得保留旧匹配或 BYOK 调用链')
  assert.doesNotMatch(viewSource, /isAiLoading|aiAdvice|AI 正在|生成排序参考/, '公开页不得伪装 AI 运行状态或结果')
  assert.doesNotMatch(cardSource, /matchPercentage|progressbar/, '候选卡不得把抽象百分比作为主信息')
  assert.match(viewSource, /AiSuggestionChannel/, '页面必须复用统一 AI 通道')
  assert.match(viewSource, /MemoryOpenAiCompatibleByokGateway/, '页面必须使用会话内存型 Gateway')
  assert.match(viewSource, /onBeforeUnmount[\s\S]*aiGateway\.clear\(\)/, '离开页面时必须清除内存配置')
  assert.match(viewSource, /本次请求目标/, '生成前必须显示实际请求主机')
  assert.match(aiCardSource, /临时生成 · 未经人工审核/, 'AI 卡必须明确临时、未经审核身份')
  assert.match(aiCardSource, /不会保存为正式食谱/, 'AI 卡必须明确不会进入正式食谱')
  assert.match(aiCardSource, /现在需要/, 'AI 卡必须以行动语言说明关键缺口')
  assert.match(aiCardSource, /可选加入/, 'AI 卡必须区分可选补充')
  assert.match(aiCardSource, />做法</, 'AI 卡必须以简洁步骤为核心')
  assert.match(aiCardSource, />预计</, 'AI 卡必须使用宽泛执行预期')
  assert.match(aiCardSource, /安全提醒/, 'AI 卡必须显示本地食品安全提醒')
  assert.match(aiCardSource, /查看相关正式食谱/, 'AI 卡必须把正式食谱入口与临时建议区分开')
  assert.match(aiCardSource, /重新生成/, 'AI 卡必须提供用户主动重新生成操作')
  assert.match(viewSource, /@regenerate="generateAiSuggestion"/, '重新生成必须继续经过统一 AI 通道')
  assert.match(viewSource, /v-else-if="aiState\.status === 'generating'"[\s\S]*取消生成/, '取消按钮只能在真实生成中出现')
  assert.match(aiConfigSource, /刷新、关闭或离开本页后会清除/, '配置面板必须解释 Key 生命周期')
  assert.doesNotMatch(`${aiCardSource}\n${aiConfigSource}`, /saveRecipe|v3RecipeStore|SupabaseRecipeRepository|MatrixFlow/, 'AI 组件不得接入正式写入或 Flow 身份')
  assert.doesNotMatch(viewSource, /saveRecipe|saveV3Recipe|SupabaseRecipeRepository/, 'AI 页面不得新增正式食谱写入能力')

  console.log('ℹ️ /fridge 公开可选分类：', JSON.stringify(categoryCounts))
  console.log(`ℹ️ 公开快捷概念 ${selectable.length} 项，其中常备调味 ${selectable.filter(concept => concept.isBasicPantry).length} 项`)
  console.log('✅ /fridge 集成回归通过：无默认库存、输入拆分、公开边界、确定性解释与结果限制均正常')
}

run()
