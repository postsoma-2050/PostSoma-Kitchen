import assert from 'node:assert/strict'
import type { VisualRecipeV3 } from '../../src/types/recipeV3'
import { CHINESE_HEALTHY_RECIPES } from '../../src/data/chineseHealthyRecipes'
import { espressoBrowniesV3 } from '../../src/data/v3Examples'
import {
  canRenderContinuousTable,
  resolveLayoutMode,
  buildV3ContinuousTableLayout,
  getUpstreamBlockIds,
  getMaterialUpstreamIds,
} from '../../src/utils/continuousTableLayout'
import { generateContinuousTableSvgString, generatePageSvgString } from '../../src/utils/exportFlowCard'

console.log('=== 开始连续工序表 (Continuous Process Table) 契约测试 ===\n')

// -------------------------------------------------------------
// 契约 1: 尚未加入的原料延伸到正确阶段 (Waiting Lanes)
// -------------------------------------------------------------
const linearMergeSample = espressoBrowniesV3
const linearMergeLayout = buildV3ContinuousTableLayout(linearMergeSample)

// 布朗尼面粉 i5 在翻拌列才加入，之前三列必须保持等待通道。
const flourWaitingLanes = linearMergeLayout.waitingLanes.filter(w => w.ingredientId === 'i5')
assert.deepEqual(flourWaitingLanes.map(lane => lane.colIndex), [0, 1, 2], '面粉在进入翻拌前必须连续等待三列')
console.log('✅ 契约 1 通过: 尚未加入的原料延伸到正确阶段 (Waiting Lanes 正确生成)')

// -------------------------------------------------------------
// 契约 2: 汇合后内部横线正确终止 (Internal Dividing Lines Terminate)
// -------------------------------------------------------------
// b1 在第 1 列合并 row 0..3，区域内部的水平线必须终止。
const mergeColIndex = 1
const mergeColX = linearMergeLayout.ingredientColWidth + 16 + linearMergeLayout.actionColWidths[0]
const mergeColW = linearMergeLayout.actionColWidths[mergeColIndex]
const lineY_0_1 = linearMergeLayout.rowYPositions[0] + linearMergeLayout.rowHeights[0]
const lineY_1_2 = linearMergeLayout.rowYPositions[1] + linearMergeLayout.rowHeights[1]

const lineInsideB1_0_1 = linearMergeLayout.horizontalLines.find(
  l => l.x1 === mergeColX && l.x2 === mergeColX + mergeColW && Math.abs(l.y1 - lineY_0_1) < 1
)
const lineInsideB1_1_2 = linearMergeLayout.horizontalLines.find(
  l => l.x1 === mergeColX && l.x2 === mergeColX + mergeColW && Math.abs(l.y1 - lineY_1_2) < 1
)

assert.equal(lineInsideB1_0_1, undefined, '工序 b1 内部 row 0 与 row 1 之间的水平线必须彻底终止')
assert.equal(lineInsideB1_1_2, undefined, '工序 b1 内部 row 1 与 row 2 之间的水平线必须彻底终止')

// 但原料列内部在这些 Y 坐标处必须保留水平线
const ingLine_0_1 = linearMergeLayout.horizontalLines.find(
  l => l.x1 === 16 && l.x2 === 16 + linearMergeLayout.ingredientColWidth && Math.abs(l.y1 - lineY_0_1) < 1
)
assert.ok(ingLine_0_1, '原料列内部的水平分割线必须完整保留')
console.log('✅ 契约 2 通过: 汇合后内部横线正确终止 (原料列保留分割，合并单元格内彻底消隐)')

