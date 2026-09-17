import fs from 'node:fs'
import path from 'node:path'
import { BATCH1_MEAT_EGG } from '../src/data/recipes/chinese/batch1_meat_egg'
import { buildV3MatrixLayout } from '../src/utils/matrixFlowLayout'
import { generatePageSvgString } from '../src/utils/exportFlowCard'

const recipe = BATCH1_MEAT_EGG.find(item => item.id === 'cn-13')
if (!recipe) throw new Error('cn-13 not found')

const outputDir = path.resolve('reports/visual-artifacts')
fs.mkdirSync(outputDir, { recursive: true })
const layout = buildV3MatrixLayout(recipe)
const exported = generatePageSvgString(recipe, 0, 1, undefined, 'full', 'flow')
fs.writeFileSync(path.join(outputDir, 'cn-13-branch-topology.svg'), exported.svgString)
fs.writeFileSync(path.join(outputDir, 'cn-13-branch-topology.json'), JSON.stringify({
  canvas: { width: layout.canvasWidth, height: layout.canvasHeight },
  actions: layout.actionBlockLayouts.map(item => ({
    id: item.block.id,
    x: item.x,
    y: item.y,
    w: item.w,
    h: item.h,
  })),
  inputs: layout.ingredientConnectors,
  connectors: layout.connectorLayouts,
  final: layout.finalBlockLayout,
}, null, 2))

console.log(path.join(outputDir, 'cn-13-branch-topology.svg'))
