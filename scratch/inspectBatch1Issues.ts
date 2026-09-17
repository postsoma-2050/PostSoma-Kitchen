import { BATCH1_MEAT_EGG } from '../src/data/recipes/chinese/batch1_meat_egg'

console.log('=== BATCH1 MEAT EGG ISSUES ===')
for (const r of BATCH1_MEAT_EGG) {
  for (let i = 0; i < r.actionBlocks.length; i++) {
    const b = r.actionBlocks[i]
    const hasDeps = (b.dependencies && b.dependencies.length > 0) ||
                    (b.inputBlockIds && b.inputBlockIds.length > 0) ||
                    (b.afterBlockIds && b.afterBlockIds.length > 0)
    const isHeating = /炒|煎|炸|蒸|煮|炖|焖|焯|烧|汆|熬|爆|烘|烤(?!盘|箱)|sear|fry|bake|boil|steam|stew|simmer|brown|sauté/i.test(
      b.label + (b.notes || '') + (b.note || '')
    )
    if ((b.stageIndex > 0 && !hasDeps) || (isHeating && !b.heatLevel)) {
      console.log(`[${r.id}] ${r.title} Step ${i} [${b.id}] (stage ${b.stageIndex}): "${b.label}"`)
      console.log(`  heat: ${b.heatLevel || 'NONE'} | deps: ${JSON.stringify(b.dependencies || [])}`)
      console.log(`  notes: ${b.note || b.notes || 'none'}`)
      console.log(`  prev: ${r.actionBlocks[i-1]?.id} "${r.actionBlocks[i-1]?.label}"`)
    }
  }
}
