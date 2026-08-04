# PostSoma Kitchen

> 结构化食谱档案与可视化烹饪流程系统。

PostSoma Kitchen（Time_to_eat）用 **Visual Recipe Flow Card** 取代传统的长篇步骤说明：食材、复合配方、准备条件、操作阶段与成品按从左到右的矩阵关系呈现，让用户能够先看懂做菜路径，再进入实际烹饪。

它不是一个让 AI 自动发布食谱的工具。正式食谱由 Kitchen Studio 管理；AI 仅作为 `/fridge` 中用户主动触发的、临时且不可发布的料理建议。

## 当前能力

- **公开食谱档案**：只展示已发布、未软删除且完成封面准备的 VisualRecipeV3 食谱；支持搜索、分类、分页、详情、移动端阅读与 Cook Mode。
- **Matrix Flow 流程卡**：以食材、设备、准备、步骤、成品的结构化信息为核心，默认不显示流程箭头或步骤编号；支持全屏查看与 PNG 导出。
- **Kitchen Studio**：提供草稿、发布、回收站、编辑、软删除、恢复与永久删除；云端写操作通过 Repository、revision 与状态确认链路执行。
- **按食材找料理方向**：`/fridge` 使用独立食材归一台账与确定性匹配引擎，从已发布食谱中返回可解释的正式参考结果，不把字符串重合伪装成 AI 推荐。
- **AI 即时建议（原型）**：仅在用户主动配置并发起请求后，通过浏览器内存中的 OpenAI-compatible BYOK Gateway 生成临时做法。结果不写入 Recipe Repository、Supabase、Admin、Matrix Flow 或公开列表；刷新页面即清除 Key。
- **封面发布边界**：`recipe.coverImageUrl` 是公开封面的最高优先级。无手动封面时显示统一品牌 fallback；prototype 研究资料不参与公开页面渲染。

## 数据与产品边界

项目内置 121 道 VisualRecipeV3 结构化食谱，来源位于：

- `src/data/chineseHealthyRecipes.ts`：中餐健康食谱
- `src/data/homeSweetHomeRecipes.ts`：美式私房食谱
- `src/data/v3Examples.ts`：V3 示例食谱

公开端永远以 Repository 返回的 **已发布且未删除** 记录为准；草稿和回收站记录不会进入公开档案或 `/fridge` 候选。原始食材文字、用量、份量、Formula、Action Blocks 和 Matrix Flow 语义都由 `VisualRecipeV3` 保留，不会被食材归一或 AI 建议改写。

## 技术栈

- Vue 3 + Composition API + TypeScript
- Vite + Tailwind CSS
- Vue Router
- Supabase（Postgres、RLS、RPC、revision）
- Repository 模式：`IRecipeRepository`、`SupabaseRecipeRepository`、`LocalRecipeRepository`
- SVG Matrix Flow 布局与浏览器端 PNG 导出

## 架构概览

```text
Kitchen Studio (/admin)
  └─ Admin 编辑、发布、回收站、revision 写操作
             │
             ▼
      IRecipeRepository
       ├─ SupabaseRecipeRepository（云端）
       └─ LocalRecipeRepository（本地）
             │
             ▼
       VisualRecipeV3（唯一食谱事实）
             │
      ┌──────┴─────────┐
      ▼                ▼
公开食谱档案 (/)   按食材找方向 (/fridge)
                         ├─ 确定性食材匹配 → 正式 recipe 参考
                         └─ 主动 AI 请求 → 临时建议（不入库）
```

## 快速开始

### 环境要求

- Node.js 18+
- npm

### 安装与本地运行

```bash
npm install
cp .env.example .env
npm run dev
```

开发服务器默认运行在 `http://localhost:5173`。

### 存储模式

`.env` 中只配置当前运行所需的存储模式：

```env
# local | shadow_read | supabase
VITE_STORAGE_MODE=local

# 仅在 supabase / shadow_read 模式需要
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
```

- `local`：浏览器本地存储，适合离线开发与界面验证。
- `shadow_read`：本地写入，同时读取云端用于比对。
- `supabase`：使用 Supabase 作为持久化存储。

**不要**把 `SUPABASE_SERVICE_ROLE_KEY`、个人 API Key 或任何管理员凭据放进 `VITE_*`、源码或部署平台的客户端变量。Service Role Key 仅供本地受控 CLI 迁移使用。

### `/fridge` 的 AI 原型说明

