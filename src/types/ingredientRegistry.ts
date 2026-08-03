/**
 * IngredientRegistry 数据模型
 * 独立于 VisualRecipeV3 的食材索引登记表
 */

export interface IngredientEntry {
    id: string
    canonicalName: string   // 标准规范名称，如 "黄油"
    aliases: string[]        // 别名列表，如 ["unsalted butter", "无盐黄油", "奶油"]
    category?: 'main' | 'seasoning' | 'dairy' | 'produce' | 'liquid' | 'grain' | 'other'
    usageCount: number       // 被多少食谱引用使用
    recipeIds: string[]      // 关联的食谱 ID 数组
    createdAt: string
    updatedAt: string
}
