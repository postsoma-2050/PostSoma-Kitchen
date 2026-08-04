import type {
  AiIngredientSnapshot,
  AiInstantSuggestion,
  AiSuggestionSafetyRule,
  ValidationResult,
} from './aiSuggestionContract'

const POULTRY_CONCEPT_IDS = new Set(['ing-chicken', 'ing-turkey'])
const MEAT_CONCEPT_IDS = new Set(['ing-pork', 'ing-beef', 'ing-lamb'])
const EGG_CONCEPT_IDS = new Set(['ing-egg', 'ing-egg-white'])
const SEAFOOD_CONCEPT_IDS = new Set(['ing-fish', 'ing-shrimp', 'ing-scallop', 'ing-eel'])

const SAFETY_RULES = {
  poultry: {
    id: 'cook-poultry-through',
    message: '禽肉应彻底熟透，并避免生熟食材与器具交叉污染。',
  },
  meat: {
    id: 'cook-meat-safely',
    message: '肉类应按安全方式充分熟制，并避免生肉汁液接触即食食材。',
  },
  egg: {
    id: 'handle-eggs-safely',
    message: '蛋类应使用可靠来源并充分加热；敏感人群应避免生蛋或未熟蛋。',
  },
  seafood: {
    id: 'handle-seafood-safely',
    message: '鱼虾贝类应确认新鲜、妥善冷藏并充分熟制，同时留意海鲜过敏。',
  },
  unrecognized: {
    id: 'unrecognized-ingredient-caution',
    message: '未识别食材的安全属性尚未确认；请按包装说明或可靠来源处理。',
  },
} satisfies Record<string, AiSuggestionSafetyRule>

const UNIVERSAL_HIGH_RISK_PATTERNS = [
  /自制罐头|家庭罐藏/,
  /常温.{0,8}(?:发酵|存放|静置)/,
]
const ANIMAL_UNDERCOOKING_PATTERNS = [
  /(?:生吃|生食|半生|未熟|三分熟|五分熟)/,
]

export function deriveAiSuggestionSafetyRules(snapshot: AiIngredientSnapshot): AiSuggestionSafetyRule[] {
  const conceptIds = new Set(snapshot.selectedIngredients.map(item => item.conceptId))
  const rules: AiSuggestionSafetyRule[] = []
  if ([...conceptIds].some(id => POULTRY_CONCEPT_IDS.has(id))) rules.push(SAFETY_RULES.poultry)
  if ([...conceptIds].some(id => MEAT_CONCEPT_IDS.has(id))) rules.push(SAFETY_RULES.meat)
  if ([...conceptIds].some(id => EGG_CONCEPT_IDS.has(id))) rules.push(SAFETY_RULES.egg)
  if ([...conceptIds].some(id => SEAFOOD_CONCEPT_IDS.has(id))) rules.push(SAFETY_RULES.seafood)
  if (snapshot.customIngredients.length) rules.push(SAFETY_RULES.unrecognized)
  return rules
}

export function applyAiSuggestionSafetyPolicy(
  suggestion: AiInstantSuggestion,
  rules: AiSuggestionSafetyRule[],
): ValidationResult<AiInstantSuggestion> {
  const stepsText = suggestion.steps.join('\n')
  const hasAnimalRule = rules.some(rule => [
    SAFETY_RULES.poultry.id,
    SAFETY_RULES.meat.id,
    SAFETY_RULES.egg.id,
    SAFETY_RULES.seafood.id,
  ].includes(rule.id))
  const errors: string[] = []

  if (UNIVERSAL_HIGH_RISK_PATTERNS.some(pattern => pattern.test(stepsText))) {
    errors.push('AI 做法包含当前产品不支持的高风险罐藏、发酵或常温存放建议')
  }
  if (hasAnimalRule && ANIMAL_UNDERCOOKING_PATTERNS.some(pattern => pattern.test(stepsText))) {
    errors.push('AI 做法包含动物性食材生食或未充分熟制建议')
  }
  if (errors.length) return { ok: false, errors }

  const safetyNotes = [...new Set([
    ...rules.map(rule => rule.message),
    ...suggestion.safetyNotes,
  ])].slice(0, 6)

  return {
    ok: true,
    value: {
      ...suggestion,
      safetyNotes,
    },
  }
}
