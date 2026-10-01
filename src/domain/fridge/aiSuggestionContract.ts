import type {
  FridgeIngredientIndex,
  IngredientPublicCategory,
  UserIngredientSelection,
} from './ingredientTypes'
import { createUnrecognizedIngredientId } from './ingredientLedger'
import { matchPublishedRecipes } from './recipeMatcher'

export const AI_SUGGESTION_IDENTITY = 'temporary-unreviewed-not-a-recipe' as const
export const AI_SUGGESTION_SCHEMA_VERSION = '1' as const

export interface AiSelectedIngredient {
  conceptId: string
  displayName: string
  category: IngredientPublicCategory
  isBasicPantry: boolean
}

export interface AiCustomIngredientInput {
  id: string
  displayName: string
  status: 'unrecognized'
}

export interface AiFlavorContext {
  cohesivenessScore?: number
  isCohesiveClassic?: boolean
  complements?: string[]
}

export interface AiIngredientSnapshot {
  id: string
  selectedIngredients: AiSelectedIngredient[]
  customIngredients: AiCustomIngredientInput[]
  relatedRecipeIds: string[]
  flavorContext?: AiFlavorContext
}

export type AiTimeExpectation = 'quick' | 'moderate' | 'long' | 'unknown'
export type AiDifficultyExpectation = 'easy' | 'medium' | 'hard' | 'unknown'

export interface AiInstantSuggestion {
  identity: typeof AI_SUGGESTION_IDENTITY
  title: string
  summary: string
  usedConceptIds: string[]
  usedCustomIngredientIds: string[]
  criticalMissing: string[]
  optionalAdditions: string[]
  steps: string[]
  timeExpectation: AiTimeExpectation
  difficulty: AiDifficultyExpectation
  safetyNotes: string[]
  relatedRecipeIds: string[]
}

export type AiSuggestionErrorCode =
  | 'not-configured'
  | 'invalid-input'
  | 'cancelled'
  | 'timeout'
  | 'rate-limited'
  | 'network'
  | 'provider-rejected'
  | 'invalid-response'
  | 'safety-blocked'
  | 'unknown'

export interface AiSuggestionError {
  code: AiSuggestionErrorCode
  message: string
  retryable: boolean
  retryAfterSeconds?: number
}

export interface AiSuggestionSafetyRule {
  id: string
  message: string
}

/**
 * Provider-neutral request envelope. Gateways may translate it to a provider-specific
 * payload, but callers never submit prompt text or repository write instructions.
 */
export interface AiSuggestionRequest {
  schemaVersion: typeof AI_SUGGESTION_SCHEMA_VERSION
  requestId: string
  snapshot: AiIngredientSnapshot
  safetyRules: AiSuggestionSafetyRule[]
}

/** Raw provider output stays unknown until the domain validator accepts it. */
export interface AiSuggestionResponse {
  schemaVersion: typeof AI_SUGGESTION_SCHEMA_VERSION
  requestId: string
  snapshotId: string
  suggestion: unknown
}

export type AiSuggestionState =
  | { status: 'unconfigured'; snapshot: AiIngredientSnapshot }
  | { status: 'ready'; snapshot: AiIngredientSnapshot }
  | { status: 'generating'; snapshot: AiIngredientSnapshot; requestId: string }
  | { status: 'success'; snapshot: AiIngredientSnapshot; requestId: string; suggestion: AiInstantSuggestion }
  | { status: 'cancelled'; snapshot: AiIngredientSnapshot; requestId: string; message: string }
  | { status: 'failure'; snapshot: AiIngredientSnapshot; requestId?: string; message: string; error: AiSuggestionError }
  | {
    status: 'stale'
    snapshot: AiIngredientSnapshot
    previousSnapshotId: string
    previousSnapshot?: AiIngredientSnapshot
    previousSuggestion?: AiInstantSuggestion
  }

export type ValidationResult<T> =
  | { ok: true; value: T }
  | { ok: false; errors: string[] }

const TIME_EXPECTATIONS: AiTimeExpectation[] = ['quick', 'moderate', 'long', 'unknown']
const DIFFICULTY_EXPECTATIONS: AiDifficultyExpectation[] = ['easy', 'medium', 'hard', 'unknown']
const MAX_SELECTED_INGREDIENTS = 40
const MAX_CUSTOM_INGREDIENTS = 20
const MAX_CUSTOM_INPUT_LENGTH = 80

