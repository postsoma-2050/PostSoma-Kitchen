import assert from 'node:assert/strict'
import {
  AI_SUGGESTION_IDENTITY,
  applyAiSuggestionSafetyPolicy,
  deriveAiSuggestionSafetyRules,
  type AiIngredientSnapshot,
  type AiInstantSuggestion,
} from '../../src/domain/fridge'

const snapshot: AiIngredientSnapshot = {
  id: 'safety-snapshot',
  selectedIngredients: [
    { conceptId: 'ing-chicken', displayName: '鸡肉', category: 'meat_poultry_eggs_tofu', isBasicPantry: false },
    { conceptId: 'ing-egg', displayName: '鸡蛋', category: 'meat_poultry_eggs_tofu', isBasicPantry: false },
    { conceptId: 'ing-shrimp', displayName: '虾仁', category: 'seafood', isBasicPantry: false },
  ],
  customIngredients: [{ id: 'custom-leaf', displayName: '山野菜', status: 'unrecognized' }],
  relatedRecipeIds: [],
}

function suggestion(steps: string[]): AiInstantSuggestion {
  return {
    identity: AI_SUGGESTION_IDENTITY,
    title: '安全测试建议',
    summary: '将已选食材充分加热，完成一份安全的临时料理。',
    usedConceptIds: snapshot.selectedIngredients.map(item => item.conceptId),
    usedCustomIngredientIds: ['custom-leaf'],
    criticalMissing: [],
    optionalAdditions: [],
    steps,
    timeExpectation: 'unknown',
    difficulty: 'unknown',
    safetyNotes: ['保持操作台清洁。'],
    relatedRecipeIds: [],
  }
}

function run() {
  const rules = deriveAiSuggestionSafetyRules(snapshot)
  assert.ok(rules.some(rule => rule.id === 'cook-poultry-through'))
  assert.ok(rules.some(rule => rule.id === 'handle-eggs-safely'))
  assert.ok(rules.some(rule => rule.id === 'handle-seafood-safely'))
  assert.ok(rules.some(rule => rule.id === 'unrecognized-ingredient-caution'))

  const safe = applyAiSuggestionSafetyPolicy(suggestion(['将鸡肉、鸡蛋与虾仁充分加热至熟。']), rules)
  assert.equal(safe.ok, true)
  assert.ok(safe.ok && safe.value.safetyNotes.some(note => note.includes('禽肉应彻底熟透')))
  assert.ok(safe.ok && safe.value.safetyNotes.some(note => note.includes('安全属性尚未确认')))

  assert.equal(applyAiSuggestionSafetyPolicy(suggestion(['鸡肉保持半生后装盘。']), rules).ok, false)
  assert.equal(applyAiSuggestionSafetyPolicy(suggestion(['将食材做成自制罐头保存。']), rules).ok, false)
  assert.equal(applyAiSuggestionSafetyPolicy(suggestion(['放在常温环境发酵一整晚。']), rules).ok, false)

  console.log('✅ AI 食品安全测试通过：禽肉、蛋、海鲜、未识别提示与高风险方向拦截均正常')
}

run()
