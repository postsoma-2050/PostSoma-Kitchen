import fs from 'fs'
import path from 'path'
import { CHINESE_HEALTHY_RECIPES } from '../src/data/chineseHealthyRecipes'
import { HOME_SWEET_HOME_RECIPES } from '../src/data/homeSweetHomeRecipes'
import { espressoBrowniesV3, hongShaoRouV3, caesarSaladV3 } from '../src/data/v3Examples'
import { normalizeRecipe } from '../src/services/recipeNormalizer'
import { validateRecipe } from '../src/utils/taxonomyMatcher'

const REPORT_PATH = path.join(process.cwd(), 'reports', 'audit-presets-report.json')

interface AuditReportJson {
  auditTimestamp: string
  auditScope: {
    totalPresetsCount: number
    sources: { name: string; count: number }[]
  }
  auditDimensions: {
    staticPresetsAudit: string
    localStorageUserAudit: string
    structuralValidation: string
    manualFactAuditNotice: string
  }
  summary: {
    totalCount: number
    passCount: number
    failCount: number
    passPercentage: string
    averageCompletenessScore: number
    totalErrorsCount: number
    totalWarningsCount: number
  }
  recipesDetails: Array<{
    id: string
    title: string
    cuisine: string
    cookingMethod: string
    difficulty: string
    canPublish: boolean
    completenessScore: number
    ingredientsCount: number
    formulasCount: number
    actionBlocksCount: number
    errors: Array<{ field: string; message: string; code: string }>
    warnings: Array<{ field: string; message: string; code: string }>
  }>
}

function runAudit() {
  const sources = [
    { name: 'chineseHealthyRecipes.ts', data: CHINESE_HEALTHY_RECIPES },
    { name: 'homeSweetHomeRecipes.ts', data: HOME_SWEET_HOME_RECIPES },
    { name: 'v3Examples.ts', data: [espressoBrowniesV3, hongShaoRouV3, caesarSaladV3] }
  ]

  const allPresets = sources.flatMap(s => s.data)

  let totalPass = 0
  let totalFail = 0
  let totalScoreSum = 0
  let totalErrorsCount = 0
  let totalWarningsCount = 0

  const recipesDetails: AuditReportJson['recipesDetails'] = []

  allPresets.forEach(raw => {
    const recipe = normalizeRecipe(raw)
    const result = validateRecipe(recipe)

    if (result.canPublish) totalPass++
    else totalFail++

    totalScoreSum += result.completenessScore
    totalErrorsCount += result.errors.length
    totalWarningsCount += result.warnings.length

    recipesDetails.push({
      id: recipe.id,
      title: recipe.title,
      cuisine: recipe.cuisine || 'chinese',
      cookingMethod: recipe.finalBlock?.method || 'other',
      difficulty: recipe.difficulty || 'easy',
      canPublish: result.canPublish,
      completenessScore: result.completenessScore,
      ingredientsCount: recipe.ingredients?.length || 0,
      formulasCount: recipe.formulas?.length || 0,
      actionBlocksCount: recipe.actionBlocks?.length || 0,
      errors: result.errors.map(e => ({ field: e.field, message: e.message, code: e.code })),
      warnings: result.warnings.map(w => ({ field: w.field, message: w.message, code: w.code }))
    })
  })

  const report: AuditReportJson = {
    auditTimestamp: new Date().toISOString(),
    auditScope: {
      totalPresetsCount: allPresets.length,
      sources: sources.map(s => ({ name: s.name, count: s.data.length }))
    },
    auditDimensions: {
      staticPresetsAudit: '【覆盖】对 src/data 下 23 道静态预置食谱进行了 100% 结构化自动审计。',
      localStorageUserAudit: '【未覆盖/运行时】LocalStorage 用户自定义数据依赖浏览器运行时引擎环境，本静态 CLI 命令不扫描本地无权访问的用户浏览器缓存。',
      structuralValidation: '【覆盖】通过 validateRecipe 强类型规则算子检验必填字段、用量、Formula 外键、孤立 ActionBlock 及 Taxonomy 分类合法性。',
      manualFactAuditNotice: '【说明】本报告侧重结构与领域数据完整性，烹饪口感、火候调味等人工烹饪事实须由试做与主厨审核确认。'
    },
    summary: {
      totalCount: allPresets.length,
      passCount: totalPass,
      failCount: totalFail,
      passPercentage: `${Math.round((totalPass / allPresets.length) * 100)}%`,
      averageCompletenessScore: Math.round(totalScoreSum / allPresets.length),
      totalErrorsCount,
      totalWarningsCount
    },
    recipesDetails
  }

  // 保证 reports 目录存在
  const reportsDir = path.dirname(REPORT_PATH)
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true })
  }

  fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2), 'utf8')

  // 控制台输出摘要
  console.log('================================================================')
  console.log('         Time_to_eat 静态预置食谱数据审计 CLI 控制台摘要         ')
  console.log('================================================================\n')
  console.log(`• 审计时间: ${report.auditTimestamp}`)
  console.log(`• 审计范围: 共 ${report.summary.totalCount} 道预置食谱`)
  report.auditScope.sources.forEach(s => console.log(`   - [${s.name}]: ${s.count} 道`))
  console.log(`• 评估通过率: ${report.summary.passPercentage} (${report.summary.passCount} PASS / ${report.summary.failCount} FAIL)`)
  console.log(`• 平均完整度: ${report.summary.averageCompletenessScore}%`)
  console.log(`• 发布阻断错误总数: ${report.summary.totalErrorsCount} 个`)
  console.log(`• 建议改善警告总数: ${report.summary.totalWarningsCount} 个\n`)
  console.log(`📄 机器可读结构化 JSON 报告已成功写出至:\n   ${REPORT_PATH}`)
  console.log('================================================================\n')
}

runAudit()
