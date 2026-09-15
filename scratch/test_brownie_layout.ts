import { espressoBrowniesV3 } from '../src/data/v3Examples';
import { buildV3MatrixLayout } from '../src/utils/matrixFlowLayout';

const layout = buildV3MatrixLayout(espressoBrowniesV3);
console.log('--- ESPRESSO BROWNIES LAYOUT ---');
console.log('Ingredients count:', espressoBrowniesV3.ingredients.length);
layout.actionBlockLayouts.forEach(b => {
  console.log(`Block ${b.block.id} "${b.block.label}" (${b.block.sublabel}):`);
  console.log(`  Col: ${b.computedColIndex}, RowSpan: [${b.computedStartRow}..${b.computedEndRow}]`);
  console.log(`  x=${b.x}, y=${b.y}, w=${b.w}, h=${b.h}`);
});
console.log('Final block:');
console.log(`  x=${layout.finalBlockLayout.x}, y=${layout.finalBlockLayout.y}, w=${layout.finalBlockLayout.w}, h=${layout.finalBlockLayout.h}`);
