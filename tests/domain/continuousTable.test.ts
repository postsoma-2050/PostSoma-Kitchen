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
const cn20 = CHINESE_HEALTHY_RECIPES.find(r => r.id === 'cn-20-banli-jiding')!
assert.ok(cn20, 'cn-20 必须存在')
const cn20Layout = buildV3ContinuousTableLayout(cn20)

// 在 cn-20 中，熟板栗 i2 是第 4 个食材 (rowIndex 3)，在第 3 列 (b3, colIndex 2) 才加入
const chestnutWaitingLanes = cn20Layout.waitingLanes.filter(w => w.ingredientId === 'i2')
assert.equal(chestnutWaitingLanes.length, 2, '熟板栗在进入 b3 之前，必须在第 0 列和第 1 列各有一个延伸等待通道')
assert.equal(chestnutWaitingLanes[0].colIndex, 0, '第 0 列包含熟板栗等待通道')
assert.equal(chestnutWaitingLanes[1].colIndex, 1, '第 1 列包含熟板栗等待通道')
console.log('✅ 契约 1 通过: 尚未加入的原料延伸到正确阶段 (Waiting Lanes 正确生成)')

// -------------------------------------------------------------
// 契约 2: 汇合后内部横线正确终止 (Internal Dividing Lines Terminate)
// -------------------------------------------------------------
// cn-20 的 b1 (腌渍鸡丁入味) 在第 0 列合并了 row 0 (鸡肉), row 1 (酱油与蚝油), row 2 (姜末蒜末)
// 那么在第 0 列内部，介于 row 0 与 row 1 之间、row 1 与 row 2 之间的水平线必须全部终止！
const col0X = cn20Layout.ingredientColWidth + 16
const col0W = cn20Layout.actionColWidths[0]
const lineY_0_1 = cn20Layout.rowYPositions[0] + cn20Layout.rowHeights[0]
const lineY_1_2 = cn20Layout.rowYPositions[1] + cn20Layout.rowHeights[1]

const lineInsideB1_0_1 = cn20Layout.horizontalLines.find(
  l => l.x1 === col0X && l.x2 === col0X + col0W && Math.abs(l.y1 - lineY_0_1) < 1
)
const lineInsideB1_1_2 = cn20Layout.horizontalLines.find(
  l => l.x1 === col0X && l.x2 === col0X + col0W && Math.abs(l.y1 - lineY_1_2) < 1
)

assert.equal(lineInsideB1_0_1, undefined, '工序 b1 内部 row 0 与 row 1 之间的水平线必须彻底终止')
assert.equal(lineInsideB1_1_2, undefined, '工序 b1 内部 row 1 与 row 2 之间的水平线必须彻底终止')

// 但原料列内部在这些 Y 坐标处必须保留水平线
const ingLine_0_1 = cn20Layout.horizontalLines.find(
  l => l.x1 === 16 && l.x2 === 16 + cn20Layout.ingredientColWidth && Math.abs(l.y1 - lineY_0_1) < 1
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
for (const l of cn20Layout.horizontalLines) {
  const key = `H_${l.x1}_${l.y1}_${l.x2}_${l.y2}`
  assert.ok(!lineKeySet.has(key), `水平线段 ${key} 不得重复绘制`)
  lineKeySet.add(key)
}
for (const l of cn20Layout.verticalLines) {
  const key = `V_${l.x1}_${l.y1}_${l.x2}_${l.y2}`
  assert.ok(!lineKeySet.has(key), `垂直线段 ${key} 不得重复绘制`)
  lineKeySet.add(key)
}
console.log('✅ 契约 4 通过: 共享边界没有重复绘制 (单次绘制，无边框叠加加粗)')

// -------------------------------------------------------------
// 契约 5: 暂存物料不进入等待工序，支线不穿无关区域 (cn-59 芹菜牛肉)
// -------------------------------------------------------------
const cn59 = CHINESE_HEALTHY_RECIPES.find(r => r.id === 'cn-59-qincai-niurou')!
assert.ok(cn59, 'cn-59 必须存在')
const cn59Layout = buildV3ContinuousTableLayout(cn59)

// 验证 cn-59 中的暂存走廊 (Hold-Aside Bridge)
assert.equal(cn59Layout.holdAsideBridges.length, 1, 'cn-59 必须识别并生成暂存牛肉跨列走廊')
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
const exportSvgResult = generatePageSvgString(cn20, 0, 1, undefined, 'full', 'table')
assert.equal(exportSvgResult.width, cn20Layout.canvasWidth, '导出图卡宽度与表格布局引擎宽度必须严格一致')
assert.equal(exportSvgResult.height, cn20Layout.canvasHeight, '导出图卡高度与表格布局引擎高度必须严格一致')
assert.match(exportSvgResult.svgString, /v3-table-header-group/, '导出 SVG 包含表格表头')
assert.match(exportSvgResult.svgString, /v3-table-grid-lines/, '导出 SVG 包含单次绘制网格线')
assert.match(exportSvgResult.svgString, /出锅装盘 🍗/, '导出 SVG 包含正确操作终点')
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
  resolveLayoutMode(cn20, 'table'),
  'table',
  '合格食谱显式请求 table 正常解析为 table'
)
assert.equal(
  resolveLayoutMode(cn20, 'auto'),
  'table',
  '合格食谱默认 auto 正常解析为 table'
)
assert.equal(
  resolveLayoutMode(cn20, 'flow'),
  'flow',
  '合格食谱显式请求 flow 必须尊重用户的 flow 设置'
)
console.log('✅ 契约 12 通过: 不合格食谱即使显式请求 table，页面与导出也必须安全降级 (三入口统一闭环)')

