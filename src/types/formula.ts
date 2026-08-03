/**
 * SubRecipeFormula (复合调料 / 酱汁 / 腌料 / 芡汁 / 子配方) 数据模型
 */

export interface FormulaItem {
  id?: string
  name: string            // 原料名称，如 "保宁醋"
  baseAmount: number      // 基准用量数值，如 15
  unit: string            // 单位，如 "g", "ml", "茶匙", "汤匙"
  note?: string           // 备注，如 "常温"
}

export type FormulaCategory = 'sauce' | 'marinade' | 'seasoning' | 'glaze' | 'batter' | 'other'

export interface SubRecipeFormula {
  id: string              // 唯一 ID，如 "formula-gongbao-sauce"
  name: string            // 配方名称，如 "宫保特调小碗汁"
  category: FormulaCategory | string // 分类
  yieldText?: string      // 适用成品量描述，如 "约 60 ml"
  baseServings: number    // 基准份数，如 2 (代表基准用量适用于 2 人份)
  items: FormulaItem[]    // 详细原料用量清单
  steps?: string[]        // 调制步骤清单，如 ["1. 碗中先加入香醋与酱油", "2. 加入白糖搅拌至微融"]
  timingTip?: string      // 使用时机/秘诀，如 "大火爆炒出锅前 10 秒沿锅边烹入"
  prepActionBlockId?: string  // 关联的 Matrix Flow 调制节点 ID
  usedActionBlockIds?: string[]// 关联的 Matrix Flow 烹入使用节点 ID 列表
}

export interface ScaledFormulaItem extends FormulaItem {
  scaledAmount: number
  formattedAmountText: string
}
