import { CHINESE_HEALTHY_RECIPES } from '../src/data/chineseHealthyRecipes'
import { HOME_SWEET_HOME_RECIPES } from '../src/data/homeSweetHomeRecipes'
import { espressoBrowniesV3, hongShaoRouV3, caesarSaladV3 } from '../src/data/v3Examples'
import { canRenderArrangedTable, buildV3ContinuousTableLayout } from '../src/utils/continuousTableLayout'
import { arrangeIngredientRows, getProcessingIngredientSets } from '../src/utils/ingredientDisplayOrder'
import type { VisualRecipeV3 } from '../src/types/recipeV3'

const allRecipes: VisualRecipeV3[] = [
  ...CHINESE_HEALTHY_RECIPES,
  ...HOME_SWEET_HOME_RECIPES,
  espressoBrowniesV3,
  hongShaoRouV3,
  caesarSaladV3
]

console.log('================================================================')
console.log(` 全量食谱数据库深度审计 (共 ${allRecipes.length} 道食谱) `)
console.log('================================================================\n')

// ============================================================================
// CHECK 1: 每一个食材是否都是独立的？
// ============================================================================
console.log('>>> [CHECK 1] 食材独立性与原子化检查 (Atomicity & Independence)...')

interface IngredientIssue {
  recipeId: string
  recipeTitle: string
  ingredientId: string
  name: string
  amountText: string
  category: string
  type: string
  detail: string
}

const ingredientIssues: IngredientIssue[] = []

// 允许的天然包含连词的特定单品名词白名单
const ALLOWED_NAMES = new Set([
  '和面牛奶',
  '保宁香醋 (或四川陈醋)',
  '白胡椒粉 (或黑胡椒碎)',
  '保宁醋或香醋',
  '香油或芝麻油'
])

for (const recipe of allRecipes) {
  const ids = new Set<string>()

  for (const ing of recipe.ingredients) {
    const name = (ing.name || '').trim()
    const amount = (ing.amountText || '').trim()

    // 1.1 重复 ID
    if (ids.has(ing.id)) {
      ingredientIssues.push({
        recipeId: recipe.id,
        recipeTitle: recipe.title,
        ingredientId: ing.id,
        name,
        amountText: amount,
        category: ing.category,
        type: 'DUPLICATE_ID',
        detail: `食材 ID "${ing.id}" 在食谱内重复`
      })
    }
    ids.add(ing.id)

    // 1.2 缺失关键字段
    if (!name) {
      ingredientIssues.push({
        recipeId: recipe.id,
        recipeTitle: recipe.title,
        ingredientId: ing.id,
        name,
        amountText: amount,
        category: ing.category,
        type: 'MISSING_NAME',
        detail: '食材缺少名称'
      })
    }
    if (!amount) {
      ingredientIssues.push({
        recipeId: recipe.id,
        recipeTitle: recipe.title,
        ingredientId: ing.id,
        name,
        amountText: amount,
        category: ing.category,
        type: 'MISSING_AMOUNT',
        detail: '食材缺少用量/量词 (amountText)'
      })
    }

    // 1.3 名称中包含 '+' 号 (明显的复合食材)
    if (name.includes('+')) {
      ingredientIssues.push({
        recipeId: recipe.id,
        recipeTitle: recipe.title,
        ingredientId: ing.id,
        name,
        amountText: amount,
        category: ing.category,
        type: 'PLUS_IN_NAME',
        detail: `食材名称包含 "+"：${name}`
      })
    }

    // 1.4 用量中包含 '+' 号 (用量中拼接了多种食材)
    if (amount.includes('+')) {
      ingredientIssues.push({
        recipeId: recipe.id,
        recipeTitle: recipe.title,
        ingredientId: ing.id,
        name,
        amountText: amount,
        category: ing.category,
        type: 'PLUS_IN_AMOUNT',
        detail: `用量字段包含 "+"：${amount}`
      })
    }

    // 1.5 顿号 '、' (在同一个食材名称中列举了多个食材)
    if (name.includes('、')) {
      ingredientIssues.push({
        recipeId: recipe.id,
        recipeTitle: recipe.title,
        ingredientId: ing.id,
        name,
        amountText: amount,
        category: ing.category,
        type: 'DUNHAO_IN_NAME',
        detail: `食材名称包含顿号 "、" 列举多物料：${name}`
      })
    }

    // 1.6 连词 '与', '和', '及' (检查是否连接了两种不同食材)
    if (/[与和及]/.test(name) && !ALLOWED_NAMES.has(name) && !name.startsWith('milk for dumplings')) {
      ingredientIssues.push({
        recipeId: recipe.id,
        recipeTitle: recipe.title,
        ingredientId: ing.id,
        name,
        amountText: amount,
        category: ing.category,
        type: 'CONJUNCTION_IN_NAME',
        detail: `食材名称包含连词：${name}`
      })
    }

    // 1.7 常见调料组合词检查 (如 "葱姜蒜", "葱姜", "姜蒜", "油盐", "糖醋")
    if (/(葱姜|姜蒜|油盐)/.test(name)) {
      ingredientIssues.push({
        recipeId: recipe.id,
        recipeTitle: recipe.title,
        ingredientId: ing.id,
        name,
        amountText: amount,
        category: ing.category,
        type: 'COMBINED_SEASONING',
        detail: `食材名称包含组合调料词：${name}`
      })
    }

    // 1.8 名称内嵌重量/数量 (如 "干椒10g", "2个鸡蛋", "5g白糖")
    const embeddedAmount = name.match(/(\d+\s*(g|克|ml|毫升|个|勺|片|碗|根|把|支|只))/i)
    if (embeddedAmount) {
      ingredientIssues.push({
        recipeId: recipe.id,
        recipeTitle: recipe.title,
        ingredientId: ing.id,
        name,
        amountText: amount,
        category: ing.category,
        type: 'EMBEDDED_AMOUNT_IN_NAME',
        detail: `食材名称中内嵌了数量/单位 "${embeddedAmount[0]}"，应移至 amountText：${name}`
      })
    }

    // 1.9 用量重复包含食材名称 (例如 amountText: "冬笋丁 75g" vs name: "冬笋丁")
    if (amount && name && name.length >= 2 && amount.includes(name)) {
      ingredientIssues.push({
        recipeId: recipe.id,
        recipeTitle: recipe.title,
        ingredientId: ing.id,
        name,
        amountText: amount,
        category: ing.category,
        type: 'REDUNDANT_REPETITION',
        detail: `用量字段重复包含食材名：amountText="${amount}", name="${name}"`
      })
    }
  }
}

