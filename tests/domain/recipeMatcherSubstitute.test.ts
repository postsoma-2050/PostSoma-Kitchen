/**
 * recipeMatcherSubstitute.test.ts
 * 验证 src/domain/fridge/recipeMatcher.ts 中的平替判定逻辑、排序逻辑以及卡片徽标对接
 */

import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import {
  buildFridgeIngredientIndex,
  matchPublishedRecipes,
  resolveUserIngredientText,
} from '../../src/domain/fridge'
import { normalizeRecipe } from '../../src/services/recipeNormalizer'
import {
  createFlavorEngine,
  type FlavorDataset,
} from '../../src/domain/flavor'
import type { VisualRecipeV3 } from '../../src/types/recipeV3'

console.log('================================================================')
console.log('       食谱匹配平替破格判定与排序分层自动化回归测试              ')
console.log('================================================================')

// 加载静态风味数据
const dataDir = path.join(process.cwd(), 'public', 'data', 'flavor')
const similarityTop20 = JSON.parse(fs.readFileSync(path.join(dataDir, 'similarity_top20.json'), 'utf8'))
const zhMap = JSON.parse(fs.readFileSync(path.join(dataDir, 'zh_map.json'), 'utf8'))
const zhCanonical = JSON.parse(fs.readFileSync(path.join(dataDir, 'zh_canonical.json'), 'utf8'))
const aliasMap = JSON.parse(fs.readFileSync(path.join(dataDir, 'alias_map.json'), 'utf8'))
const edges = JSON.parse(fs.readFileSync(path.join(dataDir, 'edges.json'), 'utf8'))

const dataset: FlavorDataset = {
  similarityTop20,
  zhMap,
  zhCanonical,
  aliasMap,
}

const flavorEngine = createFlavorEngine(dataset)

// 构建测试食谱集
// 1. 完全命中食谱：白切鸡 (主料：鸡肉)
const recipeChickenPure: VisualRecipeV3 = {
  id: 'test-pure-chicken',
  title: '白切鸡',
  description: '经典白切鸡，清鲜嫩滑',
  cuisine: 'chinese',
  difficulty: 'easy',
  prerequisites: { containerSize: '汤锅', servings: '2人份' },
  ingredients: [
    { id: 'ing-1', name: '鸡肉', amountText: '500g', category: 'main' },
    { id: 'ing-2', name: '生姜', amountText: '10g', category: 'seasoning' },
    { id: 'ing-3', name: '盐', amountText: '5g', category: 'seasoning' },
  ],
  actionBlocks: [
    {
      id: 'act-1',
      title: '煮鸡',
      ingredientIds: ['ing-1', 'ing-2', 'ing-3'],
      heatLevel: 'medium',
      durationMinutes: 20,
      instructions: '煮熟浸冰水',
    },
  ],
  finalBlock: {
    method: 'boil',
    instructions: '切块装盘',
  },
}

// 2. 单缺口食谱：笋焖鸡 (主料：鸡肉、冬笋) -> 用户有鸡肉，缺 1 项主料冬笋
const recipeChickenBamboo: VisualRecipeV3 = {
  id: 'test-chicken-bamboo',
  title: '冬笋焖鸡',
  description: '鲜冬笋焖鸡块',
  cuisine: 'chinese',
  difficulty: 'medium',
  prerequisites: { containerSize: '砂锅', servings: '3人份' },
  ingredients: [
    { id: 'ing-1', name: '鸡肉', amountText: '400g', category: 'main' },
    { id: 'ing-2', name: '冬笋', amountText: '150g', category: 'main' },
    { id: 'ing-3', name: '生姜', amountText: '10g', category: 'seasoning' },
  ],
  actionBlocks: [
    {
      id: 'act-1',
      title: '焖煮',
      ingredientIds: ['ing-1', 'ing-2', 'ing-3'],
      heatLevel: 'medium',
      durationMinutes: 25,
      instructions: '焖至软烂',
    },
  ],
  finalBlock: {
    method: 'braise',
    instructions: '出锅装盘',
  },
}

