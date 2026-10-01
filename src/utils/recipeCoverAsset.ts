import type { VisualRecipeV3 } from '@/types/recipeV3'

export type RecipeCoverState = 'manual' | 'fallback'

export interface ResolvedRecipeCover {
  state: RecipeCoverState
  url: string
}

/**
 * 8 大通用烹饪情境与保底摄影图资产映射 (FLUX.1 极简商业摄影)
 */
export const SITUATION_COVERS = {
  stirfry: '/recipe-covers/situation-stirfry.webp',
  stew: '/recipe-covers/situation-stew.webp',
  appetizer: '/recipe-covers/situation-appetizer.webp',
  main: '/recipe-covers/situation-main.webp',
  soup: '/recipe-covers/situation-soup.webp',
  salad: '/recipe-covers/situation-salad.webp',
  snack: '/recipe-covers/situation-snack.webp',
  dessert: '/recipe-covers/situation-dessert.webp',
} as const

export const DEFAULT_RECIPE_COVER = SITUATION_COVERS.main

/**
 * 全量 170 道已生成并认证入库的专属 AI 封面食谱 ID
 */
export const CONFIRMED_COVERS = new Set<string>([
  // 中餐食谱 cn-01 ~ cn-151 (151道)
  'cn-01', 'cn-02', 'cn-03', 'cn-04', 'cn-05', 'cn-06', 'cn-07', 'cn-08', 'cn-09', 'cn-10',
  'cn-11', 'cn-12', 'cn-13', 'cn-14', 'cn-15', 'cn-16', 'cn-17', 'cn-18', 'cn-19', 'cn-20',
  'cn-21', 'cn-22', 'cn-23', 'cn-24', 'cn-25', 'cn-26', 'cn-27', 'cn-28', 'cn-29', 'cn-30',
  'cn-31', 'cn-32', 'cn-33', 'cn-34', 'cn-35', 'cn-36', 'cn-37', 'cn-38', 'cn-39', 'cn-40',
  'cn-41', 'cn-42', 'cn-43', 'cn-44', 'cn-45', 'cn-46', 'cn-47', 'cn-48', 'cn-49', 'cn-50',
  'cn-51', 'cn-52', 'cn-53', 'cn-54', 'cn-55', 'cn-56', 'cn-57', 'cn-58', 'cn-59', 'cn-60',
  'cn-61', 'cn-62', 'cn-63', 'cn-64', 'cn-65', 'cn-66', 'cn-67', 'cn-68', 'cn-69', 'cn-70',
  'cn-71', 'cn-72', 'cn-73', 'cn-74', 'cn-75', 'cn-76', 'cn-77', 'cn-78', 'cn-79', 'cn-80',
  'cn-81', 'cn-82', 'cn-83', 'cn-84', 'cn-85', 'cn-86', 'cn-87', 'cn-88', 'cn-89', 'cn-90',
  'cn-91', 'cn-92', 'cn-93', 'cn-94', 'cn-95', 'cn-96', 'cn-97', 'cn-98', 'cn-99', 'cn-100',
  'cn-101', 'cn-102', 'cn-103', 'cn-104', 'cn-105', 'cn-106', 'cn-107', 'cn-108', 'cn-109', 'cn-110',
  'cn-111', 'cn-112', 'cn-113', 'cn-114', 'cn-115', 'cn-116', 'cn-117', 'cn-118', 'cn-119', 'cn-120',
  'cn-121', 'cn-122', 'cn-123', 'cn-124', 'cn-125', 'cn-126', 'cn-127', 'cn-128', 'cn-129', 'cn-130',
  'cn-131', 'cn-132', 'cn-133', 'cn-134', 'cn-135', 'cn-136', 'cn-137', 'cn-138', 'cn-139', 'cn-140',
  'cn-141', 'cn-142', 'cn-143', 'cn-144', 'cn-145', 'cn-146', 'cn-147', 'cn-148', 'cn-149', 'cn-150',
  'cn-151',
  // 美式私房菜 hsh-01 ~ hsh-16 (16道)
  'hsh-01-hazelnut-mocha', 'hsh-02-taco-soup', 'hsh-03-chicken-ritz', 'hsh-04-mexican-lasagna',
  'hsh-05-noodle-kugel', 'hsh-06-bbq-butter-beans', 'hsh-07-pineapple-stuffing', 'hsh-08-pecan-rice',
  'hsh-09-peanut-butter-brownie', 'hsh-10-italian-mushrooms', 'hsh-11-pecan-rolls', 'hsh-12-pound-cake',
  'hsh-13-beef-barley-soup', 'hsh-14-angel-biscuits', 'hsh-15-chicken-dumplings', 'hsh-16-hashbrown-casserole',
  // V3 经典样例 (3道)
  'v3-espresso-brownies', 'v3-hong-shao-rou', 'v3-caesar-salad',
])