// -------------------------------------------------------------
// 契约 3: 无关中间食材不被隐式吸收 (No Implicit Ingredient Absorption)
// -------------------------------------------------------------
const badRecipe: VisualRecipeV3 = {
  id: 'test-non-contiguous',
  version: '3.0',
  status: 'draft',
  title: '非连续跳行食谱',
  cuisine: 'chinese',
  difficulty: 'easy',
  prerequisites: { containerSize: '锅' },
  ingredients: [
    { id: 'i0', name: '食材A', amountText: '100g', category: 'main' },
    { id: 'i1', name: '无关食材B', amountText: '50g', category: 'produce' },
    { id: 'i2', name: '无关食材C', amountText: '50g', category: 'produce' },
    { id: 'i3', name: '无关食材D', amountText: '50g', category: 'produce' },
    { id: 'i4', name: '食材E', amountText: '100g', category: 'seasoning' },
  ],
  actionBlocks: [
    { id: 'b1', label: '非连续合炒', stageIndex: 0, ingredientIds: ['i0', 'i4'] }
  ],
  finalBlock: { method: 'fry', label: '出锅装盘' }
}
const nonContiguousCheck = canRenderContinuousTable(badRecipe)
assert.equal(nonContiguousCheck.canRender, false, '跳跃非连续食材不能作为连续工序表渲染')
assert.match(nonContiguousCheck.reason || '', /不连续/, '明确给出不连续的降级诊断原因')
console.log('✅ 契约 3 通过: 无关中间食材不被隐式吸收 (非连续跳行正确触发安全降级)')

// -------------------------------------------------------------
// 契约 4: 共享边界没有重复绘制 (Single-Pass Grid Lines)
// -------------------------------------------------------------
const lineKeySet = new Set<string>()
for (const l of linearMergeLayout.horizontalLines) {
  const key = `H_${l.x1}_${l.y1}_${l.x2}_${l.y2}`
  assert.ok(!lineKeySet.has(key), `水平线段 ${key} 不得重复绘制`)
  lineKeySet.add(key)
}
for (const l of linearMergeLayout.verticalLines) {
  const key = `V_${l.x1}_${l.y1}_${l.x2}_${l.y2}`
  assert.ok(!lineKeySet.has(key), `垂直线段 ${key} 不得重复绘制`)
  lineKeySet.add(key)
}
console.log('✅ 契约 4 通过: 共享边界没有重复绘制 (单次绘制，无边框叠加加粗)')

// -------------------------------------------------------------
// 契约 5: 暂存物料不进入等待工序，支线不穿无关区域 (暂存回锅 4 步样板)
// -------------------------------------------------------------
const caseBCn59Fixture: VisualRecipeV3 = {
  id: 'fixture-hold-aside-beef',
  title: '🥩 经典平肝芹菜炒牛肉丝 (Hold-Aside 拓扑测试样板)',
  status: 'published',
  cuisine: 'chinese',
  version: '3.0',
  prerequisites: {
    containerSize: '中式炒锅',
    preheat: '牛肉切细丝上浆',
    servings: '3 人份'
  },
  ingredients: [
    { id: 'i1', name: '嫩牛肉丝 (上浆)', category: 'main', amountText: '200 g' },
    { id: 'i2', name: '香芹菜段', category: 'produce', amountText: '200 g' },
    { id: 'i3', name: '泡野山椒碎与姜丝', category: 'produce', amountText: '野山椒+姜丝' },
    { id: 'i4', name: '上浆料酒生抽水淀粉', category: 'seasoning', amountText: '适量' },
    { id: 'i5', name: '老抽盐鸡精白糖', category: 'seasoning', amountText: '适量' }
  ],
  actionBlocks: [
    {
      id: 'b1',
      label: '牛肉上浆码味',
      stageIndex: 0,
      ingredientIds: ['i1', 'i4']
    },
    {
      id: 'b2',
      label: '滑油盛出暂存',
      stageIndex: 1,
      ingredientIds: ['i1', 'i4'],
      inputBlockIds: ['b1'],
      dependencies: [{ sourceBlockId: 'b1', type: 'material', label: '上浆牛肉' }]
    },
    {
      id: 'b3',
      label: '底油爆香炒芹菜',
      stageIndex: 2,
      ingredientIds: ['i2', 'i3'],
      afterBlockIds: ['b2'],
      dependencies: [{ sourceBlockId: 'b2', type: 'order', label: '同锅留底油' }]
    },
    {
      id: 'b4',
      label: '回锅调味合炒出锅',
      stageIndex: 3,
      ingredientIds: ['i1', 'i2', 'i3', 'i5'],
      inputBlockIds: ['b2', 'b3'],
      dependencies: [
        { sourceBlockId: 'b2', type: 'material', label: '暂存牛肉' },
        { sourceBlockId: 'b3', type: 'material', label: '炒透芹菜' }
      ]
    }
  ],
  finalBlock: {
    label: '辣香鲜嫩 🥩',
    method: 'fry',
    instructions: '牛肉滑嫩，芹菜清脆微辣开胃'
  }
}
const cn59Layout = buildV3ContinuousTableLayout(caseBCn59Fixture)

