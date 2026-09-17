import fs from 'fs'
import path from 'path'

const report = JSON.parse(fs.readFileSync(path.join(__dirname, 'stepIssuesReport.json'), 'utf8'))

// Files to check:
const files = [
  'src/data/recipes/chinese/batch1_meat_egg.ts',
  'src/data/recipes/chinese/batch2_vegetables.ts',
  'src/data/recipes/chinese/batch3_mushrooms_tubers.ts',
  'src/data/recipes/chinese/batch4_seafood.ts',
  'src/data/recipes/chinese/batch5_five_viscera.ts',
  'src/data/recipes/chinese/batch6_chronic_diseases.ts',
  'src/data/recipes/chinese/batch7_special_care.ts',
  'src/data/recipes/chinese/batch8_elderly_breakfast.ts',
  'src/data/homeSweetHomeRecipes.ts',
  'src/data/v3Examples.ts'
]

const recipeToFile = new Map<string, string>()

for (const file of files) {
  const content = fs.readFileSync(path.join(__dirname, '..', file), 'utf8')
  const matches = content.match(/["']?id["']?\s*:\s*['"]([^'"]+)['"]/g) || []
  for (const m of matches) {
    const clean = m.replace(/["']?id["']?\s*:\s*['"]/, '').replace(/['"]/, '')
    recipeToFile.set(clean, file)
  }
}

const fileDeps = new Map<string, any[]>()
const fileHeat = new Map<string, any[]>()

for (const item of report.missingDeps) {
  const file = recipeToFile.get(item.recipeId) || 'unknown'
  const list = fileDeps.get(file) || []
  list.push(item)
  fileDeps.set(file, list)
}

for (const item of report.missingHeat) {
  const file = recipeToFile.get(item.recipeId) || 'unknown'
  const list = fileHeat.get(file) || []
  list.push(item)
  fileHeat.set(file, list)
}

console.log('=== Missing Deps by File ===')
for (const [file, items] of fileDeps) {
  console.log(`${file}: ${items.length} items across ${new Set(items.map(i => i.recipeId)).size} recipes`)
}

console.log('\n=== Missing Heat by File ===')
for (const [file, items] of fileHeat) {
  console.log(`${file}: ${items.length} items across ${new Set(items.map(i => i.recipeId)).size} recipes`)
}
