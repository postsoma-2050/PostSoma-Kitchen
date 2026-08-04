import type { FormulaItem } from '@/types/formula'
import type { IngredientCategory, V3Ingredient, VisualRecipeV3 } from '@/types/recipeV3'
import { INGREDIENT_CONCEPT_SEEDS, type IngredientConceptSeed } from './ingredientConceptSeeds'
import type {
  FridgeIngredientIndex,
  IndexedRecipe,
  IndexedRecipeIngredient,
  IngredientConcept,
  IngredientConfidence,
  IngredientLedgerAudit,
  IngredientMatchRole,
  IngredientPublicCategory,
  IngredientReviewStatus,
  IngredientSourceKind,
  IngredientSourceReference,
  IngredientStorageAttribute,
} from './ingredientTypes'

const PUBLIC_CATEGORIES: IngredientPublicCategory[] = [
  'meat_poultry_eggs_tofu',
  'seafood',
  'vegetables_mushrooms_aromatics',
  'grains_noodles_tubers',
  'beans_nuts_seeds',
  'dairy_fats',
  'seasonings_sauces',
  'processed_staples',
]

const COMPOUND_MARKER = /(?:与|和|及|、|[&+＋])/i
const SEAFOOD_MARKER = /鱼|虾|鳝|贝|蟹|海参|鲍鱼|蛤|牡蛎|鱿鱼|章鱼|seafood|shrimp|fish|scallop/i
const NUT_BEAN_MARKER = /(?:蚕豆|青豆|豌豆|红豆|绿豆|黄豆|芸豆|扁豆|花生|核桃|碧根果|杏仁|腰果|芝麻|板栗|pecan|peanut|butter bean|\bbeans?\b|\bpeas?\b|lentil)/i

interface SourceResolution {
  conceptId: string
  safelyNormalized: boolean
  reviewStatus: IngredientReviewStatus
  confidence: IngredientConfidence
}

function normalizeLookupText(value: string): string {
  return value.normalize('NFKC').trim().replace(/\s+/g, ' ').toLowerCase()
}

function stableHash(value: string): string {
  let hash = 0x811c9dc5
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index)
    hash = Math.imul(hash, 0x01000193)
  }
  return (hash >>> 0).toString(36).padStart(7, '0')
}

function fallbackCategory(rawName: string, sourceCategory?: IngredientCategory): IngredientPublicCategory {
  if (SEAFOOD_MARKER.test(rawName)) return 'seafood'
  if (NUT_BEAN_MARKER.test(rawName)) return 'beans_nuts_seeds'
  if (sourceCategory === 'main') return 'meat_poultry_eggs_tofu'
  if (sourceCategory === 'produce') return 'vegetables_mushrooms_aromatics'
  if (sourceCategory === 'grain') return 'grains_noodles_tubers'
  if (sourceCategory === 'dairy') return 'dairy_fats'
  if (sourceCategory === 'seasoning' || sourceCategory === 'liquid') return 'seasonings_sauces'
  if (sourceCategory === 'formula') return 'processed_staples'
  return 'processed_staples'
}

function inferStorageAttributes(rawName: string): IngredientStorageAttribute[] {
  const attributes = new Set<IngredientStorageAttribute>()
  if (/冷冻|frozen/i.test(rawName)) attributes.add('frozen')
  if (/罐头|罐\b|\bcan(?:ned)?\b|\bjar\b/i.test(rawName)) attributes.add('canned')
  if (/脱水|干制|干货|dried|dry\b/i.test(rawName)) attributes.add('dried')
  if (/预拌|mix\b|酱|奶精|起酥|processed/i.test(rawName)) attributes.add('processed')
  if (/新鲜|鲜(?:肉|鱼|虾|贝|菜|果)|fresh/i.test(rawName)) attributes.add('fresh')
  return [...attributes]
}

function createConceptFromSeed(seed: IngredientConceptSeed): IngredientConcept {
  return {
    id: seed.id,
    displayName: seed.displayName,
    aliases: [...new Set([seed.displayName, ...seed.aliases])],
    category: seed.category,
    defaultRole: seed.defaultRole,
    storageAttributes: [...new Set(seed.storageAttributes || [])],
    isBasicPantry: Boolean(seed.isBasicPantry),
    allowLooseMatch: Boolean(seed.allowLooseMatch),
    confidence: seed.confidence || 'high',
    reviewStatus: seed.reviewStatus || 'reviewed',
    sourceNames: [],
    sourceReferences: [],
  }
}

