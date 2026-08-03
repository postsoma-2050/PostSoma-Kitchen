/**
 * PostSoma Kitchen · 全量 121 道 3.0 规范食谱 Supabase 云端同步与迁移脚本
 * 
 * 运行模式:
 *   - 模拟运行 (Dry-Run): npm run migrate:all
 *   - 真实落盘 (Actual-Run): npm run migrate:all -- --actual
 */

import { CHINESE_HEALTHY_RECIPES } from '../src/data/chineseHealthyRecipes'
import { HOME_SWEET_HOME_RECIPES } from '../src/data/homeSweetHomeRecipes'
import { espressoBrowniesV3, hongShaoRouV3, caesarSaladV3 } from '../src/data/v3Examples'
import { normalizeRecipe } from '../src/services/v3RecipeStore'
import { validateRecipe } from '../src/utils/taxonomyMatcher'
import { createClient } from '@supabase/supabase-js'

async function runAllRecipesMigration() {
  const args = process.argv.slice(2)
  const isActualRun = args.includes('--actual')
  const isDryRun = !isActualRun

  console.log('\n================================================================')
  console.log('  PostSoma Kitchen · Supabase Staging 全量 121 道食谱幂等迁移脚本')
  console.log('================================================================\n')

  console.log(`• 运行模式: ${isDryRun ? '🔍 DRY-RUN (模拟运行，校验 Payload 不写入数据库)' : '🚀 ACTUAL-RUN (真实云端写入数据库)'}`)

  const supabaseUrl = (process.env.VITE_SUPABASE_URL || '').trim()
  const supabaseAnonKey = (process.env.VITE_SUPABASE_ANON_KEY || '').trim()

  if (isActualRun) {
    if (!supabaseUrl || !supabaseAnonKey || !supabaseUrl.startsWith('http')) {
      console.error(`❌ 真实写入失败：未检测到有效 Supabase 环境变量！`)
      console.error(`   - VITE_SUPABASE_URL: ${supabaseUrl ? '已设置 (' + supabaseUrl.substring(0, 20) + '...)' : '未找到/为空'}`)
      console.error(`   - VITE_SUPABASE_ANON_KEY: ${supabaseAnonKey ? '已设置' : '未找到/为空'}`)
      console.error('💡 请确认根目录下存在 .env 文件，且参数配置完整。')
      process.exit(1)
    } else {
      console.log(`• 云端 Supabase URL: ${supabaseUrl}`)
    }
  }

  const supabase = isActualRun
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: { persistSession: false },
        realtime: { enabled: false },
      })
    : null

  const V3_EXAMPLE_RECIPES = [
    espressoBrowniesV3 as any,
    hongShaoRouV3 as any,
    caesarSaladV3 as any,
  ].filter(Boolean)

  const allPresets = [
    ...CHINESE_HEALTHY_RECIPES,
    ...HOME_SWEET_HOME_RECIPES,
    ...V3_EXAMPLE_RECIPES,
  ]

  console.log(`• 全量待迁移目标: ${allPresets.length} 道`)
  console.log(`  - 中餐食谱: ${CHINESE_HEALTHY_RECIPES.length} 道`)
  console.log(`  - 美菜食谱: ${HOME_SWEET_HOME_RECIPES.length} 道`)
  console.log(`  - 样例食谱: ${V3_EXAMPLE_RECIPES.length} 道\n`)

  let successCount = 0
  let skipCount = 0
  const failedList: string[] = []

  for (let i = 0; i < allPresets.length; i++) {
    const raw = allPresets[i]
    const normalized = normalizeRecipe(raw)
    const validation = validateRecipe(normalized)

    const indexStr = `[${i + 1}/${allPresets.length}]`

    if (!validation.canPublish) {
      console.error(`❌ ${indexStr} 阻断跳过: "${normalized.title}" (${normalized.id})`)
      validation.errors.forEach(e => console.error(`      - [${e.field}] ${e.message}`))
      skipCount++
      failedList.push(normalized.id)
      continue
    }

    const payload = {
      ...normalized,
      completeness_score: validation.completenessScore,
      validation_snapshot: {
        errors: validation.errors,
        warnings: validation.warnings,
      },
    }

    if (isDryRun) {
      successCount++
      if ((i + 1) % 10 === 0 || i === allPresets.length - 1) {
        console.log(`🔍 [Dry-Run] 已成功评估 ${i + 1}/${allPresets.length} 道食谱 Payload 生成`)
      }
    } else {
      try {
        const { data, error } = await supabase!.rpc('save_recipe_with_revision', {
          p_recipe: payload,
        })

        if (error) {
          console.error(`❌ ${indexStr} 写入失败: "${normalized.title}" -> ${error.message}`)
          skipCount++
          failedList.push(normalized.id)
        } else {
          successCount++
          const res = data as any
          console.log(`✅ ${indexStr} 成功落盘: "${normalized.title}" (ID: ${normalized.id}, Rev: ${res?.revision_number || 1})`)
        }
      } catch (e: any) {
        console.error(`❌ ${indexStr} 异常: "${normalized.title}" -> ${e?.message || e}`)
        skipCount++
        failedList.push(normalized.id)
      }
    }
  }

  console.log('\n================================================================')
  console.log(`                全量食谱 Supabase 迁移统计总结                  `)
  console.log('================================================================')
  console.log(`• 运行模式: ${isDryRun ? '🔍 DRY-RUN (模拟验证)' : '🚀 ACTUAL-RUN (真实落盘)'}`)
  console.log(`• 匹配总数: ${allPresets.length} 道`)
  console.log(`• 成功处理: ${successCount} 道`)
  console.log(`• 失败/跳过: ${skipCount} 道`)

  if (failedList.length > 0) {
    console.log(`❌ 失败 ID 列表: ${failedList.join(', ')}`)
  }

  if (isDryRun) {
    console.log('\n💡 提示: 所有 121 道食谱 Dry-Run 校验完成！若要真正向 Supabase 云端落盘写入，请运行:')
    console.log('   npm run migrate:all -- --actual')
  }
  console.log('================================================================\n')
}

runAllRecipesMigration().catch(err => {
  console.error('迁移脚本运行捕获致命错误:', err)
  process.exit(1)
})
