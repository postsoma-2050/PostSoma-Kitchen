import { HOME_SWEET_HOME_RECIPES } from '../src/data/homeSweetHomeRecipes'

for (const recipe of HOME_SWEET_HOME_RECIPES) {
  console.log(`\n=== [${recipe.id}] ${recipe.title} ===`)
  for (let i = 0; i < recipe.actionBlocks.length; i++) {
    const block = recipe.actionBlocks[i]
    const hasDeps = (block.dependencies && block.dependencies.length > 0) ||
                    (block.inputBlockIds && block.inputBlockIds.length > 0) ||
                    (block.afterBlockIds && block.afterBlockIds.length > 0)
    const isHeating = /炒|煎|炸|蒸|煮|炖|焖|烤|焯|烧|汆|熬|爆|烘|sear|fry|bake|boil|steam|stew|simmer|brown|sauté/i.test(
      block.label + (block.notes || '') + (block.note || '')
    )

    const issues: string[] = []
    if (block.stageIndex > 0 && !hasDeps) {
      issues.push('MISSING_DEP')
    }
    if (isHeating && !block.heatLevel) {
      issues.push('MISSING_HEAT')
    }

    console.log(`  Step ${i} [${block.id}] (stage ${block.stageIndex}): "${block.label}" | heat: ${block.heatLevel || 'none'} | deps: ${JSON.stringify(block.dependencies || [])} | issues: ${issues.join(', ') || 'OK'}`)
    if (block.note || block.notes) {
      console.log(`    note: ${block.note || block.notes}`)
    }
  }
}
