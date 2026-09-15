import { CHINESE_HEALTHY_RECIPES } from '../src/data/chineseHealthyRecipes';
import { buildV3MatrixLayout } from '../src/utils/matrixFlowLayout';
import { generatePageSvgString } from '../src/utils/exportFlowCard';
import fs from 'fs';

const recipe = CHINESE_HEALTHY_RECIPES.find(r => r.id === 'cn-29-kugua-donggu-gutang')!;
console.log('Recipe title:', recipe.title);

const layout = buildV3MatrixLayout(recipe);
console.log('\n--- INGREDIENT ROWS ---');
layout.ingredientRows.forEach(r => {
  console.log(`Row ${r.rowIndex}: [${r.ingredient.name}] x=${r.x}, y=${r.y}, w=${r.w}, h=${r.h}`);
});

console.log('\n--- ACTION BLOCKS ---');
layout.actionBlockLayouts.forEach(b => {
  console.log(`Block ${b.block.id} "${b.block.label}": col=${b.computedColIndex}, x=${b.x}, y=${b.y}, w=${b.w}, h=${b.h}`);
  console.log('  labelLines:', b.labelLines);
  console.log('  guidanceLines:', b.guidanceLines);
});

console.log('\n--- FINAL BLOCK ---');
console.log(`Final block: x=${layout.finalBlockLayout.x}, y=${layout.finalBlockLayout.y}, w=${layout.finalBlockLayout.w}, h=${layout.finalBlockLayout.h}`);
console.log('  instructionLines:', layout.finalBlockLayout.instructionLines);

const res = generatePageSvgString(recipe, 0, 1);
fs.writeFileSync('scratch/cn29_test_flow.svg', res.svgString);
console.log('\nSVG written to scratch/cn29_test_flow.svg, size:', res.svgString.length);
