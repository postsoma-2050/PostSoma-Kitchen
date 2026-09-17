import assert from 'node:assert/strict'
import { espressoBrowniesV3 } from '../../src/data/v3Examples'
import { compareRecipeContent, hashRecipeContent } from '../../src/utils/recipeContentDiff'

const clone = structuredClone(espressoBrowniesV3)
clone.updatedAt = '2099-01-01T00:00:00.000Z'
clone.contentVersion = 999
clone.provenance = { ...clone.provenance!, locator: 'p. 42' }
clone.dataReview = {
  ...clone.dataReview!,
  overall: 'source_verified',
  ingredients: 'source_verified',
  quantities: 'source_verified',
  topology: 'source_verified',
  heatAndTiming: 'source_verified',
  reviewedBy: 'auditor',
  reviewedAt: '2099-01-01T00:00:00.000Z',
}

assert.equal(hashRecipeContent(espressoBrowniesV3), hashRecipeContent(clone), '存储与治理元数据不应造成烹饪内容差异')
assert.deepEqual(compareRecipeContent(espressoBrowniesV3, clone), [], '只改变存储或治理元数据应视为烹饪内容一致')

clone.ingredients[0].amountText = '999 g'
assert.notEqual(hashRecipeContent(espressoBrowniesV3), hashRecipeContent(clone), '嵌套食材变化必须改变内容指纹')
assert.ok(
  compareRecipeContent(espressoBrowniesV3, clone).some(diff => diff.field.endsWith('.amountText')),
  '差异报告必须定位到具体食材用量字段',
)

const dependencyClone = structuredClone(espressoBrowniesV3)
dependencyClone.actionBlocks[1].dependencies = [{ sourceBlockId: dependencyClone.actionBlocks[0].id, type: 'order' }]
assert.ok(
  compareRecipeContent(espressoBrowniesV3, dependencyClone).some(diff => diff.field.endsWith('.dependencies')),
  '依赖语义变化必须被识别',
)

console.log('✅ recipeContentDiff: 内容指纹与字段级差异定位通过')
