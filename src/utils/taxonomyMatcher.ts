import {
  COOKING_METHODS,
  CUISINE_STYLES,
  DIFFICULTIES,
  type CookingMethodCode,
  type CuisineStyleCode
} from '@/constants/taxonomy'
import type { VisualRecipeV3 } from '@/types/recipeV3'

/**
 * 常见烹饪方式同义词映射字典
 */
const METHOD_SYNONYMS: Record<string, CookingMethodCode> = {
  '爆炒': 'fry', '炒': 'fry', '煎': 'sear', '香煎': 'sear',
  '煎炒': 'fry', '红烧': 'stew', '慢炖': 'stew',
  '清蒸': 'steam', '蒸': 'steam', '水煮': 'boil', '焯水': 'boil',
  '凉拌': 'serve', '生食': 'raw', '烘焙': 'bake', '烤': 'bake'
}

/**
 * 常见菜系同义词映射字典
 */
const CUISINE_SYNONYMS: Record<string, CuisineStyleCode> = {
  '中式': 'chinese', '川菜': 'chinese', '粤菜': 'chinese',
  '鲁菜': 'chinese', '家常菜': 'chinese',
  '西式': 'western', '美式': 'western', '意式': 'western', '法式': 'western',
  '日式': 'japanese_korean', '韩式': 'japanese_korean',
  '泰式': 'southeast_asian', '越式': 'southeast_asian'
}

export function matchSynonymCookingMethod(raw: string): CookingMethodCode | null {
  if (!raw) return null
  const cleaned = raw.trim().toLowerCase()
  for (const [key, code] of Object.entries(METHOD_SYNONYMS)) {
    if (cleaned.includes(key)) return code
  }
  const isStd = COOKING_METHODS.some(m => m.code === cleaned)
  return isStd ? (cleaned as CookingMethodCode) : null
}

export function matchSynonymCuisineStyle(raw: string): CuisineStyleCode | null {
  if (!raw) return null
  const cleaned = raw.trim().toLowerCase()
  for (const [key, code] of Object.entries(CUISINE_SYNONYMS)) {
    if (cleaned.includes(key)) return code
  }
  const isStd = CUISINE_STYLES.some(c => c.code === cleaned)
  return isStd ? (cleaned as CuisineStyleCode) : null
}

// ─────────────────────────────────────────────────────────────
// 结构化校验结果类型
// ─────────────────────────────────────────────────────────────

export type ValidationSeverity = 'error' | 'warning'

export interface ValidationIssue {
  severity: ValidationSeverity
  code: string           // 机器可读错误码，如 'MISSING_AMOUNT'
  field: string          // 受影响字段/区域
  message: string        // 人类可读的中文说明
  affectedIds?: string[] // 受影响的 id 列表（食材 id 或工序 id）
}

export interface RecipeValidationResult {
  /** 是否通过全部发布阻断校验（所有 error 级 issue 均通过） */
  canPublish: boolean
  /** 草稿质量是否达到最低可保存标准 */
  canSaveDraft: boolean
  /** 完整度评分 0-100（用于后台健康面板展示） */
  completenessScore: number
  /** 所有 issue 列表（error + warning） */
  issues: ValidationIssue[]
  /** 仅 error 级（发布阻断项） */
  errors: ValidationIssue[]
  /** 仅 warning 级（建议改善项） */
  warnings: ValidationIssue[]
}

// ─────────────────────────────────────────────────────────────
// 完整食谱数据校验
// ─────────────────────────────────────────────────────────────

/**
 * 对食谱进行全面的结构化多层校验。
 *
 * 错误 (error)：发布必须修复，阻断 saveV3Recipe(published)
 * 警告 (warning)：建议修复，不阻断保存，但影响 completenessScore
 */
