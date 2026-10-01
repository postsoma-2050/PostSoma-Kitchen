/**
 * The Flavor Bible 拓扑计算引擎 (纯函数、零依赖实现)
 */

import type {
  CohesivenessResult,
  FlavorComplementItem,
  FlavorDataset,
  FlavorDirection,
  IngredientSubstitute,
  MinimalRestockSuggestion,
  RecipeMatchEvaluation,
} from './types'

/**
 * 提取双语词中的中文部分并去除无关括号说明
 * 例: "black pepper 黑胡椒粉" -> "黑胡椒粉"
 *     "bacon 培根 (切小块)" -> "培根"
 *     "大蒜 (压泥)" -> "大蒜"
 */
export function extractChinese(raw: string): string {
  if (!raw) return ''
  let s = raw.trim()
  s = s.replace(/\s*\([^)]*\)\s*/g, '').trim()
  s = s.replace(/\s*（[^）]*）\s*/g, '').trim()
  const m = s.match(/[\u4e00-\u9fa5].*$/)
  if (m) {
    s = m[0].trim()
  }
  return s
}

/**
 * 食材规范化唯一入口 pipeline:
 * 1. 去首尾空格；双语词提取中文部分
 * 2. 查 alias_map      → 命中则返回映射值
 * 3. 查 zh_canonical   → 命中则返回原词
 * 4. 未命中            → 原样返回 (优雅降级，不得抛异常)
 */
export function normalize(
  raw: string,
  aliasMap: Record<string, string>,
  zhCanonical: Record<string, string>
): string {
  if (!raw) return ''
  const trimmed = raw.trim()
  const clean = extractChinese(trimmed)

  // 1. 查 alias_map (先查原始词，再查提取的纯中文词)
  if (aliasMap[trimmed]) return aliasMap[trimmed]
  if (aliasMap[clean]) return aliasMap[clean]

  // 2. 查 zh_canonical
  if (zhCanonical[trimmed]) return trimmed
  if (zhCanonical[clean]) return clean

  // 3. 优雅降级返回原词
  return trimmed
}

/**
 * 构建无向边双向查找集合 (from|||to 与 to|||from)
 */
export function buildUndirectedEdgeSet(
  edges: Array<{ from: string; to: string }>
): Set<string> {
  const set = new Set<string>()
  for (const e of edges) {
    if (e.from && e.to) {
      set.add(`${e.from}|||${e.to}`)
      set.add(`${e.to}|||${e.from}`)
    }
  }
  return set
}

/**
 * 构建无向加权邻接表，加速单道食谱在 25,000+ 连边网络中的局部子图检索 (从 O(E) 降为 O(degree))
 */
export function buildAdjacencyList(
  edges: Array<{ from: string; to: string; weight?: number }>
): Map<string, Array<{ node: string; weight: number }>> {
  const adj = new Map<string, Array<{ node: string; weight: number }>>()
  for (const e of edges) {
    if (!e.from || !e.to) continue
    const w = e.weight || 1
    let listFrom = adj.get(e.from)
    if (!listFrom) {
      listFrom = []
      adj.set(e.from, listFrom)
    }
    listFrom.push({ node: e.to, weight: w })

    let listTo = adj.get(e.to)
    if (!listTo) {
      listTo = []
      adj.set(e.to, listTo)
    }
    listTo.push({ node: e.from, weight: w })
  }
  return adj
}

/**
 * 食材搭配抱团度（风味连贯性）
 * 计算逻辑：库存两两组合中存在共现边的比例（基于 edges.json 无向图）
 * 锚点：真实经典搭配 ≈ 0.50 ~ 0.90，随机伪搭配 ≈ 0.07 ~ 0.29
 */
export function calculateCohesiveness(
  inventory: string[],
  edgeLookup: Set<string>,
  zhCanonical: Record<string, string>,
  aliasMap: Record<string, string> = {}
): CohesivenessResult {
  const normItems = inventory.map(i => normalize(i, aliasMap, zhCanonical))
  const enIds = normItems.map(zh => zhCanonical[zh]).filter(Boolean)
  const uniqueEnIds = Array.from(new Set(enIds))
  const n = uniqueEnIds.length

  if (n < 2) {
    return { score: 0, totalPairs: 0, connectedPairs: 0 }
  }

  let totalPairs = 0
  let connectedPairs = 0
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      totalPairs++
      if (edgeLookup.has(`${uniqueEnIds[i]}|||${uniqueEnIds[j]}`)) {
        connectedPairs++
      }
    }
  }

  const score = totalPairs > 0 ? Math.round((connectedPairs / totalPairs) * 100) / 100 : 0
  return { score, totalPairs, connectedPairs }
}

