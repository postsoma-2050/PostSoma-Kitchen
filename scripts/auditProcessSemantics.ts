import fs from 'node:fs'
import path from 'node:path'
import { CHINESE_HEALTHY_RECIPES } from '../src/data/chineseHealthyRecipes'
import { HOME_SWEET_HOME_RECIPES } from '../src/data/homeSweetHomeRecipes'
import { caesarSaladV3, espressoBrowniesV3, hongShaoRouV3 } from '../src/data/v3Examples'
import type { VisualRecipeV3, V3ActionBlock } from '../src/types/recipeV3'
import { buildV3ContinuousTableLayout } from '../src/utils/continuousTableLayout'
import { buildV3MatrixLayout } from '../src/utils/matrixFlowLayout'

type IssueCode =
  | 'GENERIC_ACTION_LABEL'
  | 'DUPLICATE_ADJACENT_ACTION'
  | 'PREHEAT_DUPLICATES_FIRST_ACTION'
  | 'PLACEHOLDER_COMPLETION_STATE'
  | 'ISOLATED_ACTION'
  | 'FINAL_REPEATS_ACTION'
  | 'OUTCOME_RENDERED_AS_PROCESS_COLUMN'
  | 'OUTCOME_NOT_COMPACT_IN_FLOW'
  | 'NUTRITION_NOTE_IN_FINAL'
  | 'DESCRIPTIVE_FINAL_USED_AS_ACTION'
  | 'SOURCE_STEP_COUNT_DRIFT'
  | 'SOURCE_STEP_TEXT_DRIFT'

interface SemanticIssue {
  recipeId: string
  recipeTitle: string
  code: IssueCode
  detail: string
  blockId?: string
}

interface RawSourceRecipe {
  index: number
  title: string
  step_count: number
  steps: string[]
}

const recipes: VisualRecipeV3[] = [
  ...CHINESE_HEALTHY_RECIPES,
  ...HOME_SWEET_HOME_RECIPES,
  espressoBrowniesV3,
  hongShaoRouV3,
  caesarSaladV3,
]

const sourcePath = path.join(process.cwd(), 'reports', 'epub_authentic_151_recipes.json')
const sourceRecipes: RawSourceRecipe[] = fs.existsSync(sourcePath)
  ? JSON.parse(fs.readFileSync(sourcePath, 'utf8'))
  : []
const sourceByIndex = new Map(sourceRecipes.map(recipe => [recipe.index, recipe]))

const compact = (value = '') => value
  .replace(/[\s\p{P}\p{S}]/gu, '')
  .replace(/^(继续|再次|然后|再)/, '')
  .toLowerCase()

const cleanSourceStep = (value = '') => value
  .replace(/[\r\n]/g, ' ')
  .replace(/\s+/g, ' ')
  .trim()
  .replace(/^\d+\s*　?/, '')

const actionVerbPattern = /切|洗|泡|腌|浆|焯|煮|炖|焖|烧|蒸|炒|煎|炸|烤|拌|调|勾芡|收汁|装盘|盛出|出锅|打散|成型|揉|榨|淋|浇|assemble|bake|boil|braise|fry|mix|plate|serve|steam/i
const descriptiveOnlyPattern = /鲜|香|嫩|脆|滑|爽|美味|可口|浓郁|开胃|营养|健康/
const genericLabels = new Set(['食材准备与加工', '按原文处理', '处理食材', '工序处理', 'process'])

function dependenciesOf(block: V3ActionBlock) {
  return block.dependencies || []
}

const issues: SemanticIssue[] = []

for (const recipe of recipes) {
  const add = (code: IssueCode, detail: string, blockId?: string) => {
    issues.push({ recipeId: recipe.id, recipeTitle: recipe.title, code, detail, blockId })
  }

  recipe.actionBlocks.forEach((block, index) => {
    if (genericLabels.has((block.label || '').trim().toLowerCase()) || (block.sublabel || '').trim().toLowerCase() === 'process') {
      add('GENERIC_ACTION_LABEL', `工序标题“${block.label}”没有表达实际动作`, block.id)
    }
    if (block.completionState === '工序完成达到待用标准') {
      add('PLACEHOLDER_COMPLETION_STATE', '准出状态是无事实含量的占位句', block.id)
    }
    if ((block.ingredientIds || []).length === 0 && !dependenciesOf(block).some(dep => dep.type === 'material')) {
      add('ISOLATED_ACTION', '既没有直接食材，也没有上游物料输入', block.id)
    }
    const previous = recipe.actionBlocks[index - 1]
    if (previous && compact(previous.label) === compact(block.label)) {
      add('DUPLICATE_ADJACENT_ACTION', `与前序 ${previous.id} 重复显示“${block.label}”`, block.id)
    }
  })

  if (recipe.prerequisites?.preheat && recipe.actionBlocks[0]
    && compact(recipe.prerequisites.preheat) === compact(recipe.actionBlocks[0].label)) {
    add('PREHEAT_DUPLICATES_FIRST_ACTION', `前置栏与第一工序重复“${recipe.actionBlocks[0].label}”`)
  }

  const final = recipe.finalBlock
  const lastAction = recipe.actionBlocks[recipe.actionBlocks.length - 1]
  if (final) {
    if (lastAction && final.role !== 'outcome' && compact(final.label) === compact(lastAction.label)) {
      add('FINAL_REPEATS_ACTION', `finalBlock 再次显示最后工序“${final.label}”`)
    }
    if (/营养笔记|富含|营养价值/.test(final.instructions || '')) {
      add('NUTRITION_NOTE_IN_FINAL', '营养说明被错误放入 finalBlock.instructions')
    }
    if (final.role !== 'outcome' && descriptiveOnlyPattern.test(final.label) && !actionVerbPattern.test(final.label)) {
      add('DESCRIPTIVE_FINAL_USED_AS_ACTION', `终点标题“${final.label}”只有成品形容词，没有动作`)
    }
    if (final.role === 'outcome') {
      const tableLayout = buildV3ContinuousTableLayout(recipe)
      if (tableLayout.processCells.some(cell => cell.isFinalBlock)) {
        add('OUTCOME_RENDERED_AS_PROCESS_COLUMN', '结果型 finalBlock 仍占用连续工序表整列')
      }
      const flowLayout = buildV3MatrixLayout(recipe)
      if (!flowLayout.finalBlockLayout.isOutcomeOnly || flowLayout.finalBlockLayout.w > 80 || flowLayout.finalBlockLayout.h > 48) {
        add('OUTCOME_NOT_COMPACT_IN_FLOW', '结果型 finalBlock 未降为紧凑流程终点')
      }
    }
  }

  if (recipe.id.startsWith('cn-')) {
    const index = Number(recipe.id.match(/^cn-(\d+)/)?.[1])
    const source = sourceByIndex.get(index)
    if (source) {
      if (source.step_count !== recipe.actionBlocks.length) {
        add('SOURCE_STEP_COUNT_DRIFT', `原书 ${source.step_count} 步，当前 ${recipe.actionBlocks.length} 步`)
      }
      source.steps.forEach((sourceStep, stepIndex) => {
        const block = recipe.actionBlocks[stepIndex]
        if (!block || cleanSourceStep(sourceStep) !== cleanSourceStep(block.note || block.notes || '')) {
          add('SOURCE_STEP_TEXT_DRIFT', `第 ${stepIndex + 1} 步未完整保留原文`, block?.id)
        }
      })
    }
  }
}

