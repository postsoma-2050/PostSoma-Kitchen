import { CHINESE_HEALTHY_RECIPES } from '../src/data/chineseHealthyRecipes';
import { buildV3MatrixLayout } from '../src/utils/matrixFlowLayout';

const r = CHINESE_HEALTHY_RECIPES.find((x: any) => x.id === 'cn-59-qincai-niurou')!;
const layout = buildV3MatrixLayout(r);

console.log('=== cn-59 Waiting Paths ===');
layout.ingredientWaitingPaths.forEach((wp: any) => {
  console.log(`Wait [${wp.id}]: ing=${wp.ingredientId} row=${wp.rowIndex} from x=${wp.startX} to x=${wp.endX} at y=${wp.startY} target=${wp.targetBlockId || 'final'}`);
});

console.log('\n=== cn-59 Intake Feeds ===');
layout.ingredientIntakeFeeds.forEach((feed: any) => {
  console.log(`Feed [${feed.id}]: ing=${feed.ingredientId} block=${feed.blockId} pin=(${feed.pinX}, ${feed.pinY})`);
});

console.log('\n=== cn-59 Rail Segments ===');
layout.intakeRailSegments.forEach((rail: any) => {
  console.log(`Rail [${rail.id}]: block=${rail.blockId} x=${rail.x} y=${rail.startY}..${rail.endY} rows=${rail.participatingRowIndices.join(',')}`);
});
