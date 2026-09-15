import type { VisualRecipeV3 } from '../src/types/recipeV3'
import { canRenderContinuousTable, buildV3ContinuousTableLayout } from '../src/utils/continuousTableLayout'

export const testCn14Model: VisualRecipeV3 = {
  id: 'cn-14-zhurou-dun-fentiao',
  version: '3.0',
  status: 'draft',
  title: '🍲 经典东北猪肉炖粉条',
  description: '传统东北名菜。参考张晔原著五花肉焯水炒糖色炖粉条做法。注：原著调味为合并项，分拆生抽老抽、植物油与滚开水用量及单锅分步耗时（焯水4m/炒糖3m/焖炖25m/合炖15m）属通用烹饪规律建模草稿，待厨房实测验证。',
  cuisine: 'chinese',
  difficulty: 'medium',
  prerequisites: {
    containerSize: '深口炖锅 / 砂锅',
    preheat: '红薯粉条提前温水泡软，土豆去皮切滚刀块',
    servings: '4-5 人份'
  },
  ingredients: [
    { id: 'i1', name: '带皮五花肉 (切厚块)', amountText: '200 g', category: 'main', note: '原著食材，需冷水下锅焯透' },
    { id: 'i2', name: '白糖 (炒糖色)', amountText: '10 g', category: 'seasoning', note: '原著调味，小火慢炒出微泡琥珀色' },
    { id: 'i3', name: '植物油 (滑锅炒糖)', amountText: '10 g', category: 'liquid', note: '通用烹饪必要油脂，待核实原著是否单独标示' },
    { id: 'i4', name: '生姜片', amountText: '5 g', category: 'produce', note: '原著调料，去腥提鲜' },
    { id: 'i5', name: '大葱段', amountText: '10 g', category: 'produce', note: '原著调料，增香炝锅' },
    { id: 'i6', name: '花椒', amountText: '1 g', category: 'seasoning', note: '原著调料，传统东北风味' },
    { id: 'i7', name: '八角', amountText: '1 枚', category: 'seasoning', note: '通用烹饪资料支持，待核实原著是否包含' },
    { id: 'i8', name: '料酒 (去腥)', amountText: '10 g', category: 'liquid', note: '原著调料' },
    { id: 'i9', name: '生抽 (定咸鲜味)', amountText: '10 g', category: 'liquid', note: '原著酱油分拆，负责底味' },
    { id: 'i10', name: '老抽 (炖肉调色)', amountText: '5 g', category: 'liquid', note: '原著酱油分拆，负责红亮色泽' },
    { id: 'i11', name: '滚开水 (炖肉汤底)', amountText: '800 ml', category: 'liquid', note: '保证肉汤浓郁足量，待实测蒸发量' },
    { id: 'i12', name: '红薯粉条 (提前泡软)', amountText: '100 g', category: 'grain', note: '原著主料，后加避免过早糊化' },
    { id: 'i13', name: '土豆 (切滚刀块)', amountText: '100 g', category: 'produce', note: '原著主料，后加保持软糯成块' },
    { id: 'i14', name: '食盐 (出锅定味)', amountText: '3 g', category: 'seasoning', note: '后加定味，待核实原著是否另加盐' }
  ],
  actionBlocks: [
    {
      id: 'b1',
      label: '冷水焯肉',
      sublabel: 'Blanch Pork',
      ingredientIds: ['i1'],
      stageIndex: 0,
      heatLevel: '大火',
      durationMinutes: 4,
      equipment: '焯水锅',
      outputItem: '焯透五花肉',
      completionState: '大火沸腾撇净浮沫，肉块断生捞出',
      note: '五花肉块冷水下锅大火烧开，撇净浮沫后捞出，温水冲洗沥干备用'
    },
    {
      id: 'b2',
      label: '煸炒上色',
      sublabel: 'Caramelize & Brown',
      ingredientIds: ['i1', 'i2', 'i3'],
      dependencies: [{ sourceBlockId: 'b1', type: 'material', label: '焯透五花肉' }],
      stageIndex: 1,
      heatLevel: '中火',
      durationMinutes: 3,
      equipment: '深口炖锅',
      outputItem: '糖色五花肉',
      completionState: '微泡呈琥珀色，肉块裹色微煸出油',
      note: '锅中倒油下白糖，小火慢炒出微泡琥珀色，倒入肉块翻炒上色微煸出油'
    },
    {
      id: 'b3',
      label: '炝锅加汤',
      sublabel: 'Aromatics & Broth',
      ingredientIds: ['i1', 'i4', 'i5', 'i6', 'i7', 'i8', 'i9', 'i10', 'i11'],
      dependencies: [{ sourceBlockId: 'b2', type: 'material', label: '糖色五花肉' }],
      stageIndex: 2,
      heatLevel: '中火',
      durationMinutes: 2,
      equipment: '深口炖锅',
      outputItem: '浓醇炖肉汤底',
      completionState: '香料爆香，汤底大火烧沸',
      note: '下葱姜香料爆出香气，淋入生抽老抽料酒，冲入滚开水大火烧沸'
    },
    {
      id: 'b4',
      label: '慢火焖炖',
      sublabel: 'Simmer Pork',
      ingredientIds: ['i1'],
      dependencies: [{ sourceBlockId: 'b3', type: 'material', label: '浓醇炖肉汤底' }],
      stageIndex: 3,
      heatLevel: '小火',
      durationMinutes: 25,
      equipment: '深口炖锅',
      outputItem: '酥软五花肉',
      completionState: '盖盖小火慢煨，肉酥汤浓红亮',
      note: '盖上锅盖转小火慢炖 25 分钟，让五花肉酥软透味，肉汤红亮浓醇'
    },
    {
      id: 'b5',
      label: '汇入同炖',
      sublabel: 'Stew with Noodles & Potato',
      ingredientIds: ['i1', 'i12', 'i13', 'i14'],
      dependencies: [{ sourceBlockId: 'b4', type: 'material', label: '酥软五花肉' }],
      stageIndex: 4,
      heatLevel: '小火',
      durationMinutes: 15,
      equipment: '深口炖锅',
      outputItem: '炖透粉条五花肉',
      completionState: '粉条滑爽透亮，土豆软糯粉甜',
      note: '加入土豆块与泡软粉条轻推入浓汤，调入食盐，小火慢炖 15 分钟至粉条透亮、土豆粉糯'
    }
  ],
  finalBlock: {
    method: 'stew',
    label: '出锅装盘 🍲',
    durationText: '约 50 分钟',
    instructions: '开大火收浓汤汁，盛入砂锅大碗趁热享用。粉条滑爽透亮吸饱肉汤，土豆软糯粉甜，五花肉酥烂不腻。'
  },
  createdAt: '2016-09-01T00:00:00Z',
  updatedAt: '2026-09-14T14:50:00Z'
}

const check = canRenderContinuousTable(testCn14Model)
console.log('canRenderContinuousTable check:', check)

if (check.canRender) {
  const layout = buildV3ContinuousTableLayout(testCn14Model)
  console.log('Layout generated successfully!')
  console.log({
    width: layout.canvasWidth,
    height: layout.canvasHeight,
    colWidths: layout.actionColWidths,
    processCells: layout.processCells.map(p => ({
      id: p.id,
      label: p.label,
      startRow: p.startRow,
      endRow: p.endRow,
      spanRows: p.spanRows,
      colIndex: p.colIndex,
      y: p.y,
      h: p.h
    })),
    waitingLanesCount: layout.waitingLanes.length
  })
}

import { validateRecipe } from '../src/utils/taxonomyMatcher'
import { normalizeRecipe } from '../src/services/recipeNormalizer'

const validated = validateRecipe(normalizeRecipe(testCn14Model))
console.log('validateRecipe result:', {
  canPublish: validated.canPublish,
  errors: validated.errors,
  warnings: validated.warnings
})
