import type { VisualRecipeV3 } from '../src/types/recipeV3'
import { canRenderContinuousTable, getMaterialUpstreamIds } from '../src/utils/continuousTableLayout'

// Case 1: 跳行夹带 [0, 2]
const recipeGap: any = {
  id: 'test-gap',
  title: '测试跳行',
  cuisine: 'chinese',
  difficulty: 'easy',
  prerequisites: { containerSize: '锅' },
  ingredients: [
    { id: 'i1', name: '食材0', amountText: '100g', category: 'main' },
    { id: 'i2', name: '无关食材1', amountText: '100g', category: 'main' },
    { id: 'i3', name: '食材2', amountText: '100g', category: 'main' },
  ],
  actionBlocks: [
    {
      id: 'b1',
      label: '跳行炒',
      ingredientIds: ['i1', 'i3'], // 行 0 和 行 2，跳过行 1
      stageIndex: 0,
    }
  ],
  finalBlock: { label: '装盘', method: 'plating' }
}

// Case 2: Legacy 依赖
const recipeLegacy: any = {
  id: 'test-legacy',
  title: '测试Legacy',
  cuisine: 'chinese',
  difficulty: 'easy',
  prerequisites: { containerSize: '锅' },
  ingredients: [
    { id: 'i1', name: '食材0', amountText: '100g', category: 'main' },
    { id: 'i2', name: '食材1', amountText: '100g', category: 'main' },
  ],
  actionBlocks: [
    { id: 'b1', label: '工序1', ingredientIds: ['i1'], stageIndex: 0 },
    {
      id: 'b2',
      label: '工序2',
      ingredientIds: ['i2'],
      stageIndex: 1,
      dependencies: [{ sourceBlockId: 'b1', type: 'legacy' }]
    }
  ],
  finalBlock: { label: '装盘', method: 'plating' }
}

// Case 3: 同列区域冲突 [0, 1] 和 [1, 2]
const recipeConflict: any = {
  id: 'test-conflict',
  title: '测试冲突',
  cuisine: 'chinese',
  difficulty: 'easy',
  prerequisites: { containerSize: '锅' },
  ingredients: [
    { id: 'i1', name: '食材0', amountText: '100g', category: 'main' },
    { id: 'i2', name: '食材1', amountText: '100g', category: 'main' },
    { id: 'i3', name: '食材2', amountText: '100g', category: 'main' },
  ],
  actionBlocks: [
    { id: 'b1', label: '工序A', ingredientIds: ['i1', 'i2'], stageIndex: 0 },
    { id: 'b2', label: '工序B', ingredientIds: ['i2', 'i3'], stageIndex: 0 },
  ],
  finalBlock: { label: '装盘', method: 'plating' }
}

console.log('Case 1 (Gap):', canRenderContinuousTable(recipeGap))
console.log('Case 2 (Legacy):', canRenderContinuousTable(recipeLegacy))
console.log('Case 3 (Conflict):', canRenderContinuousTable(recipeConflict))
