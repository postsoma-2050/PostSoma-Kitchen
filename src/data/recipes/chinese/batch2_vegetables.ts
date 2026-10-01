import type { VisualRecipeV3 } from '@/types/recipeV3'

/**
 * 营养师张晔《蒸炖炒，营养师的健康食谱》原书真值 - 新鲜时蔬 (维生素与矿物质)
 * 共 33 道食谱 (100% 严格原子食材建模，一人一行，无复合食材)
 */
export const BATCH2_VEGETABLES: VisualRecipeV3[] = [
  {
    "id": "cn-14",
    "version": "3.0",
    "status": "published",
    "title": "🥕 粉蒸胡萝卜丝",
    "coverImageUrl": "/recipe-covers/cn-14.webp",
    "description": "营养师张晔健康食谱·新鲜时蔬 维生素、矿物质的最佳来源",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "多层不锈钢蒸锅 (Steamer)",
      "servings": "2-3 人份",
      "prepNotes": "准备15分钟 · 烹调10分钟"
    },
    "cookingTimeText": "准备15分钟 · 烹调10分钟",
    "ingredients": [
      {
        "id": "i3",
        "name": "鸡蛋",
        "amountText": "1个",
        "category": "main"
      },
      {
        "id": "i1",
        "name": "胡萝卜",
        "amountText": "200克",
        "category": "produce"
      },
      {
        "id": "i2",
        "name": "玉米面",
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
        "name": "鸡精",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i6",
        "name": "葱末",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i7",
        "name": "蒜末",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i8",
        "name": "香菜段",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i9",
        "name": "干辣椒段",
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
        "label": "切配调味拌匀",
        "sublabel": "Toss",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2",
          "i3",
          "i4",
          "i5"
        ],
        "note": "胡萝卜去皮，切细丝，鸡蛋取蛋清，放到胡萝卜丝里；将玉米面拌入胡萝卜丝中，使每根胡萝卜丝表面均匀地裹一层玉米面，再加入盐、鸡精拌匀，放入盘子中。"
      },
      {
        "id": "b2",
        "label": "蒸制拌匀",
        "sublabel": "Steam",
        "stageIndex": 1,
        "ingredientIds": [
          "i6",
          "i7",
          "i8",
          "i9",
          "i10"
        ],
        "durationMinutes": 10,
        "note": "胡萝卜丝的盘子上加盖保鲜膜，放入蒸锅中，水沸后蒸10分钟取出。依次放入香菜段、葱末、蒜末、干辣椒段，然后将烧热的油浇在干辣椒段上，拌匀即可。",
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
      "locator": "OEBPS/text00006.html#sigil_toc_id_29 · 新鲜时蔬 维生素、矿物质的最佳来源 · 粉蒸胡萝卜丝",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00006.html#sigil_toc_id_29"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：玉米面中含有赖氨酸、谷胱甘肽等物质，与胡萝卜同食，可以降低胆固醇水平，还可以预防癌症。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-15",
    "version": "3.0",
    "status": "published",
    "title": "🥩 胡萝卜牛腩煲",
    "coverImageUrl": "/recipe-covers/cn-15.webp",
    "description": "营养师张晔健康食谱·新鲜时蔬 维生素、矿物质的最佳来源",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "高保温厚底砂锅 / 铸铁炖锅",
      "servings": "2-3 人份",
      "prepNotes": "准备20分钟 · 烹调40分钟"
    },
    "cookingTimeText": "准备20分钟 · 烹调40分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "牛腩块",
        "amountText": "500克",
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
        "name": "洋葱",
        "amountText": "100克",
        "category": "produce"
      },
      {
        "id": "i4",
        "name": "料酒",
        "amountText": "15克",
        "category": "seasoning"
      },
      {
        "id": "i5",
        "name": "酱油",
        "amountText": "15克",
        "category": "seasoning"
      },
      {
        "id": "i6",
        "name": "葱段",
        "amountText": "15克",
        "category": "seasoning"
      },
      {
        "id": "i7",
        "name": "白胡椒粒",
        "amountText": "5克",
        "category": "seasoning"
      },
      {
        "id": "i8",
        "name": "蒜片",
        "amountText": "5克",
        "category": "seasoning"
      },
      {
        "id": "i9",
        "name": "盐",
        "amountText": "4克",
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
        "note": "牛腩块洗净；胡萝卜洗净，切滚刀块；洋葱去老皮，切大块。"
      },
      {
        "id": "b2",
        "label": "炝香调味",
        "sublabel": "Sauté",
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
        "heatLevel": "小火",
        "durationMinutes": 40,
        "note": "油烧热，爆香蒜片、洋葱块，放入牛腩块煸炒至表面变色，然后将牛腩块、洋葱块放入砂锅中，加水、酱油、胡萝卜块，煮开后加料酒中，盖盖调成小火焖炖40分钟至肉烂，加白胡椒粒、盐调味，撒葱段即可。",
        "completionState": "表面变色",
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
      "servingInstructions": "连砂锅趁热端上餐桌或盛入大深碗享用"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00006.html#sigil_toc_id_30 · 新鲜时蔬 维生素、矿物质的最佳来源 · 胡萝卜牛腩煲",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00006.html#sigil_toc_id_30"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：胡萝卜含有的淀粉酶可促进身体对牛腩中营养物质的吸收。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-16",
    "version": "3.0",
    "status": "published",
    "title": "🥩 私房少油鱼香肉丝",
    "coverImageUrl": "/recipe-covers/cn-16.webp",
    "description": "营养师张晔健康食谱·新鲜时蔬 维生素、矿物质的最佳来源",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "中式熟铁炒锅 (Wok)",
      "servings": "2-3 人份",
      "prepNotes": "准备15分钟 · 烹调10分钟"
    },
    "cookingTimeText": "准备15分钟 · 烹调10分钟",
    "ingredients": [
      {
        "id": "i5",
        "name": "水淀粉",
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
        "id": "i7",
        "name": "料酒",
        "amountText": "10克",
        "category": "seasoning"
      },
      {
        "id": "i8",
        "name": "醋",
        "amountText": "10克",
        "category": "seasoning"
      },
      {
        "id": "i9",
        "name": "素高汤",
        "amountText": "15克",
        "category": "seasoning"
      },
      {
        "id": "i10",
        "name": "葱花",
        "amountText": "3克",
        "category": "seasoning"
      },
      {
        "id": "i13",
        "name": "盐",
        "amountText": "3克",
        "category": "seasoning"
      },
      {
        "id": "i14",
        "name": "白糖",
        "amountText": "5克",
        "category": "seasoning"
      },
      {
        "id": "i1",
        "name": "猪肉丝",
        "amountText": "200克",
        "category": "main"
      },
      {
        "id": "i2",
        "name": "冬笋丝",
        "amountText": "80克",
        "category": "produce"
      },
      {
        "id": "i3",
        "name": "水发木耳丝",
        "amountText": "50克",
        "category": "produce"
      },
      {
        "id": "i4",
        "name": "泡椒末",
        "amountText": "10克",
        "category": "produce"
      },
      {
        "id": "i11",
        "name": "姜末",
        "amountText": "3克",
        "category": "seasoning"
      },
      {
        "id": "i12",
        "name": "蒜末",
        "amountText": "3克",
        "category": "seasoning"
      },
      {
        "id": "i15",
        "name": "植物油",
        "amountText": "适量",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "调味勾芡调汁",
        "sublabel": "Mix sauce",
        "stageIndex": 0,
        "ingredientIds": [
          "i5",
          "i6",
          "i7",
          "i8",
          "i9",
          "i10",
          "i13",
          "i14"
        ],
        "note": "将碗中调入葱花、酱油、盐、料酒、醋、白糖、部分水淀粉和素高汤，调成芡汁。"
      },
      {
        "id": "b2",
        "label": "勾芡翻炒收汁",
        "sublabel": "Stir-fry",
        "stageIndex": 1,
        "ingredientIds": [
          "i1",
          "i2",
          "i4",
          "i11",
          "i12",
          "i3",
          "i15"
        ],
        "heatLevel": "六成热",
        "note": "猪肉丝用剩余水淀粉搅匀，油锅烧至六成热时，放入肉丝迅速滑散，再加入姜末、蒜末、泡椒末爆炒出香味，倒入冬笋丝和木耳丝翻炒片刻，倒入芡汁收汁即可。",
        "completionState": "汤汁收浓",
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
      "servingInstructions": "盛盘上桌佐餐享用，酸甜微辣、脆嫩浓郁"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00006.html#sigil_toc_id_31 · 新鲜时蔬 维生素、矿物质的最佳来源 · 私房少油鱼香肉丝",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00006.html#sigil_toc_id_31"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：自家做菜时加入冬笋丝、木耳丝等多膳食纤维食物，可消油腻。三者同食，有滋阴润燥、养血驻颜、开胃健脾的功效。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-17",
    "version": "3.0",
    "status": "published",
    "title": "🍆 蒜蓉蒸茄子",
    "coverImageUrl": "/recipe-covers/cn-17.webp",
    "description": "营养师张晔健康食谱·新鲜时蔬 维生素、矿物质的最佳来源",
    "cuisine": "chinese",
    "difficulty": "medium",
    "prerequisites": {
      "containerSize": "多层不锈钢蒸锅 (Steamer)",
      "servings": "2-3 人份",
      "prepNotes": "准备5分钟 · 烹调10分钟"
    },
    "cookingTimeText": "准备5分钟 · 烹调10分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "茄子",
        "amountText": "400克",
        "category": "produce"
      },
      {
        "id": "i2",
        "name": "橄榄油",
        "amountText": "5克",
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
        "name": "葱花",
        "amountText": "5克",
        "category": "seasoning"
      },
      {
        "id": "i5",
        "name": "蒜末",
        "amountText": "10克",
        "category": "seasoning"
      },
      {
        "id": "i6",
        "name": "红辣椒丁",
        "amountText": "20克",
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
        "note": "茄子洗净，从中间剖开，切成大片，放入盘中。"
      },
      {
        "id": "b2",
        "label": "炝香调味成型",
        "sublabel": "Sauté",
        "stageIndex": 1,
        "ingredientIds": [
          "i2",
          "i3",
          "i4",
          "i5",
          "i6"
        ],
        "note": "锅内倒橄榄油烧热，加入蒜末、红辣椒丁、葱花爆香，加入盐调味制成酱汁。",
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
        "label": "炝香蒸制",
        "sublabel": "Steam",
        "stageIndex": 2,
        "ingredientIds": [],
        "heatLevel": "大火",
        "durationMinutes": 10,
        "note": "将爆香的酱汁浇在茄子片上，连盘一起放入蒸笼中，大火蒸制10分钟后取出即可。",
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
      "locator": "OEBPS/text00006.html#sigil_toc_id_33 · 新鲜时蔬 维生素、矿物质的最佳来源 · 蒜蓉蒸茄子",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00006.html#sigil_toc_id_33"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：大蒜可消炎灭菌、防癌抗癌，与茄子搭配保护心血管效果颇佳。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-18",
    "version": "3.0",
    "status": "published",
    "title": "🦐 鲜虾茄子煲",
    "coverImageUrl": "/recipe-covers/cn-18.webp",
    "description": "营养师张晔健康食谱·新鲜时蔬 维生素、矿物质的最佳来源",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "高保温厚底砂锅 / 铸铁炖锅",
      "servings": "2-3 人份",
      "prepNotes": "准备20分钟 · 烹调15分钟"
    },
    "cookingTimeText": "准备20分钟 · 烹调15分钟",
    "ingredients": [
      {
        "id": "i2",
        "name": "鲜虾",
        "amountText": "300克",
        "category": "main"
      },
      {
        "id": "i1",
        "name": "茄子",
        "amountText": "400克",
        "category": "produce"
      },
      {
        "id": "i3",
        "name": "洋葱",
        "amountText": "30克",
        "category": "seasoning"
      },
      {
        "id": "i4",
        "name": "红椒",
        "amountText": "1个",
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
        "name": "葱片",
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
        "id": "i7",
        "name": "蒜片",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i8",
        "name": "豆瓣酱",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i9",
        "name": "蚝油",
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
        "label": "切配蘸粉",
        "sublabel": "Prep & Coat",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2",
          "i3",
          "i4",
          "i10"
        ],
        "note": "茄子去蒂洗净，切长条，蘸匀干淀粉；红椒、洋葱洗净切块；鲜虾洗净，去掉虾须，挑去虾线。"
      },
      {
        "id": "b2",
        "label": "爆香炒虾",
        "sublabel": "Sauté Shrimp",
        "stageIndex": 1,
        "ingredientIds": [
          "i5",
          "i6",
          "i7",
          "i8",
          "i11"
        ],
        "heatLevel": "中大火",
        "durationMinutes": 3,
        "durationText": "3分钟",
        "note": "煲锅内倒入植物油烧热，放入葱姜蒜片及豆瓣酱大火炒香，加入鲜虾滑炒至表面变红变色盛出备用。",
        "completionState": "鲜虾变红出香",
        "dependencies": [
          {
            "sourceBlockId": "b1",
            "type": "material",
            "label": "去线鲜虾"
          }
        ],
        "inputBlockIds": [
          "b1"
        ]
      },
      {
        "id": "b3",
        "label": "煸炒茄条",
        "sublabel": "Stir-fry Eggplant",
        "stageIndex": 2,
        "ingredientIds": [
          "i9"
        ],
        "heatLevel": "中火",
        "durationMinutes": 8,
        "durationText": "5m + 3m",
        "note": "锅中放入蘸匀淀粉的茄条和蚝油，中火翻炒至茄条七分熟变软，加入红椒、洋葱块继续翻炒3分钟入味。",
        "completionState": "茄条变软七分熟",
        "dependencies": [
          {
            "sourceBlockId": "b2",
            "type": "material",
            "label": "底油底料"
          }
        ],
        "inputBlockIds": [
          "b2"
        ]
      },
      {
        "id": "b4",
        "label": "砂锅焖炖",
        "sublabel": "Simmer & Stew",
        "stageIndex": 3,
        "ingredientIds": [],
        "heatLevel": "中火",
        "durationMinutes": 4,
        "durationText": "4分钟",
        "note": "合入鲜虾，加少量温水，盖盖烧开后转中火加盖焖炖4分钟左右，至茄条软烂、浓郁入味即可。",
        "completionState": "茄条软烂入味",
        "dependencies": [
          {
            "sourceBlockId": "b3",
            "type": "material",
            "label": "合锅焖炖"
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
      "label": "完成",
      "servingInstructions": "连砂锅趁热端上餐桌，香气四溢"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00006.html#sigil_toc_id_34 · 新鲜时蔬 维生素、矿物质的最佳来源 · 鲜虾茄子煲",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00006.html#sigil_toc_id_34"
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
    "id": "cn-19",
    "version": "3.0",
    "status": "published",
    "title": "🍳 地三鲜",
    "coverImageUrl": "/recipe-covers/cn-19.webp",
    "description": "营养师张晔健康食谱·新鲜时蔬 维生素、矿物质的最佳来源",
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
        "name": "土豆块",
        "amountText": "200克",
        "category": "produce"
      },
      {
        "id": "i2",
        "name": "茄子块",
        "amountText": "200克",
        "category": "produce"
      },
      {
        "id": "i3",
        "name": "柿子椒片",
        "amountText": "100克",
        "category": "produce"
      },
      {
        "id": "i4",
        "name": "葱末",
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
        "name": "白糖",
        "amountText": "3克",
        "category": "seasoning"
      },
      {
        "id": "i7",
        "name": "蒜末",
        "amountText": "5克",
        "category": "seasoning"
      },
      {
        "id": "i8",
        "name": "老抽",
        "amountText": "8克",
        "category": "seasoning"
      },
      {
        "id": "i9",
        "name": "水淀粉",
        "amountText": "10克",
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
        "label": "炸制",
        "sublabel": "Fry",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2",
          "i3"
        ],
        "note": "锅中放油烧热，将茄子块、土豆块和柿子椒片分别过油捞出，茄子块炸至变软，土豆块炸黄，柿子椒片稍过油。",
        "completionState": "变软"
      },
      {
        "id": "b2",
        "label": "炝香勾芡",
        "sublabel": "Sauté",
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
        "durationMinutes": 5,
        "note": "锅中留少许底油，油烧热，炒香蒜末，放茄子块、土豆块，倒老抽翻炒后，加盖烧5分钟，倒柿子椒片，加白糖和盐调味，倒水淀粉勾芡，撒葱末即可。",
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
      "servingInstructions": "出锅装盘趁热享用，咸香软糯、浓油赤酱"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00006.html#sigil_toc_id_35 · 新鲜时蔬 维生素、矿物质的最佳来源 · 地三鲜",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00006.html#sigil_toc_id_35"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：土豆中富含钾，可预防高血压，保护心肌健康；柿子椒含有丰富的维生素C及微量元素，可温中散寒、开胃消食。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-20",
    "version": "3.0",
    "status": "published",
    "title": "🍅 秘制番茄酱",
    "coverImageUrl": "/recipe-covers/cn-20.webp",
    "description": "营养师张晔健康食谱·新鲜时蔬 维生素、矿物质的最佳来源",
    "cuisine": "chinese",
    "difficulty": "medium",
    "prerequisites": {
      "containerSize": "高保温厚底砂锅 / 铸铁炖锅",
      "servings": "2-3 人份",
      "prepNotes": "准备10分钟 · 烹调10分钟"
    },
    "cookingTimeText": "准备10分钟 · 烹调10分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "番茄",
        "amountText": "2个",
        "category": "produce"
      },
      {
        "id": "i2",
        "name": "冰糖",
        "amountText": "50克",
        "category": "seasoning"
      },
      {
        "id": "i3",
        "name": "柠檬",
        "amountText": "50克",
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
        "note": "将番茄清洗干净，放入开水中烫一下，取出、剥皮，去蒂切块。"
      },
      {
        "id": "b2",
        "label": "打泥榨汁沥干备用",
        "sublabel": "Hold",
        "stageIndex": 1,
        "ingredientIds": [],
        "note": "将番茄块放入榨汁机，榨成番茄汁后，装入碗内，备用。",
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
        "label": "煮制冷却",
        "sublabel": "Boil",
        "stageIndex": 2,
        "ingredientIds": [
          "i2",
          "i3"
        ],
        "heatLevel": "小火",
        "durationText": "3–4m",
        "note": "将番茄汁倒入干净的锅内，加冰糖煮开后转小火熬至比较黏稠，挤入柠檬汁，熬3～4分钟后关火，放凉，装入干净的瓶子密封保存即可。",
        "completionState": "比较黏稠",
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
      "servingInstructions": "放凉后装入干燥消毒密封罐冷藏保存"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00006.html#sigil_toc_id_37 · 新鲜时蔬 维生素、矿物质的最佳来源 · 秘制番茄酱",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00006.html#sigil_toc_id_37"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：番茄酱中含有丰富的番茄红素、天然果胶及维生素B群等，与新鲜的番茄相比，番茄酱中的番茄红素更能充分释放，从而更容易被人体吸收，也可增进食欲。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-21",
    "version": "3.0",
    "status": "published",
    "title": "🧈 减脂番茄豆腐羹",
    "coverImageUrl": "/recipe-covers/cn-21.webp",
    "description": "营养师张晔健康食谱·新鲜时蔬 维生素、矿物质的最佳来源",
    "cuisine": "chinese",
    "difficulty": "medium",
    "prerequisites": {
      "containerSize": "高保温厚底砂锅 / 铸铁炖锅",
      "servings": "2-3 人份",
      "prepNotes": "准备5分钟 · 烹调15分钟"
    },
    "cookingTimeText": "准备5分钟 · 烹调15分钟",
    "ingredients": [
      {
        "id": "i2",
        "name": "鸡蛋",
        "amountText": "2个",
        "category": "main"
      },
      {
        "id": "i1",
        "name": "番茄",
        "amountText": "2个",
        "category": "produce"
      },
      {
        "id": "i4",
        "name": "香菜",
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
        "id": "i3",
        "name": "内酯豆腐1盒",
        "amountText": "适量",
        "category": "main"
      },
      {
        "id": "i5",
        "name": "葱花",
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
          "i4",
          "i6"
        ],
        "note": "鸡蛋打入碗中，加入少许盐搅打均匀；番茄洗净，切块；香菜、葱洗净切末。"
      },
      {
        "id": "b2",
        "label": "炝香成型",
        "sublabel": "Sauté",
        "stageIndex": 1,
        "ingredientIds": [
          "i3",
          "i5",
          "i7",
          "i8"
        ],
        "heatLevel": "大火",
        "durationMinutes": 5,
        "note": "锅中加油，烧至七成热下葱末爆香，放入番茄块充分炒出汁，倒入没过食材的清水，大火烧开后转小火炖5分钟，将内酯豆腐用手捏成小块，放入锅中，调大火烧开。",
        "completionState": "七成热下葱末爆香",
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
        "label": "焖烧",
        "sublabel": "Braise",
        "stageIndex": 2,
        "ingredientIds": [],
        "durationMinutes": 5,
        "note": "关火，沿锅边转圈倒入蛋液，盖上盖子闷5分钟，然后打开锅盖用筷子稍微一搅，自然呈絮状，撒上香菜末即可。",
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
      "servingInstructions": "盛入汤碗趁热享用，蛋花如絮、酸甜嫩滑"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00006.html#sigil_toc_id_38 · 新鲜时蔬 维生素、矿物质的最佳来源 · 减脂番茄豆腐羹",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00006.html#sigil_toc_id_38"
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
    "id": "cn-22",
    "version": "3.0",
    "status": "published",
    "title": "🍗 番茄炒鸡蛋",
    "coverImageUrl": "/recipe-covers/cn-22.webp",
    "description": "营养师张晔健康食谱·新鲜时蔬 维生素、矿物质的最佳来源",
    "cuisine": "chinese",
    "difficulty": "medium",
    "prerequisites": {
      "containerSize": "中式熟铁炒锅 (Wok)",
      "servings": "2-3 人份",
      "prepNotes": "准备5分钟 · 烹调5分钟"
    },
    "cookingTimeText": "准备5分钟 · 烹调5分钟",
    "ingredients": [
      {
        "id": "i2",
        "name": "鸡蛋",
        "amountText": "2个",
        "category": "main"
      },
      {
        "id": "i1",
        "name": "番茄",
        "amountText": "250克",
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
        "name": "白糖",
        "amountText": "5克",
        "category": "seasoning"
      },
      {
        "id": "i5",
        "name": "盐",
        "amountText": "4克",
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
        "label": "打散切配",
        "sublabel": "Prep",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2"
        ],
        "note": "将鸡蛋磕入碗中，打散；番茄洗净，切块。"
      },
      {
        "id": "b2",
        "label": "翻炒装盘",
        "sublabel": "Stir-fry",
        "stageIndex": 1,
        "ingredientIds": [],
        "note": "油烧热，下蛋液炒至表面焦黄，炒散，盛出。",
        "completionState": "表面焦黄",
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
        "label": "炝香翻炒",
        "sublabel": "Stir-fry",
        "stageIndex": 2,
        "ingredientIds": [
          "i3",
          "i4",
          "i5",
          "i6"
        ],
        "note": "锅中再次放油烧热，爆香葱花，放入番茄块翻炒，待番茄出汁，放白糖翻炒，放入鸡蛋碎、盐，翻炒均匀即可。",
        "completionState": "番茄出汁",
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
      "servingInstructions": "盛盘趁热享用，红黄相间、软嫩多汁"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00006.html#sigil_toc_id_39 · 新鲜时蔬 维生素、矿物质的最佳来源 · 番茄炒鸡蛋",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00006.html#sigil_toc_id_39"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：番茄中的维生素C具有抗氧化的作用，与含有维生素E的鸡蛋一起食用，可以护肤、抗衰老、促进血液循环。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-23",
    "version": "3.0",
    "status": "published",
    "title": "🥩 萝卜丝蒸牛肉",
    "coverImageUrl": "/recipe-covers/cn-23.webp",
    "description": "营养师张晔健康食谱·新鲜时蔬 维生素、矿物质的最佳来源",
    "cuisine": "chinese",
    "difficulty": "medium",
    "prerequisites": {
      "containerSize": "多层不锈钢蒸锅 (Steamer)",
      "preheat": "腌渍20分钟",
      "servings": "2-3 人份",
      "prepNotes": "准备20分钟 · 烹调30分钟"
    },
    "cookingTimeText": "准备20分钟 · 烹调30分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "牛肉丝",
        "amountText": "200克",
        "category": "main"
      },
      {
        "id": "i2",
        "name": "萝卜丝",
        "amountText": "300克",
        "category": "produce"
      },
      {
        "id": "i3",
        "name": "茶油",
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
        "name": "老抽",
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
        "name": "白糖",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i8",
        "name": "黄酒",
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
        "name": "辣椒粉",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i12",
        "name": "蒜末",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i13",
        "name": "姜末",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i15",
        "name": "米粉",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i11",
        "name": "鸡精",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i14",
        "name": "葱花",
        "amountText": "适量",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "腌浆拌匀",
        "sublabel": "Toss",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2",
          "i3",
          "i4",
          "i5",
          "i6",
          "i7",
          "i8",
          "i9",
          "i10",
          "i12",
          "i13",
          "i15"
        ],
        "durationMinutes": 20,
        "note": "牛肉丝用盐、老抽、生抽、白糖、黄酒、胡椒粉和茶油腌渍20分钟；萝卜丝用盐腌几分钟，挤出汁水，放到碗里，加牛肉丝、姜末、蒜末、米粉、辣椒粉拌匀。"
      },
      {
        "id": "b2",
        "label": "组合装填蒸制",
        "sublabel": "Steam",
        "stageIndex": 1,
        "ingredientIds": [],
        "durationMinutes": 30,
        "note": "把牛肉萝卜丝顺蒸锅内壁围一圈，屉布盖在牛肉萝卜丝上，盖上锅盖，水沸后蒸30分钟。",
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
        "label": "装盘",
        "sublabel": "Plate",
        "stageIndex": 2,
        "ingredientIds": [
          "i11",
          "i14"
        ],
        "note": "把蒸好的牛肉萝卜丝倒进一深口碗里，再把深口碗反扣到另一浅口碗，使倒出的牛肉萝卜丝成似碗的圆形，表面撒上葱花和鸡精，烧热两勺茶油，浇淋在牛肉萝卜丝上即可。",
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
      "servingInstructions": "反扣大盘淋上滚烫茶油，趁热享用"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00006.html#sigil_toc_id_41 · 新鲜时蔬 维生素、矿物质的最佳来源 · 萝卜丝蒸牛肉",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00006.html#sigil_toc_id_41"
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
    "id": "cn-24",
    "version": "3.0",
    "status": "published",
    "title": "🥩 冬瓜薏米排骨汤",
    "coverImageUrl": "/recipe-covers/cn-24.webp",
    "description": "营养师张晔健康食谱·新鲜时蔬 维生素、矿物质的最佳来源",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "高保温厚底砂锅 / 铸铁炖锅",
      "preheat": "泡一晚",
      "servings": "2-3 人份",
      "prepNotes": "准备15分钟 · 烹调20分钟"
    },
    "cookingTimeText": "准备15分钟 · 烹调20分钟",
    "ingredients": [
      {
        "id": "i2",
        "name": "排骨",
        "amountText": "500克",
        "category": "main"
      },
      {
        "id": "i1",
        "name": "冬瓜",
        "amountText": "500克",
        "category": "produce"
      },
      {
        "id": "i3",
        "name": "薏米",
        "amountText": "50克",
        "category": "produce"
      },
      {
        "id": "i4",
        "name": "葱段姜片",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i5",
        "name": "蒜瓣",
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
        "name": "盐",
        "amountText": "5克",
        "category": "seasoning"
      },
      {
        "id": "i8",
        "name": "料酒",
        "amountText": "50克",
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
          "i3"
        ],
        "note": "排骨切段，用沸水焯烫去血沫；冬瓜去皮，切块；薏米洗净，泡一晚。"
      },
      {
        "id": "b2",
        "label": "炖煮煮制调味",
        "sublabel": "Boil",
        "stageIndex": 1,
        "ingredientIds": [
          "i4",
          "i5",
          "i7",
          "i8",
          "i6"
        ],
        "heatLevel": "大火",
        "durationText": "1h + 20m",
        "note": "取砂锅，放入排骨、薏米、葱段、姜片、蒜瓣、料酒，加没过食材的清水，大火烧沸后转小火慢炖1小时，将冬瓜下锅，转大火将汤烧开，加盐，再转小火慢炖20分钟即可关火。",
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
      "servingInstructions": "连汤盛入大瓷盆趁热享用，汤清味美、清热利湿"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00006.html#sigil_toc_id_43 · 新鲜时蔬 维生素、矿物质的最佳来源 · 冬瓜薏米排骨汤",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00006.html#sigil_toc_id_43"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：冬瓜高钾低钠，且维生素C含量高；薏米中含有一定的维生素E，有助于改善肤色，使皮肤光泽细腻。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-25",
    "version": "3.0",
    "status": "published",
    "title": "🎃 红枣百合蒸南瓜",
    "coverImageUrl": "/recipe-covers/cn-25.webp",
    "description": "营养师张晔健康食谱·新鲜时蔬 维生素、矿物质的最佳来源",
    "cuisine": "chinese",
    "difficulty": "hard",
    "prerequisites": {
      "containerSize": "多层不锈钢蒸锅 (Steamer)",
      "servings": "2-3 人份",
      "prepNotes": "准备15分钟 · 烹调20分钟"
    },
    "cookingTimeText": "准备15分钟 · 烹调20分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "南瓜",
        "amountText": "700克",
        "category": "produce"
      },
      {
        "id": "i2",
        "name": "红枣",
        "amountText": "40克",
        "category": "produce"
      },
      {
        "id": "i3",
        "name": "鲜百合",
        "amountText": "40克",
        "category": "produce"
      },
      {
        "id": "i4",
        "name": "蜂蜜",
        "amountText": "20克",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "成型",
        "sublabel": "Shape",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2",
          "i3"
        ],
        "note": "南瓜去子，用不锈钢汤匙挖干净里面的瓜瓤，削去外皮，做成一个南瓜碗；红枣清洗干净去核；鲜百合清洗后，一片片分开。"
      },
      {
        "id": "b2",
        "label": "组合装填",
        "sublabel": "Assemble",
        "stageIndex": 1,
        "ingredientIds": [],
        "note": "把红枣、百合装进南瓜碗里面。",
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
        "durationMinutes": 20,
        "note": "蒸锅里放一个蒸架，水烧开后，把南瓜碗放在蒸架上，用中火蒸20分钟。",
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
        "label": "冷却装盘",
        "sublabel": "Plate",
        "stageIndex": 3,
        "ingredientIds": [],
        "note": "等稍凉后，把南瓜碗移到碟子上。",
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
      },
      {
        "id": "b5",
        "label": "拌匀切配淋汁",
        "sublabel": "Dress",
        "stageIndex": 4,
        "ingredientIds": [
          "i4"
        ],
        "note": "把碗里的汁水倒出来和蜂蜜搅拌在一起，用刀切开南瓜碗，淋上蜂蜜汁即可。",
        "dependencies": [
          {
            "sourceBlockId": "b4",
            "type": "material",
            "label": "承接前序处理物"
          }
        ],
        "inputBlockIds": [
          "b4"
        ]
      }
    ],
    "finalBlock": {
      "method": "steam",
      "role": "outcome",
      "label": "完成",
      "servingInstructions": "切开南瓜碗淋上蜂蜜原汁，温热甜润享用"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00006.html#sigil_toc_id_45 · 新鲜时蔬 维生素、矿物质的最佳来源 · 红枣百合蒸南瓜",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00006.html#sigil_toc_id_45"
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
    "id": "cn-26",
    "version": "3.0",
    "status": "published",
    "title": "🥒 黄瓜炒甜椒",
    "coverImageUrl": "/recipe-covers/cn-26.webp",
    "description": "营养师张晔健康食谱·新鲜时蔬 维生素、矿物质的最佳来源",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "中式熟铁炒锅 (Wok)",
      "servings": "2-3 人份",
      "prepNotes": "准备10分钟 · 烹调3分钟"
    },
    "cookingTimeText": "准备10分钟 · 烹调3分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "黄瓜",
        "amountText": "250克",
        "category": "produce"
      },
      {
        "id": "i2",
        "name": "红甜椒",
        "amountText": "50克",
        "category": "produce"
      },
      {
        "id": "i3",
        "name": "黄甜椒",
        "amountText": "50克",
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
        "name": "盐",
        "amountText": "2克",
        "category": "seasoning"
      },
      {
        "id": "i6",
        "name": "鸡精",
        "amountText": "1克",
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
          "i2",
          "i3"
        ],
        "note": "红甜椒、黄甜椒分别洗净，去蒂，去子，切片；黄瓜洗净，去蒂，切片。"
      },
      {
        "id": "b2",
        "label": "炝香翻炒调味",
        "sublabel": "Stir-fry",
        "stageIndex": 1,
        "ingredientIds": [
          "i4",
          "i5",
          "i6",
          "i7"
        ],
        "heatLevel": "六成热",
        "durationMinutes": 3,
        "note": "炒锅放置火上，倒入适量油，待油烧至六成热时，放入葱花炒香，然后倒入红甜椒片、黄甜椒片和黄瓜片翻炒3分钟，用盐和鸡精调味即可。",
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
      "servingInstructions": "出锅装盘趁热享用，爽脆清口、色泽艳丽"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00006.html#sigil_toc_id_47 · 新鲜时蔬 维生素、矿物质的最佳来源 · 黄瓜炒甜椒",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00006.html#sigil_toc_id_47"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "烹饪技巧：黄瓜加甜椒的组合不局限于炒，也可以切丝凉拌。凉拌时，可以在现有的调料基础上加适量糖、醋，做成酸甜口味的。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-27",
    "version": "3.0",
    "status": "published",
    "title": "🥒 苦瓜冬菇骨汤",
    "coverImageUrl": "/recipe-covers/cn-27.webp",
    "description": "营养师张晔健康食谱·新鲜时蔬 维生素、矿物质的最佳来源",
    "cuisine": "chinese",
    "difficulty": "medium",
    "prerequisites": {
      "containerSize": "高保温厚底砂锅 / 铸铁炖锅",
      "servings": "2-3 人份",
      "prepNotes": "准备3小时 · 烹调1.5小时"
    },
    "cookingTimeText": "准备3小时 · 烹调1.5小时",
    "ingredients": [
      {
        "id": "i3",
        "name": "冬菇",
        "amountText": "100克",
        "category": "produce"
      },
      {
        "id": "i5",
        "name": "黄豆",
        "amountText": "20克",
        "category": "produce"
      },
      {
        "id": "i2",
        "name": "排骨块",
        "amountText": "200克",
        "category": "main"
      },
      {
        "id": "i1",
        "name": "苦瓜",
        "amountText": "200克",
        "category": "produce"
      },
      {
        "id": "i4",
        "name": "山药",
        "amountText": "20克",
        "category": "produce"
      },
      {
        "id": "i6",
        "name": "盐姜片",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i7",
        "name": "蒜瓣",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i8",
        "name": "香菜段",
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
          "i3",
          "i5"
        ],
        "durationText": "3h",
        "note": "黄豆用清水泡3小时；冬菇洗净、泡发。"
      },
      {
        "id": "b2",
        "label": "沥干备用切配",
        "sublabel": "Prep",
        "stageIndex": 1,
        "ingredientIds": [
          "i1",
          "i2",
          "i4"
        ],
        "note": "排骨块清洗干净、去掉血水，捞出沥干；苦瓜洗净，去瓤，切块；山药洗净、切块。",
        "completionState": "捞出沥干",
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
        "label": "煮制炖煮调味",
        "sublabel": "Simmer",
        "stageIndex": 2,
        "ingredientIds": [
          "i7",
          "i8",
          "i6"
        ],
        "heatLevel": "大火",
        "durationMinutes": 80,
        "durationText": "40m + 40m",
        "note": "煲锅内放清水烧开，放入排骨块大火煮沸后，转小火炖40分钟，放入苦瓜块、冬菇、姜片、蒜瓣、黄豆、山药，调入盐，用小火再炖约40分钟至所有食材熟透，撒上香菜段即可。",
        "completionState": "所有食材熟透",
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
      "servingInstructions": "连煲端上餐桌或盛入大深碗趁热享用"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00006.html#sigil_toc_id_49 · 新鲜时蔬 维生素、矿物质的最佳来源 · 苦瓜冬菇骨汤",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00006.html#sigil_toc_id_49"
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
    "id": "cn-28",
    "version": "3.0",
    "status": "published",
    "title": "🥚 苦瓜蒸咸蛋",
    "coverImageUrl": "/recipe-covers/cn-28.webp",
    "description": "营养师张晔健康食谱·新鲜时蔬 维生素、矿物质的最佳来源",
    "cuisine": "chinese",
    "difficulty": "medium",
    "prerequisites": {
      "containerSize": "多层不锈钢蒸锅 (Steamer)",
      "servings": "2-3 人份",
      "prepNotes": "准备15分钟 · 烹调10分钟"
    },
    "cookingTimeText": "准备15分钟 · 烹调10分钟",
    "ingredients": [
      {
        "id": "i2",
        "name": "咸鸭蛋",
        "amountText": "1个",
        "category": "main"
      },
      {
        "id": "i1",
        "name": "苦瓜",
        "amountText": "200克",
        "category": "produce"
      },
      {
        "id": "i3",
        "name": "蚝油",
        "amountText": "10克",
        "category": "seasoning"
      },
      {
        "id": "i8",
        "name": "姜末",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i4",
        "name": "香油",
        "amountText": "4克",
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
        "name": "鸡粉",
        "amountText": "2克",
        "category": "seasoning"
      },
      {
        "id": "i7",
        "name": "葱花",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i9",
        "name": "水淀粉",
        "amountText": "适量",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "切配蒸制拌匀",
        "sublabel": "Steam",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2",
          "i3"
        ],
        "note": "苦瓜洗净，横切成厚片，中间抠一个小孔；咸鸭蛋蒸熟取出蛋黄，碾成末，与蚝油、蒜末放入一个碗内，拌匀。"
      },
      {
        "id": "b2",
        "label": "拌匀组合装填蒸制",
        "sublabel": "Steam",
        "stageIndex": 1,
        "ingredientIds": [
          "i8"
        ],
        "durationMinutes": 10,
        "note": "将拌匀后的咸蛋黄碎填入苦瓜片的小孔里，摆在蒸盘上，放入蒸锅内，盖上锅盖蒸10分钟左右至食材熟透，取出。",
        "completionState": "食材熟透",
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
        "label": "勾芡装盘",
        "sublabel": "Plate",
        "stageIndex": 2,
        "ingredientIds": [
          "i4",
          "i5",
          "i6",
          "i7",
          "i9"
        ],
        "note": "锅内放水淀粉、香油、鸡粉、盐，调制成芡汁浇在苦瓜片上面，最后撒上葱花即可。",
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
      "servingInstructions": "整齐码盘淋上薄芡葱花，咸香清苦温润享用"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00006.html#sigil_toc_id_50 · 新鲜时蔬 维生素、矿物质的最佳来源 · 苦瓜蒸咸蛋",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00006.html#sigil_toc_id_50"
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
    "id": "cn-29",
    "version": "3.0",
    "status": "published",
    "title": "🥩 苦瓜肉片",
    "coverImageUrl": "/recipe-covers/cn-29.webp",
    "description": "营养师张晔健康食谱·新鲜时蔬 维生素、矿物质的最佳来源",
    "cuisine": "chinese",
    "difficulty": "medium",
    "prerequisites": {
      "containerSize": "中式熟铁炒锅 (Wok)",
      "preheat": "腌渍10分钟",
      "servings": "2-3 人份",
      "prepNotes": "准备10分钟 · 烹调5分钟"
    },
    "cookingTimeText": "准备10分钟 · 烹调5分钟",
    "ingredients": [
      {
        "id": "i2",
        "name": "牛肉",
        "amountText": "250克",
        "category": "main"
      },
      {
        "id": "i1",
        "name": "苦瓜",
        "amountText": "200克",
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
        "name": "酱油",
        "amountText": "15克",
        "category": "seasoning"
      },
      {
        "id": "i6",
        "name": "水淀粉",
        "amountText": "15克",
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
        "name": "胡椒粉",
        "amountText": "3克",
        "category": "seasoning"
      },
      {
        "id": "i5",
        "name": "豆豉",
        "amountText": "15克",
        "category": "seasoning"
      },
      {
        "id": "i7",
        "name": "蒜末",
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
        "id": "i11",
        "name": "植物油",
        "amountText": "适量",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "切配勾芡腌浆",
        "sublabel": "Marinate",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2",
          "i3",
          "i4",
          "i6",
          "i9",
          "i10"
        ],
        "durationMinutes": 10,
        "note": "牛肉洗净，切片，加料酒、酱油、胡椒粉、盐和水淀粉腌渍片刻；苦瓜去瓤，切片，用盐腌渍10分钟，挤出水分。"
      },
      {
        "id": "b2",
        "label": "翻炒",
        "sublabel": "Stir-fry",
        "stageIndex": 1,
        "ingredientIds": [],
        "note": "锅内倒油烧热，放牛肉片炒至变色，盛起。",
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
      },
      {
        "id": "b3",
        "label": "炝香翻炒",
        "sublabel": "Stir-fry",
        "stageIndex": 2,
        "ingredientIds": [
          "i5",
          "i7",
          "i8",
          "i11"
        ],
        "note": "锅留底油烧热，爆香蒜末、姜末、豆豉，倒苦瓜煸炒，加牛肉翻炒熟即可。",
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
      "servingInstructions": "出锅装盘趁热享用，豉香浓郁、苦甘爽脆"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00006.html#sigil_toc_id_51 · 新鲜时蔬 维生素、矿物质的最佳来源 · 苦瓜肉片",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00006.html#sigil_toc_id_51"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：苦瓜中的维生素C和牛肉中的铁搭配，可以促进身体铁的吸收，增强体力，促进身体发育。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-30",
    "version": "3.0",
    "status": "published",
    "title": "🥒 翡翠丝瓜卷",
    "coverImageUrl": "/recipe-covers/cn-30.webp",
    "description": "营养师张晔健康食谱·新鲜时蔬 维生素、矿物质的最佳来源",
    "cuisine": "chinese",
    "difficulty": "medium",
    "prerequisites": {
      "containerSize": "多层不锈钢蒸锅 (Steamer)",
      "servings": "2-3 人份",
      "prepNotes": "准备10分钟 · 烹调10分钟"
    },
    "cookingTimeText": "准备10分钟 · 烹调10分钟",
    "ingredients": [
      {
        "id": "i2",
        "name": "黑鱼",
        "amountText": "300克",
        "category": "main"
      },
      {
        "id": "i1",
        "name": "丝瓜",
        "amountText": "300克",
        "category": "produce"
      },
      {
        "id": "i6",
        "name": "姜末",
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
      },
      {
        "id": "i3",
        "name": "鸡蛋清",
        "amountText": "100克",
        "category": "main"
      },
      {
        "id": "i4",
        "name": "淀粉",
        "amountText": "50克",
        "category": "produce"
      },
      {
        "id": "i5",
        "name": "葱末",
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
          "i6",
          "i7",
          "i8"
        ],
        "note": "丝瓜去皮，洗净，切大片；黑鱼取净鱼肉，剁成蓉，加入葱姜末、鸡精、盐调匀。"
      },
      {
        "id": "b2",
        "label": "焯烫成型",
        "sublabel": "Blanch",
        "stageIndex": 1,
        "ingredientIds": [
          "i3",
          "i4"
        ],
        "note": "丝瓜片入沸水锅焯水至半生后捞出过凉，放在案板上，抹上鸡蛋清、淀粉，放鱼蓉，卷成卷。",
        "completionState": "半生",
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
        "label": "蒸制装盘",
        "sublabel": "Steam",
        "stageIndex": 2,
        "ingredientIds": [
          "i5"
        ],
        "durationMinutes": 10,
        "note": "将丝瓜卷放入蒸笼中，蒸10分钟至熟，翻扣于盘内即可。",
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
      "servingInstructions": "翻扣于平盘中整理成型，趁热鲜嫩享用"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00006.html#sigil_toc_id_53 · 新鲜时蔬 维生素、矿物质的最佳来源 · 翡翠丝瓜卷",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00006.html#sigil_toc_id_53"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：丝瓜富含维生素B1、维生素C等成分，能保护皮肤、消除斑块，使皮肤保持洁白细腻。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-31",
    "version": "3.0",
    "status": "published",
    "title": "🥬 韭菜豆芽菜松",
    "coverImageUrl": "/recipe-covers/cn-31.webp",
    "description": "营养师张晔健康食谱·新鲜时蔬 维生素、矿物质的最佳来源",
    "cuisine": "chinese",
    "difficulty": "medium",
    "prerequisites": {
      "containerSize": "中式熟铁炒锅 (Wok)",
      "servings": "2-3 人份",
      "prepNotes": "准备10分钟 · 烹调3分钟"
    },
    "cookingTimeText": "准备10分钟 · 烹调3分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "韭菜",
        "amountText": "150克",
        "category": "produce"
      },
      {
        "id": "i2",
        "name": "黄豆芽",
        "amountText": "150克",
        "category": "produce"
      },
      {
        "id": "i6",
        "name": "料酒",
        "amountText": "1匙",
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
        "name": "白糖",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i3",
        "name": "五花肉末",
        "amountText": "50克",
        "category": "main"
      },
      {
        "id": "i4",
        "name": "生抽",
        "amountText": "2匙",
        "category": "seasoning"
      },
      {
        "id": "i5",
        "name": "姜汁",
        "amountText": "1匙",
        "category": "seasoning"
      },
      {
        "id": "i9",
        "name": "蒜粒",
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
        "note": "韭菜、黄豆芽洗净切丁。"
      },
      {
        "id": "b2",
        "label": "切配翻炒装盘",
        "sublabel": "Stir-fry",
        "stageIndex": 1,
        "ingredientIds": [
          "i6",
          "i7",
          "i8"
        ],
        "note": "干锅烧热，加入切好的黄豆芽和韭菜炒干水分后，加入料酒、盐和白糖炒匀盛出待用。",
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
        "label": "炝香翻炒",
        "sublabel": "Stir-fry",
        "stageIndex": 2,
        "ingredientIds": [
          "i3",
          "i4",
          "i5",
          "i9",
          "i10",
          "i11"
        ],
        "note": "油入锅，炒香葱花和蒜粒，加入肉末炒断生，加入备好的黄豆芽和韭菜翻炒，加入生抽、姜汁炒匀即可。",
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
      "servingInstructions": "出锅装盘趁热享用，脆嫩爽口、清香下饭"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00006.html#sigil_toc_id_55 · 新鲜时蔬 维生素、矿物质的最佳来源 · 韭菜豆芽菜松",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00006.html#sigil_toc_id_55"
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
    "id": "cn-32",
    "version": "3.0",
    "status": "published",
    "title": "♨️ 翡翠白玉卷",
    "coverImageUrl": "/recipe-covers/cn-32.webp",
    "description": "营养师张晔健康食谱·新鲜时蔬 维生素、矿物质的最佳来源",
    "cuisine": "chinese",
    "difficulty": "hard",
    "prerequisites": {
      "containerSize": "多层不锈钢蒸锅 (Steamer)",
      "servings": "2-3 人份",
      "prepNotes": "准备30分钟 · 烹调15分钟"
    },
    "cookingTimeText": "准备30分钟 · 烹调15分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "白菜叶",
        "amountText": "200克",
        "category": "produce"
      },
      {
        "id": "i3",
        "name": "黑木耳",
        "amountText": "20克",
        "category": "produce"
      },
      {
        "id": "i2",
        "name": "猪肉糜",
        "amountText": "200克",
        "category": "main"
      },
      {
        "id": "i4",
        "name": "虾皮",
        "amountText": "20克",
        "category": "seasoning"
      },
      {
        "id": "i5",
        "name": "生粉",
        "amountText": "5克",
        "category": "seasoning"
      },
      {
        "id": "i6",
        "name": "胡椒粉",
        "amountText": "2克",
        "category": "seasoning"
      },
      {
        "id": "i9",
        "name": "蒜末",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i11",
        "name": "料酒",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i13",
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
      },
      {
        "id": "i10",
        "name": "香油",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i12",
        "name": "水淀粉",
        "amountText": "适量",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "切配泡发焯烫",
        "sublabel": "Blanch",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i3"
        ],
        "note": "黑木耳洗净、泡发、切碎；白菜叶洗净、入沸水中焯烫，捞出。"
      },
      {
        "id": "b2",
        "label": "调味拌匀成型",
        "sublabel": "Shape",
        "stageIndex": 1,
        "ingredientIds": [
          "i2",
          "i4",
          "i5",
          "i6",
          "i9",
          "i11",
          "i13"
        ],
        "note": "猪肉糜中放入葱姜蒜末、木耳碎、虾皮，调入料酒、生粉、胡椒粉、盐搅拌均匀，做成肉馅。",
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
        "label": "成型煮制蒸制",
        "sublabel": "Steam",
        "stageIndex": 2,
        "ingredientIds": [],
        "durationMinutes": 10,
        "note": "取蒸盘，将焯好的白菜叶取一片在盘内铺开，取适量肉馅放在白菜叶上面、卷起，其他白菜叶和肉馅按相同方法卷成肉卷，肉卷放入烧开的蒸锅内，蒸10分钟左右。",
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
        "label": "勾芡",
        "sublabel": "Thicken",
        "stageIndex": 3,
        "ingredientIds": [
          "i10",
          "i12",
          "i7",
          "i8"
        ],
        "note": "水淀粉加香油勾芡后淋在蒸好的白菜卷上面即可。",
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
      "label": "完成",
      "servingInstructions": "整齐码盘淋上薄芡香油，清甜多汁、软嫩适口"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00006.html#sigil_toc_id_57 · 新鲜时蔬 维生素、矿物质的最佳来源 · 翡翠白玉卷",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00006.html#sigil_toc_id_57"
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
    "id": "cn-33",
    "version": "3.0",
    "status": "published",
    "title": "🥩 白菜粉丝猪骨汤",
    "coverImageUrl": "/recipe-covers/cn-33.webp",
    "description": "营养师张晔健康食谱·新鲜时蔬 维生素、矿物质的最佳来源",
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
        "name": "猪骨块",
        "amountText": "200克",
        "category": "produce"
      },
      {
        "id": "i1",
        "name": "白菜",
        "amountText": "200克",
        "category": "produce"
      },
      {
        "id": "i3",
        "name": "粉丝",
        "amountText": "60克",
        "category": "produce"
      },
      {
        "id": "i4",
        "name": "盐",
        "amountText": "3克",
        "category": "seasoning"
      },
      {
        "id": "i5",
        "name": "葱末",
        "amountText": "适量",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "切配炖煮",
        "sublabel": "Simmer",
        "stageIndex": 0,
        "ingredientIds": [
          "i2"
        ],
        "durationMinutes": 40,
        "note": "猪骨块、洗净血水，放入开水锅内炖40分钟左右。"
      },
      {
        "id": "b2",
        "label": "切配",
        "sublabel": "Prep",
        "stageIndex": 1,
        "ingredientIds": [
          "i1"
        ],
        "note": "白菜洗净，顺丝切成条状。",
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
        "label": "炖煮调味煮制",
        "sublabel": "Boil",
        "stageIndex": 2,
        "ingredientIds": [
          "i3",
          "i4",
          "i5"
        ],
        "durationMinutes": 3,
        "note": "将粉丝放入炖猪骨的锅内煮3分钟左右，然后放入白菜条，调入盐，煮至所有食材熟透，最后撒上葱末即可。",
        "completionState": "所有食材熟透",
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
      "servingInstructions": "连汤盛入大汤碗趁热享用，鲜甜醇厚、暖胃润燥"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00006.html#sigil_toc_id_58 · 新鲜时蔬 维生素、矿物质的最佳来源 · 白菜粉丝猪骨汤",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00006.html#sigil_toc_id_58"
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
    "id": "cn-34",
    "version": "3.0",
    "status": "published",
    "title": "🥬 草菇炒白菜",
    "coverImageUrl": "/recipe-covers/cn-34.webp",
    "description": "营养师张晔健康食谱·新鲜时蔬 维生素、矿物质的最佳来源",
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
        "name": "白菜",
        "amountText": "300克",
        "category": "produce"
      },
      {
        "id": "i2",
        "name": "草菇",
        "amountText": "150克",
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
        "name": "蒜蓉",
        "amountText": "5克",
        "category": "seasoning"
      },
      {
        "id": "i6",
        "name": "盐",
        "amountText": "4克",
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
        "label": "切配",
        "sublabel": "Prep",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2"
        ],
        "note": "白菜洗净，切成薄片；草菇洗净，一切两半。"
      },
      {
        "id": "b2",
        "label": "炝香翻炒装盘",
        "sublabel": "Stir-fry",
        "stageIndex": 1,
        "ingredientIds": [
          "i3",
          "i4",
          "i5",
          "i6",
          "i7",
          "i8"
        ],
        "note": "油烧热，下姜末、蒜蓉、葱花爆香，倒入白菜片炒至六成熟，下入草菇炒熟，放入盐、鸡精略炒即可出锅。",
        "completionState": "六成熟",
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
      "servingInstructions": "出锅装盘趁热享用，脆嫩爽口、菌香四溢"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00006.html#sigil_toc_id_59 · 新鲜时蔬 维生素、矿物质的最佳来源 · 草菇炒白菜",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00006.html#sigil_toc_id_59"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：白菜含有大量的粗纤维，草菇含有丰富的维生素C，有“放一块，香一锅”的美誉，二者搭配可润肠通便、促进排毒、增强机体的抗病能力，还可预防痔疮及结肠癌。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-35",
    "version": "3.0",
    "status": "published",
    "title": "🥩 洋葱炒猪肝",
    "coverImageUrl": "/recipe-covers/cn-35.webp",
    "description": "营养师张晔健康食谱·新鲜时蔬 维生素、矿物质的最佳来源",
    "cuisine": "chinese",
    "difficulty": "medium",
    "prerequisites": {
      "containerSize": "中式熟铁炒锅 (Wok)",
      "preheat": "腌渍15分钟",
      "servings": "2-3 人份",
      "prepNotes": "准备10分钟 · 烹调10分钟"
    },
    "cookingTimeText": "准备10分钟 · 烹调10分钟",
    "ingredients": [
      {
        "id": "i2",
        "name": "猪肝",
        "amountText": "50克",
        "category": "main"
      },
      {
        "id": "i1",
        "name": "洋葱",
        "amountText": "100克",
        "category": "produce"
      },
      {
        "id": "i3",
        "name": "料酒",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i4",
        "name": "水淀粉",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i5",
        "name": "葱花",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i6",
        "name": "花椒粉",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i9",
        "name": "植物油",
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
        "name": "鸡精",
        "amountText": "适量",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "切配勾芡腌浆",
        "sublabel": "Marinate",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2",
          "i3",
          "i4"
        ],
        "durationMinutes": 15,
        "note": "猪肝去净筋膜，洗净，切片，用料酒和水淀粉腌渍15分钟；洋葱去老膜，去蒂，洗净，切方片。"
      },
      {
        "id": "b2",
        "label": "炝香滑炒",
        "sublabel": "Velvet",
        "stageIndex": 1,
        "ingredientIds": [
          "i5",
          "i6",
          "i9"
        ],
        "heatLevel": "七成热",
        "note": "炒锅置火上，倒入适量植物油，待油温烧至七成热，加葱花、花椒粉炒香，放入猪肝片滑熟。",
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
        "label": "切配翻炒调味",
        "sublabel": "Stir-fry",
        "stageIndex": 2,
        "ingredientIds": [
          "i7",
          "i8"
        ],
        "note": "放入切好的洋葱片炒熟，用盐和鸡精调味即可。",
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
      "servingInstructions": "出锅装盘趁热享用，猪肝滑嫩、洋葱甜脆"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00006.html#sigil_toc_id_61 · 新鲜时蔬 维生素、矿物质的最佳来源 · 洋葱炒猪肝",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00006.html#sigil_toc_id_61"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：洋葱有降压降脂的功效，猪肝中含有丰富的维生素A和铁元素，二者搭配食用，有滋阴润燥、提神、通便的功效，适合阴虚干咳、口渴、体倦乏力、便秘者食用。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-36",
    "version": "3.0",
    "status": "published",
    "title": "🥬 飘香手撕圆白菜",
    "coverImageUrl": "/recipe-covers/cn-36.webp",
    "description": "营养师张晔健康食谱·新鲜时蔬 维生素、矿物质的最佳来源",
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
        "name": "圆白菜",
        "amountText": "300克",
        "category": "produce"
      },
      {
        "id": "i2",
        "name": "盐",
        "amountText": "3克",
        "category": "seasoning"
      },
      {
        "id": "i3",
        "name": "花椒粒",
        "amountText": "3克",
        "category": "seasoning"
      },
      {
        "id": "i4",
        "name": "醋",
        "amountText": "8克",
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
        "name": "姜末",
        "amountText": "5克",
        "category": "seasoning"
      },
      {
        "id": "i7",
        "name": "香油",
        "amountText": "5克",
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
          "i1"
        ],
        "note": "圆白菜洗净，手撕成片。"
      },
      {
        "id": "b2",
        "label": "炝香装盘",
        "sublabel": "Sauté",
        "stageIndex": 1,
        "ingredientIds": [
          "i2",
          "i3",
          "i4",
          "i5",
          "i6",
          "i7",
          "i8"
        ],
        "note": "锅内倒油烧热，放入蒜末、姜末、花椒粒爆香，放入圆白菜片炒至稍微变软，调入盐、醋，翻炒均匀，淋上香油出锅。",
        "completionState": "稍微变软",
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
      "servingInstructions": "出锅装盘趁热享用，酸辣脆爽、焦香开胃"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00006.html#sigil_toc_id_63 · 新鲜时蔬 维生素、矿物质的最佳来源 · 飘香手撕圆白菜",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00006.html#sigil_toc_id_63"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：圆白菜被誉为天然“胃菜”，对溃疡有很好的辅助治疗作用，有助于溃疡的愈合，还能预防胃溃疡的恶变。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-37",
    "version": "3.0",
    "status": "published",
    "title": "🥬 海米油菜",
    "coverImageUrl": "/recipe-covers/cn-37.webp",
    "description": "营养师张晔健康食谱·新鲜时蔬 维生素、矿物质的最佳来源",
    "cuisine": "chinese",
    "difficulty": "medium",
    "prerequisites": {
      "containerSize": "中式熟铁炒锅 (Wok)",
      "servings": "2-3 人份",
      "prepNotes": "准备10分钟 · 烹调10分钟"
    },
    "cookingTimeText": "准备10分钟 · 烹调10分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "油菜",
        "amountText": "200克",
        "category": "produce"
      },
      {
        "id": "i2",
        "name": "海米",
        "amountText": "30克",
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
        "name": "葱花",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i5",
        "name": "鸡精",
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
        "label": "切配泡发",
        "sublabel": "Soak",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2"
        ],
        "note": "油菜洗净，切成3厘米长的段；海米用温水泡发洗净。"
      },
      {
        "id": "b2",
        "label": "焯烫沥干备用",
        "sublabel": "Blanch",
        "stageIndex": 1,
        "ingredientIds": [],
        "note": "将油菜放入沸水中焯一下，捞入冷水中过凉，挤净水分，备用。",
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
        "label": "炝香翻炒调味",
        "sublabel": "Stir-fry",
        "stageIndex": 2,
        "ingredientIds": [
          "i3",
          "i4",
          "i5",
          "i6"
        ],
        "note": "炒锅内放油烧热，放入葱花炒香，加入海米翻炒至其变色，调入盐、鸡精，放入油菜翻炒熟透即可。",
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
      "servingInstructions": "整齐排盘趁热享用，鲜绿脆嫩、海米咸鲜"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00006.html#sigil_toc_id_65 · 新鲜时蔬 维生素、矿物质的最佳来源 · 海米油菜",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00006.html#sigil_toc_id_65"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：海米中蛋白质和钙的含量极为丰富，且肉质松软、易于消化，与含有维生素C、胡萝卜素的油菜同食，可美容保健、理气开胃、解毒消肿，能帮助虚弱的人调养身体。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-38",
    "version": "3.0",
    "status": "published",
    "title": "🦐 蚝油生菜",
    "coverImageUrl": "/recipe-covers/cn-38.webp",
    "description": "营养师张晔健康食谱·新鲜时蔬 维生素、矿物质的最佳来源",
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
        "amountText": "300克",
        "category": "produce"
      },
      {
        "id": "i2",
        "name": "蚝油",
        "amountText": "15克",
        "category": "seasoning"
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
        "name": "蒜末",
        "amountText": "3克",
        "category": "seasoning"
      },
      {
        "id": "i6",
        "name": "生抽",
        "amountText": "3克",
        "category": "seasoning"
      },
      {
        "id": "i7",
        "name": "水淀粉",
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
        "label": "切配焯烫装盘",
        "sublabel": "Blanch",
        "stageIndex": 0,
        "ingredientIds": [
          "i1"
        ],
        "note": "生菜洗净，撕成大片，焯熟，捞出控水，盛盘。"
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
          "i5",
          "i6",
          "i7",
          "i8"
        ],
        "note": "油锅烧热，爆香葱末、蒜末、姜末，放生抽、蚝油，用水淀粉勾芡，浇盘中即可。",
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
      "servingInstructions": "将滚烫蚝油芡汁均匀浇在生菜上，鲜脆多汁趁热享用"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00006.html#sigil_toc_id_67 · 新鲜时蔬 维生素、矿物质的最佳来源 · 蚝油生菜",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00006.html#sigil_toc_id_67"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：生菜富含膳食纤维和维生素C，还含有莴苣素，具有清热、催眠的作用；搭配蚝油食用，营养加倍，还可消脂减肥、镇痛催眠。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-39",
    "version": "3.0",
    "status": "published",
    "title": "🥩 芹菜腊肉丁",
    "coverImageUrl": "/recipe-covers/cn-39.webp",
    "description": "营养师张晔健康食谱·新鲜时蔬 维生素、矿物质的最佳来源",
    "cuisine": "chinese",
    "difficulty": "medium",
    "prerequisites": {
      "containerSize": "中式熟铁炒锅 (Wok)",
      "servings": "2-3 人份",
      "prepNotes": "准备10分钟 · 烹调10分钟"
    },
    "cookingTimeText": "准备10分钟 · 烹调10分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "芹菜",
        "amountText": "200克",
        "category": "produce"
      },
      {
        "id": "i2",
        "name": "腊肉",
        "amountText": "100克",
        "category": "main"
      },
      {
        "id": "i3",
        "name": "姜末",
        "amountText": "2克",
        "category": "seasoning"
      },
      {
        "id": "i4",
        "name": "盐",
        "amountText": "2克",
        "category": "seasoning"
      },
      {
        "id": "i5",
        "name": "料酒",
        "amountText": "5克",
        "category": "seasoning"
      },
      {
        "id": "i6",
        "name": "干红辣椒段",
        "amountText": "5克",
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
        "note": "将芹菜去根，洗净，切段。"
      },
      {
        "id": "b2",
        "label": "沥干备用冷却切配",
        "sublabel": "Prep",
        "stageIndex": 1,
        "ingredientIds": [
          "i2"
        ],
        "note": "锅置火上，倒入清水烧沸，分别下芹菜和腊肉焯一下捞出，沥干水分，放凉后，将腊肉切丁备用。",
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
        "label": "炝香翻炒",
        "sublabel": "Stir-fry",
        "stageIndex": 2,
        "ingredientIds": [
          "i3",
          "i4",
          "i5",
          "i6",
          "i7"
        ],
        "heatLevel": "六成热",
        "note": "炒锅内倒油，烧至六成热，下姜末、干红辣椒段爆香，下腊肉丁煸炒出油，倒入芹菜段，加料酒和盐，翻炒至熟即可。",
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
      "servingInstructions": "出锅装盘趁热享用，芹脆肉香、咸香下饭"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00006.html#sigil_toc_id_69 · 新鲜时蔬 维生素、矿物质的最佳来源 · 芹菜腊肉丁",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00006.html#sigil_toc_id_69"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：芹菜叶中所含的胡萝卜素和维生素C比茎中的含量多，因此烹调时最好不要把能吃的嫩叶扔掉。芹菜不宜炒得过烂，以免营养流失。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-40",
    "version": "3.0",
    "status": "published",
    "title": "🥬 白灼芥蓝",
    "coverImageUrl": "/recipe-covers/cn-40.webp",
    "description": "营养师张晔健康食谱·新鲜时蔬 维生素、矿物质的最佳来源",
    "cuisine": "chinese",
    "difficulty": "medium",
    "prerequisites": {
      "containerSize": "中式熟铁炒锅 (Wok)",
      "servings": "2-3 人份",
      "prepNotes": "准备5分钟 · 烹调10分钟"
    },
    "cookingTimeText": "准备5分钟 · 烹调10分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "芥蓝",
        "amountText": "300克",
        "category": "produce"
      },
      {
        "id": "i2",
        "name": "葱丝",
        "amountText": "15克",
        "category": "seasoning"
      },
      {
        "id": "i3",
        "name": "酱油",
        "amountText": "5克",
        "category": "seasoning"
      },
      {
        "id": "i4",
        "name": "白糖",
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
        "name": "胡椒粉",
        "amountText": "少许",
        "category": "seasoning"
      },
      {
        "id": "i7",
        "name": "鸡精",
        "amountText": "少许",
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
        "label": "切配",
        "sublabel": "Prep",
        "stageIndex": 0,
        "ingredientIds": [
          "i1"
        ],
        "note": "芥蓝洗净，去根部粗皮。"
      },
      {
        "id": "b2",
        "label": "焯烫",
        "sublabel": "Blanch",
        "stageIndex": 1,
        "ingredientIds": [],
        "note": "锅置火上，倒入清水烧沸，将芥蓝焯至断生后捞出，放盘中。",
        "completionState": "断生",
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
        "label": "调汁煮制装盘",
        "sublabel": "Boil",
        "stageIndex": 2,
        "ingredientIds": [
          "i2",
          "i3",
          "i4",
          "i5",
          "i6",
          "i7",
          "i8"
        ],
        "note": "将酱油、白糖、盐、香油、鸡精、胡椒粉和少许水兑成白灼汁，倒入锅内烧开后，浇在芥蓝上，撒葱丝即可。",
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
      "servingInstructions": "热白灼汁淋在芥蓝上撒葱丝，清甜脆嫩趁热享用"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00006.html#sigil_toc_id_71 · 新鲜时蔬 维生素、矿物质的最佳来源 · 白灼芥蓝",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00006.html#sigil_toc_id_71"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：芥蓝中含有一种有机碱，可以刺激人的味觉，加快肠胃蠕动，帮助消化。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-41",
    "version": "3.0",
    "status": "published",
    "title": "🥚 蛋黄苋菜",
    "coverImageUrl": "/recipe-covers/cn-41.webp",
    "description": "营养师张晔健康食谱·新鲜时蔬 维生素、矿物质的最佳来源",
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
        "id": "i2",
        "name": "熟咸鸭蛋",
        "amountText": "1个",
        "category": "main"
      },
      {
        "id": "i1",
        "name": "苋菜",
        "amountText": "400克",
        "category": "produce"
      },
      {
        "id": "i3",
        "name": "蒜末",
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
        "id": "i5",
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
        "note": "苋菜洗净、切段；熟咸鸭蛋去皮、取蛋黄，将蛋黄放在碗里捣碎成末。"
      },
      {
        "id": "b2",
        "label": "炝香装盘",
        "sublabel": "Sauté",
        "stageIndex": 1,
        "ingredientIds": [
          "i3",
          "i4",
          "i5"
        ],
        "heatLevel": "小火",
        "note": "锅置火上，倒油烧至六成热，下蒜末爆香，倒入蛋黄末小火翻炒至出香味，放入苋菜段，加盐翻炒至变软即可出锅。",
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
      "servingInstructions": "出锅装盘趁热享用，咸香软糯、鲜嫩清口"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00006.html#sigil_toc_id_73 · 新鲜时蔬 维生素、矿物质的最佳来源 · 蛋黄苋菜",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00006.html#sigil_toc_id_73"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：苋菜可清热解毒、凉血散淤，对因上火引起的咽喉红肿、目赤眼痛有很好的辅助治疗功效。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-42",
    "version": "3.0",
    "status": "published",
    "title": "🦐 虾仁蒸西蓝花",
    "coverImageUrl": "/recipe-covers/cn-42.webp",
    "description": "营养师张晔健康食谱·新鲜时蔬 维生素、矿物质的最佳来源",
    "cuisine": "chinese",
    "difficulty": "hard",
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
        "amountText": "250克",
        "category": "produce"
      },
      {
        "id": "i2",
        "name": "虾仁",
        "amountText": "150克",
        "category": "main"
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
          "i1"
        ],
        "note": "西蓝花洗净，撕小朵，在盘子周围摆上一圈。"
      },
      {
        "id": "b2",
        "label": "组合装填",
        "sublabel": "Assemble",
        "stageIndex": 1,
        "ingredientIds": [
          "i2"
        ],
        "note": "虾仁清理干净，倒入西蓝花中间。",
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
        "durationMinutes": 10,
        "note": "将盘子放蒸锅中，盖上锅盖，水烧开后蒸10分钟左右取出。",
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
        "label": "煮制勾芡拌匀",
        "sublabel": "Boil",
        "stageIndex": 3,
        "ingredientIds": [
          "i3",
          "i4",
          "i5",
          "i6"
        ],
        "note": "取一小锅，将水、盐、鸡精、蚝油煮沸，倒入适量清水和水淀粉，快速搅拌，至汤汁浓稠时关火。将芡汁浇于西蓝花表面即可。",
        "completionState": "汤汁浓稠",
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
      "label": "完成",
      "servingInstructions": "均匀淋上鲜亮芡汁趁热享用，虾仁爽滑弹牙、西蓝花脆嫩清甜"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00006.html#sigil_toc_id_75 · 新鲜时蔬 维生素、矿物质的最佳来源 · 虾仁蒸西蓝花",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00006.html#sigil_toc_id_75"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：虾仁富含优质蛋白质，西蓝花富含维生素C，搭配食用可帮助溃疡患者补充维生素和蛋白质。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-43",
    "version": "3.0",
    "status": "published",
    "title": "🥒 莴笋聚会",
    "coverImageUrl": "/recipe-covers/cn-43.webp",
    "description": "营养师张晔健康食谱·新鲜时蔬 维生素、矿物质的最佳来源",
    "cuisine": "chinese",
    "difficulty": "hard",
    "prerequisites": {
      "containerSize": "多层不锈钢蒸锅 (Steamer)",
      "servings": "2-3 人份",
      "prepNotes": "准备5分钟 · 烹调20分钟"
    },
    "cookingTimeText": "准备5分钟 · 烹调20分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "莴笋",
        "amountText": "200克",
        "category": "produce"
      },
      {
        "id": "i2",
        "name": "竹笋",
        "amountText": "150克",
        "category": "produce"
      },
      {
        "id": "i3",
        "name": "芋头",
        "amountText": "100克",
        "category": "produce"
      },
      {
        "id": "i4",
        "name": "土豆",
        "amountText": "100克",
        "category": "produce"
      },
      {
        "id": "i5",
        "name": "干红辣椒段",
        "amountText": "3克",
        "category": "seasoning"
      },
      {
        "id": "i6",
        "name": "花椒粉",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i7",
        "name": "蒜末",
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
        "name": "酱油",
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
          "i3",
          "i4"
        ],
        "note": "所有材料洗净，去皮，切块。"
      },
      {
        "id": "b2",
        "label": "装盘蒸制煮制",
        "sublabel": "Boil",
        "stageIndex": 1,
        "ingredientIds": [],
        "heatLevel": "大火",
        "durationMinutes": 20,
        "note": "蒸锅中加水，将莴笋、竹笋、芋头、土豆块装盘放入蒸锅内，盖上锅盖，先大火煮开，再转小火蒸20分钟左右。",
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
        "label": "炝香成型",
        "sublabel": "Sauté",
        "stageIndex": 2,
        "ingredientIds": [
          "i5",
          "i6",
          "i7",
          "i8",
          "i9",
          "i10"
        ],
        "note": "炒锅内放油烧热，放入干红辣椒段、花椒粉、蒜末炒香，最后调入盐、酱油、少量清水，搅拌均匀做成蘸汁。",
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
        "label": "蒸制",
        "sublabel": "Steam",
        "stageIndex": 3,
        "ingredientIds": [],
        "note": "蒸锅内菜品蒸熟后取出，浇上做好的蘸汁即可。",
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
      "label": "完成",
      "servingInstructions": "淋上麻辣鲜香蘸汁趁热享用，四重根茎软糯脆嫩兼备"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00006.html#sigil_toc_id_77 · 新鲜时蔬 维生素、矿物质的最佳来源 · 莴笋聚会",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00006.html#sigil_toc_id_77"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：莴笋、竹笋富含钾；芋头富含黏液皂素及多种微量元素。搭配同食，可强身健体、防癌抗癌。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-44",
    "version": "3.0",
    "status": "published",
    "title": "🥩 莴笋烧肉",
    "coverImageUrl": "/recipe-covers/cn-44.webp",
    "description": "营养师张晔健康食谱·新鲜时蔬 维生素、矿物质的最佳来源",
    "cuisine": "chinese",
    "difficulty": "medium",
    "prerequisites": {
      "containerSize": "高保温厚底砂锅 / 铸铁炖锅",
      "servings": "2-3 人份",
      "prepNotes": "准备10分钟 · 烹调15分钟"
    },
    "cookingTimeText": "准备10分钟 · 烹调15分钟",
    "ingredients": [
      {
        "id": "i2",
        "name": "猪肉",
        "amountText": "100克",
        "category": "main"
      },
      {
        "id": "i1",
        "name": "莴笋",
        "amountText": "250克",
        "category": "produce"
      },
      {
        "id": "i7",
        "name": "淀粉",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i9",
        "name": "盐",
        "amountText": "3克",
        "category": "seasoning"
      },
      {
        "id": "i3",
        "name": "红辣椒段",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i10",
        "name": "酱油",
        "amountText": "少许",
        "category": "seasoning"
      },
      {
        "id": "i11",
        "name": "姜片",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i4",
        "name": "醋",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i5",
        "name": "糖",
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
        "id": "i6",
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
          "i7",
          "i9",
          "i10"
        ],
        "note": "将莴笋去叶，去皮，洗净，切成片；猪肉切片，并用盐、少许酱油、淀粉把肉片抓匀腌渍。"
      },
      {
        "id": "b2",
        "label": "炝香煮制",
        "sublabel": "Boil",
        "stageIndex": 1,
        "ingredientIds": [
          "i3",
          "i11",
          "i6",
          "i8",
          "i4",
          "i5"
        ],
        "note": "炒锅内倒油加热，放入红辣椒段、姜片炒香，放入肉片煸炒，放入适量料酒、醋、糖，加入少许清水后盖上锅盖焖煮至沸。",
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
        "label": "煮制翻炒",
        "sublabel": "Stir-fry",
        "stageIndex": 2,
        "ingredientIds": [],
        "note": "煮沸后放入莴笋片，调入盐翻炒，再次加少量水炖至所有食材熟透即可。",
        "completionState": "所有食材熟透",
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
      "servingInstructions": "盛入砂锅或深盘趁热享用，肉质软烂醇香、莴笋清脆解腻"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00006.html#sigil_toc_id_78 · 新鲜时蔬 维生素、矿物质的最佳来源 · 莴笋烧肉",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00006.html#sigil_toc_id_78"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：莴笋富含多种维生素及矿物质，与猪肉同食，可以去除猪肉的油腻。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-45",
    "version": "3.0",
    "status": "published",
    "title": "🥒 姜汁莴笋",
    "coverImageUrl": "/recipe-covers/cn-45.webp",
    "description": "营养师张晔健康食谱·新鲜时蔬 维生素、矿物质的最佳来源",
    "cuisine": "chinese",
    "difficulty": "medium",
    "prerequisites": {
      "containerSize": "中式熟铁炒锅 (Wok)",
      "preheat": "腌渍10分钟",
      "servings": "2-3 人份",
      "prepNotes": "准备10分钟 · 烹调10分钟"
    },
    "cookingTimeText": "准备10分钟 · 烹调10分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "莴笋",
        "amountText": "400克",
        "category": "produce"
      },
      {
        "id": "i3",
        "name": "白醋",
        "amountText": "15克",
        "category": "seasoning"
      },
      {
        "id": "i7",
        "name": "盐",
        "amountText": "3克",
        "category": "seasoning"
      },
      {
        "id": "i2",
        "name": "红甜椒",
        "amountText": "20克",
        "category": "produce"
      },
      {
        "id": "i4",
        "name": "姜",
        "amountText": "20克",
        "category": "seasoning"
      },
      {
        "id": "i5",
        "name": "白糖",
        "amountText": "10克",
        "category": "seasoning"
      },
      {
        "id": "i6",
        "name": "香油",
        "amountText": "3克",
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
          "i7"
        ],
        "durationMinutes": 10,
        "note": "莴笋去叶、去皮，洗净，切宽条，加白醋和盐，腌渍10分钟。"
      },
      {
        "id": "b2",
        "label": "切配成型",
        "sublabel": "Shape",
        "stageIndex": 1,
        "ingredientIds": [
          "i2",
          "i4"
        ],
        "note": "红甜椒洗净，切成细丝；姜切碎后加少许凉白开捣烂制成姜汁。",
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
        "label": "腌浆调味",
        "sublabel": "Season",
        "stageIndex": 2,
        "ingredientIds": [
          "i5",
          "i6"
        ],
        "note": "沥去腌渍莴笋条时渗出的汁，调入姜汁、白糖和香油，点缀上红甜椒丝即可。",
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
      "servingInstructions": "整齐装盘淋上姜汁香油，脆嫩多汁、酸甜清爽醒脾"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00006.html#sigil_toc_id_79 · 新鲜时蔬 维生素、矿物质的最佳来源 · 姜汁莴笋",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00006.html#sigil_toc_id_79"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：莴笋富含钾，有利于促进排尿，可减少对心房的压力。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-46",
    "version": "3.0",
    "status": "published",
    "title": "🍗 西葫芦炒鸡蛋",
    "coverImageUrl": "/recipe-covers/cn-46.webp",
    "description": "营养师张晔健康食谱·新鲜时蔬 维生素、矿物质的最佳来源",
    "cuisine": "chinese",
    "difficulty": "medium",
    "prerequisites": {
      "containerSize": "中式熟铁炒锅 (Wok)",
      "servings": "2-3 人份",
      "prepNotes": "准备10分钟 · 烹调10分钟"
    },
    "cookingTimeText": "准备10分钟 · 烹调10分钟",
    "ingredients": [
      {
        "id": "i2",
        "name": "鸡蛋",
        "amountText": "120克",
        "category": "main"
      },
      {
        "id": "i1",
        "name": "西葫芦",
        "amountText": "150克",
        "category": "produce"
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
        "amountText": "3克",
        "category": "seasoning"
      },
      {
        "id": "i5",
        "name": "植物油",
        "amountText": "3克",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "切配打散",
        "sublabel": "Beat",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2",
          "i3"
        ],
        "note": "西葫芦洗净，切成片状；鸡蛋打散，加少许盐搅匀。"
      },
      {
        "id": "b2",
        "label": "翻炒",
        "sublabel": "Stir-fry",
        "stageIndex": 1,
        "ingredientIds": [],
        "note": "锅置火上，倒入适量油，烧热后倒入蛋液，炒至熟，盛入碗中。",
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
        "label": "炝香翻炒调味",
        "sublabel": "Stir-fry",
        "stageIndex": 2,
        "ingredientIds": [
          "i4",
          "i5"
        ],
        "heatLevel": "六成热",
        "note": "另起锅，倒入植物油烧至六成热，放入葱花爆香，下入西葫芦炒至八成熟，放入炒好的鸡蛋，最后加入盐调味即可。",
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
      "servingInstructions": "出锅装盘趁热享用，鸡蛋金黄蓬松、西葫芦鲜甜嫩爽"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00006.html#sigil_toc_id_81 · 新鲜时蔬 维生素、矿物质的最佳来源 · 西葫芦炒鸡蛋",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00006.html#sigil_toc_id_81"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：西葫芦中含有瓜氨酸、葫芦巴碱等物质，具有促进胰岛细胞分泌胰岛素的作用，与鸡蛋同食，可以补充鸡蛋中缺乏的维生素C，不仅营养更全面，且能够有效地控制血糖。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  }
]
