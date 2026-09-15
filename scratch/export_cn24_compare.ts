import * as fs from 'fs'
import { CHINESE_HEALTHY_RECIPES } from '../src/data/chineseHealthyRecipes'
import { buildV3MatrixLayout } from '../src/utils/matrixFlowLayout'
import { generatePageSvgString } from '../src/utils/exportFlowCard'

const r = CHINESE_HEALTHY_RECIPES.find(x => x.id === 'cn-24-jianzhi-fanqie-doufugeng')!

// 1. 当前重排后的 SVG
const currentSvg = generatePageSvgString(r, 0, 1).svgString
fs.writeFileSync('scratch/cn24_current.svg', currentSvg, 'utf-8')
console.log('Exported scratch/cn24_current.svg')

// 2. 纯粹 Cooking for Engineers 极简风格 (纯技法动词 + 无多余段落)
const minimalRecipe = JSON.parse(JSON.stringify(r))
minimalRecipe.actionBlocks[0].label = '爆香炒汁'
minimalRecipe.actionBlocks[0].sublabel = 'Sauté'
minimalRecipe.actionBlocks[0].notes = undefined

minimalRecipe.actionBlocks[1].label = '合煮蛋花'
minimalRecipe.actionBlocks[1].sublabel = 'Egg Drop'
minimalRecipe.actionBlocks[1].notes = undefined

minimalRecipe.finalBlock.label = '出锅装盘'
minimalRecipe.finalBlock.instructions = '趁热享用'

const minimalSvg = generatePageSvgString(minimalRecipe, 0, 1).svgString
fs.writeFileSync('scratch/cn24_minimal.svg', minimalSvg, 'utf-8')
console.log('Exported scratch/cn24_minimal.svg')
