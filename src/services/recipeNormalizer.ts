import type { VisualRecipeV3 } from '@/types/recipeV3'
import { normalizeIngredientCategory } from '@/types/recipeV3'
import {
  calculateSuggestedDifficulty,
  type CookingMethodCode,
  type CuisineStyleCode,
} from '@/constants/taxonomy'

export function mapLegacyMethodToTaxonomy(legacyMethod?: string, label?: string): CookingMethodCode {
  if (!legacyMethod && !label) return 'other'
  const value = `${legacyMethod || ''} ${label || ''}`.toLowerCase()

  if (value.includes('bake') || value.includes('烘焙') || value.includes('烤')) return 'bake'
  if (value.includes('stew') || value.includes('慢炖') || value.includes('焖') || value.includes('烧')) return 'stew'
  if (value.includes('sear') || value.includes('煎香') || value.includes('煎炙')) return 'sear'
  if (value.includes('fry') || value.includes('爆炒') || value.includes('炒') || value.includes('煎')) return 'fry'
  if (value.includes('steam') || value.includes('蒸')) return 'steam'
  if (value.includes('boil') || value.includes('煮') || value.includes('焯水')) return 'boil'
  if (value.includes('raw') || value.includes('冷') || value.includes('生')) return 'raw'
  if (value.includes('serve') || value.includes('拌') || value.includes('即享')) return 'serve'
  return 'other'
}

export function mapLegacyCuisineToTaxonomy(legacyCuisine?: string, title?: string): CuisineStyleCode {
  if (!legacyCuisine && !title) return 'chinese'
  const value = `${legacyCuisine || ''} ${title || ''}`.toLowerCase()

  if (value.includes('意') || value.includes('美') || value.includes('法') || value.includes('西') || value.includes('american') || value.includes('western')) return 'western'
  if (value.includes('日') || value.includes('韩') || value.includes('japanese') || value.includes('korean')) return 'japanese_korean'
  if (value.includes('泰') || value.includes('越') || value.includes('东南亚') || value.includes('thai')) return 'southeast_asian'
  if (value.includes('跨界') || value.includes('融合') || value.includes('fusion')) return 'fusion'
  return 'chinese'
}

/**
 * 将历史或外部数据转换为当前 VisualRecipeV3 运行时结构。
 * 此函数保持纯粹，不访问 Repository 或浏览器存储。
 */
