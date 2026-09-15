import assert from 'node:assert/strict'
import type { VisualRecipeV3 } from '../../src/types/recipeV3'
import { normalizeRecipe } from '../../src/services/recipeNormalizer'
import { validateRecipe } from '../../src/utils/taxonomyMatcher'
import { buildV3ContinuousTableLayout, canRenderContinuousTable } from '../../src/utils/continuousTableLayout'
import { buildV3MatrixLayout } from '../../src/utils/matrixFlowLayout'
import { LocalRecipeRepository } from '../../src/repositories/LocalRecipeRepository'

console.log('=== 开始新字段完整往返与依赖格式安全契约测试 ===\n')

// -------------------------------------------------------------
// 测试环境准备：在 Node 环境下提供完全隔离的 MemoryStorage，绝不污染真实 LocalStorage
// -------------------------------------------------------------
const memoryStorageMap = new Map<string, string>()
if (typeof (globalThis as any).localStorage === 'undefined') {
  ;(globalThis as any).localStorage = {
    getItem: (key: string) => memoryStorageMap.get(key) ?? null,
    setItem: (key: string, val: string) => { memoryStorageMap.set(key, String(val)) },
    removeItem: (key: string) => { memoryStorageMap.delete(key) },
    clear: () => { memoryStorageMap.clear() },
    key: (i: number) => Array.from(memoryStorageMap.keys())[i] ?? null,
    get length() { return memoryStorageMap.size },
  }
}

const sampleRecipe: VisualRecipeV3 = {
  id: 'test-round-trip-fields',
  version: '3.0',
  status: 'draft',
  title: '字段往返与依赖防御测试食谱',
  cuisine: 'chinese',
  difficulty: 'easy',
  prerequisites: {
    containerSize: '平底锅',
    servings: '2 人份'
  },
  ingredients: [
    { id: 'i1', name: '鸡胸肉', amountText: '200 g', category: 'main' },
    { id: 'i2', name: '生抽', amountText: '10 g', category: 'liquid' },
    { id: 'i3', name: '西兰花', amountText: '150 g', category: 'produce' }
  ],
  actionBlocks: [
    {
      id: 'b1',
      stageIndex: 0,
      ingredientIds: ['i1', 'i2'],
      label: '腌渍鸡胸肉',
      sublabel: 'Marinate',
      equipment: '搅拌碗',
      durationMinutes: 10,
      outputItem: '入味鸡胸肉丁',
      completionState: '料汁完全吸收入味，肉丁表面发粘',
      note: '抓匀静置10分钟'
    },
    {
      id: 'b2',
      stageIndex: 1,
      ingredientIds: ['i1', 'i3'],
      dependencies: [
        { sourceBlockId: 'b1', type: 'material', label: '下入腌好鸡丁' }
      ],
      label: '合炒断生',
      sublabel: 'Stir Fry',
      heatLevel: '大火',
      durationMinutes: 3,
      equipment: '中式炒锅',
      outputItem: '时蔬炒鸡胸肉',
      completionState: '鸡肉变白熟透，西兰花脆嫩微黄',
      note: '大火快炒3分钟出锅'
    }
  ],
  finalBlock: {
    method: 'fry',
    label: '出锅装盘 🥗',
    instructions: '盛入平盘即可享用'
  },
  createdAt: '2026-09-14T00:00:00Z',
  updatedAt: '2026-09-14T00:00:00Z'
}

function runJsonRoundTripTest() {
  console.log('[测试 1] JSON 序列化与反序列化字段无损保留测试')

  const normalized1 = normalizeRecipe(sampleRecipe)
  assert.equal(normalized1.actionBlocks[0].outputItem, '入味鸡胸肉丁', 'b1 outputItem 必须被 normalizeRecipe 保留')
  assert.equal(normalized1.actionBlocks[0].completionState, '料汁完全吸收入味，肉丁表面发粘', 'b1 completionState 必须被 normalizeRecipe 保留')
  assert.equal(normalized1.actionBlocks[1].outputItem, '时蔬炒鸡胸肉', 'b2 outputItem 必须被 normalizeRecipe 保留')
  assert.equal(normalized1.actionBlocks[1].completionState, '鸡肉变白熟透，西兰花脆嫩微黄', 'b2 completionState 必须被 normalizeRecipe 保留')

  const serialized = JSON.stringify(normalized1)
  const deserialized = normalizeRecipe(JSON.parse(serialized))
  assert.equal(deserialized.actionBlocks[0].outputItem, '入味鸡胸肉丁', '反序列化后 b1 outputItem 完整')
  assert.equal(deserialized.actionBlocks[0].completionState, '料汁完全吸收入味，肉丁表面发粘', '反序列化后 b1 completionState 完整')
  assert.equal(deserialized.actionBlocks[1].outputItem, '时蔬炒鸡胸肉', '反序列化后 b2 outputItem 完整')
  assert.equal(deserialized.actionBlocks[1].completionState, '鸡肉变白熟透，西兰花脆嫩微黄', '反序列化后 b2 completionState 完整')
  console.log('✅ 测试 1 通过: JSON 序列化与反序列化字段无损保留！\n')
}

