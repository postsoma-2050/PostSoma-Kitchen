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
    "coverImageUrl": "/recipe-covers/cn-01.webp",
    "description": "营养师张晔健康食谱·解馋肉、蛋 为身体提供丰富的优质蛋白质和脂肪",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "平底煎锅 / 炖锅",
      "preheat": "腌渍20分钟",
      "servings": "2-3 人份",
      "prepNotes": "准备30分钟 · 烹调30分钟"
    },
    "cookingTimeText": "准备30分钟 · 烹调30分钟",
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
        "label": "切配腌渍",
        "sublabel": "Prep & Marinate",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2",
          "i4",
          "i5",
          "i6",
          "i7",
          "i8"
        ],
        "note": "大蒜切丁，与葱花、味极鲜酱油、料酒、白糖、盐放入容器拌匀，放入五花肉片充分抓匀，腌渍20分钟入味。"
      },
      {
        "id": "b2",
        "label": "双面煎黄",
        "sublabel": "Sear Pork",
        "stageIndex": 1,
        "ingredientIds": [
          "i9"
        ],
        "heatLevel": "中火",
        "durationMinutes": 10,
        "durationText": "10分钟",
        "note": "平底锅倒入少许植物油，烧至微热后平铺放入腌好的五花肉片，中火煎至两面金黄并溢出多余油脂，用厨房纸吸干油分。",
        "completionState": "两面金黄出油",
        "dependencies": [
          {
            "sourceBlockId": "b1",
            "type": "material",
            "label": "腌渍五花肉片"
          }
        ],
        "inputBlockIds": [
          "b1"
        ]
      },
      {
        "id": "b3",
        "label": "慢炖收汁",
        "sublabel": "Simmer & Reduce",
        "stageIndex": 2,
        "ingredientIds": [
          "i3"
        ],
        "heatLevel": "中火",
        "durationMinutes": 20,
        "durationText": "20分钟",
        "note": "将容器内剩余腌汁（含蒜丁、葱花）全部倒入锅中，加盖中火慢炖约20分钟至汤汁浓稠收紧入味，起锅装盘并摆上爽口卷心菜丝配餐。",
        "completionState": "浓稠收汁软嫩",
        "dependencies": [
          {
            "sourceBlockId": "b2",
            "type": "material",
            "label": "香煎肉片与腌汁"
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
      "servingInstructions": "装盘搭配爽口卷心菜丝趁热享用"
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
      "ingredients": "source_verified",
      "quantities": "source_verified",
      "topology": "modeled",
      "heatAndTiming": "source_verified",
      "reviewedBy": "PostSoma Kitchen Team",
      "reviewedAt": "2026-10-01T00:00:00Z",
      "evidence": [
        "OEBPS/text00005.html#sigil_toc_id_11"
      ]
    },
    "tips": [
      "营养笔记：五花肉提供丰富优质蛋白质，通过平底锅中火慢煎可逼出多余油脂，吸净后能大幅降低油脂摄入；大蒜素具抗氧化与保护心血管作用。",
      "烹饪技巧：在煎的过程中将猪肉渗出的油用厨房纸吸干，以便减少油脂的摄入。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-10-01T00:00:00Z"
  },
  {
    "id": "cn-02",
    "version": "3.0",
    "status": "published",
    "title": "🥩 猪肉炖粉条",
    "coverImageUrl": "/recipe-covers/cn-02.webp",
    "description": "营养师张晔健康食谱·解馋肉、蛋 为身体提供丰富的优质蛋白质和脂肪",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "高保温厚底砂锅 / 铸铁炖锅",
      "preheat": "温水泡发红薯粉条",
      "servings": "2-3 人份",
      "prepNotes": "准备15分钟 · 烹调45分钟"
    },
    "cookingTimeText": "准备15分钟 · 烹调45分钟",
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
        "name": "植物油",
        "amountText": "适量",
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
        "name": "姜末",
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
        "id": "i8",
        "name": "酱油",
        "amountText": "10克",
        "category": "seasoning"
      },
      {
        "id": "i9",
        "name": "料酒",
        "amountText": "10克",
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
        "name": "鸡精",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i12",
        "name": "葱段",
        "amountText": "5克",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "焯水备料",
        "sublabel": "Blanch & Prep",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2",
          "i3"
        ],
        "heatLevel": "大火",
        "durationMinutes": 3,
        "durationText": "3分钟",
        "note": "土豆洗净切厚块；红薯粉条用温水泡软剪段；五花肉切块放入沸水中大火焯烫3分钟，撇清浮沫捞出沥干。"
      },
      {
        "id": "b2",
        "label": "炒糖色翻炒",
        "sublabel": "Caramelize & Sauté",
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
        "heatLevel": "中小火",
        "durationMinutes": 7,
        "durationText": "7分钟",
        "note": "锅内倒油烧热，下白糖小火翻炒融化呈琥珀红褐色糖色，倒入五花肉块快速翻炒上色，加入姜末、花椒粒、酱油、料酒和盐大火炒香。",
        "completionState": "肉块焦黄红亮",
        "dependencies": [
          {
            "sourceBlockId": "b1",
            "type": "material",
            "label": "焯水五花肉"
          }
        ],
        "inputBlockIds": [
          "b1"
        ]
      },
      {
        "id": "b3",
        "label": "砂锅慢炖",
        "sublabel": "Simmer & Stew",
        "stageIndex": 2,
        "ingredientIds": [
          "i11",
          "i12"
        ],
        "heatLevel": "小火",
        "durationMinutes": 35,
        "durationText": "35分钟",
        "note": "倒入足量清水没过肉块，大火煮沸后合入泡软的红薯粉条和土豆块，盖上锅盖转小火慢炖35分钟至肉块酥烂、土豆粉糯透味，撒入鸡精和葱段拌匀即可。",
        "completionState": "粉条晶莹软糯、肉香浓郁",
        "dependencies": [
          {
            "sourceBlockId": "b2",
            "type": "material",
            "label": "炒糖色肉块"
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
      "servingInstructions": "连汤带肉盛入大瓷盆趁热享用"
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
      "ingredients": "source_verified",
      "quantities": "source_verified",
      "topology": "modeled",
      "heatAndTiming": "source_verified",
      "reviewedBy": "PostSoma Kitchen Team",
      "reviewedAt": "2026-10-01T00:00:00Z",
      "evidence": [
        "OEBPS/text00005.html#sigil_toc_id_12"
      ]
    },
    "tips": [
      "营养笔记：五花肉提供高密度热量与脂溶性风味，尽量选择精瘦肉比例高的五花肉或部分选用前腿瘦肉，可减少饱和脂肪与胆固醇摄入；红薯粉条与土豆提供丰富慢碳水复合淀粉与膳食纤维。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-10-01T00:00:00Z"
  },
  {
    "id": "cn-03",
    "version": "3.0",
    "status": "published",
    "title": "🥩 私家京酱肉丝",
    "coverImageUrl": "/recipe-covers/cn-03.webp",
    "description": "营养师张晔健康食谱·解馋肉、蛋 为身体提供丰富的优质蛋白质和脂肪",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "中式炒锅 / 平底炒锅",
      "preheat": "肉丝上浆静置15分钟",
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
        "id": "i5",
        "name": "料酒",
        "amountText": "5克",
        "category": "seasoning"
      },
      {
        "id": "i6",
        "name": "盐",
        "amountText": "2克",
        "category": "seasoning"
      },
      {
        "id": "i7",
        "name": "水淀粉",
        "amountText": "20克",
        "category": "grain"
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
        "id": "i4",
        "name": "葱白丝",
        "amountText": "50克",
        "category": "produce"
      },
      {
        "id": "i8",
        "name": "植物油",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i9",
        "name": "甜面酱",
        "amountText": "80克",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "焯水时蔬摆盘",
        "sublabel": "Blanch Veggies & Plate",
        "stageIndex": 0,
        "ingredientIds": [
          "i2",
          "i3",
          "i4"
        ],
        "heatLevel": "大火",
        "durationMinutes": 2,
        "durationText": "2分钟",
        "note": "锅中宽水烧沸，放入胡萝卜丝与黄豆芽焯烫2分钟至断生爽脆，捞出沥干水分，与葱白丝在盘底铺底摆匀备用。"
      },
      {
        "id": "b2",
        "label": "滑肉丝裹酱",
        "sublabel": "Sauté Meat & Glaze",
        "stageIndex": 1,
        "ingredientIds": [
          "i1",
          "i5",
          "i6",
          "i7",
          "i8",
          "i9"
        ],
        "heatLevel": "中大火",
        "durationMinutes": 3,
        "durationText": "3分钟",
        "note": "里脊肉丝抓匀料酒、盐与水淀粉上浆。炒锅放油烧热，倒入上浆肉丝快速滑炒变色盛出；锅底留少许油下甜面酱小火炒出酱香冒泡，迅速倒入肉丝大火翻炒包裹均匀酱汁出锅。",
        "completionState": "酱香浓郁、红亮挂汁",
        "dependencies": [
          {
            "sourceBlockId": "b1",
            "type": "material",
            "label": "时蔬底盘"
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
      "servingInstructions": "将酱香肉丝整齐浇在蔬菜盘心，配豆腐皮或春饼卷食"
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
      "ingredients": "source_verified",
      "quantities": "source_verified",
      "topology": "modeled",
      "heatAndTiming": "source_verified",
      "reviewedBy": "PostSoma Kitchen Team",
      "reviewedAt": "2026-10-01T00:00:00Z",
      "evidence": [
        "OEBPS/text00005.html#sigil_toc_id_13"
      ]
    },
    "tips": [
      "营养笔记：打破传统京酱肉丝全肉高纳的做法，创新加入鲜甜胡萝卜丝与爽脆黄豆芽，既均衡了蔬菜与肉类的黄金膳食比例，又大幅补充了膳食纤维、类胡萝卜素与大豆异黄酮；口感清爽解腻。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-10-01T00:00:00Z"
  },
  {
    "id": "cn-04",
    "version": "3.0",
    "status": "published",
    "title": "🥩 杏鲍菇牛肉粒",
    "coverImageUrl": "/recipe-covers/cn-04.webp",
    "description": "营养师张晔健康食谱·解馋肉、蛋 为身体提供丰富的优质蛋白质和脂肪",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "平底不粘锅 / 铸铁炒锅",
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
        "name": "植物油",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i4",
        "name": "老抽",
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
        "name": "盐",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i7",
        "name": "黑胡椒末",
        "amountText": "适量",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "切配方块",
        "sublabel": "Prep & Dice",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2"
        ],
        "note": "牛肉洗净血水切成1.5cm见方肉块；杏鲍菇洗净同样切成方块备用。"
      },
      {
        "id": "b2",
        "label": "慢煎煸炒杏鲍菇",
        "sublabel": "Pan-fry Mushroom",
        "stageIndex": 1,
        "ingredientIds": [
          "i3"
        ],
        "heatLevel": "小火",
        "durationMinutes": 20,
        "durationText": "20分钟",
        "note": "平底锅中倒入植物油烧至六七成热，倒入杏鲍菇丁，小火慢煎煸炒20分钟，逼出水分，直至菇块四面金黄微焦、香气浓郁时盛出待用。",
        "completionState": "四面金黄微焦紧致",
        "dependencies": [
          {
            "sourceBlockId": "b1",
            "type": "material",
            "label": "杏鲍菇方块"
          }
        ],
        "inputBlockIds": [
          "b1"
        ]
      },
      {
        "id": "b3",
        "label": "大火炒肉合炒",
        "sublabel": "Sauté Beef & Season",
        "stageIndex": 2,
        "ingredientIds": [
          "i4",
          "i5",
          "i6",
          "i7"
        ],
        "heatLevel": "中大火",
        "durationMinutes": 10,
        "durationText": "10分钟",
        "note": "锅内补少许油大火烧热，倒入牛肉粒大火快速滑炒至表面变色断生，立即合入煸香的杏鲍菇，调入老抽、白糖翻炒上色入味，烹至肉质紧致熟透，加盐炒匀，盛出后均匀撒上现磨黑胡椒末即可。",
        "completionState": "肉汁充盈微焦、黑椒辛香",
        "dependencies": [
          {
            "sourceBlockId": "b2",
            "type": "material",
            "label": "金黄杏鲍菇"
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
      "servingInstructions": "盛入温热盘中佐餐享用"
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
      "ingredients": "source_verified",
      "quantities": "source_verified",
      "topology": "modeled",
      "heatAndTiming": "source_verified",
      "reviewedBy": "PostSoma Kitchen Team",
      "reviewedAt": "2026-10-01T00:00:00Z",
      "evidence": [
        "OEBPS/text00005.html#sigil_toc_id_15"
      ]
    },
    "tips": [
      "营养笔记：牛肉含有丰富的血红素铁、优质蛋白质和B族维生素，能强健筋骨并迅速补充体力，非常适合高负荷上班族与生长发育期的青少年；杏鲍菇质地肥厚如同肉类，富含多糖与多重氨基酸，能降脂助消化，与牛肉搭配鲜味加倍。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-10-01T00:00:00Z"
  },
  {
    "id": "cn-05",
    "version": "3.0",
    "status": "published",
    "title": "🥩 番茄炖牛腩",
    "coverImageUrl": "/recipe-covers/cn-05.webp",
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
        "name": "植物油",
        "amountText": "适量",
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
        "name": "酱油",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i6",
        "name": "料酒",
        "amountText": "15克",
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
        "name": "葱末",
        "amountText": "5克",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "焯水切配",
        "sublabel": "Blanch & Prep",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2"
        ],
        "note": "牛腩块洗净入沸水中焯烫去血沫后捞出沥干；番茄烫去外皮，一半切成细腻碎丁用于熬酱，另一半切成滚刀大块备用。"
      },
      {
        "id": "b2",
        "label": "炒酱炒肉",
        "sublabel": "Sauté Tomato Sauce",
        "stageIndex": 1,
        "ingredientIds": [
          "i3",
          "i4",
          "i5",
          "i6"
        ],
        "heatLevel": "中火",
        "durationMinutes": 10,
        "durationText": "10分钟",
        "note": "炒锅倒油烧至六成热，爆香姜末，放入番茄碎大火翻炒出沙后转小火熬成浓郁番茄酱，加入焯水牛腩、酱油和料酒翻炒均匀上色。",
        "completionState": "浓郁红亮番茄红油",
        "dependencies": [
          {
            "sourceBlockId": "b1",
            "type": "material",
            "label": "焯水牛腩与番茄"
          }
        ],
        "inputBlockIds": [
          "b1"
        ]
      },
      {
        "id": "b3",
        "label": "砂锅慢炖",
        "sublabel": "Simmer Beef",
        "stageIndex": 2,
        "ingredientIds": [],
        "heatLevel": "小火",
        "durationMinutes": 60,
        "durationText": "60分钟",
        "note": "将炒好的番茄牛腩转入砂锅中，加入足量开水没过食材，大火烧开后盖上锅盖，转小火慢炖60分钟至牛腩软烂入味。",
        "completionState": "牛腩七分软烂、汤色红润",
        "dependencies": [
          {
            "sourceBlockId": "b2",
            "type": "material",
            "label": "红酱牛腩"
          }
        ],
        "inputBlockIds": [
          "b2"
        ]
      },
      {
        "id": "b4",
        "label": "合入番茄块合炖",
        "sublabel": "Stew with Tomato Chunks",
        "stageIndex": 3,
        "ingredientIds": [
          "i7",
          "i8"
        ],
        "heatLevel": "小火",
        "durationMinutes": 20,
        "durationText": "20分钟",
        "note": "揭盖放入留存的番茄滚刀大块和盐，继续加盖小火焖炖20分钟使番茄块软而不烂，出锅前撒上翠绿葱末即可。",
        "completionState": "酸甜浓郁、牛腩软烂化渣",
        "dependencies": [
          {
            "sourceBlockId": "b3",
            "type": "material",
            "label": "砂锅牛腩浓汤"
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
      "servingInstructions": "连煲端上餐桌或盛入大深碗趁热享用"
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
      "ingredients": "source_verified",
      "quantities": "source_verified",
      "topology": "modeled",
      "heatAndTiming": "source_verified",
      "reviewedBy": "PostSoma Kitchen Team",
      "reviewedAt": "2026-10-01T00:00:00Z",
      "evidence": [
        "OEBPS/text00005.html#sigil_toc_id_16"
      ]
    },
    "tips": [
      "营养笔记：牛肉搭配番茄有利于铁质的吸收利用；番茄中的强抗氧化剂番茄红素属于脂溶性营养素，在油脂炒制和牛腩脂肪的加热共融下吸收率可提升数倍，同时果酸能软化肉质纤维，促进牛腩中胶原蛋白的软化转化。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-10-01T00:00:00Z"
  },
  {
    "id": "cn-06",
    "version": "3.0",
    "status": "published",
    "title": "🥩 金针肥牛",
    "coverImageUrl": "/recipe-covers/cn-06.webp",
    "description": "营养师张晔健康食谱·解馋肉、蛋 为身体提供丰富的优质蛋白质和脂肪",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "大口中式炒锅",
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
        "id": "i3",
        "name": "红尖椒碎",
        "amountText": "15克",
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
        "name": "高汤",
        "amountText": "50克",
        "category": "liquid"
      },
      {
        "id": "i6",
        "name": "水淀粉",
        "amountText": "20克",
        "category": "grain"
      },
      {
        "id": "i7",
        "name": "盐",
        "amountText": "4克",
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
        "label": "拌匀切配",
        "sublabel": "Prep & Marinate",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i2"
        ],
        "note": "肥牛片加少许盐和水淀粉轻轻抓拌均匀腌制上浆；金针菇切去老根，彻底洗净撕散沥干备用。"
      },
      {
        "id": "b2",
        "label": "爆香高汤滑炒",
        "sublabel": "Sauté with Broth",
        "stageIndex": 1,
        "ingredientIds": [
          "i3",
          "i4",
          "i5",
          "i7",
          "i8"
        ],
        "heatLevel": "大火",
        "durationMinutes": 3,
        "durationText": "3分钟",
        "note": "锅中倒入植物油烧至六成热，下红尖椒碎大火爆香，倒入鲜醇高汤烧沸，倒入肥牛片和金针菇快速大火翻炒至变色八成熟，调入盐和鸡精炒匀。",
        "completionState": "肥牛断生卷曲、金针菇软滑",
        "dependencies": [
          {
            "sourceBlockId": "b1",
            "type": "material",
            "label": "上浆肥牛与金针菇"
          }
        ],
        "inputBlockIds": [
          "b1"
        ]
      },
      {
        "id": "b3",
        "label": "勾芡出锅",
        "sublabel": "Thicken & Finish",
        "stageIndex": 2,
        "ingredientIds": [
          "i6"
        ],
        "heatLevel": "大火",
        "durationMinutes": 2,
        "durationText": "2分钟",
        "note": "淋入剩余水淀粉勾薄芡，大火颠锅翻炒让芡汁均匀包裹肥牛与菌菇，关火装盘。",
        "completionState": "汤汁晶莹包裹、鲜辣开胃",
        "dependencies": [
          {
            "sourceBlockId": "b2",
            "type": "material",
            "label": "滑熟肥牛与金针菇"
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
      "servingInstructions": "盛入热盘立即开动"
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
      "ingredients": "source_verified",
      "quantities": "source_verified",
      "topology": "modeled",
      "heatAndTiming": "source_verified",
      "reviewedBy": "PostSoma Kitchen Team",
      "reviewedAt": "2026-10-01T00:00:00Z",
      "evidence": [
        "OEBPS/text00005.html#sigil_toc_id_17"
      ]
    },
    "tips": [
      "营养笔记：金针菇含有人体必需的多重氨基酸，其中赖氨酸和精氨酸含量尤其丰富，与牛肉高蛋白同食，有助于增强智力和免疫抗病力；红尖椒富含维生素C，能促进牛肉中铁质的吸收。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-10-01T00:00:00Z"
  },
  {
    "id": "cn-07",
    "version": "3.0",
    "status": "published",
    "title": "🥩 白萝卜羊肉卷",
    "coverImageUrl": "/recipe-covers/cn-07.webp",
    "description": "营养师张晔健康食谱·解馋肉、蛋 为身体提供丰富的优质蛋白质和脂肪",
    "cuisine": "chinese",
    "difficulty": "medium",
    "prerequisites": {
      "containerSize": "大口蒸锅 / 多层竹蒸笼",
      "preheat": "肉馅腌渍15分钟",
      "servings": "1-2 人份",
      "prepNotes": "准备20分钟 · 烹调30分钟"
    },
    "cookingTimeText": "准备20分钟 · 烹调30分钟",
    "ingredients": [
      {
        "id": "i1",
        "name": "白萝卜",
        "amountText": "100克",
        "category": "produce"
      },
      {
        "id": "i2",
        "name": "羊肉",
        "amountText": "50克",
        "category": "main"
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
        "name": "酱油",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i6",
        "name": "盐",
        "amountText": "2克",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "焯水软化萝卜",
        "sublabel": "Blanch Radish",
        "stageIndex": 0,
        "ingredientIds": [
          "i1"
        ],
        "heatLevel": "大火",
        "durationMinutes": 5,
        "durationText": "5分钟",
        "note": "白萝卜洗净去皮切成半透明薄片，沸水锅中大火焯烫5分钟至软韧能卷曲，捞出过凉水沥干备用。"
      },
      {
        "id": "b2",
        "label": "调馅卷制",
        "sublabel": "Stuff & Roll",
        "stageIndex": 1,
        "ingredientIds": [
          "i2",
          "i3",
          "i4",
          "i5",
          "i6"
        ],
        "note": "羊肉剁成细腻肉馅，加姜末、蒜末、酱油、盐朝一个方向充分搅打上劲腌渍15分钟。取焯软萝卜片包裹肉馅卷成紧实圆卷，用牙签固定码入蒸盘。",
        "completionState": "固定成形整齐入盘",
        "dependencies": [
          {
            "sourceBlockId": "b1",
            "type": "material",
            "label": "焯软萝卜薄片"
          }
        ],
        "inputBlockIds": [
          "b1"
        ]
      },
      {
        "id": "b3",
        "label": "大火蒸透",
        "sublabel": "Steam Rolls",
        "stageIndex": 2,
        "ingredientIds": [],
        "heatLevel": "大火",
        "durationMinutes": 25,
        "durationText": "25分钟",
        "note": "蒸锅内注入清水大火烧至大汽上涌，放入盛放羊肉卷的蒸盘，加盖大火蒸制25分钟至羊肉馅鲜嫩熟透、肉汁与萝卜清甜充分融和，出锅拔除牙签即可食用。",
        "completionState": "肉嫩清甜、晶莹剔透",
        "dependencies": [
          {
            "sourceBlockId": "b2",
            "type": "material",
            "label": "定型萝卜羊肉卷"
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
      "servingInstructions": "淋入盘中蒸制原汤或点缀葱丝装盘"
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
      "ingredients": "source_verified",
      "quantities": "source_verified",
      "topology": "modeled",
      "heatAndTiming": "source_verified",
      "reviewedBy": "PostSoma Kitchen Team",
      "reviewedAt": "2026-10-01T00:00:00Z",
      "evidence": [
        "OEBPS/text00005.html#sigil_toc_id_19"
      ]
    },
    "tips": [
      "营养笔记：白萝卜性凉，味辛甘；与温燥补益的羊肉同食，不仅能中和羊肉的温热之性，还能利用萝卜芥子油有效去除羊肉膻味、解腻化痰、助胃肠消化，是秋冬防燥温补的黄金搭配。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-10-01T00:00:00Z"
  },
  {
    "id": "cn-08",
    "version": "3.0",
    "status": "published",
    "title": "🥩 羊肉炖胡萝卜",
    "coverImageUrl": "/recipe-covers/cn-08.webp",
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
        "name": "葱段",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i4",
        "name": "姜片",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i5",
        "name": "调料包(大料花椒桂皮小茴香香叶)",
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
        "name": "酱油",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i8",
        "name": "枸杞子",
        "amountText": "适量",
        "category": "produce"
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
        "label": "冷水焯水",
        "sublabel": "Blanch Mutton",
        "stageIndex": 0,
        "ingredientIds": [
          "i1"
        ],
        "heatLevel": "大火",
        "durationMinutes": 10,
        "durationText": "10分钟",
        "note": "羊肉块冲洗干净，冷水下入炖锅中大火烧开，持续撇清表面浮沫与杂质约10分钟直至汤水清亮。"
      },
      {
        "id": "b2",
        "label": "香料慢炖羊肉",
        "sublabel": "Simmer Mutton",
        "stageIndex": 1,
        "ingredientIds": [
          "i3",
          "i4",
          "i5",
          "i6",
          "i7"
        ],
        "heatLevel": "小火",
        "durationMinutes": 60,
        "durationText": "60分钟",
        "note": "放入葱段、姜片、料酒、酱油以及装有大料、花椒、桂皮、小茴香、香叶的调料钢球，大火沸腾后盖严锅盖，转小火慢炖1小时至羊肉七分软烂。",
        "completionState": "肉块半软、香气四溢",
        "dependencies": [
          {
            "sourceBlockId": "b1",
            "type": "material",
            "label": "焯净羊肉汤底"
          }
        ],
        "inputBlockIds": [
          "b1"
        ]
      },
      {
        "id": "b3",
        "label": "合入胡萝卜合炖",
        "sublabel": "Stew with Carrots",
        "stageIndex": 2,
        "ingredientIds": [
          "i2",
          "i8",
          "i9"
        ],
        "heatLevel": "小火",
        "durationMinutes": 20,
        "durationText": "20分钟",
        "note": "下入胡萝卜滚刀大块和枸杞子，加盖继续小火慢炖20分钟至胡萝卜软糯入味、红油析出，调入适量盐拌匀即可起锅。",
        "completionState": "胡萝卜软烂鲜甜、羊肉酥烂无膻",
        "dependencies": [
          {
            "sourceBlockId": "b2",
            "type": "material",
            "label": "砂锅羊肉清汤"
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
      "servingInstructions": "整锅端上或盛入热砂锅连汤带肉享用"
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
      "ingredients": "source_verified",
      "quantities": "source_verified",
      "topology": "modeled",
      "heatAndTiming": "source_verified",
      "reviewedBy": "PostSoma Kitchen Team",
      "reviewedAt": "2026-10-01T00:00:00Z",
      "evidence": [
        "OEBPS/text00005.html#sigil_toc_id_20"
      ]
    },
    "tips": [
      "营养笔记：胡萝卜富含大量的脂溶性β-胡萝卜素，在羊肉天然油脂的融汇下吸收转化率可成倍提高；同时胡萝卜独特的甘甜能强力吸附并消除羊肉的膻味，温中祛寒、补气健脾。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-10-01T00:00:00Z"
  },
  {
    "id": "cn-09",
    "version": "3.0",
    "status": "published",
    "title": "🥩 葱爆羊肉",
    "coverImageUrl": "/recipe-covers/cn-09.webp",
    "description": "营养师张晔健康食谱·解馋肉、蛋 为身体提供丰富的优质蛋白质和脂肪",
    "cuisine": "chinese",
    "difficulty": "easy",
    "prerequisites": {
      "containerSize": "大火中式熟铁炒锅",
      "preheat": "肉片腌渍上浆15分钟",
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
        "id": "i5",
        "name": "酱油",
        "amountText": "10克",
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
        "amountText": "适量",
        "category": "grain"
      },
      {
        "id": "i8",
        "name": "胡椒粉",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i4",
        "name": "植物油",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i3",
        "name": "蒜片",
        "amountText": "5克",
        "category": "produce"
      },
      {
        "id": "i2",
        "name": "葱段",
        "amountText": "150克",
        "category": "produce"
      },
      {
        "id": "i9",
        "name": "醋",
        "amountText": "5克",
        "category": "seasoning"
      },
      {
        "id": "i10",
        "name": "香油",
        "amountText": "适量",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "切片腌渍上浆",
        "sublabel": "Prep & Marinate",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i5",
          "i6",
          "i7",
          "i8"
        ],
        "note": "羊肉顶刀切薄片；取酱油、料酒、水淀粉与白胡椒粉与肉片充分抓拌均匀，静置腌渍15分钟上浆锁水。"
      },
      {
        "id": "b2",
        "label": "热油爆炒羊肉",
        "sublabel": "Flash-fry Mutton",
        "stageIndex": 1,
        "ingredientIds": [
          "i4",
          "i3"
        ],
        "heatLevel": "大火",
        "durationMinutes": 2,
        "durationText": "2分钟",
        "note": "熟铁炒锅倒油大火烧至冒轻烟，下蒜片迅速爆香，滑入腌好的羊肉片大火猛火翻炒至八成熟变色。",
        "completionState": "肉片滑嫩微卷断生",
        "dependencies": [
          {
            "sourceBlockId": "b1",
            "type": "material",
            "label": "上浆羊肉片"
          }
        ],
        "inputBlockIds": [
          "b1"
        ]
      },
      {
        "id": "b3",
        "label": "投入大葱烹醋出锅",
        "sublabel": "Toss with Scallions",
        "stageIndex": 2,
        "ingredientIds": [
          "i2",
          "i9",
          "i10"
        ],
        "heatLevel": "大火",
        "durationMinutes": 3,
        "durationText": "3分钟",
        "note": "立即投入大葱斜段大火爆炒，沿滚烫锅边淋入料酒烹出锅气，加酱油炒匀，再沿锅边烹入香醋激发出香气，淋入少许香油，翻炒至大葱断生透出清甜立即出锅。",
        "completionState": "葱香肉嫩、锅气十足",
        "dependencies": [
          {
            "sourceBlockId": "b2",
            "type": "material",
            "label": "八成熟羊肉"
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
      "servingInstructions": "趁锅气炽热立即装盘上桌"
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
      "ingredients": "source_verified",
      "quantities": "source_verified",
      "topology": "modeled",
      "heatAndTiming": "source_verified",
      "reviewedBy": "PostSoma Kitchen Team",
      "reviewedAt": "2026-10-01T00:00:00Z",
      "evidence": [
        "OEBPS/text00005.html#sigil_toc_id_21"
      ]
    },
    "tips": [
      "营养笔记：葱爆羊肉补阳温中、强腰健肾，特别适合体弱畏寒与腰膝酸软者食用；大葱富含葱素挥发油，具有天然抑菌与通阳发汗作用，能有效激发羊肉脂香，同时促使肉类蛋白质更易消化吸收。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-10-01T00:00:00Z"
  },
  {
    "id": "cn-10",
    "version": "3.0",
    "status": "published",
    "title": "🍗 板栗烧鸡",
    "coverImageUrl": "/recipe-covers/cn-10.webp",
    "description": "营养师张晔健康食谱·解馋肉、蛋 为身体提供丰富的优质蛋白质和脂肪",
    "cuisine": "chinese",
    "difficulty": "medium",
    "prerequisites": {
      "containerSize": "铸铁炖锅 / 深底炒锅",
      "preheat": "温水泡发干香菇",
      "servings": "3-4 人份",
      "prepNotes": "准备20分钟 · 烹调1小时"
    },
    "cookingTimeText": "准备20分钟 · 烹调1小时",
    "ingredients": [
      {
        "id": "i1",
        "name": "土鸡",
        "amountText": "半只",
        "category": "main"
      },
      {
        "id": "i2",
        "name": "干香菇",
        "amountText": "10朵",
        "category": "produce"
      },
      {
        "id": "i3",
        "name": "香葱",
        "amountText": "4根",
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
        "name": "姜片",
        "amountText": "适量",
        "category": "seasoning"
      },
      {
        "id": "i6",
        "name": "蒜",
        "amountText": "3瓣",
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
        "name": "料酒",
        "amountText": "15克",
        "category": "seasoning"
      },
      {
        "id": "i9",
        "name": "老抽",
        "amountText": "15克",
        "category": "seasoning"
      },
      {
        "id": "i10",
        "name": "去壳板栗",
        "amountText": "400克",
        "category": "produce"
      },
      {
        "id": "i11",
        "name": "蚝油",
        "amountText": "15克",
        "category": "seasoning"
      },
      {
        "id": "i12",
        "name": "盐",
        "amountText": "5克",
        "category": "seasoning"
      }
    ],
    "actionBlocks": [
      {
        "id": "b1",
        "label": "煸干鸡肉",
        "sublabel": "Sear Chicken",
        "stageIndex": 0,
        "ingredientIds": [
          "i1",
          "i4"
        ],
        "heatLevel": "中大火",
        "durationMinutes": 10,
        "durationText": "10分钟",
        "note": "锅中倒入少量植物油烧至七成热，下土鸡块持续大火煸炒10分钟，彻底煸干血水与多余皮脂，至鸡皮微黄出香、锅内水分蒸发。",
        "completionState": "水气煸干、鸡皮微黄"
      },
      {
        "id": "b2",
        "label": "爆香加菇慢炖",
        "sublabel": "Simmer with Mushrooms",
        "stageIndex": 1,
        "ingredientIds": [
          "i5",
          "i6",
          "i7",
          "i8",
          "i9",
          "i2",
          "i3"
        ],
        "heatLevel": "小火",
        "durationMinutes": 30,
        "durationText": "30分钟",
        "note": "放入姜片和蒜瓣炒出香气，调入白糖、料酒与老抽翻炒均匀上色；倒入泡发香菇及适量开水，放入葱结，大火烧开后加盖转小火慢炖30分钟至鸡肉熟软。",
        "completionState": "鸡块软韧、香菇出味",
        "dependencies": [
          {
            "sourceBlockId": "b1",
            "type": "material",
            "label": "煸干鸡肉块"
          }
        ],
        "inputBlockIds": [
          "b1"
        ]
      },
      {
        "id": "b3",
        "label": "合入板栗焖透收汁",
        "sublabel": "Stew with Chestnuts & Glaze",
        "stageIndex": 2,
        "ingredientIds": [
          "i10",
          "i11",
          "i12"
        ],
        "heatLevel": "中小火",
        "durationMinutes": 20,
        "durationText": "20分钟",
        "note": "揭盖倒入去壳板栗，盖盖继续小火焖炖20分钟至板栗面糯，调入蚝油与盐，转大火翻炒收浓汤汁，撒上新鲜葱段即可出锅。",
        "completionState": "板栗粉糯金黄、鸡肉酱红浓油赤酱",
        "dependencies": [
          {
            "sourceBlockId": "b2",
            "type": "material",
            "label": "香菇慢炖鸡"
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
      "servingInstructions": "盛入大瓷煲或热深盘趁热享用"
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
      "ingredients": "source_verified",
      "quantities": "source_verified",
      "topology": "modeled",
      "heatAndTiming": "source_verified",
      "reviewedBy": "PostSoma Kitchen Team",
      "reviewedAt": "2026-10-01T00:00:00Z",
      "evidence": [
        "OEBPS/text00005.html#sigil_toc_id_23"
      ]
    },
    "tips": [
      "营养笔记：板栗富含碳水化合物、不饱和脂肪酸以及维生素C与多种微量元素，与优质土鸡同烹，具有益气补肾、健脾养胃、强筋健骨之功效，是秋冬滋补的经典健康膳食。"
    ],
    "createdAt": "2016-09-01T00:00:00Z",
    "updatedAt": "2026-10-01T00:00:00Z"
  },
  {
    "id": "cn-11",
    "version": "3.0",
    "status": "published",
    "title": "🍗 宫保鸡丁",
    "coverImageUrl": "/recipe-covers/cn-11.webp",
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
      "label": "完成",
      "servingInstructions": "出锅装盘趁热享用，花生香脆、鸡丁滑嫩酸甜"
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
    "coverImageUrl": "/recipe-covers/cn-12.webp",
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
      "label": "完成",
      "servingInstructions": "盛入温热盘中佐餐享用，鸡丁鲜嫩、板栗粉糯入味"
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
    "coverImageUrl": "/recipe-covers/cn-13.webp",
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