// 3. 多缺口食谱：三鲜鸡肉煲 (主料：鸡肉、鲍鱼、海参) -> 用户有鸡肉，缺 2 项主料鲍鱼和海参
const recipeChickenMultiGap: VisualRecipeV3 = {
  id: 'test-chicken-multigap',
  title: '三鲜鸡煲',
  description: '山珍海味三鲜鸡',
  cuisine: 'chinese',
  difficulty: 'hard',
  prerequisites: { containerSize: '砂锅', servings: '4人份' },
  ingredients: [
    { id: 'ing-1', name: '鸡肉', amountText: '400g', category: 'main' },
    { id: 'ing-2', name: '鲍鱼', amountText: '4只', category: 'main' },
    { id: 'ing-3', name: '海参', amountText: '2只', category: 'main' },
  ],
  actionBlocks: [
    {
      id: 'act-1',
      title: '煲制',
      ingredientIds: ['ing-1', 'ing-2', 'ing-3'],
      heatLevel: 'low',
      durationMinutes: 40,
      instructions: '文火慢煲',
    },
  ],
  finalBlock: {
    method: 'braise',
    instructions: '调味出锅',
  },
}

// 4. 平替食谱 A：葱爆羊肉 (主料：羊肉) -> 用户手头无羊肉，但鸡肉代羊肉相似度 0.35 >= 0.30
const recipeLamb: VisualRecipeV3 = {
  id: 'test-lamb-stirfry',
  title: '葱爆羊肉',
  description: '火候十足的葱爆肉',
  cuisine: 'chinese',
  difficulty: 'medium',
  prerequisites: { containerSize: '炒锅', servings: '2人份' },
  ingredients: [
    { id: 'ing-1', name: '羊肉', amountText: '300g', category: 'main' },
    { id: 'ing-2', name: '大葱', amountText: '100g', category: 'supporting' },
  ],
  actionBlocks: [
    {
      id: 'act-1',
      title: '快炒',
      ingredientIds: ['ing-1', 'ing-2'],
      heatLevel: 'high',
      durationMinutes: 5,
      instructions: '大火爆炒',
    },
  ],
  finalBlock: {
    method: 'stir_fry',
    instructions: '装盘上桌',
  },
}

// 5. 平替食谱 B：回锅肉 (主料：猪肉) -> 用户手头无猪肉，但鸡肉代猪肉相似度 0.34 >= 0.30
const recipePork: VisualRecipeV3 = {
  id: 'test-pork-doublecooked',
  title: '传统回锅肉',
  description: '浓郁酱香下饭菜',
  cuisine: 'chinese',
  difficulty: 'medium',
  prerequisites: { containerSize: '炒锅', servings: '2人份' },
  ingredients: [
    { id: 'ing-1', name: '猪肉', amountText: '300g', category: 'main' },
    { id: 'ing-2', name: '青椒', amountText: '50g', category: 'supporting' },
  ],
  actionBlocks: [
    {
      id: 'act-1',
      title: '煸炒',
      ingredientIds: ['ing-1', 'ing-2'],
      heatLevel: 'high',
      durationMinutes: 8,
      instructions: '炒出灯盏窝',
    },
  ],
  finalBlock: {
    method: 'stir_fry',
    instructions: '装盘上桌',
  },
}

// 6. 无关/不可平替食谱：清蒸桂花鱼 (主料：鱼) -> 用户手头只有鸡肉，与鱼无法达到 0.30 平替门槛
const recipeFish: VisualRecipeV3 = {
  id: 'test-steamed-fish',
  title: '清蒸鱼',
  description: '清鲜蒸鱼',
  cuisine: 'chinese',
  difficulty: 'easy',
  prerequisites: { containerSize: '蒸锅', servings: '2人份' },
  ingredients: [
    { id: 'ing-1', name: '鲈鱼', amountText: '1条', role: 'key' },
  ],
  actionBlocks: [
    {
      id: 'act-1',
      title: '清蒸',
      ingredientIds: ['ing-1'],
      heatLevel: 'high',
      durationMinutes: 8,
      instructions: '大火清蒸',
    },
  ],
  finalBlock: {
    method: 'steam',
    instructions: '淋豉油出锅',
  },
}

