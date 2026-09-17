import type { VisualRecipeV3 } from '@/types/recipeV3'

/**
 * 营养师张晔《蒸炖炒，营养师的健康食谱》原书真值 - 人群调护 (女性/男性/儿童生长)
 * 共 36 道食谱 (100% 严格原子食材建模，一人一行，无复合食材)
 */
export const BATCH7_SPECIAL_CARE: VisualRecipeV3[] = [
  {
    "id": "cn-103",
    "version": "3.0",
    "status": "published",
    "title": "🥕 蜂蜜白萝卜盅",
    "description": "营养师张晔健康食谱·益气养血 气血充足，女人健康不爱老",
    "cuisine": "chinese",
    "difficulty": "medium",
    "prerequisites": {
      "containerSize": "多层不锈钢蒸锅 (Steamer)",
      "servings": "2-3 人份",
      "prepNotes": "准备15分钟 · 烹调15分钟"
    },
    "cookingTimeText": "准备15分钟 · 烹调15分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "白萝卜",
        "amountText": "100克",
        "category": "produce"
      },
      {
        "id": "i2",
        "name": "枸杞子",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i3",
        "name": "蜂蜜",
        "amountText": "适量",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "切配泡发",
        "sublabel": "Soak",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2"
        ],
        "note": "白萝卜去皮，切成厚段再用勺子将中间挖空，然后切同等数量的薄片；枸杞子洗净，泡软。"
      },
      {
        "id": "b2",
        "label": "组合装填",
        "sublabel": "Assemble",
        "stageIndex": 1,
        "ingredientIds": [
          "i3"
        ],
        "note": "将蜂蜜填入萝卜段中，加入枸杞子，盖上薄萝卜片。",
        "dependencies": [
          {
            "sourceBlockId": "b1",
            "type": "material",
            "label": "承接前序处理物"
          }
        ],
        "inputBlockIds": [
          "b1"
        ]
      },
      {
        "id": "b3",
        "label": "装盘蒸制",
        "sublabel": "Steam",
        "stageIndex": 2,
        "ingredientIds": [],
        "heatLevel": "中火",
        "note": "装盘，放入蒸锅中隔水蒸，水沸后转中火蒸一小时即可。",
        "dependencies": [
          {
            "sourceBlockId": "b2",
            "type": "material",
            "label": "承接前序处理物"
          }
        ],
        "inputBlockIds": [
          "b2"
        ]
      }
    ],
    "finalBlock": {
      "method": "steam",
      "role": "outcome",
      "label": "完成",
      "servingInstructions": "出锅装盘"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00025.html#sigil_toc_id_173 · 益气养血 气血充足，女人健康不爱老 · 蜂蜜白萝卜盅",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00025.html#sigil_toc_id_173"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：蜂蜜被誉为“大自然中最完美的营养食品”，是药食两用的保健品，经常服用可延年益寿。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-104",
    "version": "3.0",
    "status": "published",
    "title": "🍗 西洋参板栗蒸乌鸡",
    "description": "营养师张晔健康食谱·益气养血 气血充足，女人健康不爱老",
    "cuisine": "chinese",
    "difficulty": "medium",
    "prerequisites": {
      "containerSize": "多层不锈钢蒸锅 (Steamer)",
      "servings": "2-3 人份",
      "prepNotes": "准备30分钟 · 烹调20分钟"
    },
    "cookingTimeText": "准备30分钟 · 烹调20分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "净乌鸡",
        "amountText": "500克",
        "category": "main"
      },
      {
        "id": "i3",
        "name": "板栗",
        "amountText": "100克",
        "category": "produce"
      },
      {
        "id": "i4",
        "name": "蚝油",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i8",
        "name": "植物油",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i2",
        "name": "西洋参",
        "amountText": "50克",
        "category": "produce"
      },
      {
        "id": "i5",
        "name": "老抽",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i6",
        "name": "枸杞子",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i7",
        "name": "姜丝",
        "amountText": "适量",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "切配",
        "sublabel": "Prep",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i3"
        ],
        "note": "将净乌鸡用凉水冲泡洗净，剁块；板栗去皮取肉。"
      },
      {
        "id": "b2",
        "label": "腌浆",
        "sublabel": "Marinate",
        "stageIndex": 1,
        "ingredientIds": [
          "i4",
          "i8"
        ],
        "durationMinutes": 5,
        "note": "把乌鸡块放碗中，加蚝油、酱油、植物油腌5分钟。",
        "dependencies": [
          {
            "sourceBlockId": "b1",
            "type": "material",
            "label": "承接前序处理物"
          }
        ],
        "inputBlockIds": [
          "b1"
        ]
      },
      {
        "id": "b3",
        "label": "腌浆装盘蒸制",
        "sublabel": "Steam",
        "stageIndex": 2,
        "ingredientIds": [
          "i2",
          "i6",
          "i7",
          "i5"
        ],
        "durationMinutes": 20,
        "note": "把腌好的乌鸡块和板栗肉装盘，放入蒸锅中，再入西洋参、枸杞子、姜丝，蒸20分钟取出即可。",
        "dependencies": [
          {
            "sourceBlockId": "b2",
            "type": "material",
            "label": "承接前序处理物"
          }
        ],
        "inputBlockIds": [
          "b2"
        ]
      }
    ],
    "finalBlock": {
      "method": "steam",
      "role": "outcome",
      "label": "完成",
      "servingInstructions": "出锅装盘"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00025.html#sigil_toc_id_174 · 益气养血 气血充足，女人健康不爱老 · 西洋参板栗蒸乌鸡",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00025.html#sigil_toc_id_174"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：乌鸡能补血，尤其适合产后气虚、月经不调等气血虚损症。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-105",
    "version": "3.0",
    "status": "published",
    "title": "🥩 丝瓜猪肝瘦肉汤",
    "description": "营养师张晔健康食谱·益气养血 气血充足，女人健康不爱老",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "高保温厚底砂锅 / 铸铁炖锅",
      "preheat": "腌10分钟",
      "servings": "2-3 人份",
      "prepNotes": "准备30分钟 · 烹调10分钟"
    },
    "cookingTimeText": "准备30分钟 · 烹调10分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "猪肝",
        "amountText": "100克",
        "category": "main"
      },
      {
        "id": "i2",
        "name": "猪瘦肉",
        "amountText": "100克",
        "category": "main"
      },
      {
        "id": "i3",
        "name": "丝瓜",
        "amountText": "250克",
        "category": "produce"
      },
      {
        "id": "i5",
        "name": "盐",
        "amountText": "3克",
        "category": "seasoning"
      },
      {
        "id": "i4",
        "name": "姜片",
        "amountText": "5克",
        "category": "seasoning"
      },
      {
        "id": "i6",
        "name": "胡椒粉",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i7",
        "name": "鸡精",
        "amountText": "适量",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "切配腌浆",
        "sublabel": "Marinate",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2",
          "i3",
          "i5"
        ],
        "durationMinutes": 10,
        "note": "将丝瓜削去皮，洗净，切滚刀块；猪瘦肉、猪肝洗净后，切薄片，用盐腌10分钟。"
      },
      {
        "id": "b2",
        "label": "焯烫煮制",
        "sublabel": "Boil",
        "stageIndex": 1,
        "ingredientIds": [
          "i4",
          "i6",
          "i7"
        ],
        "heatLevel": "小火",
        "note": "将丝瓜、姜片放入沸水锅中，小火煮沸几分钟后，放入猪肝、猪瘦肉煮至熟，加鸡精、胡椒粉即可。",
        "dependencies": [
          {
            "sourceBlockId": "b1",
            "type": "material",
            "label": "承接前序处理物"
          }
        ],
        "inputBlockIds": [
          "b1"
        ]
      }
    ],
    "finalBlock": {
      "method": "stew",
      "role": "outcome",
      "label": "完成"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00025.html#sigil_toc_id_175 · 益气养血 气血充足，女人健康不爱老 · 丝瓜猪肝瘦肉汤",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00025.html#sigil_toc_id_175"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：猪肝富含铁质和维生素A，能补血明目；丝瓜中维生素C含量较高，可以促进铁的吸收利用。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-106",
    "version": "3.0",
    "status": "published",
    "title": "🥩 当归生姜羊肉汤",
    "description": "营养师张晔健康食谱·调理经期不适 温热、清淡、补血食物，缓解经期不适",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "高保温厚底砂锅 / 铸铁炖锅",
      "servings": "2-3 人份",
      "prepNotes": "准备20分钟 · 烹调20分钟"
    },
    "cookingTimeText": "准备20分钟 · 烹调20分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "羊瘦肉",
        "amountText": "250克",
        "category": "main"
      },
      {
        "id": "i2",
        "name": "当归",
        "amountText": "10克",
        "category": "produce"
      },
      {
        "id": "i3",
        "name": "鲜姜片",
        "amountText": "15克",
        "category": "produce"
      },
      {
        "id": "i4",
        "name": "盐",
        "amountText": "4克",
        "category": "seasoning"
      },
      {
        "id": "i5",
        "name": "鸡精",
        "amountText": "2克",
        "category": "seasoning"
      },
      {
        "id": "i6",
        "name": "植物油",
        "amountText": "适量",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "切配焯烫",
        "sublabel": "Blanch",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2"
        ],
        "note": "羊瘦肉去净筋膜，洗净，切块，放入沸水中，焯烫去血水；当归洗净浮尘。"
      },
      {
        "id": "b2",
        "label": "炝香调味",
        "sublabel": "Sauté",
        "stageIndex": 1,
        "ingredientIds": [
          "i4",
          "i5",
          "i3",
          "i6"
        ],
        "heatLevel": "大火",
        "note": "锅置火上，倒油烧至七成热，炒香姜片，放入羊肉块、当归翻炒均匀，倒入适量清水，大火烧开后转小火煮至羊肉烂熟，加盐和鸡精调味，捞去当归、生姜即可。",
        "dependencies": [
          {
            "sourceBlockId": "b1",
            "type": "material",
            "label": "承接前序处理物"
          }
        ],
        "inputBlockIds": [
          "b1"
        ]
      }
    ],
    "finalBlock": {
      "method": "stew",
      "role": "outcome",
      "label": "完成"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00026.html#sigil_toc_id_178 · 调理经期不适 温热、清淡、补血食物，缓解经期不适 · 当归生姜羊肉汤",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00026.html#sigil_toc_id_178"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-107",
    "version": "3.0",
    "status": "published",
    "title": "🍲 荔枝桂圆山楂汤",
    "description": "营养师张晔健康食谱·调理经期不适 温热、清淡、补血食物，缓解经期不适",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "高保温厚底砂锅 / 铸铁炖锅",
      "preheat": "浸泡后洗净",
      "servings": "2-3 人份",
      "prepNotes": "准备20分钟 · 烹调35分钟"
    },
    "cookingTimeText": "准备20分钟 · 烹调35分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "荔枝肉",
        "amountText": "50克",
        "category": "main"
      },
      {
        "id": "i2",
        "name": "山楂肉",
        "amountText": "50克",
        "category": "main"
      },
      {
        "id": "i3",
        "name": "桂圆肉",
        "amountText": "20克",
        "category": "main"
      },
      {
        "id": "i4",
        "name": "枸杞子",
        "amountText": "10克",
        "category": "seasoning"
      },
      {
        "id": "i5",
        "name": "红糖",
        "amountText": "适量",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "切配泡发",
        "sublabel": "Soak",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2",
          "i3",
          "i4"
        ],
        "note": "荔枝肉、山楂肉洗净；桂圆肉稍浸泡后洗净；枸杞子稍泡洗净，捞出沥水。"
      },
      {
        "id": "b2",
        "label": "煮制拌匀",
        "sublabel": "Boil",
        "stageIndex": 1,
        "ingredientIds": [
          "i5"
        ],
        "heatLevel": "大火",
        "durationMinutes": 25,
        "durationText": "20m + 5m",
        "note": "锅置火上，倒入适量清水，放入山楂肉、荔枝肉、桂圆肉，大火煮沸后改小火煮约20分钟，加入枸杞子继续煮约5分钟，加入红糖拌匀即可。",
        "dependencies": [
          {
            "sourceBlockId": "b1",
            "type": "material",
            "label": "承接前序处理物"
          }
        ],
        "inputBlockIds": [
          "b1"
        ]
      }
    ],
    "finalBlock": {
      "method": "stew",
      "role": "outcome",
      "label": "完成"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00026.html#sigil_toc_id_179 · 调理经期不适 温热、清淡、补血食物，缓解经期不适 · 荔枝桂圆山楂汤",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00026.html#sigil_toc_id_179"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：山楂可以活血化淤、调理痛经；荔枝有行气散结的功效，可疏通气血、缓解痛经。这款汤非常适合女性经期食用。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-108",
    "version": "3.0",
    "status": "published",
    "title": "🥬 鲜蒸白菜心",
    "description": "营养师张晔健康食谱·缓解乳腺增生 舒缓心情、饮食调理，缓解乳房胀痛",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "多层不锈钢蒸锅 (Steamer)",
      "servings": "2-3 人份",
      "prepNotes": "准备15分钟 · 烹调20分钟"
    },
    "cookingTimeText": "准备15分钟 · 烹调20分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "白菜心",
        "amountText": "250克",
        "category": "produce"
      },
      {
        "id": "i2",
        "name": "干木耳",
        "amountText": "2朵",
        "category": "produce"
      },
      {
        "id": "i3",
        "name": "海米",
        "amountText": "5克",
        "category": "produce"
      },
      {
        "id": "i4",
        "name": "葱丝",
        "amountText": "10克",
        "category": "seasoning"
      },
      {
        "id": "i5",
        "name": "姜丝",
        "amountText": "10克",
        "category": "seasoning"
      },
      {
        "id": "i6",
        "name": "料酒",
        "amountText": "5克",
        "category": "seasoning"
      },
      {
        "id": "i7",
        "name": "盐",
        "amountText": "3克",
        "category": "seasoning"
      },
      {
        "id": "i8",
        "name": "香油",
        "amountText": "少许",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "泡发切配",
        "sublabel": "Prep",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2",
          "i3"
        ],
        "note": "干木耳用清水泡发，择洗干净，切丝；海米洗净，用清水泡软；白菜心洗净，切成三段。"
      },
      {
        "id": "b2",
        "label": "拌匀煮制淋汁",
        "sublabel": "Boil",
        "stageIndex": 1,
        "ingredientIds": [
          "i4",
          "i5",
          "i6",
          "i7",
          "i8"
        ],
        "heatLevel": "大火",
        "durationMinutes": 15,
        "note": "取碗，放入白菜段，放上木耳、海米、葱丝和姜丝，加料酒、50克清水及少许泡海米的水，搅拌均匀，送入烧开的蒸锅上，大火蒸15分钟，取出，加盐调味，淋上香油即可。",
        "dependencies": [
          {
            "sourceBlockId": "b1",
            "type": "material",
            "label": "承接前序处理物"
          }
        ],
        "inputBlockIds": [
          "b1"
        ]
      }
    ],
    "finalBlock": {
      "method": "steam",
      "role": "outcome",
      "label": "完成",
      "servingInstructions": "取出装盘"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00027.html#sigil_toc_id_182 · 缓解乳腺增生 舒缓心情、饮食调理，缓解乳房胀痛 · 鲜蒸白菜心",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00027.html#sigil_toc_id_182"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-109",
    "version": "3.0",
    "status": "published",
    "title": "🧈 菠萝豆腐",
    "description": "营养师张晔健康食谱·缓解乳腺增生 舒缓心情、饮食调理，缓解乳房胀痛",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "中式熟铁炒锅 (Wok)",
      "servings": "2-3 人份",
      "prepNotes": "准备20分钟 · 烹调10分钟"
    },
    "cookingTimeText": "准备20分钟 · 烹调10分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "豆腐",
        "amountText": "200克",
        "category": "main"
      },
      {
        "id": "i2",
        "name": "菠萝肉",
        "amountText": "50克",
        "category": "main"
      },
      {
        "id": "i8",
        "name": "盐",
        "amountText": "3克",
        "category": "seasoning"
      },
      {
        "id": "i3",
        "name": "葱末",
        "amountText": "5克",
        "category": "seasoning"
      },
      {
        "id": "i4",
        "name": "姜末",
        "amountText": "5克",
        "category": "seasoning"
      },
      {
        "id": "i5",
        "name": "蒜末",
        "amountText": "5克",
        "category": "seasoning"
      },
      {
        "id": "i6",
        "name": "植物油",
        "amountText": "10克",
        "category": "seasoning"
      },
      {
        "id": "i7",
        "name": "番茄酱",
        "amountText": "10克",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "切配焯烫泡发",
        "sublabel": "Blanch",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2",
          "i8"
        ],
        "durationMinutes": 5,
        "note": "将豆腐切小块，在沸水中焯一下；菠萝肉切成小丁，入淡盐水中泡5分钟。"
      },
      {
        "id": "b2",
        "label": "炝香翻炒调味",
        "sublabel": "Stir-fry",
        "stageIndex": 1,
        "ingredientIds": [
          "i3",
          "i4",
          "i5",
          "i6",
          "i7"
        ],
        "heatLevel": "六成热",
        "note": "锅置火上，倒入植物油烧至六成热，放入葱末、姜末、蒜末爆香，倒入番茄酱熬出红油，再倒入豆腐块和菠萝丁炒熟，加盐翻炒均匀即可。",
        "dependencies": [
          {
            "sourceBlockId": "b1",
            "type": "material",
            "label": "承接前序处理物"
          }
        ],
        "inputBlockIds": [
          "b1"
        ]
      }
    ],
    "finalBlock": {
      "method": "fry",
      "role": "outcome",
      "label": "完成"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00027.html#sigil_toc_id_183 · 缓解乳腺增生 舒缓心情、饮食调理，缓解乳房胀痛 · 菠萝豆腐",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00027.html#sigil_toc_id_183"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：豆腐中的大豆异黄酮能够调节人体雌激素的分泌，从而避免人体雌激素过高或过低，预防乳腺癌。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-110",
    "version": "3.0",
    "status": "published",
    "title": "🥩 羊肉苹果汤",
    "description": "营养师张晔健康食谱·缓解更年期综合征 补充维生素、钙是关键",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "高保温厚底砂锅 / 铸铁炖锅",
      "servings": "2-3 人份",
      "prepNotes": "准备15分钟 · 烹调30分钟"
    },
    "cookingTimeText": "准备15分钟 · 烹调30分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "羊肉",
        "amountText": "120克",
        "category": "main"
      },
      {
        "id": "i2",
        "name": "苹果",
        "amountText": "150克",
        "category": "produce"
      },
      {
        "id": "i3",
        "name": "豌豆",
        "amountText": "80克",
        "category": "produce"
      },
      {
        "id": "i4",
        "name": "姜片",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i5",
        "name": "香菜",
        "amountText": "5克",
        "category": "seasoning"
      },
      {
        "id": "i6",
        "name": "盐",
        "amountText": "3克",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "切配",
        "sublabel": "Prep",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2"
        ],
        "note": "羊肉洗净，切块；苹果洗净，切块。"
      },
      {
        "id": "b2",
        "label": "炖煮煮制调味",
        "sublabel": "Boil",
        "stageIndex": 1,
        "ingredientIds": [
          "i3",
          "i4",
          "i5",
          "i6"
        ],
        "heatLevel": "大火",
        "note": "将羊肉、豌豆、姜片放入锅内，加适量水大火煮沸，再放入苹果块，小火炖煮至熟，放盐、香菜调味即可。",
        "dependencies": [
          {
            "sourceBlockId": "b1",
            "type": "material",
            "label": "承接前序处理物"
          }
        ],
        "inputBlockIds": [
          "b1"
        ]
      }
    ],
    "finalBlock": {
      "method": "stew",
      "role": "outcome",
      "label": "完成"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00028.html#sigil_toc_id_187 · 缓解更年期综合征 补充维生素、钙是关键 · 羊肉苹果汤",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00028.html#sigil_toc_id_187"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-111",
    "version": "3.0",
    "status": "published",
    "title": "🥩 莲藕排骨汤",
    "description": "营养师张晔健康食谱·缓解更年期综合征 补充维生素、钙是关键",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "高保温厚底砂锅 / 铸铁炖锅",
      "servings": "2-3 人份",
      "prepNotes": "准备15分钟 · 烹调2小时"
    },
    "cookingTimeText": "准备15分钟 · 烹调2小时",
    "ingredients": [
      {
        "id": "i1",
        "name": "猪排骨块",
        "amountText": "300克",
        "category": "main"
      },
      {
        "id": "i6",
        "name": "葱段姜片",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i7",
        "name": "料酒",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i2",
        "name": "莲藕块",
        "amountText": "200克",
        "category": "produce"
      },
      {
        "id": "i3",
        "name": "盐",
        "amountText": "5克",
        "category": "seasoning"
      },
      {
        "id": "i4",
        "name": "鸡精",
        "amountText": "2克",
        "category": "seasoning"
      },
      {
        "id": "i5",
        "name": "胡椒粉",
        "amountText": "2克",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "煮制",
        "sublabel": "Boil",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i6",
          "i7"
        ],
        "note": "锅内加水煮沸，放葱段、料酒、猪排骨块及部分姜片，焯去血水，捞出。"
      },
      {
        "id": "b2",
        "label": "煮制调味",
        "sublabel": "Boil",
        "stageIndex": 1,
        "ingredientIds": [
          "i3",
          "i4",
          "i5",
          "i2"
        ],
        "heatLevel": "小火",
        "durationText": "1.5h",
        "note": "锅内倒清水烧开，放猪排骨块、藕块及剩余姜片煮沸，转小火煲约1.5小时，加盐、鸡精、胡椒粉即可。",
        "dependencies": [
          {
            "sourceBlockId": "b1",
            "type": "material",
            "label": "承接前序处理物"
          }
        ],
        "inputBlockIds": [
          "b1"
        ]
      }
    ],
    "finalBlock": {
      "method": "stew",
      "role": "outcome",
      "label": "完成"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00028.html#sigil_toc_id_188 · 缓解更年期综合征 补充维生素、钙是关键 · 莲藕排骨汤",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00028.html#sigil_toc_id_188"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：莲藕与排骨搭配熬汤食用，具有清热消痰、补血养颜、静心除烦的功效，对更年期女性的贫血、心慌失眠等症状有很好的辅助治疗效果。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-112",
    "version": "3.0",
    "status": "published",
    "title": "🥒 梅干菜蒸苦瓜",
    "description": "营养师张晔健康食谱·减肥瘦身 管住嘴、迈开腿，瘦身效果佳",
    "cuisine": "chinese",
    "difficulty": "medium",
    "prerequisites": {
      "containerSize": "多层不锈钢蒸锅 (Steamer)",
      "servings": "2-3 人份",
      "prepNotes": "准备25分钟 · 烹调10分钟"
    },
    "cookingTimeText": "准备25分钟 · 烹调10分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "苦瓜",
        "amountText": "500克",
        "category": "produce"
      },
      {
        "id": "i2",
        "name": "梅干菜",
        "amountText": "200克",
        "category": "produce"
      },
      {
        "id": "i4",
        "name": "白糖",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i3",
        "name": "酱油",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i5",
        "name": "料酒",
        "amountText": "适量",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "切配",
        "sublabel": "Prep",
        "stageIndex": 0,
        "ingredientIds": [
          "i1"
        ],
        "note": "苦瓜洗净，切片，把中间的苦瓜心去干净，码在盘子里。"
      },
      {
        "id": "b2",
        "label": "切配拌匀组合装填",
        "sublabel": "Assemble",
        "stageIndex": 1,
        "ingredientIds": [
          "i2",
          "i4"
        ],
        "note": "梅干菜洗净，加入白糖拌匀，铺在苦瓜上。",
        "dependencies": [
          {
            "sourceBlockId": "b1",
            "type": "material",
            "label": "承接前序处理物"
          }
        ],
        "inputBlockIds": [
          "b1"
        ]
      },
      {
        "id": "b3",
        "label": "淋汁蒸制",
        "sublabel": "Steam",
        "stageIndex": 2,
        "ingredientIds": [
          "i3",
          "i5"
        ],
        "durationText": "5–10m",
        "note": "淋上酱油和料酒，冷水上锅，水开后蒸5～10分钟即可。",
        "dependencies": [
          {
            "sourceBlockId": "b2",
            "type": "material",
            "label": "承接前序处理物"
          }
        ],
        "inputBlockIds": [
          "b2"
        ]
      }
    ],
    "finalBlock": {
      "method": "steam",
      "role": "outcome",
      "label": "完成"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00029.html#sigil_toc_id_191 · 减肥瘦身 管住嘴、迈开腿，瘦身效果佳 · 梅干菜蒸苦瓜",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00029.html#sigil_toc_id_191"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：苦瓜含有丰富的营养，其中维生素C的含量居瓜类蔬菜之首，且糖和脂肪的含量都非常低，是减肥食材中的极品。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-113",
    "version": "3.0",
    "status": "published",
    "title": "🍳 海米冬瓜",
    "description": "营养师张晔健康食谱·减肥瘦身 管住嘴、迈开腿，瘦身效果佳",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "中式熟铁炒锅 (Wok)",
      "preheat": "腌5分钟",
      "servings": "2-3 人份",
      "prepNotes": "准备10分钟 · 烹调10分钟"
    },
    "cookingTimeText": "准备10分钟 · 烹调10分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "冬瓜片",
        "amountText": "400克",
        "category": "produce"
      },
      {
        "id": "i2",
        "name": "海米",
        "amountText": "20克",
        "category": "produce"
      },
      {
        "id": "i5",
        "name": "盐",
        "amountText": "5克",
        "category": "seasoning"
      },
      {
        "id": "i3",
        "name": "葱花",
        "amountText": "5克",
        "category": "seasoning"
      },
      {
        "id": "i4",
        "name": "姜末",
        "amountText": "5克",
        "category": "seasoning"
      },
      {
        "id": "i6",
        "name": "料酒",
        "amountText": "10克",
        "category": "seasoning"
      },
      {
        "id": "i7",
        "name": "水淀粉",
        "amountText": "15克",
        "category": "seasoning"
      },
      {
        "id": "i8",
        "name": "植物油",
        "amountText": "适量",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "腌浆泡发",
        "sublabel": "Soak",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2",
          "i5"
        ],
        "durationMinutes": 5,
        "note": "冬瓜片用盐腌5分钟，滗水，过油，捞出；海米用温水泡软。"
      },
      {
        "id": "b2",
        "label": "炝香翻炒勾芡",
        "sublabel": "Stir-fry",
        "stageIndex": 1,
        "ingredientIds": [
          "i3",
          "i4",
          "i6",
          "i7",
          "i8"
        ],
        "note": "锅内倒油烧热，爆香葱花、姜末，加水、盐、海米、料酒翻炒，放冬瓜片烧入味，用水淀粉勾芡即可。",
        "dependencies": [
          {
            "sourceBlockId": "b1",
            "type": "material",
            "label": "承接前序处理物"
          }
        ],
        "inputBlockIds": [
          "b1"
        ]
      }
    ],
    "finalBlock": {
      "method": "fry",
      "role": "outcome",
      "label": "完成"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00029.html#sigil_toc_id_192 · 减肥瘦身 管住嘴、迈开腿，瘦身效果佳 · 海米冬瓜",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00029.html#sigil_toc_id_192"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：冬瓜最擅长解热利尿、消除水肿，此外，它还能刺激肠道蠕动，促进废弃物排出体外，有利于减肥。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-114",
    "version": "3.0",
    "status": "published",
    "title": "🍅 番茄炒草菇",
    "description": "营养师张晔健康食谱·淡斑祛斑 内养外调，肌肤光泽有活力",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "中式熟铁炒锅 (Wok)",
      "servings": "2-3 人份",
      "prepNotes": "准备5分钟 · 烹调10分钟"
    },
    "cookingTimeText": "准备5分钟 · 烹调10分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "草菇",
        "amountText": "200克",
        "category": "produce"
      },
      {
        "id": "i2",
        "name": "番茄",
        "amountText": "100克",
        "category": "produce"
      },
      {
        "id": "i3",
        "name": "葱末",
        "amountText": "3克",
        "category": "seasoning"
      },
      {
        "id": "i4",
        "name": "姜末",
        "amountText": "3克",
        "category": "seasoning"
      },
      {
        "id": "i5",
        "name": "盐",
        "amountText": "3克",
        "category": "seasoning"
      },
      {
        "id": "i6",
        "name": "植物油",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i7",
        "name": "水淀粉",
        "amountText": "适量",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "切配",
        "sublabel": "Prep",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2"
        ],
        "note": "草菇洗净，切成两半；番茄洗净，切块。"
      },
      {
        "id": "b2",
        "label": "炝香勾芡",
        "sublabel": "Sauté",
        "stageIndex": 1,
        "ingredientIds": [
          "i3",
          "i4",
          "i5",
          "i7",
          "i6"
        ],
        "note": "锅内倒油烧热，爆香姜末，倒草菇翻熟，加盐，倒番茄炒熟，用水淀粉勾芡，撒上葱末即可。",
        "dependencies": [
          {
            "sourceBlockId": "b1",
            "type": "material",
            "label": "承接前序处理物"
          }
        ],
        "inputBlockIds": [
          "b1"
        ]
      }
    ],
    "finalBlock": {
      "method": "fry",
      "role": "outcome",
      "label": "完成"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00030.html#sigil_toc_id_193 · 淡斑祛斑 内养外调，肌肤光泽有活力 · 番茄炒草菇",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00030.html#sigil_toc_id_193"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：番茄中的番茄红素具有强大的抗氧化功能，可吸收可见光，避免皮肤因受紫外线的照射而形成黑斑与皱纹。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-115",
    "version": "3.0",
    "status": "published",
    "title": "🐟 豉汁蒸盘龙白鳝",
    "description": "营养师张晔健康食谱·强肾健体 肾是先天之本，养肾就是养命",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "多层不锈钢蒸锅 (Steamer)",
      "servings": "2-3 人份",
      "prepNotes": "准备30分钟 · 烹调8分钟"
    },
    "cookingTimeText": "准备30分钟 · 烹调8分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "白鳝",
        "amountText": "600克",
        "category": "main"
      },
      {
        "id": "i2",
        "name": "豆豉汁",
        "amountText": "15克",
        "category": "produce"
      },
      {
        "id": "i3",
        "name": "鸡精",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i4",
        "name": "生蒜蓉",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i5",
        "name": "熟蒜蓉",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i6",
        "name": "姜末",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i7",
        "name": "椒末",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i9",
        "name": "陈皮末",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i10",
        "name": "生粉",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i11",
        "name": "香油",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i12",
        "name": "酱油",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i14",
        "name": "白糖",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i15",
        "name": "盐",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i8",
        "name": "葱花",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i13",
        "name": "胡椒粉",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i16",
        "name": "植物油",
        "amountText": "适量",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "切配拌匀调味",
        "sublabel": "Season",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2",
          "i3",
          "i4",
          "i5",
          "i6",
          "i7",
          "i9",
          "i10",
          "i11",
          "i12",
          "i14",
          "i15"
        ],
        "note": "白鳝剖开，洗去黏液，在鳝背上每隔2厘米切一刀，背骨断但腹不断，洗净滤干，加生蒜蓉、熟蒜蓉、姜末、椒末、陈皮末拌匀，调入豆豉汁、盐、鸡精、白糖、香油、酱油、生粉搅匀。"
      },
      {
        "id": "b2",
        "label": "蒸制",
        "sublabel": "Steam",
        "stageIndex": 1,
        "ingredientIds": [
          "i8",
          "i13",
          "i16"
        ],
        "heatLevel": "大火",
        "durationMinutes": 8,
        "note": "把调好味的白鳝摆放成圆碟中造型（盘蛇般），剩余味料铺放在白鳝身上，用大火蒸约8分钟至熟，取出，撒上胡椒粉、葱花，烧热植物油浇淋在上面即可。",
        "dependencies": [
          {
            "sourceBlockId": "b1",
            "type": "material",
            "label": "承接前序处理物"
          }
        ],
        "inputBlockIds": [
          "b1"
        ]
      }
    ],
    "finalBlock": {
      "method": "steam",
      "role": "outcome",
      "label": "完成",
      "servingInstructions": "取出装盘"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00031.html#sigil_toc_id_195 · 强肾健体 肾是先天之本，养肾就是养命 · 豉汁蒸盘龙白鳝",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00031.html#sigil_toc_id_195"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：白鳝性温，味甘，归肝、脾、肾经，有益气血、补肝肾的功效。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-116",
    "version": "3.0",
    "status": "published",
    "title": "🧈 泥鳅豆腐汤",
    "description": "营养师张晔健康食谱·强肾健体 肾是先天之本，养肾就是养命",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "高保温厚底砂锅 / 铸铁炖锅",
      "servings": "2-3 人份",
      "prepNotes": "准备20分钟 · 烹调30分钟"
    },
    "cookingTimeText": "准备20分钟 · 烹调30分钟",
    "ingredients": [
      {
        "id": "i2",
        "name": "豆腐",
        "amountText": "250克",
        "category": "main"
      },
      {
        "id": "i1",
        "name": "泥鳅",
        "amountText": "250克",
        "category": "produce"
      },
      {
        "id": "i3",
        "name": "料酒",
        "amountText": "15克",
        "category": "seasoning"
      },
      {
        "id": "i4",
        "name": "香油",
        "amountText": "5克",
        "category": "seasoning"
      },
      {
        "id": "i5",
        "name": "姜片",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i6",
        "name": "葱段",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i7",
        "name": "胡椒粉",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i8",
        "name": "盐",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i9",
        "name": "植物油",
        "amountText": "适量",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "切配",
        "sublabel": "Prep",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2"
        ],
        "note": "泥鳅清理干净；豆腐切块。"
      },
      {
        "id": "b2",
        "label": "炖煮淋汁",
        "sublabel": "Simmer",
        "stageIndex": 1,
        "ingredientIds": [
          "i3",
          "i4",
          "i5",
          "i6",
          "i7",
          "i8",
          "i9"
        ],
        "heatLevel": "大火",
        "durationMinutes": 30,
        "note": "热锅中放少许油烧到六成热，放入葱段和姜片煸香，放入泥鳅炒香，烹入料酒，放入豆腐和清水，大火烧开后转小火慢炖30分钟，加胡椒粉和盐调味，淋入香油即可。",
        "dependencies": [
          {
            "sourceBlockId": "b1",
            "type": "material",
            "label": "承接前序处理物"
          }
        ],
        "inputBlockIds": [
          "b1"
        ]
      }
    ],
    "finalBlock": {
      "method": "stew",
      "role": "outcome",
      "label": "完成"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00031.html#sigil_toc_id_196 · 强肾健体 肾是先天之本，养肾就是养命 · 泥鳅豆腐汤",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00031.html#sigil_toc_id_196"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：成年男子常食泥鳅有养肾生精、滋补强身之效。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-117",
    "version": "3.0",
    "status": "published",
    "title": "🦐 蚕豆炒虾仁",
    "description": "营养师张晔健康食谱·强肾健体 肾是先天之本，养肾就是养命",
    "cuisine": "chinese",
    "difficulty": "medium",
    "prerequisites": {
      "containerSize": "中式熟铁炒锅 (Wok)",
      "preheat": "腌15分钟",
      "servings": "2-3 人份",
      "prepNotes": "准备15分钟 · 烹调20分钟"
    },
    "cookingTimeText": "准备15分钟 · 烹调20分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "虾仁",
        "amountText": "500克",
        "category": "main"
      },
      {
        "id": "i3",
        "name": "鸡蛋",
        "amountText": "1个",
        "category": "main"
      },
      {
        "id": "i4",
        "name": "葱片",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i5",
        "name": "姜片",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i6",
        "name": "盐",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i7",
        "name": "鸡精",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i8",
        "name": "料酒",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i9",
        "name": "水淀粉",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i2",
        "name": "嫩蚕豆",
        "amountText": "120克",
        "category": "produce"
      },
      {
        "id": "i10",
        "name": "植物油",
        "amountText": "适量",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "切配沥干备用",
        "sublabel": "Hold",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i3",
          "i4",
          "i5",
          "i6",
          "i7",
          "i8"
        ],
        "durationMinutes": 15,
        "note": "虾仁洗净，用葱片、姜片、盐、鸡精、料酒拌匀腌15分钟；鸡蛋取蛋清，搅散；蚕豆去皮，掰成两半，用沸水焯煮后捞出沥干。",
        "completionState": "捞出沥干"
      },
      {
        "id": "b2",
        "label": "腌浆勾芡",
        "sublabel": "Thicken",
        "stageIndex": 1,
        "ingredientIds": [
          "i9"
        ],
        "note": "将腌好的虾仁挑出，浆上水淀粉和蛋清。",
        "dependencies": [
          {
            "sourceBlockId": "b1",
            "type": "material",
            "label": "承接前序处理物"
          }
        ],
        "inputBlockIds": [
          "b1"
        ]
      },
      {
        "id": "b3",
        "label": "翻炒调味",
        "sublabel": "Stir-fry",
        "stageIndex": 2,
        "ingredientIds": [
          "i2",
          "i10"
        ],
        "note": "锅内放油，待油热后放入蚕豆，迅速翻炒几下，把浆好的虾仁放入锅中翻炒，等快熟时加入盐、鸡精调味即可。",
        "completionState": "油热",
        "dependencies": [
          {
            "sourceBlockId": "b2",
            "type": "material",
            "label": "承接前序处理物"
          }
        ],
        "inputBlockIds": [
          "b2"
        ]
      }
    ],
    "finalBlock": {
      "method": "fry",
      "role": "outcome",
      "label": "完成"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00031.html#sigil_toc_id_197 · 强肾健体 肾是先天之本，养肾就是养命 · 蚕豆炒虾仁",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00031.html#sigil_toc_id_197"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：虾仁具有补肾、延缓衰老等功效，与蛋白质丰富的蚕豆一起吃，补肾功能更佳。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-118",
    "version": "3.0",
    "status": "published",
    "title": "🍲 酒炖蛤蜊",
    "description": "营养师张晔健康食谱·壮阳固精 缓解压力，展现男人风采",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "高保温厚底砂锅 / 铸铁炖锅",
      "servings": "2-3 人份",
      "prepNotes": "准备3分钟 · 烹调15分钟"
    },
    "cookingTimeText": "准备3分钟 · 烹调15分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "蛤蜊",
        "amountText": "500克",
        "category": "main"
      },
      {
        "id": "i7",
        "name": "小葱",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i2",
        "name": "干辣椒",
        "amountText": "2个",
        "category": "seasoning"
      },
      {
        "id": "i3",
        "name": "蒜",
        "amountText": "2瓣",
        "category": "seasoning"
      },
      {
        "id": "i4",
        "name": "清酒",
        "amountText": "60克",
        "category": "seasoning"
      },
      {
        "id": "i5",
        "name": "黄油",
        "amountText": "10克",
        "category": "seasoning"
      },
      {
        "id": "i6",
        "name": "生抽",
        "amountText": "2匙",
        "category": "seasoning"
      },
      {
        "id": "i8",
        "name": "植物油",
        "amountText": "适量",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "切配",
        "sublabel": "Prep",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i7"
        ],
        "note": "蛤蜊吐沙，清洗干净；小葱切碎。"
      },
      {
        "id": "b2",
        "label": "炝香炖煮拌匀",
        "sublabel": "Simmer",
        "stageIndex": 1,
        "ingredientIds": [
          "i2",
          "i3",
          "i4",
          "i5",
          "i6",
          "i8"
        ],
        "durationMinutes": 5,
        "note": "油锅烧热，煸香干辣椒、蒜瓣，加入蛤蜊，加清酒，盖上锅盖炖至开锅，加黄油、生抽、小葱碎拌匀，炖5分钟即可。",
        "completionState": "开锅",
        "dependencies": [
          {
            "sourceBlockId": "b1",
            "type": "material",
            "label": "承接前序处理物"
          }
        ],
        "inputBlockIds": [
          "b1"
        ]
      }
    ],
    "finalBlock": {
      "method": "stew",
      "role": "outcome",
      "label": "完成"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00032.html#sigil_toc_id_198 · 壮阳固精 缓解压力，展现男人风采 · 酒炖蛤蜊",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00032.html#sigil_toc_id_198"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：蛤蜊能促进性腺和甲状腺机能的活化，有益精固肾、强化性机能的功效。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-119",
    "version": "3.0",
    "status": "published",
    "title": "🧈 私家山药炖豆腐",
    "description": "营养师张晔健康食谱·壮阳固精 缓解压力，展现男人风采",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "高保温厚底砂锅 / 铸铁炖锅",
      "servings": "2-3 人份",
      "prepNotes": "准备10分钟 · 烹调5分钟"
    },
    "cookingTimeText": "准备10分钟 · 烹调5分钟",
    "ingredients": [
      {
        "id": "i2",
        "name": "豆腐",
        "amountText": "150克",
        "category": "main"
      },
      {
        "id": "i1",
        "name": "山药",
        "amountText": "200克",
        "category": "produce"
      },
      {
        "id": "i3",
        "name": "番茄",
        "amountText": "1个",
        "category": "produce"
      },
      {
        "id": "i4",
        "name": "芝麻",
        "amountText": "5克",
        "category": "seasoning"
      },
      {
        "id": "i5",
        "name": "姜片",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i6",
        "name": "香菜末",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i7",
        "name": "香油",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i8",
        "name": "盐",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i9",
        "name": "鸡精",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i10",
        "name": "植物油",
        "amountText": "适量",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "切配",
        "sublabel": "Prep",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2",
          "i3"
        ],
        "note": "山药去皮，洗净切块；豆腐切块；番茄去皮，切丁。"
      },
      {
        "id": "b2",
        "label": "翻炒炖煮",
        "sublabel": "Simmer",
        "stageIndex": 1,
        "ingredientIds": [
          "i4",
          "i5",
          "i6",
          "i7",
          "i8",
          "i9",
          "i10"
        ],
        "heatLevel": "大火",
        "durationMinutes": 10,
        "note": "油烧热，放山药煸炒至表皮透明，加没过食材的水，大火烧开后，放豆腐、姜片、番茄丁、芝麻，再次烧开后，放盐，转小火炖10分钟，加鸡精、香油，撒上香菜末即可。",
        "completionState": "表皮透明",
        "dependencies": [
          {
            "sourceBlockId": "b1",
            "type": "material",
            "label": "承接前序处理物"
          }
        ],
        "inputBlockIds": [
          "b1"
        ]
      }
    ],
    "finalBlock": {
      "method": "stew",
      "role": "outcome",
      "label": "完成"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00032.html#sigil_toc_id_199 · 壮阳固精 缓解压力，展现男人风采 · 私家山药炖豆腐",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00032.html#sigil_toc_id_199"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：此道菜能补肾益精、固涩止遗，经常食用可防治阳痿、早泄、遗经、腿软。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-120",
    "version": "3.0",
    "status": "published",
    "title": "🥩 爆炒羊肝",
    "description": "营养师张晔健康食谱·壮阳固精 缓解压力，展现男人风采",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "中式熟铁炒锅 (Wok)",
      "preheat": "腌5分钟",
      "servings": "2-3 人份",
      "prepNotes": "准备10分钟 · 烹调5分钟"
    },
    "cookingTimeText": "准备10分钟 · 烹调5分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "羊肝",
        "amountText": "150克",
        "category": "main"
      },
      {
        "id": "i2",
        "name": "青椒",
        "amountText": "2个",
        "category": "produce"
      },
      {
        "id": "i3",
        "name": "泡椒",
        "amountText": "2个",
        "category": "seasoning"
      },
      {
        "id": "i4",
        "name": "郫县豆瓣",
        "amountText": "1匙",
        "category": "seasoning"
      },
      {
        "id": "i5",
        "name": "白酒半匙",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i6",
        "name": "老抽花椒姜片",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i8",
        "name": "蒜",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i7",
        "name": "葱段",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i9",
        "name": "盐",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i10",
        "name": "植物油",
        "amountText": "适量",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "切配腌浆",
        "sublabel": "Marinate",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2",
          "i3",
          "i4",
          "i5",
          "i6",
          "i8"
        ],
        "durationMinutes": 5,
        "note": "羊肝洗净，切薄片，用白酒、郫县豆瓣、老抽腌5分钟；青椒洗净，切片；泡椒切片；蒜切片。"
      },
      {
        "id": "b2",
        "label": "翻炒调味",
        "sublabel": "Stir-fry",
        "stageIndex": 1,
        "ingredientIds": [
          "i7",
          "i9",
          "i10"
        ],
        "heatLevel": "八成热",
        "durationMinutes": 3,
        "note": "油烧至八成热，放花椒炸香，倒入羊肝翻炒半分钟，再倒入泡椒片、姜片、葱段、蒜片、青椒片，继续爆炒3分钟，加盐调味即可。",
        "dependencies": [
          {
            "sourceBlockId": "b1",
            "type": "material",
            "label": "承接前序处理物"
          }
        ],
        "inputBlockIds": [
          "b1"
        ]
      }
    ],
    "finalBlock": {
      "method": "fry",
      "role": "outcome",
      "label": "完成"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00032.html#sigil_toc_id_200 · 壮阳固精 缓解压力，展现男人风采 · 爆炒羊肝",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00032.html#sigil_toc_id_200"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：羊肝有助于增加身体的各项机能，能间接地提高性功能，并能延缓性衰老。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-121",
    "version": "3.0",
    "status": "published",
    "title": "🥩 农家粉蒸牛肉",
    "description": "营养师张晔健康食谱·增肌塑形 挑选肉食，补充蛋白质",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "多层不锈钢蒸锅 (Steamer)",
      "servings": "2-3 人份",
      "prepNotes": "准备10分钟 · 烹调15分钟"
    },
    "cookingTimeText": "准备10分钟 · 烹调15分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "牛瘦肉",
        "amountText": "400克",
        "category": "main"
      },
      {
        "id": "i7",
        "name": "豆瓣酱",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i2",
        "name": "五香蒸肉粉",
        "amountText": "80克",
        "category": "main"
      },
      {
        "id": "i3",
        "name": "植物油",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i4",
        "name": "盐",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i5",
        "name": "酱油",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i6",
        "name": "料酒",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i8",
        "name": "胡椒粉",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i9",
        "name": "干辣椒末",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i10",
        "name": "葱花",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i11",
        "name": "姜汁",
        "amountText": "适量",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "切配",
        "sublabel": "Prep",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i7"
        ],
        "note": "牛瘦肉洗净，切薄片；豆瓣酱捣碎。"
      },
      {
        "id": "b2",
        "label": "拌匀蒸制",
        "sublabel": "Steam",
        "stageIndex": 1,
        "ingredientIds": [
          "i2",
          "i3",
          "i4",
          "i5",
          "i6",
          "i8",
          "i9",
          "i10",
          "i11"
        ],
        "durationMinutes": 30,
        "note": "牛肉片加植物油、盐、酱油、料酒、姜汁、豆瓣酱碎、胡椒粉、五香蒸肉粉拌匀，放入碗中，入蒸锅，水开后蒸约30分钟，取出，撒上干辣椒末、葱花即可。",
        "dependencies": [
          {
            "sourceBlockId": "b1",
            "type": "material",
            "label": "承接前序处理物"
          }
        ],
        "inputBlockIds": [
          "b1"
        ]
      }
    ],
    "finalBlock": {
      "method": "steam",
      "role": "outcome",
      "label": "完成",
      "servingInstructions": "取出装盘"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00033.html#sigil_toc_id_201 · 增肌塑形 挑选肉食，补充蛋白质 · 农家粉蒸牛肉",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00033.html#sigil_toc_id_201"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：牛肉含有丰富的铁、蛋白质和维生素，能有效补充体力，适合工作量大的上班族、发育中的青少年和身体较为虚弱的人。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-122",
    "version": "3.0",
    "status": "published",
    "title": "🍗 番茄罗勒炖鸡胸",
    "description": "营养师张晔健康食谱·增肌塑形 挑选肉食，补充蛋白质",
    "cuisine": "chinese",
    "difficulty": "medium",
    "prerequisites": {
      "containerSize": "高保温厚底砂锅 / 铸铁炖锅",
      "preheat": "腌15分钟",
      "servings": "2-3 人份",
      "prepNotes": "准备15分钟 · 烹调40分钟"
    },
    "cookingTimeText": "准备15分钟 · 烹调40分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "鸡胸肉",
        "amountText": "300克",
        "category": "main"
      },
      {
        "id": "i2",
        "name": "番茄",
        "amountText": "2个",
        "category": "produce"
      },
      {
        "id": "i3",
        "name": "洋葱",
        "amountText": "1个",
        "category": "produce"
      },
      {
        "id": "i6",
        "name": "盐",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i7",
        "name": "黑胡椒粉",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i8",
        "name": "白胡椒粉",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i4",
        "name": "蒜片",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i5",
        "name": "罗勒碎",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i9",
        "name": "白糖",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i10",
        "name": "植物油",
        "amountText": "适量",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "切配腌浆",
        "sublabel": "Marinate",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2",
          "i3",
          "i6",
          "i7",
          "i8"
        ],
        "durationMinutes": 15,
        "note": "鸡胸切成大条，抹上盐、黑胡椒粉、白胡椒粉腌15分钟；番茄洗净，切小块；洋葱洗净，切丝。"
      },
      {
        "id": "b2",
        "label": "煎制装盘",
        "sublabel": "Sear",
        "stageIndex": 1,
        "ingredientIds": [
          "i4"
        ],
        "note": "油烧热后，放鸡胸肉，煎至两面金黄盛出，继续放蒜片、洋葱丝炒出香味，放入番茄块。",
        "completionState": "两面金黄盛出",
        "dependencies": [
          {
            "sourceBlockId": "b1",
            "type": "material",
            "label": "承接前序处理物"
          }
        ],
        "inputBlockIds": [
          "b1"
        ]
      },
      {
        "id": "b3",
        "label": "炖煮收汁",
        "sublabel": "Simmer",
        "stageIndex": 2,
        "ingredientIds": [
          "i5",
          "i9",
          "i10"
        ],
        "heatLevel": "大火",
        "durationMinutes": 20,
        "note": "等番茄稍软，放入鸡胸，翻炒匀，盖上锅盖，中小火炖到番茄变成酱汁，放入盐、罗勒碎、白糖调味，大火收汁，关火焖20分钟即可。",
        "completionState": "汤汁收浓",
        "dependencies": [
          {
            "sourceBlockId": "b2",
            "type": "material",
            "label": "承接前序处理物"
          }
        ],
        "inputBlockIds": [
          "b2"
        ]
      }
    ],
    "finalBlock": {
      "method": "stew",
      "role": "outcome",
      "label": "完成"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00033.html#sigil_toc_id_202 · 增肌塑形 挑选肉食，补充蛋白质 · 番茄罗勒炖鸡胸",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00033.html#sigil_toc_id_202"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-123",
    "version": "3.0",
    "status": "published",
    "title": "🍗 栗子杜仲鸡爪汤",
    "description": "营养师张晔健康食谱·调理烟酒伤害 增强身体的排毒和抗病能力",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "高保温厚底砂锅 / 铸铁炖锅",
      "servings": "2-3 人份",
      "prepNotes": "准备15分钟 · 烹调3小时"
    },
    "cookingTimeText": "准备15分钟 · 烹调3小时",
    "ingredients": [
      {
        "id": "i1",
        "name": "杜仲",
        "amountText": "20克",
        "category": "produce"
      },
      {
        "id": "i2",
        "name": "栗子",
        "amountText": "200克",
        "category": "produce"
      },
      {
        "id": "i4",
        "name": "陈皮",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i3",
        "name": "鲜鸡爪",
        "amountText": "8个",
        "category": "main"
      },
      {
        "id": "i5",
        "name": "盐",
        "amountText": "适量",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "切配",
        "sublabel": "Prep",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2",
          "i4"
        ],
        "note": "栗子用热水略泡，剥去外皮；鸡爪用沸水烫透，去黄衣，切去爪尖洗净；杜仲、陈皮分别洗净。"
      },
      {
        "id": "b2",
        "label": "炖煮煮制调味",
        "sublabel": "Boil",
        "stageIndex": 1,
        "ingredientIds": [
          "i5",
          "i3"
        ],
        "heatLevel": "大火",
        "durationText": "3h",
        "note": "砂锅内加入适量清水，将栗子、鸡爪、杜仲和陈皮一起放入锅内，大火煮沸，转用小火继续炖3小时，最后加入盐调味即可。",
        "dependencies": [
          {
            "sourceBlockId": "b1",
            "type": "material",
            "label": "承接前序处理物"
          }
        ],
        "inputBlockIds": [
          "b1"
        ]
      }
    ],
    "finalBlock": {
      "method": "stew",
      "role": "outcome",
      "label": "完成"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00034.html#sigil_toc_id_203 · 调理烟酒伤害 增强身体的排毒和抗病能力 · 栗子杜仲鸡爪汤",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00034.html#sigil_toc_id_203"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：杜仲的药用价值较高，栗子是健脾养胃的佳品，同时还有补肾的功效，经常应酬的人可以用这道汤来滋补。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-124",
    "version": "3.0",
    "status": "published",
    "title": "🥩 银耳木瓜排骨汤",
    "description": "营养师张晔健康食谱·调理烟酒伤害 增强身体的排毒和抗病能力",
    "cuisine": "chinese",
    "difficulty": "medium",
    "prerequisites": {
      "containerSize": "高保温厚底砂锅 / 铸铁炖锅",
      "servings": "2-3 人份",
      "prepNotes": "准备15分钟 · 烹调1.25小时"
    },
    "cookingTimeText": "准备15分钟 · 烹调1.25小时",
    "ingredients": [
      {
        "id": "i1",
        "name": "猪排骨",
        "amountText": "250克",
        "category": "main"
      },
      {
        "id": "i3",
        "name": "木瓜",
        "amountText": "100克",
        "category": "produce"
      },
      {
        "id": "i5",
        "name": "葱段",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i6",
        "name": "姜片",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i2",
        "name": "干银耳",
        "amountText": "5克",
        "category": "produce"
      },
      {
        "id": "i4",
        "name": "盐",
        "amountText": "4克",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "泡发焯烫沥干备用",
        "sublabel": "Blanch",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i3"
        ],
        "note": "银耳泡发，洗净，撕成小朵；木瓜去皮、子，切成滚刀块；排骨洗净，切段，焯水备用。"
      },
      {
        "id": "b2",
        "label": "炖煮煮制",
        "sublabel": "Boil",
        "stageIndex": 1,
        "ingredientIds": [
          "i5",
          "i6"
        ],
        "heatLevel": "大火",
        "durationText": "1h",
        "note": "汤锅加清水，放入排骨、葱段、姜片同煮，大火烧开后放入银耳，小火慢炖约1小时。",
        "dependencies": [
          {
            "sourceBlockId": "b1",
            "type": "material",
            "label": "承接前序处理物"
          }
        ],
        "inputBlockIds": [
          "b1"
        ]
      },
      {
        "id": "b3",
        "label": "炖煮调味",
        "sublabel": "Simmer",
        "stageIndex": 2,
        "ingredientIds": [
          "i4",
          "i2"
        ],
        "durationMinutes": 15,
        "note": "把木瓜放入汤中，再炖15分钟，调入盐搅匀即可。",
        "dependencies": [
          {
            "sourceBlockId": "b2",
            "type": "material",
            "label": "承接前序处理物"
          }
        ],
        "inputBlockIds": [
          "b2"
        ]
      }
    ],
    "finalBlock": {
      "method": "stew",
      "role": "outcome",
      "label": "完成"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00034.html#sigil_toc_id_204 · 调理烟酒伤害 增强身体的排毒和抗病能力 · 银耳木瓜排骨汤",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00034.html#sigil_toc_id_204"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-125",
    "version": "3.0",
    "status": "published",
    "title": "🥚 鸽蛋西蓝花",
    "description": "营养师张晔健康食谱·调理烟酒伤害 增强身体的排毒和抗病能力",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "中式熟铁炒锅 (Wok)",
      "servings": "2-3 人份",
      "prepNotes": "准备15分钟 · 烹调15分钟"
    },
    "cookingTimeText": "准备15分钟 · 烹调15分钟",
    "ingredients": [
      {
        "id": "i2",
        "name": "鸽蛋",
        "amountText": "10个",
        "category": "main"
      },
      {
        "id": "i1",
        "name": "西蓝花",
        "amountText": "300克",
        "category": "produce"
      },
      {
        "id": "i3",
        "name": "盐",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i4",
        "name": "鸡精",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i5",
        "name": "植物油",
        "amountText": "适量",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "切配焯烫",
        "sublabel": "Blanch",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2"
        ],
        "note": "西蓝花洗净，切成小朵，用沸水焯熟；鸽蛋煮熟、去皮，切开。"
      },
      {
        "id": "b2",
        "label": "翻炒调味",
        "sublabel": "Stir-fry",
        "stageIndex": 1,
        "ingredientIds": [
          "i3",
          "i4",
          "i5"
        ],
        "note": "油烧热后，放入西蓝花，煸炒出香味，放入鸽蛋，加盐、鸡精炒匀入味即可。",
        "dependencies": [
          {
            "sourceBlockId": "b1",
            "type": "material",
            "label": "承接前序处理物"
          }
        ],
        "inputBlockIds": [
          "b1"
        ]
      }
    ],
    "finalBlock": {
      "method": "fry",
      "role": "outcome",
      "label": "完成"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00034.html#sigil_toc_id_205 · 调理烟酒伤害 增强身体的排毒和抗病能力 · 鸽蛋西蓝花",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00034.html#sigil_toc_id_205"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：二者搭配具有保护肝肾、促进肝脏解毒功能以及增强人体免疫力的功效，适合经常应酬的人食用。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-126",
    "version": "3.0",
    "status": "published",
    "title": "🍲 蛤蜊冬瓜汤",
    "description": "营养师张晔健康食谱·预防前列腺疾病 多吃富含锌的食物",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "高保温厚底砂锅 / 铸铁炖锅",
      "servings": "2-3 人份",
      "prepNotes": "准备15分钟 · 烹调30分钟"
    },
    "cookingTimeText": "准备15分钟 · 烹调30分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "蛤蜊肉",
        "amountText": "100克",
        "category": "main"
      },
      {
        "id": "i2",
        "name": "绿豆芽",
        "amountText": "150克",
        "category": "produce"
      },
      {
        "id": "i3",
        "name": "冬瓜",
        "amountText": "150克",
        "category": "produce"
      },
      {
        "id": "i4",
        "name": "酱油",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i5",
        "name": "盐",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i6",
        "name": "鸡精",
        "amountText": "适量",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "切配",
        "sublabel": "Prep",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2",
          "i3"
        ],
        "note": "将绿豆芽择洗干净，掐去根部；将冬瓜洗净（留皮），切块；蛤蜊肉洗净。"
      },
      {
        "id": "b2",
        "label": "煮制炖煮调味",
        "sublabel": "Simmer",
        "stageIndex": 1,
        "ingredientIds": [
          "i4",
          "i5",
          "i6"
        ],
        "heatLevel": "大火",
        "durationMinutes": 30,
        "note": "锅内加入适量清水，把冬瓜块、蛤蜊肉倒入锅内，先用大火煮沸，再用小火炖约30分钟。然后将绿豆芽放入冬瓜汤内，再次煮沸，加入盐、鸡精、酱油调味即可。",
        "dependencies": [
          {
            "sourceBlockId": "b1",
            "type": "material",
            "label": "承接前序处理物"
          }
        ],
        "inputBlockIds": [
          "b1"
        ]
      }
    ],
    "finalBlock": {
      "method": "stew",
      "role": "outcome",
      "label": "完成"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00035.html#sigil_toc_id_206 · 预防前列腺疾病 多吃富含锌的食物 · 蛤蜊冬瓜汤",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00035.html#sigil_toc_id_206"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：富含锌的蛤蜊与有利尿消肿功效的冬瓜一起炖汤，可防治前列腺炎、尿道炎等。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-127",
    "version": "3.0",
    "status": "published",
    "title": "🥚 香菇蒸蛋",
    "description": "营养师张晔健康食谱·促进生长发育 补充脂肪、碳水化合物、蛋白质",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "多层不锈钢蒸锅 (Steamer)",
      "servings": "2-3 人份",
      "prepNotes": "准备5分钟 · 烹调10分钟"
    },
    "cookingTimeText": "准备5分钟 · 烹调10分钟",
    "ingredients": [
      {
        "id": "i3",
        "name": "虾皮",
        "amountText": "5克",
        "category": "main"
      },
      {
        "id": "i1",
        "name": "干香菇",
        "amountText": "2朵",
        "category": "produce"
      },
      {
        "id": "i2",
        "name": "鸡蛋",
        "amountText": "2个",
        "category": "main"
      },
      {
        "id": "i4",
        "name": "香油",
        "amountText": "适量",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "泡发沥干备用切配",
        "sublabel": "Prep",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i3"
        ],
        "note": "干香菇泡发，沥干，去蒂，切丝；虾皮用水清洗两遍。"
      },
      {
        "id": "b2",
        "label": "打散蒸制",
        "sublabel": "Steam",
        "stageIndex": 1,
        "ingredientIds": [
          "i2",
          "i4"
        ],
        "durationText": "5–8m",
        "note": "鸡蛋在碗中打散，加适量水、香油和香菇丝搅匀，碗放入蒸锅中，水开后蒸5~8分钟即可。",
        "dependencies": [
          {
            "sourceBlockId": "b1",
            "type": "material",
            "label": "承接前序处理物"
          }
        ],
        "inputBlockIds": [
          "b1"
        ]
      }
    ],
    "finalBlock": {
      "method": "steam",
      "role": "outcome",
      "label": "完成"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00036.html#sigil_toc_id_208 · 促进生长发育 补充脂肪、碳水化合物、蛋白质 · 香菇蒸蛋",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00036.html#sigil_toc_id_208"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：鸡蛋是优质蛋白质的良好来源。加入虾皮既能有咸味又能利用虾皮补钙。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-128",
    "version": "3.0",
    "status": "published",
    "title": "🍲 时蔬乱炖",
    "description": "营养师张晔健康食谱·促进生长发育 补充脂肪、碳水化合物、蛋白质",
    "cuisine": "chinese",
    "difficulty": "medium",
    "prerequisites": {
      "containerSize": "高保温厚底砂锅 / 铸铁炖锅",
      "servings": "2-3 人份",
      "prepNotes": "准备15分钟 · 烹调1.5小时"
    },
    "cookingTimeText": "准备15分钟 · 烹调1.5小时",
    "ingredients": [
      {
        "id": "i1",
        "name": "排骨块",
        "amountText": "400克",
        "category": "main"
      },
      {
        "id": "i7",
        "name": "料酒2大匙",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i8",
        "name": "蒜瓣",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i9",
        "name": "姜片",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i2",
        "name": "豆角",
        "amountText": "100克",
        "category": "produce"
      },
      {
        "id": "i3",
        "name": "土豆",
        "amountText": "100克",
        "category": "produce"
      },
      {
        "id": "i4",
        "name": "莲藕",
        "amountText": "100克",
        "category": "produce"
      },
      {
        "id": "i5",
        "name": "胡萝卜",
        "amountText": "1个",
        "category": "produce"
      },
      {
        "id": "i6",
        "name": "玉米",
        "amountText": "1个",
        "category": "produce"
      },
      {
        "id": "i10",
        "name": "盐",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i11",
        "name": "植物油",
        "amountText": "适量",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "切配沥干备用",
        "sublabel": "Hold",
        "stageIndex": 0,
        "ingredientIds": [
          "i1"
        ],
        "note": "排骨块洗净血水；其余材料洗净后切大块，备用。"
      },
      {
        "id": "b2",
        "label": "炝香翻炒",
        "sublabel": "Stir-fry",
        "stageIndex": 1,
        "ingredientIds": [
          "i7",
          "i8",
          "i9"
        ],
        "heatLevel": "六成热",
        "note": "热锅中放少许油、烧至六成热，煸香蒜瓣、姜片，倒入排骨、料酒炒至排骨变色出油。",
        "dependencies": [
          {
            "sourceBlockId": "b1",
            "type": "material",
            "label": "承接前序处理物"
          }
        ],
        "inputBlockIds": [
          "b1"
        ]
      },
      {
        "id": "b3",
        "label": "煮制炖煮",
        "sublabel": "Simmer",
        "stageIndex": 2,
        "ingredientIds": [
          "i10",
          "i2",
          "i3",
          "i4",
          "i5",
          "i6",
          "i11"
        ],
        "heatLevel": "中火",
        "durationText": "1h + 30m",
        "note": "倒入砂锅中，加没过食材的水烧开后用中火炖1小时，然后放入备好的蔬菜和盐，再炖30分钟即可。",
        "dependencies": [
          {
            "sourceBlockId": "b2",
            "type": "material",
            "label": "承接前序处理物"
          }
        ],
        "inputBlockIds": [
          "b2"
        ]
      }
    ],
    "finalBlock": {
      "method": "stew",
      "role": "outcome",
      "label": "完成"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00036.html#sigil_toc_id_209 · 促进生长发育 补充脂肪、碳水化合物、蛋白质 · 时蔬乱炖",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00036.html#sigil_toc_id_209"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-129",
    "version": "3.0",
    "status": "published",
    "title": "🥩 豆豉牛肉",
    "description": "营养师张晔健康食谱·促进生长发育 补充脂肪、碳水化合物、蛋白质",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "中式熟铁炒锅 (Wok)",
      "servings": "2-3 人份",
      "prepNotes": "准备15分钟 · 烹调15分钟"
    },
    "cookingTimeText": "准备15分钟 · 烹调15分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "牛肉",
        "amountText": "150克",
        "category": "main"
      },
      {
        "id": "i2",
        "name": "青椒",
        "amountText": "2个",
        "category": "produce"
      },
      {
        "id": "i3",
        "name": "豆豉",
        "amountText": "15克",
        "category": "seasoning"
      },
      {
        "id": "i4",
        "name": "鸡汤",
        "amountText": "30克",
        "category": "seasoning"
      },
      {
        "id": "i5",
        "name": "料酒",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i6",
        "name": "植物油",
        "amountText": "适量",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "切配拌匀",
        "sublabel": "Toss",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2",
          "i3"
        ],
        "note": "牛肉洗净，切丁；青椒洗净，切丁；豆豉用匙压烂，加入少许水拌匀。"
      },
      {
        "id": "b2",
        "label": "翻炒",
        "sublabel": "Stir-fry",
        "stageIndex": 1,
        "ingredientIds": [
          "i4",
          "i5",
          "i6"
        ],
        "note": "油烧热，下入牛肉、青椒丁煸炒片刻，加料酒、碎豆豉煸炒至肉八分熟，加入鸡汤，翻炒至汤汁渐收即可。",
        "completionState": "肉八分熟",
        "dependencies": [
          {
            "sourceBlockId": "b1",
            "type": "material",
            "label": "承接前序处理物"
          }
        ],
        "inputBlockIds": [
          "b1"
        ]
      }
    ],
    "finalBlock": {
      "method": "fry",
      "role": "outcome",
      "label": "完成"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00036.html#sigil_toc_id_210 · 促进生长发育 补充脂肪、碳水化合物、蛋白质 · 豆豉牛肉",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00036.html#sigil_toc_id_210"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：青椒中的维生素C可促进牛肉中铁的吸收，有利于促进生长发育。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-130",
    "version": "3.0",
    "status": "published",
    "title": "🍄 香菇菜花",
    "description": "营养师张晔健康食谱·调节孩子免疫力 平衡膳食、丰富营养，增强抗病能力",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "高保温厚底砂锅 / 铸铁炖锅",
      "servings": "2-3 人份",
      "prepNotes": "准备20分钟 · 烹调10分钟"
    },
    "cookingTimeText": "准备20分钟 · 烹调10分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "菜花",
        "amountText": "250克",
        "category": "produce"
      },
      {
        "id": "i2",
        "name": "干香菇",
        "amountText": "15克",
        "category": "produce"
      },
      {
        "id": "i3",
        "name": "盐",
        "amountText": "5克",
        "category": "seasoning"
      },
      {
        "id": "i4",
        "name": "葱段",
        "amountText": "5克",
        "category": "seasoning"
      },
      {
        "id": "i5",
        "name": "姜末",
        "amountText": "5克",
        "category": "seasoning"
      },
      {
        "id": "i6",
        "name": "水淀粉",
        "amountText": "15克",
        "category": "seasoning"
      },
      {
        "id": "i7",
        "name": "植物油",
        "amountText": "适量",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "切配焯烫泡发",
        "sublabel": "Blanch",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2"
        ],
        "note": "菜花洗净，切小块，放入沸水锅内焯水后捞出备用；干香菇用温水泡发后，去蒂洗净，切片。"
      },
      {
        "id": "b2",
        "label": "调味煮制勾芡",
        "sublabel": "Boil",
        "stageIndex": 1,
        "ingredientIds": [
          "i3",
          "i4",
          "i5",
          "i6",
          "i7"
        ],
        "heatLevel": "大火",
        "note": "烧热后，放入葱段、姜末煸出香味，再放入适量清水，加入盐调味，大火烧开后，放入香菇、菜花，用小火煨入味后，用水淀粉勾芡即可。",
        "dependencies": [
          {
            "sourceBlockId": "b1",
            "type": "material",
            "label": "承接前序处理物"
          }
        ],
        "inputBlockIds": [
          "b1"
        ]
      }
    ],
    "finalBlock": {
      "method": "stew",
      "role": "outcome",
      "label": "完成"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00037.html#sigil_toc_id_211 · 调节孩子免疫力 平衡膳食、丰富营养，增强抗病能力 · 香菇菜花",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00037.html#sigil_toc_id_211"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-131",
    "version": "3.0",
    "status": "published",
    "title": "🥩 肉炒胡萝卜丝",
    "description": "营养师张晔健康食谱·调节孩子免疫力 平衡膳食、丰富营养，增强抗病能力",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "中式熟铁炒锅 (Wok)",
      "servings": "2-3 人份",
      "prepNotes": "准备20分钟 · 烹调8分钟"
    },
    "cookingTimeText": "准备20分钟 · 烹调8分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "胡萝卜",
        "amountText": "250克",
        "category": "produce"
      },
      {
        "id": "i5",
        "name": "料酒",
        "amountText": "10克",
        "category": "seasoning"
      },
      {
        "id": "i6",
        "name": "酱油",
        "amountText": "10克",
        "category": "seasoning"
      },
      {
        "id": "i2",
        "name": "瘦猪肉",
        "amountText": "100克",
        "category": "main"
      },
      {
        "id": "i3",
        "name": "葱丝",
        "amountText": "5克",
        "category": "seasoning"
      },
      {
        "id": "i4",
        "name": "姜丝",
        "amountText": "5克",
        "category": "seasoning"
      },
      {
        "id": "i7",
        "name": "盐",
        "amountText": "4克",
        "category": "seasoning"
      },
      {
        "id": "i8",
        "name": "植物油",
        "amountText": "适量",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "切配腌浆",
        "sublabel": "Marinate",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i5",
          "i6"
        ],
        "note": "胡萝卜洗净，去皮，切丝；猪肉洗净，切丝，用料酒、酱油腌渍。"
      },
      {
        "id": "b2",
        "label": "炝香翻炒调味",
        "sublabel": "Stir-fry",
        "stageIndex": 1,
        "ingredientIds": [
          "i2",
          "i4",
          "i7",
          "i3",
          "i8"
        ],
        "note": "油烧热，用葱姜丝炝锅，下入肉丝翻炒至变色，放入胡萝卜丝煸炒片刻，加入盐和少许水，稍焖，待胡萝卜丝烂熟时即可。",
        "completionState": "变色",
        "dependencies": [
          {
            "sourceBlockId": "b1",
            "type": "material",
            "label": "承接前序处理物"
          }
        ],
        "inputBlockIds": [
          "b1"
        ]
      }
    ],
    "finalBlock": {
      "method": "fry",
      "role": "outcome",
      "label": "完成"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00037.html#sigil_toc_id_212 · 调节孩子免疫力 平衡膳食、丰富营养，增强抗病能力 · 肉炒胡萝卜丝",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00037.html#sigil_toc_id_212"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：胡萝卜中的β-胡萝卜素有助于增强免疫力，用油炒后，更利于吸收。这道菜可以提高身体的抗病能力。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-132",
    "version": "3.0",
    "status": "published",
    "title": "♨️ 清蒸牡蛎",
    "description": "营养师张晔健康食谱·健脾开胃 补充B族维生素、维生素A",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "多层不锈钢蒸锅 (Steamer)",
      "servings": "2-3 人份",
      "prepNotes": "准备30分钟 · 烹调15分钟"
    },
    "cookingTimeText": "准备30分钟 · 烹调15分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "新鲜牡蛎",
        "amountText": "500克",
        "category": "main"
      },
      {
        "id": "i2",
        "name": "生抽",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i3",
        "name": "香油",
        "amountText": "适量",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "调汁",
        "sublabel": "Mix sauce",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2",
          "i3"
        ],
        "note": "新鲜牡蛎刷洗干净；生抽加香油调成味汁。"
      },
      {
        "id": "b2",
        "label": "煮制蒸制装盘",
        "sublabel": "Steam",
        "stageIndex": 1,
        "ingredientIds": [],
        "durationText": "3–5m",
        "note": "锅内放水烧开，将牡蛎平面朝上、凹面向下地放入蒸屉。蒸至牡蛎开口，再过3～5分钟出锅，蘸味汁食用即可。",
        "completionState": "牡蛎开口",
        "dependencies": [
          {
            "sourceBlockId": "b1",
            "type": "material",
            "label": "承接前序处理物"
          }
        ],
        "inputBlockIds": [
          "b1"
        ]
      }
    ],
    "finalBlock": {
      "method": "steam",
      "role": "outcome",
      "label": "完成",
      "servingInstructions": "出锅装盘"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00038.html#sigil_toc_id_213 · 健脾开胃 补充B族维生素、维生素A · 清蒸牡蛎",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00038.html#sigil_toc_id_213"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-133",
    "version": "3.0",
    "status": "published",
    "title": "🐟 木瓜鲫鱼汤",
    "description": "营养师张晔健康食谱·健脾开胃 补充B族维生素、维生素A",
    "cuisine": "chinese",
    "difficulty": "medium",
    "prerequisites": {
      "containerSize": "高保温厚底砂锅 / 铸铁炖锅",
      "servings": "2-3 人份",
      "prepNotes": "准备15分钟 · 烹调45分钟"
    },
    "cookingTimeText": "准备15分钟 · 烹调45分钟",
    "ingredients": [
      {
        "id": "i2",
        "name": "鲫鱼",
        "amountText": "300克",
        "category": "main"
      },
      {
        "id": "i1",
        "name": "木瓜",
        "amountText": "250克",
        "category": "produce"
      },
      {
        "id": "i8",
        "name": "植物油",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i3",
        "name": "盐",
        "amountText": "5克",
        "category": "seasoning"
      },
      {
        "id": "i4",
        "name": "料酒",
        "amountText": "5克",
        "category": "seasoning"
      },
      {
        "id": "i5",
        "name": "葱段",
        "amountText": "10克",
        "category": "seasoning"
      },
      {
        "id": "i6",
        "name": "姜片",
        "amountText": "10克",
        "category": "seasoning"
      },
      {
        "id": "i7",
        "name": "鸡精",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i9",
        "name": "香菜段",
        "amountText": "适量",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "切配",
        "sublabel": "Prep",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2"
        ],
        "note": "将木瓜去皮除子，洗净，切片；鲫鱼除去鳃、鳞、内脏，洗净。"
      },
      {
        "id": "b2",
        "label": "煎制",
        "sublabel": "Sear",
        "stageIndex": 1,
        "ingredientIds": [
          "i8"
        ],
        "note": "锅置火上，倒植物油烧热，放入鲫鱼煎至两面金黄色后铲出。",
        "completionState": "两面金黄色",
        "dependencies": [
          {
            "sourceBlockId": "b1",
            "type": "material",
            "label": "承接前序处理物"
          }
        ],
        "inputBlockIds": [
          "b1"
        ]
      },
      {
        "id": "b3",
        "label": "调味",
        "sublabel": "Season",
        "stageIndex": 2,
        "ingredientIds": [
          "i3",
          "i4",
          "i5",
          "i6",
          "i7",
          "i9"
        ],
        "heatLevel": "大火",
        "durationMinutes": 40,
        "note": "将煎好的鲫鱼、木瓜、葱段、料酒、姜片放在汤煲内，加入清水，大火烧沸转小火煲40分钟，调入盐、鸡精调味，撒香菜段即可。",
        "dependencies": [
          {
            "sourceBlockId": "b2",
            "type": "material",
            "label": "承接前序处理物"
          }
        ],
        "inputBlockIds": [
          "b2"
        ]
      }
    ],
    "finalBlock": {
      "method": "stew",
      "role": "outcome",
      "label": "完成"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00038.html#sigil_toc_id_214 · 健脾开胃 补充B族维生素、维生素A · 木瓜鲫鱼汤",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00038.html#sigil_toc_id_214"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：这款汤有助于分解并加速蛋白质吸收，是健脾开胃的好食物。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-134",
    "version": "3.0",
    "status": "published",
    "title": "🥚 咸蛋黄炒南瓜",
    "description": "营养师张晔健康食谱·健脾开胃 补充B族维生素、维生素A",
    "cuisine": "chinese",
    "difficulty": "hard",
    "prerequisites": {
      "containerSize": "中式熟铁炒锅 (Wok)",
      "servings": "2-3 人份",
      "prepNotes": "准备10分钟 · 烹调10分钟"
    },
    "cookingTimeText": "准备10分钟 · 烹调10分钟",
    "ingredients": [
      {
        "id": "i2",
        "name": "熟咸鸭蛋黄",
        "amountText": "50克",
        "category": "main"
      },
      {
        "id": "i1",
        "name": "南瓜",
        "amountText": "200克",
        "category": "produce"
      },
      {
        "id": "i3",
        "name": "葱段",
        "amountText": "5克",
        "category": "seasoning"
      },
      {
        "id": "i4",
        "name": "鸡精",
        "amountText": "少许",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "切配",
        "sublabel": "Prep",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2"
        ],
        "note": "南瓜洗净，切片；熟咸鸭蛋黄碾碎。"
      },
      {
        "id": "b2",
        "label": "炝香",
        "sublabel": "Sauté",
        "stageIndex": 1,
        "ingredientIds": [
          "i3"
        ],
        "note": "锅置火上，倒油烧至五成热，下葱段爆香。",
        "dependencies": [
          {
            "sourceBlockId": "b1",
            "type": "order",
            "label": "按原书顺序进行"
          }
        ],
        "afterBlockIds": [
          "b1"
        ]
      },
      {
        "id": "b3",
        "label": "翻炒",
        "sublabel": "Stir-fry",
        "stageIndex": 2,
        "ingredientIds": [],
        "note": "倒入南瓜片煸炒至熟。",
        "dependencies": [
          {
            "sourceBlockId": "b2",
            "type": "material",
            "label": "承接前序处理物"
          }
        ],
        "inputBlockIds": [
          "b2"
        ]
      },
      {
        "id": "b4",
        "label": "翻炒调味",
        "sublabel": "Stir-fry",
        "stageIndex": 3,
        "ingredientIds": [
          "i4"
        ],
        "note": "加入研碎的咸鸭蛋黄，和南瓜翻炒均匀后，加鸡精调味即可。",
        "dependencies": [
          {
            "sourceBlockId": "b3",
            "type": "material",
            "label": "承接前序处理物"
          }
        ],
        "inputBlockIds": [
          "b3"
        ]
      }
    ],
    "finalBlock": {
      "method": "fry",
      "role": "outcome",
      "label": "完成"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00038.html#sigil_toc_id_215 · 健脾开胃 补充B族维生素、维生素A · 咸蛋黄炒南瓜",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00038.html#sigil_toc_id_215"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：南瓜中的碳水化合物和膳食纤维可保护胃肠道黏膜免受粗糙食物的刺激；南瓜和蛋黄中的维生素A还可以保护胃黏膜，预防胃病。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-135",
    "version": "3.0",
    "status": "published",
    "title": "🐟 清蒸鳕鱼",
    "description": "营养师张晔健康食谱·健脑益智 补充Ω-3脂肪酸和锌",
    "cuisine": "chinese",
    "difficulty": "medium",
    "prerequisites": {
      "containerSize": "多层不锈钢蒸锅 (Steamer)",
      "servings": "2-3 人份",
      "prepNotes": "准备20分钟 · 烹调10分钟"
    },
    "cookingTimeText": "准备20分钟 · 烹调10分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "鳕鱼",
        "amountText": "250克",
        "category": "main"
      },
      {
        "id": "i3",
        "name": "葱丝姜片",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i2",
        "name": "盐",
        "amountText": "3克",
        "category": "seasoning"
      },
      {
        "id": "i4",
        "name": "蒜末",
        "amountText": "10克",
        "category": "seasoning"
      },
      {
        "id": "i5",
        "name": "生抽",
        "amountText": "10克",
        "category": "seasoning"
      },
      {
        "id": "i6",
        "name": "蚝油",
        "amountText": "10克",
        "category": "seasoning"
      },
      {
        "id": "i7",
        "name": "白糖",
        "amountText": "5克",
        "category": "seasoning"
      },
      {
        "id": "i8",
        "name": "橄榄油",
        "amountText": "5克",
        "category": "seasoning"
      },
      {
        "id": "i9",
        "name": "香油",
        "amountText": "5克",
        "category": "seasoning"
      },
      {
        "id": "i10",
        "name": "水淀粉",
        "amountText": "适量",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "切配装盘沥干备用",
        "sublabel": "Hold",
        "stageIndex": 0,
        "ingredientIds": [
          "i1"
        ],
        "note": "将鳕鱼洗净沥水，装盘，姜片放在其上备用。"
      },
      {
        "id": "b2",
        "label": "蒸制",
        "sublabel": "Steam",
        "stageIndex": 1,
        "ingredientIds": [
          "i3"
        ],
        "heatLevel": "大火",
        "durationMinutes": 8,
        "durationText": "6m + 2m",
        "note": "锅内加水，放入鳕鱼盘，水开后入蒸笼大火蒸6分钟，熄火焖2分钟，取出蒸好的鳕鱼，上面放上葱丝。",
        "dependencies": [
          {
            "sourceBlockId": "b1",
            "type": "material",
            "label": "承接前序处理物"
          }
        ],
        "inputBlockIds": [
          "b1"
        ]
      },
      {
        "id": "b3",
        "label": "炝香淋汁",
        "sublabel": "Sauté",
        "stageIndex": 2,
        "ingredientIds": [
          "i2",
          "i4",
          "i5",
          "i6",
          "i7",
          "i8",
          "i9",
          "i10"
        ],
        "heatLevel": "小火",
        "note": "另起锅倒入橄榄油，烧至六成热，放入蒜末炒香，依次放入少许水、盐、生抽、白糖、蚝油，调中小火烧开，用水淀粉勾芡，加香油调味，离火，浇到蒸好的鱼片上即可。",
        "dependencies": [
          {
            "sourceBlockId": "b2",
            "type": "material",
            "label": "承接前序处理物"
          }
        ],
        "inputBlockIds": [
          "b2"
        ]
      }
    ],
    "finalBlock": {
      "method": "steam",
      "role": "outcome",
      "label": "完成"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00039.html#sigil_toc_id_216 · 健脑益智 补充Ω-3脂肪酸和锌 · 清蒸鳕鱼",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00039.html#sigil_toc_id_216"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-136",
    "version": "3.0",
    "status": "published",
    "title": "🥩 萝卜烧牛肉",
    "description": "营养师张晔健康食谱·健脑益智 补充Ω-3脂肪酸和锌",
    "cuisine": "chinese",
    "difficulty": "medium",
    "prerequisites": {
      "containerSize": "中式熟铁炒锅 (Wok)",
      "servings": "2-3 人份",
      "prepNotes": "准备25分钟 · 烹调10分钟"
    },
    "cookingTimeText": "准备25分钟 · 烹调10分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "牛肉",
        "amountText": "75克",
        "category": "main"
      },
      {
        "id": "i2",
        "name": "白萝卜",
        "amountText": "50克",
        "category": "produce"
      },
      {
        "id": "i3",
        "name": "胡萝卜",
        "amountText": "25克",
        "category": "produce"
      },
      {
        "id": "i4",
        "name": "熟板栗",
        "amountText": "25克",
        "category": "produce"
      },
      {
        "id": "i5",
        "name": "盐2植物油",
        "amountText": "2克",
        "category": "seasoning"
      },
      {
        "id": "i6",
        "name": "葱段姜片",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i7",
        "name": "酱油",
        "amountText": "5克",
        "category": "seasoning"
      },
      {
        "id": "i8",
        "name": "料酒",
        "amountText": "5克",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "切配",
        "sublabel": "Prep",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2",
          "i3",
          "i4"
        ],
        "note": "将白萝卜和胡萝卜洗净，去皮，切成块；牛肉洗净，切块；将熟板栗的皮都剥去。"
      },
      {
        "id": "b2",
        "label": "煮制沥干备用",
        "sublabel": "Boil",
        "stageIndex": 1,
        "ingredientIds": [],
        "note": "将牛肉放入凉水锅中煮至七成熟，捞出备用。",
        "completionState": "七成熟",
        "dependencies": [
          {
            "sourceBlockId": "b1",
            "type": "material",
            "label": "承接前序处理物"
          }
        ],
        "inputBlockIds": [
          "b1"
        ]
      },
      {
        "id": "b3",
        "label": "炝香收汁",
        "sublabel": "Sauté",
        "stageIndex": 2,
        "ingredientIds": [
          "i6",
          "i7",
          "i8",
          "i5"
        ],
        "heatLevel": "大火",
        "note": "锅烧热放油，将葱段、姜片爆香，放牛肉、开水、酱油、料酒，用大火烧开，然后放入白萝卜块、胡萝卜块及板栗，炒至变软后加盐调味，稍煮收汁即可。",
        "completionState": "变软",
        "dependencies": [
          {
            "sourceBlockId": "b2",
            "type": "material",
            "label": "承接前序处理物"
          }
        ],
        "inputBlockIds": [
          "b2"
        ]
      }
    ],
    "finalBlock": {
      "method": "fry",
      "role": "outcome",
      "label": "完成"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00039.html#sigil_toc_id_217 · 健脑益智 补充Ω-3脂肪酸和锌 · 萝卜烧牛肉",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00039.html#sigil_toc_id_217"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-137",
    "version": "3.0",
    "status": "published",
    "title": "🥩 青椒炒猪肝",
    "description": "营养师张晔健康食谱·保护视力 多补充保护视力的营养素",
    "cuisine": "chinese",
    "difficulty": "medium",
    "prerequisites": {
      "containerSize": "中式熟铁炒锅 (Wok)",
      "servings": "2-3 人份",
      "prepNotes": "准备45分钟 · 烹调10分钟"
    },
    "cookingTimeText": "准备45分钟 · 烹调10分钟",
    "ingredients": [
      {
        "id": "i2",
        "name": "鲜猪肝",
        "amountText": "50克",
        "category": "main"
      },
      {
        "id": "i1",
        "name": "青椒半个",
        "amountText": "适量",
        "category": "produce"
      },
      {
        "id": "i4",
        "name": "姜丝",
        "amountText": "2克",
        "category": "seasoning"
      },
      {
        "id": "i3",
        "name": "盐",
        "amountText": "少许",
        "category": "seasoning"
      },
      {
        "id": "i5",
        "name": "植物油",
        "amountText": "适量",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "切配焯烫沥干备用",
        "sublabel": "Blanch",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2"
        ],
        "note": "青椒洗净，去蒂及子，切丝；鲜猪肝洗净，切片，用热水焯烫，捞出沥干。",
        "completionState": "捞出沥干"
      },
      {
        "id": "b2",
        "label": "装盘",
        "sublabel": "Plate",
        "stageIndex": 1,
        "ingredientIds": [
          "i4"
        ],
        "note": "锅内倒油烧热，放入姜丝和猪肝片略炒片刻，盛出。",
        "dependencies": [
          {
            "sourceBlockId": "b1",
            "type": "material",
            "label": "承接前序处理物"
          }
        ],
        "inputBlockIds": [
          "b1"
        ]
      },
      {
        "id": "b3",
        "label": "翻炒调味",
        "sublabel": "Stir-fry",
        "stageIndex": 2,
        "ingredientIds": [
          "i3",
          "i5"
        ],
        "heatLevel": "大火",
        "durationMinutes": 3,
        "note": "锅内再倒油烧热，放入青椒丝炒至五成熟，倒猪肝片，加盐调味，大火爆炒3分钟即可。",
        "completionState": "五成熟",
        "dependencies": [
          {
            "sourceBlockId": "b2",
            "type": "material",
            "label": "承接前序处理物"
          }
        ],
        "inputBlockIds": [
          "b2"
        ]
      }
    ],
    "finalBlock": {
      "method": "fry",
      "role": "outcome",
      "label": "完成"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00040.html#sigil_toc_id_218 · 保护视力 多补充保护视力的营养素 · 青椒炒猪肝",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00040.html#sigil_toc_id_218"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-138",
    "version": "3.0",
    "status": "published",
    "title": "🥚 培根滑蛋西蓝花",
    "description": "营养师张晔健康食谱·保护视力 多补充保护视力的营养素",
    "cuisine": "chinese",
    "difficulty": "medium",
    "prerequisites": {
      "containerSize": "中式熟铁炒锅 (Wok)",
      "servings": "2-3 人份",
      "prepNotes": "准备15分钟 · 烹调15分钟"
    },
    "cookingTimeText": "准备15分钟 · 烹调15分钟",
    "ingredients": [
      {
        "id": "i3",
        "name": "鸡蛋两个",
        "amountText": "适量",
        "category": "main"
      },
      {
        "id": "i1",
        "name": "西蓝花",
        "amountText": "300克",
        "category": "produce"
      },
      {
        "id": "i2",
        "name": "培根",
        "amountText": "100克",
        "category": "produce"
      },
      {
        "id": "i4",
        "name": "盐",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i5",
        "name": "蚝油",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i6",
        "name": "水淀粉",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i7",
        "name": "植物油",
        "amountText": "适量",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "切配焯烫沥干备用",
        "sublabel": "Blanch",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2",
          "i3"
        ],
        "note": "西蓝花洗净，去蒂，掰成小朵后用沸水焯至微软；培根切小片；鸡蛋打入碗中，搅成蛋液备用。",
        "completionState": "微软"
      },
      {
        "id": "b2",
        "label": "装盘",
        "sublabel": "Plate",
        "stageIndex": 1,
        "ingredientIds": [],
        "heatLevel": "小火",
        "note": "锅中加适量油，微加热后调至小火，倒入蛋液，当蛋液凝固至无液体时立刻盛出，滑蛋就做好了。",
        "completionState": "小火",
        "dependencies": [
          {
            "sourceBlockId": "b1",
            "type": "material",
            "label": "承接前序处理物"
          }
        ],
        "inputBlockIds": [
          "b1"
        ]
      },
      {
        "id": "b3",
        "label": "勾芡",
        "sublabel": "Thicken",
        "stageIndex": 2,
        "ingredientIds": [
          "i4",
          "i5",
          "i6",
          "i7"
        ],
        "note": "锅中再少许油，倒入焯好的西蓝花、培根片，炒几分钟后加入少许蚝油和盐，至西蓝花熟后，加入滑蛋，用水淀粉勾芡即可。",
        "completionState": "西蓝花熟",
        "dependencies": [
          {
            "sourceBlockId": "b2",
            "type": "material",
            "label": "承接前序处理物"
          }
        ],
        "inputBlockIds": [
          "b2"
        ]
      }
    ],
    "finalBlock": {
      "method": "fry",
      "role": "outcome",
      "label": "完成"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00040.html#sigil_toc_id_219 · 保护视力 多补充保护视力的营养素 · 培根滑蛋西蓝花",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00040.html#sigil_toc_id_219"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：西蓝花中的维生素A含量比鸡蛋还要高几倍，并且用油炒食，更利于维生素A被人体吸收，发挥其预防眼睛干涩、夜盲症的功效。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  }
]