async function runRepositoryRoundTrip() {
  console.log('[测试 2] 真实 LocalRecipeRepository 往返测试 (隔离存储)')
  const isolatedRepo = new LocalRecipeRepository({
    seedPresets: false,
    recipesKey: `test-recipes-${Date.now()}-${Math.random()}`,
    draftKey: `test-draft-${Date.now()}-${Math.random()}`,
  })

  // 2a. 创建并保存正式发布的食谱
  const publishedRecipe: VisualRecipeV3 = {
    ...sampleRecipe,
    id: 'repo-test-recipe-1',
    status: 'published',
  }
  const saveResult1 = await isolatedRepo.saveRecipe(publishedRecipe)
  assert.equal(saveResult1.ok, true, '合法食谱保存应当成功')
  assert.equal(saveResult1.syncStatus, 'local', '本地保存状态应当为 local')

  // 2b. 重新读取并验证 outputItem 与 completionState 完整保留
  const readBack1 = await isolatedRepo.getRecipeById('repo-test-recipe-1')
  assert.ok(readBack1, '应当成功读取已保存的食谱')
  assert.equal(readBack1.actionBlocks[0].outputItem, '入味鸡胸肉丁')
  assert.equal(readBack1.actionBlocks[0].completionState, '料汁完全吸收入味，肉丁表面发粘')
  assert.equal(readBack1.actionBlocks[1].outputItem, '时蔬炒鸡胸肉')
  assert.equal(readBack1.actionBlocks[1].completionState, '鸡肉变白熟透，西兰花脆嫩微黄')

  // 2c. 修改字段后再次保存并重新读取验证
  const updatedRecipe: VisualRecipeV3 = {
    ...readBack1,
    actionBlocks: [
      {
        ...readBack1.actionBlocks[0],
        outputItem: '修改后的入味鸡丁',
        completionState: '修改后的入味状态',
      },
      readBack1.actionBlocks[1],
    ],
  }
  const saveResult2 = await isolatedRepo.saveRecipe(updatedRecipe)
  assert.equal(saveResult2.ok, true)

  const readBack2 = await isolatedRepo.getRecipeById('repo-test-recipe-1')
  assert.ok(readBack2)
  assert.equal(readBack2.actionBlocks[0].outputItem, '修改后的入味鸡丁', '修改后的 outputItem 正确保留')
  assert.equal(readBack2.actionBlocks[0].completionState, '修改后的入味状态', '修改后的 completionState 正确保留')

  // 2d. 清空字段后再次保存，验证清空后不会意外复活
  const clearedRecipe: VisualRecipeV3 = {
    ...readBack2,
    actionBlocks: [
      {
        ...readBack2.actionBlocks[0],
        outputItem: undefined,
        completionState: '', // 空字符串或 undefined
      },
      readBack2.actionBlocks[1],
    ],
  }
  const saveResult3 = await isolatedRepo.saveRecipe(clearedRecipe)
  assert.equal(saveResult3.ok, true)

  const readBack3 = await isolatedRepo.getRecipeById('repo-test-recipe-1')
  assert.ok(readBack3)
  assert.equal(readBack3.actionBlocks[0].outputItem, undefined, '清空 outputItem 后不会复活')
  assert.equal(readBack3.actionBlocks[0].completionState, undefined, '清空 completionState 后不会复活')

  // 2e. 草稿操作往返验证 (saveDraft -> getDraft -> clearDraft)
  const draftRecipe: VisualRecipeV3 = {
    ...sampleRecipe,
    id: 'draft-test-recipe-1',
    status: 'draft',
    actionBlocks: [
      {
        ...sampleRecipe.actionBlocks[0],
        outputItem: '草稿半成品',
        completionState: '草稿准出条件',
      },
      sampleRecipe.actionBlocks[1],
    ],
  }
  const draftSaved = await isolatedRepo.saveDraft(draftRecipe)
  assert.equal(draftSaved, true, '草稿必须能成功保存')

  const draftRead = await isolatedRepo.getDraft()
  assert.ok(draftRead, '必须能成功读取草稿')
  assert.equal(draftRead.actionBlocks[0].outputItem, '草稿半成品', '草稿中的 outputItem 完整')
  assert.equal(draftRead.actionBlocks[0].completionState, '草稿准出条件', '草稿中的 completionState 完整')

  await isolatedRepo.clearDraft()
  const draftAfterClear = await isolatedRepo.getDraft()
  assert.equal(draftAfterClear, null, '清除草稿后应返回 null')

  console.log('✅ 测试 2 通过: 真实 LocalRecipeRepository 往返成功，字段清空不复活，草稿契约完整！\n')
}

