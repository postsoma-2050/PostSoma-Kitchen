import { createClient } from '@supabase/supabase-js'
import { canRenderArrangedTable } from '../src/utils/continuousTableLayout'
import { BATCH2_VEGETABLES } from '../src/data/recipes/chinese/batch2_vegetables'

const supabaseUrl = process.env.VITE_SUPABASE_URL || ''
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseKey)

async function main() {
  const localCn01 = BATCH2_VEGETABLES.find(r => r.id === 'cn-01-yuxiang-rousi')
  console.log('Local Batch2 cn-01 canRenderArrangedTable:', canRenderArrangedTable(localCn01!))

  const { data } = await supabase.from('recipes').select('id, content').eq('id', 'cn-01-yuxiang-rousi')
  if (data && data[0]) {
    const supaCn01 = data[0].content as any
    console.log('Supabase cn-01 canRenderArrangedTable:', canRenderArrangedTable(supaCn01))
  }
}

main().catch(console.error)
