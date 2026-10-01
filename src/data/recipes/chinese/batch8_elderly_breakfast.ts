import type { VisualRecipeV3 } from '@/types/recipeV3'

/**
 * 营养师张晔《蒸炖炒，营养师的健康食谱》原书真值 - 老年全周营养早餐 (周一至周日)
 * 共 13 道食谱 (100% 严格原子食材建模，一人一行，无复合食材)
 */
export const BATCH8_ELDERLY_BREAKFAST: VisualRecipeV3[] = [
  {
    "id": "cn-139",
    "version": "3.0",
    "status": "published",
    "title": "🥣 茄汁莜面窝窝",
    "coverImageUrl": "/recipe-covers/cn-139.webp",
    "description": "营养师张晔健康食谱·周一　适量搭配粗粮，减少老年慢性病",
    "cuisine": "chinese",
    "difficulty": "medium",
    "prerequisites": {
      "containerSize": "多层不锈钢蒸锅 (Steamer)",
      "servings": "2-3 人份",
      "prepNotes": "准备1小时 · 烹调15分钟"
    },
    "cookingTimeText": "准备1小时 · 烹调15分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "莜面",
        "amountText": "210克",
        "category": "produce"
      },
      {
        "id": "i2",
        "name": "番茄",
        "amountText": "1个",
        "category": "produce"
      },
      {
        "id": "i3",
        "name": "芹菜",
        "amountText": "10克",
        "category": "produce"
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
        "label": "拌匀",
        "sublabel": "Mix",
        "stageIndex": 0,
        "ingredientIds": [
          "i1"
        ],
        "note": "将莜面放入盆中，一边加开水一边搅拌直到剩十分之一的干莜面，用手揉成光滑的面团。"
      },
      {
        "id": "b2",
        "label": "成型蒸制",
        "sublabel": "Steam",
        "stageIndex": 1,
        "ingredientIds": [],
        "durationMinutes": 15,
        "note": "每次取约3克小面团，揉成长条形，放在案板上用手掌根部搓成片，然后用食指夹住一头卷成筒，接缝的地方捏紧，摆放在蒸笼上。水开后蒸15分钟即可。",
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
        "label": "切配翻炒装盘",
        "sublabel": "Stir-fry",
        "stageIndex": 2,
        "ingredientIds": [
          "i2",
          "i3",
          "i4"
        ],
        "note": "番茄和芹菜洗净切丁，炒出茄汁加盐炒匀，浇在蒸好的莜面窝窝上即可。",
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
      "servingInstructions": "端出蒸笼趁热浇上浓郁茄汁享用，莜面窝窝筋道弹牙、番茄汁酸甜爽口、开胃降糖"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00041.html#sigil_toc_id_221 · 周一　适量搭配粗粮，减少老年慢性病 · 茄汁莜面窝窝",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00041.html#sigil_toc_id_221"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：芹菜可替换成任意蔬菜搭配番茄调成汁，注意控制盐的摄入，尽量不要用生抽调出蘸水。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-140",
    "version": "3.0",
    "status": "published",
    "title": "🥔 红薯糙米饭",
    "coverImageUrl": "/recipe-covers/cn-140.webp",
    "description": "营养师张晔健康食谱·周二　摄入维生素C和不饱和脂肪酸，保护心血管",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "多层不锈钢蒸锅 (Steamer)",
      "preheat": "浸泡3小时",
      "servings": "2-3 人份",
      "prepNotes": "准备3小时 · 烹调30分钟"
    },
    "cookingTimeText": "准备3小时 · 烹调30分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "糙米",
        "amountText": "75克",
        "category": "produce"
      },
      {
        "id": "i2",
        "name": "红薯",
        "amountText": "100克",
        "category": "produce"
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
        "durationText": "3h",
        "note": "糙米洗净，浸泡3小时；红薯去皮洗净，切丁。"
      },
      {
        "id": "b2",
        "label": "蒸制",
        "sublabel": "Steam",
        "stageIndex": 1,
        "ingredientIds": [],
        "note": "将糙米、红薯丁和适量清水放入电饭锅中，摁下“煮饭”键，蒸至电饭锅提示米饭蒸好即可。",
        "completionState": "电饭锅提示米饭蒸好",
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
      "servingInstructions": "盛入饭碗趁热享用，糙米饭粒粒有嚼劲、红薯块软甜粉润、甘香饱腹护血管"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00042.html#sigil_toc_id_222 · 周二　摄入维生素C和不饱和脂肪酸，保护心血管 · 红薯糙米饭",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00042.html#sigil_toc_id_222"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：红薯和糙米富含膳食纤维，有助于净化血管、降低血压，还有助于控制体重，能帮助老年人预防肥胖并发的心血管疾病。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-141",
    "version": "3.0",
    "status": "published",
    "title": "🐟 芹菜鱼丝",
    "coverImageUrl": "/recipe-covers/cn-141.webp",
    "description": "营养师张晔健康食谱·周二　摄入维生素C和不饱和脂肪酸，保护心血管",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "中式熟铁炒锅 (Wok)",
      "preheat": "腌15分钟",
      "servings": "2-3 人份",
      "prepNotes": "准备25分钟 · 烹调10分钟"
    },
    "cookingTimeText": "准备25分钟 · 烹调10分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "净鱼肉",
        "amountText": "100克",
        "category": "main"
      },
      {
        "id": "i2",
        "name": "芹菜",
        "amountText": "150克",
        "category": "produce"
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
        "amountText": "10克",
        "category": "seasoning"
      },
      {
        "id": "i6",
        "name": "鲜汤",
        "amountText": "25克",
        "category": "seasoning"
      },
      {
        "id": "i7",
        "name": "水淀粉",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i9",
        "name": "白胡椒粉",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i3",
        "name": "红椒丝",
        "amountText": "3克",
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
          "i9"
        ],
        "durationMinutes": 15,
        "note": "鱼肉切长丝，加盐、料酒和水淀粉拌匀，腌15分钟；芹菜洗净，切成长丝；将鲜汤、白胡椒粉加水淀粉调成芡汁备用。"
      },
      {
        "id": "b2",
        "label": "翻炒收汁",
        "sublabel": "Stir-fry",
        "stageIndex": 1,
        "ingredientIds": [
          "i3",
          "i8"
        ],
        "note": "油烧至五成热，放入鱼肉丝滑散，加入芹菜丝、红椒丝炒匀，再倒入芡汁，待收汁亮油时，起锅即可。",
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
      "servingInstructions": "出锅装盘趁热享用，鱼丝滑嫩洁白不碎、芹丝翠绿清脆爽口、鲜香滑润护血管"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00042.html#sigil_toc_id_223 · 周二　摄入维生素C和不饱和脂肪酸，保护心血管 · 芹菜鱼丝",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00042.html#sigil_toc_id_223"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：鱼肉中的不饱和脂肪酸可以降低血液中的胆固醇水平，预防动脉硬化。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-142",
    "version": "3.0",
    "status": "published",
    "title": "🧈 牡蛎豆腐羹",
    "coverImageUrl": "/recipe-covers/cn-142.webp",
    "description": "营养师张晔健康食谱·周三　适量补充矿物质，预防老年慢性病",
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
        "name": "牡蛎肉",
        "amountText": "100克",
        "category": "main"
      },
      {
        "id": "i6",
        "name": "老抽",
        "amountText": "3克",
        "category": "seasoning"
      },
      {
        "id": "i8",
        "name": "鱼高汤",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i9",
        "name": "葱段",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i2",
        "name": "豆腐片",
        "amountText": "250克",
        "category": "main"
      },
      {
        "id": "i3",
        "name": "竹笋片",
        "amountText": "150克",
        "category": "produce"
      },
      {
        "id": "i4",
        "name": "水发香菇",
        "amountText": "2朵",
        "category": "produce"
      },
      {
        "id": "i5",
        "name": "盐",
        "amountText": "4克",
        "category": "seasoning"
      },
      {
        "id": "i7",
        "name": "香油",
        "amountText": "3克",
        "category": "seasoning"
      },
      {
        "id": "i10",
        "name": "水淀粉",
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
        "note": "香菇洗净，去蒂，切片；牡蛎肉洗净，沥干。"
      },
      {
        "id": "b2",
        "label": "炝香翻炒煮制",
        "sublabel": "Boil",
        "stageIndex": 1,
        "ingredientIds": [
          "i6",
          "i8",
          "i9"
        ],
        "note": "油烧至四成热，爆香葱段，加香菇、笋片略炒，加老抽炒匀，倒鱼高汤煮开。",
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
        "label": "调味勾芡",
        "sublabel": "Thicken",
        "stageIndex": 2,
        "ingredientIds": [
          "i2",
          "i5",
          "i7",
          "i10",
          "i3",
          "i4",
          "i11"
        ],
        "durationMinutes": 1,
        "note": "将豆腐下锅煮熟，放入牡蛎煮1分钟，加盐调味，倒水淀粉勾芡，淋香油即可。",
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
      "servingInstructions": "盛入汤碗趁热享用，羹汤浓稠滑润、牡蛎鲜美嫩滑、豆腐软嫩温润，高锌补钙"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00043.html#sigil_toc_id_224 · 周三　适量补充矿物质，预防老年慢性病 · 牡蛎豆腐羹",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00043.html#sigil_toc_id_224"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：牡蛎是头号补锌食材，可以帮助老年人增强食欲、调节免疫能力；豆腐中钙、磷、镁较丰富，能帮助老年人对抗骨质疏松症等。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-143",
    "version": "3.0",
    "status": "published",
    "title": "🦐 蒜香海带丝",
    "coverImageUrl": "/recipe-covers/cn-143.webp",
    "description": "营养师张晔健康食谱·周三　适量补充矿物质，预防老年慢性病",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "中式熟铁炒锅 (Wok)",
      "servings": "2-3 人份",
      "prepNotes": "准备25分钟 · 烹调10分钟"
    },
    "cookingTimeText": "准备25分钟 · 烹调10分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "水发海带丝",
        "amountText": "100克",
        "category": "produce"
      },
      {
        "id": "i2",
        "name": "蒜泥",
        "amountText": "5克",
        "category": "produce"
      },
      {
        "id": "i3",
        "name": "熟黑芝麻",
        "amountText": "5克",
        "category": "produce"
      },
      {
        "id": "i4",
        "name": "盐",
        "amountText": "2克",
        "category": "seasoning"
      },
      {
        "id": "i5",
        "name": "生抽",
        "amountText": "8克",
        "category": "seasoning"
      },
      {
        "id": "i6",
        "name": "醋",
        "amountText": "8克",
        "category": "seasoning"
      },
      {
        "id": "i7",
        "name": "香油",
        "amountText": "少许",
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
          "i1"
        ],
        "note": "海带丝洗净后过滚水焯烫，沥干。"
      },
      {
        "id": "b2",
        "label": "拌匀",
        "sublabel": "Toss",
        "stageIndex": 1,
        "ingredientIds": [
          "i2",
          "i3",
          "i4",
          "i5",
          "i6",
          "i7"
        ],
        "note": "在海带丝中倒入蒜泥，再浇上生抽、醋、香油、盐和熟黑芝麻拌匀即可。",
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
      "method": "serve",
      "role": "outcome",
      "label": "完成",
      "servingInstructions": "装盘稍浸入味享用，海带丝爽脆滑嫩、蒜香浓郁微酸开胃、芝麻醇香补钾排钠"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00043.html#sigil_toc_id_225 · 周三　适量补充矿物质，预防老年慢性病 · 蒜香海带丝",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00043.html#sigil_toc_id_225"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：这款菜中含有较多的钾和硒，钾可以促进钠的排出，调节血压；硒能够保护心血管、抗肿瘤。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-144",
    "version": "3.0",
    "status": "published",
    "title": "🦐 紫菜虾皮蛋花汤",
    "coverImageUrl": "/recipe-covers/cn-144.webp",
    "description": "营养师张晔健康食谱·周四　补充钙和维生素D，壮骨强身",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "高保温厚底砂锅 / 铸铁炖锅",
      "servings": "2-3 人份",
      "prepNotes": "准备10分钟 · 烹调10分钟"
    },
    "cookingTimeText": "准备10分钟 · 烹调10分钟",
    "ingredients": [
      {
        "id": "i2",
        "name": "虾皮",
        "amountText": "10克",
        "category": "main"
      },
      {
        "id": "i4",
        "name": "鸡蛋",
        "amountText": "1个",
        "category": "main"
      },
      {
        "id": "i1",
        "name": "紫菜",
        "amountText": "5克",
        "category": "produce"
      },
      {
        "id": "i3",
        "name": "黄瓜",
        "amountText": "50克",
        "category": "produce"
      },
      {
        "id": "i5",
        "name": "鸡精",
        "amountText": "2克",
        "category": "seasoning"
      },
      {
        "id": "i6",
        "name": "葱花",
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
        "note": "紫菜洗净，撕碎，与虾皮放碗中；鸡蛋磕开，搅匀；黄瓜洗净，切片。"
      },
      {
        "id": "b2",
        "label": "煮制淋汁调味",
        "sublabel": "Boil",
        "stageIndex": 1,
        "ingredientIds": [
          "i5",
          "i6",
          "i7",
          "i8"
        ],
        "note": "油烧热，加入葱花炝香，放适量水烧开，倒入紫菜，虾皮，淋入鸡蛋液，待蛋花浮起时，放入黄瓜片，加香油、鸡精调味即可。",
        "completionState": "蛋花浮起",
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
      "servingInstructions": "盛入汤碗趁热享用，蛋花如丝云轻柔滑、紫菜虾皮鲜香醇浓、黄瓜清脆爽口补钙壮骨"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00044.html#sigil_toc_id_226 · 周四　补充钙和维生素D，壮骨强身 · 紫菜虾皮蛋花汤",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00044.html#sigil_toc_id_226"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：三者搭配的这款汤，不仅含钙量高，而且含有镁、磷等矿物质，能促进钙的吸收，补钙效果好。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-145",
    "version": "3.0",
    "status": "published",
    "title": "🥩 玲珑牛奶馒头",
    "coverImageUrl": "/recipe-covers/cn-145.webp",
    "description": "营养师张晔健康食谱·周四　补充钙和维生素D，壮骨强身",
    "cuisine": "chinese",
    "difficulty": "hard",
    "prerequisites": {
      "containerSize": "多层不锈钢蒸锅 (Steamer)",
      "servings": "2-3 人份",
      "prepNotes": "准备1.5小时 · 烹调20分钟"
    },
    "cookingTimeText": "准备1.5小时 · 烹调20分钟",
    "ingredients": [
      {
        "id": "i2",
        "name": "牛奶",
        "amountText": "240毫升",
        "category": "main"
      },
      {
        "id": "i1",
        "name": "面粉",
        "amountText": "400克",
        "category": "produce"
      },
      {
        "id": "i3",
        "name": "发酵粉",
        "amountText": "5克",
        "category": "seasoning"
      },
      {
        "id": "i4",
        "name": "白糖",
        "amountText": "15克",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "揉面醒发拌匀",
        "sublabel": "Mix",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2",
          "i3",
          "i4"
        ],
        "durationText": "1h + 5m",
        "note": "将白糖和发酵粉倒入温牛奶中，搅拌均匀后静置5分钟左右，然后和面。和好的面团盖上保鲜膜再醒发1小时。"
      },
      {
        "id": "b2",
        "label": "揉面醒发",
        "sublabel": "Proof",
        "stageIndex": 1,
        "ingredientIds": [],
        "note": "发好的面团在案板上用力揉十分钟左右，揉至光滑，并尽量使面团内部无气泡。",
        "completionState": "光滑",
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
        "label": "蒸制揉面醒发",
        "sublabel": "Steam",
        "stageIndex": 2,
        "ingredientIds": [],
        "durationMinutes": 20,
        "note": "将揉好的面做出馒头形状，放入蒸笼里，盖上锅盖，再次让它醒发20分钟，这步很关键，第二次发酵后蒸出来的馒头更松软。",
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
        "durationMinutes": 20,
        "durationText": "15m + 5m",
        "note": "凉水上锅蒸15分钟，时间到后关火，焖5分钟开盖即可。",
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
      "servingInstructions": "趁热揭盖捡出装盘享用，馒头小巧玲珑、洁白松软、奶香浓郁清甜适口"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00044.html#sigil_toc_id_227 · 周四　补充钙和维生素D，壮骨强身 · 玲珑牛奶馒头",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00044.html#sigil_toc_id_227"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "烹饪妙招：馒头揉成形后放入蒸笼进行二次醒发20分钟是松软的关键；关火后焖5分钟再开盖，可防止馒头表面回缩塌陷。",
      "营养笔记：牛奶富含优质钙与优质蛋白，用牛奶替代温水和面做馒头，不仅奶香浓郁，还能强化主食中的钙和B族维生素，促进骨骼强健。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-146",
    "version": "3.0",
    "status": "published",
    "title": "🍗 小葱炒鸡蛋",
    "coverImageUrl": "/recipe-covers/cn-146.webp",
    "description": "营养师张晔健康食谱·周五　食物松软易消化，健脾利胃",
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
        "name": "鸡蛋",
        "amountText": "2个",
        "category": "main"
      },
      {
        "id": "i2",
        "name": "小葱",
        "amountText": "30克",
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
        "name": "植物油",
        "amountText": "适量",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "切配打散调味",
        "sublabel": "Season",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2",
          "i3",
          "i4"
        ],
        "note": "小葱洗净，切细粒；鸡蛋磕入碗中，打散，加入盐搅匀。"
      },
      {
        "id": "b2",
        "label": "炝香",
        "sublabel": "Sauté",
        "stageIndex": 1,
        "ingredientIds": [],
        "heatLevel": "六成热",
        "note": "油烧至六成热，下小葱爆香，迅速倒入蛋液，并用筷子搅散成小块即可。",
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
      "servingInstructions": "出锅装盘趁热享用，蛋块金黄松软、葱香扑鼻柔滑多汁、开胃健脾极易消化"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00045.html#sigil_toc_id_228 · 周五　食物松软易消化，健脾利胃 · 小葱炒鸡蛋",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00045.html#sigil_toc_id_228"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：这款菜口感松软、易于消化，小葱有助于促进食欲，预防消化不良，非常适合老年人食用。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-147",
    "version": "3.0",
    "status": "published",
    "title": "🍳 松仁玉米",
    "coverImageUrl": "/recipe-covers/cn-147.webp",
    "description": "营养师张晔健康食谱·周五　食物松软易消化，健脾利胃",
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
        "id": "i1",
        "name": "玉米粒",
        "amountText": "300克",
        "category": "produce"
      },
      {
        "id": "i3",
        "name": "青椒",
        "amountText": "20克",
        "category": "produce"
      },
      {
        "id": "i4",
        "name": "红椒",
        "amountText": "15克",
        "category": "produce"
      },
      {
        "id": "i2",
        "name": "松子仁",
        "amountText": "50克",
        "category": "produce"
      },
      {
        "id": "i7",
        "name": "植物油",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i5",
        "name": "白糖",
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
        "id": "i8",
        "name": "葱花",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i9",
        "name": "香油",
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
          "i3",
          "i4"
        ],
        "note": "青椒、红椒分别洗净，去蒂和子，切成小丁；玉米粒放入沸水中煮至八成熟，捞出沥干。",
        "completionState": "八成熟"
      },
      {
        "id": "b2",
        "label": "煎制装盘",
        "sublabel": "Sear",
        "stageIndex": 1,
        "ingredientIds": [
          "i2",
          "i7"
        ],
        "note": "油烧至温热，放入松子仁，煎至淡黄色，出锅。",
        "completionState": "温热",
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
        "label": "炝香装盘",
        "sublabel": "Sauté",
        "stageIndex": 2,
        "ingredientIds": [
          "i5",
          "i6",
          "i8",
          "i9"
        ],
        "heatLevel": "六成热",
        "note": "再倒油，烧至六成热，下葱花煸香，倒青椒丁、红椒丁、玉米粒炒熟，调入盐、白糖、香油，出锅后撒上松子仁即可。",
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
      "servingInstructions": "出锅装盘趁热享用，松仁金黄香脆、玉米粒清甜爆汁、色彩缤纷甘香润肠"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00045.html#sigil_toc_id_229 · 周五　食物松软易消化，健脾利胃 · 松仁玉米",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00045.html#sigil_toc_id_229"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：这款菜可以给老年人提供膳食纤维，刺激肠蠕动，预防老年便秘。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-148",
    "version": "3.0",
    "status": "published",
    "title": "🥢 红枣芝麻红豆豆浆",
    "coverImageUrl": "/recipe-covers/cn-148.webp",
    "description": "营养师张晔健康食谱·周六　从食物中补铁，防止老年人贫血",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "全自动豆浆机 (Soy Milk Maker)",
      "preheat": "提前一晚浸泡",
      "servings": "2-3 人份",
      "prepNotes": "准备8小时 · 烹调20分钟"
    },
    "cookingTimeText": "准备8小时 · 烹调20分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "红豆",
        "amountText": "50克",
        "category": "produce"
      },
      {
        "id": "i2",
        "name": "枸杞子",
        "amountText": "10克",
        "category": "produce"
      },
      {
        "id": "i3",
        "name": "红枣",
        "amountText": "15克",
        "category": "produce"
      },
      {
        "id": "i4",
        "name": "熟黑芝麻",
        "amountText": "10克",
        "category": "produce"
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
        "note": "红豆用清水洗净，提前一晚浸泡；红枣洗净，去核，切碎；黑芝麻擀碎；枸杞子清洗干净。"
      },
      {
        "id": "b2",
        "label": "煮制",
        "sublabel": "Boil",
        "stageIndex": 1,
        "ingredientIds": [],
        "note": "将上述食材一同倒入全自动豆浆机中，加水至上、下水位线之间，按下“豆浆”键，煮至豆浆机提示豆浆做好，凉至温热饮用即可。",
        "completionState": "上、下水位线之间",
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
      "method": "boil",
      "role": "outcome",
      "label": "完成",
      "servingInstructions": "倒入杯中趁温热饮用，豆浆细腻浓醇、枣香芝麻香浓郁甘醇、温润补血益气"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00046.html#sigil_toc_id_230 · 周六　从食物中补铁，防止老年人贫血 · 红枣芝麻红豆豆浆",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00046.html#sigil_toc_id_230"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：红枣和红豆能补气血、健脾胃、增强免疫力；黑芝麻能补血生血。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-149",
    "version": "3.0",
    "status": "published",
    "title": "🥩 菠菜炒猪肝",
    "coverImageUrl": "/recipe-covers/cn-149.webp",
    "description": "营养师张晔健康食谱·周六　从食物中补铁，防止老年人贫血",
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
        "name": "猪肝",
        "amountText": "250克",
        "category": "main"
      },
      {
        "id": "i2",
        "name": "菠菜",
        "amountText": "100克",
        "category": "produce"
      },
      {
        "id": "i3",
        "name": "水淀粉",
        "amountText": "30克",
        "category": "seasoning"
      },
      {
        "id": "i4",
        "name": "料酒",
        "amountText": "10克",
        "category": "seasoning"
      },
      {
        "id": "i5",
        "name": "醋",
        "amountText": "10克",
        "category": "seasoning"
      },
      {
        "id": "i6",
        "name": "葱末",
        "amountText": "5克",
        "category": "seasoning"
      },
      {
        "id": "i7",
        "name": "姜末",
        "amountText": "5克",
        "category": "seasoning"
      },
      {
        "id": "i8",
        "name": "蒜末",
        "amountText": "5克",
        "category": "seasoning"
      },
      {
        "id": "i9",
        "name": "白糖",
        "amountText": "5克",
        "category": "seasoning"
      },
      {
        "id": "i10",
        "name": "盐",
        "amountText": "3克",
        "category": "seasoning"
      },
      {
        "id": "i11",
        "name": "植物油",
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
        "label": "切配焯烫沥干备用",
        "sublabel": "Blanch",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2",
          "i3",
          "i4"
        ],
        "note": "猪肝洗净，切片，加水淀粉、料酒抓匀上浆；菠菜择洗干净，焯水，捞出沥干，切段。",
        "completionState": "捞出沥干"
      },
      {
        "id": "b2",
        "label": "炝香翻炒勾芡",
        "sublabel": "Stir-fry",
        "stageIndex": 1,
        "ingredientIds": [
          "i5",
          "i6",
          "i7",
          "i8",
          "i9",
          "i10",
          "i12",
          "i11"
        ],
        "heatLevel": "六成热",
        "note": "锅置火上，倒油烧至六成热，炒香葱末、姜末、蒜末，放猪肝片炒散，放菠菜、盐、白糖翻匀，调鸡精、醋，用水淀粉勾芡即可。",
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
      "servingInstructions": "出锅装盘趁热享用，猪肝鲜嫩爽滑不腥、菠菜碧绿柔嫩微甜、酸甜咸鲜补血明目"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00046.html#sigil_toc_id_231 · 周六　从食物中补铁，防止老年人贫血 · 菠菜炒猪肝",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00046.html#sigil_toc_id_231"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：菠菜、猪肝中都是补铁的佳品，菠菜中维生素C的含量也较高，维生素C可以促进铁的吸收。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-150",
    "version": "3.0",
    "status": "published",
    "title": "🥣 小窝窝头",
    "coverImageUrl": "/recipe-covers/cn-150.webp",
    "description": "营养师张晔健康食谱·周日　适量补充维生素，提高抗病能力",
    "cuisine": "chinese",
    "difficulty": "medium",
    "prerequisites": {
      "containerSize": "多层不锈钢蒸锅 (Steamer)",
      "servings": "2-3 人份",
      "prepNotes": "准备25分钟 · 烹调25分钟"
    },
    "cookingTimeText": "准备25分钟 · 烹调25分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "玉米面",
        "amountText": "400克",
        "category": "produce"
      },
      {
        "id": "i2",
        "name": "黄豆面",
        "amountText": "100克",
        "category": "produce"
      },
      {
        "id": "i3",
        "name": "白糖",
        "amountText": "30克",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "拌匀成型",
        "sublabel": "Shape",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2",
          "i3"
        ],
        "note": "将玉米面、黄豆面、白糖一起放入盆中，加适量清水和匀，搓成2厘米粗的细条，下剂子。"
      },
      {
        "id": "b2",
        "label": "成型",
        "sublabel": "Shape",
        "stageIndex": 1,
        "ingredientIds": [],
        "note": "将面剂子搓成圆球形状，在圆球中间钻一个小洞，边钻边转，直到上端成尖且内外光滑，即成窝头生坯。",
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
        "label": "蒸制",
        "sublabel": "Steam",
        "stageIndex": 2,
        "ingredientIds": [],
        "heatLevel": "大火",
        "durationMinutes": 25,
        "note": "将窝头生坯放入蒸锅中，大火蒸25分钟即可。",
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
      "servingInstructions": "趁热捡出装盘享用，窝头金黄规整、口感松软清香、微甜适口、富含粗纤维"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00047.html#sigil_toc_id_232 · 周日　适量补充维生素，提高抗病能力 · 小窝窝头",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00047.html#sigil_toc_id_232"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：玉米面和黄豆面搭配的这款窝头中含有较多的维生素B1 、烟酸和维生素E。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-151",
    "version": "3.0",
    "status": "published",
    "title": "🥩 胡萝卜炒牛肉丝",
    "coverImageUrl": "/recipe-covers/cn-151.webp",
    "description": "营养师张晔健康食谱·周日　适量补充维生素，提高抗病能力",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "中式熟铁炒锅 (Wok)",
      "preheat": "腌渍10分钟",
      "servings": "2-3 人份",
      "prepNotes": "准备20分钟 · 烹调10分钟"
    },
    "cookingTimeText": "准备20分钟 · 烹调10分钟",
    "ingredients": [
      {
        "id": "i2",
        "name": "牛肉",
        "amountText": "200克",
        "category": "main"
      },
      {
        "id": "i1",
        "name": "胡萝卜",
        "amountText": "100克",
        "category": "produce"
      },
      {
        "id": "i3",
        "name": "酱油",
        "amountText": "10克",
        "category": "seasoning"
      },
      {
        "id": "i4",
        "name": "淀粉",
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
        "name": "葱段",
        "amountText": "10克",
        "category": "seasoning"
      },
      {
        "id": "i7",
        "name": "姜末",
        "amountText": "5克",
        "category": "seasoning"
      },
      {
        "id": "i8",
        "name": "盐",
        "amountText": "4克",
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
        "label": "切配调味腌浆",
        "sublabel": "Marinate",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2",
          "i3",
          "i4",
          "i5",
          "i6",
          "i7"
        ],
        "durationMinutes": 10,
        "note": "牛肉洗净，切成肉丝，用葱段、姜末、淀粉、料酒和酱油调味，腌渍10分钟；胡萝卜洗净，切成细丝。"
      },
      {
        "id": "b2",
        "label": "翻炒调味",
        "sublabel": "Stir-fry",
        "stageIndex": 1,
        "ingredientIds": [
          "i8",
          "i9"
        ],
        "note": "锅内倒油烧热，放入牛肉丝迅速翻炒，倒入胡萝卜丝，炒至变熟，加盐调味即可。",
        "completionState": "变熟",
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
      "servingInstructions": "出锅装盘趁热享用，牛肉丝滑嫩多汁、胡萝卜丝软甜油润、营养丰富增强免疫力"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00047.html#sigil_toc_id_233 · 周日　适量补充维生素，提高抗病能力 · 胡萝卜炒牛肉丝",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00047.html#sigil_toc_id_233"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "烹饪妙招：牛肉丝顺着纹理切条，加料酒、淀粉和酱油抓匀腌渍上浆，下锅迅速滑散，肉质鲜嫩不柴。",
      "营养笔记：胡萝卜富含β-胡萝卜素，牛肉富含优质蛋白质与血红素铁，胡萝卜素溶于油脂后更易被人体吸收转化，二者同炒可滋养脾胃、改善贫血、提高老年人机体抗病力。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  }
]
