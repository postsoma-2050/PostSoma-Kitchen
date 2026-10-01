import { createRecipeRepository } from '../src/repositories/index'
import { filterRecipesWithConfirmedCovers } from '../src/domain/recipeCoverPublication'

async function main() {
  const repo = createRecipeRepository()
  const published = await repo.getPublishedRecipes()
  console.log('Total published returned by repo:', published.length)
  const browsable = filterRecipesWithConfirmedCovers(published)
  console.log('Total browsable with confirmed covers:', browsable.length)
  console.log('Browsable recipe IDs:')
  browsable.forEach(r => console.log(' -', r.id, r.title, r.coverImageUrl))
}

main().catch(console.error)
