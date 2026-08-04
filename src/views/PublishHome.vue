<template>
  <main id="main-content" class="pk-page min-h-screen px-4 py-6 font-sans md:px-8 md:py-10">
    <div class="mx-auto max-w-7xl space-y-8">
      <section class="border-y border-[color:var(--pk-border)] py-9 sm:py-12" aria-labelledby="home-title">
        <div class="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.85fr)] lg:items-end">
          <div class="max-w-3xl">
            <p class="pk-eyebrow">结构化食谱档案</p>
            <h1 id="home-title" class="pk-display mt-3 text-3xl leading-tight sm:text-4xl md:text-5xl">
              先找到一道菜，<br class="hidden sm:block" />再看懂它如何完成
            </h1>
            <p class="pk-muted mt-4 max-w-2xl text-base leading-relaxed">
              从已收录食谱中选择料理，再通过 Matrix Flow 查看食材、工序与时间如何连接成完整路径。
            </p>
            <router-link to="/fridge" class="mt-5 inline-flex min-h-11 flex-wrap items-center gap-2 rounded-lg text-sm font-bold text-[color:var(--pk-accent)] underline decoration-[color:var(--pk-border-strong)] underline-offset-4 hover:text-[color:var(--pk-accent-hover)]">
              <span>按食材找料理方向</span>
              <span class="font-normal text-[color:var(--pk-ink-muted)]">基于已收录食谱</span>
              <span aria-hidden="true">→</span>
            </router-link>
          </div>

          <div class="space-y-3">
            <label for="recipe-search" class="block text-sm font-bold text-[color:var(--pk-ink)]">搜索食谱</label>
            <div class="relative">
              <svg viewBox="0 0 20 20" class="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[color:var(--pk-ink-muted)]" fill="none" aria-hidden="true">
                <circle cx="8.5" cy="8.5" r="5" stroke="currentColor" stroke-width="1.6" />
                <path d="m12.5 12.5 4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
              </svg>
              <input
                id="recipe-search"
                :value="searchQuery"
                type="search"
                autocomplete="off"
                placeholder="输入菜名或主料，例如鸡肉、布朗尼"
                class="pk-field min-h-14 w-full pl-12 pr-20 text-base font-medium"
                @input="handleSearchInput"
              />
              <button
                v-if="searchQuery"
                type="button"
                class="absolute right-2 top-1/2 min-h-11 -translate-y-1/2 rounded-lg px-3 text-sm font-bold text-[color:var(--pk-ink-secondary)] hover:bg-[color:var(--pk-surface-muted)]"
                aria-label="清空搜索词"
                @click="commitSearch('', 'push')"
              >
                清空
              </button>
            </div>

            <div class="hidden flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:flex" aria-label="常用搜索">
              <span class="text-[color:var(--pk-ink-muted)]">常用搜索</span>
              <button
                v-for="hot in hotTags"
                :key="hot.query"
                type="button"
                class="min-h-11 text-[color:var(--pk-ink-secondary)] underline decoration-[color:var(--pk-border-strong)] underline-offset-4 hover:text-[color:var(--pk-accent)]"
                @click="commitSearch(hot.query, 'push')"
              >
                {{ hot.label }}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section class="pk-surface overflow-hidden" aria-labelledby="browse-heading">
        <div class="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center sm:p-6">
          <div>
            <h2 id="browse-heading" class="text-xl font-bold text-[color:var(--pk-ink)]">浏览食谱</h2>
            <p class="mt-1 text-sm text-[color:var(--pk-ink-secondary)]">搜索之后，可按做法、菜系与难度进一步缩小范围。</p>
          </div>

          <button
            type="button"
            class="pk-button pk-button-secondary"
            :aria-expanded="showFilters"
            aria-controls="recipe-filter-panel"
            @click="showFilters = !showFilters"
          >
            <span>{{ showFilters ? '收起筛选' : '展开筛选' }}</span>
            <span v-if="structuredFilterCount > 0" class="flex h-5 min-w-5 items-center justify-center rounded-md bg-[color:var(--pk-accent)] px-1 text-xs tabular-nums text-white">
              {{ structuredFilterCount }}
            </span>
            <svg viewBox="0 0 20 20" class="h-4 w-4 transition-transform motion-reduce:transition-none" :class="showFilters ? 'rotate-180' : ''" fill="none" aria-hidden="true">
              <path d="m6 8 4 4 4-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>

        <div v-if="showFilters" id="recipe-filter-panel" class="grid grid-cols-1 gap-4 border-t border-[color:var(--pk-border)] bg-[color:var(--pk-surface-muted)] px-5 py-5 sm:grid-cols-3 sm:px-6">
          <label v-for="filter in filterControls" :key="filter.key" class="space-y-1.5 text-sm font-bold text-[color:var(--pk-ink-secondary)]">
            <span>{{ filter.label }}</span>
            <select
              :value="filter.value"
              class="pk-field w-full px-3 text-base font-semibold sm:text-sm"
              @change="setFilter(filter.key, ($event.target as HTMLSelectElement).value)"
            >
              <option v-for="option in filter.options" :key="option.value" :value="option.value">{{ option.label }}</option>
            </select>
          </label>
        </div>

        <div v-if="hasActiveFilter" class="flex flex-wrap items-center gap-2 border-t border-[color:var(--pk-border)] px-5 py-3 sm:px-6" aria-label="已选条件">
          <span class="text-xs font-bold text-[color:var(--pk-ink-muted)]">已选条件</span>
          <button v-if="searchQuery" type="button" class="pk-filter-token" :aria-label="`移除搜索词 ${searchQuery}`" @click="commitSearch('', 'push')">
            关键词：{{ searchQuery }} ×
          </button>
          <button v-if="filterMethod !== 'all'" type="button" class="pk-filter-token" @click="setFilter('method', 'all')">
            方式：{{ getOptionLabel(methodOptions, filterMethod) }} ×
          </button>
          <button v-if="filterCuisine !== 'all'" type="button" class="pk-filter-token" @click="setFilter('cuisine', 'all')">
            菜系：{{ getOptionLabel(cuisineOptions, filterCuisine) }} ×
          </button>
          <button v-if="filterDifficulty !== 'all'" type="button" class="pk-filter-token" @click="setFilter('difficulty', 'all')">
            难度：{{ getOptionLabel(difficultyOptions, filterDifficulty) }} ×
          </button>
          <button type="button" class="min-h-11 rounded-lg px-2 text-sm font-bold text-[color:var(--pk-accent)] underline underline-offset-4" @click="resetFilters">
            清除全部
          </button>
        </div>
      </section>

      <section ref="resultsSectionRef" id="recipe-results" class="scroll-mt-6 space-y-5" aria-labelledby="results-heading">
        <div class="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h2 ref="resultsHeadingRef" id="results-heading" tabindex="-1" class="text-2xl font-bold text-[color:var(--pk-ink)] focus:outline-none">食谱结果</h2>
            <p class="mt-1 text-sm tabular-nums text-[color:var(--pk-ink-secondary)]" aria-live="polite">
              <template v-if="isLoading">正在同步公开食谱…</template>
              <template v-else-if="filteredRecipes.length > 0">显示第 {{ resultStart }}–{{ resultEnd }} 道，共 {{ filteredRecipes.length }} 道匹配食谱 · 第 {{ currentPage }} / {{ totalPages }} 页</template>
              <template v-else>未找到匹配食谱</template>
            </p>
          </div>

          <label class="flex items-center gap-2 text-sm font-bold text-[color:var(--pk-ink-secondary)]">
            <span>排序</span>
            <select :value="sortBy" class="pk-field px-3 text-base font-bold sm:text-sm" @change="setSort(($event.target as HTMLSelectElement).value as RecipeBrowseSort)">
              <option value="updated-desc">最新发布</option>
              <option value="ingredients-desc">食材丰富度</option>
              <option value="steps-asc">工序步数（最少）</option>
            </select>
          </label>
        </div>

        <div v-if="isLoading" class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" aria-label="正在加载食谱">
          <div v-for="index in 6" :key="index" class="pk-surface overflow-hidden" aria-hidden="true">
            <div class="aspect-[4/3] animate-pulse bg-[color:var(--pk-surface-muted)] motion-reduce:animate-none"></div>
            <div class="space-y-3 p-5">
              <div class="h-5 w-2/3 animate-pulse rounded bg-[color:var(--pk-surface-muted)] motion-reduce:animate-none"></div>
              <div class="h-4 w-full animate-pulse rounded bg-[color:var(--pk-surface-muted)] motion-reduce:animate-none"></div>
              <div class="h-4 w-4/5 animate-pulse rounded bg-[color:var(--pk-surface-muted)] motion-reduce:animate-none"></div>
            </div>
          </div>
        </div>

        <div v-else-if="filteredRecipes.length === 0" class="pk-surface space-y-3 px-5 py-12 text-center sm:p-12">
          <h3 class="text-lg font-bold text-[color:var(--pk-ink)]">暂无符合条件的食谱</h3>
          <p class="text-sm text-[color:var(--pk-ink-secondary)]">尝试缩短搜索词，或清除部分筛选条件后继续浏览。</p>
          <button type="button" class="pk-button pk-button-primary" @click="resetFilters">清除筛选，恢复浏览</button>
        </div>

        <div v-else class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <PublishRecipeCard v-for="recipe in pagedRecipes" :key="recipe.id" :recipe="recipe" />
        </div>

        <RecipePagination
          v-if="!isLoading"
          :current-page="currentPage"
          :total-pages="totalPages"
          :total-items="filteredRecipes.length"
          @change="setPage"
        />
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { VisualRecipeV3 } from '@/types/recipeV3'
import { getPublishedRecipes } from '@/services/v3RecipeStore'
import PublishRecipeCard from '@/components/publish/PublishRecipeCard.vue'
import RecipePagination from '@/components/publish/RecipePagination.vue'
import {
  clampRecipePage,
  parseRecipeBrowseQuery,
  RECIPE_PAGE_SIZE,
  serializeRecipeBrowseState,
  type RecipeBrowseSort,
} from '@/utils/recipeBrowseState'

