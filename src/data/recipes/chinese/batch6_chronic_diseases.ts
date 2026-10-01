import type { VisualRecipeV3 } from '@/types/recipeV3'

/**
 * 营养师张晔《蒸炖炒，营养师的健康食谱》原书真值 - 慢病调养 (三高/痛风/便秘/消化)
 * 共 24 道食谱 (100% 严格原子食材建模，一人一行，无复合食材)
 */
export const BATCH6_CHRONIC_DISEASES: VisualRecipeV3[] = [
  {
    "id": "cn-79",
    "version": "3.0",
    "status": "published",
    "title": "🍳 多味冬瓜",
    "coverImageUrl": "/recipe-covers/cn-79.webp",
    "description": "营养师张晔健康食谱·身体排毒 多摄取富含B族维生素、膳食纤维的食物",
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
        "name": "鲜虾肉",
        "amountText": "30克",
        "category": "main"
      },
      {
        "id": "i3",
        "name": "鸡蛋",
        "amountText": "1个",
        "category": "main"
      },
      {
        "id": "i5",
        "name": "瘦猪肉",
        "amountText": "50克",
        "category": "main"
      },
      {
        "id": "i2",
        "name": "鲜草菇",
        "amountText": "80克",
        "category": "produce"
      },
      {
        "id": "i4",
        "name": "冬瓜",
        "amountText": "400克",
        "category": "produce"
      },
      {
        "id": "i7",
        "name": "水淀粉",
        "amountText": "15克",
        "category": "seasoning"
      },
      {
        "id": "i6",
        "name": "料酒",
        "amountText": "15克",
        "category": "seasoning"
      },
      {
        "id": "i8",
        "name": "盐",
        "amountText": "2克",
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
        "name": "香油",
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
        "label": "切配焯烫",
        "sublabel": "Blanch",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2",
          "i3",
          "i4",
          "i5",
          "i7"
        ],
        "note": "冬瓜洗净，切成大块；瘦猪肉、鲜虾肉分别切碎，然后用水淀粉拌匀；鲜草菇洗净焯水；鸡蛋打成蛋液。"
      },
      {
        "id": "b2",
        "label": "蒸制",
        "sublabel": "Steam",
        "stageIndex": 1,
        "ingredientIds": [],
        "note": "冬瓜块放蒸锅里蒸熟软，刮出冬瓜肉，碾成泥。",
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
          "i6",
          "i8",
          "i9",
          "i10",
          "i11"
        ],
        "note": "锅内倒油，烧热后烹入料酒，放入适量的水、冬瓜泥、猪肉泥、鲜草菇、鲜虾肉泥、蛋液、盐、胡椒粉拌炒，水沸时，加水淀粉勾薄芡，滴少许香油即可。",
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
      "label": "完成",
      "servingInstructions": "盛入深盘趁热享用，冬瓜茸细腻清甜、虾肉猪肉草菇复合鲜美、利水解毒"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00015.html#sigil_toc_id_136 · 身体排毒 多摄取富含B族维生素、膳食纤维的食物 · 多味冬瓜",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00015.html#sigil_toc_id_136"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：冬瓜有利尿排毒的功效。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-80",
    "version": "3.0",
    "status": "published",
    "title": "♨️ 清蒸竹笋",
    "coverImageUrl": "/recipe-covers/cn-80.webp",
    "description": "营养师张晔健康食谱·身体排毒 多摄取富含B族维生素、膳食纤维的食物",
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
        "id": "i3",
        "name": "鸡蛋",
        "amountText": "1个",
        "category": "main"
      },
      {
        "id": "i1",
        "name": "竹笋",
        "amountText": "200克",
        "category": "produce"
      },
      {
        "id": "i2",
        "name": "鸡肉",
        "amountText": "100克",
        "category": "main"
      },
      {
        "id": "i4",
        "name": "葱末",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i5",
        "name": "姜末",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i6",
        "name": "蒜末",
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
        "name": "香油",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i10",
        "name": "胡椒粉",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i11",
        "name": "酱油",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i9",
        "name": "生抽",
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
        "note": "新鲜竹笋冲洗，去皮，将尖端去除3厘米左右，切小块；鸡蛋磕煎成鸡蛋皮，切细丝。"
      },
      {
        "id": "b2",
        "label": "切配调味",
        "sublabel": "Season",
        "stageIndex": 1,
        "ingredientIds": [
          "i2",
          "i4",
          "i5",
          "i6",
          "i7",
          "i8",
          "i10",
          "i11"
        ],
        "note": "鸡肉洗净，切碎，加葱末、姜末、蒜末、盐、香油、胡椒粉、酱油调味。",
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
        "label": "焯烫蒸制",
        "sublabel": "Steam",
        "stageIndex": 2,
        "ingredientIds": [
          "i9"
        ],
        "note": "在竹笋的每节间加鸡肉，加适量清水，放入沸水蒸锅中蒸至水干，撒上鸡蛋丝装饰即可。",
        "completionState": "水干",
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
      "servingInstructions": "整齐码盘撒金黄蛋皮丝趁热享用，竹笋清香脆嫩、鸡肉鲜嫩多汁"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00015.html#sigil_toc_id_137 · 身体排毒 多摄取富含B族维生素、膳食纤维的食物 · 清蒸竹笋",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00015.html#sigil_toc_id_137"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：竹笋富含植物纤维，能促进肠道蠕动、吸附油脂排毒；夹入鸡肉蓉蒸熟，鲜嫩爽脆、低脂高纤清肠。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-81",
    "version": "3.0",
    "status": "published",
    "title": "🦐 海带炖豆腐",
    "coverImageUrl": "/recipe-covers/cn-81.webp",
    "description": "营养师张晔健康食谱·身体排毒 多摄取富含B族维生素、膳食纤维的食物",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "高保温厚底砂锅 / 铸铁炖锅",
      "servings": "2-3 人份",
      "prepNotes": "准备10分钟 · 烹调30分钟"
    },
    "cookingTimeText": "准备10分钟 · 烹调30分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "豆腐",
        "amountText": "300克",
        "category": "main"
      },
      {
        "id": "i2",
        "name": "海带",
        "amountText": "100克",
        "category": "produce"
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
        "note": "海带洗净，切块；豆腐切大块。"
      },
      {
        "id": "b2",
        "label": "炖煮调味",
        "sublabel": "Simmer",
        "stageIndex": 1,
        "ingredientIds": [
          "i3",
          "i4",
          "i5",
          "i6"
        ],
        "heatLevel": "大火",
        "note": "油烧热，放入姜末、葱花煸香，然后放入豆腐块、海带块，加入适量清水，大火煮沸，加盐，改用小火炖到海带、豆腐入味即可。",
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
      "label": "完成",
      "servingInstructions": "盛入汤碗趁热享用，海带软烂咸鲜、豆腐滑嫩多汁"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00015.html#sigil_toc_id_138 · 身体排毒 多摄取富含B族维生素、膳食纤维的食物 · 海带炖豆腐",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00015.html#sigil_toc_id_138"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：海带能清除附着在血管壁上的胆固醇，同时还有排毒等功效。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-82",
    "version": "3.0",
    "status": "published",
    "title": "🥬 豆干炒菠菜",
    "coverImageUrl": "/recipe-covers/cn-82.webp",
    "description": "营养师张晔健康食谱·身体排毒 多摄取富含B族维生素、膳食纤维的食物",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "中式熟铁炒锅 (Wok)",
      "servings": "2-3 人份",
      "prepNotes": "准备10分钟 · 烹调15分钟"
    },
    "cookingTimeText": "准备10分钟 · 烹调15分钟",
    "ingredients": [
      {
        "id": "i2",
        "name": "豆腐干",
        "amountText": "150克",
        "category": "main"
      },
      {
        "id": "i1",
        "name": "菠菜",
        "amountText": "200克",
        "category": "produce"
      },
      {
        "id": "i3",
        "name": "盐",
        "amountText": "3克",
        "category": "seasoning"
      },
      {
        "id": "i4",
        "name": "香油",
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
        "label": "切配焯烫沥干备用",
        "sublabel": "Blanch",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2"
        ],
        "note": "菠菜择洗干净，用开水焯烫，捞出冲凉后，沥干水分，切段；豆腐干切条。"
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
        "note": "锅中放少量油，待油热后将豆腐干条放入锅中翻炒出香味，放入菠菜，翻炒几下，加入盐、香油炒匀即可。",
        "completionState": "油热",
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
      "servingInstructions": "出锅装盘趁热享用，菠菜碧绿清香、豆干柔韧咸香"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00015.html#sigil_toc_id_139 · 身体排毒 多摄取富含B族维生素、膳食纤维的食物 · 豆干炒菠菜",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00015.html#sigil_toc_id_139"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：菠菜富含膳食纤维与类胡萝卜素，豆腐干提供丰富大豆蛋白与钙质，二者同炒通肠排毒、清热解毒。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-83",
    "version": "3.0",
    "status": "published",
    "title": "🍄 西蓝花蒸蘑菇",
    "coverImageUrl": "/recipe-covers/cn-83.webp",
    "description": "营养师张晔健康食谱·延缓衰老 抗衰老，留住青春脚步",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "多层不锈钢蒸锅 (Steamer)",
      "servings": "2-3 人份",
      "prepNotes": "准备10分钟 · 烹调10分钟"
    },
    "cookingTimeText": "准备10分钟 · 烹调10分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "西蓝花",
        "amountText": "500克",
        "category": "produce"
      },
      {
        "id": "i2",
        "name": "蘑菇",
        "amountText": "100克",
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
        "name": "蚝油",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i6",
        "name": "生粉",
        "amountText": "适量",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "切配装盘蒸制",
        "sublabel": "Steam",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2"
        ],
        "durationMinutes": 10,
        "note": "食材洗净后，西蓝花撕小朵，蘑菇切丁，装盘，蒸10分钟。"
      },
      {
        "id": "b2",
        "label": "拌匀蒸制",
        "sublabel": "Steam",
        "stageIndex": 1,
        "ingredientIds": [
          "i3",
          "i4",
          "i5",
          "i6"
        ],
        "note": "将所有调料加10克清水放入锅中，快速搅拌至汤汁浓稠，浇于蒸熟的食材表面即可。",
        "completionState": "汤汁浓稠",
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
      "servingInstructions": "将浓稠蚝油芡汁均匀淋在蒸熟的西蓝花蘑菇上，清脆滑嫩趁热享用"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00016.html#sigil_toc_id_140 · 延缓衰老 抗衰老，留住青春脚步 · 西蓝花蒸蘑菇",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00016.html#sigil_toc_id_140"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：西蓝花富含维生素C与异硫氰酸酯，蘑菇富含多糖与硒元素，蒸制少油最大化保留抗氧化营养素，延缓衰老。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-84",
    "version": "3.0",
    "status": "published",
    "title": "🥩 沙茶牛肉",
    "coverImageUrl": "/recipe-covers/cn-84.webp",
    "description": "营养师张晔健康食谱·延缓衰老 抗衰老，留住青春脚步",
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
        "name": "牛肉片",
        "amountText": "300克",
        "category": "main"
      },
      {
        "id": "i5",
        "name": "淀粉",
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
        "id": "i7",
        "name": "蚝油",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i2",
        "name": "青椒丝",
        "amountText": "100克",
        "category": "produce"
      },
      {
        "id": "i3",
        "name": "沙茶酱",
        "amountText": "30克",
        "category": "seasoning"
      },
      {
        "id": "i4",
        "name": "香菜段",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i8",
        "name": "姜末",
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
        "label": "腌浆",
        "sublabel": "Marinate",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i5",
          "i6",
          "i7"
        ],
        "note": "牛肉片用料酒、蚝油、淀粉腌入味。"
      },
      {
        "id": "b2",
        "label": "炝香翻炒",
        "sublabel": "Stir-fry",
        "stageIndex": 1,
        "ingredientIds": [
          "i2",
          "i3",
          "i4",
          "i8",
          "i9"
        ],
        "note": "油烧热，爆香姜末，加牛肉片、青椒丝翻炒，再加沙茶酱炒匀，撒上香菜段即可。",
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
      "servingInstructions": "出锅装盘趁热享用，牛肉嫩滑醇厚、沙茶酱香浓郁扑鼻"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00016.html#sigil_toc_id_141 · 延缓衰老 抗衰老，留住青春脚步 · 沙茶牛肉",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00016.html#sigil_toc_id_141"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：牛肉富含肌氨酸与优质蛋白质，能强健筋骨；沙茶酱提鲜增香，搭配青椒补充维生素C，抗衰防老、增强活力。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-85",
    "version": "3.0",
    "status": "published",
    "title": "🥬 粉蒸芹菜叶",
    "coverImageUrl": "/recipe-covers/cn-85.webp",
    "description": "营养师张晔健康食谱·高血压 控制血压，预防心血管疾病",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "多层不锈钢蒸锅 (Steamer)",
      "servings": "2-3 人份",
      "prepNotes": "准备10分钟 · 烹调6分钟"
    },
    "cookingTimeText": "准备10分钟 · 烹调6分钟",
    "ingredients": [
      {
        "id": "i3",
        "name": "生抽",
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
        "name": "白糖",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i6",
        "name": "醋",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i7",
        "name": "辣椒油",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i8",
        "name": "香油",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i1",
        "name": "芹菜叶",
        "amountText": "200克",
        "category": "produce"
      },
      {
        "id": "i2",
        "name": "面粉",
        "amountText": "10克",
        "category": "produce"
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
        "label": "拌匀",
        "sublabel": "Toss",
        "stageIndex": 0,
        "ingredientIds": [
          "i3",
          "i4",
          "i5",
          "i6",
          "i7",
          "i8"
        ],
        "note": "将生抽、盐、白糖、醋、辣椒油、香油倒入碗中搅匀，再加少许凉开水拌匀成汁。"
      },
      {
        "id": "b2",
        "label": "切配拌匀蒸制",
        "sublabel": "Steam",
        "stageIndex": 1,
        "ingredientIds": [
          "i1",
          "i2",
          "i9"
        ],
        "durationText": "5–6m",
        "note": "芹菜叶洗净，放碗中，拌适量油，撒些面粉拌匀，使叶子均匀地裹上一层薄薄的面粉，上锅蒸5～6分钟，浇汁即可。",
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
      "servingInstructions": "蒸熟出锅淋上酸辣料汁趁热享用，清香扑鼻、酸辣软嫩适口"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00017.html#sigil_toc_id_143 · 高血压 控制血压，预防心血管疾病 · 粉蒸芹菜叶",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00017.html#sigil_toc_id_143"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：芹菜中含维生素P，能降低毛细血管的通透性，增加血管弹性，具有降血压、预防毛细血管破裂等功效。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-86",
    "version": "3.0",
    "status": "published",
    "title": "🥬 清炒菠菜",
    "coverImageUrl": "/recipe-covers/cn-86.webp",
    "description": "营养师张晔健康食谱·高血压 控制血压，预防心血管疾病",
    "cuisine": "chinese",
    "difficulty": "medium",
    "prerequisites": {
      "containerSize": "中式熟铁炒锅 (Wok)",
      "servings": "2-3 人份",
      "prepNotes": "准备10分钟 · 烹调2分钟"
    },
    "cookingTimeText": "准备10分钟 · 烹调2分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "菠菜",
        "amountText": "200克",
        "category": "produce"
      },
      {
        "id": "i2",
        "name": "葱花",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i5",
        "name": "植物油",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i3",
        "name": "蒜末",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i4",
        "name": "盐",
        "amountText": "2克",
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
          "i1"
        ],
        "note": "菠菜择洗干净，入沸水中焯烫30秒，捞出，过凉，切段。"
      },
      {
        "id": "b2",
        "label": "炝香翻炒",
        "sublabel": "Stir-fry",
        "stageIndex": 1,
        "ingredientIds": [
          "i2",
          "i5"
        ],
        "heatLevel": "七成热",
        "note": "炒锅置火上，倒入适量植物油，待油烧至七成热，放葱花炒香，放入菠菜翻炒均匀。",
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
          "i4"
        ],
        "note": "用盐、蒜末调味即可。",
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
      "label": "完成",
      "servingInstructions": "出锅装盘趁热享用，菠菜鲜嫩多汁、蒜香清爽解腻"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00017.html#sigil_toc_id_144 · 高血压 控制血压，预防心血管疾病 · 清炒菠菜",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00017.html#sigil_toc_id_144"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：菠菜含钾，能限制钠内流，减少应激诱导的去甲肾上腺素的释放，从而起到降压的作用。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-87",
    "version": "3.0",
    "status": "published",
    "title": "🥚 洋葱蒸蛋",
    "coverImageUrl": "/recipe-covers/cn-87.webp",
    "description": "营养师张晔健康食谱·高脂血症 调整饮食结构，清洁血液不黏稠",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "多层不锈钢蒸锅 (Steamer)",
      "servings": "2-3 人份",
      "prepNotes": "准备5分钟 · 烹调5分钟"
    },
    "cookingTimeText": "准备5分钟 · 烹调5分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "鸡蛋",
        "amountText": "2个",
        "category": "main"
      },
      {
        "id": "i3",
        "name": "盐",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i2",
        "name": "洋葱",
        "amountText": "50克",
        "category": "produce"
      },
      {
        "id": "i4",
        "name": "植物油",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i5",
        "name": "酱油",
        "amountText": "适量",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "打散拌匀",
        "sublabel": "Mix",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i3"
        ],
        "note": "鸡蛋磕开，顺着一个方向打散，加少许盐和适量清水再搅拌几下。"
      },
      {
        "id": "b2",
        "label": "切配蒸制淋汁",
        "sublabel": "Steam",
        "stageIndex": 1,
        "ingredientIds": [
          "i2",
          "i4",
          "i5"
        ],
        "durationMinutes": 5,
        "note": "洋葱洗净，切成碎末状，放入蛋液中隔水蒸5分钟，淋上一点植物油与酱油即可。",
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
      "servingInstructions": "淋上少许生抽香油趁热享用，蛋羹嫩滑如布丁、洋葱甜脆清口"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00018.html#sigil_toc_id_150 · 高脂血症 调整饮食结构，清洁血液不黏稠 · 洋葱蒸蛋",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00018.html#sigil_toc_id_150"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：洋葱含有刺激溶纤维蛋白活性成分和前列腺素，能够扩张血管、降低外周血管和心脏冠状动脉的阻力，对抗体内儿茶酚胺等升压物质、促进钠盐排泄。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-88",
    "version": "3.0",
    "status": "published",
    "title": "🐟 虾仁鱼片炖豆腐",
    "coverImageUrl": "/recipe-covers/cn-88.webp",
    "description": "营养师张晔健康食谱·高脂血症 调整饮食结构，清洁血液不黏稠",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "高保温厚底砂锅 / 铸铁炖锅",
      "servings": "2-3 人份",
      "prepNotes": "准备15分钟 · 烹调15分钟"
    },
    "cookingTimeText": "准备15分钟 · 烹调15分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "鲜虾仁",
        "amountText": "100克",
        "category": "main"
      },
      {
        "id": "i3",
        "name": "鱼肉片",
        "amountText": "50克",
        "category": "main"
      },
      {
        "id": "i4",
        "name": "嫩豆腐",
        "amountText": "200克",
        "category": "main"
      },
      {
        "id": "i2",
        "name": "青菜心",
        "amountText": "100克",
        "category": "produce"
      },
      {
        "id": "i5",
        "name": "植物油",
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
        "name": "葱末",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i8",
        "name": "姜末",
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
          "i3",
          "i4"
        ],
        "note": "将鲜虾仁、鱼肉片洗净；青菜心洗净，切段；嫩豆腐洗净，切成小块。"
      },
      {
        "id": "b2",
        "label": "炝香炖煮调味",
        "sublabel": "Simmer",
        "stageIndex": 1,
        "ingredientIds": [
          "i6",
          "i8",
          "i5",
          "i7"
        ],
        "note": "油烧热，爆香葱姜末，下青菜心稍炒，放入鲜虾仁、鱼肉片、豆腐稍炖一会儿，加盐调味即可。",
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
      "label": "完成",
      "servingInstructions": "连汤盛入大碗趁热享用，汤色清亮、海鲜鲜嫩、豆腐细滑入口即化"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00018.html#sigil_toc_id_151 · 高脂血症 调整饮食结构，清洁血液不黏稠 · 虾仁鱼片炖豆腐",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00018.html#sigil_toc_id_151"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：虾仁、鱼肉中含有较多不饱和脂肪酸，可以降低血液胆固醇；青菜含有丰富的膳食纤维，能与食物中的胆固醇及甘油三酯结合，从而减少人体对食物中脂类的吸收。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-89",
    "version": "3.0",
    "status": "published",
    "title": "🥩 牛奶蒸蛋",
    "coverImageUrl": "/recipe-covers/cn-89.webp",
    "description": "营养师张晔健康食谱·糖尿病 吃对食物，糖尿病患者也能吃得好",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "多层不锈钢蒸锅 (Steamer)",
      "servings": "2-3 人份",
      "prepNotes": "准备10分钟 · 烹调7分钟"
    },
    "cookingTimeText": "准备10分钟 · 烹调7分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "鸡蛋",
        "amountText": "2个",
        "category": "main"
      },
      {
        "id": "i2",
        "name": "鲜牛奶",
        "amountText": "200毫升",
        "category": "main"
      },
      {
        "id": "i3",
        "name": "虾仁",
        "amountText": "2个",
        "category": "main"
      },
      {
        "id": "i4",
        "name": "盐",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i5",
        "name": "香油",
        "amountText": "适量",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "调味切配",
        "sublabel": "Prep",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2",
          "i3",
          "i4"
        ],
        "note": "鸡蛋打入碗中，加鲜牛奶搅匀，再放盐化开；虾仁洗净。"
      },
      {
        "id": "b2",
        "label": "蒸制装盘淋汁",
        "sublabel": "Steam",
        "stageIndex": 1,
        "ingredientIds": [
          "i5"
        ],
        "heatLevel": "大火",
        "durationMinutes": 7,
        "durationText": "2m + 5m",
        "note": "鸡蛋液入蒸锅，大火蒸约2分钟，此时蛋羹已略成形，将虾仁摆放上面，改中火再蒸5分钟，最后出锅淋上香油即可。",
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
      "servingInstructions": "出锅淋香油趁热享用，奶香细腻软滑、虾仁爽脆弹牙"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00019.html#sigil_toc_id_152 · 糖尿病 吃对食物，糖尿病患者也能吃得好 · 牛奶蒸蛋",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00019.html#sigil_toc_id_152"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：牛奶中富含钙质，钙有刺激胰脏β细胞的作用，能够促进胰岛素的正常分泌，同时还能避免骨质疏松。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-90",
    "version": "3.0",
    "status": "published",
    "title": "🍗 海带炖鸭汤",
    "coverImageUrl": "/recipe-covers/cn-90.webp",
    "description": "营养师张晔健康食谱·糖尿病 吃对食物，糖尿病患者也能吃得好",
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
        "name": "鸭腿",
        "amountText": "250克",
        "category": "main"
      },
      {
        "id": "i2",
        "name": "苋菜",
        "amountText": "100克",
        "category": "produce"
      },
      {
        "id": "i3",
        "name": "水发海带丝",
        "amountText": "25克",
        "category": "produce"
      },
      {
        "id": "i4",
        "name": "葱花",
        "amountText": "5克",
        "category": "seasoning"
      },
      {
        "id": "i5",
        "name": "姜片",
        "amountText": "5克",
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
          "i2",
          "i3"
        ],
        "note": "鸭腿洗净，切块，入沸水锅中汆透；苋菜择洗干净，切段；海带丝洗净，切长段。"
      },
      {
        "id": "b2",
        "label": "翻炒炖煮调味",
        "sublabel": "Simmer",
        "stageIndex": 1,
        "ingredientIds": [
          "i4",
          "i5",
          "i6",
          "i7"
        ],
        "durationMinutes": 7,
        "durationText": "5m + 2m",
        "note": "油烧热，葱花、姜片、鸭块、海带丝一起下锅，翻炒5分钟，加没过食材的水，炖至鸭肉熟烂，放苋菜煮2分钟，加盐调味即可。",
        "completionState": "鸭肉熟烂",
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
      "label": "完成",
      "servingInstructions": "连汤盛入大汤碗趁热享用，鸭肉软烂醇香、海带鲜滑软糯、清润平补"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00019.html#sigil_toc_id_153 · 糖尿病 吃对食物，糖尿病患者也能吃得好 · 海带炖鸭汤",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00019.html#sigil_toc_id_153"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：海带能延缓胃排空和食物通过小肠的时间，可抑制血糖水平上升；鸭肉富含B族维生素，能补充2型糖尿病患者因胰岛素抵抗消耗的B族维生素，从而稳定血糖水平。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-91",
    "version": "3.0",
    "status": "published",
    "title": "🥔 姜汁红薯条",
    "coverImageUrl": "/recipe-covers/cn-91.webp",
    "description": "营养师张晔健康食谱·痛风 中低嘌呤饮食，补充蛋白质",
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
        "name": "红薯",
        "amountText": "300克",
        "category": "produce"
      },
      {
        "id": "i2",
        "name": "胡萝卜",
        "amountText": "50克",
        "category": "produce"
      },
      {
        "id": "i3",
        "name": "生姜",
        "amountText": "适量",
        "category": "seasoning"
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
        "name": "糖",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i7",
        "name": "葱花",
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
          "i3",
          "i4",
          "i5",
          "i6"
        ],
        "note": "红薯去皮，洗净，切成粗条；胡萝卜去皮洗净，切条；生姜去皮，切末，捣出姜汁，加盐、糖、香油调成味汁备用。"
      },
      {
        "id": "b2",
        "label": "煮制蒸制调味",
        "sublabel": "Steam",
        "stageIndex": 1,
        "ingredientIds": [
          "i7"
        ],
        "note": "蒸锅内加水煮沸，放入红薯条、胡萝卜条蒸熟，码入深盘中，将调味汁淋到红薯条、胡萝卜条上，再撒上葱花即可。",
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
      "servingInstructions": "码入深盘淋上姜汁味汁撒葱花趁热享用，红薯粉甜软糯、姜香微辣温润"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00020.html#sigil_toc_id_157 · 痛风 中低嘌呤饮食，补充蛋白质 · 姜汁红薯条",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00020.html#sigil_toc_id_157"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：红薯含有丰富的膳食纤维、钾、果胶和维生素C，能够降低血脂，平衡体内酸碱，能增加饱腹感，非常适合肥胖者食用。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-92",
    "version": "3.0",
    "status": "published",
    "title": "🧈 番茄炖豆腐",
    "coverImageUrl": "/recipe-covers/cn-92.webp",
    "description": "营养师张晔健康食谱·痛风 中低嘌呤饮食，补充蛋白质",
    "cuisine": "chinese",
    "difficulty": "medium",
    "prerequisites": {
      "containerSize": "高保温厚底砂锅 / 铸铁炖锅",
      "servings": "2-3 人份",
      "prepNotes": "准备10分钟 · 烹调20分钟"
    },
    "cookingTimeText": "准备10分钟 · 烹调20分钟",
    "ingredients": [
      {
        "id": "i2",
        "name": "豆腐",
        "amountText": "1块",
        "category": "main"
      },
      {
        "id": "i1",
        "name": "番茄",
        "amountText": "2个",
        "category": "produce"
      },
      {
        "id": "i5",
        "name": "葱花",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i3",
        "name": "盐",
        "amountText": "3克",
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
        "note": "番茄洗净切片；豆腐切成块。"
      },
      {
        "id": "b2",
        "label": "炝香翻炒",
        "sublabel": "Stir-fry",
        "stageIndex": 1,
        "ingredientIds": [
          "i4",
          "i5"
        ],
        "note": "油锅烧热，加入葱花煸香，放入番茄煸炒三四分钟，注意火候不可太大，炒至番茄呈汤汁状。",
        "completionState": "番茄呈汤汁状",
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
        "label": "炖煮煮制",
        "sublabel": "Boil",
        "stageIndex": 2,
        "ingredientIds": [
          "i3"
        ],
        "heatLevel": "大火",
        "durationMinutes": 15,
        "note": "放入豆腐，加适量水、盐，大火烧开后改中小火慢炖15分钟左右，收汤即可。",
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
      "label": "完成",
      "servingInstructions": "盛入深碗趁热享用，番茄酸甜开胃、豆腐软嫩入味"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00020.html#sigil_toc_id_158 · 痛风 中低嘌呤饮食，补充蛋白质 · 番茄炖豆腐",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00020.html#sigil_toc_id_158"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：番茄中的维生素可以调节代谢，促进尿酸的排出；豆腐营养丰富，可以抵抗体内酸化，对痛风具有一定的辅助治疗作用。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-93",
    "version": "3.0",
    "status": "published",
    "title": "🥕 纳豆炖萝卜",
    "coverImageUrl": "/recipe-covers/cn-93.webp",
    "description": "营养师张晔健康食谱·脂肪肝 控制饮酒量，预防酒精性脂肪肝",
    "cuisine": "chinese",
    "difficulty": "medium",
    "prerequisites": {
      "containerSize": "高保温厚底砂锅 / 铸铁炖锅",
      "servings": "2-3 人份",
      "prepNotes": "准备10分钟 · 烹调30分钟"
    },
    "cookingTimeText": "准备10分钟 · 烹调30分钟",
    "ingredients": [
      {
        "id": "i2",
        "name": "白萝卜",
        "amountText": "150克",
        "category": "produce"
      },
      {
        "id": "i1",
        "name": "纳豆",
        "amountText": "100克",
        "category": "produce"
      },
      {
        "id": "i3",
        "name": "花椒",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i4",
        "name": "大料",
        "amountText": "适量",
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
        "name": "生抽",
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
        "name": "盐",
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
          "i2"
        ],
        "note": "将白萝卜洗净，切小块备用。"
      },
      {
        "id": "b2",
        "label": "拌匀",
        "sublabel": "Mix",
        "stageIndex": 1,
        "ingredientIds": [
          "i1"
        ],
        "note": "将买来的纳豆用筷子搅拌几分钟，让它充分拉丝，在空气中暴露几分钟。",
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
        "label": "炖煮装盘调味",
        "sublabel": "Simmer",
        "stageIndex": 2,
        "ingredientIds": [
          "i3",
          "i4",
          "i5",
          "i6",
          "i7",
          "i8"
        ],
        "note": "锅中加水将白萝卜、花椒、大料、料酒一起入锅炖熟，盛盘，取适量纳豆拌入，再根据自己的口味调入生抽、鸡精、盐。",
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
      "label": "完成",
      "servingInstructions": "出锅装盘趁热享用，萝卜软烂清甜、纳豆拉丝醇厚护肝"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00021.html#sigil_toc_id_159 · 脂肪肝 控制饮酒量，预防酒精性脂肪肝 · 纳豆炖萝卜",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00021.html#sigil_toc_id_159"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：纳豆激酶能分担酒后肝脏的压力，缓解醉酒症状，减轻酒精对肝脏的损伤，降低酒精性脂肪肝的发生率。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-94",
    "version": "3.0",
    "status": "published",
    "title": "🥒 毛豆烧丝瓜",
    "coverImageUrl": "/recipe-covers/cn-94.webp",
    "description": "营养师张晔健康食谱·脂肪肝 控制饮酒量，预防酒精性脂肪肝",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "中式熟铁炒锅 (Wok)",
      "servings": "2-3 人份",
      "prepNotes": "准备10分钟 · 烹调15分钟"
    },
    "cookingTimeText": "准备10分钟 · 烹调15分钟",
    "ingredients": [
      {
        "id": "i2",
        "name": "毛豆粒",
        "amountText": "100克",
        "category": "produce"
      },
      {
        "id": "i1",
        "name": "丝瓜块",
        "amountText": "250克",
        "category": "produce"
      },
      {
        "id": "i3",
        "name": "葱丝",
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
        "name": "盐",
        "amountText": "5克",
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
          "i2"
        ],
        "note": "将毛豆粒洗净，焯烫后捞出沥干。",
        "completionState": "捞出沥干"
      },
      {
        "id": "b2",
        "label": "炝香调味勾芡",
        "sublabel": "Sauté",
        "stageIndex": 1,
        "ingredientIds": [
          "i1",
          "i3",
          "i4",
          "i5",
          "i6",
          "i7"
        ],
        "durationMinutes": 10,
        "note": "油锅烧热，煸香葱丝、姜末，放毛豆粒、少量水烧10分钟，下丝瓜炒软，加盐，用水淀粉勾芡即可。",
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
      "servingInstructions": "出锅装盘趁热享用，丝瓜碧绿滑嫩、毛豆甜糯爽口"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00021.html#sigil_toc_id_160 · 脂肪肝 控制饮酒量，预防酒精性脂肪肝 · 毛豆烧丝瓜",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00021.html#sigil_toc_id_160"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：毛豆中的大豆皂甙能够抑制糖分转为中性脂肪，进而改善内脏脂肪代谢，预防脂肪肝的发生。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-95",
    "version": "3.0",
    "status": "published",
    "title": "🥬 蒜蒸白菜",
    "coverImageUrl": "/recipe-covers/cn-95.webp",
    "description": "营养师张晔健康食谱·便秘 多选富含膳食纤维的食物，润肠通便",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "多层不锈钢蒸锅 (Steamer)",
      "preheat": "腌渍5分钟",
      "servings": "2-3 人份",
      "prepNotes": "准备10分钟 · 烹调5分钟"
    },
    "cookingTimeText": "准备10分钟 · 烹调5分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "白菜",
        "amountText": "200克",
        "category": "produce"
      },
      {
        "id": "i2",
        "name": "蒜蓉",
        "amountText": "20克",
        "category": "produce"
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
        "name": "鲍鱼汁",
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
          "i4"
        ],
        "durationMinutes": 5,
        "note": "白菜洗净，切成片，加盐拌匀，腌渍5分钟，待变软后用手稍微挤一挤水分，加蒜蓉、植物油拌匀，码入盘中。",
        "completionState": "变软"
      },
      {
        "id": "b2",
        "label": "蒸制拌匀",
        "sublabel": "Steam",
        "stageIndex": 1,
        "ingredientIds": [
          "i5"
        ],
        "durationMinutes": 3,
        "note": "将盘子入蒸锅蒸3分钟，取出后趁热倒入鲍鱼汁拌匀即可。",
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
      "servingInstructions": "趁热倒入鲍鱼汁拌匀享用，白菜脆嫩多汁、蒜香浓郁清口"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00022.html#sigil_toc_id_161 · 便秘 多选富含膳食纤维的食物，润肠通便 · 蒜蒸白菜",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00022.html#sigil_toc_id_161"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：白菜富含膳食纤维，能促进肠胃蠕动，帮助体内消化和排毒。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-96",
    "version": "3.0",
    "status": "published",
    "title": "🥔 香蕉土豆泥",
    "coverImageUrl": "/recipe-covers/cn-96.webp",
    "description": "营养师张晔健康食谱·便秘 多选富含膳食纤维的食物，润肠通便",
    "cuisine": "chinese",
    "difficulty": "medium",
    "prerequisites": {
      "containerSize": "多层不锈钢蒸锅 (Steamer)",
      "servings": "2-3 人份",
      "prepNotes": "准备8分钟 · 烹调25分钟"
    },
    "cookingTimeText": "准备8分钟 · 烹调25分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "香蕉",
        "amountText": "200克",
        "category": "produce"
      },
      {
        "id": "i2",
        "name": "土豆",
        "amountText": "50克",
        "category": "produce"
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
        "label": "切配",
        "sublabel": "Prep",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2"
        ],
        "note": "香蕉去皮，将果肉捣碎；土豆洗净，去皮。"
      },
      {
        "id": "b2",
        "label": "蒸制沥干备用",
        "sublabel": "Steam",
        "stageIndex": 1,
        "ingredientIds": [],
        "note": "将土豆蒸熟，取出压成泥状，放凉备用。",
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
        "label": "拌匀淋汁",
        "sublabel": "Dress",
        "stageIndex": 2,
        "ingredientIds": [
          "i3"
        ],
        "note": "将香蕉泥与土豆泥混合，淋上蜂蜜即可。",
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
      "servingInstructions": "装入甜品盅淋上蜂蜜温热享用，香甜绵密、细腻顺滑润肠"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00022.html#sigil_toc_id_162 · 便秘 多选富含膳食纤维的食物，润肠通便 · 香蕉土豆泥",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00022.html#sigil_toc_id_162"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：香蕉和土豆中的膳食纤维都比较高，可促进胃肠蠕动，预防和缓解便秘，帮助机体及时排泄代谢毒素；蜂蜜具有润肠作用，有助于缓解便秘。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-97",
    "version": "3.0",
    "status": "published",
    "title": "🥒 山药木耳炒莴笋",
    "coverImageUrl": "/recipe-covers/cn-97.webp",
    "description": "营养师张晔健康食谱·便秘 多选富含膳食纤维的食物，润肠通便",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "中式熟铁炒锅 (Wok)",
      "servings": "2-3 人份",
      "prepNotes": "准备30分钟 · 烹调8分钟"
    },
    "cookingTimeText": "准备30分钟 · 烹调8分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "莴笋",
        "amountText": "300克",
        "category": "produce"
      },
      {
        "id": "i2",
        "name": "山药片",
        "amountText": "50克",
        "category": "produce"
      },
      {
        "id": "i3",
        "name": "水发木耳",
        "amountText": "50克",
        "category": "produce"
      },
      {
        "id": "i4",
        "name": "醋",
        "amountText": "5克",
        "category": "seasoning"
      },
      {
        "id": "i5",
        "name": "葱丝",
        "amountText": "3克",
        "category": "seasoning"
      },
      {
        "id": "i6",
        "name": "白糖",
        "amountText": "3克",
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
          "i2",
          "i3"
        ],
        "note": "莴笋去叶、去皮，切片；木耳洗净，撕小朵；山药片入沸水中焯一下。"
      },
      {
        "id": "b2",
        "label": "炝香翻炒调味",
        "sublabel": "Stir-fry",
        "stageIndex": 1,
        "ingredientIds": [
          "i8",
          "i5",
          "i7",
          "i6",
          "i4"
        ],
        "note": "油锅烧热，爆香葱丝，倒莴笋片、木耳、山药片炒熟，放盐、白糖、醋调味即可。",
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
      "servingInstructions": "出锅装盘趁热享用，色泽鲜亮三色相间、清脆爽口解腻"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00022.html#sigil_toc_id_163 · 便秘 多选富含膳食纤维的食物，润肠通便 · 山药木耳炒莴笋",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00022.html#sigil_toc_id_163"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "烹饪妙招：干木耳烹调前宜用温水泡发，但是，泡发后仍紧缩在一起的部分不宜吃，应扔掉。",
      "营养笔记：莴笋富含膳食纤维与钾，山药健脾益胃，木耳润肠通便，三色相间脆嫩清爽，有效改善便秘。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-98",
    "version": "3.0",
    "status": "published",
    "title": "🍄 银耳炖木瓜",
    "coverImageUrl": "/recipe-covers/cn-98.webp",
    "description": "营养师张晔健康食谱·便秘 多选富含膳食纤维的食物，润肠通便",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "高保温厚底砂锅 / 铸铁炖锅",
      "servings": "2-3 人份",
      "prepNotes": "准备10分钟 · 烹调20分钟"
    },
    "cookingTimeText": "准备10分钟 · 烹调20分钟",
    "ingredients": [
      {
        "id": "i2",
        "name": "木瓜",
        "amountText": "350克",
        "category": "produce"
      },
      {
        "id": "i3",
        "name": "苦杏仁",
        "amountText": "10克",
        "category": "produce"
      },
      {
        "id": "i1",
        "name": "水发银耳",
        "amountText": "1大朵",
        "category": "produce"
      },
      {
        "id": "i4",
        "name": "冰糖",
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
        "note": "苦杏仁去外皮，洗净；木瓜去皮，切块；银耳去蒂，撕成片。"
      },
      {
        "id": "b2",
        "label": "炖煮",
        "sublabel": "Simmer",
        "stageIndex": 1,
        "ingredientIds": [
          "i4"
        ],
        "durationMinutes": 20,
        "note": "将准备好的材料一起放入炖煲内，加适量开水、冰糖炖20分钟即可。",
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
      "label": "完成",
      "servingInstructions": "盛入甜汤盅温热享用，木瓜软甜多汁、银耳浓稠软糯润肠"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00022.html#sigil_toc_id_164 · 便秘 多选富含膳食纤维的食物，润肠通便 · 银耳炖木瓜",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00022.html#sigil_toc_id_164"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：木瓜含有的分解酶能够促进消化，缓解消化不良引起的便秘；银耳中含有果胶，可助软化大便，有助于改善习惯性便秘。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-99",
    "version": "3.0",
    "status": "published",
    "title": "🎃 南瓜羹",
    "coverImageUrl": "/recipe-covers/cn-99.webp",
    "description": "营养师张晔健康食谱·消化不良 饮食调理，养成生活好习惯",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "多层不锈钢蒸锅 (Steamer)",
      "servings": "2-3 人份",
      "prepNotes": "准备10分钟 · 烹调30分钟"
    },
    "cookingTimeText": "准备10分钟 · 烹调30分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "南瓜",
        "amountText": "500克",
        "category": "produce"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "切配蒸制",
        "sublabel": "Steam",
        "stageIndex": 0,
        "ingredientIds": [
          "i1"
        ],
        "note": "南瓜去子、去皮，切成小块，上锅蒸熟。"
      },
      {
        "id": "b2",
        "label": "拌匀",
        "sublabel": "Mix",
        "stageIndex": 1,
        "ingredientIds": [],
        "heatLevel": "小火",
        "note": "把南瓜放入大碗中搅拌成泥状，喜欢细腻口感的可以过筛，将南瓜泥倒入小锅中，兑上200毫升清水搅拌均匀，小火加热至沸腾即可。",
        "completionState": "沸腾",
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
      "servingInstructions": "盛入小碗趁热享用，色泽金黄诱人、口感细腻醇厚暖胃"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00023.html#sigil_toc_id_168 · 消化不良 饮食调理，养成生活好习惯 · 南瓜羹",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00023.html#sigil_toc_id_168"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：南瓜能促进胆汁分泌，加强胃肠蠕动，从而帮助食物消化。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-100",
    "version": "3.0",
    "status": "published",
    "title": "🥩 羊肉炖白萝卜",
    "coverImageUrl": "/recipe-covers/cn-100.webp",
    "description": "营养师张晔健康食谱·消化不良 饮食调理，养成生活好习惯",
    "cuisine": "chinese",
    "difficulty": "medium",
    "prerequisites": {
      "containerSize": "高保温厚底砂锅 / 铸铁炖锅",
      "servings": "2-3 人份",
      "prepNotes": "准备15分钟 · 烹调30分钟"
    },
    "cookingTimeText": "准备15分钟 · 烹调30分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "白萝卜",
        "amountText": "150克",
        "category": "produce"
      },
      {
        "id": "i3",
        "name": "蒜薹",
        "amountText": "15克",
        "category": "produce"
      },
      {
        "id": "i2",
        "name": "羊肉块",
        "amountText": "50克",
        "category": "main"
      },
      {
        "id": "i4",
        "name": "姜片",
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
        "id": "i5",
        "name": "酱油",
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
          "i3"
        ],
        "note": "白萝卜洗净，切块；蒜薹洗净，切段。"
      },
      {
        "id": "b2",
        "label": "炖煮炝香",
        "sublabel": "Sauté",
        "stageIndex": 1,
        "ingredientIds": [
          "i8",
          "i4",
          "i2",
          "i6"
        ],
        "note": "油热后放入姜片、大料爆香，入羊肉块，烹入料酒，加没过食材的水一起炖。",
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
        "label": "炖煮",
        "sublabel": "Simmer",
        "stageIndex": 2,
        "ingredientIds": [
          "i5",
          "i7"
        ],
        "note": "待羊肉快熟时，加入白萝卜、盐、酱油继续炖透至入味，放入蒜薹稍炖片刻即可。",
        "completionState": "羊肉快熟",
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
      "label": "完成",
      "servingInstructions": "连汤盛入大汤碗趁热享用，羊肉酥烂无膻、萝卜清甜吸味、暖胃消食"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00023.html#sigil_toc_id_169 · 消化不良 饮食调理，养成生活好习惯 · 羊肉炖白萝卜",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00023.html#sigil_toc_id_169"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：白萝卜炖食可缓解积食腹胀；羊肉中所含的维生素A能增加消化酶的分泌，从而帮助消化。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-101",
    "version": "3.0",
    "status": "published",
    "title": "🍳 醋熘绿豆芽",
    "coverImageUrl": "/recipe-covers/cn-101.webp",
    "description": "营养师张晔健康食谱·消化不良 饮食调理，养成生活好习惯",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "中式熟铁炒锅 (Wok)",
      "servings": "2-3 人份",
      "prepNotes": "准备15分钟 · 烹调8分钟"
    },
    "cookingTimeText": "准备15分钟 · 烹调8分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "绿豆芽",
        "amountText": "300克",
        "category": "produce"
      },
      {
        "id": "i2",
        "name": "醋",
        "amountText": "10克",
        "category": "seasoning"
      },
      {
        "id": "i3",
        "name": "葱丝",
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
        "name": "植物油",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i6",
        "name": "水淀粉",
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
        "note": "将绿豆芽掐去两头，洗净，沥干。"
      },
      {
        "id": "b2",
        "label": "炝香勾芡",
        "sublabel": "Sauté",
        "stageIndex": 1,
        "ingredientIds": [
          "i2",
          "i3",
          "i4",
          "i6",
          "i5"
        ],
        "heatLevel": "大火",
        "note": "油烧热后，爆香葱丝，放入绿豆芽，大火快速翻炒，加入盐、醋调味，再颠炒几下，用水淀粉勾芡即可。",
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
      "servingInstructions": "出锅装盘趁热享用，芽体脆嫩多汁、酸香爽口开胃解腻"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00023.html#sigil_toc_id_170 · 消化不良 饮食调理，养成生活好习惯 · 醋熘绿豆芽",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00023.html#sigil_toc_id_170"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "烹饪妙招：烹调时油、盐不宜太多，要尽量保持其清淡的口味和爽口的特点。",
      "营养笔记：绿豆芽清热解毒、利水通便，加醋急火快炒不仅保护维生素C不受破坏，还能促进消化、化解积食。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-102",
    "version": "3.0",
    "status": "published",
    "title": "🥔 淮山药泥",
    "coverImageUrl": "/recipe-covers/cn-102.webp",
    "description": "营养师张晔健康食谱·咳嗽 止咳选富含维生素A、维生素C的食物",
    "cuisine": "chinese",
    "difficulty": "medium",
    "prerequisites": {
      "containerSize": "多层不锈钢蒸锅 (Steamer)",
      "servings": "2-3 人份",
      "prepNotes": "准备10分钟 · 烹调30分钟"
    },
    "cookingTimeText": "准备10分钟 · 烹调30分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "淮山药粉",
        "amountText": "200克",
        "category": "produce"
      },
      {
        "id": "i2",
        "name": "豆沙",
        "amountText": "15克",
        "category": "produce"
      },
      {
        "id": "i3",
        "name": "京糕",
        "amountText": "150克",
        "category": "produce"
      },
      {
        "id": "i4",
        "name": "白糖",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i5",
        "name": "猪油",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i6",
        "name": "水淀粉",
        "amountText": "适量",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "拌匀蒸制",
        "sublabel": "Steam",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2",
          "i3",
          "i4"
        ],
        "note": "淮山药粉加白糖、清水，搅成细泥，放碗中；京糕加工成细泥，另放一碗内，加白糖拌匀；豆沙另置一碗中。三个碗均上笼蒸熟透后，取出。"
      },
      {
        "id": "b2",
        "label": "翻炒",
        "sublabel": "Stir-fry",
        "stageIndex": 1,
        "ingredientIds": [
          "i5"
        ],
        "note": "锅置火上，倒猪油烧热，倒淮山药泥炒至浓稠时，盛在盘子的中间；油锅烧热，依次再炒京糕泥和豆沙，分别盛在淮山药泥的两边。",
        "completionState": "浓稠",
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
        "label": "勾芡淋汁装盘",
        "sublabel": "Plate",
        "stageIndex": 2,
        "ingredientIds": [
          "i6"
        ],
        "heatLevel": "大火",
        "note": "锅置大火上，加少许清水、白糖烧沸，用水淀粉勾成芡汁，浇在三泥上即可。",
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
      "servingInstructions": "盛入甜品盘浇上透明芡汁温热享用，三色分明、软糯香甜润肺生津"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00024.html#sigil_toc_id_171 · 咳嗽 止咳选富含维生素A、维生素C的食物 · 淮山药泥",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00024.html#sigil_toc_id_171"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：山药中含黏液质和皂苷，有滋润作用，可改善久咳、痰多或肺虚等症状。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  }
]
