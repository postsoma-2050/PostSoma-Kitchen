import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { CHINESE_HEALTHY_RECIPES } from '../../src/data/chineseHealthyRecipes'
import { HOME_SWEET_HOME_RECIPES } from '../../src/data/homeSweetHomeRecipes'
import { caesarSaladV3, espressoBrowniesV3, hongShaoRouV3 } from '../../src/data/v3Examples'
import { normalizeRecipe } from '../../src/services/recipeNormalizer'
import {
  AI_SUGGESTION_IDENTITY,
  AI_SUGGESTION_SCHEMA_VERSION,
  AiSuggestionChannel,
  AiSuggestionGatewayError,
  UnconfiguredAiSuggestionGateway,
  buildFridgeIngredientIndex,
  createAiIngredientSnapshot,
  resolveUserIngredientText,
  type AiIngredientSnapshot,
  type AiInstantSuggestion,
  type AiSuggestionGateway,
  type AiSuggestionGatewayReadiness,
  type AiSuggestionRequest,
  type AiSuggestionResponse,
} from '../../src/domain/fridge'

const ALL_RECIPES = [
  ...CHINESE_HEALTHY_RECIPES,
  ...HOME_SWEET_HOME_RECIPES,
  espressoBrowniesV3,
  hongShaoRouV3,
  caesarSaladV3,
].map(normalizeRecipe)

interface DeferredCall {
  request: AiSuggestionRequest
  signal: AbortSignal
  resolve: (response: AiSuggestionResponse) => void
  reject: (error: unknown) => void
}

class DeferredGateway implements AiSuggestionGateway {
  readonly calls: DeferredCall[] = []

  getReadiness(): AiSuggestionGatewayReadiness {
    return {
      status: 'ready',
      mode: 'server-proxy',
      destinationOrigin: 'https://example.invalid',
      destinationHost: 'example.invalid',
    }
  }

  generate(request: AiSuggestionRequest, signal: AbortSignal): Promise<AiSuggestionResponse> {
    return new Promise((resolve, reject) => {
      this.calls.push({ request, signal, resolve, reject })
    })
  }
}

function requireConceptId(index: ReturnType<typeof buildFridgeIngredientIndex>, value: string): string {
  const conceptId = resolveUserIngredientText(index, value)
  assert.ok(conceptId, `必须识别 ${value}`)
  return conceptId
}

function requireSnapshot(result: ReturnType<typeof createAiIngredientSnapshot>): AiIngredientSnapshot {
  assert.equal(result.ok, true)
  if (!result.ok) throw new Error(result.errors.join('；'))
  return result.value
}

function buildSuggestion(snapshot: AiIngredientSnapshot, overrides: Partial<AiInstantSuggestion> = {}): AiInstantSuggestion {
  return {
    identity: AI_SUGGESTION_IDENTITY,
    title: '手边食材快炒方向',
    summary: '用当前鸡肉和手边食材做一份简洁快炒。',
    usedConceptIds: snapshot.selectedIngredients.map(item => item.conceptId),
    usedCustomIngredientIds: snapshot.customIngredients.map(item => item.id),
    criticalMissing: [],
    optionalAdditions: [],
    steps: ['将食材处理后充分加热至熟。', '调味后立即装盘。'],
    timeExpectation: 'moderate',
    difficulty: 'easy',
    safetyNotes: ['注意清洁操作台与器具。'],
    relatedRecipeIds: snapshot.relatedRecipeIds.slice(0, 1),
    ...overrides,
  }
}

function resolveCall(call: DeferredCall, suggestion: AiInstantSuggestion, overrides: Partial<AiSuggestionResponse> = {}) {
  call.resolve({
    schemaVersion: AI_SUGGESTION_SCHEMA_VERSION,
    requestId: call.request.requestId,
    snapshotId: call.request.snapshot.id,
    suggestion,
    ...overrides,
  })
}

