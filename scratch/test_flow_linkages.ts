import { CHINESE_HEALTHY_RECIPES } from '../src/data/chineseHealthyRecipes'
import { buildV3MatrixLayout } from '../src/utils/matrixFlowLayout'

const cn59 = CHINESE_HEALTHY_RECIPES.find(r => r.id === 'cn-59-qincai-niurou')!
const cn12 = CHINESE_HEALTHY_RECIPES.find(r => r.id === 'cn-12-xihongshi-jidan')!
const cn01 = CHINESE_HEALTHY_RECIPES.find(r => r.id === 'cn-01-yuxiang-rousi')!

console.log('Testing cn-59 flow layout...')
const layout59 = buildV3MatrixLayout(cn59)
console.log('cn-59 action blocks count:', layout59.actionBlockLayouts.length)
layout59.actionBlockLayouts.forEach(b => {
  console.log(` - Block ${b.block.id} (${b.block.label}): Col ${b.computedColIndex}, x=${b.x}, y=${b.y}, w=${b.w}, h=${b.h}, intakeRowYs=${b.intakeRowYs}`)
})

console.log('\nTesting cn-12 flow layout...')
const layout12 = buildV3MatrixLayout(cn12)
console.log('cn-12 action blocks count:', layout12.actionBlockLayouts.length)
layout12.actionBlockLayouts.forEach(b => {
  console.log(` - Block ${b.block.id} (${b.block.label}): Col ${b.computedColIndex}, x=${b.x}, y=${b.y}, w=${b.w}, h=${b.h}, intakeRowYs=${b.intakeRowYs}`)
})

console.log('\nTesting cn-01 flow layout...')
const layout01 = buildV3MatrixLayout(cn01)
console.log('cn-01 action blocks count:', layout01.actionBlockLayouts.length)
layout01.actionBlockLayouts.forEach(b => {
  console.log(` - Block ${b.block.id} (${b.block.label}): Col ${b.computedColIndex}, x=${b.x}, y=${b.y}, w=${b.w}, h=${b.h}, intakeRowYs=${b.intakeRowYs}`)
})
