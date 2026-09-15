import type { VisualRecipeV3 } from '@/types/recipeV3'

/** Only confirmed material edges extend a processing region. Order edges never do. */
export function getProcessingIngredientSets(recipe: VisualRecipeV3): Map<string, Set<string>> {
  const blocks = new Map(recipe.actionBlocks.map(block => [block.id, block]))
  const known = new Set(recipe.ingredients.map(ingredient => ingredient.id))
  const result = new Map<string, Set<string>>()
  const visiting = new Set<string>()
  function collect(id: string): Set<string> {
    if (result.has(id)) return result.get(id)!
    if (visiting.has(id)) return new Set()
    visiting.add(id)
    const block = blocks.get(id)
    const ids = new Set((block?.ingredientIds || []).filter(value => known.has(value)))
    for (const dep of block?.dependencies || []) {
      if (dep?.type === 'material' && blocks.has(dep.sourceBlockId)) {
        for (const value of collect(dep.sourceBlockId)) ids.add(value)
      }
    }
    visiting.delete(id)
    result.set(id, ids)
    return ids
  }
  recipe.actionBlocks.forEach(block => collect(block.id))
  return result
}

/**
 * Display-only consecutive-ones search. Each processing set must remain contiguous.
 * A bounded search falls back to the unchanged order; it never rewrites recipe facts.
 */
export function arrangeIngredientRows(recipe: VisualRecipeV3): VisualRecipeV3 {
  const ids = recipe.ingredients.map(ingredient => ingredient.id)
  if (new Set(ids).size !== ids.length || ids.length < 2) return recipe
  const scopes = [...getProcessingIngredientSets(recipe).values()].filter(set => set.size > 1 && set.size < ids.length)
  const isConsecutive = (order: string[]) => scopes.every(set => {
    const positions = order.flatMap((id, index) => set.has(id) ? [index] : [])
    return positions.length === 0 || positions.at(-1)! - positions[0] + 1 === positions.length
  })
  if (isConsecutive(ids)) return recipe
  let budget = 12000
  const counts = scopes.map(() => 0)
  const path: string[] = []
  const remaining = new Set(ids)
  const failed = new Set<string>()
  function search(): boolean {
    if (!remaining.size) return true
    if (--budget < 0) return false
    const key = ids.map(id => remaining.has(id) ? '1' : '0').join('')
    if (failed.has(key)) return false
    const active = scopes.filter((scope, i) => counts[i] > 0 && counts[i] < scope.size)
    for (const id of ids) {
      if (!remaining.has(id) || active.some(scope => !scope.has(id))) continue
      remaining.delete(id)
      path.push(id)
      scopes.forEach((scope, i) => { if (scope.has(id)) counts[i]++ })
      if (search()) return true
      scopes.forEach((scope, i) => { if (scope.has(id)) counts[i]-- })
      path.pop()
      remaining.add(id)
    }
    failed.add(key)
    return false
  }
  if (!search() || !isConsecutive(path)) return recipe
  const byId = new Map(recipe.ingredients.map(ingredient => [ingredient.id, ingredient]))
  return { ...recipe, ingredients: path.map(id => byId.get(id)!) }
}
