import type { VisualRecipeV3 } from '@/types/recipeV3'
import type {
    RecipeMutationAction,
    RecipeMutationResult,
} from './IRecipeRepository'

interface MutationStateInput {
    action: RecipeMutationAction
    id: string
    expectedVersion?: number
    recipe: VisualRecipeV3 | null
    readError?: string
    mutationError?: string
}

/**
 * 仅根据重新读取到的权威状态判定写操作结果。
 * 网络/读取失败必须保持 unknown；不能由请求是否抛错直接推断写入结果。
 */
export function resolveRecipeMutationState(input: MutationStateInput): RecipeMutationResult {
    const { action, id, expectedVersion, recipe, readError, mutationError } = input

    if (readError) {
        return {
            ok: false,
            action,
            id,
            status: 'unknown',
            message: `云端写入结果暂时无法确认：${readError}`,
        }
    }

    const matches = action === 'soft-delete'
        ? Boolean(recipe?.deletedAt)
        : action === 'restore'
            ? Boolean(recipe && !recipe.deletedAt)
            : recipe === null

    if (matches) {
        return {
            ok: true,
            action,
            id,
            status: 'confirmed',
            recipe,
            contentVersion: recipe?.contentVersion,
        }
    }

    if (
        recipe
        && expectedVersion !== undefined
        && recipe.contentVersion !== undefined
        && recipe.contentVersion !== expectedVersion
    ) {
        return {
            ok: false,
            action,
            id,
            status: 'conflict',
            recipe,
            contentVersion: recipe.contentVersion,
            message: '食谱已被其他会话更新，本次操作没有覆盖云端内容。',
        }
    }

    return {
        ok: false,
        action,
        id,
        status: 'rejected',
        recipe,
        contentVersion: recipe?.contentVersion,
        message: mutationError
            ? `云端拒绝操作：${mutationError}`
            : '云端状态未发生预期变化，操作未生效。',
    }
}
