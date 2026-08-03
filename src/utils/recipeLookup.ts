import type { Recipe, FavoriteRecipe } from '@/types'

const FAVORITES_KEY = 'what-to-eat-favorites'

/**
 * 从 LocalStorage 中根据 ID 获取食谱（兼容 Recipe ID 和 FavoriteRecipe ID）
 */
export function getRecipeById(id: string): Recipe | null {
    if (!id) return null
    try {
        const stored = localStorage.getItem(FAVORITES_KEY)
        if (!stored) return null
        const favorites: FavoriteRecipe[] = JSON.parse(stored)

        const foundFav = favorites.find(fav => fav.recipe?.id === id || fav.id === id)
        return foundFav ? foundFav.recipe : null
    } catch (error) {
        console.error('获取食谱失败:', error)
        return null
    }
}
