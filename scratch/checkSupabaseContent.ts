import { createClient } from '@supabase/supabase-js'
import { canRenderContinuousTable } from '../src/utils/continuousTableLayout'

const supabaseUrl = process.env.VITE_SUPABASE_URL || ''
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || ''

const supabase = createClient(supabaseUrl, supabaseKey)

async function main() {
  const { data, error } = await supabase
    .from('recipes')
    .select('id, content')
    .in('id', ['cn-01-yuxiang-rousi', 'cn-02-gongbao-jiding', 'cn-05-gongbao-jiding'])

  if (error) {
    console.error('Error fetching:', error)
    return
  }

  for (const r of data || []) {
    const c = r.content as any
    const check = canRenderContinuousTable(c)
    console.log(`\nSupabase Recipe: ${r.id} (${c?.title})`)
    console.log(`Can render continuous table: ${check.canRender}, reason: ${check.reason}`)
  }
}

main().catch(console.error)