function createFallbackConcept(
  rawName: string,
  sourceCategory: IngredientCategory | undefined,
  isCompound: boolean,
): IngredientConcept {
  const normalized = normalizeLookupText(rawName)
  const reviewStatus: IngredientReviewStatus = isCompound ? 'unresolved' : 'needs-review'
  return {
    id: `ing-raw-${stableHash(normalized)}`,
    displayName: rawName.trim(),
    aliases: [rawName.trim()],
    category: fallbackCategory(rawName, sourceCategory),
    defaultRole: sourceCategory === 'seasoning' || sourceCategory === 'liquid' ? 'seasoning' : 'supporting',
    storageAttributes: inferStorageAttributes(rawName),
    isBasicPantry: false,
    allowLooseMatch: false,
    confidence: isCompound ? 'low' : 'medium',
    reviewStatus,
    sourceNames: [],
    sourceReferences: [],
  }
}

function seedMatchesSource(seed: IngredientConceptSeed, rawName: string): boolean {
  const normalized = normalizeLookupText(rawName)
  if ([seed.displayName, ...seed.aliases].some(alias => normalizeLookupText(alias) === normalized)) return true
  return (seed.sourcePatterns || []).some(pattern => {
    pattern.lastIndex = 0
    return pattern.test(rawName.trim())
  })
}

function sourceKey(recipeId: string, sourceKind: IngredientSourceKind, sourceId: string): string {
  return `${recipeId}\u0000${sourceKind}\u0000${sourceId}`
}

function firstKeyIngredientIndex(recipe: VisualRecipeV3): number {
  return (recipe.ingredients || []).findIndex(ingredient => (
    ingredient.category !== 'seasoning'
    && ingredient.category !== 'liquid'
    && ingredient.category !== 'formula'
  ))
}

function resolveIngredientRole(
  ingredient: V3Ingredient,
  concept: IngredientConcept,
  ingredientIndex: number,
  firstKeyIndex: number,
): IngredientMatchRole {
  if (ingredient.category === 'formula') return 'formula'
  if (concept.isBasicPantry) return 'pantry'
  if (ingredient.category === 'seasoning' || ingredient.category === 'liquid') return 'seasoning'
  if (ingredient.category === 'main') return 'key'
  if (concept.defaultRole === 'key' || ingredientIndex === firstKeyIndex) return 'key'
  return 'supporting'
}

function formulaItemSourceId(formulaId: string, item: FormulaItem, index: number): string {
  return `${formulaId}:${item.id || index}`
}

