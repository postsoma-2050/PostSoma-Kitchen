# PostSoma Kitchen 数据来源、取数优先级与版本一致性报告

> **报告时间**：2026-09-16T13:21:51.163Z
> **审计环境**：Local TS Code vs Supabase Staging (`https://ihtpltojihhwmciqubbk.supabase.co`)
> **权威模式**：只读探测，未执行任何写入

---

## 1. 为什么直接访问与 `?source=local` 可能呈现不同内容？

### 1.1 取数路径根本原因分析
在 `src/views/RecipeDetailV3.vue` 的 `loadRecipe()` 实现中：
```ts
// 当 URL 携带 ?source=local 或 ?source=preset 时：
const localFound = await getLocalPresetRecipeById(id) // 直接动态 import 代码中的 TypeScript 模块

// 当 URL 无 source 参数（默认访问）时：
const found = await getPublishedRecipeById(id)        // 调用 recipeRepository.getPublishedRecipeById(id)
```

1. **`?source=local` 路径**：
   - 跳过一切缓存和数据库，直接执行 `import('@/data/chineseHealthyRecipes')` 等模块。
   - 呈现的是**当前代码仓库工作区 (Working Tree) 最新的 TypeScript 代码对象**。
2. **默认访问路径**：
   - 依赖注入的 `recipeRepository`（由 `VITE_STORAGE_MODE` 决定）。
   - 当前 `VITE_STORAGE_MODE=supabase`，请求的是 **2026年8月4日** 历史批量落盘到 Supabase 云端的旧快照（例如 `cn-59` 在云端仅有 2 个旧工序且无依赖，而本地代码已重构为 4 工序带暂存回锅）。
   - 若用户之前在 LocalStorage 保存过数据，则在 `VITE_STORAGE_MODE=local` 下会读取旧的 LocalStorage 缓存。
3. **结论**：
   - 这不是页面内部组件取数不一致，而是**存储快照与静态代码仓库之间的版本时间差**。
   - **页面画布 (`RecipeFlowCanvasV3`)、手机端视图 (`RecipeFlowMobileV3`)、详情弹窗与 SVG/PNG 导出，全部统一接收并消费 `RecipeDetailV3` 解析后的同一个 `recipe` 对象，内部数据完全同源！**

---

## 2. 开发者环境版本指纹与普通用户界面的边界隔离

- **普通用户界面**：维持极简高级审美，不外露调试指标、哈希串或数据库版本号。
- **开发与编辑环境 (`import.meta.env.DEV`)**：
  - 在食谱详情页底部或开发者控制台输出数据源指纹：
    `[PostSoma Dev] Recipe: {id} | Source: {local_preset | supabase_published} | ContentHash: {hash} | Version: {ver}`
  - 便于开发人员、QA 秒级确认当前处于“本地代码实时态”还是“云端持久化态”。

---

## 3. 本地代码与云端已发布内容只读比对结果

| 维度 | 统计值 | 状态 |
| :--- | :--- | :--- |
| 本地预置食谱总数 | **121 道** | 包含 102 道中餐 + 16 道美式 + 3 道样板 |
| 远程 Supabase 食谱数 | **47 道** | `public.recipes` 表有效记录 |
| 完全一致 (Hash Match) | **19 道** | 内容哈希完全相符 |
| 内容存在差异 (Modified) | **28 道** | 逐字段递归比较结果 |
| 仅食材顺序变化 | **17 道** | 数据值与工序事实一致，仅数组顺序不同 |
| 实质内容变化 | **11 道** | 食材、工序、依赖、前置条件或终点内容发生变化 |
| 远程缺失 (Missing) | **74 道** | 本地新增但尚未迁移 |
| 仅远程存在 (Remote Only) | **0 道** | 远程存在而本地预置中不存在，需单独裁决 |

### 3.1 仅食材顺序不同（不应自动视为配方事实变化）

