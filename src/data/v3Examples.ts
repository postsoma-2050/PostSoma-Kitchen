import type { VisualRecipeV3 } from '@/types/recipeV3'

/**
 * 参考图片 1:1 同款经典例子：Espresso Brownies 意式浓缩布朗尼
 */
export const espressoBrowniesV3: VisualRecipeV3 = {
    id: 'v3-espresso-brownies',
    version: '3.0',
    status: 'complete',
    title: 'Espresso Brownies 意式浓缩布朗尼',
    coverImageUrl: '/recipe-covers/v3-espresso-brownies.webp',
    description: '浓郁醇厚、外脆内软的经典意式浓缩咖啡布朗尼',
    cuisine: 'western',
    difficulty: 'medium',
    prerequisites: {
        containerSize: '8x8-in 方模 (抹油防沾)',
        preheat: '预热烤箱至 350°F (170°C)',
        servings: '9 切块'
    },
    ingredients: [
        { id: 'i0', name: 'unsalted butter 无盐黄油', amountText: '4 oz (115 g)', category: 'dairy' },
        { id: 'i1', name: 'sugar 细砂糖', amountText: '1 cup (200 g)', category: 'seasoning' },
        { id: 'i2', name: 'vanilla extract 香草精', amountText: '1/4 tsp. (2.5 mL)', category: 'liquid' },
        { id: 'i3', name: 'fresh brewed espresso 意式浓缩咖啡', amountText: '1 shot (60 mL)', category: 'liquid' },
        { id: 'i4', name: 'eggs 鸡蛋', amountText: '2 large (100 g)', category: 'main' },
        { id: 'i5', name: 'all-purpose flour 中筋面粉', amountText: '1/2 cup (80 g)', category: 'grain' },
        { id: 'i6', name: "Hershey's cocoa powder 可可粉", amountText: '1/3 cup (80 g)', category: 'grain' },
        { id: 'i7', name: 'baking soda 小苏打', amountText: '1/4 tsp. (1.3 g)', category: 'seasoning' },
        { id: 'i8', name: 'table salt 食盐', amountText: '1/4 tsp. (1.5 g)', category: 'seasoning' }
    ],
    actionBlocks: [
        {
            id: 'b0',
            stageIndex: 0,
            ingredientIds: ['i0'],
            action: 'melt',
            label: '融化',
            sublabel: 'melt',
            heatLevel: '小火'
        },
        {
            id: 'b1',
            stageIndex: 1,
            ingredientIds: ['i0', 'i1', 'i2', 'i3'],
            dependencies: [{ sourceBlockId: 'b0', type: 'material' }],
            action: 'mix',
            label: '混合糖与咖啡',
            sublabel: 'mix'
        },
        {
            id: 'b2',
            stageIndex: 2,
            ingredientIds: ['i0', 'i1', 'i2', 'i3', 'i4'],
            dependencies: [{ sourceBlockId: 'b1', type: 'material' }],
            action: 'mix',
            label: '打入鸡蛋',
            sublabel: 'mix'
        },
        {
            id: 'b3',
            stageIndex: 3,
            ingredientIds: ['i0', 'i1', 'i2', 'i3', 'i4', 'i5', 'i6', 'i7', 'i8'],
            dependencies: [{ sourceBlockId: 'b2', type: 'material' }],
            action: 'fold_in',
            label: '翻拌',
            sublabel: 'fold in'
        }
    ],
    finalBlock: {
        method: 'bake',
        label: '烘焙 bake',
        temperatureC: 170,
        temperatureF: 350,
        durationText: '30 to 40 min',
        instructions: '倒入抹油防沾的 8x8 寸方模中，烘焙至表面结壳牙签插入微湿。',
        servingInstructions: '出炉后彻底冷却切块享用，外层薄脆微裂、内芯如生巧般绵密湿润、浓缩咖啡醇苦解腻'
    },
    provenance: {
        sourceType: 'internal_sample',
        title: 'PostSoma Kitchen V3 Reference Prototype',
        locator: 'v3-espresso-brownies',
        note: '内部布局与领域模型样例，不代表来源核验或厨房实测'
    },
    dataReview: {
        overall: 'modeled',
        ingredients: 'modeled',
        quantities: 'modeled',
        topology: 'modeled',
        heatAndTiming: 'modeled',
        evidence: ['v3-espresso-brownies'],
        assumptions: ['内部参考样例；所有事实字段仍需可靠来源或厨房实测后才能升级核验状态']
    },
    tips: [
        '使用现磨意式浓缩咖啡能极大提升风味层次',
        '加入干粉后切勿过度搅拌，翻拌至无干粉即可'
    ],
    createdAt: '2026-08-03T00:00:00.000Z',
    updatedAt: '2026-08-03T00:00:00.000Z'
}

