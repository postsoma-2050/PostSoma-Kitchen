import fs from 'fs'
import path from 'path'

const hshFile = path.join(process.cwd(), 'src/data/homeSweetHomeRecipes.ts')
let content = fs.readFileSync(hshFile, 'utf8')

// hsh-01
content = content.replace(
  `{ id: 'i3', name: 'chocolate mix for milk 巧克力冲饮粉', amountText: '1 pkg (425 g)', category: 'other' },`,
  `{ id: 'i3', name: 'chocolate mix for milk 巧克力冲饮粉', amountText: '1 pkg (425 g)', category: 'seasoning' },`
)
content = content.replace(
  `{ id: 'i6', name: 'cocoa powder 纯可可粉', amountText: '1/2 cup (50 g)', category: 'other' }`,
  `{ id: 'i6', name: 'cocoa powder 纯可可粉', amountText: '1/2 cup (50 g)', category: 'seasoning' }`
)

// hsh-02
content = content.replace(
  `      { id: 'i5', name: 'pinto & chili beans 斑豆与辣豆罐头', amountText: '2 罐', category: 'main' },\n      { id: 'i6', name: 'corn & stewed tomatoes 玉米与炖番茄罐', amountText: '2 罐', category: 'produce' },`,
  `      { id: 'i5_1', name: 'pinto beans 斑豆罐头', amountText: '1 罐 (15 oz)', category: 'produce' },\n      { id: 'i5_2', name: 'chili beans 辣豆罐头', amountText: '1 罐 (15 oz)', category: 'produce' },\n      { id: 'i6_1', name: 'whole kernel corn 甜玉米粒罐头', amountText: '1 罐 (15 oz)', category: 'produce' },\n      { id: 'i6_2', name: 'stewed tomatoes 炖番茄罐头', amountText: '1 罐 (14.5 oz)', category: 'produce' },`
)
content = content.replace(
  `ingredientIds: ['i1', 'i3', 'i4', 'i5', 'i6', 'i7'],`,
  `ingredientIds: ['i1', 'i3', 'i4', 'i5_1', 'i5_2', 'i6_1', 'i6_2', 'i7'],`
)

// hsh-08
content = content.replace(
  `      { id: 'i2', name: 'olive oil & butter 橄榄油与黄油', amountText: '1 T. 油 + 2 T. 黄油', category: 'dairy' },`,
  `      { id: 'i2_1', name: 'olive oil 特级初榨橄榄油', amountText: '1 T.', category: 'liquid' },\n      { id: 'i2_2', name: 'butter 无盐黄油', amountText: '2 T.', category: 'dairy' },`
)
content = content.replace(
  `{ id: 'i5', name: 'pecans 碧根果碎', amountText: '1/2 cup (60 g)', category: 'other' },`,
  `{ id: 'i5', name: 'pecans 碧根果碎', amountText: '1/2 cup (60 g)', category: 'produce' },`
)
content = content.replace(
  `ingredientIds: ['i1', 'i2'],`,
  `ingredientIds: ['i1', 'i2_1', 'i2_2'],`
)

// hsh-09
content = content.replace(
  `{ id: 'i2', name: 'peanut butter 柔滑花生酱', amountText: '1/3 cup (80 g)', category: 'other' },`,
  `{ id: 'i2', name: 'peanut butter 柔滑花生酱', amountText: '1/3 cup (80 g)', category: 'produce' },`
)
content = content.replace(
  `{ id: 'i3', name: 'sugar & vanilla 砂糖与香草精', amountText: '1/4c 糖 + 1tsp 香草', category: 'seasoning' },`,
  `{ id: 'i3_1', name: 'granulated sugar 细砂糖', amountText: '1/4 cup (50 g)', category: 'seasoning' },\n      { id: 'i3_2', name: 'vanilla extract 香草精', amountText: '1 tsp (5 mL)', category: 'liquid' },`
)
content = content.replace(
  `{ id: 'i5', name: 'hot water & oil 热水与植物油', amountText: '1/3c 水 + 1/2c 油', category: 'liquid' },`,
  `{ id: 'i5_1', name: 'hot water 热水', amountText: '1/3 cup (80 mL)', category: 'liquid' },\n      { id: 'i5_2', name: 'vegetable oil 植物油', amountText: '1/2 cup (120 mL)', category: 'liquid' },`
)
content = content.replace(
  `{ id: 'i7', name: 'cocktail peanuts 鸡尾酒花生 (切碎)', amountText: '1/2 cup (60 g)', category: 'other' }`,
  `{ id: 'i7', name: 'cocktail peanuts 鸡尾酒花生 (切碎)', amountText: '1/2 cup (60 g)', category: 'produce' }`
)
content = content.replace(
  `ingredientIds: ['i1', 'i2', 'i3', 'i6'],`,
  `ingredientIds: ['i1', 'i2', 'i3_1', 'i3_2', 'i6'],`
)
content = content.replace(
  `ingredientIds: ['i4', 'i5', 'i6'],`,
  `ingredientIds: ['i4', 'i5_1', 'i5_2', 'i6'],`
)

