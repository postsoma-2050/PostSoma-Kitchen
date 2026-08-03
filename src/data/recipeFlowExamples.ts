import type { V2Recipe } from '../types/recipeV2'

// 1. 浓缩咖啡布朗尼 (Espresso Brownies)
export const espressoBrowniesRecipe: V2Recipe = {
    id: 'espresso-brownies',
    version: '2.0',
    title: '美式浓缩咖啡布朗尼',
    description: '浓郁黑巧与浓缩咖啡融合，外脆内软的经典美式甜品',
    prerequisites: {
        preheatTempC: 170,
        targetServings: 6,
        containersNeeded: ['8x8寸方形烤盘', '烘焙防沾纸']
    },
    ingredients: [
        { id: 'ing-butter', name: '无盐黄油', amount: 115, unit: 'g', group: 'wet' },
        { id: 'ing-sugar', name: '细砂糖', amount: 200, unit: 'g', group: 'dry' },
        { id: 'ing-vanilla', name: '香草精', amount: 2.5, unit: 'mL', group: 'wet' },
        { id: 'ing-espresso', name: '意式浓缩咖啡', amount: 60, unit: 'mL', group: 'wet', note: '刚萃取的浓缩液' },
        { id: 'ing-eggs', name: '大号鸡蛋', amount: 2, unit: '个', group: 'wet', note: '室温回温' },
        { id: 'ing-flour', name: '中筋面粉', amount: 80, unit: 'g', group: 'dry' },
        { id: 'ing-cocoa', name: '纯可可粉', amount: 80, unit: 'g', group: 'dry' },
        { id: 'ing-soda', name: '小苏打', amount: 1.3, unit: 'g', group: 'dry' },
        { id: 'ing-salt', name: '食盐', amount: 1.5, unit: 'g', group: 'seasoning' }
    ],
    preparations: [
        { id: 'prep-butter', ingredientId: 'ing-butter', action: '切小块便于融化' }
    ],
    flowNodes: [
        {
            id: 'node-melt',
            action: 'melt',
            label: '微波/隔水融化',
            ingredientIds: ['ing-butter'],
            dependsOnNodeIds: [],
            durationMinutes: 3,
            equipment: '耐热玻璃碗'
        },
        {
            id: 'node-mix-sugar',
            action: 'mix',
            label: '加入糖与咖啡拌匀',
            ingredientIds: ['ing-sugar', 'ing-vanilla', 'ing-espresso'],
            dependsOnNodeIds: ['node-melt'],
            durationMinutes: 2
        },
        {
            id: 'node-mix-eggs',
            action: 'mix',
            label: '分次打入鸡蛋拌匀',
            ingredientIds: ['ing-eggs'],
            dependsOnNodeIds: ['node-mix-sugar'],
            durationMinutes: 3
        },
        {
            id: 'node-fold-dry',
            action: 'fold_in',
            label: '过筛粉类切拌无干粉',
            ingredientIds: ['ing-flour', 'ing-cocoa', 'ing-soda', 'ing-salt'],
            dependsOnNodeIds: ['node-mix-eggs'],
            durationMinutes: 4,
            note: '过度搅拌会影响软心口感'
        }
    ],
    finalCooking: [
        {
            method: 'bake',
            equipment: '烤箱中层',
            temperatureC: 170,
            temperature: '170°C (350°F)',
            durationMinutes: 35,
            instructions: '入模平整，烤至表面结皮且牙签插入带少许湿屑出炉'
        }
    ],
    tips: ['出炉后需完全冷却切块，冷藏后口感更佳'],
    createdAt: '2026-08-03T03:00:00.000Z'
}

