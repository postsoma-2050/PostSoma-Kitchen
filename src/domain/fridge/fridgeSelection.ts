import type { FridgeIngredientIndex, IngredientConcept, UserIngredientSelection } from './ingredientTypes'
import { resolveUserIngredientText } from './ingredientLedger'

export const FRIDGE_CUSTOM_INPUT_MAX_LENGTH = 80
export const FRIDGE_CUSTOM_INPUT_MAX_ITEMS = 20
export const FRIDGE_SELECTED_CONCEPT_MAX_ITEMS = 40

export interface FridgeSelectionUpdate {
  selection: UserIngredientSelection
  addedConceptIds: string[]
  addedCustomInputs: string[]
  errors: string[]
}

function normalizeInput(value: string): string {
  return value.normalize('NFKC').trim().replace(/\s+/g, ' ')
}

export function splitFridgeIngredientInput(value: string): string[] {
  const seen = new Set<string>()
  const tokens: string[] = []
  for (const rawToken of value.split(/[,，、;；\n\r]+/)) {
    const token = normalizeInput(rawToken)
    const lookup = token.toLowerCase()
    if (!token || seen.has(lookup)) continue
    seen.add(lookup)
    tokens.push(token)
  }
  return tokens
}

export function getPublicSelectableConcepts(index: FridgeIngredientIndex): IngredientConcept[] {
  return index.concepts.filter(concept => (
    concept.reviewStatus === 'reviewed'
    && concept.confidence === 'high'
    && concept.sourceReferences.length > 0
  ))
}

export function addFridgeIngredientInput(
  index: FridgeIngredientIndex,
  current: UserIngredientSelection,
  input: string,
): FridgeSelectionUpdate {
  const conceptIds = [...new Set(current.conceptIds)].filter(id => index.conceptById.has(id))
  const customInputs = [...(current.customInputs || [])]
  const customLookup = new Set(customInputs.map(value => normalizeInput(value).toLowerCase()).filter(Boolean))
  const addedConceptIds: string[] = []
  const addedCustomInputs: string[] = []
  const errors: string[] = []

  for (const token of splitFridgeIngredientInput(input)) {
    if (token.length > FRIDGE_CUSTOM_INPUT_MAX_LENGTH) {
      errors.push(`“${token.slice(0, 18)}…”超过 ${FRIDGE_CUSTOM_INPUT_MAX_LENGTH} 个字符，未添加`)
      continue
    }

    const conceptId = resolveUserIngredientText(index, token)
    const concept = conceptId ? index.conceptById.get(conceptId) : undefined
    if (concept?.reviewStatus === 'reviewed' && concept.confidence === 'high') {
      if (conceptIds.includes(concept.id)) continue
      if (conceptIds.length >= FRIDGE_SELECTED_CONCEPT_MAX_ITEMS) {
        errors.push(`最多选择 ${FRIDGE_SELECTED_CONCEPT_MAX_ITEMS} 项已识别食材`)
        continue
      }
      conceptIds.push(concept.id)
      addedConceptIds.push(concept.id)
      continue
    }

    const lookup = token.toLowerCase()
    if (customLookup.has(lookup)) continue
    if (customInputs.length >= FRIDGE_CUSTOM_INPUT_MAX_ITEMS) {
      errors.push(`最多保留 ${FRIDGE_CUSTOM_INPUT_MAX_ITEMS} 项暂未识别食材`)
      continue
    }
    customInputs.push(token)
    customLookup.add(lookup)
    addedCustomInputs.push(token)
  }

  return {
    selection: { conceptIds, customInputs },
    addedConceptIds,
    addedCustomInputs,
    errors: [...new Set(errors)],
  }
}
