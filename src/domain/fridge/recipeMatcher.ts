import type {
  FridgeIngredientIndex,
  IndexedRecipeIngredient,
  IngredientConfidence,
  IngredientMatchRole,
  KeySubstituteDetail,
  MatchedIngredientExplanation,
  RecipeIngredientMatchResult,
  RecipeMatchOptions,
  RecipeMatchPage,
  UnrecognizedUserIngredient,
  UserIngredientSelection,
} from './ingredientTypes'
import { createUnrecognizedIngredientId } from './ingredientLedger'
import { findBestSubstitute } from '../flavor/engine'

const ROLE_PRIORITY: Record<IngredientMatchRole, number> = {
  key: 5,
  supporting: 4,
  formula: 3,
  seasoning: 2,
  pantry: 1,
}

const ROLE_WEIGHT: Record<IngredientMatchRole, number> = {
  key: 4,
  supporting: 2,
  formula: 1,
  seasoning: 1,
  pantry: 0.5,
}

interface GroupedRecipeIngredient {
  conceptId: string
  role: IngredientMatchRole
  isBasicPantry: boolean
  confidence: IngredientConfidence
  originalNames: string[]
}

function normalizeCustomInput(value: string): string {
  return value.normalize('NFKC').trim().replace(/\s+/g, ' ')
}

function normalizeSelection(index: FridgeIngredientIndex, selection: UserIngredientSelection) {
  const selectedConceptIds = [...new Set(selection.conceptIds)]
    .filter(conceptId => index.conceptById.has(conceptId))

  const seenCustomInputs = new Set<string>()
  const unrecognizedUserInputs: UnrecognizedUserIngredient[] = []
  for (const rawValue of selection.customInputs || []) {
    const displayName = normalizeCustomInput(rawValue)
    if (!displayName) continue
    const lookupKey = displayName.toLowerCase()
    if (seenCustomInputs.has(lookupKey)) continue
    seenCustomInputs.add(lookupKey)
    unrecognizedUserInputs.push({
      id: createUnrecognizedIngredientId(displayName),
      displayName,
      status: 'unrecognized',
    })
  }

  return { selectedConceptIds, unrecognizedUserInputs }
}

function strongerRole(left: IngredientMatchRole, right: IngredientMatchRole): IngredientMatchRole {
  return ROLE_PRIORITY[left] >= ROLE_PRIORITY[right] ? left : right
}

function lowerConfidence(left: IngredientConfidence, right: IngredientConfidence): IngredientConfidence {
  const rank: Record<IngredientConfidence, number> = { high: 3, medium: 2, low: 1 }
  return rank[left] <= rank[right] ? left : right
}

function groupRecipeIngredients(ingredients: IndexedRecipeIngredient[]): GroupedRecipeIngredient[] {
  const grouped = new Map<string, GroupedRecipeIngredient>()
  for (const ingredient of ingredients) {
    const existing = grouped.get(ingredient.conceptId)
    if (!existing) {
      grouped.set(ingredient.conceptId, {
        conceptId: ingredient.conceptId,
        role: ingredient.role,
        isBasicPantry: ingredient.isBasicPantry,
        confidence: ingredient.confidence,
        originalNames: [ingredient.originalName],
      })
      continue
    }
    existing.role = strongerRole(existing.role, ingredient.role)
    existing.isBasicPantry ||= ingredient.isBasicPantry
    existing.confidence = lowerConfidence(existing.confidence, ingredient.confidence)
    if (!existing.originalNames.includes(ingredient.originalName)) existing.originalNames.push(ingredient.originalName)
  }
  return [...grouped.values()]
}

function explainIngredient(index: FridgeIngredientIndex, ingredient: GroupedRecipeIngredient): MatchedIngredientExplanation {
  const concept = index.conceptById.get(ingredient.conceptId)
  if (!concept) throw new Error(`匹配索引缺少食材概念：${ingredient.conceptId}`)
  return {
    conceptId: concept.id,
    displayName: concept.displayName,
    role: ingredient.role,
    recipeSourceNames: ingredient.originalNames,
  }
}

