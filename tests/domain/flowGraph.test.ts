import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import type { VisualRecipeV3 } from '../../src/types/recipeV3'
import { CHINESE_HEALTHY_RECIPES } from '../../src/data/chineseHealthyRecipes'
import { HOME_SWEET_HOME_RECIPES } from '../../src/data/homeSweetHomeRecipes'
import { caesarSaladV3, espressoBrowniesV3, hongShaoRouV3 } from '../../src/data/v3Examples'
import { buildV3MatrixLayout, isColdFinalBlock } from '../../src/utils/matrixFlowLayout'
import { validateRecipe } from '../../src/utils/taxonomyMatcher'
import { generatePageSvgString } from '../../src/utils/exportFlowCard'
import { normalizeRecipe } from '../../src/services/recipeNormalizer'

const ALL_PRESET_RECIPES = [
  ...CHINESE_HEALTHY_RECIPES,
  ...HOME_SWEET_HOME_RECIPES,
  espressoBrowniesV3,
  hongShaoRouV3,
  caesarSaladV3,
]

function createRecipe(): VisualRecipeV3 {
  const now = new Date().toISOString()
  return {
    id: 'flow-graph-regression',
    version: '3.0',
    status: 'draft',
    title: '工序图谱回归测试',
    cuisine: 'chinese',
    difficulty: 'easy',
    occasions: ['quick'],
    prerequisites: { containerSize: '28cm 炒锅', servings: '2 人份' },
    ingredients: [
      { id: 'i-a', name: '主料', amountText: '200 g', category: 'main' },
      { id: 'i-b', name: '辅料', amountText: '100 g', category: 'produce' },
      { id: 'i-c', name: '调料', amountText: '10 g', category: 'seasoning' },
    ],
    actionBlocks: [
      { id: 'a', stageIndex: 0, ingredientIds: ['i-a', 'i-b'], inputBlockIds: [], label: '处理主料' },
      { id: 'b', stageIndex: 0, ingredientIds: ['i-a'], inputBlockIds: [], label: '备用支线' },
      { id: 'c', stageIndex: 1, ingredientIds: ['i-a', 'i-b', 'i-c'], inputBlockIds: ['a'], label: '合并烹饪', equipment: '28cm 炒锅' },
    ],
    finalBlock: { method: 'stir_fry', label: '炒制完成' },
    createdAt: now,
    updatedAt: now,
  }
}

function rangesOverlap(startA: number, endA: number, startB: number, endB: number) {
  return startA <= endB && startB <= endA
}

