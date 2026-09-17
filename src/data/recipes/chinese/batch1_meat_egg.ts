import type { VisualRecipeV3 } from '@/types/recipeV3'

/**
 * 营养师张晔《蒸炖炒，营养师的健康食谱》原书真值 - 解馋肉蛋 (优质蛋白与脂肪)
 * 共 13 道食谱 (100% 严格原子食材建模，一人一行，无复合食材)
 */
export const BATCH1_MEAT_EGG: VisualRecipeV3[] = [
  {
    "id": "cn-01",
    "version": "3.0",
    "status": "published",
    "title": "🥩 蒜烧五花肉",
    "description": "营养师张晔健康食谱·解馋肉、蛋 为身体提供丰富的优质蛋白质和脂肪",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "高保温厚底砂锅 / 铸铁炖锅",
      "preheat": "腌渍20分钟",
      "servings": "2-3 人份",
      "prepNotes": "准备30分钟，烹饪30分钟"
    },
    "cookingTimeText": "准备30分钟，烹饪30分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "五花肉片",
        "amountText": "300克",
        "category": "main"
      },
      {
        "id": "i2",
        "name": "大蒜",
        "amountText": "1头",
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
        "name": "卷心菜丝",
        "amountText": "30克",
        "category": "produce"
      },
      {
        "id": "i4",
        "name": "葱花",
        "amountText": "10克",
        "category": "seasoning"
      },
      {
        "id": "i5",
        "name": "味极鲜酱油",
        "amountText": "25克",
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
        "name": "白糖",
        "amountText": "10克",
        "category": "seasoning"
      },
      {
        "id": "i9",
        "name": "盐",
        "amountText": "适量",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "切配拌匀腌浆",
        "sublabel": "Marinate",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2",
          "i8"
        ],
        "durationMinutes": 20,
        "note": "大蒜切丁，与除植物油外的所有调料一起放入容器中拌匀，放入猪肉片腌渍20分钟。"
      },
      {
        "id": "b2",
        "label": "炖煮装盘",
        "sublabel": "Simmer",
        "stageIndex": 1,
        "ingredientIds": [
          "i3",
          "i4",
          "i5",
          "i6",
          "i7",
          "i9"
        ],
        "heatLevel": "中火",
        "note": "平底锅放油，待油热后放入猪肉片，用中火煎至两面金黄，然后将腌汁倒入（包括葱花、蒜丁），炖至收汁即可装盘，摆上卷心菜丝配餐。",
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
      "method": "stew",
      "role": "outcome",
      "label": "完成",
      "servingInstructions": "出锅装盘"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00005.html#sigil_toc_id_11 · 解馋肉、蛋 为身体提供丰富的优质蛋白质和脂肪 · 蒜烧五花肉",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00005.html#sigil_toc_id_11"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "烹饪技巧：在煎的过程中将猪肉渗出的油用厨房纸吸干，以便减少油脂的摄入。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-02",
    "version": "3.0",
    "status": "published",
    "title": "🥩 猪肉炖粉条",
    "description": "营养师张晔健康食谱·解馋肉、蛋 为身体提供丰富的优质蛋白质和脂肪",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "高保温厚底砂锅 / 铸铁炖锅",
      "servings": "2-3 人份",
      "prepNotes": "准备15分钟 · 烹饪1分钟"
    },
    "cookingTimeText": "准备15分钟 · 烹饪1分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "五花肉",
        "amountText": "200克",
        "category": "main"
      },
      {
        "id": "i2",
        "name": "红薯粉条",
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
        "name": "酱油",
        "amountText": "10克",
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
        "name": "白糖",
        "amountText": "10克",
        "category": "seasoning"
      },
      {
        "id": "i7",
        "name": "葱段",
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
        "name": "植物油",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i10",
        "name": "盐",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i11",
        "name": "花椒",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i12",
        "name": "鸡精",
        "amountText": "适量",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "切配沥干备用泡发",
        "sublabel": "Soak",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2",
          "i3"
        ],
        "note": "土豆洗净，切块备用；五花肉切块，用沸水焯三分钟，洗净白沫；红薯粉条泡软。"
      },
      {
        "id": "b2",
        "label": "翻炒调味",
        "sublabel": "Stir-fry",
        "stageIndex": 1,
        "ingredientIds": [
          "i4",
          "i5",
          "i6",
          "i7",
          "i8",
          "i10",
          "i11",
          "i12",
          "i9"
        ],
        "heatLevel": "大火",
        "note": "油烧热，放白糖炒出糖色，加肉块炒匀，放入姜末、花椒、酱油、料酒、盐和清水，大火烧开后加粉条、土豆块，转小火炖至肉熟入味，加鸡精调味，撒上葱段即可。",
        "completionState": "肉熟入味",
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
      "locator": "OEBPS/text00005.html#sigil_toc_id_12 · 解馋肉、蛋 为身体提供丰富的优质蛋白质和脂肪 · 猪肉炖粉条",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00005.html#sigil_toc_id_12"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：尽量选择瘦肉多的五花肉，或者直接选用猪瘦肉做，以减少胆固醇的摄入。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-03",
    "version": "3.0",
    "status": "published",
    "title": "🥩 私家京酱肉丝",
    "description": "营养师张晔健康食谱·解馋肉、蛋 为身体提供丰富的优质蛋白质和脂肪",
    "cuisine": "chinese",
    "difficulty": "medium",
    "prerequisites": {
      "containerSize": "中式熟铁炒锅 (Wok)",
      "servings": "2-3 人份",
      "prepNotes": "准备20分钟 · 烹调5分钟"
    },
    "cookingTimeText": "准备20分钟 · 烹调5分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "猪里脊肉丝",
        "amountText": "250克",
        "category": "main"
      },
      {
        "id": "i2",
        "name": "胡萝卜",
        "amountText": "100克",
        "category": "produce"
      },
      {
        "id": "i3",
        "name": "黄豆芽",
        "amountText": "100克",
        "category": "produce"
      },
      {
        "id": "i6",
        "name": "水淀粉",
        "amountText": "20克",
        "category": "seasoning"
      },
      {
        "id": "i7",
        "name": "料酒",
        "amountText": "5克",
        "category": "seasoning"
      },
      {
        "id": "i8",
        "name": "盐",
        "amountText": "2克",
        "category": "seasoning"
      },
      {
        "id": "i4",
        "name": "葱白丝",
        "amountText": "50克",
        "category": "produce"
      },
      {
        "id": "i5",
        "name": "甜面酱",
        "amountText": "80克",
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
        "label": "勾芡腌浆切配",
        "sublabel": "Prep",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2",
          "i3",
          "i6",
          "i7",
          "i8"
        ],
        "note": "里脊肉丝加料酒、盐、水淀粉上浆；胡萝卜洗净，切丝；黄豆芽洗净。"
      },
      {
        "id": "b2",
        "label": "腌浆滑炒翻炒",
        "sublabel": "Stir-fry",
        "stageIndex": 1,
        "ingredientIds": [
          "i5",
          "i4",
          "i9"
        ],
        "note": "油烧热后倒入上浆的肉丝，滑熟，盛出。继续在锅中放入甜面酱，再放肉丝炒熟。",
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
        "label": "焯烫",
        "sublabel": "Blanch",
        "stageIndex": 2,
        "ingredientIds": [],
        "note": "胡萝卜丝、黄豆芽用沸水焯熟，和葱丝一起摆盘，然后将肉丝放在盘中即可。",
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
      "locator": "OEBPS/text00005.html#sigil_toc_id_13 · 解馋肉、蛋 为身体提供丰富的优质蛋白质和脂肪 · 私家京酱肉丝",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00005.html#sigil_toc_id_13"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：打破传统京酱肉丝的做法，加入胡萝卜丝、黄豆芽，均衡了蔬菜与肉的膳食比例。也可以依照个人口味加入其他蔬菜。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-04",
    "version": "3.0",
    "status": "published",
    "title": "🥩 杏鲍菇牛肉粒",
    "description": "营养师张晔健康食谱·解馋肉、蛋 为身体提供丰富的优质蛋白质和脂肪",
    "cuisine": "chinese",
    "difficulty": "medium",
    "prerequisites": {
      "containerSize": "中式熟铁炒锅 (Wok)",
      "servings": "2-3 人份",
      "prepNotes": "准备15分钟 · 烹调30分钟"
    },
    "cookingTimeText": "准备15分钟 · 烹调30分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "牛肉",
        "amountText": "200克",
        "category": "main"
      },
      {
        "id": "i2",
        "name": "杏鲍菇",
        "amountText": "100克",
        "category": "produce"
      },
      {
        "id": "i3",
        "name": "老抽",
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
        "name": "黑胡椒末",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i6",
        "name": "白糖",
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
          "i1",
          "i2"
        ],
        "note": "牛肉洗净血水，切方块；杏鲍菇洗净，切方块。"
      },
      {
        "id": "b2",
        "label": "装盘",
        "sublabel": "Plate",
        "stageIndex": 1,
        "ingredientIds": [],
        "heatLevel": "小火",
        "note": "待油烧至六七分热，将杏鲍菇分批倒入锅内小火慢炒，至四面金黄色后盛出待用。",
        "completionState": "油烧至六七分热",
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
        "label": "翻炒调味装盘",
        "sublabel": "Stir-fry",
        "stageIndex": 2,
        "ingredientIds": [
          "i3",
          "i4",
          "i5",
          "i6",
          "i7"
        ],
        "note": "锅内再倒油，油热后倒入牛肉块速翻炒，断生后倒入杏鲍菇，加入老抽、白糖，快速翻炒至肉熟，加盐炒匀，盛出后撒上黑胡椒末即可。",
        "completionState": "肉熟",
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
      "servingInstructions": "出锅装盘"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00005.html#sigil_toc_id_15 · 解馋肉、蛋 为身体提供丰富的优质蛋白质和脂肪 · 杏鲍菇牛肉粒",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00005.html#sigil_toc_id_15"
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
    "id": "cn-05",
    "version": "3.0",
    "status": "published",
    "title": "🥩 番茄炖牛腩",
    "description": "营养师张晔健康食谱·解馋肉、蛋 为身体提供丰富的优质蛋白质和脂肪",
    "cuisine": "chinese",
    "difficulty": "medium",
    "prerequisites": {
      "containerSize": "高保温厚底砂锅 / 铸铁炖锅",
      "servings": "2-3 人份",
      "prepNotes": "准备20分钟 · 烹调90分钟"
    },
    "cookingTimeText": "准备20分钟 · 烹调90分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "牛腩块",
        "amountText": "400克",
        "category": "main"
      },
      {
        "id": "i2",
        "name": "番茄",
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
        "id": "i5",
        "name": "姜末",
        "amountText": "5克",
        "category": "seasoning"
      },
      {
        "id": "i7",
        "name": "植物油",
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
        "id": "i4",
        "name": "葱末",
        "amountText": "5克",
        "category": "seasoning"
      },
      {
        "id": "i6",
        "name": "盐",
        "amountText": "4克",
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
        "note": "牛腩块洗净，入沸水中焯一下，捞出沥干；番茄洗净、去皮，一半切碎，另一半切块。",
        "completionState": "捞出沥干"
      },
      {
        "id": "b2",
        "label": "炝香翻炒煮制",
        "sublabel": "Boil",
        "stageIndex": 1,
        "ingredientIds": [
          "i3",
          "i5",
          "i8",
          "i7"
        ],
        "heatLevel": "大火",
        "note": "油烧至六成热，爆香姜末，放入番茄碎，大火翻炒之后转小火熬煮成酱，再加牛肉、酱油、料酒翻匀。",
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
          "i4",
          "i6"
        ],
        "heatLevel": "小火",
        "durationMinutes": 30,
        "note": "倒入砂锅中加水，烧开后小火炖一个小时，放番茄块、盐炖30分钟，撒葱末即可。",
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
      "locator": "OEBPS/text00005.html#sigil_toc_id_16 · 解馋肉、蛋 为身体提供丰富的优质蛋白质和脂肪 · 番茄炖牛腩",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00005.html#sigil_toc_id_16"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：牛肉搭配番茄有利于铁的吸收，也能促进牛肉中胶原蛋白的转化。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-06",
    "version": "3.0",
    "status": "published",
    "title": "🥩 金针肥牛",
    "description": "营养师张晔健康食谱·解馋肉、蛋 为身体提供丰富的优质蛋白质和脂肪",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "中式熟铁炒锅 (Wok)",
      "servings": "2-3 人份",
      "prepNotes": "准备10分钟 · 烹调5分钟"
    },
    "cookingTimeText": "准备10分钟 · 烹调5分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "肥牛片",
        "amountText": "400克",
        "category": "main"
      },
      {
        "id": "i2",
        "name": "金针菇",
        "amountText": "150克",
        "category": "produce"
      },
      {
        "id": "i5",
        "name": "水淀粉",
        "amountText": "20克",
        "category": "seasoning"
      },
      {
        "id": "i6",
        "name": "盐",
        "amountText": "4克",
        "category": "seasoning"
      },
      {
        "id": "i3",
        "name": "红尖椒碎",
        "amountText": "15克",
        "category": "produce"
      },
      {
        "id": "i4",
        "name": "高汤",
        "amountText": "50克",
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
        "name": "植物油",
        "amountText": "适量",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "勾芡拌匀切配",
        "sublabel": "Prep",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2",
          "i5",
          "i6"
        ],
        "note": "肥牛片用水淀粉、盐拌匀；金针菇去根，洗净。"
      },
      {
        "id": "b2",
        "label": "炝香勾芡",
        "sublabel": "Sauté",
        "stageIndex": 1,
        "ingredientIds": [
          "i3",
          "i4",
          "i7",
          "i8"
        ],
        "heatLevel": "六成热",
        "note": "油烧至六成热，爆香红尖椒碎，加入高汤、肥牛片和金针菇，炒至将熟，调入盐、鸡精，再用水淀粉勾芡即可。",
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
      "locator": "OEBPS/text00005.html#sigil_toc_id_17 · 解馋肉、蛋 为身体提供丰富的优质蛋白质和脂肪 · 金针肥牛",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00005.html#sigil_toc_id_17"
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
    "id": "cn-07",
    "version": "3.0",
    "status": "published",
    "title": "🥩 白萝卜羊肉卷",
    "description": "营养师张晔健康食谱·解馋肉、蛋 为身体提供丰富的优质蛋白质和脂肪",
    "cuisine": "chinese",
    "difficulty": "medium",
    "prerequisites": {
      "containerSize": "多层不锈钢蒸锅 (Steamer)",
      "preheat": "腌渍15分钟",
      "servings": "2-3 人份",
      "prepNotes": "准备20分钟 · 烹调30分钟"
    },
    "cookingTimeText": "准备20分钟 · 烹调30分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "羊肉",
        "amountText": "50克",
        "category": "main"
      },
      {
        "id": "i2",
        "name": "白萝卜",
        "amountText": "100克",
        "category": "produce"
      },
      {
        "id": "i3",
        "name": "姜末",
        "amountText": "3克",
        "category": "seasoning"
      },
      {
        "id": "i4",
        "name": "蒜末",
        "amountText": "3克",
        "category": "seasoning"
      },
      {
        "id": "i5",
        "name": "盐",
        "amountText": "2克",
        "category": "seasoning"
      },
      {
        "id": "i6",
        "name": "酱油",
        "amountText": "适量",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "切配拌匀腌浆",
        "sublabel": "Marinate",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2",
          "i3",
          "i4",
          "i5",
          "i6"
        ],
        "durationMinutes": 15,
        "note": "白萝卜洗净，切薄片，用沸水焯软；羊肉剁成馅，放入碗内，加姜末、蒜末、酱油、盐后用勺子朝一个方向搅拌均匀，腌渍15分钟。"
      },
      {
        "id": "b2",
        "label": "成型",
        "sublabel": "Shape",
        "stageIndex": 1,
        "ingredientIds": [],
        "note": "将羊肉末放在萝卜片上，卷成卷，完全包住肉末，用干净的牙签穿插固定，放进蒸盘中。",
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
        "durationMinutes": 15,
        "note": "蒸锅置火上，加水烧开后，放入盛羊肉卷的蒸盘蒸15分钟即可。",
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
      "locator": "OEBPS/text00005.html#sigil_toc_id_19 · 解馋肉、蛋 为身体提供丰富的优质蛋白质和脂肪 · 白萝卜羊肉卷",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00005.html#sigil_toc_id_19"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：白萝卜性凉，与羊肉同食不仅可以中和羊肉的温热之性，还能去除羊肉的膻味、解油腻。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-08",
    "version": "3.0",
    "status": "published",
    "title": "🥩 羊肉炖胡萝卜",
    "description": "营养师张晔健康食谱·解馋肉、蛋 为身体提供丰富的优质蛋白质和脂肪",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "高保温厚底砂锅 / 铸铁炖锅",
      "servings": "2-3 人份",
      "prepNotes": "准备15分钟 · 烹调90分钟"
    },
    "cookingTimeText": "准备15分钟 · 烹调90分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "羊肉块",
        "amountText": "150克",
        "category": "main"
      },
      {
        "id": "i2",
        "name": "胡萝卜",
        "amountText": "200克",
        "category": "produce"
      },
      {
        "id": "i3",
        "name": "枸杞子料酒大料花椒桂皮小茴香酱油香叶葱段姜片",
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
        "label": "切配",
        "sublabel": "Prep",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2"
        ],
        "note": "羊肉块洗净；胡萝卜洗净，切大块；大料、花椒、桂皮、小茴香、香叶放入调料钢球中。"
      },
      {
        "id": "b2",
        "label": "煮制调味炖煮",
        "sublabel": "Simmer",
        "stageIndex": 1,
        "ingredientIds": [
          "i3",
          "i4"
        ],
        "heatLevel": "大火",
        "durationText": "1h",
        "note": "羊肉冷水下锅，烧开后撇净血沫，下葱段、姜片、调味料钢球、料酒、酱油，大火烧开后，加胡萝卜块、枸杞子转小火慢炖1个小时，加盐调味即可。",
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
      "locator": "OEBPS/text00005.html#sigil_toc_id_20 · 解馋肉、蛋 为身体提供丰富的优质蛋白质和脂肪 · 羊肉炖胡萝卜",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00005.html#sigil_toc_id_20"
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
    "id": "cn-09",
    "version": "3.0",
    "status": "published",
    "title": "🥩 葱爆羊肉",
    "description": "营养师张晔健康食谱·解馋肉、蛋 为身体提供丰富的优质蛋白质和脂肪",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "中式熟铁炒锅 (Wok)",
      "preheat": "腌渍15分钟",
      "servings": "2-3 人份",
      "prepNotes": "准备20分钟 · 烹调5分钟"
    },
    "cookingTimeText": "准备20分钟 · 烹调5分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "羊肉",
        "amountText": "300克",
        "category": "main"
      },
      {
        "id": "i3",
        "name": "酱油",
        "amountText": "10克",
        "category": "seasoning"
      },
      {
        "id": "i4",
        "name": "料酒",
        "amountText": "10克",
        "category": "seasoning"
      },
      {
        "id": "i9",
        "name": "水淀粉",
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
        "id": "i2",
        "name": "葱段",
        "amountText": "150克",
        "category": "produce"
      },
      {
        "id": "i5",
        "name": "蒜片",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i6",
        "name": "醋",
        "amountText": "5克",
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
          "i3",
          "i4",
          "i9",
          "i10"
        ],
        "durationMinutes": 15,
        "note": "羊肉洗净，切片；取少许酱油、料酒、水淀粉、胡椒粉，与羊肉片拌匀腌渍15分钟。"
      },
      {
        "id": "b2",
        "label": "炝香翻炒拌匀",
        "sublabel": "Stir-fry",
        "stageIndex": 1,
        "ingredientIds": [
          "i2",
          "i5",
          "i6",
          "i7",
          "i8"
        ],
        "heatLevel": "大火",
        "note": "油烧热，爆香蒜片，放入羊肉片大火翻炒10秒钟后入葱段，稍翻炒后沿着锅边淋下料酒烹香，然后加酱油翻炒，再沿锅边淋醋，滴香油，炒拌均匀，至大葱断生即可。",
        "completionState": "大葱断生",
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
      "locator": "OEBPS/text00005.html#sigil_toc_id_21 · 解馋肉、蛋 为身体提供丰富的优质蛋白质和脂肪 · 葱爆羊肉",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00005.html#sigil_toc_id_21"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：葱爆羊肉补阳、强腰、健肾，适合体弱虚寒和腰膝酸软的人食用。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-10",
    "version": "3.0",
    "status": "published",
    "title": "🍗 板栗烧鸡",
    "description": "营养师张晔健康食谱·解馋肉、蛋 为身体提供丰富的优质蛋白质和脂肪",
    "cuisine": "chinese",
    "difficulty": "hard",
    "prerequisites": {
      "containerSize": "高保温厚底砂锅 / 铸铁炖锅",
      "servings": "2-3 人份",
      "prepNotes": "准备20分钟 · 烹调1小时"
    },
    "cookingTimeText": "准备20分钟 · 烹调1小时",
    "ingredients": [
      {
        "id": "i1",
        "name": "土鸡半只",
        "amountText": "适量",
        "category": "main"
      },
      {
        "id": "i3",
        "name": "干香菇",
        "amountText": "10朵",
        "category": "produce"
      },
      {
        "id": "i10",
        "name": "香葱",
        "amountText": "4根",
        "category": "seasoning"
      },
      {
        "id": "i4",
        "name": "蒜",
        "amountText": "3瓣",
        "category": "seasoning"
      },
      {
        "id": "i5",
        "name": "糖",
        "amountText": "5克",
        "category": "seasoning"
      },
      {
        "id": "i6",
        "name": "老抽",
        "amountText": "15克",
        "category": "seasoning"
      },
      {
        "id": "i7",
        "name": "料酒",
        "amountText": "15克",
        "category": "seasoning"
      },
      {
        "id": "i11",
        "name": "姜片",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i2",
        "name": "去壳板栗",
        "amountText": "400克",
        "category": "produce"
      },
      {
        "id": "i8",
        "name": "蚝油",
        "amountText": "15克",
        "category": "seasoning"
      },
      {
        "id": "i9",
        "name": "盐",
        "amountText": "5克",
        "category": "seasoning"
      },
      {
        "id": "i12",
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
          "i3",
          "i10"
        ],
        "note": "土鸡切块，洗净血水；干香菇用温水泡发；香葱取一根切段，其余的挽成结。"
      },
      {
        "id": "b2",
        "label": "翻炒",
        "sublabel": "Stir-fry",
        "stageIndex": 1,
        "ingredientIds": [],
        "heatLevel": "七成热",
        "note": "锅中倒少量油，烧到七成热后，放入鸡块煸炒，炒干血水，直到锅里没有水分。",
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
        "label": "炖煮翻炒煮制",
        "sublabel": "Boil",
        "stageIndex": 2,
        "ingredientIds": [
          "i4",
          "i5",
          "i6",
          "i7",
          "i11"
        ],
        "heatLevel": "大火",
        "note": "放入姜片、蒜瓣同炒，出香味后，放入糖、料酒、老抽翻炒均匀，再放入香菇，倒入适量开水，放入葱结后盖上盖，大火烧开后转小火慢炖至鸡肉熟软。",
        "completionState": "鸡肉熟软",
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
        "label": "炖煮调味收汁",
        "sublabel": "Simmer",
        "stageIndex": 3,
        "ingredientIds": [
          "i8",
          "i9",
          "i2",
          "i12"
        ],
        "heatLevel": "大火",
        "durationMinutes": 20,
        "note": "加入板栗，盖盖继续炖20分钟，然后调入蚝油、盐，大火收汁，撒上葱段即可。",
        "completionState": "汤汁收浓",
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
      "method": "stew",
      "role": "outcome",
      "label": "完成"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00005.html#sigil_toc_id_23 · 解馋肉、蛋 为身体提供丰富的优质蛋白质和脂肪 · 板栗烧鸡",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00005.html#sigil_toc_id_23"
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
    "id": "cn-11",
    "version": "3.0",
    "status": "published",
    "title": "🍗 宫保鸡丁",
    "description": "营养师张晔健康食谱·解馋肉、蛋 为身体提供丰富的优质蛋白质和脂肪",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "中式熟铁炒锅 (Wok)",
      "servings": "2-3 人份",
      "prepNotes": "准备10分钟 · 烹调8分钟"
    },
    "cookingTimeText": "准备10分钟 · 烹调8分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "鸡腿肉丁",
        "amountText": "250克",
        "category": "main"
      },
      {
        "id": "i4",
        "name": "鸡蛋",
        "amountText": "1个",
        "category": "main"
      },
      {
        "id": "i2",
        "name": "冬笋丁",
        "amountText": "75克",
        "category": "produce"
      },
      {
        "id": "i6",
        "name": "料酒",
        "amountText": "10克",
        "category": "seasoning"
      },
      {
        "id": "i7",
        "name": "酱油",
        "amountText": "20克",
        "category": "seasoning"
      },
      {
        "id": "i10",
        "name": "盐",
        "amountText": "3克",
        "category": "seasoning"
      },
      {
        "id": "i12",
        "name": "水淀粉",
        "amountText": "30克",
        "category": "seasoning"
      },
      {
        "id": "i15",
        "name": "白糖",
        "amountText": "2克",
        "category": "seasoning"
      },
      {
        "id": "i16",
        "name": "醋",
        "amountText": "2克",
        "category": "seasoning"
      },
      {
        "id": "i3",
        "name": "去皮炸花生仁",
        "amountText": "25克",
        "category": "produce"
      },
      {
        "id": "i5",
        "name": "干红椒段",
        "amountText": "10克",
        "category": "seasoning"
      },
      {
        "id": "i8",
        "name": "葱段",
        "amountText": "20克",
        "category": "seasoning"
      },
      {
        "id": "i9",
        "name": "姜末",
        "amountText": "3克",
        "category": "seasoning"
      },
      {
        "id": "i11",
        "name": "花椒",
        "amountText": "3克",
        "category": "seasoning"
      },
      {
        "id": "i13",
        "name": "蒜末",
        "amountText": "5克",
        "category": "seasoning"
      },
      {
        "id": "i14",
        "name": "香油",
        "amountText": "5克",
        "category": "seasoning"
      },
      {
        "id": "i17",
        "name": "植物油",
        "amountText": "适量",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "调味焯烫调汁",
        "sublabel": "Blanch",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2",
          "i4",
          "i6",
          "i7",
          "i10",
          "i12",
          "i15",
          "i16"
        ],
        "note": "鸡蛋取蛋清；鸡腿肉丁加盐、10克酱油、料酒、水淀粉、鸡蛋清抓匀；冬笋丁焯烫，控干；白糖、醋、10克酱油、水淀粉调成味汁。"
      },
      {
        "id": "b2",
        "label": "炝香翻炒",
        "sublabel": "Stir-fry",
        "stageIndex": 1,
        "ingredientIds": [
          "i5",
          "i8",
          "i9",
          "i11",
          "i13",
          "i14",
          "i3",
          "i17"
        ],
        "note": "油烧热，炒香花椒、干红辣椒段，放鸡丁、冬笋丁煸炒，炒姜末、蒜末、葱段，烹味汁，淋香油，加花生仁翻匀即可。",
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
      "locator": "OEBPS/text00005.html#sigil_toc_id_24 · 解馋肉、蛋 为身体提供丰富的优质蛋白质和脂肪 · 宫保鸡丁",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00005.html#sigil_toc_id_24"
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
    "id": "cn-12",
    "version": "3.0",
    "status": "published",
    "title": "🍗 板栗鸡丁",
    "description": "营养师张晔健康食谱·解馋肉、蛋 为身体提供丰富的优质蛋白质和脂肪",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "中式熟铁炒锅 (Wok)",
      "preheat": "腌渍3分钟",
      "servings": "2-3 人份",
      "prepNotes": "准备10分钟 · 烹调5分钟"
    },
    "cookingTimeText": "准备10分钟 · 烹调5分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "鸡腿肉丁",
        "amountText": "200克",
        "category": "main"
      },
      {
        "id": "i2",
        "name": "板栗",
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
        "id": "i6",
        "name": "酱油",
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
        "id": "i4",
        "name": "姜末",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i5",
        "name": "蒜末",
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
        "label": "调味切配",
        "sublabel": "Prep",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2",
          "i3",
          "i6",
          "i7"
        ],
        "durationMinutes": 3,
        "note": "鸡腿肉丁加盐、酱油、蚝油，搅拌均匀，腌渍3分钟；板栗煮熟，取肉对半切开。"
      },
      {
        "id": "b2",
        "label": "炝香腌浆翻炒",
        "sublabel": "Stir-fry",
        "stageIndex": 1,
        "ingredientIds": [
          "i4",
          "i5",
          "i8"
        ],
        "note": "油烧热后，爆香姜末、蒜末，放入腌渍好的鸡丁，快速翻炒，待鸡丁变色后，加入板栗块，继续翻炒至所有食材熟透即可。",
        "completionState": "鸡丁变色",
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
      "locator": "OEBPS/text00005.html#sigil_toc_id_25 · 解馋肉、蛋 为身体提供丰富的优质蛋白质和脂肪 · 板栗鸡丁",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00005.html#sigil_toc_id_25"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：板栗中含有丰富的维生素、矿物质及不饱和脂肪酸，与鸡肉丁同食，具有益气、补肾、健脾养胃、强健筋骨的功效。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-13",
    "version": "3.0",
    "status": "published",
    "title": "🥚 豆渣蒸蛋",
    "description": "营养师张晔健康食谱·解馋肉、蛋 为身体提供丰富的优质蛋白质和脂肪",
    "cuisine": "chinese",
    "difficulty": "medium",
    "prerequisites": {
      "containerSize": "多层不锈钢蒸锅 (Steamer)",
      "servings": "2-3 人份",
      "prepNotes": "准备3分钟 · 烹调10分钟"
    },
    "cookingTimeText": "准备3分钟 · 烹调10分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "豆渣",
        "amountText": "50克",
        "category": "produce"
      },
      {
        "id": "i2",
        "name": "鸡蛋",
        "amountText": "2个",
        "category": "main"
      },
      {
        "id": "i3",
        "name": "盐",
        "amountText": "2克",
        "category": "seasoning"
      },
      {
        "id": "i4",
        "name": "葱花",
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
        "label": "沥干备用",
        "sublabel": "Hold",
        "stageIndex": 0,
        "ingredientIds": [
          "i1"
        ],
        "note": "豆渣沥干水分后装入干净的盘内备用。"
      },
      {
        "id": "b2",
        "label": "调味拌匀",
        "sublabel": "Mix",
        "stageIndex": 1,
        "ingredientIds": [
          "i2",
          "i3",
          "i4"
        ],
        "note": "鸡蛋磕入碗中，加盐搅散，再倒入适量温水，加入豆渣，搅拌均匀，撒上葱花。",
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
        "label": "蒸制煮制淋汁",
        "sublabel": "Boil",
        "stageIndex": 2,
        "ingredientIds": [
          "i5"
        ],
        "heatLevel": "中火",
        "durationMinutes": 10,
        "note": "清水倒入蒸锅，烧开后，将盛有鸡蛋液的碗放入锅内，盖上锅盖，中火蒸约10分钟，取出淋上香油即可。",
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
      "servingInstructions": "取出装盘"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00005.html#sigil_toc_id_27 · 解馋肉、蛋 为身体提供丰富的优质蛋白质和脂肪 · 豆渣蒸蛋",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00005.html#sigil_toc_id_27"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "烹饪技巧：豆渣不用特意去做，豆浆机打完豆浆后，过滤的豆渣可以留起来做豆渣蒸蛋。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  }
]
