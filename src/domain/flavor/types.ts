/**
 * 风味拓扑网络领域模型类型契约 (The Flavor Bible Topology Engine Types)
 */

export type RecipeMatchStatus = 'ready' | 'substitutable' | 'need-restock'

export interface IngredientSubstitute {
  missing: string          // 缺失的食材原名（或规范名）
  substituteZh: string     // 用户手头可用的平替食材中文名
  substituteEn: string     // 平替食材的英文 canonical id
  score: number            // Jaccard 搭配语境相似度 (如 0.34)
}

export interface RecipeMatchReady {
  status: 'ready'
  statusText: string
  missingCount: 0
  missing: []
  substitutes: []
}

export interface RecipeMatchSubstitutable {
  status: 'substitutable'
  statusText: string
  missingCount: number
  missing: string[]
  substitutes: IngredientSubstitute[]
}

export interface RecipeMatchNeedRestock {
  status: 'need-restock'
  statusText: string
  missingCount: number
  missing: string[]
  substitutes: [] // 3+ 缺口时严禁给平替，substitutes 在类型层强制为空元组 []
}

/**
 * 食谱匹配与缺口判定结果契约 (Discriminated Union)
 * 约束：
 * - status === 'ready' (0 缺口): missing 与 substitutes 必须为空数组 []
 * - status === 'substitutable' (1~2 缺口): missing 包含 1~2 项，substitutes 包含库存中匹配到的 Top 1 平替
 * - status === 'need-restock' (3+ 缺口): 严禁提供平替，类型定义上 substitutes 必须为空数组 []
 */
export type RecipeMatchEvaluation =
  | RecipeMatchReady
  | RecipeMatchSubstitutable
  | RecipeMatchNeedRestock

/**
 * 食材共现抱团度（风味连贯性）计算结果
 */
export interface CohesivenessResult {
  score: number           // 连边比例 (0.00 ~ 1.00)
  totalPairs: number      // 库存食材两两组合数 (n * (n - 1) / 2)
  connectedPairs: number  // 具有共现边的配对数
}

/**
 * 启发式风味方向推荐项
 */
export interface FlavorDirection {
  zh: string              // 中文推荐食材名
  en: string              // 英文 canonical id
  score: number           // 关联得分 (0.00 ~ 1.00)
}

/**
 * 最小补货提示项 (差 1 味即可制作)
 */
export interface MinimalRestockSuggestion {
  recipeId: string
  recipeTitle: string
  missingIngredient: string
}

/**
 * 食谱风味进阶搭档辅料探索项
 */
export interface FlavorComplementItem {
  zh: string              // 中文推荐辅料名，如 "蒜", "黑胡椒", "欧防风"
  en: string              // 英文 canonical id，如 "garlic", "parsnips"
  score: number           // 共现加权得分
  category?: string       // 品类角色，如 "cond" (调味/香料), "veg" (蔬菜/配菜)
}

/**
 * 完整风味数据集模型
 */
export interface FlavorDataset {
  similarityTop20: Record<string, Record<string, number>>
  zhMap: Record<string, string>
  zhCanonical: Record<string, string>
  aliasMap: Record<string, string>
  categoryMap?: Record<string, string>
  edges?: Array<{ from: string; to: string; weight?: number }>
  edgeSet?: Set<string>
  adjacencyList?: Map<string, Array<{ node: string; weight: number }>>
}
