import type { VisualRecipeV3 } from '@/types/recipeV3'

/**
 * 营养师张晔《蒸炖炒，健康食谱》经典中式菜谱集
 */
const CHINESE_HEALTHY_RECIPES_DATA: VisualRecipeV3[] = [
  // 1. 私房少油鱼香肉丝 (炒)
  {
    id: 'cn-01-yuxiang-rousi',
    version: '3.0',
    status: 'published',
    title: '🥢 私房少油鱼香肉丝',
    description: '营养师少油改良款经典川菜。猪肉丝搭配冬笋丝与木耳丝，酸甜微辣，滋阴润燥、开胃健脾。',
    cuisine: 'chinese',
    difficulty: 'medium',
    prerequisites: {
      containerSize: '中式炒锅 (Wok)',
      preheat: '准备鱼香芡汁与水淀粉上浆',
      servings: '3-4 人份'
    },
    ingredients: [
      { id: 'i1', name: '猪里脊肉丝', amountText: '200 g', category: 'main' },
      { id: 'i5', name: '肉丝水淀粉滑嫩上浆料', amountText: '1 份', category: 'formula', formulaId: 'formula-yuxiang-marinade' },
      { id: 'i4', name: '泡椒末与葱姜蒜', amountText: '10g 泡椒 + 葱姜蒜末', category: 'seasoning' },
      { id: 'i2', name: '冬笋丝', amountText: '80 g', category: 'produce' },
      { id: 'i3', name: '水发木耳丝', amountText: '50 g', category: 'produce' },
      { id: 'i6', name: '私房经典鱼香糖醋芡汁', amountText: '1 碗', category: 'formula', formulaId: 'formula-yuxiang-sauce' }
    ],
    formulas: [
      {
        id: 'formula-yuxiang-sauce',
        name: '私房经典鱼香糖醋芡汁',
        category: 'sauce',
        yieldText: '约 50 ml',
        baseServings: 2,
        items: [
          { name: '保宁香醋 (或四川陈醋)', baseAmount: 20, unit: 'ml', note: '酸味核心' },
          { name: '白糖', baseAmount: 15, unit: 'g', note: '糖醋比例 3:4' },
          { name: '特级生抽酱油', baseAmount: 10, unit: 'ml' },
          { name: '高汤或清水', baseAmount: 15, unit: 'ml' },
          { name: '玉米淀粉', baseAmount: 5, unit: 'g', note: '勾芡使用' }
        ],
        steps: [
          '1. 将香醋、白糖、生抽倒入调料碗中充分搅拌',
          '2. 加入高汤与玉米淀粉，搅匀至白糖与淀粉无沉淀'
        ],
        timingTip: '冬笋与木耳下锅大火翻炒 1 分钟后，沿锅边一圈快速烹入并大火收汁',
        prepActionBlockId: 'b1',
        usedActionBlockIds: ['b3']
      },
      {
        id: 'formula-yuxiang-marinade',
        name: '肉丝水淀粉滑嫩上浆料',
        category: 'marinade',
        yieldText: '适用于 200g 肉丝',
        baseServings: 2,
        items: [
          { name: '料酒', baseAmount: 10, unit: 'ml' },
          { name: '玉米淀粉', baseAmount: 8, unit: 'g' },
          { name: '清水', baseAmount: 10, unit: 'ml' },
          { name: '食盐', baseAmount: 1.5, unit: 'g' }
        ],
        steps: [
          '1. 猪肉丝切好后加入食盐与料酒抓匀吸水',
          '2. 加入玉米淀粉与水混匀的水淀粉，顺时针搅拌上浆锁住水分'
        ],
        timingTip: '切丝后立即上浆，腌制 10 分钟后再滑油炒制',
        prepActionBlockId: 'b1',
        usedActionBlockIds: ['b1', 'b2']
      }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '肉丝水淀粉上浆',
        sublabel: 'Marinate Pork',
        ingredientIds: ['i1', 'i5'],
        stageIndex: 0,
        notes: '加入料酒、少许盐与水淀粉抓匀上浆'
      },
      {
        id: 'b2',
        label: '滑散肉丝与爆香泡椒',
        sublabel: 'Stir-Fry Meat',
        ingredientIds: ['i1', 'i4'],
        stageIndex: 1,
        heatLevel: '大火',
        durationMinutes: 3,
        notes: '油六成热滑散肉丝，加入姜蒜泡椒末爆香'
      },
      {
        id: 'b3',
        label: '倒入配料与淋鱼香汁',
        sublabel: 'Combine & Sauce',
        ingredientIds: ['i1', 'i2', 'i3', 'i6'],
        stageIndex: 2,
        heatLevel: '大火',
        durationMinutes: 2,
        notes: '倒入冬笋木耳丝翻炒，倒入鱼香芡汁收汁出锅'
      }
    ],
    finalBlock: {
      method: 'fry',
      label: '大火爆炒 🍳',
      instructions: '急火快炒勾芡，鱼香味浓郁，少油更健康'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 2. 蒜蓉粉丝蒸扇贝 (蒸)
  {
    id: 'cn-02-steamed-scallops',
    version: '3.0',
    status: 'published',
    title: '🐚 蒜蓉粉丝蒸扇贝',
    description: '粤式经典海鲜蒸菜。鲜美扇贝肉搭配吸饱汤汁的粉丝与特制金银蒜蓉酱，大火蒸5分钟锁住鲜甜。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '大号平底蒸盘 & 蒸锅',
      preheat: '水烧开，大火上汽',
      servings: '6 颗 (350g)'
    },
    ingredients: [
      { id: 'i1', name: '新鲜大扇贝 (带壳)', amountText: '6 颗 (350 g)', category: 'main' },
      { id: 'i2', name: '龙口细粉丝 (泡软)', amountText: '50 g', category: 'grain' },
      { id: 'i3', name: '特制金银蒜蓉末', amountText: '50 g', category: 'produce' },
      { id: 'i4', name: '姜末与白糖盐', amountText: '姜末+糖+盐少许', category: 'seasoning' },
      { id: 'i5', name: '蒸鱼豉油与葱花', amountText: '豉油15g + 葱花', category: 'liquid' },
      { id: 'i6', name: '熟植物油 (浇淋)', amountText: '2 汤匙 (热油)', category: 'liquid' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '粉丝泡软与扇贝取肉',
        sublabel: 'Prep Scallops',
        ingredientIds: ['i1', 'i2'],
        stageIndex: 0,
        notes: '粉丝沸水泡软，剔下贝肉洗净，贝壳烫后摆盘'
      },
      {
        id: 'b2',
        label: '调制蒜蓉酱汁',
        sublabel: 'Mix Garlic Sauce',
        ingredientIds: ['i3', 'i4', 'i5'],
        stageIndex: 1,
        notes: '混合蒜蓉、姜末、豉油、白糖与盐'
      },
      {
        id: 'b3',
        label: '码盘并淋酱汁',
        sublabel: 'Assemble Discs',
        ingredientIds: ['i1', 'i2', 'i3', 'i4', 'i5', 'i6'],
        stageIndex: 2,
        notes: '贝壳上铺粉丝、放贝肉，舀上蒜蓉酱汁'
      }
    ],
    finalBlock: {
      method: 'steam',
      label: '大火清蒸 ♨️',
      durationText: '5 min',
      instructions: '上笼大火蒸 5 分钟，出锅撒葱花浇热油激发香味'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 3. 番茄炖牛腩 (炖)
  {
    id: 'cn-03-tomato-beef-stew',
    version: '3.0',
    status: 'published',
    title: '🍅 番茄炖牛腩煲',
    description: '酸甜开胃的经典营养炖菜。番茄一部分炒成浓郁底酱，一部分切块慢炖，促进牛腩胶原蛋白转化与铁吸收。',
    cuisine: 'chinese',
    difficulty: 'medium',
    prerequisites: {
      containerSize: '砂锅 (Claypot)',
      preheat: '牛腩焯水，准备沸水',
      servings: '4-5 人份'
    },
    ingredients: [
      { id: 'i1', name: '牛腩块 (焯水)', amountText: '400 g', category: 'main' },
      { id: 'i2', name: '熟透大番茄 (去皮)', amountText: '250 g (2颗)', category: 'produce' },
      { id: 'i3', name: '姜末与葱末', amountText: '姜末5g + 葱末', category: 'produce' },
      { id: 'i4', name: '料酒与酱油', amountText: '料酒15g + 酱油', category: 'liquid' },
      { id: 'i5', name: '食盐与胡椒粉', amountText: '盐4g', category: 'seasoning' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '牛腩焯水与番茄切块',
        sublabel: 'Blanch Beef',
        ingredientIds: ['i1', 'i2'],
        stageIndex: 0,
        durationMinutes: 5,
        notes: '牛腩沸水焯去血沫，番茄一半切碎一半切大块'
      },
      {
        id: 'b2',
        label: '炒制浓郁番茄酱底',
        sublabel: 'Make Tomato Sauce',
        ingredientIds: ['i2', 'i3', 'i4'],
        stageIndex: 1,
        heatLevel: '中火',
        durationMinutes: 6,
        notes: '爆香姜末，倒入番茄碎炒出沙成浓酱，加入牛腩翻匀'
      },
      {
        id: 'b3',
        label: '转砂锅加水焖炖',
        sublabel: 'Stew in Claypot',
        ingredientIds: ['i1', 'i2', 'i5'],
        stageIndex: 2,
        heatLevel: '小火',
        durationMinutes: 60,
        notes: '倒入砂锅加水小火炖 1 小时，加入番茄块再炖 30 分钟'
      }
    ],
    finalBlock: {
      method: 'stew',
      label: '砂锅慢炖 🍲',
      durationText: '90 min',
      instructions: '小火慢炖至牛腩酥烂吸饱酸甜汤汁'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 4. 葱爆羊肉 (炒)
  {
    id: 'cn-04-congbao-yangrou',
    version: '3.0',
    status: 'published',
    title: '🥩 经典京味葱爆羊肉',
    description: '传统老北京爆炒菜。鲜嫩羊肉片搭配大量大葱段，10秒极速大火翻炒，沿着锅边烹入香醋与料酒，补阳强腰。',
    cuisine: 'chinese',
    difficulty: 'medium',
    prerequisites: {
      containerSize: '大火热炒锅',
      preheat: '锅烧至冒微烟，大火急炒',
      servings: '2-3 人份'
    },
    ingredients: [
      { id: 'i1', name: '鲜羊肉片', amountText: '300 g', category: 'main' },
      { id: 'i4', name: '酱油与料酒 (腌肉)', amountText: '酱油10g + 料酒', category: 'liquid' },
      { id: 'i6', name: '白胡椒粉与水淀粉', amountText: '胡椒粉+水淀粉', category: 'seasoning' },
      { id: 'i3', name: '蒜片', amountText: '5 g', category: 'produce' },
      { id: 'i2', name: '大葱段 (斜切)', amountText: '150 g', category: 'produce' },
      { id: 'i5', name: '香醋与香油 (烹边)', amountText: '醋5g + 香油', category: 'liquid' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '羊肉片腌渍底味',
        sublabel: 'Marinate Mutton',
        ingredientIds: ['i1', 'i4', 'i6'],
        stageIndex: 0,
        notes: '羊肉片加酱油、料酒、胡椒粉与水淀粉腌15分钟'
      },
      {
        id: 'b2',
        label: '爆香蒜片与大火划散',
        sublabel: 'Flash Fry Meat',
        ingredientIds: ['i1', 'i3'],
        stageIndex: 1,
        heatLevel: '大火',
        durationMinutes: 1,
        notes: '油烧极热爆香蒜片，下羊肉大火翻炒10秒'
      },
      {
        id: 'b3',
        label: '下葱段与锅边烹醋',
        sublabel: 'Add Scallion & Vinegar',
        ingredientIds: ['i1', 'i2', 'i5'],
        stageIndex: 2,
        heatLevel: '大火',
        durationMinutes: 1,
        notes: '倒入大葱段，沿锅边淋料酒与香醋，滴香油淋亮出锅'
      }
    ],
    finalBlock: {
      method: 'fry',
      label: '极速爆炒 🍳',
      instructions: '全程大火急炒，大葱断生即出锅，肉质极其鲜嫩'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 5. 宫保鸡丁 (炒)
  {
    id: 'cn-05-gongbao-jiding',
    version: '3.0',
    status: 'published',
    title: '🌶️ 宫保鸡丁',
    description: '名扬中外的传统川菜。鸡腿肉丁搭配冬笋丁与炸花生米，糊辣荔枝味型，红亮鲜香。',
    cuisine: 'chinese',
    difficulty: 'medium',
    prerequisites: {
      containerSize: '中式炒锅',
      preheat: '准备宫保糖醋碗汁与炸花生',
      servings: '3-4 人份'
    },
    ingredients: [
      { id: 'i1', name: '鸡腿肉丁', amountText: '250 g', category: 'main' },
      { id: 'i5', name: '蛋清与水淀粉上浆', amountText: '1蛋清 + 水淀粉', category: 'liquid' },
      { id: 'i4', name: '干红辣椒段与花椒', amountText: '干椒10g + 花椒', category: 'seasoning' },
      { id: 'i2', name: '冬笋丁 (焯水)', amountText: '75 g', category: 'produce' },
      { id: 'i3', name: '去皮炸花生仁', amountText: '25 g', category: 'other' },
      { id: 'i6', name: '宫保荔枝碗汁', amountText: '糖+醋+酱油+水淀粉', category: 'seasoning' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '鸡丁蛋清上浆',
        sublabel: 'Coat Chicken',
        ingredientIds: ['i1', 'i5'],
        stageIndex: 0,
        notes: '鸡丁加盐、酱油、料酒、蛋清与水淀粉抓匀'
      },
      {
        id: 'b2',
        label: '炸香花椒干辣椒',
        sublabel: 'Fry Chili & Sichuan Pepper',
        ingredientIds: ['i4'],
        stageIndex: 1,
        heatLevel: '中火',
        durationMinutes: 2,
        notes: '油烧热炒香花椒与干红辣椒段至棕红色'
      },
      {
        id: 'b3',
        label: '下鸡丁冬笋与烹碗汁',
        sublabel: 'Stir-Fry & Sauce',
        ingredientIds: ['i2', 'i3', 'i6'],
        dependencies: [
          { sourceBlockId: 'b1', type: 'material', label: '上浆鸡丁' },
          { sourceBlockId: 'b2', type: 'material', label: '辣椒花椒底油' }
        ],
        inputBlockIds: ['b1', 'b2'],
        stageIndex: 2,
        heatLevel: '大火',
        durationMinutes: 3,
        notes: '倒入鸡丁冬笋煸炒，倒入宫保芡汁，最后撒入炸花生仁出锅'
      }
    ],
    finalBlock: {
      method: 'fry',
      label: '红亮爆炒 🌶️',
      instructions: '糊辣荔枝味浓郁，鸡丁嫩滑，花生米酥脆'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 6. 奶白鲫鱼汤 (炖)
  {
    id: 'cn-06-jiyu-tang',
    version: '3.0',
    status: 'published',
    title: '🐟 奶白豆腐鲫鱼汤',
    description: '经典中式滋补高汤。鲫鱼两面煎至金黄后倒入开水大火剧烈沸腾，汤色如牛奶般白香，补脾利湿。',
    cuisine: 'chinese',
    difficulty: 'medium',
    prerequisites: {
      containerSize: '深汤锅 / 炖锅',
      preheat: '准备开水 (大火冲出奶白汤的核心)',
      servings: '3-4 人份'
    },
    ingredients: [
      { id: 'i1', name: '新鲜鲜活鲫鱼 (去鳞腮)', amountText: '300 g (1条)', category: 'main' },
      { id: 'i3', name: '葱段与姜片', category: 'produce', note: '原始数据未提供各项用量，待来源核对' },
      { id: 'i4', name: '料酒与植物油', amountText: '料酒10g + 煎鱼油', category: 'liquid' },
      { id: 'i2', name: '嫩豆腐 (切方块)', amountText: '200 g', category: 'produce' },
      { id: 'i5', name: '盐与香菜段', amountText: '盐+香菜', category: 'seasoning' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '煎鱼至两面金黄',
        sublabel: 'Sear Fish',
        ingredientIds: ['i1', 'i3', 'i4'],
        stageIndex: 0,
        heatLevel: '中火',
        durationMinutes: 6,
        notes: '爆香葱姜，下鲫鱼煎至两面皮金黄'
      },
      {
        id: 'b2',
        label: '倒入沸水大火冲汤',
        sublabel: 'Boil Milky Broth',
        ingredientIds: ['i1', 'i4'],
        stageIndex: 1,
        heatLevel: '大火',
        durationMinutes: 10,
        notes: '烹入料酒，倒入 3 大碗沸水，大火维持剧烈沸腾 10 分钟冲出奶白汤'
      },
      {
        id: 'b3',
        label: '加入豆腐小火慢炖',
        sublabel: 'Add Tofu & Simmer',
        ingredientIds: ['i1', 'i2', 'i5'],
        stageIndex: 2,
        heatLevel: '小火',
        durationMinutes: 30,
        notes: '放入豆腐块，转小火慢炖 30 分钟，调入盐与香菜'
      }
    ],
    finalBlock: {
      method: 'stew',
      label: '奶白高汤 🥣',
      durationText: '40 min',
      instructions: '汤色如浓奶，鱼肉鲜嫩，豆腐滑软'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 7. 豉汁蒸盘龙白鳝 (蒸)
  {
    id: 'cn-07-steamed-eel',
    version: '3.0',
    status: 'published',
    title: '🐉 豉汁蒸盘龙白鳝',
    description: '粤菜传统功夫名菜。白鳝背骨断而腹不断造型成盘龙，抹特制豉汁蒜蓉大火蒸8分钟，富含优质蛋白与胶原。',
    cuisine: 'chinese',
    difficulty: 'hard',
    prerequisites: {
      containerSize: '圆边浅扣大蒸盘 & 蒸锅',
      preheat: '准备大火沸水蒸锅',
      servings: '4-6 人份'
    },
    ingredients: [
      { id: 'i1', name: '白鳝 (盘龙切刀)', amountText: '600 g', category: 'main' },
      { id: 'i2', name: '阳江豆豉汁', amountText: '15 g', category: 'seasoning' },
      { id: 'i3', name: '生熟蒜蓉与姜末', amountText: '生蒜蓉+熟蒜蓉+姜末', category: 'produce' },
      { id: 'i4', name: '红椒末与陈皮末', category: 'produce', note: '原始数据未提供各项用量，待来源核对' },
      { id: 'i5', name: '生粉与香油酱油', category: 'liquid', note: '原始数据未提供各项用量，待来源核对' },
      { id: 'i6', name: '胡椒粉与葱花 (滚油)', amountText: '胡椒粉+葱花+熟油', category: 'seasoning' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '盘龙改刀切背骨',
        sublabel: 'Dragon Slice Eel',
        ingredientIds: ['i1'],
        stageIndex: 0,
        notes: '鳝背每隔2厘米切一刀，骨断腹不断洗净'
      },
      {
        id: 'b2',
        label: '拌入双蒜豉汁料',
        sublabel: 'Season Eel',
        ingredientIds: ['i1', 'i2', 'i3', 'i4', 'i5'],
        stageIndex: 1,
        notes: '拌入生熟蒜蓉、姜末、陈皮末、豆豉汁与生粉香油'
      },
      {
        id: 'b3',
        label: '盘龙造型码盘',
        sublabel: 'Plate Dragon Shape',
        ingredientIds: ['i1', 'i2', 'i3', 'i4', 'i5', 'i6'],
        stageIndex: 2,
        notes: '盘子中摆成盘蛇造型，余料铺在身上'
      }
    ],
    finalBlock: {
      method: 'steam',
      label: '大火极速蒸 ♨️',
      durationText: '8 min',
      instructions: '大火猛蒸 8 分钟，取出撒胡椒粉葱花，泼滚油即成'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 8. 粉蒸胡萝卜丝 (蒸)
  {
    id: 'cn-08-steamed-carrot-strips',
    version: '3.0',
    status: 'published',
    title: '🥕 蒜香粉蒸胡萝卜丝',
    description: '北方经典养生粉蒸菜。胡萝卜丝裹上黄金玉米面蒸熟，泼入干辣椒蒜油，降胆固醇、护眼明目。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '蒸盘 & 蒸锅',
      preheat: '准备水沸蒸锅与热油',
      servings: '2-3 人份'
    },
    ingredients: [
      { id: 'i1', name: '胡萝卜丝 (擦细丝)', amountText: '200 g', category: 'produce' },
      { id: 'i2', name: '细玉米面粉', amountText: '100 g', category: 'grain' },
      { id: 'i3', name: '鸡蛋清', amountText: '1 颗', category: 'main' },
      { id: 'i4', name: '蒜末与葱末香菜', amountText: '蒜末+葱末+香菜段', category: 'produce' },
      { id: 'i5', name: '干红辣椒段', amountText: '3 g', category: 'seasoning' },
      { id: 'i6', name: '植物油 (热油泼辣)', amountText: '2 汤匙', category: 'liquid' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '蛋清润湿与裹玉米面',
        sublabel: 'Coat Cornmeal',
        ingredientIds: ['i1', 'i2', 'i3'],
        stageIndex: 0,
        notes: '胡萝卜丝加蛋清抓匀，分次拌入玉米面使每根裹匀粉'
      },
      {
        id: 'b2',
        label: '上笼盖膜蒸熟',
        sublabel: 'Steam 10 Mins',
        ingredientIds: ['i1', 'i2'],
        stageIndex: 1,
        durationMinutes: 10,
        notes: '盘子盖保鲜膜，沸水蒸 10 分钟取出'
      },
      {
        id: 'b3',
        label: '码香菜蒜末与泼辣油',
        sublabel: 'Hot Oil Splash',
        ingredientIds: ['i1', 'i4', 'i5', 'i6'],
        stageIndex: 2,
        notes: '放葱蒜香菜与干辣椒段，烧热油泼在干辣椒上拌匀'
      }
    ],
    finalBlock: {
      method: 'steam',
      label: '香气泼油 ♨️',
      instructions: '玉米粉香气与蒜辣交织，口感干爽松软'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 9. 私家京酱肉丝 (炒)
  {
    id: 'cn-09-jingjiang-rousi',
    version: '3.0',
    status: 'published',
    title: '🥢 私家京酱肉丝',
    description: '营养师改良版传统经典。猪里脊肉搭配甜面酱爆炒，特别加入焯熟的胡萝卜丝与黄豆芽衬底，荤素均衡、富含膳食纤维。',
    cuisine: 'chinese',
    difficulty: 'medium',
    prerequisites: {
      containerSize: '中式炒锅',
      preheat: '准备水淀粉上浆与特调酱汁',
      servings: '3-4 人份'
    },
    ingredients: [
      { id: 'i2', name: '胡萝卜丝', amountText: '100 g', category: 'produce' },
      { id: 'i3', name: '黄豆芽 (焯熟)', amountText: '100 g', category: 'produce' },
      { id: 'i4', name: '葱白丝', amountText: '50 g', category: 'produce' },
      { id: 'i1', name: '猪里脊肉丝', amountText: '250 g', category: 'main' },
      { id: 'i5', name: '肉丝料酒水淀粉上浆包', amountText: '1 份', category: 'formula', formulaId: 'formula-jj-marinade' },
      { id: 'i6', name: '特制香浓甜面酱汁', amountText: '1 碗 (80g)', category: 'formula', formulaId: 'formula-jj-sauce' }
    ],
    formulas: [
      {
        id: 'formula-jj-sauce',
        name: '特制香浓甜面酱汁',
        category: 'sauce',
        yieldText: '约 80 g',
        baseServings: 3,
        items: [
          { name: '六必居甜面酱', baseAmount: 60, unit: 'g' },
          { name: '白糖', baseAmount: 10, unit: 'g' },
          { name: '料酒', baseAmount: 5, unit: 'ml' },
          { name: '清水', baseAmount: 10, unit: 'ml' }
        ],
        steps: ['1. 将甜面酱、白糖、料酒与清水在小碗中调匀']
      },
      {
        id: 'formula-jj-marinade',
        name: '肉丝料酒水淀粉上浆包',
        category: 'marinade',
        yieldText: '适用于 250g 里脊肉丝',
        baseServings: 3,
        items: [
          { name: '料酒', baseAmount: 5, unit: 'ml' },
          { name: '盐', baseAmount: 2, unit: 'g' },
          { name: '水淀粉', baseAmount: 20, unit: 'g' }
        ],
        steps: ['1. 里脊肉丝加料酒、盐、水淀粉充分抓匀上浆锁水']
      }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '蔬菜焯熟码盘',
        sublabel: 'Blanch Veggies & Plate',
        ingredientIds: ['i2', 'i3', 'i4'],
        stageIndex: 0,
        notes: '胡萝卜丝与黄豆芽沸水焯熟，与葱白丝一同摆盘底'
      },
      {
        id: 'b2',
        label: '滑散肉丝与炒甜面酱',
        sublabel: 'Stir-Fry Pork & Sauce',
        ingredientIds: ['i1', 'i5', 'i6'],
        stageIndex: 1,
        heatLevel: '中火',
        durationMinutes: 4,
        notes: '肉丝划散炒熟盛出，锅中放酱汁炒香，放入肉丝裹匀酱汁'
      }
    ],
    finalBlock: {
      method: 'fry',
      label: '酱香码盘 🥢',
      instructions: '将炒好的京酱肉丝倒在蔬菜盘中央，裹着葱丝与黄豆芽食用'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 10. 蒜蓉蒸茄子 (蒸)
  {
    id: 'cn-10-suanrong-qiezi',
    version: '3.0',
    status: 'published',
    title: '🍆 蒜蓉蒸茄子',
    description: '少油健康护心蒸菜。紫茄子切片大火蒸熟，泼上爆香蒜蓉与红辣酱汁，富含维生素P与维生素E，软化血管。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '平底蒸盘 & 蒸锅',
      preheat: '准备水沸大火蒸锅',
      servings: '2-3 人份'
    },
    ingredients: [
      { id: 'i1', name: '新鲜紫茄子', amountText: '400 g', category: 'produce' },
      { id: 'i2', name: '大蒜末', amountText: '10 g', category: 'produce' },
      { id: 'i3', name: '红辣椒丁', amountText: '20 g', category: 'produce' },
      { id: 'i4', name: '葱花与食盐', amountText: '葱花5g + 盐5g', category: 'seasoning' },
      { id: 'i5', name: '特级橄榄油', amountText: '5 g', category: 'liquid' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '茄子剖开切片码盘',
        sublabel: 'Slice & Plate Eggplant',
        ingredientIds: ['i1'],
        stageIndex: 0,
        notes: '茄子洗净从中剖开，切成大片装盘'
      },
      {
        id: 'b2',
        label: '爆香蒜蓉红椒酱汁',
        sublabel: 'Saute Garlic Sauce',
        ingredientIds: ['i2', 'i3', 'i4', 'i5'],
        stageIndex: 1,
        heatLevel: '中火',
        durationMinutes: 2,
        notes: '橄榄油烧热，加入蒜末、红辣丁、葱花与盐爆香'
      },
      {
        id: 'b3',
        label: '淋酱汁大火蒸熟',
        sublabel: 'Steam 10 Mins',
        ingredientIds: ['i1', 'i2', 'i3'],
        stageIndex: 2,
        heatLevel: '大火',
        durationMinutes: 10,
        notes: '酱汁浇在茄子片上，入蒸锅大火蒸 10 分钟取出'
      }
    ],
    finalBlock: {
      method: 'steam',
      label: '蒜香软嫩 🍆',
      durationText: '10 min',
      instructions: '茄子鲜嫩多汁，蒜香浓郁，少油更健康'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 11. 胡萝卜牛腩煲 (炖)
  {
    id: 'cn-11-luobo-niunan',
    version: '3.0',
    status: 'published',
    title: '🍲 胡萝卜洋葱炖牛腩煲',
    description: '营养师推介强身炖菜。牛腩搭配胡萝卜与洋葱在砂锅中慢炖，胡萝卜素溶于油脂极易吸收，大火转小火汤浓肉烂。',
    cuisine: 'chinese',
    difficulty: 'medium',
    prerequisites: {
      containerSize: '深砂锅 (Claypot)',
      preheat: '牛腩洗净，准备沸水',
      servings: '4-5 人份'
    },
    ingredients: [
      { id: 'i1', name: '鲜牛腩块', amountText: '500 g', category: 'main' },
      { id: 'i3', name: '洋葱 (大块)', amountText: '100 g', category: 'produce' },
      { id: 'i5', name: '蒜片与葱段白胡椒', amountText: '蒜片5g + 葱段 + 白胡椒粒', category: 'seasoning' },
      { id: 'i2', name: '胡萝卜 (滚刀块)', amountText: '100 g', category: 'produce' },
      { id: 'i4', name: '料酒与酱油', amountText: '料酒15g + 酱油15g', category: 'liquid' },
      { id: 'i6', name: '食盐', amountText: '4 g', category: 'seasoning' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '爆香洋葱与炒牛腩',
        sublabel: 'Sear Beef & Onion',
        ingredientIds: ['i1', 'i3', 'i5'],
        stageIndex: 0,
        heatLevel: '中大火',
        durationMinutes: 5,
        notes: '爆香蒜片洋葱，放入牛腩块炒至表面变色'
      },
      {
        id: 'b2',
        label: '转砂锅小火焖炖',
        sublabel: 'Stew 40 Mins',
        ingredientIds: ['i1', 'i2', 'i4', 'i6'],
        stageIndex: 1,
        heatLevel: '小火',
        durationMinutes: 40,
        notes: '转砂锅加水、酱油、胡萝卜，小火焖炖40分钟至肉烂'
      }
    ],
    finalBlock: {
      method: 'stew',
      label: '砂锅滋补 🍲',
      durationText: '40 min',
      instructions: '撒白胡椒粒与葱段调味，肉香浓郁，汤汁鲜美'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 12. 番茄炒鸡蛋 (炒)
  {
    id: 'cn-12-xihongshi-jidan',
    version: '3.0',
    status: 'published',
    title: '🍳 经典番茄炒鸡蛋',
    description: '国民经典营养快手菜。番茄维C与鸡蛋维E黄金组合，炒出酸甜鲜美浓汁，护肤抗衰老。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '中式平底炒锅',
      preheat: '鸡蛋打散，番茄切块',
      servings: '2-3 人份'
    },
    ingredients: [
      { id: 'i2', name: '新鲜鸡蛋', amountText: '2 颗', category: 'main' },
      { id: 'i1', name: '新鲜红番茄 (切块)', amountText: '250 g (2颗)', category: 'produce' },
      { id: 'i3', name: '葱花', amountText: '5 g', category: 'produce' },
      { id: 'i4', name: '白糖与食盐', amountText: '糖5g + 盐4g', category: 'seasoning' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '滑炒鸡蛋盛出',
        sublabel: 'Scramble & Set Aside',
        ingredientIds: ['i2'],
        stageIndex: 0,
        heatLevel: '中大火',
        durationMinutes: 2,
        notes: '蛋液入热油炒至金黄蓬松炒散盛出备用，产生暂存鸡蛋支线'
      },
      {
        id: 'b2',
        label: '爆葱花炒番茄出浓汁',
        sublabel: 'Sauté Tomato to Sauce',
        dependencies: [
          { sourceBlockId: 'b1', type: 'order', label: '同锅留底油' }
        ],
        ingredientIds: ['i1', 'i3'],
        stageIndex: 1,
        heatLevel: '中火',
        durationMinutes: 2,
        notes: '锅留底油爆香葱花，下番茄块大火炒出红润酸香浓汁'
      },
      {
        id: 'b3',
        label: '鸡蛋回锅加调味合炒',
        sublabel: 'Combine & Season',
        dependencies: [
          { sourceBlockId: 'b1', type: 'material', label: '滑散鸡蛋' },
          { sourceBlockId: 'b2', type: 'material', label: '番茄浓汁' }
        ],
        ingredientIds: ['i4'],
        stageIndex: 2,
        heatLevel: '中火',
        durationMinutes: 1,
        notes: '将盘中鸡蛋倒回锅中与番茄浓汁合炒，调入白糖与食盐大火翻炒均匀出锅'
      }
    ],
    finalBlock: {
      method: 'fry',
      label: '出锅装盘 🍳',
      durationText: '趁热享用',
      instructions: '番茄浓汁包裹金黄鸡蛋，酸甜可口，汤汁拌饭绝佳'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 13. 蒜烧五花肉 (炖)
  {
    id: 'cn-13-suan-shao-wuhuarou',
    version: '3.0',
    status: 'published',
    title: '🧄 蒜烧五花肉',
    description: '浓郁滋补炖菜。五花肉片大火煎出油脂，加入整头大蒜丁与味极鲜酱油慢炖收汁，大蒜消炎杀菌，肉质肥而不腻。',
    cuisine: 'chinese',
    difficulty: 'medium',
    prerequisites: {
      containerSize: '平底煎锅 / 炖锅',
      preheat: '准备卷心菜丝配餐',
      servings: '3-4 人份'
    },
    ingredients: [
      { id: 'i1', name: '五花肉片', amountText: '300 g', category: 'main' },
      { id: 'i2', name: '大蒜 (切丁)', amountText: '1 头', category: 'produce' },
      { id: 'i4', name: '特调蒜烧酱汁', amountText: '味极鲜25g + 料酒10g + 糖10g + 葱花', category: 'seasoning' },
      { id: 'i3', name: '卷心菜丝 (配餐)', amountText: '30 g', category: 'produce' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '肉片腌渍底味',
        sublabel: 'Marinate Pork',
        ingredientIds: ['i1', 'i2', 'i4'],
        stageIndex: 0,
        notes: '大蒜切丁，与调料搅拌匀腌渍肉片20分钟'
      },
      {
        id: 'b2',
        label: '煎至金黄与慢炖收汁',
        sublabel: 'Sear & Simmer Sauce',
        ingredientIds: ['i1', 'i2', 'i3', 'i4'],
        stageIndex: 1,
        heatLevel: '中火',
        durationMinutes: 15,
        notes: '肉片煎至两面金黄吸干多余油脂，倒入腌汁炖至收汁，摆卷心菜丝'
      }
    ],
    finalBlock: {
      method: 'stew',
      label: '蒜香浓郁 🧄',
      instructions: '大蒜软糯甜润，五花肉香浓入味'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 14. 猪肉炖粉条 (炖)
  {
    id: 'cn-14-zhurou-dun-fentiao',
    version: '3.0',
    status: 'draft',
    title: '🍲 经典东北猪肉炖粉条',
    description: '传统东北名菜。食材清单与基础做法源自张晔《蒸炖炒，营养师的健康食谱》（原著共2步工序、总耗时约35分钟）。【事实澄清与改编候选】：① 原著记载五花肉200g、红薯粉条100g、土豆100g、葱段5g、姜末5g、料酒10g、酱油10g（初版报告误作15g已纠正）、白糖10g（初版录入值，待核查原著是否为少许）、花椒若干（恢复原著未量化状态）；② 炖肉水为操作用水，使用“适量”表达，区别于焯水废弃水；③ 原著未加八角与食盐，八角1枚与食盐2~3g移为出锅调味改编候选记录，不默认指示用户加入；④ 锅内5步操作加收汁耗时共约52分钟（4m+3m+2m+25m+15m+3m），温水泡粉条30分钟为准备时间，不混入操作总耗时。',
    cuisine: 'chinese',
    difficulty: 'medium',
    prerequisites: {
      containerSize: '深口炖锅 / 砂锅',
      preheat: '红薯粉条提前温水泡软约30分钟（准备时间，不计入锅中操作耗时）',
      servings: '4-5 人份'
    },
    ingredients: [
      { id: 'i1', name: '带皮五花肉 (切厚块)', amountText: '200 g', category: 'main', note: '原著明确记载，冷水下锅焯透沥干，焯水倒弃不进入后序物料流' },
      { id: 'i2', name: '白糖 (炒糖色)', amountText: '10 g (来源未核实)', category: 'seasoning', note: '初版录入值10g，原著字样待核实是否为少许' },
      { id: 'i3', name: '植物油 (润锅底油)', amountText: '适量 (润锅估)', category: 'liquid', note: '原著未量化具体油脂克数，润锅慢炒糖色' },
      { id: 'i4', name: '生姜片', amountText: '5 g', category: 'produce', note: '原著明确记载（姜末5g），切片去腥提鲜' },
      { id: 'i5', name: '大葱段', amountText: '5 g', category: 'produce', note: '原著明确记载（葱段5g），增香炝锅' },
      { id: 'i6', name: '花椒', amountText: '若干 (原著未量化)', category: 'seasoning', note: '原著明确记载“花椒若干”，未标死克重' },
      { id: 'i8', name: '料酒 (去腥)', amountText: '10 g', category: 'liquid', note: '原著明确记载（料酒10g），炝锅烹入' },
      { id: 'i9', name: '生抽酱油 (负责底味)', amountText: '10 g (原著酱油调味估)', category: 'liquid', note: '原著明确记载酱油10g，负责基础咸鲜底味' },
      { id: 'i10', name: '老抽酱油 (负责调色)', amountText: '5 g (调色改编候选)', category: 'liquid', note: '红烧调色改编，原著未区分生抽老抽' },
      { id: 'i11', name: '温开水 (炖肉高汤)', amountText: '适量 (没过肉块)', category: 'liquid', note: '烹饪食用加水，需没过肉块并预留粉条吸水，原著未标注毫升数' },
      { id: 'i12', name: '红薯粉条 (提前泡软)', amountText: '100 g', category: 'grain', note: '原著明确记载，温水泡软备用' },
      { id: 'i13', name: '土豆 (切滚刀块)', amountText: '100 g', category: 'produce', note: '原著明确记载，去皮切滚刀块' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '冷水焯肉',
        sublabel: 'Blanch Pork',
        ingredientIds: ['i1'],
        stageIndex: 0,
        heatLevel: '大火',
        durationMinutes: 4,
        equipment: '焯水锅',
        outputItem: '焯透五花肉',
        completionState: '大火沸腾撇净浮沫，肉块断生捞出',
        note: '五花肉冷水下锅大火烧开撇沫，捞出温水洗净沥干 (焯水倒弃不进入后续物料流；时长4m为建模推断)'
      },
      {
        id: 'b2',
        label: '煸炒上色',
        sublabel: 'Caramelize & Brown',
        ingredientIds: ['i2', 'i3'],
        dependencies: [
          { sourceBlockId: 'b1', type: 'material', label: '焯透五花肉' }
        ],
        stageIndex: 1,
        heatLevel: '小火融糖转中火上色',
        durationMinutes: 3,
        equipment: '深口炖锅',
        outputItem: '糖色五花肉',
        completionState: '小火糖液起琥珀微泡，下肉转中火煸炒挂霜',
        note: '锅中倒油下白糖，先小火慢炒出微泡琥珀色，下入焯好肉块转中火翻炒上色微煸出油 (时长3m为建模推断)'
      },
      {
        id: 'b3',
        label: '炝锅加汤',
        sublabel: 'Aromatics & Broth',
        ingredientIds: ['i4', 'i5', 'i6', 'i8', 'i9', 'i10', 'i11'],
        dependencies: [
          { sourceBlockId: 'b2', type: 'material', label: '糖色五花肉' }
        ],
        stageIndex: 2,
        heatLevel: '中火爆香转大火烧沸',
        durationMinutes: 2,
        equipment: '深口炖锅',
        outputItem: '浓醇炖肉汤底',
        completionState: '中火爆出香气，冲入开水转大火烧沸',
        note: '中火下葱姜花椒爆出香气，淋生抽老抽料酒，冲入开水转大火烧沸 (时长2m为建模推断)'
      },
      {
        id: 'b4',
        label: '慢火焖炖',
        sublabel: 'Simmer Pork',
        ingredientIds: [],
        dependencies: [
          { sourceBlockId: 'b3', type: 'material', label: '浓醇炖肉汤底' }
        ],
        stageIndex: 3,
        heatLevel: '小火',
        durationMinutes: 25,
        equipment: '深口炖锅',
        outputItem: '酥软五花肉',
        completionState: '盖盖小火慢煨，肉酥汤浓红亮',
        note: '盖上锅盖转小火慢炖 25 分钟，让五花肉酥软透味 (原著统称炖熟，时长25m为推断)'
      },
      {
        id: 'b5',
        label: '汇入同炖',
        sublabel: 'Stew with Noodles & Potato',
        ingredientIds: ['i12', 'i13'],
        dependencies: [
          { sourceBlockId: 'b4', type: 'material', label: '酥软五花肉' }
        ],
        stageIndex: 4,
        heatLevel: '小火',
        durationMinutes: 15,
        equipment: '深口炖锅',
        outputItem: '炖透粉条五花肉',
        completionState: '粉条滑爽透亮，土豆软糯粉甜',
        note: '加入土豆块与泡软粉条轻推入浓汤，小火慢炖 15 分钟至粉条透亮、土豆粉糯 (时长15m为推断；出锅前可依个人咸淡尝味自选补盐)'
      }
    ],
    finalBlock: {
      method: 'stew',
      label: '大火收汁装盘 🍲',
      durationText: '收汁约3m / 操作耗时约52m (估)',
      instructions: '开大火收浓汤汁至挂勺裹料，盛入砂锅大碗趁热享用。粉条滑爽透亮吸饱肉汤，土豆软糯粉甜，五花肉酥烂不腻。'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-09-15T00:00:00Z'
  },

  // 15. 杏鲍菇牛肉粒 (炒)
  {
    id: 'cn-15-xingbaogu-niurouli',
    version: '3.0',
    status: 'published',
    title: '🥩 黑椒杏鲍菇牛肉粒',
    description: '高蛋白低脂养生炒菜。杏鲍菇方块小火慢煎至四面金黄，牛肉粒大火快炒断生，黑胡椒末提香，补充体力。',
    cuisine: 'chinese',
    difficulty: 'medium',
    prerequisites: {
      containerSize: '平底炒锅',
      preheat: '牛肉洗净血水切方块',
      servings: '2-3 人份'
    },
    ingredients: [
      { id: 'i2', name: '杏鲍菇方块', amountText: '100 g', category: 'produce' },
      { id: 'i1', name: '牛肉方块', amountText: '200 g', category: 'main' },
      { id: 'i3', name: '老抽与白糖食盐', amountText: '老抽+白糖+盐', category: 'seasoning' },
      { id: 'i4', name: '现磨黑胡椒末', amountText: '适量', category: 'seasoning' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '小火煎香杏鲍菇',
        sublabel: 'Sear Mushroom Cubes',
        ingredientIds: ['i2'],
        stageIndex: 0,
        heatLevel: '中火',
        durationMinutes: 5,
        notes: '杏鲍菇块分批入锅小火慢煎至四面金黄盛出'
      },
      {
        id: 'b2',
        label: '大火炒牛肉粒合炒',
        sublabel: 'Flash Fry Beef Cubes',
        ingredientIds: ['i1', 'i2', 'i3', 'i4'],
        stageIndex: 1,
        heatLevel: '大火',
        durationMinutes: 3,
        notes: '牛肉粒速炒断生倒杏鲍菇，调老抽白糖盐，撒黑胡椒出锅'
      }
    ],
    finalBlock: {
      method: 'fry',
      label: '黑椒鲜香 🥩',
      instructions: '杏鲍菇爽脆如鲍鱼，牛肉粒嫩滑鲜香'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 16. 金针肥牛 (炒)
  {
    id: 'cn-16-jinzhen-feiniu',
    version: '3.0',
    status: 'published',
    title: '🍲 酸辣金针肥牛',
    description: '经典开胃快手菜。金针菇氨基酸丰富，搭配薄切肥牛片与高汤红尖椒大火翻炒，勾芡出锅，增强免疫力。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '炒锅 / 浅煲',
      preheat: '准备高汤与红尖椒碎',
      servings: '3-4 人份'
    },
    ingredients: [
      { id: 'i1', name: '薄切肥牛片', amountText: '400 g', category: 'main' },
      { id: 'i3', name: '红尖椒碎', amountText: '15 g', category: 'produce' },
      { id: 'i4', name: '高汤与水淀粉', amountText: '高汤50g + 水淀粉20g', category: 'liquid' },
      { id: 'i5', name: '食盐与鸡精', amountText: '盐4g + 鸡精', category: 'seasoning' },
      { id: 'i2', name: '金针菇 (去根洗净)', amountText: '150 g', category: 'produce' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '肥牛上浆与爆香尖椒',
        sublabel: 'Marinate & Saute Chili',
        ingredientIds: ['i1', 'i3', 'i4', 'i5'],
        stageIndex: 0,
        heatLevel: '中火',
        durationMinutes: 2,
        notes: '肥牛肉片水淀粉盐抓匀，油爆红尖椒碎'
      },
      {
        id: 'b2',
        label: '加高汤肥牛金针菇合炒',
        sublabel: 'Stir-Fry Beef & Mushroom',
        ingredientIds: ['i1', 'i2', 'i4', 'i5'],
        stageIndex: 1,
        heatLevel: '大火',
        durationMinutes: 3,
        notes: '加高汤肥牛金针菇炒至将熟，调盐鸡精勾芡'
      }
    ],
    finalBlock: {
      method: 'fry',
      label: '酸辣鲜嫩 🍲',
      instructions: '肥牛鲜嫩不柴，金针菇吸满浓郁酸辣汤汁'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 17. 白萝卜羊肉卷 (蒸)
  {
    id: 'cn-17-bailuobo-yangroujuan',
    version: '3.0',
    status: 'published',
    title: '🐑 蒜香白萝卜羊肉卷',
    description: '中和温热的清淡蒸菜。白萝卜薄片焯软包裹腌渍羊肉末，牙签穿插固定大火蒸15分钟，去膻解腻。',
    cuisine: 'chinese',
    difficulty: 'medium',
    prerequisites: {
      containerSize: '平底蒸盘 & 蒸锅',
      preheat: '准备干净牙签固定',
      servings: '2 人份'
    },
    ingredients: [
      { id: 'i1', name: '新鲜羊肉末', amountText: '50 g', category: 'main' },
      { id: 'i2', name: '白萝卜 (切薄片焯软)', amountText: '100 g', category: 'produce' },
      { id: 'i3', name: '姜末与蒜末', amountText: '姜末3g + 蒜末3g', category: 'produce' },
      { id: 'i4', name: '食盐与酱油', amountText: '盐2g + 酱油', category: 'seasoning' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '羊肉末腌渍与卷片',
        sublabel: 'Season Meat & Roll',
        ingredientIds: ['i1', 'i2', 'i3', 'i4'],
        stageIndex: 0,
        notes: '羊肉末加姜蒜酱油盐搅匀腌15分钟，包入白萝卜片牙签固定'
      },
      {
        id: 'b2',
        label: '大火蒸制15分钟',
        sublabel: 'Steam 15 Mins',
        ingredientIds: ['i1', 'i2'],
        stageIndex: 1,
        heatLevel: '大火',
        durationMinutes: 15,
        notes: '盛盘放沸水蒸锅蒸 15 分钟即可'
      }
    ],
    finalBlock: {
      method: 'steam',
      label: '清甜去膻 🐑',
      instructions: '白萝卜清甜中和羊肉温热，汤汁鲜美'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 18. 羊肉炖胡萝卜 (炖)
  {
    id: 'cn-18-yangrou-dun-hulabu',
    version: '3.0',
    status: 'published',
    title: '🍲 枸杞羊肉炖胡萝卜煲',
    description: '秋冬祛寒补暖经典炖汤。羊肉块与胡萝卜大块、枸杞子在调料钢球香料中慢炖1小时，补气血强骨骼。',
    cuisine: 'chinese',
    difficulty: 'medium',
    prerequisites: {
      containerSize: '砂锅 / 炖汤锅',
      preheat: '准备调料钢球 (大料花椒桂皮香叶)',
      servings: '4-5 人份'
    },
    ingredients: [
      { id: 'i1', name: '鲜羊肉块', amountText: '150 g', category: 'main' },
      { id: 'i5', name: '葱段姜片料酒酱油盐', amountText: '葱姜+料酒+酱油+盐', category: 'seasoning' },
      { id: 'i2', name: '胡萝卜 (大块)', amountText: '200 g', category: 'produce' },
      { id: 'i3', name: '枸杞子', amountText: '10 g', category: 'produce' },
      { id: 'i4', name: '调料钢球香料组', amountText: '大料+花椒+桂皮+小茴香+香叶', category: 'seasoning' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '羊肉冷水下锅撇血沫',
        sublabel: 'Skim Mutton Broth',
        ingredientIds: ['i1', 'i5'],
        stageIndex: 0,
        heatLevel: '大火',
        durationMinutes: 5,
        notes: '羊肉冷水下锅烧开撇净血沫，下葱姜料酒酱油钢球'
      },
      {
        id: 'b2',
        label: '加胡萝卜枸杞慢炖',
        sublabel: 'Simmer 60 Mins',
        ingredientIds: ['i1', 'i2', 'i3', 'i4', 'i5'],
        stageIndex: 1,
        heatLevel: '小火',
        durationMinutes: 60,
        notes: '加胡萝卜大块与枸杞子，小火慢炖 1 小时放盐调味'
      }
    ],
    finalBlock: {
      method: 'stew',
      label: '暖胃滋补 🍲',
      instructions: '羊肉酥烂无膻味，胡萝卜甜润汤浓'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 19. 板栗烧鸡 (炖)
  {
    id: 'cn-19-banli-shaoji',
    version: '3.0',
    status: 'published',
    title: '🍗 经典板栗烧土鸡',
    description: '强筋健骨传统炖菜。土鸡块煸干水分，搭配香菇与去壳板栗慢炖收汁，板栗粉甜，鸡肉鲜香。',
    cuisine: 'chinese',
    difficulty: 'medium',
    prerequisites: {
      containerSize: '铸铁炖锅 / 炒锅',
      preheat: '干香菇泡发，挽葱结',
      servings: '4-5 人份'
    },
    ingredients: [
      { id: 'i1', name: '土鸡块', amountText: '半只 (约500g)', category: 'main' },
      { id: 'i3', name: '干香菇 (泡发)', amountText: '10 朵', category: 'produce' },
      { id: 'i4', name: '老抽与料酒蚝油', amountText: '老抽15g + 料酒15g + 蚝油15g', category: 'liquid' },
      { id: 'i5', name: '葱姜蒜与白糖食盐', amountText: '葱蒜+糖5g + 盐5g', category: 'seasoning' },
      { id: 'i2', name: '去壳板栗肉', amountText: '400 g', category: 'produce' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '煸炒鸡块干水分',
        sublabel: 'Sear Chicken',
        ingredientIds: ['i1'],
        stageIndex: 0,
        heatLevel: '中大火',
        durationMinutes: 5,
        notes: '少油煸炒鸡块直至干水分无血水'
      },
      {
        id: 'b2',
        label: '加香菇大火烧开慢炖',
        sublabel: 'Stew Chicken & Mushroom',
        ingredientIds: ['i1', 'i3', 'i4', 'i5'],
        stageIndex: 1,
        heatLevel: '小火',
        durationMinutes: 30,
        notes: '放姜蒜糖料酒老抽翻匀，放香菇倒入开水与葱结慢炖'
      },
      {
        id: 'b3',
        label: '加入板栗收汁',
        sublabel: 'Add Chestnuts & Reduce',
        ingredientIds: ['i1', 'i2', 'i4', 'i5'],
        stageIndex: 2,
        heatLevel: '中火',
        durationMinutes: 20,
        notes: '加入板栗盖盖炖 20 分钟，调蚝油盐大火收汁撒葱段'
      }
    ],
    finalBlock: {
      method: 'stew',
      label: '栗香肉软 🍗',
      instructions: '板栗粉糯吸收鸡汤，鸡肉浓香软烂'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 20. 板栗鸡丁 (炒)
  {
    id: 'cn-20-banli-jiding',
    version: '3.0',
    status: 'published',
    title: '🍗 酱香板栗炒鸡丁',
    description: '益气补肾快手炒菜。鸡腿肉丁腌渍后快速翻炒，加入对半切开的熟板栗块与蚝油大火爆炒，口感丰富。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '平底炒锅',
      preheat: '板栗提前煮熟对切',
      servings: '2-3 人份'
    },
    ingredients: [
      { id: 'i1', name: '鸡腿肉丁', amountText: '200 g', category: 'main' },
      { id: 'i3', name: '酱油与蚝油', category: 'liquid', note: '原始数据未提供各项用量，待来源核对' },
      { id: 'i4', name: '姜末与蒜末食盐', amountText: '姜末+蒜末+盐3g', category: 'seasoning' },
      { id: 'i2', name: '熟板栗 (对切)', amountText: '200 g', category: 'produce' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '腌渍鸡丁入味',
        sublabel: 'Marinate Chicken',
        ingredientIds: ['i1', 'i3', 'i4'],
        stageIndex: 0,
        notes: '鸡腿肉丁加姜末蒜末、盐3g、酱油与蚝油抓拌均匀腌制入味'
      },
      {
        id: 'b2',
        label: '滑炒鸡丁变色',
        sublabel: 'Sear Chicken',
        ingredientIds: [],
        dependencies: [{ sourceBlockId: 'b1', type: 'material' }],
        stageIndex: 1,
        heatLevel: '中大火',
        durationMinutes: 2,
        notes: '锅中热油，倒入腌好的鸡丁快速滑散翻炒至肉色发白'
      },
      {
        id: 'b3',
        label: '下熟板栗合炒',
        sublabel: 'Stir-Fry Chestnuts',
        ingredientIds: ['i2'],
        dependencies: [{ sourceBlockId: 'b2', type: 'material' }],
        stageIndex: 2,
        heatLevel: '大火',
        durationMinutes: 3,
        notes: '倒入对半切开的熟板栗块，与鸡丁一同大火翻炒至熟透裹汁'
      }
    ],
    finalBlock: {
      method: 'fry',
      label: '出锅装盘 🍗',
      instructions: '出锅装盘趁热享用。鸡丁鲜嫩多汁，板栗甜软粉香'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 21. 豆渣蒸蛋 (蒸)
  {
    id: 'cn-21-douzha-zhengdan',
    version: '3.0',
    status: 'published',
    title: '🥚 高纤维豆渣水蒸蛋',
    description: '高蛋白高纤维健康蒸蛋。利用豆浆机打完豆浆后的豆渣，与鸡蛋液温水混合中火蒸10分钟，淋香油，降胆固醇。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '蒸碗 & 蒸锅',
      preheat: '豆渣沥干水分',
      servings: '2 人份'
    },
    ingredients: [
      { id: 'i1', name: '豆浆过滤豆渣 (沥干)', amountText: '50 g', category: 'produce' },
      { id: 'i2', name: '新鲜鸡蛋', amountText: '2 颗', category: 'main' },
      { id: 'i3', name: '温水与食盐', amountText: '温水适量 + 盐2g', category: 'liquid' },
      { id: 'i4', name: '葱花与芝麻香油', amountText: '葱花+香油', category: 'seasoning' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '打散鸡蛋混入豆渣',
        sublabel: 'Whisk Egg & Soy Residue',
        ingredientIds: ['i1', 'i2', 'i3', 'i4'],
        stageIndex: 0,
        notes: '鸡蛋加盐打散，倒入温水与沥干豆渣搅匀撒葱花'
      },
      {
        id: 'b2',
        label: '中火蒸10分钟',
        sublabel: 'Steam 10 Mins',
        ingredientIds: ['i1', 'i2'],
        stageIndex: 1,
        heatLevel: '中火',
        durationMinutes: 10,
        notes: '入开水蒸锅，中火蒸10分钟取出淋香油'
      }
    ],
    finalBlock: {
      method: 'steam',
      label: '松软滑嫩 🥚',
      instructions: '豆香与蛋香交融，口感细腻且富含膳食纤维'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 22. 地三鲜 (炒)
  {
    id: 'cn-22-disanxian',
    version: '3.0',
    status: 'published',
    title: '🍆 经典东北地三鲜',
    description: '传统东北名菜。茄子块、土豆块与柿子椒片分别过油后大火合炒，老抽水淀粉勾芡，降血压、开胃消食。',
    cuisine: 'chinese',
    difficulty: 'medium',
    prerequisites: {
      containerSize: '中式炒锅',
      preheat: '准备水淀粉勾芡',
      servings: '3-4 人份'
    },
    ingredients: [
      { id: 'i1', name: '茄子块 (过油)', amountText: '200 g', category: 'produce' },
      { id: 'i2', name: '土豆块 (炸黄)', amountText: '200 g', category: 'produce' },
      { id: 'i3', name: '柿子椒片 (稍过油)', amountText: '100 g', category: 'produce' },
      { id: 'i4', name: '蒜末与葱末', amountText: '蒜末5g + 葱末3g', category: 'produce' },
      { id: 'i5', name: '老抽与水淀粉', amountText: '老抽8g + 水淀粉10g', category: 'liquid' },
      { id: 'i6', name: '白糖与食盐', amountText: '糖3g + 盐3g', category: 'seasoning' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '食材分别过油',
        sublabel: 'Flash Fry Veggies',
        ingredientIds: ['i1', 'i2', 'i3'],
        stageIndex: 0,
        heatLevel: '大火',
        durationMinutes: 4,
        notes: '茄子炸软、土豆炸黄、柿子椒片稍过油捞出'
      },
      {
        id: 'b2',
        label: '爆香蒜末焖烧勾芡',
        sublabel: 'Saute & Braise & Glaze',
        ingredientIds: ['i1', 'i2', 'i3', 'i4', 'i5', 'i6'],
        stageIndex: 1,
        heatLevel: '中火',
        durationMinutes: 5,
        notes: '留底油炒香蒜末放茄子土豆倒老抽加盖烧5分钟，倒柿子椒加糖盐水淀粉勾芡撒葱花'
      }
    ],
    finalBlock: {
      method: 'fry',
      label: '咸香浓郁 🍆',
      instructions: '土豆面软，茄子吸香，柿子椒清脆'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 23. 秘制番茄酱 (炖)
  {
    id: 'cn-23-mizhi-fanqiejiang',
    version: '3.0',
    status: 'published',
    title: '🥫 纯手工秘制番茄酱',
    description: '天然零添加养生甜酱。鲜番茄去皮榨汁，加冰糖小火慢熬至浓稠，挤入新鲜柠檬汁，番茄红素充分释放易吸收。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '不粘平底锅 / 酱锅',
      preheat: '准备干净密封玻璃瓶',
      servings: '1 罐 (约250g)'
    },
    ingredients: [
      { id: 'i1', name: '新鲜红番茄 (烫去皮)', amountText: '2 颗', category: 'produce' },
      { id: 'i2', name: '冰糖', amountText: '50 g', category: 'seasoning' },
      { id: 'i3', name: '新鲜柠檬汁', amountText: '50 g (半颗柠檬)', category: 'produce' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '烫皮榨汁',
        sublabel: 'Scald & Puree',
        ingredientIds: ['i1'],
        stageIndex: 0,
        notes: '番茄开水烫去皮切块，入榨汁机打成细腻番茄汁'
      },
      {
        id: 'b2',
        label: '加冰糖小火慢熬',
        sublabel: 'Simmer Sauce & Lemon',
        ingredientIds: ['i1', 'i2', 'i3'],
        stageIndex: 1,
        heatLevel: '小火',
        durationMinutes: 10,
        notes: '番茄汁倒入锅中加冰糖煮开，小火熬至浓稠，挤入柠檬汁熬3-4分钟装瓶密封'
      }
    ],
    finalBlock: {
      method: 'stew',
      label: '酸甜浓郁 🥫',
      instructions: '天然无防腐剂，色泽红亮，番茄红素极易吸收'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 24. 减脂番茄豆腐羹 (炖)
  {
    id: 'cn-24-jianzhi-fanqie-doufugeng',
    version: '3.0',
    status: 'published',
    title: '🥣 减脂番茄内酯豆腐羹',
    description: '低卡排毒健康羹汤。番茄炒出浓酸汁加水炖煮，手捏内酯豆腐与滑嫩蛋花合煮，清爽开胃，减脂期极佳。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '中号汤锅',
      preheat: '番茄切块，内酯豆腐手捏小块，鸡蛋打散',
      servings: '2-3 人份'
    },
    ingredients: [
      { id: 'i1', name: '新鲜红番茄 (切块)', amountText: '2 颗', category: 'produce' },
      { id: 'i4', name: '葱末 (炝锅)', amountText: '10 g', category: 'produce' },
      { id: 'i5', name: '植物油与食盐', amountText: '油10g + 盐适量', category: 'seasoning' },
      { id: 'i2', name: '内酯豆腐 (手捏小块)', amountText: '1 盒', category: 'produce' },
      { id: 'i3', name: '鸡蛋液 (打散)', amountText: '2 颗', category: 'main' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '爆香炒汁',
        sublabel: 'Sauté',
        ingredientIds: ['i1', 'i4', 'i5'],
        stageIndex: 0,
        heatLevel: '中火',
        durationMinutes: 5,
        notes: '油热爆葱末下番茄炒出红油浓汁，加水大火烧开，产生开水番茄汤底'
      },
      {
        id: 'b2',
        label: '合煮蛋花',
        sublabel: 'Egg Drop',
        dependencies: [
          { sourceBlockId: 'b1', type: 'material', label: '开水番茄汤底' }
        ],
        ingredientIds: ['i2', 'i3'],
        stageIndex: 1,
        heatLevel: '小火',
        durationMinutes: 5,
        notes: '捏入豆腐块大火烧开，关火沿锅边转圈倒蛋液盖盖焖5分钟'
      }
    ],
    finalBlock: {
      method: 'stew',
      label: '出锅装盘',
      durationText: '趁热享用',
      instructions: '豆腐入口即化，蛋花絮状绵密，汤酸甜开胃'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-09-14T10:00:00Z'
  },

  // 25. 萝卜丝蒸牛肉 (蒸)
  {
    id: 'cn-25-luobosi-zheng-niurou',
    version: '3.0',
    status: 'published',
    title: '🥩 辣椒粉萝卜丝蒸牛肉',
    description: '强筋健骨气血双补蒸菜。牛肉丝腌渍后与挤干白萝卜丝、米粉、辣椒粉拌匀，蒸锅大火蒸30分钟反扣泼茶油。',
    cuisine: 'chinese',
    difficulty: 'medium',
    prerequisites: {
      containerSize: '蒸盘 & 屉布 & 浅口深口双碗',
      preheat: '准备烧热茶油泼香',
      servings: '3-4 人份'
    },
    ingredients: [
      { id: 'i1', name: '牛肉丝 (腌渍)', amountText: '200 g', category: 'main' },
      { id: 'i2', name: '白萝卜丝 (盐腌挤汁)', amountText: '300 g', category: 'produce' },
      { id: 'i3', name: '米粉与辣椒粉', category: 'grain', note: '原始数据未提供各项用量，待来源核对' },
      { id: 'i4', name: '黄酒老抽生抽白糖', amountText: '黄酒+老抽+生抽+糖', category: 'liquid' },
      { id: 'i5', name: '姜蒜末与葱花鸡精', category: 'seasoning', note: '原始数据未提供各项用量，待来源核对' },
      { id: 'i6', name: '茶油 (热油泼香)', amountText: '2 汤匙', category: 'liquid' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '牛肉腌渍与萝卜丝拌米粉',
        sublabel: 'Season Beef & Mix Rice Flour',
        ingredientIds: ['i1', 'i2', 'i3', 'i4', 'i5', 'i6'],
        stageIndex: 0,
        notes: '牛肉丝用生抽老抽黄酒糖胡椒茶油腌20分钟，萝卜丝盐腌挤汁，加牛肉姜蒜米粉辣椒粉拌匀'
      },
      {
        id: 'b2',
        label: '顺内壁围圈蒸30分钟',
        sublabel: 'Steam 30 Mins',
        ingredientIds: ['i1', 'i2', 'i3'],
        stageIndex: 1,
        heatLevel: '大火',
        durationMinutes: 30,
        notes: '顺蒸锅内壁围一圈盖屉布，水沸蒸30分钟'
      },
      {
        id: 'b3',
        label: '反扣深碗泼热茶油',
        sublabel: 'Unmold & Hot Oil Splash',
        ingredientIds: ['i1', 'i5', 'i6'],
        stageIndex: 2,
        notes: '倒深碗反扣浅盘成球形，撒葱花鸡精，泼热茶油'
      }
    ],
    finalBlock: {
      method: 'steam',
      label: '辣香干爽 🥩',
      instructions: '萝卜丝吸收牛肉鲜汁，米粉香辣可口'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 26. 冬瓜薏米排骨汤 (炖)
  {
    id: 'cn-26-donggua-yimi-paigutang',
    version: '3.0',
    status: 'published',
    title: '🍲 冬瓜薏米排骨清润汤',
    description: '祛湿消肿经典中式高汤。焯水排骨与泡发薏米小火慢炖1小时，下冬瓜块续炖20分钟，高钾低钠润肤美容。',
    cuisine: 'chinese',
    difficulty: 'medium',
    prerequisites: {
      containerSize: '大号砂锅',
      preheat: '薏米提前泡一晚，排骨焯水',
      servings: '4-5 人份'
    },
    ingredients: [
      { id: 'i1', name: '猪排骨段 (焯水)', amountText: '500 g', category: 'main' },
      { id: 'i3', name: '薏米 (泡一晚)', amountText: '50 g', category: 'grain' },
      { id: 'i4', name: '葱段姜片蒜瓣料酒', amountText: '葱姜蒜+料酒50g', category: 'seasoning' },
      { id: 'i2', name: '带皮冬瓜块', amountText: '500 g', category: 'produce' },
      { id: 'i5', name: '食盐', amountText: '5 g', category: 'seasoning' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '排骨焯水与砂锅慢炖',
        sublabel: 'Blanch & Simmer Ribs',
        ingredientIds: ['i1', 'i3', 'i4'],
        stageIndex: 0,
        heatLevel: '小火',
        durationMinutes: 60,
        notes: '排骨焯水去血沫，砂锅加排骨薏米葱姜蒜料酒水，大火烧开转小火炖1小时'
      },
      {
        id: 'b2',
        label: '下冬瓜块续炖20分钟',
        sublabel: 'Add Winter Melon',
        ingredientIds: ['i1', 'i2', 'i5'],
        stageIndex: 1,
        heatLevel: '小火',
        durationMinutes: 20,
        notes: '下冬瓜块大火烧开加盐，转小火慢炖20分钟关火'
      }
    ],
    finalBlock: {
      method: 'stew',
      label: '清甜祛湿 🍲',
      instructions: '汤清不油腻，冬瓜软烂，薏米祛湿消肿'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 27. 红枣百合蒸南瓜 (蒸)
  {
    id: 'cn-27-hongzao-baihe-zheng-nangua',
    version: '3.0',
    status: 'published',
    title: '🎃 蜂蜜红枣百合蒸南瓜',
    description: '养颜排毒甜品蒸菜。老南瓜挖出南瓜碗，填入去核红枣与鲜百合中火蒸20分钟，切开淋蜂蜜汁，补脾益气。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '蒸盘 & 蒸锅',
      preheat: '鲜百合剥开洗净',
      servings: '3-4 人份'
    },
    ingredients: [
      { id: 'i1', name: '老南瓜 (做南瓜碗)', amountText: '700 g', category: 'produce' },
      { id: 'i2', name: '去核红枣', amountText: '40 g', category: 'produce' },
      { id: 'i3', name: '鲜百合 (剥开)', amountText: '40 g', category: 'produce' },
      { id: 'i4', name: '纯蜂蜜', amountText: '20 g', category: 'liquid' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '制作南瓜碗与填料',
        sublabel: 'Prep Pumpkin Bowl',
        ingredientIds: ['i1', 'i2', 'i3'],
        stageIndex: 0,
        notes: '南瓜挖子去皮做成南瓜碗，装入去核红枣与鲜百合'
      },
      {
        id: 'b2',
        label: '中火蒸20分钟淋蜂蜜',
        sublabel: 'Steam & Honey Drizzle',
        ingredientIds: ['i1', 'i4'],
        stageIndex: 1,
        heatLevel: '中火',
        durationMinutes: 20,
        notes: '南瓜碗入开水蒸锅中火蒸20分钟，倒出汁水与蜂蜜拌匀，切开南瓜淋上'
      }
    ],
    finalBlock: {
      method: 'steam',
      label: '香甜粉糯 🎃',
      instructions: '南瓜甜软粉糯，百合清香，红枣补气血'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 28. 黄瓜炒甜椒 (炒)
  {
    id: 'cn-28-huanggua-chao-tianjiao',
    version: '3.0',
    status: 'published',
    title: '🥒 双色甜椒炒黄瓜',
    description: '减脂抗衰老清脆快手菜。黄瓜片与红黄双色甜椒片大火快炒3分钟，富含维生素E与辣椒素，解热镇痛。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '平底炒锅',
      preheat: '黄瓜与彩椒切片',
      servings: '2 人份'
    },
    ingredients: [
      { id: 'i1', name: '黄瓜片', amountText: '250 g', category: 'produce' },
      { id: 'i2', name: '红甜椒片', amountText: '50 g', category: 'produce' },
      { id: 'i3', name: '黄甜椒片', amountText: '50 g', category: 'produce' },
      { id: 'i4', name: '葱花与食盐鸡精', amountText: '葱花5g + 盐2g + 鸡精1g', category: 'seasoning' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '爆香葱花大火快炒',
        sublabel: 'Fast Stir-Fry 3 Mins',
        ingredientIds: ['i1', 'i2', 'i3', 'i4'],
        stageIndex: 0,
        heatLevel: '大火',
        durationMinutes: 3,
        notes: '油六成热爆葱花，倒红黄甜椒片与黄瓜片大火翻炒3分钟加盐鸡精'
      }
    ],
    finalBlock: {
      method: 'fry',
      label: '清脆爽口 🥒',
      instructions: '色彩绚丽清脆多汁，低热量无负担'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 29. 苦瓜冬菇骨汤 (炖)
  {
    id: 'cn-29-kugua-donggu-gutang',
    version: '3.0',
    status: 'published',
    title: '🥣 苦瓜冬菇黄豆山药排骨汤',
    description: '防病毒降血糖养生浓汤。排骨炖40分钟后加入苦瓜、泡发冬菇、黄豆与山药续炖40分钟，清热解毒。',
    cuisine: 'chinese',
    difficulty: 'medium',
    prerequisites: {
      containerSize: '煲锅 / 大砂锅',
      preheat: '黄豆浸泡 3 小时，冬菇泡发',
      servings: '4-5 人份'
    },
    ingredients: [
      { id: 'i1', name: '排骨块 (清洗去血水)', amountText: '200 g', category: 'main' },
      { id: 'i2', name: '苦瓜块 (去瓤)', amountText: '200 g', category: 'produce' },
      { id: 'i3', name: '水发冬菇', amountText: '100 g', category: 'produce' },
      { id: 'i4', name: '山药块与浸泡黄豆', amountText: '山药20g + 黄豆20g', category: 'produce' },
      { id: 'i5', name: '姜片蒜瓣香菜盐', amountText: '姜蒜+香菜+盐', category: 'seasoning' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '排骨炖煮40分钟',
        sublabel: 'Simmer Ribs 40 Mins',
        ingredientIds: ['i1'],
        stageIndex: 0,
        heatLevel: '小火',
        durationMinutes: 40,
        notes: '煲锅放水烧开，入排骨大火煮沸转小火炖40分钟'
      },
      {
        id: 'b2',
        label: '加入苦瓜冬菇黄豆山药',
        sublabel: 'Add Veggies & Mushrooms',
        ingredientIds: ['i1', 'i2', 'i3', 'i4', 'i5'],
        stageIndex: 1,
        heatLevel: '小火',
        durationMinutes: 40,
        notes: '放入苦瓜、冬菇、姜蒜、黄豆、山药与盐，小火炖40分钟撒香菜'
      }
    ],
    finalBlock: {
      method: 'stew',
      label: '甘苦回甜 🥣',
      instructions: '苦瓜苦味被排骨与冬菇稀释，汤甘甜回味'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 30. 苦瓜蒸咸蛋 (蒸)
  {
    id: 'cn-30-kugua-zheng-xiandan',
    version: '3.0',
    status: 'published',
    title: '🥚 咸蛋黄酿苦瓜圈',
    description: '创意清热蒸菜。苦瓜切厚圈抠孔，填入熟咸鸭蛋黄与蚝油拌成的金黄馅料，蒸10分钟淋水淀粉芡汁。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '平底蒸盘 & 蒸锅',
      preheat: '咸鸭蛋提前蒸熟取黄',
      servings: '2 人份'
    },
    ingredients: [
      { id: 'i1', name: '苦瓜 (切厚圈抠孔)', amountText: '200 g', category: 'produce' },
      { id: 'i2', name: '熟咸鸭蛋黄 (碾碎)', amountText: '1 颗', category: 'main' },
      { id: 'i3', name: '蚝油与香油', amountText: '蚝油10g + 香油4g', category: 'liquid' },
      { id: 'i4', name: '盐与鸡粉水淀粉葱花', amountText: '盐2g + 鸡粉2g + 水淀粉 + 葱花', category: 'seasoning' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '咸蛋黄拌蚝油填入苦瓜',
        sublabel: 'Stuff Egg Yolk in Bitter Gourd',
        ingredientIds: ['i1', 'i2', 'i3'],
        stageIndex: 0,
        notes: '咸蛋黄末加蚝油蒜末拌匀，填入苦瓜圈孔中摆盘'
      },
      {
        id: 'b2',
        label: '蒸10分钟与淋芡汁',
        sublabel: 'Steam & Glaze Sauce',
        ingredientIds: ['i1', 'i4'],
        stageIndex: 1,
        heatLevel: '中火',
        durationMinutes: 10,
        notes: '入蒸锅蒸10分钟取出，水淀粉香油鸡粉盐调制芡汁浇上撒葱花'
      }
    ],
    finalBlock: {
      method: 'steam',
      label: '咸香甘苦 🥚',
      instructions: '咸蛋黄沙软咸香，苦瓜甘凉脆嫩'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 31. 苦瓜肉片 (炒)
  {
    id: 'cn-31-kugua-roupian',
    version: '3.0',
    status: 'published',
    title: '🥩 豆豉苦瓜炒牛肉片',
    description: '开胃促进铁吸收家常炒菜。牛肉片腌渍划散，苦瓜片盐腌挤水，搭配豆豉蒜末大火快炒，平稳血糖。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '中式炒锅',
      preheat: '苦瓜去瓤切片用盐腌10分钟',
      servings: '3 人份'
    },
    ingredients: [
      { id: 'i1', name: '牛肉片 (腌渍)', amountText: '250 g', category: 'main' },
      { id: 'i4', name: '料酒酱油胡椒粉水淀粉', category: 'liquid', note: '原始数据未提供各项用量，待来源核对' },
      { id: 'i2', name: '苦瓜片 (挤水分)', amountText: '200 g', category: 'produce' },
      { id: 'i3', name: '豆豉与蒜末姜末', amountText: '豆豉15g + 蒜末5g + 姜末5g', category: 'seasoning' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '牛肉片划散炒变色',
        sublabel: 'Sear Beef Slices',
        ingredientIds: ['i1', 'i4'],
        stageIndex: 0,
        heatLevel: '大火',
        durationMinutes: 2,
        notes: '牛肉片加料酒酱油胡椒粉水淀粉腌片刻，热油炒变色盛出'
      },
      {
        id: 'b2',
        label: '爆香豆豉与倒苦瓜牛肉',
        sublabel: 'Saute Douchi & Bitter Gourd',
        ingredientIds: ['i1', 'i2', 'i3'],
        stageIndex: 1,
        heatLevel: '大火',
        durationMinutes: 3,
        notes: '爆姜蒜豆豉倒苦瓜炒，倒入牛肉片翻炒熟即可'
      }
    ],
    finalBlock: {
      method: 'fry',
      label: '豉香鲜爽 🥩',
      instructions: '豆豉咸香掩盖苦味，牛肉鲜嫩'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 32. 翡翠丝瓜卷 (蒸)
  {
    id: 'cn-32-feicui-siguajuan',
    version: '3.0',
    status: 'published',
    title: '🐟 翡翠丝瓜黑鱼蓉卷',
    description: '养颜护肤精致粤式蒸菜。丝瓜大片焯软抹蛋清淀粉，裹入打发鲜黑鱼蓉卷起，大火蒸10分钟扣盘。',
    cuisine: 'chinese',
    difficulty: 'hard',
    prerequisites: {
      containerSize: '平底蒸盘 & 蒸锅',
      preheat: '黑鱼肉剁成细蓉',
      servings: '3-4 人份'
    },
    ingredients: [
      { id: 'i1', name: '鲜丝瓜 (去皮切大片)', amountText: '300 g (3条)', category: 'produce' },
      { id: 'i2', name: '黑鱼蓉 (剁碎)', amountText: '300 g', category: 'main' },
      { id: 'i3', name: '鸡蛋清与淀粉', amountText: '蛋清100g + 淀粉50g', category: 'liquid' },
      { id: 'i4', name: '葱姜末与鸡精食盐', amountText: '葱姜末+鸡精+盐', category: 'seasoning' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '丝瓜焯软抹鱼蓉卷起',
        sublabel: 'Blanch & Roll Fish Mousse',
        ingredientIds: ['i1', 'i2', 'i3', 'i4'],
        stageIndex: 0,
        notes: '黑鱼蓉加葱姜末鸡精盐调匀，丝瓜片焯软过凉抹蛋清淀粉放鱼蓉卷起'
      },
      {
        id: 'b2',
        label: '大火蒸10分钟扣盘',
        sublabel: 'Steam 10 Mins',
        ingredientIds: ['i1', 'i2'],
        stageIndex: 1,
        heatLevel: '大火',
        durationMinutes: 10,
        notes: '丝瓜卷入蒸笼蒸10分钟至熟，翻扣盘内即可'
      }
    ],
    finalBlock: {
      method: 'steam',
      label: '清嫩翡翠 🐟',
      durationText: '10 min',
      instructions: '丝瓜翠绿清甜，黑鱼蓉高蛋白紧实嫩滑'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 33. 洋葱炒猪肝 (炒)
  {
    id: 'cn-33-yangcong-chao-zhugan',
    version: '3.0',
    status: 'published',
    title: '🐖 洋葱爆炒猪肝',
    description: '明目补血养生炒菜。猪肝薄片用料酒水淀粉腌渍滑熟，搭配洋葱方片大火爆炒，富含维A与铁质，降压降脂。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '中式炒锅',
      preheat: '猪肝去筋膜切薄片腌渍',
      servings: '2-3 人份'
    },
    ingredients: [
      { id: 'i1', name: '新鲜猪肝 (切薄片)', amountText: '50 g', category: 'main' },
      { id: 'i2', name: '洋葱 (切方片)', amountText: '100 g', category: 'produce' },
      { id: 'i3', name: '料酒与水淀粉', category: 'liquid', note: '原始数据未提供各项用量，待来源核对' },
      { id: 'i4', name: '葱花花椒粉盐鸡精', category: 'seasoning', note: '原始数据未提供各项用量，待来源核对' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '猪肝滑熟与爆香洋葱',
        sublabel: 'Sear Liver & Onion',
        ingredientIds: ['i1', 'i2', 'i3', 'i4'],
        stageIndex: 0,
        heatLevel: '大火',
        durationMinutes: 4,
        notes: '猪肝片加料酒水淀粉腌15分钟，油热爆葱花花椒滑熟猪肝，下洋葱片炒熟调盐鸡精'
      }
    ],
    finalBlock: {
      method: 'fry',
      label: '鲜嫩补血 🐖',
      instructions: '猪肝鲜嫩无异味，洋葱甜脆开胃'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 34. 飘香手撕圆白菜 (炒)
  {
    id: 'cn-34-piaoxiang-shousi-yuanbaicai',
    version: '3.0',
    status: 'published',
    title: '🥬 飘香手撕圆白菜',
    description: '天然护胃酸甜快手菜。圆白菜手撕成片，爆香蒜末姜末花椒粒，大火炒至微软，淋香醋与香油出锅。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '平底炒锅',
      preheat: '圆白菜手撕成大片',
      servings: '2-3 人份'
    },
    ingredients: [
      { id: 'i1', name: '圆白菜 (手撕片)', amountText: '300 g', category: 'produce' },
      { id: 'i2', name: '蒜末与姜末花椒粒', amountText: '蒜末5g + 姜末5g + 花椒3g', category: 'produce' },
      { id: 'i3', name: '香醋与香油', amountText: '醋8g + 香油5g', category: 'liquid' },
      { id: 'i4', name: '食盐', amountText: '3 g', category: 'seasoning' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '爆香花椒与手撕菜爆炒',
        sublabel: 'Flash Fry Cabbage',
        ingredientIds: ['i1', 'i2', 'i3', 'i4'],
        stageIndex: 0,
        heatLevel: '大火',
        durationMinutes: 3,
        notes: '油热放蒜姜花椒爆香，下圆白菜片大火炒软，调盐醋淋香油出锅'
      }
    ],
    finalBlock: {
      method: 'fry',
      label: '酸脆开胃 🥬',
      instructions: '脆嫩爽口，对胃溃疡有良好辅助调养作用'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 35. 海米油菜 (炒)
  {
    id: 'cn-35-haimi-youcai',
    version: '3.0',
    status: 'published',
    title: '🥬 海米清炒油菜',
    description: '高钙高维C清爽炒菜。油菜焯水过凉，与泡发海米大火翻炒，海米鲜香松软，油菜鲜绿理气消肿。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '中式炒锅',
      preheat: '海米温水泡发洗净',
      servings: '2 人份'
    },
    ingredients: [
      { id: 'i1', name: '新鲜油菜 (切段焯水)', amountText: '200 g', category: 'produce' },
      { id: 'i2', name: '淡干海米 (泡发)', amountText: '30 g', category: 'main' },
      { id: 'i3', name: '葱花与食盐鸡精', amountText: '葱花+盐+鸡精', category: 'seasoning' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '油菜焯水过凉',
        sublabel: 'Blanch Bok Choy',
        ingredientIds: ['i1'],
        stageIndex: 0,
        notes: '油菜切段放沸水焯一下，过凉水挤干水分'
      },
      {
        id: 'b2',
        label: '炒香海米与下油菜',
        sublabel: 'Saute Dried Shrimp & Bok Choy',
        ingredientIds: ['i1', 'i2', 'i3'],
        stageIndex: 1,
        heatLevel: '大火',
        durationMinutes: 3,
        notes: '油热爆葱花下海米炒变色，放油菜盐鸡精大火翻炒熟'
      }
    ],
    finalBlock: {
      method: 'fry',
      label: '鲜绿高钙 🥬',
      instructions: '海米鲜香，油菜脆嫩多汁'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 36. 蚝油生菜 (炒)
  {
    id: 'cn-36-haoyou-shengcai',
    version: '3.0',
    status: 'published',
    title: '🥬 蒜香蚝油生菜',
    description: '减脂催眠经典粤式快手菜。生菜大片焯水摆盘，爆香葱姜蒜淋特调蚝油芡汁，清脆爽口低热量。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '平底盘 & 炒锅',
      preheat: '准备水淀粉勾芡',
      servings: '2 人份'
    },
    ingredients: [
      { id: 'i1', name: '新鲜生菜 (大片焯水)', amountText: '300 g', category: 'produce' },
      { id: 'i2', name: '李锦记蚝油', amountText: '15 g', category: 'liquid' },
      { id: 'i3', name: '葱姜蒜末与生抽', amountText: '葱姜蒜末各3g + 生抽3g', category: 'produce' },
      { id: 'i4', name: '水淀粉', amountText: '适量', category: 'liquid' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '生菜焯水控干摆盘',
        sublabel: 'Blanch & Plate Lettuce',
        ingredientIds: ['i1'],
        stageIndex: 0,
        notes: '生菜洗净撕大片，焯熟控水盛盘'
      },
      {
        id: 'b2',
        label: '爆香蒜末勾蚝油芡汁',
        sublabel: 'Glaze Oyster Sauce',
        ingredientIds: ['i2', 'i3', 'i4'],
        stageIndex: 1,
        heatLevel: '中火',
        durationMinutes: 2,
        notes: '油热爆葱姜蒜末，放生抽蚝油，水淀粉勾芡浇盘中'
      }
    ],
    finalBlock: {
      method: 'fry',
      label: '鲜咸清脆 🥬',
      instructions: '生菜翠绿清脆，蚝油酱汁浓郁'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 37. 芹菜腊肉丁 (炒)
  {
    id: 'cn-37-qincai-larouding',
    version: '3.0',
    status: 'published',
    title: '🥓 芹菜爆炒腊肉丁',
    description: '平肝降压香浓家常菜。芹菜段与腊肉先焯水，腊肉切丁煸炒出油，搭配干红辣椒段大火翻炒，香气扑鼻。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '中式炒锅',
      preheat: '芹菜腊肉先焯水',
      servings: '3 人份'
    },
    ingredients: [
      { id: 'i1', name: '鲜芹菜 (切段焯水)', amountText: '200 g', category: 'produce' },
      { id: 'i2', name: '熟腊肉 (切丁焯水)', amountText: '100 g', category: 'main' },
      { id: 'i3', name: '姜末与干红辣椒段', amountText: '姜末2g + 干椒5g', category: 'seasoning' },
      { id: 'i4', name: '料酒与食盐', amountText: '料酒5g + 盐2g', category: 'seasoning' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '腊肉煸炒出油下芹菜',
        sublabel: 'Stir-Fry Bacon & Celery',
        ingredientIds: ['i1', 'i2', 'i3', 'i4'],
        stageIndex: 0,
        heatLevel: '大火',
        durationMinutes: 4,
        notes: '油热爆姜末干椒，下腊肉丁煸出油，倒芹菜段加料酒盐炒熟'
      }
    ],
    finalBlock: {
      method: 'fry',
      label: '腊香脆嫩 🥓',
      instructions: '芹菜清脆利尿，腊肉醇香咸美'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 38. 白灼芥蓝 (炒)
  {
    id: 'cn-38-baizhuo-jielan',
    version: '3.0',
    status: 'published',
    title: '🥬 粤式白灼芥蓝',
    description: '粤港经典清爽名菜。芥蓝去粗皮焯至断生，浇上白糖、豉汁、香油兑成的白灼汁与热油葱丝，清心明目。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '大号平盘 & 炒锅',
      preheat: '芥蓝去根部粗皮',
      servings: '2-3 人份'
    },
    ingredients: [
      { id: 'i1', name: '新鲜芥蓝 (去粗皮)', amountText: '300 g', category: 'produce' },
      { id: 'i2', name: '葱丝', amountText: '15 g', category: 'produce' },
      { id: 'i3', name: '特制白灼酱汁', amountText: '酱油5g + 糖3g + 盐3g + 香油 + 鸡精', category: 'seasoning' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '芥蓝焯水断生摆盘',
        sublabel: 'Blanch Gai Lan',
        ingredientIds: ['i1'],
        stageIndex: 0,
        notes: '沸水将芥蓝焯至断生，捞出摆盘'
      },
      {
        id: 'b2',
        label: '煮白灼汁浇上撒葱丝',
        sublabel: 'Glaze Soy Dressing',
        ingredientIds: ['i1', 'i2', 'i3'],
        stageIndex: 1,
        heatLevel: '中火',
        durationMinutes: 2,
        notes: '酱油糖盐香油鸡精水烧开，浇在芥蓝上撒葱丝即可'
      }
    ],
    finalBlock: {
      method: 'fry',
      label: '清甜爽脆 🥬',
      instructions: '芥蓝微甜清脆，极具粤菜原本鲜味'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 39. 蛋黄苋菜 (炒)
  {
    id: 'cn-39-danhuang-xiancai',
    version: '3.0',
    status: 'published',
    title: '🥬 熟咸蛋黄炒苋菜',
    description: '强健骨骼补血家常菜。熟咸鸭蛋黄捣碎炒出金黄沙香，放入苋菜段大火翻炒至变软，蒜香四溢，清热解毒。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '平底炒锅',
      preheat: '咸鸭蛋提前煮熟取黄捣碎',
      servings: '2-3 人份'
    },
    ingredients: [
      { id: 'i2', name: '熟咸鸭蛋黄 (捣碎末)', amountText: '1 颗', category: 'main' },
      { id: 'i3', name: '蒜末与食盐', amountText: '蒜末5g + 盐3g', category: 'seasoning' },
      { id: 'i1', name: '新鲜红苋菜 (切段)', amountText: '400 g', category: 'produce' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '爆蒜末炒香咸蛋黄末',
        sublabel: 'Saute Yolk Mousse',
        ingredientIds: ['i2', 'i3'],
        stageIndex: 0,
        heatLevel: '中火',
        durationMinutes: 2,
        notes: '油热下蒜末爆香，放蛋黄末小火炒出起泡香味'
      },
      {
        id: 'b2',
        label: '下苋菜大火炒软',
        sublabel: 'Stir-Fry Amaranth',
        ingredientIds: ['i1', 'i2', 'i3'],
        stageIndex: 1,
        heatLevel: '大火',
        durationMinutes: 3,
        notes: '放苋菜段与盐，大火翻炒至变软即可出锅'
      }
    ],
    finalBlock: {
      method: 'fry',
      label: '咸香补血 🥬',
      instructions: '苋菜软滑汤紫红，咸蛋黄起沙咸香'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 40. 虾仁蒸西蓝花 (蒸)
  {
    id: 'cn-40-xiaren-zheng-xilanhua',
    version: '3.0',
    status: 'published',
    title: '🥦 鲜虾仁清蒸西蓝花',
    description: '防癌抗癌高蛋白清淡蒸菜。西蓝花围圈装盘中间放清理好的虾仁，蒸10分钟，淋少许蚝油勾芡，消除疲劳。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '大号平底盘 & 蒸锅',
      preheat: '虾仁挑去虾线洗净',
      servings: '2-3 人份'
    },
    ingredients: [
      { id: 'i1', name: '西蓝花 (撕小朵)', amountText: '250 g', category: 'produce' },
      { id: 'i2', name: '鲜虾仁', amountText: '150 g', category: 'main' },
      { id: 'i3', name: '蚝油水淀粉盐鸡精', category: 'seasoning', note: '原始数据未提供各项用量，待来源核对' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '西蓝花围圈码盘',
        sublabel: 'Arrange Broccoli & Shrimp',
        ingredientIds: ['i1', 'i2'],
        stageIndex: 0,
        notes: '西蓝花摆外圈，鲜虾仁倒中间'
      },
      {
        id: 'b2',
        label: '蒸10分钟淋芡汁',
        sublabel: 'Steam 10 Mins & Sauce',
        ingredientIds: ['i1', 'i2', 'i3'],
        stageIndex: 1,
        heatLevel: '大火',
        durationMinutes: 10,
        notes: '开水蒸锅蒸10分钟，煮蚝油盐鸡精水淀粉浓汁浇表面'
      }
    ],
    finalBlock: {
      method: 'steam',
      label: '鲜美防癌 🥦',
      instructions: '虾仁鲜弹，西蓝花翠绿富含维生素C'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 41. 莴笋聚会 (蒸)
  {
    id: 'cn-41-wosun-juhui',
    version: '3.0',
    status: 'published',
    title: '🥗 四蔬聚会蘸汁蒸菜 (莴笋聚会)',
    description: '高钾防癌健康蒸菜。莴笋、竹笋、芋头与土豆去皮切块，大火转小火蒸20分钟，蘸干红辣椒花椒蒜汁食用。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '大号蒸盘 & 蒸锅',
      preheat: '准备麻辣香蒜蘸汁',
      servings: '3-4 人份'
    },
    ingredients: [
      { id: 'i1', name: '莴笋块', amountText: '200 g', category: 'produce' },
      { id: 'i2', name: '竹笋块', amountText: '150 g', category: 'produce' },
      { id: 'i3', name: '芋头块与土豆块', amountText: '芋头100g + 土豆100g', category: 'produce' },
      { id: 'i4', name: '特制花椒蒜辣蘸汁', amountText: '干椒3g + 花椒粉 + 蒜末 + 盐 + 酱油', category: 'seasoning' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '四蔬切块大火蒸20分钟',
        sublabel: 'Steam Veggie Medley',
        ingredientIds: ['i1', 'i2', 'i3'],
        stageIndex: 0,
        heatLevel: '中火',
        durationMinutes: 20,
        notes: '四种根茎蔬菜切块装盘，入开水蒸锅蒸20分钟'
      },
      {
        id: 'b2',
        label: '制作麻辣蒜汁浇上',
        sublabel: 'Sauté Dipping Sauce',
        ingredientIds: ['i4'],
        stageIndex: 1,
        heatLevel: '中火',
        durationMinutes: 3,
        notes: '油热爆干椒花椒蒜末，调盐酱油水成蘸汁浇蒸好的菜上'
      }
    ],
    finalBlock: {
      method: 'steam',
      label: '麻辣粉糯 🥗',
      instructions: '四蔬口感各异，芋头粉糯，双笋爽脆'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 42. 莴笋烧肉 (炖)
  {
    id: 'cn-42-wosun-shaorou',
    version: '3.0',
    status: 'published',
    title: '🍲 香辣莴笋烧猪肉煲',
    description: '去油腻滋补炖菜。猪肉片腌渍后与红辣椒段姜片煸炒加水焖沸，下莴笋片炖至熟透，富含微量元素。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '平底炖锅',
      preheat: '猪肉切片用盐酱油淀粉腌渍',
      servings: '3 人份'
    },
    ingredients: [
      { id: 'i2', name: '猪肉片 (腌渍)', amountText: '100 g', category: 'main' },
      { id: 'i3', name: '红辣椒段与姜片', category: 'produce', note: '原始数据未提供各项用量，待来源核对' },
      { id: 'i4', name: '料酒醋糖盐酱油淀粉', amountText: '料酒+醋+糖+盐3g+酱油+淀粉', category: 'seasoning' },
      { id: 'i1', name: '莴笋片', amountText: '250 g', category: 'produce' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '煸炒肉片加水焖沸',
        sublabel: 'Sear Pork & Boil Water',
        ingredientIds: ['i2', 'i3', 'i4'],
        stageIndex: 0,
        heatLevel: '中大火',
        durationMinutes: 5,
        notes: '油热爆红辣椒姜片，下肉片煸炒加料酒醋糖少量水焖沸'
      },
      {
        id: 'b2',
        label: '下莴笋片炖熟',
        sublabel: 'Simmer Asparagus Lettuce',
        ingredientIds: ['i1', 'i2', 'i4'],
        stageIndex: 1,
        heatLevel: '中火',
        durationMinutes: 10,
        notes: '下莴笋片调盐翻炒，加少许水炖至食材熟透出锅'
      }
    ],
    finalBlock: {
      method: 'stew',
      label: '鲜香不腻 🍲',
      instructions: '莴笋吸收肉香且去除油腻，汤汁浓郁'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 43. 姜汁莴笋 (炒)
  {
    id: 'cn-43-jiangzhi-wosun',
    version: '3.0',
    status: 'published',
    title: '🥒 清爽开胃姜汁莴笋',
    description: '高钾利尿降压凉爽快手菜。莴笋条用白醋与盐腌10分钟沥干，浇上鲜捣姜汁白糖与香油，点缀红彩椒丝。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '凉拌盘',
      preheat: '鲜姜捣烂制成姜汁',
      servings: '2 人份'
    },
    ingredients: [
      { id: 'i1', name: '莴笋条 (醋盐腌渍)', amountText: '400 g', category: 'produce' },
      { id: 'i4', name: '白醋白糖香油盐', amountText: '白醋15g + 糖10g + 香油3g + 盐3g', category: 'seasoning' },
      { id: 'i2', name: '红甜椒丝', amountText: '20 g', category: 'produce' },
      { id: 'i3', name: '鲜姜汁 (生姜捣烂)', amountText: '20 g', category: 'produce' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '醋盐腌莴笋沥干',
        sublabel: 'Marinate & Drain Lettuce',
        ingredientIds: ['i1', 'i4'],
        stageIndex: 0,
        notes: '莴笋条加白醋与盐腌10分钟，沥干渗出汁水'
      },
      {
        id: 'b2',
        label: '淋姜汁白糖香油拌匀',
        sublabel: 'Toss Ginger Dressing',
        ingredientIds: ['i1', 'i2', 'i3', 'i4'],
        stageIndex: 1,
        notes: '调入姜汁、白糖与香油拌匀，点缀红甜椒丝即成'
      }
    ],
    finalBlock: {
      method: 'serve',
      label: '辛香清脆 🥒',
      instructions: '姜汁辛辣清香，莴笋冰脆解腻'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 44. 西葫芦炒鸡蛋 (炒)
  {
    id: 'cn-44-xihulu-chao-jidan',
    version: '3.0',
    status: 'published',
    title: '🍳 瓜氨酸西葫芦炒鸡蛋',
    description: '平稳血糖补维C经典快手菜。蛋液先滑炒盛出，西葫芦片爆葱花炒至八成熟，倒鸡蛋合炒加盐出锅。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '平底炒锅',
      preheat: '鸡蛋打散加少许盐',
      servings: '2 人份'
    },
    ingredients: [
      { id: 'i2', name: '新鲜鸡蛋', amountText: '120 g (2颗)', category: 'main' },
      { id: 'i1', name: '西葫芦 (切片)', amountText: '150 g', category: 'produce' },
      { id: 'i3', name: '葱花与食盐', amountText: '葱花3g + 盐2g', category: 'seasoning' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '滑炒鸡蛋盛出',
        sublabel: 'Scramble Eggs',
        ingredientIds: ['i2'],
        stageIndex: 0,
        heatLevel: '中大火',
        durationMinutes: 2,
        notes: '蛋液入油炒至凝固盛碗'
      },
      {
        id: 'b2',
        label: '炒西葫芦合炒鸡蛋',
        sublabel: 'Stir-Fry Zucchini & Egg',
        ingredientIds: ['i1', 'i2', 'i3'],
        stageIndex: 1,
        heatLevel: '大火',
        durationMinutes: 3,
        notes: '油热爆葱花下西葫芦炒八成熟，倒鸡蛋放盐炒匀即可'
      }
    ],
    finalBlock: {
      method: 'fry',
      label: '清甜多汁 🍳',
      instructions: '西葫芦促进胰岛素分泌，鸡蛋补蛋白'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 45. 香菇藕丸 (蒸)
  {
    id: 'cn-45-xianggu-ouwan',
    version: '3.0',
    status: 'published',
    title: '🍡 鲜香菇莲藕猪肉丸',
    description: '降血脂健脾胃养生蒸丸。猪瘦肉碎、切碎香菇与磨成擦丝挤干的藕蓉加淀粉捏丸，大火蒸20分钟。',
    cuisine: 'chinese',
    difficulty: 'medium',
    prerequisites: {
      containerSize: '蒸盘 & 擦丝器',
      preheat: '莲藕擦丝磨成藕蓉挤水',
      servings: '3-4 人份'
    },
    ingredients: [
      { id: 'i1', name: '水发香菇 (切碎)', amountText: '200 g', category: 'produce' },
      { id: 'i2', name: '莲藕 (磨藕蓉挤水)', amountText: '100 g', category: 'produce' },
      { id: 'i3', name: '猪瘦肉 (剁肉末)', amountText: '100 g', category: 'main' },
      { id: 'i4', name: '淀粉葱花香油盐', amountText: '淀粉+葱花+香油+盐2g', category: 'seasoning' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '三种食材捏成小丸',
        sublabel: 'Form Lotus Meatballs',
        ingredientIds: ['i1', 'i2', 'i3', 'i4'],
        stageIndex: 0,
        notes: '香菇碎肉末藕蓉加淀粉盐顺时针拌匀，捏成小丸子码蒸盘'
      },
      {
        id: 'b2',
        label: '蒸20分钟撒葱花',
        sublabel: 'Steam 20 Mins',
        ingredientIds: ['i1', 'i2', 'i3', 'i4'],
        stageIndex: 1,
        heatLevel: '大火',
        durationMinutes: 20,
        notes: '入开水蒸锅大火蒸20分钟，调香油撒葱花'
      }
    ],
    finalBlock: {
      method: 'steam',
      label: '清脆弹牙 🍡',
      instructions: '藕蓉清脆，香菇鲜美，肉丸软嫩'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 46. 金针菇培根卷 (蒸)
  {
    id: 'cn-46-jinzhengu-peigenjuan',
    version: '3.0',
    status: 'published',
    title: '🥓 培根金针菇卷',
    description: '开胃促进新陈代谢快手蒸菜。培根片包裹焯水金针菇牙签固定，大火蒸5分钟，淋生抽胡椒粉芡汁。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '平底蒸盘 & 蒸锅',
      preheat: '准备牙签固定培根卷',
      servings: '2-3 人份'
    },
    ingredients: [
      { id: 'i1', name: '培根片', amountText: '150 g', category: 'main' },
      { id: 'i2', name: '金针菇 (焯水半分钟)', amountText: '100 g', category: 'produce' },
      { id: 'i3', name: '生抽胡椒粉鸡精水淀粉', category: 'seasoning', note: '原始数据未提供各项用量，待来源核对' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '培根裹金针菇卷成卷',
        sublabel: 'Roll Bacon & Mushroom',
        ingredientIds: ['i1', 'i2'],
        stageIndex: 0,
        notes: '金针菇焯水半分钟，培根片裹金针菇卷起牙签固定装盘'
      },
      {
        id: 'b2',
        label: '蒸5分钟淋鲜浓芡汁',
        sublabel: 'Steam 5 Mins & Glaze',
        ingredientIds: ['i1', 'i2', 'i3'],
        stageIndex: 1,
        heatLevel: '大火',
        durationMinutes: 5,
        notes: '大火蒸3-5分钟，锅中烧开水加生抽胡椒鸡精水淀粉勾芡浇盘中'
      }
    ],
    finalBlock: {
      method: 'steam',
      label: '咸香爽滑 🥓',
      instructions: '培根咸香熏美，金针菇吸汁爽滑'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 47. 醋熘素什锦 (炒)
  {
    id: 'cn-47-culiu-sushijin',
    version: '3.0',
    status: 'published',
    title: '🥗 醋熘四宝素什锦',
    description: '降糖降脂多膳食纤维清爽炒菜。水发木耳、胡萝卜片、山药片与芹菜段爆炒，浇上醋糖盐水淀粉芡汁。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '中式炒锅',
      preheat: '山药去皮切片焯水',
      servings: '3 人份'
    },
    ingredients: [
      { id: 'i1', name: '水发黑木耳 (撕小朵)', amountText: '20 g', category: 'produce' },
      { id: 'i2', name: '胡萝卜片', amountText: '40 g', category: 'produce' },
      { id: 'i5', name: '特制醋糖水淀粉芡汁', amountText: '盐2g + 姜片 + 葱末 + 糖 + 醋 + 水淀粉', category: 'seasoning' },
      { id: 'i3', name: '山药片 (焯水)', amountText: '60 g', category: 'produce' },
      { id: 'i4', name: '芹菜段', amountText: '60 g', category: 'produce' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '爆姜片炒胡萝卜木耳',
        sublabel: 'Saute Carrot & Black Fungus',
        ingredientIds: ['i1', 'i2', 'i5'],
        stageIndex: 0,
        heatLevel: '中火',
        durationMinutes: 2,
        notes: '油六成热爆姜片，放胡萝卜片与木耳煸炒1分钟'
      },
      {
        id: 'b2',
        label: '放山药芹菜浇酸甜芡汁',
        sublabel: 'Add Yam & Celery Glaze',
        ingredientIds: ['i1', 'i2', 'i3', 'i4', 'i5'],
        stageIndex: 1,
        heatLevel: '大火',
        durationMinutes: 3,
        notes: '放山药片芹菜段炒熟，调鸡精，浇醋糖盐水淀粉料汁略炒即可'
      }
    ],
    finalBlock: {
      method: 'fry',
      label: '酸甜清脆 🥗',
      instructions: '四色丰富清脆酸甜，维护肠道健康'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 48. 银耳百合雪梨汤 (炖)
  {
    id: 'cn-48-yiner-baihe-xuelitang',
    version: '3.0',
    status: 'published',
    title: '🍐 银耳百合雪梨润肺汤',
    description: '滋阴润肤经典养生甜汤。泡发银耳小火炖至软烂出胶，加入雪梨块、干百合与枸杞子续炖30分钟，冰糖甜润。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '砂锅 / 炖汤锅',
      preheat: '银耳泡发撕小朵，百合泡软',
      servings: '3-4 人份'
    },
    ingredients: [
      { id: 'i2', name: '干银耳 (泡发撕小朵)', amountText: '20 g', category: 'produce' },
      { id: 'i1', name: '雪梨块 (去皮核)', amountText: '2 颗', category: 'produce' },
      { id: 'i3', name: '干百合与枸杞子', amountText: '百合10g + 枸杞10g', category: 'produce' },
      { id: 'i4', name: '多晶冰糖', amountText: '适量', category: 'seasoning' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '银耳小火炖至软烂出胶',
        sublabel: 'Simmer Tremella Gel',
        ingredientIds: ['i2'],
        stageIndex: 0,
        heatLevel: '小火',
        durationMinutes: 30,
        notes: '银耳放锅中加足量清水大火烧开，转小火炖至银耳胶质软烂'
      },
      {
        id: 'b2',
        label: '加百合枸杞雪梨冰糖慢炖',
        sublabel: 'Add Pear & Lily Bulbs',
        ingredientIds: ['i1', 'i2', 'i3', 'i4'],
        stageIndex: 1,
        heatLevel: '小火',
        durationMinutes: 30,
        notes: '放百合枸杞冰糖与雪梨块，小火慢炖30分钟即可'
      }
    ],
    finalBlock: {
      method: 'stew',
      label: '润清甜润 🍐',
      instructions: '银耳胶质丰富，雪梨清甜，润肺止咳'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 49. 荷香小米蒸红薯 (蒸)
  {
    id: 'cn-49-hexiang-xiaomi-zheng-hongshu',
    version: '3.0',
    status: 'published',
    title: '🍠 荷香小米裹蒸红薯条',
    description: '养胃维护肠道粗粮蒸菜。红薯条裹满浸泡小米排在荷叶上，大火蒸30分钟，小米养胃红薯富含膳食纤维。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '荷叶铺蒸屉 & 蒸锅',
      preheat: '小米提前浸泡 1 小时',
      servings: '3 人份'
    },
    ingredients: [
      { id: 'i1', name: '红薯条 (去皮)', amountText: '250 g', category: 'produce' },
      { id: 'i2', name: '黄小米 (泡1小时)', amountText: '80 g', category: 'grain' },
      { id: 'i3', name: '鲜荷叶', amountText: '1 张', category: 'produce' },
      { id: 'i4', name: '食盐与葱花植物油', amountText: '盐2g + 葱花 + 植物油', category: 'seasoning' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '红薯条裹小米排荷叶上',
        sublabel: 'Coat Millet & Arrange',
        ingredientIds: ['i1', 'i2', 'i3', 'i4'],
        stageIndex: 0,
        notes: '荷叶铺蒸屉，红薯条在湿小米中滚匀粘满小米排入蒸屉'
      },
      {
        id: 'b2',
        label: '大火蒸30分钟',
        sublabel: 'Steam 30 Mins',
        ingredientIds: ['i1', 'i2', 'i3'],
        stageIndex: 1,
        heatLevel: '大火',
        durationMinutes: 30,
        notes: '蒸笼上汽后蒸30分钟至小米红薯软烂'
      }
    ],
    finalBlock: {
      method: 'steam',
      label: '荷香粉糯 🍠',
      instructions: '荷叶清香融入小米与红薯，甜软易消化'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 50. 山药寿司 (蒸)
  {
    id: 'cn-50-shanyao-shousi',
    version: '3.0',
    status: 'published',
    title: '🍣 蒸山药胡萝卜海苔卷',
    description: '创意健脾胃低脂粗粮寿司。蒸山药捣泥混入碎胡萝卜，海苔卷紧切段蒸15分钟，蘸寿司酱油，补肾益肺。',
    cuisine: 'chinese',
    difficulty: 'medium',
    prerequisites: {
      containerSize: '寿司帘 & 蒸盘 & 蒸锅',
      preheat: '山药蒸熟捣泥',
      servings: '2-3 人份'
    },
    ingredients: [
      { id: 'i1', name: '铁棍山药 (蒸熟捣泥)', amountText: '300 g', category: 'produce' },
      { id: 'i2', name: '胡萝卜碎', amountText: '100 g', category: 'produce' },
      { id: 'i3', name: '寿司海苔', amountText: '1 片', category: 'grain' },
      { id: 'i4', name: '特制寿司酱油', amountText: '适量 (蘸食)', category: 'liquid' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '山药泥混胡萝卜卷海苔',
        sublabel: 'Roll Yam & Nori',
        ingredientIds: ['i1', 'i2', 'i3'],
        stageIndex: 0,
        notes: '蒸山药去皮捣泥混胡萝卜碎，铺海苔上用寿司帘卷紧斜切段'
      },
      {
        id: 'b2',
        label: '蒸15分钟蘸酱油',
        sublabel: 'Steam 15 Mins',
        ingredientIds: ['i1', 'i3', 'i4'],
        stageIndex: 1,
        heatLevel: '中火',
        durationMinutes: 15,
        notes: '入开水蒸锅蒸15分钟，取出蘸寿司酱油食用'
      }
    ],
    finalBlock: {
      method: 'steam',
      label: '糯咸鲜香 🍣',
      instructions: '山药绵密粉糯，海苔鲜美，营养丰富'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 51. 关东煮 (炖)
  {
    id: 'cn-51-guandongzhu',
    version: '3.0',
    status: 'published',
    title: '🍢 日式关东煮 (芋头山药苹果高汤)',
    description: '丰富多蔬养胃日式炖煲。苹果白萝卜海带木耳香菇慢炖2小时汤底，放入芋头山药片与娃娃菜鱼豆腐煮熟，甜辣滋味。',
    cuisine: 'japanese_korean',
    difficulty: 'medium',
    prerequisites: {
      containerSize: '大炖锅',
      preheat: '海带木耳泡发，苹果白萝卜切片',
      servings: '4-5 人份'
    },
    ingredients: [
      { id: 'i3', name: '海带木耳香菇白萝卜苹果汤底', amountText: '海带+木耳+香菇+白萝卜+苹果片', category: 'produce' },
      { id: 'i4', name: '甜辣酱与生抽盐', amountText: '甜辣酱+生抽+盐2g', category: 'seasoning' },
      { id: 'i1', name: '芋头片与山药片', amountText: '芋头300g + 山药适量', category: 'produce' },
      { id: 'i2', name: '鱼豆腐与娃娃菜圆白菜', amountText: '鱼豆腐+娃娃菜+圆白菜40g', category: 'main' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '苹果白萝卜海带炖汤底',
        sublabel: 'Simmer Apple Dashi Broth',
        ingredientIds: ['i3', 'i4'],
        stageIndex: 0,
        heatLevel: '小火',
        durationMinutes: 120,
        notes: '苹果白萝卜海带木耳香菇加水盐生抽小火慢炖2小时成甜美汤底'
      },
      {
        id: 'b2',
        label: '下芋头山药鱼豆腐煮熟',
        sublabel: 'Boil Taro & Fish Tofu',
        ingredientIds: ['i1', 'i2', 'i4'],
        stageIndex: 1,
        heatLevel: '中火',
        durationMinutes: 15,
        notes: '下芋头片山药片鱼豆腐娃娃菜中火煮熟，浇汤淋甜辣酱'
      }
    ],
    finalBlock: {
      method: 'stew',
      label: '热气腾腾 🍢',
      instructions: '汤头清甜鲜美，芋头山药面软入味'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 52. 奶香土豆泥 (蒸)
  {
    id: 'cn-52-naixiang-tudouni',
    version: '3.0',
    status: 'published',
    title: '🥔 奶香浓郁鸡汤土豆泥',
    description: '养胃通便补虚蒸菜。土豆去皮蒸熟压泥加奶酪与鲜牛奶搅匀，灌入煮好的花椒黑胡椒鸡汤，增强脾胃消化。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '小碗 & 蒸锅',
      preheat: '准备煮好的花椒鸡汤',
      servings: '2 人份'
    },
    ingredients: [
      { id: 'i1', name: '土豆 (去皮蒸熟压泥)', amountText: '200 g', category: 'produce' },
      { id: 'i2', name: '奶酪与鲜牛奶', amountText: '奶酪20g + 牛奶100mL', category: 'dairy' },
      { id: 'i3', name: '花椒黑胡椒鸡汤', amountText: '鸡汤+花椒+黑胡椒+盐', category: 'liquid' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '土豆蒸熟捣泥混牛奶',
        sublabel: 'Mash Potato & Milk',
        ingredientIds: ['i1', 'i2'],
        stageIndex: 0,
        notes: '土豆去皮蒸熟压泥，加入奶酪与牛奶搅拌均匀'
      },
      {
        id: 'b2',
        label: '煮花椒鸡汤灌入土豆泥',
        sublabel: 'Pour Pepper Chicken Soup',
        ingredientIds: ['i1', 'i3'],
        stageIndex: 1,
        heatLevel: '中火',
        durationMinutes: 5,
        notes: '鸡汤加花椒黑胡椒煮透去花椒加盐，灌入土豆泥中即可'
      }
    ],
    finalBlock: {
      method: 'steam',
      label: '奶香绵密 🥔',
      durationText: '5 min',
      instructions: '口感极度细腻绵密，奶香与鸡汤鲜香交融'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 53. 茉莉花菜 (炒)
  {
    id: 'cn-53-moli-huacai',
    version: '3.0',
    status: 'published',
    title: '🌸 茉莉花清炒有机菜花',
    description: '理气开胃舒郁清香炒菜。新鲜茉莉花瓣淡盐水泡净，与焯水有机菜花大火快炒2分钟，芳香化湿，清肝明目。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '平底炒锅',
      preheat: '茉莉花瓣淡盐水浸泡',
      servings: '2 人份'
    },
    ingredients: [
      { id: 'i1', name: '有机菜花 (切小朵焯水)', amountText: '250 g', category: 'produce' },
      { id: 'i2', name: '新鲜茉莉花瓣', amountText: '20 g', category: 'produce' },
      { id: 'i3', name: '蒜片与食盐鸡精', amountText: '蒜片+盐2g+鸡精', category: 'seasoning' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '爆蒜片炒菜花撒茉莉花',
        sublabel: 'Stir-Fry Cauliflower & Jasmine',
        ingredientIds: ['i1', 'i2', 'i3'],
        stageIndex: 0,
        heatLevel: '大火',
        durationMinutes: 2,
        notes: '油热爆蒜片下焯水菜花翻炒，加盐鸡精，关火前下茉莉花瓣炒匀'
      }
    ],
    finalBlock: {
      method: 'fry',
      label: '花香清爽 🌸',
      instructions: '茉莉淡雅花香融入爽脆菜花，舒缓情绪'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 54. 凉拌西葫芦 (拌/Raw)
  {
    id: 'cn-54-liangban-xihulu',
    version: '3.0',
    status: 'published',
    title: '🥒 酸辣生拌西葫芦丝',
    description: '生津止渴高水分清爽凉菜。嫩西葫芦擦细丝，浇入算末香醋、生抽、蒜泥与辣椒油，清热解毒，平稳血糖。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '凉拌大碗',
      preheat: '准备擦丝器擦细丝',
      servings: '2 人份'
    },
    ingredients: [
      { id: 'i1', name: '嫩西葫芦 (擦细丝)', amountText: '300 g', category: 'produce' },
      { id: 'i2', name: '熟花生碎', amountText: '15 g', category: 'produce' },
      { id: 'i3', name: '算末生抽香醋红油盐', amountText: '蒜泥+生抽+香醋+红油+盐', category: 'seasoning' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '调酸辣汁浇西葫芦丝',
        sublabel: 'Toss Raw Zucchini Salad',
        ingredientIds: ['i1', 'i2', 'i3'],
        stageIndex: 0,
        notes: '西葫芦丝装盘，将蒜泥生抽香醋红油盐兑汁浇上，撒花生碎'
      }
    ],
    finalBlock: {
      method: 'serve',
      label: '酸辣冰脆 🥒',
      instructions: '口感极度清脆，保留最大量维生素与水份'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 55. 西葫芦鲜虾煲 (炖)
  {
    id: 'cn-55-xihulu-shrimp',
    version: '3.0',
    status: 'published',
    title: '🍲 西葫芦鲜虾豆腐煲',
    description: '高蛋白低卡滋补炖煲。鲜虾炒出红油，加高汤下内酯豆腐与西葫芦片小火慢炖10分钟，鲜美开胃。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '砂锅煲',
      preheat: '鲜虾去虾线开背',
      servings: '3 人份'
    },
    ingredients: [
      { id: 'i2', name: '鲜基围虾', amountText: '200 g', category: 'main' },
      { id: 'i4', name: '姜片葱段盐胡椒粉', amountText: '姜葱+盐3g+胡椒粉', category: 'seasoning' },
      { id: 'i1', name: '西葫芦 (切厚片)', amountText: '200 g', category: 'produce' },
      { id: 'i3', name: '内酯豆腐', amountText: '1 盒', category: 'produce' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '煎虾头炒出红油',
        sublabel: 'Sear Shrimp Head Oil',
        ingredientIds: ['i2', 'i4'],
        stageIndex: 0,
        heatLevel: '中火',
        durationMinutes: 3,
        notes: '油热煸姜片虾头炒出鲜红虾油'
      },
      {
        id: 'b2',
        label: '下豆腐西葫芦炖10分钟',
        sublabel: 'Simmer Zucchini & Tofu',
        ingredientIds: ['i1', 'i2', 'i3', 'i4'],
        stageIndex: 1,
        heatLevel: '小火',
        durationMinutes: 10,
        notes: '倒开水下豆腐与西葫芦片，盖盖慢炖10分钟放盐胡椒粉'
      }
    ],
    finalBlock: {
      method: 'stew',
      label: '鲜甜汤浓 🍲',
      instructions: '虾油让汤头呈金黄色，豆腐软滑吸满鲜味'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 56. 冰糖独目雪梨汤 (炖)
  {
    id: 'cn-56-bingtang-dumu-xuelitang',
    version: '3.0',
    status: 'published',
    title: '🍐 冰糖川贝独目雪梨盅',
    description: '化痰止咳经典疗效炖品。雪梨掏空做盅，装入川贝母粉、独颗蒜与冰糖蒸炖45分钟，清热润肺。',
    cuisine: 'chinese',
    difficulty: 'medium',
    prerequisites: {
      containerSize: '深碗 & 蒸锅',
      preheat: '川贝母研磨成细粉',
      servings: '1 人份'
    },
    ingredients: [
      { id: 'i1', name: '雪梨 (挖空梨心做盅)', amountText: '1 颗', category: 'produce' },
      { id: 'i2', name: '川贝母粉', amountText: '3 g', category: 'produce' },
      { id: 'i3', name: '独头大蒜 (去皮)', amountText: '1 颗', category: 'produce' },
      { id: 'i4', name: '多晶冰糖', amountText: '15 g', category: 'seasoning' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '雪梨掏心装入川贝冰糖',
        sublabel: 'Prep Pear Bowl',
        ingredientIds: ['i1', 'i2', 'i3', 'i4'],
        stageIndex: 0,
        notes: '雪梨顶部切开盖，掏空梨核装入川贝粉独头蒜与冰糖'
      },
      {
        id: 'b2',
        label: '隔水慢炖45分钟',
        sublabel: 'Steam 45 Mins',
        ingredientIds: ['i1'],
        stageIndex: 1,
        heatLevel: '小火',
        durationMinutes: 45,
        notes: '盖上梨盖放深碗中，入蒸锅隔水大火烧开转小火蒸炖45分钟'
      }
    ],
    finalBlock: {
      method: 'stew',
      label: '润肺化痰 🍐',
      instructions: '梨肉酥烂如软膏，汤汁甜润带微苦川贝香'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 57. 仙人掌炒肉片 (炒)
  {
    id: 'cn-57-xianrenzhang-chao-roupian',
    version: '3.0',
    status: 'published',
    title: '🌵 食用仙人掌爆炒猪肉片',
    description: '降血糖行气活血特色菜。食用仙人掌去刺切条焯水，与腌渍猪肉片、红椒丝大火爆炒，口感酸爽粘滑。',
    cuisine: 'chinese',
    difficulty: 'medium',
    prerequisites: {
      containerSize: '中式炒锅',
      preheat: '仙人掌小心刮净边缘小刺',
      servings: '2-3 人份'
    },
    ingredients: [
      { id: 'i1', name: '食用仙人掌条 (去刺焯水)', amountText: '150 g', category: 'produce' },
      { id: 'i2', name: '猪里脊肉片 (腌渍)', amountText: '150 g', category: 'main' },
      { id: 'i3', name: '红甜椒丝与葱姜末', amountText: '红椒丝+葱姜末', category: 'produce' },
      { id: 'i4', name: '料酒生抽盐鸡精淀粉', category: 'seasoning', note: '原始数据未提供各项用量，待来源核对' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '仙人掌焯水去粘液',
        sublabel: 'Blanch Cactus Strips',
        ingredientIds: ['i1'],
        stageIndex: 0,
        notes: '仙人掌条放沸水中焯水半分钟过凉水'
      },
      {
        id: 'b2',
        label: '肉片滑熟与仙人掌合炒',
        sublabel: 'Stir-Fry Cactus & Pork',
        ingredientIds: ['i1', 'i2', 'i3', 'i4'],
        stageIndex: 1,
        heatLevel: '大火',
        durationMinutes: 3,
        notes: '油热爆葱姜滑熟肉片，倒仙人掌条红椒丝加盐鸡精大火快炒'
      }
    ],
    finalBlock: {
      method: 'fry',
      label: '微酸粘滑 🌵',
      instructions: '仙人掌微酸清脆，富含多糖与黄酮类抗氧化物质'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 58. 三鲜牛肉包 (蒸)
  {
    id: 'cn-58-sanxian-niurou-baoshe',
    version: '3.0',
    status: 'published',
    title: '🥟 酵母三鲜牛肉面蒸包',
    description: '补气养血主食蒸包。发面皮包裹牛肉末、虾仁碎与木耳丝组成的三鲜馅，大火蒸20分钟，松软多汁。',
    cuisine: 'chinese',
    difficulty: 'hard',
    prerequisites: {
      containerSize: '大蒸笼 & 醒发箱',
      preheat: '面团提前发酵至两倍大',
      servings: '6-8 个包子'
    },
    ingredients: [
      { id: 'i1', name: '发酵面团', amountText: '400 g', category: 'grain' },
      { id: 'i2', name: '牛后腿肉馅', amountText: '200 g', category: 'main' },
      { id: 'i3', name: '鲜虾仁碎与木耳丝', amountText: '虾仁50g + 木耳50g', category: 'produce' },
      { id: 'i4', name: '姜水酱油香油盐胡椒粉', category: 'seasoning', note: '原始数据未提供各项用量，待来源核对' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '搅拌牛肉三鲜馅与包包子',
        sublabel: 'Mix Filling & Wrap Dumplings',
        ingredientIds: ['i1', 'i2', 'i3', 'i4'],
        stageIndex: 0,
        notes: '牛肉馅打入姜水酱油，加虾仁木耳香油盐拌匀，擀皮包馅捏褶'
      },
      {
        id: 'b2',
        label: '醒发15分钟大火蒸20分钟',
        sublabel: 'Proof & Steam 20 Mins',
        ingredientIds: ['i1'],
        stageIndex: 1,
        heatLevel: '大火',
        durationMinutes: 20,
        notes: '蒸笼二次醒发15分钟，上汽后大火蒸20分钟焖3分钟出锅'
      }
    ],
    finalBlock: {
      method: 'steam',
      label: '皮软馅鲜 🥟',
      instructions: '包子皮暄软蓬松，馅料汤汁鲜浓'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 59. 芹菜牛肉 (炒)
  {
    id: 'cn-59-qincai-niurou',
    version: '3.0',
    status: 'published',
    title: '🥩 经典平肝芹菜炒牛肉丝',
    description: '强筋健骨降血压经典菜。参考张晔原著老抽水淀粉上浆滑熟做法。注：调料克数、烹调油分配与单锅工序耗时属建模草稿，待厨房实测验证。',
    cuisine: 'chinese',
    difficulty: 'medium',
    prerequisites: {
      containerSize: '中式炒锅 & 腌肉碗',
      preheat: '牛肉横切细丝，上浆封油静置',
      servings: '3 人份'
    },
    ingredients: [
      { id: 'i1', name: '牛里脊细丝', amountText: '200 g', category: 'main', note: '横丝切成细丝' },
      { id: 'i4', name: '牛肉滑嫩上浆料', amountText: '1 碗', category: 'formula', formulaId: 'formula-niurou-shangjiang', note: '老抽水淀粉上浆封油' },
      { id: 'i-oil', name: '烹调油', amountText: '20 ml', category: 'liquid', note: '滑炒牛肉用约15ml，盛出后锅留底油约5ml炒芹菜，合炒不再新增用油' },
      { id: 'i2', name: '香芹菜段', amountText: '200 g', category: 'produce', note: '摘叶洗净切4cm长段' },
      { id: 'i3', name: '泡野山椒碎与姜丝', amountText: '山椒15g + 姜丝10g', category: 'produce' },
      { id: 'i5', name: '炒制定味调料', amountText: '盐2g + 鸡精1g', category: 'seasoning' }
    ],
    formulas: [
      {
        id: 'formula-niurou-shangjiang',
        name: '牛肉滑嫩上浆料',
        category: 'marinade',
        yieldText: '适用于 200g 牛肉丝 (草稿比例)',
        baseServings: 3,
        items: [
          { name: '料酒', baseAmount: 10, unit: 'ml', note: '去腥增香' },
          { name: '老抽', baseAmount: 5, unit: 'ml', note: '调色增香底味' },
          { name: '玉米淀粉', baseAmount: 10, unit: 'g', note: '上浆锁水' },
          { name: '清水', baseAmount: 15, unit: 'ml', note: '水淀粉调和水分' },
          { name: '食用油', baseAmount: 5, unit: 'ml', note: '封油防粘防脱浆' }
        ],
        steps: [
          '1. 碗中加入玉米淀粉与清水调匀成水淀粉，加入料酒、老抽顺一个方向抓匀至完全吸收',
          '2. 抓至牛肉起胶上劲，最后淋入食用油5ml封住水分静置备用'
        ],
        prepActionBlockId: 'b1',
        usedActionBlockIds: ['b1']
      }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '牛肉上浆抓匀',
        ingredientIds: ['i1', 'i4'],
        stageIndex: 0,
        equipment: '腌肉碗',
        durationMinutes: 3,
        note: '牛肉丝加老抽料酒与水淀粉抓匀上劲，封油静置备用'
      },
      {
        id: 'b2',
        label: '热锅滑油盛出牛肉',
        dependencies: [
          { sourceBlockId: 'b1', type: 'material', label: '上浆牛肉' }
        ],
        inputBlockIds: ['b1'],
        ingredientIds: ['i-oil'],
        stageIndex: 1,
        heatLevel: '大火',
        equipment: '中式炒锅',
        durationMinutes: 1,
        note: '炒锅烧热下烹调油，下入牛肉丝大火快速滑散变色盛出沥油，产生暂存牛肉支线'
      },
      {
        id: 'b3',
        label: '锅留底油爆炒芹菜',
        dependencies: [
          { sourceBlockId: 'b2', type: 'order', label: '同锅留底油' }
        ],
        afterBlockIds: ['b2'],
        ingredientIds: ['i-oil', 'i2', 'i3'],
        stageIndex: 2,
        heatLevel: '大火',
        equipment: '中式炒锅',
        durationMinutes: 2,
        note: '炒锅留滑肉底油烧热，爆香姜丝与野山椒碎，下芹菜段大火快速翻炒至断生清脆'
      },
      {
        id: 'b4',
        label: '牛肉回锅合炒定味',
        dependencies: [
          { sourceBlockId: 'b2', type: 'material', label: '暂存牛肉' },
          { sourceBlockId: 'b3', type: 'material', label: '炒好芹菜' }
        ],
        inputBlockIds: ['b2', 'b3'],
        ingredientIds: ['i5'],
        stageIndex: 3,
        heatLevel: '大火',
        equipment: '中式炒锅',
        durationMinutes: 1,
        note: '将盘中滑熟牛肉丝倒回炒锅与芹菜合炒，撒入盐与鸡精快速翻炒均匀出锅'
      }
    ],
    finalBlock: {
      method: 'fry',
      label: '出锅装盘 🥩',
      durationText: '趁热享用',
      instructions: '牛肉滑嫩爽口，芹菜清脆鲜香，微辣酸爽平肝开胃'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-09-14T10:00:00Z'
  },

  // 60. 清蒸羊肉 (蒸)
  {
    id: 'cn-60-zheng-yangrou',
    version: '3.0',
    status: 'published',
    title: '🐑 葱姜原味清蒸羊肉',
    description: '温补脾肾原汁原味蒸菜。羊肉切薄片加葱段姜片与料酒大火蒸30分钟，蘸香菜蒜泥椒盐食之。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '深底蒸盘 & 蒸锅',
      preheat: '准备香菜蒜泥椒盐蘸碟',
      servings: '3 人份'
    },
    ingredients: [
      { id: 'i1', name: '鲜羊肉薄片', amountText: '300 g', category: 'main' },
      { id: 'i2', name: '大葱段与生姜片', amountText: '葱段30g + 姜片20g', category: 'produce' },
      { id: 'i3', name: '料酒与黄酒', amountText: '料酒15g', category: 'liquid' },
      { id: 'i4', name: '椒盐与蒜泥香菜', amountText: '椒盐+蒜泥+香菜 (蘸料)', category: 'seasoning' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '铺葱姜摆羊肉片大火蒸30分钟',
        sublabel: 'Steam Mutton 30 Mins',
        ingredientIds: ['i1', 'i2', 'i3', 'i4'],
        stageIndex: 0,
        heatLevel: '大火',
        durationMinutes: 30,
        notes: '蒸盘底部铺满葱姜片，摆上羊肉片淋料酒，入沸水蒸锅蒸30分钟'
      }
    ],
    finalBlock: {
      method: 'steam',
      label: '原汁鲜香 🐑',
      instructions: '蒸出清淡羊汤可做高汤，肉质极度鲜嫩'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 61. 清蒸牛肉 (蒸)
  {
    id: 'cn-61-zheng-niurou',
    version: '3.0',
    status: 'published',
    title: '🥩 汉民风味清蒸嫩牛肉',
    description: '补气养血低脂蒸菜。牛肉片用生抽蚝油香油姜末腌透，平铺盘中大火蒸12分钟，撒鲜葱花。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '平底蒸盘',
      preheat: '牛肉逆纹理切薄片',
      servings: '2-3 人份'
    },
    ingredients: [
      { id: 'i1', name: '嫩牛肉薄片', amountText: '250 g', category: 'main' },
      { id: 'i2', name: '生姜末与葱花', amountText: '姜末10g + 葱花', category: 'produce' },
      { id: 'i3', name: '生抽蚝油芝麻香油淀粉', amountText: '生抽+蚝油+香油+淀粉', category: 'liquid' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '牛肉腌渍上浆',
        sublabel: 'Marinate Beef',
        ingredientIds: ['i1', 'i2', 'i3'],
        stageIndex: 0,
        notes: '牛肉片加姜末生抽蚝油香油淀粉抓匀腌15分钟'
      },
      {
        id: 'b2',
        label: '大火蒸12分钟',
        sublabel: 'Steam 12 Mins',
        ingredientIds: ['i1'],
        stageIndex: 1,
        heatLevel: '大火',
        durationMinutes: 12,
        notes: '平铺蒸盘，入开水蒸锅大火蒸12分钟撒葱花'
      }
    ],
    finalBlock: {
      method: 'steam',
      label: '滑嫩多汁 🥩',
      instructions: '不加一滴额外油，牛肉汁水丰盈'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 62. 芥蓝炒肉片 (炒)
  {
    id: 'cn-62-jielan-chao-roupian',
    version: '3.0',
    status: 'published',
    title: '🥬 粤式生炒芥蓝猪肉片',
    description: '清热解毒利水炒菜。芥蓝茎切斜片，与腌渍猪里脊肉片、蒜末大火爆炒，淋少许绍兴黄酒，清香诱人。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '中式炒锅',
      preheat: '芥蓝去粗皮切斜片',
      servings: '2-3 人份'
    },
    ingredients: [
      { id: 'i2', name: '猪里脊肉片 (腌渍)', amountText: '100 g', category: 'main' },
      { id: 'i3', name: '蒜末与绍兴黄酒', amountText: '蒜末5g + 黄酒10g', category: 'seasoning' },
      { id: 'i1', name: '芥蓝茎片', amountText: '200 g', category: 'produce' },
      { id: 'i4', name: '食盐与鸡精生抽', amountText: '盐2g + 鸡精 + 生抽', category: 'seasoning' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '爆香蒜末滑肉片',
        sublabel: 'Sear Pork Slices',
        ingredientIds: ['i2', 'i3'],
        stageIndex: 0,
        heatLevel: '中火',
        durationMinutes: 2,
        notes: '油热爆蒜末下肉片滑熟'
      },
      {
        id: 'b2',
        label: '下芥蓝大火爆炒烹黄酒',
        sublabel: 'Stir-Fry Gai Lan',
        ingredientIds: ['i1', 'i2', 'i3', 'i4'],
        stageIndex: 1,
        heatLevel: '大火',
        durationMinutes: 2,
        notes: '倒入芥蓝片大火快炒，沿锅边烹黄酒，加盐生抽鸡精炒匀'
      }
    ],
    finalBlock: {
      method: 'fry',
      label: '脆嫩甘甜 🥬',
      instructions: '芥蓝梗爽脆甘甜，肉片鲜嫩'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 63. 秘制番茄 (蒸)
  {
    id: 'cn-63-mizhi-fanqie',
    version: '3.0',
    status: 'published',
    title: '🍅 冰糖松子秘制蒸番茄盅',
    description: '养颜抗衰老创新甜品蒸菜。大红番茄去顶做盅，放入炒香松仁、蜂蜜与冰糖，中火蒸15分钟。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '蒸盘 & 蒸锅',
      preheat: '松子仁小火烘香',
      servings: '2 人份'
    },
    ingredients: [
      { id: 'i1', name: '红番茄 (切顶掏盅)', amountText: '2 颗', category: 'produce' },
      { id: 'i2', name: '炒香松子仁', amountText: '20 g', category: 'produce' },
      { id: 'i3', name: '纯蜂蜜与碎冰糖', amountText: '蜂蜜15g + 冰糖10g', category: 'seasoning' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '番茄做盅填入松子蜂蜜',
        sublabel: 'Prep Tomato Stuffed Bowl',
        ingredientIds: ['i1', 'i2', 'i3'],
        stageIndex: 0,
        notes: '番茄顶部切下，舀出部分番茄肉，装入松仁蜂蜜冰糖'
      },
      {
        id: 'b2',
        label: '中火蒸15分钟',
        sublabel: 'Steam 15 Mins',
        ingredientIds: ['i1'],
        stageIndex: 1,
        heatLevel: '中火',
        durationMinutes: 15,
        notes: '盖上番茄顶盖，入开水蒸锅蒸15分钟'
      }
    ],
    finalBlock: {
      method: 'steam',
      label: '酸甜香浓 🍅',
      instructions: '番茄红素经过蒸煮释放极易吸收，松仁润醇'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 64. 黄瓜炒虾仁 (炒)
  {
    id: 'cn-64-huanggua-chao-xiaren',
    version: '3.0',
    status: 'published',
    title: '🥒 经典清爽黄瓜炒虾仁',
    description: '低卡清淡高蛋白快手菜。鲜虾仁蛋清淀粉上浆滑熟，黄瓜丁爆蒜末大火翻炒，勾薄芡，利水消肿。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '平底炒锅',
      preheat: '黄瓜去籽切丁',
      servings: '2 人份'
    },
    ingredients: [
      { id: 'i2', name: '鲜虾仁 (上浆)', amountText: '150 g', category: 'main' },
      { id: 'i3', name: '蒜片蛋清淀粉水淀粉', category: 'liquid', note: '原始数据未提供各项用量，待来源核对' },
      { id: 'i1', name: '新鲜黄瓜 (切丁)', amountText: '200 g', category: 'produce' },
      { id: 'i4', name: '食盐与鸡精', amountText: '盐2g + 鸡精', category: 'seasoning' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '虾仁滑油炒变色',
        sublabel: 'Flash Sear Shrimp',
        ingredientIds: ['i2', 'i3'],
        stageIndex: 0,
        heatLevel: '中火',
        durationMinutes: 2,
        notes: '虾仁蛋清淀粉抓匀，热油滑至变红盛出'
      },
      {
        id: 'b2',
        label: '爆蒜炒黄瓜丁合炒勾芡',
        sublabel: 'Stir-Fry Cucumber & Glaze',
        ingredientIds: ['i1', 'i2', 'i3', 'i4'],
        stageIndex: 1,
        heatLevel: '大火',
        durationMinutes: 2,
        notes: '爆蒜片下黄瓜丁大火炒1分钟，倒入虾仁放盐鸡精，淋水淀粉勾芡'
      }
    ],
    finalBlock: {
      method: 'fry',
      label: '清脆鲜弹 🥒',
      instructions: '虾仁鲜嫩弹牙，黄瓜清香爽口'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 65. 芹菜蒸茧豆 (蒸)
  {
    id: 'cn-65-qincai-zheng-jiandou',
    version: '3.0',
    status: 'published',
    title: '🫛 芹菜叶拌粉蒸茧豆 (蚕豆)',
    description: '降血压高纤维农家蒸菜。鲜蚕豆与芹菜叶裹上面粉与玉米面，大火蒸15分钟，倒蒜泥香油凉拌。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '蒸屉 & 屉布',
      preheat: '鲜蚕豆剥去外壳',
      servings: '3 人份'
    },
    ingredients: [
      { id: 'i1', name: '鲜蚕豆 (茧豆)', amountText: '200 g', category: 'produce' },
      { id: 'i2', name: '嫩芹菜叶', amountText: '50 g', category: 'produce' },
      { id: 'i3', name: '中筋面粉与玉米面', amountText: '面粉30g + 玉米面30g', category: 'grain' },
      { id: 'i4', name: '蒜泥香油盐泼辣子', category: 'seasoning', note: '原始数据未提供各项用量，待来源核对' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '蚕豆芹菜叶裹双面粉',
        sublabel: 'Coat Beans & Celery Flour',
        ingredientIds: ['i1', 'i2', 'i3'],
        stageIndex: 0,
        notes: '蚕豆与洗净芹菜叶拌少量油，撒面粉与玉米面拌匀使表面挂面霜'
      },
      {
        id: 'b2',
        label: '大火蒸15分钟拌蒜泥',
        sublabel: 'Steam 15 Mins & Season',
        ingredientIds: ['i1', 'i4'],
        stageIndex: 1,
        heatLevel: '大火',
        durationMinutes: 15,
        notes: '水沸上蒸屉蒸15分钟，倒大碗加蒜泥盐香油辣子拌匀'
      }
    ],
    finalBlock: {
      method: 'steam',
      label: '粉糯麦香 🫛',
      instructions: '蚕豆面软，芹菜叶清香，粗粮健康'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 66. 凉拌芦荟 (拌/Raw)
  {
    id: 'cn-66-liangban-luhui',
    version: '3.0',
    status: 'published',
    title: '🌱 冰镇蜂蜜甜酸拌芦荟丁',
    description: '通便美容排毒开胃凉菜。食用库拉索芦荟去外皮切丁焯水半分钟过冰水，加蜂蜜与白醋拌匀。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '冰镇玻璃碗',
      preheat: '准备冰水浴过凉',
      servings: '2 人份'
    },
    ingredients: [
      { id: 'i1', name: '库拉索食用芦荟肉 (切丁)', amountText: '150 g', category: 'produce' },
      { id: 'i2', name: '枸杞子 (泡软)', amountText: '5 g', category: 'produce' },
      { id: 'i3', name: '纯蜂蜜与白醋', amountText: '蜂蜜20g + 白醋5g', category: 'seasoning' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '芦荟丁焯水半分钟过冰水',
        sublabel: 'Blanch & Ice Bath Aloe',
        ingredientIds: ['i1'],
        stageIndex: 0,
        heatLevel: '大火',
        durationMinutes: 1,
        notes: '芦荟丁入沸水焯30秒，迅速捞出浸泡冰水去粘液'
      },
      {
        id: 'b2',
        label: '拌蜂蜜白醋缀枸杞',
        sublabel: 'Toss Honey Dressing',
        ingredientIds: ['i1', 'i2', 'i3'],
        stageIndex: 1,
        notes: '沥干水分，淋蜂蜜与白醋拌匀，点缀枸杞子冰镇食用'
      }
    ],
    finalBlock: {
      method: 'serve',
      label: '冰爽滑脆 🌱',
      instructions: '晶莹剔透，清热泻火，改善肠道蠕动'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 67. 萝卜排骨汤 (炖)
  {
    id: 'cn-67-luobo-paigu-tang',
    version: '3.0',
    status: 'published',
    title: '🍲 白萝卜猪排骨顺气清汤',
    description: '下气消食经典家常炖汤。焯水排骨加葱姜小火炖1小时，下白萝卜大块炖20分钟，汤清甜，顺气化痰。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '砂锅',
      preheat: '排骨冷水焯水去血沫',
      servings: '4 人份'
    },
    ingredients: [
      { id: 'i1', name: '猪肋排 (焯水)', amountText: '400 g', category: 'main' },
      { id: 'i3', name: '葱段与生姜片料酒', amountText: '葱段+姜片+料酒10g', category: 'seasoning' },
      { id: 'i2', name: '白萝卜 (切滚刀块)', amountText: '300 g', category: 'produce' },
      { id: 'i4', name: '食盐与白胡椒粉香菜', amountText: '盐4g + 白胡椒粉 + 香菜', category: 'seasoning' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '排骨砂锅炖1小时',
        sublabel: 'Simmer Pork Ribs 60 Mins',
        ingredientIds: ['i1', 'i3'],
        stageIndex: 0,
        heatLevel: '小火',
        durationMinutes: 60,
        notes: '排骨入砂锅加热水、葱姜、料酒大火烧开，转小火炖1小时'
      },
      {
        id: 'b2',
        label: '下白萝卜块炖20分钟',
        sublabel: 'Add White Radish',
        ingredientIds: ['i1', 'i2', 'i4'],
        stageIndex: 1,
        heatLevel: '小火',
        durationMinutes: 20,
        notes: '倒入白萝卜块炖20分钟至透明软烂，加盐胡椒粉撒香菜'
      }
    ],
    finalBlock: {
      method: 'stew',
      label: '汤清甜润 🍲',
      instructions: '萝卜通气消食，排骨肉质酥烂'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 68. 冰糖银耳百合 (炖)
  {
    id: 'cn-68-bingtang-yiner-baihe',
    version: '3.0',
    status: 'published',
    title: '🥣 冰糖银耳莲子百合甜羹',
    description: '安神养心经典中式甜羹。银耳莲子慢炖40分钟至胶质粘稠，放百合冰糖炖20分钟，清心润肺。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '慢炖锅 / 砂锅',
      preheat: '莲耳百合提前浸泡',
      servings: '3-4 人份'
    },
    ingredients: [
      { id: 'i1', name: '干银耳 (泡发剪碎)', amountText: '15 g', category: 'produce' },
      { id: 'i2', name: '去芯莲子与干百合', amountText: '莲子20g + 百合15g', category: 'produce' },
      { id: 'i3', name: '多晶冰糖', amountText: '40 g', category: 'seasoning' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '银耳莲子慢炖40分钟',
        sublabel: 'Simmer Tremella & Lotus Seeds',
        ingredientIds: ['i1', 'i2'],
        stageIndex: 0,
        heatLevel: '小火',
        durationMinutes: 40,
        notes: '银耳与去芯莲子加足量水大火烧开，小火慢炖40分钟至出胶'
      },
      {
        id: 'b2',
        label: '放百合冰糖炖20分钟',
        sublabel: 'Add Lily & Rock Sugar',
        ingredientIds: ['i1', 'i2', 'i3'],
        stageIndex: 1,
        heatLevel: '小火',
        durationMinutes: 20,
        notes: '放百合与冰糖续炖20分钟至汤汁浓稠粘稠'
      }
    ],
    finalBlock: {
      method: 'stew',
      label: '浓稠润滑 🥣',
      instructions: '银耳浓稠如胶，莲子面糯百合甜润'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 69. 番茄蒸蛋 (蒸)
  {
    id: 'cn-69-xihongshi-zheng-dan',
    version: '3.0',
    status: 'published',
    title: '🥚 鲜番茄汁水蒸蛋',
    description: '开胃易消化高蛋白蒸蛋。番茄去皮榨纯汁与打散蛋液温水混合，中火蒸10分钟，淋少许生抽香油。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '蒸碗 & 滤网',
      preheat: '番茄开水烫去皮榨汁',
      servings: '2 人份'
    },
    ingredients: [
      { id: 'i1', name: '新鲜红番茄汁', amountText: '80 mL', category: 'produce' },
      { id: 'i2', name: '新鲜鸡蛋', amountText: '2 颗', category: 'main' },
      { id: 'i3', name: '温水与生抽香油盐', amountText: '温水+生抽+香油+盐1g', category: 'seasoning' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '蛋液混番茄汁过滤网',
        sublabel: 'Whisk Egg & Tomato Juice',
        ingredientIds: ['i1', 'i2', 'i3'],
        stageIndex: 0,
        notes: '鸡蛋打散加温水番茄汁盐搅匀，过滤网滤去气泡'
      },
      {
        id: 'b2',
        label: '中火蒸10分钟',
        sublabel: 'Steam 10 Mins',
        ingredientIds: ['i1', 'i2'],
        stageIndex: 1,
        heatLevel: '中火',
        durationMinutes: 10,
        notes: '盖保鲜膜扎孔，开水蒸锅中火蒸10分钟，淋生抽香油'
      }
    ],
    finalBlock: {
      method: 'steam',
      label: '粉红开胃 🥚',
      instructions: '呈粉红色，兼具番茄酸甜与鸡蛋滑嫩'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 70. 把子肉 (炖)
  {
    id: 'cn-70-bazi-rou',
    version: '3.0',
    status: 'published',
    title: '🥩 鲁味传统浓香把子肉',
    description: '补虚强身传统名菜。厚切五花肉大条煎香，搭配海带结、百叶结与酱油冰糖砂锅慢炖1.5小时，入口即化。',
    cuisine: 'chinese',
    difficulty: 'medium',
    prerequisites: {
      containerSize: '大砂锅',
      preheat: '五花肉切1厘米厚长条',
      servings: '4-5 人份'
    },
    ingredients: [
      { id: 'i1', name: '带皮五花肉 (厚长条)', amountText: '500 g', category: 'main' },
      { id: 'i2', name: '海带结与百叶结', amountText: '海带100g + 百叶100g', category: 'produce' },
      { id: 'i3', name: '老抽生抽料酒冰糖', amountText: '老抽20g + 生抽30g + 料酒20g + 冰糖20g', category: 'liquid' },
      { id: 'i4', name: '葱姜八角桂皮草果', amountText: '葱姜+八角2个+桂皮1块+草果', category: 'seasoning' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '肉条煎出油脂',
        sublabel: 'Sear Thick Pork Strips',
        ingredientIds: ['i1'],
        stageIndex: 0,
        heatLevel: '中火',
        durationMinutes: 5,
        notes: '肉条入锅煎至两面微微金黄逼出油脂'
      },
      {
        id: 'b2',
        label: '砂锅加海带百叶慢炖90分钟',
        sublabel: 'Stew 90 Mins in Claypot',
        ingredientIds: ['i1', 'i2', 'i3', 'i4'],
        stageIndex: 1,
        heatLevel: '小火',
        durationMinutes: 90,
        notes: '肉条海带百叶结放砂锅，加老抽生抽料酒冰糖葱姜八角水大火烧开，小火慢炖90分钟'
      }
    ],
    finalBlock: {
      method: 'stew',
      label: '肥而不腻 🥩',
      instructions: '肉皮软糯，瘦肉香浓脱骨，拌饭神菜'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 71. 葱烧海参 (炒)
  {
    id: 'cn-71-cong-shao-haishen',
    version: '3.0',
    status: 'published',
    title: '🍢 鲁菜名菜葱烧高汤海参',
    description: '滋阴补肾提高免疫名菜。大葱段用猪油炸出金黄葱油，泡发海参在葱油高汤中大火烧开小火慢炖收汁。',
    cuisine: 'chinese',
    difficulty: 'hard',
    prerequisites: {
      containerSize: '平底炒锅',
      preheat: '海参提前彻底泡发洗净',
      servings: '2-3 人份'
    },
    ingredients: [
      { id: 'i2', name: '章丘大葱白段', amountText: '150 g', category: 'produce' },
      { id: 'i3', name: '高汤与猪油', amountText: '高汤150g + 猪油20g', category: 'liquid' },
      { id: 'i1', name: '水发刺海参', amountText: '4 根 (约200g)', category: 'main' },
      { id: 'i4', name: '老抽蚝油糖盐水淀粉', category: 'seasoning', note: '原始数据未提供各项用量，待来源核对' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '猪油炸大葱段炼葱油',
        sublabel: 'Fry Scallion Oil',
        ingredientIds: ['i2', 'i3'],
        stageIndex: 0,
        heatLevel: '中火',
        durationMinutes: 5,
        notes: '猪油烧热下大葱段炸至金黄捞出，留香浓葱油'
      },
      {
        id: 'b2',
        label: '海参入高汤慢炖勾芡',
        sublabel: 'Simmer Sea Cucumber & Glaze',
        ingredientIds: ['i1', 'i2', 'i3', 'i4'],
        stageIndex: 1,
        heatLevel: '中火',
        durationMinutes: 8,
        notes: '倒入高汤老抽蚝油糖盐与海参炖5分钟，放炸葱段，大火水淀粉勾浓芡'
      }
    ],
    finalBlock: {
      method: 'fry',
      label: '葱香浓郁 🍢',
      instructions: '海参软嫩滑润，大葱香甜，红亮光泽'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 72. 山药蜜汁 (蒸)
  {
    id: 'cn-72-shanyu-mizhi',
    version: '3.0',
    status: 'published',
    title: '🍯 桂花蜜汁浇清蒸铁棍山药',
    description: '健脾补肺养生甜品。铁棍山药去皮切长条大火蒸20分钟，浇上桂花酱与纯蜂蜜调成的金色蜜汁。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '长平盘 & 蒸锅',
      preheat: '山药去皮带手套防痒',
      servings: '3 人份'
    },
    ingredients: [
      { id: 'i1', name: '铁棍山药 (去皮切长条)', amountText: '300 g', category: 'produce' },
      { id: 'i2', name: '糖桂花酱', amountText: '20 g', category: 'seasoning' },
      { id: 'i3', name: '纯蜂蜜', amountText: '20 g', category: 'liquid' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '山药条蒸20分钟',
        sublabel: 'Steam Yam 20 Mins',
        ingredientIds: ['i1'],
        stageIndex: 0,
        heatLevel: '大火',
        durationMinutes: 20,
        notes: '山药条码在平盘中，入开水蒸锅大火蒸20分钟至面软'
      },
      {
        id: 'b2',
        label: '淋桂花蜜汁',
        sublabel: 'Drizzle Osmanthus Honey',
        ingredientIds: ['i1', 'i2', 'i3'],
        stageIndex: 1,
        notes: '桂花酱与蜂蜜搅匀，均匀浇在蒸好的山药条上'
      }
    ],
    finalBlock: {
      method: 'steam',
      label: '甜蜜粉糯 🍯',
      instructions: '山药绵软，桂花清香甜美，平补脾胃'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 73. 冰糖葫芦 (炖)
  {
    id: 'cn-73-bingtang-hulu',
    version: '3.0',
    status: 'published',
    title: '🍡 传统老北京冰糖山楂葫芦',
    description: '开胃消食传统甜品。鲜山楂去核串串，冰糖与水小火慢熬至琥珀色拔丝状态，山楂蘸糖冷却结晶。',
    cuisine: 'chinese',
    difficulty: 'medium',
    prerequisites: {
      containerSize: '不粘酱锅 & 竹签',
      preheat: '准备抹油平盘冷却',
      servings: '5 串'
    },
    ingredients: [
      { id: 'i2', name: '多晶冰糖', amountText: '150 g', category: 'seasoning' },
      { id: 'i3', name: '清水', amountText: '75 mL', category: 'liquid' },
      { id: 'i1', name: '新鲜山楂 (去核串串)', amountText: '250 g (约200g)', category: 'produce' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '熬冰糖至琥珀拔丝色',
        sublabel: 'Boil Caramel Syrup',
        ingredientIds: ['i2', 'i3'],
        stageIndex: 0,
        heatLevel: '小火',
        durationMinutes: 10,
        notes: '冰糖与水小火熬开不搅拌，直至冒细小密密集泡呈微黄琥珀色'
      },
      {
        id: 'b2',
        label: '山楂串快速裹糖液冷却',
        sublabel: 'Dip Hawthorns & Cool',
        ingredientIds: ['i1', 'i2'],
        stageIndex: 1,
        notes: '山楂串转圈裹浅浅糖液，放抹油平盘冷却变硬'
      }
    ],
    finalBlock: {
      method: 'stew',
      label: '酸甜脆硬 🍡',
      instructions: '糖壳晶莹冰脆，山楂酸甜生津消食'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 74. 无花果炖排骨 (炖)
  {
    id: 'cn-74-wuhua-guo-dun-paigu',
    version: '3.0',
    status: 'published',
    title: '🍲 无花果南北杏猪排骨润喉汤',
    description: '润肺止咳健脾开胃炖汤。干无花果与南北杏仁、焯水排骨砂锅慢炖1.5小时，自然甜美无须多加糖。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '砂锅',
      preheat: '无花果洗净切半',
      servings: '4 人份'
    },
    ingredients: [
      { id: 'i1', name: '猪肋排 (焯水)', amountText: '400 g', category: 'main' },
      { id: 'i2', name: '干无花果', amountText: '50 g', category: 'produce' },
      { id: 'i3', name: '南杏仁与北杏仁', amountText: '南杏10g + 北杏5g', category: 'produce' },
      { id: 'i4', name: '姜片与食盐', amountText: '姜片3片 + 盐3g', category: 'seasoning' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '砂锅全料慢炖90分钟',
        sublabel: 'Simmer Fig Soup 90 Mins',
        ingredientIds: ['i1', 'i2', 'i3', 'i4'],
        stageIndex: 0,
        heatLevel: '小火',
        durationMinutes: 90,
        notes: '排骨无花果南北杏姜片加足量开水大火烧开，转小火慢炖90分钟放盐'
      }
    ],
    finalBlock: {
      method: 'stew',
      label: '清甜润喉 🍲',
      instructions: '汤色清亮甜美，对咽干咳嗽有显著调理效果'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 75. 桑椹蒸蛋 (蒸)
  {
    id: 'cn-75-sangren-zheng-dan',
    version: '3.0',
    status: 'published',
    title: '🥚 鲜桑椹干补血水蒸蛋',
    description: '补肝肾明目乌发滋补蒸蛋。鲜桑椹（或干桑椹）与打散鸡蛋液温水搅匀，中火蒸10分钟，甜咸风味。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '蒸碗',
      preheat: '干桑椹提前温水泡软',
      servings: '2 人份'
    },
    ingredients: [
      { id: 'i1', name: '干桑椹 (泡软)', amountText: '20 g', category: 'produce' },
      { id: 'i2', name: '新鲜鸡蛋', amountText: '2 颗', category: 'main' },
      { id: 'i3', name: '温水与纯蜂蜜香油', amountText: '温水+蜂蜜10g+香油', category: 'seasoning' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '蛋液混桑椹蒸10分钟',
        sublabel: 'Whisk Mulberry & Steam',
        ingredientIds: ['i1', 'i2', 'i3'],
        stageIndex: 0,
        heatLevel: '中火',
        durationMinutes: 10,
        notes: '鸡蛋打散加温水与泡软桑椹，入开水蒸锅蒸10分钟，出锅淋蜂蜜香油'
      }
    ],
    finalBlock: {
      method: 'steam',
      label: '紫甜滑嫩 🥚',
      instructions: '蛋羹带天然紫红色，桑椹酸甜滋补'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 76. 红枣蒸南瓜 (蒸)
  {
    id: 'cn-76-hongzao-zheng-nangua',
    version: '3.0',
    status: 'published',
    title: '🎃 去核红枣清蒸甜南瓜',
    description: '补中益气安神脾胃蒸菜。老南瓜切月牙块装盘，上面铺满满去核红枣，大火蒸20分钟，自然甜润。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '平底蒸盘',
      preheat: '红枣去核切半',
      servings: '3 人份'
    },
    ingredients: [
      { id: 'i1', name: '老南瓜 (切月牙块)', amountText: '300 g', category: 'produce' },
      { id: 'i2', name: '去核红枣', amountText: '50 g', category: 'produce' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '南瓜码盘铺红枣蒸20分钟',
        sublabel: 'Steam Pumpkin & Dates',
        ingredientIds: ['i1', 'i2'],
        stageIndex: 0,
        heatLevel: '大火',
        durationMinutes: 20,
        notes: '南瓜块码盘铺去核红枣，水沸入蒸锅大火蒸20分钟即可'
      }
    ],
    finalBlock: {
      method: 'steam',
      label: '香甜粉软 🎃',
      instructions: '不放一粒糖，南瓜吸收枣香天然甘甜'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 77. 百合蒸南瓜 (蒸)
  {
    id: 'cn-77-baihe-zheng-nangua',
    version: '3.0',
    status: 'published',
    title: '🎃 鲜百合蜂蜜蒸板栗南瓜',
    description: '润肺止咳美容养颜蒸菜。板栗南瓜块与鲜百合片交错码盘，大火蒸18分钟，淋少许纯蜂蜜出锅。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '平底蒸盘',
      preheat: '鲜百合剥开洗净',
      servings: '3 人份'
    },
    ingredients: [
      { id: 'i1', name: '板栗南瓜块', amountText: '300 g', category: 'produce' },
      { id: 'i2', name: '鲜百合片', amountText: '50 g', category: 'produce' },
      { id: 'i3', name: '纯蜂蜜', amountText: '15 g', category: 'liquid' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '南瓜百合交错码盘蒸18分钟',
        sublabel: 'Steam Pumpkin & Lily',
        ingredientIds: ['i1', 'i2'],
        stageIndex: 0,
        heatLevel: '大火',
        durationMinutes: 18,
        notes: '南瓜与鲜百合交错摆盘，入沸水蒸锅蒸18分钟'
      },
      {
        id: 'b2',
        label: '淋纯蜂蜜',
        sublabel: 'Drizzle Honey',
        ingredientIds: ['i1', 'i3'],
        stageIndex: 1,
        notes: '出锅稍晾凉，淋纯蜂蜜拌匀食之'
      }
    ],
    finalBlock: {
      method: 'steam',
      label: '清香粉糯 🎃',
      durationText: '18 min',
      instructions: '南瓜如板栗般干粉香甜，百合清润'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 78. 南瓜排骨汤 (炖)
  {
    id: 'cn-78-nangua-paigu-tang',
    version: '3.0',
    status: 'published',
    title: '🎃 老南瓜炖猪排骨浓汤',
    description: '补中益气通便养生汤。老南瓜块与焯水猪排骨慢炖1小时，南瓜自然化在汤里使汤呈浓郁金黄，润肠通便。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '大砂锅',
      preheat: '排骨焯水去血沫',
      servings: '4 人份'
    },
    ingredients: [
      { id: 'i1', name: '猪排骨块 (焯水)', amountText: '400 g', category: 'main' },
      { id: 'i3', name: '葱段与生姜片', amountText: '葱段+姜片', category: 'seasoning' },
      { id: 'i2', name: '老南瓜块 (带皮洗净)', amountText: '300 g', category: 'produce' },
      { id: 'i4', name: '食盐', amountText: '4 g', category: 'seasoning' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '排骨砂锅慢炖45分钟',
        sublabel: 'Simmer Pork Ribs 45 Mins',
        ingredientIds: ['i1', 'i3'],
        stageIndex: 0,
        heatLevel: '小火',
        durationMinutes: 45,
        notes: '排骨葱姜放砂锅加水，大火烧开转小火炖45分钟'
      },
      {
        id: 'b2',
        label: '下老南瓜块续炖20分钟',
        sublabel: 'Add Pumpkin & Simmer',
        ingredientIds: ['i1', 'i2', 'i4'],
        stageIndex: 1,
        heatLevel: '小火',
        durationMinutes: 20,
        notes: '下老南瓜块炖20分钟至南瓜软烂呈金黄浓汤，放盐调味'
      }
    ],
    finalBlock: {
      method: 'stew',
      label: '金黄甜润 🎃',
      instructions: '汤头金黄甜润，南瓜软糯，排骨酥烂'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 79. 芹菜朝鲜蓟炒肉片 (炒)
  {
    id: 'cn-79-qincai-chaoxian-chao-roupian',
    version: '3.0',
    status: 'published',
    title: '🌱 朝鲜蓟嫩芹菜爆炒猪肉片',
    description: '保肝利胆高纤特色菜。朝鲜蓟嫩芯与芹菜段、腌渍猪肉片大火爆炒，富含洋蓟素，促进胆汁分泌、降胆固醇。',
    cuisine: 'chinese',
    difficulty: 'medium',
    prerequisites: {
      containerSize: '中式炒锅',
      preheat: '朝鲜蓟切开水焯软',
      servings: '2-3 人份'
    },
    ingredients: [
      { id: 'i3', name: '猪里脊肉片 (腌渍)', amountText: '150 g', category: 'main' },
      { id: 'i4', name: '蒜末料酒盐生抽', category: 'seasoning', note: '原始数据未提供各项用量，待来源核对' },
      { id: 'i1', name: '朝鲜蓟嫩芯 (焯水切片)', amountText: '150 g', category: 'produce' },
      { id: 'i2', name: '芹菜段', amountText: '100 g', category: 'produce' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '蒜末爆炒肉片',
        sublabel: 'Sear Pork Slices',
        ingredientIds: ['i3', 'i4'],
        stageIndex: 0,
        heatLevel: '中火',
        durationMinutes: 2,
        notes: '油热爆蒜末，下腌好的肉片划散炒变色'
      },
      {
        id: 'b2',
        label: '倒朝鲜蓟芹菜大火爆炒',
        sublabel: 'Stir-Fry Artichoke & Celery',
        ingredientIds: ['i1', 'i2', 'i3', 'i4'],
        stageIndex: 1,
        heatLevel: '大火',
        durationMinutes: 3,
        notes: '下焯水朝鲜蓟片与芹菜段大火翻炒，调生抽与盐出锅'
      }
    ],
    finalBlock: {
      method: 'fry',
      label: '草本回甘 🌱',
      instructions: '朝鲜蓟微苦回甘，芹菜清脆，保肝护胆'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 80. 百合蒸山药 (蒸)
  {
    id: 'cn-80-baihe-zheng-shanyao',
    version: '3.0',
    status: 'published',
    title: '🌸 鲜百合清蒸山药片',
    description: '润肺安神补脾胃养生蒸菜。铁棍山药斜切片与鲜百合瓣层层相间摆盘，大火蒸15分钟，淋蜂蜜或直接食之。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '圆形蒸盘',
      preheat: '山药切片防止氧化泡水',
      servings: '2-3 人份'
    },
    ingredients: [
      { id: 'i1', name: '铁棍山药片', amountText: '250 g', category: 'produce' },
      { id: 'i2', name: '鲜百合瓣', amountText: '50 g', category: 'produce' },
      { id: 'i3', name: '纯蜂蜜', amountText: '15 g (可选)', category: 'liquid' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '山药百合相间摆盘蒸15分钟',
        sublabel: 'Steam Yam & Lily 15 Mins',
        ingredientIds: ['i1', 'i2'],
        stageIndex: 0,
        heatLevel: '大火',
        durationMinutes: 15,
        notes: '山药片与百合瓣环形码盘，入开水蒸锅大火蒸15分钟'
      },
      {
        id: 'b2',
        label: '淋蜂蜜',
        sublabel: 'Drizzle Honey',
        ingredientIds: ['i1', 'i3'],
        stageIndex: 1,
        notes: '取出可随喜好淋上纯蜂蜜调味'
      }
    ],
    finalBlock: {
      method: 'steam',
      label: '洁白甜软 🌸',
      instructions: '山药绵糯，百合清甜，滋阴润肺'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 81. 冰糖芦荟 (炖)
  {
    id: 'cn-81-bingtang-luhui',
    version: '3.0',
    status: 'published',
    title: '🥣 冰糖枸杞炖芦荟饮',
    description: '清热泻火通便排毒甜品。库拉索芦荟去皮切大块焯水，加冰糖枸杞慢炖20分钟，冷却冰镇后口感极佳。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '不粘炖锅',
      preheat: '芦荟去皮切块',
      servings: '2 人份'
    },
    ingredients: [
      { id: 'i1', name: '食用芦荟块 (焯水)', amountText: '200 g', category: 'produce' },
      { id: 'i2', name: '枸杞子', amountText: '10 g', category: 'produce' },
      { id: 'i3', name: '多晶冰糖', amountText: '30 g', category: 'seasoning' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '芦荟冰糖枸杞慢炖20分钟',
        sublabel: 'Simmer Aloe & Rock Sugar',
        ingredientIds: ['i1', 'i2', 'i3'],
        stageIndex: 0,
        heatLevel: '小火',
        durationMinutes: 20,
        notes: '芦荟块与冰糖枸杞加水大火烧开，转小火炖20分钟'
      }
    ],
    finalBlock: {
      method: 'stew',
      label: '晶莹清爽 🥣',
      instructions: '芦荟极度爽滑，冰糖甜润，润肠排毒'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 82. 自制干瘦肉面 (蒸)
  {
    id: 'cn-82-zizhi-ganshou-mian',
    version: '3.0',
    status: 'published',
    title: '🍜 手工风干瘦肉蒸丝面',
    description: '高蛋白低脂手工干粮面。猪瘦肉剁细加全麦粉捏面条风干，放蒸笼大火蒸15分钟，配鲜高汤食用。',
    cuisine: 'chinese',
    difficulty: 'hard',
    prerequisites: {
      containerSize: '蒸屉 & 屉布',
      preheat: '瘦肉面条提前晾干',
      servings: '2 人份'
    },
    ingredients: [
      { id: 'i1', name: '风干猪瘦肉面条', amountText: '200 g', category: 'main' },
      { id: 'i2', name: '清鸡汤高汤', amountText: '300 mL', category: 'liquid' },
      { id: 'i3', name: '葱花与芝麻香油食盐', amountText: '葱花+香油+盐2g', category: 'seasoning' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '风干肉面大火蒸15分钟',
        sublabel: 'Steam Meat Noodles 15 Mins',
        ingredientIds: ['i1'],
        stageIndex: 0,
        heatLevel: '大火',
        durationMinutes: 15,
        notes: '瘦肉面条铺在湿蒸布上，大火蒸15分钟至熟软'
      },
      {
        id: 'b2',
        label: '浇滚烫鸡汤',
        sublabel: 'Pour Hot Chicken Soup',
        ingredientIds: ['i1', 'i2', 'i3'],
        stageIndex: 1,
        notes: '盛入大碗，浇上滚烫鸡汤，撒葱花香油盐'
      }
    ],
    finalBlock: {
      method: 'steam',
      label: '肉香劲道 🍜',
      instructions: '面条富含蛋白质，嚼劲十足，汤鲜味美'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 83. 清炒洋葱 (炒)
  {
    id: 'cn-83-chao-yangcong',
    version: '3.0',
    status: 'published',
    title: '🧅 蒜香清炒紫洋葱',
    description: '杀菌降血压低热量快手菜。紫皮洋葱切丝，爆香蒜末大火快炒2分钟，淋少许生抽盐出锅，保持清脆。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '平底炒锅',
      preheat: '洋葱切丝泡水防辣眼',
      servings: '2 人份'
    },
    ingredients: [
      { id: 'i1', name: '紫皮洋葱 (切丝)', amountText: '250 g', category: 'produce' },
      { id: 'i2', name: '蒜末与生抽', amountText: '蒜末5g + 生抽5g', category: 'seasoning' },
      { id: 'i3', name: '食盐与鸡精', amountText: '盐2g + 鸡精', category: 'seasoning' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '爆蒜末大火快炒洋葱丝',
        sublabel: 'Flash Fry Onion 2 Mins',
        ingredientIds: ['i1', 'i2', 'i3'],
        stageIndex: 0,
        heatLevel: '大火',
        durationMinutes: 2,
        notes: '油热爆蒜末下洋葱丝，大火翻炒2分钟加生抽盐鸡精'
      }
    ],
    finalBlock: {
      method: 'fry',
      label: '甜脆杀菌 🧅',
      instructions: '洋葱甜脆微辣，富含前列腺素A与槲皮素'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 84. 洋葱炒鸡蛋 (炒)
  {
    id: 'cn-84-yangcong-chao-jidan',
    version: '3.0',
    status: 'published',
    title: '🍳 甜美洋葱炒滑蛋',
    description: '降脂护心经典家常菜。鸡蛋打散滑炒凝固，洋葱丝大火炒至甜软，合炒调盐出锅，营养均衡。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '中式炒锅',
      preheat: '鸡蛋打散加少许盐',
      servings: '2-3 人份'
    },
    ingredients: [
      { id: 'i2', name: '新鲜鸡蛋', amountText: '3 颗', category: 'main' },
      { id: 'i1', name: '洋葱丝', amountText: '200 g', category: 'produce' },
      { id: 'i3', name: '葱花与食盐生抽', amountText: '葱花+盐3g+生抽', category: 'seasoning' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '滑炒鸡蛋盛出',
        sublabel: 'Scramble Eggs',
        ingredientIds: ['i2'],
        stageIndex: 0,
        heatLevel: '中大火',
        durationMinutes: 2,
        notes: '蛋液滑炒至八成熟盛出'
      },
      {
        id: 'b2',
        label: '炒软洋葱合炒鸡蛋',
        sublabel: 'Stir-Fry Onion & Combine',
        ingredientIds: ['i1', 'i2', 'i3'],
        stageIndex: 1,
        heatLevel: '大火',
        durationMinutes: 3,
        notes: '爆葱花下洋葱丝炒至微软，倒鸡蛋加盐生抽大火合炒匀'
      }
    ],
    finalBlock: {
      method: 'fry',
      label: '甜润咸香 🍳',
      instructions: '洋葱甜软，鸡蛋金黄滑嫩'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 85. 清蒸茄子 (蒸)
  {
    id: 'cn-85-zheng-qiezi',
    version: '3.0',
    status: 'published',
    title: '🍆 原味蒜泥泼油清蒸长紫茄',
    description: '少油健康软化血管蒸菜。长紫茄切长条大火蒸10分钟，泼上爆香蒜泥生抽香醋，口感绵软。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '长平蒸盘',
      preheat: '长茄子洗净切长条',
      servings: '2 人份'
    },
    ingredients: [
      { id: 'i1', name: '长紫茄 (切长条)', amountText: '300 g', category: 'produce' },
      { id: 'i2', name: '大量蒜泥', amountText: '20 g', category: 'produce' },
      { id: 'i3', name: '生抽香醋香油盐红油', amountText: '生抽10g+香醋5g+香油+盐+红油', category: 'seasoning' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '茄子条大火蒸10分钟',
        sublabel: 'Steam Eggplant 10 Mins',
        ingredientIds: ['i1'],
        stageIndex: 0,
        heatLevel: '大火',
        durationMinutes: 10,
        notes: '茄子条码盘，入开水蒸锅大火蒸10分钟至透亮软烂'
      },
      {
        id: 'b2',
        label: '泼蒜泥生抽料汁',
        sublabel: 'Pour Garlic Dressing',
        ingredientIds: ['i1', 'i2', 'i3'],
        stageIndex: 1,
        notes: '蒜泥生抽香醋盐红油泼在热茄子上拌匀'
      }
    ],
    finalBlock: {
      method: 'steam',
      label: '软烂蒜香 🍆',
      instructions: '热量极低，富含生物碱与芦丁，保护心血管'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 86. 清蒸莴笋 (蒸)
  {
    id: 'cn-86-zheng-wosun',
    version: '3.0',
    status: 'published',
    title: '🥒 剁椒热油清蒸莴笋片',
    description: '高钾降压利尿清淡蒸菜。莴笋削皮切薄片装盘，铺少许湖南剁椒蒸8分钟，出锅泼热香油。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '平底蒸盘',
      preheat: '莴笋去外皮硬筋切片',
      servings: '2 人份'
    },
    ingredients: [
      { id: 'i1', name: '嫩莴笋片', amountText: '250 g', category: 'produce' },
      { id: 'i2', name: '红剁椒', amountText: '15 g', category: 'produce' },
      { id: 'i3', name: '蒸鱼豉油与香油', amountText: '豉油10g + 香油5g', category: 'seasoning' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '莴笋码盘铺剁椒蒸8分钟',
        sublabel: 'Steam Lettuce Slices',
        ingredientIds: ['i1', 'i2'],
        stageIndex: 0,
        heatLevel: '大火',
        durationMinutes: 8,
        notes: '莴笋片平铺蒸盘，上面放剁椒，入开水蒸锅大火蒸8分钟'
      },
      {
        id: 'b2',
        label: '淋蒸鱼豉油与热香油',
        sublabel: 'Pour Soy Sauce & Oil',
        ingredientIds: ['i1', 'i3'],
        stageIndex: 1,
        notes: '出锅淋蒸鱼豉油，泼热香油'
      }
    ],
    finalBlock: {
      method: 'steam',
      label: '鲜辣清脆 🥒',
      instructions: '保留莴笋原汁翠绿与微辣咸香'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 87. 清炒西葫芦 (炒)
  {
    id: 'cn-87-chao-xihulu',
    version: '3.0',
    status: 'published',
    title: '🥒 蒜香清炒西葫芦片',
    description: '生津止渴低热量极速菜。西葫芦半月片爆香蒜末大火翻炒2分钟，淋少许香醋出锅。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '平底炒锅',
      preheat: '西葫芦切半月薄片',
      servings: '2 人份'
    },
    ingredients: [
      { id: 'i1', name: '西葫芦 (切半月片)', amountText: '250 g', category: 'produce' },
      { id: 'i2', name: '蒜末与香醋', amountText: '蒜末5g + 醋3g', category: 'seasoning' },
      { id: 'i3', name: '食盐', amountText: '2 g', category: 'seasoning' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '爆蒜末大火炒2分钟',
        sublabel: 'Flash Fry Zucchini 2 Mins',
        ingredientIds: ['i1', 'i2', 'i3'],
        stageIndex: 0,
        heatLevel: '大火',
        durationMinutes: 2,
        notes: '油热爆蒜末下西葫芦片大火快炒，加盐沿锅边烹香醋出锅'
      }
    ],
    finalBlock: {
      method: 'fry',
      label: '清甜多汁 🥒',
      instructions: '极度快手，口感清爽水灵'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 88. 番茄炒肉片 (炒)
  {
    id: 'cn-88-fanqie-chao-roupian',
    version: '3.0',
    status: 'published',
    title: '🍅 经典浓酸番茄炒猪肉片',
    description: '开胃促进铁吸收家常菜。猪瘦肉片腌渍滑熟，番茄切块大火炒出红浓汤汁，合炒收汁，汤汁拌饭极佳。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '中式炒锅',
      preheat: '番茄去皮切块',
      servings: '2-3 人份'
    },
    ingredients: [
      { id: 'i2', name: '猪里脊肉片 (腌渍)', amountText: '150 g', category: 'main' },
      { id: 'i3', name: '葱花蒜末糖盐生抽', amountText: '葱蒜+糖5g+盐3g+生抽', category: 'seasoning' },
      { id: 'i1', name: '熟红番茄 (切块)', amountText: '250 g', category: 'produce' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '肉片滑熟盛出',
        sublabel: 'Sear Pork Slices',
        ingredientIds: ['i2', 'i3'],
        stageIndex: 0,
        heatLevel: '中火',
        durationMinutes: 2,
        notes: '肉片加料酒淀粉抓匀，热油滑熟盛出'
      },
      {
        id: 'b2',
        label: '炒番茄浓汁合炒肉片',
        sublabel: 'Stir-Fry Tomato Sauce & Combine',
        ingredientIds: ['i1', 'i2', 'i3'],
        stageIndex: 1,
        heatLevel: '大火',
        durationMinutes: 3,
        notes: '爆葱蒜下番茄炒出酸甜浓汁，倒入肉片加糖盐生抽炒匀'
      }
    ],
    finalBlock: {
      method: 'fry',
      label: '酸甜浓郁 🍅',
      instructions: '番茄红素与油脂结合极易吸收，肉片鲜嫩'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 89. 秘制番茄山药 (蒸)
  {
    id: 'cn-89-mizhi-fanqie-shanyao',
    version: '3.0',
    status: 'published',
    title: '🍅 秘制番茄酸甜蒸山药',
    description: '健脾养胃开胃创新甜菜。蒸熟铁棍山药段浇上手工炒熬浓番茄冰糖酱，酸甜粉糯，降脂排毒。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '蒸盘 & 不粘酱锅',
      preheat: '番茄去皮切碎',
      servings: '3 人份'
    },
    ingredients: [
      { id: 'i1', name: '铁棍山药 (去皮切段)', amountText: '300 g', category: 'produce' },
      { id: 'i2', name: '新鲜番茄碎与冰糖', amountText: '番茄150g + 冰糖20g', category: 'produce' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '山药大火蒸20分钟',
        sublabel: 'Steam Yam 20 Mins',
        ingredientIds: ['i1'],
        stageIndex: 0,
        heatLevel: '大火',
        durationMinutes: 20,
        notes: '山药段蒸20分钟至筷子能轻松穿透'
      },
      {
        id: 'b2',
        label: '小火熬番茄酱浇山药上',
        sublabel: 'Simmer Tomato Sauce & Pour',
        ingredientIds: ['i1', 'i2'],
        stageIndex: 1,
        heatLevel: '小火',
        durationMinutes: 5,
        notes: '番茄碎加冰糖少许水小火熬成浓酱，浇蒸好的山药上'
      }
    ],
    finalBlock: {
      method: 'steam',
      label: '酸甜面软 🍅',
      instructions: '红白相间美丽，番茄浓酱包裹绵软山药'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 90. 清炒豆腐干 (炒)
  {
    id: 'cn-90-chao-doufogan',
    version: '3.0',
    status: 'published',
    title: '🫘 香芹爆炒五香豆腐干',
    description: '高钙高蛋白清爽家常菜。五香豆腐干切丝，搭配香芹菜段与蒜末大火快炒，补充异黄酮与植物蛋白。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '中式炒锅',
      preheat: '豆腐干切细丝',
      servings: '2-3 人份'
    },
    ingredients: [
      { id: 'i1', name: '五香豆腐干 (切丝)', amountText: '200 g', category: 'main' },
      { id: 'i2', name: '香芹菜段', amountText: '100 g', category: 'produce' },
      { id: 'i3', name: '蒜末生抽盐鸡精', amountText: '蒜末+生抽+盐2g+鸡精', category: 'seasoning' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '爆蒜末炒香豆干丝芹菜',
        sublabel: 'Stir-Fry Tofu Strips',
        ingredientIds: ['i1', 'i2', 'i3'],
        stageIndex: 0,
        heatLevel: '大火',
        durationMinutes: 3,
        notes: '油热爆蒜末下豆干丝煸炒，放芹菜段生抽盐鸡精大火炒熟出锅'
      }
    ],
    finalBlock: {
      method: 'fry',
      label: '豆香清脆 🫘',
      instructions: '豆干咸香嚼劲，芹菜清香利尿'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 91. 清蒸土豆 (蒸)
  {
    id: 'cn-91-zheng-tudou',
    version: '3.0',
    status: 'published',
    title: '🥔 椒盐蒜香清蒸小土豆',
    description: '高钾低钠天然主食蒸菜。小土豆带皮洗净对切，大火蒸20分钟，蘸自制椒盐蒜泥香油食用。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '蒸盘 & 蒸锅',
      preheat: '土豆皮用刷子彻底刷净',
      servings: '2-3 人份'
    },
    ingredients: [
      { id: 'i1', name: '小黄心土豆 (带皮对切)', amountText: '350 g', category: 'produce' },
      { id: 'i2', name: '椒盐与蒜泥芝麻香油', amountText: '椒盐+蒜泥+香油 (蘸料)', category: 'seasoning' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '带皮对切土豆蒸20分钟',
        sublabel: 'Steam Potatoes 20 Mins',
        ingredientIds: ['i1'],
        stageIndex: 0,
        heatLevel: '大火',
        durationMinutes: 20,
        notes: '土豆对切码盘，入开水蒸锅大火蒸20分钟至沙软'
      },
      {
        id: 'b2',
        label: '蘸椒盐蒜泥香油',
        sublabel: 'Dip Garlic Salt',
        ingredientIds: ['i1', 'i2'],
        stageIndex: 1,
        notes: '搭配椒盐蒜泥香油蘸碟食用'
      }
    ],
    finalBlock: {
      method: 'steam',
      label: '粉软沙香 🥔',
      instructions: '保留土豆原汁面软，替代精米面主食健康'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 92. 蒸南瓜2 (蒸)
  {
    id: 'cn-92-zheng-nangua-2',
    version: '3.0',
    status: 'published',
    title: '🎃 冰糖桂花清蒸贝贝南瓜',
    description: '排毒养颜天然甜品蒸菜。贝贝南瓜切瓣去籽，撒碎冰糖大火蒸15分钟，出锅撒干桂花。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '圆形蒸盘',
      preheat: '贝贝南瓜外皮刷洗干净',
      servings: '2 人份'
    },
    ingredients: [
      { id: 'i1', name: '贝贝南瓜 (切小瓣)', amountText: '300 g', category: 'produce' },
      { id: 'i2', name: '碎冰糖与干桂花', amountText: '冰糖10g + 干桂花2g', category: 'seasoning' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '南瓜撒冰糖蒸15分钟撒桂花',
        sublabel: 'Steam Pumpkin & Osmanthus',
        ingredientIds: ['i1', 'i2'],
        stageIndex: 0,
        heatLevel: '大火',
        durationMinutes: 15,
        notes: '南瓜瓣码盘撒碎冰糖，蒸15分钟关火出锅撒干桂花'
      }
    ],
    finalBlock: {
      method: 'steam',
      label: '栗香甜面 🎃',
      instructions: '贝贝南瓜口感干面如栗子，桂花香气宜人'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 93. 清炒菠菜 (炒)
  {
    id: 'cn-93-chao-baocai',
    version: '3.0',
    status: 'published',
    title: '🥬 蒜香清炒绿菠菜',
    description: '补铁补叶酸经典绿叶菜。菠菜先焯水去除草酸，爆香蒜末大火快炒1分钟加盐出锅，护眼润肠。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '中式炒锅',
      preheat: '准备开水焯菠菜去草酸',
      servings: '2 人份'
    },
    ingredients: [
      { id: 'i1', name: '新鲜菠菜 (焯水)', amountText: '300 g', category: 'produce' },
      { id: 'i2', name: '大量蒜末', amountText: '15 g', category: 'produce' },
      { id: 'i3', name: '食盐与鸡精', amountText: '盐2g + 鸡精', category: 'seasoning' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '菠菜沸水焯30秒',
        sublabel: 'Blanch Spinach 30s',
        ingredientIds: ['i1'],
        stageIndex: 0,
        heatLevel: '大火',
        durationMinutes: 1,
        notes: '菠菜入沸水焯30秒去草酸，捞出挤干水'
      },
      {
        id: 'b2',
        label: '爆蒜末大火炒1分钟',
        sublabel: 'Stir-Fry Spinach & Garlic',
        ingredientIds: ['i1', 'i2', 'i3'],
        stageIndex: 1,
        heatLevel: '大火',
        durationMinutes: 1,
        notes: '油热爆蒜末，下焯水菠菜放盐鸡精大火快炒1分钟出锅'
      }
    ],
    finalBlock: {
      method: 'fry',
      label: '鲜绿多汁 🥬',
      instructions: '焯水后口感不涩口，富含胡萝卜素与铁质'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 94. 清炒茧豆 (炒)
  {
    id: 'cn-94-chao-jiandou',
    version: '3.0',
    status: 'published',
    title: '🫛 葱油爆炒鲜蚕豆 (茧豆)',
    description: '健脑补锌时令鲜菜。鲜蚕豆去壳焯水，用香葱炼出葱油后大火快炒3分钟，放盐出锅，粉甜脆嫩。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '平底炒锅',
      preheat: '鲜蚕豆剥皮焯水',
      servings: '2 人份'
    },
    ingredients: [
      { id: 'i1', name: '鲜蚕豆仁 (焯水)', amountText: '250 g', category: 'produce' },
      { id: 'i2', name: '香葱段', amountText: '20 g', category: 'produce' },
      { id: 'i3', name: '食盐与白糖', amountText: '盐2g + 糖2g', category: 'seasoning' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '炼葱油炒蚕豆',
        sublabel: 'Saute Scallion Oil & Fava Beans',
        ingredientIds: ['i1', 'i2', 'i3'],
        stageIndex: 0,
        heatLevel: '大火',
        durationMinutes: 3,
        notes: '油热下香葱段小火炸香，倒焯水蚕豆大火爆炒加盐糖调味'
      }
    ],
    finalBlock: {
      method: 'fry',
      label: '葱香甜粉 🫛',
      instructions: '蚕豆翠绿粉糯，葱香扑鼻'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 95. 清蒸黄瓜 (蒸)
  {
    id: 'cn-95-zheng-huanggua',
    version: '3.0',
    status: 'published',
    title: '🥒 蒜蓉肉末蒸黄瓜酿',
    description: '清热利尿创新清淡菜。黄瓜切厚段挖去中间瓜瓤，填入调味猪肉末大火蒸10分钟，淋少许生抽。',
    cuisine: 'chinese',
    difficulty: 'medium',
    prerequisites: {
      containerSize: '平底蒸盘',
      preheat: '黄瓜切段用小勺挖空中间',
      servings: '2 人份'
    },
    ingredients: [
      { id: 'i1', name: '黄瓜厚段 (挖空做杯)', amountText: '2 根 (约250g)', category: 'produce' },
      { id: 'i2', name: '调味猪肉末', amountText: '100 g', category: 'main' },
      { id: 'i3', name: '蒜泥生抽香油淋汁', amountText: '蒜泥10g + 生抽10ml + 香油5ml', category: 'seasoning' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '黄瓜酿肉末大火蒸10分钟',
        ingredientIds: ['i1', 'i2'],
        stageIndex: 0,
        heatLevel: '大火',
        durationMinutes: 10,
        note: '肉末填入黄瓜环中平铺装盘，水沸入蒸锅大火蒸10分钟至肉末熟透'
      },
      {
        id: 'b2',
        label: '出锅淋上蒜香生抽汁',
        dependencies: [{ sourceBlockId: 'b1', type: 'material', label: '蒸熟黄瓜酿' }],
        inputBlockIds: ['b1'],
        ingredientIds: ['i3'],
        stageIndex: 1,
        durationMinutes: 1,
        note: '端出蒸盘，将调好的蒜泥生抽香油趁热淋在黄瓜酿肉上'
      }
    ],
    finalBlock: {
      method: 'steam',
      label: '清香肉鲜 🥒',
      durationText: '趁热享用',
      instructions: '黄瓜软嫩清香，蒸出的汁水极度鲜美'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-09-14T10:00:00Z'
  },

  // 96. 清炒苦瓜 (炒)
  {
    id: 'cn-96-chao-kugua',
    version: '3.0',
    status: 'published',
    title: '🥒 蒜香豆豉清炒苦瓜片',
    description: '清热解毒平稳血糖家常菜。苦瓜去瓤切薄片用盐腌挤出苦水，爆蒜末豆豉大火快炒2分钟。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '平底炒锅',
      preheat: '苦瓜刮净白膜切薄片盐腌',
      servings: '2 人份'
    },
    ingredients: [
      { id: 'i1', name: '苦瓜薄片 (盐腌挤水)', amountText: '200 g', category: 'produce' },
      { id: 'i2', name: '豆豉与蒜末红椒丝', amountText: '豆豉10g+蒜末5g+红椒丝', category: 'seasoning' },
      { id: 'i3', name: '食盐与白糖', amountText: '盐2g + 糖2g', category: 'seasoning' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '爆豆豉蒜末炒苦瓜',
        sublabel: 'Stir-Fry Bitter Gourd & Douchi',
        ingredientIds: ['i1', 'i2', 'i3'],
        stageIndex: 0,
        heatLevel: '大火',
        durationMinutes: 2,
        notes: '油热爆蒜末豆豉下苦瓜片大火快炒，加盐糖提鲜出锅'
      }
    ],
    finalBlock: {
      method: 'fry',
      label: '甘苦回甜 🥒',
      instructions: '豆豉咸香掩盖苦味，清热祛火'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 97. 清蒸豆腐干 (蒸)
  {
    id: 'cn-97-zheng-doufugan',
    version: '3.0',
    status: 'published',
    title: '🫘 剁椒蒸五香豆腐干',
    description: '高蛋白低脂香辣蒸菜。五香豆腐干切厚片码盘，铺上面豉酱与红剁椒大火蒸10分钟，淋香油葱花。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '平底蒸盘',
      preheat: '豆腐干斜切厚片',
      servings: '2 人份'
    },
    ingredients: [
      { id: 'i1', name: '五香豆腐干 (切片)', amountText: '250 g', category: 'main' },
      { id: 'i2', name: '红剁椒与面豉酱', amountText: '剁椒15g + 面豉酱10g', category: 'seasoning' },
      { id: 'i3', name: '葱花与芝麻香油', amountText: '葱花 + 香油5g', category: 'seasoning' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '豆干码盘铺剁椒蒸10分钟',
        sublabel: 'Steam Tofu Slices 10 Mins',
        ingredientIds: ['i1', 'i2', 'i3'],
        stageIndex: 0,
        heatLevel: '大火',
        durationMinutes: 10,
        notes: '豆干切片码盘，涂面豉酱铺红剁椒，水沸蒸10分钟，出锅撒葱花淋香油'
      }
    ],
    finalBlock: {
      method: 'steam',
      label: '咸辣软韧 🫘',
      instructions: '豆干吸收剁椒香味，软韧有嚼劲'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 98. 清炒萝卜 (炒)
  {
    id: 'cn-98-chao-luobo',
    version: '3.0',
    status: 'published',
    title: '🥕 葱花炝锅清炒白萝卜丝',
    description: '下气消食低卡清甜快手菜。白萝卜擦细丝，葱花炝锅大火翻炒2分钟至微软，放盐淋少许香醋。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '平底炒锅',
      preheat: '白萝卜擦细丝',
      servings: '2 人份'
    },
    ingredients: [
      { id: 'i1', name: '白萝卜 (擦细丝)', amountText: '300 g', category: 'produce' },
      { id: 'i2', name: '大葱花与生姜丝', amountText: '葱花10g + 姜丝3g', category: 'produce' },
      { id: 'i3', name: '食盐与香醋', amountText: '盐2g + 香醋3g', category: 'seasoning' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '葱花炝锅炒萝卜丝',
        sublabel: 'Flash Fry Radish Shreds',
        ingredientIds: ['i1', 'i2', 'i3'],
        stageIndex: 0,
        heatLevel: '大火',
        durationMinutes: 2,
        notes: '油热下葱花姜丝爆香，下萝卜丝大火炒软加盐醋翻匀'
      }
    ],
    finalBlock: {
      method: 'fry',
      label: '清甜顺气 🥕',
      instructions: '萝卜丝清甜多汁，顺气助消化'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 99. 清蒸百合 (蒸)
  {
    id: 'cn-99-zheng-baihe',
    version: '3.0',
    status: 'published',
    title: '🌸 蜂蜜枸杞蒸鲜百合',
    description: '润肺止咳宁心安神甜品蒸菜。鲜百合剥瓣洗净码盘，铺枸杞子大火蒸10分钟，出锅淋纯蜂蜜。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '小蒸盘',
      preheat: '鲜百合剥瓣去杂质',
      servings: '2 人份'
    },
    ingredients: [
      { id: 'i1', name: '新鲜百合瓣', amountText: '150 g', category: 'produce' },
      { id: 'i2', name: '枸杞子', amountText: '10 g', category: 'produce' },
      { id: 'i3', name: '纯蜂蜜', amountText: '20 g', category: 'liquid' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '百合铺枸杞大火蒸10分钟',
        sublabel: 'Steam Lily Bulbs 10 Mins',
        ingredientIds: ['i1', 'i2'],
        stageIndex: 0,
        heatLevel: '大火',
        durationMinutes: 10,
        notes: '百合瓣装盘铺枸杞，水沸入蒸锅蒸10分钟至透明面糯'
      },
      {
        id: 'b2',
        label: '淋纯蜂蜜',
        sublabel: 'Drizzle Honey',
        ingredientIds: ['i1', 'i3'],
        stageIndex: 1,
        notes: '出锅稍晾凉淋纯蜂蜜拌匀食之'
      }
    ],
    finalBlock: {
      method: 'steam',
      label: '清甜粉糯 🌸',
      instructions: '百合片片面糯甘甜，润肺改善失眠'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 100. 清炒香菇 (炒)
  {
    id: 'cn-100-chao-xianggu',
    version: '3.0',
    status: 'published',
    title: '🍄 蚝油蒜香清炒鲜香菇',
    description: '提高免疫防癌抗癌鲜味菜。鲜香菇切厚片焯水，爆香蒜末大火翻炒，调李锦记蚝油勾薄芡。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '平底炒锅',
      preheat: '鲜香菇洗净切厚片焯水',
      servings: '2 人份'
    },
    ingredients: [
      { id: 'i1', name: '鲜香菇 (切厚片焯水)', amountText: '250 g', category: 'produce' },
      { id: 'i2', name: '蒜末与李锦记蚝油', amountText: '蒜末10g + 蚝油15g', category: 'seasoning' },
      { id: 'i3', name: '水淀粉与食盐', amountText: '水淀粉 + 盐2g', category: 'seasoning' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '爆蒜末炒香菇勾芡',
        sublabel: 'Stir-Fry Fresh Shiitake',
        ingredientIds: ['i1', 'i2', 'i3'],
        stageIndex: 0,
        heatLevel: '大火',
        durationMinutes: 3,
        notes: '油热爆蒜末下焯水香菇片大火翻炒，加蚝油盐，淋水淀粉勾芡出锅'
      }
    ],
    finalBlock: {
      method: 'fry',
      label: '滑嫩鲜香 🍄',
      instructions: '香菇口感滑嫩如鲍鱼，浓郁鲜美'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 101. 清蒸红薯 (蒸)
  {
    id: 'cn-101-zheng-hongshu',
    version: '3.0',
    status: 'published',
    title: '🍠 原味清蒸红心红薯',
    description: '通便抗癌天然粗粮蒸菜。红心红薯去皮切长滚刀块，大火蒸20分钟至软糯面甜。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '蒸盘 & 蒸锅',
      preheat: '红薯去皮切滚刀块',
      servings: '2-3 人份'
    },
    ingredients: [
      { id: 'i1', name: '红心蜜红薯 (去皮块)', amountText: '400 g', category: 'produce' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '红薯块大火蒸20分钟',
        sublabel: 'Steam Sweet Potatoes 20 Mins',
        ingredientIds: ['i1'],
        stageIndex: 0,
        heatLevel: '大火',
        durationMinutes: 20,
        notes: '红薯块码盘，入开水蒸锅大火蒸20分钟至软软甜甜'
      }
    ],
    finalBlock: {
      method: 'steam',
      label: '蜜甜粉软 🍠',
      instructions: '原汁原味香甜，富含胡萝卜素与脱氢表雄酮'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 102. 清炒丝瓜 (炒)
  {
    id: 'cn-102-chao-siguajuan',
    version: '3.0',
    status: 'published',
    title: '🥒 蒜香清炒翠绿丝瓜',
    description: '美容护肤清热解毒快手菜。鲜丝瓜去皮切滚刀块，爆香蒜末大火快炒2分钟加盐出锅，保持鲜绿不黑。',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '平底炒锅',
      preheat: '丝瓜去皮切滚刀块用少许盐抓匀',
      servings: '2 人份'
    },
    ingredients: [
      { id: 'i1', name: '鲜丝瓜 (切滚刀块)', amountText: '300 g', category: 'produce' },
      { id: 'i2', name: '蒜末与食盐鸡精', amountText: '蒜末10g + 盐2g + 鸡精', category: 'seasoning' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '爆蒜末大火快炒丝瓜',
        sublabel: 'Flash Fry Sponge Gourd',
        ingredientIds: ['i1', 'i2'],
        stageIndex: 0,
        heatLevel: '大火',
        durationMinutes: 2,
        notes: '油热爆蒜末下丝瓜块大火翻炒2分钟加盐鸡精炒匀出锅'
      }
    ],
    finalBlock: {
      method: 'fry',
      label: '翠绿滑嫩 🥒',
      instructions: '丝瓜软滑多汁，汤汁清甜'
    },
    createdAt: '2016-09-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  }
]

export const CHINESE_HEALTHY_RECIPES: VisualRecipeV3[] = CHINESE_HEALTHY_RECIPES_DATA.map(recipe => ({
  ...recipe,
  provenance: recipe.provenance || {
    sourceType: 'book',
    title: '《蒸炖炒，营养师的健康食谱》',
    author: '张晔',
    note: '数据集声明来源；具体页码与逐项原文比对尚待补录。',
  },
  dataReview: recipe.dataReview || {
    overall: 'unreviewed',
    ingredients: 'unreviewed',
    quantities: 'unreviewed',
    topology: 'unreviewed',
    heatAndTiming: 'unreviewed',
    assumptions: ['来源书目已知，但页码、用量、工序依赖与时间尚未逐项复核。'],
  },
}))
