import { CHINESE_HEALTHY_RECIPES } from '../src/data/chineseHealthyRecipes';
import { espressoBrowniesV3 } from '../src/data/v3Examples';

// Prototype test of new layout logic
const r59 = CHINESE_HEALTHY_RECIPES.find((x: any) => x.id === 'cn-59-qincai-niurou')!;
const r12 = CHINESE_HEALTHY_RECIPES.find((x: any) => x.id === 'cn-12-xihongshi-jidan')!;
const r14 = CHINESE_HEALTHY_RECIPES.find((x: any) => x.id === 'cn-14-zhurou-dun-fentiao')!;
const r24 = CHINESE_HEALTHY_RECIPES.find((x: any) => x.id === 'cn-24-jianzhi-fanqie-doufugeng')!;
const r01 = CHINESE_HEALTHY_RECIPES.find((x: any) => x.id === 'cn-01-yuxiang-rousi')!;

console.log('Prototype test script ready', espressoBrowniesV3.id, r59.id, r12.id, r14.id, r24.id, r01.id);
