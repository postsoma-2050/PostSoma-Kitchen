import fs from 'fs'
import path from 'path'
import { CHINESE_HEALTHY_RECIPES } from '../src/data/chineseHealthyRecipes'
import { HOME_SWEET_HOME_RECIPES } from '../src/data/homeSweetHomeRecipes'
import { normalizeRecipe } from '../src/services/recipeNormalizer'
import { validateRecipe } from '../src/utils/taxonomyMatcher'
import { buildV3MatrixLayout } from '../src/utils/matrixFlowLayout'
import { calculateScaledFormula } from '../src/utils/formulaCalculator'

const REPORT_PATH = path.join(process.cwd(), 'reports', 'test-domain-report.json')

function runDomainTest() {
  const targetIds = ['cn-01-yuxiang-rousi', 'cn-02-steamed-scallops', 'hsh-01-hazelnut-mocha']
  const all = [...CHINESE_HEALTHY_RECIPES, ...HOME_SWEET_HOME_RECIPES]

  const results: any[] = []

  targetIds.forEach(id => {
    const raw = all.find(r => r.id === id)
    if (!raw) {
      throw new Error(`测试败北：未能从预置库找到目标食谱 ${id}`)
    }

    const recipe = normalizeRecipe(raw)
    const validation = validateRecipe(recipe)
    const layout = buildV3MatrixLayout(recipe)

    let scaledFormulas: any[] = []
    if (recipe.formulas && recipe.formulas.length > 0) {
      scaledFormulas = recipe.formulas.map(f => {
        const scaledItems = calculateScaledFormula(f, 4) // 换算到 4 人份
        return {
          formulaId: f.id,
          formulaName: f.name,
          baseServings: f.baseServings,
          targetServings: 4,
          scaledItems
        }
      })
    }

    results.push({
      id: recipe.id,
      title: recipe.title,
      validation: {
        canPublish: validation.canPublish,
        completenessScore: validation.completenessScore,
        errorsCount: validation.errors.length,
        warningsCount: validation.warnings.length
      },
      layoutResult: {
        canvasWidth: layout.canvasWidth,
        canvasHeight: layout.canvasHeight,
        numRows: layout.numRows,
        numActionCols: layout.numActionCols,
        collisionNoticesCount: layout.collisionNotices.length
      },
      scaledFormulas
    })
  })

  const reportPayload = {
    testTimestamp: new Date().toISOString(),
    testSuite: 'Domain Model & Matrix Layout Engine Verification (3 Representative Recipes)',
    passed: results.every(r => r.validation.canPublish),
    results
  }

  const reportsDir = path.dirname(REPORT_PATH)
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true })
  }
  fs.writeFileSync(REPORT_PATH, JSON.stringify(reportPayload, null, 2), 'utf8')

  console.log('================================================================')
  console.log('      Time_to_eat 领域模型与 Matrix Layout 端到端测试摘要       ')
  console.log('================================================================\n')
  results.forEach(r => {
    console.log(`📌 食谱: "${r.title}" (${r.id})`)
    console.log(`   • 发布阻断: ${r.validation.canPublish ? '✅ 通过' : '❌ 阻断'} | 完整度: ${r.validation.completenessScore}%`)
    console.log(`   • Matrix 画布: ${r.layoutResult.canvasWidth}px x ${r.layoutResult.canvasHeight}px (${r.layoutResult.numRows}行 x ${r.layoutResult.numActionCols}列)`)
    if (r.scaledFormulas.length > 0) {
      console.log(`   • Sub-recipes 换算: 成功针对 ${r.scaledFormulas.length} 个配方完成动态倍率计算`)
    }
  })
  console.log(`\n📄 端到端验证 JSON 报告已成功写出至:\n   ${REPORT_PATH}`)
  console.log('================================================================\n')
}

runDomainTest()
