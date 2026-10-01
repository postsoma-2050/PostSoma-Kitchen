import type { VisualRecipeV3 } from '@/types/recipeV3'

export type IngredientPublicCategory =
  | 'meat_poultry_eggs_tofu'
  | 'seafood'
  | 'vegetables_mushrooms_aromatics'
  | 'grains_noodles_tubers'
  | 'beans_nuts_seeds'
  | 'dairy_fats'
  | 'seasonings_sauces'
  | 'processed_staples'

export type IngredientMatchRole = 'key' | 'supporting' | 'seasoning' | 'pantry' | 'formula'
export type IngredientStorageAttribute = 'fresh' | 'dried' | 'canned' | 'frozen' | 'processed'
export type IngredientConfidence = 'high' | 'medium' | 'low'
export type IngredientReviewStatus = 'reviewed' | 'needs-review' | 'unresolved'
export type IngredientSourceKind = 'ingredient' | 'formula-item'

export interface IngredientSourceReference {
  recipeId: string
  recipeTitle: string
  sourceKind: IngredientSourceKind
  sourceId: string
  originalName: string
}

export interface IngredientConcept {
  id: string
  displayName: string
  aliases: string[]
  category: IngredientPublicCategory
  defaultRole: IngredientMatchRole
  storageAttributes: IngredientStorageAttribute[]
  isBasicPantry: boolean
  allowLooseMatch: boolean
  confidence: IngredientConfidence
  reviewStatus: IngredientReviewStatus
  sourceNames: string[]
  sourceReferences: IngredientSourceReference[]
}

export interface IndexedRecipeIngredient {
  conceptId: string
  originalName: string
  sourceKind: IngredientSourceKind
  sourceId: string
  role: IngredientMatchRole
  isBasicPantry: boolean
  confidence: IngredientConfidence
}

export interface IndexedRecipe {
  recipe: VisualRecipeV3
  ingredients: IndexedRecipeIngredient[]
}

export interface IngredientLedgerAudit {
  recipeCount: number
  ingredientSourceCount: number
  formulaItemSourceCount: number
  conceptCount: number
  safelyNormalizedSourceCount: number
  needsReviewSourceCount: number
  unresolvedSourceCount: number
  compoundSourceCount: number
  categoryConceptCounts: Record<IngredientPublicCategory, number>
}

export interface FridgeIngredientIndex {
  concepts: IngredientConcept[]
  conceptById: Map<string, IngredientConcept>
  aliasToConceptId: Map<string, string>
  recipes: IndexedRecipe[]
  audit: IngredientLedgerAudit
}

export interface UserIngredientSelection {
  conceptIds: string[]
  customInputs?: string[]
}

export interface UnrecognizedUserIngredient {
  id: string
  displayName: string
  status: 'unrecognized'
}

export interface MatchedIngredientExplanation {
  conceptId: string
  displayName: string
  role: IngredientMatchRole
  recipeSourceNames: string[]
}

export interface KeySubstituteDetail {
  originalConceptId: string
  originalDisplayName: string
  substituteDisplayName: string
  score: number
}

export interface RecipeIngredientMatchResult {
  recipe: VisualRecipeV3
  matchedIngredients: MatchedIngredientExplanation[]
  missingKeyIngredients: MatchedIngredientExplanation[]
  missingOrdinaryIngredients: MatchedIngredientExplanation[]
  missingPantryIngredients: MatchedIngredientExplanation[]
  unrecognizedUserInputs: UnrecognizedUserIngredient[]
  userIngredientUtilization: {
    matchedConceptIds: string[]
    unusedConceptIds: string[]
    matchedCount: number
    totalCount: number
    percentage: number
  }
  recipeReadiness: {
    matchedWeight: number
    totalWeight: number
    percentage: number
  }
  confidence: IngredientConfidence
  isSubstituteMatch?: boolean
  keySubstitute?: KeySubstituteDetail
}

export interface RecipeMatchPage {
  results: RecipeIngredientMatchResult[]
  unrecognizedUserInputs: UnrecognizedUserIngredient[]
  total: number
  offset: number
  limit: number
}

export interface RecipeMatchOptions {
  offset?: number
  limit?: number
  flavorEngine?: {
    findBestSubstitute: (missingIngredient: string, availableIngredients: string[], minScore?: number) => { substituteZh: string; substituteEn: string; score: number } | null
  }
  flavorDataset?: {
    aliasMap: Record<string, string>
    zhCanonical: Record<string, string>
    similarityTop20: Record<string, Record<string, number>>
  }
  findSubstitute?: (missingName: string, availableNames: string[]) => { substituteZh: string; score: number } | null
}