- `cn-01-yuxiang-rousi` 🥢 私房少油鱼香肉丝
- `cn-04-congbao-yangrou` 🥩 经典京味葱爆羊肉
- `cn-09-jingjiang-rousi` 🥢 私家京酱肉丝
- `cn-11-luobo-niunan` 🍲 胡萝卜洋葱炖牛腩煲
- `cn-13-suan-shao-wuhuarou` 🧄 蒜烧五花肉
- `cn-15-xingbaogu-niurouli` 🥩 黑椒杏鲍菇牛肉粒
- `cn-16-jinzhen-feiniu` 🍲 酸辣金针肥牛
- `cn-18-yangrou-dun-hulabu` 🍲 枸杞羊肉炖胡萝卜煲
- `cn-19-banli-shaoji` 🍗 经典板栗烧土鸡
- `cn-26-donggua-yimi-paigutang` 🍲 冬瓜薏米排骨清润汤
- `cn-39-danhuang-xiancai` 🥬 熟咸蛋黄炒苋菜
- `hsh-02-taco-soup` 🏆 塔可墨西哥风味浓汤 (Taco Soup)
- `hsh-04-mexican-lasagna` 🏆 墨西哥风味千层饼 (Mexican Lasagna)
- `hsh-09-peanut-butter-brownie` 🏆 酥脆花生酱大理石布朗尼 (Crunchy PB Brownies)
- `hsh-10-italian-mushrooms` 👨‍🍳 主厨意式酿烤蘑菇 (Italian Mushrooms)
- `hsh-13-beef-barley-soup` 🍲 牛肉大麦蔬菜浓汤 (Beef & Barley Vegetable Soup)
- `hsh-16-hashbrown-casserole` 🥔 橄榄球硬汉土豆饼芝士焗煲 (Hashbrown Casserole)

### 3.2 存在实质字段变化（必须逐道复核）

- `cn-05-gongbao-jiding` 🌶️ 宫保鸡丁：ingredients: 1 个字段差异；actions: 3 个字段差异；final: 1 个字段差异
- `cn-06-jiyu-tang` 🐟 奶白豆腐鲫鱼汤：ingredients: 3 个字段差异
- `cn-07-steamed-eel` 🐉 豉汁蒸盘龙白鳝：ingredients: 4 个字段差异
- `cn-12-xihongshi-jidan` 🍳 经典番茄炒鸡蛋：ingredients: 1 个字段差异；actions: 11 个字段差异；final: 1 个字段差异
- `cn-14-zhurou-dun-fentiao` 🍲 经典东北猪肉炖粉条：identity: 2 个字段差异；prerequisites: 1 个字段差异；ingredients: 26 个字段差异；actions: 24 个字段差异；final: 1 个字段差异
- `cn-20-banli-jiding` 🍗 酱香板栗炒鸡丁：ingredients: 3 个字段差异；actions: 13 个字段差异；final: 1 个字段差异
- `cn-24-jianzhi-fanqie-doufugeng` 🥣 减脂番茄内酯豆腐羹：prerequisites: 2 个字段差异；ingredients: 6 个字段差异；actions: 10 个字段差异；final: 1 个字段差异
- `cn-40-xiaren-zheng-xilanhua` 🥦 鲜虾仁清蒸西蓝花：ingredients: 2 个字段差异
- `cn-59-qincai-niurou` 🥩 经典平肝芹菜炒牛肉丝：identity: 1 个字段差异；prerequisites: 2 个字段差异；ingredients: 12 个字段差异；actions: 17 个字段差异；formulas: 1 个字段差异；final: 1 个字段差异
- `hsh-03-chicken-ritz` 🏆 Ritz饼干金黄烤鸡 (Chicken Ritz)：ingredients: 1 个字段差异；actions: 4 个字段差异
- `v3-caesar-salad` Classic Caesar Salad 经典凯撒沙拉：prerequisites: 1 个字段差异

### 3.3 实质差异逐字段对照

以下表格中的“本地工作区”只代表当前代码数据，不表示它已经过来源或厨房验证。长值为便于阅读会截断，完整值保存在 `reports/local-remote-diff.json`。

<details>
<summary><code>cn-05-gongbao-jiding</code> 🌶️ 宫保鸡丁（5 项字段差异）</summary>

