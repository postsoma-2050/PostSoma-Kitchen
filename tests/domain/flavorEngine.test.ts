/**
 * The Flavor Bible 拓扑计算引擎回归与契约测试
 */

import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import {
  buildUndirectedEdgeSet,
  calculateCohesiveness,
  createFlavorEngine,
  evaluateRecipeMatch,
  getFlavorDirections,
  normalize,
  type FlavorDataset,
} from '../../src/domain/flavor'

console.log('================================================================')
console.log('         The Flavor Bible 拓扑计算引擎全量自动化回归测试         ')
console.log('================================================================')

// 加载落盘的生产数据 (优先读取 public/data/flavor/，兜底读取 data/flavor/)
const dataDir = fs.existsSync(path.join(process.cwd(), 'public', 'data', 'flavor', 'similarity_top20.json'))
  ? path.join(process.cwd(), 'public', 'data', 'flavor')
  : path.join(process.cwd(), 'data', 'flavor')

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

const engine = createFlavorEngine(dataset)

// -------------------------------------------------------------
// Test 1: normalize() 规范化管道
// -------------------------------------------------------------
console.log('• [Test 1] 测试 normalize() 规范化管道与优雅降级...')
assert.equal(engine.normalize('蒜末'), '蒜', '蒜末应规范化为蒜')
assert.equal(engine.normalize('蒜泥'), '蒜', '蒜泥应规范化为蒜')
assert.equal(engine.normalize('鲜姜片'), '姜', '鲜姜片应去缀去形为姜')
assert.equal(engine.normalize('五花肉片'), '五花肉', '五花肉片应规范化为五花肉')
assert.equal(engine.normalize('猪瘦肉'), '猪肉', '猪瘦肉应规范化为猪肉')
assert.equal(engine.normalize('black pepper 黑胡椒粉'), '黑胡椒', '双语词应提中文并剥粉为黑胡椒')
assert.equal(engine.normalize('bacon 培根 (切小块)'), '培根', '双语词应去备注提中文为培根')
assert.equal(engine.normalize('生抽'), '酱油', '生抽应别名映射为酱油')
assert.equal(engine.normalize('老抽'), '酱油', '老抽应别名映射为酱油')
assert.equal(engine.normalize('白菜'), '大白菜', '白菜应别名映射为大白菜')
assert.equal(engine.normalize('胡椒粉'), '黑胡椒', '胡椒粉应有条件别名映射为黑胡椒')

// 未知词优雅降级 (严禁抛错，原样返回)
assert.equal(engine.normalize('料酒'), '料酒', '料酒属于 8.3 拒绝词，必须原样降级返回')
assert.equal(engine.normalize('咸鸭蛋'), '咸鸭蛋', '咸鸭蛋经审批驳回，必须原样降级返回')
assert.equal(engine.normalize('皮蛋'), '皮蛋', '中餐特有词必须原样降级返回')
assert.equal(engine.normalize('未知食材XYZ'), '未知食材XYZ', '未识别食材必须原样返回')
console.log('  ✅ 通过：normalize() 成功覆盖修饰词剥离、双语清洗、别名映射与未知词优雅降级')

// -------------------------------------------------------------
// Test 2: Point 6 锚点 1 (缺猪肉 -> 鸡肉 0.34)
// -------------------------------------------------------------
console.log('• [Test 2] 测试 Point 6 锚点 1：缺猪肉 -> 鸡肉 (平替得分 0.34)...')
const resPork = engine.evaluateRecipeMatch(['猪肉', '蒜', '盐'], ['鸡肉', '蒜', '盐'])
assert.equal(resPork.status, 'substitutable', '1 项缺口状态必须为 substitutable')
assert.equal(resPork.missingCount, 1, '缺口数应为 1')
assert.deepEqual(resPork.missing, ['猪肉'], '缺失项应为猪肉')
assert.equal(resPork.substitutes.length, 1, '应给出 1 个平替')
assert.equal(resPork.substitutes[0].missing, '猪肉')
assert.equal(resPork.substitutes[0].substituteZh, '鸡肉')
assert.equal(resPork.substitutes[0].score, 0.34, '猪肉平替鸡肉相似度必须精确为 0.34')
console.log('  ✅ 通过：猪肉 -> 鸡肉 0.34 锚点回归精确一致')

// -------------------------------------------------------------
// Test 3: Point 6 锚点 2 (缺辣椒 -> 蒜 0.28)
// -------------------------------------------------------------
console.log('• [Test 3] 测试 Point 6 锚点 2：缺辣椒 -> 蒜 (平替得分 0.28)...')
const resChile = engine.evaluateRecipeMatch(['牛肉', '辣椒', '盐'], ['牛肉', '蒜', '盐'])
assert.equal(resChile.status, 'substitutable', '1 项缺口状态必须为 substitutable')
assert.equal(resChile.missingCount, 1, '缺口数应为 1')
assert.deepEqual(resChile.missing, ['辣椒'], '缺失项应为辣椒')
assert.equal(resChile.substitutes.length, 1, '应给出 1 个平替')
assert.equal(resChile.substitutes[0].missing, '辣椒')
assert.equal(resChile.substitutes[0].substituteZh, '蒜')
assert.equal(resChile.substitutes[0].score, 0.28, '辣椒平替蒜相似度必须精确为 0.28')
console.log('  ✅ 通过：辣椒 -> 蒜 0.28 锚点回归精确一致')

