import type { IRecipeRepository } from './IRecipeRepository'
import { LocalRecipeRepository } from './LocalRecipeRepository'
import { SupabaseRecipeRepository } from './SupabaseRecipeRepository'
import { isSupabaseConfigured } from '@/services/supabaseClient'

export * from './IRecipeRepository'
export * from './LocalRecipeRepository'
export * from './SupabaseRecipeRepository'

/**
 * 动态 Repository 工厂
 * 默认在纯本地模式下返回 LocalRecipeRepository，对现有运行产生 0 扰动
 */
export function createRecipeRepository(): IRecipeRepository {
    const mode = import.meta.env.VITE_STORAGE_MODE || 'local'

    if (mode === 'supabase' && isSupabaseConfigured) {
        return new SupabaseRecipeRepository(false)
    }

    if (mode === 'shadow_read' && isSupabaseConfigured) {
        return new SupabaseRecipeRepository(true)
    }

    return new LocalRecipeRepository()
}

/**
 * 全局共享的 Repository 实例
 */
export const recipeRepository: IRecipeRepository = createRecipeRepository()
