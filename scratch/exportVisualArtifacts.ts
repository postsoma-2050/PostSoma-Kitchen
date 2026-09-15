import fs from 'node:fs'
import path from 'node:path'
import { CHINESE_HEALTHY_RECIPES } from '../src/data/chineseHealthyRecipes'
import { HOME_SWEET_HOME_RECIPES } from '../src/data/homeSweetHomeRecipes'
import { generatePageSvgString } from '../src/utils/exportFlowCard'
import { buildV3MatrixLayout } from '../src/utils/matrixFlowLayout'

const outDir = path.join(process.cwd(), 'reports', 'visual-artifacts')
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true })
}

const recipesToExport = [
  'cn-59-qincai-niurou',
  'cn-43-jiangzhi-wosun',
  'cn-01-yuxiang-rousi',
  'hsh-16-hashbrown-casserole',
]

const summary: any[] = []

for (const id of recipesToExport) {
  const recipe = [...CHINESE_HEALTHY_RECIPES, ...HOME_SWEET_HOME_RECIPES].find(r => r.id === id)
  if (recipe) {
    const res = generatePageSvgString(recipe, 0, 1)
    const outPath = path.join(outDir, `${id}.svg`)
    fs.writeFileSync(outPath, res.svgString, 'utf8')

    const layout = buildV3MatrixLayout(recipe)
    summary.push({
      id,
      title: recipe.title,
      svgPath: outPath,
      dimensions: { width: res.width, height: res.height },
      blocks: layout.actionBlockLayouts.map(b => ({
        id: b.block.id,
        label: b.block.label,
        col: b.computedColIndex,
        pos: { x: b.x, y: b.y, w: b.w, h: b.h },
      })),
      connectors: layout.connectorLayouts.map(c => ({
        id: c.id,
        from: c.sourceBlockId,
        to: c.targetBlockId || c.targetType,
        type: c.type,
        isOrder: c.isOrder,
        isMaterial: c.isMaterial,
        label: c.label,
        pathD: c.pathD,
      })),
      finalBlock: {
        method: layout.finalBlockLayout.finalBlock.method,
        label: layout.finalBlockLayout.finalBlock.label,
        instructions: layout.finalBlockLayout.finalBlock.instructions,
      },
    })
    console.log(`✅ 成功导出 SVG 交付件: ${id} (${res.width}x${res.height}) -> ${outPath}`)
  }
}

fs.writeFileSync(path.join(outDir, 'visual-summary.json'), JSON.stringify(summary, null, 2), 'utf8')
console.log('✅ 视觉导出摘要已保存至 reports/visual-artifacts/visual-summary.json')