| 字段 | 本地工作区 | Supabase 当前值 |
| :--- | :--- | :--- |
| `ingredients.order` | ["i1","i5","i4","i2","i3","i6"] | ["i1","i2","i3","i4","i5","i6"] |
| `actions.b3.ingredientIds` | ["i2","i3","i6"] | ["i1","i2","i3","i6"] |
| `actions.b3.dependencies` | [{"sourceBlockId":"b1","type":"material","label":"上浆鸡丁"},{"sourceBlockId":"b2","type":"material","label":"辣椒花椒底油"}] | [] |
| `actions.b3.inputBlockIds` | ["b1","b2"] | [] |
| `finalBlock` | {"method":"fry","label":"红亮爆炒 🌶️","instructions":"糊辣荔枝味浓郁，鸡丁嫩滑，花生米酥脆"} | {"label":"红亮爆炒 🌶️","method":"sear","durationText":"15 mins","instructions":"糊辣荔枝味浓郁，鸡丁嫩滑，花生米酥脆"} |

</details>

<details>
<summary><code>cn-06-jiyu-tang</code> 🐟 奶白豆腐鲫鱼汤（3 项字段差异）</summary>

| 字段 | 本地工作区 | Supabase 当前值 |
| :--- | :--- | :--- |
| `ingredients.i3.amountText` | — | 葱段+姜片 |
| `ingredients.i3.note` | 原始数据未提供各项用量，待来源核对 | — |
| `ingredients.order` | ["i1","i3","i4","i2","i5"] | ["i1","i2","i3","i4","i5"] |

</details>

<details>
<summary><code>cn-07-steamed-eel</code> 🐉 豉汁蒸盘龙白鳝（4 项字段差异）</summary>

| 字段 | 本地工作区 | Supabase 当前值 |
| :--- | :--- | :--- |
| `ingredients.i4.amountText` | — | 红椒末+陈皮末 |
| `ingredients.i4.note` | 原始数据未提供各项用量，待来源核对 | — |
| `ingredients.i5.amountText` | — | 生粉+香油+酱油 |
| `ingredients.i5.note` | 原始数据未提供各项用量，待来源核对 | — |

</details>

<details>
<summary><code>cn-12-xihongshi-jidan</code> 🍳 经典番茄炒鸡蛋（13 项字段差异）</summary>

