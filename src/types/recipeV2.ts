// V2 食谱可视化工作台核心数据模型

export type IngredientGroup = 'main' | 'wet' | 'dry' | 'seasoning' | 'garnish'

export interface Ingredient {
    id: string
    name: string
    amount?: number
    unit?: string
    amountText?: string
    group?: IngredientGroup
    note?: string
}

export interface Preparation {
    id: string
    ingredientId: string
    action: string
    note?: string
}

export interface FlowNode {
    id: string
    action: string // 动作标识符，如 melt, mix, fold_in, stir, sear, boil 等
    label: string // 界面显示文本，如 "融化", "混合", "翻拌"
    ingredientIds: string[] // 直接引用的食材 ID 列表
    dependsOnNodeIds: string[] // 依赖的上游 FlowNode ID 列表
    durationMinutes?: number
    temperature?: string
    heatLevel?: string
    equipment?: string
    note?: string
}

export type FinalCookingMethod = 'bake' | 'fry' | 'sear' | 'steam' | 'stew' | 'boil' | 'raw' | 'serve' | 'other'

export interface FinalCooking {
    method: FinalCookingMethod
    label?: string
    equipment?: string
    temperature?: string
    temperatureC?: number
    heatLevel?: string
    durationMinutes?: number
    instructions?: string
}

export interface Prerequisites {
    preheatTempC?: number
    targetServings?: number
    containersNeeded?: string[]
    notes?: string[]
}

export type VisibilityType = 'private' | 'unlisted' | 'public'

export interface V2Recipe {
    id: string
    version: '2.0'
    title: string
    description?: string
    coverImageUrl?: string
    prerequisites?: Prerequisites
    ingredients: Ingredient[]
    preparations?: Preparation[]
    flowNodes: FlowNode[]
    finalCooking?: FinalCooking[]
    tips?: string[]
    visibility?: VisibilityType
    createdAt?: string
    updatedAt?: string
}

/**
 * 判断对象是否为 V2Recipe 的类型守卫
 */
export function isV2Recipe(recipe: any): recipe is V2Recipe {
    return (
        recipe !== null &&
        typeof recipe === 'object' &&
        recipe.version === '2.0' &&
        typeof recipe.title === 'string' &&
        Array.isArray(recipe.ingredients) &&
        Array.isArray(recipe.flowNodes)
    )
}
