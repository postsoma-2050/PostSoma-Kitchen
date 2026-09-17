import type { VisualRecipeV3 } from '@/types/recipeV3'

/**
 * 营养师张晔《蒸炖炒，营养师的健康食谱》原书真值 - 营养菌类与薯类 (微量元素与膳食纤维)
 * 共 8 道食谱 (100% 严格原子食材建模，一人一行，无复合食材)
 */
export const BATCH3_MUSHROOMS_TUBERS: VisualRecipeV3[] = [
  {
    "id": "cn-47",
    "version": "3.0",
    "status": "published",
    "title": "🍄 香菇藕丸",
    "description": "营养师张晔健康食谱·营养菌类及制品 优质蛋白质和微量元素的提供者",
    "cuisine": "chinese",
    "difficulty": "medium",
    "prerequisites": {
      "containerSize": "多层不锈钢蒸锅 (Steamer)",
      "servings": "2-3 人份",
      "prepNotes": "准备10分钟 · 烹调20分钟"
    },
    "cookingTimeText": "准备10分钟 · 烹调20分钟",
    "ingredients": [
      {
        "id": "i3",
        "name": "猪瘦肉",
        "amountText": "100克",
        "category": "main"
      },
      {
        "id": "i1",
        "name": "香菇",
        "amountText": "200克",
        "category": "produce"
      },
      {
        "id": "i2",
        "name": "莲藕",
        "amountText": "100克",
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
        "name": "淀粉",
        "amountText": "适量",
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
        "note": "香菇洗净、去蒂、切碎；猪瘦肉剁碎成末；莲藕洗净、削皮，用擦丝器磨成藕蓉，挤掉水分。"
      },
      {
        "id": "b2",
        "label": "拌匀成型蒸制",
        "sublabel": "Steam",
        "stageIndex": 1,
        "ingredientIds": [
          "i4",
          "i5"
        ],
        "note": "将香菇碎、肉末、藕蓉盛入同一个碗内，加入适量淀粉、少许盐，朝一个方向搅拌均匀后，用力捏成一个个小丸子。将小丸子放入蒸盘中。",
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
        "label": "煮制蒸制调味",
        "sublabel": "Steam",
        "stageIndex": 2,
        "ingredientIds": [
          "i6",
          "i7"
        ],
        "durationMinutes": 20,
        "note": "蒸锅内放清水煮沸后，将装小丸子的蒸盘放入锅内，盖上盖子，蒸20分钟左右，调入香油，撒上葱花即可。",
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
      "locator": "OEBPS/text00007.html#sigil_toc_id_85 · 营养菌类及制品 优质蛋白质和微量元素的提供者 · 香菇藕丸",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00007.html#sigil_toc_id_85"
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
    "id": "cn-48",
    "version": "3.0",
    "status": "published",
    "title": "🍄 金针菇培根卷",
    "description": "营养师张晔健康食谱·营养菌类及制品 优质蛋白质和微量元素的提供者",
    "cuisine": "chinese",
    "difficulty": "hard",
    "prerequisites": {
      "containerSize": "多层不锈钢蒸锅 (Steamer)",
      "servings": "2-3 人份",
      "prepNotes": "准备10分钟 · 烹调5分钟"
    },
    "cookingTimeText": "准备10分钟 · 烹调5分钟",
    "ingredients": [
      {
        "id": "i2",
        "name": "金针菇",
        "amountText": "100克",
        "category": "produce"
      },
      {
        "id": "i1",
        "name": "培根片",
        "amountText": "150克",
        "category": "produce"
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
        "name": "鸡精",
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
        "label": "切配焯烫沥干备用",
        "sublabel": "Blanch",
        "stageIndex": 0,
        "ingredientIds": [
          "i2"
        ],
        "note": "金针菇去黄蒂，洗净，入沸水锅中煮半分钟，捞出备用。"
      },
      {
        "id": "b2",
        "label": "成型装盘",
        "sublabel": "Plate",
        "stageIndex": 1,
        "ingredientIds": [
          "i1"
        ],
        "note": "培根片裹适量金针菇卷成卷，用牙签固定，做成培根金针菇卷，装盘。",
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
        "durationText": "3–5m",
        "note": "将装有培根金针菇卷的盘子放入蒸锅中，大火蒸3～5分钟，取出。",
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
        "label": "煮制装盘",
        "sublabel": "Boil",
        "stageIndex": 3,
        "ingredientIds": [
          "i3",
          "i4",
          "i5",
          "i6"
        ],
        "note": "锅中加少许水烧开，加少许生抽、胡椒粉、鸡精调味，用水淀粉勾芡，浇到盘中即可。",
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
      "locator": "OEBPS/text00007.html#sigil_toc_id_87 · 营养菌类及制品 优质蛋白质和微量元素的提供者 · 金针菇培根卷",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00007.html#sigil_toc_id_87"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：金针菇可促进机体的新陈代谢，培根中含有丰富的钠、磷、钾，二者搭配可促进营养的吸收和利用，有开胃祛寒、促进生长发育的功效。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-49",
    "version": "3.0",
    "status": "published",
    "title": "🍳 醋熘素什锦",
    "description": "营养师张晔健康食谱·营养菌类及制品 优质蛋白质和微量元素的提供者",
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
        "id": "i2",
        "name": "胡萝卜",
        "amountText": "40克",
        "category": "produce"
      },
      {
        "id": "i3",
        "name": "山药",
        "amountText": "60克",
        "category": "produce"
      },
      {
        "id": "i4",
        "name": "芹菜",
        "amountText": "60克",
        "category": "produce"
      },
      {
        "id": "i5",
        "name": "盐",
        "amountText": "2克",
        "category": "seasoning"
      },
      {
        "id": "i7",
        "name": "葱末",
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
        "name": "醋",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i11",
        "name": "水淀粉",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i1",
        "name": "干木耳",
        "amountText": "20克",
        "category": "produce"
      },
      {
        "id": "i6",
        "name": "姜片",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i8",
        "name": "鸡精",
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
        "label": "泡发沥干备用",
        "sublabel": "Hold",
        "stageIndex": 0,
        "ingredientIds": [
          "i2",
          "i3",
          "i4",
          "i5",
          "i7",
          "i9",
          "i10",
          "i11"
        ],
        "note": "木耳泡发，洗净，剪去根部，撕成小朵；山药去皮，切片；芹菜洗净，切成小段；胡萝卜洗净，切片；取另一小碗，放入盐、白糖、醋、葱末、水淀粉调成料汁，备用。"
      },
      {
        "id": "b2",
        "label": "炝香翻炒调味",
        "sublabel": "Stir-fry",
        "stageIndex": 1,
        "ingredientIds": [
          "i6",
          "i8",
          "i1",
          "i12"
        ],
        "heatLevel": "六成热",
        "durationMinutes": 1,
        "note": "油烧至六成热，爆香姜片，放入胡萝卜片、木耳煸炒1分钟，再放入山药片、芹菜段，一起煸炒至所有食材熟透，调入鸡精，浇上料汁略炒即可。",
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
      "locator": "OEBPS/text00007.html#sigil_toc_id_89 · 营养菌类及制品 优质蛋白质和微量元素的提供者 · 醋熘素什锦",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00007.html#sigil_toc_id_89"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：此菜可降血脂、降血糖，防治动脉粥样硬化、调节免疫功能。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-50",
    "version": "3.0",
    "status": "published",
    "title": "🍄 银耳百合雪梨汤",
    "description": "营养师张晔健康食谱·营养菌类及制品 优质蛋白质和微量元素的提供者",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "高保温厚底砂锅 / 铸铁炖锅",
      "servings": "2-3 人份",
      "prepNotes": "准备15分钟 · 烹调1小时"
    },
    "cookingTimeText": "准备15分钟 · 烹调1小时",
    "ingredients": [
      {
        "id": "i1",
        "name": "雪梨",
        "amountText": "2个",
        "category": "produce"
      },
      {
        "id": "i2",
        "name": "干银耳",
        "amountText": "20克",
        "category": "produce"
      },
      {
        "id": "i3",
        "name": "干百合",
        "amountText": "10克",
        "category": "produce"
      },
      {
        "id": "i4",
        "name": "枸杞子",
        "amountText": "10克",
        "category": "produce"
      },
      {
        "id": "i5",
        "name": "冰糖",
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
          "i2",
          "i3",
          "i4"
        ],
        "note": "干银耳泡发，洗净，剪去根部，撕成小朵；雪梨洗净，去皮、核，切成四方块；干百合洗净用水泡软；枸杞子洗净。"
      },
      {
        "id": "b2",
        "label": "煮制炖煮",
        "sublabel": "Simmer",
        "stageIndex": 1,
        "ingredientIds": [
          "i5"
        ],
        "heatLevel": "大火",
        "durationMinutes": 30,
        "note": "锅置火上，将撕好的银耳放进锅内，加没过食材的清水（可以多放些），大火烧开，然后改小火炖煮至银耳软烂时，放入百合、枸杞子、冰糖和雪梨块，加盖继续用小火慢炖30分钟即可。",
        "completionState": "银耳软烂",
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
      "locator": "OEBPS/text00007.html#sigil_toc_id_91 · 营养菌类及制品 优质蛋白质和微量元素的提供者 · 银耳百合雪梨汤",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00007.html#sigil_toc_id_91"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：银耳富含天然植物性胶质，并有滋阴功效，长期食用能起到润肤养颜的作用。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-51",
    "version": "3.0",
    "status": "published",
    "title": "🥔 荷香小米蒸红薯",
    "description": "营养师张晔健康食谱·不可或缺的薯类 富含膳食纤维，既可做主食也能当蔬菜",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "多层不锈钢蒸锅 (Steamer)",
      "preheat": "浸泡1小时",
      "servings": "2-3 人份",
      "prepNotes": "准备1小时 · 烹调30分钟"
    },
    "cookingTimeText": "准备1小时 · 烹调30分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "小米",
        "amountText": "80克",
        "category": "produce"
      },
      {
        "id": "i2",
        "name": "红薯",
        "amountText": "250克",
        "category": "produce"
      },
      {
        "id": "i3",
        "name": "荷叶1张",
        "amountText": "适量",
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
        "name": "葱花",
        "amountText": "3克",
        "category": "seasoning"
      },
      {
        "id": "i6",
        "name": "植物油",
        "amountText": "3克",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "切配泡发组合装填",
        "sublabel": "Assemble",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2",
          "i3"
        ],
        "durationText": "1h",
        "note": "红薯去皮，洗净，切条；小米洗净，浸泡1小时，捞出；荷叶洗净，铺在蒸屉上。"
      },
      {
        "id": "b2",
        "label": "蒸制",
        "sublabel": "Steam",
        "stageIndex": 1,
        "ingredientIds": [
          "i4",
          "i5",
          "i6"
        ],
        "durationMinutes": 30,
        "note": "将红薯条在小米中滚一下，沾满小米，排入蒸笼中，盖上蒸盖，蒸笼上汽后，蒸30分钟即可。",
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
      "locator": "OEBPS/text00008.html#sigil_toc_id_95 · 不可或缺的薯类 富含膳食纤维，既可做主食也能当蔬菜 · 荷香小米蒸红薯",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00008.html#sigil_toc_id_95"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：小米非常容易被消化吸收，养胃功效比较好；红薯富含膳食纤维，可维护肠道健康。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  },
  {
    "id": "cn-52",
    "version": "3.0",
    "status": "published",
    "title": "🥔 山药寿司",
    "description": "营养师张晔健康食谱·不可或缺的薯类 富含膳食纤维，既可做主食也能当蔬菜",
    "cuisine": "chinese",
    "difficulty": "hard",
    "prerequisites": {
      "containerSize": "多层不锈钢蒸锅 (Steamer)",
      "servings": "2-3 人份",
      "prepNotes": "准备10分钟 · 烹调35分钟"
    },
    "cookingTimeText": "准备10分钟 · 烹调35分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "山药",
        "amountText": "300克",
        "category": "produce"
      },
      {
        "id": "i2",
        "name": "胡萝卜",
        "amountText": "100克",
        "category": "produce"
      },
      {
        "id": "i3",
        "name": "寿司海苔",
        "amountText": "1片",
        "category": "produce"
      },
      {
        "id": "i4",
        "name": "寿司酱油",
        "amountText": "适量",
        "category": "seasoning"
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
        "note": "山药洗净放入开水蒸锅内，蒸熟去皮，捣成泥状。"
      },
      {
        "id": "b2",
        "label": "切配拌匀",
        "sublabel": "Toss",
        "stageIndex": 1,
        "ingredientIds": [
          "i2"
        ],
        "note": "胡萝卜洗净、切碎末，加入山药泥中拌匀。",
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
        "label": "组合装填成型",
        "sublabel": "Shape",
        "stageIndex": 2,
        "ingredientIds": [
          "i3",
          "i4"
        ],
        "note": "取寿司帘，将海苔平铺在寿司帘上，接着取适量山药泥铺在海苔上，从寿司帘一端慢慢卷起来，尽量卷紧。海苔边缘的山药泥易散，可在海苔边侧撒几滴水黏合。",
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
        "label": "继续切配蒸制",
        "sublabel": "Steam",
        "stageIndex": 3,
        "ingredientIds": [],
        "durationMinutes": 15,
        "note": "用刀将山药卷斜切成大小一致的小段，装入蒸盘放入开水锅内蒸15分钟左右，取出蘸寿司酱油食用即可。",
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
      "servingInstructions": "取出装盘"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00008.html#sigil_toc_id_97 · 不可或缺的薯类 富含膳食纤维，既可做主食也能当蔬菜 · 山药寿司",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00008.html#sigil_toc_id_97"
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
    "id": "cn-53",
    "version": "3.0",
    "status": "published",
    "title": "🍲 关东煮",
    "description": "营养师张晔健康食谱·不可或缺的薯类 富含膳食纤维，既可做主食也能当蔬菜",
    "cuisine": "chinese",
    "difficulty": "medium",
    "prerequisites": {
      "containerSize": "高保温厚底砂锅 / 铸铁炖锅",
      "servings": "2-3 人份",
      "prepNotes": "准备20分钟 · 烹调2.5小时"
    },
    "cookingTimeText": "准备20分钟 · 烹调2.5小时",
    "ingredients": [
      {
        "id": "i2",
        "name": "圆白菜",
        "amountText": "40克",
        "category": "produce"
      },
      {
        "id": "i5",
        "name": "海带",
        "amountText": "适量",
        "category": "produce"
      },
      {
        "id": "i7",
        "name": "木耳",
        "amountText": "适量",
        "category": "produce"
      },
      {
        "id": "i8",
        "name": "香菇",
        "amountText": "适量",
        "category": "produce"
      },
      {
        "id": "i9",
        "name": "白萝卜",
        "amountText": "适量",
        "category": "produce"
      },
      {
        "id": "i10",
        "name": "苹果",
        "amountText": "适量",
        "category": "produce"
      },
      {
        "id": "i11",
        "name": "盐",
        "amountText": "2克",
        "category": "seasoning"
      },
      {
        "id": "i12",
        "name": "酱油",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i3",
        "name": "鱼豆腐",
        "amountText": "适量",
        "category": "main"
      },
      {
        "id": "i1",
        "name": "芋头",
        "amountText": "300克",
        "category": "produce"
      },
      {
        "id": "i4",
        "name": "娃娃菜",
        "amountText": "适量",
        "category": "produce"
      },
      {
        "id": "i6",
        "name": "山药",
        "amountText": "适量",
        "category": "produce"
      },
      {
        "id": "i13",
        "name": "甜辣酱",
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
          "i2",
          "i5",
          "i7",
          "i8",
          "i9",
          "i10"
        ],
        "note": "木耳、海带、香菇用温水泡发，洗净；苹果、白萝卜洗净、切片；圆白菜洗净。"
      },
      {
        "id": "b2",
        "label": "炖煮煮制调味",
        "sublabel": "Boil",
        "stageIndex": 1,
        "ingredientIds": [
          "i11",
          "i12"
        ],
        "heatLevel": "大火",
        "durationText": "2h",
        "note": "炖锅内放清水，放入步骤1的所有食材，大火煮开后，加盐、酱油，再加适量清水，转小火慢炖2小时左右，成为汤底。",
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
        "label": "切配煮制淋汁",
        "sublabel": "Boil",
        "stageIndex": 2,
        "ingredientIds": [
          "i1",
          "i3",
          "i4",
          "i6",
          "i13"
        ],
        "heatLevel": "中火",
        "note": "山药、芋头去皮、洗净，切片。娃娃菜洗净，与山药片、芋头片、鱼豆腐一同放入盛有汤底的锅中，中火煮至所有食材熟透，捞出，浇上少许汤汁，淋入适量甜辣酱即可食用。",
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
      "servingInstructions": "捞出装盘"
    },
    "provenance": {
      "sourceType": "book",
      "title": "蒸炖炒，营养师的健康食谱",
      "author": "张晔",
      "publishedYear": 2016,
      "locator": "OEBPS/text00008.html#sigil_toc_id_99 · 不可或缺的薯类 富含膳食纤维，既可做主食也能当蔬菜 · 关东煮",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00008.html#sigil_toc_id_99"
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
    "id": "cn-54",
    "version": "3.0",
    "status": "published",
    "title": "🥔 奶香土豆泥",
    "description": "营养师张晔健康食谱·不可或缺的薯类 富含膳食纤维，既可做主食也能当蔬菜",
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
        "id": "i3",
        "name": "牛奶",
        "amountText": "100毫升",
        "category": "main"
      },
      {
        "id": "i1",
        "name": "土豆",
        "amountText": "200克",
        "category": "produce"
      },
      {
        "id": "i2",
        "name": "奶酪",
        "amountText": "20克",
        "category": "produce"
      },
      {
        "id": "i4",
        "name": "黑胡椒",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i5",
        "name": "花椒",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i6",
        "name": "鸡汤",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i7",
        "name": "盐",
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
        "note": "土豆去皮，蒸熟后压成泥，放入小碗中，加入奶酪、牛奶搅拌均匀。"
      },
      {
        "id": "b2",
        "label": "煮制调味",
        "sublabel": "Boil",
        "stageIndex": 1,
        "ingredientIds": [
          "i4",
          "i5",
          "i6",
          "i7"
        ],
        "note": "另取锅烧开鸡汤，放入黑胡椒和花椒，煮透后加盐调味，去掉花椒。",
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
        "label": "组合装填",
        "sublabel": "Assemble",
        "stageIndex": 2,
        "ingredientIds": [],
        "note": "将调配好的鸡汤灌入土豆泥中即可，可根据口味决定稀稠。",
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
      "locator": "OEBPS/text00008.html#sigil_toc_id_101 · 不可或缺的薯类 富含膳食纤维，既可做主食也能当蔬菜 · 奶香土豆泥",
      "note": "江苏凤凰科学技术出版社"
    },
    "dataReview": {
      "overall": "modeled",
      "ingredients": "transcribed",
      "quantities": "transcribed",
      "topology": "modeled",
      "heatAndTiming": "transcribed",
      "evidence": [
        "OEBPS/text00008.html#sigil_toc_id_101"
      ],
      "assumptions": [
        "食材与用量转录自原书材料/调料栏；食材行已按首次参与工序排序",
        "工序标题由原书步骤中的动作词压缩生成；note 保留原文完整操作",
        "编号步骤默认只确认先后顺序；仅在继续处理既有食材时标记 material"
      ]
    },
    "tips": [
      "营养笔记：奶酪能增进人体抵抗疾病的能力，有益眼睛健康；土豆富含淀粉、蛋白质等，二者搭配食用，能增强脾胃消化功能、促进代谢、增强机体活力。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-09-16T12:00:00Z"
  }
]