// 2. 海派经典红烧肉 (Hong Shao Rou)
export const hongShaoRouRecipe: V2Recipe = {
    id: 'hong-shao-rou',
    version: '2.0',
    title: '海派浓油赤酱红烧肉',
    description: '肥而不腻、入口即化、色泽红亮经典中式菜肴',
    prerequisites: {
        targetServings: 4,
        containersNeeded: ['厚底铸铁锅或砂锅', '焯水炒锅']
    },
    ingredients: [
        { id: 'ing-pork', name: '精品三层五花肉', amount: 500, unit: 'g', group: 'main' },
        { id: 'ing-rock-sugar', name: '单晶冰糖', amount: 30, unit: 'g', group: 'seasoning' },
        { id: 'ing-light-soy', name: '特级生抽', amount: 30, unit: 'mL', group: 'seasoning' },
        { id: 'ing-dark-soy', name: '酿造老抽', amount: 15, unit: 'mL', group: 'seasoning' },
        { id: 'ing-wine', name: '花雕料酒', amount: 30, unit: 'mL', group: 'seasoning' },
        { id: 'ing-spices', name: '八角香叶生姜', amountText: '少许', group: 'seasoning' }
    ],
    preparations: [
        { id: 'prep-pork', ingredientId: 'ing-pork', action: '切 3cm见方块' }
    ],
    flowNodes: [
        {
            id: 'node-blanch',
            action: 'blanch',
            label: '冷水焯水漂洗干净',
            ingredientIds: ['ing-pork'],
            dependsOnNodeIds: [],
            durationMinutes: 10,
            heatLevel: '大火',
            equipment: '焯水锅'
        },
        {
            id: 'node-sear-sugar',
            action: 'sear_sugar',
            label: '少油小火炒出琥珀糖色',
            ingredientIds: ['ing-rock-sugar'],
            dependsOnNodeIds: [],
            durationMinutes: 5,
            heatLevel: '小火'
        },
        {
            id: 'node-combine-stew',
            action: 'stew_combine',
            label: '肉块挂糖色并加调料焖炖',
            ingredientIds: ['ing-light-soy', 'ing-dark-soy', 'ing-wine', 'ing-spices'],
            dependsOnNodeIds: ['node-blanch', 'node-sear-sugar'],
            durationMinutes: 45,
            heatLevel: '中小火',
            equipment: '砂锅'
        }
    ],
    finalCooking: [
        {
            method: 'stew',
            equipment: '深砂锅',
            heatLevel: '大火收汁',
            durationMinutes: 10,
            instructions: '最后开大火翻炒收浓汤汁，使酱汁包裹肉块出锅'
        }
    ],
    tips: ['焯水后用温水冲洗，切勿用冷水激肉'],
    createdAt: '2026-08-03T03:00:00.000Z'
}

// 3. 经典主厨凯撒沙拉 (Caesar Salad)
export const caesarSaladRecipe: V2Recipe = {
    id: 'caesar-salad',
    version: '2.0',
    title: '经典主厨凯撒沙拉',
    description: '清脆生菜搭配特调香浓沙拉酱与酥脆面包丁，清爽无负担',
    prerequisites: {
        targetServings: 2,
        containersNeeded: ['冰镇大沙拉碗']
    },
    ingredients: [
        { id: 'ing-lettuce', name: '有机罗马生菜', amount: 200, unit: 'g', group: 'main' },
        { id: 'ing-dressing', name: '手工凯撒酱', amount: 50, unit: 'g', group: 'wet' },
        { id: 'ing-parmesan', name: '帕玛森干酪现磨碎', amount: 20, unit: 'g', group: 'garnish' },
        { id: 'ing-croutons', name: '蒜香酥脆面包丁', amount: 30, unit: 'g', group: 'garnish' }
    ],
    preparations: [
        { id: 'prep-lettuce', ingredientId: 'ing-lettuce', action: '清洗甩干水分后一口大小撕碎' }
    ],
    flowNodes: [
        {
            id: 'node-toss',
            action: 'toss',
            label: '生菜与酱汁充分翻拌',
            ingredientIds: ['ing-lettuce', 'ing-dressing'],
            dependsOnNodeIds: [],
            durationMinutes: 2,
            equipment: '沙拉碗'
        },
        {
            id: 'node-garnish',
            action: 'garnish',
            label: '表面点缀干酪与面包丁',
            ingredientIds: ['ing-parmesan', 'ing-croutons'],
            dependsOnNodeIds: ['node-toss'],
            durationMinutes: 1
        }
    ],
    finalCooking: [
        {
            method: 'raw',
            equipment: '冰镇大瓷盘',
            durationMinutes: 0,
            instructions: '装盘后即刻享用，或封膜冷藏 15 分钟增加爽脆感'
        }
    ],
    tips: ['生菜表面水分必须彻底甩干，否则酱汁无法挂壁'],
    createdAt: '2026-08-03T03:00:00.000Z'
}

export const mockRecipeExamples = [
    espressoBrowniesRecipe,
    hongShaoRouRecipe,
    caesarSaladRecipe
]
