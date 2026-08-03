import assert from 'assert'
import { LocalRecipeRepository } from '../../src/repositories/LocalRecipeRepository'
import type { VisualRecipeV3 } from '../../src/types/recipeV3'

// Node 环境下的 mock localStorage
class MockLocalStorage {
  private store: Record<string, string> = {}
  getItem(key: string) { return this.store[key] || null }
  setItem(key: string, val: string) { this.store[key] = String(val) }
  removeItem(key: string) { delete this.store[key] }
  clear() { this.store = {} }
}

if (typeof global.localStorage === 'undefined') {
  (global as any).localStorage = new MockLocalStorage()
}

async function runRepositoryTests() {
  console.log('================================================================')
  console.log('      IRecipeRepository / LocalRecipeRepository 自动化回归测试   ')
  console.log('================================================================\n')

  const repo = new LocalRecipeRepository()
  global.localStorage.clear()

  // 1. 测试基础读取与预置食谱初始化
  console.log('• [Test 1] 测试首次读取自动加载预置食谱...')
  const published = await repo.getPublishedRecipes()
  assert(published.length > 0, '应该成功加载预置公开食谱')
  console.log(`  ✅ 通过：成功获取 ${published.length} 道公开预置食谱`)

  // 2. 测试合法草稿保存
  console.log('• [Test 2] 测试保存合规草稿...')
  const draftRecipe: VisualRecipeV3 = {
    id: 'test-draft-001',
    version: '3.0',
    status: 'draft',
    title: '测试草稿食谱',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {},
    ingredients: [{ id: 'i1', name: '鸡蛋', amountText: '2 个', category: 'main' }],
    actionBlocks: [{ id: 'b1', stageIndex: 0, ingredientIds: ['i1'], label: '煎蛋' }],
    finalBlock: { method: 'fry', label: '出锅' },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }

  const saveDraftRes = await repo.saveRecipe(draftRecipe)
  assert.strictEqual(saveDraftRes.ok, true, '草稿应该成功保存')
  const foundDraft = await repo.getRecipeById('test-draft-001')
  assert.strictEqual(foundDraft?.title, '测试草稿食谱', '根据 ID 查出的草稿标题应该一致')
  console.log('  ✅ 通过：草稿成功保存并能按 ID 正确检索')

  // 3. 测试非法发布阻断 (缺失必填标题)
  console.log('• [Test 3] 测试发布阻断拦截 (缺少食谱标题)...')
  const invalidPublishRecipe: VisualRecipeV3 = {
    ...draftRecipe,
    id: 'test-invalid-pub',
    title: '   ', // 空白标题
    status: 'published'
  }
  const saveInvalidRes = await repo.saveRecipe(invalidPublishRecipe)
  assert.strictEqual(saveInvalidRes.ok, false, '缺失标题时发布应该被拒绝拦截')
  assert(saveInvalidRes.validation.errors.some(e => e.code === 'MISSING_TITLE'), '错误列表应包含 MISSING_TITLE')
  console.log('  ✅ 通过：发布阻断算子成功拦截非法输入')

  // 4. 测试孤立 ActionBlock 发布阻断
  console.log('• [Test 4] 测试发布阻断拦截 (孤立工序无关联食材)...')
  const isolatedBlockRecipe: VisualRecipeV3 = {
    ...draftRecipe,
    id: 'test-isolated-block',
    status: 'published',
    actionBlocks: [{ id: 'b_iso', stageIndex: 0, ingredientIds: [], label: '无食材工序' }] // ingredientIds 为空
  }
  const saveIsoRes = await repo.saveRecipe(isolatedBlockRecipe)
  assert.strictEqual(saveIsoRes.ok, false, '孤立工序节点发布应该被阻断')
  assert(saveIsoRes.validation.errors.some(e => e.code === 'ISOLATED_ACTION_BLOCK'), '错误列表应包含 ISOLATED_ACTION_BLOCK')
  console.log('  ✅ 通过：孤立工序节点发布阻断校验正确生效')

  // 5. 测试软删除与回收站恢复
  console.log('• [Test 5] 测试软删除与回收站恢复...')
  const deleteOk = await repo.softDeleteRecipe('test-draft-001')
  assert.strictEqual(deleteOk, true, '软删除应该返回 true')

  const deletedList = await repo.getDeletedRecipes()
  assert(deletedList.some(r => r.id === 'test-draft-001'), '回收站应包含被删除的记录')

  const normalList = await repo.getAllRecipes()
  assert(!normalList.some(r => r.id === 'test-draft-001'), '正常列表不应包含已被软删除的记录')

  const restoreOk = await repo.restoreRecipe('test-draft-001')
  assert.strictEqual(restoreOk, true, '恢复记录应该返回 true')

  const normalListAfterRestore = await repo.getAllRecipes()
  assert(normalListAfterRestore.some(r => r.id === 'test-draft-001'), '恢复后正常列表应重新出现该记录')
  console.log('  ✅ 通过：软删除、回收站隔离与记录恢复完美动作')

  // 6. 测试物理删除
  console.log('• [Test 6] 测试永久物理删除...')
  const permDeleteOk = await repo.permanentlyDeleteRecipe('test-draft-001')
  assert.strictEqual(permDeleteOk, true, '物理删除应该返回 true')
  const recordAfterPermDelete = await repo.getRecipeById('test-draft-001')
  assert.strictEqual(recordAfterPermDelete, null, '永久删除后不应查到任何记录')
  console.log('  ✅ 通过：永久物理删除符合预置要求')

  console.log('\n================================================================')
  console.log('  🎉 所有 6 组 Repository & Store 回归测试用例 100% 验证通过！ ')
  console.log('================================================================\n')
}

runRepositoryTests().catch(err => {
  console.error('❌ 回归测试捕获到致命异常:', err)
  process.exit(1)
})
