import fs from 'fs'
import path from 'path'

// 1. 读取并重构 v3Examples.ts
const v3ExamplesPath = path.join(process.cwd(), 'src/data/v3Examples.ts')
let v3Content = fs.readFileSync(v3ExamplesPath, 'utf8')

// 替换 hongShaoRouV3 中的复合食材
v3Content = v3Content.replace(
  `        { id: 'i1', name: '生姜片 & 葱段', amountText: '20 g', category: 'produce' },`,
  `        { id: 'i1_1', name: '生姜片', amountText: '10 g', category: 'produce' },\n        { id: 'i1_2', name: '大葱段', amountText: '10 g', category: 'produce' },`
)
v3Content = v3Content.replace(
  `        { id: 'i5', name: '八角 & 桂皮', amountText: '2 朵 / 1 块', category: 'seasoning' },`,
  `        { id: 'i5_1', name: '八角', amountText: '2 朵', category: 'seasoning' },\n        { id: 'i5_2', name: '桂皮', amountText: '1 块', category: 'seasoning' },`
)
v3Content = v3Content.replace(
  `        { id: 'i6', name: '生抽 & 老抽', amountText: '20 mL / 10 mL', category: 'liquid' },`,
  `        { id: 'i6_1', name: '生抽', amountText: '20 mL', category: 'liquid' },\n        { id: 'i6_2', name: '老抽', amountText: '10 mL', category: 'liquid' },`
)
v3Content = v3Content.replace(
  `ingredientIds: ['i0', 'i1', 'i2'],`,
  `ingredientIds: ['i0', 'i1_1', 'i1_2', 'i2'],`
)
v3Content = v3Content.replace(
  `ingredientIds: ['i0', 'i1', 'i2', 'i3', 'i4', 'i5', 'i6', 'i7'],`,
  `ingredientIds: ['i0', 'i1_1', 'i1_2', 'i2', 'i3', 'i4', 'i5_1', 'i5_2', 'i6_1', 'i6_2', 'i7'],`
)

// 替换 caesarSaladV3 中的复合食材
v3Content = v3Content.replace(
  `        { id: 'i8', name: '现磨黑胡椒 & 食盐', amountText: '适量', category: 'seasoning' }`,
  `        { id: 'i8_1', name: '现磨黑胡椒', amountText: '适量', category: 'seasoning' },\n        { id: 'i8_2', name: '食盐', amountText: '适量', category: 'seasoning' }`
)
v3Content = v3Content.replace(
  `ingredientIds: ['i0', 'i1', 'i2', 'i3', 'i4', 'i5', 'i6', 'i7', 'i8'],`,
  `ingredientIds: ['i0', 'i1', 'i2', 'i3', 'i4', 'i5', 'i6', 'i7', 'i8_1', 'i8_2'],`
)

fs.writeFileSync(v3ExamplesPath, v3Content, 'utf8')
console.log('✅ v3Examples.ts 复合食材原子化拆解成功！')