/**
 * 食谱食材匹配与平替评估引擎
 * 契约规则：
 * - 0 缺口  -> status: 'ready', substitutes: []
 * - 1~2 缺口 -> status: 'substitutable', substitutes: [Top 1 邻居] (若库存中存在)
 * - 3+ 缺口  -> status: 'need-restock', 严禁提供平替，substitutes 必须为 []
 */
export function evaluateRecipeMatch(
  recipeIngredients: string[],
  inventory: string[],
  dataset: FlavorDataset
): RecipeMatchEvaluation {
  const { aliasMap, zhCanonical, similarityTop20 } = dataset

  // 1. 规范化库存食材
  const normInventory = inventory.map(item => normalize(item, aliasMap, zhCanonical))
  const invSet = new Set(normInventory)

  // 构建库存拥有的英文 Canonical ID 索引 -> 对应中文名
  const invEnToZh = new Map<string, string>()
  for (const zh of normInventory) {
    const en = zhCanonical[zh]
    if (en) invEnToZh.set(en, zh)
  }

  // 2. 规范化食谱食材并计算缺口
  const normRecipeIngredients = recipeIngredients.map(item => normalize(item, aliasMap, zhCanonical))
  // 去重保留缺口
  const missing = Array.from(new Set(normRecipeIngredients.filter(ing => !invSet.has(ing))))
  const missingCount = missing.length

  // 0 缺口：可直接开做
  if (missingCount === 0) {
    return {
      status: 'ready',
      statusText: '可直接开做',
      missingCount: 0,
      missing: [],
      substitutes: [],
    }
  }

  // 3+ 缺口：缺口过多，严禁提供平替
  if (missingCount >= 3) {
    return {
      status: 'need-restock',
      statusText: `缺 ${missingCount} 味食材 (需补货)`,
      missingCount,
      missing,
      substitutes: [], // 契约硬约束：3+ 缺口必须为空数组
    }
  }

  // 1~2 缺口：允许弹性平替，计算 Top 1 邻居
  const substitutes: IngredientSubstitute[] = []
  for (const m of missing) {
    const en = zhCanonical[m]
    if (!en || !similarityTop20[en]) {
      continue
    }

    // 在 Top20 相似邻居中按相似度降序检索第一个出现在用户库存中的食材 (只取 Top 1)
    const neighbors = similarityTop20[en]
    for (const [neighEn, rawScore] of Object.entries(neighbors)) {
      if (invEnToZh.has(neighEn)) {
        substitutes.push({
          missing: m,
          substituteZh: invEnToZh.get(neighEn)!,
          substituteEn: neighEn,
          score: Math.round(rawScore * 100) / 100,
        })
        break // 只取 Top 1，不得展示 Top 2-3
      }
    }
  }

  return {
    status: 'substitutable',
    statusText: substitutes.length > 0
      ? `缺 ${missingCount} 味，可用库存风味平替`
      : `缺 ${missingCount} 味食材`,
    missingCount,
    missing,
    substitutes,
  }
}

/**
 * 寻找缺失食材在可用库存中的最佳平替 (Top 1 且相似度 >= minScore)
 */
export function findBestSubstitute(
  missingIngredient: string,
  availableIngredients: string[],
  dataset: Pick<FlavorDataset, 'aliasMap' | 'zhCanonical' | 'similarityTop20'>,
  minScore = 0.30
): { substituteZh: string; substituteEn: string; score: number } | null {
  const { aliasMap, zhCanonical, similarityTop20 } = dataset
  const normMissing = normalize(missingIngredient, aliasMap, zhCanonical)
  const enMissing = zhCanonical[normMissing]
  if (!enMissing || !similarityTop20[enMissing]) {
    return null
  }

  // 建立可用库存的英文 ID 到中文规范名映射
  const invEnToZh = new Map<string, string>()
  for (const item of availableIngredients) {
    const norm = normalize(item, aliasMap, zhCanonical)
    const en = zhCanonical[norm]
    if (en) {
      invEnToZh.set(en, norm)
    }
  }

  const neighbors = similarityTop20[enMissing]
  for (const [neighEn, rawScore] of Object.entries(neighbors)) {
    const score = Math.round(rawScore * 100) / 100
    if (score < minScore) break
    if (invEnToZh.has(neighEn)) {
      return {
        substituteZh: invEnToZh.get(neighEn)!,
        substituteEn: neighEn,
        score,
      }
    }
  }

  return null
}

/**
 * 启发式风味方向推荐
 * 算法：聚合已选食材的 Top20 邻居，同一候选取最高分，排除已选，取 Top 18
 */
