import assert from 'node:assert/strict'
import { hongShaoRouV3 } from '../../src/data/v3Examples'
import { buildCoverPublicationPlan, resolveConfirmedRecipeCover } from '../../src/domain/recipeCoverPublication'
import { normalizeRecipe } from '../../src/services/recipeNormalizer'

function run() {
  const base = normalizeRecipe(hongShaoRouV3)
  const publishedWithCover = { ...base, id: 'covered-published', status: 'published' as const, coverImageUrl: 'https://images.example.test/dish.jpg' }
  const draftWithCover = { ...base, id: 'covered-draft', status: 'draft' as const, coverImageUrl: '/recipe-covers/approved/dish.jpg' }
  const publishedWithoutCover = { ...base, id: 'missing-published', status: 'published' as const, coverImageUrl: '   ' }
  const draftWithoutCover = { ...base, id: 'missing-draft', status: 'draft' as const, coverImageUrl: undefined }
  const unsafeCover = { ...base, id: 'unsafe-cover', status: 'published' as const, coverImageUrl: 'http://images.example.test/dish.jpg' }
  const deleted = { ...base, id: 'deleted-covered', status: 'published' as const, coverImageUrl: 'https://images.example.test/deleted.jpg', deletedAt: '2026-08-04T00:00:00.000Z' }

  assert.equal(resolveConfirmedRecipeCover(publishedWithCover), publishedWithCover.coverImageUrl)
  assert.equal(resolveConfirmedRecipeCover(draftWithCover), draftWithCover.coverImageUrl)
  assert.equal(resolveConfirmedRecipeCover(unsafeCover), null, '非 HTTPS 外链不得形成公开发布依据')

  const plan = buildCoverPublicationPlan([
    publishedWithCover,
    draftWithCover,
    publishedWithoutCover,
    draftWithoutCover,
    unsafeCover,
    deleted,
  ])
  assert.equal(plan.total, 5, '回收站记录必须排除在批量状态整理之外')
  assert.equal(plan.confirmedCoverCount, 2)
  assert.equal(plan.missingCoverCount, 3)
  assert.deepEqual(plan.toPublish.map(item => item.recipe.id), ['covered-draft'])
  assert.deepEqual(plan.toDraft.map(item => item.recipe.id), ['missing-published', 'unsafe-cover'])
  assert.equal(plan.unchanged.length, 2)

  console.log('✅ 封面发布状态计划测试通过：正式字段优先、HTTPS/站内路径、草稿/发布与回收站边界均正确')
}

run()
