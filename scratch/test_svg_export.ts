import { CHINESE_HEALTHY_RECIPES } from '../src/data/chineseHealthyRecipes';
import { buildV3MatrixLayout } from '../src/utils/matrixFlowLayout';
import { generatePageSvgString } from '../src/utils/exportFlowCard';
import fs from 'fs';

const recipe = CHINESE_HEALTHY_RECIPES.find(r => r.id === 'cn-59-qincai-niurou')!;
const layout = buildV3MatrixLayout(recipe);
console.log('--- CN-59 2D MATRIX BLOCKS ---');
layout.actionBlockLayouts.forEach(b => {
  console.log(`[Col ${b.computedColIndex}] ${b.block.label}`);
  console.log(`  Row span: [Row ${b.computedStartRow} -> Row ${b.computedEndRow}] (Height: ${b.computedEndRow - b.computedStartRow + 1} rows)`);
  console.log(`  Position: x=${b.x}, y=${b.y}, w=${b.w}, h=${b.h}`);
});

const res = generatePageSvgString(recipe, 0, 1);
fs.writeFileSync('scratch/cn59_test_flow.svg', res.svgString);
console.log('\nSVG written to scratch/cn59_test_flow.svg, size:', res.svgString.length);
