import { CHINESE_HEALTHY_RECIPES } from '../src/data/chineseHealthyRecipes';
import type { V3ActionBlock } from '../src/types/recipeV3';

const r59 = CHINESE_HEALTHY_RECIPES.find((x: any) => x.id === 'cn-59-qincai-niurou')!;
const r01 = CHINESE_HEALTHY_RECIPES.find((x: any) => x.id === 'cn-01-yuxiang-rousi')!;
const r12 = CHINESE_HEALTHY_RECIPES.find((x: any) => x.id === 'cn-12-xihongshi-jidan')!;

[r59, r01, r12].forEach((r: any) => {
  console.log(`\nTesting clusters for ${r.id}:`);
  const rowMap = new Map(r.ingredients.map((ing: any, idx: any) => [ing.id, idx]));
  r.actionBlocks.forEach((b: V3ActionBlock) => {
    const usedIngs = (b.ingredientIds || []).map((id: string) => rowMap.get(id)).filter((x: any): x is number => x !== undefined).sort((a: number, b: number) => a - b);
    const clusters: number[][] = [];
    let cur: number[] = [];
    usedIngs.forEach((row: number) => {
      if (cur.length === 0) cur.push(row);
      else if (row === cur[cur.length - 1] + 1) cur.push(row);
      else { clusters.push(cur); cur = [row]; }
    });
    if (cur.length > 0) clusters.push(cur);
    console.log(`  Block ${b.id} "${b.label}": ings=${usedIngs.join(',')} => clusters=${JSON.stringify(clusters)}`);
  });
});