/**
 * 经典中餐例子：毛氏红烧肉
 */
export const hongShaoRouV3: VisualRecipeV3 = {
    id: 'v3-hong-shao-rou',
    version: '3.0',
    status: 'complete',
    title: '毛氏红烧肉',
    coverImageUrl: '/recipe-covers/v3-hong-shao-rou.webp',
    description: '肥而不腻、香浓红亮的经典家常红烧肉',
    cuisine: 'chinese',
    difficulty: 'medium',
    prerequisites: {
        containerSize: '砂锅 / 铸铁锅',
        preheat: '准备一锅沸水',
        servings: '3~4 人份'
    },
    ingredients: [
        { id: 'i0', name: '带皮五花肉', amountText: '500 g', category: 'main' },
        { id: 'i1_1', name: '生姜片', amountText: '10 g', category: 'produce' },
        { id: 'i1_2', name: '大葱段', amountText: '10 g', category: 'produce' },
        { id: 'i2', name: '料酒', amountText: '30 mL', category: 'liquid' },
        { id: 'i3', name: '黄冰糖', amountText: '30 g', category: 'seasoning' },
        { id: 'i4', name: '植物油', amountText: '15 mL', category: 'liquid' },
        { id: 'i5_1', name: '八角', amountText: '2 朵', category: 'seasoning' },
        { id: 'i5_2', name: '桂皮', amountText: '1 块', category: 'seasoning' },
        { id: 'i6_1', name: '生抽', amountText: '20 mL', category: 'liquid' },
        { id: 'i6_2', name: '老抽', amountText: '10 mL', category: 'liquid' },
        { id: 'i7', name: '沸水', amountText: '500 mL', category: 'liquid' }
    ],
    actionBlocks: [
        {
            id: 'b0',
            stageIndex: 0,
            ingredientIds: ['i0', 'i1_1', 'i1_2', 'i2'],
            action: 'blanch',
            label: '冷水焯水',
            sublabel: 'blanch',
            heatLevel: '大火',
            durationMinutes: 5
        },
        {
            id: 'b1',
            stageIndex: 0,
            ingredientIds: ['i3', 'i4'],
            action: 'caramelize',
            label: '小火炒糖色',
            sublabel: 'caramelize',
            heatLevel: '小火'
        },
        {
            id: 'b2',
            stageIndex: 1,
            ingredientIds: ['i0', 'i1_1', 'i1_2', 'i2', 'i3', 'i4', 'i5_1', 'i5_2', 'i6_1', 'i6_2', 'i7'],
            dependencies: [
                { sourceBlockId: 'b0', type: 'material', label: '焯水后五花肉' },
                { sourceBlockId: 'b1', type: 'material', label: '糖色油底' }
            ],
            action: 'combine',
            label: '合锅翻炒',
            sublabel: 'combine & stir',
            heatLevel: '中火'
        }
    ],
    finalBlock: {
        method: 'stew',
        label: '慢炖 Stew',
        durationText: '45 to 60 min',
        instructions: '小火盖盖慢炖 45 分钟后，开大火收汁至汤汁浓稠红亮装盘。',
        servingInstructions: '盛入砂锅趁热享用，五花肉红亮诱人、肥而不腻、瘦而不柴、入口即化裹满浓郁酱汁'
    },
    provenance: {
        sourceType: 'internal_sample',
        title: 'PostSoma Kitchen V3 Reference Prototype',
        locator: 'v3-hong-shao-rou',
        note: '内部布局与领域模型样例，不代表来源核验或厨房实测'
    },
    dataReview: {
        overall: 'modeled',
        ingredients: 'modeled',
        quantities: 'modeled',
        topology: 'modeled',
        heatAndTiming: 'modeled',
        evidence: ['v3-hong-shao-rou'],
        assumptions: ['内部参考样例；所有事实字段仍需可靠来源或厨房实测后才能升级核验状态']
    },
    tips: [
        '炒糖色时一定要用小火，避免炒焦发苦',
        '加水时务必使用沸水，冷水会使肉质紧缩不收味'
    ],
    createdAt: '2026-08-03T00:00:00.000Z',
    updatedAt: '2026-08-03T00:00:00.000Z'
}

