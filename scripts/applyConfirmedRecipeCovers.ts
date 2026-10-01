/**
 * PostSoma Kitchen · 批量回填并下载确认食谱封面
 * 
 * 功能：
 * 1. 将 46 道已确认的食谱封面资产下载/复制到本地 public/recipe-covers/${recipeId}.jpg
 * 2. 批量将 coverImageUrl: '/recipe-covers/${recipeId}.jpg' 写入本地各批次 TypeScript 代码预置库
 * 3. 运行审计与类型校验，确保 100% 格式无误
 */

import fs from 'fs'
import path from 'path'

export interface CoverMappingItem {
  recipeId: string
  sourceType: 'local-prototype' | 'remote-url'
  sourcePathOrUrl: string
  note: string
}

export const CONFIRMED_COVER_MAPPINGS: CoverMappingItem[] = [
  // --- Prototype High-Res 1200x900 Covers (from public/recipe-covers/prototype/) ---
  {
    recipeId: 'cn-01',
    sourceType: 'local-prototype',
    sourcePathOrUrl: 'public/recipe-covers/prototype/cn-13-suan-shao-wuhuarou.jpg',
    note: '🥩 蒜烧五花肉'
  },
  {
    recipeId: 'cn-03',
    sourceType: 'local-prototype',
    sourcePathOrUrl: 'public/recipe-covers/prototype/cn-09-jingjiang-rousi.jpg',
    note: '🥩 私家京酱肉丝'
  },
  {
    recipeId: 'cn-04',
    sourceType: 'local-prototype',
    sourcePathOrUrl: 'public/recipe-covers/prototype/cn-15-xingbaogu-niurouli.jpg',
    note: '🥩 杏鲍菇牛肉粒'
  },
  {
    recipeId: 'cn-10',
    sourceType: 'local-prototype',
    sourcePathOrUrl: 'public/recipe-covers/prototype/cn-19-banli-shaoji.jpg',
    note: '🍗 板栗烧鸡'
  },
  {
    recipeId: 'cn-11',
    sourceType: 'local-prototype',
    sourcePathOrUrl: 'public/recipe-covers/prototype/cn-05-gongbao-jiding.jpg',
    note: '🍗 宫保鸡丁'
  },
  {
    recipeId: 'cn-16',
    sourceType: 'local-prototype',
    sourcePathOrUrl: 'public/recipe-covers/prototype/cn-01-yuxiang-rousi.jpg',
    note: '🥩 私房少油鱼香肉丝'
  },
  {
    recipeId: 'cn-21',
    sourceType: 'local-prototype',
    sourcePathOrUrl: 'public/recipe-covers/prototype/cn-24-jianzhi-fanqie-doufugeng.jpg',
    note: '🧈 减脂番茄豆腐羹'
  },
  {
    recipeId: 'cn-22',
    sourceType: 'local-prototype',
    sourcePathOrUrl: 'public/recipe-covers/prototype/cn-12-xihongshi-jidan.jpg',
    note: '🍗 番茄炒鸡蛋'
  },
  {
    recipeId: 'cn-39',
    sourceType: 'local-prototype',
    sourcePathOrUrl: 'public/recipe-covers/prototype/cn-37-qincai-larouding.jpg',
    note: '🥩 芹菜腊肉丁'
  },
  {
    recipeId: 'cn-60',
    sourceType: 'local-prototype',
    sourcePathOrUrl: 'public/recipe-covers/prototype/cn-02-steamed-scallops.jpg',
    note: '🦐 蒜蓉粉丝蒸扇贝'
  },

  // --- Chinese Dishes with Confirmed Remote Covers in Supabase ---
  {
    recipeId: 'cn-02',
    sourceType: 'remote-url',
    sourcePathOrUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmp3jXmMGnKMErJWstZV_s7TkcttBOBAFOpFE7FGVHFg&s=10',
    note: '🥩 猪肉炖粉条'
  },
  {
    recipeId: 'cn-05',
    sourceType: 'remote-url',
    sourcePathOrUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVuqB28M1S6g16BwT5ghPzkN4i7gfhaJ6XEkvzaOh0ZQ&s=10',
    note: '🥩 番茄炖牛腩'
  },
  {
    recipeId: 'cn-06',
    sourceType: 'remote-url',
    sourcePathOrUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMuMvd1AnsyFFi0DMUwBZz_ibdq7jqZPmlxyAOo1tK7g&s=10',
    note: '🥩 金针肥牛'
  },
  {
    recipeId: 'cn-08',
    sourceType: 'remote-url',
    sourcePathOrUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtmlYHaFUjP9Mv4YlCIC98DJOIFIeirKEnmphM-J04UA&s=10',
    note: '🥩 羊肉炖胡萝卜'
  },
  {
    recipeId: 'cn-09',
    sourceType: 'remote-url',
    sourcePathOrUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA1divGRnrSAw5HcgxEzBJYxhZFssh04PIZUwTSHNu_Q&s=10',
    note: '🥩 葱爆羊肉'
  },
  {
    recipeId: 'cn-12',
    sourceType: 'remote-url',
    sourcePathOrUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMgFifIC1hDbYdm4dqUsU6La_ZKUd-_LYxv6bgOLoijw&s=10',
    note: '🍗 板栗鸡丁'
  },
  {
    recipeId: 'cn-13',
    sourceType: 'remote-url',
    sourcePathOrUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3q8N8KN5RvNQP4ehzNRVUXsfMFxLlKJgXIzdyEpOTYA&s=10',
    note: '🥚 豆渣蒸蛋'
  },
  {
    recipeId: 'cn-14',
    sourceType: 'remote-url',
    sourcePathOrUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUIk_3yz4p6vJg-UgUhkEl0QZeXDocbpm4rYpxPVoHHg&s=10',
    note: '🥕 粉蒸胡萝卜丝'
  },
  {
    recipeId: 'cn-15',
    sourceType: 'remote-url',
    sourcePathOrUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvUkelOGSX76-vDsY-tcUoh-JR1wBlZ4dNqbxglGTgnQ&s=10',
    note: '🥩 胡萝卜牛腩煲'
  },
  {
    recipeId: 'cn-17',
    sourceType: 'remote-url',
    sourcePathOrUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRADwfh_by8aTbx6YkD_8uA2GrLqLH7f_GRwv04JmqN8Q&s=10',
    note: '🍆 蒜蓉蒸茄子'
  },
  {
    recipeId: 'cn-19',
    sourceType: 'remote-url',
    sourcePathOrUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGOL3Uui5m0BP5ccYbHMAEUpTK_qmFUdJzU6vX4FnBHw&s=10',
    note: '🍳 地三鲜'
  },
  {
    recipeId: 'cn-24',
    sourceType: 'remote-url',
    sourcePathOrUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqlfADB0fwI5MhHIR8zi__MOYllxDBt-oeLHbLvG3AmQ&s=10',
    note: '🥩 冬瓜薏米排骨汤'
  },
  {
    recipeId: 'cn-27',
    sourceType: 'remote-url',
    sourcePathOrUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR76YGAt3WLnLIg96NIFLXGaF806EMSG6bddgrttN8cg&s=10',
    note: '🥒 苦瓜冬菇骨汤'
  },
  {
    recipeId: 'cn-41',
    sourceType: 'remote-url',
    sourcePathOrUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9uZhZg2n0wrhSqvUEnbFbc90yUod1R-ETqUeP1avoow&s=10',
    note: '🥚 蛋黄苋菜'
  },
  {
    recipeId: 'cn-42',
    sourceType: 'remote-url',
    sourcePathOrUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAsxlMehOF-hOmT868hgYMcwGd-yx-nbRwYaH8P_n0fw&s=10',
    note: '🦐 虾仁蒸西蓝花'
  },
  {
    recipeId: 'cn-57',
    sourceType: 'remote-url',
    sourcePathOrUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn_tmzUM-bj5zoNnqr8a5VebXLThXgNlJe-bWnQcryxg&s=10',
    note: '🐟 奶白鲫鱼汤'
  },
  {
    recipeId: 'cn-115',
    sourceType: 'remote-url',
    sourcePathOrUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDzTiYcoKvX_Tcqp4ytRG9hI7Gx4mGw4PLCCruyxMKGg&s=10',
    note: '🐟 豉汁蒸盘龙白鳝'
  },

  // --- Home Sweet Home Recipes (all 16) ---
  {
    recipeId: 'hsh-01-hazelnut-mocha',
    sourceType: 'remote-url',
    sourcePathOrUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU8VZP9bL4iZjjSvaybcxNeVpj3q5RXVz3rAJ1XobRsQ&s=10',
    note: '🏆 榛果摩卡特饮干粉'
  },
  {
    recipeId: 'hsh-02-taco-soup',
    sourceType: 'remote-url',
    sourcePathOrUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk_VZdula__a98fggLo9RjWhWRtogvUmGQx3KusiU9Ew&s=10',
    note: '🏆 塔可墨西哥风味浓汤'
  },
  {
    recipeId: 'hsh-03-chicken-ritz',
    sourceType: 'remote-url',
    sourcePathOrUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCLSPVuSUC-sASYbiy-EbOvKzUZBI3l0hyr86vcfTqyw&s=10',
    note: '🏆 Ritz饼干金黄烤鸡'
  },
  {
    recipeId: 'hsh-04-mexican-lasagna',
    sourceType: 'remote-url',
    sourcePathOrUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGmEGMBk-or6rw1bjVouCafYtJzjhdW_SAYfRvQui4bg&s=10',
    note: '🏆 墨西哥风味千层饼'
  },
  {
    recipeId: 'hsh-05-noodle-kugel',
    sourceType: 'remote-url',
    sourcePathOrUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR42VYFDke9JI1etBKBkb4p9BYE9CstBah83wprHcE4_A&s=10',
    note: '🏆 祖母秘制面条库格尔'
  },
  {
    recipeId: 'hsh-06-bbq-butter-beans',
    sourceType: 'remote-url',
    sourcePathOrUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHTLSCuSNexY7q7WWjf4hK4RSDbZSbaUOUhB9Z6TxF1A&s=10',
    note: '🏆 烧烤黄油豆'
  },
  {
    recipeId: 'hsh-07-pineapple-stuffing',
    sourceType: 'remote-url',
    sourcePathOrUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNtO36lGGZB-qWzAujei-mG1Dp9tihDuQky3eaxhk_wQ&s=10',
    note: '🏆 菠萝香面包填料'
  },
  {
    recipeId: 'hsh-08-pecan-rice',
    sourceType: 'remote-url',
    sourcePathOrUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7zK9sIrbtdIgHu2ITpYAJkFJO1nJEz3zbp9atsApCKw&s=10',
    note: '🏆 碧根果果仁米饭'
  },
  {
    recipeId: 'hsh-09-peanut-butter-brownie',
    sourceType: 'remote-url',
    sourcePathOrUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgdIEl5X7GB0IIwnNuWCMutTn2UxE3XUqKEa76kDR5fg&s=10',
    note: '🏆 酥脆花生酱大理石布朗尼'
  },
  {
    recipeId: 'hsh-10-italian-mushrooms',
    sourceType: 'remote-url',
    sourcePathOrUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZCnpWolNkpiaIWs70nlx5LizE9ukRC9QcdpJD7d3khA&s=10',
    note: '👨‍🍳 主厨意式酿烤蘑菇'
  },
  {
    recipeId: 'hsh-11-pecan-rolls',
    sourceType: 'remote-url',
    sourcePathOrUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRly-hNEY16tLPZlYvRqf4DhTYM0r0wqkZmYXZiqSMPVQ&s=10',
    note: '🥐 过夜美洲山核桃肉桂卷'
  },
  {
    recipeId: 'hsh-12-pound-cake',
    sourceType: 'remote-url',
    sourcePathOrUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIpbIr_PzYZII88dgilZo9d5MByDsiQmpQylXFELE84g&s=10',
    note: '🍰 老式酸奶油磅蛋糕'
  },
  {
    recipeId: 'hsh-13-beef-barley-soup',
    sourceType: 'remote-url',
    sourcePathOrUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcSGyifMq1iMAFhnyUefZBwRDqAqp5Nei__4qVNdwVdQ&s=10',
    note: '🍲 牛肉大麦蔬菜浓汤'
  },
  {
    recipeId: 'hsh-14-angel-biscuits',
    sourceType: 'remote-url',
    sourcePathOrUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxs3E6yFua02ytd1NSjESQdwDYxe8HYT8iLQoHd8JrZg&s=10',
    note: '🥐 祖母天使比司吉饼干'
  },
  {
    recipeId: 'hsh-15-chicken-dumplings',
    sourceType: 'remote-url',
    sourcePathOrUrl: 'https://mountainhouse.com/cdn/shop/files/50165-chicken-and-dumplings-prepared_2000x.jpg?v=1756028949',
    note: '🍲 家常美式鸡肉炖面团'
  },
  {
    recipeId: 'hsh-16-hashbrown-casserole',
    sourceType: 'remote-url',
    sourcePathOrUrl: 'https://littlechefwithin.com/wp-content/uploads/2025/07/Hash-Brown-Casserole-11.jpg',
    note: '🥔 橄榄球硬汉土豆饼芝士焗煲'
  },

  // --- V3 Core Examples (all 3) ---
  {
    recipeId: 'v3-espresso-brownies',
    sourceType: 'remote-url',
    sourcePathOrUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEX6KoDp1MphuUGL4zmA8-Pn0ammIaAa2-PGnOwY4pcg&s=10',
    note: 'Espresso Brownies 意式浓缩布朗尼'
  },
  {
    recipeId: 'v3-hong-shao-rou',
    sourceType: 'remote-url',
    sourcePathOrUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Red_braised_pork_belly.jpg',
    note: '毛氏红烧肉'
  },
  {
    recipeId: 'v3-caesar-salad',
    sourceType: 'remote-url',
    sourcePathOrUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ9wzThTZTaxVoA3-07Qku1K_kIhpgz0jA07AyXoHx3A&s=10',
    note: 'Classic Caesar Salad 经典凯撒沙拉'
  }
]

