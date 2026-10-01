/**
 * useFlavor.ts 自定义 Hook 自动化集成与回归测试
 */

import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { ref } from 'vue'
import { useFlavor } from '../../src/composables/useFlavor'
import {
  buildUndirectedEdgeSet,
  createFlavorEngine,
  type FlavorDataset,
} from '../../src/domain/flavor'

console.log('================================================================')
console.log('         useFlavor Composable 自定义 Hook 自动化测试             ')
console.log('================================================================')

// 加载静态落盘数据
const dataDir = path.join(process.cwd(), 'public', 'data', 'flavor')
const similarityTop20 = JSON.parse(fs.readFileSync(path.join(dataDir, 'similarity_top20.json'), 'utf8'))
const zhMap = JSON.parse(fs.readFileSync(path.join(dataDir, 'zh_map.json'), 'utf8'))
const zhCanonical = JSON.parse(fs.readFileSync(path.join(dataDir, 'zh_canonical.json'), 'utf8'))
const aliasMap = JSON.parse(fs.readFileSync(path.join(dataDir, 'alias_map.json'), 'utf8'))
const edges = JSON.parse(fs.readFileSync(path.join(dataDir, 'edges.json'), 'utf8'))
const edgeSet = buildUndirectedEdgeSet(edges)

const dataset: FlavorDataset = {
  similarityTop20,
  zhMap,
  zhCanonical,
  aliasMap,
  edgeSet,
}

const mockEngine = createFlavorEngine(dataset)

// -------------------------------------------------------------
// Test 1: 响应式 inventory 监听与抱团度 / affinities 计算
// -------------------------------------------------------------
console.log('• [Test 1] 测试响应式库存输入与抱团度 / 搭档推荐计算...')
const inventoryRef = ref<string[]>(['猪肉', '葱', '姜', '蒜', '酱油'])
const sampleRecipes = [
  {
    id: 'test-recipe-1',
    title: '青椒炒鸡肉',
    ingredients: [{ name: '鸡肉', role: 'key' }, { name: '蒜' }, { name: '盐' }],
  },
  {
    id: 'test-recipe-2',
    title: '需补货大菜',
    ingredients: [{ name: '牛肉', role: 'key' }, { name: '土豆' }, { name: '胡萝卜' }, { name: '咖喱' }],
  },
  {
    id: 'test-recipe-3',
    title: '南瓜羹',
    ingredients: [{ name: '南瓜', role: 'key' }],
  },
]

const hook = useFlavor({
  inventory: inventoryRef,
  recipes: sampleRecipes,
  autoLoad: false, // 测试环境下手动注入 mockEngine
})

// 初始状态
assert.equal(hook.isReady.value, false, '未加载时 isReady 应为 false')
assert.equal(hook.cohesiveness.value.score, 0, '未加载时 cohesiveness 应为 0')
assert.deepEqual(hook.affinities.value, [], '未加载时 affinities 应为空数组')

// 注入引擎
hook.engine.value = mockEngine
hook.isReady.value = true

// 检验经典搭配抱团度
assert.equal(hook.cohesiveness.value.score, 0.9, '中餐经典搭配抱团度应精确为 0.90')
assert.equal(hook.cohesiveness.value.connectedPairs, 9)
assert.equal(hook.cohesiveness.value.totalPairs, 10)

// 检验搭档推荐
assert.ok(hook.affinities.value.length > 0, '应生成风味搭档推荐')
assert.ok(hook.affinities.value.length <= 18, '搭档推荐最多 18 项')
assert.ok(!hook.affinities.value.some(a => ['猪肉', '葱', '姜', '蒜', '酱油'].includes(a.zh)), '推荐项必须排除已选库存')
console.log('  ✅ 通过：抱团度与 affinities 随库存响应式输出准确')

// -------------------------------------------------------------
// Test 2: 食谱平替评估与 3+ 缺口空平替硬约束
// -------------------------------------------------------------
console.log('• [Test 2] 测试每道食谱 evaluation 计算与平替检测...')
// 当前库存: ['猪肉', '葱', '姜', '蒜', '酱油']
// 食谱 1: ['鸡肉', '蒜', '盐'] -> 缺鸡肉与盐。库存有猪肉，猪肉是鸡肉的 Top 1 平替 (0.34)
const eval1 = hook.recipeEvaluations.value.get('test-recipe-1')
assert.ok(eval1, '应有 test-recipe-1 的评估结果')
assert.equal(eval1.status, 'substitutable')
assert.equal(eval1.missingCount, 2)
assert.ok(eval1.substitutes.length > 0, '应给出鸡肉的猪肉平替')
assert.equal(eval1.substitutes[0].missing, '鸡肉')
assert.equal(eval1.substitutes[0].substituteZh, '猪肉')
assert.equal(eval1.substitutes[0].score, 0.34)

// 食谱 2: 缺牛肉、土豆、胡萝卜、咖喱 (4 缺口) -> need-restock，substitutes 必须为 []
const eval2 = hook.recipeEvaluations.value.get('test-recipe-2')
assert.ok(eval2, '应有 test-recipe-2 的评估结果')
assert.equal(eval2.status, 'need-restock')
assert.equal(eval2.missingCount, 4)
assert.deepEqual(eval2.substitutes, [], '3+ 缺口必须为空平替数组')
console.log('  ✅ 通过：食谱批量评估正确关联平替与 3+ 缺口封锁')

// -------------------------------------------------------------
// Test 3: 最小补货提示 (仅差 1 味，且基底硬门禁 matchedKeyCount >= 1)
// -------------------------------------------------------------
console.log('• [Test 3] 测试最小补货提示与基底硬门禁 (彻底拦截无主料重合的假补货)...')
// 更新库存为手头有 [鸡肉, 蒜]
inventoryRef.value = ['鸡肉', '蒜']
assert.equal(hook.minimalRestockRecipes.value.length, 1, '应仅有 1 道差 1 味的合规食谱')
assert.equal(hook.minimalRestockRecipes.value[0].recipeId, 'test-recipe-1', '应推荐已命中主料鸡肉的食谱 1')
assert.equal(hook.minimalRestockRecipes.value[0].missingIngredient, '盐')

// 关键断言：用户手里完全没有南瓜，零关键主料命中的《南瓜羹》必须被硬拦截！
const hasPumpkinSoup = hook.minimalRestockRecipes.value.some(r => r.recipeId === 'test-recipe-3')
assert.equal(hasPumpkinSoup, false, '手头无南瓜时，绝对禁止向用户推荐南瓜羹补货！')
console.log('  ✅ 通过：最小补货提示硬门禁生效，成功拦截无主料重合的荒唐食谱')

console.log('================================================================')
console.log('  🎉 useFlavor Hook 所有自动化测试用例 100% 验证通过！          ')
console.log('================================================================')
