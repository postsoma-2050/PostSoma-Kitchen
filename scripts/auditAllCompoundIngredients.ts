import { CHINESE_HEALTHY_RECIPES } from '../src/data/chineseHealthyRecipes'
import { HOME_SWEET_HOME_RECIPES } from '../src/data/homeSweetHomeRecipes'
import { espressoBrowniesV3, hongShaoRouV3, caesarSaladV3 } from '../src/data/v3Examples'

const allRecipes = [
  ...CHINESE_HEALTHY_RECIPES,
  ...HOME_SWEET_HOME_RECIPES,
  espressoBrowniesV3,
  hongShaoRouV3,
  caesarSaladV3
]

interface Issue {
  recipeId: string
  recipeTitle: string
  ingredientId: string
  name: string
  amountText: string
  category: string
  reason: string
}

const issues: Issue[] = []

for (const recipe of allRecipes) {
  for (const ing of recipe.ingredients) {
    const name = ing.name.trim()
    const amount = (ing.amountText || '').trim()

    // 1. Name contains '+'
    if (name.includes('+')) {
      issues.push({
        recipeId: recipe.id,
        recipeTitle: recipe.title,
        ingredientId: ing.id,
        name,
        amountText: amount,
        category: ing.category,
        reason: 'Name contains "+"'
      })
      continue
    }

    // 2. AmountText contains '+'
    if (amount.includes('+')) {
      issues.push({
        recipeId: recipe.id,
        recipeTitle: recipe.title,
        ingredientId: ing.id,
        name,
        amountText: amount,
        category: ing.category,
        reason: 'AmountText contains "+"'
      })
      continue
    }

    // 3. Name contains conjunctions like '与', '和', '及', '、' linking distinct food items
    // (excluding common single words like 盐焗, 桂圆, 调味)
    const conjunctionMatches = name.match(/[\u4e00-\u9fa5]+[与和及、][\u4e00-\u9fa5]+/)
    if (conjunctionMatches) {
      // Exclude legitimate single ingredients: e.g., 葱姜蒜水 (if treated as a prepared liquid)?
      // But user specifically noted: "泡椒 + 葱姜蒜末 泡椒末与葱姜蒜", "蛋清与水淀粉上浆", "干红辣椒段与花椒"
      // Even "葱姜蒜" are 3 ingredients: 葱, 姜, 蒜!
      issues.push({
        recipeId: recipe.id,
        recipeTitle: recipe.title,
        ingredientId: ing.id,
        name,
        amountText: amount,
        category: ing.category,
        reason: `Name contains conjunction: "${conjunctionMatches[0]}"`
      })
      continue
    }

    // 4. Repetition check: does amountText contain the ingredient name or part of it?
    // e.g. amountText: "冬笋丁 75g" vs name: "冬笋丁" -> redundant repetition!
    if (amount && name.length >= 2 && amount.includes(name)) {
      issues.push({
        recipeId: recipe.id,
        recipeTitle: recipe.title,
        ingredientId: ing.id,
        name,
        amountText: amount,
        category: ing.category,
        reason: `AmountText repeats ingredient name: "${amount}" vs "${name}"`
      })
    }
  }
}

console.log(`Total presets inspected: ${allRecipes.length}`)
console.log(`Total potential compound/repetition issues found: ${issues.length}\n`)

const byRecipe = new Map<string, Issue[]>()
for (const issue of issues) {
  if (!byRecipe.has(issue.recipeId)) byRecipe.set(issue.recipeId, [])
  byRecipe.get(issue.recipeId)!.push(issue)
}

console.log(`Affected recipes count: ${byRecipe.size}`)
for (const [recipeId, rIssues] of byRecipe) {
  console.log(`\n[${recipeId}] ${rIssues[0].recipeTitle}:`)
  for (const iss of rIssues) {
    console.log(`  - [${iss.ingredientId}] name: "${iss.name}", amountText: "${iss.amountText}" (${iss.category}) -> ${iss.reason}`)
  }
}
