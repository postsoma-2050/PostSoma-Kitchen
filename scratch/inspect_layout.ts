import { CHINESE_HEALTHY_RECIPES } from '../src/data/chineseHealthyRecipes';
import { buildV3MatrixLayout } from '../src/utils/matrixFlowLayout';

const r = CHINESE_HEALTHY_RECIPES.find((x: any) => x.id === 'cn-59-qincai-niurou')!;
const layout = buildV3MatrixLayout(r);

console.log('Ingredients:');
layout.ingredientRows.forEach((row: any) => {
  console.log(`row ${row.rowIndex}: ${row.ingredient.id} ${row.ingredient.name} y=${row.y} h=${row.h} w=${row.w}`);
});

console.log('\nAction blocks:');
layout.actionBlockLayouts.forEach((b: any) => {
  console.log(b.block.id, b.block.label, 'col:', b.computedColIndex, 'x:', b.x, 'y:', b.y, 'w:', b.w, 'h:', b.h, 'startRow:', b.computedStartRow, 'endRow:', b.computedEndRow, 'intakeRowYs:', b.intakeRowYs);
});

console.log('\nConnectors:');
layout.connectorLayouts.forEach((c: any) => {
  console.log(c.id, c.type, c.label, 'isMaterial:', c.isMaterial, 'isOrder:', c.isOrder, 'pathD:', c.pathD);
});