function stableHash(value: string): string {
  let hash = 0x811c9dc5
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index)
    hash = Math.imul(hash, 0x01000193)
  }
  return (hash >>> 0).toString(36).padStart(7, '0')
}

function normalizeText(value: string): string {
  return value.normalize('NFKC').trim().replace(/\s+/g, ' ')
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

function normalizeRetryAfter(value: number | undefined): number | undefined {
  if (value === undefined || !Number.isFinite(value)) return undefined
  return Math.min(3600, Math.max(1, Math.trunc(value)))
}

export function createAiSuggestionError(
  code: AiSuggestionErrorCode,
  message: string,
  options: { retryable?: boolean; retryAfterSeconds?: number } = {},
): AiSuggestionError {
  const safeMessage = normalizeText(message).slice(0, 240) || 'AI 建议生成失败'
  const retryableByDefault = ['timeout', 'rate-limited', 'network', 'unknown'].includes(code)
  return {
    code,
    message: safeMessage,
    retryable: options.retryable ?? retryableByDefault,
    retryAfterSeconds: code === 'rate-limited' ? normalizeRetryAfter(options.retryAfterSeconds) : undefined,
  }
}

function validateString(value: unknown, field: string, maxLength: number, errors: string[]): value is string {
  if (typeof value !== 'string' || !value.trim()) {
    errors.push(`${field} 必须是非空字符串`)
    return false
  }
  if (value.length > maxLength) {
    errors.push(`${field} 不得超过 ${maxLength} 个字符`)
    return false
  }
  return true
}

function validateStringArray(
  value: unknown,
  field: string,
  errors: string[],
  options: { min: number; max: number; itemMaxLength: number },
): value is string[] {
  if (!Array.isArray(value)) {
    errors.push(`${field} 必须是字符串数组`)
    return false
  }
  if (value.length < options.min || value.length > options.max) {
    errors.push(`${field} 数量必须在 ${options.min}–${options.max} 之间`)
    return false
  }
  let valid = true
  value.forEach((item, index) => {
    if (!validateString(item, `${field}[${index}]`, options.itemMaxLength, errors)) valid = false
  })
  if (new Set(value).size !== value.length) {
    errors.push(`${field} 不得包含重复项`)
    valid = false
  }
  return valid
}

export interface CreateAiIngredientSnapshotOptions {
  flavorContext?: AiFlavorContext
}

/**
 * 生成与一次明确库存选择绑定的结构化快照。这里仅整理受控字段；不生成 prompt，
 * 不读取环境变量，也不具备网络请求能力。
 */
export function createAiIngredientSnapshot(
  index: FridgeIngredientIndex,
  selection: UserIngredientSelection,
  options?: CreateAiIngredientSnapshotOptions,
): ValidationResult<AiIngredientSnapshot> {
  const errors: string[] = []
  const uniqueConceptIds = [...new Set(selection.conceptIds)]
  if (uniqueConceptIds.length > MAX_SELECTED_INGREDIENTS) {
    errors.push(`已选食材不得超过 ${MAX_SELECTED_INGREDIENTS} 项`)
  }

  const selectedIngredients: AiSelectedIngredient[] = []
  for (const conceptId of uniqueConceptIds) {
    const concept = index.conceptById.get(conceptId)
    if (!concept) {
      errors.push(`未知食材概念 ID：${conceptId}`)
      continue
    }
    selectedIngredients.push({
      conceptId: concept.id,
      displayName: concept.displayName,
      category: concept.category,
      isBasicPantry: concept.isBasicPantry,
    })
  }

  const customIngredients: AiCustomIngredientInput[] = []
  const customLookup = new Set<string>()
  for (const rawValue of selection.customInputs || []) {
    const displayName = normalizeText(rawValue)
    if (!displayName) continue
    const lookupKey = displayName.toLowerCase()
    if (customLookup.has(lookupKey)) continue
    customLookup.add(lookupKey)
    if (displayName.length > MAX_CUSTOM_INPUT_LENGTH) {
      errors.push(`自定义食材“${displayName.slice(0, 20)}…”超过 ${MAX_CUSTOM_INPUT_LENGTH} 个字符`)
      continue
    }
    customIngredients.push({
      id: createUnrecognizedIngredientId(displayName),
      displayName,
      status: 'unrecognized',
    })
  }
  if (customIngredients.length > MAX_CUSTOM_INGREDIENTS) {
    errors.push(`自定义食材不得超过 ${MAX_CUSTOM_INGREDIENTS} 项`)
  }
  if (errors.length) return { ok: false, errors }

  // 在边界内部重新运行确定性匹配，不接受调用方提交的 recipe ID。
  const relatedRecipeIds = [...new Set(matchPublishedRecipes(index, selection, { limit: 20 }).results
    .map(match => match.recipe.id))]
    .sort()

  selectedIngredients.sort((left, right) => left.conceptId.localeCompare(right.conceptId))
  customIngredients.sort((left, right) => left.displayName.localeCompare(right.displayName, 'zh-CN'))
  const fingerprint = JSON.stringify({
    conceptIds: selectedIngredients.map(item => item.conceptId),
    custom: customIngredients.map(item => item.displayName.toLowerCase()),
    relatedRecipeIds,
  })

  return {
    ok: true,
    value: {
      id: `ai-snapshot-${stableHash(fingerprint)}`,
      selectedIngredients,
      customIngredients,
      relatedRecipeIds,
      flavorContext: options?.flavorContext,
    },
  }
}

/** 运行时校验未来模型/服务端返回；校验失败的数据不得进入 success 状态。 */
export function validateAiInstantSuggestion(
  rawValue: unknown,
  snapshot: AiIngredientSnapshot,
): ValidationResult<AiInstantSuggestion> {
  if (!isPlainObject(rawValue)) return { ok: false, errors: ['AI 建议必须是结构化对象'] }
  const errors: string[] = []
  if (rawValue.identity !== AI_SUGGESTION_IDENTITY) errors.push('identity 必须标记为临时、未经审核的非正式食谱')
  validateString(rawValue.title, 'title', 80, errors)
  validateString(rawValue.summary, 'summary', 160, errors)
  validateStringArray(rawValue.usedConceptIds, 'usedConceptIds', errors, { min: 0, max: 40, itemMaxLength: 80 })
  validateStringArray(rawValue.usedCustomIngredientIds, 'usedCustomIngredientIds', errors, { min: 0, max: 20, itemMaxLength: 80 })
  validateStringArray(rawValue.criticalMissing, 'criticalMissing', errors, { min: 0, max: 8, itemMaxLength: 100 })
  validateStringArray(rawValue.optionalAdditions, 'optionalAdditions', errors, { min: 0, max: 8, itemMaxLength: 100 })
  validateStringArray(rawValue.steps, 'steps', errors, { min: 1, max: 8, itemMaxLength: 240 })
  validateStringArray(rawValue.safetyNotes, 'safetyNotes', errors, { min: 1, max: 6, itemMaxLength: 180 })
  validateStringArray(rawValue.relatedRecipeIds, 'relatedRecipeIds', errors, { min: 0, max: 20, itemMaxLength: 100 })

  if (!TIME_EXPECTATIONS.includes(rawValue.timeExpectation as AiTimeExpectation)) errors.push('timeExpectation 不是允许值')
  if (!DIFFICULTY_EXPECTATIONS.includes(rawValue.difficulty as AiDifficultyExpectation)) errors.push('difficulty 不是允许值')

  const allowedConceptIds = new Set(snapshot.selectedIngredients.map(item => item.conceptId))
  const allowedCustomIds = new Set(snapshot.customIngredients.map(item => item.id))
  const allowedRecipeIds = new Set(snapshot.relatedRecipeIds)
  if (Array.isArray(rawValue.usedConceptIds) && rawValue.usedConceptIds.some(id => typeof id !== 'string' || !allowedConceptIds.has(id))) {
    errors.push('usedConceptIds 只能引用当前快照中已选择的食材')
  }
  if (Array.isArray(rawValue.usedCustomIngredientIds) && rawValue.usedCustomIngredientIds.some(id => typeof id !== 'string' || !allowedCustomIds.has(id))) {
    errors.push('usedCustomIngredientIds 只能引用当前快照中的自定义食材')
  }
  if (Array.isArray(rawValue.relatedRecipeIds) && rawValue.relatedRecipeIds.some(id => typeof id !== 'string' || !allowedRecipeIds.has(id))) {
    errors.push('relatedRecipeIds 只能来自本地确定性匹配结果')
  }

  if (errors.length) return { ok: false, errors }
  return { ok: true, value: rawValue as unknown as AiInstantSuggestion }
}

export function validateAiSuggestionResponse(
  rawValue: unknown,
  request: AiSuggestionRequest,
): ValidationResult<AiInstantSuggestion> {
  if (!isPlainObject(rawValue)) return { ok: false, errors: ['AI 响应必须是结构化对象'] }
  const errors: string[] = []
  if (rawValue.schemaVersion !== AI_SUGGESTION_SCHEMA_VERSION) errors.push('AI 响应 schemaVersion 不受支持')
  if (rawValue.requestId !== request.requestId) errors.push('AI 响应 requestId 与当前请求不一致')
  if (rawValue.snapshotId !== request.snapshot.id) errors.push('AI 响应 snapshotId 与当前食材快照不一致')
  if (!Object.prototype.hasOwnProperty.call(rawValue, 'suggestion')) errors.push('AI 响应缺少 suggestion')
  if (errors.length) return { ok: false, errors }
  return validateAiInstantSuggestion(rawValue.suggestion, request.snapshot)
}

export function createAiSuggestionState(
  snapshot: AiIngredientSnapshot,
  configured: boolean,
): AiSuggestionState {
  return configured ? { status: 'ready', snapshot } : { status: 'unconfigured', snapshot }
}

export function beginAiSuggestion(
  state: AiSuggestionState,
  requestId = `manual-${state.snapshot.id}`,
): AiSuggestionState {
  if (state.status === 'unconfigured') return state
  return { status: 'generating', snapshot: state.snapshot, requestId }
}

export function completeAiSuggestion(state: AiSuggestionState, rawValue: unknown): AiSuggestionState {
  if (state.status === 'unconfigured') return state
  if (state.status !== 'generating') {
    const error = createAiSuggestionError('invalid-response', 'AI 建议尚未进入生成状态', { retryable: false })
    return { status: 'failure', snapshot: state.snapshot, message: error.message, error }
  }
  const validated = validateAiInstantSuggestion(rawValue, state.snapshot)
  if (!validated.ok) {
    const error = createAiSuggestionError('invalid-response', validated.errors.join('；'), { retryable: false })
    return { status: 'failure', snapshot: state.snapshot, requestId: state.requestId, message: error.message, error }
  }
  return { status: 'success', snapshot: state.snapshot, requestId: state.requestId, suggestion: validated.value }
}

export function failAiSuggestion(
  state: AiSuggestionState,
  message: string,
  code: AiSuggestionErrorCode = 'unknown',
  options: { retryable?: boolean; retryAfterSeconds?: number } = {},
): AiSuggestionState {
  if (state.status === 'unconfigured') return state
  const error = createAiSuggestionError(code, message, options)
  const requestId = state.status === 'generating' || state.status === 'success' || state.status === 'cancelled'
    ? state.requestId
    : undefined
  return { status: 'failure', snapshot: state.snapshot, requestId, message: error.message, error }
}

export function cancelAiSuggestion(state: AiSuggestionState): AiSuggestionState {
  if (state.status !== 'generating') return state
  return {
    status: 'cancelled',
    snapshot: state.snapshot,
    requestId: state.requestId,
    message: '已取消 AI 即时做法生成',
  }
}

/** 食材快照变化后，旧结果只能进入 stale，不能继续被展示为当前有效建议。 */
export function reconcileAiSuggestionSnapshot(
  state: AiSuggestionState,
  nextSnapshot: AiIngredientSnapshot,
  configured: boolean,
): AiSuggestionState {
  if (state.snapshot.id === nextSnapshot.id) return state
  if (!configured) return { status: 'unconfigured', snapshot: nextSnapshot }
  return {
    status: 'stale',
    snapshot: nextSnapshot,
    previousSnapshotId: state.snapshot.id,
    previousSnapshot: state.status === 'success'
      ? state.snapshot
      : (state.status === 'stale' ? state.previousSnapshot : undefined),
    previousSuggestion: state.status === 'success'
      ? state.suggestion
      : (state.status === 'stale' ? state.previousSuggestion : undefined),
  }
}
