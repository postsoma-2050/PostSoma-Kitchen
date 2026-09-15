import type { CookingMethodCode, CuisineStyleCode, DifficultyCode, OccasionTagCode } from '@/constants/taxonomy'
import type { SubRecipeFormula } from './formula'

/**
 * 食材分类枚举 (单一事实来源，不允许自由字符串)
 *
 * 迁移策略：旧数据中的非标 category (如 'grain', 'liquid', 'dairy') 在
 * normalizeRecipe() 中自动归一化到对应标准分类，确保后向兼容。
 */
export type IngredientCategory =
  | 'main'      // 主料（肉、海鲜、蛋、主食材）
  | 'produce'   // 蔬果菌菇（蔬菜、水果、菌类、豆类）
  | 'seasoning' // 干性调料（盐、糖、香料粉、辣椒粉）
  | 'liquid'    // 液体调料（酱油、醋、料酒、食用油）
  | 'dairy'     // 乳制品（黄油、奶油、奶酪、脱脂奶粉）
  | 'grain'     // 谷物粉类（面粉、淀粉、米、燕麦）
  | 'formula'   // 复合子配方入口（formulaId 指向 formulas[]）
  | 'other'     // 其他未分类

/**
 * 旧 category 字符串到标准 IngredientCategory 的映射字典
 * 用于 normalizeRecipe() 向前兼容迁移
 */
export const LEGACY_CATEGORY_MAP: Record<string, IngredientCategory> = {
  // 保持不变的合法值
  main: 'main',
  produce: 'produce',
  seasoning: 'seasoning',
  liquid: 'liquid',
  dairy: 'dairy',
  grain: 'grain',
  formula: 'formula',
  other: 'other',
  // 旧数据中可能出现的非标值
  vegetable: 'produce',
  fruit: 'produce',
  herb: 'produce',
  spice: 'seasoning',
  sauce: 'liquid',
  oil: 'liquid',
  stock: 'liquid',
  meat: 'main',
  seafood: 'main',
  egg: 'main',
  starch: 'grain',
  flour: 'grain',
  noodle: 'grain',
  nut: 'other',
  garnish: 'other',
}

export function normalizeIngredientCategory(raw?: string): IngredientCategory {
  if (!raw) return 'other'
  const mapped = LEGACY_CATEGORY_MAP[raw.toLowerCase().trim()]
  return mapped || 'other'
}

export interface V3Ingredient {
  id: string
  name: string            // 食材名称，如 "无盐黄油"
  amountText?: string     // 展示用量，如 "115 g" 或 "2 汤匙"
  category: IngredientCategory // 严格枚举，不允许自由字符串
  formulaId?: string      // 仅当 category === 'formula' 时使用，关联 SubRecipeFormula.id
  note?: string           // 备注，如 "室温软化" (统一使用 note，废弃 notes)
  /** @deprecated 请使用 note 字段，此字段仅为向后兼容保留，normalizeRecipe 会自动合并 */
  notes?: string
}

/**
 * 工序依赖关系分类：
 * - 'material': 实体物料流转（上游工序的半成品/产物作为本工序原料输入）
 * - 'order': 纯操作时序/资源约束（同锅先后、器具释放、时间等待等，无实体物料直接转入）
 * - 'legacy': 历史未分类依赖（旧数据仅有 inputBlockIds 时保留，禁止臆测为物料边）
 */
export type V3DependencyType = 'material' | 'order' | 'legacy'

export interface V3ActionDependency {
  sourceBlockId: string
  type: V3DependencyType
  label?: string // 边语义说明，如 "暂存牛肉", "同锅留底油"
}

export interface V3ActionBlock {
  id: string
  stageIndex: number       // 横向阶段 (0=第一阶段, 1=第二阶段...)
  ingredientIds: string[]  // 【语义】本工序关联的食材 ID 列表
  inputBlockIds?: string[] // 【语义向后兼容】本工序承接的上游工序 ID 列表 (物料输入或旧依赖)
  afterBlockIds?: string[] // 【语义】操作先后/前置等待工序 ID 列表 (无物料流转，如器具等待)
  dependencies?: V3ActionDependency[] // 【精准语义】带类型的显式依赖声明 (最高优先级)

  colIndex?: number
  startRowIndex?: number
  endRowIndex?: number

  action?: string
  label: string            // 展示主标题，如 "融化"
  sublabel?: string        // 次级标题，如 "melt"
  durationMinutes?: number // 耗时 (分钟)
  heatLevel?: string       // 火候/温度，如 "小火"
  equipment?: string       // 器具/容器，如 "耐热碗"
  completionState?: string // 【关键状态/准出条件】如 "大火沸腾撇净浮沫，肉块断生捞出"
  outputItem?: string      // 【半成品产物】如 "焯透五花肉", "糖色五花肉"
  note?: string            // 备注 (统一使用 note，废弃 notes)
  /** @deprecated 请使用 note 字段，此字段仅为向后兼容保留，normalizeRecipe 会自动合并 */
  notes?: string
}

export interface V3FinalBlock {
  method: CookingMethodCode | string
  label: string            // 标题，如 "烘焙 bake"
  appliance?: string       // 设备，如 "烤箱中层"
  temperatureC?: number    // 温度 (℃)
  temperatureF?: number    // 温度 (℉)
  durationMinMinutes?: number
  durationMaxMinutes?: number
  durationText?: string
  instructions?: string
  note?: string
  /** @deprecated 请使用 note 字段 */
  notes?: string
}

export interface V3Prerequisites {
  containerSize?: string
  preheat?: string
  servings?: string
  notes?: string[]
  prepNotes?: string
}

export interface VisualRecipeV3 {
  id: string
  version: '3.0'
  status: 'draft' | 'published' | 'complete'
  deletedAt?: string       // 软删除标记时间戳
  coverImageUrl?: string
  legacyMethodLabel?: string
  title: string
  description?: string
  cuisine?: CuisineStyleCode | string
  difficulty?: DifficultyCode
  occasions?: OccasionTagCode[]
  category?: string
  cookingTimeText?: string
  prerequisites: V3Prerequisites
  ingredients: V3Ingredient[]
  formulas?: SubRecipeFormula[]  // 复合调料/酱汁/腌料配方清单
  actionBlocks: V3ActionBlock[]
  finalBlock?: V3FinalBlock
  tips?: string[]
  createdAt: string
  updatedAt: string
  /** Repository 乐观锁版本；由持久化层注入，不参与食谱领域表达。 */
  contentVersion?: number
}

export function isV3Recipe(obj: any): obj is VisualRecipeV3 {
  return obj && obj.version === '3.0' && Array.isArray(obj.ingredients) && Array.isArray(obj.actionBlocks)
}
