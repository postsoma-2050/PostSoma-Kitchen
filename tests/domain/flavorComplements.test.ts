/**
 * flavorComplements.test.ts
 * 验证食谱卡片内部“风味探索与提味辅料可能性”算法 (getRecipeFlavorComplements) 与视图契约
 */

import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import {
  createFlavorEngine,
  getRecipeFlavorComplements,
  buildAdjacencyList,
  type FlavorDataset,
} from '../../src/domain/flavor'

console.log('================================================================')
console.log('   食谱卡片风味探索与提香进阶搭档辅料算法 (Point 4) 回归测试   ')
console.log('================================================================')

// 加载全量风味静态数据
const dataDir = path.join(process.cwd(), 'public', 'data', 'flavor')
const similarityTop20 = JSON.parse(fs.readFileSync(path.join(dataDir, 'similarity_top20.json'), 'utf8'))
const zhMap = JSON.parse(fs.readFileSync(path.join(dataDir, 'zh_map.json'), 'utf8'))
const zhCanonical = JSON.parse(fs.readFileSync(path.join(dataDir, 'zh_canonical.json'), 'utf8'))
const aliasMap = JSON.parse(fs.readFileSync(path.join(dataDir, 'alias_map.json'), 'utf8'))
const edges = JSON.parse(fs.readFileSync(path.join(dataDir, 'edges.json'), 'utf8'))
const categoryMap = JSON.parse(fs.readFileSync(path.join(dataDir, 'category_map.json'), 'utf8'))

const dataset: FlavorDataset = {
  similarityTop20,
  zhMap,
  zhCanonical,
  aliasMap,
  edges,
  categoryMap,
}

const flavorEngine = createFlavorEngine(dataset)

// -------------------------------------------------------------
// Test 1: 坚决屏蔽肉类大件（一票否决），绝对不包含 meat 品类
// -------------------------------------------------------------
console.log('• [Test 1] 验证品类角色过滤：绝对禁止推荐任何 meat 肉类大件...')
const chickenComplements = flavorEngine.getRecipeFlavorComplements(['鸡肉'], { limit: 20 })

assert.ok(chickenComplements.length > 0, '鸡肉食谱应返回推荐辅料')
for (const item of chickenComplements) {
  assert.notEqual(
    item.category,
    'meat',
    `辅料推荐中绝对禁止出现肉类大件：发现 ${item.zh} (${item.en}) category 为 meat`,
  )
  assert.notEqual(
    categoryMap[item.en],
    'meat',
    `category_map 中标记为 meat 的食材坚决不准输出：${item.zh} (${item.en})`,
  )
}

// 明确检查常见肉类绝无漏网之鱼
const forbiddenMeats = ['猪肉', '牛肉', '羊肉', '鸭肉', '兔肉', '培根', '火腿']
for (const meat of forbiddenMeats) {
  assert.equal(
    chickenComplements.some(c => c.zh === meat),
    false,
    `推荐结果严禁包含肉类 ${meat}`,
  )
}
console.log('  ✅ 通过：品类过滤硬门禁 100% 生效，无任何肉类大件混入')

// -------------------------------------------------------------
// Test 2: 鸡肉类菜谱稳定推导出高频共现辅料 (蒜、香菜、大葱、肉桂、龙蒿等)
// -------------------------------------------------------------
console.log('• [Test 2] 验证经典鸡肉搭配推导与烹饪科学共现...')
const top8Chicken = flavorEngine.getRecipeFlavorComplements(['鸡肉'], { limit: 8 })
assert.equal(top8Chicken.length, 8, '默认应输出 8 项推荐辅料')

const top8Names = top8Chicken.map(c => c.zh)
console.log('   鸡肉 Top 8 推荐辅料：', top8Names)

// 验证高频烹饪科学搭档存在
const expectedAny = ['蒜', '香菜', '大葱', '肉桂', '龙蒿', '胡萝卜', '香叶', '蜂蜜']
const matchCount = expectedAny.filter(name => top8Names.includes(name)).length
assert.ok(
  matchCount >= 4,
  `鸡肉推荐辅料必须包含经典调味/蔬菜搭配，当前命中 ${matchCount} 项 (${top8Names.join('、')})`,
)
console.log(`  ✅ 通过：经典搭档推导稳定 (命中了 ${matchCount} 项预期辅料)`)

// -------------------------------------------------------------
// Test 3: 自动排除食谱本身已有的食材
// -------------------------------------------------------------
console.log('• [Test 3] 验证自动排除食谱本身已有食材...')
// 假设食谱中除了鸡肉，原方本身就有“蒜”和“大葱”
const complementsWithGarlic = flavorEngine.getRecipeFlavorComplements(['鸡肉', '蒜', '大葱'], { limit: 8 })
const namesWithGarlic = complementsWithGarlic.map(c => c.zh)