/**
 * 经典冷食/沙拉例子：经典凯撒沙拉 (Caesar Salad)
 */
export const caesarSaladV3: VisualRecipeV3 = {
    id: 'v3-caesar-salad',
    version: '3.0',
    status: 'complete',
    title: 'Classic Caesar Salad 经典凯撒沙拉',
    coverImageUrl: '/recipe-covers/v3-caesar-salad.webp',
    description: '清脆爽口、蒜香乳化酱汁的经典冷食沙拉',
    cuisine: 'western',
    difficulty: 'easy',
    prerequisites: {
        containerSize: '大号沙拉碗与手动打蛋器',
        servings: '2 人份 (无需预热与加热)'
    },
    ingredients: [
        { id: 'i0', name: '罗马生菜 (洗净吸干切块)', amountText: '1 颗 (约 250g)', category: 'produce' },
        { id: 'i1', name: '烤面包丁 (Croutons)', amountText: '1/2 cup (50g)', category: 'grain' },
        { id: 'i2', name: '帕玛森芝士碎 (Parmesan)', amountText: '1/3 cup (30g)', category: 'dairy' },
        { id: 'i3', name: '大蒜 (压泥)', amountText: '2 瓣', category: 'produce' },
        { id: 'i4', name: '鳀鱼酱 (Anchovy paste)', amountText: '1 tsp (5g)', category: 'liquid' },
        { id: 'i5', name: '新鲜蛋黄', amountText: '1 个', category: 'main' },
        { id: 'i6', name: '新鲜柠檬汁', amountText: '1.5 Tbs (22 mL)', category: 'liquid' },
        { id: 'i7', name: '特级初榨橄榄油', amountText: '1/3 cup (80 mL)', category: 'liquid' },
        { id: 'i8_1', name: '现磨黑胡椒', amountText: '适量', category: 'seasoning' },
        { id: 'i8_2', name: '食盐', amountText: '适量', category: 'seasoning' }
    ],
    actionBlocks: [
        {
            id: 'b0',
            stageIndex: 0,
            ingredientIds: ['i3', 'i4', 'i5', 'i6', 'i7'],
            action: 'emulsify',
            label: '乳化搅拌酱汁',
            sublabel: 'emulsify dressing'
        },
        {
            id: 'b1',
            stageIndex: 1,
            ingredientIds: ['i0', 'i1', 'i2', 'i3', 'i4', 'i5', 'i6', 'i7', 'i8_1', 'i8_2'],
            dependencies: [
                { sourceBlockId: 'b0', type: 'material', label: '乳化凯撒酱汁' }
            ],
            action: 'toss',
            label: '充分抓拌均匀',
            sublabel: 'toss well'
        }
    ],
    finalBlock: {
        method: 'serve',
        label: '装盘即享 Direct Serve',
        instructions: '将充分挂汁的生菜装盘，撒上烤面包丁、现磨黑胡椒与帕玛森芝士碎即可享用。',
        servingInstructions: '装盘后立即享用，罗马生菜清脆多汁、乳化凯撒酱咸鲜醇厚、面包丁酥脆帕玛森芝士浓郁'
    },
    provenance: {
        sourceType: 'internal_sample',
        title: 'PostSoma Kitchen V3 Reference Prototype',
        locator: 'v3-caesar-salad',
        note: '内部布局与领域模型样例，不代表来源核验或厨房实测'
    },
    dataReview: {
        overall: 'modeled',
        ingredients: 'modeled',
        quantities: 'modeled',
        topology: 'modeled',
        heatAndTiming: 'modeled',
        evidence: ['v3-caesar-salad'],
        assumptions: ['内部参考样例；所有事实字段仍需可靠来源或厨房实测后才能升级核验状态']
    },
    tips: [
        '生菜洗净后务必彻底吸干水分，否则酱汁无法挂附',
        '传统酱汁使用新鲜蛋黄与橄榄油充分打发乳化'
    ],
    createdAt: '2026-08-03T00:00:00.000Z',
    updatedAt: '2026-08-03T00:00:00.000Z'
}
