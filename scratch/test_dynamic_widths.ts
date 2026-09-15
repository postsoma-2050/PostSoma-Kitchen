import { CHINESE_HEALTHY_RECIPES } from '../src/data/chineseHealthyRecipes';
import { espressoBrowniesV3 } from '../src/data/v3Examples';
import { buildV3MatrixLayout } from '../src/utils/matrixFlowLayout';

function inspectIngredientSpans(recipe: any) {
  console.log(`\n========================================`);
  console.log(`Recipe: ${recipe.title}`);
  console.log(`========================================`);
  const layout = buildV3MatrixLayout(recipe);

  // Map each ingredient to its first consuming action column
  const ingredientFirstCol = new Map<string, number>();
  layout.actionBlockLayouts.forEach(b => {
    if (!b.block.ingredientIds) return;
    b.block.ingredientIds.forEach((id: string) => {
      const cur = ingredientFirstCol.get(id);
      if (cur === undefined || b.computedColIndex < cur) {
        ingredientFirstCol.set(id, b.computedColIndex);
      }
    });
  });

  const PADDING = 16;
  const INGREDIENT_COL_WIDTH = 320;
  const colXOffsets = layout.actionBlockLayouts.reduce((acc, b) => {
    acc[b.computedColIndex] = b.x;
    return acc;
  }, [] as number[]);

  console.log('Action column X positions:', colXOffsets);

  recipe.ingredients.forEach((ing: any, idx: number) => {
    const firstCol = ingredientFirstCol.get(ing.id);
    let targetX = colXOffsets[0] ?? (PADDING + INGREDIENT_COL_WIDTH);
    if (firstCol !== undefined && firstCol > 0 && firstCol < colXOffsets.length) {
      targetX = colXOffsets[firstCol];
    } else if (firstCol === undefined) {
      targetX = layout.finalBlockLayout.x;
    }
    const width = targetX - PADDING;
    console.log(
      `Row ${idx}: [${ing.name}] firstCol=${firstCol ?? 'final'} -> targetX=${targetX}, rowWidth=${width}`
    );
  });
}

const cn29 = CHINESE_HEALTHY_RECIPES.find(r => r.id === 'cn-29-kugua-donggu-gutang')!;
inspectIngredientSpans(cn29);

const cn59 = CHINESE_HEALTHY_RECIPES.find(r => r.id === 'cn-59-qincai-niurou')!;
inspectIngredientSpans(cn59);

inspectIngredientSpans(espressoBrowniesV3);