export function buildFridgeIngredientIndex(recipes: VisualRecipeV3[]): FridgeIngredientIndex {
  const seedConcepts = new Map(INGREDIENT_CONCEPT_SEEDS.map(seed => [seed.id, createConceptFromSeed(seed)]))
  const concepts = new Map<string, IngredientConcept>()
  const sourceResolutions = new Map<string, SourceResolution>()
  let ingredientSourceCount = 0
  let formulaItemSourceCount = 0
  let safelyNormalizedSourceCount = 0
  let needsReviewSourceCount = 0
  let unresolvedSourceCount = 0
  let compoundSourceCount = 0

  const registerSource = (
    recipe: VisualRecipeV3,
    sourceKind: IngredientSourceKind,
    sourceId: string,
    rawName: string,
    sourceCategory?: IngredientCategory,
  ): SourceResolution => {
    const isCompound = COMPOUND_MARKER.test(rawName)
    if (isCompound) compoundSourceCount += 1

    const seed = INGREDIENT_CONCEPT_SEEDS.find(candidate => seedMatchesSource(candidate, rawName))
    let concept: IngredientConcept
    let safelyNormalized = false
    if (seed) {
      concept = concepts.get(seed.id) || seedConcepts.get(seed.id)!
      safelyNormalized = true
    } else {
      const fallback = createFallbackConcept(rawName, sourceCategory, isCompound)
      const existing = concepts.get(fallback.id)
      if (existing && normalizeLookupText(existing.displayName) !== normalizeLookupText(rawName)) {
        throw new Error(`食材概念稳定 ID 冲突：${existing.displayName} / ${rawName}`)
      }
      concept = existing || fallback
    }

    concepts.set(concept.id, concept)
    if (!concept.sourceNames.includes(rawName)) concept.sourceNames.push(rawName)
    const reference: IngredientSourceReference = {
      recipeId: recipe.id,
      recipeTitle: recipe.title,
      sourceKind,
      sourceId,
      originalName: rawName,
    }
    concept.sourceReferences.push(reference)

    if (safelyNormalized) safelyNormalizedSourceCount += 1
    else if (concept.reviewStatus === 'unresolved') unresolvedSourceCount += 1
    else needsReviewSourceCount += 1

    const resolution: SourceResolution = {
      conceptId: concept.id,
      safelyNormalized,
      reviewStatus: concept.reviewStatus,
      confidence: concept.confidence,
    }
    sourceResolutions.set(sourceKey(recipe.id, sourceKind, sourceId), resolution)
    return resolution
  }

  for (const recipe of recipes) {
    for (const ingredient of recipe.ingredients || []) {
      ingredientSourceCount += 1
      registerSource(recipe, 'ingredient', ingredient.id, ingredient.name, ingredient.category)
    }
    for (const formula of recipe.formulas || []) {
      formula.items.forEach((item, index) => {
        formulaItemSourceCount += 1
        registerSource(recipe, 'formula-item', formulaItemSourceId(formula.id, item, index), item.name, 'seasoning')
      })
    }
  }

  const indexedRecipes: IndexedRecipe[] = recipes.map(recipe => {
    const firstKeyIndex = firstKeyIngredientIndex(recipe)
    const indexedIngredients: IndexedRecipeIngredient[] = (recipe.ingredients || []).map((ingredient, index) => {
      const resolution = sourceResolutions.get(sourceKey(recipe.id, 'ingredient', ingredient.id))!
      const concept = concepts.get(resolution.conceptId)!
      return {
        conceptId: concept.id,
        originalName: ingredient.name,
        sourceKind: 'ingredient',
        sourceId: ingredient.id,
        role: resolveIngredientRole(ingredient, concept, index, firstKeyIndex),
        isBasicPantry: concept.isBasicPantry,
        confidence: resolution.confidence,
      }
    })

    for (const formula of recipe.formulas || []) {
      formula.items.forEach((item, index) => {
        const id = formulaItemSourceId(formula.id, item, index)
        const resolution = sourceResolutions.get(sourceKey(recipe.id, 'formula-item', id))!
        const concept = concepts.get(resolution.conceptId)!
        indexedIngredients.push({
          conceptId: concept.id,
          originalName: item.name,
          sourceKind: 'formula-item',
          sourceId: id,
          role: 'formula',
          isBasicPantry: concept.isBasicPantry,
          confidence: resolution.confidence,
        })
      })
    }

    return { recipe, ingredients: indexedIngredients }
  })

  const aliasToConceptId = new Map<string, string>()
  for (const concept of concepts.values()) {
    for (const alias of concept.aliases) {
      const normalized = normalizeLookupText(alias)
      const existing = aliasToConceptId.get(normalized)
      if (existing && existing !== concept.id) continue
      aliasToConceptId.set(normalized, concept.id)
    }
  }

  const categoryConceptCounts = Object.fromEntries(PUBLIC_CATEGORIES.map(category => [category, 0])) as Record<IngredientPublicCategory, number>
  for (const concept of concepts.values()) categoryConceptCounts[concept.category] += 1

  const audit: IngredientLedgerAudit = {
    recipeCount: recipes.length,
    ingredientSourceCount,
    formulaItemSourceCount,
    conceptCount: concepts.size,
    safelyNormalizedSourceCount,
    needsReviewSourceCount,
    unresolvedSourceCount,
    compoundSourceCount,
    categoryConceptCounts,
  }

  const sortedConcepts = [...concepts.values()].sort((left, right) => (
    left.category.localeCompare(right.category) || left.displayName.localeCompare(right.displayName, 'zh-CN')
  ))

  return {
    concepts: sortedConcepts,
    conceptById: new Map(sortedConcepts.map(concept => [concept.id, concept])),
    aliasToConceptId,
    recipes: indexedRecipes,
    audit,
  }
}

export function resolveUserIngredientText(index: FridgeIngredientIndex, value: string): string | null {
  const normalized = normalizeLookupText(value)
  if (!normalized) return null
  return index.aliasToConceptId.get(normalized) || null
}

export function createUnrecognizedIngredientId(value: string): string {
  return `custom-${stableHash(normalizeLookupText(value))}`
}