// hsh-10
content = content.replace(
  `{ id: 'i4', name: 'pimiento & parsley 甜椒丁与鲜欧芹', amountText: '1/4 oz 甜椒丁', category: 'produce' },`,
  `{ id: 'i4_1', name: 'pimiento 甜椒丁', amountText: '1/4 oz (7 g)', category: 'produce' },\n      { id: 'i4_2', name: 'fresh parsley 鲜欧芹碎', amountText: '1 T. (4 g)', category: 'produce' },`
)
content = content.replace(
  `{ id: 'i6', name: 'roasted garlic & herbs 烤大蒜与牛至罗勒', amountText: '蒜瓣+牛至+罗勒', category: 'seasoning' }`,
  `{ id: 'i6_1', name: 'roasted garlic 烤大蒜瓣', amountText: '3-4 瓣', category: 'produce' },\n      { id: 'i6_2', name: 'dried italian herbs 意式综合干香草 (牛至罗勒)', amountText: '1 tsp', category: 'seasoning' }`
)
content = content.replace(
  `ingredientIds: ['i1', 'i2', 'i3', 'i4', 'i5', 'i6'],`,
  `ingredientIds: ['i1', 'i2', 'i3', 'i4_1', 'i4_2', 'i5', 'i6_1', 'i6_2'],`
)

// hsh-11
content = content.replace(
  `      { id: 'i1', name: 'yeast & warm milk/water 酵母与温水温奶', amountText: '1T酵母+1/4c水奶', category: 'liquid' },\n      { id: 'i2', name: 'sugar & salt & egg 砂糖盐与鸡蛋', amountText: '1/4c糖+1/2tsp盐+1蛋', category: 'main' },`,
  `      { id: 'i1_1', name: 'active dry yeast 活性干酵母', amountText: '1 包 (2.25 tsp)', category: 'grain' },\n      { id: 'i1_2', name: 'warm milk 温牛奶', amountText: '1/4 cup (60 mL)', category: 'dairy' },\n      { id: 'i2_1', name: 'granulated sugar 细砂糖', amountText: '1/4 cup (50 g)', category: 'seasoning' },\n      { id: 'i2_2', name: 'salt 食盐', amountText: '1/2 tsp', category: 'seasoning' },\n      { id: 'i2_3', name: 'egg 鸡蛋 (室温)', amountText: '1 个', category: 'main' },`
)
content = content.replace(
  `      { id: 'i4', name: 'butter & cinnamon 软黄油与肉桂糖', amountText: '2T黄油+2tsp肉桂糖', category: 'seasoning' },\n      { id: 'i5', name: 'honey & brown sugar 蜂蜜与红糖', amountText: '1/4c蜂蜜+1/4c红糖', category: 'seasoning' },`,
  `      { id: 'i4_1', name: 'butter 软化黄油 (抹面)', amountText: '2 T. (30 g)', category: 'dairy' },\n      { id: 'i4_2', name: 'ground cinnamon 纯肉桂粉', amountText: '2 tsp', category: 'seasoning' },\n      { id: 'i5_1', name: 'honey 纯蜂蜜', amountText: '1/4 cup (60 mL)', category: 'liquid' },\n      { id: 'i5_2', name: 'brown sugar 红糖', amountText: '1/4 cup (50 g)', category: 'seasoning' },`
)
content = content.replace(
  `{ id: 'i6', name: 'chopped pecans 碧根果碎', amountText: '3/4 cup (90 g)', category: 'other' }`,
  `{ id: 'i6', name: 'chopped pecans 碧根果碎', amountText: '3/4 cup (90 g)', category: 'produce' }`
)
content = content.replace(
  `ingredientIds: ['i1', 'i2', 'i3'],`,
  `ingredientIds: ['i1_1', 'i1_2', 'i2_1', 'i2_2', 'i2_3', 'i3'],`
)
content = content.replace(
  `ingredientIds: ['i3', 'i4'],`,
  `ingredientIds: ['i3', 'i4_1', 'i4_2'],`
)
content = content.replace(
  `ingredientIds: ['i4', 'i5', 'i6'],`,
  `ingredientIds: ['i4_1', 'i4_2', 'i5_1', 'i5_2', 'i6'],`
)

