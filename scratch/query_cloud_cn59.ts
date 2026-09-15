import { createClient } from '@supabase/supabase-js'

const url = 'https://ihtpltojihhwmciqubbk.supabase.co'
const key = 'sb_publishable_ILkFkAxbgeYVfreuEpDLCg_QYY28SDq'
const supabase = createClient(url, key)

async function run() {
  const { data, error } = await supabase
    .from('recipes')
    .select('id, content_version, content, updated_at')
    .eq('id', 'cn-59-qincai-niurou')
    .maybeSingle()

  if (error) {
    console.error('Error:', error)
    return
  }
  console.log('Cloud recipe version:', data?.content_version)
  console.log('Cloud recipe updated_at:', data?.updated_at)
  console.log('Cloud recipe ingredients:', data?.content?.ingredients?.map((i: any) => i.name))
  console.log('Cloud recipe actionBlocks:', data?.content?.actionBlocks?.map((b: any) => ({
    label: b.label,
    ingredientIds: b.ingredientIds
  })))
}
run()
