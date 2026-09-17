import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL || ''
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseKey)

async function main() {
  const { data, error } = await supabase
    .from('recipes')
    .select('id, content')

  if (error) {
    console.error('Error fetching Supabase:', error)
    return
  }

  console.log(`Total recipes in Supabase: ${data.length}`)

  let issueCount = 0
  const affected = new Set<string>()

  for (const row of data) {
    const r = row.content as any
    if (!r || !r.ingredients) continue

    for (const ing of r.ingredients) {
      const name = (ing.name || '').trim()
      const amount = (ing.amountText || '').trim()

      let issue = ''
      if (name.includes('+')) issue = 'name has +'
      else if (amount.includes('+')) issue = 'amount has +'
      else if (name.match(/[\u4e00-\u9fa5]+[与和及、][\u4e00-\u9fa5]+/)) issue = 'name has conjunction'
      else if (amount && name.length >= 2 && amount.includes(name)) issue = 'amount repeats name'

      if (issue) {
        issueCount++
        affected.add(r.id)
        if (affected.size <= 10) {
          console.log(`[${r.id}] ${r.title}: [${ing.id}] "${amount}" "${name}" -> ${issue}`)
        }
      }
    }
  }

  console.log(`\nTotal compound/repetition issues in Supabase: ${issueCount}`)
  console.log(`Total affected recipes in Supabase: ${affected.size}`)
}

main().catch(console.error)