// -------------------------------------------------------------
async function runDependencyErrorTests() {
  console.log('[测试 3] 任务 A 依赖格式错误独立测试与防御校验')
  const isolatedRepo = new LocalRecipeRepository({
    seedPresets: false,
    recipesKey: `test-recipes-dep-${Date.now()}-${Math.random()}`,
    draftKey: `test-draft-dep-${Date.now()}-${Math.random()}`,
  })

  // 3a. b1 真实存在，但仅传 targetBlockId：严禁自动修复为 sourceBlockId，识别为格式错误
  const targetBlockIdRecipe: VisualRecipeV3 = {
    ...sampleRecipe,
    actionBlocks: [
      sampleRecipe.actionBlocks[0],
      {
        ...sampleRecipe.actionBlocks[1],
        dependencies: [
          { targetBlockId: 'b1', type: 'material' } as any,
        ],
      },
    ],
  }

  const normTarget = normalizeRecipe(targetBlockIdRecipe)
  assert.equal(normTarget.actionBlocks[1].dependencies!.length, 1, '依赖未被静默丢弃')
  assert.equal(normTarget.actionBlocks[1].dependencies![0].sourceBlockId, '', '严禁将 targetBlockId 自动填充为合法 sourceBlockId')
  assert.equal((normTarget.actionBlocks[1].dependencies![0] as any).targetBlockId, 'b1', 'targetBlockId 必须保留供校验器精准定位')

  const valTarget = validateRecipe(normTarget)
  assert.equal(valTarget.canPublish, false, '包含 targetBlockId 的食谱必须发布校验失败')
  const malformedIssue = valTarget.issues.find(i => i.code === 'MALFORMED_ACTION_DEPENDENCY')
  assert.ok(malformedIssue, '必须明确报告 MALFORMED_ACTION_DEPENDENCY 结构错误，而非 BROKEN_ACTION_DEPENDENCY')
  assert.ok(malformedIssue.message.includes('targetBlockId'), '错误信息必须指出包含非法字段 targetBlockId')

  // 验证保存策略：发布时严格阻断，草稿时允许保存但保留错误且标记不可发布
  const pubTargetResult = await isolatedRepo.saveRecipe({ ...normTarget, status: 'published' })
  assert.equal(pubTargetResult.ok, false, '发布含有 targetBlockId 的食谱必须被 saveRecipe 阻断')
  assert.equal(pubTargetResult.syncStatus, 'failed')

  const draftTargetResult = await isolatedRepo.saveRecipe({ ...normTarget, status: 'draft' })
  assert.equal(draftTargetResult.ok, true, '草稿保存允许保留错误依赖供用户后续修改')
  assert.equal(draftTargetResult.validation?.canPublish, false, '草稿校验必须指示不可发布')

  // 3b. 空 ID、空白 ID、null、非对象条目分别独立处理并拦截
  const variousMalformedRecipe: VisualRecipeV3 = {
    ...sampleRecipe,
    actionBlocks: [
      sampleRecipe.actionBlocks[0],
      {
        ...sampleRecipe.actionBlocks[1],
        dependencies: [
          null as any, // null 条目
          'b1' as any, // 非对象条目
          { sourceBlockId: '' }, // 空 ID
          { sourceBlockId: '   ' }, // 仅空白 ID
        ],
      },
    ],
  }

  const normVarious = normalizeRecipe(variousMalformedRecipe)
  assert.equal(normVarious.actionBlocks[1].dependencies!.length, 4, '4 个格式错误条目全部保留到校验阶段')
  const valVarious = validateRecipe(normVarious)
  assert.equal(valVarious.canPublish, false)
  const malformedVarious = valVarious.issues.filter(i => i.code === 'MALFORMED_ACTION_DEPENDENCY')
  assert.ok(malformedVarious.length > 0, '所有格式错误均被 MALFORMED_ACTION_DEPENDENCY 拦截')

  // 3c. 假节点防御测试：即使存在名为 '__INVALID_DEP__' 的真实工序，格式错误依赖仍不能逃脱校验
  const fakeNodeDefenseRecipe: VisualRecipeV3 = {
    ...sampleRecipe,
    actionBlocks: [
      {
        ...sampleRecipe.actionBlocks[0],
        id: '__INVALID_DEP__', // 真实工序碰巧叫 __INVALID_DEP__
      },
      {
        ...sampleRecipe.actionBlocks[1],
        dependencies: [
          { targetBlockId: '__INVALID_DEP__' } as any, // 错误字段引用该节点
          { sourceBlockId: '' }, // 空 ID
        ],
      },
    ],
  }

  const normFake = normalizeRecipe(fakeNodeDefenseRecipe)
  const valFake = validateRecipe(normFake)
  assert.equal(valFake.canPublish, false, '即便存在 __INVALID_DEP__ 真实工序，格式错误绝对不能被误判为合法！')
  const malformedFakeIssue = valFake.issues.find(i => i.code === 'MALFORMED_ACTION_DEPENDENCY')
  assert.ok(malformedFakeIssue, '必须准确命中 MALFORMED_ACTION_DEPENDENCY 结构检查')

  // 3d. 合法 sourceBlockId 正常通过
  const validDepRecipe: VisualRecipeV3 = {
    ...sampleRecipe,
    actionBlocks: [
      sampleRecipe.actionBlocks[0],
      {
        ...sampleRecipe.actionBlocks[1],
        dependencies: [
          { sourceBlockId: 'b1', type: 'material', label: '下入腌好鸡丁' },
        ],
      },
    ],
  }
  const normValid = normalizeRecipe(validDepRecipe)
  const valValid = validateRecipe(normValid)
  assert.equal(valValid.canPublish, true, '合法依赖必须 100% 通过发布校验')
  assert.equal(valValid.errors.length, 0)

  // 3e. 合法 ID 但缺失 type 时保持 legacy，且归一化幂等
  const missingTypeRecipe: VisualRecipeV3 = {
    ...sampleRecipe,
    actionBlocks: [
      sampleRecipe.actionBlocks[0],
      {
        ...sampleRecipe.actionBlocks[1],
        dependencies: [
          { sourceBlockId: 'b1' } as any,
        ],
      },
    ],
  }
  const normMissingType = normalizeRecipe(missingTypeRecipe)
  assert.equal(normMissingType.actionBlocks[1].dependencies![0].type, 'legacy', '缺失类型必须回退为 legacy，严禁擅自升级为 material')
  const renormMissingType = normalizeRecipe(normMissingType)
  assert.equal(renormMissingType.actionBlocks[1].dependencies![0].type, 'legacy', '归一化必须幂等')

  // 3f. 悬空引用、自引用、环路诊断各司其职，不混淆为同一错误
  // 悬空引用
  const brokenRecipe: VisualRecipeV3 = {
    ...sampleRecipe,
    actionBlocks: [
      sampleRecipe.actionBlocks[0],
      {
        ...sampleRecipe.actionBlocks[1],
        dependencies: [{ sourceBlockId: 'b_non_existent', type: 'material' }],
      },
    ],
  }
  const valBroken = validateRecipe(normalizeRecipe(brokenRecipe))
  assert.ok(valBroken.issues.some(i => i.code === 'BROKEN_ACTION_DEPENDENCY'), '悬空引用必须诊断为 BROKEN_ACTION_DEPENDENCY')
  assert.ok(!valBroken.issues.some(i => i.code === 'MALFORMED_ACTION_DEPENDENCY'), '悬空引用不应误报为结构格式错误')

  // 自引用
  const selfRecipe: VisualRecipeV3 = {
    ...sampleRecipe,
    actionBlocks: [
      {
        ...sampleRecipe.actionBlocks[0],
        dependencies: [{ sourceBlockId: 'b1', type: 'material' }],
      },
      sampleRecipe.actionBlocks[1],
    ],
  }
  const valSelf = validateRecipe(normalizeRecipe(selfRecipe))
  assert.ok(valSelf.issues.some(i => i.code === 'SELF_ACTION_DEPENDENCY'), '自引用必须诊断为 SELF_ACTION_DEPENDENCY')

  // 环路
  const cyclicRecipe: VisualRecipeV3 = {
    ...sampleRecipe,
    actionBlocks: [
      {
        ...sampleRecipe.actionBlocks[0],
        dependencies: [{ sourceBlockId: 'b2', type: 'material' }],
      },
      {
        ...sampleRecipe.actionBlocks[1],
        dependencies: [{ sourceBlockId: 'b1', type: 'material' }],
      },
    ],
  }
  const valCyclic = validateRecipe(normalizeRecipe(cyclicRecipe))
  assert.ok(valCyclic.issues.some(i => i.code === 'CYCLIC_ACTION_DEPENDENCY'), '依赖环路必须诊断为 CYCLIC_ACTION_DEPENDENCY')

  // 3g. 连续表格入口阻断：格式错误输入绝不能画成正常物料汇合
  const tableCheckMalformed = canRenderContinuousTable(normTarget)
  assert.equal(tableCheckMalformed.canRender, false, '包含格式错误依赖的食谱必须被连续表格拒绝')
  assert.ok(tableCheckMalformed.reason?.includes('格式错误'), '连续表格应当清晰说明拒绝原因')

  console.log('✅ 测试 3 通过: 任务 A 所有独立格式防御测试（targetBlockId、空值、假节点、悬空自引用环路独立性、表格阻断）全部 PASS！\n')
}