/**
 * 根据食谱的工序、菜系及标题特征，智能匹配最契合的通用保底摄影图
 */
export function resolveSituationFallback(recipe?: Partial<VisualRecipeV3> | null): string {
  if (!recipe) return DEFAULT_RECIPE_COVER

  const method = recipe.finalBlock?.method || ''
  const title = (recipe.title || '').toLowerCase()

  // 1. 靓汤 / 羹
  if (method === 'soup' || title.includes('汤') || title.includes('羹') || title.includes('soup') || title.includes('broth')) {
    return SITUATION_COVERS.soup
  }

  // 2. 烘焙 / 甜品
  if (method === 'bake' || title.includes('甜品') || title.includes('蛋糕') || title.includes('布朗尼') || title.includes('松饼') || title.includes('dessert') || title.includes('cake') || title.includes('muffin') || title.includes('pie') || title.includes('tart')) {
    return SITUATION_COVERS.dessert
  }

  // 3. 生鲜沙拉 / 凉拌
  if (method === 'raw' || title.includes('沙拉') || title.includes('salad') || title.includes('凉拌') || title.includes('冷盘')) {
    return SITUATION_COVERS.salad
  }

  // 4. 点心 / 休闲小吃
  if (title.includes('点心') || title.includes('小吃') || title.includes('饺') || title.includes('包') || title.includes('饼') || title.includes('卷') || title.includes('dim sum') || title.includes('snack') || title.includes('biscuit') || title.includes('dumpling')) {
    return SITUATION_COVERS.snack
  }

  // 5. 精致前菜
  if (method === 'serve' || title.includes('前菜') || title.includes('冷碟') || title.includes('开胃') || title.includes('appetizer')) {
    return SITUATION_COVERS.appetizer
  }

  // 6. 快炒 / 煎炒
  if (method === 'fry' || title.includes('炒') || title.includes('爆') || title.includes('熘') || title.includes('煎') || title.includes('stir-fry')) {
    return SITUATION_COVERS.stirfry
  }

  // 7. 滋补慢炖 / 焖煨
  if (method === 'stew' || title.includes('炖') || title.includes('焖') || title.includes('煨') || title.includes('煲') || title.includes('stew') || title.includes('braise')) {
    return SITUATION_COVERS.stew
  }

  // 8. 默认：主厨大件主菜
  return SITUATION_COVERS.main
}

/**
 * 食谱封面解析策略：
 * 1. 【最高优先级】若用户在后台设置/更新了照片 (recipe.coverImageUrl)，以用户的真实照片为准（支持 .webp 与 .jpg）。
 * 2. 【静态已核对封面】若未显式指定 coverImageUrl，但属于系统 170 道认证入库的专属封面，自动映射对应本地/CDN 高清 WebP 照片。
 * 3. 【智能情境保底】匹配 8 大情境保底图（时令快炒、滋补慢炖、精致前菜、大件主菜、清润靓汤、生鲜沙拉、休闲小吃、烘焙甜品）。
 */
export function resolveRecipeCover(recipe: VisualRecipeV3): ResolvedRecipeCover {
  if (recipe.coverImageUrl?.trim()) {
    const rawUrl = recipe.coverImageUrl.trim()
    // 若指向预置标准食谱旧版 .jpg (如 cn-01.jpg, hsh-01.jpg)，无缝切换为高质量 .webp
    if (/^\/recipe-covers\/(cn-\d+|hsh-[a-z0-9-]+|v3-[a-z0-9-]+)\.jpg$/i.test(rawUrl)) {
      return { state: 'manual', url: rawUrl.replace(/\.jpg$/i, '.webp') }
    }
    return { state: 'manual', url: rawUrl }
  }

  const exactId = recipe.id?.trim()
  if (exactId && CONFIRMED_COVERS.has(exactId)) {
    return { state: 'manual', url: `/recipe-covers/${exactId}.webp` }
  }

  const prefixId = exactId?.split('-').slice(0, 2).join('-')
  if (prefixId && CONFIRMED_COVERS.has(prefixId)) {
    return { state: 'manual', url: `/recipe-covers/${prefixId}.webp` }
  }

  return { state: 'fallback', url: resolveSituationFallback(recipe) }
}
