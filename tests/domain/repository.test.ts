import assert from 'assert'
import { LocalRecipeRepository } from '../../src/repositories/LocalRecipeRepository'
import { resolveRecipeMutationState } from '../../src/repositories/recipeMutationState'
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
  assert.strictEqual(published.length, 121, '本地正式预置口径应为 121 道')
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
    contentVersion: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }

  const saveDraftRes = await repo.saveRecipe(draftRecipe)
  assert.strictEqual(saveDraftRes.ok, true, '草稿应该成功保存')
  const foundDraft = await repo.getRecipeById('test-draft-001')
  assert.strictEqual(foundDraft?.title, '测试草稿食谱', '根据 ID 查出的草稿标题应该一致')
  const hiddenDraft = await repo.getPublishedRecipeById('test-draft-001')
  assert.strictEqual(hiddenDraft, null, '公开详情接口不得返回草稿')
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

  // 5. 测试公开详情只返回 published 且未删除记录
  console.log('• [Test 5] 测试公开详情读取边界...')
  const publicRecipe: VisualRecipeV3 = {
    ...draftRecipe,
    id: 'test-public-001',
    status: 'published'
  }
  const savePublicRes = await repo.saveRecipe(publicRecipe)
  assert.strictEqual(savePublicRes.ok, true, '合规公开食谱应该保存成功')
  assert(await repo.getPublishedRecipeById(publicRecipe.id), '公开详情应返回已发布记录')
  const publicDelete = await repo.softDeleteRecipe(publicRecipe.id, publicRecipe.contentVersion)
  assert.strictEqual(publicDelete.status, 'confirmed', '公开食谱软删除必须获得确认结果')
  assert.strictEqual(await repo.getPublishedRecipeById(publicRecipe.id), null, '公开详情不得返回软删除记录')
  console.log('  ✅ 通过：草稿与软删除记录不会出现在公开详情')

  // 6. 测试软删除与回收站恢复
  console.log('• [Test 6] 测试软删除与回收站恢复...')
  const deleteResult = await repo.softDeleteRecipe('test-draft-001', 1)
  assert.strictEqual(deleteResult.status, 'confirmed', '软删除应该返回 confirmed')
  const firstDeletedAt = deleteResult.recipe?.deletedAt

  const repeatedDelete = await repo.softDeleteRecipe('test-draft-001', 1)
  assert.strictEqual(repeatedDelete.status, 'confirmed', '重复软删除必须保持幂等成功')
  assert.strictEqual(repeatedDelete.recipe?.deletedAt, firstDeletedAt, '重复软删除不得重写删除时间')

  const deletedList = await repo.getDeletedRecipes()
  assert(deletedList.some(r => r.id === 'test-draft-001'), '回收站应包含被删除的记录')

  const normalList = await repo.getAllRecipes()
  assert(!normalList.some(r => r.id === 'test-draft-001'), '正常列表不应包含已被软删除的记录')

  const restoreResult = await repo.restoreRecipe('test-draft-001', 1)
  assert.strictEqual(restoreResult.status, 'confirmed', '恢复记录应该返回 confirmed')

  const repeatedRestore = await repo.restoreRecipe('test-draft-001', 1)
  assert.strictEqual(repeatedRestore.status, 'confirmed', '重复恢复必须保持幂等成功')

  const normalListAfterRestore = await repo.getAllRecipes()
  assert(normalListAfterRestore.some(r => r.id === 'test-draft-001'), '恢复后正常列表应重新出现该记录')
  console.log('  ✅ 通过：软删除、回收站隔离与记录恢复完美动作')

  // 7. 测试版本冲突不会改变状态
  console.log('• [Test 7] 测试删除版本冲突阻断...')
  const conflictResult = await repo.softDeleteRecipe('test-draft-001', 99)
  assert.strictEqual(conflictResult.status, 'conflict', '版本不一致时必须返回 conflict')
  assert(await repo.getRecipeById('test-draft-001'), '版本冲突不得删除本地记录')
  console.log('  ✅ 通过：版本冲突不会覆盖或删除现有记录')

  // 8. 测试物理删除及重复请求幂等
  console.log('• [Test 8] 测试永久物理删除...')
  const rejectActiveDelete = await repo.permanentlyDeleteRecipe('test-draft-001', 1)
  assert.strictEqual(rejectActiveDelete.status, 'rejected', '未进入回收站的记录不得永久删除')
  await repo.softDeleteRecipe('test-draft-001', 1)
  const permDeleteResult = await repo.permanentlyDeleteRecipe('test-draft-001', 1)
  assert.strictEqual(permDeleteResult.status, 'confirmed', '物理删除应该返回 confirmed')
  const recordAfterPermDelete = await repo.getRecipeById('test-draft-001')
  assert.strictEqual(recordAfterPermDelete, null, '永久删除后不应查到任何记录')
  const repeatedPermDelete = await repo.permanentlyDeleteRecipe('test-draft-001', 1)
  assert.strictEqual(repeatedPermDelete.status, 'confirmed', '重复永久删除必须保持幂等确认')
  console.log('  ✅ 通过：永久物理删除与重复请求幂等行为符合预期')

  // 9. 测试云端重新读取后的四态判定
  console.log('• [Test 9] 测试 confirmed / rejected / conflict / unknown 状态判定...')
  const deletedCloudRecipe: VisualRecipeV3 = {
    ...draftRecipe,
    contentVersion: 2,
    deletedAt: new Date().toISOString(),
  }
  assert.strictEqual(resolveRecipeMutationState({
    action: 'soft-delete', id: draftRecipe.id, expectedVersion: 1,
    recipe: deletedCloudRecipe, mutationError: '响应中断',
  }).status, 'confirmed', '响应异常后重新读取到已删除状态，应判定为 confirmed')
  assert.strictEqual(resolveRecipeMutationState({
    action: 'restore', id: draftRecipe.id, expectedVersion: 1,
    recipe: deletedCloudRecipe,
  }).status, 'conflict', '远端版本变化且未恢复，应判定为 conflict')
  assert.strictEqual(resolveRecipeMutationState({
    action: 'restore', id: draftRecipe.id, expectedVersion: 2,
    recipe: deletedCloudRecipe, mutationError: 'permission denied',
  }).status, 'rejected', '服务器拒绝且状态未变化，应判定为 rejected')
  assert.strictEqual(resolveRecipeMutationState({
    action: 'permanent-delete', id: draftRecipe.id, expectedVersion: 2,
    recipe: null, readError: 'network timeout',
  }).status, 'unknown', '无法重新读取云端状态时必须保持 unknown')
  console.log('  ✅ 通过：响应中断后的云端确认与四态语义正确')

  console.log('\n================================================================')
  console.log('  🎉 所有 9 组 Repository & Store 回归测试用例 100% 验证通过！ ')
  console.log('================================================================\n')
}

runRepositoryTests().catch(err => {
  console.error('❌ 回归测试捕获到致命异常:', err)
  process.exit(1)
})