| 字段 | 本地工作区 | Supabase 当前值 |
| :--- | :--- | :--- |
| `ingredients.order` | ["i2","i1","i3","i4"] | ["i1","i2","i3","i4"] |
| `actions.b1.sublabel` | Scramble & Set Aside | Scramble Eggs |
| `actions.b1.note` | 蛋液入热油炒至金黄蓬松炒散盛出备用，产生暂存鸡蛋支线 | 蛋液入热油炒至金黄蓬松炒散盛出 |
| `actions.b2.ingredientIds` | ["i1","i3"] | ["i1","i2","i3","i4"] |
| `actions.b2.dependencies` | [{"sourceBlockId":"b1","type":"order","label":"同锅留底油"}] | [] |
| `actions.b2.afterBlockIds` | ["b1"] | [] |
| `actions.b2.label` | 爆葱花炒番茄出浓汁 | 炒番茄出浓汁合炒 |
| `actions.b2.sublabel` | Sauté Tomato to Sauce | Sauté Tomato & Combine |
| `actions.b2.durationMinutes` | 2 | 3 |
| `actions.b2.note` | 锅留底油爆香葱花，下番茄块大火炒出红润酸香浓汁 | 爆葱花倒番茄炒出红汁，加糖盐与鸡蛋炒匀 |
| `actions.b3` | {"id":"b3","label":"鸡蛋回锅加调味合炒","sublabel":"Combine & Season","dependencies":[{"sourceBlockId":"b1","type":"material","label":"滑散鸡蛋"},{"sourceBlockId":"b2","type":"material","label… | — |
| `actions.order` | ["b1","b2","b3"] | ["b1","b2"] |
| `finalBlock` | {"method":"fry","label":"出锅装盘 🍳","durationText":"趁热享用","instructions":"番茄浓汁包裹金黄鸡蛋，酸甜可口，汤汁拌饭绝佳"} | {"label":"酸甜开胃 🍳","method":"fry","durationText":"5 min","instructions":"番茄浓汁包裹金黄鸡蛋，酸甜可口，汤汁拌饭绝佳"} |

</details>

<details>
<summary><code>cn-14-zhurou-dun-fentiao</code> 🍲 经典东北猪肉炖粉条（54 项字段差异）</summary>

| 字段 | 本地工作区 | Supabase 当前值 |
| :--- | :--- | :--- |
| `description` | 传统东北名菜。食材清单与基础做法源自张晔《蒸炖炒，营养师的健康食谱》（原著共2步工序、总耗时约35分钟）。【事实澄清与改编候选】：① 原著记载五花肉200g、红薯粉条100g、土豆100g、葱段5g、姜末5g、料酒10g、酱油10g（初版报告误作15g已纠正）、白糖10g（初版录入值，待核查原著是否为少许）、花椒若干（恢复原著未量化状态）；② 炖肉水为操作… | 传统东北名菜。五花肉块焯水炒出糖色，搭配红薯粉条与土豆块小火慢炖，粉条吸爽浓郁肉汤，热乎暖胃。 |
| `status` | draft | published |
| `prerequisites.preheat` | 红薯粉条提前温水泡软约30分钟（准备时间，不计入锅中操作耗时） | 红薯粉条提前泡软 |
| `ingredients.i1.name` | 带皮五花肉 (切厚块) | 五花肉块 (焯水) |
| `ingredients.i1.note` | 原著明确记载，冷水下锅焯透沥干，焯水倒弃不进入后序物料流 | — |
| `ingredients.i2.name` | 白糖 (炒糖色) | 红薯粉条 (泡软) |
| `ingredients.i2.amountText` | 10 g (来源未核实) | 100 g |
| `ingredients.i2.category` | seasoning | grain |
| `ingredients.i2.note` | 初版录入值10g，原著字样待核实是否为少许 | — |
| `ingredients.i3.name` | 植物油 (润锅底油) | 土豆 (切块) |
| `ingredients.i3.amountText` | 适量 (润锅估) | 100 g |
| `ingredients.i3.category` | liquid | produce |
| `ingredients.i3.note` | 原著未量化具体油脂克数，润锅慢炒糖色 | — |
| `ingredients.i4.name` | 生姜片 | 酱油与料酒白糖 |
| `ingredients.i4.amountText` | 5 g | 酱油10g + 料酒10g + 糖10g |
| `ingredients.i4.category` | produce | liquid |
| `ingredients.i4.note` | 原著明确记载（姜末5g），切片去腥提鲜 | — |
| `ingredients.i5.name` | 大葱段 | 葱段姜末花椒 |
| `ingredients.i5.amountText` | 5 g | 葱段5g + 姜末5g + 花椒 |
| `ingredients.i5.category` | produce | seasoning |
| `ingredients.i5.note` | 原著明确记载（葱段5g），增香炝锅 | — |
| `ingredients.i6` | {"id":"i6","name":"花椒","amountText":"若干 (原著未量化)","category":"seasoning","note":"原著明确记载“花椒若干”，未标死克重"} | — |
| `ingredients.i8` | {"id":"i8","name":"料酒 (去腥)","amountText":"10 g","category":"liquid","note":"原著明确记载（料酒10g），炝锅烹入"} | — |
| `ingredients.i9` | {"id":"i9","name":"生抽酱油 (负责底味)","amountText":"10 g (原著酱油调味估)","category":"liquid","note":"原著明确记载酱油10g，负责基础咸鲜底味"} | — |
| `ingredients.i10` | {"id":"i10","name":"老抽酱油 (负责调色)","amountText":"5 g (调色改编候选)","category":"liquid","note":"红烧调色改编，原著未区分生抽老抽"} | — |
| `ingredients.i11` | {"id":"i11","name":"温开水 (炖肉高汤)","amountText":"适量 (没过肉块)","category":"liquid","note":"烹饪食用加水，需没过肉块并预留粉条吸水，原著未标注毫升数"} | — |
| `ingredients.i12` | {"id":"i12","name":"红薯粉条 (提前泡软)","amountText":"100 g","category":"grain","note":"原著明确记载，温水泡软备用"} | — |
| `ingredients.i13` | {"id":"i13","name":"土豆 (切滚刀块)","amountText":"100 g","category":"produce","note":"原著明确记载，去皮切滚刀块"} | — |
| `ingredients.order` | ["i1","i2","i3","i4","i5","i6","i8","i9","i10","i11","i12","i13"] | ["i1","i2","i3","i4","i5"] |
| `actions.b1.ingredientIds` | ["i1"] | ["i1","i4"] |
| `actions.b1.label` | 冷水焯肉 | 焯水与炒糖色 |
| `actions.b1.sublabel` | Blanch Pork | Blanch & Caramelize |
| `actions.b1.durationMinutes` | 4 | 5 |
| `actions.b1.heatLevel` | 大火 | 中火 |
| `actions.b1.equipment` | 焯水锅 | — |
| `actions.b1.completionState` | 大火沸腾撇净浮沫，肉块断生捞出 | — |
| `actions.b1.outputItem` | 焯透五花肉 | — |
| `actions.b1.note` | 五花肉冷水下锅大火烧开撇沫，捞出温水洗净沥干 (焯水倒弃不进入后续物料流；时长4m为建模推断) | 五花肉焯水洗净，油烧热放白糖炒出糖色，下肉块炒匀 |
| `actions.b2.ingredientIds` | ["i2","i3"] | ["i1","i2","i3","i4","i5"] |
| `actions.b2.dependencies` | [{"sourceBlockId":"b1","type":"material","label":"焯透五花肉"}] | [] |
| `actions.b2.inputBlockIds` | ["b1"] | [] |
| `actions.b2.label` | 煸炒上色 | 下粉条土豆慢炖 |
| `actions.b2.sublabel` | Caramelize & Brown | Stew Noodles & Potato |
| `actions.b2.durationMinutes` | 3 | 30 |
| `actions.b2.heatLevel` | 小火融糖转中火上色 | 小火 |
| `actions.b2.equipment` | 深口炖锅 | — |
| `actions.b2.completionState` | 小火糖液起琥珀微泡，下肉转中火煸炒挂霜 | — |
| `actions.b2.outputItem` | 糖色五花肉 | — |
| `actions.b2.note` | 锅中倒油下白糖，先小火慢炒出微泡琥珀色，下入焯好肉块转中火翻炒上色微煸出油 (时长3m为建模推断) | 加姜末花椒酱油水烧开，放粉条土豆炖至肉熟透收汁 |
| `actions.b3` | {"id":"b3","label":"炝锅加汤","sublabel":"Aromatics & Broth","ingredientIds":["i4","i5","i6","i8","i9","i10","i11"],"dependencies":[{"sourceBlockId":"b2","type":"material","label":"糖色… | — |
| `actions.b4` | {"id":"b4","label":"慢火焖炖","sublabel":"Simmer Pork","ingredientIds":[],"dependencies":[{"sourceBlockId":"b3","type":"material","label":"浓醇炖肉汤底"}],"stageIndex":3,"heatLevel":"小火","d… | — |
| `actions.b5` | {"id":"b5","label":"汇入同炖","sublabel":"Stew with Noodles & Potato","ingredientIds":["i12","i13"],"dependencies":[{"sourceBlockId":"b4","type":"material","label":"酥软五花肉"}],"stageInd… | — |
| `actions.order` | ["b1","b2","b3","b4","b5"] | ["b1","b2"] |
| `finalBlock` | {"method":"stew","label":"大火收汁装盘 🍲","durationText":"收汁约3m / 操作耗时约52m (估)","instructions":"开大火收浓汤汁至挂勺裹料，盛入砂锅大碗趁热享用。粉条滑爽透亮吸饱肉汤，土豆软糯粉甜，五花肉酥烂不腻。"} | {"label":"红油软糯 🍲","method":"stew","instructions":"粉条滑爽吸饱肉香，土豆软糯粉甜"} |

</details>

<details>
<summary><code>cn-20-banli-jiding</code> 🍗 酱香板栗炒鸡丁（17 项字段差异）</summary>

| 字段 | 本地工作区 | Supabase 当前值 |
| :--- | :--- | :--- |
| `ingredients.i3.amountText` | — | 酱油+蚝油 |
| `ingredients.i3.note` | 原始数据未提供各项用量，待来源核对 | — |
| `ingredients.order` | ["i1","i3","i4","i2"] | ["i1","i2","i3","i4"] |
| `actions.b1.label` | 腌渍鸡丁入味 | 鸡丁腌渍与爆香 |
| `actions.b1.sublabel` | Marinate Chicken | Marinate & Saute Garlic |
| `actions.b1.note` | 鸡腿肉丁加姜末蒜末、盐3g、酱油与蚝油抓拌均匀腌制入味 | 鸡丁加盐酱油蚝油腌3分钟，油爆姜蒜末下鸡丁 |
| `actions.b2.ingredientIds` | [] | ["i1","i2","i3"] |
| `actions.b2.dependencies` | [{"sourceBlockId":"b1","type":"material"}] | [] |
| `actions.b2.inputBlockIds` | ["b1"] | [] |
| `actions.b2.label` | 滑炒鸡丁变色 | 下熟板栗快速翻炒 |
| `actions.b2.sublabel` | Sear Chicken | Stir-Fry Chestnuts |
| `actions.b2.durationMinutes` | 2 | 3 |
| `actions.b2.heatLevel` | 中大火 | 大火 |
| `actions.b2.note` | 锅中热油，倒入腌好的鸡丁快速滑散翻炒至肉色发白 | 鸡丁变色后下板栗块，大火快炒至熟透出锅 |
| `actions.b3` | {"id":"b3","label":"下熟板栗合炒","sublabel":"Stir-Fry Chestnuts","ingredientIds":["i2"],"dependencies":[{"sourceBlockId":"b2","type":"material"}],"stageIndex":2,"heatLevel":"大火","durat… | — |
| `actions.order` | ["b1","b2","b3"] | ["b1","b2"] |
| `finalBlock` | {"method":"fry","label":"出锅装盘 🍗","instructions":"出锅装盘趁热享用。鸡丁鲜嫩多汁，板栗甜软粉香"} | {"label":"咸甜鲜香 🍗","method":"fry","instructions":"鸡丁鲜嫩多汁，板栗甜软粉香"} |

</details>

<details>
<summary><code>cn-24-jianzhi-fanqie-doufugeng</code> 🥣 减脂番茄内酯豆腐羹（19 项字段差异）</summary>

| 字段 | 本地工作区 | Supabase 当前值 |
| :--- | :--- | :--- |
| `prerequisites.containerSize` | 中号汤锅 | 汤锅 |
| `prerequisites.preheat` | 番茄切块，内酯豆腐手捏小块，鸡蛋打散 | 准备内酯豆腐与打散鸡蛋 |
| `ingredients.i4.name` | 葱末 (炝锅) | 香菜末与葱末 |
| `ingredients.i4.amountText` | 10 g | 香菜末+葱末 |
| `ingredients.i5.name` | 植物油与食盐 | 食盐与鸡精植物油 |
| `ingredients.i5.amountText` | 油10g + 盐适量 | 盐+鸡精+少量油 |
| `ingredients.i3.name` | 鸡蛋液 (打散) | 鸡蛋 |
| `ingredients.order` | ["i1","i4","i5","i2","i3"] | ["i1","i2","i3","i4","i5"] |
| `actions.b1.label` | 爆香炒汁 | 爆香葱末炒番茄汁 |
| `actions.b1.sublabel` | Sauté | Sauté Tomato Base |
| `actions.b1.note` | 油热爆葱末下番茄炒出红油浓汁，加水大火烧开，产生开水番茄汤底 | 油热爆葱末下番茄炒出浓汁，倒入水大火烧开小火炖5分钟 |
| `actions.b2.ingredientIds` | ["i2","i3"] | ["i2","i3","i4","i5"] |
| `actions.b2.dependencies` | [{"sourceBlockId":"b1","type":"material","label":"开水番茄汤底"}] | [] |
| `actions.b2.inputBlockIds` | ["b1"] | [] |
| `actions.b2.label` | 合煮蛋花 | 放豆腐与转圈倒入蛋液 |
| `actions.b2.sublabel` | Egg Drop | Add Tofu & Egg Swirl |
| `actions.b2.heatLevel` | 小火 | 中火 |
| `actions.b2.note` | 捏入豆腐块大火烧开，关火沿锅边转圈倒蛋液盖盖焖5分钟 | 捏入豆腐块大火烧开，关火沿锅边转圈倒蛋液盖盖闷5分钟，撒香菜末 |
| `finalBlock` | {"method":"stew","label":"出锅装盘","durationText":"趁热享用","instructions":"豆腐入口即化，蛋花絮状绵密，汤酸甜开胃"} | {"label":"酸甜滑嫩 🥣","method":"stew","instructions":"豆腐入口即化，蛋花絮状绵密，汤酸甜开胃"} |

</details>

<details>
<summary><code>cn-40-xiaren-zheng-xilanhua</code> 🥦 鲜虾仁清蒸西蓝花（2 项字段差异）</summary>

| 字段 | 本地工作区 | Supabase 当前值 |
| :--- | :--- | :--- |
| `ingredients.i3.amountText` | — | 蚝油+水淀粉+盐+鸡精 |
| `ingredients.i3.note` | 原始数据未提供各项用量，待来源核对 | — |

</details>

<details>
<summary><code>cn-59-qincai-niurou</code> 🥩 经典平肝芹菜炒牛肉丝（34 项字段差异）</summary>

| 字段 | 本地工作区 | Supabase 当前值 |
| :--- | :--- | :--- |
| `description` | 强筋健骨降血压经典菜。参考张晔原著老抽水淀粉上浆滑熟做法。注：调料克数、烹调油分配与单锅工序耗时属建模草稿，待厨房实测验证。 | 强筋健骨降血压经典菜。牛肉丝加老抽水淀粉上浆滑熟，搭配清脆芹菜段与野山椒大火爆炒。 |
| `prerequisites.containerSize` | 中式炒锅 & 腌肉碗 | 中式炒锅 |
| `prerequisites.preheat` | 牛肉横切细丝，上浆封油静置 | 牛肉切细丝上浆 |
| `ingredients.i1.name` | 牛里脊细丝 | 嫩牛肉丝 (上浆) |
| `ingredients.i1.note` | 横丝切成细丝 | — |
| `ingredients.i4.name` | 牛肉滑嫩上浆料 | 老抽料酒盐鸡精水淀粉 |
| `ingredients.i4.amountText` | 1 碗 | 老抽+料酒+盐+鸡精+水淀粉 |
| `ingredients.i4.category` | formula | seasoning |
| `ingredients.i4.formulaId` | formula-niurou-shangjiang | — |
| `ingredients.i4.note` | 老抽水淀粉上浆封油 | — |
| `ingredients.i-oil` | {"id":"i-oil","name":"烹调油","amountText":"20 ml","category":"liquid","note":"滑炒牛肉用约15ml，盛出后锅留底油约5ml炒芹菜，合炒不再新增用油"} | — |
| `ingredients.i2.note` | 摘叶洗净切4cm长段 | — |
| `ingredients.i3.amountText` | 山椒15g + 姜丝10g | 野山椒+姜丝 |
| `ingredients.i5` | {"id":"i5","name":"炒制定味调料","amountText":"盐2g + 鸡精1g","category":"seasoning"} | — |
| `ingredients.order` | ["i1","i4","i-oil","i2","i3","i5"] | ["i1","i2","i3","i4"] |
| `actions.b1.label` | 牛肉上浆抓匀 | 牛肉丝滑油变色盛出 |
| `actions.b1.sublabel` | — | Flash Sear Beef |
| `actions.b1.durationMinutes` | 3 | 2 |
| `actions.b1.heatLevel` | — | 大火 |
| `actions.b1.equipment` | 腌肉碗 | — |
| `actions.b1.note` | 牛肉丝加老抽料酒与水淀粉抓匀上劲，封油静置备用 | 牛肉丝加料酒老抽水淀粉抓匀，热油滑散变色捞出 |
| `actions.b2.ingredientIds` | ["i-oil"] | ["i1","i2","i3","i4"] |
| `actions.b2.dependencies` | [{"sourceBlockId":"b1","type":"material","label":"上浆牛肉"}] | [] |
| `actions.b2.inputBlockIds` | ["b1"] | [] |
| `actions.b2.label` | 热锅滑油盛出牛肉 | 爆香野山椒炒芹菜合炒 |
| `actions.b2.sublabel` | — | Stir-Fry Celery & Combine |
| `actions.b2.durationMinutes` | 1 | 2 |
| `actions.b2.equipment` | 中式炒锅 | — |
| `actions.b2.note` | 炒锅烧热下烹调油，下入牛肉丝大火快速滑散变色盛出沥油，产生暂存牛肉支线 | 爆姜丝野山椒下芹菜段大火炒断生，倒入牛肉加盐鸡精翻匀 |
| `actions.b3` | {"id":"b3","label":"锅留底油爆炒芹菜","dependencies":[{"sourceBlockId":"b2","type":"order","label":"同锅留底油"}],"afterBlockIds":["b2"],"ingredientIds":["i-oil","i2","i3"],"stageIndex":2,"hea… | — |
| `actions.b4` | {"id":"b4","label":"牛肉回锅合炒定味","dependencies":[{"sourceBlockId":"b2","type":"material","label":"暂存牛肉"},{"sourceBlockId":"b3","type":"material","label":"炒好芹菜"}],"inputBlockIds":["b2… | — |
| `actions.order` | ["b1","b2","b3","b4"] | ["b1","b2"] |
| `formulas` | [{"id":"formula-niurou-shangjiang","name":"牛肉滑嫩上浆料","category":"marinade","yieldText":"适用于 200g 牛肉丝 (草稿比例)","baseServings":3,"items":[{"name":"料酒","baseAmount":10,"unit":"ml","not… | [] |
| `finalBlock` | {"method":"fry","label":"出锅装盘 🥩","durationText":"趁热享用","instructions":"牛肉滑嫩爽口，芹菜清脆鲜香，微辣酸爽平肝开胃"} | {"label":"辣香鲜嫩 🥩","method":"fry","instructions":"牛肉滑嫩，芹菜清脆微辣开胃"} |

</details>

<details>
<summary><code>hsh-03-chicken-ritz</code> 🏆 Ritz饼干金黄烤鸡 (Chicken Ritz)（5 项字段差异）</summary>

| 字段 | 本地工作区 | Supabase 当前值 |
| :--- | :--- | :--- |
| `ingredients.order` | ["i1","i4","i2","i3","i5"] | ["i1","i2","i3","i4","i5"] |
| `actions.b2.label` | 调制汤酱 | 调调制汤酱 |
| `actions.b3.ingredientIds` | ["i5"] | ["i1","i2","i5"] |
| `actions.b3.dependencies` | [{"sourceBlockId":"b1","type":"material","label":"鸡肉底层"},{"sourceBlockId":"b2","type":"material","label":"奶油汤酱"}] | [] |
| `actions.b3.inputBlockIds` | ["b1","b2"] | [] |

</details>

<details>
<summary><code>v3-caesar-salad</code> Classic Caesar Salad 经典凯撒沙拉（1 项字段差异）</summary>

| 字段 | 本地工作区 | Supabase 当前值 |
| :--- | :--- | :--- |
| `prerequisites.containerSize` | 大号沙拉碗与手动打蛋器 | — |

</details>

---

## 4. 重点差异样板剖析

### 样板 1: `cn-59-qincai-niurou` (芹菜牛肉)
- **云端版本 (`updated_at: 2026-08-04`)**：
  - 仅有 2 个简易工序，依赖关系未类型化。
- **本地代码版本 (`src/data/chineseHealthyRecipes.ts`)**：
  - 4 个标准工序，包含完整物料流：牛肉腌渍滑炒 ➔ 暂存盛出 ➔ 爆香蔬菜 ➔ 回锅合炒（承接牛肉半成品）。
- **影响**：默认访问加载云端旧快照时无法展示走廊回锅；携带 `?source=local` 即可展示完整的连续回锅走廊。

---

## 5. 建议与治理原则

1. **严禁在前端硬编码强制本地优先**来掩盖云端版本不同步；
2. **严禁自动覆盖远程数据库**：草稿与未核实内容不得自动发布；
3. 后续若需全量同步，必须在完成真实主厨与事实审核后，由管理员显式触发云端落盘迁移指令。