const countsByCode = Object.fromEntries(
  [...new Set(issues.map(issue => issue.code))]
    .sort()
    .map(code => [code, issues.filter(issue => issue.code === code).length]),
)
const affectedRecipes = new Set(issues.map(issue => issue.recipeId)).size
const summary = {
  recipeCount: recipes.length,
  chineseSourceRecipeCount: CHINESE_HEALTHY_RECIPES.length,
  actionCount: recipes.reduce((sum, recipe) => sum + recipe.actionBlocks.length, 0),
  semanticIssueCount: issues.length,
  affectedRecipes,
  countsByCode,
  outcomeFinalBlocks: recipes.filter(recipe => recipe.finalBlock?.role === 'outcome').length,
  operationalFinalBlocks: recipes.filter(recipe => recipe.finalBlock && recipe.finalBlock.role !== 'outcome').length,
}

const outputDir = path.join(process.cwd(), 'reports', 'process-semantics-audit')
fs.mkdirSync(outputDir, { recursive: true })
fs.writeFileSync(
  path.join(outputDir, 'process-semantics-audit.json'),
  JSON.stringify({ generatedAt: new Date().toISOString(), summary, issues }, null, 2),
  'utf8',
)

const rows = issues.length > 0
  ? issues.map(issue => `| \`${issue.recipeId}\` | ${issue.blockId ? `\`${issue.blockId}\`` : '—'} | \`${issue.code}\` | ${issue.detail.replace(/\|/g, '\\|')} |`).join('\n')
  : '| — | — | — | 本轮规则未发现语义缺陷 |'

const markdown = `# Matrix Flow Card 工序语义二次审计

> 本审计检查已知的表达反模式，不再用“能排成表”代替内容正确性。自动化 0 问题只表示下列门禁通过，不等于来源逐项核验或厨房实测。

## 结果

- 食谱：${summary.recipeCount} 道（中餐原书 ${summary.chineseSourceRecipeCount} 道）
- 工序：${summary.actionCount} 个
- 语义问题：${summary.semanticIssueCount} 项，涉及 ${summary.affectedRecipes} 道
- 结果型终点：${summary.outcomeFinalBlocks} 个；真实操作型终步：${summary.operationalFinalBlocks} 个

## 门禁范围

1. 工序标题必须是可执行动作，不得使用“食材准备与加工 / Process / 按原文处理”。
2. 相邻工序不得只是重复同一个标题。
3. 前置准备不得复制第一工序。
4. completionState 必须是可观察状态，不得使用“工序完成达到待用标准”。
5. 结果型 finalBlock 不得占据连续工序表一整列；分支图只显示紧凑“完成”终点。
6. 口感与营养说明不能冒充动作；营养笔记进入 recipe.tips。
7. 原书 151 道的步骤数和完整 note 必须与 EPUB 提取结果逐项一致。

## 事实边界

- 151 道中餐的材料、用量和步骤原文可追溯到 EPUB 定位；工序标题与依赖拓扑仍标记为 \`modeled\`。
- 本报告不会把缺少原文依据的时间、火候或准出状态自动补成“完整”。未知事实保持空缺，由后续人工核书或厨房实测处理。
- 发布状态只代表可见性；当前全库 \`source_verified = 0\`、\`kitchen_verified = 0\`，不得对外宣称 170 道已经实测验证。

## 明细

| 食谱 | 工序 | 代码 | 说明 |
| :--- | :--- | :--- | :--- |
${rows}
`

fs.writeFileSync(path.join(outputDir, 'process-semantics-audit.md'), markdown, 'utf8')

console.log('=== Matrix Flow Card 工序语义二次审计 ===')
console.log(`食谱 ${summary.recipeCount} 道，工序 ${summary.actionCount} 个`)
console.log(`语义问题 ${summary.semanticIssueCount} 项，涉及 ${summary.affectedRecipes} 道`)
console.log(countsByCode)
console.log(`报告: ${path.join(outputDir, 'process-semantics-audit.md')}`)

if (issues.length > 0) process.exitCode = 1