// 验证 cn-59 中的暂存走廊 (Hold-Aside Bridge)
assert.equal(cn59Layout.holdAsideBridges.length, 1, '必须识别并生成暂存牛肉跨列走廊')
const beefBridge = cn59Layout.holdAsideBridges[0]
assert.equal(beefBridge.sourceBlockId, 'b2', '暂存走廊源头来自 b2 (滑油盛出牛肉)')
assert.equal(beefBridge.targetBlockId, 'b4', '暂存走廊终点通向 b4 (牛肉回锅合炒定味)')
assert.equal(beefBridge.fromCol, 2, '暂存走廊跨越第 2 列 (炒芹菜列)')

// 检查第 2 列的 b3 (锅留底油爆炒芹菜) 与牛肉暂存走廊在几何上是否重叠
const b3Cell = cn59Layout.processCells.find(p => p.id === 'b3')!
assert.ok(b3Cell, 'b3 单元格必须存在')
assert.equal(b3Cell.colIndex, 2, 'b3 处于第 2 列')

const bridgeBottom = beefBridge.y + beefBridge.h
const b3Top = b3Cell.y
assert.ok(bridgeBottom <= b3Top, `牛肉暂存走廊底部 (${bridgeBottom}) 必须在芹菜工序顶部 (${b3Top}) 之上，绝不能穿过芹菜工序`)
console.log('✅ 契约 5 通过: 暂存物料不进入等待工序，牛肉走廊清晰跨过芹菜列回锅，完全无穿卡')

// -------------------------------------------------------------
// 契约 6: 等待依赖参与拓扑顺序
// -------------------------------------------------------------
const testOrderRecipe: VisualRecipeV3 = {
  id: 'test-order-topo',
  version: '3.0',
  status: 'draft',
  title: '等待依赖拓扑测试',
  cuisine: 'chinese',
  difficulty: 'easy',
  prerequisites: { containerSize: '锅' },
  ingredients: [
    { id: 'i1', name: '食材1', amountText: '100g', category: 'main' },
    { id: 'i2', name: '食材2', amountText: '100g', category: 'produce' },
  ],
  actionBlocks: [
    { id: 'stepA', label: '工序A', stageIndex: 2, ingredientIds: ['i1'] },
    { id: 'stepB', label: '工序B', stageIndex: 0, ingredientIds: ['i2'], afterBlockIds: ['stepA'] },
  ],
  finalBlock: { method: 'fry', label: '出锅装盘' }
}
const orderLayout = buildV3ContinuousTableLayout(testOrderRecipe)
const stepACell = orderLayout.processCells.find(p => p.id === 'stepA')!
const stepBCell = orderLayout.processCells.find(p => p.id === 'stepB')!
assert.ok(stepBCell.colIndex > stepACell.colIndex, '即使 stageIndex 较小，受 afterBlockIds 约束的下游工序列号必须严格大于上游')
console.log('✅ 契约 6 通过: 等待依赖严格参与拓扑排序')

