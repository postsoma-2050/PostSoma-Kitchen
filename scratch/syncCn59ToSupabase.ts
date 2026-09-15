import { CHINESE_HEALTHY_RECIPES } from '../src/data/chineseHealthyRecipes'
import { normalizeRecipe } from '../src/services/recipeNormalizer'

async function sync() {
  const cn59 = CHINESE_HEALTHY_RECIPES.find(r => r.id === 'cn-59-qincai-niurou')!
  const normalized = normalizeRecipe(cn59)

  console.log('Syncing cn-59 to Supabase:', normalized.title)
  console.log('Ingredients:', normalized.ingredients.length)
  console.log('Action blocks:', normalized.actionBlocks.length)

  const res = await fetch('https://ihtpltojihhwmciqubbk.supabase.co/rest/v1/recipes?id=eq.cn-59-qincai-niurou', {
    method: 'PATCH',
    headers: {
      'apikey': 'sb_publishable_ILkFkAxbgeYVfreuEpDLCg_QYY28SDq',
      'Authorization': 'Bearer sb_publishable_ILkFkAxbgeYVfreuEpDLCg_QYY28SDq',
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify({
      title: normalized.title,
      description: normalized.description,
      cuisine: normalized.cuisine,
      difficulty: normalized.difficulty,
      content: normalized,
      content_version: (normalized as any).contentVersion || 3,
      updated_at: new Date().toISOString()
    })
  })

  console.log('Supabase PATCH status:', res.status)
  if (res.status === 204) {
    console.log('✅ Successfully updated cn-59 in Supabase cloud!')
  } else {
    const text = await res.text()
    console.error('❌ Failed:', text)
  }
}

sync()
