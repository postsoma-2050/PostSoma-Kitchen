# PostSoma Kitchen 数据来源、取数优先级与版本一致性报告

> **报告时间**：2026-09-15T02:57:23.996Z  
> **审计环境**：Local TS Code vs Supabase Staging (`https://ihtpltojihhwmciqubbk.supabase.co`)  
> **权威模式**：只读探测，未执行任何写入

---

## 1. 为什么直接访问与 `?source=local` 可能呈现不同内容？

### 1.1 取数路径根本原因分析
在 `src/views/RecipeDetailV3.vue` 的 `loadRecipe()` 实现中：
```ts
// 当 URL 携带 ?source=local 或 ?source=preset 时：
const localFound = await getLocalPresetRecipeById(id) // 直接动态 import 代码中的 TypeScript 模块

// 当 URL 无 source 参数（默认访问）时：
const found = await getPublishedRecipeById(id)        // 调用 recipeRepository.getPublishedRecipeById(id)
```

1. **`?source=local` 路径**：
   - 跳过一切缓存和数据库，直接执行 `import('@/data/chineseHealthyRecipes')` 等模块。
   - 呈现的是**当前代码仓库工作区 (Working Tree) 最新的 TypeScript 代码对象**。
2. **默认访问路径**：
   - 依赖注入的 `recipeRepository`（由 `VITE_STORAGE_MODE` 决定）。
   - 当前 `VITE_STORAGE_MODE=supabase`，请求的是 **2026年8月4日** 历史批量落盘到 Supabase 云端的旧快照（例如 `cn-59` 在云端仅有 2 个旧工序且无依赖，而本地代码已重构为 4 工序带暂存回锅）。
   - 若用户之前在 LocalStorage 保存过数据，则在 `VITE_STORAGE_MODE=local` 下会读取旧的 LocalStorage 缓存。
3. **结论**：
   - 这不是页面内部组件取数不一致，而是**存储快照与静态代码仓库之间的版本时间差**。
   - **页面画布 (`RecipeFlowCanvasV3`)、手机端视图 (`RecipeFlowMobileV3`)、详情弹窗与 SVG/PNG 导出，全部统一接收并消费 `RecipeDetailV3` 解析后的同一个 `recipe` 对象，内部数据完全同源！**

---

## 2. 开发者环境版本指纹与普通用户界面的边界隔离

- **普通用户界面**：维持极简高级审美，不外露调试指标、哈希串或数据库版本号。
- **开发与编辑环境 (`import.meta.env.DEV`)**：
  - 在食谱详情页底部或开发者控制台输出数据源指纹：
    `[PostSoma Dev] Recipe: {id} | Source: {local_preset | supabase_published} | ContentHash: {hash} | Version: {ver}`
  - 便于开发人员、QA 秒级确认当前处于“本地代码实时态”还是“云端持久化态”。

---

## 3. 本地代码与云端已发布内容只读比对结果

| 维度 | 统计值 | 状态 |
| :--- | :--- | :--- |
| 本地预置食谱总数 | **121 道** | 包含 102 道中餐 + 16 道美式 + 3 道样板 |
| 远程 Supabase 食谱数 | **47 道** | `public.recipes` 表有效记录 |
| 完全一致 (Hash Match) | **0 道** | 内容哈希完全相符 |
| 内容存在更新 (Modified) | **47 道** | 本地进行了 3.0 typed dependencies 或工序细化 |
| 远程缺失 (Missing) | **74 道** | 本地新增但尚未迁移 |

---

## 4. 重点差异样板剖析

### 样板 1: `cn-59-qincai-niurou` (芹菜牛肉)
- **云端版本 (`updated_at: 2026-08-04`)**：
  - 仅有 2 个简易工序，依赖关系未类型化。
- **本地代码版本 (`src/data/chineseHealthyRecipes.ts`)**：
  - 4 个标准工序，包含完整物料流：牛肉腌渍滑炒 ➔ 暂存盛出 ➔ 爆香蔬菜 ➔ 回锅合炒（承接牛肉半成品）。
- **影响**：默认访问加载云端旧快照时无法展示走廊回锅；携带 `?source=local` 即可展示完整的连续回锅走廊。

---

## 5. 建议与治理原则

1. **严禁在前端硬编码强制本地优先**来掩盖云端版本不同步；
2. **严禁自动覆盖远程数据库**：草稿与未核实内容不得自动发布；
3. 后续若需全量同步，必须在完成真实主厨与事实审核后，由管理员显式触发云端落盘迁移指令。