function confidenceFor(groups: GroupedRecipeIngredient[]): IngredientConfidence {
  if (groups.some(group => group.confidence === 'low')) return 'low'
  if (groups.some(group => group.confidence === 'medium')) return 'medium'
  return 'high'
}

function buildResult(
  index: FridgeIngredientIndex,
  ingredients: IndexedRecipeIngredient[],
  recipe: FridgeIngredientIndex['recipes'][number]['recipe'],
  selectedConceptIds: string[],
  unrecognizedUserInputs: UnrecognizedUserIngredient[],
  options?: RecipeMatchOptions,
): RecipeIngredientMatchResult | null {
  const selected = new Set(selectedConceptIds)
  const grouped = groupRecipeIngredients(ingredients)
  const matched = grouped.filter(group => selected.has(group.conceptId))

  // 基础调味、普通辅料或 Formula 原料不能单独把一道食谱推入“可参考”候选。
  const hasMatchedKeyIngredient = matched.some(group => group.role === 'key' && !group.isBasicPantry)

  let isSubstituteMatch = false
  let keySubstitute: KeySubstituteDetail | undefined

  // 平替判定逻辑：当 hasMatchedKeyIngredient 为 false 时，检查是否存在 score >= 0.30 的关键主料平替
  if (!hasMatchedKeyIngredient && options) {
    const missingKeyGroups = grouped.filter(group => group.role === 'key' && !group.isBasicPantry && !selected.has(group.conceptId))

    // 收集用户当前手头食材名称列表 (已识别概念 displayName + 自定义输入)
    const availableIngredientNames: string[] = [
      ...selectedConceptIds.map(id => index.conceptById.get(id)?.displayName).filter((name): name is string => Boolean(name)),
      ...unrecognizedUserInputs.map(item => item.displayName),
    ]

    if (availableIngredientNames.length > 0 && missingKeyGroups.length > 0) {
      for (const keyGroup of missingKeyGroups) {
        const concept = index.conceptById.get(keyGroup.conceptId)
        const missingName = concept?.displayName || keyGroup.originalNames[0]

        let sub: { substituteZh: string; score: number } | null = null
        if (options.findSubstitute) {
          sub = options.findSubstitute(missingName, availableIngredientNames)
        } else if (options.flavorEngine) {
          const res = options.flavorEngine.findBestSubstitute(missingName, availableIngredientNames, 0.30)
          if (res && res.score >= 0.30) sub = res
        } else if (options.flavorDataset) {
          const res = findBestSubstitute(missingName, availableIngredientNames, options.flavorDataset, 0.30)
          if (res && res.score >= 0.30) sub = res
        }

        if (sub && sub.score >= 0.30) {
          isSubstituteMatch = true
          keySubstitute = {
            originalConceptId: keyGroup.conceptId,
            originalDisplayName: missingName,
            substituteDisplayName: sub.substituteZh,
            score: sub.score,
          }
          break // 命中 Top 1 关键主料平替
        }
      }
    }
  }

  // 门禁：既无直接命中关键食材，又无高分平替，直接拦截
  if (!hasMatchedKeyIngredient && !isSubstituteMatch) return null

  const missing = grouped.filter(group => !selected.has(group.conceptId))
  const missingKey = missing.filter(group => group.role === 'key' && !group.isBasicPantry)
  const missingPantry = missing.filter(group => group.isBasicPantry)
  const missingOrdinary = missing.filter(group => !group.isBasicPantry && group.role !== 'key')

  const selectedNonPantry = selectedConceptIds.filter(conceptId => !index.conceptById.get(conceptId)?.isBasicPantry)
  const matchedSelected = selectedNonPantry.filter(conceptId => grouped.some(group => group.conceptId === conceptId))
  const totalWeight = grouped.reduce((sum, group) => sum + ROLE_WEIGHT[group.role], 0)
  const matchedWeight = matched.reduce((sum, group) => sum + ROLE_WEIGHT[group.role], 0)

  return {
    recipe,
    matchedIngredients: matched.map(group => explainIngredient(index, group)),
    missingKeyIngredients: missingKey.map(group => explainIngredient(index, group)),
    missingOrdinaryIngredients: missingOrdinary.map(group => explainIngredient(index, group)),
    missingPantryIngredients: missingPantry.map(group => explainIngredient(index, group)),
    unrecognizedUserInputs,
    userIngredientUtilization: {
      matchedConceptIds: matchedSelected,
      unusedConceptIds: selectedNonPantry.filter(conceptId => !matchedSelected.includes(conceptId)),
      matchedCount: matchedSelected.length,
      totalCount: selectedNonPantry.length,
      percentage: selectedNonPantry.length ? Math.round((matchedSelected.length / selectedNonPantry.length) * 100) : 0,
    },
    recipeReadiness: {
      matchedWeight,
      totalWeight,
      percentage: totalWeight ? Math.round((matchedWeight / totalWeight) * 100) : 0,
    },
    // 置信度只评价“为什么进入候选”与关键缺口的概念映射；
    // 未解析的普通调味仍会如实展示，但不会把所有候选一律降为低置信。
    confidence: confidenceFor([...matched, ...missingKey]),
    isSubstituteMatch,
    keySubstitute,
  }
}

