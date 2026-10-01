/**
 * src/composables/useFlavor.ts
 *
 * The Flavor Bible 风味拓扑网络领域 Hook：
 * - 异步加载管理（isLoading, isReady, loadError）
 * - 响应式追踪用户库存（inventory），计算与暴露：
 *   1. affinities (flavorDirections): 启发式契合搭档辅料推荐
 *   2. cohesiveness: 库存食材两两共现抱团度
 *   3. recipeEvaluations: 每道食谱的风味匹配与 Top 1 平替评估
 *   4. minimalRestockRecipes: 差 1 味即可制作的补货推荐
 *   5. evaluateRecipe / normalize: 纯函数工具透出
 */

import {
  computed,
  getCurrentInstance,
  onMounted,
  shallowRef,
  toValue,
  type ComputedRef,
  type MaybeRefOrGetter,
  type ShallowRef,
} from 'vue'
import { getFlavorEngine } from '@/services/flavorService'
import type {
  CohesivenessResult,
  FlavorComplementItem,
  FlavorDirection,
  MinimalRestockSuggestion,
  RecipeMatchEvaluation,
} from '@/domain/flavor'

export interface RecipeWithIngredients {
  id: string
  title: string
  ingredients: Array<{
    name: string
    role?: string
    category?: string
    isBasicPantry?: boolean
  }>
}

export interface UseFlavorOptions {
  /**
   * 用户当前手头拥有的食材名称列表 (响应式 Ref 或 Getter)
   */
  inventory?: MaybeRefOrGetter<string[]>

  /**
   * 需要进行评估或补货计算的食谱列表 (响应式 Ref 或 Getter)
   */
  recipes?: MaybeRefOrGetter<RecipeWithIngredients[]>

  /**
   * 是否在组件挂载时自动开始异步预加载静态 JSON 数据
   * @default true
   */
  autoLoad?: boolean
}

export interface UseFlavorReturn {
  isLoading: ShallowRef<boolean>
  isReady: ShallowRef<boolean>
  loadError: ShallowRef<string | null>
  engine: ShallowRef<Awaited<ReturnType<typeof getFlavorEngine>> | null>
  affinities: ComputedRef<FlavorDirection[]>
  flavorDirections: ComputedRef<FlavorDirection[]>
  cohesiveness: ComputedRef<CohesivenessResult>
  recipeEvaluations: ComputedRef<Map<string, RecipeMatchEvaluation>>
  minimalRestockRecipes: ComputedRef<MinimalRestockSuggestion[]>
  evaluateRecipe: (recipeIngredients: string[]) => RecipeMatchEvaluation | null
  getComplementsForRecipe: (recipe: { ingredients?: Array<{ name: string; role?: string; category?: string; isBasicPantry?: boolean }> }, limit?: number) => FlavorComplementItem[]
  normalize: (raw: string) => string
  loadEngine: () => Promise<Awaited<ReturnType<typeof getFlavorEngine>> | null>
}

export function useFlavor(options: UseFlavorOptions = {}): UseFlavorReturn {
  const isLoading = shallowRef(false)
  const isReady = shallowRef(false)
  const loadError = shallowRef<string | null>(null)
  const engine = shallowRef<Awaited<ReturnType<typeof getFlavorEngine>> | null>(null)

  async function loadEngine() {
    if (engine.value) return engine.value
    isLoading.value = true
    loadError.value = null
    try {
      const instance = await getFlavorEngine()
      engine.value = instance
      isReady.value = true
      return instance
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      loadError.value = msg
      console.warn('[useFlavor] 加载风味拓扑数据失败:', msg)
      return null
    } finally {
      isLoading.value = false
    }
  }

  if (options.autoLoad !== false) {
    if (getCurrentInstance()) {
      onMounted(() => {
        void loadEngine()
      })
    } else {
      void loadEngine()
    }
  }

  // 响应式解析当前库存食材
  const currentInventory = computed<string[]>(() => {
    return options.inventory ? toValue(options.inventory) || [] : []
  })

  // 1. 食材两两共现抱团度（风味连贯性）
  const cohesiveness = computed<CohesivenessResult>(() => {
    if (!engine.value || currentInventory.value.length < 2) {
      return { score: 0, totalPairs: 0, connectedPairs: 0 }
    }
    return engine.value.calculateCohesiveness(currentInventory.value)
  })

  // 2. 启发式风味搭档辅料推荐 (Affinities Top 18)
  const affinities = computed<FlavorDirection[]>(() => {
    if (!engine.value || currentInventory.value.length === 0) {
      return []
    }
    return engine.value.getFlavorDirections(currentInventory.value)
  })

  const flavorDirections = affinities

  // 3. 单道食谱评估方法
  function evaluateRecipe(recipeIngredients: string[]): RecipeMatchEvaluation | null {
    if (!engine.value) return null
    return engine.value.evaluateRecipeMatch(recipeIngredients, currentInventory.value)
  }

  // 4. 批量计算食谱 Evaluation 映射
  const recipeEvaluations = computed<Map<string, RecipeMatchEvaluation>>(() => {
    const map = new Map<string, RecipeMatchEvaluation>()
    if (!engine.value || !options.recipes) return map

    const recipeList = toValue(options.recipes) || []
    for (const r of recipeList) {
      const ingNames = r.ingredients.map(i => i.name)
      const evaluation = engine.value.evaluateRecipeMatch(ingNames, currentInventory.value)
      map.set(r.id, evaluation)
    }
    return map
  })

  // 5. 最小补货食谱（差 1 味即可制作）
  const minimalRestockRecipes = computed<MinimalRestockSuggestion[]>(() => {
    if (!engine.value || !options.recipes || currentInventory.value.length === 0) {
      return []
    }
    const recipeList = toValue(options.recipes) || []
    return engine.value.findMinimalRestockRecipes(recipeList, currentInventory.value)
  })

  // 6. 规范化工具
  function normalize(raw: string): string {
    return engine.value ? engine.value.normalize(raw) : raw.trim()
  }

  // 7. 针对单道食谱计算进阶搭档辅料推荐 (自动过滤已有食材与 meat 主料)
  function getComplementsForRecipe(
    recipe: {
      ingredients?: Array<{
        name: string
        role?: string
        category?: string
        isBasicPantry?: boolean
      }>
    },
    limit: number = 8
  ): FlavorComplementItem[] {
    if (!engine.value) return []
    const allIngs = recipe.ingredients || []
    if (allIngs.length === 0) return []

    // 提取该食谱主干食材 (优先选取 role === 'key' 或 category === 'main')
    const keyIngs = allIngs.filter(i => (i.role === 'key' || i.category === 'main') && !i.isBasicPantry).map(i => i.name)
    const candidateIngs = keyIngs.length > 0 ? keyIngs : allIngs.filter(i => !i.isBasicPantry).map(i => i.name)
    const seedIngs = candidateIngs.length > 0 ? candidateIngs : allIngs.map(i => i.name)

    return engine.value.getRecipeFlavorComplements(seedIngs, {
      limit,
      inventory: currentInventory.value,
      excludeIngredients: allIngs.map(i => i.name),
    })
  }

  return {
    isLoading,
    isReady,
    loadError,
    engine,
    affinities,
    flavorDirections,
    cohesiveness,
    recipeEvaluations,
    minimalRestockRecipes,
    evaluateRecipe,
    getComplementsForRecipe,
    normalize,
    loadEngine,
  }
}
