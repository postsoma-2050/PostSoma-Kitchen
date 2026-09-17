import fs from 'fs'
import path from 'path'
import { CHINESE_HEALTHY_RECIPES } from '../src/data/chineseHealthyRecipes'
import { HOME_SWEET_HOME_RECIPES } from '../src/data/homeSweetHomeRecipes'
import { espressoBrowniesV3, hongShaoRouV3, caesarSaladV3 } from '../src/data/v3Examples'
import { normalizeRecipe } from '../src/services/recipeNormalizer'
import type { VisualRecipeV3, V3ActionBlock } from '../src/types/recipeV3'
import { validateRecipe } from '../src/utils/taxonomyMatcher'
import { canRenderArrangedTable } from '../src/utils/continuousTableLayout'

const allRecipes: VisualRecipeV3[] = [
  ...CHINESE_HEALTHY_RECIPES,
  ...HOME_SWEET_HOME_RECIPES,
  espressoBrowniesV3,
  hongShaoRouV3,
  caesarSaladV3,
]

const compact = (value = '') => value.replace(/[\s+＋、与和&（）()]/g, '').toLowerCase()
const hasCompositeSeparator = (value = '') => /[+＋、]|(?:\S与\S)/.test(value)
const heatActionPattern = /炒|煎|炸|蒸|煮|炖|焖|烤|焯|烧|汆|熬|爆|烘|sear|fry|bake|boil|steam|stew/i

function getDeclaredDependencies(block: V3ActionBlock) {
  if (Array.isArray(block.dependencies)) return block.dependencies
  return [
    ...(block.inputBlockIds || []).map(sourceBlockId => ({ sourceBlockId, type: 'legacy' as const })),
    ...(block.afterBlockIds || []).map(sourceBlockId => ({ sourceBlockId, type: 'order' as const })),
  ]
}

function getMaterialAncestorIngredients(recipe: VisualRecipeV3, blockId: string): Set<string> {
  const blocks = new Map(recipe.actionBlocks.map(block => [block.id, block]))
  const result = new Set<string>()
  const visited = new Set<string>()

  const visit = (id: string) => {
    if (visited.has(id)) return
    visited.add(id)
    const block = blocks.get(id)
    if (!block) return
    for (const ingredientId of block.ingredientIds || []) result.add(ingredientId)
    for (const dependency of getDeclaredDependencies(block)) {
      if (dependency.type === 'material') visit(dependency.sourceBlockId)
    }
  }

  const current = blocks.get(blockId)
  for (const dependency of current ? getDeclaredDependencies(current) : []) {
    if (dependency.type === 'material') visit(dependency.sourceBlockId)
  }
  return result
}

