import { CHINESE_HEALTHY_RECIPES } from '../src/data/chineseHealthyRecipes';
import { buildV3MatrixLayout } from '../src/utils/matrixFlowLayout';

const recipe = CHINESE_HEALTHY_RECIPES.find((r: any) => r.id === 'cn-59-qincai-niurou');
console.log('Recipe title:', recipe?.title);
console.log('Ingredients count:', recipe?.ingredients.length);
console.log('Action blocks count:', recipe?.actionBlocks.length);

if (recipe) {
  recipe.ingredients.forEach((ing: any, idx: any) => {
    console.log(`Row ${idx}: [${ing.id}] ${ing.amountText} ${ing.name}`);
  });

  const layout = buildV3MatrixLayout(recipe);
  console.log('\nAction block spans:');
  layout.actionBlockLayouts.forEach((b: any) => {
    console.log(
      `Block ${b.block.id} (${b.block.label}) col:${b.computedColIndex} rowSpan:[${b.computedStartRow}..${b.computedEndRow}] heightRows:${(b.computedEndRow - b.computedStartRow + 1)} (cardH: ${b.h}, top: ${b.y})`
    );
  });
  console.log(
    `Final block (${(layout.finalBlockLayout.finalBlock as any).actionName || (layout.finalBlockLayout.finalBlock as any).title || layout.finalBlockLayout.finalBlock.label}) col:final cardH:${layout.finalBlockLayout.h}`
  );
}
