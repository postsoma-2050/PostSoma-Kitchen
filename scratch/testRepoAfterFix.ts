import { createRecipeRepository } from '../src/repositories'
import { canRenderArrangedTable } from '../src/utils/continuousTableLayout'

async function main() {
  const repo = createRecipeRepository()
  console.log('Repo class:', repo.constructor.name)

  const published = await repo.getPublishedRecipes()
  console.log('Published recipes count:', published.length)

  const cn01 = await repo.getPublishedRecipeById('cn-01-yuxiang-rousi')
  console.log('\n=== cn-01-yuxiang-rousi ===')
  console.log('Title:', cn01?.title)
  console.log('Can render table:', canRenderArrangedTable(cn01!).canRender)
  console.log('Ingredients:')
  cn01?.ingredients.forEach(i => console.log(`  - [${i.id}] ${i.amountText} ${i.name}`))

  const cn05 = await repo.getPublishedRecipeById('cn-05-gongbao-jiding')
  console.log('\n=== cn-05-gongbao-jiding ===')
  console.log('Title:', cn05?.title)
  console.log('Can render table:', canRenderArrangedTable(cn05!).canRender)
  console.log('Ingredients:')
  cn05?.ingredients.forEach(i => console.log(`  - [${i.id}] ${i.amountText} ${i.name}`))
}

main().catch(console.error)
