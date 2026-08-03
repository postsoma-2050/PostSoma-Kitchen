import type { IngredientEntry } from '@/types/ingredientRegistry'

const INGREDIENT_REGISTRY_KEY = 'what-to-eat-v3-ingredient-registry'

/**
 * 获取所有的食材登记条目列表
 */
export function getAllIngredients(): IngredientEntry[] {
    try {
        const stored = localStorage.getItem(INGREDIENT_REGISTRY_KEY)
        if (!stored) return []
        const parsed = JSON.parse(stored)
        return Array.isArray(parsed) ? parsed : []
    } catch (e) {
        console.error('读取 IngredientRegistry 失败:', e)
        return []
    }
}

/**
 * 模糊匹配食材（忽略大小写、精确/包含匹配规范名或别名）
 */
export function findMatchingIngredients(query: string): IngredientEntry[] {
    if (!query || !query.trim()) return []
    const q = query.trim().toLowerCase()
    const all = getAllIngredients()

    return all.filter(entry => {
        const cName = entry.canonicalName.toLowerCase()
        if (cName.includes(q) || q.includes(cName)) return true

        return (entry.aliases || []).some(alias => {
            const a = alias.toLowerCase()
            return a.includes(q) || q.includes(a)
        })
    }).slice(0, 5) // 最多返回 5 个建议
}

/**
 * 更新或新增食材引用记录 (根据名称与 recipeId)
 */
export function upsertIngredientUsage(name: string, recipeId: string): IngredientEntry {
    if (!name || !name.trim()) {
        throw new Error('食材名称不能为空')
    }

    const cleanName = name.trim()
    const lowerName = cleanName.toLowerCase()
    const all = getAllIngredients()

    // 寻找匹配的已有条目（匹配 canonicalName 或别名）
    let entry = all.find(e => {
        if (e.canonicalName.toLowerCase() === lowerName) return true
        return (e.aliases || []).some(a => a.toLowerCase() === lowerName)
    })

    const now = new Date().toISOString()

    if (entry) {
        // 已存在：更新 recipeIds 与 usageCount
        if (recipeId && !entry.recipeIds.includes(recipeId)) {
            entry.recipeIds.push(recipeId)
        }
        entry.usageCount = entry.recipeIds.length
        entry.updatedAt = now
    } else {
        // 不存在：新建条目
        entry = {
            id: `ing-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
            canonicalName: cleanName,
            aliases: [],
            usageCount: recipeId ? 1 : 0,
            recipeIds: recipeId ? [recipeId] : [],
            createdAt: now,
            updatedAt: now
        }
        all.push(entry)
    }

    localStorage.setItem(INGREDIENT_REGISTRY_KEY, JSON.stringify(all))
    return entry
}

/**
 * 为已有的食材条目添加新别名
 */
export function addAlias(entryId: string, alias: string): boolean {
    if (!entryId || !alias || !alias.trim()) return false
    const cleanAlias = alias.trim()
    const all = getAllIngredients()
    const entry = all.find(e => e.id === entryId)

    if (!entry) return false

    // 不添加与规范名相同或已存在的别名
    if (entry.canonicalName.toLowerCase() === cleanAlias.toLowerCase()) return true
    if ((entry.aliases || []).some(a => a.toLowerCase() === cleanAlias.toLowerCase())) return true

    if (!entry.aliases) entry.aliases = []
    entry.aliases.push(cleanAlias)
    entry.updatedAt = new Date().toISOString()

    localStorage.setItem(INGREDIENT_REGISTRY_KEY, JSON.stringify(all))
    return true
}