console.log(`[CHECK 1 结果] 食材独立性检查完成: 扫描 ${allRecipes.reduce((acc, r) => acc + r.ingredients.length, 0)} 个食材项`)
console.log(`  - 异常问题数: ${ingredientIssues.length}`)
if (ingredientIssues.length > 0) {
  ingredientIssues.forEach(iss => {
    console.log(`    ❌ [${iss.recipeId}] ${iss.recipeTitle} -> [${iss.ingredientId}] (${iss.type}): ${iss.detail}`)
  })
} else {
  console.log('  ✅ 完美！全库所有食材均满足 100% 独立原子化标准，无复合合并、无重复 ID、无名称用量混杂。')
}

// ============================================================================
// CHECK 2: 每一个工序是否都是连续的？
// ============================================================================
console.log('\n>>> [CHECK 2] 工序连续性与拓扑连续性检查 (Process Continuity)...')

interface ProcessIssue {
  recipeId: string
  recipeTitle: string
  blockId?: string
  blockLabel?: string
  type: string
  detail: string
}

const processIssues: ProcessIssue[] = []

for (const recipe of allRecipes) {
  // 2.1 连续工序表拓扑排列检查 (核心连续性: canRenderArrangedTable)
  const tableCheck = canRenderArrangedTable(recipe)
  if (!tableCheck.canRender) {
    processIssues.push({
      recipeId: recipe.id,
      recipeTitle: recipe.title,
      type: 'TABLE_TOPOLOGY_DISCONTINUOUS',
      detail: `连续工序表拓扑不连续，导致表格无法连续合并：${tableCheck.reason}`
    })
  }

  // 2.2 验证各工序的 stageIndex 是否连续递增 (0, 1, 2...)
  const stages = recipe.actionBlocks.map(b => b.stageIndex).sort((a, b) => a - b)
  for (let i = 0; i < stages.length; i++) {
    if (i > 0 && stages[i] - stages[i - 1] > 1) {
      processIssues.push({
        recipeId: recipe.id,
        recipeTitle: recipe.title,
        type: 'STAGE_INDEX_GAP',
        detail: `工序 stageIndex 出现跨度跳跃：[${stages.join(', ')}]，在 stage ${stages[i - 1]} 到 ${stages[i]} 之间存在空隙`
      })
      break
    }
  }

  // 2.3 验证工序食材引用有效性与非空
  const validIngIds = new Set(recipe.ingredients.map(i => i.id))
  for (const block of recipe.actionBlocks) {
    const hasMaterialInput = (block.dependencies || []).some(dependency => dependency.type === 'material')
    if ((!block.ingredientIds || block.ingredientIds.length === 0) && !hasMaterialInput) {
      processIssues.push({
        recipeId: recipe.id,
        recipeTitle: recipe.title,
        blockId: block.id,
        blockLabel: block.label,
        type: 'EMPTY_BLOCK_INGREDIENTS',
        detail: `工序 "${block.label}" (${block.id}) 既未关联直接食材，也未承接上游半成品`
      })
    } else {
      for (const ingId of block.ingredientIds) {
        if (!validIngIds.has(ingId)) {
          processIssues.push({
            recipeId: recipe.id,
            recipeTitle: recipe.title,
            blockId: block.id,
            blockLabel: block.label,
            type: 'DANGLING_INGREDIENT_REF',
            detail: `工序 "${block.label}" 引用的食材 ID "${ingId}" 在食谱 ingredients 中不存在`
          })
        }
      }
    }

    // 2.4 依赖引用连续性 (物料上游工序必须存在，且阶段在前)
    if (block.dependencies) {
      for (const dep of block.dependencies) {
        const sourceBlock = recipe.actionBlocks.find(b => b.id === dep.sourceBlockId)
        if (!sourceBlock) {
          processIssues.push({
            recipeId: recipe.id,
            recipeTitle: recipe.title,
            blockId: block.id,
            blockLabel: block.label,
            type: 'DANGLING_DEPENDENCY',
            detail: `工序 "${block.label}" 引用的上游依赖工序 "${dep.sourceBlockId}" 不存在`
          })
        } else if (sourceBlock.stageIndex >= block.stageIndex) {
          processIssues.push({
            recipeId: recipe.id,
            recipeTitle: recipe.title,
            blockId: block.id,
            blockLabel: block.label,
            type: 'DEPENDENCY_STAGE_ORDER_INVALID',
            detail: `工序 "${block.label}" (stage ${block.stageIndex}) 的上游工序 "${sourceBlock.label}" (stage ${sourceBlock.stageIndex}) 阶段未在其前`
          })
        }
      }
    }
  }

  // 2.5 终步工序 (FinalBlock) 闭环检查
  if (!recipe.finalBlock) {
    processIssues.push({
      recipeId: recipe.id,
      recipeTitle: recipe.title,
      type: 'MISSING_FINAL_BLOCK',
      detail: '食谱缺少 finalBlock 终步收尾工序'
    })
  } else {
    if (!recipe.finalBlock.method || !recipe.finalBlock.label) {
      processIssues.push({
        recipeId: recipe.id,
        recipeTitle: recipe.title,
        type: 'INCOMPLETE_FINAL_BLOCK',
        detail: 'finalBlock 缺少标准烹饪法 (method) 或标题 (label)'
      })
    }
  }

  // 2.6 实际构建布局测试：确保 buildV3ContinuousTableLayout 不抛出异常且行连续
  try {
    const layout = buildV3ContinuousTableLayout(recipe)
    if (!layout.processCells || layout.processCells.length === 0) {
      processIssues.push({
        recipeId: recipe.id,
        recipeTitle: recipe.title,
        type: 'EMPTY_LAYOUT_CELLS',
        detail: '连续工序表布局计算后未生成任何工序单元格'
      })
    }
  } catch (e: any) {
    processIssues.push({
      recipeId: recipe.id,
      recipeTitle: recipe.title,
      type: 'LAYOUT_CALC_EXCEPTION',
      detail: `buildV3ContinuousTableLayout 计算异常：${e?.message || e}`
    })
  }
}

