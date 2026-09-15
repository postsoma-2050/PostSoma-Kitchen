import { CHINESE_HEALTHY_RECIPES } from '../src/data/chineseHealthyRecipes';
import { espressoBrowniesV3 } from '../src/data/v3Examples';
import { buildV3MatrixLayout } from '../src/utils/matrixFlowLayout';

const testRecipes = [
  ...CHINESE_HEALTHY_RECIPES.filter((x: any) => ['cn-59-qincai-niurou', 'cn-12-xihongshi-jidan', 'cn-24-jianzhi-fanqie-doufugeng', 'cn-14-zhurou-dun-fentiao', 'cn-01-yuxiang-rousi'].includes(x.id)),
  espressoBrowniesV3
];

testRecipes.forEach((r: any) => {
  console.log(`\n================== ${r.id} ==================`);
  const layout = buildV3MatrixLayout(r);
  console.log(`Grid: ${layout.numRows} rows, ${layout.numActionCols} action cols. Canvas: ${layout.canvasWidth}x${layout.canvasHeight}`);
  layout.actionBlockLayouts.forEach((b: any) => {
    console.log(`  Block [${b.block.id}] "${b.block.label}": col=${b.computedColIndex} x=${b.x} y=${b.y} h=${b.h} rows=${b.computedStartRow}..${b.computedEndRow} intakeRows=${b.intakeRowYs}`);
  });
  layout.connectorLayouts.forEach((c: any) => {
    if (c.explicit) {
      console.log(`  Edge: ${c.sourceBlockId} -> ${c.targetBlockId} [${c.type}] label="${c.label || ''}" isMaterial=${c.isMaterial} isOrder=${c.isOrder} pathD=${c.pathD}`);
    }
  });
});
