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
  AiSuggestionGatewayError,
  MemoryOpenAiCompatibleByokGateway,
  buildFridgeIngredientIndex,
  createAiIngredientSnapshot,
  createAiSuggestionRequest,
  resolveUserIngredientText,
  validateOpenAiCompatibleByokConfig,
  type AiInstantSuggestion,
} from '../../src/domain/fridge'

const ALL_RECIPES = [
  ...CHINESE_HEALTHY_RECIPES,
  ...HOME_SWEET_HOME_RECIPES,
  espressoBrowniesV3,
  hongShaoRouV3,
  caesarSaladV3,
].map(normalizeRecipe)

function assertInvalid(baseUrl: string) {
  const result = validateOpenAiCompatibleByokConfig({ apiKey: 'test-key', baseUrl, model: 'test-model' })
  assert.equal(result.ok, false, `${baseUrl} 必须被拒绝`)
}

function makeSuggestion(request: ReturnType<typeof createAiSuggestionRequest>): AiInstantSuggestion {
  return {
    identity: AI_SUGGESTION_IDENTITY,
    title: '紫苏鸡肉快炒方向',
    summary: '用鸡肉和紫苏叶做一份快手热炒。',
    usedConceptIds: request.snapshot.selectedIngredients.map(item => item.conceptId),
    usedCustomIngredientIds: request.snapshot.customIngredients.map(item => item.id),
    criticalMissing: [],
    optionalAdditions: ['葱段'],
    steps: ['将鸡肉充分加热至熟。', '加入紫苏叶快速翻炒。'],
    timeExpectation: 'moderate',
    difficulty: 'easy',
    safetyNotes: ['避免交叉污染。'],
    relatedRecipeIds: request.snapshot.relatedRecipeIds.slice(0, 1),
  }
}

function responseFor(request: ReturnType<typeof createAiSuggestionRequest>): Response {
  return new Response(JSON.stringify({
    choices: [{
      message: {
        content: JSON.stringify({
          schemaVersion: AI_SUGGESTION_SCHEMA_VERSION,
          requestId: request.requestId,
          snapshotId: request.snapshot.id,
          suggestion: makeSuggestion(request),
        }),
      },
    }],
  }), { status: 200, headers: { 'Content-Type': 'application/json' } })
}

async function expectGatewayError(promise: Promise<unknown>, code: string) {
  await assert.rejects(promise, error => {
    assert.ok(error instanceof AiSuggestionGatewayError)
    assert.equal(error.detail.code, code)
    return true
  })
}

