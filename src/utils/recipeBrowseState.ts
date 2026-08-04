export const RECIPE_PAGE_SIZE = 9

export type RecipeBrowseSort = 'updated-desc' | 'ingredients-desc' | 'steps-asc'

export interface RecipeBrowseState {
  page: number
  q: string
  method: string
  cuisine: string
  difficulty: string
  sort: RecipeBrowseSort
}

export type PaginationItem = number | 'ellipsis-left' | 'ellipsis-right'

const METHOD_VALUES = new Set(['all', 'bake', 'stew', 'fry', 'steam', 'serve'])
const CUISINE_VALUES = new Set(['all', 'chinese', 'western'])
const DIFFICULTY_VALUES = new Set(['all', 'easy', 'medium', 'hard'])
const SORT_VALUES = new Set<RecipeBrowseSort>(['updated-desc', 'ingredients-desc', 'steps-asc'])

function firstQueryValue(value: unknown): string {
  if (Array.isArray(value)) return String(value[0] ?? '')
  return typeof value === 'string' ? value : ''
}

function parsePage(value: unknown): number {
  const parsed = Number.parseInt(firstQueryValue(value), 10)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1
}

function parseOption(value: unknown, allowed: Set<string>): string {
  const parsed = firstQueryValue(value)
  return allowed.has(parsed) ? parsed : 'all'
}

export function parseRecipeBrowseQuery(query: Record<string, unknown>): RecipeBrowseState {
  const rawSort = firstQueryValue(query.sort) as RecipeBrowseSort
  return {
    page: parsePage(query.page),
    q: firstQueryValue(query.q).trim(),
    method: parseOption(query.method, METHOD_VALUES),
    cuisine: parseOption(query.cuisine, CUISINE_VALUES),
    difficulty: parseOption(query.difficulty, DIFFICULTY_VALUES),
    sort: SORT_VALUES.has(rawSort) ? rawSort : 'updated-desc',
  }
}

export function serializeRecipeBrowseState(state: RecipeBrowseState): Record<string, string> {
  const query: Record<string, string> = { page: String(Math.max(1, Math.floor(state.page))) }
  const normalizedSearch = state.q.trim()

  if (normalizedSearch) query.q = normalizedSearch
  if (state.method !== 'all') query.method = state.method
  if (state.cuisine !== 'all') query.cuisine = state.cuisine
  if (state.difficulty !== 'all') query.difficulty = state.difficulty
  if (state.sort !== 'updated-desc') query.sort = state.sort

  return query
}

export function clampRecipePage(page: number, totalItems: number, pageSize = RECIPE_PAGE_SIZE): number {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
  return Math.min(Math.max(1, Math.floor(page)), totalPages)
}

export function getPaginationItems(currentPage: number, totalPages: number): PaginationItem[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, 'ellipsis-right', totalPages]
  }

  if (currentPage >= totalPages - 3) {
    return [1, 'ellipsis-left', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
  }

  return [1, 'ellipsis-left', currentPage - 1, currentPage, currentPage + 1, 'ellipsis-right', totalPages]
}
