import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import {
  buildAdminBrowsePath,
  parseAdminBrowseQuery,
  resolveAdminReturnTarget,
  serializeAdminBrowseState,
} from '../../src/utils/adminNavigation'

function run() {
  const parsed = parseAdminBrowseQuery({
    method: 'steam',
    steps: 'medium',
    status: 'deleted',
    sort: 'ingredients-desc',
    page: '3',
  })
  assert.deepEqual(parsed, {
    method: 'steam',
    steps: 'medium',
    status: 'deleted',
    sort: 'ingredients-desc',
    page: 3,
  })
  assert.deepEqual(serializeAdminBrowseState(parsed), {
    method: 'steam',
    steps: 'medium',
    status: 'deleted',
    sort: 'ingredients-desc',
    page: '3',
  })
  assert.equal(buildAdminBrowsePath(parsed), '/admin?method=steam&steps=medium&status=deleted&sort=ingredients-desc&page=3')

  assert.equal(resolveAdminReturnTarget('/admin?status=deleted&sort=updated-asc&page=2#recipe-grid'), '/admin?status=deleted&sort=updated-asc&page=2#recipe-grid')
  assert.equal(resolveAdminReturnTarget(['/admin?method=fry']), '/admin?method=fry')
  assert.equal(resolveAdminReturnTarget('/'), '/admin')
  assert.equal(resolveAdminReturnTarget('/recipe/cn-01-yuxiang-rousi'), '/admin')
  assert.equal(resolveAdminReturnTarget('/admin/edit/cn-01-yuxiang-rousi'), '/admin')
  assert.equal(resolveAdminReturnTarget('https://example.com/admin'), '/admin')
  assert.equal(resolveAdminReturnTarget('//example.com/admin'), '/admin')
  assert.equal(resolveAdminReturnTarget(undefined), '/admin')

  const editorSource = fs.readFileSync(path.join(process.cwd(), 'src/views/RecipeEditorV3.vue'), 'utf8')
  const adminListSource = fs.readFileSync(path.join(process.cwd(), 'src/views/MyRecipes.vue'), 'utf8')
  const adminCardSource = fs.readFileSync(path.join(process.cwd(), 'src/components/recipe-flow-v3/RecipeCardV3.vue'), 'utf8')
  const publicDetailSource = fs.readFileSync(path.join(process.cwd(), 'src/views/RecipeDetailV3.vue'), 'utf8')
  assert.match(adminListSource, /path: '\/admin\/create'[\s\S]{0,120}returnTo: adminReturnTo/, '新建入口必须携带 Admin 返回上下文')
  assert.match(adminCardSource, /path: `\/admin\/edit\/\$\{recipe\.id\}`[\s\S]{0,120}returnTo: adminReturnTo/, '编辑入口必须携带 Admin 返回上下文')
  assert.match(editorSource, /返回 Kitchen Studio/, '编辑器管理出口必须明确返回 Kitchen Studio')
  assert.match(editorSource, /预览公开详情/, '保存成功弹窗必须明确公开预览语义')
  assert.match(editorSource, /@click="returnToKitchenStudio"[\s\S]{0,520}返回 Kitchen Studio/, '编辑器管理出口必须使用受限的 Admin 返回处理器')
  assert.match(editorSource, /:to="`\/recipe\/\$\{recipe\.id\}`"[\s\S]{0,520}预览公开详情/, '公开预览按钮必须明确指向当前食谱详情')
  assert.match(editorSource, /@click="showSaveModal = false"[\s\S]{0,520}继续编辑/, '关闭成功提示必须明确留在当前编辑页')
  assert.doesNotMatch(editorSource, /to="\/"[\s\S]{0,200}返回食谱库/, '编辑器不得再把管理返回按钮指向公开首页')
  assert.match(publicDetailSource, /to="\/"[\s\S]{0,200}返回食谱库/, '公开详情页必须继续返回公开食谱库')

  console.log('✅ Admin 导航上下文回归测试通过：筛选状态、受限 returnTo 与公开/管理路径保持隔离')
}

run()
