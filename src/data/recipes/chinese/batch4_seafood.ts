import type { VisualRecipeV3 } from '@/types/recipeV3'

/**
 * 营养师张晔《蒸炖炒，营养师的健康食谱》原书真值 - 美味海鲜 (水产矿物质滋补)
 * 共 7 道食谱 (100% 严格原子食材建模，一人一行，无复合食材)
 */
export const BATCH4_SEAFOOD: VisualRecipeV3[] = [
  {
    "id": "cn-55",
    "version": "3.0",
    "status": "published",
    "title": "🐟 泡椒蒸鱼块",
    "coverImageUrl": "/recipe-covers/cn-55.webp",
    "description": "营养师张晔健康食谱·美味海鲜 让丰富矿物质和优质蛋白质滋补身体",
    "cuisine": "chinese",
    "difficulty": "medium",
    "prerequisites": {
      "containerSize": "多层不锈钢蒸锅 (Steamer)",
      "preheat": "腌渍15分钟",
      "servings": "2-3 人份",
      "prepNotes": "准备15分钟 · 烹调15分钟"
    },
    "cookingTimeText": "准备15分钟 · 烹调15分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "草鱼块",
        "amountText": "300克",
        "category": "main"
      },
      {
        "id": "i2",
        "name": "泡椒",
        "amountText": "50克",
        "category": "produce"
      },
      {
        "id": "i5",
        "name": "盐",
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
        "name": "蒸鱼豉油",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i8",
        "name": "蒜蓉",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i9",
        "name": "姜末",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i3",
        "name": "红尖椒段",
        "amountText": "20克",
        "category": "produce"
      },
      {
        "id": "i4",
        "name": "植物油",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i10",
        "name": "香菜段",
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
          "i5",
          "i6",
          "i7",
          "i8",
          "i9"
        ],
        "durationMinutes": 15,
        "note": "泡椒洗净，剁碎，加姜末、蒜蓉、盐、料酒，和草鱼块拌匀，腌渍15分钟。"
      },
      {
        "id": "b2",
        "label": "蒸制",
        "sublabel": "Steam",
        "stageIndex": 1,
        "ingredientIds": [],
        "durationMinutes": 12,
        "durationText": "10m + 2m",
        "note": "将草鱼块放入蒸锅中蒸10分钟，关火后再焖2分钟，取出。",
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
        "label": "淋汁",
        "sublabel": "Dress",
        "stageIndex": 2,
        "ingredientIds": [
          "i3",
          "i4",
          "i10"
        ],
        "note": "蒸好的草鱼中倒入适量蒸鱼豉油，放入红尖椒段，淋上烧热的植物油，撒上香菜段即可。",
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
      "servingInstructions": "出锅浇热油撒香菜趁热享用，鱼肉细嫩入味、酸辣开胃爽口"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00009.html#sigil_toc_id_105 · 美味海鲜 让丰富矿物质和优质蛋白质滋补身体 · 泡椒蒸鱼块",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00009.html#sigil_toc_id_105"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：草鱼富含不饱和脂肪酸，有利于血液循环，是心血管病患者的理想食物。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-56",
    "version": "3.0",
    "status": "published",
    "title": "🐟 红烧鱼豆腐",
    "coverImageUrl": "/recipe-covers/cn-56.webp",
    "description": "营养师张晔健康食谱·美味海鲜 让丰富矿物质和优质蛋白质滋补身体",
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
        "id": "i1",
        "name": "鲤鱼块",
        "amountText": "300克",
        "category": "main"
      },
      {
        "id": "i2",
        "name": "豆腐",
        "amountText": "200克",
        "category": "main"
      },
      {
        "id": "i5",
        "name": "白糖",
        "amountText": "5克",
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
        "name": "生抽",
        "amountText": "5克",
        "category": "seasoning"
      },
      {
        "id": "i8",
        "name": "料酒",
        "amountText": "10克",
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
        "name": "淀粉",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i11",
        "name": "胡椒粉",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i3",
        "name": "葱段",
        "amountText": "5克",
        "category": "seasoning"
      },
      {
        "id": "i13",
        "name": "姜片",
        "amountText": "5克",
        "category": "seasoning"
      },
      {
        "id": "i4",
        "name": "蒜片",
        "amountText": "适量",
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
        "label": "腌浆切配调汁",
        "sublabel": "Mix sauce",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2",
          "i5",
          "i6",
          "i7",
          "i8",
          "i9",
          "i10",
          "i11",
          "i13"
        ],
        "note": "鲤鱼块加姜片、料酒、盐、胡椒粉腌渍；豆腐切片；取小碗放生抽、白糖、醋、盐、料酒、淀粉、水调成味汁。"
      },
      {
        "id": "b2",
        "label": "炖煮煮制",
        "sublabel": "Boil",
        "stageIndex": 1,
        "ingredientIds": [
          "i3",
          "i4",
          "i12"
        ],
        "heatLevel": "小火",
        "durationMinutes": 10,
        "note": "油烧热，放入鲤鱼块，小火煎至金黄色捞出。锅内再添少许油，爆香葱段、蒜片，倒味汁烧开，下入豆腐片、煎好的鱼块，盖上锅盖，炖10分钟即可。",
        "completionState": "金黄色捞出",
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
      "servingInstructions": "连同浓郁红烧汤汁盛入煲中趁热享用，鱼块外酥内嫩、豆腐吸饱鲜汁"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00009.html#sigil_toc_id_107 · 美味海鲜 让丰富矿物质和优质蛋白质滋补身体 · 红烧鱼豆腐",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00009.html#sigil_toc_id_107"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：鲤鱼除含有优质蛋白外，还含有维生素A、维生素D、人体必需的氨基酸及矿物质；豆腐含大量钙质，搭配食用，可补脾健胃、促进营养吸收。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-57",
    "version": "3.0",
    "status": "published",
    "title": "🐟 奶白鲫鱼汤",
    "coverImageUrl": "/recipe-covers/cn-57.webp",
    "description": "营养师张晔健康食谱·美味海鲜 让丰富矿物质和优质蛋白质滋补身体",
    "cuisine": "chinese",
    "difficulty": "medium",
    "prerequisites": {
      "containerSize": "高保温厚底砂锅 / 铸铁炖锅",
      "servings": "2-3 人份",
      "prepNotes": "准备15分钟 · 烹调40分钟"
    },
    "cookingTimeText": "准备15分钟 · 烹调40分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "鲫鱼",
        "amountText": "300克",
        "category": "main"
      },
      {
        "id": "i2",
        "name": "豆腐",
        "amountText": "200克",
        "category": "main"
      },
      {
        "id": "i5",
        "name": "料酒",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i3",
        "name": "盐",
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
        "id": "i8",
        "name": "姜片",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i4",
        "name": "香菜段",
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
        "label": "切配",
        "sublabel": "Prep",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2"
        ],
        "note": "鲫鱼去鳞、鳃和内脏，洗净，控水；豆腐切方块。"
      },
      {
        "id": "b2",
        "label": "煎制煮制",
        "sublabel": "Boil",
        "stageIndex": 1,
        "ingredientIds": [
          "i6",
          "i7",
          "i8",
          "i5",
          "i3"
        ],
        "heatLevel": "大火",
        "note": "炒锅置火上，放油烧热，先下葱段、姜片，待爆出香味时，放入鲫鱼煎至两面金黄后，加料酒、盐，至酒香溢出时，加3大碗冷水大火煮沸。",
        "completionState": "爆出香味",
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
          "i4"
        ],
        "heatLevel": "大火",
        "durationMinutes": 40,
        "durationText": "10m + 30m",
        "note": "煮沸后，大火继续炖10分钟，放入豆腐片，再次煮沸后转小火炖30分钟左右，放入香菜段即可。",
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
      "servingInstructions": "盛入大汤碗趁热享用，汤色奶白醇厚、鱼肉鲜美豆腐细嫩"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00009.html#sigil_toc_id_109 · 美味海鲜 让丰富矿物质和优质蛋白质滋补身体 · 奶白鲫鱼汤",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00009.html#sigil_toc_id_109"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：鲫鱼含有丰富的磷、钾等矿物质，能有效地溶解沉积在血管壁上的胆固醇硬化斑块，维持良好的血管环境，防止动脉粥样硬化等心血管疾病。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-58",
    "version": "3.0",
    "status": "published",
    "title": "🦐 蒜蓉基围虾",
    "coverImageUrl": "/recipe-covers/cn-58.webp",
    "description": "营养师张晔健康食谱·美味海鲜 让丰富矿物质和优质蛋白质滋补身体",
    "cuisine": "chinese",
    "difficulty": "medium",
    "prerequisites": {
      "containerSize": "多层不锈钢蒸锅 (Steamer)",
      "servings": "2-3 人份",
      "prepNotes": "准备5分钟 · 烹调5分钟"
    },
    "cookingTimeText": "准备5分钟 · 烹调5分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "基围虾",
        "amountText": "300克",
        "category": "main"
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
        "name": "鸡精",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i6",
        "name": "蚝油",
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
        "id": "i8",
        "name": "胡椒粉",
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
        "id": "i10",
        "name": "姜末",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i11",
        "name": "鲜汤",
        "amountText": "适量",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "切配组合装填",
        "sublabel": "Assemble",
        "stageIndex": 0,
        "ingredientIds": [
          "i1"
        ],
        "note": "基围虾洗净，整齐摆入盘中。"
      },
      {
        "id": "b2",
        "label": "炝香拌匀",
        "sublabel": "Sauté",
        "stageIndex": 1,
        "ingredientIds": [
          "i2",
          "i3",
          "i4",
          "i5",
          "i6",
          "i7",
          "i8",
          "i9",
          "i10",
          "i11"
        ],
        "note": "锅置火上，倒植物油烧热，放入蒜蓉爆香，加姜末、盐、鸡精、蚝油、料酒、胡椒粉、鲜汤炒香，出锅，装入碗中，倒入水淀粉拌匀。",
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
        "label": "淋汁装盘蒸制",
        "sublabel": "Steam",
        "stageIndex": 2,
        "ingredientIds": [],
        "durationMinutes": 3,
        "note": "用汤勺将蒜蓉酱汁浇在虾肉上，上笼蒸3分钟，取出，淋上热油即可。",
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
      "servingInstructions": "淋上滚烫明油整盘端上趁热享用，虾肉紧实弹牙、蒜香浓郁扑鼻"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00009.html#sigil_toc_id_111 · 美味海鲜 让丰富矿物质和优质蛋白质滋补身体 · 蒜蓉基围虾",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00009.html#sigil_toc_id_111"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：虾肉中富含镁元素，能减少血液中胆固醇的含量，保护心血管系统。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-59",
    "version": "3.0",
    "status": "published",
    "title": "🍅 番茄炖牡蛎",
    "coverImageUrl": "/recipe-covers/cn-59.webp",
    "description": "营养师张晔健康食谱·美味海鲜 让丰富矿物质和优质蛋白质滋补身体",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "高保温厚底砂锅 / 铸铁炖锅",
      "servings": "2-3 人份",
      "prepNotes": "准备5分钟 · 烹调10分钟"
    },
    "cookingTimeText": "准备5分钟 · 烹调10分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "牡蛎肉",
        "amountText": "200克",
        "category": "main"
      },
      {
        "id": "i2",
        "name": "番茄",
        "amountText": "100克",
        "category": "produce"
      },
      {
        "id": "i5",
        "name": "盐",
        "amountText": "2克",
        "category": "seasoning"
      },
      {
        "id": "i3",
        "name": "胡椒粉",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i4",
        "name": "葱末",
        "amountText": "适量",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "沥干备用切配",
        "sublabel": "Prep",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2",
          "i5"
        ],
        "note": "牡蛎肉用少许盐抓去杂质，清洗干净，再沥干水分；番茄放开水中烫一下，去皮、切块。"
      },
      {
        "id": "b2",
        "label": "煮制",
        "sublabel": "Boil",
        "stageIndex": 1,
        "ingredientIds": [
          "i3",
          "i4"
        ],
        "note": "炖锅内放清水烧开，倒入番茄块、盐、胡椒粉，最后将牡蛎肉、葱花入锅，煮至牡蛎肉熟即可。",
        "completionState": "牡蛎肉熟",
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
      "servingInstructions": "盛入汤碗趁热享用，酸甜开胃、牡蛎肥嫩多汁鲜美"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00009.html#sigil_toc_id_113 · 美味海鲜 让丰富矿物质和优质蛋白质滋补身体 · 番茄炖牡蛎",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00009.html#sigil_toc_id_113"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：牡蛎中所含丰富的牛磺酸有明显的保肝利胆作用；牡蛎还含有丰富的B族维生素，有利于维护神经系统的健康，可预防和辅助治疗高脂血症。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-60",
    "version": "3.0",
    "status": "published",
    "title": "🦐 蒜蓉粉丝蒸扇贝",
    "coverImageUrl": "/recipe-covers/cn-60.webp",
    "description": "营养师张晔健康食谱·美味海鲜 让丰富矿物质和优质蛋白质滋补身体",
    "cuisine": "chinese",
    "difficulty": "medium",
    "prerequisites": {
      "containerSize": "多层不锈钢蒸锅 (Steamer)",
      "servings": "2-3 人份",
      "prepNotes": "准备5分钟 · 烹调5分钟"
    },
    "cookingTimeText": "准备5分钟 · 烹调5分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "扇贝",
        "amountText": "350克（6个）",
        "category": "main"
      },
      {
        "id": "i2",
        "name": "粉丝",
        "amountText": "50克",
        "category": "produce"
      },
      {
        "id": "i3",
        "name": "蒜蓉",
        "amountText": "50克",
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
        "name": "豉汁",
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
        "id": "i9",
        "name": "姜末",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i7",
        "name": "葱花",
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
        "label": "泡发组合装填",
        "sublabel": "Assemble",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2"
        ],
        "note": "粉丝剪断，用沸水泡软；扇贝放入水中，吐净泥沙，用小刀把扇贝肉从贝壳上剔下，扇贝壳烫后摆入大盘中。"
      },
      {
        "id": "b2",
        "label": "拌匀",
        "sublabel": "Toss",
        "stageIndex": 1,
        "ingredientIds": [
          "i3",
          "i4",
          "i5",
          "i6",
          "i9"
        ],
        "note": "取一小碗，放入白糖、豉汁、蒜蓉、姜末、盐拌匀。",
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
          "i7",
          "i8"
        ],
        "heatLevel": "大火",
        "durationMinutes": 5,
        "note": "把粉丝放在贝壳上，然后依次放入扇贝肉，淋上拌好的调料，上笼大火蒸约5分钟后取出，撒上葱花，再浇上少许熟植物油即可。",
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
      "servingInstructions": "出锅淋上滚烫明油趁热享用，扇贝鲜甜弹嫩、粉丝吸满蒜香精华"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00009.html#sigil_toc_id_115 · 美味海鲜 让丰富矿物质和优质蛋白质滋补身体 · 蒜蓉粉丝蒸扇贝",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00009.html#sigil_toc_id_115"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：扇贝富含蛋白质和核黄素，能帮助降低血清胆固醇；粉丝吸收贝肉鲜汁，大蒜素抗菌提鲜，低脂高蛋白。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-61",
    "version": "3.0",
    "status": "published",
    "title": "🦐 姜丝蒸蟹",
    "coverImageUrl": "/recipe-covers/cn-61.webp",
    "description": "营养师张晔健康食谱·美味海鲜 让丰富矿物质和优质蛋白质滋补身体",
    "cuisine": "chinese",
    "difficulty": "medium",
    "prerequisites": {
      "containerSize": "多层不锈钢蒸锅 (Steamer)",
      "preheat": "提前放在盐水中浸泡半小时",
      "servings": "2-3 人份",
      "prepNotes": "准备10分钟 · 烹调20分钟"
    },
    "cookingTimeText": "准备10分钟 · 烹调20分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "螃蟹",
        "amountText": "2只",
        "category": "main"
      },
      {
        "id": "i7",
        "name": "盐水",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i2",
        "name": "醋",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i3",
        "name": "白糖",
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
        "name": "香油",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i6",
        "name": "生姜",
        "amountText": "适量",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "泡发",
        "sublabel": "Soak",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i7"
        ],
        "note": "螃蟹提前放在盐水中浸泡半小时。蒸蟹前，先用刷子把关节处刷洗干净，再用干净的棉线将螃蟹绑住，然后将螃蟹背壳向下，腹白向上，放在蒸盘中摆好。"
      },
      {
        "id": "b2",
        "label": "切配蒸制",
        "sublabel": "Steam",
        "stageIndex": 1,
        "ingredientIds": [
          "i6"
        ],
        "note": "姜洗净，切成两半，一半切丝，另一半切姜末，将姜丝放在螃蟹上，把蒸盘放到蒸锅里至螃蟹蒸熟。",
        "completionState": "螃蟹蒸熟",
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
        "label": "成型",
        "sublabel": "Shape",
        "stageIndex": 2,
        "ingredientIds": [
          "i2",
          "i3",
          "i4",
          "i5"
        ],
        "note": "锅置火上，倒入醋和姜末，烧沸，关火，加白糖、鸡精、香油，制成蘸料，放在碗碟里，随蒸好的螃蟹一同上桌即可。",
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
      "servingInstructions": "趁热揭开蟹盖蘸姜醋汁享用，蟹肉鲜甜紧实、黄膏丰腴脂香"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00009.html#sigil_toc_id_117 · 美味海鲜 让丰富矿物质和优质蛋白质滋补身体 · 姜丝蒸蟹",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00009.html#sigil_toc_id_117"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：螃蟹性寒，与姜搭配食用，有祛寒的效果。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  }
]