export function validateRecipe(recipe: VisualRecipeV3): RecipeValidationResult {
  const issues: ValidationIssue[] = []

  // ── 1. 基础必填字段 ─────────────────────────────────────────
  if (!recipe.title || !recipe.title.trim()) {
    issues.push({
      severity: 'error',
      code: 'MISSING_TITLE',
      field: 'title',
      message: '食谱名称不能为空',
    })
  }

  // ── 2. 食材列表校验 ─────────────────────────────────────────
  if (!recipe.ingredients || recipe.ingredients.length === 0) {
    issues.push({
      severity: 'error',
      code: 'NO_INGREDIENTS',
      field: 'ingredients',
      message: '食谱必须至少包含一项食材',
    })
  } else {
    const ingredientIdCounts = new Map<string, number>()
    recipe.ingredients.forEach(ingredient => {
      ingredientIdCounts.set(ingredient.id, (ingredientIdCounts.get(ingredient.id) || 0) + 1)
    })
    const duplicateIngredientIds = [...ingredientIdCounts.entries()]
      .filter(([, count]) => count > 1)
      .map(([id]) => id)
    if (duplicateIngredientIds.length > 0) {
      issues.push({
        severity: 'error',
        code: 'DUPLICATE_INGREDIENT_ID',
        field: 'ingredients.id',
        message: `食材 ID 必须唯一，发现重复项：${duplicateIngredientIds.join('、')}`,
        affectedIds: duplicateIngredientIds,
      })
    }

    // 2a. 检查无名食材
    const unnamedIds = recipe.ingredients
      .filter(i => !i.name || !i.name.trim())
      .map(i => i.id)
    if (unnamedIds.length > 0) {
      issues.push({
        severity: 'error',
        code: 'UNNAMED_INGREDIENT',
        field: 'ingredients.name',
        message: `${unnamedIds.length} 项食材名称为空，请补充食材名称`,
        affectedIds: unnamedIds,
      })
    }

    // 2b. 检查无用量食材（warning，不阻断发布）
    const missingAmountIds = recipe.ingredients
      .filter(i => i.category !== 'formula' && (!i.amountText || !i.amountText.trim()))
      .map(i => i.id)
    if (missingAmountIds.length > 0) {
      const names = missingAmountIds
        .map(id => recipe.ingredients.find(x => x.id === id)?.name || id)
        .join('、')
      issues.push({
        severity: 'warning',
        code: 'MISSING_AMOUNT',
        field: 'ingredients.amountText',
        message: `以下食材缺少用量：${names}`,
        affectedIds: missingAmountIds,
      })
    }

    // 2c. 检查 formula 类食材的 formulaId 是否在 formulas[] 中有对应记录
    const formulaIngredients = recipe.ingredients.filter(i => i.category === 'formula')
    const formulaIds = new Set((recipe.formulas || []).map(f => f.id))
    const brokenFormulaIds = formulaIngredients
      .filter(i => !i.formulaId || !formulaIds.has(i.formulaId))
      .map(i => i.id)
    if (brokenFormulaIds.length > 0) {
      const names = brokenFormulaIds
        .map(id => recipe.ingredients.find(x => x.id === id)?.name || id)
        .join('、')
      issues.push({
        severity: 'error',
        code: 'BROKEN_FORMULA_REF',
        field: 'ingredients.formulaId',
        message: `以下复合配方食材的 formulaId 在 formulas[] 中找不到对应配方：${names}`,
        affectedIds: brokenFormulaIds,
      })
    }
  }

  // ── 3. 工序节点校验 ─────────────────────────────────────────
  if (!recipe.actionBlocks || recipe.actionBlocks.length === 0) {
    issues.push({
      severity: 'error',
      code: 'NO_ACTION_BLOCKS',
      field: 'actionBlocks',
      message: '食谱必须至少包含一个工序节点',
    })
  } else {
    const ingredientIdSet = new Set((recipe.ingredients || []).map(i => i.id))
    const blockIdCounts = new Map<string, number>()
    recipe.actionBlocks.forEach(block => {
      blockIdCounts.set(block.id, (blockIdCounts.get(block.id) || 0) + 1)
    })
    const duplicateBlockIds = [...blockIdCounts.entries()]
      .filter(([, count]) => count > 1)
      .map(([id]) => id)
    if (duplicateBlockIds.length > 0) {
      issues.push({
        severity: 'error',
        code: 'DUPLICATE_ACTION_BLOCK_ID',
        field: 'actionBlocks.id',
        message: `工序 ID 必须唯一，发现重复项：${duplicateBlockIds.join('、')}`,
        affectedIds: duplicateBlockIds,
      })
    }

    // 3a. 孤立工序（无关联食材）—— 发布必须修复
    const isolatedBlockIds = recipe.actionBlocks
      .filter(b => !b.ingredientIds || b.ingredientIds.length === 0)
      .map(b => b.id)
    if (isolatedBlockIds.length > 0) {
      const labels = isolatedBlockIds
        .map(id => recipe.actionBlocks.find(b => b.id === id)?.label || id)
        .join('、')
      issues.push({
        severity: 'error',
        code: 'ISOLATED_ACTION_BLOCK',
        field: 'actionBlocks.ingredientIds',
        message: `以下工序未关联任何食材，Matrix Flow 将显示占位符：${labels}`,
        affectedIds: isolatedBlockIds,
      })
    }

    // 3b. 引用已不存在食材 id 的工序 —— 发布必须修复
    const brokenRefBlocks: string[] = []
    const brokenRefDetail: string[] = []
    recipe.actionBlocks.forEach(block => {
      const missing = (block.ingredientIds || []).filter(id => !ingredientIdSet.has(id))
      if (missing.length > 0) {
        brokenRefBlocks.push(block.id)
        brokenRefDetail.push(`工序「${block.label}」引用了已删除的食材 id: ${missing.join(', ')}`)
      }
    })
    if (brokenRefBlocks.length > 0) {
      issues.push({
        severity: 'error',
        code: 'BROKEN_INGREDIENT_REF',
        field: 'actionBlocks.ingredientIds',
        message: `存在断裂的食材引用，请修复后再发布：\n${brokenRefDetail.join('\n')}`,
        affectedIds: brokenRefBlocks,
      })
    }

    // 3c. 工序依赖必须引用现存工序，不允许自引用
    const actionBlockIdSet = new Set(recipe.actionBlocks.map(block => block.id))
    const brokenDependencyBlocks: string[] = []
    const selfDependencyBlocks: string[] = []
    recipe.actionBlocks.forEach(block => {
      const dependencies = block.inputBlockIds || []
      if (dependencies.some(id => id === block.id)) selfDependencyBlocks.push(block.id)
      if (dependencies.some(id => !actionBlockIdSet.has(id))) brokenDependencyBlocks.push(block.id)
    })

    if (brokenDependencyBlocks.length > 0) {
      issues.push({
        severity: 'error',
        code: 'BROKEN_ACTION_DEPENDENCY',
        field: 'actionBlocks.inputBlockIds',
        message: '存在引用已删除或不存在上游工序的依赖关系',
        affectedIds: [...new Set(brokenDependencyBlocks)],
      })
    }

    if (selfDependencyBlocks.length > 0) {
      issues.push({
        severity: 'error',
        code: 'SELF_ACTION_DEPENDENCY',
        field: 'actionBlocks.inputBlockIds',
        message: '工序不能把自身设置为上游依赖',
        affectedIds: [...new Set(selfDependencyBlocks)],
      })
    }

    // 3d. 检测工序依赖图中的循环，防止布局无法形成明确时序
    const blockById = new Map(recipe.actionBlocks.map(block => [block.id, block]))
    const visitState = new Map<string, 'visiting' | 'visited'>()
    const cycleIds = new Set<string>()

    function visitBlock(blockId: string, path: string[]) {
      if (visitState.get(blockId) === 'visiting') {
        const cycleStart = path.indexOf(blockId)
        path.slice(cycleStart >= 0 ? cycleStart : 0).forEach(id => cycleIds.add(id))
        cycleIds.add(blockId)
        return
      }
      if (visitState.get(blockId) === 'visited') return

      visitState.set(blockId, 'visiting')
      const block = blockById.get(blockId)
      for (const dependencyId of block?.inputBlockIds || []) {
        if (dependencyId !== blockId && blockById.has(dependencyId)) {
          visitBlock(dependencyId, [...path, blockId])
        }
      }
      visitState.set(blockId, 'visited')
    }

    recipe.actionBlocks.forEach(block => visitBlock(block.id, []))
    if (cycleIds.size > 0) {
      issues.push({
        severity: 'error',
        code: 'CYCLIC_ACTION_DEPENDENCY',
        field: 'actionBlocks.inputBlockIds',
        message: '工序依赖形成循环，无法确定先后顺序',
        affectedIds: [...cycleIds],
      })
    }

    // 3e. 工序缺少标签名 —— 警告
    const unnamedBlockIds = recipe.actionBlocks
      .filter(b => !b.label || !b.label.trim())
      .map(b => b.id)
    if (unnamedBlockIds.length > 0) {
      issues.push({
        severity: 'warning',
        code: 'UNNAMED_ACTION_BLOCK',
        field: 'actionBlocks.label',
        message: `${unnamedBlockIds.length} 个工序节点缺少名称标签`,
        affectedIds: unnamedBlockIds,
      })
    }
  }

  // ── 4. 终点烹饪栏校验 ────────────────────────────────────────
  if (!recipe.finalBlock) {
    issues.push({
      severity: 'error',
      code: 'MISSING_FINAL_BLOCK',
      field: 'finalBlock',
      message: '发布食谱必须设定最终烹饪或装盘方式（finalBlock）',
    })
  } else {
    if (!recipe.finalBlock.label || !recipe.finalBlock.label.trim()) {
      issues.push({
        severity: 'warning',
        code: 'MISSING_FINAL_LABEL',
        field: 'finalBlock.label',
        message: 'Matrix Flow 右侧终点栏标题为空，建议填写（如：大火爆炒 / 装盘即享）',
      })
    }

    // 对非冷食方式，缺少时长是警告
    const method = recipe.finalBlock.method
    if (method !== 'serve' && method !== 'raw') {
      if (!recipe.finalBlock.durationText && !recipe.finalBlock.durationMinMinutes && !recipe.finalBlock.durationMaxMinutes) {
        issues.push({
          severity: 'warning',
          code: 'MISSING_DURATION',
          field: 'finalBlock.durationText',
          message: '建议填写最终烹饪的大约时长（如：30 min），方便访客规划备料时间',
        })
      }
    }
  }

  // ── 5. Taxonomy 分类字段校验（发布阻断） ────────────────────────
  const methodValid = COOKING_METHODS.some(m => m.code === recipe.finalBlock?.method)
  if (!methodValid) {
    issues.push({
      severity: 'error',
      code: 'INVALID_COOKING_METHOD',
      field: 'finalBlock.method',
      message: '烹饪方式不是有效的标准分类码（请在编辑器中重新选择）',
    })
  }

  const cuisineValid = CUISINE_STYLES.some(c => c.code === recipe.cuisine)
  if (!cuisineValid) {
    issues.push({
      severity: 'error',
      code: 'INVALID_CUISINE',
      field: 'cuisine',
      message: `菜系风味 "${recipe.cuisine}" 不是有效分类，请在编辑器中重新选择`,
    })
  }

  const difficultyValid = DIFFICULTIES.some(d => d.code === recipe.difficulty)
  if (!difficultyValid) {
    issues.push({
      severity: 'warning',
      code: 'INVALID_DIFFICULTY',
      field: 'difficulty',
      message: '烹饪难度未设置或值无效，发布后筛选器无法正确过滤',
    })
  }

  // ── 6. Formula 内部完整性校验 ──────────────────────────────────
  if (recipe.formulas && recipe.formulas.length > 0) {
    recipe.formulas.forEach(f => {
      if (!f.items || f.items.length === 0) {
        issues.push({
          severity: 'error',
          code: 'EMPTY_FORMULA',
          field: 'formulas.items',
          message: `复合配方「${f.name}」没有任何配料条目（items 为空）`,
          affectedIds: [f.id],
        })
      }

      const missingAmountItems = (f.items || []).filter(item => !item.baseAmount || item.baseAmount <= 0)
      if (missingAmountItems.length > 0) {
        issues.push({
          severity: 'warning',
          code: 'FORMULA_MISSING_AMOUNT',
          field: 'formulas.items.baseAmount',
          message: `配方「${f.name}」中有 ${missingAmountItems.length} 项配料缺少有效用量数值`,
          affectedIds: [f.id],
        })
      }
    })
  }

  // ── 7. 完整度评分计算 ──────────────────────────────────────────
  const errors = issues.filter(i => i.severity === 'error')
  const warnings = issues.filter(i => i.severity === 'warning')

  // 评分权重：从满分 100 开始，每个 error 扣 15 分，每个 warning 扣 5 分
  const rawScore = 100 - errors.length * 15 - warnings.length * 5
  const completenessScore = Math.max(0, Math.min(100, rawScore))

  const canPublish = errors.length === 0
  // 草稿只要标题非空就可保存
  const titleOk = recipe.title && recipe.title.trim().length > 0
  const canSaveDraft = Boolean(titleOk)

  return {
    canPublish,
    canSaveDraft,
    completenessScore,
    issues,
    errors,
    warnings,
  }
}

/**
 * @deprecated 使用 validateRecipe() 替代此函数，保留为向后兼容
 */
export function validateRecipeTaxonomyForPublish(recipe: VisualRecipeV3): { isValid: boolean; missingFields: string[] } {
  const result = validateRecipe(recipe)
  return {
    isValid: result.canPublish,
    missingFields: result.errors.map(e => e.message),
  }
}
