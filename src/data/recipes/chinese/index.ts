import type { VisualRecipeV3 } from '@/types/recipeV3'
import { BATCH1_MEAT_EGG } from './batch1_meat_egg'
import { BATCH2_VEGETABLES } from './batch2_vegetables'
import { BATCH3_MUSHROOMS_TUBERS } from './batch3_mushrooms_tubers'
import { BATCH4_SEAFOOD } from './batch4_seafood'
import { BATCH5_FIVE_VISCERA } from './batch5_five_viscera'
import { BATCH6_CHRONIC_DISEASES } from './batch6_chronic_diseases'
import { BATCH7_SPECIAL_CARE } from './batch7_special_care'
import { BATCH8_ELDERLY_BREAKFAST } from './batch8_elderly_breakfast'

/**
 * 营养师张晔《蒸炖炒，营养师的健康食谱》原书 151 道真实食谱全集 (VisualRecipeV3.0)
 * 100% 忠实于原书正文，一人一行原子化食材，无复合食材
 */
export const CHINESE_HEALTHY_RECIPES: VisualRecipeV3[] = [
  ...BATCH1_MEAT_EGG,
  ...BATCH2_VEGETABLES,
  ...BATCH3_MUSHROOMS_TUBERS,
  ...BATCH4_SEAFOOD,
  ...BATCH5_FIVE_VISCERA,
  ...BATCH6_CHRONIC_DISEASES,
  ...BATCH7_SPECIAL_CARE,
  ...BATCH8_ELDERLY_BREAKFAST
]

export {
  BATCH1_MEAT_EGG,
  BATCH2_VEGETABLES,
  BATCH3_MUSHROOMS_TUBERS,
  BATCH4_SEAFOOD,
  BATCH5_FIVE_VISCERA,
  BATCH6_CHRONIC_DISEASES,
  BATCH7_SPECIAL_CARE,
  BATCH8_ELDERLY_BREAKFAST
}
