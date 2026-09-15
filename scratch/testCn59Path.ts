import { CHINESE_HEALTHY_RECIPES } from '../src/data/chineseHealthyRecipes'
import { buildV3MatrixLayout } from '../src/utils/matrixFlowLayout'

const cn59 = CHINESE_HEALTHY_RECIPES.find(r => r.id === 'cn-59-qincai-niurou')!
const layout = buildV3MatrixLayout(cn59)
const b2 = layout.actionBlockLayouts.find(b => b.block.id === 'b2')!
const b3 = layout.actionBlockLayouts.find(b => b.block.id === 'b3')!
const b4 = layout.actionBlockLayouts.find(b => b.block.id === 'b4')!

console.log('b2:', { x: b2.x, y: b2.y, w: b2.w, h: b2.h, col: b2.computedColIndex })
console.log('b3:', { x: b3.x, y: b3.y, w: b3.w, h: b3.h, col: b3.computedColIndex })
console.log('b4:', { x: b4.x, y: b4.y, w: b4.w, h: b4.h, col: b4.computedColIndex })

const connB2B4 = layout.connectorLayouts.find(c => c.sourceBlockId === 'b2' && c.targetBlockId === 'b4')!
console.log('connB2B4 pathD:', connB2B4.pathD)
console.log('connB2B4 midPoint:', connB2B4.midPoint)

// Check test logic
const b3Layout = b3
const commands = connB2B4.pathD.match(/[MLQC][^MLQC]*/g) || []
let currX = 0, currY = 0
let penetratedB3 = false
for (const cmd of commands) {
  const type = cmd[0]
  const args = cmd.slice(1).trim().split(/[\s,]+/).map(Number)
  if (type === 'M') {
    currX = args[0]; currY = args[1]
  } else if (type === 'L') {
    const [x, y] = args
    for (let i = 0; i <= 20; i++) {
      const px = currX + (x - currX) * (i / 20)
      const py = currY + (y - currY) * (i / 20)
      if (px >= b3Layout.x && px <= b3Layout.x + b3Layout.w && py >= b3Layout.y && py <= b3Layout.y + b3Layout.h) {
        console.log(`L collision at (${px}, ${py}) vs b3 [${b3Layout.x}, ${b3Layout.x + b3Layout.w}] x [${b3Layout.y}, ${b3Layout.y + b3Layout.h}]`)
        penetratedB3 = true
      }
    }
    currX = x; currY = y
  } else if (type === 'Q') {
    const [cx, cy, x, y] = args
    for (let i = 0; i <= 20; i++) {
      const t = i / 20, mt = 1 - t
      const px = mt * mt * currX + 2 * mt * t * cx + t * t * x
      const py = mt * mt * currY + 2 * mt * t * cy + t * t * y
      if (px >= b3Layout.x && px <= b3Layout.x + b3Layout.w && py >= b3Layout.y && py <= b3Layout.y + b3Layout.h) {
        console.log(`Q collision at (${px}, ${py})`)
        penetratedB3 = true
      }
    }
    currX = x; currY = y
  } else if (type === 'C') {
    const [c1x, c1y, c2x, c2y, x, y] = args
    for (let i = 0; i <= 20; i++) {
      const t = i / 20, mt = 1 - t
      const px = mt * mt * mt * currX + 3 * mt * mt * t * c1x + 3 * mt * t * t * c2x + t * t * t * x
      const py = mt * mt * mt * currY + 3 * mt * mt * t * c1y + 3 * mt * t * t * c2y + t * t * t * y
      if (px >= b3Layout.x && px <= b3Layout.x + b3Layout.w && py >= b3Layout.y && py <= b3Layout.y + b3Layout.h) {
        console.log(`C collision at (${px}, ${py})`)
        penetratedB3 = true
      }
    }
    currX = x; currY = y
  }
}
console.log('penetratedB3:', penetratedB3)