type FilterKey = 'method' | 'cuisine' | 'difficulty'
type HistoryMode = 'push' | 'replace'

const route = useRoute()
const router = useRouter()
const initialState = parseRecipeBrowseQuery(route.query)

const publishedRecipes = ref<VisualRecipeV3[]>([])
const isLoading = ref(true)
const resultsSectionRef = ref<HTMLElement | null>(null)
const resultsHeadingRef = ref<HTMLElement | null>(null)

const searchQuery = ref(initialState.q)
const filterMethod = ref(initialState.method)
const filterCuisine = ref(initialState.cuisine)
const filterDifficulty = ref(initialState.difficulty)
const sortBy = ref<RecipeBrowseSort>(initialState.sort)
const currentPage = ref(initialState.page)
const showFilters = ref(
  initialState.method !== 'all'
  || initialState.cuisine !== 'all'
  || initialState.difficulty !== 'all'
)

let searchTimer: ReturnType<typeof setTimeout> | undefined
let isApplyingRoute = false

const hotTags = [
  { label: '快手炒菜', query: '鸡肉' },
  { label: '蒸制甜品', query: '布朗尼' },
  { label: '浓郁慢炖', query: '五花肉' },
  { label: '下饭经典', query: '黄油' },
]

const methodOptions = [
  { label: '全部方式', value: 'all' },
  { label: '烘焙', value: 'bake' },
  { label: '慢炖', value: 'stew' },
  { label: '煎炒爆炒', value: 'fry' },
  { label: '蒸制', value: 'steam' },
  { label: '冷拌', value: 'serve' },
]