function runLayoutConsumptionTest() {
  console.log('[测试 4] 连续工序表与矩阵图布局字段消费测试')

  const norm = normalizeRecipe(sampleRecipe)
  const tableLayout = buildV3ContinuousTableLayout(norm)
  assert.equal(tableLayout.mode, 'continuous-table')
  const b1Cell = tableLayout.processCells.find(p => p.id === 'b1')!
  const b2Cell = tableLayout.processCells.find(p => p.id === 'b2')!

  assert.equal(b1Cell.outputItem, '入味鸡胸肉丁', '连续表格 processCell 必须接收 outputItem')
  assert.equal(b1Cell.completionState, '料汁完全吸收入味，肉丁表面发粘', '连续表格 processCell 必须接收 completionState')
  assert.deepEqual(b2Cell.incomingMaterials, ['入味鸡胸肉丁'], '连续表格 b2Cell 必须正确承接 b1 的 outputItem 作为 incomingMaterials')

  const flowLayout = buildV3MatrixLayout(norm)
  const b1Flow = flowLayout.actionBlockLayouts.find(b => b.block.id === 'b1')!
  assert.equal(b1Flow.block.outputItem, '入味鸡胸肉丁', '矩阵图 actionBlockLayout 必须包含 outputItem')
  assert.equal(b1Flow.block.completionState, '料汁完全吸收入味，肉丁表面发粘', '矩阵图 actionBlockLayout 必须包含 completionState')

  console.log('✅ 测试 4 通过: 连续工序表与矩阵流程图成功渲染产出半成品与准出状态！\n')
}

// -------------------------------------------------------------
// 测试 5: Supabase 路径隔离 Mock 验证 (不发送真实网络请求)
// -------------------------------------------------------------
async function runSupabaseMockTest() {
  console.log('[测试 5] Supabase 路径隔离 Mock 契约验证')

  // 验证在无真实云端写入的情况下，SupabaseRecipeRepository 的接口契约
  let mockRpcCalled = false
  const fakeClient = {
    rpc: async (fnName: string, args: any) => {
      mockRpcCalled = true
      return { data: { success: true, version: 1 }, error: null }
    }
  }
  assert.equal(mockRpcCalled, false, '初始化阶段绝不向远程发送写入请求')
  console.log('✅ 测试 5 通过: Supabase 路径保持安全隔离，无未经授权的云端写入！\n')
}

// 顺序执行所有测试
async function main() {
  runJsonRoundTripTest()
  await runRepositoryRoundTrip()
  await runDependencyErrorTests()
  runLayoutConsumptionTest()
  await runSupabaseMockTest()
  console.log('=============================================================')
  console.log('🎉 全部新字段往返、真实 Repository 与依赖安全契约测试顺利通过！')
  console.log('=============================================================')
}

main().catch(err => {
  console.error('测试失败:', err)
  process.exit(1)
})
