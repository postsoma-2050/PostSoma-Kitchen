/**
 * Time_to_eat 统一分类常量与 Taxonomy 标准定义
 * 全项目唯一的权威分类数据源
 */

export type CookingMethodCode = 'bake' | 'stew' | 'fry' | 'steam' | 'boil' | 'sear' | 'raw' | 'serve' | 'other'
export type CuisineStyleCode = 'chinese' | 'western' | 'japanese_korean' | 'southeast_asian' | 'fusion'
export type DifficultyCode = 'easy' | 'medium' | 'hard'
export type OccasionTagCode = 'weekday_quick' | 'family_dinner' | 'party_snack' | 'solo_meal' | 'holiday_feast'

export interface TaxonomyOption<T extends string> {
    code: T
    label: string
    labelEn: string
    icon: string
}

// 1. 烹饪方式 (Cooking Method)
export const COOKING_METHODS: TaxonomyOption<CookingMethodCode>[] = [
    { code: 'bake', label: '烘焙', labelEn: 'Bake', icon: '♨️' },
    { code: 'stew', label: '慢炖/红烧', labelEn: 'Stew', icon: '🍲' },
    { code: 'fry', label: '煎炒/爆炒', labelEn: 'Fry', icon: '🍳' },
    { code: 'steam', label: '蒸制', labelEn: 'Steam', icon: '💨' },
    { code: 'boil', label: '煮制/焯水', labelEn: 'Boil', icon: '🫕' },
    { code: 'sear', label: '香煎/煎炙', labelEn: 'Sear', icon: '🥩' },
    { code: 'raw', label: '冷食/免火', labelEn: 'Raw', icon: '🥗' },
    { code: 'serve', label: '凉拌即享', labelEn: 'Serve', icon: '🥗' },
    { code: 'other', label: '其他烹饪', labelEn: 'Other', icon: '🍽️' }
]

// 2. 菜系风味 (Cuisine Style)
export const CUISINE_STYLES: TaxonomyOption<CuisineStyleCode>[] = [
    { code: 'chinese', label: '中式经典', labelEn: 'Chinese', icon: '🇨🇳' },
    { code: 'western', label: '西式家常', labelEn: 'Western', icon: '🌎' },
    { code: 'japanese_korean', label: '日韩料理', labelEn: 'Japanese/Korean', icon: '🍱' },
    { code: 'southeast_asian', label: '东南亚风味', labelEn: 'Southeast Asian', icon: '🥥' },
    { code: 'fusion', label: '跨界无国界', labelEn: 'Fusion', icon: '🍹' }
]

// 3. 烹饪难度 (Difficulty)
export const DIFFICULTIES: TaxonomyOption<DifficultyCode>[] = [
    { code: 'easy', label: '简单上手', labelEn: 'Easy', icon: '🟢' },
    { code: 'medium', label: '中等进阶', labelEn: 'Medium', icon: '🟡' },
    { code: 'hard', label: '繁复硬菜', labelEn: 'Hard', icon: '🔴' }
]

// 4. 用餐场合 (Occasion Tags)
export const OCCASION_TAGS: TaxonomyOption<OccasionTagCode>[] = [
    { code: 'weekday_quick', label: '工作日快手', labelEn: 'Weekday Quick', icon: '⚡' },
    { code: 'family_dinner', label: '家庭晚宴', labelEn: 'Family Dinner', icon: '👨‍👩‍👧‍👦' },
    { code: 'party_snack', label: '派对聚会', labelEn: 'Party & Snack', icon: '🥳' },
    { code: 'solo_meal', label: '一人精致餐', labelEn: 'Solo Meal', icon: '👤' },
    { code: 'holiday_feast', label: '节日硬菜大餐', labelEn: 'Holiday Feast', icon: '🎉' }
]

/**
 * 辅助获取烹饪方式中文/英文/Icon 标签
 */
export function getCookingMethodOption(code?: string): TaxonomyOption<CookingMethodCode> {
    const found = COOKING_METHODS.find(m => m.code === code)
    return found || COOKING_METHODS[COOKING_METHODS.length - 1] // 默认 other
}

/**
 * 辅助获取菜系风味 Option
 */
export function getCuisineStyleOption(code?: string): TaxonomyOption<CuisineStyleCode> {
    const found = CUISINE_STYLES.find(c => c.code === code)
    return found || CUISINE_STYLES[0] // 默认中式
}

/**
 * 辅助获取难度 Option
 */
export function getDifficultyOption(code?: string): TaxonomyOption<DifficultyCode> {
    const found = DIFFICULTIES.find(d => d.code === code)
    return found || DIFFICULTIES[0]
}

/**
 * 难度半自动建议算子：根据工序列数量自动建议难度
 * -工序步数 <= 2 步 -> easy (简单)
 * -工序步数 3~4 步  -> medium (中等)
 * -工序步数 >= 5 步  -> hard (繁复)
 */
export function calculateSuggestedDifficulty(stepCount: number): DifficultyCode {
    if (stepCount <= 2) return 'easy'
    if (stepCount <= 4) return 'medium'
    return 'hard'
}
