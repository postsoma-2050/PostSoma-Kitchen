# PostSoma Kitchen (Time_to_eat) · 项目交接与二次开发指南

> 本文档用于项目在新设备/新环境下的无缝交接，记录了项目背景、架构设计、数据规范、自动化测试命令与优化演进历程。

---

## 1. 项目简介与目标

**PostSoma Kitchen (`what-to-eat`)** 是一款现代化的 **AI 驱动可视化健康食谱建模与管理系统 (VisualRecipeV3.0)**。

### 核心功能：
1. **可视化烹饪矩阵流程图 (Matrix Layout Canvas)**：自动将食材、调料与烹饪工序（ActionBlocks）、火候（HeatLevel）、时间交织渲染为直观的二维矩阵流程图。
2. **复合配方倍率换算 (Formula Scaler)**：支持万能配方/复合酱汁的动态缩放与食材实时换算。
3. **健康食谱精细建模**：内置张晔《蒸炖炒》102 道中餐食谱及 16 道美式私房菜，每道食谱具备精确的食材重量量词、准备器具规范与蒸/炖/炒/拌烹饪分类码。

---

## 2. 技术栈与架构设计

- **前端**：Vue 3 (Composition API) + TypeScript + Vite + Tailwind CSS
- **云端**：Supabase Staging (`https://ihtpltojihhwmciqubbk.supabase.co`)
- **设计模式**：采用 **Repository 架构模式** (`src/repositories/`)
  - `IRecipeRepository`: 统一食谱抽象接口
  - `SupabaseRecipeRepository`: Supabase 云端存储实现（支持 RPC 原子操作 `save_recipe_with_revision`）
  - `LocalRecipeRepository`: LocalStorage 离线兜底实现
  - `createRecipeRepository()`: 根据 `VITE_STORAGE_MODE` 环境变量自由切换本地/云端模式

---

## 3. 数据集与 V3 规范

项目包含 **121 道 100% 审计通过的预置食谱**：
- **中餐健康食谱** (`src/data/chineseHealthyRecipes.ts`)：**102 道**；
- **美式私房食谱** (`src/data/homeSweetHomeRecipes.ts`)：**16 道**；
- **V3 经典样例** (`src/data/v3Examples.ts`)：**3 道**。

数据结构遵循 `VisualRecipeV3` 强类型规范（包含 `ingredients`, `actionBlocks`, `finalBlock`, `prerequisites`）。

---

## 4. 常用 CLI 指令速查表

```bash
# 启动本地开发服务器
npm run dev

# TypeScript 类型检查
npm run type-check

# 运行 121 道食谱数据规范审计
npm run audit:presets

# 运行 7 维数据精准度与食材闭环深度巡检
node scripts/runTs.js scripts/verifyAllRecipesIntegrity.ts

# 运行领域模型与 Matrix Layout 画布测试
npm run test:domain

# 全量食谱 Supabase 云端迁移
npm run migrate:all -- --actual

# 生产环境构建打包
npm run build
```

---

## 5. 项目重构与优化全历程

1. **从 V1/V2 升级至 V3 强类型架构**：引入标准 Taxonomies 分类与强类型数据结构。
2. **全量中餐食谱 3.0 建模**：将张晔《蒸炖炒》原书 102 道食谱分 4 个 Batch 全部完成建模。
3. **数据质量与精准度巡检体系**：建立 Presets Auditor 审计与 7 维深度巡检，达到 **100% PASS**。
4. **Supabase Staging 云端落盘**：实现 Postgres RPC 原子保存与乐观锁版本表，全量 121 道食谱 100% 落盘 Supabase。