const cuisineOptions = [
  { label: '全部菜系', value: 'all' },
  { label: '中式经典', value: 'chinese' },
  { label: '西式家常', value: 'western' },
]

const difficultyOptions = [
  { label: '全部难度', value: 'all' },
  { label: '简单易做', value: 'easy' },
  { label: '中等进阶', value: 'medium' },
  { label: '繁复大菜', value: 'hard' },
]

const filterControls = computed(() => [
  { key: 'method' as FilterKey, label: '烹饪方式', value: filterMethod.value, options: methodOptions },
  { key: 'cuisine' as FilterKey, label: '菜系风味', value: filterCuisine.value, options: cuisineOptions },
  { key: 'difficulty' as FilterKey, label: '烹饪难度', value: filterDifficulty.value, options: difficultyOptions },
])

const hasActiveFilter = computed(() => (
  searchQuery.value.trim() !== ''
  || filterMethod.value !== 'all'
  || filterCuisine.value !== 'all'
  || filterDifficulty.value !== 'all'
))

const structuredFilterCount = computed(() => [
  filterMethod.value,
  filterCuisine.value,
  filterDifficulty.value,
].filter(value => value !== 'all').length)

const filteredRecipes = computed(() => {
  let list = [...publishedRecipes.value]

  if (searchQuery.value.trim()) {
    const query = searchQuery.value.trim().toLowerCase()
    list = list.filter(recipe => {
      const matchTitle = recipe.title.toLowerCase().includes(query)
      const matchDescription = recipe.description?.toLowerCase().includes(query)
      const matchIngredient = recipe.ingredients?.some(ingredient => ingredient.name.toLowerCase().includes(query))
      return matchTitle || matchDescription || matchIngredient
    })
  }

  if (filterMethod.value !== 'all') {
    list = list.filter(recipe => {
      const method = recipe.finalBlock?.method || 'other'
      if (filterMethod.value === 'serve') return method === 'serve' || method === 'raw'
      return method === filterMethod.value
    })
  }

  if (filterCuisine.value !== 'all') {
    list = list.filter(recipe => {
      const isChinese = recipe.id.startsWith('cn-') || recipe.cuisine === 'chinese'
      if (filterCuisine.value === 'chinese') return isChinese
      if (filterCuisine.value === 'western') return !isChinese
      return true
    })
  }

  if (filterDifficulty.value !== 'all') {
    list = list.filter(recipe => recipe.difficulty === filterDifficulty.value)
  }

  if (sortBy.value === 'updated-desc') {
    list.sort((left, right) => new Date(right.updatedAt || right.createdAt).getTime() - new Date(left.updatedAt || left.createdAt).getTime())
  } else if (sortBy.value === 'ingredients-desc') {
    list.sort((left, right) => (right.ingredients?.length || 0) - (left.ingredients?.length || 0))
  } else if (sortBy.value === 'steps-asc') {
    list.sort((left, right) => (left.actionBlocks?.length || 0) - (right.actionBlocks?.length || 0))
  }

  return list
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredRecipes.value.length / RECIPE_PAGE_SIZE)))
const pagedRecipes = computed(() => {
  const start = (currentPage.value - 1) * RECIPE_PAGE_SIZE
  return filteredRecipes.value.slice(start, start + RECIPE_PAGE_SIZE)
})
const resultStart = computed(() => filteredRecipes.value.length > 0 ? (currentPage.value - 1) * RECIPE_PAGE_SIZE + 1 : 0)
const resultEnd = computed(() => Math.min(currentPage.value * RECIPE_PAGE_SIZE, filteredRecipes.value.length))

