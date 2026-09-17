import assert from 'node:assert/strict'
import type { VisualRecipeV3 } from '../../src/types/recipeV3'
import { CHINESE_HEALTHY_RECIPES } from '../../src/data/chineseHealthyRecipes'
import { HOME_SWEET_HOME_RECIPES } from '../../src/data/homeSweetHomeRecipes'
import { espressoBrowniesV3, hongShaoRouV3, caesarSaladV3 } from '../../src/data/v3Examples'
import { normalizeRecipe } from '../../src/services/recipeNormalizer'
import { buildV3MatrixLayout } from '../../src/utils/matrixFlowLayout'
import { generatePageSvgString } from '../../src/utils/exportFlowCard'

console.log('=== 开始食材与工序图形连接完整性与回归测试 ===\n')

// ---------------------------------------------------------------------------
// 辅助函数：SVG 路径采样检测是否穿过实体卡片
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// 案例 A：远程 2 步 cn-59 真实快照
// ---------------------------------------------------------------------------
const caseARaw: VisualRecipeV3 = {
  id: 'cn-59-qincai-niurou',
  title: '🥩 经典平肝芹菜炒牛肉丝',
  status: 'published',
  cuisine: 'chinese',
  version: '3.0',
  createdAt: '2026-08-04T09:04:03.377936+00:00',
  updatedAt: '2026-08-04T09:04:03.377936+00:00',
  prerequisites: {
    containerSize: '中式炒锅',
    preheat: '牛肉切细丝上浆',
    servings: '3 人份'
  },
  ingredients: [
    { id: 'i1', name: '嫩牛肉丝 (上浆)', category: 'main', amountText: '200 g' },
    { id: 'i2', name: '香芹菜段', category: 'produce', amountText: '200 g' },
    { id: 'i3', name: '泡野山椒碎与姜丝', category: 'produce', amountText: '野山椒+姜丝' },
    { id: 'i4', name: '老抽料酒盐鸡精水淀粉', category: 'seasoning', amountText: '老抽+料酒+盐+鸡精+水淀粉' }
  ],
  actionBlocks: [
    {
      id: 'b1',
      label: '牛肉丝滑油变色盛出',
      sublabel: 'Flash Sear Beef',
      heatLevel: '大火',
      stageIndex: 0,
      ingredientIds: ['i1', 'i4'],
      inputBlockIds: [],
      durationMinutes: 2
    },
    {
      id: 'b2',
      label: '爆香野山椒炒芹菜合炒',
      sublabel: 'Stir-Fry Celery & Combine',
      heatLevel: '大火',
      stageIndex: 1,
      ingredientIds: ['i1', 'i2', 'i3', 'i4'],
      inputBlockIds: [],
      durationMinutes: 2
    }
  ],
  finalBlock: {
    label: '辣香鲜嫩 🥩',
    method: 'fry',
    instructions: '牛肉滑嫩，芹菜清脆微辣开胃'
  }
}

const caseANorm = normalizeRecipe(caseARaw)
const layoutA = buildV3MatrixLayout(caseANorm)
const b1A = layoutA.actionBlockLayouts.find(b => b.block.id === 'b1')!
const b2A = layoutA.actionBlockLayouts.find(b => b.block.id === 'b2')!

console.log('[测试 1: 案例 A (远程 2 步 cn-59) 导轨完整性]')
// 分支图节点必须保持内容高度，食材通过首次接入总线进入节点。
for (const id of b1A.block.ingredientIds) {
  const connector = layoutA.ingredientConnectors.find(item => item.ingredientId === id && item.targetBlockId === b1A.block.id)
  assert.ok(connector, '牛肉与调料必须通过首次加入路径接入第一工序')
}
assert.ok(b1A.h < b1A.envelopeH, '跨行输入只能扩展导轨，工序节点不得重新膨胀为大板砖')
console.log('\n[测试 2: 案例 A 等待路径避障路由]')
const waitI2 = layoutA.ingredientWaitingPaths.find(w => w.ingredientId === 'i2')!
const waitI3 = layoutA.ingredientWaitingPaths.find(w => w.ingredientId === 'i3')!

// 验证避障路径绝不穿过 b1 卡片实体矩形
const i2Points = sampleSvgPath(waitI2.pathD || `M ${waitI2.startX} ${waitI2.startY} L ${waitI2.endX} ${waitI2.startY}`)
const i2Hit = i2Points.some(pt => pt.x > b1A.x && pt.x < (b1A.x + b1A.w) && pt.y > b1A.y && pt.y < (b1A.y + b1A.h))
assert.strictEqual(i2Hit, false, 'Case A 芹菜避障路径绝不能穿过 b1 卡片实体')

