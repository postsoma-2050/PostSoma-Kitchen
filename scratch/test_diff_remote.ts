async function compareSample() {
  const url = 'https://ihtpltojihhwmciqubbk.supabase.co/rest/v1/recipes?id=eq.cn-59-qincai-niurou&select=id,title,content,content_version,updated_at'
  const key = 'sb_publishable_ILkFkAxbgeYVfreuEpDLCg_QYY28SDq'

  const res = await fetch(url, {
    headers: {
      'apikey': key,
      'Authorization': `Bearer ${key}`
    }
  })

  const remote = await res.json()
  console.log('Remote cn-59 updated_at:', remote[0]?.updated_at)
  console.log('Remote cn-59 content_version:', remote[0]?.content_version)
  console.log('Remote cn-59 action blocks count:', remote[0]?.content?.actionBlocks?.length)
  console.log('Remote cn-59 action block 1 deps:', JSON.stringify(remote[0]?.content?.actionBlocks[0]?.dependencies))
}

compareSample()