const entries = allRecipes.map(rawRecipe => {
  const recipe = normalizeRecipe(rawRecipe)
  const validation = validateRecipe(recipe)
  const tableAdmission = canRenderArrangedTable(recipe)
  const ingredientIds = new Set(recipe.ingredients.map(item => item.id))
  const ingredientNameById = new Map(recipe.ingredients.map(item => [item.id, item.name]))
  const usedIngredientIds = new Set(recipe.actionBlocks.flatMap(block => block.ingredientIds || []))

  const compositeIngredients = recipe.ingredients
    .filter(item => item.category !== 'formula' && hasCompositeSeparator(`${item.name} ${item.amountText || ''}`))
    .map(item => ({ id: item.id, name: item.name, amountText: item.amountText }))
  const duplicateDisplayIngredients = recipe.ingredients
    .filter(item => item.amountText && compact(item.name) === compact(item.amountText))
    .map(item => ({ id: item.id, name: item.name, amountText: item.amountText }))
  const missingAmounts = recipe.ingredients
    .filter(item => item.category !== 'formula' && !item.amountText?.trim())
    .map(item => ({ id: item.id, name: item.name, note: item.note }))
  const unusedIngredients = recipe.ingredients
    .filter(item => !usedIngredientIds.has(item.id))
    .map(item => item.id)
  const brokenIngredientRefs = recipe.actionBlocks.flatMap(block =>
    (block.ingredientIds || [])
      .filter(id => !ingredientIds.has(id))
      .map(id => `${block.id}:${id}`),
  )

  const legacyDependencies = recipe.actionBlocks.flatMap(block =>
    getDeclaredDependencies(block)
      .filter(dependency => dependency.type === 'legacy')
      .map(dependency => `${dependency.sourceBlockId}->${block.id}`),
  )
  const typedDependencies = recipe.actionBlocks.flatMap(block =>
    getDeclaredDependencies(block)
      .filter(dependency => dependency.type === 'material' || dependency.type === 'order')
      .map(dependency => `${dependency.sourceBlockId}->${block.id}:${dependency.type}`),
  )
  const laterStepsWithoutUpstream = recipe.actionBlocks
    .filter(block => block.stageIndex > 0 && getDeclaredDependencies(block).length === 0)
    .map(block => {
      const previousStage = Math.max(
        ...recipe.actionBlocks.filter(candidate => candidate.stageIndex < block.stageIndex).map(candidate => candidate.stageIndex),
      )
      const previousBlocks = recipe.actionBlocks
        .filter(candidate => candidate.stageIndex === previousStage)
        .map(candidate => ({ id: candidate.id, label: candidate.label }))
      return {
        id: block.id,
        label: block.label,
        stageIndex: block.stageIndex,
        ingredientIds: block.ingredientIds,
        ingredientNames: block.ingredientIds.map(id => ingredientNameById.get(id) || id),
        previousBlocks,
        note: block.note || block.notes,
      }
    })
  const redundantMaterialInputs = recipe.actionBlocks.flatMap(block => {
    const inherited = getMaterialAncestorIngredients(recipe, block.id)
    return (block.ingredientIds || [])
      .filter(id => inherited.has(id))
      .map(id => `${block.id}:${id}`)
  })

  const missingDuration = recipe.actionBlocks.filter(block => block.durationMinutes == null).map(block => block.id)
  const missingHeatOnHeatingStep = recipe.actionBlocks
    .filter(block => heatActionPattern.test(`${block.label} ${block.note || ''}`) && !block.heatLevel)
    .map(block => block.id)
  const missingEquipment = recipe.actionBlocks.filter(block => !block.equipment?.trim()).map(block => block.id)
  const missingExitState = recipe.actionBlocks
    .filter(block => !block.completionState?.trim() && !block.outputItem?.trim())
    .map(block => block.id)

  return {
    id: recipe.id,
    title: recipe.title,
    rawStatus: rawRecipe.status,
    status: recipe.status,
    provenance: recipe.provenance,
    dataReview: recipe.dataReview,
    canPublish: validation.canPublish,
    completenessScore: validation.completenessScore,
    validationErrors: validation.errors.map(issue => issue.code),
    validationWarnings: validation.warnings.map(issue => issue.code),
    tableMode: tableAdmission.canRender ? 'table' : 'flow',
    tableFallbackReason: tableAdmission.canRender ? undefined : tableAdmission.reason,
    counts: {
      ingredients: recipe.ingredients.length,
      actions: recipe.actionBlocks.length,
      formulas: recipe.formulas?.length || 0,
      typedDependencies: typedDependencies.length,
      legacyDependencies: legacyDependencies.length,
    },
    candidates: {
      compositeIngredients,
      duplicateDisplayIngredients,
      missingAmounts,
      unusedIngredients,
      brokenIngredientRefs,
      legacyDependencies,
      laterStepsWithoutUpstream,
      redundantMaterialInputs,
      missingDuration,
      missingHeatOnHeatingStep,
      missingEquipment,
      missingExitState,
    },
  }
})

const sum = (selector: (entry: typeof entries[number]) => number) => entries.reduce((total, entry) => total + selector(entry), 0)
const countRecipes = (selector: (entry: typeof entries[number]) => boolean) => entries.filter(selector).length
const candidateCount = (key: keyof typeof entries[number]['candidates']) => sum(entry => entry.candidates[key].length)
const candidateRecipes = (key: keyof typeof entries[number]['candidates']) => countRecipes(entry => entry.candidates[key].length > 0)

