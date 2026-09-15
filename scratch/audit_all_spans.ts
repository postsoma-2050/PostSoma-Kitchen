import { CHINESE_HEALTHY_RECIPES } from '../src/data/chineseHealthyRecipes';
import { buildV3MatrixLayout } from '../src/utils/matrixFlowLayout';

console.log('Auditing row spans of all 102 Chinese recipes...');
let allFullSpanCount = 0;
const recipesWithAllFullSpans: string[] = [];

CHINESE_HEALTHY_RECIPES.forEach(r => {
  const layout = buildV3MatrixLayout(r);
  const totalRows = r.ingredients.length;
  if (totalRows <= 1) return;

  const allBlocksSpanAllRows = layout.actionBlockLayouts.every(
    b => b.computedStartRow === 0 && b.computedEndRow === totalRows - 1
  );

  if (allBlocksSpanAllRows && layout.actionBlockLayouts.length > 0) {
    allFullSpanCount++;
    recipesWithAllFullSpans.push(r.id);
  }
});

console.log(`Recipes where EVERY action block spans ALL rows: ${allFullSpanCount} / ${CHINESE_HEALTHY_RECIPES.length}`);
if (allFullSpanCount > 0) {
  console.log('Examples:', recipesWithAllFullSpans.slice(0, 10));
}