// -------------------------------------------------------------
// 契约 7: 页面与导出布局结果完全一致 (Visual Consistency)
// -------------------------------------------------------------
const exportSvgResult = generatePageSvgString(linearMergeSample, 0, 1, undefined, 'full', 'table')
assert.equal(exportSvgResult.width, linearMergeLayout.canvasWidth, '导出图卡宽度与表格布局引擎宽度必须严格一致')
assert.equal(exportSvgResult.height, linearMergeLayout.canvasHeight, '导出图卡高度与表格布局引擎高度必须严格一致')
assert.match(exportSvgResult.svgString, /v3-table-header-group/, '导出 SVG 包含表格表头')
assert.match(exportSvgResult.svgString, /v3-table-grid-lines/, '导出 SVG 包含单次绘制网格线')
assert.match(exportSvgResult.svgString, /烘焙 bake/, '导出 SVG 包含真实操作型终步')
console.log('✅ 契约 7 通过: 页面与导出布局结果严格一致 (共享领域布局引擎)')

// -------------------------------------------------------------
// 契约 8: 经典样板 A (布朗尼蛋糕 Linear Merge 样板)
// -------------------------------------------------------------
const brownieLayout = buildV3ContinuousTableLayout(espressoBrowniesV3)
assert.ok(brownieLayout.canvasWidth > 900, '布朗尼连续表格宽度合理')
assert.equal(brownieLayout.processCells.length, 5, '布朗尼包含 4 步制作工序 + 1 步最终烘焙完成')
const finalBrownie = brownieLayout.processCells.find(p => p.isFinalBlock)!
assert.equal(finalBrownie.spanRows, espressoBrowniesV3.ingredients.length, '最终烘焙完成区域必须跨满全部食材行')
console.log('✅ 契约 8 通过: 样板 A (布朗尼) 线性汇合与大跨度合并完全符合预期')

// -------------------------------------------------------------
// 契约 9: 严格单行跳跃检测 (严禁跳过单行夹带无关食材)
// -------------------------------------------------------------
const singleRowGapRecipe: VisualRecipeV3 = {
  id: 'test-single-row-gap',
  version: '3.0',
  status: 'draft',
  title: '跳过单行食材食谱',
  cuisine: 'chinese',
  difficulty: 'easy',
  prerequisites: { containerSize: '锅' },
  ingredients: [
    { id: 'i0', name: '鸡肉', amountText: '200g', category: 'main' },
    { id: 'i1', name: '无关番茄', amountText: '100g', category: 'produce' },
    { id: 'i2', name: '淀粉', amountText: '10g', category: 'seasoning' },
  ],
  actionBlocks: [
    { id: 'b1', label: '鸡肉上浆', stageIndex: 0, ingredientIds: ['i0', 'i2'] } // 只用第 0、2 行，跳过第 1 行
  ],
  finalBlock: { method: 'fry', label: '出锅装盘' }
}
const singleRowGapCheck = canRenderContinuousTable(singleRowGapRecipe)
assert.equal(singleRowGapCheck.canRender, false, '跳过单行的非连续输入必须被严格拒绝，严禁隐式吸收无关行')
assert.match(singleRowGapCheck.reason || '', /不连续|跳过/, '诊断原因必须明确指出跳行食材')
console.log('✅ 契约 9 通过: 严格单行跳跃检测 (严禁跳过单行夹带无关食材)')