function getOptionLabel(options: { label: string; value: string }[], value: string): string {
  return options.find(option => option.value === value)?.label || value
}

function buildBrowseState() {
  return {
    page: currentPage.value,
    q: searchQuery.value,
    method: filterMethod.value,
    cuisine: filterCuisine.value,
    difficulty: filterDifficulty.value,
    sort: sortBy.value,
  }
}

function currentKnownQuery(): Record<string, string> {
  const knownKeys = ['page', 'q', 'method', 'cuisine', 'difficulty', 'sort']
  return knownKeys.reduce<Record<string, string>>((query, key) => {
    const value = route.query[key]
    if (Array.isArray(value)) query[key] = String(value[0] ?? '')
    else if (value !== undefined && value !== null) query[key] = String(value)
    return query
  }, {})
}

function querySignature(query: Record<string, string>): string {
  return Object.entries(query)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => `${key}=${value}`)
    .join('&')
}

function syncBrowseQuery(mode: HistoryMode) {
  const nextQuery = serializeRecipeBrowseState(buildBrowseState())
  if (querySignature(currentKnownQuery()) === querySignature(nextQuery)) return
  void router[mode]({ query: nextQuery })
}

function clearSearchTimer() {
  if (searchTimer) {
    clearTimeout(searchTimer)
    searchTimer = undefined
  }
}

