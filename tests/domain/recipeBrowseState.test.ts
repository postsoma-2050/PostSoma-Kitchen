import assert from 'node:assert/strict'
import {
  clampRecipePage,
  getPaginationItems,
  parseRecipeBrowseQuery,
  serializeRecipeBrowseState,
} from '../../src/utils/recipeBrowseState'

function run() {
  const parsed = parseRecipeBrowseQuery({
    page: '3',
    q: '  鸡肉  ',
    method: 'fry',
    cuisine: 'chinese',
    difficulty: 'medium',
    sort: 'steps-asc',
  })

  assert.deepEqual(parsed, {
    page: 3,
    q: '鸡肉',
    method: 'fry',
    cuisine: 'chinese',
    difficulty: 'medium',
    sort: 'steps-asc',
  })
  assert.deepEqual(serializeRecipeBrowseState(parsed), {
    page: '3',
    q: '鸡肉',
    method: 'fry',
    cuisine: 'chinese',
    difficulty: 'medium',
    sort: 'steps-asc',
  })

  assert.equal(parseRecipeBrowseQuery({ page: '-2', method: 'invalid' }).page, 1)
  assert.equal(parseRecipeBrowseQuery({ page: '-2', method: 'invalid' }).method, 'all')
  assert.equal(clampRecipePage(99, 121), 14)
  assert.equal(clampRecipePage(4, 0), 1)
  assert.deepEqual(getPaginationItems(1, 13), [1, 2, 3, 4, 5, 'ellipsis-right', 13])
  assert.deepEqual(getPaginationItems(7, 13), [1, 'ellipsis-left', 6, 7, 8, 'ellipsis-right', 13])
  assert.deepEqual(getPaginationItems(13, 13), [1, 'ellipsis-left', 9, 10, 11, 12, 13])

  console.log('✅ 首页分页与 URL 状态回归测试通过')
}

run()
