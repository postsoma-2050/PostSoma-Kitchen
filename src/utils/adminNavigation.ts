export type AdminMethodFilter = 'all' | 'fry' | 'stew' | 'steam' | 'bake' | 'serve' | 'other'
export type AdminStepsFilter = 'all' | 'easy' | 'medium' | 'hard'
export type AdminStatusFilter = 'all' | 'published' | 'draft' | 'deleted' | 'uncategorized'
export type AdminSort = 'updated-desc' | 'updated-asc' | 'ingredients-desc' | 'actions-desc'

export interface AdminBrowseState {
  method: AdminMethodFilter
  steps: AdminStepsFilter
  status: AdminStatusFilter
  sort: AdminSort
  page: number
}

const METHOD_VALUES = new Set<AdminMethodFilter>(['all', 'fry', 'stew', 'steam', 'bake', 'serve', 'other'])
const STEPS_VALUES = new Set<AdminStepsFilter>(['all', 'easy', 'medium', 'hard'])
const STATUS_VALUES = new Set<AdminStatusFilter>(['all', 'published', 'draft', 'deleted', 'uncategorized'])
const SORT_VALUES = new Set<AdminSort>(['updated-desc', 'updated-asc', 'ingredients-desc', 'actions-desc'])
const ADMIN_SCROLL_PREFIX = 'postsoma-admin-scroll:'

function firstQueryValue(value: unknown): string {
  if (Array.isArray(value)) return String(value[0] ?? '')
  return typeof value === 'string' ? value : ''
}

function parseOption<T extends string>(value: unknown, allowed: Set<T>, fallback: T): T {
  const normalized = firstQueryValue(value) as T
  return allowed.has(normalized) ? normalized : fallback
}

function parsePage(value: unknown): number {
  const parsed = Number.parseInt(firstQueryValue(value), 10)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1
}

export function parseAdminBrowseQuery(query: Record<string, unknown>): AdminBrowseState {
  return {
    method: parseOption(query.method, METHOD_VALUES, 'all'),
    steps: parseOption(query.steps, STEPS_VALUES, 'all'),
    status: parseOption(query.status, STATUS_VALUES, 'all'),
    sort: parseOption(query.sort, SORT_VALUES, 'updated-desc'),
    page: parsePage(query.page),
  }
}

export function serializeAdminBrowseState(state: AdminBrowseState): Record<string, string> {
  const query: Record<string, string> = {}
  if (state.method !== 'all') query.method = state.method
  if (state.steps !== 'all') query.steps = state.steps
  if (state.status !== 'all') query.status = state.status
  if (state.sort !== 'updated-desc') query.sort = state.sort
  if (state.page > 1) query.page = String(Math.floor(state.page))
  return query
}

export function buildAdminBrowsePath(state: AdminBrowseState): string {
  const params = new URLSearchParams(serializeAdminBrowseState(state))
  const search = params.toString()
  return search ? `/admin?${search}` : '/admin'
}

/**
 * 编辑器只能返回 Kitchen Studio 列表本身，拒绝公开路由、编辑路由与外部地址。
 */
export function resolveAdminReturnTarget(value: unknown): string {
  const raw = firstQueryValue(value).trim()
  if (!raw) return '/admin'

  try {
    const parsed = new URL(raw, 'https://postsoma.local')
    if (parsed.origin !== 'https://postsoma.local' || parsed.pathname !== '/admin') return '/admin'
    return `/admin${parsed.search}${parsed.hash}`
  } catch {
    return '/admin'
  }
}

export function rememberAdminScrollPosition(returnTarget: string, scrollY: number): void {
  if (typeof sessionStorage === 'undefined') return
  const safeTarget = resolveAdminReturnTarget(returnTarget)
  const normalizedScroll = Math.max(0, Math.floor(scrollY))
  try {
    sessionStorage.setItem(`${ADMIN_SCROLL_PREFIX}${safeTarget}`, String(normalizedScroll))
  } catch {
    // 浏览器禁用 sessionStorage 时，筛选上下文仍由 URL query 保留。
  }
}

export function readAdminScrollPosition(returnTarget: string): number | null {
  if (typeof sessionStorage === 'undefined') return null
  const safeTarget = resolveAdminReturnTarget(returnTarget)
  try {
    const value = sessionStorage.getItem(`${ADMIN_SCROLL_PREFIX}${safeTarget}`)
    if (value === null) return null
    const parsed = Number.parseInt(value, 10)
    return Number.isFinite(parsed) && parsed >= 0 ? parsed : null
  } catch {
    return null
  }
}