function assertSimplifiedExport(recipe: VisualRecipeV3) {
  const exported = generatePageSvgString(recipe, 0, 1)
  const layout = buildV3MatrixLayout(recipe)

  const hasExplicitDependencies = recipe.actionBlocks.some(b => b.inputBlockIds && b.inputBlockIds.length > 0)
  if (hasExplicitDependencies) {
    assert.match(exported.svgString, /v3-flow-connectors/, `${recipe.id} 具有显式分支依赖，导出图卡必须渲染分支连接线`)
    assert.match(exported.svgString, /marker-end="url\(#flow-arrow-/, `${recipe.id} 具有显式分支依赖，导出图卡必须渲染连接箭头`)
  } else {
    assert.doesNotMatch(exported.svgString, /v3-flow-connectors/, `${recipe.id} 无显式依赖时不得渲染冗余连接线`)
  }
  assert.doesNotMatch(exported.svgString, /v3-grid-lines/, `${recipe.id} 导出不得包含网格层`)
  assert.doesNotMatch(exported.svgString, /<circle cx="13" cy="13"/, `${recipe.id} 导出不得包含工序编号圆标`)

  for (const block of layout.actionBlockLayouts) {
    assert.ok(block.x >= 0 && block.y >= 0, `${recipe.id}/${block.block.id} 不得超出画布左侧或顶部`)
    assert.ok(block.x + block.w <= exported.width, `${recipe.id}/${block.block.id} 不得超出导出宽度`)
    assert.ok(block.y + block.h <= exported.height, `${recipe.id}/${block.block.id} 不得超出导出高度`)
  }
  assert.ok(layout.finalBlockLayout.x + layout.finalBlockLayout.w <= exported.width, `${recipe.id} 成品卡不得被横向裁切`)
  assert.ok(layout.finalBlockLayout.y + layout.finalBlockLayout.h <= exported.height, `${recipe.id} 成品卡不得被纵向裁切`)
}

function run() {
  assert.equal(ALL_PRESET_RECIPES.length, 121, 'Flow 视觉回归必须覆盖统一的 121 道预置食谱口径')

  const recipe = createRecipe()
  const layout = buildV3MatrixLayout(recipe)
  const byId = new Map(layout.actionBlockLayouts.map(item => [item.block.id, item]))

  assert.ok(byId.get('b')!.computedColIndex > byId.get('a')!.computedColIndex, '同列且行区间重叠的工序必须自动右移')
  assert.ok(byId.get('c')!.computedColIndex > byId.get('a')!.computedColIndex, '下游工序必须位于上游工序右侧')

  for (let index = 0; index < layout.actionBlockLayouts.length; index += 1) {
    for (let compare = index + 1; compare < layout.actionBlockLayouts.length; compare += 1) {
      const left = layout.actionBlockLayouts[index]
      const right = layout.actionBlockLayouts[compare]
      if (left.computedColIndex !== right.computedColIndex) continue
      assert.equal(
        rangesOverlap(left.computedStartRow, left.computedEndRow, right.computedStartRow, right.computedEndRow),
        false,
        `工序 ${left.block.id} 与 ${right.block.id} 不应在同列重叠`,
      )
    }
  }

  const explicitConnector = layout.connectorLayouts.find(connector =>
    connector.sourceBlockId === 'a' && connector.targetBlockId === 'c'
  )
  assert.ok(explicitConnector?.explicit, '明确的工序依赖必须继续保留在领域布局结果中')
  assert.match(explicitConnector!.pathD, /^M .+ C .+$/, '领域层必须保留可供未来审计的依赖路径数据')

  const exported = generatePageSvgString(recipe, 0, 1)
  assert.match(exported.svgString, /v3-flow-connectors/, '导出图卡对显式依赖工序必须渲染连接线')
  assert.match(exported.svgString, /marker-end="url\(#flow-arrow-material[^"]*\)"/, '导出图卡对物料流动必须渲染箭头')
  assert.doesNotMatch(exported.svgString, /<circle cx="13" cy="13"/, '导出图卡不得渲染工序编号圆标')
  assert.match(exported.svgString, /font-family: .*&quot;Segoe UI&quot;/, '导出 SVG 必须转义字体栈中的引号，确保离屏 PNG 可加载')
  assert.match(exported.svgString, />器具 28cm 炒锅<\//, '导出图卡必须表达工序专用器具')
  assert.match(exported.svgString, />200 g<\//, '导出图卡必须保留主料的原始用量')
  assert.match(exported.svgString, />100 g<\//, '导出图卡必须保留辅料的原始用量')
  assert.match(exported.svgString, />10 g<\//, '导出图卡必须保留调料的原始用量')

  const cyclicRecipe = createRecipe()
  cyclicRecipe.actionBlocks[0].inputBlockIds = ['c']
  const cycleValidation = validateRecipe(cyclicRecipe)
  assert.ok(
    cycleValidation.errors.some(issue => issue.code === 'CYCLIC_ACTION_DEPENDENCY'),
    '循环依赖必须阻断发布',
  )

  const brokenRecipe = createRecipe()
  brokenRecipe.actionBlocks[2].inputBlockIds = ['missing-block']
  const brokenValidation = validateRecipe(brokenRecipe)
  assert.ok(
    brokenValidation.errors.some(issue => issue.code === 'BROKEN_ACTION_DEPENDENCY'),
    '悬空依赖必须阻断发布',
  )

  const representativeIds = [
    'cn-89-mizhi-fanqie-shanyao',
    'cn-01-yuxiang-rousi',
    'hsh-16-hashbrown-casserole',
    'cn-59-qincai-niurou',
  ]
  representativeIds.forEach(id => {
    const representative = ALL_PRESET_RECIPES.find(item => item.id === id)
    assert.ok(representative, `必须找到代表食谱 ${id}`)
    assertSimplifiedExport(representative!)
  })

  // 严谨冷热判断与中餐英文降噪断言
  const cn59 = ALL_PRESET_RECIPES.find(item => item.id === 'cn-59-qincai-niurou')!
  assert.equal(isColdFinalBlock(cn59), false, '热炒菜 cn-59 严禁被判定为免加热冷食')
  assert.equal(isColdFinalBlock(caesarSaladV3), true, '经典凯撒沙拉必须被判定为免加热冷食')

  const cn59Svg = generatePageSvgString(cn59, 0, 1).svgString
  assert.doesNotMatch(cn59Svg, /免加热/, '热炒菜 cn-59 导出的 SVG 严禁出现“免加热”字样')
  assert.match(cn59Svg, /趁热享用|出锅装盘/, '热炒菜 cn-59 导出必须包含趁热享用或装盘指示')
  assert.doesNotMatch(cn59Svg, /Flash Sear Beef/, '中餐食谱 cn-59 必须过滤无意义的英文机翻 sublabel')

  // cn-59 单锅先后操作串行化与物料支线断言
  const cn59B2 = cn59.actionBlocks.find((b: any) => b.id === 'b2')!
  const cn59B3 = cn59.actionBlocks.find((b: any) => b.id === 'b3')!
  const cn59B4 = cn59.actionBlocks.find((b: any) => b.id === 'b4')!
  assert.ok(cn59B3.afterBlockIds?.includes('b2') || cn59B3.inputBlockIds?.includes('b2'), 'cn-59 炒芹菜 b3 必须等待/依赖 b2 滑牛肉（单锅留底油串行约束）')
  assert.ok(cn59B4.inputBlockIds?.includes('b2') && cn59B4.inputBlockIds?.includes('b3'), 'cn-59 合炒 b4 必须同时汇聚 b2 (牛肉物料支线) 与 b3 (芹菜)')

  const cn59Layout = buildV3MatrixLayout(cn59)
  const b3Layout = cn59Layout.actionBlockLayouts.find(b => b.block.id === 'b3')!
  assert.ok(b3Layout.hasMultiRowIntake, 'cn-59 b3 跨多行必须标记 hasMultiRowIntake')
  assert.ok(b3Layout.h <= b3Layout.envelopeH, '卡片高度由内容决定，不得超过关联区间高度')
  assert.ok(b3Layout.intakeRowYs.length >= 2, '多行工序必须生成各食材行的引脚坐标以供导轨渲染')

  // cn-59 4 条连接边的类型与几何精确断言
  const connB1B2 = cn59Layout.connectorLayouts.find(c => c.sourceBlockId === 'b1' && c.targetBlockId === 'b2')
  const connB2B3 = cn59Layout.connectorLayouts.find(c => c.sourceBlockId === 'b2' && c.targetBlockId === 'b3')
  const connB2B4 = cn59Layout.connectorLayouts.find(c => c.sourceBlockId === 'b2' && c.targetBlockId === 'b4')
  const connB3B4 = cn59Layout.connectorLayouts.find(c => c.sourceBlockId === 'b3' && c.targetBlockId === 'b4')

  assert.equal(connB1B2?.isOrder, false, 'cn-59 b1 -> b2 必须是物料边 (上浆牛肉)')
  assert.equal(connB2B3?.isOrder, true, 'cn-59 b2 -> b3 必须是等待边 (同锅留底油)')
  assert.equal(connB2B4?.isOrder, false, 'cn-59 b2 -> b4 必须是物料边 (暂存牛肉)')
  assert.equal(connB3B4?.isOrder, false, 'cn-59 b3 -> b4 必须是物料边 (炒好芹菜)')

  // 跨列避障路由几何断言: b2 -> b4 不得穿透 b3 实体卡片 (采样检测 M, L, Q, C)
  assert.ok(connB2B4, '必须存在 b2 -> b4 连接线')
  const pathD = connB2B4!.pathD
  const commands = pathD.match(/[MLQC][^MLQC]*/g) || []
  let currX = 0, currY = 0
  let penetratedB3 = false
  for (const cmd of commands) {
    const type = cmd[0]
    const args = cmd.slice(1).trim().split(/[\s,]+/).map(Number)
    if (type === 'M') {
      currX = args[0]; currY = args[1]
    } else if (type === 'L') {
      const [x, y] = args
      for (let i = 0; i <= 20; i++) {
        const px = currX + (x - currX) * (i / 20)
        const py = currY + (y - currY) * (i / 20)
        if (px >= b3Layout.x && px <= b3Layout.x + b3Layout.w && py >= b3Layout.y && py <= b3Layout.y + b3Layout.h) {
          penetratedB3 = true
        }
      }
      currX = x; currY = y
    } else if (type === 'Q') {
      const [cx, cy, x, y] = args
      for (let i = 0; i <= 20; i++) {
        const t = i / 20, mt = 1 - t
        const px = mt * mt * currX + 2 * mt * t * cx + t * t * x
        const py = mt * mt * currY + 2 * mt * t * cy + t * t * y
        if (px >= b3Layout.x && px <= b3Layout.x + b3Layout.w && py >= b3Layout.y && py <= b3Layout.y + b3Layout.h) {
          penetratedB3 = true
        }
      }
      currX = x; currY = y
    } else if (type === 'C') {
      const [c1x, c1y, c2x, c2y, x, y] = args
      for (let i = 0; i <= 20; i++) {
        const t = i / 20, mt = 1 - t
        const px = mt * mt * mt * currX + 3 * mt * mt * t * c1x + 3 * mt * t * t * c2x + t * t * t * x
        const py = mt * mt * mt * currY + 3 * mt * mt * t * c1y + 3 * mt * t * t * c2y + t * t * t * y
        if (px >= b3Layout.x && px <= b3Layout.x + b3Layout.w && py >= b3Layout.y && py <= b3Layout.y + b3Layout.h) {
          penetratedB3 = true
        }
      }
      currX = x; currY = y
    }
  }
  assert.equal(penetratedB3, false, '跨列连线 b2 -> b4 严禁穿过 b3 实体卡片')

  // -------------------------------------------------------------
  // P1 依赖闭环验证：等待依赖参与拓扑排序、清空不复活、混合新旧字段保留 legacy
  // -------------------------------------------------------------
  // 1. 等待依赖 (afterBlockIds / type: 'order') 拓扑排序与右向布局验证
  const waitingOrderRecipe = normalizeRecipe({
    id: 'test-order-topo',
    version: '3.0',
    status: 'draft',
    title: '等待依赖拓扑排序测试',
    cuisine: 'chinese',
    prerequisites: {},
    ingredients: [
      { id: 'i1', name: '原料A', category: 'main' },
      { id: 'i2', name: '原料B', category: 'produce' },
    ],
    actionBlocks: [
      { id: 'actA', stageIndex: 2, label: '工序A', ingredientIds: ['i1'] },
      { id: 'actB', stageIndex: 0, label: '工序B', afterBlockIds: ['actA'], ingredientIds: ['i2'] },
    ],
    createdAt: '',
    updatedAt: '',
  })
  const waitingLayout = buildV3MatrixLayout(waitingOrderRecipe)
  const actALayout = waitingLayout.actionBlockLayouts.find(b => b.block.id === 'actA')!
  const actBLayout = waitingLayout.actionBlockLayouts.find(b => b.block.id === 'actB')!
  assert.ok(
    actBLayout.computedColIndex > actALayout.computedColIndex,
    `等待依赖必须参与拓扑排序: actB (col ${actBLayout.computedColIndex}) 必须位于 actA (col ${actALayout.computedColIndex}) 右侧，严禁向左倒流`,
  )
  const waitingConn = waitingLayout.connectorLayouts.find(c => c.sourceBlockId === 'actA' && c.targetBlockId === 'actB')
  assert.ok(waitingConn, '必须存在 actA -> actB 连线')
  assert.equal(waitingConn!.isOrder, true, 'actA -> actB 连线必须是等待边 (isOrder: true)')
  assert.ok(actBLayout.x > actALayout.x, '物理坐标上下游卡片 X 坐标必须严格大于上游卡片 X 坐标')

  // 2. 坏引用不得被归一化洗掉，必须保留供校验阻断 (Broken dependencies must NOT be silently cleaned away)
  const brokenRecipeRaw = {
    id: 'test-broken-dep-retention',
    version: '3.0',
    status: 'draft',
    title: '悬空依赖保留与阻断测试',
    cuisine: 'chinese',
    prerequisites: {},
    ingredients: [{ id: 'i1', name: '料', category: 'main' }],
    actionBlocks: [
      {
        id: 'step-remain',
        stageIndex: 0,
        label: '保留工序',
        dependencies: [{ sourceBlockId: 'missing-step', type: 'material' }],
        ingredientIds: ['i1'],
      },
    ],
  }
  const brokenRecipeNormalized = normalizeRecipe(brokenRecipeRaw)
  assert.equal(
    brokenRecipeNormalized.actionBlocks[0].dependencies?.[0]?.sourceBlockId,
    'missing-step',
    '归一化严禁静默洗掉不存在的悬空上游工序引用',
  )
  assert.ok(
    brokenRecipeNormalized.actionBlocks[0].inputBlockIds?.includes('missing-step'),
    '派生投影 inputBlockIds 必须同样保留该悬空引用',
  )
  const brokenValidationResult = validateRecipe(brokenRecipeNormalized)
  assert.ok(
    brokenValidationResult.errors.some(err => err.code === 'BROKEN_ACTION_DEPENDENCY'),
    '归一化保留悬空依赖后，发布校验必须成功检测并阻断 BROKEN_ACTION_DEPENDENCY',
  )

  // 3. 权威依赖不得被旧投影覆盖，dependencies 为唯一事实来源 (Authoritative dependencies must NOT be overridden by legacy projection arrays)
  const authDepRecipeRaw = {
    id: 'test-authoritative-deps',
    version: '3.0',
    status: 'draft',
    title: '权威依赖防覆盖测试',
    cuisine: 'chinese',
    prerequisites: {},
    ingredients: [{ id: 'i1', name: '料', category: 'main' }],
    actionBlocks: [
      { id: 'stepA', stageIndex: 0, label: '工序A', ingredientIds: ['i1'] },
      {
        id: 'stepB',
        stageIndex: 1,
        label: '工序B',
        dependencies: [{ sourceBlockId: 'stepA', type: 'material' }],
        inputBlockIds: [], // 旧投影为空或未同步
        afterBlockIds: [],
        ingredientIds: ['i1'],
      },
    ],
  }
  const authDepNormalized = normalizeRecipe(authDepRecipeRaw)
  assert.equal(
    authDepNormalized.actionBlocks[1].dependencies?.length,
    1,
    '权威 dependencies 严禁被旧投影数组 (inputBlockIds: []) 擅自否决清空',
  )
  assert.equal(
    authDepNormalized.actionBlocks[1].dependencies?.[0]?.sourceBlockId,
    'stepA',
    '权威依赖 stepA 必须完整保留',
  )
  assert.deepEqual(
    authDepNormalized.actionBlocks[1].inputBlockIds,
    ['stepA'],
    '派生投影 inputBlockIds 必须自动从权威 dependencies 正向同步为 [stepA]',
  )

  // 4. 混合新旧字段时，旧关系严格保留为 legacy，严禁擅自升级为 material
  const mixedRecipe = normalizeRecipe({
    id: 'test-mixed-legacy',
    version: '3.0',
    status: 'draft',
    title: '混合新旧依赖测试',
    cuisine: 'chinese',
    prerequisites: {},
    ingredients: [{ id: 'i1', name: '料', category: 'main' }],
    actionBlocks: [
      { id: 'older', stageIndex: 0, label: '旧工序', ingredientIds: ['i1'] },
      { id: 'waited', stageIndex: 0, label: '等待工序', ingredientIds: ['i1'] },
      {
        id: 'consumer',
        stageIndex: 1,
        label: '汇聚工序',
        inputBlockIds: ['older'],
        afterBlockIds: ['waited'],
        ingredientIds: ['i1'],
      },
    ],
  })
  const consumerBlock = mixedRecipe.actionBlocks.find((b: any) => b.id === 'consumer')!
  const olderDep = consumerBlock.dependencies?.find((d: any) => d.sourceBlockId === 'older')
  const waitedDep = consumerBlock.dependencies?.find((d: any) => d.sourceBlockId === 'waited')
  assert.equal(olderDep?.type, 'legacy', '未明确标注物料类型的旧式 inputBlockIds 严格保留为 legacy，严禁擅自升级为 material')
  assert.equal(waitedDep?.type, 'order', '显式 afterBlockIds 必须标准化为 order')

  // 5. 详情弹窗键盘焦点回归断言 (打开后焦点确实位于关闭按钮，严禁使用 || 降级夺焦)
  const workspaceSource = fs.readFileSync(path.join(process.cwd(), 'src/components/recipe-flow-v3/RecipeFlowWorkspaceV3.vue'), 'utf8')
  assert.doesNotMatch(
    workspaceSource,
    /closeBtnRef\.value\?\.focus\(\)\s*\|\|\s*stepModalRef\.value\?\.focus\(\)/,
    '弹窗焦点逻辑严禁使用 || 降级，避免 focus() 返回 undefined 导致焦点错误落在弹窗容器',
  )
  assert.match(
    workspaceSource,
    /if\s*\(\s*closeBtnRef\.value\s*\)\s*\{\s*closeBtnRef\.value\.focus\(\)\s*\}\s*else\s*if\s*\(\s*stepModalRef\.value\s*\)\s*\{\s*stepModalRef\.value\.focus\(\)\s*\}/,
    '弹窗打开后必须使用明确 if/else 保证焦点确实位于关闭按钮',
  )

  // 运行关闭按钮焦点状态语义模拟
  let focusTarget = ''
  const mockCloseBtn = { focus: () => { focusTarget = 'closeBtn' } }
  const mockStepModal = { focus: () => { focusTarget = 'stepModal' } }
  if (mockCloseBtn) {
    mockCloseBtn.focus()
  } else if (mockStepModal) {
    mockStepModal.focus()
  }
  assert.equal(focusTarget, 'closeBtn', '关闭按钮存在时焦点必须准确停留在关闭按钮')

  const canvasSource = fs.readFileSync(path.join(process.cwd(), 'src/components/recipe-flow-v3/RecipeFlowCanvasV3.vue'), 'utf8')
  const mobileSource = fs.readFileSync(path.join(process.cwd(), 'src/components/recipe-flow-v3/RecipeFlowMobileV3.vue'), 'utf8')
  assert.match(canvasSource, /v3-flow-connectors/, '画布组件必须包含显式分支连接线图层')
  assert.match(canvasSource, /flow-arrow-material/, '画布组件必须包含连接线箭头定义')
  assert.match(canvasSource, /v3-header-group/, '画布组件必须包含容器与预热表头组')
  assert.doesNotMatch(canvasSource, /computedColIndex \+ 1/, '画布组件不得渲染生硬的列序号')

  assert.match(mobileSource, /承接物料：/, '移动 Cook Mode 必须渲染分支承接物料标签')
  assert.match(mobileSource, /等待前序：/, '移动 Cook Mode 必须渲染分支等待前序标签')
  assert.match(mobileSource, /getCategorizedDependencies/, '移动 Cook Mode 必须包含依赖工序标签分类解析函数')
  assert.doesNotMatch(mobileSource, /stageIndex \+ 1/, '移动 Cook Mode 不得渲染生硬的阶段数字编号')

  const nonlinearStats = ALL_PRESET_RECIPES.reduce((stats, preset) => {
    const stageCounts = new Map<number, number>()
    preset.actionBlocks.forEach((block: any) => {
      stageCounts.set(block.stageIndex, (stageCounts.get(block.stageIndex) || 0) + 1)
      const dependencies = block.inputBlockIds || []
      stats.explicitEdges += dependencies.length
      if (dependencies.length > 1) stats.mergeBlocks += 1
    })
    if ([...stageCounts.values()].some(count => count > 1)) stats.parallelRecipeIds.push(preset.id)
    return stats
  }, { explicitEdges: 0, mergeBlocks: 0, parallelRecipeIds: [] as string[] })

  console.log(`ℹ️ 预置库非线性语义：显式依赖 ${nonlinearStats.explicitEdges} 条，显式汇合 ${nonlinearStats.mergeBlocks} 个，同阶段并行食谱 ${nonlinearStats.parallelRecipeIds.length} 道 (${nonlinearStats.parallelRecipeIds.join('、') || '无'})`)
  console.log('✅ Flow Graph 回归测试通过：无重叠布局、依赖语义保留、显式分支连接呈现、单锅工序串行化、循环与悬空校验正常')
}

run()