export function getFlavorDirections(
  inventory: string[],
  dataset: FlavorDataset,
  limit = 18
): FlavorDirection[] {
  const { aliasMap, zhCanonical, zhMap, similarityTop20 } = dataset

  const normItems = inventory.map(i => normalize(i, aliasMap, zhCanonical))
  const selectedEn = new Set<string>()
  for (const zh of normItems) {
    const en = zhCanonical[zh]
    if (en) selectedEn.add(en)
  }

  const candidateScores = new Map<string, number>()
  for (const en of selectedEn) {
    const neighbors = similarityTop20[en]
    if (!neighbors) continue
    for (const [neighEn, score] of Object.entries(neighbors)) {
      if (!selectedEn.has(neighEn)) {
        const current = candidateScores.get(neighEn) || 0
        if (score > current) {
          candidateScores.set(neighEn, score)
        }
      }
    }
  }

  return Array.from(candidateScores.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([en, score]) => ({
      zh: zhMap[en] || en,
      en,
      score: Math.round(score * 100) / 100,
    }))
}

/**
 * 最小补货提示：筛选出当前库存下仅差 1 种食材即可制作的食谱及对应补货建议
 * 基底硬门禁：只有该食谱已命中当前手头至少 1 样关键主料 (matchedKeyCount >= 1) 时才允许推荐，彻底拦截零主料重合的假补货。
 */
export function findMinimalRestockRecipes(
  recipes: Array<{
    id: string
    title: string
    ingredients: Array<{
      name: string
      role?: string
      isBasicPantry?: boolean
    }>
  }>,
  inventory: string[],
  dataset: FlavorDataset
): MinimalRestockSuggestion[] {
  const suggestions: MinimalRestockSuggestion[] = []
  const { aliasMap, zhCanonical } = dataset
  const normInventory = inventory.map(item => normalize(item, aliasMap, zhCanonical))
  const invSet = new Set(normInventory)

  for (const recipe of recipes) {
    const ingNames = recipe.ingredients.map(i => i.name)
    const match = evaluateRecipeMatch(ingNames, inventory, dataset)

    // 只有缺口恰好差 1 味才进入候选
    if (match.missingCount !== 1) {
      continue
    }

    // 基底硬门禁：如果定义了 key 主料，手头必须至少命中 1 样非基础调味的关键主料
    const hasKeyRole = recipe.ingredients.some(i => i.role === 'key' && !i.isBasicPantry)
    if (hasKeyRole) {
      const matchedKeyCount = recipe.ingredients.filter(i => {
        if (i.role !== 'key' || i.isBasicPantry) return false
        const norm = normalize(i.name, aliasMap, zhCanonical)
        return invSet.has(norm)
      }).length

      if (matchedKeyCount < 1) {
        continue // 零关键主料重合，坚决拦截！彻底杜绝手头无南瓜却推南瓜羹
      }
    } else {
      // 若没有 role 标注，退化为至少命中 1 项食材，且总食材数 > 1 (避免单食材食谱假补货)
      const matchedCount = recipe.ingredients.length - match.missingCount
      if (matchedCount < 1) {
        continue
      }
    }

    suggestions.push({
      recipeId: recipe.id,
      recipeTitle: recipe.title,
      missingIngredient: match.missing[0],
    })
  }

  return suggestions
}

export interface RecipeFlavorComplementsOptions {
  limit?: number
  inventory?: string[]
  excludeIngredients?: string[]
}

/**
 * 食谱卡片内部风味探索与提香进阶搭档辅料推荐
 * 
 * 核心哲学与契约：
 * 1. 针对“具体食谱”计算：提取食谱主干食材，在共现连边 (edges.json) 中聚合搭配权重最高、最具启发性的辅料。
 * 2. 排除已有食材：自动排除食谱本身已有的食材以及用户手头库存中已有的食材。
 * 3. 坚决屏蔽肉类大件（一票否决）：category_map 中标记为 'meat' 的主料（如羊肉、猪肉、牛肉、兔肉、鸭肉等）绝对禁止作为辅料推荐。
 * 4. 全面放开辅料与配菜：允许 cond (调味、香料、香草) 与 veg (蔬菜、菌菇、根茎类)，包括生僻搭配词（欧防风、刺山柑、芜菁等不可过滤）。
 * 5. 通过 zh_map.json 转换为规范中文展示名，按得分降序输出前 6~8 项推荐辅料。若无匹配连边则静默返回空数组。
 */
