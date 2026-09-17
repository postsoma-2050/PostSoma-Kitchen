import { createClient } from '@supabase/supabase-js'
import { BATCH2_VEGETABLES } from '../src/data/recipes/chinese/batch2_vegetables'
import { normalizeRecipe } from '../src/services/recipeNormalizer'

const supabaseUrl = process.env.VITE_SUPABASE_URL || ''
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseKey)

async function main() {
  const cn01 = BATCH2_VEGETABLES.find(r => r.id === 'cn-01-yuxiang-rousi')!
  const normalized = normalizeRecipe(cn01)
  const payload = {
    ...normalized,
    completeness_score: 100,
    validation_snapshot: { errors: [], warnings: [] }
  }

  const { data, error } = await supabase.rpc('save_recipe_with_revision', { p_recipe: payload })
  console.log('Result with ANON key:', { data, error })
}

main().catch(console.error)
