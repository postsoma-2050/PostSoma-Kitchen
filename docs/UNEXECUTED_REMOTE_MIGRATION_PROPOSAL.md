# PostSoma Kitchen 未执行的远程迁移提案 (Unexecuted Remote Migration Proposal)

> **当前状态**：**PROPOSED (已编制，未执行)**  
> **执行约束**：严格遵守安全红线，本任务**不写入 Supabase，不部署，不破坏远程生产/Staging 现有数据**。

---

## 1. 提案背景与目的

当前本地仓库在 VisualRecipe 3.0 规范下已完成：
1. 全量 121 道预置食谱 100% 审计 PASS；
2. 连续工序表 4 大准入契约与 83 道兼容食谱收敛；
3. 主图去冗余文字（移除 "+ 放入/承接/产出/状态" 等堆叠）；
4. 分支矩阵图统一为中性极简建筑风格。

然而 Supabase Staging 云端（`public.recipes`）现有数据仍为 **2026年8月4日** 的历史版本，存在 47 道食谱的内容版本落后于本地最新领域模型。

为了在未来适当时机安全地将本地已验证的优质模型落盘至云端，特编制本迁移提案。

---

## 2. 待迁移内容范畴

- **源数据**：`src/data/chineseHealthyRecipes.ts` (102道)、`src/data/homeSweetHomeRecipes.ts` (16道)、`src/data/v3Examples.ts` (3道)
- **目标表**：Supabase `public.recipes` (通过原子 RPC `save_recipe_with_revision`)
- **受影响食谱数量**：
  - 内容变更需更新版本：**47 道**
  - 完全一致无需重复落盘：**0 道**
  - 云端缺失需补齐：**74 道**

---

## 3. 严格的安全执行机制

### 3.1 乐观锁与版本快照追溯
迁移将调用 Postgres RPC：
```sql
SELECT save_recipe_with_revision(p_recipe := :payload);
```
- 每次更新递增 `content_version`；
- 并在 `recipe_revisions` 表中完整保留历史快照，支持秒级回滚。

### 3.2 预执行校验门禁
在任何落盘前，运行全套本地门禁：
```bash
npm run type-check
npm run test:continuous-table
npm run test:round-trip
npm run test:domain
npm run audit:presets
```
必须达到 **100% PASS，0 阻断错误** 方可授权执行。

---

## 4. 拟定执行指令 (待人工授权后执行)

```bash
# 步骤 1: 模拟运行 (Dry-Run)，验证 121 道 Payload 序列化与校验门禁
npm run migrate:all

# 步骤 2: 仅在明确获得产品负责人与主厨授权后，输入 SERVICE_ROLE_KEY 执行真实落盘
SUPABASE_SERVICE_ROLE_KEY="<YOUR_SECRET_SERVICE_ROLE_KEY>" npm run migrate:all -- --actual
```

---

## 5. 回滚方案

若在云端落盘后发现任何异常：
1. 立即从 `recipe_revisions` 历史版本表中按 `recipe_id` 恢复至上一版本 (`content_version - 1`)；
2. 或将前端临时切换至 `VITE_STORAGE_MODE=local`，确保客户端体验不受远程网络或数据异常影响。