export function getRecipeFlavorComplements(
  recipeIngredients: string[],
  dataset: FlavorDataset,
  options: RecipeFlavorComplementsOptions = {}
): FlavorComplementItem[] {
  const limit = Math.max(1, options.limit ?? 8)
  const { aliasMap, zhCanonical, zhMap, categoryMap } = dataset

  // 1. 规范化食谱食材并取得其英文 Canonical ID
  const normRecipe = recipeIngredients
    .map(raw => normalize(raw, aliasMap, zhCanonical))
    .filter(Boolean)
  const recipeEnList = normRecipe
    .map(zh => zhCanonical[zh])
    .filter((en): en is string => Boolean(en))

  if (recipeEnList.length === 0) {
    return []
  }

  // 2. 收集需要排除的食材（包括食谱已有食材、额外排除食材与用户手头库存）
  const allExcludeRaw = [
    ...recipeIngredients,
    ...(options.excludeIngredients || []),
    ...(options.inventory || []),
  ]
  const normExclude = allExcludeRaw
    .map(raw => normalize(raw, aliasMap, zhCanonical))
    .filter(Boolean)

  const excludedZhSet = new Set(normExclude)
  const excludedEnSet = new Set<string>()
  for (const zh of normExclude) {
    const en = zhCanonical[zh]
    if (en) excludedEnSet.add(en)
  }
  for (const en of recipeEnList) {
    excludedEnSet.add(en)
  }

  // 3. 准备邻接表
  const adj = dataset.adjacencyList
    || (dataset.edges ? buildAdjacencyList(dataset.edges) : new Map<string, Array<{ node: string; weight: number }>>())

  // 4. 统计与食谱主干食材直接相连的候选节点权重与共现频次
  const candidateScores = new Map<string, { totalWeight: number; hitCount: number }>()

  const uniqueRecipeEn = Array.from(new Set(recipeEnList))
  for (const rootEn of uniqueRecipeEn) {
    const neighbors = adj.get(rootEn)
    if (!neighbors) continue

    for (const { node, weight } of neighbors) {
      // 排除已存在食材 (食谱已有或用户已有)
      if (excludedEnSet.has(node)) continue

      // 规则：坚决屏蔽肉类大件 (一票否决)
      if (categoryMap && categoryMap[node] === 'meat') continue

      // 必须能够通过 zhMap 解析为规范中文展示名
      const zh = zhMap[node]
      if (!zh || excludedZhSet.has(zh)) continue

      const current = candidateScores.get(node) || { totalWeight: 0, hitCount: 0 }
      current.totalWeight += weight
      current.hitCount += 1
      candidateScores.set(node, current)
    }
  }

  // 5. 按中文名聚合并计算综合打分 (打分 = 权重加和 + 多食材共现频次加成)
  const zhComplements = new Map<string, FlavorComplementItem>()
  for (const [enNode, { totalWeight, hitCount }] of candidateScores.entries()) {
    const zh = zhMap[enNode]
    if (!zh) continue

    const score = totalWeight + (hitCount - 1) * 2.0
    const cat = categoryMap ? categoryMap[enNode] : undefined

    const existing = zhComplements.get(zh)
    if (!existing) {
      zhComplements.set(zh, {
        zh,
        en: enNode,
        score,
        category: cat,
      })
    } else {
      existing.score += score
    }
  }

  // 6. 排序并截取 Top N
  const results = Array.from(zhComplements.values())
  results.sort((a, b) => b.score - a.score || a.zh.localeCompare(b.zh))

  return results.slice(0, limit)
}

/**
 * 预绑定数据集的便捷工厂函数
 */
export function createFlavorEngine(dataset: FlavorDataset) {
  const edgeSet = dataset.edgeSet || (dataset.edges ? buildUndirectedEdgeSet(dataset.edges) : new Set<string>())
  const adjacencyList = dataset.adjacencyList || (dataset.edges ? buildAdjacencyList(dataset.edges) : new Map())
  dataset.edgeSet = edgeSet
  dataset.adjacencyList = adjacencyList

  return {
    normalize: (raw: string) => normalize(raw, dataset.aliasMap, dataset.zhCanonical),
    evaluateRecipeMatch: (recipeIngredients: string[], inventory: string[]) =>
      evaluateRecipeMatch(recipeIngredients, inventory, dataset),
    calculateCohesiveness: (inventory: string[]) =>
      calculateCohesiveness(inventory, edgeSet, dataset.zhCanonical, dataset.aliasMap),
    getFlavorDirections: (inventory: string[], limit?: number) =>
      getFlavorDirections(inventory, dataset, limit),
    findMinimalRestockRecipes: (
      recipes: Array<{
        id: string
        title: string
        ingredients: Array<{
          name: string
          role?: string
          isBasicPantry?: boolean
        }>
      }>,
      inventory: string[]
    ) => findMinimalRestockRecipes(recipes, inventory, dataset),
    findBestSubstitute: (missingIngredient: string, availableIngredients: string[], minScore?: number) =>
      findBestSubstitute(missingIngredient, availableIngredients, dataset, minScore),
    getRecipeFlavorComplements: (recipeIngredients: string[], options?: RecipeFlavorComplementsOptions) =>
      getRecipeFlavorComplements(recipeIngredients, dataset, options),
  }
}