const i3Points = sampleSvgPath(waitI3.pathD || `M ${waitI3.startX} ${waitI3.startY} L ${waitI3.endX} ${waitI3.startY}`)
const i3Hit = i3Points.some(pt => pt.x > b1A.x && pt.x < (b1A.x + b1A.w) && pt.y > b1A.y && pt.y < (b1A.y + b1A.h))
assert.strictEqual(i3Hit, false, 'Case A 野山椒避障路径绝不能穿过 b1 卡片实体')

// 验证终点与 b2 接入端口精确对齐
assert.ok(waitI2.endX < b2A.x, 'Case A 芹菜等待路径必须先进入 b2 左侧输入总线')
assert.ok(waitI3.endX < b2A.x, 'Case A 野山椒等待路径必须先进入 b2 左侧输入总线')
assert.ok(layoutA.intakeRailSegments.some(rail => rail.blockId === b2A.block.id && rail.portX === b2A.x),
  'b2 输入总线必须通过明确端口接入工序卡片')
console.log('  ✅ Case A 芹菜与野山椒经避障等待路径进入 b2 输入总线与卡片端口')

// ---------------------------------------------------------------------------
// 案例 B：4 步复杂多阶段测试用例（牛肉上浆、滑油暂存、留底油炒芹菜、回锅合炒）
// ---------------------------------------------------------------------------
console.log('\n[测试 3: 案例 B (4 步复杂拓扑) 回锅与单行输入导轨]')
const caseBRaw: VisualRecipeV3 = {
  id: 'fixture-case-b-cn59',
  title: '🥩 经典平肝芹菜炒牛肉丝 (4步复杂连通测试快照)',
  status: 'published',
  cuisine: 'chinese',
  version: '3.0',
  createdAt: '2026-08-04T09:04:03.377936+00:00',
  updatedAt: '2026-08-04T09:04:03.377936+00:00',
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
      sublabel: 'Marinate',
      stageIndex: 0,
      ingredientIds: ['i1', 'i4']
    },
    {
      id: 'b2',
      label: '滑油盛出暂存',
      sublabel: 'Sear & Hold Aside',
      stageIndex: 1,
      ingredientIds: ['i1', 'i4'],
      inputBlockIds: ['b1'],
      dependencies: [{ sourceBlockId: 'b1', type: 'material', label: '上浆牛肉' }]
    },
    {
      id: 'b3',
      label: '底油爆香炒芹菜',
      sublabel: 'Saute Produce',
      stageIndex: 2,
      ingredientIds: ['i2', 'i3'],
      afterBlockIds: ['b2'],
      dependencies: [{ sourceBlockId: 'b2', type: 'order', label: '同锅留底油' }]
    },
    {
      id: 'b4',
      label: '回锅调味合炒出锅',
      sublabel: 'Combine & Serve',
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
const cn59Local = caseBRaw
const layoutB = buildV3MatrixLayout(cn59Local)
const b4B = layoutB.actionBlockLayouts.find(b => b.block.id === 'b4')!

const finalSeasoningLink = layoutB.ingredientConnectors.find(link =>
  link.ingredientId === 'i5' && link.targetBlockId === b4B.block.id
)
assert.ok(finalSeasoningLink, '最终调料必须通过首次加入路径接入合炒节点')

// 暂存牛肉连线：b2 -> b4 (material) 跨越 b3 列走廊
const connHoldAside = layoutB.connectorLayouts.find(c => c.sourceBlockId === 'b2' && c.targetBlockId === 'b4')!
assert.ok(connHoldAside, 'Case B 必须存在 b2 -> b4 暂存牛肉连接线')
assert.strictEqual(connHoldAside.isMaterial, true, 'b2 -> b4 必须为 material 物料流')
assert.strictEqual(connHoldAside.label, '暂存牛肉')

// 同锅等待连线：b2 -> b3 (order)
const connOrder = layoutB.connectorLayouts.find(c => c.sourceBlockId === 'b2' && c.targetBlockId === 'b3')!
assert.ok(connOrder, 'Case B 必须存在 b2 -> b3 同锅留底油连接线')
assert.strictEqual(connOrder.isOrder, true, 'b2 -> b3 必须为 order 时序流')

// 暂存牛肉不能流入 b3
const b3Inputs = layoutB.connectorLayouts.filter(c => c.targetBlockId === 'b3')
const beefToB3 = b3Inputs.some(c => c.sourceBlockId === 'b2' && c.isMaterial)
assert.strictEqual(beefToB3, false, '暂存牛肉绝不能作为物料流入炒芹菜 b3')
console.log('  ✅ Case B 暂存牛肉独立走廊、同锅等待、回锅汇合与调料导轨全部成立')

// ---------------------------------------------------------------------------
// 测试 4: 页面与 SVG 导出几何一致性
// ---------------------------------------------------------------------------
console.log('\n[测试 4: 页面布局与 SVG 导出消费同一几何规范]')
const svgA = generatePageSvgString(caseANorm, 0, 1)
assert.ok(svgA.svgString.includes('v3-intake-rails'), 'SVG 导出必须包含 v3-intake-rails')
assert.ok(svgA.svgString.includes('rail-b1-c0'), 'SVG 导出必须包含 rail-b1-c0 导轨')
assert.ok(b1A.h < b1A.envelopeH, '页面与导出都必须采用内容高度节点，不得使用合并单元格高度')
assert.ok(svgA.svgString.includes('v3-flow-waiting-paths'), '导出保留直接等待路径')
assert.equal(waitI3.startY, layoutA.ingredientRows.find(r => r.ingredient.id === 'i3')!.y + layoutA.ingredientRows[0].h / 2)
console.log('  ✅ SVG 导出包含共享布局生成的等待路径与输入区域')

// ---------------------------------------------------------------------------
// 测试 5: 170 道预置 + 1 个旧版快照深度扫描：0 孤立圆点、0 遮挡穿卡
// ---------------------------------------------------------------------------
console.log('\n[测试 5: 170 道预置 + 1 个旧版快照 0 孤立悬空圆点、0 遮挡穿卡全面巡检]')
const allRecipes: VisualRecipeV3[] = [
  caseANorm,
  ...CHINESE_HEALTHY_RECIPES,
  ...HOME_SWEET_HOME_RECIPES,
  espressoBrowniesV3,
  hongShaoRouV3,
  caesarSaladV3,
]

let isolatedPinCount = 0
let unhandledCollisions = 0

allRecipes.forEach(recipe => {
  const layout = buildV3MatrixLayout(recipe)
  const blocks = layout.actionBlockLayouts

  // 1. 每项被使用的食材只能在首次处理点接入一次，并必须通过总线端口进入卡片。
  layout.ingredientRows.forEach(row => {
    const usingBlocks = blocks.filter(block => (block.block.ingredientIds || []).includes(row.ingredient.id))
    if (usingBlocks.length === 0) return
    const connectors = layout.ingredientConnectors.filter(connector => connector.ingredientId === row.ingredient.id)
    const targetIds = new Set(connectors.map(connector => connector.targetBlockId))
    const hasPort = [...targetIds].every(targetId => layout.intakeRailSegments.some(rail =>
      rail.blockId === targetId && rail.portX === blocks.find(block => block.block.id === targetId)?.x
    ))
    if (connectors.length !== 1 || !hasPort) {
      isolatedPinCount++
      console.error(`[INGREDIENT INPUT ERROR] ${recipe.id} ingredient ${row.ingredient.id} connectors=${connectors.length}`)
    }
  })

  // 2. 检查所有等待路径是否有未处理的遮挡
  layout.ingredientWaitingPaths.forEach(wp => {
    if (wp.pathD) {
      // 避障路径：验证采样点不落在任何无关工序卡片内部
      const pts = sampleSvgPath(wp.pathD)
      blocks.forEach(b => {
        if (b.block.id === wp.targetBlockId) return
        const hit = pts.some(pt => pt.x > (b.x + 2) && pt.x < (b.x + b.w - 2) && pt.y > (b.y + 2) && pt.y < (b.y + b.h - 2))
        if (hit) {
          unhandledCollisions++
          console.error(`[AVOIDANCE COLLISION ERROR] ${recipe.id} path ${wp.id} hits block ${b.block.id}`)
        }
      })
    } else {
      // 直线路径：验证确实没有任何中间障碍物
      const colliding = blocks.some(b => {
        if (b.block.id === wp.targetBlockId) return false
        const isIntermediate = b.x >= (wp.startX - 4) && (b.x + b.w) <= (wp.endX + 4)
        if (!isIntermediate) return false
        return wp.startY >= (b.y - 2) && wp.startY <= (b.y + b.h + 2)
      })
      if (colliding) {
        unhandledCollisions++
        console.error(`[UNHANDLED OCCLUSION ERROR] ${recipe.id} straight line ${wp.id} occluded`)
      }
    }
  })
})

assert.strictEqual(isolatedPinCount, 0, `全库必须为 0 孤立悬空圆点，实际发现 ${isolatedPinCount} 处`)
assert.strictEqual(unhandledCollisions, 0, `全库必须为 0 路径遮挡穿卡，实际发现 ${unhandledCollisions} 处`)
console.log(`  ✅ 170 道预置 + 1 个旧版快照（共 ${allRecipes.length} 个测试集）巡检完毕：0 孤立悬空圆点，0 路径遮挡穿卡！`)

console.log('\n=============================================================')
console.log('🎉 全部食材与工序图形连接定点整改测试 100% 通过！')
console.log('=============================================================')
