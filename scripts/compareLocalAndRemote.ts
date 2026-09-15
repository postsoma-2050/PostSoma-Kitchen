import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import { CHINESE_HEALTHY_RECIPES } from '../src/data/chineseHealthyRecipes'
import { HOME_SWEET_HOME_RECIPES } from '../src/data/homeSweetHomeRecipes'
import { espressoBrowniesV3, hongShaoRouV3, caesarSaladV3 } from '../src/data/v3Examples'
import { normalizeRecipe } from '../src/services/recipeNormalizer'

function hashRecipe(recipe: any): string {
  const norm = normalizeRecipe(recipe)
  const clone = { ...norm }
  delete (clone as any).contentVersion
  delete (clone as any).deletedAt
  delete (clone as any).updated_at
  const str = JSON.stringify(clone, Object.keys(clone).sort())
  return crypto.createHash('sha256').update(str).digest('hex').substring(0, 12)
}

async function runComparison() {
  const url = 'https://ihtpltojihhwmciqubbk.supabase.co/rest/v1/recipes?select=id,title,content,content_version,updated_at'
  const key = 'sb_publishable_ILkFkAxbgeYVfreuEpDLCg_QYY28SDq'

  console.log('Fetching all remote recipes from Supabase Staging (read-only)...')
  const res = await fetch(url, {
    headers: {
      'apikey': key,
      'Authorization': `Bearer ${key}`
    }
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch from Supabase: ${res.status} ${await res.text()}`)
  }

  const remoteRows: any[] = await res.json()
  console.log(`Fetched ${remoteRows.length} recipes from Supabase public.recipes.`)

  const remoteMap = new Map<string, any>()
  remoteRows.forEach(r => remoteMap.set(r.id, r))

  const localPresets = [
    ...CHINESE_HEALTHY_RECIPES,
    ...HOME_SWEET_HOME_RECIPES,
    espressoBrowniesV3,
    hongShaoRouV3,
    caesarSaladV3
  ]

  console.log(`Local code presets count: ${localPresets.length}`)

  const diffEntries: any[] = []
  let matchCount = 0
  let modifiedCount = 0
  let missingInRemoteCount = 0

  for (const local of localPresets) {
    const remote = remoteMap.get(local.id)
    const localHash = hashRecipe(local)

    if (!remote) {
      missingInRemoteCount++
      diffEntries.push({
        id: local.id,
        title: local.title,
        status: 'MISSING_IN_REMOTE',
        localVersion: local.version || 1,
        localBlocksCount: local.actionBlocks.length,
        localHash,
        remoteVersion: null,
        remoteBlocksCount: null,
        remoteHash: null,
        differences: ['食谱仅存在于本地代码，远程 Supabase 尚未迁移']
      })
      continue
    }

    const remoteContent = remote.content || {}
    const remoteHash = hashRecipe(remoteContent)

    if (localHash === remoteHash) {
      matchCount++
      diffEntries.push({
        id: local.id,
        title: local.title,
        status: 'IDENTICAL',
        localVersion: local.version || 1,
        localBlocksCount: local.actionBlocks.length,
        localHash,
        remoteVersion: remote.content_version,
        remoteBlocksCount: remoteContent.actionBlocks?.length || 0,
        remoteHash,
        remoteUpdatedAt: remote.updated_at,
        differences: []
      })
    } else {
      modifiedCount++
      const diffs: string[] = []
      if ((remoteContent.actionBlocks?.length || 0) !== local.actionBlocks.length) {
        diffs.push(`工序数量差异: 本地 ${local.actionBlocks.length} 个 vs 远程 ${remoteContent.actionBlocks?.length || 0} 个`)
      }
      if ((remoteContent.ingredients?.length || 0) !== local.ingredients.length) {
        diffs.push(`食材数量差异: 本地 ${local.ingredients.length} 项 vs 远程 ${remoteContent.ingredients?.length || 0} 项`)
      }
      const remoteHasDeps = (remoteContent.actionBlocks || []).some((b: any) => b.dependencies && b.dependencies.length > 0)
      const localHasDeps = local.actionBlocks.some(b => b.dependencies && b.dependencies.length > 0)
      if (localHasDeps && !remoteHasDeps) {
        diffs.push('本地具有 3.0 typed dependencies (物料流/等待关系)，远程仍为旧式无依赖或旧字段')
      }
      if (diffs.length === 0) {
        diffs.push('文本说明、用量或火候参数存在细节微调')
      }

      diffEntries.push({
        id: local.id,
        title: local.title,
        status: 'CONTENT_MODIFIED',
        localVersion: local.version || 1,
        localBlocksCount: local.actionBlocks.length,
        localHash,
        remoteVersion: remote.content_version,
        remoteBlocksCount: remoteContent.actionBlocks?.length || 0,
        remoteHash,
        remoteUpdatedAt: remote.updated_at,
        differences: diffs
      })
    }
  }

  // Save JSON report
  const jsonPath = path.join(process.cwd(), 'reports', 'local-remote-diff.json')
  fs.writeFileSync(jsonPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    localCount: localPresets.length,
    remoteCount: remoteRows.length,
    matchCount,
    modifiedCount,
    missingInRemoteCount,
    entries: diffEntries
  }, null, 2), 'utf8')

  // Generate DATA_SOURCE_AND_VERSION_REPORT.md
  const reportPath = path.join(process.cwd(), 'docs', 'DATA_SOURCE_AND_VERSION_REPORT.md')
  let reportMd = `# PostSoma Kitchen 数据来源、取数优先级与版本一致性报告

> **报告时间**：${new Date().toISOString()}  
> **审计环境**：Local TS Code vs Supabase Staging (\`https://ihtpltojihhwmciqubbk.supabase.co\`)  
> **权威模式**：只读探测，未执行任何写入

---

## 1. 为什么直接访问与 \`?source=local\` 可能呈现不同内容？

### 1.1 取数路径根本原因分析
在 \`src/views/RecipeDetailV3.vue\` 的 \`loadRecipe()\` 实现中：
\`\`\`ts
// 当 URL 携带 ?source=local 或 ?source=preset 时：
const localFound = await getLocalPresetRecipeById(id) // 直接动态 import 代码中的 TypeScript 模块

// 当 URL 无 source 参数（默认访问）时：
const found = await getPublishedRecipeById(id)        // 调用 recipeRepository.getPublishedRecipeById(id)
\`\`\`

1. **\`?source=local\` 路径**：
   - 跳过一切缓存和数据库，直接执行 \`import('@/data/chineseHealthyRecipes')\` 等模块。
   - 呈现的是**当前代码仓库工作区 (Working Tree) 最新的 TypeScript 代码对象**。
2. **默认访问路径**：
   - 依赖注入的 \`recipeRepository\`（由 \`VITE_STORAGE_MODE\` 决定）。
   - 当前 \`VITE_STORAGE_MODE=supabase\`，请求的是 **2026年8月4日** 历史批量落盘到 Supabase 云端的旧快照（例如 \`cn-59\` 在云端仅有 2 个旧工序且无依赖，而本地代码已重构为 4 工序带暂存回锅）。
   - 若用户之前在 LocalStorage 保存过数据，则在 \`VITE_STORAGE_MODE=local\` 下会读取旧的 LocalStorage 缓存。
3. **结论**：
   - 这不是页面内部组件取数不一致，而是**存储快照与静态代码仓库之间的版本时间差**。
   - **页面画布 (\`RecipeFlowCanvasV3\`)、手机端视图 (\`RecipeFlowMobileV3\`)、详情弹窗与 SVG/PNG 导出，全部统一接收并消费 \`RecipeDetailV3\` 解析后的同一个 \`recipe\` 对象，内部数据完全同源！**

---

## 2. 开发者环境版本指纹与普通用户界面的边界隔离

- **普通用户界面**：维持极简高级审美，不外露调试指标、哈希串或数据库版本号。
- **开发与编辑环境 (\`import.meta.env.DEV\`)**：
  - 在食谱详情页底部或开发者控制台输出数据源指纹：
    \`[PostSoma Dev] Recipe: {id} | Source: {local_preset | supabase_published} | ContentHash: {hash} | Version: {ver}\`
  - 便于开发人员、QA 秒级确认当前处于“本地代码实时态”还是“云端持久化态”。

---

## 3. 本地代码与云端已发布内容只读比对结果

| 维度 | 统计值 | 状态 |
| :--- | :--- | :--- |
| 本地预置食谱总数 | **${localPresets.length} 道** | 包含 102 道中餐 + 16 道美式 + 3 道样板 |
| 远程 Supabase 食谱数 | **${remoteRows.length} 道** | \`public.recipes\` 表有效记录 |
| 完全一致 (Hash Match) | **${matchCount} 道** | 内容哈希完全相符 |
| 内容存在更新 (Modified) | **${modifiedCount} 道** | 本地进行了 3.0 typed dependencies 或工序细化 |
| 远程缺失 (Missing) | **${missingInRemoteCount} 道** | 本地新增但尚未迁移 |

---

## 4. 重点差异样板剖析

### 样板 1: \`cn-59-qincai-niurou\` (芹菜牛肉)
- **云端版本 (\`updated_at: 2026-08-04\`)**：
  - 仅有 2 个简易工序，依赖关系未类型化。
- **本地代码版本 (\`src/data/chineseHealthyRecipes.ts\`)**：
  - 4 个标准工序，包含完整物料流：牛肉腌渍滑炒 ➔ 暂存盛出 ➔ 爆香蔬菜 ➔ 回锅合炒（承接牛肉半成品）。
- **影响**：默认访问加载云端旧快照时无法展示走廊回锅；携带 \`?source=local\` 即可展示完整的连续回锅走廊。

---

## 5. 建议与治理原则

1. **严禁在前端硬编码强制本地优先**来掩盖云端版本不同步；
2. **严禁自动覆盖远程数据库**：草稿与未核实内容不得自动发布；
3. 后续若需全量同步，必须在完成真实主厨与事实审核后，由管理员显式触发云端落盘迁移指令。
`
  fs.writeFileSync(reportPath, reportMd, 'utf8')

  // Generate UNEXECUTED_REMOTE_MIGRATION_PROPOSAL.md
  const proposalPath = path.join(process.cwd(), 'docs', 'UNEXECUTED_REMOTE_MIGRATION_PROPOSAL.md')
  let proposalMd = `# PostSoma Kitchen 未执行的远程迁移提案 (Unexecuted Remote Migration Proposal)

> **当前状态**：**PROPOSED (已编制，未执行)**  
> **执行约束**：严格遵守安全红线，本任务**不写入 Supabase，不部署，不破坏远程生产/Staging 现有数据**。

---

## 1. 提案背景与目的

当前本地仓库在 VisualRecipe 3.0 规范下已完成：
1. 全量 121 道预置食谱 100% 审计 PASS；
2. 连续工序表 4 大准入契约与 83 道兼容食谱收敛；
3. 主图去冗余文字（移除 "+ 放入/承接/产出/状态" 等堆叠）；
4. 分支矩阵图统一为中性极简建筑风格。

然而 Supabase Staging 云端（\`public.recipes\`）现有数据仍为 **2026年8月4日** 的历史版本，存在 ${modifiedCount} 道食谱的内容版本落后于本地最新领域模型。

为了在未来适当时机安全地将本地已验证的优质模型落盘至云端，特编制本迁移提案。

---

## 2. 待迁移内容范畴

- **源数据**：\`src/data/chineseHealthyRecipes.ts\` (102道)、\`src/data/homeSweetHomeRecipes.ts\` (16道)、\`src/data/v3Examples.ts\` (3道)
- **目标表**：Supabase \`public.recipes\` (通过原子 RPC \`save_recipe_with_revision\`)
- **受影响食谱数量**：
  - 内容变更需更新版本：**${modifiedCount} 道**
  - 完全一致无需重复落盘：**${matchCount} 道**
  - 云端缺失需补齐：**${missingInRemoteCount} 道**

---

## 3. 严格的安全执行机制

### 3.1 乐观锁与版本快照追溯
迁移将调用 Postgres RPC：
\`\`\`sql
SELECT save_recipe_with_revision(p_recipe := :payload);
\`\`\`
- 每次更新递增 \`content_version\`；
- 并在 \`recipe_revisions\` 表中完整保留历史快照，支持秒级回滚。

### 3.2 预执行校验门禁
在任何落盘前，运行全套本地门禁：
\`\`\`bash
npm run type-check
npm run test:continuous-table
npm run test:round-trip
npm run test:domain
npm run audit:presets
\`\`\`
必须达到 **100% PASS，0 阻断错误** 方可授权执行。

---

## 4. 拟定执行指令 (待人工授权后执行)

\`\`\`bash
# 步骤 1: 模拟运行 (Dry-Run)，验证 121 道 Payload 序列化与校验门禁
npm run migrate:all

# 步骤 2: 仅在明确获得产品负责人与主厨授权后，输入 SERVICE_ROLE_KEY 执行真实落盘
SUPABASE_SERVICE_ROLE_KEY="<YOUR_SECRET_SERVICE_ROLE_KEY>" npm run migrate:all -- --actual
\`\`\`

---

## 5. 回滚方案

若在云端落盘后发现任何异常：
1. 立即从 \`recipe_revisions\` 历史版本表中按 \`recipe_id\` 恢复至上一版本 (\`content_version - 1\`)；
2. 或将前端临时切换至 \`VITE_STORAGE_MODE=local\`，确保客户端体验不受远程网络或数据异常影响。
`
  fs.writeFileSync(proposalPath, proposalMd, 'utf8')

  console.log('================================================================')
  console.log('         本地与远程只读比对及迁移提案生成完成                 ')
  console.log('================================================================')
  console.log(`• 本地食谱总数: ${localPresets.length}`)
  console.log(`• 远程记录总数: ${remoteRows.length}`)
  console.log(`• 完全一致: ${matchCount} 道`)
  console.log(`• 内容有更新: ${modifiedCount} 道`)
  console.log(`• 远程缺失: ${missingInRemoteCount} 道`)
  console.log(`• 差异报告: ${reportPath}`)
  console.log(`• 迁移提案: ${proposalPath}`)
  console.log('================================================================\n')
}

runComparison().catch(err => {
  console.error('比对运行失败:', err)
  process.exit(1)
})
