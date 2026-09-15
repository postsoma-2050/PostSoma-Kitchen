// Proposed domain model, not a drop-in VisualRecipeV3 or a kitchen-tested recipe.
// A portion is consumed once. Repeated additions use distinct portions; shopping totals
// aggregate by ingredientId. A formula groups portions, never duplicates their quantity.
export type Quantity =
  | { kind: 'measured'; value: number; unit: 'g' | 'ml'; evidence: 'legacy-source' | 'kitchen-test' }
  | { kind: 'unknown'; reason: string }
export type Input = { kind: 'portion' | 'output'; id: string }
export interface Step {
  id: string
  operation: 'cut' | 'mix' | 'marinate' | 'stirFry' | 'transfer' | 'aromatics' | 'combine'
  label: string
  instruction: string
  inputs: Input[]
  after: string[] // Control/resource order only: not an ingredient transfer.
  equipmentId: string
  heat: 'off' | 'high' | 'review'
  duration: { kind: 'unknown'; reason: string } | { kind: 'range'; minSeconds: number; maxSeconds: number }
  output: { id: string; name: string; location: string }
}
export interface BranchRecipe {
  id: string
  schemaVersion: '3.1-proposal'
  status: 'draft' | 'published'
  locale: 'zh-CN'
  title: string
  description: string
  cuisine: 'chinese'
  difficulty: 'medium'
  servings: number
  ingredients: { id: string; name: string; category: 'main' | 'produce' | 'seasoning' | 'liquid' | 'grain' }[]
  portions: { id: string; ingredientId: string; role: 'main' | 'marinade' | 'aromatics' | 'finishing' | 'cookingOil'; quantity: Quantity }[]
  formulas: { id: string; name: string; role: 'marinade' | 'sauce'; portionIds: string[]; prepStepId: string }[]
  groups: { id: string; name: string; role: 'aromatics'; portionIds: string[] }[]
  equipment: { id: string; name: string }[]
  steps: Step[]
  finish: { input: Input; operation: 'plate'; label: string; instruction: string; expectedResult: string }
  verification: { state: 'needs-source-and-kitchen-review'; unresolved: string[] }
}
const unknown: Quantity = { kind: 'unknown', reason: '原数据未提供独立用量，须回查来源并试做' }
const duration: Step['duration'] = { kind: 'unknown', reason: '原两段各2分钟混合了多种操作，不能分摊成已验证时长' }
const p = (id: string): Input => ({ kind: 'portion', id })
const o = (id: string): Input => ({ kind: 'output', id })

