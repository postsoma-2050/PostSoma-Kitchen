import type { VisualRecipeV3 } from '../../../src/types/recipeV3'

// Exact local preset snapshot; cloud content_version=2 has the same ingredients/actions/final semantics.
export const before: VisualRecipeV3 = {
  "id": "cn-59-qincai-niurou",
  "version": "3.0",
  "status": "complete",
  "title": "🥩 经典平肝芹菜炒牛肉丝",
  "description": "强筋健骨降血压经典菜。牛肉丝加老抽水淀粉上浆滑熟，搭配清脆芹菜段与野山椒大火爆炒。",
  "cuisine": "chinese",
  "difficulty": "medium",
  "prerequisites": {
    "containerSize": "中式炒锅",
    "preheat": "牛肉切细丝上浆",
    "servings": "3 人份"
  },
  "ingredients": [
    {
      "id": "i1",
      "name": "嫩牛肉丝 (上浆)",
      "amountText": "200 g",
      "category": "main"
    },
    {
      "id": "i2",
      "name": "香芹菜段",
      "amountText": "200 g",
      "category": "produce"
    },
    {
      "id": "i3",
      "name": "泡野山椒碎与姜丝",
      "amountText": "野山椒+姜丝",
      "category": "produce"
    },
    {
      "id": "i4",
      "name": "老抽料酒盐鸡精水淀粉",
      "amountText": "老抽+料酒+盐+鸡精+水淀粉",
      "category": "seasoning"
    }
  ],
  "actionBlocks": [
    {
      "id": "b1",
      "label": "牛肉丝滑油变色盛出",
      "sublabel": "Flash Sear Beef",
      "ingredientIds": [
        "i1",
        "i4"
      ],
      "stageIndex": 0,
      "heatLevel": "大火",
      "durationMinutes": 2,
      "notes": "牛肉丝加料酒老抽水淀粉抓匀，热油滑散变色捞出"
    },
    {
      "id": "b2",
      "label": "爆香野山椒炒芹菜合炒",
      "sublabel": "Stir-Fry Celery & Combine",
      "ingredientIds": [
        "i1",
        "i2",
        "i3",
        "i4"
      ],
      "stageIndex": 1,
      "heatLevel": "大火",
      "durationMinutes": 2,
      "notes": "爆姜丝野山椒下芹菜段大火炒断生，倒入牛肉加盐鸡精翻匀"
    }
  ],
  "finalBlock": {
    "method": "fry",
    "label": "辣香鲜嫩 🥩",
    "instructions": "牛肉滑嫩，芹菜清脆微辣开胃"
  },
  "createdAt": "2016-09-01T00:00:00Z",
  "updatedAt": "2026-08-03T12:00:00Z"
}
