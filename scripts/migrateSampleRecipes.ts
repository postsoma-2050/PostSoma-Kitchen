import { CHINESE_HEALTHY_RECIPES } from '../src/data/chineseHealthyRecipes'
import { HOME_SWEET_HOME_RECIPES } from '../src/data/homeSweetHomeRecipes'
import { normalizeRecipe } from '../src/services/v3RecipeStore'
import { validateRecipe } from '../src/utils/taxonomyMatcher'
import { createClient } from '@supabase/supabase-js'

const TARGET_IDS = ['cn-01-yuxiang-rousi', 'cn-02-steamed-scallops', 'hsh-01-hazelnut-mocha']

async function runSampleMigration() {
  const args = process.argv.slice(2)
  const isActualRun = args.includes('--actual')
  const isDryRun = !isActualRun

  console.log('================================================================')
  console.log('  PostSoma Kitchen · Supabase Staging 3 道样例食谱幂等迁移脚本   ')
  console.log('================================================================\n')

  console.log(`• 运行模式: ${isDryRun ? '🔍 DRY-RUN (模拟运行，不写入数据库)' : '🚀 ACTUAL-RUN (真实云端写入)'}`)

  const supabaseUrl = (process.env.VITE_SUPABASE_URL || '').trim()
  const supabaseAnonKey = (process.env.VITE_SUPABASE_ANON_KEY || '').trim()

  if (isActualRun) {
    if (!supabaseUrl || !supabaseAnonKey || !supabaseUrl.startsWith('http')) {
      console.error(`❌ 真实写入失败：未检测到有效环境变量！`)
      console.error(`   - VITE_SUPABASE_URL: ${supabaseUrl ? '已设置 (' + supabaseUrl.substring(0, 20) + '...)' : '未找到/为空'}`)
      console.error(`   - VITE_SUPABASE_ANON_KEY: ${supabaseAnonKey ? '已设置' : '未找到/为空'}`)
      console.error('💡 请确认根目录下存在 .env 文件，且参数名拼写无误（无需带引号）。')
      process.exit(1)
    } else {
      console.log(`• 云端地址: ${supabaseUrl}`)
    }
  }

  const supabase = isActualRun
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: { persistSession: false },
        realtime: { enabled: false }
      })
    : null
  const allPresets = [...CHINESE_HEALTHY_RECIPES, ...HOME_SWEET_HOME_RECIPES]

  console.log(`• 匹配迁移目标 (${TARGET_IDS.length} 道):`)
  TARGET_IDS.forEach(id => console.log(`   - ID: ${id}`))
  console.log('')

  let passCount = 0
  let skipCount = 0

  for (const id of TARGET_IDS) {
    const raw = allPresets.find(r => r.id === id)
    if (!raw) {
      console.warn(`⚠️ 跳过：预置数据集中未找到 ID 为 ${id} 的食谱`)
      skipCount++
      continue
    }

    const normalized = normalizeRecipe(raw)
    const validation = validateRecipe(normalized)

    console.log(`📌 准备评估: "${normalized.title}" (${normalized.id})`)
    console.log(`   • 发布阻断校验: ${validation.canPublish ? '✅ 通过' : '❌ 阻断 (不满足发布规范)'}`)
    console.log(`   • 完整度评分: ${validation.completenessScore}%`)

    if (!validation.canPublish) {
      console.error(`   ⛔ 存在 ${validation.errors.length} 个发布阻断错误，拒绝迁移该食谱：`)
      validation.errors.forEach(e => console.log(`      - [${e.field}] ${e.message}`))
      skipCount++
      console.log('')
      continue
    }

    const payload = {
      ...normalized,
      completeness_score: validation.completenessScore,
      validation_snapshot: {
        errors: validation.errors,
        warnings: validation.warnings
      }
    }

    if (isDryRun) {
      console.log(`   [Dry-Run] 成功生成 Schema 兼容 JSON Payload (${JSON.stringify(payload).length} bytes)`)
      passCount++
    } else {
      try {
        console.log(`   [Actual-Run] 正在呼叫 Supabase RPC save_recipe_with_revision 写入...`)
        const { data, error } = await supabase!.rpc('save_recipe_with_revision', {
          p_recipe: payload
        })

        if (error) {
          console.error(`   ❌ 云端写入失败: ${error.message}`)
          skipCount++
        } else {
          console.log(`   🎉 写入成功:`, data)
          passCount++
        }
      } catch (e: any) {
        console.error(`   ❌ 执行异常: ${e?.message || e}`)
        skipCount++
      }
    }
    console.log('')
  }

  console.log('================================================================')
  console.log(`迁移评估完成: 成功 ${passCount} 道，跳过/失败 ${skipCount} 道`)
  if (isDryRun) {
    console.log('\n💡 提示: 若要真正执行 Supabase 云端写入，请配置 .env 后运行:')
    console.log('   npm run migrate:samples -- --actual')
  }
  console.log('================================================================\n')
}

runSampleMigration().catch(err => {
  console.error('迁移过程捕获到异常:', err)
  process.exit(1)
})