// -------------------------------------------------------------
// 契约 10: 严禁以 legacy 未确认依赖假定物料流
// -------------------------------------------------------------
const legacyDepRecipe: VisualRecipeV3 = {
  id: 'test-legacy-dep',
  version: '3.0',
  status: 'draft',
  title: '旧式未确认依赖食谱',
  cuisine: 'chinese',
  difficulty: 'easy',
  prerequisites: { containerSize: '锅' },
  ingredients: [
    { id: 'i0', name: '主料A', amountText: '100g', category: 'main' },
    { id: 'i1', name: '辅料B', amountText: '50g', category: 'produce' },
  ],
  actionBlocks: [
    { id: 'b1', label: '预处理A', stageIndex: 0, ingredientIds: ['i0'] },
    {
      id: 'b2',
      label: '后续加工B',
      stageIndex: 1,
      ingredientIds: ['i1'],
      dependencies: [{ sourceBlockId: 'b1', type: 'legacy' }]
    }
  ],
  finalBlock: { method: 'fry', label: '出锅装盘' }
}
const legacyCheck = canRenderContinuousTable(legacyDepRecipe)
assert.equal(legacyCheck.canRender, false, '未确认语义的旧式 legacy 依赖必须拒绝连续表格准入')
assert.match(legacyCheck.reason || '', /legacy/, '诊断原因必须明确指出 legacy 依赖')

const legacyMaterialIds = getMaterialUpstreamIds(legacyDepRecipe.actionBlocks[1])
assert.deepEqual(legacyMaterialIds, [], 'getMaterialUpstreamIds 严禁把 legacy 依赖误判为物料流')
console.log('✅ 契约 10 通过: 严禁以 legacy 未确认依赖假定物料流 (拒斥未确认物料合并)')

// -------------------------------------------------------------
// 契约 11: 严格同阶段区域防冲突检查 (拒绝同列实体重叠)
// -------------------------------------------------------------
const conflictRecipe: VisualRecipeV3 = {
  id: 'test-stage-conflict',
  version: '3.0',
  status: 'draft',
  title: '同阶段区域冲突食谱',
  cuisine: 'chinese',
  difficulty: 'easy',
  prerequisites: { containerSize: '锅' },
  ingredients: [
    { id: 'i0', name: '食材A', amountText: '100g', category: 'main' },
    { id: 'i1', name: '冲突食材B', amountText: '100g', category: 'main' },
    { id: 'i2', name: '食材C', amountText: '100g', category: 'main' },
  ],
  actionBlocks: [
    { id: 'b1', label: '工序A', stageIndex: 0, ingredientIds: ['i0', 'i1'] }, // 占用第 0、1 行
    { id: 'b2', label: '工序B', stageIndex: 0, ingredientIds: ['i1', 'i2'] }, // 同样在 stage 0，占用第 1、2 行
  ],
  finalBlock: { method: 'fry', label: '出锅装盘' }
}
const conflictCheck = canRenderContinuousTable(conflictRecipe)
assert.equal(conflictCheck.canRender, false, '同一阶段存在食材行重叠冲突时必须拒绝连续表格准入')
assert.match(conflictCheck.reason || '', /行冲突|重叠/, '诊断原因必须明确指出同一阶段的行重叠冲突')
console.log('✅ 契约 11 通过: 严格同阶段区域防冲突检查 (拒绝同列实体重叠并安全降级)')

// -------------------------------------------------------------
// 契约 12: 不合格食谱即使显式请求 table，页面与导出也必须降级 (三入口统一闭环)
// -------------------------------------------------------------
// 1) 模式解析统一性校验
assert.equal(
  resolveLayoutMode(singleRowGapRecipe, 'table'),
  'table',
  '可通过显示重排消除跳行时应进入表格，原始数据保持不变'
)
assert.equal(
  resolveLayoutMode(legacyDepRecipe, 'table'),
  'flow',
  '旧式依赖食谱即使显式请求 table 模式，resolveLayoutMode 也必须强制降级为 flow'
)
assert.equal(
  resolveLayoutMode(conflictRecipe, 'table'),
  'flow',
  '同阶段冲突食谱即使显式请求 table 模式，resolveLayoutMode 也必须强制降级为 flow'
)

// 2) 导出函数统一降级校验
const downgradedSvg = generatePageSvgString(conflictRecipe, 0, 1, undefined, 'full', 'table')
assert.doesNotMatch(downgradedSvg.svgString, /v3-table-header-group|v3-table-grid-lines/, '降级后严禁输出连续表格的表头与网格')
assert.match(downgradedSvg.svgString, /flow-arrow/, '显式请求 table 的不合格食谱导出必须安全降级为包含 flow-arrow 标记的分支流程图')