AI 即时建议不读取 `.env` 中的 API Key。用户需要在页面中临时填写符合 OpenAI-compatible JSON 协议的 HTTPS Base URL、模型与 Key；配置仅保存在该页面 JavaScript 内存，刷新、离开或重新打开页面后立即清除。

该能力是原型功能：建议内容必须标识为“AI 即时建议 · 临时生成”，不能保存或发布为正式食谱。

## 常用命令

| 命令 | 用途 |
| --- | --- |
| `npm run dev` | 启动 Vite 开发服务器 |
| `npm run type-check` | Vue / TypeScript 类型检查 |
| `npm run build` | 类型检查并构建生产包 |
| `npm run preview` | 本地预览生产包 |
| `npm run audit:presets` | 审计静态预置食谱规范 |
| `node scripts/runTs.js scripts/verifyAllRecipesIntegrity.ts` | 执行全量食谱完整性巡检 |
| `npm run test:domain` | 领域模型与 Repository 测试集合 |
| `npm run test:flow` | Matrix Flow Graph 测试 |
| `npm run test:repo` | Repository 测试 |
| `npm run test:admin-nav` | Admin 导航上下文测试 |
| `npm run test:fridge-foundation` | 食材归一与确定性匹配测试 |
| `npm run test:fridge-page` | `/fridge` 页面集成测试 |
| `npm run test:fridge-ai-channel` | AI 建议状态机与契约测试 |
| `npm run test:fridge-ai-gateway` | OpenAI-compatible BYOK Gateway 测试 |
| `npm run test:fridge-ai-safety` | AI 食品安全规则测试 |
| `npm run test:cover-publication` | 封面发布边界测试 |
| `npm run migrate:all` | 预览全量 Supabase 迁移（dry run） |
| `npm run migrate:all -- --actual` | 执行全量 Supabase 迁移；仅在受控环境使用 |

推荐在推送或部署前运行：

```bash
npm run type-check
npm run test:domain
npm run test:flow
npm run test:fridge-foundation
npm run test:fridge-page
npm run build
```

## 目录说明

```text
src/
├── components/
│   ├── fridge/                    # 食材选择、匹配卡与 AI 临时建议 UI
│   ├── publish/                   # 公开食谱卡与分页
│   └── recipe-flow-v3/            # Flow Card、工作区与移动端呈现
├── data/                          # 121 道静态食谱、封面清单
├── domain/
│   └── fridge/                    # 食材台账、确定性匹配、AI 契约与安全策略
├── repositories/                  # 本地 / Supabase Recipe Repository
├── services/                      # Store、normalizer、封面发布服务等
├── types/recipeV3.ts              # VisualRecipeV3 类型定义
├── utils/matrixFlowLayout.ts       # Matrix Flow 布局引擎
└── views/
    ├── PublishHome.vue             # 公开食谱档案
    ├── RecipeDetailV3.vue          # 食谱详情与 Cook Mode
    ├── FridgeMatch.vue             # 按食材找料理方向
    ├── MyRecipes.vue               # Kitchen Studio 列表
    └── RecipeEditorV3.vue          # Studio 编辑器

supabase/migrations/               # Supabase schema / RPC 迁移
scripts/                            # 审计、迁移和测试运行脚本
tests/domain/                       # 领域、Repository、Flow、fridge 测试
```

## 部署

仓库包含 `vercel.json` 与 `netlify.toml`，可部署到 Vercel 或 Netlify。

1. 连接 GitHub 仓库，选择 `main` 作为生产分支。
2. 使用构建命令：

   ```bash
   npm run build
   ```

   Netlify 可使用 `npm run build:netlify`。

3. 仅在需要云端数据时，在平台环境变量中配置 `VITE_STORAGE_MODE=supabase`、`VITE_SUPABASE_URL` 与 `VITE_SUPABASE_ANON_KEY`。
4. 不配置 Service Role Key，也不要部署任何个人 BYOK Key。BYOK 由最终用户在浏览器会话内自行临时输入。

部署前请确认 Supabase 已完成相应迁移、RLS 和公开读取策略；前端不会绕过 Repository 或 RLS。

## 进一步文档

- [AGENTS.md](./AGENTS.md)：架构、VisualRecipeV3 规范与开发交接
- [PROJECT_HANDOVER.md](./PROJECT_HANDOVER.md)：项目历史与实现约束
- [DEPLOYMENT.md](./DEPLOYMENT.md)：部署平台说明

## License

[MIT](./LICENSE)
