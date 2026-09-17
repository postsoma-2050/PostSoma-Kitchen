import assert from 'node:assert/strict'
import { hongShaoRouV3 } from '../../src/data/v3Examples'
import {
  buildCoverPublicationPlan,
  filterRecipesWithConfirmedCovers,
  filterPubliclyBrowsableRecipes,
  resolveConfirmedRecipeCover,
} from '../../src/domain/recipeCoverPublication'
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

  const publicBrowseRecipes = filterRecipesWithConfirmedCovers([
    publishedWithCover,
    draftWithCover,
    publishedWithoutCover,
    unsafeCover,
    deleted,
  ])
  assert.deepEqual(
    publicBrowseRecipes.map(recipe => recipe.id),
    ['covered-published'],
    '公开浏览入口必须排除草稿、无封面、非法封面和回收站记录',
  )

  const failedCoverIds = new Set(['covered-published'])
  assert.deepEqual(
    filterRecipesWithConfirmedCovers(publicBrowseRecipes, failedCoverIds).map(recipe => recipe.id),
    [],
    '图片运行时加载失败后必须从当前浏览结果中移除',
  )

  const allBrowsable = filterPubliclyBrowsableRecipes([
    publishedWithCover,
    draftWithCover,
    publishedWithoutCover,
    unsafeCover,
    deleted,
  ])
  assert.deepEqual(
    allBrowsable.map(recipe => recipe.id),
    ['covered-published', 'missing-published', 'unsafe-cover'],
    '全量公开浏览入口必须包含所有已发布且未删除的食谱，无封面或非HTTPS封面通过占位图兜底渲染',
  )

  console.log('✅ 封面发布状态测试通过：正式字段优先、公开列表隐藏缺图/坏图、草稿/发布与回收站边界均正确，全量公开浏览准入正确')
}

run()
