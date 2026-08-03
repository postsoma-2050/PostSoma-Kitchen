/**
 * 全量食谱数据准确性与逻辑完整性深度巡检脚本
 * 运行方式: node scripts/runTs.js scripts/verifyAllRecipesIntegrity.ts
 */

import { CHINESE_HEALTHY_RECIPES } from '../src/data/chineseHealthyRecipes'
import { HOME_SWEET_HOME_RECIPES } from '../src/data/homeSweetHomeRecipes'
import { espressoBrowniesV3, matchaSuffleeV3, garlicScallopsV3 } from '../src/data/v3Examples'
import { VisualRecipeV3 } from '../src/types/recipeV2'

interface InspectionIssue {
  recipeId: string
  recipeTitle: string
  severity: 'ERROR' | 'WARNING'
  field: string
  message: string
}

function runDeepIntegrityInspection() {
  console.log('\n================================================================')
  console.log('         Time_to_eat 全量食谱数据输入精准度与完整性巡检         ')
  console.log('================================================================\n')

  const V3_EXAMPLE_RECIPES: VisualRecipeV3[] = [
    espressoBrowniesV3 as any,
    matchaSuffleeV3 as any,
    garlicScallopsV3 as any,
  ].filter(Boolean)

  const allRecipes: VisualRecipeV3[] = [
    ...CHINESE_HEALTHY_RECIPES,
    ...HOME_SWEET_HOME_RECIPES,
    ...V3_EXAMPLE_RECIPES,
  ]

  console.log(`• 巡检总食谱数: ${allRecipes.length} 道`)
  console.log(`  - 中餐食谱 (chineseHealthyRecipes.ts): ${CHINESE_HEALTHY_RECIPES.length} 道`)
  console.log(`  - 美菜食谱 (homeSweetHomeRecipes.ts): ${HOME_SWEET_HOME_RECIPES.length} 道`)
  console.log(`  - 样例食谱 (v3Examples.ts): ${V3_EXAMPLE_RECIPES.length} 道\n`)

  const issues: InspectionIssue[] = []
  const recipeIdSet = new Set<string>()

  const validCookingMethods = new Set(['fry', 'steam', 'stew', 'bake', 'sear', 'boil', 'raw', 'serve', 'other'])
  const validCuisines = new Set(['chinese', 'western', 'japanese_korean', 'southeast_asian', 'fusion'])

  for (let i = 0; i < allRecipes.length; i++) {
    const r = allRecipes[i]
    const title = r.title || `未命名食谱 (#${i + 1})`

    // 1. 食谱 ID 唯一性与格式检查
    if (!r.id) {
      issues.push({
        recipeId: r.id || 'N/A',
        recipeTitle: title,
        severity: 'ERROR',
        field: 'id',
        message: '食谱缺失唯一 ID 标识符',
      })
    } else if (recipeIdSet.has(r.id)) {
      issues.push({
        recipeId: r.id,
        recipeTitle: title,
        severity: 'ERROR',
        field: 'id',
        message: `食谱 ID "${r.id}" 与库中其他食谱重复`,
      })
    } else {
      recipeIdSet.add(r.id)
    }

    // 2. 标题与描述文本完整度
    if (!r.title || !r.title.trim()) {
      issues.push({
        recipeId: r.id,
        recipeTitle: title,
        severity: 'ERROR',
        field: 'title',
        message: '食谱标题为空',
      })
    }

    if (!r.description || r.description.length < 5) {
      issues.push({
        recipeId: r.id,
        recipeTitle: title,
        severity: 'WARNING',
        field: 'description',
        message: '食谱描述过短或缺失，建议补充营养价值与烹饪特色说明',
      })
    }

    // 3. 菜系与烹饪分类标准 code 匹配
    if (!r.cuisine || !validCuisines.has(r.cuisine)) {
      issues.push({
        recipeId: r.id,
        recipeTitle: title,
        severity: 'ERROR',
        field: 'cuisine',
        message: `菜系风味 "${r.cuisine}" 不是有效的标准 Taxonomy Code (如 chinese, western)`,
      })
    }

    // 4. 食材列表 (Ingredients) 深度核验
    if (!Array.isArray(r.ingredients) || r.ingredients.length === 0) {
      issues.push({
        recipeId: r.id,
        recipeTitle: title,
        severity: 'ERROR',
        field: 'ingredients',
        message: '食谱缺失食材列表，无法建模',
      })
    } else {
      const ingIdSet = new Set<string>()
      const usedIngIdsInBlocks = new Set<string>()

      r.ingredients.forEach((ing, ingIdx) => {
        const ingName = ing.name || `未知食材 (#${ingIdx + 1})`

        // 食材 ID 唯一性
        if (!ing.id) {
          issues.push({
            recipeId: r.id,
            recipeTitle: title,
            severity: 'ERROR',
            field: `ingredients[${ingIdx}].id`,
            message: `食材 "${ingName}" 缺少唯一的 id`,
          })
        } else if (ingIdSet.has(ing.id)) {
          issues.push({
            recipeId: r.id,
            recipeTitle: title,
            severity: 'ERROR',
            field: `ingredients[${ingIdx}].id`,
            message: `食材 ID "${ing.id}" (${ingName}) 在当前食谱中重复`,
          })
        } else {
          ingIdSet.add(ing.id)
        }

        // 食材名称
        if (!ing.name || !ing.name.trim() || ing.name.includes('undefined') || ing.name.includes('null')) {
          issues.push({
            recipeId: r.id,
            recipeTitle: title,
            severity: 'ERROR',
            field: `ingredients[${ingIdx}].name`,
            message: `食材项包含无效名称 "${ing.name}"`,
          })
        }

        // 食材用量 Text 校验
        if (ing.category !== 'formula' && (!ing.amountText || !ing.amountText.trim() || ing.amountText.includes('[object'))) {
          issues.push({
            recipeId: r.id,
            recipeTitle: title,
            severity: 'WARNING',
            field: `ingredients[${ingIdx}].amountText`,
            message: `食材 "${ingName}" 缺失具体定量说明 (amountText)`,
          })
        }
      })

      // 5. 步骤 ActionBlocks 深度核验与食材映射闭环
      if (!Array.isArray(r.actionBlocks) || r.actionBlocks.length === 0) {
        issues.push({
          recipeId: r.id,
          recipeTitle: title,
          severity: 'ERROR',
          field: 'actionBlocks',
          message: '食谱缺少 ActionBlock 烹饪步骤节点',
        })
      } else {
        r.actionBlocks.forEach((block, blockIdx) => {
          const blockLabel = block.label || `步骤 #${blockIdx + 1}`

          if (!block.id) {
            issues.push({
              recipeId: r.id,
              recipeTitle: title,
              severity: 'ERROR',
              field: `actionBlocks[${blockIdx}].id`,
              message: `步骤 "${blockLabel}" 缺失节点 id`,
            })
          }

          if (!block.label || !block.label.trim()) {
            issues.push({
              recipeId: r.id,
              recipeTitle: title,
              severity: 'WARNING',
              field: `actionBlocks[${blockIdx}].label`,
              message: `步骤 #${blockIdx + 1} 缺失步骤标签名称`,
            })
          }

          // 食材引用校验
          if (!Array.isArray(block.ingredientIds) || block.ingredientIds.length === 0) {
            issues.push({
              recipeId: r.id,
              recipeTitle: title,
              severity: 'WARNING',
              field: `actionBlocks[${blockIdx}].ingredientIds`,
              message: `步骤 "${blockLabel}" 未关联任何食材 ID`,
            })
          } else {
            block.ingredientIds.forEach(id => {
              usedIngIdsInBlocks.add(id)
              if (!ingIdSet.has(id)) {
                issues.push({
                  recipeId: r.id,
                  recipeTitle: title,
                  severity: 'ERROR',
                  field: `actionBlocks[${blockIdx}].ingredientIds`,
                  message: `步骤 "${blockLabel}" 引用了不存在的食材 ID "${id}"`,
                })
              }
            })
          }
        })

        // 检查未在任何步骤中被引用的“悬空食材”
        r.ingredients.forEach(ing => {
          if (ing.category !== 'formula' && !usedIngIdsInBlocks.has(ing.id)) {
            issues.push({
              recipeId: r.id,
              recipeTitle: title,
              severity: 'WARNING',
              field: `ingredients`,
              message: `食材 "${ing.name}" (id: ${ing.id}) 被列在食材清单中，但未在任何工序 Block 中被使用`,
            })
          }
        })
      }
    }

    // 6. 最终烹饪/装盘 (finalBlock) 核验
    if (!r.finalBlock) {
      issues.push({
        recipeId: r.id,
        recipeTitle: title,
        severity: 'ERROR',
        field: 'finalBlock',
        message: '食谱缺失 finalBlock（最终烹饪或装盘节点）',
      })
    } else {
      if (!r.finalBlock.method || !validCookingMethods.has(r.finalBlock.method)) {
        issues.push({
          recipeId: r.id,
          recipeTitle: title,
          severity: 'ERROR',
          field: 'finalBlock.method',
          message: `finalBlock.method "${r.finalBlock.method}" 不是标准烹饪动作编码 (如 fry, steam, stew, bake, serve)`,
        })
      }
      if (!r.finalBlock.instructions || !r.finalBlock.instructions.trim()) {
        issues.push({
          recipeId: r.id,
          recipeTitle: title,
          severity: 'WARNING',
          field: 'finalBlock.instructions',
          message: 'finalBlock 缺失装盘/口感最终说明 (instructions)',
        })
      }
    }

    // 7. 备料预设参数 (prerequisites) 核验
    if (!r.prerequisites) {
      issues.push({
        recipeId: r.id,
        recipeTitle: title,
        severity: 'WARNING',
        field: 'prerequisites',
        message: '食谱缺失 prerequisites（包含炊具规格、前置准备与份量）',
      })
    } else {
      if (!r.prerequisites.containerSize) {
        issues.push({
          recipeId: r.id,
          recipeTitle: title,
          severity: 'WARNING',
          field: 'prerequisites.containerSize',
          message: '缺失建议炊具容器（containerSize），如：中式炒锅 / 28cm 平底锅',
        })
      }
      if (!r.prerequisites.servings) {
        issues.push({
          recipeId: r.id,
          recipeTitle: title,
          severity: 'WARNING',
          field: 'prerequisites.servings',
          message: '缺失食用份量说明（servings），如：2-3 人份',
        })
      }
    }
  }

  // 统计结果输出
  const errorIssues = issues.filter(x => x.severity === 'ERROR')
  const warningIssues = issues.filter(x => x.severity === 'WARNING')

  console.log('----------------------------------------------------------------')
  console.log('                      巡检结果综合分析                          ')
  console.log('----------------------------------------------------------------')
  console.log(`• 巡检食谱总数 : ${allRecipes.length} 道`)
  console.log(`• 致命阻断错误 : ${errorIssues.length} 个 ${errorIssues.length === 0 ? '✅ 完美通过 (0 错误)！' : '❌ 发现错误，需修复'}`)
  console.log(`• 优化建议警告 : ${warningIssues.length} 个\n`)

  if (errorIssues.length > 0) {
    console.log('❌ 【致命错误列表】(必须修复才能保证 100% 数据准确)：')
    errorIssues.forEach((e, idx) => {
      console.log(` ${idx + 1}. [${e.recipeId}] 《${e.recipeTitle}》 -> ${e.field}: ${e.message}`)
    })
    console.log('')
  }

  if (warningIssues.length > 0) {
    console.log(`⚠️ 【优化建议与极微小警告列表】(共 ${warningIssues.length} 条)：`)
    warningIssues.slice(0, 15).forEach((w, idx) => {
      console.log(` ${idx + 1}. [${w.recipeId}] 《${w.recipeTitle}》 -> ${w.field}: ${w.message}`)
    })
    if (warningIssues.length > 15) {
      console.log(`   ... 及其余 ${warningIssues.length - 15} 条微调建议`)
    }
    console.log('')
  }

  console.log('================================================================\n')
  if (errorIssues.length === 0) {
    process.exit(0)
  } else {
    process.exit(1)
  }
}

runDeepIntegrityInspection()
