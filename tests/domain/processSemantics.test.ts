import assert from 'node:assert/strict'
import { CHINESE_HEALTHY_RECIPES } from '../../src/data/chineseHealthyRecipes'
import { buildV3ContinuousTableLayout } from '../../src/utils/continuousTableLayout'
import { buildV3MatrixLayout } from '../../src/utils/matrixFlowLayout'
import { validateRecipe } from '../../src/utils/taxonomyMatcher'

assert.equal(CHINESE_HEALTHY_RECIPES.length, 151, '原书中餐数据集必须为 151 道')

for (const recipe of CHINESE_HEALTHY_RECIPES) {
  assert.equal(recipe.finalBlock?.role, 'outcome', `${recipe.id} 的 finalBlock 必须声明为结果，不得伪装成工序`)
  assert.equal(recipe.finalBlock?.label, '完成', `${recipe.id} 的结果终点不得使用口感形容词或重复烹饪法`)
  assert.ok(!/营养笔记/.test(recipe.finalBlock?.instructions || ''), `${recipe.id} 的营养笔记不得进入 finalBlock`)
  assert.ok(
    recipe.actionBlocks.every(block => !['食材准备与加工', '按原文处理', '处理食材'].includes(block.label)),
    `${recipe.id} 不得包含无动作含义的泛化工序标题`,
  )
  assert.ok(
    recipe.actionBlocks.every(block => block.completionState !== '工序完成达到待用标准'),
    `${recipe.id} 不得包含伪准出状态`,
  )
  assert.notEqual(
    recipe.prerequisites.preheat,
    recipe.actionBlocks[0]?.label,
    `${recipe.id} 的前置准备不得复制第一工序`,
  )

  const table = buildV3ContinuousTableLayout(recipe)
  assert.ok(
    !table.processCells.some(cell => cell.isFinalBlock),
    `${recipe.id} 的结果型终点不得占据连续工序表整列`,
  )

  const flow = buildV3MatrixLayout(recipe)
  assert.equal(flow.finalBlockLayout.isOutcomeOnly, true, `${recipe.id} 的分支图终点必须使用结果语义`)
  assert.ok(flow.finalBlockLayout.w <= 80 && flow.finalBlockLayout.h <= 48, `${recipe.id} 的分支图终点必须紧凑`)
}

const cn73 = CHINESE_HEALTHY_RECIPES.find(recipe => recipe.id === 'cn-73')!
assert.deepEqual(cn73.actionBlocks.map(block => block.label), ['泡发切配焯烫', '炝香炖煮'])
assert.equal(cn73.actionBlocks[1].durationText, '25m + 10m', '分段炖煮必须保留原书两段时间')
assert.equal(cn73.prerequisites.preheat, '泡一晚', '真正的提前泡发应留在前置准备栏')

const cn86 = CHINESE_HEALTHY_RECIPES.find(recipe => recipe.id === 'cn-86')!
assert.deepEqual(cn86.actionBlocks.map(block => block.label), ['切配焯烫', '炝香翻炒', '调味'])
assert.equal(cn86.actionBlocks[2].dependencies?.[0]?.type, 'material', '调味必须承接锅中菠菜，而不是仅表达时间等待')

const invalidGenericAction = structuredClone(cn86)
invalidGenericAction.actionBlocks[0].label = '食材准备与加工'
assert.ok(
  validateRecipe(invalidGenericAction).errors.some(issue => issue.code === 'GENERIC_ACTION_LABEL'),
  '发布门禁必须阻止无动作含义的泛化工序标题',
)

const invalidRepeatedFinal = structuredClone(cn86)
invalidRepeatedFinal.finalBlock = {
  method: 'sear',
  role: 'operation',
  label: invalidRepeatedFinal.actionBlocks.at(-1)!.label,
  durationText: '1m',
}
assert.ok(
  validateRecipe(invalidRepeatedFinal).errors.some(issue => issue.code === 'FINAL_REPEATS_ACTION'),
  '发布门禁必须阻止终点重复最后一个工序',
)

const invalidOutcome = structuredClone(cn86)
invalidOutcome.finalBlock = {
  method: 'sear',
  role: 'outcome',
  label: '翠绿滑嫩',
}
assert.ok(
  validateRecipe(invalidOutcome).errors.some(issue => issue.code === 'INVALID_OUTCOME_LABEL'),
  '发布门禁必须阻止把风味形容词写成结果终点标题',
)

console.log('✅ processSemantics: 工序动作、终点职责与原书时间表达通过')