// -------------------------------------------------------------
// 契约 13: 样板菜 cn-14 事实可信度与连续表格完整语义表达
// -------------------------------------------------------------
const cn14 = CHINESE_HEALTHY_RECIPES.find(r => r.id === 'cn-14-zhurou-dun-fentiao')!
assert.ok(cn14, 'cn-14 必须存在')
assert.equal(cn14.status, 'draft', 'cn-14 必须诚实标示为 draft 状态（待厨房实测验证）')
assert.equal(cn14.ingredients.length, 12, 'cn-14 必须原子化为 12 项执行原料 (八角与食盐收敛至改编候选记录)')
assert.equal(cn14.actionBlocks.length, 5, 'cn-14 必须拆解为 5 道独立动作块（焯肉/炒糖/加汤/焖炖/合炖）')

const cn14TableCheck = canRenderContinuousTable(cn14)
assert.equal(cn14TableCheck.canRender, true, 'cn-14 必须 100% 通过连续工序表准入校验')

const cn14Layout = buildV3ContinuousTableLayout(cn14)
assert.equal(cn14Layout.mode, 'continuous-table')
assert.equal(cn14Layout.processCells.length, 6, '包含 5 个工序合并单元格与 1 个出锅装盘终点单元格')

// 验证工序事实表达：承接、新放入、准出状态、产出物料
const b1Cell = cn14Layout.processCells.find(p => p.id === 'b1')!
assert.equal(b1Cell.label, '冷水焯肉')
assert.equal(b1Cell.outputItem, '焯透五花肉')
assert.equal(b1Cell.completionState, '大火沸腾撇净浮沫，肉块断生捞出')
assert.deepEqual(b1Cell.newIngredients, ['带皮五花肉'])
assert.equal(b1Cell.incomingMaterials, undefined)

const b2Cell = cn14Layout.processCells.find(p => p.id === 'b2')!
assert.equal(b2Cell.label, '煸炒上色')
assert.equal(b2Cell.outputItem, '糖色五花肉')
assert.deepEqual(b2Cell.incomingMaterials, ['焯透五花肉'])
assert.deepEqual(b2Cell.newIngredients, ['白糖', '植物油'])

const b4Cell = cn14Layout.processCells.find(p => p.id === 'b4')!
assert.equal(b4Cell.label, '慢火焖炖')
assert.deepEqual(b4Cell.incomingMaterials, ['浓醇炖肉汤底'])
assert.equal(b4Cell.newIngredients, undefined, 'b4 虽包含五花肉参与原料，但在渲染层绝不重复显示新放入')

const b5Cell = cn14Layout.processCells.find(p => p.id === 'b5')!
assert.equal(b5Cell.label, '汇入同炖')
assert.deepEqual(b5Cell.incomingMaterials, ['酥软五花肉'])
assert.deepEqual(b5Cell.newIngredients, ['红薯粉条', '土豆'], 'b5 仅包含粉条与土豆，未经确认的食盐已移出默认配方')

// 验证等待通道入锅指示标签
const fenTiaoLanes = cn14Layout.waitingLanes.filter(w => w.ingredientId === 'i12')
assert.equal(fenTiaoLanes.length, 4, '红薯粉条在前 4 列（0..3）均在横向等待通道中延伸')
const joinTargetLane = fenTiaoLanes.find(w => w.colIndex === 3)!
assert.equal(joinTargetLane.isJoinTarget, true, '进入 b5 前的最后一节等待走廊（col 3）必须标记为入锅目标')
assert.equal(joinTargetLane.joinLabel, '+ 入锅 ➔', '入锅走廊必须有 "+ 入锅 ➔" 指引文本')
console.log('✅ 契约 13 通过: 样板菜 cn-14 事实可信度与连续表格完整语义表达 (承接/新放入/准出状态/产出/入锅指引)')

// -------------------------------------------------------------
// 契约 14: 连续工序表动态高度扩展 (单行与多行工序均保证充足垂直空间，杜绝文本挤压与裁切)
// -------------------------------------------------------------
// b1 只占第 0 行，但在包含动词、副标、火候参数时，高度必须动态扩展大于基础 44px（如 >= 60px），且不堆砌多余教程文字
assert.ok(b1Cell.h >= 60, `单行工序 b1 单元格高度必须动态扩展（实际: ${b1Cell.h}px >= 60px）`)
assert.ok(cn14Layout.rowHeights[0] >= 60, `第 0 行行高必须动态扩展匹配工序需求（实际: ${cn14Layout.rowHeights[0]}px >= 60px）`)
console.log('✅ 契约 14 通过: 连续工序表动态高度扩展 (单行与多行工序均保证充足垂直空间，杜绝文本挤压与裁切)')

console.log('\n=============================================================')
console.log('🎉 全部 14 项连续工序表 (Continuous Process Table) 契约测试通过！')
console.log('=============================================================\n')