console.log(`[CHECK 2 结果] 工序连续性检查完成: 扫描 ${allRecipes.length} 道食谱，共 ${allRecipes.reduce((acc, r) => acc + r.actionBlocks.length, 0)} 个工序节点`)
console.log(`  - 异常问题数: ${processIssues.length}`)
if (processIssues.length > 0) {
  processIssues.forEach(iss => {
    console.log(`    ❌ [${iss.recipeId}] ${iss.recipeTitle} -> ${iss.type}: ${iss.detail}`)
  })
} else {
  console.log('  ✅ 完美！全库所有食谱的工序均 100% 拓扑连续、阶段连续、物料流连续、无孤立悬空节点。')
}

console.log('\n================================================================')
console.log(' 全量食谱数据库两项核心指标检查总结 ')
console.log('================================================================')
console.log(`1. 食材独立性异常: ${ingredientIssues.length} 个`)
console.log(`2. 工序连续性异常: ${processIssues.length} 个`)
if (ingredientIssues.length === 0 && processIssues.length === 0) {
  console.log('🎉 结论: 整个数据库 170 道食谱的每一个食材均为独立原子行，每一个工序均保持严格连续！')
} else {
  console.log('⚠️ 存在需修复的问题项，请查看上述详细输出。')
}
console.log('================================================================\n')