const summary = {
  recipes: entries.length,
  rawStatuses: Object.fromEntries(['draft', 'published', 'complete'].map(status => [status, countRecipes(entry => entry.rawStatus === status)])),
  normalizedStatuses: Object.fromEntries(['draft', 'published', 'complete'].map(status => [status, countRecipes(entry => entry.status === status)])),
  publishGate: {
    pass: countRecipes(entry => entry.canPublish),
    fail: countRecipes(entry => !entry.canPublish),
    warnings: sum(entry => entry.validationWarnings.length),
  },
  processTable: {
    table: countRecipes(entry => entry.tableMode === 'table'),
    flowFallback: countRecipes(entry => entry.tableMode === 'flow'),
  },
  topology: {
    typedDependencyEdges: sum(entry => entry.counts.typedDependencies),
    recipesWithTypedDependencies: countRecipes(entry => entry.counts.typedDependencies > 0),
    legacyDependencyEdges: candidateCount('legacyDependencies'),
    recipesWithLegacyDependencies: candidateRecipes('legacyDependencies'),
    laterStepsWithoutUpstream: candidateCount('laterStepsWithoutUpstream'),
    recipesWithLaterStepsWithoutUpstream: candidateRecipes('laterStepsWithoutUpstream'),
    redundantMaterialInputs: candidateCount('redundantMaterialInputs'),
    recipesWithRedundantMaterialInputs: candidateRecipes('redundantMaterialInputs'),
  },
  ingredients: {
    total: sum(entry => entry.counts.ingredients),
    compositeReviewItems: candidateCount('compositeIngredients'),
    recipesWithCompositeReview: candidateRecipes('compositeIngredients'),
    duplicateDisplayItems: candidateCount('duplicateDisplayIngredients'),
    missingAmountItems: candidateCount('missingAmounts'),
    unusedItems: candidateCount('unusedIngredients'),
    brokenReferences: candidateCount('brokenIngredientRefs'),
  },
  actionMetadata: {
    total: sum(entry => entry.counts.actions),
    missingDuration: candidateCount('missingDuration'),
    missingHeatOnHeatingStep: candidateCount('missingHeatOnHeatingStep'),
    missingEquipment: candidateCount('missingEquipment'),
    missingExitState: candidateCount('missingExitState'),
  },
  formulas: {
    total: sum(entry => entry.counts.formulas),
    recipesWithFormulas: countRecipes(entry => entry.counts.formulas > 0),
  },
  provenance: {
    structuredSourceFieldAvailable: true,
    recipesWithSource: countRecipes(entry => Boolean(entry.provenance?.title)),
    recipesWithLocator: countRecipes(entry => Boolean(entry.provenance?.locator)),
    sourceVerified: countRecipes(entry => entry.dataReview?.overall === 'source_verified'),
    kitchenVerified: countRecipes(entry => entry.dataReview?.overall === 'kitchen_verified'),
    unreviewedOrModeled: countRecipes(entry => !['source_verified', 'kitchen_verified'].includes(entry.dataReview?.overall || 'unreviewed')),
    note: '已建立结构化来源与核验状态；来源标题不等于逐项事实核验，locator、source_verified 或 kitchen_verified 才能形成可复查证据。',
  },
}

const report = {
  generatedAt: new Date().toISOString(),
  scope: '121 local presets; read-only structural and semantic candidate audit',
  summary,
  entries,
  reviewQueues: {
    topology: entries.flatMap(entry => entry.candidates.laterStepsWithoutUpstream.map(step => ({
      recipeId: entry.id,
      recipeTitle: entry.title,
      ...step,
      decisionRequired: '确认该步骤是承接上游物料 (material)、仅等待前序 (order)，还是独立并行步骤。',
    }))),
    compositeIngredients: entries.flatMap(entry => entry.candidates.compositeIngredients.map(item => ({
      recipeId: entry.id,
      recipeTitle: entry.title,
      ...item,
      decisionRequired: '对照来源决定保留为并列食材、拆成独立食材，或建模为 formula。',
    }))),
    missingAmounts: entries.flatMap(entry => entry.candidates.missingAmounts.map(item => ({
      recipeId: entry.id,
      recipeTitle: entry.title,
      ingredientId: item.id,
      ingredientName: item.name,
      note: item.note,
      decisionRequired: '从可靠来源补录用量；没有证据时保持空值。',
    }))),
  },
}

const reportDir = path.join(process.cwd(), 'reports', 'database-audit')
fs.mkdirSync(reportDir, { recursive: true })
fs.writeFileSync(path.join(reportDir, 'database-audit.json'), JSON.stringify(report, null, 2), 'utf8')

const priorityRecipes = [...entries]
  .map(entry => ({
    id: entry.id,
    title: entry.title,
    score:
      entry.candidates.legacyDependencies.length * 5 +
      entry.candidates.laterStepsWithoutUpstream.length * 3 +
      entry.candidates.compositeIngredients.length * 2 +
      entry.candidates.missingAmounts.length * 2 +
      entry.candidates.redundantMaterialInputs.length * 2 +
      (entry.tableMode === 'flow' ? 1 : 0),
  }))
  .filter(entry => entry.score > 0)
  .sort((a, b) => b.score - a.score || a.id.localeCompare(b.id))
  .slice(0, 20)

const markdownCell = (value: unknown) => String(value ?? '—').replace(/\|/g, '\\|').replace(/\s+/g, ' ')
const flowFallbackRows = entries
  .filter(entry => entry.tableMode === 'flow')
  .map(entry => `| \`${entry.id}\` | ${markdownCell(entry.title)} | ${markdownCell(entry.tableFallbackReason)} |`)