export const after: BranchRecipe = {
  id: 'cn-59-qincai-niurou', schemaVersion: '3.1-proposal', status: 'draft', locale: 'zh-CN',
  title: '芹菜炒牛肉丝', description: '牛肉与芹菜分阶段炒制，最后合炒调味。',
  cuisine: 'chinese', difficulty: 'medium', servings: 3,
  ingredients: [
    { id: 'beef', name: '牛肉', category: 'main' },
    { id: 'celery', name: '芹菜', category: 'produce' },
    { id: 'pepper', name: '泡野山椒', category: 'produce' },
    { id: 'ginger', name: '姜', category: 'produce' },
    { id: 'soy', name: '老抽', category: 'liquid' },
    { id: 'wine', name: '料酒', category: 'liquid' },
    { id: 'starch', name: '淀粉', category: 'grain' },
    { id: 'water', name: '水', category: 'liquid' },
    { id: 'salt', name: '盐', category: 'seasoning' },
    { id: 'stock', name: '鸡精', category: 'seasoning' },
    { id: 'oil', name: '食用油', category: 'liquid' },
  ],
  portions: [
    { id: 'beef-main', ingredientId: 'beef', role: 'main', quantity: { kind: 'measured', value: 200, unit: 'g', evidence: 'legacy-source' } },
    { id: 'celery-main', ingredientId: 'celery', role: 'main', quantity: { kind: 'measured', value: 200, unit: 'g', evidence: 'legacy-source' } },
    { id: 'pepper-aroma', ingredientId: 'pepper', role: 'aromatics', quantity: unknown },
    { id: 'ginger-aroma', ingredientId: 'ginger', role: 'aromatics', quantity: unknown },
    { id: 'soy-marinade', ingredientId: 'soy', role: 'marinade', quantity: unknown },
    { id: 'wine-marinade', ingredientId: 'wine', role: 'marinade', quantity: unknown },
    { id: 'starch-marinade', ingredientId: 'starch', role: 'marinade', quantity: unknown },
    { id: 'water-marinade', ingredientId: 'water', role: 'marinade', quantity: unknown },
    { id: 'salt-finish', ingredientId: 'salt', role: 'finishing', quantity: unknown },
    { id: 'stock-finish', ingredientId: 'stock', role: 'finishing', quantity: unknown },
    { id: 'oil-beef', ingredientId: 'oil', role: 'cookingOil', quantity: unknown },
    { id: 'oil-veg', ingredientId: 'oil', role: 'cookingOil', quantity: unknown },
  ],
  formulas: [{ id: 'marinade', name: '牛肉上浆料', role: 'marinade',
    portionIds: ['soy-marinade', 'wine-marinade', 'starch-marinade', 'water-marinade'], prepStepId: 'mix' }],
  // Mise en place group: members are prepared together but are not a mixed sauce.
  groups: [{ id: 'aromatics', name: '爆锅小料', role: 'aromatics', portionIds: ['pepper-aroma', 'ginger-aroma'] }],
  equipment: [
    { id: 'board-beef', name: '肉类砧板' }, { id: 'board-veg', name: '蔬菜砧板' },
    { id: 'bowl', name: '腌肉碗' }, { id: 'sauce-bowl', name: '调料碗' },
    { id: 'wok', name: '炒锅' }, { id: 'holding-plate', name: '牛肉暂存盘' },
  ],
  steps: [
    { id: 'cut-beef', operation: 'cut', label: '牛肉切丝', instruction: '牛肉切丝；切法与粗细须在试做记录中明确。',
      inputs: [p('beef-main')], after: [], equipmentId: 'board-beef', heat: 'off', duration,
      output: { id: 'beef-strips', name: '牛肉丝', location: 'bowl' } },
    { id: 'prep-veg', operation: 'cut', label: '芹菜切段', instruction: '芹菜切段。',
      inputs: [p('celery-main')], after: [], equipmentId: 'board-veg', heat: 'off', duration,
      output: { id: 'celery-cut', name: '芹菜段', location: 'board-veg' } },
    { id: 'prep-aroma', operation: 'cut', label: '准备爆锅小料', instruction: '姜切丝，泡野山椒切碎。',
      inputs: [p('ginger-aroma'), p('pepper-aroma')], after: ['prep-veg'], equipmentId: 'board-veg', heat: 'off', duration,
      output: { id: 'aroma-cut', name: '姜丝与山椒碎', location: 'board-veg' } },
    { id: 'mix', operation: 'mix', label: '调上浆料', instruction: '将老抽、料酒、淀粉与水混匀；比例待核实。',
      inputs: [p('soy-marinade'), p('wine-marinade'), p('starch-marinade'), p('water-marinade')], after: [], equipmentId: 'sauce-bowl', heat: 'off', duration,
      output: { id: 'marinade-ready', name: '上浆料', location: 'sauce-bowl' } },
    { id: 'marinate', operation: 'marinate', label: '牛肉抓匀上浆', instruction: '牛肉丝加入上浆料抓匀；静置时长待核实。',
      inputs: [o('beef-strips'), o('marinade-ready')], after: [], equipmentId: 'bowl', heat: 'off', duration,
      output: { id: 'beef-coated', name: '已上浆牛肉丝', location: 'bowl' } },
    { id: 'sear', operation: 'stirFry', label: '牛肉下锅滑散', instruction: '锅中加牛肉用油，将牛肉丝滑散；温度、油量与阶段终点待试做确认。',
      inputs: [o('beef-coated'), p('oil-beef')], after: [], equipmentId: 'wok', heat: 'review', duration,
      output: { id: 'beef-seared', name: '滑散牛肉', location: 'wok' } },
    { id: 'hold', operation: 'transfer', label: '盛出牛肉备用', instruction: '将牛肉移到暂存盘，腾出炒锅。',
      inputs: [o('beef-seared')], after: [], equipmentId: 'wok', heat: 'off', duration,
      output: { id: 'beef-held', name: '暂存牛肉', location: 'holding-plate' } },
    { id: 'aroma', operation: 'aromatics', label: '姜丝山椒爆香', instruction: '姜丝、山椒碎下锅爆香；另用油还是留底油待试做确认。',
      inputs: [o('aroma-cut'), p('oil-veg')], after: ['hold'], equipmentId: 'wok', heat: 'high', duration,
      output: { id: 'aroma-ready', name: '爆香小料', location: 'wok' } },
    { id: 'veg', operation: 'stirFry', label: '下芹菜翻炒', instruction: '加入芹菜段翻炒；成熟判据待试做确认。',
      inputs: [o('celery-cut'), o('aroma-ready')], after: [], equipmentId: 'wok', heat: 'high', duration,
      output: { id: 'veg-ready', name: '炒好的芹菜与小料', location: 'wok' } },
    { id: 'combine', operation: 'combine', label: '牛肉回锅合炒', instruction: '倒回暂存牛肉，加入盐和鸡精翻匀；最终熟度与调味比例待试做确认。',
      inputs: [o('beef-held'), o('veg-ready'), p('salt-finish'), p('stock-finish')], after: [], equipmentId: 'wok', heat: 'high', duration,
      output: { id: 'dish', name: '芹菜炒牛肉', location: 'wok' } },
  ],
  finish: { input: o('dish'), operation: 'plate', label: '出锅装盘', instruction: '完成炒制后关火，移入餐盘。', expectedResult: '目标口感：牛肉滑嫩，芹菜爽脆。' },
  verification: { state: 'needs-source-and-kitchen-review', unresolved: [
    '除牛肉、芹菜各200g外，各配料用量均缺失；旧数据缺食用油清单。',
    '水淀粉拆为水与淀粉、上浆料混合方式、两次用油分配均为待核实建模方案。',
    '需要来源定位、操作者、试做日期、锅具/灶具、用量、阶段熟度及耗时记录，才能标记实测。',
  ] },
}
