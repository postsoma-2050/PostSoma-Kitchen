import assert from 'node:assert/strict'
import type { VisualRecipeV3 } from '../../src/types/recipeV3'
import { CHINESE_HEALTHY_RECIPES as LEGACY_RECIPES } from '../../src/data/chineseHealthyRecipes.legacy-102'
import {
  buildV3MatrixLayout,
  hasCookingHeat,
  getFinalServingState,
  getFinalServingInstructions,
} from '../../src/utils/matrixFlowLayout'

console.log('=== 开始复现 4 项已知缺陷 ===')

// -------------------------------------------------------------
// 问题 A: 物料边被误判为等待边 (cn-59-qincai-niurou)
// 注意: cn-59-qincai-niurou 仅存在于 legacy-102 数据集中
// -------------------------------------------------------------
const cn59 = LEGACY_RECIPES.find(r => r.id === 'cn-59-qincai-niurou')!
const layout59 = buildV3MatrixLayout(cn59)

const connB2B3 = layout59.connectorLayouts.find(c => c.sourceBlockId === 'b2' && c.targetBlockId === 'b3')
const connB2B4 = layout59.connectorLayouts.find(c => c.sourceBlockId === 'b2' && c.targetBlockId === 'b4')
const connB3B4 = layout59.connectorLayouts.find(c => c.sourceBlockId === 'b3' && c.targetBlockId === 'b4')

console.log('\n[问题 A 诊断]')
console.log('b2 -> b3 isOrder:', connB2B3?.isOrder, '(期望: true - 等待边)')
console.log('b2 -> b4 isOrder:', connB2B4?.isOrder, '(期望: false - 暂存牛肉物料边)')
console.log('b3 -> b4 isOrder:', connB3B4?.isOrder, '(期望: false - 芹菜物料边)')

// -------------------------------------------------------------
// 问题 B: 跨列连线穿卡 (cn-59 的 b2 -> b4 穿过 b3)
// -------------------------------------------------------------
const b3Layout = layout59.actionBlockLayouts.find(b => b.block.id === 'b3')!
console.log('\n[问题 B 诊断]')
console.log('b3 卡片边界:', { x: b3Layout.x, y: b3Layout.y, w: b3Layout.w, h: b3Layout.h, right: b3Layout.x + b3Layout.w, bottom: b3Layout.y + b3Layout.h })
console.log('b2 -> b4 pathD:', connB2B4?.pathD)

// 综合 SVG 路径采样检测穿卡 (支持 M, L, Q, C)
function sampleSvgPath(pathD: string): Array<{ x: number; y: number }> {
  const points: Array<{ x: number; y: number }> = []
  const commands = pathD.match(/[MLQC][^MLQC]*/g) || []
  let currX = 0
  let currY = 0

  for (const cmd of commands) {
    const type = cmd[0]
    const args = cmd.slice(1).trim().split(/[\s,]+/).map(Number)
    if (type === 'M') {
      currX = args[0]
      currY = args[1]
      points.push({ x: currX, y: currY })
    } else if (type === 'L') {
      const [x, y] = args
      for (let i = 1; i <= 20; i++) {
        const t = i / 20
        points.push({ x: currX + (x - currX) * t, y: currY + (y - currY) * t })
      }
      currX = x
      currY = y
    } else if (type === 'Q') {
      const [cx, cy, x, y] = args
      for (let i = 1; i <= 20; i++) {
        const t = i / 20
        const mt = 1 - t
        const px = mt * mt * currX + 2 * mt * t * cx + t * t * x
        const py = mt * mt * currY + 2 * mt * t * cy + t * t * y
        points.push({ x: px, y: py })
      }
      currX = x
      currY = y
    } else if (type === 'C') {
      const [c1x, c1y, c2x, c2y, x, y] = args
      for (let i = 1; i <= 20; i++) {
        const t = i / 20
        const mt = 1 - t
        const px = mt * mt * mt * currX + 3 * mt * mt * t * c1x + 3 * mt * t * t * c2x + t * t * t * x
        const py = mt * mt * mt * currY + 3 * mt * mt * t * c1y + 3 * mt * t * t * c2y + t * t * t * y
        points.push({ x: px, y: py })
      }
      currX = x
      currY = y
    }
  }
  return points
}

if (connB2B4) {
  const points = sampleSvgPath(connB2B4.pathD)
  const hitPoint = points.find(pt => pt.x >= b3Layout.x && pt.x <= b3Layout.x + b3Layout.w && pt.y >= b3Layout.y && pt.y <= b3Layout.y + b3Layout.h)
  console.log('b2 -> b4 连线是否穿过 b3 实体卡片:', Boolean(hitPoint), hitPoint)
}