function getMatchTier(result: RecipeIngredientMatchResult): number {
  // Tier 1: 完全命中主料 (0 项关键缺口)
  if (!result.isSubstituteMatch && result.missingKeyIngredients.length === 0) {
    return 1
  }
  // Tier 2: 直接命中部分主料 (仅缺 1 项主料，或有其他关键主料直接在手)
  if (!result.isSubstituteMatch && result.missingKeyIngredients.length <= 1) {
    return 2
  }
  // Tier 3: 平替激活食谱 (手边食材可平替关键主料，排在完全命中之后、多缺口食谱之前)
  if (result.isSubstituteMatch) {
    return 3
  }
  // Tier 4: 多缺口食谱 (直接命中但缺 2+ 项关键主料)
  return 4
}

function compareResults(left: RecipeIngredientMatchResult, right: RecipeIngredientMatchResult): number {
  const leftTier = getMatchTier(left)
  const rightTier = getMatchTier(right)
  if (leftTier !== rightTier) {
    return leftTier - rightTier
  }

  // 同为平替激活食谱时，优先展示平替得分更高的
  if (left.isSubstituteMatch && right.isSubstituteMatch) {
    const leftScore = left.keySubstitute?.score || 0
    const rightScore = right.keySubstitute?.score || 0
    if (Math.abs(leftScore - rightScore) > 0.001) {
      return rightScore - leftScore
    }
  }

  const leftKeyMatches = left.matchedIngredients.filter(item => item.role === 'key').length
  const rightKeyMatches = right.matchedIngredients.filter(item => item.role === 'key').length
  return rightKeyMatches - leftKeyMatches
    || right.userIngredientUtilization.matchedCount - left.userIngredientUtilization.matchedCount
    || right.recipeReadiness.percentage - left.recipeReadiness.percentage
    || left.missingKeyIngredients.length - right.missingKeyIngredients.length
    || left.recipe.id.localeCompare(right.recipe.id)
}

/**
 * 只使用审计台账中的稳定概念 ID 做确定性匹配。自定义输入会原样保留给未来 AI 快照，
 * 但不会进入字符串包含、模糊归一或数据库食谱计分。
 */
export function matchPublishedRecipes(
  index: FridgeIngredientIndex,
  selection: UserIngredientSelection,
  options: RecipeMatchOptions = {},
): RecipeMatchPage {
  const { selectedConceptIds, unrecognizedUserInputs } = normalizeSelection(index, selection)
  const results = index.recipes
    .filter(indexed => indexed.recipe.status === 'published' && !indexed.recipe.deletedAt)
    .map(indexed => buildResult(
      index,
      indexed.ingredients,
      indexed.recipe,
      selectedConceptIds,
      unrecognizedUserInputs,
      options,
    ))
    .filter((result): result is RecipeIngredientMatchResult => Boolean(result))
    .sort(compareResults)

  const offset = Math.max(0, Math.trunc(options.offset || 0))
  const limit = Math.min(100, Math.max(1, Math.trunc(options.limit || 12)))
  return {
    results: results.slice(offset, offset + limit),
    unrecognizedUserInputs,
    total: results.length,
    offset,
    limit,
  }
}