const ALL_MOCK_RECIPES = [
  recipeChickenPure,
  recipeChickenBamboo,
  recipeChickenMultiGap,
  recipeLamb,
  recipePork,
  recipeFish,
].map(normalizeRecipe)

const index = buildFridgeIngredientIndex(ALL_MOCK_RECIPES)
const chickenConceptId = resolveUserIngredientText(index, '鸡肉')
assert.ok(chickenConceptId, '必须识别鸡肉概念')

// -------------------------------------------------------------
// Test 1: 未注入 flavorEngine 时保持纯确定性拦截 (向后兼容)
// -------------------------------------------------------------
console.log('• [Test 1] 测试未注入 flavorEngine 时的确定性匹配与拦截...')
const legacyMatches = matchPublishedRecipes(
  index,
  { conceptIds: [chickenConceptId!] },
  { limit: 10 },
)
assert.equal(legacyMatches.results.some(r => r.recipe.id === 'test-lamb-stirfry'), false, '未注入风味引擎时，无关键主料的羊肉食谱必须被过滤')
assert.equal(legacyMatches.results.some(r => r.recipe.id === 'test-pork-doublecooked'), false, '未注入风味引擎时，无关键主料的猪肉食谱必须被过滤')
assert.ok(legacyMatches.results.every(r => !r.isSubstituteMatch), '旧模式下所有结果 isSubstituteMatch 必须为空或 false')
console.log('  ✅ 通过：向后兼容性良好，未注入引擎时零侵入、零污染')

// -------------------------------------------------------------
// Test 2: 注入 flavorEngine 时，满足 substitute.score >= 0.30 破格标记 isSubstituteMatch
// -------------------------------------------------------------
console.log('• [Test 2] 测试平替破格判定 (substitute.score >= 0.30 时放行)...')
const flavorMatches = matchPublishedRecipes(
  index,
  { conceptIds: [chickenConceptId!] },
  { limit: 10, flavorEngine },
)

const lambMatch = flavorMatches.results.find(r => r.recipe.id === 'test-lamb-stirfry')
assert.ok(lambMatch, '羊肉食谱在用户手头有鸡肉时应被平替判定成功放行')
assert.equal(lambMatch?.isSubstituteMatch, true, '羊肉食谱必须标记 isSubstituteMatch: true')
assert.ok(lambMatch?.keySubstitute, '必须提供 keySubstitute 平替详情')
assert.equal(lambMatch?.keySubstitute?.originalDisplayName, '羊肉')
assert.equal(lambMatch?.keySubstitute?.substituteDisplayName, '鸡肉')
assert.ok((lambMatch?.keySubstitute?.score || 0) >= 0.30, '平替得分必须 >= 0.30')
assert.equal(lambMatch?.keySubstitute?.score, 0.35, '鸡肉平替羊肉得分应为 0.35')

const porkMatch = flavorMatches.results.find(r => r.recipe.id === 'test-pork-doublecooked')
assert.ok(porkMatch, '猪肉食谱在用户手头有鸡肉时应被平替判定成功放行')
assert.equal(porkMatch?.isSubstituteMatch, true, '猪肉食谱必须标记 isSubstituteMatch: true')
assert.equal(porkMatch?.keySubstitute?.score, 0.34, '鸡肉平替猪肉得分应为 0.34')

// 鱼肉食谱得分不足 0.30，必须继续被拦截
const fishMatch = flavorMatches.results.find(r => r.recipe.id === 'test-steamed-fish')
assert.equal(fishMatch, undefined, '相似度不足 0.30 的鱼肉食谱必须坚决拦截')
console.log('  ✅ 通过：平替 score >= 0.30 破格放行，低分与无关食材坚决拦截')

