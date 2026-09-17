import assert from 'node:assert/strict'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const root = process.cwd()
const sourceRoot = join(root, 'src')
const allowedVisualizationSvgs = new Set([
  'src/components/recipe-flow-v3/RecipeFlowCanvasV3.vue',
  'src/components/recipe-flow-v3/RecipeMiniCanvasV3.vue',
])

function listVueFiles(directory: string): string[] {
  return readdirSync(directory).flatMap(name => {
    const path = join(directory, name)
    return statSync(path).isDirectory()
      ? listVueFiles(path)
      : path.endsWith('.vue') ? [path] : []
  })
}

const vueFiles = listVueFiles(sourceRoot)
const cannedEmojiPattern = /[\u{1F1E6}-\u{1FAFF}\u{2600}-\u{26FF}]|✅|❌|✕|↩️/u
const emojiViolations: string[] = []
const rawSvgViolations: string[] = []

for (const file of vueFiles) {
  const relativePath = relative(root, file)
  const source = readFileSync(file, 'utf8')
  if (cannedEmojiPattern.test(source)) emojiViolations.push(relativePath)
  if (source.includes('<svg') && !allowedVisualizationSvgs.has(relativePath)) {
    rawSvgViolations.push(relativePath)
  }
}

assert.deepEqual(
  emojiViolations,
  [],
  `业务界面不得使用 Emoji 充当图标，请改用 AppIcon：${emojiViolations.join(', ')}`,
)
assert.deepEqual(
  rawSvgViolations,
  [],
  `普通界面不得重复绘制手写 SVG，请改用 AppIcon：${rawSvgViolations.join(', ')}`,
)

const packageJson = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))
assert.equal(
  packageJson.dependencies?.['@remixicon/vue'],
  '^4.9.0',
  '图标系统必须锁定 Remix Icon Vue 依赖',
)

console.log(`✅ 全站图标规范测试通过：${vueFiles.length} 个 Vue 组件无界面 Emoji，手写 SVG 仅保留给流程图几何。`)
