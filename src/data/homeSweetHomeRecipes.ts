import type { VisualRecipeV3 } from '@/types/recipeV3'

/**
 * 弗吉尼亚理工大学 (Virginia Tech) 2003 年《Home Sweet Home Cookbook》经典家常食谱全集
 */
const HOME_SWEET_HOME_RECIPES_DATA: VisualRecipeV3[] = [
  // 1. Hazelnut Mocha Mix (大奖得主 🏆)
  {
    id: 'hsh-01-hazelnut-mocha',
    version: '3.0',
    status: 'published',
    title: '🏆 榛果摩卡特饮干粉 (Hazelnut Mocha Mix)',
    coverImageUrl: '/recipe-covers/hsh-01-hazelnut-mocha.webp',
    description: '2003 Home Sweet Home 获奖饮品！Delora Bright 妈妈寄给 Tech 学子的温暖家乡味，香浓热可可与榛果咖啡的完美融合。',
    cuisine: 'western',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '大号密封容器 / 塑胶袋',
      preheat: '准备 10 oz 沸水',
      servings: '约 18 杯',
      prepNotes: '混合干粉后装袋，随时冲泡'
    },
    ingredients: [
      { id: 'i1', name: 'nonfat dry milk 脱脂奶粉', amountText: '1 pkg (440 g)', category: 'dairy' },
      { id: 'i2', name: 'confectioners sugar 糖粉 (过筛)', amountText: '1 pkg (450 g)', category: 'seasoning' },
      { id: 'i3', name: 'chocolate mix for milk 巧克力冲饮粉', amountText: '1 pkg (425 g)', category: 'seasoning' },
      { id: 'i4', name: 'non-dairy creamer 无乳奶精', amountText: '1 jar (310 g)', category: 'dairy' },
      { id: 'i5', name: 'hazelnut creamer 榛果味奶精', amountText: '2 jars (450 g)', category: 'dairy' },
      { id: 'i6', name: 'cocoa powder 纯可可粉', amountText: '1/2 cup (50 g)', category: 'seasoning' },
      { id: 'i7', name: 'instant coffee granules 即溶咖啡颗粒', amountText: '1/4 cup (25 g)', category: 'liquid' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '充分混合',
        sublabel: 'Mix Dry Powders',
        ingredientIds: ['i1', 'i2', 'i3', 'i4', 'i5', 'i6', 'i7'],
        stageIndex: 0,
        notes: '在大碗中将所有干粉充分搅拌混匀'
      },
      {
        id: 'b2',
        label: '密封装袋',
        sublabel: 'Pack & Store',
        ingredientIds: ['i1', 'i3', 'i5'],
        dependencies: [{ sourceBlockId: 'b1', type: 'material', label: '混合干粉' }],
        stageIndex: 1,
        notes: '装入保鲜袋或密封罐储存'
      }
    ],
    finalBlock: {
      method: 'serve',
      label: '热水冲泡 ☕',
      instructions: '取 3 满匙干粉，倒入 10 oz 沸水搅拌溶解即享',
      servingInstructions: '取 3 满匙干粉倒入杯中，冲入沸水充分搅拌溶解，趁热捧杯啜饮，榛果香气浓郁、可可醇厚丝滑、咖啡微苦回甘暖心',
      durationText: '2 min',
      notes: '微波加热水 2 分钟'
    },
    tips: [
      '冲调秘诀：冲泡时水温建议在 90℃~95℃ 左右，搅拌至干粉完全溶解后可顶上一勺打发鲜奶油或棉花糖，风味更接近专业咖啡馆。',
      '储存指南：调配好的干粉装入密封罐放置于干燥阴凉处可保存半年，是寒冬自饮或分装送给亲友的温馨暖心特饮。'
    ],
    createdAt: '2003-10-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 2. Taco Soup (大奖得主 🏆)
  {
    id: 'hsh-02-taco-soup',
    version: '3.0',
    status: 'published',
    title: '🏆 塔可墨西哥风味浓汤 (Taco Soup)',
    coverImageUrl: '/recipe-covers/hsh-02-taco-soup.webp',
    description: '2003 Home Sweet Home 获奖汤品！Lou Pape 妈妈的健康蔬菜肉汤，非常适合搭配面包或饼干。',
    cuisine: 'western',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '大号汤锅 / 慢炖锅 (Crockpot)',
      preheat: '准备四种豆罐头与番茄罐',
      servings: '12 人份 (1杯/份)',
      prepNotes: '肉类炒熟后加入全部罐头汁水慢炖'
    },
    ingredients: [
      { id: 'i2', name: 'large onion 洋葱 (切碎)', amountText: '1 颗', category: 'produce' },
      { id: 'i1', name: 'ground turkey 火鸡绞肉', amountText: '1 lb (450 g)', category: 'main' },
      { id: 'i3', name: 'ranch dressing mix Ranch香调料包', amountText: '1 pkg (28 g)', category: 'seasoning' },
      { id: 'i4', name: 'taco seasoning 塔可香料包', amountText: '1 pkg (35 g)', category: 'seasoning' },
      { id: 'i5_1', name: 'pinto beans 斑豆罐头', amountText: '1 罐 (15 oz)', category: 'produce' },
      { id: 'i5_2', name: 'chili beans 辣豆罐头', amountText: '1 罐 (15 oz)', category: 'produce' },
      { id: 'i6_1', name: 'whole kernel corn 甜玉米粒罐头', amountText: '1 罐 (15 oz)', category: 'produce' },
      { id: 'i6_2', name: 'stewed tomatoes 炖番茄罐头', amountText: '1 罐 (14.5 oz)', category: 'produce' },
      { id: 'i7', name: 'crushed tomatoes 碎番茄罐头', amountText: '28 oz (800 g)', category: 'produce' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '煸炒洋葱',
        sublabel: 'Sauté Onion',
        ingredientIds: ['i2'],
        stageIndex: 0,
        heatLevel: '中火',
        durationMinutes: 5
      },
      {
        id: 'b2',
        label: '炒香火鸡肉',
        sublabel: 'Brown Turkey',
        ingredientIds: ['i1', 'i2'],
        dependencies: [{ sourceBlockId: 'b1', type: 'order', label: '同锅炒肉' }],
        stageIndex: 1,
        heatLevel: '中大火',
        durationMinutes: 8
      },
      {
        id: 'b3',
        label: '倒入罐头与调料',
        sublabel: 'Combine All',
        ingredientIds: ['i1', 'i3', 'i4', 'i5_1', 'i5_2', 'i6_1', 'i6_2', 'i7'],
        dependencies: [{ sourceBlockId: 'b2', type: 'material', label: '炒香肉料' }],
        stageIndex: 2,
        heatLevel: '中火',
        notes: '连同罐头汤汁一并倒入'
      }
    ],
    finalBlock: {
      method: 'stew',
      label: '慢炖浓汤 🍲',
      instructions: '小火慢炖 1 小时，或放慢炖锅低火滚煮一整天',
      servingInstructions: '盛入大汤碗中趁热享用，汤色红亮诱人、豆香与玉米清甜浓郁、肉质香嫩微辣，搭配玉米脆片或酸奶油极其过瘾',
      durationText: '60 min',
      notes: '搭配热面包或玉米饼干食用'
    },
    tips: [
      '烹饪妙招：火鸡绞肉比传统牛肉绞肉脂肪含量更低、热量更轻，烹调时充分吸饱塔可香料与番茄果酸，浓郁而不油腻。',
      '风味延伸：此汤冷藏过夜后风味更加融合醇厚，食用前撒上一把车达芝士碎和新鲜牛油果丁，口感层次更丰富。'
    ],
    createdAt: '2003-10-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 3. Chicken Ritz (大奖得主 🏆)
  {
    id: 'hsh-03-chicken-ritz',
    version: '3.0',
    status: 'published',
    title: '🏆 Ritz饼干金黄烤鸡 (Chicken Ritz)',
    coverImageUrl: '/recipe-covers/hsh-03-chicken-ritz.webp',
    description: '2003 Home Sweet Home 获奖主菜！Linda Parson 的暖心家常烤鸡，浓郁奶油与酥脆饼干的绝妙结合。',
    cuisine: 'western',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '9x13 吋烤盘',
      preheat: '预热烤箱至 350°F (175°C)',
      servings: '4 人份',
      prepNotes: '鸡胸肉提前煮熟切块'
    },
    ingredients: [
      { id: 'i1', name: 'cooked chicken breast 熟鸡胸肉 (切块)', amountText: '3 cups (450 g)', category: 'main' },
      { id: 'i4', name: 'green peas 青豌豆 (沥干)', amountText: '1 can (选填)', category: 'produce' },
      { id: 'i2', name: 'cream of chicken soup 浓缩鸡汤罐头', amountText: '1 can (300 g)', category: 'liquid' },
      { id: 'i3', name: 'sour cream 酸奶油', amountText: '8 oz (225 g)', category: 'dairy' },
      { id: 'i5', name: 'crushed Ritz crackers Ritz饼干碎', amountText: '30 块 (压碎)', category: 'grain' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '底盘铺鸡肉',
        sublabel: 'Layer Chicken',
        ingredientIds: ['i1', 'i4'],
        stageIndex: 0,
        equipment: '9x13 烤盘',
        notes: '均匀铺在底盘'
      },
      {
        id: 'b2',
        label: '调制汤酱',
        sublabel: 'Mix Cream Sauce',
        ingredientIds: ['i2', 'i3'],
        dependencies: [{ sourceBlockId: 'b1', type: 'order', label: '备酱待浇' }],
        stageIndex: 1,
        notes: '将酸奶油与鸡汤罐头完全混合'
      },
      {
        id: 'b3',
        label: '浇酱并撒饼干碎',
        sublabel: 'Topping Ritz',
        ingredientIds: ['i5'],
        dependencies: [
          { sourceBlockId: 'b1', type: 'material', label: '鸡肉底层' },
          { sourceBlockId: 'b2', type: 'material', label: '奶油汤酱' }
        ],
        inputBlockIds: ['b1', 'b2'],
        stageIndex: 2,
        notes: '擀面杖碾碎饼干均匀撒在表面'
      }
    ],
    finalBlock: {
      method: 'bake',
      label: '金黄烘焙 🍗',
      temperatureF: 350,
      temperatureC: 175,
      durationText: '30 min',
      instructions: '入烤箱烘焙至表面金黄酥脆、内部冒泡 bubbling',
      servingInstructions: '烤盘出炉趁热分切装盘享用，顶层Ritz饼干金黄酥脆咸香、内层鸡肉鲜嫩多汁裹满醇滑奶油汤汁，老少皆宜'
    },
    tips: [
      '烘焙秘诀：Ritz饼干本身带有黄油与微咸风味，碾成粗颗粒碎屑即可，保留颗粒感能使烤出的酥顶格外香脆。',
      '搭配建议：传统美式家常吃法可搭配蒸西兰花或新鲜绿叶沙拉，清爽解腻，平衡奶油浓汤的丰厚口感。'
    ],
    createdAt: '2003-10-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 4. Mexican Lasagna (大奖得主 🏆)
  {
    id: 'hsh-04-mexican-lasagna',
    version: '3.0',
    status: 'published',
    title: '🏆 墨西哥风味千层饼 (Mexican Lasagna)',
    coverImageUrl: '/recipe-covers/hsh-04-mexican-lasagna.webp',
    description: '2003 Home Sweet Home 获奖主菜！Gale Moore 妈妈的经典菜，孩子在学校念念不忘的丰盛午晚餐。',
    cuisine: 'western',
    difficulty: 'medium',
    prerequisites: {
      containerSize: '大号方形深烤盘',
      preheat: '预热烤箱至 350°F (175°C)',
      servings: '8 人份',
      prepNotes: '面条提前煮软，牛肉炒香加Taco调料'
    },
    ingredients: [
      { id: 'i1', name: 'lasagna noodles 千层面面条', amountText: '9 片 (1/2盒)', category: 'grain' },
      { id: 'i2', name: 'ground beef 牛肉碎', amountText: '1 lb (450 g)', category: 'main' },
      { id: 'i3', name: 'salsa 墨西哥莎莎酱', amountText: '8 oz (225 g)', category: 'produce' },
      { id: 'i7', name: 'taco seasoning 塔可香料包', amountText: '1 pkg', category: 'seasoning' },
      { id: 'i4', name: 'spaghetti sauce 意面红酱', amountText: '16 oz (450 g)', category: 'liquid' },
      { id: 'i5', name: 'mozzarella cheese 马苏里拉芝士碎', amountText: '1 lb (450 g)', category: 'dairy' },
      { id: 'i6', name: 'cheddar cheese 车达芝士碎', amountText: '1 lb (450 g)', category: 'dairy' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '煮千层面',
        sublabel: 'Boil Noodles',
        ingredientIds: ['i1'],
        stageIndex: 0,
        heatLevel: '大火',
        durationMinutes: 10
      },
      {
        id: 'b2',
        label: '炒牛肉加调料',
        sublabel: 'Cook Taco Beef',
        ingredientIds: ['i2', 'i3', 'i7'],
        dependencies: [{ sourceBlockId: 'b1', type: 'order', label: '分锅炒馅' }],
        stageIndex: 1,
        heatLevel: '中火',
        durationMinutes: 12,
        notes: '牛肉炒熟沥油，加水与Taco包收汁，混合Salsa'
      },
      {
        id: 'b3',
        label: '交替铺层',
        sublabel: 'Layer Lasagna',
        ingredientIds: ['i1', 'i2', 'i4', 'i5', 'i6'],
        dependencies: [
          { sourceBlockId: 'b1', type: 'material', label: '煮好千层面' },
          { sourceBlockId: 'b2', type: 'material', label: '炒好Taco肉末' }
        ],
        stageIndex: 2,
        notes: '按面条 -> Taco肉末 -> 两种芝士 -> 意面酱顺序交替3层'
      }
    ],
    finalBlock: {
      method: 'bake',
      label: '熔岩烘焙 🧀',
      temperatureF: 350,
      temperatureC: 175,
      durationText: '30 min',
      instructions: '烘焙 30 分钟至顶层芝士完全融化冒泡',
      servingInstructions: '出炉静置10分钟后切方块装盘享用，千层截面分明、马苏里拉与车达芝士拉丝浓郁、牛肉馅香辣爆汁'
    },
    tips: [
      '防塌要诀：出炉后务必静置10~15分钟再切块，让融化的双重芝士与酱汁稍作凝固收敛，切面才能整齐挺立不散架。',
      '面条处理：千层面条煮至八成熟（al dente）即可捞出过冷水沥干，烘烤时吸收肉酱汤汁后软糯弹牙恰到好处。'
    ],
    createdAt: '2003-10-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 5. Grandma's Delicious Noodle Kugel (大奖得主 🏆)
  {
    id: 'hsh-05-noodle-kugel',
    version: '3.0',
    status: 'published',
    title: '🏆 祖母秘制面条库格尔 (Grandma’s Noodle Kugel)',
    coverImageUrl: '/recipe-covers/hsh-05-noodle-kugel.webp',
    description: '2003 Home Sweet Home 获奖副菜！Sara Cunningham 家族传承几代人的节庆必吃金黄烤面条。',
    cuisine: 'western',
    difficulty: 'medium',
    prerequisites: {
      containerSize: '9x13 吋玻璃烤盘',
      preheat: '预热烤箱至 350°F (175°C)',
      servings: '8-10 人份',
      prepNotes: '面条煮熟沥干，芝士提前室温软化'
    },
    ingredients: [
      { id: 'i1', name: 'fine egg noodles 细蛋面', amountText: '1/2 lb (225 g)', category: 'grain' },
      { id: 'i2', name: 'cream cheese 奶油芝士 (软化)', amountText: '1/2 lb (225 g)', category: 'dairy' },
      { id: 'i3', name: 'cottage cheese 农夫鲜芝士', amountText: '1 lb (450 g)', category: 'dairy' },
      { id: 'i4', name: 'eggs 鸡蛋', amountText: '4 颗', category: 'main' },
      { id: 'i5', name: 'sugar 砂糖', amountText: '3/4 cup (150 g)', category: 'seasoning' },
      { id: 'i6', name: 'sour cream 酸奶油', amountText: '6 cups (600 g)', category: 'dairy' },
      { id: 'i7', name: 'vanilla extract 香草精', amountText: '7 tsp', category: 'seasoning' },
      { id: 'i8', name: 'graham crackers 全麦饼干碎', amountText: '1 pkg (10片压碎)', category: 'grain' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '煮蛋面',
        sublabel: 'Boil Noodles',
        ingredientIds: ['i1'],
        stageIndex: 0,
        heatLevel: '中大火',
        durationMinutes: 8
      },
      {
        id: 'b2',
        label: '搅打双重芝士',
        sublabel: 'Smooth Cheeses',
        ingredientIds: ['i2', 'i3'],
        dependencies: [{ sourceBlockId: 'b1', type: 'order', label: '面条沥干待用' }],
        stageIndex: 1,
        notes: '在大碗中将软化奶油芝士与鲜芝士混合顺滑'
      },
      {
        id: 'b3',
        label: '混合液与面条',
        sublabel: 'Combine Custard',
        ingredientIds: ['i1', 'i2', 'i4', 'i5', 'i6', 'i7'],
        dependencies: [
          { sourceBlockId: 'b1', type: 'material', label: '煮熟蛋面' },
          { sourceBlockId: 'b2', type: 'material', label: '芝士底液' }
        ],
        stageIndex: 2,
        notes: '加入蛋液、糖、酸奶油与香草精，最后轻轻翻入蛋面'
      },
      {
        id: 'b4',
        label: '铺上饼干酥顶',
        sublabel: 'Crumb Topping',
        ingredientIds: ['i8'],
        dependencies: [{ sourceBlockId: 'b3', type: 'material', label: '面条芝士层' }],
        stageIndex: 3,
        equipment: '9x13 玻璃烤盘',
        notes: '倒入方盘中，表面撒厚厚一层全麦饼干碎'
      }
    ],
    finalBlock: {
      method: 'bake',
      label: '金黄烘焙 🥧',
      temperatureF: 350,
      temperatureC: 175,
      durationText: '60 min',
      instructions: '烘焙 1 小时至凝固金黄，稍放凉 15 分钟后切块食用',
      servingInstructions: '出炉稍放凉15分钟切块装盘享用，外层饼干碎酥香焦脆、内芯细蛋面柔嫩如布丁、芝士奶香浓郁清甜微酸'
    },
    tips: [
      '传统工艺：将奶油芝士提前室温彻底软化，与农夫鲜芝士搅打顺滑无颗粒后再与酸奶油融合，是库格尔如布丁般滑嫩的核心。',
      '温食冷享皆宜：刚出炉温热食用奶香馥郁，冷藏后作为甜点切块冰凉紧实，别具风味。'
    ],
    createdAt: '2003-10-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 6. Barbecued Butter Beans (大奖得主 🏆)
  {
    id: 'hsh-06-bbq-butter-beans',
    version: '3.0',
    status: 'published',
    title: '🏆 烧烤黄油豆 (Barbecued Butter Beans)',
    coverImageUrl: '/recipe-covers/hsh-06-bbq-butter-beans.webp',
    description: '2003 Home Sweet Home 获奖副菜！Sandy Mackie 妈妈野餐与尾门派对最受欢迎的浓郁烘焙豆。',
    cuisine: 'western',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '敞口大烤盘 / 铸铁锅',
      preheat: '预热烤箱至 350°F (175°C)',
      servings: '10-12 人份',
      prepNotes: '黄油豆罐头需提前沥干水分'
    },
    ingredients: [
      { id: 'i1', name: 'butter beans 沥干黄油豆罐头', amountText: '6 罐 (每罐1lb)', category: 'main' },
      { id: 'i2', name: 'brown sugar 红糖', amountText: '1.5 盒 (约600g)', category: 'seasoning' },
      { id: 'i3', name: 'catsup 番茄酱', amountText: '1 瓶 (36 oz/1 kg)', category: 'liquid' },
      { id: 'i4', name: 'bacon 培根 (切小块)', amountText: '1 lb (450 g)', category: 'main' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '混合全部食材',
        sublabel: 'Mix Ingredients',
        ingredientIds: ['i1', 'i2', 'i3', 'i4'],
        stageIndex: 0,
        equipment: '敞口大烤盘 / 铸铁锅',
        notes: '将黄油豆、红糖、番茄酱与培根块在容器中充分搅匀'
      }
    ],
    finalBlock: {
      method: 'stew',
      label: '慢烤收汁 🫘',
      temperatureF: 350,
      temperatureC: 175,
      durationText: '2.5 hours',
      instructions: '入烤箱烘烤 2.5 小时，期间偶尔翻动，至培根香酥、酱汁浓稠',
      servingInstructions: '盛入深盘或砂锅趁热享用，黄油豆沙软粉润、培根香脆咸香、烧烤酱汁红亮浓稠、甜咸微熏极其下饭'
    },
    tips: [
      '慢烤秘诀：长达2.5小时的低温慢烤能使培根中的油脂充分渗透到黄油豆内部，番茄酱与红糖自然焦糖化裹住每一颗豆子。',
      '派对百搭：这是美式BBQ烧烤聚会和野餐中最受欢迎的经典配菜，搭配烤排骨、手撕猪肉或汉堡堪称绝配。'
    ],
    createdAt: '2003-10-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 7. Pineapple Stuffing (大奖得主 🏆)
  {
    id: 'hsh-07-pineapple-stuffing',
    version: '3.0',
    status: 'published',
    title: '🏆 菠萝香面包填料 (Pineapple Stuffing)',
    coverImageUrl: '/recipe-covers/hsh-07-pineapple-stuffing.webp',
    description: '2003 Home Sweet Home 获奖副菜！Carol Carson 的复活节与火腿绝配甜美填料。',
    cuisine: 'western',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '1.5 夸脱烤盘 (或9x13大盘)',
      preheat: '预热烤箱至 350°F (175°C)',
      servings: '6 人份',
      prepNotes: '黄油提前室温软化，菠萝沥干汁水'
    },
    ingredients: [
      { id: 'i1', name: 'butter 无盐黄油 (软化)', amountText: '1/2 cup (115 g)', category: 'dairy' },
      { id: 'i2', name: 'sugar 砂糖', amountText: '1/2 cup (100 g)', category: 'seasoning' },
      { id: 'i3', name: 'eggs 鸡蛋', amountText: '4 颗', category: 'main' },
      { id: 'i4', name: 'white bread 白面包丁', amountText: '5 片 (切方块)', category: 'grain' },
      { id: 'i5', name: 'crushed pineapple 沥干碎菠萝罐头', amountText: '20 oz (560 g)', category: 'produce' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '打发黄油砂糖',
        sublabel: 'Cream Butter & Sugar',
        ingredientIds: ['i1', 'i2'],
        stageIndex: 0,
        notes: '搅拌至羽毛状顺滑'
      },
      {
        id: 'b2',
        label: '逐个搅入鸡蛋',
        sublabel: 'Beat Eggs',
        ingredientIds: ['i1', 'i3'],
        dependencies: [{ sourceBlockId: 'b1', type: 'material', label: '黄油砂糖糊' }],
        stageIndex: 1,
        notes: '每次加入一颗鸡蛋并充分搅匀'
      },
      {
        id: 'b3',
        label: '折叠面包与菠萝',
        sublabel: 'Fold Bread & Pineapple',
        ingredientIds: ['i3', 'i4', 'i5'],
        dependencies: [{ sourceBlockId: 'b2', type: 'material', label: '鸡蛋甜糊' }],
        stageIndex: 2,
        equipment: '1.5 夸脱烤盘',
        notes: '用刮刀轻轻翻拌均匀倒入抹油模具'
      }
    ],
    finalBlock: {
      method: 'bake',
      label: '烘焙至金黄 🍍',
      temperatureF: 350,
      temperatureC: 175,
      durationText: '60 min',
      instructions: '烤箱烘焙 1 小时至表面金黄蓬松',
      servingInstructions: '出炉稍晾温热挖大勺装盘享用，表皮金黄微酥、内里蓬松湿润、黄油奶香与菠萝酸甜交织，果香四溢'
    },
    tips: [
      '去水关键：碎菠萝罐头必须用滤网彻底沥干汁水，避免面糊含水量过高导致烘烤后内部湿粘不起发。',
      '节日经典：在美国家庭感恩节和复活节盛宴中，甜美果香的面包填料是咸鲜烤火腿（Baked Ham）不可替代的灵魂伴侣。'
    ],
    createdAt: '2003-10-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 8. Pecan Rice (大奖得主 🏆)
  {
    id: 'hsh-08-pecan-rice',
    version: '3.0',
    status: 'published',
    title: '🏆 碧根果果仁米饭 (Pecan Rice)',
    coverImageUrl: '/recipe-covers/hsh-08-pecan-rice.webp',
    description: '2003 Home Sweet Home 获奖副菜！Patti Faulkner 妈妈感恩节的招牌美洲山核桃香米饭。',
    cuisine: 'western',
    difficulty: 'medium',
    prerequisites: {
      containerSize: '深平底锅与焗烤盘',
      preheat: '预热烤箱至 350°F (175°C)',
      servings: '10-12 人份',
      prepNotes: '米粒先用黄油橄榄油炒至琥珀色'
    },
    ingredients: [
      { id: 'i1', name: 'converted rice 长粒米', amountText: '2 cups (360 g)', category: 'grain' },
      { id: 'i2_1', name: 'olive oil 特级初榨橄榄油', amountText: '1 T.', category: 'liquid' },
      { id: 'i2_2', name: 'butter 无盐黄油', amountText: '2 T.', category: 'dairy' },
      { id: 'i3', name: 'chicken broth 鸡汤', amountText: '4 cups (950 mL)', category: 'liquid' },
      { id: 'i4', name: 'mushrooms 蘑菇 (切碎)', amountText: '8 oz (225 g)', category: 'produce' },
      { id: 'i5', name: 'pecans 碧根果碎', amountText: '1/2 cup (60 g)', category: 'produce' },
      { id: 'i6', name: 'green onions 葱花/青葱', amountText: '4 根 (切碎)', category: 'produce' },
      { id: 'i7', name: 'parmesan cheese 帕玛森芝士碎', amountText: '6 oz (170 g)', category: 'dairy' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '炒香米粒',
        sublabel: 'Sauté Rice',
        ingredientIds: ['i1', 'i2_1', 'i2_2'],
        stageIndex: 0,
        heatLevel: '中大火',
        durationMinutes: 3,
        notes: '炒至米粒变琥珀金黄'
      },
      {
        id: 'b2',
        label: '鸡汤焖煮',
        sublabel: 'Simmer Rice',
        ingredientIds: ['i1', 'i3'],
        dependencies: [{ sourceBlockId: 'b1', type: 'material', label: '炒香米粒' }],
        stageIndex: 1,
        heatLevel: '小火',
        durationMinutes: 20,
        notes: '盖锅盖焖煮至汤汁完全吸收'
      },
      {
        id: 'b3',
        label: '拌入果仁与芝士',
        sublabel: 'Fold Nuts & Cheese',
        ingredientIds: ['i1', 'i4', 'i5', 'i6', 'i7'],
        dependencies: [{ sourceBlockId: 'b2', type: 'material', label: '焖熟米饭' }],
        stageIndex: 2,
        equipment: '焗烤盘',
        notes: '混入蘑菇碎、碧根果、青葱与帕玛森芝士，转入焗盘'
      }
    ],
    finalBlock: {
      method: 'bake',
      label: '焗烤果仁饭 🍚',
      temperatureF: 350,
      temperatureC: 175,
      durationText: '20 min',
      instructions: '入烤箱 350°F 烘烤 20 分钟至香味溢出',
      servingInstructions: '出炉拌匀盛入饭碗趁热享用，米饭粒粒分明吸收鸡汤鲜味、碧根果香脆甘甜、帕玛森芝士醇香诱人'
    },
    tips: [
      '生米预炒：用橄榄油与黄油将生米粒炒至微金黄琥珀色，可锁住米粒淀粉，使后续焖烤后的米饭粒粒散落、弹牙不粘坨。',
      '果仁香气：碧根果碎入菜前如果提前干锅微烘或烤出香气，融入米饭后坚果油脂风味会更加浓郁爆发。'
    ],
    createdAt: '2003-10-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 9. Crunchy Peanut Butter Brownies (大奖得主 🏆)
  {
    id: 'hsh-09-peanut-butter-brownie',
    version: '3.0',
    status: 'published',
    title: '🏆 酥脆花生酱大理石布朗尼 (Crunchy PB Brownies)',
    coverImageUrl: '/recipe-covers/hsh-09-peanut-butter-brownie.webp',
    description: '2003 Home Sweet Home 获奖甜品！Pam Pillmore 妈妈聚餐秒光的花生酱布朗尼大理石蛋糕。',
    cuisine: 'western',
    difficulty: 'medium',
    prerequisites: {
      containerSize: '9x13 吋烤盘 (抹油底盘)',
      preheat: '预热烤箱至 350°F (175°C)',
      servings: '24 块',
      prepNotes: '花生酱夹心与布朗尼面糊分开打发'
    },
    ingredients: [
      { id: 'i1', name: 'cream cheese 奶油芝士 (软化)', amountText: '3 oz (85 g)', category: 'dairy' },
      { id: 'i2', name: 'peanut butter 柔滑花生酱', amountText: '1/3 cup (80 g)', category: 'produce' },
      { id: 'i3_1', name: 'granulated sugar 细砂糖', amountText: '1/4 cup (50 g)', category: 'seasoning' },
      { id: 'i3_2', name: 'vanilla extract 香草精', amountText: '1 tsp (5 mL)', category: 'liquid' },
      { id: 'i6', name: 'eggs 鸡蛋', amountText: '2 颗 (分两部分)', category: 'main' },
      { id: 'i4', name: 'brownie mix 布朗尼预拌粉', amountText: '1 pkg (22.5 oz)', category: 'grain' },
      { id: 'i5_1', name: 'hot water 热水', amountText: '1/3 cup (80 mL)', category: 'liquid' },
      { id: 'i5_2', name: 'vegetable oil 植物油', amountText: '1/2 cup (120 mL)', category: 'liquid' },
      { id: 'i7', name: 'cocktail peanuts 鸡尾酒花生 (切碎)', amountText: '1/2 cup (60 g)', category: 'produce' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '打发花生酱夹心',
        sublabel: 'Beat PB Filling',
        ingredientIds: ['i1', 'i2', 'i3_1', 'i3_2', 'i6'],
        stageIndex: 0,
        notes: '将奶油芝士、花生酱、糖、香草精与1颗蛋搅拌顺滑'
      },
      {
        id: 'b2',
        label: '调制布朗尼面糊',
        sublabel: 'Mix Brownie Batter',
        ingredientIds: ['i4', 'i5_1', 'i5_2', 'i6'],
        dependencies: [{ sourceBlockId: 'b1', type: 'order', label: '两部分分别调制' }],
        stageIndex: 1,
        notes: '大碗中混合预拌粉、热水、油与1颗蛋，勺子搅拌50下'
      },
      {
        id: 'b3',
        label: '铺层拉花与撒花生',
        sublabel: 'Marble & Topping',
        ingredientIds: ['i1', 'i4', 'i7'],
        dependencies: [
          { sourceBlockId: 'b1', type: 'material', label: '花生酱夹心' },
          { sourceBlockId: 'b2', type: 'material', label: '布朗尼面糊' }
        ],
        stageIndex: 2,
        notes: '铺一半布朗尼面糊，舀入花生酱心，覆盖剩余面糊用刀划出大理石纹，撒碎花生'
      }
    ],
    finalBlock: {
      method: 'bake',
      label: '烘焙冷却切块 🍫',
      temperatureF: 350,
      temperatureC: 175,
      durationText: '28-33 min',
      instructions: '烤箱烘焙 28-33 分钟，切勿过烤，完全冷却后切块冷藏',
      servingInstructions: '出炉完全放凉后切24方块装盘享用，大理石花纹雅致、外层微脆、内芯浓厚花生酱与黑巧布朗尼交融、碎花生香脆爆棚'
    },
    tips: [
      '冷藏切块要诀：布朗尼烘烤完成后切勿温热切块，室温完全放凉后放入冰箱冷藏1小时再切，切口整齐利落、花纹绝美。',
      '火候把控：竹签插入中心带有少许湿润蛋糕屑即可出炉，余温会使布朗尼内部达到如同生巧软心（Fudge）的绝佳口感。'
    ],
    createdAt: '2003-10-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 10. Italian Mushrooms (Chef Chad Brodkin)
  {
    id: 'hsh-10-italian-mushrooms',
    version: '3.0',
    status: 'published',
    title: '👨‍🍳 主厨意式酿烤蘑菇 (Italian Mushrooms)',
    coverImageUrl: '/recipe-covers/hsh-10-italian-mushrooms.webp',
    description: 'Virginia Tech 行政总厨 Chad Brodkin (国际烹饪奥林匹克金奖主厨) 特别献贡献的招牌迎宾菜。',
    cuisine: 'western',
    difficulty: 'medium',
    prerequisites: {
      containerSize: '平底烘焙烤盘',
      preheat: '预热烤箱至 350°F (175°C)',
      servings: '8 人份',
      prepNotes: '大蘑菇去茎，底座切平便于平放'
    },
    ingredients: [
      { id: 'i1', name: 'large fresh mushrooms 大鲜蘑菇', amountText: '12 oz (340 g)', category: 'produce' },
      { id: 'i7', name: 'softened butter 软化黄油', amountText: '2 tsp', category: 'dairy' },
      { id: 'i2', name: 'mozzarella cheese 马苏里拉芝士碎', amountText: '2.75 oz (80 g)', category: 'dairy' },
      { id: 'i3', name: 'parmesan cheese 帕玛森芝士粉', amountText: '2 T. (30 g)', category: 'dairy' },
      { id: 'i4_1', name: 'pimiento 甜椒丁', amountText: '1/4 oz (7 g)', category: 'produce' },
      { id: 'i4_2', name: 'fresh parsley 鲜欧芹碎', amountText: '1 T. (4 g)', category: 'produce' },
      { id: 'i5', name: 'breadcrumbs 碎面包屑', amountText: '1/2 oz (15 g)', category: 'grain' },
      { id: 'i6_1', name: 'roasted garlic 烤大蒜瓣', amountText: '3-4 瓣', category: 'produce' },
      { id: 'i6_2', name: 'dried italian herbs 意式综合干香草 (牛至罗勒)', amountText: '1 tsp', category: 'seasoning' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '切茎与炒碎蘑菇',
        sublabel: 'Sauté Stems',
        ingredientIds: ['i1', 'i7'],
        stageIndex: 0,
        heatLevel: '中火',
        durationMinutes: 4,
        notes: '蘑菇切平，蘑菇茎切碎用黄油炒香'
      },
      {
        id: 'b2',
        label: '调制芝士填料',
        sublabel: 'Mix Cheese Filling',
        ingredientIds: ['i1', 'i2', 'i3', 'i4_1', 'i4_2', 'i5', 'i6_1', 'i6_2'],
        dependencies: [{ sourceBlockId: 'b1', type: 'material', label: '炒香蘑菇碎' }],
        stageIndex: 1,
        notes: '混合备好的蘑菇碎、两种芝士、面包屑、熟蒜与香草'
      },
      {
        id: 'b3',
        label: '填入蘑菇伞',
        sublabel: 'Stuff Caps',
        ingredientIds: ['i1', 'i2'],
        dependencies: [{ sourceBlockId: 'b2', type: 'material', label: '混合芝士填料' }],
        stageIndex: 2,
        notes: '每个蘑菇伞填入 3/4 oz 馅料，压实防融化流出'
      }
    ],
    finalBlock: {
      method: 'bake',
      label: '金黄酿烤 🍄',
      temperatureF: 350,
      temperatureC: 175,
      durationText: '14 min',
      instructions: '入烤箱 350°F 烘烤 14 分钟至馅料融化金黄、蘑菇鲜嫩',
      servingInstructions: '烤盘出炉稍晾2分钟移入温热餐盘趁热享用，蘑菇肉厚嫩滑汁水丰盈、双重芝士金黄融化微拉丝、香草蒜香浓烈开胃'
    },
    tips: [
      '主厨工艺：蘑菇底座切平能保证在烤盘上平稳直立不倾倒，保留住烤制时析出的每一滴鲜美蘑菇原汁。',
      '香气升级：烤大蒜瓣提前捣成细腻蒜泥融入馅料，既有大蒜的温和甘甜，又不会有生蒜的辛辣刺激，尽显意式优雅。'
    ],
    createdAt: '2003-10-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 11. Overnight Pecan Rolls
  {
    id: 'hsh-11-pecan-rolls',
    version: '3.0',
    status: 'published',
    title: '🥐 过夜美洲山核桃肉桂卷 (Overnight Pecan Rolls)',
    coverImageUrl: '/recipe-covers/hsh-11-pecan-rolls.webp',
    description: 'Kalene Orndorff 妈妈平安夜准备、圣诞早晨烘焙的香甜面包卷，满屋肉桂与核桃甜香。',
    cuisine: 'western',
    difficulty: 'hard',
    prerequisites: {
      containerSize: '玻璃矩形烤盘',
      preheat: '平安夜发酵冷藏，早晨取出静置1小时',
      servings: '4 人份 (15个卷)',
      prepNotes: '底层铺蜂蜜红糖核桃，顶部放肉桂卷'
    },
    ingredients: [
      { id: 'i1_1', name: 'active dry yeast 活性干酵母', amountText: '1 tbsp (10 g)', category: 'grain' },
      { id: 'i1_2', name: 'warm milk/water 温水/温奶', amountText: '1/4 cup (60 mL)', category: 'liquid' },
      { id: 'i2_1', name: 'granulated sugar 白砂糖', amountText: '1/4 cup (50 g)', category: 'seasoning' },
      { id: 'i2_2', name: 'salt 食盐', amountText: '1/2 tsp (3 g)', category: 'seasoning' },
      { id: 'i2_3', name: 'egg 鸡蛋', amountText: '1 颗', category: 'main' },
      { id: 'i3', name: 'flour 面粉', amountText: '3 cups (360 g)', category: 'grain' },
      { id: 'i4_1', name: 'softened butter 软化黄油', amountText: '2 tbsp (30 g)', category: 'dairy' },
      { id: 'i4_2', name: 'cinnamon sugar 肉桂糖粉', amountText: '2 tsp (8 g)', category: 'seasoning' },
      { id: 'i5_1', name: 'honey 蜂蜜', amountText: '1/4 cup (80 g)', category: 'seasoning' },
      { id: 'i5_2', name: 'brown sugar 红糖', amountText: '1/4 cup (50 g)', category: 'seasoning' },
      { id: 'i6', name: 'chopped pecans 碧根果碎', amountText: '3/4 cup (90 g)', category: 'produce' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '和面与首次发酵',
        sublabel: 'Dough Rising',
        ingredientIds: ['i1_1', 'i1_2', 'i2_1', 'i2_2', 'i2_3', 'i3'],
        stageIndex: 0,
        durationMinutes: 60,
        notes: '揉面至顺滑，盖上发酵至两倍大'
      },
      {
        id: 'b2',
        label: '擀开抹肉桂卷起',
        sublabel: 'Roll & Cut',
        ingredientIds: ['i3', 'i4_1', 'i4_2'],
        dependencies: [{ sourceBlockId: 'b1', type: 'material', label: '发酵好面团' }],
        stageIndex: 1,
        notes: '擀成 12x9 吋面片，抹黄油肉桂糖卷起切15块'
      },
      {
        id: 'b3',
        label: '铺焦糖底盘冷藏',
        sublabel: 'Bottom Layer & Chill',
        ingredientIds: ['i4_1', 'i5_1', 'i5_2', 'i6'],
        dependencies: [{ sourceBlockId: 'b2', type: 'material', label: '切好肉桂卷' }],
        stageIndex: 2,
        equipment: '玻璃矩形烤盘',
        notes: '底盘铺融化黄油、蜂蜜、红糖与核桃碎，码入面卷覆盖冷藏'
      }
    ],
    finalBlock: {
      method: 'bake',
      label: '焦糖香烤 🍞',
      temperatureF: 350,
      temperatureC: 175,
      durationText: '25 min',
      instructions: '早晨拿出室温放置 1 小时，烘烤 25 分钟后倒扣入大盘',
      servingInstructions: '出炉趁热迅速倒扣在大浅盘中享用，底盘焦糖蜂蜜核桃液瞬间浇淋覆盖面包卷、满屋肉桂甜香、松软拉丝甜而不腻'
    },
    tips: [
      '倒扣关键：出炉后必须趁热（1~2分钟内）迅速倒扣，此时焦糖呈流动状态能均匀挂附；若放凉焦糖变硬会粘在烤盘底部。',
      '过夜发酵：平安夜将面卷冷藏低温慢发酵一整夜，能让面团形成细腻的气孔组织与更深邃的麦香与肉桂融合风味。'
    ],
    createdAt: '2003-10-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 12. Sour Cream Pound Cake
  {
    id: 'hsh-12-pound-cake',
    version: '3.0',
    status: 'published',
    title: '🍰 老式酸奶油磅蛋糕 (Sour Cream Pound Cake)',
    coverImageUrl: '/recipe-covers/hsh-12-pound-cake.webp',
    description: 'Kathy P. Evans 妈妈的传统手作磅蛋糕，手工打发，糕体细腻绵密、奶香浓郁。',
    cuisine: 'western',
    difficulty: 'medium',
    prerequisites: {
      containerSize: '铝制圆环中空蛋糕模 (Tube Pan)',
      preheat: '预热烤箱至 325°F (165°C)',
      servings: '15-20 人份',
      prepNotes: '面粉与泡打粉小苏打需过筛三次'
    },
    ingredients: [
      { id: 'i1_1', name: 'unsalted butter 无盐黄油', amountText: '2 支 (225 g)', category: 'dairy' },
      { id: 'i1_2', name: 'vegetable shortening 植物起酥油', amountText: '1/2 cup (100 g)', category: 'dairy' },
      { id: 'i2', name: 'sugar 砂糖', amountText: '3 cups (600 g)', category: 'seasoning' },
      { id: 'i3', name: 'eggs 鸡蛋', amountText: '6 颗', category: 'main' },
      { id: 'i4_1', name: 'vanilla extract 香草精', amountText: '2 tsp (10 mL)', category: 'seasoning' },
      { id: 'i4_2', name: 'lemon extract 柠檬精', amountText: '2 tsp (10 mL)', category: 'seasoning' },
      { id: 'i5_1', name: 'all-purpose flour 中筋面粉', amountText: '2 cups (240 g)', category: 'grain' },
      { id: 'i5_2', name: 'baking powder 泡打粉', amountText: '1/2 tsp (2 g)', category: 'seasoning' },
      { id: 'i6', name: 'sour cream 酸奶油', amountText: '8 oz (225 g)', category: 'dairy' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '手工打发油脂砂糖',
        sublabel: 'Creaming by Hand',
        ingredientIds: ['i1_1', 'i1_2', 'i2'],
        stageIndex: 0,
        notes: '用大勺手工打发至蓬松白亮'
      },
      {
        id: 'b2',
        label: '分次加入鸡蛋香精',
        sublabel: 'Add Eggs & Flavor',
        ingredientIds: ['i2', 'i3', 'i4_1', 'i4_2'],
        dependencies: [{ sourceBlockId: 'b1', type: 'material', label: '打发油脂砂糖' }],
        stageIndex: 1,
        notes: '一次加入一颗鸡蛋搅拌顺滑'
      },
      {
        id: 'b3',
        label: '过筛面粉与翻拌酸奶油',
        sublabel: 'Sift Flour & Fold',
        ingredientIds: ['i5_1', 'i5_2', 'i6'],
        dependencies: [{ sourceBlockId: 'b2', type: 'material', label: '鸡蛋油脂糊' }],
        stageIndex: 2,
        notes: '面粉过筛三次交替加入，最后翻入酸奶油划划消泡'
      }
    ],
    finalBlock: {
      method: 'bake',
      label: '慢烤磅蛋糕 🎂',
      temperatureF: 325,
      temperatureC: 165,
      durationText: '75 min',
      instructions: '放烤箱底层烘烤 1 小时 15 分钟，插入竹签无粘连即成',
      servingInstructions: '蛋糕模中倒扣脱模彻底放凉后厚切享用，糕体金黄紧实细腻、奶香浓郁醇厚、酸奶油带来微妙湿润度与柔和果酸'
    },
    tips: [
      '手工打发精髓：黄油、起酥油与砂糖用木勺手工充分打发至发白羽毛状，是传统美式南方磅蛋糕拥有细密紧致气孔的秘诀。',
      '三次过筛：面粉与膨松剂反复过筛三次，能充分充入空气，防止面糊起筋，烤出的磅蛋糕松润不干咽。'
    ],
    createdAt: '2003-10-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 13. Beef & Barley Vegetable Soup
  {
    id: 'hsh-13-beef-barley-soup',
    version: '3.0',
    status: 'published',
    title: '🍲 牛肉大麦蔬菜浓汤 (Beef & Barley Vegetable Soup)',
    coverImageUrl: '/recipe-covers/hsh-13-beef-barley-soup.webp',
    description: 'Margaret Hardage 妈妈在寒冷秋冬为全家准备的暖心健康浓汤，新鲜蔬菜与丰富大麦、豌豆粒极具饱腹感。',
    cuisine: 'western',
    difficulty: 'medium',
    prerequisites: {
      containerSize: '大号炖汤锅',
      preheat: '牛肉切碎，蔬菜切丁',
      servings: '6-8 人份',
      prepNotes: '牛肉炒香后与大麦豌豆同炖 30 分钟再下胡萝卜芹菜'
    },
    ingredients: [
      { id: 'i1', name: 'lean ground chuck 瘦牛肉绞肉', amountText: '1 lb (450 g)', category: 'main' },
      { id: 'i2_1', name: 'pearl barley 珍珠大麦', amountText: '1/3 cup (70 g)', category: 'grain' },
      { id: 'i2_2', name: 'split peas 干豌豆仁', amountText: '1/3 cup (70 g)', category: 'grain' },
      { id: 'i3', name: 'stewed tomatoes 炖番茄罐头', amountText: '14 oz (400 g)', category: 'produce' },
      { id: 'i4', name: 'vegetable juice 蔬菜汁', amountText: '6 oz (180 mL)', category: 'liquid' },
      { id: 'i5_1', name: 'diced onion 洋葱碎', amountText: '1/2 cup (80 g)', category: 'produce' },
      { id: 'i5_2', name: 'chopped celery 芹菜碎', amountText: '3/4 cup (75 g)', category: 'produce' },
      { id: 'i5_3', name: 'sliced carrots 胡萝卜片', amountText: '1/2 cup (65 g)', category: 'produce' },
      { id: 'i6_1', name: 'beef bouillon granules 牛肉高汤颗粒粉', amountText: '1 tbsp (10 g)', category: 'seasoning' },
      { id: 'i6_2', name: 'bay leaf 月桂叶', amountText: '1-2 片', category: 'seasoning' },
      { id: 'i6_3', name: 'dried basil 干罗勒', amountText: '1/2 tsp (1 g)', category: 'seasoning' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '炒香碎牛肉',
        sublabel: 'Brown Beef',
        ingredientIds: ['i1'],
        stageIndex: 0,
        heatLevel: '中大火',
        durationMinutes: 5,
        notes: '牛肉炒至变色散开'
      },
      {
        id: 'b2',
        label: '加水大麦焖炖',
        sublabel: 'Simmer Barley',
        ingredientIds: ['i1', 'i2_1', 'i2_2', 'i3', 'i4', 'i6_1', 'i6_2', 'i6_3'],
        dependencies: [{ sourceBlockId: 'b1', type: 'material', label: '炒香碎牛肉' }],
        stageIndex: 1,
        heatLevel: '小火',
        durationMinutes: 30,
        notes: '加 5 杯水、番茄罐头、蔬菜汁、大麦与香草煮沸转小火炖 30 分钟'
      },
      {
        id: 'b3',
        label: '下胡萝卜芹菜',
        sublabel: 'Add Veggies',
        ingredientIds: ['i5_1', 'i5_2', 'i5_3'],
        dependencies: [{ sourceBlockId: 'b2', type: 'material', label: '大麦牛肉汤' }],
        stageIndex: 2,
        heatLevel: '小火',
        durationMinutes: 30,
        notes: '倒入胡萝卜片与芹菜丁，盖盖继续慢炖 30 分钟，捞出月桂叶'
      }
    ],
    finalBlock: {
      method: 'stew',
      label: '丰盛浓汤 🍲',
      durationText: '60 min',
      instructions: '热气腾腾，搭配烤芝士三明治或热比司吉极其美味',
      servingInstructions: '盛入宽口汤碗趁热享用，浓汤红亮温润、大麦粒粒Q弹有嚼劲、碎牛肉与番茄芹菜鲜美交融、饱腹暖胃极度舒适'
    },
    tips: [
      '慢炖分批：大麦和干豌豆需要较长时间吸水膨胀软化，先与牛肉炖煮30分钟，再加入胡萝卜和芹菜，能保持蔬菜的鲜甜与脆嫩。',
      '健康主食汤：大麦富含β-葡聚糖水溶性膳食纤维，这道全合一（All-in-one）浓汤营养均衡，特别适合作为控糖低脂的健康正餐。'
    ],
    createdAt: '2003-10-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 14. Angel Biscuits
  {
    id: 'hsh-14-angel-biscuits',
    version: '3.0',
    status: 'published',
    title: '🥐 祖母天使比司吉饼干 (Angel Biscuits)',
    coverImageUrl: '/recipe-covers/hsh-14-angel-biscuits.webp',
    description: 'Nancy Robeson 祖母每逢感恩节与圣诞节必做的爱心面点，酵母与泡打粉结合，松软如羽毛。',
    cuisine: 'western',
    difficulty: 'medium',
    prerequisites: {
      containerSize: '烘焙烤盘 & 圆形切模',
      preheat: '预热烤箱至 400°F (200°C)',
      servings: '约 30 个',
      prepNotes: '酵母加温水化开，面团揉 2 分钟'
    },
    ingredients: [
      { id: 'i1_1', name: 'dry active yeast 干酵母', amountText: '1 包 (7 g)', category: 'grain' },
      { id: 'i1_2', name: 'warm water 温水', amountText: '2 tbsp (30 mL)', category: 'liquid' },
      { id: 'i2', name: 'flour 面粉', amountText: '5 cups (600 g)', category: 'grain' },
      { id: 'i3_1', name: 'baking powder 泡打粉', amountText: '1 tbsp (12 g)', category: 'seasoning' },
      { id: 'i3_2', name: 'baking soda 食用小苏打', amountText: '1 tsp (5 g)', category: 'seasoning' },
      { id: 'i4_1', name: 'granulated sugar 白砂糖', amountText: '2 tbsp (25 g)', category: 'seasoning' },
      { id: 'i4_2', name: 'salt 食盐', amountText: '1.5 tsp (9 g)', category: 'seasoning' },
      { id: 'i5', name: 'shortening 起酥油/起酥黄油', amountText: '1 cup (220 g)', category: 'dairy' },
      { id: 'i6', name: 'buttermilk 酪乳/酸奶', amountText: '2 cups (480 mL)', category: 'liquid' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '溶解酵母与筛干粉',
        sublabel: 'Dissolve Yeast & Sift',
        ingredientIds: ['i1_1', 'i1_2', 'i2', 'i3_1', 'i3_2', 'i4_1', 'i4_2'],
        stageIndex: 0,
        notes: '酵母融于温水；大碗中过筛面粉、泡打粉、小苏打、糖与盐'
      },
      {
        id: 'b2',
        label: '搓入起酥油与和面',
        sublabel: 'Cut Shortening & Mix',
        ingredientIds: ['i1_1', 'i1_2', 'i5', 'i6'],
        dependencies: [{ sourceBlockId: 'b1', type: 'material', label: '过筛干粉与酵母水' }],
        stageIndex: 1,
        notes: '切入起酥油成粗粉状，倒入酪乳与酵母水搅拌均匀'
      },
      {
        id: 'b3',
        label: '揉面压模成型',
        sublabel: 'Knead & Cut Biscuits',
        ingredientIds: ['i2'],
        dependencies: [{ sourceBlockId: 'b2', type: 'material', label: '和好面团' }],
        stageIndex: 2,
        notes: '案板揉面 2 分钟，擀成半吋厚度，用模具压出圆饼'
      }
    ],
    finalBlock: {
      method: 'bake',
      label: '金黄烘焙 🥯',
      temperatureF: 400,
      temperatureC: 200,
      durationText: '12-15 min',
      instructions: '入烤箱 400°F 烘烤 12-15 分钟至表面金黄蓬松',
      servingInstructions: '出炉趁热掰开抹上黄油或果酱享用，外壳金黄酥脆薄如纸、内层轻盈如羽毛般分层蓬松、麦香与酪乳清香扑鼻'
    },
    tips: [
      '双重膨松力量：同时采用活性干酵母与泡打粉、小苏打，既有发酵面团的麦香层次，又有经典比司吉的酥松起层。',
      '切模手法：压切圆饼模具时切忌左右旋转，应垂直下压并利落提起，这样可以保护边缘面筋层，烘烤时比司吉才会垂直高高爬升。'
    ],
    createdAt: '2003-10-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 15. Chicken & Dumplings
  {
    id: 'hsh-15-chicken-dumplings',
    version: '3.0',
    status: 'published',
    title: '🍲 家常美式鸡肉炖面团 (Chicken & Dumplings)',
    coverImageUrl: '/recipe-covers/hsh-15-chicken-dumplings.webp',
    description: 'Marion MacLeod Caudle 妈妈传下的经典主菜。鲜嫩鸡肉配软糯面团，搭配土豆泥与豌豆，温暖满足。',
    cuisine: 'western',
    difficulty: 'medium',
    prerequisites: {
      containerSize: '深口汤锅 (5夸脱以上)',
      preheat: '准备 Bisquick 预拌粉与鲜奶',
      servings: '6-8 人份'
    },
    ingredients: [
      { id: 'i1', name: 'boneless chicken breasts 熟无骨鸡胸肉', amountText: '1.5 lbs (680 g)', category: 'main' },
      { id: 'i2_1', name: 'chicken broth 鸡高汤', amountText: '2 cups (480 mL)', category: 'liquid' },
      { id: 'i2_2', name: 'poultry seasoning 禽类复合香料', amountText: '1/2 tsp (2 g)', category: 'seasoning' },
      { id: 'i2_3', name: 'bay leaf 月桂叶', amountText: '1 片', category: 'seasoning' },
      { id: 'i3', name: 'cream of chicken soup 浓缩鸡汤罐头', amountText: '2 罐 (600 g)', category: 'liquid' },
      { id: 'i4_1', name: 'whole milk 全脂牛奶', amountText: '2 罐量 (约 480 mL)', category: 'liquid' },
      { id: 'i4_2', name: 'petite green peas 嫩青豌豆', amountText: '1 cup (150 g)', category: 'produce' },
      { id: 'i5_1', name: 'Bisquick baking mix 烘焙预拌粉', amountText: '2 cups (240 g)', category: 'grain' },
      { id: 'i5_2', name: 'milk for dumplings 和面牛奶', amountText: '2/3 cup (160 mL)', category: 'liquid' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '煮鸡肉与过滤汤底',
        sublabel: 'Boil Chicken',
        ingredientIds: ['i1', 'i2_1', 'i2_2', 'i2_3'],
        stageIndex: 0,
        heatLevel: '中火',
        durationMinutes: 10,
        notes: '鸡肉加鸡汤与月桂叶煮 10 分钟，捞出切块并过滤汤底'
      },
      {
        id: 'b2',
        label: '加入浓汤与青豌豆',
        sublabel: 'Simmer Cream Soup',
        ingredientIds: ['i1', 'i3', 'i4_1', 'i4_2'],
        dependencies: [{ sourceBlockId: 'b1', type: 'material', label: '熟鸡肉块与过滤鸡汤' }],
        stageIndex: 1,
        heatLevel: '中火',
        durationMinutes: 10,
        notes: '倒入鸡汤罐头、牛奶与青豌豆，加盖煮 10 分钟'
      },
      {
        id: 'b3',
        label: '调制面团并舀入滚汤',
        sublabel: 'Drop Dumplings',
        ingredientIds: ['i5_1', 'i5_2'],
        dependencies: [{ sourceBlockId: 'b2', type: 'material', label: '浓汤底' }],
        stageIndex: 2,
        heatLevel: '大火',
        durationMinutes: 20,
        notes: '混合预拌粉与牛奶，用匙舀入沸汤中，不加盖煮 10 分钟，翻面加盖再煮 10 分钟'
      }
    ],
    finalBlock: {
      method: 'stew',
      label: '软糯面团 🍲',
      durationText: '40 min',
      instructions: '汤汁浓郁，面团吸饱鸡汤香气',
      servingInstructions: '盛入深口汤碗趁热享用，汤汁奶白浓厚顺滑、鸡肉块软嫩鲜美、面团吸饱鸡汤蓬松软糯如云朵、暖意融融'
    },
    tips: [
      '面团烹制两步法：舀入面团后前10分钟不盖锅盖让水汽挥发定型，后10分钟盖紧锅盖利用蒸汽将面团内部蒸至蓬松如云。',
      '调味精要：禽类复合香料（Poultry Seasoning，含鼠尾草、百里香、墨角兰）是美式家常炖鸡面团的地道灵魂香气来源。'
    ],
    createdAt: '2003-10-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  },

  // 16. Hashbrown Casserole
  {
    id: 'hsh-16-hashbrown-casserole',
    version: '3.0',
    status: 'published',
    title: '🥔 橄榄球硬汉土豆饼芝士焗煲 (Hashbrown Casserole)',
    coverImageUrl: '/recipe-covers/hsh-16-hashbrown-casserole.webp',
    description: 'Donna Weatherford 妈妈为 Hokie 橄榄球运动员儿子准备的丰盛蛋白质能量副菜，浓郁奶油与酥脆面包渣。',
    cuisine: 'western',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '大号方形焗烤盘',
      preheat: '预热烤箱至 300°F (150°C)',
      servings: '8 人份'
    },
    ingredients: [
      { id: 'i1', name: 'hashbrowns 土豆饼/薯丁', amountText: '2 lbs (900 g)', category: 'main' },
      { id: 'i2', name: 'margarine 融化植物黄油', amountText: '1 支 (115 g)', category: 'dairy' },
      { id: 'i3', name: 'grated cheddar cheese 车达芝士碎', amountText: '3 cups (300 g)', category: 'dairy' },
      { id: 'i4', name: 'sour cream 酸奶油', amountText: '1 cup (225 g)', category: 'dairy' },
      { id: 'i5', name: 'cream of chicken soup 浓缩鸡汤罐头', amountText: '1 罐 (300 g)', category: 'liquid' },
      { id: 'i6_1', name: 'dried onion flakes 干洋葱碎', amountText: '2 tbsp (15 g)', category: 'produce' },
      { id: 'i6_2', name: 'salt 食盐', amountText: '1 tbsp (15 g)', category: 'seasoning' },
      { id: 'i6_3', name: 'black pepper 黑胡椒粉', amountText: '1/2 tsp (2 g)', category: 'seasoning' },
      { id: 'i7', name: 'breadcrumbs 面包糠/面包碎', amountText: '1/2 cup (撒顶层)', category: 'grain' }
    ],
    actionBlocks: [
      {
        id: 'b1',
        label: '融化黄油润抹烤盘',
        sublabel: 'Grease Dish',
        ingredientIds: ['i2'],
        stageIndex: 0,
        heatLevel: '微火',
        equipment: '大号方形焗烤盘',
        notes: '融化黄油，取一半倒入焗烤盘底部'
      },
      {
        id: 'b2',
        label: '混合芝士酸奶油酱',
        sublabel: 'Mix Cream Mixture',
        ingredientIds: ['i2', 'i3', 'i4', 'i5', 'i6_1', 'i6_2', 'i6_3'],
        dependencies: [{ sourceBlockId: 'b1', type: 'material', label: '余下融化黄油' }],
        stageIndex: 1,
        notes: '大碗中混合 2 杯芝士、酸奶油、洋葱碎、盐、胡椒、鸡汤罐头与余下黄油'
      },
      {
        id: 'b3',
        label: '加入薯丁与撒顶层',
        sublabel: 'Assemble Casserole',
        ingredientIds: ['i1', 'i3', 'i7'],
        dependencies: [{ sourceBlockId: 'b2', type: 'material', label: '芝士酸奶油混合液' }],
        stageIndex: 2,
        equipment: '大号方形焗烤盘',
        notes: '倒入土豆饼翻匀铺入焗盘，表面撒 1 杯芝士与面包渣'
      }
    ],
    finalBlock: {
      method: 'bake',
      label: '香浓焗烤 🧀',
      temperatureF: 300,
      temperatureC: 150,
      durationText: '20 min',
      instructions: '入烤箱 300°F 烘烤 20 分钟至顶层芝士融化金黄',
      servingInstructions: '焗盘出炉趁热用大铲挖出装盘享用，顶层芝士与面包糠金黄香脆、底层土豆丁软糯湿润裹满浓厚酸奶油与融化车达芝士'
    },
    tips: [
      '水分管理：如果使用冷冻土豆饼（Hashbrowns），建议提前稍微解冻并用厨房纸吸去表面冰霜水汽，烘烤后口感更香浓不水。',
      '运动能量餐：高碳水化合物搭配优质乳酪蛋白，是弗吉尼亚理工橄榄球运动员高强度赛后快速补充糖原与热量的传统能量盛宴。'
    ],
    createdAt: '2003-10-01T00:00:00Z',
    updatedAt: '2026-08-03T12:00:00Z'
  }
]

export const HOME_SWEET_HOME_RECIPES: VisualRecipeV3[] = HOME_SWEET_HOME_RECIPES_DATA.map(recipe => ({
  ...recipe,
  provenance: recipe.provenance || {
    sourceType: 'book',
    title: 'Home Sweet Home Cookbook',
    publishedYear: 2003,
    note: '数据集声明来源；具体页码与逐项原文比对尚待补录。',
  },
  dataReview: recipe.dataReview || {
    overall: 'unreviewed',
    ingredients: 'unreviewed',
    quantities: 'unreviewed',
    topology: 'unreviewed',
    heatAndTiming: 'unreviewed',
    assumptions: ['来源书目已知，但页码、用量换算与工序依赖尚未逐项复核。'],
  },
}))