const topologyRows = report.reviewQueues.topology.map(item =>
  `| \`${item.recipeId}\` | \`${item.id}\` ${markdownCell(item.label)} | ${markdownCell(item.ingredientNames.join('、'))} | ${markdownCell(item.previousBlocks.map(block => `${block.id} ${block.label}`).join('；'))} |`,
)
const compositeRows = report.reviewQueues.compositeIngredients.map(item =>
  `| \`${item.recipeId}\` | \`${item.id}\` | ${markdownCell(item.name)} | ${markdownCell(item.amountText)} |`,
)
const missingAmountRows = report.reviewQueues.missingAmounts.map(item =>
  `| \`${item.recipeId}\` | \`${item.ingredientId}\` | ${markdownCell(item.ingredientName)} | ${markdownCell(item.note)} |`,
)

const markdown = `# PostSoma Kitchen 数据库与工序表适配审计

> 生成时间：${report.generatedAt}  
> 范围：本地 ${summary.recipes} 道预置；只读检查，没有修改食谱事实或云端数据。

## 结论

- 发布结构门禁：${summary.publishGate.pass}/${summary.recipes} 通过，仍有 ${summary.publishGate.warnings} 条非阻断警告。
- 工序表：${summary.processTable.table} 道可用连续表，${summary.processTable.flowFallback} 道保留分支图。
- 依赖语义：仅 ${summary.topology.recipesWithTypedDependencies} 道含显式 material/order 依赖；${summary.topology.recipesWithLegacyDependencies} 道仍含 legacy，${summary.topology.recipesWithLaterStepsWithoutUpstream} 道存在后续阶段但没有声明上游关系。
- 食材结构：${summary.ingredients.compositeReviewItems} 个复合食材候选，涉及 ${summary.ingredients.recipesWithCompositeReview} 道；这些项目需要判断是否拆成配方或独立食材。
- 用量与动作元数据：${summary.ingredients.missingAmountItems} 个食材缺用量；${summary.actionMetadata.missingDuration} 个动作缺时间；${summary.actionMetadata.missingHeatOnHeatingStep} 个疑似加热动作缺火候。
- 来源可信度：${summary.provenance.recipesWithSource} 道已有来源标题，${summary.provenance.recipesWithLocator} 道具有页码/章节定位；source_verified 为 ${summary.provenance.sourceVerified} 道，kitchen_verified 为 ${summary.provenance.kitchenVerified} 道。

## 下一步优先级

1. 先补数据治理字段：来源、页码/章节、核验状态、核验人、核验日期、推断说明。
2. 再逐道确认 actionBlocks：直接 ingredientIds 只表达本步骤新加入/直接处理的食材；半成品承接必须用 material，单锅等待用 order。
3. 审核复合食材候选，区分可直接展示的并列调料与应进入 formulas 的腌料、碗汁、浆液。
4. 对照可靠原食谱或厨房记录核对数量、步骤顺序、火候、时间和准出状态；没有来源的值保持未知，不自动补造。
5. 完成事实审核后再生成云端迁移批次；迁移前逐字段对比本地与 Supabase，不用总数或旧哈希代替内容比较。

## 优先人工审核队列（前 20）

${priorityRecipes.map((entry, index) => `${index + 1}. \`${entry.id}\` ${entry.title}（风险分 ${entry.score}）`).join('\n')}

## 必须保留分支图的食谱（完整清单）

| 食谱 | 标题 | 连续表阻断原因 |
| :--- | :--- | :--- |
${flowFallbackRows.join('\n')}

<details>
<summary>后续阶段但未声明上游关系：${report.reviewQueues.topology.length} 项（需逐项判断 material / order / 独立并行）</summary>

| 食谱 | 待审核工序 | 本步骤直接食材 | 前一阶段候选工序 |
| :--- | :--- | :--- | :--- |
${topologyRows.join('\n')}

</details>

<details>
<summary>复合食材表达候选：${report.reviewQueues.compositeIngredients.length} 项（需决定保留、拆分或建 formula）</summary>

| 食谱 | 食材 ID | 当前名称 | 当前用量文本 |
| :--- | :--- | :--- | :--- |
${compositeRows.join('\n')}

</details>

<details>
<summary>缺少用量：${report.reviewQueues.missingAmounts.length} 项（只允许从可靠来源补录）</summary>

| 食谱 | 食材 ID | 食材 | 当前说明 |
| :--- | :--- | :--- | :--- |
${missingAmountRows.join('\n')}

</details>

> 完整机器可读记录（含全部校验状态和动作元数据候选）见 \`reports/database-audit/database-audit.json\`。
`

fs.writeFileSync(path.join(reportDir, 'database-audit.md'), markdown, 'utf8')

console.log(JSON.stringify(summary, null, 2))
console.log(`\n报告：${path.join(reportDir, 'database-audit.md')}`)