async function run() {
  assertInvalid('http://api.example.com/v1')
  assertInvalid('https://user:pass@api.example.com/v1')
  assertInvalid('https://api.example.com/v1?tenant=1')
  assertInvalid('https://api.example.com/v1#config')
  assertInvalid('https://localhost/v1')
  assertInvalid('https://127.0.0.1/v1')
  assertInvalid('https://192.168.1.20/v1')
  assert.equal(validateOpenAiCompatibleByokConfig({ apiKey: '', baseUrl: '', model: '' }).ok, false, '配置不得自动填默认值')

  const index = buildFridgeIngredientIndex(ALL_RECIPES)
  const chickenId = resolveUserIngredientText(index, '鸡肉')
  assert.ok(chickenId)
  const snapshotResult = createAiIngredientSnapshot(index, { conceptIds: [chickenId], customInputs: ['紫苏叶'] })
  assert.equal(snapshotResult.ok, true)
  if (!snapshotResult.ok) throw new Error((snapshotResult as any).errors.join('；'))
  const request = createAiSuggestionRequest(snapshotResult.value, 'gateway-request-1')

  let capturedUrl = ''
  let capturedInit: RequestInit | undefined
  const gateway = new MemoryOpenAiCompatibleByokGateway(async (input, init) => {
    capturedUrl = String(input)
    capturedInit = init
    return responseFor(request)
  })
  const configured = gateway.configure({
    apiKey: 'memory-only-secret',
    baseUrl: 'https://api.example.com/v1/',
    model: 'example-model-1',
  })
  assert.equal(configured.ok, true)
  assert.equal(gateway.getReadiness().status, 'ready')
  assert.equal(gateway.getPublicConfig()?.destinationHost, 'api.example.com')
  assert.doesNotMatch(JSON.stringify(gateway.getPublicConfig()), /memory-only-secret/, '公开配置不得暴露 Key')

  const result = await gateway.generate(request, new AbortController().signal)
  assert.equal(result.requestId, request.requestId)
  assert.equal(capturedUrl, 'https://api.example.com/v1/chat/completions')
  const headers = capturedInit?.headers as Record<string, string>
  assert.equal(headers.Authorization, 'Bearer memory-only-secret')
  const body = JSON.parse(String(capturedInit?.body))
  assert.equal(body.model, 'example-model-1')
  assert.deepEqual(body.response_format, { type: 'json_object' })
  const structuredInput = JSON.parse(body.messages[1].content)
  assert.equal(structuredInput.kind, 'post-soma-fridge-snapshot')
  assert.equal(structuredInput.customIngredients[0].displayName, '紫苏叶')
  assert.equal(structuredInput.customIngredients[0].status, 'unrecognized')
  assert.equal(body.messages[1].content.includes('memory-only-secret'), false)

  // P1 算法突破回归断言：携带 flavorContext 时，必须结构化传给大模型
  const snapshotWithFlavorResult = createAiIngredientSnapshot(
    index,
    { conceptIds: [chickenId] },
    {
      flavorContext: {
        cohesivenessScore: 0.75,
        isCohesiveClassic: true,
        complements: ['黑胡椒', '大蒜', '百里香'],
      },
    },
  )
  assert.equal(snapshotWithFlavorResult.ok, true)
  if (snapshotWithFlavorResult.ok) {
    const requestWithFlavor = createAiSuggestionRequest(snapshotWithFlavorResult.value, 'gateway-request-flavor')
    await gateway.generate(requestWithFlavor, new AbortController().signal)
    const flavorBody = JSON.parse(String(capturedInit?.body))
    const flavorStructuredInput = JSON.parse(flavorBody.messages[1].content)
    assert.deepEqual(flavorStructuredInput.flavorContext, {
      theFlavorBibleComplements: ['黑胡椒', '大蒜', '百里香'],
      isCohesiveClassic: true,
      cohesivenessScore: 0.75,
    }, '风味圣经搭档必须准确注入 user structured payload')
  }

  gateway.clear()
  assert.equal(gateway.getReadiness().status, 'unconfigured')
  assert.equal(gateway.getPublicConfig(), null)

  const limited = new MemoryOpenAiCompatibleByokGateway(async () => new Response('', {
    status: 429,
    headers: { 'Retry-After': '12' },
  }))
  limited.configure({ apiKey: 'key', baseUrl: 'https://api.example.com/v1', model: 'model' })
  await assert.rejects(limited.generate(request, new AbortController().signal), error => {
    assert.ok(error instanceof AiSuggestionGatewayError)
    assert.equal(error.detail.code, 'rate-limited')
    assert.equal(error.detail.retryAfterSeconds, 12)
    return true
  })

  const rejected = new MemoryOpenAiCompatibleByokGateway(async () => new Response('', { status: 401 }))
  rejected.configure({ apiKey: 'key', baseUrl: 'https://api.example.com/v1', model: 'model' })
  await expectGatewayError(rejected.generate(request, new AbortController().signal), 'provider-rejected')

  const malformed = new MemoryOpenAiCompatibleByokGateway(async () => new Response('{bad json', { status: 200 }))
  malformed.configure({ apiKey: 'key', baseUrl: 'https://api.example.com/v1', model: 'model' })
  await expectGatewayError(malformed.generate(request, new AbortController().signal), 'invalid-response')

  const network = new MemoryOpenAiCompatibleByokGateway(async () => { throw new TypeError('connection failed') })
  network.configure({ apiKey: 'key', baseUrl: 'https://api.example.com/v1', model: 'model' })
  await expectGatewayError(network.generate(request, new AbortController().signal), 'network')

  const pendingFetch = (_input: RequestInfo | URL, init?: RequestInit) => new Promise<Response>((_resolve, rejectPromise) => {
    init?.signal?.addEventListener('abort', () => {
      const error = new Error('aborted')
      error.name = 'AbortError'
      rejectPromise(error)
    }, { once: true })
  })
  const timed = new MemoryOpenAiCompatibleByokGateway(pendingFetch, 5)
  timed.configure({ apiKey: 'key', baseUrl: 'https://api.example.com/v1', model: 'model' })
  await expectGatewayError(timed.generate(request, new AbortController().signal), 'timeout')

  const cancellable = new MemoryOpenAiCompatibleByokGateway(pendingFetch, 500)
  cancellable.configure({ apiKey: 'key', baseUrl: 'https://api.example.com/v1', model: 'model' })
  const cancellation = new AbortController()
  const cancelledPromise = cancellable.generate(request, cancellation.signal)
  cancellation.abort()
  await assert.rejects(cancelledPromise, error => error instanceof Error && error.name === 'AbortError')

  const gatewaySource = fs.readFileSync(path.join(process.cwd(), 'src/domain/fridge/openAiCompatibleByokGateway.ts'), 'utf8')
  assert.doesNotMatch(gatewaySource, /localStorage|sessionStorage|document\.cookie|import\.meta\.env/, 'Gateway 不得读取持久化配置或环境密钥')
  assert.doesNotMatch(gatewaySource, /console\.(?:log|error|warn)/, 'Gateway 不得把配置或供应商错误写入控制台')

  console.log('✅ 内存 BYOK Gateway 测试通过：严格 URL、结构化请求、清除、限流、拒绝、无效 JSON、网络、超时与取消均正常')
}

run().catch(error => {
  console.error(error)
  process.exitCode = 1
})
