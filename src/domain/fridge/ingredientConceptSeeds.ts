import type {
  IngredientConfidence,
  IngredientMatchRole,
  IngredientPublicCategory,
  IngredientReviewStatus,
  IngredientStorageAttribute,
} from './ingredientTypes'

export interface IngredientConceptSeed {
  id: string
  displayName: string
  aliases: string[]
  category: IngredientPublicCategory
  defaultRole: IngredientMatchRole
  storageAttributes?: IngredientStorageAttribute[]
  isBasicPantry?: boolean
  allowLooseMatch?: boolean
  confidence?: IngredientConfidence
  reviewStatus?: IngredientReviewStatus
  sourcePatterns?: RegExp[]
}

/**
 * 仅收录人工可明确确认的概念与变体。未命中的原始食材会保留原文并进入待审核台账，
 * 不会通过猜测性包含匹配强制并入这些概念。
 */
export const INGREDIENT_CONCEPT_SEEDS: IngredientConceptSeed[] = [
  {
    id: 'ing-chicken', displayName: '鸡肉', aliases: ['鸡肉', '鸡腿肉', '鸡胸肉', '土鸡'],
    category: 'meat_poultry_eggs_tofu', defaultRole: 'key',
    sourcePatterns: [
      /^(?:鸡腿肉丁|土鸡块)$/,
      /^cooked chicken breast 熟鸡胸肉(?:\s*\([^)]*\))?$/i,
      /^boneless chicken breasts 熟无骨鸡胸肉$/i,
    ],
  },
  {
    id: 'ing-egg', displayName: '鸡蛋', aliases: ['鸡蛋'],
    category: 'meat_poultry_eggs_tofu', defaultRole: 'key',
    sourcePatterns: [/^(?:新鲜)?鸡蛋(?:液)?$/, /^eggs 鸡蛋$/i],
  },
  {
    id: 'ing-egg-white', displayName: '鸡蛋清', aliases: ['鸡蛋清', '蛋清'],
    category: 'meat_poultry_eggs_tofu', defaultRole: 'key',
    sourcePatterns: [/^(?:新鲜)?鸡蛋清$/],
  },
  {
    id: 'ing-pork', displayName: '猪肉', aliases: ['猪肉'],
    category: 'meat_poultry_eggs_tofu', defaultRole: 'key',
    sourcePatterns: [/^(?:鲜|熟|调味)?猪(?:里脊)?肉(?:丝|片|丁|末|块)?(?:\s*\([^)]*\))?$/],
  },
  {
    id: 'ing-beef', displayName: '牛肉', aliases: ['牛肉'],
    category: 'meat_poultry_eggs_tofu', defaultRole: 'key',
    sourcePatterns: [/^(?:薄切)?(?:鲜)?牛肉(?:丝|片|粒|碎|块)?(?:\s*\([^)]*\))?$/, /^ground beef 牛肉碎$/i],
  },
  {
    id: 'ing-lamb', displayName: '羊肉', aliases: ['羊肉'],
    category: 'meat_poultry_eggs_tofu', defaultRole: 'key',
    sourcePatterns: [/^(?:鲜嫩)?羊肉(?:片|末|块)?(?:\s*\([^)]*\))?$/],
  },
  {
    id: 'ing-turkey', displayName: '火鸡肉', aliases: ['火鸡肉', '火鸡绞肉'],
    category: 'meat_poultry_eggs_tofu', defaultRole: 'key',
    sourcePatterns: [/^ground turkey 火鸡绞肉$/i],
  },
  {
    id: 'ing-tofu', displayName: '豆腐', aliases: ['豆腐', '嫩豆腐', '内酯豆腐'],
    category: 'meat_poultry_eggs_tofu', defaultRole: 'key',
    sourcePatterns: [/^(?:嫩|内酯)?豆腐(?:\s*\([^)]*\))?$/],
  },
  {
    id: 'ing-dried-tofu', displayName: '豆腐干', aliases: ['豆腐干', '五香豆腐干'],
    category: 'meat_poultry_eggs_tofu', defaultRole: 'key', storageAttributes: ['processed'],
    sourcePatterns: [/^五香豆腐干(?:\s*\([^)]*\))?$/],
  },
  {
    id: 'ing-fish', displayName: '鱼肉', aliases: ['鱼肉', '黑鱼肉'],
    category: 'seafood', defaultRole: 'key',
    sourcePatterns: [/^黑鱼蓉(?:\s*\([^)]*\))?$/],
  },
  {
    id: 'ing-shrimp', displayName: '虾仁', aliases: ['虾仁', '鲜虾仁'],
    category: 'seafood', defaultRole: 'key',
    sourcePatterns: [/^(?:鲜)?虾仁(?:碎)?(?:\s*\([^)]*\))?$/],
  },
  {
    id: 'ing-scallop', displayName: '扇贝', aliases: ['扇贝', '鲜扇贝'],
    category: 'seafood', defaultRole: 'key', sourcePatterns: [/^(?:鲜)?扇贝(?:肉)?(?:\s*\([^)]*\))?$/],
  },
  {
    id: 'ing-eel', displayName: '白鳝', aliases: ['白鳝'],
    category: 'seafood', defaultRole: 'key', sourcePatterns: [/^白鳝(?:\s*\([^)]*\))?$/],
  },
  {
    id: 'ing-tomato-fresh', displayName: '鲜番茄', aliases: ['番茄', '西红柿', '鲜番茄'],
    category: 'vegetables_mushrooms_aromatics', defaultRole: 'key', storageAttributes: ['fresh'],
    sourcePatterns: [/^(?:(?:新鲜|熟透|熟|红|大)+)?番茄(?:碎|汁)?(?:\s*\([^)]*\))?$/],
  },
  {
    id: 'ing-tomato-canned', displayName: '番茄罐头', aliases: ['番茄罐头', '炖番茄罐头'],
    category: 'processed_staples', defaultRole: 'supporting', storageAttributes: ['canned', 'processed'],
    sourcePatterns: [/^(?:crushed tomatoes 碎番茄罐头|stewed tomatoes 炖番茄罐头)$/i],
  },
  {
    id: 'ing-ketchup', displayName: '番茄酱', aliases: ['番茄酱', 'ketchup', 'catsup'],
    category: 'seasonings_sauces', defaultRole: 'seasoning', storageAttributes: ['processed'],
    sourcePatterns: [/^catsup 番茄酱$/i],
  },
  {
    id: 'ing-potato', displayName: '土豆', aliases: ['土豆', '马铃薯'],
    category: 'grains_noodles_tubers', defaultRole: 'key',
    sourcePatterns: [/^(?:小黄心)?土豆(?:块|片)?(?:\s*\([^)]*\))?$/],
  },
  {
    id: 'ing-spinach', displayName: '菠菜', aliases: ['菠菜'],
    category: 'vegetables_mushrooms_aromatics', defaultRole: 'key', storageAttributes: ['fresh'],
    sourcePatterns: [/^(?:新鲜)?菠菜(?:\s*\([^)]*\))?$/],
  },
  {
    id: 'ing-carrot', displayName: '胡萝卜', aliases: ['胡萝卜'],
    category: 'vegetables_mushrooms_aromatics', defaultRole: 'supporting',
    sourcePatterns: [/^胡萝卜(?:丝|片|块|丁)?(?:\s*\([^)]*\))?$/],
  },
  {
    id: 'ing-onion', displayName: '洋葱', aliases: ['洋葱'],
    category: 'vegetables_mushrooms_aromatics', defaultRole: 'supporting',
    sourcePatterns: [/^(?:紫皮|大)?洋葱(?:丝|片|丁)?(?:\s*\([^)]*\))?$/, /^large onion 洋葱(?:\s*\([^)]*\))?$/i],
  },
  {
    id: 'ing-garlic', displayName: '大蒜', aliases: ['大蒜', '蒜', '蒜末', '蒜蓉'],
    category: 'vegetables_mushrooms_aromatics', defaultRole: 'supporting',
    sourcePatterns: [/^(?:大量)?(?:大蒜|蒜末|蒜片|蒜蓉|蒜泥)(?:\s*\([^)]*\))?$/],
  },
  {
    id: 'ing-ginger', displayName: '生姜', aliases: ['生姜', '姜', '姜片', '姜末'],
    category: 'vegetables_mushrooms_aromatics', defaultRole: 'supporting',
    sourcePatterns: [/^(?:生姜|姜片|姜末)(?:\s*\([^)]*\))?$/],
  },
  {
    id: 'ing-rice', displayName: '大米', aliases: ['大米', '米', '长粒米'],
    category: 'grains_noodles_tubers', defaultRole: 'key', storageAttributes: ['dried'],
    sourcePatterns: [/^converted rice 长粒米$/i],
  },
  {
    id: 'ing-flour', displayName: '面粉', aliases: ['面粉', '中筋面粉'],
    category: 'grains_noodles_tubers', defaultRole: 'key', storageAttributes: ['dried'],
    sourcePatterns: [/^flour 面粉$/i, /^all-purpose flour 中筋面粉$/i],
  },
  {
    id: 'ing-vermicelli', displayName: '粉丝', aliases: ['粉丝', '龙口粉丝'],
    category: 'grains_noodles_tubers', defaultRole: 'key', storageAttributes: ['dried'],
    sourcePatterns: [/^龙口细粉丝(?:\s*\([^)]*\))?$/],
  },
  {
    id: 'ing-butter', displayName: '黄油', aliases: ['黄油', '无盐黄油', 'butter'],
    category: 'dairy_fats', defaultRole: 'supporting', storageAttributes: ['processed'],
    sourcePatterns: [/^butter 无盐黄油(?:\s*\([^)]*\))?$/i, /^unsalted butter 无盐黄油$/i, /^softened butter 软化黄油$/i],
  },
  {
    id: 'ing-milk', displayName: '牛奶', aliases: ['牛奶', '鲜牛奶'],
    category: 'dairy_fats', defaultRole: 'supporting', sourcePatterns: [/^(?:鲜)?牛奶$/],
  },
  {
    id: 'ing-cheese', displayName: '芝士', aliases: ['芝士', '奶酪'],
    category: 'dairy_fats', defaultRole: 'supporting', storageAttributes: ['processed'],
  },
  {
    id: 'ing-peanut', displayName: '花生', aliases: ['花生', '花生仁'],
    category: 'beans_nuts_seeds', defaultRole: 'supporting', storageAttributes: ['dried'],
    sourcePatterns: [/^(?:炸)?花生仁(?:\s*\([^)]*\))?$/],
  },
  {
    id: 'ing-salt', displayName: '食盐', aliases: ['盐', '食盐'],
    category: 'seasonings_sauces', defaultRole: 'pantry', isBasicPantry: true,
    sourcePatterns: [/^食盐$/, /^table salt 食盐$/i],
  },
  {
    id: 'ing-sugar', displayName: '白糖', aliases: ['糖', '白糖', '砂糖'],
    category: 'seasonings_sauces', defaultRole: 'pantry', isBasicPantry: true,
    sourcePatterns: [/^(?:白糖|砂糖)$/, /^sugar 砂糖$/i],
  },
  {
    id: 'ing-rock-sugar', displayName: '冰糖', aliases: ['冰糖', '多晶冰糖'],
    category: 'seasonings_sauces', defaultRole: 'pantry', isBasicPantry: true,
    sourcePatterns: [/^(?:冰糖|多晶冰糖)$/],
  },
  {
    id: 'ing-water', displayName: '清水', aliases: ['水', '清水', '沸水'],
    category: 'seasonings_sauces', defaultRole: 'pantry', isBasicPantry: true,
    sourcePatterns: [/^(?:清水|沸水)$/],
  },
  {
    id: 'ing-vegetable-oil', displayName: '食用植物油', aliases: ['食用油', '植物油'],
    category: 'dairy_fats', defaultRole: 'pantry', isBasicPantry: true,
    sourcePatterns: [/^(?:熟)?植物油(?:\s*\([^)]*\))?$/, /^植物油$/],
  },
  {
    id: 'ing-soy-sauce', displayName: '酱油', aliases: ['酱油'],
    category: 'seasonings_sauces', defaultRole: 'pantry', isBasicPantry: true,
    sourcePatterns: [/^酱油$/],
  },
  {
    id: 'ing-light-soy-sauce', displayName: '生抽', aliases: ['生抽', '生抽酱油'],
    category: 'seasonings_sauces', defaultRole: 'pantry', isBasicPantry: true,
    sourcePatterns: [/^(?:特级)?生抽(?:酱油)?$/],
  },
  {
    id: 'ing-dark-soy-sauce', displayName: '老抽', aliases: ['老抽', '老抽酱油'],
    category: 'seasonings_sauces', defaultRole: 'pantry', isBasicPantry: true,
    sourcePatterns: [/^老抽(?:酱油)?$/],
  },
  {
    id: 'ing-vinegar', displayName: '食醋', aliases: ['醋', '香醋', '陈醋', '白醋'],
    category: 'seasonings_sauces', defaultRole: 'pantry', isBasicPantry: true,
    sourcePatterns: [/^(?:香醋|陈醋|白醋)$/],
  },
  {
    id: 'ing-cooking-wine', displayName: '料酒', aliases: ['料酒', '黄酒'],
    category: 'seasonings_sauces', defaultRole: 'pantry', isBasicPantry: true,
    sourcePatterns: [/^(?:料酒|黄酒)$/],
  },
  {
    id: 'ing-starch', displayName: '淀粉', aliases: ['淀粉', '玉米淀粉', '水淀粉'],
    category: 'seasonings_sauces', defaultRole: 'pantry', isBasicPantry: true,
    sourcePatterns: [/^(?:玉米)?淀粉$/, /^水淀粉$/],
  },
  {
    id: 'ing-honey', displayName: '蜂蜜', aliases: ['蜂蜜', '纯蜂蜜'],
    category: 'seasonings_sauces', defaultRole: 'seasoning',
    sourcePatterns: [/^(?:纯)?蜂蜜$/],
  },
]
