import fs from 'node:fs'
import path from 'node:path'
import { CHINESE_HEALTHY_RECIPES } from '../src/data/chineseHealthyRecipes'
import { espressoBrowniesV3 } from '../src/data/v3Examples'
import { generatePageSvgString } from '../src/utils/exportFlowCard'
import { buildV3ContinuousTableLayout, canRenderContinuousTable } from '../src/utils/continuousTableLayout'

const outDir = path.join(process.cwd(), 'reports', 'visual-artifacts')
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true })
}

const targets = [
  { id: 'cn-14-zhurou-dun-fentiao', recipe: CHINESE_HEALTHY_RECIPES.find(r => r.id === 'cn-14-zhurou-dun-fentiao')! },
  { id: 'cn-59-qincai-niurou', recipe: CHINESE_HEALTHY_RECIPES.find(r => r.id === 'cn-59-qincai-niurou')! },
  { id: 'cn-20-banli-jiding', recipe: CHINESE_HEALTHY_RECIPES.find(r => r.id === 'cn-20-banli-jiding')! },
  { id: 'v3-espresso-brownies', recipe: espressoBrowniesV3 },
]

for (const target of targets) {
  const { id, recipe } = target
  if (!recipe) continue

  // 1. Table Mode SVG (如果支持连续表格)
  const canTable = canRenderContinuousTable(recipe).canRender
  if (canTable) {
    const tableSvg = generatePageSvgString(recipe, 0, 1, undefined, 'full', 'table')
    const tablePath = path.join(outDir, `${id}_table.svg`)
    fs.writeFileSync(tablePath, tableSvg.svgString, 'utf8')
    console.log(`✅ 成功导出 Table SVG: ${id}_table.svg (${tableSvg.width}x${tableSvg.height})`)
  }

  // 2. Flow Mode SVG
  const flowSvg = generatePageSvgString(recipe, 0, 1, undefined, 'full', 'flow')
  const flowPath = path.join(outDir, `${id}_flow.svg`)
  fs.writeFileSync(flowPath, flowSvg.svgString, 'utf8')
  console.log(`✅ 成功导出 Flow SVG: ${id}_flow.svg (${flowSvg.width}x${flowSvg.height})`)
}
