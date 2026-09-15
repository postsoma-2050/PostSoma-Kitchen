async function testFetch() {
  const url = 'https://ihtpltojihhwmciqubbk.supabase.co/rest/v1/recipes?select=id,title,updated_at&limit=5'
  const key = 'sb_publishable_ILkFkAxbgeYVfreuEpDLCg_QYY28SDq'

  const res = await fetch(url, {
    headers: {
      'apikey': key,
      'Authorization': `Bearer ${key}`
    }
  })

  if (!res.ok) {
    console.error('Fetch error:', res.status, await res.text())
  } else {
    const data = await res.json()
    console.log('Successfully fetched from recipes table:', data.length)
    console.log('Sample data:', data)
  }
}

testFetch()