// hsh-12
content = content.replace(
  `{ id: 'i1', name: 'butter & shortening 黄油与起酥油', amountText: '2支黄油+1/2c起酥油', category: 'dairy' },`,
  `{ id: 'i1_1', name: 'unsalted butter 无盐黄油', amountText: '1 cup (2 支 / 225 g)', category: 'dairy' },\n      { id: 'i1_2', name: 'vegetable shortening 植物起酥油', amountText: '1/2 cup (100 g)', category: 'dairy' },`
)
content = content.replace(
  `{ id: 'i4', name: 'vanilla & lemon extract 香草与柠檬精', amountText: '各 2 tsp', category: 'seasoning' },\n      { id: 'i5', name: 'flour & baking powder 面粉与泡打粉', amountText: '2c面粉+1/2tsp泡打粉', category: 'grain' },`,
  `{ id: 'i4_1', name: 'vanilla extract 香草精', amountText: '2 tsp (10 mL)', category: 'liquid' },\n      { id: 'i4_2', name: 'lemon extract 柠檬香精', amountText: '2 tsp (10 mL)', category: 'liquid' },\n      { id: 'i5_1', name: 'all-purpose flour 中筋面粉', amountText: '2 cups (240 g)', category: 'grain' },\n      { id: 'i5_2', name: 'baking powder 泡打粉', amountText: '1/2 tsp', category: 'seasoning' },`
)
content = content.replace(
  `ingredientIds: ['i1', 'i2'],`,
  `ingredientIds: ['i1_1', 'i1_2', 'i2'],`
)
content = content.replace(
  `ingredientIds: ['i2', 'i3', 'i4'],`,
  `ingredientIds: ['i2', 'i3', 'i4_1', 'i4_2'],`
)
content = content.replace(
  `ingredientIds: ['i5', 'i6'],`,
  `ingredientIds: ['i5_1', 'i5_2', 'i6'],`
)

// hsh-13 (用户重点)
content = content.replace(
  `      { id: 'i2', name: 'barley & split peas 大麦与干豌豆仁', amountText: '各 1/3 cup', category: 'grain' },`,
  `      { id: 'i2_1', name: 'pearl barley 珍珠大麦', amountText: '1/3 cup (65 g)', category: 'grain' },\n      { id: 'i2_2', name: 'split peas 干豌豆仁', amountText: '1/3 cup (65 g)', category: 'produce' },`
)
content = content.replace(
  `      { id: 'i6', name: 'beef bouillon & herbs 牛肉高汤粉与香草', amountText: '高汤粉1T + 月桂叶 + 罗勒', category: 'seasoning' },\n      { id: 'i5', name: 'onion & celery & carrots 洋葱芹菜胡萝卜', amountText: '洋葱1/2c + 芹菜3/4c + 胡萝卜1/2c', category: 'produce' }`,
  `      { id: 'i6_1', name: 'beef bouillon granules 牛肉高汤颗粒粉', amountText: '1 T.', category: 'seasoning' },\n      { id: 'i6_2', name: 'bay leaves 月桂叶', amountText: '1-2 片', category: 'produce' },\n      { id: 'i6_3', name: 'dried basil 干罗勒碎', amountText: '1 tsp', category: 'seasoning' },\n      { id: 'i5_1', name: 'onion 洋葱丁', amountText: '1/2 cup (80 g)', category: 'produce' },\n      { id: 'i5_2', name: 'celery 芹菜丁', amountText: '3/4 cup (90 g)', category: 'produce' },\n      { id: 'i5_3', name: 'carrots 胡萝卜片', amountText: '1/2 cup (70 g)', category: 'produce' }`
)
content = content.replace(
  `ingredientIds: ['i1', 'i2', 'i3', 'i4', 'i6'],`,
  `ingredientIds: ['i1', 'i2_1', 'i2_2', 'i3', 'i4', 'i6_1', 'i6_2', 'i6_3'],`
)
content = content.replace(
  `ingredientIds: ['i5'],`,
  `ingredientIds: ['i5_1', 'i5_2', 'i5_3'],`
)