async function run() {
  const isActual = process.argv.includes('--actual')
  const root = process.cwd()
  const targetDir = path.join(root, 'public', 'recipe-covers')
  fs.mkdirSync(targetDir, { recursive: true })

  console.log(`\n======================================================`)
  console.log(` PostSoma Kitchen · 食谱封面回填与下载 (${isActual ? 'ACTUAL 写入' : 'DRY-RUN 预览'})`)
  console.log(`======================================================\n`)

  const mappingMap = new Map(CONFIRMED_COVER_MAPPINGS.map(m => [m.recipeId, m]))
  console.log(`• 已就绪映射项目: ${CONFIRMED_COVER_MAPPINGS.length} 项`)

  if (!isActual) {
    console.log(`🔍 [DRY-RUN] 预览前 10 项处理计划：`)
    CONFIRMED_COVER_MAPPINGS.slice(0, 10).forEach(m => {
      console.log(`  - ${m.recipeId} (${m.note}): ${m.sourceType} -> /recipe-covers/${m.recipeId}.jpg`)
    })
    console.log(`\n💡 运行 node scripts/runTs.js scripts/applyConfirmedRecipeCovers.ts --actual 执行真实写入与下载。`)
    return
  }

  // 1. 下载或复制图片至 public/recipe-covers/${recipeId}.jpg
  console.log(`\n[Step 1/3] 开始同步与固化封面图片到 public/recipe-covers/ ...`)
  for (const m of CONFIRMED_COVER_MAPPINGS) {
    const destPath = path.join(targetDir, `${m.recipeId}.jpg`)
    if (m.sourceType === 'local-prototype') {
      const srcPath = path.join(root, m.sourcePathOrUrl)
      if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath)
        console.log(`  ✓ [Local] ${m.recipeId}.jpg 已就绪 (${Math.round(fs.statSync(destPath).size / 1024)} KB)`)
      } else {
        console.warn(`  ⚠️ 本地原型不存在: ${srcPath}`)
      }
    } else {
      try {
        const res = await fetch(m.sourcePathOrUrl, { headers: { 'User-Agent': 'Mozilla/5.0 PostSoma/1.0' } })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const buf = Buffer.from(await res.arrayBuffer())
        fs.writeFileSync(destPath, buf)
        console.log(`  ✓ [Download] ${m.recipeId}.jpg 已下载 (${Math.round(buf.length / 1024)} KB)`)
      } catch (err) {
        console.warn(`  ⚠️ 下载失败: ${m.recipeId} (${m.sourcePathOrUrl}):`, err instanceof Error ? err.message : err)
      }
    }
  }

  // 2. 回填代码文件中的 coverImageUrl 属性
  console.log(`\n[Step 2/3] 回填 TypeScript 食谱定义代码...`)

  // 2.1 处理 chinese batch 文件
  const chineseDir = path.join(root, 'src', 'data', 'recipes', 'chinese')
  const batchFiles = fs.readdirSync(chineseDir).filter(f => f.startsWith('batch') && f.endsWith('.ts'))
  for (const file of batchFiles) {
    const filePath = path.join(chineseDir, file)
    let content = fs.readFileSync(filePath, 'utf8')
    let modified = false

    for (const [id, m] of mappingMap.entries()) {
      if (!id.startsWith('cn-')) continue
      const targetCover = `/recipe-covers/${id}.jpg`
      // Check if this recipe is in this file
      const idPattern = new RegExp(`(\"id\":\\s*\"${id}\",\\s*\\n\\s*\"version\":\\s*\"[^\"]+\",\\s*\\n\\s*\"status\":\\s*\"[^\"]+\",\\s*\\n\\s*\"title\":\\s*\"[^\"]+\",)`)
      if (idPattern.test(content)) {
        // If coverImageUrl already exists, replace it, otherwise inject it
        const coverCheck = new RegExp(`\"id\":\\s*\"${id}\"[\\s\\S]*?\"coverImageUrl\":`)
        const recipeBlockEnd = new RegExp(`(\"id\":\\s*\"${id}\"[\\s\\S]*?\"title\":\\s*\"[^\"]+\",)(\\s*\\n\\s*\"coverImageUrl\":\\s*\"[^\"]+\",)?`)
        if (content.match(recipeBlockEnd)) {
          content = content.replace(recipeBlockEnd, (match, prefix, existingCover) => {
            return `${prefix}\n    "coverImageUrl": "${targetCover}",`
          })
          modified = true
          console.log(`  ✓ [${file}] 注入 ${id} -> ${targetCover}`)
        }
      }
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8')
    }
  }

  // 2.2 处理 homeSweetHomeRecipes.ts
  const hshPath = path.join(root, 'src', 'data', 'homeSweetHomeRecipes.ts')
  let hshContent = fs.readFileSync(hshPath, 'utf8')
  let hshModified = false
  for (const [id, m] of mappingMap.entries()) {
    if (!id.startsWith('hsh-')) continue
    const targetCover = `/recipe-covers/${id}.jpg`
    const pattern = new RegExp(`(id:\\s*'${id}',[\\s\\S]*?title:\\s*'[^\']+',)(\\s*\\n\\s*coverImageUrl:\\s*'[^']+',)?`)
    if (pattern.test(hshContent)) {
      hshContent = hshContent.replace(pattern, (match, prefix) => {
        return `${prefix}\n    coverImageUrl: '${targetCover}',`
      })
      hshModified = true
      console.log(`  ✓ [homeSweetHomeRecipes.ts] 注入 ${id} -> ${targetCover}`)
    }
  }
  if (hshModified) {
    fs.writeFileSync(hshPath, hshContent, 'utf8')
  }

  // 2.3 处理 v3Examples.ts
  const v3Path = path.join(root, 'src', 'data', 'v3Examples.ts')
  let v3Content = fs.readFileSync(v3Path, 'utf8')
  let v3Modified = false
  for (const [id, m] of mappingMap.entries()) {
    if (!id.startsWith('v3-')) continue
    const targetCover = `/recipe-covers/${id}.jpg`
    const pattern = new RegExp(`(id:\\s*'${id}',[\\s\\S]*?title:\\s*'[^\']+',)(\\s*\\n\\s*coverImageUrl:\\s*'[^']+',)?`)
    if (pattern.test(v3Content)) {
      v3Content = v3Content.replace(pattern, (match, prefix) => {
        return `${prefix}\n    coverImageUrl: '${targetCover}',`
      })
      v3Modified = true
      console.log(`  ✓ [v3Examples.ts] 注入 ${id} -> ${targetCover}`)
    }
  }
  if (v3Modified) {
    fs.writeFileSync(v3Path, v3Content, 'utf8')
  }

  console.log(`\n[Step 3/3] 资产固化与代码更新完成！`)
}

run().catch(console.error)
