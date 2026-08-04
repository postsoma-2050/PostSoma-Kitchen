import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import type { VisualRecipeV3 } from '../../src/types/recipeV3'
import { CHINESE_HEALTHY_RECIPES } from '../../src/data/chineseHealthyRecipes'
import { HOME_SWEET_HOME_RECIPES } from '../../src/data/homeSweetHomeRecipes'
import { caesarSaladV3, espressoBrowniesV3, hongShaoRouV3 } from '../../src/data/v3Examples'
import { buildV3MatrixLayout } from '../../src/utils/matrixFlowLayout'
import { validateRecipe } from '../../src/utils/taxonomyMatcher'
import { generatePageSvgString } from '../../src/utils/exportFlowCard'

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

  assert.doesNotMatch(exported.svgString, /v3-flow-connectors|v3-grid-lines/, `${recipe.id} 导出不得包含路径或网格层`)
  assert.doesNotMatch(exported.svgString, /<marker|marker-end=|<path\b|stroke-dasharray=/, `${recipe.id} 导出不得包含箭头、路径或虚线`)
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
  assert.doesNotMatch(exported.svgString, /v3-flow-connectors|marker-end=|<path\b/, '导出图卡不得渲染领域连接关系')
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
  ]
  representativeIds.forEach(id => {
    const representative = ALL_PRESET_RECIPES.find(item => item.id === id)
    assert.ok(representative, `必须找到代表食谱 ${id}`)
    assertSimplifiedExport(representative!)
  })

  const canvasSource = fs.readFileSync(path.join(process.cwd(), 'src/components/recipe-flow-v3/RecipeFlowCanvasV3.vue'), 'utf8')
  const mobileSource = fs.readFileSync(path.join(process.cwd(), 'src/components/recipe-flow-v3/RecipeFlowMobileV3.vue'), 'utf8')
  assert.doesNotMatch(canvasSource, /v3-flow-connectors|flow-arrow|marker-end|computedColIndex \+ 1/, '桌面与全屏共用画布不得渲染连接线或工序编号')
  assert.doesNotMatch(mobileSource, /stageIndex \+ 1|承接：|getDependencyLabels|↓|border-l-2/, '移动 Cook Mode 不得渲染阶段编号、承接标签或纵向路径')

  const nonlinearStats = ALL_PRESET_RECIPES.reduce((stats, preset) => {
    const stageCounts = new Map<number, number>()
    preset.actionBlocks.forEach(block => {
      stageCounts.set(block.stageIndex, (stageCounts.get(block.stageIndex) || 0) + 1)
      const dependencies = block.inputBlockIds || []
      stats.explicitEdges += dependencies.length
      if (dependencies.length > 1) stats.mergeBlocks += 1
    })
    if ([...stageCounts.values()].some(count => count > 1)) stats.parallelRecipeIds.push(preset.id)
    return stats
  }, { explicitEdges: 0, mergeBlocks: 0, parallelRecipeIds: [] as string[] })

  console.log(`ℹ️ 预置库非线性语义：显式依赖 ${nonlinearStats.explicitEdges} 条，显式汇合 ${nonlinearStats.mergeBlocks} 个，同阶段并行食谱 ${nonlinearStats.parallelRecipeIds.length} 道 (${nonlinearStats.parallelRecipeIds.join('、') || '无'})`)
  console.log('✅ Flow Graph 回归测试通过：无重叠布局、依赖语义保留、默认视觉无编号/路径、循环与悬空校验正常')
}

run()