async function run() {
  const index = buildFridgeIngredientIndex(ALL_RECIPES)
  const chickenId = requireConceptId(index, '鸡肉')
  const saltId = requireConceptId(index, '盐')
  const tomatoId = requireConceptId(index, '番茄')
  const chickenSnapshot = requireSnapshot(createAiIngredientSnapshot(index, {
    conceptIds: [chickenId, saltId],
    customInputs: ['紫苏叶'],
  }))
  const tomatoSnapshot = requireSnapshot(createAiIngredientSnapshot(index, { conceptIds: [tomatoId] }))
  const pantryOnlySnapshot = requireSnapshot(createAiIngredientSnapshot(index, { conceptIds: [saltId] }))

  const unavailable = new AiSuggestionChannel(chickenSnapshot, new UnconfiguredAiSuggestionGateway())
  assert.equal(unavailable.getState().status, 'unconfigured')
  assert.equal((await unavailable.requestSuggestion()).status, 'unconfigured', '未配置时不得伪装开始生成')

  const pantryGateway = new DeferredGateway()
  const pantryOnly = new AiSuggestionChannel(pantryOnlySnapshot, pantryGateway)
  const pantryState = await pantryOnly.requestSuggestion()
  assert.equal(pantryState.status, 'failure')
  assert.equal(pantryState.status === 'failure' ? pantryState.error.code : '', 'invalid-input')
  assert.equal(pantryGateway.calls.length, 0, '仅基础调味不得触发 Gateway')

  const successGateway = new DeferredGateway()
  const successChannel = new AiSuggestionChannel(chickenSnapshot, successGateway)
  const successPromise = successChannel.requestSuggestion()
  assert.equal(successChannel.getState().status, 'generating')
  assert.equal(successGateway.calls.length, 1, '只有主动 requestSuggestion 才能调用 Gateway')
  const sentRequest = successGateway.calls[0].request
  assert.equal(sentRequest.schemaVersion, AI_SUGGESTION_SCHEMA_VERSION)
  assert.equal('prompt' in sentRequest, false, '自定义食材不得拼成自由 prompt 字段')
  assert.equal(sentRequest.snapshot.customIngredients[0].displayName, '紫苏叶')
  assert.ok(sentRequest.safetyRules.some(rule => rule.id === 'cook-poultry-through'))
  assert.ok(sentRequest.safetyRules.some(rule => rule.id === 'unrecognized-ingredient-caution'))
  resolveCall(successGateway.calls[0], buildSuggestion(chickenSnapshot))
  const success = await successPromise
  assert.equal(success.status, 'success')
  assert.ok(success.status === 'success' && success.suggestion.safetyNotes.some(note => note.includes('禽肉应彻底熟透')))
  assert.ok(success.status === 'success' && success.suggestion.relatedRecipeIds.every(id => chickenSnapshot.relatedRecipeIds.includes(id)))

  const duplicateGateway = new DeferredGateway()
  const duplicateChannel = new AiSuggestionChannel(chickenSnapshot, duplicateGateway)
  const firstRequest = duplicateChannel.requestSuggestion()
  const duplicateState = await duplicateChannel.requestSuggestion()
  assert.equal(duplicateState.status, 'generating')
  assert.equal(duplicateGateway.calls.length, 1, 'pending 状态不得重复调用')
  duplicateChannel.cancel()
  assert.equal(duplicateGateway.calls[0].signal.aborted, true)
  resolveCall(duplicateGateway.calls[0], buildSuggestion(chickenSnapshot))
  assert.equal((await firstRequest).status, 'cancelled', '取消后的迟到响应不得恢复为成功')

  const staleGateway = new DeferredGateway()
  const staleChannel = new AiSuggestionChannel(chickenSnapshot, staleGateway)
  const staleRequest = staleChannel.requestSuggestion()
  staleChannel.updateSnapshot(tomatoSnapshot)
  assert.equal(staleChannel.getState().status, 'stale')
  assert.equal(staleGateway.calls[0].signal.aborted, true, '库存变化必须撤销在途请求')
  resolveCall(staleGateway.calls[0], buildSuggestion(chickenSnapshot))
  assert.equal((await staleRequest).status, 'stale', '旧快照的迟到响应不得覆盖新库存状态')

  const invalidGateway = new DeferredGateway()
  const invalidChannel = new AiSuggestionChannel(chickenSnapshot, invalidGateway)
  const invalidRequest = invalidChannel.requestSuggestion()
  resolveCall(invalidGateway.calls[0], buildSuggestion(chickenSnapshot), { snapshotId: tomatoSnapshot.id })
  const invalid = await invalidRequest
  assert.equal(invalid.status, 'failure')
  assert.equal(invalid.status === 'failure' ? invalid.error.code : '', 'invalid-response')

  const unsafeGateway = new DeferredGateway()
  const unsafeChannel = new AiSuggestionChannel(chickenSnapshot, unsafeGateway)
  const unsafeRequest = unsafeChannel.requestSuggestion()
  resolveCall(unsafeGateway.calls[0], buildSuggestion(chickenSnapshot, { steps: ['鸡肉保持半生后直接装盘。'] }))
  const unsafe = await unsafeRequest
  assert.equal(unsafe.status, 'failure')
  assert.equal(unsafe.status === 'failure' ? unsafe.error.code : '', 'safety-blocked')

  class RateLimitedGateway extends DeferredGateway {
    override generate(): Promise<AiSuggestionResponse> {
      return Promise.reject(new AiSuggestionGatewayError('rate-limited', '请求过于频繁', {
        retryable: true,
        retryAfterSeconds: 45,
      }))
    }
  }
  const limited = await new AiSuggestionChannel(chickenSnapshot, new RateLimitedGateway()).requestSuggestion()
  assert.equal(limited.status, 'failure')
  assert.equal(limited.status === 'failure' ? limited.error.code : '', 'rate-limited')
  assert.equal(limited.status === 'failure' ? limited.error.retryAfterSeconds : undefined, 45)

  const channelSource = fs.readFileSync(path.join(process.cwd(), 'src/domain/fridge/aiSuggestionChannel.ts'), 'utf8')
  const gatewaySource = fs.readFileSync(path.join(process.cwd(), 'src/domain/fridge/aiSuggestionGateway.ts'), 'utf8')
  assert.doesNotMatch(`${channelSource}\n${gatewaySource}`, /v3RecipeStore|repositories\/|supabase/i, 'AI 通道不得导入正式食谱写入链路')
  assert.doesNotMatch(`${channelSource}\n${gatewaySource}`, /localStorage|sessionStorage|import\.meta\.env|axios|fetch\(/, '预接入通道不得读取密钥、存储配置或发起网络请求')

  console.log('✅ AI 即时做法通道测试通过：主动调用、单请求、取消、失效、迟到响应、结构校验与安全拦截均正常')
}

run().catch(error => {
  console.error(error)
  process.exitCode = 1
})