// 3) 合格食谱正常进入 table 模式
assert.equal(
  resolveLayoutMode(linearMergeSample, 'table'),
  'table',
  '合格食谱显式请求 table 正常解析为 table'
)
assert.equal(
  resolveLayoutMode(linearMergeSample, 'auto'),
  'table',
  '合格食谱默认 auto 正常解析为 table'
)
assert.equal(
  resolveLayoutMode(linearMergeSample, 'flow'),
  'flow',
  '合格食谱显式请求 flow 必须尊重用户的 flow 设置'
)
console.log('✅ 契约 12 通过: 不合格食谱即使显式请求 table，页面与导出也必须安全降级 (三入口统一闭环)')

// -------------------------------------------------------------
// 契约 13: 当前原书数据与结果型终点职责
// -------------------------------------------------------------
const porkNoodles = CHINESE_HEALTHY_RECIPES.find(r => r.id === 'cn-02')!
assert.ok(porkNoodles, '原书食谱 cn-02 必须存在')
assert.equal(porkNoodles.title, '🥩 猪肉炖粉条')
assert.equal(porkNoodles.provenance?.sourceType, 'book', '食谱必须保留原书来源')
assert.match(porkNoodles.provenance?.locator || '', /OEBPS\/.+猪肉炖粉条/, '食谱必须具有可复查的 EPUB 定位')
assert.equal(porkNoodles.dataReview?.topology, 'modeled', '自动拆解的拓扑必须诚实标为 modeled')
assert.equal(porkNoodles.finalBlock?.role, 'outcome', '全部真实操作已在 actionBlocks 中时，终点必须是结果型')
assert.equal(porkNoodles.finalBlock?.label, '完成', '结果型终点不得重复“炖煮”或使用风味形容词')

const porkNoodlesCheck = canRenderContinuousTable(porkNoodles)
assert.equal(porkNoodlesCheck.canRender, true, '当前原书食谱必须通过连续工序表准入')
const porkNoodlesLayout = buildV3ContinuousTableLayout(porkNoodles)
assert.equal(porkNoodlesLayout.mode, 'continuous-table')
assert.equal(
  porkNoodlesLayout.processCells.filter(cell => cell.isFinalBlock).length,
  0,
  '结果型终点不得被渲染成重复的整列工序',
)

const firstSourceStep = porkNoodlesLayout.processCells.find(cell => cell.id === 'b1')!
const secondSourceStep = porkNoodlesLayout.processCells.find(cell => cell.id === 'b2')!
assert.ok(firstSourceStep && secondSourceStep, '原书两个步骤必须完整进入连续工序表')
assert.deepEqual(secondSourceStep.incomingMaterials, ['切配沥干备用泡发'], '第二步必须承接第一步处理物')
assert.ok(secondSourceStep.newIngredients?.includes('酱油'), '第二步必须明确接入本步新增调料')
console.log('✅ 契约 13 通过: 原书定位、建模状态、物料承接与结果型终点职责一致')

// -------------------------------------------------------------
// 契约 14: 连续工序表动态高度扩展
// -------------------------------------------------------------
assert.ok(firstSourceStep.h >= 60, `多行工序单元格必须具备可读高度（实际: ${firstSourceStep.h}px >= 60px）`)
assert.ok(
  porkNoodlesLayout.rowHeights.slice(firstSourceStep.startRow, firstSourceStep.endRow + 1).every(height => height >= 44),
  '工序覆盖的每一行均不得低于基础可读高度',
)
console.log('✅ 契约 14 通过: 连续工序表动态高度足以容纳精简主视觉内容')

console.log('\n=============================================================')
console.log('🎉 全部 14 项连续工序表 (Continuous Process Table) 契约测试通过！')
console.log('=============================================================\n')