// -------------------------------------------------------------
// 问题 C: 相邻卡片重叠
// -------------------------------------------------------------
console.log('\n[问题 C 诊断]')
const recipeTwoCards: VisualRecipeV3 = {
  id: 'test-adjacent-overlap',
  version: '3.0',
  status: 'draft',
  title: '相邻卡片重叠测试',
  cuisine: 'chinese',
  prerequisites: { containerSize: '中式炒锅' },
  ingredients: [
    { id: 'i1', name: '食材1', category: 'main' },
    { id: 'i2', name: '食材2', category: 'produce' },
  ],
  actionBlocks: [
    {
      id: 'act1',
      stageIndex: 0,
      label: '快速翻炒牛肉',
      durationMinutes: 2,
      equipment: '炒锅',
      ingredientIds: ['i1'],
    },
    {
      id: 'act2',
      stageIndex: 0,
      label: '爆香蒜末辣椒',
      durationMinutes: 2,
      equipment: '炒锅',
      ingredientIds: ['i2'],
    },
  ],
  createdAt: '2026-09-14T00:00:00Z',
  updatedAt: '2026-09-14T00:00:00Z',
}
const layoutTwoCards = buildV3MatrixLayout(recipeTwoCards)
const c1 = layoutTwoCards.actionBlockLayouts.find(b => b.block.id === 'act1')!
const c2 = layoutTwoCards.actionBlockLayouts.find(b => b.block.id === 'act2')!
console.log('Card 1: y=', c1.y, 'h=', c1.h, 'bottom=', c1.y + c1.h)
console.log('Card 2: y=', c2.y, 'h=', c2.h, 'bottom=', c2.y + c2.h)
const overlap = (c1.y + c1.h) - c2.y
console.log('Card 1 与 Card 2 重叠像素:', overlap > 0 ? `${overlap}px` : '无重叠')

// -------------------------------------------------------------
// 问题 D: 冷热判断错误
// -------------------------------------------------------------
console.log('\n[问题 D 诊断]')
// Case 1: 无火候信息，步骤仅“完成”
const rNoHeat: VisualRecipeV3 = {
  id: 'd-1',
  version: '3.0',
  status: 'draft',
  title: '未知温态',
  prerequisites: {},
  ingredients: [{ id: 'i1', name: '原料', category: 'main' }],
  actionBlocks: [{ id: 'a1', stageIndex: 0, label: '完成备料', ingredientIds: ['i1'] }],
  finalBlock: { method: 'other', label: '完成' },
  createdAt: '',
  updatedAt: '',
}
console.log('Case 1: hasCookingHeat=', hasCookingHeat(rNoHeat), 'state=', getFinalServingState(rNoHeat), 'instruction=', getFinalServingInstructions(rNoHeat))

// Case 2: 火候“不加热”、备注“无需煮沸”
const rNoBoil: VisualRecipeV3 = {
  id: 'd-2',
  version: '3.0',
  status: 'draft',
  title: '浸泡原料',
  prerequisites: {},
  ingredients: [{ id: 'i1', name: '原料', category: 'main' }],
  actionBlocks: [{ id: 'a1', stageIndex: 0, label: '浸泡', heatLevel: '不加热', note: '常温浸泡，无需煮沸', ingredientIds: ['i1'] }],
  finalBlock: { method: 'other', label: '装盘' },
  createdAt: '',
  updatedAt: '',
}
console.log('Case 2: hasCookingHeat=', hasCookingHeat(rNoBoil), 'state=', getFinalServingState(rNoBoil), 'instruction=', getFinalServingInstructions(rNoBoil))

// Case 3: 步骤“焯水后放凉”、普通菜名
const rBlanchedCold: VisualRecipeV3 = {
  id: 'd-3',
  version: '3.0',
  status: 'draft',
  title: '白灼鸡肉片',
  prerequisites: {},
  ingredients: [{ id: 'i1', name: '鸡肉', category: 'main' }],
  actionBlocks: [
    { id: 'a1', stageIndex: 0, label: '鸡肉焯水', heatLevel: '大火', durationMinutes: 3, ingredientIds: ['i1'] },
    { id: 'a2', stageIndex: 1, label: '焯水后放凉', heatLevel: '室温', durationMinutes: 10, ingredientIds: ['i1'] },
  ],
  finalBlock: { method: 'serve', label: '装盘' },
  createdAt: '',
  updatedAt: '',
}
console.log('Case 3: hasCookingHeat=', hasCookingHeat(rBlanchedCold), 'state=', getFinalServingState(rBlanchedCold), 'instruction=', getFinalServingInstructions(rBlanchedCold))

// -------------------------------------------------------------
// 断言 (当前实现应失败)
// -------------------------------------------------------------
console.log('\n--- 运行断言验证已知缺陷 ---')

// 问题 A 断言
assert.equal(connB2B3?.isOrder, true, '问题 A 失败: b2 -> b3 必须是等待边')
assert.equal(connB2B4?.isOrder, false, '问题 A 失败: b2 -> b4 必须是暂存牛肉物料边')
assert.equal(connB3B4?.isOrder, false, '问题 A 失败: b3 -> b4 必须是芹菜物料边')

// 问题 B 断言
let penetrated = false
if (connB2B4) {
  const points = sampleSvgPath(connB2B4.pathD)
  const hitPoint = points.find(pt => pt.x >= b3Layout.x && pt.x <= b3Layout.x + b3Layout.w && pt.y >= b3Layout.y && pt.y <= b3Layout.y + b3Layout.h)
  penetrated = Boolean(hitPoint)
}
assert.equal(penetrated, false, '问题 B 失败: 跨列连线穿过中间实体卡片 b3')

// 问题 C 断言
assert.ok(c1.y + c1.h <= c2.y, `问题 C 失败: 同列相邻卡片重叠 ${overlap}px`)

// 问题 D 断言
assert.doesNotMatch(getFinalServingInstructions(rNoHeat), /免加热/, '问题 D 失败: 无火候信息不能断言免加热')
assert.equal(hasCookingHeat(rNoBoil), false, '问题 D 失败: “不加热/无需煮沸”不能判定为加热')
assert.doesNotMatch(getFinalServingInstructions(rBlanchedCold), /趁热享用/, '问题 D 失败: 明确注明“放凉”不能提示趁热享用')