function handleSearchInput(event: Event) {
  if (isApplyingRoute) return
  searchQuery.value = (event.target as HTMLInputElement).value
  currentPage.value = 1
  clearSearchTimer()
  searchTimer = setTimeout(() => syncBrowseQuery('replace'), 250)
}

function commitSearch(query: string, mode: HistoryMode) {
  clearSearchTimer()
  searchQuery.value = query
  currentPage.value = 1
  syncBrowseQuery(mode)
}

function setFilter(key: FilterKey, value: string) {
  clearSearchTimer()
  if (key === 'method') filterMethod.value = value
  if (key === 'cuisine') filterCuisine.value = value
  if (key === 'difficulty') filterDifficulty.value = value
  currentPage.value = 1
  syncBrowseQuery('push')
}

function setSort(value: RecipeBrowseSort) {
  clearSearchTimer()
  sortBy.value = value
  currentPage.value = 1
  syncBrowseQuery('push')
}

function resetFilters() {
  clearSearchTimer()
  searchQuery.value = ''
  filterMethod.value = 'all'
  filterCuisine.value = 'all'
  filterDifficulty.value = 'all'
  currentPage.value = 1
  syncBrowseQuery('push')
}

async function setPage(page: number) {
  const nextPage = clampRecipePage(page, filteredRecipes.value.length)
  if (nextPage === currentPage.value) return
  clearSearchTimer()
  currentPage.value = nextPage
  syncBrowseQuery('push')
  await nextTick()

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  resultsSectionRef.value?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' })
  resultsHeadingRef.value?.focus({ preventScroll: true })
}

function normalizePageAndUrl() {
  const normalizedPage = clampRecipePage(currentPage.value, filteredRecipes.value.length)
  if (normalizedPage !== currentPage.value) currentPage.value = normalizedPage
  syncBrowseQuery('replace')
}

async function applyRouteQuery(query: Record<string, unknown>) {
  clearSearchTimer()
  const state = parseRecipeBrowseQuery(query)
  isApplyingRoute = true
  searchQuery.value = state.q
  filterMethod.value = state.method
  filterCuisine.value = state.cuisine
  filterDifficulty.value = state.difficulty
  sortBy.value = state.sort
  currentPage.value = state.page
  showFilters.value = state.method !== 'all' || state.cuisine !== 'all' || state.difficulty !== 'all'
  await nextTick()
  isApplyingRoute = false
  if (!isLoading.value) normalizePageAndUrl()
}

watch(
  () => route.query,
  query => void applyRouteQuery(query),
  { deep: true },
)

onMounted(async () => {
  try {
    publishedRecipes.value = await getPublishedRecipes()
  } finally {
    isLoading.value = false
    normalizePageAndUrl()
  }
})

onUnmounted(clearSearchTimer)
</script>
