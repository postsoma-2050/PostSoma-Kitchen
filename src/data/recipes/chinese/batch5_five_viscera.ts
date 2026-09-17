import type { VisualRecipeV3 } from '@/types/recipeV3'

/**
 * 营养师张晔《蒸炖炒，营养师的健康食谱》原书真值 - 五脏食疗 (心肝脾肺肾调理)
 * 共 17 道食谱 (100% 严格原子食材建模，一人一行，无复合食材)
 */
export const BATCH5_FIVE_VISCERA: VisualRecipeV3[] = [
  {
    "id": "cn-62",
    "version": "3.0",
    "status": "published",
    "title": "🥩 家常榨菜蒸牛肉",
    "description": "营养师张晔健康食谱·养心 苦味入心，红色养心，全面提升精气神",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "多层不锈钢蒸锅 (Steamer)",
      "preheat": "腌30分钟",
      "servings": "2-3 人份",
      "prepNotes": "准备30分钟 · 烹调8分钟"
    },
    "cookingTimeText": "准备30分钟 · 烹调8分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "牛肉片",
        "amountText": "300克",
        "category": "main"
      },
      {
        "id": "i3",
        "name": "生抽",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i4",
        "name": "胡椒粉",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i5",
        "name": "白糖",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i6",
        "name": "麻油",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i7",
        "name": "水淀粉",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i2",
        "name": "片状榨菜",
        "amountText": "1袋",
        "category": "produce"
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
        "label": "拌匀腌浆勾芡",
        "sublabel": "Thicken",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i3",
          "i4",
          "i5",
          "i6",
          "i7"
        ],
        "durationMinutes": 30,
        "note": "榨菜用清水冲洗去盐；牛肉片加入生抽、胡椒粉、白糖、麻油搅拌均匀，腌30分钟，加水淀粉拌匀。"
      },
      {
        "id": "b2",
        "label": "组合装填蒸制煮制",
        "sublabel": "Boil",
        "stageIndex": 1,
        "ingredientIds": [
          "i8",
          "i2"
        ],
        "durationMinutes": 8,
        "note": "将榨菜铺在盘子底部，上面放牛肉，淋上少许植物油，放入蒸锅中，水烧开后蒸8分钟即可。",
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
      "locator": "OEBPS/text00010.html#sigil_toc_id_119 · 养心 苦味入心，红色养心，全面提升精气神 · 家常榨菜蒸牛肉",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00010.html#sigil_toc_id_119"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：牛肉中血红素铁含量尤其丰富，同时牛肉中蛋白质和锌的含量也较高，而脂肪含量低，是补铁的很好选择。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-63",
    "version": "3.0",
    "status": "published",
    "title": "🍲 茄汁黄豆",
    "description": "营养师张晔健康食谱·养心 苦味入心，红色养心，全面提升精气神",
    "cuisine": "chinese",
    "difficulty": "medium",
    "prerequisites": {
      "containerSize": "高保温厚底砂锅 / 铸铁炖锅",
      "preheat": "提前泡6小时）200克",
      "servings": "2-3 人份",
      "prepNotes": "准备5分钟 · 烹调1小时"
    },
    "cookingTimeText": "准备5分钟 · 烹调1小时",
    "ingredients": [
      {
        "id": "i1",
        "name": "黄豆（提前泡6小时）",
        "amountText": "200克",
        "category": "produce"
      },
      {
        "id": "i3",
        "name": "白糖",
        "amountText": "5克",
        "category": "seasoning"
      },
      {
        "id": "i4",
        "name": "盐",
        "amountText": "3克",
        "category": "seasoning"
      },
      {
        "id": "i2",
        "name": "番茄块",
        "amountText": "100克",
        "category": "produce"
      },
      {
        "id": "i5",
        "name": "水淀粉",
        "amountText": "适量",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "煮制调味",
        "sublabel": "Boil",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i3",
          "i4"
        ],
        "heatLevel": "大火",
        "note": "将提前泡好的黄豆放入砂锅中，加水没过黄豆，大火煮开后，撇去浮沫，加盐和白糖并转小火煮。"
      },
      {
        "id": "b2",
        "label": "煮制",
        "sublabel": "Boil",
        "stageIndex": 1,
        "ingredientIds": [
          "i2"
        ],
        "heatLevel": "大火",
        "note": "待黄豆煮至快软烂时，加入番茄块，大火煮开后，转小火继续煮。",
        "completionState": "黄豆煮至快软烂",
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
        "label": "收汁勾芡",
        "sublabel": "Thicken",
        "stageIndex": 2,
        "ingredientIds": [
          "i5"
        ],
        "heatLevel": "大火",
        "note": "待番茄煮烂成汁且黄豆完全煮熟后，用大火收汁，用水淀粉勾芡即可。",
        "completionState": "番茄煮烂成汁且黄豆完全煮熟",
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
      "locator": "OEBPS/text00010.html#sigil_toc_id_120 · 养心 苦味入心，红色养心，全面提升精气神 · 茄汁黄豆",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00010.html#sigil_toc_id_120"
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
    "id": "cn-64",
    "version": "3.0",
    "status": "published",
    "title": "🥕 胡萝卜炒木耳",
    "description": "营养师张晔健康食谱·养心 苦味入心，红色养心，全面提升精气神",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "中式熟铁炒锅 (Wok)",
      "servings": "2-3 人份",
      "prepNotes": "准备6分钟 · 烹调15分钟"
    },
    "cookingTimeText": "准备6分钟 · 烹调15分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "胡萝卜",
        "amountText": "150克",
        "category": "produce"
      },
      {
        "id": "i2",
        "name": "水发木耳",
        "amountText": "50克",
        "category": "produce"
      },
      {
        "id": "i3",
        "name": "料酒",
        "amountText": "10克",
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
        "name": "盐",
        "amountText": "3克",
        "category": "seasoning"
      },
      {
        "id": "i6",
        "name": "鸡精",
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
        "label": "切配",
        "sublabel": "Prep",
        "stageIndex": 0,
        "ingredientIds": [
          "i1"
        ],
        "note": "将胡萝卜洗净，去蒂，切成丝；木耳洗净，撕片。"
      },
      {
        "id": "b2",
        "label": "炝香翻炒调味",
        "sublabel": "Stir-fry",
        "stageIndex": 1,
        "ingredientIds": [
          "i2",
          "i3",
          "i4",
          "i5",
          "i6",
          "i7"
        ],
        "heatLevel": "中火",
        "note": "锅中放少量油，中火烧至六成热时，用姜末爆香，烹入料酒，倒入胡萝卜丝、水发木耳煸炒几下，加入盐和少许清水，稍焖，待胡萝卜丝烂熟后，用鸡精调味，翻炒均匀即可。",
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
      "locator": "OEBPS/text00010.html#sigil_toc_id_121 · 养心 苦味入心，红色养心，全面提升精气神 · 胡萝卜炒木耳",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00010.html#sigil_toc_id_121"
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
    "id": "cn-65",
    "version": "3.0",
    "status": "published",
    "title": "🥬 蒜蓉油淋生菜",
    "description": "营养师张晔健康食谱·养心 苦味入心，红色养心，全面提升精气神",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "中式熟铁炒锅 (Wok)",
      "servings": "2-3 人份",
      "prepNotes": "准备5分钟 · 烹调5分钟"
    },
    "cookingTimeText": "准备5分钟 · 烹调5分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "生菜",
        "amountText": "100克",
        "category": "produce"
      },
      {
        "id": "i2",
        "name": "蒜",
        "amountText": "1头",
        "category": "produce"
      },
      {
        "id": "i3",
        "name": "老抽",
        "amountText": "10毫升",
        "category": "seasoning"
      },
      {
        "id": "i4",
        "name": "蚝油1茶匙",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i5",
        "name": "白糖",
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
        "label": "切配炝香沥干备用",
        "sublabel": "Sauté",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2",
          "i3",
          "i4",
          "i5",
          "i6"
        ],
        "note": "生菜洗净掰成一片片；蒜洗净拍成蒜蓉，植物油加热，炒香蒜蓉，倒入老抽、蚝油、白糖炒匀煮开，盛出备用。",
        "completionState": "盛出备用"
      },
      {
        "id": "b2",
        "label": "煮制装盘",
        "sublabel": "Boil",
        "stageIndex": 1,
        "ingredientIds": [],
        "note": "锅里加热水烧开，放入生菜白灼半分钟，捞出盛盘，浇上蒜蓉酱汁即可。",
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
      "label": "完成",
      "servingInstructions": "出锅装盘"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00010.html#sigil_toc_id_122 · 养心 苦味入心，红色养心，全面提升精气神 · 蒜蓉油淋生菜",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00010.html#sigil_toc_id_122"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：生菜属于苦味食物，能清心、养心。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-66",
    "version": "3.0",
    "status": "published",
    "title": "🥚 菠菜蒸蛋",
    "description": "营养师张晔健康食谱·护肝 多吃蔬菜，给肝脏减减压",
    "cuisine": "chinese",
    "difficulty": "medium",
    "prerequisites": {
      "containerSize": "多层不锈钢蒸锅 (Steamer)",
      "servings": "2-3 人份",
      "prepNotes": "准备10分钟 · 烹调15分钟"
    },
    "cookingTimeText": "准备10分钟 · 烹调15分钟",
    "ingredients": [
      {
        "id": "i2",
        "name": "菠菜",
        "amountText": "250克",
        "category": "produce"
      },
      {
        "id": "i1",
        "name": "鸡蛋",
        "amountText": "100克",
        "category": "main"
      },
      {
        "id": "i3",
        "name": "高汤",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i4",
        "name": "盐",
        "amountText": "适量",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "焯烫",
        "sublabel": "Blanch",
        "stageIndex": 0,
        "ingredientIds": [
          "i2"
        ],
        "note": "将菠菜洗干净，放沸水中煮一下，捞起，加入适量的水搅成糊状。"
      },
      {
        "id": "b2",
        "label": "打散沥干备用",
        "sublabel": "Hold",
        "stageIndex": 1,
        "ingredientIds": [
          "i1",
          "i3",
          "i4"
        ],
        "note": "取一蒸碗，将鸡蛋在碗中打散。加入菠菜糊、高汤搅拌均匀，加盐调味后备用。",
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
        "label": "煮制蒸制",
        "sublabel": "Steam",
        "stageIndex": 2,
        "ingredientIds": [],
        "heatLevel": "中火",
        "durationMinutes": 15,
        "note": "蒸锅中加水烧开，放入蒸碗，盖上锅盖，以中火蒸15分钟至熟即可。",
        "completionState": "熟即可",
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
      "locator": "OEBPS/text00011.html#sigil_toc_id_123 · 护肝 多吃蔬菜，给肝脏减减压 · 菠菜蒸蛋",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00011.html#sigil_toc_id_123"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：中医认为，菠菜性甘凉，入肠、胃经，有补血止血、滋阴平肝的功效，对肝气不舒和胃病的辅助治疗常有良效，对春季因肝阴不足引起的高血压、头痛目眩和贫血等都有积极作用。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-67",
    "version": "3.0",
    "status": "published",
    "title": "🧈 香菇什锦豆腐",
    "description": "营养师张晔健康食谱·护肝 多吃蔬菜，给肝脏减减压",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "高保温厚底砂锅 / 铸铁炖锅",
      "servings": "2-3 人份",
      "prepNotes": "准备30分钟 · 烹调10分钟"
    },
    "cookingTimeText": "准备30分钟 · 烹调10分钟",
    "ingredients": [
      {
        "id": "i4",
        "name": "豆腐",
        "amountText": "100克",
        "category": "main"
      },
      {
        "id": "i1",
        "name": "香菇",
        "amountText": "50克",
        "category": "produce"
      },
      {
        "id": "i2",
        "name": "干木耳",
        "amountText": "10克",
        "category": "produce"
      },
      {
        "id": "i3",
        "name": "竹笋",
        "amountText": "100克",
        "category": "produce"
      },
      {
        "id": "i5",
        "name": "盐",
        "amountText": "3克",
        "category": "seasoning"
      },
      {
        "id": "i6",
        "name": "白糖",
        "amountText": "5克",
        "category": "seasoning"
      },
      {
        "id": "i7",
        "name": "蚝油",
        "amountText": "适量",
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
        "label": "切配泡发",
        "sublabel": "Soak",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2",
          "i3",
          "i4"
        ],
        "note": "豆腐切块；香菇洗净，去蒂，切块；干木耳用温水泡发后洗净，去掉没有泡发的部分，撕成块；竹笋洗净，切块。"
      },
      {
        "id": "b2",
        "label": "翻炒调味",
        "sublabel": "Stir-fry",
        "stageIndex": 1,
        "ingredientIds": [
          "i5",
          "i6",
          "i7",
          "i8"
        ],
        "heatLevel": "大火",
        "durationMinutes": 5,
        "note": "油烧热后，先倒入香菇和木耳翻炒，再倒入竹笋翻炒，倒入没过食材的清水，大火烧开后加入豆腐，再放入蚝油、盐和白糖调味，小火稍炖5分钟即可。",
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
      "locator": "OEBPS/text00011.html#sigil_toc_id_124 · 护肝 多吃蔬菜，给肝脏减减压 · 香菇什锦豆腐",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00011.html#sigil_toc_id_124"
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
    "id": "cn-68",
    "version": "3.0",
    "status": "published",
    "title": "🐟 醋烹带鱼",
    "description": "营养师张晔健康食谱·护肝 多吃蔬菜，给肝脏减减压",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "中式熟铁炒锅 (Wok)",
      "servings": "2-3 人份",
      "prepNotes": "准备30分钟 · 烹调30分钟"
    },
    "cookingTimeText": "准备30分钟 · 烹调30分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "带鱼",
        "amountText": "300克",
        "category": "main"
      },
      {
        "id": "i8",
        "name": "淀粉",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i2",
        "name": "醋",
        "amountText": "10克",
        "category": "seasoning"
      },
      {
        "id": "i3",
        "name": "料酒",
        "amountText": "15克",
        "category": "seasoning"
      },
      {
        "id": "i4",
        "name": "酱油",
        "amountText": "15克",
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
        "name": "蒜末",
        "amountText": "5克",
        "category": "seasoning"
      },
      {
        "id": "i7",
        "name": "花椒",
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
        "label": "切配煎制",
        "sublabel": "Sear",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i8"
        ],
        "note": "带鱼收拾干净，洗净切段，裹匀淀粉，用少许油煎至两面金黄。",
        "completionState": "两面金黄"
      },
      {
        "id": "b2",
        "label": "炝香翻炒调味",
        "sublabel": "Stir-fry",
        "stageIndex": 1,
        "ingredientIds": [
          "i2",
          "i3",
          "i4",
          "i5",
          "i6",
          "i7",
          "i9",
          "i10"
        ],
        "durationMinutes": 2,
        "note": "锅内留少量油，加花椒、姜末、蒜末炒香，烹入酱油、醋，加少许料酒，倒入煎好的带鱼段翻炒，稍焖2分钟入味，加鸡精调味即可。",
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
      "locator": "OEBPS/text00011.html#sigil_toc_id_125 · 护肝 多吃蔬菜，给肝脏减减压 · 醋烹带鱼",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00011.html#sigil_toc_id_125"
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
    "id": "cn-69",
    "version": "3.0",
    "status": "published",
    "title": "🍗 板栗蒸土鸡",
    "description": "营养师张晔健康食谱·补肾 养好先天之本，健康少生病",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "多层不锈钢蒸锅 (Steamer)",
      "preheat": "腌3分钟",
      "servings": "2-3 人份",
      "prepNotes": "准备3小时 · 烹调30分钟"
    },
    "cookingTimeText": "准备3小时 · 烹调30分钟",
    "ingredients": [
      {
        "id": "i5",
        "name": "姜末",
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
        "id": "i1",
        "name": "净土鸡",
        "amountText": "750克",
        "category": "main"
      },
      {
        "id": "i2",
        "name": "板栗",
        "amountText": "250克",
        "category": "produce"
      },
      {
        "id": "i3",
        "name": "辣椒酱",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i4",
        "name": "葱末",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i7",
        "name": "盐",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i8",
        "name": "酱油",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i9",
        "name": "胡椒粉",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i10",
        "name": "鸡精",
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
        "label": "拌匀腌浆沥干备用",
        "sublabel": "Hold",
        "stageIndex": 0,
        "ingredientIds": [
          "i5",
          "i6"
        ],
        "durationMinutes": 3,
        "note": "土鸡剁块；葱姜末放入料酒拌匀，腌3分钟后将清汁倒出备用。"
      },
      {
        "id": "b2",
        "label": "腌浆拌匀蒸制",
        "sublabel": "Steam",
        "stageIndex": 1,
        "ingredientIds": [
          "i1",
          "i2",
          "i3",
          "i7",
          "i8",
          "i9",
          "i10",
          "i11",
          "i4"
        ],
        "heatLevel": "大火",
        "durationText": "3h + 30m",
        "note": "土鸡块用葱姜汁腌约3小时后将汁沥出，放入植物油、盐、鸡精、胡椒粉、酱油、辣椒酱、板栗调好味拌匀，入蒸笼大火蒸约30分钟至熟即可。",
        "completionState": "熟即可",
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
      "locator": "OEBPS/text00012.html#sigil_toc_id_126 · 补肾 养好先天之本，健康少生病 · 板栗蒸土鸡",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00012.html#sigil_toc_id_126"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：土鸡肉有温中、益气、补精、添髓的作用，比较适合体弱气虚、遗精早泄者食用。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-70",
    "version": "3.0",
    "status": "published",
    "title": "🥩 白菜羊肉丸子汤",
    "description": "营养师张晔健康食谱·补肾 养好先天之本，健康少生病",
    "cuisine": "chinese",
    "difficulty": "medium",
    "prerequisites": {
      "containerSize": "高保温厚底砂锅 / 铸铁炖锅",
      "servings": "2-3 人份",
      "prepNotes": "准备30分钟 · 烹调30分钟"
    },
    "cookingTimeText": "准备30分钟 · 烹调30分钟",
    "ingredients": [
      {
        "id": "i3",
        "name": "豆腐皮",
        "amountText": "50克",
        "category": "main"
      },
      {
        "id": "i2",
        "name": "大白菜",
        "amountText": "100克",
        "category": "produce"
      },
      {
        "id": "i1",
        "name": "羊肉",
        "amountText": "200克",
        "category": "main"
      },
      {
        "id": "i4",
        "name": "鸡蛋",
        "amountText": "1个（取蛋清）",
        "category": "main"
      },
      {
        "id": "i6",
        "name": "料酒",
        "amountText": "10克",
        "category": "seasoning"
      },
      {
        "id": "i7",
        "name": "葱末",
        "amountText": "5克",
        "category": "seasoning"
      },
      {
        "id": "i8",
        "name": "姜末",
        "amountText": "5克",
        "category": "seasoning"
      },
      {
        "id": "i9",
        "name": "盐",
        "amountText": "3克",
        "category": "seasoning"
      },
      {
        "id": "i10",
        "name": "淀粉",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i5",
        "name": "黄芪",
        "amountText": "20克",
        "category": "produce"
      },
      {
        "id": "i11",
        "name": "香油",
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
          "i2",
          "i3"
        ],
        "note": "大白菜洗净，切细丝；豆腐皮切丝。"
      },
      {
        "id": "b2",
        "label": "切配拌匀成型",
        "sublabel": "Shape",
        "stageIndex": 1,
        "ingredientIds": [
          "i1",
          "i4",
          "i6",
          "i7",
          "i8",
          "i9",
          "i10"
        ],
        "note": "羊肉洗净剁碎，加姜末、葱末搅打至上劲，打入鸡蛋清，加入淀粉、盐、料酒调拌均匀，做成羊肉丸。",
        "completionState": "上劲",
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
        "label": "煮制调味",
        "sublabel": "Boil",
        "stageIndex": 2,
        "ingredientIds": [
          "i5",
          "i11"
        ],
        "durationMinutes": 2,
        "note": "锅中加入清水煮沸，放入黄芪，下羊肉丸煮至丸子浮起，放入白菜丝、豆腐丝煮2分钟调入盐，撒上葱末，滴几滴香油即可。",
        "completionState": "丸子浮起",
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
      "locator": "OEBPS/text00012.html#sigil_toc_id_127 · 补肾 养好先天之本，健康少生病 · 白菜羊肉丸子汤",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00012.html#sigil_toc_id_127"
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
    "id": "cn-71",
    "version": "3.0",
    "status": "published",
    "title": "🍗 鸡丁核桃仁",
    "description": "营养师张晔健康食谱·补肾 养好先天之本，健康少生病",
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
        "name": "鸡胸肉",
        "amountText": "250克",
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
        "name": "料酒",
        "amountText": "5克",
        "category": "seasoning"
      },
      {
        "id": "i5",
        "name": "白糖",
        "amountText": "5克",
        "category": "seasoning"
      },
      {
        "id": "i9",
        "name": "盐",
        "amountText": "3克",
        "category": "seasoning"
      },
      {
        "id": "i10",
        "name": "香油",
        "amountText": "2克",
        "category": "seasoning"
      },
      {
        "id": "i11",
        "name": "鸡精",
        "amountText": "1克",
        "category": "seasoning"
      },
      {
        "id": "i12",
        "name": "胡椒粉",
        "amountText": "1克",
        "category": "seasoning"
      },
      {
        "id": "i13",
        "name": "水淀粉",
        "amountText": "10克",
        "category": "seasoning"
      },
      {
        "id": "i2",
        "name": "核桃仁",
        "amountText": "50克",
        "category": "produce"
      },
      {
        "id": "i6",
        "name": "葱末",
        "amountText": "3克",
        "category": "seasoning"
      },
      {
        "id": "i7",
        "name": "姜末",
        "amountText": "3克",
        "category": "seasoning"
      },
      {
        "id": "i8",
        "name": "蒜末",
        "amountText": "3克",
        "category": "seasoning"
      },
      {
        "id": "i14",
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
          "i9",
          "i10",
          "i11",
          "i12",
          "i13"
        ],
        "note": "鸡胸肉洗净切丁；鸡蛋取蛋清，将鸡丁用盐、料酒、胡椒粉、蛋清、水淀粉调匀；将盐、鸡精、白糖、胡椒粉、香油调成汁备用。"
      },
      {
        "id": "b2",
        "label": "炝香翻炒",
        "sublabel": "Stir-fry",
        "stageIndex": 1,
        "ingredientIds": [
          "i2",
          "i6",
          "i7",
          "i8",
          "i14"
        ],
        "note": "油烧热，下葱末、姜末、蒜末爆香，将鸡丁下锅，随后将已调好的汁倒入锅内，再放核桃仁炒匀即可。",
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
      "locator": "OEBPS/text00012.html#sigil_toc_id_128 · 补肾 养好先天之本，健康少生病 · 鸡丁核桃仁",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00012.html#sigil_toc_id_128"
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
    "id": "cn-72",
    "version": "3.0",
    "status": "published",
    "title": "🐟 清蒸鲢鱼",
    "description": "营养师张晔健康食谱·健脾 养好脾胃，营养吸收更全面",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "多层不锈钢蒸锅 (Steamer)",
      "preheat": "腌渍20分钟",
      "servings": "2-3 人份",
      "prepNotes": "准备20分钟 · 烹调10分钟"
    },
    "cookingTimeText": "准备20分钟 · 烹调10分钟",
    "ingredients": [
      {
        "id": "i3",
        "name": "葱段姜片",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i4",
        "name": "盐",
        "amountText": "5克",
        "category": "seasoning"
      },
      {
        "id": "i5",
        "name": "料酒",
        "amountText": "10克",
        "category": "seasoning"
      },
      {
        "id": "i6",
        "name": "胡椒粉",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i1",
        "name": "净鲢鱼1条",
        "amountText": "适量",
        "category": "main"
      },
      {
        "id": "i2",
        "name": "香菜段",
        "amountText": "20克",
        "category": "produce"
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
        "label": "切配腌浆",
        "sublabel": "Marinate",
        "stageIndex": 0,
        "ingredientIds": [
          "i3",
          "i4",
          "i5",
          "i6"
        ],
        "durationMinutes": 20,
        "note": "鲢鱼洗净，在鱼身上划几刀，用料酒、胡椒粉和盐腌渍20分钟，放在蒸盘内，在鱼身上摆好姜片、葱段。"
      },
      {
        "id": "b2",
        "label": "蒸制淋汁装盘",
        "sublabel": "Steam",
        "stageIndex": 1,
        "ingredientIds": [
          "i2",
          "i7",
          "i1"
        ],
        "heatLevel": "大火",
        "durationMinutes": 10,
        "note": "蒸锅置火上，开锅后将鱼盘放入锅内，大火蒸10分钟后，将鱼取出，拿掉葱段、姜片。锅内倒入植物油烧热，将油均匀浇在鱼身上，撒上香菜段即可。",
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
      "locator": "OEBPS/text00013.html#sigil_toc_id_129 · 健脾 养好脾胃，营养吸收更全面 · 清蒸鲢鱼",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00013.html#sigil_toc_id_129"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：鲢鱼能提供丰富的胶质蛋白，既能健身，又能美容，是女性滋养肌肤的理想食品。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-73",
    "version": "3.0",
    "status": "published",
    "title": "🥩 猪肉黄豆炖豆腐",
    "description": "营养师张晔健康食谱·健脾 养好脾胃，营养吸收更全面",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "高保温厚底砂锅 / 铸铁炖锅",
      "preheat": "泡一晚",
      "servings": "2-3 人份",
      "prepNotes": "准备10分钟 · 烹调35分钟"
    },
    "cookingTimeText": "准备10分钟 · 烹调35分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "猪五花肉",
        "amountText": "150克",
        "category": "main"
      },
      {
        "id": "i2",
        "name": "豆腐",
        "amountText": "300克",
        "category": "main"
      },
      {
        "id": "i3",
        "name": "黄豆",
        "amountText": "200克",
        "category": "produce"
      },
      {
        "id": "i4",
        "name": "雪里蕻",
        "amountText": "100克",
        "category": "produce"
      },
      {
        "id": "i5",
        "name": "盐",
        "amountText": "4克",
        "category": "seasoning"
      },
      {
        "id": "i6",
        "name": "葱段",
        "amountText": "5克",
        "category": "seasoning"
      },
      {
        "id": "i7",
        "name": "姜末",
        "amountText": "3克",
        "category": "seasoning"
      },
      {
        "id": "i8",
        "name": "花椒",
        "amountText": "2克",
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
        "label": "泡发切配焯烫",
        "sublabel": "Blanch",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2",
          "i3",
          "i4"
        ],
        "note": "黄豆用水泡一晚；将豆腐切块，放入沸水锅内烫一下，捞出，放入清水盆中；将五花肉切成丝；雪里蕻切成3厘米长的段，用温水浸泡。"
      },
      {
        "id": "b2",
        "label": "炝香炖煮",
        "sublabel": "Simmer",
        "stageIndex": 1,
        "ingredientIds": [
          "i5",
          "i6",
          "i7",
          "i8",
          "i9"
        ],
        "heatLevel": "小火",
        "durationMinutes": 35,
        "durationText": "25m + 10m",
        "note": "油烧热，用葱段、姜末炝锅，加入水、盐、花椒，放入黄豆炖25分钟，放入五花肉丝、豆腐块、雪里蕻段，用小火炖10分钟即可。",
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
      "locator": "OEBPS/text00013.html#sigil_toc_id_130 · 健脾 养好脾胃，营养吸收更全面 · 猪肉黄豆炖豆腐",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00013.html#sigil_toc_id_130"
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
    "id": "cn-74",
    "version": "3.0",
    "status": "published",
    "title": "🍳 清炒扁豆丝",
    "description": "营养师张晔健康食谱·健脾 养好脾胃，营养吸收更全面",
    "cuisine": "chinese",
    "difficulty": "medium",
    "prerequisites": {
      "containerSize": "中式熟铁炒锅 (Wok)",
      "servings": "2-3 人份",
      "prepNotes": "准备10分钟 · 烹调15分钟"
    },
    "cookingTimeText": "准备10分钟 · 烹调15分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "扁豆",
        "amountText": "300克",
        "category": "produce"
      },
      {
        "id": "i2",
        "name": "蒜",
        "amountText": "3瓣",
        "category": "seasoning"
      },
      {
        "id": "i3",
        "name": "盐",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i4",
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
        "note": "扁豆洗净，切丝；蒜瓣拍扁切碎。"
      },
      {
        "id": "b2",
        "label": "焯烫",
        "sublabel": "Blanch",
        "stageIndex": 1,
        "ingredientIds": [
          "i3"
        ],
        "note": "烧一锅水，加一小勺盐和几滴油，水开后放入扁豆丝灼一下，捞出过凉水。",
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
        "label": "炝香调味",
        "sublabel": "Sauté",
        "stageIndex": 2,
        "ingredientIds": [
          "i4"
        ],
        "note": "炒锅放油，爆香蒜末，加入扁豆丝快炒，加盐调味即可。",
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
      "locator": "OEBPS/text00013.html#sigil_toc_id_131 · 健脾 养好脾胃，营养吸收更全面 · 清炒扁豆丝",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00013.html#sigil_toc_id_131"
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
    "id": "cn-75",
    "version": "3.0",
    "status": "published",
    "title": "🥬 如意白菜卷",
    "description": "营养师张晔健康食谱·润肺 养肺清肺，多吃白色食物",
    "cuisine": "chinese",
    "difficulty": "hard",
    "prerequisites": {
      "containerSize": "多层不锈钢蒸锅 (Steamer)",
      "servings": "2-3 人份",
      "prepNotes": "准备10分钟 · 烹调15分钟"
    },
    "cookingTimeText": "准备10分钟 · 烹调15分钟",
    "ingredients": [
      {
        "id": "i2",
        "name": "猪肉",
        "amountText": "300克",
        "category": "main"
      },
      {
        "id": "i1",
        "name": "鲜白菜叶",
        "amountText": "300克",
        "category": "produce"
      },
      {
        "id": "i4",
        "name": "香油",
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
        "name": "花椒面",
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
        "name": "水淀粉",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i10",
        "name": "姜末",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i3",
        "name": "鸡蛋",
        "amountText": "100克",
        "category": "main"
      },
      {
        "id": "i9",
        "name": "葱末",
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
          "i2",
          "i4",
          "i5",
          "i6",
          "i7",
          "i8",
          "i10"
        ],
        "note": "猪肉洗净，剁成馅，加盐、花椒面、葱姜末、鸡精、水淀粉、香油搅匀成馅；鲜白菜叶洗净，烫软，捞出过凉，沥干。"
      },
      {
        "id": "b2",
        "label": "勾芡",
        "sublabel": "Thicken",
        "stageIndex": 1,
        "ingredientIds": [
          "i3"
        ],
        "note": "将鸡蛋磕入碗内，加少许水淀粉搅匀，调成糊。",
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
        "label": "组合装填蒸制切配",
        "sublabel": "Steam",
        "stageIndex": 2,
        "ingredientIds": [],
        "note": "取一片白菜叶铺在案板上，抹一层鸡蛋糊，将肉馅抹在白菜叶上，卷成圆柱形，剩余白菜叶按相同方法卷成卷，上屉蒸熟取出。凉凉，顶刀切成l厘米厚的圆片，码在盘内，共码3层。",
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
        "label": "调味装盘",
        "sublabel": "Plate",
        "stageIndex": 3,
        "ingredientIds": [
          "i9"
        ],
        "note": "锅中加适量水，加盐、鸡精，水开时用水淀粉勾芡，淋香油，浇在白菜卷上即可。",
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
      "method": "steam",
      "role": "outcome",
      "label": "完成"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00014.html#sigil_toc_id_132 · 润肺 养肺清肺，多吃白色食物 · 如意白菜卷",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00014.html#sigil_toc_id_132"
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
    "id": "cn-76",
    "version": "3.0",
    "status": "published",
    "title": "♨️ 双耳羹",
    "description": "营养师张晔健康食谱·润肺 养肺清肺，多吃白色食物",
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
        "name": "干银耳",
        "amountText": "10克",
        "category": "produce"
      },
      {
        "id": "i2",
        "name": "干黑木耳",
        "amountText": "10克",
        "category": "produce"
      },
      {
        "id": "i3",
        "name": "葱末",
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
        "name": "鸡精",
        "amountText": "适量",
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
          "i2"
        ],
        "note": "干银耳、干黑木耳分别用清水泡发，择洗干净，切碎。"
      },
      {
        "id": "b2",
        "label": "蒸制调味",
        "sublabel": "Steam",
        "stageIndex": 1,
        "ingredientIds": [
          "i3",
          "i4",
          "i5"
        ],
        "heatLevel": "大火",
        "durationMinutes": 15,
        "note": "蒸锅置火上，将银耳碎、葱末和黑木耳碎放入大碗中，倒入适量清水，入蒸锅，大火蒸15分钟，加盐和鸡精调味即可。",
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
      "locator": "OEBPS/text00014.html#sigil_toc_id_133 · 润肺 养肺清肺，多吃白色食物 · 双耳羹",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00014.html#sigil_toc_id_133"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：二者搭配蒸食具有较好的清肺润肺功效。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-77",
    "version": "3.0",
    "status": "published",
    "title": "🥩 胡萝卜雪梨炖瘦肉",
    "description": "营养师张晔健康食谱·润肺 养肺清肺，多吃白色食物",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "高保温厚底砂锅 / 铸铁炖锅",
      "servings": "2-3 人份",
      "prepNotes": "准备10分钟 · 烹调40分钟"
    },
    "cookingTimeText": "准备10分钟 · 烹调40分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "猪瘦肉",
        "amountText": "100克",
        "category": "main"
      },
      {
        "id": "i2",
        "name": "雪梨",
        "amountText": "2个",
        "category": "produce"
      },
      {
        "id": "i3",
        "name": "胡萝卜",
        "amountText": "1根",
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
          "i3"
        ],
        "note": "猪瘦肉洗净，切成小块；雪梨洗净去核，切小块；胡萝卜洗净，切片。"
      },
      {
        "id": "b2",
        "label": "炖煮煮制调味",
        "sublabel": "Boil",
        "stageIndex": 1,
        "ingredientIds": [
          "i4",
          "i5"
        ],
        "heatLevel": "大火",
        "durationMinutes": 30,
        "note": "锅中加入冷水，然后把猪瘦肉、雪梨、胡萝卜、姜片放入锅内，大火烧开，再用小火慢炖30分钟，最后加盐调味即可。",
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
      "locator": "OEBPS/text00014.html#sigil_toc_id_134 · 润肺 养肺清肺，多吃白色食物 · 胡萝卜雪梨炖瘦肉",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00014.html#sigil_toc_id_134"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：雪梨和胡萝卜、猪瘦肉一起炖，可以起到清心润肺的作用，非常适合在雾霾天气食用。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-78",
    "version": "3.0",
    "status": "published",
    "title": "🥩 荸荠炒肉丝",
    "description": "营养师张晔健康食谱·润肺 养肺清肺，多吃白色食物",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "中式熟铁炒锅 (Wok)",
      "preheat": "腌30分钟",
      "servings": "2-3 人份",
      "prepNotes": "准备30分钟 · 烹调15分钟"
    },
    "cookingTimeText": "准备30分钟 · 烹调15分钟",
    "ingredients": [
      {
        "id": "i2",
        "name": "猪里脊肉丝",
        "amountText": "100克",
        "category": "main"
      },
      {
        "id": "i1",
        "name": "荸荠",
        "amountText": "300克",
        "category": "produce"
      },
      {
        "id": "i3",
        "name": "青椒",
        "amountText": "1个",
        "category": "produce"
      },
      {
        "id": "i4",
        "name": "小米椒",
        "amountText": "2个",
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
        "name": "水淀粉",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i7",
        "name": "盐",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i8",
        "name": "麻油",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i9",
        "name": "蒜末",
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
        "label": "腌浆切配",
        "sublabel": "Prep",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2",
          "i3",
          "i4",
          "i5",
          "i6",
          "i7",
          "i8"
        ],
        "durationMinutes": 30,
        "note": "猪里脊肉丝，用老抽、盐腌30分钟，加水淀粉与麻油拌匀；荸荠去皮，切片；青椒和小米椒分别斜切成圈。"
      },
      {
        "id": "b2",
        "label": "炝香调味",
        "sublabel": "Sauté",
        "stageIndex": 1,
        "ingredientIds": [
          "i9",
          "i10"
        ],
        "heatLevel": "大火",
        "note": "油微热，煸香蒜末，入肉丝大火滑炒变色后，放荸荠片和椒圈同炒至荸荠断生，加盐调味即可。",
        "completionState": "荸荠断生",
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
      "locator": "OEBPS/text00014.html#sigil_toc_id_135 · 润肺 养肺清肺，多吃白色食物 · 荸荠炒肉丝",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00014.html#sigil_toc_id_135"
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
  }
]
