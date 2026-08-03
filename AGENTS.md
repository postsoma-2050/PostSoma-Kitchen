# PostSoma Kitchen (Time_to_eat) · AI 开发与项目架构全面交接指南

> **给新 AI 助手的快速上下文载入指南**：
> 本文档是项目的核心架构与优化全历程总结。请优先阅读本文档，以在秒级内完全理解本项目的设计目的、技术栈、食谱 3.0 建模规范、Supabase 存储机制及 CLI 自动化测试工具链。

---

## 1. 项目目的与核心定位 (Project Purpose)

**PostSoma Kitchen (`what-to-eat`)** 是一款现代化的 **AI 驱动可视化健康食谱建模与管理系统 (VisualRecipeV3.0)**。

### 核心亮点与解决的问题：
- **可视化烹饪流程图 (Matrix Layout Canvas)**：打破传统食谱干瘪的文字排版，将食材、调料与烹饪工序（ActionBlocks）、火候（HeatLevel）、时间动态交织渲染为直观的二维矩阵流程图。
- **复合配方倍率换算 (Formula Scaler)**：支持万能配方/复合酱汁的动态缩放与食材实时换算。
- **健康与营养深度建模**：内置张晔《蒸炖炒，营养师的健康食谱》102 道精细中餐食谱及 16 道美式私房菜，每道食谱具备精确的食材重量量词、准备器具规范与蒸/炖/炒/拌烹饪分类码。

---

## 2. 技术栈与核心架构 (Tech Stack & Architecture)

- **前端框架**：Vue 3 (Composition API, `<script setup>`) + TypeScript + Vite + Tailwind CSS
- **云端与存储层**：
  - **Supabase Staging** (Postgres + PostgREST + RPC 事务)
  - **设计模式**：采用 **Repository 架构模式** (`src/repositories/`)
    - `IRecipeRepository`: 统一食谱抽象接口
    - `SupabaseRecipeRepository`: Supabase 云端存储实现（支持 RPC 原子操作 `save_recipe_with_revision` 与版本快照）
    - `LocalRecipeRepository`: LocalStorage 离线兜底存储实现
    - `createRecipeRepository()`: 依据 `VITE_STORAGE_MODE` (local | supabase) 动态注入
- **测试与 CLI 工具链**：支持静态 TypeScript 类型检查、静态数据审计（Presets Auditor）及 7 维数据闭环深度巡检。

---

## 3. 全量食谱数据集与 VisualRecipeV3.0 规范

系统内置 **121 道 100% 审计 Pass 的预置食谱**：
- **中餐健康食谱** (`src/data/chineseHealthyRecipes.ts`)：共 **102 道**（编号 `cn-01` ~ `cn-102`）；
- **美式私房食谱** (`src/data/homeSweetHomeRecipes.ts`)：共 **16 道**（编号 `hsh-01` ~ `hsh-16`）；
- **V3 经典样例** (`src/data/v3Examples.ts`)：共 **3 道**。

### VisualRecipeV3.0 核心数据结构 (定义于 `src/types/recipeV3.ts`)：
```ts
export interface VisualRecipeV3 {
  id: string                   // 食谱唯一标识符 (如 cn-01-yuxiang-rousi)
  title: string                // 食谱中文名称 (带 Emoji 标号)
  description: string          // 营养价值与风味特色描述
  cuisine: CuisineStyleCode    // 标准菜系 (chinese | western | japanese_korean ...)
  difficulty: 'easy' | 'medium' | 'hard'
  prerequisites: {             // 前置准备
    containerSize: string      // 建议炊具/容器 (如 28cm 中式炒锅)
    preheat?: string           // 预热/腌渍/泡发说明
    servings: string           // 份量说明 (如 2-3 人份)
  }
  ingredients: IngredientItem[] // 食材清单 (必须包含量词 amountText 与分类)
  formulas?: FormulaItem[]     // 复合配方 (可选)
  actionBlocks: ActionBlock[]  // 分阶段工序 (必须关联 ingredientIds, heatLevel, durationMinutes)
  finalBlock: FinalBlock       // 最终烹饪/装盘 (包含 standard method 与 instructions)
}
```

---

## 4. 全套 CLI 自动化指令速查表 (Developer Commands)

在接手项目或新电脑上运行时，可直接执行以下指令：

```bash
# 1. 安装依赖
npm install

# 2. 启动本地 Vite 开发服务器
npm run dev

# 3. Vue TypeScript 强类型校验
npm run type-check

# 4. 全库 121 道静态预置食谱规范审计 (Presets Auditor)
npm run audit:presets

# 5. 食谱 7 维数据精准度与食材映射闭环深度巡检
node scripts/runTs.js scripts/verifyAllRecipesIntegrity.ts

# 6. 领域模型与 Matrix Layout 端到端渲染测试
npm run test:domain

# 7. 全量食谱 Supabase 云端落盘迁移
npm run migrate:all           # Dry-Run 模拟验证
npm run migrate:all -- --actual # 真实向 Supabase 云端批量落盘

# 8. 生产环境构建打包
npm run build
```

---

## 5. 项目优化与重构全历程 (Optimization History)

在本次开发周期中，项目经历了 4 大关键优化阶段：

1. **从 V1/V2 到 V3 架构大版本升级**：
   - 彻底将混乱的字符串与旧食谱格式升级为强类型 `VisualRecipeV3` 规范；
   - 引入标准 Taxonomies (9 大烹饪方式 `COOKING_METHODS` 与风味分类 `CUISINE_STYLES`)。
2. **张晔《蒸炖炒》102 道全量食谱分批建模导入**：
   - 按照原书目录与烹饪要点，分 4 个 Batch 将 102 道中餐食谱全部完成 3.0 标准化建模，补齐量词、工序节点与装盘指导。
3. **建立数据质量与精准度双重巡检体系**：
   - 编写 `scripts/auditPresets.ts`，生成可读与 JSON 结构化审计报告，实现 121 道食谱 **100% 审计 PASS**；
   - 编写 `scripts/verifyAllRecipesIntegrity.ts`，进行 7 维数据扫描，修复所有悬空食材与分类不符问题。
4. **Supabase Staging 云端完整接入与全量落盘**：
   - 实现了 Postgres RPC `save_recipe_with_revision` 原子操作与乐观锁版本快照表 `recipe_revisions`；
   - 成功将全量 **121 道食谱 100% 批量迁移并落盘保存到了 Supabase 云端**。

---

## 6. 环境配置说明 (.env)

迁移到新电脑后，在根目录创建 `.env` 文件：
```env
# Supabase 云端 Staging 配置
VITE_SUPABASE_URL=https://ihtpltojihhwmciqubbk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (参考 .env.example)

# 存储模式切换: 'local' (本地离线优先) 或 'supabase' (纯云端存储)
VITE_STORAGE_MODE=supabase
```

祝二次开发顺利！如需继续扩展新功能（如用户鉴权、收藏夹、AI 食谱生成增强），可直接参考 `src/repositories/` 和 `src/views/` 进行扩建。
