import type { IngredientPublicCategory } from '@/domain/fridge'

export interface FridgeCategoryPresentation {
  id: IngredientPublicCategory
  label: string
  shortLabel: string
  description: string
}

export const FRIDGE_CATEGORY_PRESENTATIONS: FridgeCategoryPresentation[] = [
  { id: 'meat_poultry_eggs_tofu', label: '肉禽蛋与豆制品', shortLabel: '肉禽蛋豆', description: '肉类、禽类、蛋类与豆腐制品' },
  { id: 'seafood', label: '鱼虾贝类', shortLabel: '鱼虾贝类', description: '鱼、虾、贝及其他水产食材' },
  { id: 'vegetables_mushrooms_aromatics', label: '蔬菜菌菇与葱姜蒜', shortLabel: '蔬菜菌菇', description: '蔬菜、菌菇、葱姜蒜与新鲜香草' },
  { id: 'grains_noodles_tubers', label: '米面薯与谷物', shortLabel: '米面薯谷物', description: '米、面、粉、薯类与谷物' },
  { id: 'beans_nuts_seeds', label: '豆类坚果与种子', shortLabel: '豆类坚果', description: '豆类、坚果与种子食材' },
  { id: 'dairy_fats', label: '奶制品与烹调脂肪', shortLabel: '奶与脂肪', description: '奶、芝士、黄油与烹调脂肪' },
  { id: 'seasonings_sauces', label: '调味香料与酱汁', shortLabel: '调味酱汁', description: '非基础调味、香料与复合酱汁' },
  { id: 'processed_staples', label: '常备加工食材', shortLabel: '加工食材', description: '罐装、预制及其他常备加工食材' },
]

export const FRIDGE_CATEGORY_BY_ID = new Map(FRIDGE_CATEGORY_PRESENTATIONS.map(category => [category.id, category]))