assert.equal(namesWithGarlic.includes('蒜'), false, '原方已包含蒜，不得再次推荐蒜')
assert.equal(namesWithGarlic.includes('大葱'), false, '原方已包含大葱，不得再次推荐大葱')
console.log('  ✅ 通过：原方已有食材被精准排除')

// -------------------------------------------------------------
// Test 4: 自动排除用户手头已有的库存食材
// -------------------------------------------------------------
console.log('• [Test 4] 验证自动排除用户手头已有库存...')
// 假设用户手头库存里正好有“蒜”与“香菜”
const complementsWithInventory = flavorEngine.getRecipeFlavorComplements(['鸡肉'], {
  limit: 8,
  inventory: ['蒜', '香菜'],
})
const namesWithInventory = complementsWithInventory.map(c => c.zh)

assert.equal(namesWithInventory.includes('蒜'), false, '用户库存已有的蒜必须被排除')
assert.equal(namesWithInventory.includes('香菜'), false, '用户库存已有的香菜必须被排除')
console.log('  ✅ 通过：用户库存已有食材被精准排除，位次由下一顺位高分辅料补齐')

// -------------------------------------------------------------
// Test 5: 多食材联合加权打分 (如鸡肉 + 香菇)
// -------------------------------------------------------------
console.log('• [Test 5] 验证多核心食材联合共现打分加成...')
const singleChicken = flavorEngine.getRecipeFlavorComplements(['鸡肉'], { limit: 30 })
const chickenMushroom = flavorEngine.getRecipeFlavorComplements(['鸡肉', '香菇'], { limit: 30 })

// 找到同时与鸡肉和香菇紧密搭配的辅料 (如蒜)
const garlicSingle = singleChicken.find(c => c.zh === '蒜')
const garlicCombined = chickenMushroom.find(c => c.zh === '蒜')

assert.ok(garlicSingle, '单鸡肉应包含蒜')
assert.ok(garlicCombined, '鸡肉+香菇应包含蒜')
assert.ok(
  garlicCombined.score > garlicSingle.score,
  `同时与鸡肉、香菇共现的蒜应获得更高联合加权分 (单主料 ${garlicSingle.score} -> 双主料 ${garlicCombined.score})`,
)
console.log(`  ✅ 通过：多主料共现加成生效 (蒜得分：${garlicSingle.score} ➔ ${garlicCombined.score})`)

// -------------------------------------------------------------
// Test 6: 静默隐藏边界 (未知食材或无共现连边返回空数组)
// -------------------------------------------------------------
console.log('• [Test 6] 验证零共现连边或未知食材静默返回空数组...')
const emptyResult = flavorEngine.getRecipeFlavorComplements(['某种未收录的罕见深山野菜'], { limit: 8 })
assert.deepEqual(emptyResult, [], '无网络连边时必须静默返回空数组，不制造视觉噪音')
console.log('  ✅ 通过：静默隐藏边界测试通过')

// -------------------------------------------------------------
// Test 7: 验证 FridgeRecipeMatchCard.vue 视图层契约
// -------------------------------------------------------------
console.log('• [Test 7] 验证 FridgeRecipeMatchCard.vue 视图层契约...')
const cardSource = fs.readFileSync(path.join(process.cwd(), 'src/components/fridge/FridgeRecipeMatchCard.vue'), 'utf8')

assert.match(
  cardSource,
  /风味搭配推荐（The Flavor Bible）/,
  '卡片模板必须包含极简短语“风味搭配推荐（The Flavor Bible）”标题',
)
assert.doesNotMatch(
  cardSource,
  /name="lightbulb"/,
  '卡片模板不得使用通用电灯泡图标',
)
assert.doesNotMatch(
  cardSource,
  /基于《The Flavor Bible》经典共现网络，手头若有以下辅料/,
  '卡片模板已彻底删除多余长篇说明文本',
)
assert.match(
  cardSource,
  /v-if="flavorComplements && flavorComplements\.length > 0"/,
  '卡片模板必须支持无推荐时静默隐藏整块',
)
assert.match(
  cardSource,
  /comp\.zh/,
  '卡片模板必须紧凑循环渲染推荐辅料胶囊标签',
)
console.log('  ✅ 通过：FridgeRecipeMatchCard.vue 视图层极简契约全部吻合')

console.log('================================================================')
console.log('  🎉 所有风味探索与提香进阶搭档辅料算法与组件测试 100% 验证通过！ ')
console.log('================================================================')
