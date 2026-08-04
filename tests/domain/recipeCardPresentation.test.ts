import assert from 'node:assert/strict'
import type { VisualRecipeV3 } from '../../src/types/recipeV3'
import {
  getRecipeDifficultyLabel,
  getRecipeDisplayTitle,
  getRecipeDurationLabel,
  getRecipeMethodLabel,
  getRecipeServingsPresentation,
} from '../../src/utils/recipeCardPresentation'

function makeRecipe(overrides: Partial<VisualRecipeV3> = {}): VisualRecipeV3 {
  return {
    id: 'test-recipe',
    version: '3.0',
    status: 'published',
    title: '🏆 测试食谱',
    description: '测试描述',
    difficulty: 'medium',
    prerequisites: {},
    ingredients: [],
    actionBlocks: [],
    finalBlock: { method: 'bake', label: '烘焙' },
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
    ...overrides,
  }
}

function run() {
  assert.equal(getRecipeDisplayTitle('🏆 测试食谱'), '测试食谱')
  assert.equal(getRecipeDisplayTitle('毛氏红烧肉'), '毛氏红烧肉')
  assert.equal(getRecipeMethodLabel('bake'), '烘焙')
  assert.equal(getRecipeMethodLabel('raw'), '冷拌')
  assert.equal(getRecipeDifficultyLabel('medium'), '中等')

  assert.deepEqual(getRecipeServingsPresentation('8 人份'), {
    kind: 'servings', label: '原始份量', value: '8 人份',
  })
  assert.deepEqual(getRecipeServingsPresentation('3-4 人份'), {
    kind: 'servings', label: '原始份量', value: '3–4 人份',
  })
  assert.deepEqual(getRecipeServingsPresentation('约 18 杯'), {
    kind: 'yield', label: '原始产量', value: '约 18 杯',
  })
  assert.deepEqual(getRecipeServingsPresentation('6 颗 (350g)'), {
    kind: 'yield', label: '原始产量', value: '6 颗（350g）',
  })
  assert.equal(getRecipeServingsPresentation('   '), null)

  assert.equal(
    getRecipeDurationLabel(makeRecipe({ cookingTimeText: '45 min' })),
    '总耗时 45 分钟',
  )
  assert.equal(
    getRecipeDurationLabel(makeRecipe({
      finalBlock: { method: 'bake', label: '烘焙', durationText: '30 to 40 min' },
    })),
    '烹饪 30–40 分钟',
  )
  assert.equal(
    getRecipeDurationLabel(makeRecipe({
      actionBlocks: [
        { id: 'a', stageIndex: 0, ingredientIds: [], label: '准备', durationMinutes: 5 },
        { id: 'b', stageIndex: 1, ingredientIds: [], label: '完成', durationMinutes: 10 },
      ],
    })),
    '约 15 分钟',
  )
  assert.equal(getRecipeDurationLabel(makeRecipe()), '时间见流程')

  console.log('✅ 公开食谱卡片展示规则回归测试通过')
}

run()