// hsh-14
content = content.replace(
  `      { id: 'i1', name: 'yeast & warm water 酵母与温水', amountText: '1包酵母 + 2T温水', category: 'liquid' },\n      { id: 'i2', name: 'flour 面粉', amountText: '5 cups (600 g)', category: 'grain' },\n      { id: 'i3', name: 'baking powder & soda 泡打粉与小苏打', amountText: '泡打粉1T + 苏打1tsp', category: 'seasoning' },\n      { id: 'i4', name: 'sugar & salt 砂糖与食盐', amountText: '糖2T + 盐1.5tsp', category: 'seasoning' },`,
  `      { id: 'i1_1', name: 'active dry yeast 活性干酵母', amountText: '1 包 (2.25 tsp)', category: 'grain' },\n      { id: 'i1_2', name: 'warm water 温水', amountText: '2 T. (30 mL)', category: 'liquid' },\n      { id: 'i2', name: 'flour 面粉', amountText: '5 cups (600 g)', category: 'grain' },\n      { id: 'i3_1', name: 'baking powder 泡打粉', amountText: '1 T.', category: 'seasoning' },\n      { id: 'i3_2', name: 'baking soda 小苏打', amountText: '1 tsp', category: 'seasoning' },\n      { id: 'i4_1', name: 'granulated sugar 细砂糖', amountText: '2 T.', category: 'seasoning' },\n      { id: 'i4_2', name: 'salt 食盐', amountText: '1.5 tsp', category: 'seasoning' },`
)
content = content.replace(
  `ingredientIds: ['i1', 'i2', 'i3', 'i4'],`,
  `ingredientIds: ['i1_1', 'i1_2', 'i2', 'i3_1', 'i3_2', 'i4_1', 'i4_2'],`
)
content = content.replace(
  `ingredientIds: ['i1', 'i5', 'i6'],`,
  `ingredientIds: ['i1_1', 'i1_2', 'i5', 'i6'],`
)

// hsh-15
content = content.replace(
  `      { id: 'i2', name: 'chicken broth & herbs 鸡汤与月桂叶', amountText: '鸡汤2c + 禽类香料 + 月桂叶', category: 'liquid' },\n      { id: 'i3', name: 'cream of chicken soup 浓缩鸡汤罐头', amountText: '2 罐', category: 'liquid' },\n      { id: 'i4', name: 'milk & petite peas 牛奶与青豌豆', amountText: '牛奶2罐 + 豌豆1c', category: 'produce' },\n      { id: 'i5', name: 'bisquick & milk 烘焙预拌粉与牛奶', amountText: 'Bisquick 2c + 牛奶2/3c', category: 'grain' }`,
  `      { id: 'i2_1', name: 'chicken broth 鸡高汤', amountText: '2 cups (480 mL)', category: 'liquid' },\n      { id: 'i2_2', name: 'poultry seasoning 禽类综合香料', amountText: '1/2 tsp', category: 'seasoning' },\n      { id: 'i2_3', name: 'bay leaves 月桂叶', amountText: '1 片', category: 'produce' },\n      { id: 'i3', name: 'cream of chicken soup 浓缩鸡汤罐头', amountText: '2 罐', category: 'liquid' },\n      { id: 'i4_1', name: 'whole milk 全脂牛奶', amountText: '2 cups (480 mL)', category: 'dairy' },\n      { id: 'i4_2', name: 'petite peas 嫩青豌豆', amountText: '1 cup (150 g)', category: 'produce' },\n      { id: 'i5_1', name: 'Bisquick baking mix 烘焙预拌粉', amountText: '2 cups (240 g)', category: 'grain' },\n      { id: 'i5_2', name: 'milk 牛奶 (面团)', amountText: '2/3 cup (160 mL)', category: 'dairy' }`
)
content = content.replace(
  `ingredientIds: ['i1', 'i2'],`,
  `ingredientIds: ['i1', 'i2_1', 'i2_2', 'i2_3'],`
)
content = content.replace(
  `ingredientIds: ['i1', 'i3', 'i4'],`,
  `ingredientIds: ['i1', 'i3', 'i4_1', 'i4_2'],`
)
content = content.replace(
  `ingredientIds: ['i5'],`,
  `ingredientIds: ['i5_1', 'i5_2'],`
)

// hsh-16
content = content.replace(
  `{ id: 'i6', name: 'onion flakes & seasonings 洋葱碎与盐胡椒', amountText: '洋葱2T + 盐1T + 胡椒', category: 'seasoning' },`,
  `{ id: 'i6_1', name: 'dried onion flakes 脱水干洋葱碎', amountText: '2 T.', category: 'produce' },\n      { id: 'i6_2', name: 'salt 食盐', amountText: '1 tsp', category: 'seasoning' },\n      { id: 'i6_3', name: 'black pepper 黑胡椒粉', amountText: '1/2 tsp', category: 'seasoning' },`
)
content = content.replace(
  `ingredientIds: ['i2', 'i3', 'i4', 'i5', 'i6'],`,
  `ingredientIds: ['i2', 'i3', 'i4', 'i5', 'i6_1', 'i6_2', 'i6_3'],`
)

fs.writeFileSync(hshFile, content, 'utf8')
console.log('✅ homeSweetHomeRecipes.ts 24 项复合食材原子化拆解成功！')
