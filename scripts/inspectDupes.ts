import { CHINESE_HEALTHY_RECIPES } from '../src/data/chineseHealthyRecipes'

const dupes: any[] = []
CHINESE_HEALTHY_RECIPES.forEach(r => {
  r.ingredients.forEach((i: any) => {
    if (i.amountText && (i.amountText.includes('+') || i.name.includes(i.amountText) || i.amountText.includes(i.name))) {
      dupes.push({ recipeId: r.id, title: r.title, ingId: i.id, name: i.name, amountText: i.amountText })
    }
  })
})
console.log('Total ingredients with + or duplicate:', dupes.length)
console.log(JSON.stringify(dupes.slice(0, 30), null, 2))