// -------------------------------------------------------------
// Test 3: 调整比较排序函数，将平替食谱排在完全命中之后、多缺口之前
// -------------------------------------------------------------
console.log('• [Test 3] 测试排序规则：完全命中食谱 > 仅缺1项主料 > 平替食谱 > 多缺口食谱...')
const resultIds = flavorMatches.results.map(r => r.recipe.id)

const pureChickenIndex = resultIds.indexOf('test-pure-chicken')
const bambooChickenIndex = resultIds.indexOf('test-chicken-bamboo')
const lambIndex = resultIds.indexOf('test-lamb-stirfry')
const porkIndex = resultIds.indexOf('test-pork-doublecooked')
const multiGapChickenIndex = resultIds.indexOf('test-chicken-multigap')

// 1. 完全命中食谱排在平替食谱之前
assert.ok(pureChickenIndex < lambIndex, '完全命中白切鸡必须排在平替羊肉之前')
assert.ok(pureChickenIndex < porkIndex, '完全命中白切鸡必须排在平替回锅肉之前')

// 2. 仅缺 1 项主料食谱排在平替食谱之前
assert.ok(bambooChickenIndex < lambIndex, '仅缺1主料的冬笋鸡必须排在平替羊肉之前')

// 3. 平替食谱必须排在多缺口食谱 (缺 2 项及以上主料) 之前！
assert.ok(lambIndex < multiGapChickenIndex, '平替葱爆羊肉必须排在多缺口三鲜鸡煲之前')
assert.ok(porkIndex < multiGapChickenIndex, '平替回锅肉必须排在多缺口三鲜鸡煲之前')

// 4. 平替食谱内部：相似度高的排在前面 (羊肉 0.35 > 猪肉 0.34)
assert.ok(lambIndex < porkIndex, '平替相似度更高者 (0.35 羊肉) 必须排在 (0.34 猪肉) 之前')
console.log('  ✅ 通过：排序层级分明，完全命中 > 平替食谱 > 多缺口食谱 验证成功')

// -------------------------------------------------------------
// Test 4: 静态源码审计与卡片展示契约验证 (FridgeRecipeMatchCard.vue)
// -------------------------------------------------------------
console.log('• [Test 4] 验证 FridgeRecipeMatchCard.vue 模板契约...')
const cardSource = fs.readFileSync(path.join(process.cwd(), 'src/components/fridge/FridgeRecipeMatchCard.vue'), 'utf8')

// 徽标验证
assert.match(
  cardSource,
  /v-if="result\.isSubstituteMatch && result\.keySubstitute"/,
  '卡片必须包含 isSubstituteMatch 平替激活条件',
)
assert.match(
  cardSource,
  /✨ 风味平替激活 ·/,
  '卡片必须显示“✨ 风味平替激活”顶部徽标',
)

// 对比信息块验证
assert.match(
  cardSource,
  /原方：\{\{\s*result\.keySubstitute\.originalDisplayName\s*\}\}/,
  '卡片必须展示“原方：[原方食材]”',
)
assert.match(
  cardSource,
  /➔/,
  '卡片必须展示平替转换箭头“➔”',
)
assert.match(
  cardSource,
  /手边平替：\{\{\s*result\.keySubstitute\.substituteDisplayName\s*\}\}/,
  '卡片必须展示“手边平替：[手边平替]”',
)
assert.match(
  cardSource,
  /风味相似度[\s\S]*调味技法通用/,
  '卡片必须展示“风味相似度”与“调味技法通用”说明',
)

console.log('  ✅ 通过：FridgeRecipeMatchCard.vue 视图层平替徽标与对比信息块契约 100% 吻合')

console.log('================================================================')
console.log('  🎉 所有平替破格判定、排序分层与卡片视图回归测试全部通过！    ')
console.log('================================================================')