export function normalizeRecipe(raw: unknown): VisualRecipeV3 {
  const recipe = raw as Record<string, any>
  if (!recipe) return recipe as unknown as VisualRecipeV3

  const status = !recipe.status || recipe.status === 'complete' ? 'published' : recipe.status
  const rawMethod = recipe.finalBlock?.method || ''
  const rawLabel = recipe.finalBlock?.label || ''
  const legacyBackup = recipe.legacyMethodLabel || `${rawMethod} (${rawLabel})`.trim()
  const stepCount = Array.isArray(recipe.actionBlocks) ? recipe.actionBlocks.length : 0
  const reviewStatuses = new Set(['unreviewed', 'modeled', 'transcribed', 'source_verified', 'kitchen_verified'])
  const normalizeReviewStatus = (value: unknown) => reviewStatuses.has(String(value))
    ? value
    : 'unreviewed'

  const ingredients = Array.isArray(recipe.ingredients)
    ? recipe.ingredients.map((ingredient: Record<string, any>) => ({
        ...ingredient,
        category: normalizeIngredientCategory(ingredient.category),
        note: ingredient.note || ingredient.notes || undefined,
        notes: undefined,
      }))
    : []

  const actionBlocks = Array.isArray(recipe.actionBlocks)
    ? recipe.actionBlocks.map((block: Record<string, any>) => {
        let normalizedDeps: Array<{ sourceBlockId: string; type: 'material' | 'order' | 'legacy'; label?: string }> = []

        if (Array.isArray(block.dependencies)) {
          // 分支 1：现代格式，dependencies 为唯一权威事实来源 (Single Source of Truth)
          // 权威依赖不得被旧投影数组 (inputBlockIds / afterBlockIds) 擅自否决覆盖；
          // 悬空或非法引用严禁静默洗掉，必须原样保留供发布校验 (validateRecipe) 阻断。
          const seen = new Set<string>()
          normalizedDeps = block.dependencies
            .map((dep: any) => {
              if (!dep || typeof dep !== 'object') {
                return { sourceBlockId: '', type: 'legacy' as const, _invalid: true, _raw: dep }
              }
              // 权威字段为 sourceBlockId。严禁未经契约确认将 targetBlockId 自动转为合法 sourceBlockId
              const rawSource = typeof dep.sourceBlockId === 'string' ? dep.sourceBlockId.trim() : ''
              const validTypes = ['material', 'order', 'legacy']
              const type: 'material' | 'order' | 'legacy' = validTypes.includes(dep.type) ? dep.type : 'legacy'
              const res: any = {
                sourceBlockId: rawSource,
                type,
                label: dep.label || undefined,
              }
              // 若错误携带 targetBlockId，严格保留该非法字段，确保校验器能够定位并精确诊断格式错误
              if (dep.targetBlockId !== undefined) {
                res.targetBlockId = dep.targetBlockId
              }
              if (dep._invalid !== undefined) {
                res._invalid = dep._invalid
              }
              return res
            })
            .filter((dep: any) => {
              // 格式错误依赖（空 sourceBlockId 或含 targetBlockId）必须全量保留供校验器阻断！
              if (!dep.sourceBlockId || dep.targetBlockId !== undefined || dep._invalid) return true
              // 合法依赖去重
              if (seen.has(dep.sourceBlockId)) return false
              seen.add(dep.sourceBlockId)
              return true
            })
        } else {
          // 分支 2：旧格式导入兼容分支，仅在未显式提供 dependencies 时从旧投影数组构建
          const dependenciesMap = new Map<string, { sourceBlockId: string; type: 'material' | 'order' | 'legacy'; label?: string }>()

          const afterBlockIds: string[] = Array.isArray(block.afterBlockIds)
            ? [...new Set(block.afterBlockIds)].filter((id): id is string => typeof id === 'string' && id.trim() !== '')
            : []
          const rawInputIds: string[] = Array.isArray(block.inputBlockIds)
            ? [...new Set(block.inputBlockIds)].filter((id): id is string => typeof id === 'string' && id.trim() !== '')
            : []

          // 旧式显式 afterBlockIds 标注为 order
          afterBlockIds.forEach(id => {
            dependenciesMap.set(id.trim(), { sourceBlockId: id.trim(), type: 'order' })
          })

          // 旧式 inputBlockIds 严格保留为 legacy，严禁擅自升级为 material
          rawInputIds.forEach(id => {
            const cleanId = id.trim()
            if (!dependenciesMap.has(cleanId)) {
              dependenciesMap.set(cleanId, { sourceBlockId: cleanId, type: 'legacy' })
            }
          })

          normalizedDeps = [...dependenciesMap.values()]
        }

        // 统一由权威 normalizedDeps 向下正向同步 inputBlockIds 与 afterBlockIds 派生投影（仅同步合法有效 ID）
        const syncInputs = normalizedDeps
          .filter(d => (d.type === 'material' || d.type === 'legacy') && d.sourceBlockId && !(d as any).targetBlockId)
          .map(d => d.sourceBlockId)
        const syncAfter = normalizedDeps
          .filter(d => d.type === 'order' && d.sourceBlockId && !(d as any).targetBlockId)
          .map(d => d.sourceBlockId)

        return {
          ...block,
          dependencies: normalizedDeps,
          inputBlockIds: syncInputs,
          afterBlockIds: syncAfter,
          completionState: typeof block.completionState === 'string' && block.completionState.trim() ? block.completionState.trim() : undefined,
          outputItem: typeof block.outputItem === 'string' && block.outputItem.trim() ? block.outputItem.trim() : undefined,
          note: block.note || block.notes || undefined,
          notes: undefined,
        }
      })
    : []

  const finalBlock = recipe.finalBlock
    ? {
        ...recipe.finalBlock,
        method: mapLegacyMethodToTaxonomy(rawMethod, rawLabel),
        note: recipe.finalBlock.note || recipe.finalBlock.notes || undefined,
        notes: undefined,
      }
    : undefined

  return {
    ...recipe,
    status,
    deletedAt: recipe.deletedAt || undefined,
    legacyMethodLabel: legacyBackup,
    cuisine: mapLegacyCuisineToTaxonomy(recipe.cuisine, recipe.title),
    difficulty: recipe.difficulty || calculateSuggestedDifficulty(stepCount),
    occasions: recipe.occasions?.length ? recipe.occasions : ['family_dinner'],
    formulas: Array.isArray(recipe.formulas) ? recipe.formulas : [],
    ingredients,
    actionBlocks,
    finalBlock,
    provenance: recipe.provenance && typeof recipe.provenance === 'object'
      ? {
          ...recipe.provenance,
          title: typeof recipe.provenance.title === 'string' ? recipe.provenance.title.trim() : '',
          locator: typeof recipe.provenance.locator === 'string' && recipe.provenance.locator.trim()
            ? recipe.provenance.locator.trim()
            : undefined,
        }
      : undefined,
    dataReview: {
      overall: normalizeReviewStatus(recipe.dataReview?.overall),
      ingredients: normalizeReviewStatus(recipe.dataReview?.ingredients),
      quantities: normalizeReviewStatus(recipe.dataReview?.quantities),
      topology: normalizeReviewStatus(recipe.dataReview?.topology),
      heatAndTiming: normalizeReviewStatus(recipe.dataReview?.heatAndTiming),
      reviewedBy: recipe.dataReview?.reviewedBy || undefined,
      reviewedAt: recipe.dataReview?.reviewedAt || undefined,
      evidence: Array.isArray(recipe.dataReview?.evidence)
        ? recipe.dataReview.evidence.filter((item: unknown): item is string => typeof item === 'string' && item.trim() !== '')
        : [],
      assumptions: Array.isArray(recipe.dataReview?.assumptions)
        ? recipe.dataReview.assumptions.filter((item: unknown): item is string => typeof item === 'string' && item.trim() !== '')
        : [],
    },
  } as VisualRecipeV3
}
