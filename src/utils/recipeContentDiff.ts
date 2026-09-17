import crypto from 'crypto'
import type { VisualRecipeV3, V3ActionBlock, V3Ingredient } from '@/types/recipeV3'
import { normalizeRecipe } from '@/services/recipeNormalizer'

const STORAGE_ONLY_KEYS = new Set([
  'contentVersion',
  'deletedAt',
  'createdAt',
  'updatedAt',
  'created_at',
  'updated_at',
  'provenance',
  'dataReview',
])

export interface RecipeContentDifference {
  area: 'identity' | 'prerequisites' | 'ingredients' | 'formulas' | 'actions' | 'final'
  field: string
  localValue?: unknown
  remoteValue?: unknown
}

function canonicalize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonicalize)
  if (!value || typeof value !== 'object') return value

  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>)
      .filter(([key, item]) => !STORAGE_ONLY_KEYS.has(key) && item !== undefined)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, item]) => [key, canonicalize(item)]),
  )
}

export function canonicalRecipeContent(recipe: VisualRecipeV3): unknown {
  return canonicalize(normalizeRecipe(recipe))
}

export function hashRecipeContent(recipe: VisualRecipeV3): string {
  const content = JSON.stringify(canonicalRecipeContent(recipe))
  return crypto.createHash('sha256').update(content).digest('hex').substring(0, 12)
}

function same(a: unknown, b: unknown): boolean {
  return JSON.stringify(canonicalize(a)) === JSON.stringify(canonicalize(b))
}

function compareFields(
  differences: RecipeContentDifference[],
  area: RecipeContentDifference['area'],
  prefix: string,
  local: Record<string, unknown> | undefined,
  remote: Record<string, unknown> | undefined,
  fields: string[],
) {
  for (const field of fields) {
    const localValue = local?.[field]
    const remoteValue = remote?.[field]
    if (!same(localValue, remoteValue)) {
      differences.push({ area, field: `${prefix}${field}`, localValue, remoteValue })
    }
  }
}

function compareById<T extends { id: string }>(
  differences: RecipeContentDifference[],
  area: 'ingredients' | 'actions',
  localItems: T[],
  remoteItems: T[],
  fields: string[],
) {
  const localMap = new Map(localItems.map(item => [item.id, item]))
  const remoteMap = new Map(remoteItems.map(item => [item.id, item]))

  for (const [id, item] of localMap) {
    const remote = remoteMap.get(id)
    if (!remote) {
      differences.push({ area, field: `${area}.${id}`, localValue: item, remoteValue: undefined })
      continue
    }
    compareFields(
      differences,
      area,
      `${area}.${id}.`,
      item as Record<string, unknown>,
      remote as Record<string, unknown>,
      fields,
    )
  }

  for (const [id, item] of remoteMap) {
    if (!localMap.has(id)) {
      differences.push({ area, field: `${area}.${id}`, localValue: undefined, remoteValue: item })
    }
  }

  const localOrder = localItems.map(item => item.id)
  const remoteOrder = remoteItems.map(item => item.id)
  if (!same(localOrder, remoteOrder)) {
    differences.push({ area, field: `${area}.order`, localValue: localOrder, remoteValue: remoteOrder })
  }
}

export function compareRecipeContent(
  localRecipe: VisualRecipeV3,
  remoteRecipe: VisualRecipeV3,
): RecipeContentDifference[] {
  const local = normalizeRecipe(localRecipe)
  const remote = normalizeRecipe(remoteRecipe)
  const differences: RecipeContentDifference[] = []

  compareFields(differences, 'identity', '', local as unknown as Record<string, unknown>, remote as unknown as Record<string, unknown>, [
    'title', 'description', 'status', 'cuisine', 'difficulty', 'occasions', 'category', 'cookingTimeText',
  ])
  compareFields(
    differences,
    'prerequisites',
    'prerequisites.',
    local.prerequisites as unknown as Record<string, unknown>,
    remote.prerequisites as unknown as Record<string, unknown>,
    ['containerSize', 'preheat', 'servings', 'notes', 'prepNotes'],
  )
  compareById<V3Ingredient>(differences, 'ingredients', local.ingredients, remote.ingredients, [
    'name', 'amountText', 'category', 'formulaId', 'note',
  ])
  compareById<V3ActionBlock>(differences, 'actions', local.actionBlocks, remote.actionBlocks, [
    'stageIndex', 'ingredientIds', 'dependencies', 'inputBlockIds', 'afterBlockIds', 'label', 'sublabel',
    'durationMinutes', 'heatLevel', 'equipment', 'completionState', 'outputItem', 'note',
  ])

  if (!same(local.formulas, remote.formulas)) {
    differences.push({ area: 'formulas', field: 'formulas', localValue: local.formulas, remoteValue: remote.formulas })
  }
  if (!same(local.finalBlock, remote.finalBlock)) {
    differences.push({ area: 'final', field: 'finalBlock', localValue: local.finalBlock, remoteValue: remote.finalBlock })
  }

  return differences
}