// -------------------------------------------------------------
// Test 4: 0 缺口判定 ('ready'，substitutes 必须为空)
// -------------------------------------------------------------
console.log('• [Test 4] 测试 0 缺口判定：状态必须为 ready，substitutes 为空...')
const resReady = engine.evaluateRecipeMatch(['牛肉', '洋葱', '盐'], ['牛肉', '洋葱', '盐', '香菜'])
assert.equal(resReady.status, 'ready', '0 缺口状态必须为 ready')
assert.equal(resReady.missingCount, 0, '缺口数必须为 0')
assert.deepEqual(resReady.missing, [], '缺失数组必须为空')
assert.deepEqual(resReady.substitutes, [], '可开做时平替数组必须为空')
console.log('  ✅ 通过：0 缺口状态与契约硬约束验证通过')

// -------------------------------------------------------------
// Test 5: 3+ 缺口判定 ('need-restock'，硬约束严禁给平替)
// -------------------------------------------------------------
console.log('• [Test 5] 测试 3+ 缺口判定：状态必须为 need-restock，严禁给出平替...')
const resNeedRestock = engine.evaluateRecipeMatch(
  ['牛肉', '辣椒', '盐', '洋葱'],
  ['牛肉']
)
assert.equal(resNeedRestock.status, 'need-restock', '3+ 缺口状态必须为 need-restock')
assert.equal(resNeedRestock.missingCount, 3, '缺口数应为 3')
assert.deepEqual(resNeedRestock.missing, ['辣椒', '盐', '洋葱'])
assert.deepEqual(resNeedRestock.substitutes, [], '3+ 缺口契约硬约束：substitutes 必须为空数组')
console.log('  ✅ 通过：3+ 缺口拦截平替硬约束验证通过')

// -------------------------------------------------------------
// Test 6: 抱团度计算 (真搭配显著高于随机搭配)
// -------------------------------------------------------------
console.log('• [Test 6] 测试抱团度 (Cohesiveness)：真实搭配显著高于随机伪搭配...')
const chineseReal = engine.calculateCohesiveness(['猪肉', '葱', '姜', '蒜', '酱油'])
const westernReal = engine.calculateCohesiveness(['牛肉', '洋葱', '胡萝卜', '芹菜', '百里香'])
const randomFake1 = engine.calculateCohesiveness(['鸡肉', '香草', '蓝莓蜜', '羊肉', '苦苣'])
const randomFake2 = engine.calculateCohesiveness(['猪肉', '枫糖浆', '柚子醋', '树莓蜜', '芜菁'])

console.log('   - 中餐真搭配抱团度:', chineseReal.score, `(${chineseReal.connectedPairs}/${chineseReal.totalPairs})`)
console.log('   - 西餐真搭配抱团度:', westernReal.score, `(${westernReal.connectedPairs}/${westernReal.totalPairs})`)
console.log('   - 随机弱搭配1抱团度:', randomFake1.score, `(${randomFake1.connectedPairs}/${randomFake1.totalPairs})`)
console.log('   - 随机弱搭配2抱团度:', randomFake2.score, `(${randomFake2.connectedPairs}/${randomFake2.totalPairs})`)

assert.equal(chineseReal.score, 0.9, '中餐经典搭配抱团度必须为 0.90')
assert.equal(westernReal.score, 0.9, '西餐经典搭配抱团度必须为 0.90')
assert.ok(chineseReal.score > randomFake1.score * 2, '真搭配应显著高于随机搭配1')
assert.ok(chineseReal.score > randomFake2.score * 8, '真搭配应数倍于随机弱搭配2')
console.log('  ✅ 通过：抱团度算法具备高度辨识力，锚点比对通过')

// -------------------------------------------------------------
// Test 7: 风味方向推荐 (Top 18 排重)
// -------------------------------------------------------------
console.log('• [Test 7] 测试风味方向推荐：聚合 Top20 排除已选并取 Top 18...')
const directions = engine.getFlavorDirections(['牛肉', '洋葱', '蒜'])
assert.ok(directions.length <= 18 && directions.length > 0, '推荐方向应在 1~18 项之间')
const selected = new Set(['牛肉', '洋葱', '蒜', 'beef', 'onions', 'garlic'])
for (const dir of directions) {
  assert.ok(!selected.has(dir.zh), `推荐项 ${dir.zh} 不能在已选列表中`)
  assert.ok(dir.score > 0 && dir.score <= 1, '得分必须在 (0, 1] 区间')
  assert.ok(dir.zh.length > 0 && dir.en.length > 0, '中文和英文标识必须完整')
}
console.log('  ✅ 通过：风味方向 Top 18 推荐结果正确且严格排重')

console.log('================================================================')
console.log('  🎉 所有 7 组 The Flavor Bible 引擎契约测试 100% 验证通过！    ')
console.log('================================================================')
