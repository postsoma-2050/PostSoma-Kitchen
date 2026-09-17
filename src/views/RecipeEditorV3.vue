<template>
  <div class="min-h-screen bg-stone-100 p-4 md:p-6">
    <div class="max-w-7xl mx-auto space-y-6">
      <!-- 顶部控制与保存反馈栏 -->
      <div class="bg-white rounded-xl p-4 md:p-6 border border-stone-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div class="flex-1 space-y-1">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 text-xs font-bold text-[#2D5A43] bg-[#EBF2ED] rounded-full border border-[#C5D8CC]">
              PostSoma Kitchen Studio
            </span>
            <span class="text-xs text-stone-400">|</span>
            <span class="inline-flex items-center gap-1 text-xs text-stone-500">
              发布状态:
              <AppIcon :name="recipe.status === 'published' ? 'success' : 'draft'" :size="14" :class="recipe.status === 'published' ? 'text-emerald-700' : 'text-amber-700'" />
              <strong :class="recipe.status === 'published' ? 'text-emerald-700' : 'text-amber-700'">{{ recipe.status === 'published' ? '已发布 (访客可见)' : '草稿箱 (内部可见)' }}</strong>
            </span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
            <input
              v-model="recipe.title"
              placeholder="输入食谱名称 (如: Espresso Brownies)..."
              class="text-lg font-bold text-stone-900 w-full border-b border-stone-300 focus:border-emerald-600 focus:outline-none bg-transparent py-1"
            />
            <input
              v-model="recipe.coverImageUrl"
              placeholder="封面图片 URL (如: https://images.unsplash.com/...)"
              class="text-xs text-stone-700 w-full border-b border-stone-300 focus:border-emerald-600 focus:outline-none bg-transparent py-1"
            />
          </div>
        </div>

        <!-- 载入预设 / 操作按钮 -->
        <div class="flex flex-wrap items-center gap-2">
          <button
            type="button"
            @click="returnToKitchenStudio"
            class="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 rounded-md text-xs font-bold transition-colors inline-flex items-center gap-1 cursor-pointer"
          >
            <AppIcon name="arrow-left" :size="15" />
            <span>返回 Kitchen Studio</span>
          </button>

          <!-- 载入已有食谱下拉菜单 -->
          <select
            @change="handleLoadSavedRecipe"
            class="px-3 py-2 bg-stone-50 border border-stone-300 rounded-md text-xs font-semibold text-stone-700 hover:bg-stone-100 focus:outline-none cursor-pointer"
          >
            <option value="">-- 载入示例或已存食谱 --</option>
            <optgroup label="预设经典范例">
              <option value="preset-brownies">布朗尼 (参考图1:1)</option>
              <option value="preset-hongshaorou">毛氏红烧肉 (中式炖煮)</option>
              <option value="preset-salad">凯撒沙拉 (冷食免加热)</option>
            </optgroup>
            <optgroup v-if="savedRecipes.length > 0" label="统一食谱库">
              <option v-for="r in savedRecipes" :key="r.id" :value="`saved-${r.id}`">
                {{ r.title }} ({{ r.status === 'published' ? '已发布' : '草稿' }})
              </option>
            </optgroup>
          </select>

          <!-- 目标 B: 撤销按钮 (快捷键 Cmd+Z / Ctrl+Z) -->
          <button
            @click="handleUndo"
            :disabled="!canUndo"
            type="button"
            class="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 disabled:opacity-40 disabled:hover:bg-stone-100 text-stone-700 rounded-md text-xs font-semibold transition-colors cursor-pointer border border-stone-300 inline-flex items-center gap-1"
            title="撤销上一步编辑操作 (Cmd+Z / Ctrl+Z)"
          >
            <AppIcon name="back" :size="15" />
            <span>撤销</span>
            <span v-if="undoCount > 0" class="text-[10px] text-stone-400 font-mono">({{ undoCount }})</span>
          </button>

          <button
            @click="handleSaveDraft"
            type="button"
            class="px-3.5 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-md text-xs font-semibold transition-colors"
          >
            <AppIcon name="save" :size="15" />
            <span>存为草稿</span>
          </button>

          <button
            @click="handleSaveComplete"
            type="button"
            class="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-md text-xs font-semibold shadow-sm transition-colors"
          >
            <AppIcon name="upload" :size="15" />
            <span>发布食谱</span>
          </button>
        </div>
      </div>

      <!-- 保存或提示 Toast 区域 -->
      <div
        v-if="toastMessage"
        :class="[
          'px-4 py-2 rounded-lg text-xs font-medium flex items-center justify-between',
          toastTone === 'error'
            ? 'bg-red-50 border border-red-300 text-red-800'
            : toastTone === 'warning'
              ? 'bg-amber-50 border border-amber-300 text-amber-900'
              : toastTone === 'success'
                ? 'bg-emerald-50 border border-emerald-300 text-emerald-800'
                : 'bg-sky-50 border border-sky-300 text-sky-800'
        ]"
      >
        <span class="flex items-center gap-2"><AppIcon :name="toastIconName" :size="17" />{{ toastMessage }}</span>
        <button @click="toastMessage = ''" class="ml-2 rounded p-1 hover:bg-black/5" aria-label="关闭提示"><AppIcon name="close" :size="16" /></button>
      </div>

      <!-- 数据健康面板 (实时完整度 + 校验错误/警告列表) -->
      <div
        v-if="showHealthPanel || liveValidation.issues.length > 0"
        class="bg-white border rounded-xl shadow-sm overflow-hidden"
        :class="liveValidation.errors.length > 0 ? 'border-red-200' : 'border-amber-200'"
      >
        <!-- 面板头部：完整度评分 + 折叠控制 -->
        <button
          type="button"
          @click="showHealthPanel = !showHealthPanel"
          class="w-full flex items-center justify-between px-5 py-3 text-xs font-bold transition-colors hover:bg-stone-50"
          :class="liveValidation.errors.length > 0 ? 'text-red-800 bg-red-50/50' : 'text-amber-800 bg-amber-50/50'"
        >
          <div class="flex items-center gap-2">
            <AppIcon :name="healthIconName" :size="17" />
            <span>数据健康面板</span>
            <span class="font-mono px-2 py-0.5 rounded-full text-[10px]" :class="liveValidation.completenessScore >= 80 ? 'bg-emerald-100 text-emerald-800' : liveValidation.completenessScore >= 50 ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'">
              完整度 {{ liveValidation.completenessScore }}%
            </span>
            <span v-if="liveValidation.errors.length > 0" class="text-[10px] text-red-700 font-normal">
              · {{ liveValidation.errors.length }} 个发布阻断问题需修复
            </span>
            <span v-else-if="liveValidation.warnings.length > 0" class="text-[10px] text-amber-700 font-normal">
              · {{ liveValidation.warnings.length }} 个建议改善项
            </span>
            <span v-else class="text-[10px] text-emerald-700 font-normal">· 数据完整，可发布</span>
          </div>
          <AppIcon name="arrow-down" :size="16" class="text-stone-400 transition-transform" :class="showHealthPanel ? 'rotate-180' : ''" />
        </button>

        <!-- 展开内容：分 error / warning 两栏 -->
        <div v-if="showHealthPanel" class="px-5 pb-4 pt-2 space-y-3 border-t border-stone-100">
          <!-- 错误项（发布阻断）-->
          <div v-if="liveValidation.errors.length > 0" class="space-y-1.5">
            <p class="flex items-center gap-1.5 text-[11px] font-bold text-red-700 uppercase tracking-wide"><AppIcon name="error" :size="15" />发布阻断项（必须修复）</p>
            <div
              v-for="issue in liveValidation.errors"
              :key="issue.code"
              class="flex items-start gap-2 bg-red-50 border border-red-100 rounded-lg px-3 py-2 text-xs text-red-800"
            >
              <AppIcon name="error" :size="15" class="mt-0.5 shrink-0" />
              <div>
                <span class="font-bold">[{{ issue.field }}]</span>
                {{ issue.message }}
              </div>
            </div>
          </div>

          <!-- 警告项（建议修复）-->
          <div v-if="liveValidation.warnings.length > 0" class="space-y-1.5">
            <p class="flex items-center gap-1.5 text-[11px] font-bold text-amber-700 uppercase tracking-wide"><AppIcon name="alert" :size="15" />建议改善项（不阻断草稿保存）</p>
            <div
              v-for="issue in liveValidation.warnings"
              :key="issue.code"
              class="flex items-start gap-2 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 text-xs text-amber-800"
            >
              <AppIcon name="alert" :size="15" class="mt-0.5 shrink-0" />
              <div>
                <span class="font-bold">[{{ issue.field }}]</span>
                {{ issue.message }}
              </div>
            </div>
          </div>

          <div v-if="liveValidation.issues.length === 0" class="flex items-center gap-1.5 text-xs text-emerald-700 font-medium py-1">
            <AppIcon name="success" :size="16" />所有校验项均通过，数据结构完整可发布！
          </div>
        </div>
      </div>

      <!-- 布局自动校正提示 -->
      <div v-if="collisionNotices.length > 0" class="bg-amber-50 border border-amber-300 text-amber-900 px-4 py-2 rounded-lg text-xs space-y-1">
        <div class="font-bold flex items-center gap-1">
          <AppIcon name="alert" :size="16" />
          <span>布局提示：系统已依据工序依赖与空间占用自动校正阶段：</span>
        </div>
        <ul class="list-disc list-inside text-amber-800 pl-2">
          <li v-for="n in collisionNotices" :key="n.blockId">
            工序「{{ n.blockLabel }}」因{{ n.reason === 'dependency' ? '上游依赖' : '避让重叠' }}，已从第 {{ n.originalStage + 1 }} 阶段调整至第 {{ n.adjustedStage + 1 }} 阶段
          </li>
        </ul>
      </div>

      <!-- 主编辑与预览双栏工作台 -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <!-- 左侧: 语义编辑面板 (7 / 12) -->
        <div class="lg:col-span-6 space-y-6">
          <!-- 1. 前置条件 (Prerequisites) -->
          <div class="bg-white p-5 rounded-xl border border-stone-200 shadow-sm space-y-4">
            <h3 class="text-sm font-bold text-stone-800 flex items-center gap-2 border-b border-stone-100 pb-2">
              <AppIcon name="steps" :size="17" />
              <span>1. 前置准备事项 (Prerequisites)</span>
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label class="block text-xs font-medium text-stone-600 mb-1">容器/模具</label>
                <input
                  v-model="recipe.prerequisites.containerSize"
                  placeholder="如: 8x8寸方模"
                  class="w-full text-xs p-2 border border-stone-300 rounded focus:border-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label class="block text-xs font-medium text-stone-600 mb-1">预热条件</label>
                <input
                  v-model="recipe.prerequisites.preheat"
                  placeholder="如: 预热烤箱至 170°C"
                  class="w-full text-xs p-2 border border-stone-300 rounded focus:border-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label class="block text-xs font-medium text-stone-600 mb-1">建议份量 (产出规模)</label>
                <input
                  v-model="recipe.prerequisites.servings"
                  placeholder="如: 9切块 / 3~4人份"
                  class="w-full text-xs p-2 border border-stone-300 rounded focus:border-emerald-600 focus:outline-none"
                />
              </div>
            </div>

            <!-- 分类标准化维度 (Taxonomy Controls) -->
            <div class="pt-3 border-t border-stone-100 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <!-- 菜系风味下拉选择 -->
              <div>
                <label class="flex items-center gap-1.5 font-semibold text-stone-700 mb-1"><AppIcon name="global" :size="15" />菜系风味 (Cuisine Style)</label>
                <select
                  v-model="recipe.cuisine"
                  class="w-full p-2 bg-stone-50 border border-stone-300 rounded font-medium focus:border-emerald-600 focus:outline-none"
                >
                  <option v-for="c in CUISINE_STYLES" :key="c.code" :value="c.code">
                    {{ c.label }} ({{ c.labelEn }})
                  </option>
                </select>
              </div>

              <!-- 难度等级下拉选择 (含半自动建议) -->
              <div>
                <div class="flex items-center justify-between mb-1">
                  <label class="flex items-center gap-1.5 font-semibold text-stone-700"><AppIcon name="focus" :size="15" />烹饪难度 (Difficulty)</label>
                  <span class="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                    建议: {{ getDifficultyOption(suggestedDifficulty).label }}
                  </span>
                </div>
                <select
                  v-model="recipe.difficulty"
                  class="w-full p-2 bg-stone-50 border border-stone-300 rounded font-medium focus:border-emerald-600 focus:outline-none"
                >
                  <option v-for="d in DIFFICULTIES" :key="d.code" :value="d.code">
                    {{ d.label }} ({{ d.labelEn }})
                  </option>
                </select>
              </div>
            </div>
          </div>

          <!-- 食谱来源与事实核验：发布状态与事实可信度必须分开管理 -->
          <details class="group bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
            <summary class="cursor-pointer list-none px-5 py-4 flex items-center justify-between gap-3 hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-600">
              <div class="min-w-0">
                <div class="flex flex-wrap items-center gap-2">
                  <h3 class="text-sm font-bold text-stone-800">来源与事实核验</h3>
                  <span class="px-2 py-0.5 rounded-full border text-[10px] font-bold"
                    :class="reviewOverall === 'kitchen_verified'
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : reviewOverall === 'source_verified'
                        ? 'bg-sky-50 border-sky-200 text-sky-800'
                        : 'bg-amber-50 border-amber-200 text-amber-800'"
                  >
                    {{ reviewStatusLabel(reviewOverall) }}
                  </span>
                </div>
                <p class="mt-1 text-[11px] leading-relaxed text-stone-500">
                  记录资料来源、核对证据与推断项。此状态独立于“草稿/发布”，不得用发布状态代替事实验证。
                </p>
              </div>
              <AppIcon name="arrow-down" :size="16" class="shrink-0 text-stone-400 transition-transform group-open:rotate-180" />
            </summary>

            <div class="border-t border-stone-100 px-5 py-4 space-y-5">
              <fieldset class="space-y-3">
                <legend class="text-xs font-bold text-stone-700">资料来源</legend>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <label class="block text-xs text-stone-600">
                    <span class="block mb-1 font-medium">来源类型</span>
                    <select v-model="provenanceSourceType" class="w-full p-2 bg-stone-50 border border-stone-300 rounded focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600">
                      <option value="book">书籍</option>
                      <option value="website">网站</option>
                      <option value="author">作者原稿</option>
                      <option value="kitchen_test">厨房实测</option>
                      <option value="internal_sample">内部样例</option>
                      <option value="other">其他/待核对</option>
                    </select>
                  </label>
                  <label class="block text-xs text-stone-600">
                    <span class="block mb-1 font-medium">来源标题</span>
                    <input v-model.trim="provenanceTitle" placeholder="书名、网页标题或资料名称" class="w-full p-2 border border-stone-300 rounded focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600" />
                  </label>
                  <label class="block text-xs text-stone-600">
                    <span class="block mb-1 font-medium">作者/整理者</span>
                    <input v-model.trim="provenanceAuthor" placeholder="作者或资料提供者" class="w-full p-2 border border-stone-300 rounded focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600" />
                  </label>
                  <label class="block text-xs text-stone-600">
                    <span class="block mb-1 font-medium">可定位出处</span>
                    <input v-model.trim="provenanceLocator" placeholder="页码、章节、版本或 URL" class="w-full p-2 border border-stone-300 rounded focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600" />
                  </label>
                </div>
              </fieldset>

              <fieldset class="space-y-3 border-t border-stone-100 pt-4">
                <legend class="text-xs font-bold text-stone-700">事实核验状态</legend>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <label class="block text-xs text-stone-600">
                    <span class="block mb-1 font-medium">整体状态</span>
                    <select v-model="reviewOverall" class="w-full p-2 bg-stone-50 border border-stone-300 rounded focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600">
                      <option v-for="option in reviewStatusOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
                    </select>
                  </label>
                  <label class="block text-xs text-stone-600">
                    <span class="block mb-1 font-medium">核验人</span>
                    <input v-model.trim="reviewedBy" placeholder="姓名或团队" class="w-full p-2 border border-stone-300 rounded focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600" />
                  </label>
                  <label class="block text-xs text-stone-600">
                    <span class="block mb-1 font-medium">核验日期</span>
                    <input v-model="reviewedAtDate" type="date" class="w-full p-2 border border-stone-300 rounded focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600" />
                  </label>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label v-for="dimension in reviewDimensions" :key="dimension.key" class="block text-xs text-stone-600">
                    <span class="block mb-1 font-medium">{{ dimension.label }}</span>
                    <select
                      :value="reviewDimensionValues[dimension.key]"
                      @change="handleReviewDimensionChange(dimension.key, $event)"
                      class="w-full p-2 bg-stone-50 border border-stone-300 rounded focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                    >
                      <option v-for="option in reviewStatusOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
                    </select>
                  </label>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <label class="block text-xs text-stone-600">
                    <span class="block mb-1 font-medium">核验依据（每行一项）</span>
                    <textarea v-model="reviewEvidenceText" rows="3" placeholder="例：第 42 页原料表；2026-09-16 厨房实测记录" class="w-full p-2 border border-stone-300 rounded resize-y focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"></textarea>
                  </label>
                  <label class="block text-xs text-stone-600">
                    <span class="block mb-1 font-medium">建模推断与待核对项（每行一项）</span>
                    <textarea v-model="reviewAssumptionsText" rows="3" placeholder="例：单锅耗时为建模估计，尚未厨房实测" class="w-full p-2 border border-stone-300 rounded resize-y focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"></textarea>
                  </label>
                </div>
              </fieldset>
            </div>
          </details>

          <!-- 2. 食材行物理顺序管理 (Ingredients) -->
          <div class="bg-white p-5 rounded-xl border border-stone-200 shadow-sm space-y-4">
            <div class="flex items-center justify-between border-b border-stone-100 pb-2">
              <h3 class="text-sm font-bold text-stone-800 flex items-center gap-2">
                <AppIcon name="seedling" :size="17" />
                <span>2. 食材列表 (物理顺序即流程图行顺序)</span>
              </h3>
              <button
                @click="handleAddIngredient"
                type="button"
                class="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded text-xs font-semibold transition-colors"
              >
                <AppIcon name="seedling" :size="14" />
                <span>新增食材</span>
              </button>
            </div>

            <div class="space-y-2">
              <div
                v-for="(ing, index) in recipe.ingredients"
                :key="ing.id"
                class="flex items-center gap-2 p-2 bg-stone-50 rounded-lg border border-stone-200"
              >
                <!-- 上下移动按钮 (无裸露 rowIndex) -->
                <div class="flex flex-col gap-0.5">
                  <button
                    @click="moveIngredient(index, -1)"
                    :disabled="index === 0"
                    type="button"
                    class="px-1.5 py-0.5 text-stone-500 hover:text-stone-800 disabled:opacity-30 disabled:hover:text-stone-500 text-xs font-bold"
                    title="上移"
                  >
                    <AppIcon name="arrow-down" :size="15" class="rotate-180" />
                  </button>
                  <button
                    @click="moveIngredient(index, 1)"
                    :disabled="index === recipe.ingredients.length - 1"
                    type="button"
                    class="px-1.5 py-0.5 text-stone-500 hover:text-stone-800 disabled:opacity-30 disabled:hover:text-stone-500 text-xs font-bold"
                    title="下移"
                  >
                    <AppIcon name="arrow-down" :size="15" />
                  </button>
                </div>

                <!-- 主辅料类别切换按钮 (方向 3) -->
                <button
                  @click="ing.category = (ing.category === 'seasoning' ? 'main' : 'seasoning')"
                  type="button"
                  :class="[
                    'px-2 py-1 rounded text-[11px] font-bold border transition-colors cursor-pointer shrink-0',
                    ing.category === 'seasoning'
                      ? 'bg-stone-100 text-stone-600 border-stone-300 hover:bg-stone-200'
                      : 'bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-200'
                  ]"
                  :title="ing.category === 'seasoning' ? '当前标为：调料/辅料 (点击切换为主料)' : '当前标为：主料 (点击切换为调料)'"
                >
                  {{ ing.category === 'seasoning' ? '调料' : '主料' }}
                </button>

                <!-- 食材名称与用量 -->
                <input
                  v-model="ing.amountText"
                  placeholder="用量 (如: 115 g)"
                  class="w-28 text-xs p-1.5 border border-stone-300 rounded bg-white focus:border-emerald-600 focus:outline-none"
                />

                <div class="relative flex-1">
                  <input
                    v-model="ing.name"
                    @input="handleIngredientInput(index, ing.name)"
                    @focus="handleIngredientInput(index, ing.name)"
                    placeholder="食材名称 (如: 无盐黄油)"
                    class="w-full text-xs p-1.5 border border-stone-300 rounded bg-white focus:border-emerald-600 focus:outline-none font-medium"
                  />

                  <!-- Autocomplete 智能下拉建议菜单 -->
                  <div
                    v-if="activeInputIndex === index && suggestionsMap[index] && suggestionsMap[index].length > 0"
                    class="absolute left-0 right-0 top-full mt-1 bg-white border border-stone-300 rounded-md shadow-lg z-50 divide-y divide-stone-100 max-h-48 overflow-y-auto"
                  >
                    <div
                      v-for="sugg in suggestionsMap[index]"
                      :key="sugg.id"
                      class="p-2 hover:bg-emerald-50 cursor-pointer flex items-center justify-between transition-colors"
                    >
                      <div @click="applyCanonicalName(index, sugg.canonicalName)" class="flex-1">
                        <div class="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                          <span class="inline-flex items-center gap-1"><AppIcon name="leaf" :size="14" />{{ sugg.canonicalName }}</span>
                          <span v-if="sugg.usageCount > 0" class="text-[10px] text-stone-400 font-normal">({{ sugg.usageCount }} 次使用)</span>
                        </div>
                        <div v-if="sugg.aliases && sugg.aliases.length > 0" class="text-[10px] text-stone-400 mt-0.5">
                          别名: {{ sugg.aliases.join(', ') }}
                        </div>
                      </div>

                      <button
                        v-if="ing.name.trim() !== sugg.canonicalName"
                        @click.stop="handleAddAlias(index, sugg)"
                        type="button"
                        class="text-[10px] bg-emerald-100 hover:bg-emerald-200 text-emerald-800 px-1.5 py-0.5 rounded font-semibold border border-emerald-300 ml-2 cursor-pointer"
                        title="将当前输入名称设为此食材的别名"
                      >
                        <AppIcon name="link" :size="13" />
                        <span>存为别名</span>
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  @click="removeIngredient(index)"
                  type="button"
                  class="p-1.5 text-red-500 hover:text-red-700 text-xs font-bold ml-1 cursor-pointer"
                  title="删除"
                >
                  <AppIcon name="delete" :size="16" />
                </button>
              </div>

              <div v-if="recipe.ingredients.length === 0" class="text-xs text-stone-400 text-center py-4 border border-dashed border-stone-300 rounded-lg">
                暂无食材，点击右上方“+ 新增食材”添加
              </div>
            </div>
          </div>

          <!-- 3. 工序矩阵块管理 (Action Blocks) -->
          <div class="bg-white p-5 rounded-xl border border-stone-200 shadow-sm space-y-4">
            <div class="flex items-center justify-between border-b border-stone-100 pb-2">
              <h3 class="text-sm font-bold text-stone-800 flex items-center gap-2">
                <AppIcon name="settings" :size="17" />
                <span>3. 工序节点 (关联食材与阶段)</span>
              </h3>
              <div class="flex items-center gap-2">
                <button
                  @click="handleAutoSortIngredients"
                  type="button"
                  :disabled="recipe.ingredients.length <= 1 || recipe.actionBlocks.length === 0"
                  class="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 disabled:opacity-40 text-amber-900 border border-amber-300 rounded text-xs font-semibold transition-colors flex items-center gap-1 shadow-sm"
                  title="根据工序进入顺序自动排列食材，从根本上确保工序块紧密咬合、零空白死区"
                >
                  <AppIcon name="magic" :size="15" />
                  <span>按工序时序重排食材</span>
                </button>
                <button
                  @click="handleAddActionBlock"
                  type="button"
                  class="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded text-xs font-semibold transition-colors"
                >
                  <AppIcon name="steps" :size="14" />
                  <span>新增工序</span>
                </button>
              </div>
            </div>

            <div class="space-y-4">
              <div
                v-for="(block, bIndex) in recipe.actionBlocks"
                :key="block.id"
                class="p-3 bg-stone-50 rounded-lg border border-stone-200 space-y-3"
              >
                <!-- 头部：名称、阶段控制与删除 -->
                <div class="flex items-center justify-between gap-2 border-b border-stone-200 pb-2">
                  <div class="flex items-center gap-2 flex-wrap">
                    <span class="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                      第 {{ block.stageIndex + 1 }} 阶段
                    </span>
                    <input
                      v-model="block.label"
                      placeholder="工序名称 (如: 爆香炒汁)"
                      class="text-xs font-bold text-stone-900 border-b border-stone-300 focus:border-emerald-600 focus:outline-none bg-transparent"
                    />
                    <input
                      v-model="block.sublabel"
                      placeholder="英文 (如: Sauté)"
                      class="text-xs text-stone-500 border-b border-stone-300 focus:border-emerald-600 focus:outline-none bg-transparent w-24"
                    />
                    <!-- 动词精炼建议 -->
                    <span
                      v-if="block.label && block.label.length > 4"
                      class="text-[10.5px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200"
                    >
                      <AppIcon name="lightbulb" :size="13" class="mr-1" />建议精炼为 2~4 字动词（如：爆香炒汁），操作长句请写入下方“操作说明”
                    </span>
                  </div>

                  <div class="flex items-center gap-1">
                    <button
                      @click="changeBlockStage(block, -1)"
                      :disabled="block.stageIndex <= 0"
                      type="button"
                      class="px-2 py-0.5 bg-stone-200 hover:bg-stone-300 disabled:opacity-40 rounded text-xs font-medium"
                    >
                      <AppIcon name="arrow-left" :size="13" />移至上一阶段
                    </button>
                    <button
                      @click="changeBlockStage(block, 1)"
                      type="button"
                      class="px-2 py-0.5 bg-stone-200 hover:bg-stone-300 rounded text-xs font-medium"
                    >
                      移至下一阶段<AppIcon name="arrow-right" :size="13" />
                    </button>
                    <button
                      @click="removeActionBlock(bIndex)"
                      type="button"
                      class="text-red-500 hover:text-red-700 text-xs font-bold ml-2"
                    >
                      <AppIcon name="delete" :size="15" />
                    </button>
                  </div>
                </div>

                <!-- 常用烹饪技法快捷选择 -->
                <div class="flex items-center gap-1 flex-wrap pt-0.5 pb-1">
                  <span class="text-[10px] text-stone-500 font-medium mr-1">快捷技法:</span>
                  <button
                    v-for="sk in quickSkills"
                    :key="sk.code"
                    type="button"
                    @click="selectSkillPreset(block, sk)"
                    class="px-1.5 py-0.5 bg-white hover:bg-emerald-50 text-stone-700 hover:text-emerald-800 border border-stone-200 rounded text-[10.5px] transition-colors"
                  >
                    {{ sk.zhLabel }}
                  </button>
                </div>

                <!-- 关联食材多选框 -->
                <div class="space-y-1">
                  <label class="block text-xs font-semibold text-stone-700">勾选本工序处理的食材：</label>
                  <div v-if="recipe.ingredients.length > 0" class="flex flex-wrap gap-2 pt-1">
                    <label
                      v-for="ing in recipe.ingredients"
                      :key="ing.id"
                      class="inline-flex items-center gap-1 px-2 py-1 bg-white rounded border border-stone-300 text-xs text-stone-700 cursor-pointer hover:bg-emerald-50"
                    >
                      <input
                        type="checkbox"
                        :value="ing.id"
                        v-model="block.ingredientIds"
                        class="rounded text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>{{ ing.name || '未命名食材' }}</span>
                    </label>
                  </div>
                  <div v-else class="text-xs text-stone-400 italic">请先在上方添加食材</div>

                  <!-- 食材排布优化辅助提示面板 -->
                  <div
                    v-if="!checkStepIngredientContiguity(block.ingredientIds, recipe.ingredients).isContiguous"
                    class="p-2.5 bg-blue-50/70 border border-blue-200 rounded-lg text-xs space-y-1.5 mt-1.5"
                  >
                    <div class="flex items-center justify-between gap-2">
                      <span class="font-bold text-blue-900 flex items-center gap-1.5">
                        <AppIcon name="lightbulb" :size="15" />
                        <span>食材排布优化建议：检测到当前工序勾选的食材在列表中非连续</span>
                      </span>
                      <button
                        type="button"
                        @click="handleAutoSortIngredients"
                        class="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-bold transition-colors whitespace-nowrap cursor-pointer shadow-xs"
                        title="可选：自动按时序重排食材清单为连续阶梯"
                      >
                        <AppIcon name="magic" :size="14" />
                        <span>优化食材排列为阶梯</span>
                      </button>
                    </div>
                    <p class="text-blue-800 text-[11px] leading-relaxed">
                      当前工序包含跨行食材：<strong>{{ checkStepIngredientContiguity(block.ingredientIds, recipe.ingredients).missingIngredientNames.join('、') }}</strong>。当前渲染系统已支持非连续食材与导轨表达，卡片高度由内容决定（不再暴力拉通）。如需在二维网格中呈现连续阶梯，可点击优化按钮辅助调整。
                    </p>
                  </div>
                </div>

                <!-- 工序执行参数 -->
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-stone-200">
                  <label class="space-y-1 text-[11px] font-semibold text-stone-600">
                    <span>火候 / 温度</span>
                    <input
                      v-model="block.heatLevel"
                      placeholder="如：大火 / 170°C"
                      class="w-full px-2.5 py-2 bg-white border border-stone-300 rounded-md text-xs text-stone-800 focus:outline-none focus:border-emerald-600"
                    />
                  </label>
                  <label class="space-y-1 text-[11px] font-semibold text-stone-600">
                    <span>持续时间（分钟）</span>
                    <input
                      v-model.number="block.durationMinutes"
                      type="number"
                      min="0"
                      step="0.5"
                      placeholder="如：5"
                      class="w-full px-2.5 py-2 bg-white border border-stone-300 rounded-md text-xs text-stone-800 focus:outline-none focus:border-emerald-600"
                    />
                  </label>
                  <label class="space-y-1 text-[11px] font-semibold text-stone-600">
                    <span>使用器具</span>
                    <input
                      v-model="block.equipment"
                      placeholder="如：28cm 炒锅"
                      class="w-full px-2.5 py-2 bg-white border border-stone-300 rounded-md text-xs text-stone-800 focus:outline-none focus:border-emerald-600"
                    />
                  </label>
                </div>

                <!-- 关键产出与准出状态 (支撑连续工序表与矩阵图事实表达) -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-stone-200">
                  <label class="space-y-1 text-[11px] font-semibold text-stone-600">
                    <div class="flex items-center justify-between">
                      <span>产出半成品物料名称</span>
                      <span class="text-[10px] text-stone-400">供下游工序显式承接</span>
                    </div>
                    <input
                      v-model="block.outputItem"
                      placeholder="如：焯透五花肉 / 上浆牛肉丝"
                      class="w-full px-2.5 py-2 bg-white border border-stone-300 rounded-md text-xs text-stone-800 focus:outline-none focus:border-emerald-600"
                    />
                  </label>
                  <label class="space-y-1 text-[11px] font-semibold text-stone-600">
                    <div class="flex items-center justify-between">
                      <span>准出条件 / 达成关键状态</span>
                      <span class="text-[10px] text-stone-400">达到该状态方可进入下一步</span>
                    </div>
                    <input
                      v-model="block.completionState"
                      placeholder="如：大火沸腾撇净浮沫，肉块断生捞出"
                      class="w-full px-2.5 py-2 bg-white border border-stone-300 rounded-md text-xs text-stone-800 focus:outline-none focus:border-emerald-600"
                    />
                  </label>
                </div>

                <!-- 操作要点说明 (完整指导，呈现于详情展开、移动端及无障碍面板) -->
                <div class="pt-2 border-t border-stone-200">
                  <label class="space-y-1 text-[11px] font-semibold text-stone-600 block">
                    <div class="flex items-center justify-between">
                      <span>操作要点说明 (完整步骤指导，呈现于移动端、点击详情与步骤清单)</span>
                      <span class="text-[10px] text-stone-400">悬浮或点击卡片均可查看</span>
                    </div>
                    <input
                      v-model="block.notes"
                      placeholder="如：油热爆葱末下番茄炒出红油浓汁，加水大火烧开..."
                      class="w-full px-2.5 py-2 bg-white border border-stone-300 rounded-md text-xs text-stone-800 focus:outline-none focus:border-emerald-600"
                    />
                  </label>
                </div>

                <!-- 上游工序依赖：只允许选择物理顺序在前的节点，从编辑器层避免产生循环 -->
                <div class="space-y-1.5 pt-2 border-t border-stone-200">
                  <div class="flex items-center justify-between gap-3">
                    <label class="text-xs font-semibold text-stone-700">承接哪些上游工序：</label>
                    <span class="text-[10px] text-stone-400">用于先后时序约束与分支连接箭头指示</span>
                  </div>
                  <div v-if="bIndex > 0" class="flex flex-wrap gap-2">
                    <div
                      v-for="upstream in recipe.actionBlocks.slice(0, bIndex)"
                      :key="upstream.id"
                      class="inline-flex items-center gap-1.5 px-2 py-1 bg-white rounded border text-xs text-stone-700"
                      :class="isUpstreamSelected(block, upstream.id) ? 'border-emerald-500 bg-emerald-50/50' : 'border-stone-300'"
                    >
                      <label class="inline-flex items-center gap-1 cursor-pointer">
                        <input
                          type="checkbox"
                          :checked="isUpstreamSelected(block, upstream.id)"
                          @change="toggleUpstreamDependency(block, upstream.id, ($event.target as HTMLInputElement).checked)"
                          class="rounded text-emerald-600 focus:ring-emerald-500"
                        />
                        <span class="font-medium">{{ upstream.label || `工序 ${bIndex}` }}</span>
                      </label>
                      <select
                        v-if="isUpstreamSelected(block, upstream.id)"
                        :value="getUpstreamDependencyType(block, upstream.id)"
                        @change="setUpstreamDependencyType(block, upstream.id, ($event.target as HTMLSelectElement).value as 'material' | 'order')"
                        class="ml-1 text-[10px] py-0.5 px-1 bg-white border border-stone-300 rounded text-stone-600 focus:outline-none"
                      >
                        <option value="material">物料流入 (实线)</option>
                        <option value="order">同锅等待 (虚线)</option>
                      </select>
                    </div>
                  </div>
                  <div v-else class="text-[11px] text-stone-400 italic">首个工序直接承接食材，无需选择上游节点</div>
                </div>
              </div>

              <div v-if="recipe.actionBlocks.length === 0" class="text-xs text-stone-400 text-center py-4 border border-dashed border-stone-300 rounded-lg">
                暂无工序，点击右上方“+ 新增工序”添加
              </div>
            </div>
          </div>

          <!-- 4. 流程终点 (Final Operation / Outcome) -->
          <div class="bg-white p-5 rounded-xl border border-stone-200 shadow-sm space-y-4">
            <div class="flex items-center justify-between border-b border-stone-100 pb-2">
              <h3 class="text-sm font-bold text-stone-800 flex items-center gap-2">
                <AppIcon name="fire" :size="17" />
                <span>4. 流程终点</span>
              </h3>
              <label class="inline-flex items-center gap-1.5 text-xs text-stone-600 cursor-pointer">
                <input
                  type="checkbox"
                  :checked="Boolean(recipe.finalBlock)"
                  @change="toggleFinalBlock"
                  class="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span>启用终点栏</span>
              </label>
            </div>

            <div v-if="recipe.finalBlock" class="space-y-3">
              <div class="rounded-lg border border-emerald-100 bg-emerald-50/60 p-3">
                <label class="block text-xs font-bold text-stone-700 mb-1">终点职责</label>
                <select
                  :value="recipe.finalBlock.role || 'operation'"
                  @change="setFinalBlockRole(($event.target as HTMLSelectElement).value as 'operation' | 'outcome')"
                  class="w-full text-xs p-2 border border-stone-300 rounded bg-white focus:border-emerald-600 focus:outline-none font-semibold"
                >
                  <option value="outcome">结果标记：前面的工序已经完整，只显示紧凑“完成”终点</option>
                  <option value="operation">真实终步：这里仍有烘焙、蒸制、冷藏等尚未写入工序的操作</option>
                </select>
                <p class="mt-1.5 text-[11px] leading-relaxed text-stone-500">
                  口感、颜色和营养价值不是工序。结果型终点不会占据工序表一整列；只有真实未执行的最后操作才选择“真实终步”。
                </p>
              </div>

              <template v-if="recipe.finalBlock.role === 'outcome'">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label class="block text-xs font-medium text-stone-600 mb-1">终点标记</label>
                    <input
                      :value="recipe.finalBlock.label"
                      disabled
                      class="w-full text-xs p-2 border border-stone-200 rounded bg-stone-100 text-stone-500 font-bold"
                    />
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-stone-600 mb-1">烹饪法分类</label>
                    <select
                      v-model="recipe.finalBlock.method"
                      class="w-full text-xs p-2 border border-stone-300 rounded bg-white focus:border-emerald-600 focus:outline-none font-semibold"
                    >
                      <option value="bake">烘焙 (Bake)</option>
                      <option value="sear">煎炒 (Sear / Fry)</option>
                      <option value="stew">慢炖 (Stew)</option>
                      <option value="steam">蒸制 (Steam)</option>
                      <option value="boil">水煮 (Boil)</option>
                      <option value="serve">直接装盘 (Serve)</option>
                      <option value="raw">生食/冷藏 (Chill / Raw)</option>
                      <option value="other">其他</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-medium text-stone-600 mb-1">装盘与食用提示</label>
                  <input
                    v-model="recipe.finalBlock.servingInstructions"
                    placeholder="如：盛盘后趁热享用；冷藏 2 小时后切块"
                    class="w-full text-xs p-2 border border-stone-300 rounded focus:border-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label class="block text-xs font-medium text-stone-600 mb-1">成品状态（可选，不作为步骤显示）</label>
                  <textarea
                    v-model="recipe.finalBlock.resultDescription"
                    rows="2"
                    placeholder="如：牛肉滑嫩，芹菜爽脆。营养说明请写入食谱提示，而不是这里。"
                    class="w-full text-xs p-2 border border-stone-300 rounded focus:border-emerald-600 focus:outline-none"
                  ></textarea>
                </div>
              </template>

              <template v-else>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-medium text-stone-600 mb-1">完成方式</label>
                  <select
                    v-model="recipe.finalBlock.method"
                    class="w-full text-xs p-2 border border-stone-300 rounded bg-white focus:border-emerald-600 focus:outline-none font-semibold"
                  >
                    <option value="bake">烘焙 (Bake)</option>
                    <option value="sear">煎炒 (Sear / Fry)</option>
                    <option value="stew">慢炖 (Stew)</option>
                    <option value="steam">蒸制 (Steam)</option>
                    <option value="boil">水煮 (Boil)</option>
                    <option value="serve">装盘即享 (Direct Serve - 免加热)</option>
                    <option value="raw">生食/冷藏 (Chill / Raw - 免加热)</option>
                    <option value="other">其他</option>
                  </select>
                </div>

                <div>
                  <label class="block text-xs font-medium text-stone-600 mb-1">显示标题</label>
                  <input
                    v-model="recipe.finalBlock.label"
                    placeholder="如: 烘焙 bake"
                    class="w-full text-xs p-2 border border-stone-300 rounded focus:border-emerald-600 focus:outline-none font-bold"
                  />
                </div>
              </div>

              <!-- 如果不是免加热，显示温度与时长 -->
              <div v-if="recipe.finalBlock.method !== 'serve' && recipe.finalBlock.method !== 'raw'" class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-medium text-stone-600 mb-1">摄氏度 (°C)</label>
                  <input
                    type="number"
                    v-model.number="recipe.finalBlock.temperatureC"
                    placeholder="如: 170"
                    class="w-full text-xs p-2 border border-stone-300 rounded focus:border-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label class="block text-xs font-medium text-stone-600 mb-1">时长文案</label>
                  <input
                    v-model="recipe.finalBlock.durationText"
                    placeholder="如: 30 to 40 min"
                    class="w-full text-xs p-2 border border-stone-300 rounded focus:border-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label class="block text-xs font-medium text-stone-600 mb-1">真实终步操作指南</label>
                <textarea
                  v-model="recipe.finalBlock.instructions"
                  rows="2"
                  placeholder="如: 倒入抹油防沾的 8x8 寸方模中，烘焙至表面结壳。"
                  class="w-full text-xs p-2 border border-stone-300 rounded focus:border-emerald-600 focus:outline-none"
                ></textarea>
              </div>
              </template>
            </div>

            <div v-else class="text-xs text-stone-400 italic text-center py-2 bg-stone-50 rounded border border-dashed border-stone-200">
              当前未启用终点栏，流程图右侧将显示「完成方式待补充」
            </div>
          </div>
        </div>

        <!-- 右侧: 实时 SVG 流程卡预览 (6 / 12) -->
        <div class="lg:col-span-6 sticky top-6">
          <div class="bg-white p-4 rounded-xl border border-stone-200 shadow-sm space-y-3">
            <div class="flex items-center justify-between border-b border-stone-100 pb-2">
              <span class="text-xs font-bold text-stone-700 flex items-center gap-1.5">
                <AppIcon name="eye" :size="17" />
                <span>实时 SVG Flow Card 预览</span>
              </span>
              <span class="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-mono">0ms 实时刷新</span>
            </div>

            <!-- Workspace 画布容器 -->
            <div class="space-y-4 min-w-0">
              <RecipeFlowWorkspaceV3 :recipe="recipe" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 保存成功操作引导 Modal -->
    <div
      v-if="showSaveModal"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      @click.self="showSaveModal = false"
    >
      <div class="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4 border border-stone-200 animate-in fade-in zoom-in duration-200">
        <div class="flex items-start justify-between gap-3 border-b border-stone-100 pb-3 text-emerald-800">
          <div class="flex items-center gap-3">
            <span class="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100"><AppIcon name="success" :size="26" /></span>
            <div>
              <h3 class="text-base font-bold text-stone-900">完整食谱已成功保存！</h3>
              <p class="text-xs text-stone-500 mt-0.5">已写入当前 Repository 配置的统一食谱库</p>
            </div>
          </div>
          <button type="button" @click="showSaveModal = false" class="rounded-lg p-1 text-stone-400 hover:bg-stone-100 hover:text-stone-700" aria-label="关闭保存成功提示"><AppIcon name="close" :size="18" /></button>
        </div>

        <p class="text-xs text-stone-600 leading-relaxed">
          Visual Recipe Flow Card 已准备就绪。你可以预览公开展示、返回 Kitchen Studio 管理库，或留在当前页面继续调整。
        </p>

        <div class="flex flex-col sm:flex-row gap-2 pt-2">
          <router-link
            :to="`/recipe/${recipe.id}`"
            class="flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-center rounded-lg text-xs font-bold shadow-sm transition-colors cursor-pointer"
          >
            预览公开详情
          </router-link>

          <button
            type="button"
            @click="returnToKitchenStudio"
            class="flex-1 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-center rounded-lg text-xs font-semibold border border-stone-300 transition-colors cursor-pointer"
          >
            返回 Kitchen Studio
          </button>
        </div>
        <button type="button" @click="showSaveModal = false" class="w-full py-2 text-xs font-semibold text-stone-500 hover:text-stone-800">继续编辑</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type {
  RecipeFactReviewStatus,
  RecipeSourceType,
  V3ActionBlock,
  V3RecipeDataReview,
  V3RecipeProvenance,
  VisualRecipeV3,
} from '@/types/recipeV3'
import {
  CUISINE_STYLES,
  DIFFICULTIES,
  getDifficultyOption,
  calculateSuggestedDifficulty
} from '@/constants/taxonomy'
import { validateRecipe } from '@/utils/taxonomyMatcher'
import { espressoBrowniesV3, hongShaoRouV3, caesarSaladV3 } from '@/data/v3Examples'
import { buildV3MatrixLayout } from '@/utils/matrixFlowLayout'
import { saveV3Recipe, getV3Recipes, getV3RecipeById, getV3Draft, saveV3Draft, clearV3Draft } from '@/services/v3RecipeStore'
import { findMatchingIngredients, addAlias } from '@/services/ingredientRegistryStore'
import type { IngredientEntry } from '@/types/ingredientRegistry'
import RecipeFlowWorkspaceV3 from '@/components/recipe-flow-v3/RecipeFlowWorkspaceV3.vue'
import AppIcon from '@/components/common/AppIcon.vue'
import type { AppIconName } from '@/types/icon'
import { resolveAdminReturnTarget } from '@/utils/adminNavigation'
import {
  STANDARD_COOKING_SKILLS,
  type CookingSkillDefinition,
  checkStepIngredientContiguity,
  autoSortIngredientsByFlow,
} from '@/types/recipeStepFramework'

const route = useRoute()
const router = useRouter()
const showSaveModal = ref(false)
const adminReturnTarget = computed(() => resolveAdminReturnTarget(route.query.returnTo))

function returnToKitchenStudio() {
  showSaveModal.value = false
  void router.replace(adminReturnTarget.value)
}

// 默认空白食谱工厂
function createDefaultBlankRecipe(): VisualRecipeV3 {
  return {
    id: `v3-recipe-${Date.now()}`,
    version: '3.0',
    status: 'draft',
    title: '未命名食谱',
    cuisine: 'chinese',
    difficulty: 'easy',
    prerequisites: {
      containerSize: '',
      preheat: '',
      servings: ''
    },
    ingredients: [
      { id: 'i0', name: '黄油', amountText: '115 g', category: 'dairy' },
      { id: 'i1', name: '细砂糖', amountText: '200 g', category: 'seasoning' }
    ],
    actionBlocks: [
      { id: 'b0', stageIndex: 0, ingredientIds: ['i0'], inputBlockIds: [], action: 'melt', label: '融化', sublabel: 'melt' }
    ],
    finalBlock: {
      method: 'bake',
      role: 'operation',
      label: '烘焙 bake',
      temperatureC: 170,
      durationText: '30 min'
    },
    dataReview: {
      overall: 'unreviewed',
      ingredients: 'unreviewed',
      quantities: 'unreviewed',
      topology: 'unreviewed',
      heatAndTiming: 'unreviewed',
      evidence: [],
      assumptions: []
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
}

const recipe = ref<VisualRecipeV3>(createDefaultBlankRecipe())
const savedRecipes = ref<VisualRecipeV3[]>([])
const toastMessage = ref('')
const cloudStateUnavailable = ref(false)

const toastTone = computed<'error' | 'warning' | 'success' | 'info'>(() => {
  const message = toastMessage.value
  if (/失败|冲突|已暂停|未载入/.test(message)) return 'error'
  if (/暂时无法确认|暂时无法重新读取|稍后刷新/.test(message)) return 'warning'
  if (/已保存|已发布|已成功|已加载|已恢复|已优化|已撤销|已将/.test(message)) return 'success'
  return 'info'
})

const toastIconName = computed<AppIconName>(() => {
  if (toastTone.value === 'error') return 'error'
  if (toastTone.value === 'warning') return 'alert'
  if (toastTone.value === 'success') return 'success'
  return 'info'
})

type ReviewDimensionKey = 'ingredients' | 'quantities' | 'topology' | 'heatAndTiming'

const reviewStatusOptions: Array<{ value: RecipeFactReviewStatus; label: string }> = [
  { value: 'unreviewed', label: '待核对' },
  { value: 'modeled', label: '已建模（事实待核）' },
  { value: 'transcribed', label: '已转录（待逐项复核）' },
  { value: 'source_verified', label: '来源已核对' },
  { value: 'kitchen_verified', label: '厨房已实测' },
]

const reviewDimensions: Array<{ key: ReviewDimensionKey; label: string }> = [
  { key: 'ingredients', label: '食材组成' },
  { key: 'quantities', label: '用量单位' },
  { key: 'topology', label: '工序与物料关系' },
  { key: 'heatAndTiming', label: '火候与时间' },
]

const emptyReview: V3RecipeDataReview = {
  overall: 'unreviewed',
  ingredients: 'unreviewed',
  quantities: 'unreviewed',
  topology: 'unreviewed',
  heatAndTiming: 'unreviewed',
  evidence: [],
  assumptions: [],
}

function ensureProvenance(): V3RecipeProvenance {
  if (!recipe.value.provenance) {
    recipe.value.provenance = { sourceType: 'other', title: '' }
  }
  return recipe.value.provenance
}

function ensureDataReview(): V3RecipeDataReview {
  if (!recipe.value.dataReview) {
    recipe.value.dataReview = {
      overall: 'unreviewed',
      ingredients: 'unreviewed',
      quantities: 'unreviewed',
      topology: 'unreviewed',
      heatAndTiming: 'unreviewed',
      evidence: [],
      assumptions: [],
    }
  }
  return recipe.value.dataReview
}

const provenanceSourceType = computed<RecipeSourceType>({
  get: () => recipe.value.provenance?.sourceType || 'other',
  set: (value) => { ensureProvenance().sourceType = value },
})
const provenanceTitle = computed<string>({
  get: () => recipe.value.provenance?.title || '',
  set: (value) => { ensureProvenance().title = value },
})
const provenanceAuthor = computed<string>({
  get: () => recipe.value.provenance?.author || '',
  set: (value) => { ensureProvenance().author = value || undefined },
})
const provenanceLocator = computed<string>({
  get: () => recipe.value.provenance?.locator || '',
  set: (value) => { ensureProvenance().locator = value || undefined },
})
const reviewOverall = computed<RecipeFactReviewStatus>({
  get: () => recipe.value.dataReview?.overall || 'unreviewed',
  set: (value) => { ensureDataReview().overall = value },
})
const reviewedBy = computed<string>({
  get: () => recipe.value.dataReview?.reviewedBy || '',
  set: (value) => { ensureDataReview().reviewedBy = value || undefined },
})
const reviewedAtDate = computed<string>({
  get: () => recipe.value.dataReview?.reviewedAt?.slice(0, 10) || '',
  set: (value) => { ensureDataReview().reviewedAt = value ? `${value}T00:00:00.000Z` : undefined },
})
const reviewEvidenceText = computed<string>({
  get: () => (recipe.value.dataReview?.evidence || []).join('\n'),
  set: (value) => {
    ensureDataReview().evidence = value.split('\n').map((item) => item.trim()).filter(Boolean)
  },
})
const reviewAssumptionsText = computed<string>({
  get: () => (recipe.value.dataReview?.assumptions || []).join('\n'),
  set: (value) => {
    ensureDataReview().assumptions = value.split('\n').map((item) => item.trim()).filter(Boolean)
  },
})
const reviewDimensionValues = computed(() => recipe.value.dataReview || emptyReview)

function handleReviewDimensionChange(key: ReviewDimensionKey, event: Event) {
  ensureDataReview()[key] = (event.target as HTMLSelectElement).value as RecipeFactReviewStatus
}

function reviewStatusLabel(status: RecipeFactReviewStatus): string {
  return reviewStatusOptions.find((option) => option.value === status)?.label || status
}

// ── 实时数据校验状态 ──────────────────────────────────────────────
const showHealthPanel = ref(false)

// 实时计算数据健康度
const liveValidation = computed(() => validateRecipe(recipe.value))
const healthIconName = computed<AppIconName>(() => {
  if (liveValidation.value.errors.length > 0) return 'error'
  if (liveValidation.value.warnings.length > 0) return 'alert'
  return 'success'
})

// 目标 C: 难度半自动计算属性
const suggestedDifficulty = computed(() => {
  const stepCount = recipe.value.actionBlocks?.length || 0
  return calculateSuggestedDifficulty(stepCount)
})

// 自动侦听工序数量调整时，默认预填建议难度
watch(suggestedDifficulty, (newVal) => {
  if (!recipe.value.difficulty) {
    recipe.value.difficulty = newVal
  }
}, { immediate: true })

// Ingredient Registry Autocomplete 状态
const activeInputIndex = ref<number | null>(null)
const suggestionsMap = ref<Record<number, IngredientEntry[]>>({})

function handleIngredientInput(index: number, val: string) {
  activeInputIndex.value = index
  if (!val || !val.trim()) {
    suggestionsMap.value[index] = []
    return
  }
  suggestionsMap.value[index] = findMatchingIngredients(val)
}

function applyCanonicalName(index: number, canonicalName: string) {
  recipe.value.ingredients[index].name = canonicalName
  suggestionsMap.value[index] = []
  activeInputIndex.value = null
}

function handleAddAlias(index: number, entry: IngredientEntry) {
  const currentName = recipe.value.ingredients[index].name
  if (!currentName || !currentName.trim()) return
  const ok = addAlias(entry.id, currentName)
  if (ok) {
    recipe.value.ingredients[index].name = entry.canonicalName
    toastMessage.value = `已将 "${currentName}" 添加为 "${entry.canonicalName}" 的别名！`
    suggestionsMap.value[index] = []
    activeInputIndex.value = null
  }
}

// 计算碰撞轻量提示
const collisionNotices = computed(() => {
  const layout = buildV3MatrixLayout(recipe.value)
  return layout.collisionNotices || []
})

// ----------------------------------------------------
// 方向 2: 编辑器撤销 (Undo/Redo) 历史记录栈 (上限 20 步)
// ----------------------------------------------------
const MAX_UNDO_STACK_SIZE = 20
const historyStack = ref<string[]>([])
let isUndoing = false // 标识是否正在执行撤销动作，避免触发记录推入

const canUndo = computed(() => historyStack.value.length > 1)
const undoCount = computed(() => Math.max(0, historyStack.value.length - 1))

/**
 * 将当前食谱状态推入撤销快照栈
 */
function pushHistorySnapshot() {
  if (isUndoing) return
  const currentSnapshot = JSON.stringify(recipe.value)
  const lastSnapshot = historyStack.value[historyStack.value.length - 1]

  if (currentSnapshot !== lastSnapshot) {
    historyStack.value.push(currentSnapshot)
    if (historyStack.value.length > MAX_UNDO_STACK_SIZE) {
      historyStack.value.shift() // 保持最多 20 步历史
    }
  }
}

/**
 * 触发撤销回退 (Undo)
 */
function handleUndo() {
  if (!canUndo.value) return

  isUndoing = true
  historyStack.value.pop() // 弹出当前最新快照
  const previousSnapshot = historyStack.value[historyStack.value.length - 1]

  if (previousSnapshot) {
    recipe.value = JSON.parse(previousSnapshot)
    toastMessage.value = `已撤销上一步编辑 (仍可撤销 ${undoCount.value} 步)`
  }

  setTimeout(() => {
    isUndoing = false
  }, 100)
}

// 防抖自动侦听变更：保存草稿并推入 Undo 历史快照
let saveTimer: any = null
watch(
  recipe,
  (newVal) => {
    pushHistorySnapshot()
    if (saveTimer) clearTimeout(saveTimer)
    saveTimer = setTimeout(() => {
      void saveV3Draft(newVal)
    }, 800)
  },
  { deep: true }
)

async function refreshSavedRecipes(): Promise<boolean> {
  try {
    savedRecipes.value = await getV3Recipes()
    cloudStateUnavailable.value = false
    return true
  } catch (error) {
    console.error('[RecipeEditor] 无法重新读取云端食谱列表:', error)
    cloudStateUnavailable.value = true
    return false
  }
}

async function refreshRemoteRecipeAfterConflict(): Promise<boolean> {
  try {
    const remote = await getV3RecipeById(recipe.value.id)
    if (remote) {
      savedRecipes.value = [remote, ...savedRecipes.value.filter(item => item.id !== remote.id)]
      return true
    }
    return false
  } catch (error) {
    console.error('[RecipeEditor] 保存冲突后的云端版本读取失败:', error)
    return false
  }
}

onMounted(async () => {
  const listLoaded = await refreshSavedRecipes()

  // 校验 URL 中的 route.params.id 或 route.query.id
  const targetId = (route.params.id as string) || (route.query.id as string)
  
  let loadedExistingRecipe = false
  if (targetId) {
    // 【编辑模式】：精确根据指定 ID 载入食谱
    let found = savedRecipes.value.find(r => r.id === targetId)
    if (!found && !listLoaded) {
      try {
        found = await getV3RecipeById(targetId) || undefined
      } catch (error) {
        console.error('[RecipeEditor] 无法读取待编辑的云端食谱:', error)
      }
    }
    if (found) {
      recipe.value = JSON.parse(JSON.stringify(found))
      toastMessage.value = `已加载食谱进行编辑: "${recipe.value.title}"`
      loadedExistingRecipe = true
    } else if (!listLoaded) {
      toastMessage.value = '暂时无法确认云端食谱状态，未载入编辑内容，请稍后刷新。'
    }
  }

  // 【新建模式】(/admin/create)：只有草稿属于新建的未命名食谱时才恢复，否则强制使用干净的全新空白表单
  const isCreateRoute = route.path.includes('/admin/create') || !targetId
  if (isCreateRoute && !loadedExistingRecipe) {
    const draft = await getV3Draft()
    // 如果草稿是一道已经命名并保存过的旧食谱(如宫保鸡丁)，在“新建食谱”页面忽略它，使用全新的空白表单
    if (draft && (!draft.id || draft.id.startsWith('v3-recipe-') || draft.status === 'draft') && draft.title === '未命名食谱') {
      recipe.value = draft
      toastMessage.value = '已自动恢复上一次未完成的新建草稿'
    } else {
      // 否则强制重置为全新的空白食谱，避免“新建”误跳到过去的已有食谱
      recipe.value = createDefaultBlankRecipe()
    }
  }

  // 记录初始版本快照
  pushHistorySnapshot()

  // 绑定 Cmd+Z / Ctrl+Z 快捷键
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  if (saveTimer) clearTimeout(saveTimer)
})

function handleKeydown(e: KeyboardEvent) {
  const isCmdOrCtrl = e.metaKey || e.ctrlKey
  if (isCmdOrCtrl && e.key.toLowerCase() === 'z' && !e.shiftKey) {
    e.preventDefault()
    handleUndo()
  }
}

// 食材物理排序
function moveIngredient(index: number, delta: number) {
  const targetIndex = index + delta
  if (targetIndex < 0 || targetIndex >= recipe.value.ingredients.length) return
  const temp = recipe.value.ingredients[index]
  recipe.value.ingredients[index] = recipe.value.ingredients[targetIndex]
  recipe.value.ingredients[targetIndex] = temp
}

function handleAddIngredient() {
  const newId = `i_${Date.now()}`
  recipe.value.ingredients.push({
    id: newId,
    name: '',
    amountText: '',
    category: 'main'
  })
}

function removeIngredient(index: number) {
  const removed = recipe.value.ingredients[index]
  recipe.value.ingredients.splice(index, 1)

  // 清除工序中对其的勾选引用
  recipe.value.actionBlocks.forEach(block => {
    block.ingredientIds = block.ingredientIds.filter(id => id !== removed.id)
  })
}

// 常用标准烹饪技法动词预设 (用于一键设定，保持命名纯正)
const quickSkills = computed<CookingSkillDefinition[]>(() => [
  STANDARD_COOKING_SKILLS.marinate,
  STANDARD_COOKING_SKILLS.sear,
  STANDARD_COOKING_SKILLS.stir_fry,
  STANDARD_COOKING_SKILLS.saute,
  STANDARD_COOKING_SKILLS.simmer,
  STANDARD_COOKING_SKILLS.boil,
  STANDARD_COOKING_SKILLS.steam,
  STANDARD_COOKING_SKILLS.combine,
  STANDARD_COOKING_SKILLS.mix,
  STANDARD_COOKING_SKILLS.fold_in,
  STANDARD_COOKING_SKILLS.melt,
  STANDARD_COOKING_SKILLS.bake,
])

function selectSkillPreset(block: V3ActionBlock, skill: CookingSkillDefinition) {
  block.action = skill.code
  block.label = skill.zhLabel
  block.sublabel = skill.enLabel
}

function handleAutoSortIngredients() {
  recipe.value.ingredients = autoSortIngredientsByFlow(recipe.value.ingredients, recipe.value.actionBlocks)
  toastMessage.value = '已按烹饪工序进入时序自动优化食材顺序！矩阵图将呈现严密咬合的阶梯。'
}

// 工序逻辑
function handleAddActionBlock() {
  const newId = `b_${Date.now()}`
  const previousBlock = recipe.value.actionBlocks[recipe.value.actionBlocks.length - 1]
  recipe.value.actionBlocks.push({
    id: newId,
    stageIndex: previousBlock ? previousBlock.stageIndex + 1 : 0,
    ingredientIds: [],
    dependencies: previousBlock ? [{ sourceBlockId: previousBlock.id, type: 'material' }] : [],
    inputBlockIds: previousBlock ? [previousBlock.id] : [],
    action: 'mix',
    label: '混合',
    sublabel: 'mix',
    outputItem: '',
    completionState: ''
  })
}

function isUpstreamSelected(block: V3ActionBlock, upstreamId: string): boolean {
  if (block.dependencies && block.dependencies.some(d => d.sourceBlockId === upstreamId)) {
    return true
  }
  if (block.inputBlockIds && block.inputBlockIds.includes(upstreamId)) {
    return true
  }
  if (block.afterBlockIds && block.afterBlockIds.includes(upstreamId)) {
    return true
  }
  return false
}

function getUpstreamDependencyType(block: V3ActionBlock, upstreamId: string): 'material' | 'order' {
  const dep = block.dependencies?.find(d => d.sourceBlockId === upstreamId)
  if (dep) {
    return dep.type === 'order' ? 'order' : 'material'
  }
  if (block.afterBlockIds && block.afterBlockIds.includes(upstreamId)) {
    return 'order'
  }
  return 'material'
}

function toggleUpstreamDependency(block: V3ActionBlock, upstreamId: string, checked: boolean) {
  if (!block.dependencies) block.dependencies = []
  if (!block.inputBlockIds) block.inputBlockIds = []
  if (!block.afterBlockIds) block.afterBlockIds = []

  if (checked) {
    if (!block.dependencies.some(d => d.sourceBlockId === upstreamId)) {
      block.dependencies.push({ sourceBlockId: upstreamId, type: 'material' })
    }
    if (!block.inputBlockIds.includes(upstreamId)) {
      block.inputBlockIds.push(upstreamId)
    }
    block.afterBlockIds = block.afterBlockIds.filter(id => id !== upstreamId)
  } else {
    block.dependencies = block.dependencies.filter(d => d.sourceBlockId !== upstreamId)
    block.inputBlockIds = block.inputBlockIds.filter(id => id !== upstreamId)
    block.afterBlockIds = block.afterBlockIds.filter(id => id !== upstreamId)
  }
  syncBlockStageFromDependencies(block)
}

function setUpstreamDependencyType(block: V3ActionBlock, upstreamId: string, type: 'material' | 'order') {
  if (!block.dependencies) block.dependencies = []
  if (!block.inputBlockIds) block.inputBlockIds = []
  if (!block.afterBlockIds) block.afterBlockIds = []

  let dep = block.dependencies.find(d => d.sourceBlockId === upstreamId)
  if (!dep) {
    dep = { sourceBlockId: upstreamId, type }
    block.dependencies.push(dep)
  } else {
    dep.type = type
  }

  if (type === 'material') {
    if (!block.inputBlockIds.includes(upstreamId)) {
      block.inputBlockIds.push(upstreamId)
    }
    block.afterBlockIds = block.afterBlockIds.filter(id => id !== upstreamId)
  } else {
    if (!block.afterBlockIds.includes(upstreamId)) {
      block.afterBlockIds.push(upstreamId)
    }
    block.inputBlockIds = block.inputBlockIds.filter(id => id !== upstreamId)
  }
}

function getUpstreamBlockIds(block: V3ActionBlock): string[] {
  const set = new Set<string>()
  for (const d of block.dependencies || []) {
    if (d?.sourceBlockId) set.add(d.sourceBlockId)
  }
  for (const id of block.inputBlockIds || []) {
    if (id) set.add(id)
  }
  for (const id of block.afterBlockIds || []) {
    if (id) set.add(id)
  }
  return [...set]
}

function removeActionBlock(index: number) {
  const [removed] = recipe.value.actionBlocks.splice(index, 1)
  if (!removed) return
  recipe.value.actionBlocks.forEach(block => {
    block.inputBlockIds = (block.inputBlockIds || []).filter(id => id !== removed.id)
    block.afterBlockIds = (block.afterBlockIds || []).filter(id => id !== removed.id)
    if (block.dependencies) {
      block.dependencies = block.dependencies.filter(d => d.sourceBlockId !== removed.id)
    }
  })
  normalizeDependentStages()
}

function changeBlockStage(block: V3ActionBlock, delta: number) {
  const dependencyStages = getUpstreamBlockIds(block)
    .map(id => recipe.value.actionBlocks.find(item => item.id === id)?.stageIndex)
    .filter((stage): stage is number => stage !== undefined)
  const minimumStage = dependencyStages.length > 0 ? Math.max(...dependencyStages) + 1 : 0
  block.stageIndex = Math.max(minimumStage, block.stageIndex + delta)
  normalizeDependentStages()
}

function syncBlockStageFromDependencies(block: V3ActionBlock) {
  const dependencyStages = getUpstreamBlockIds(block)
    .map(id => recipe.value.actionBlocks.find(item => item.id === id)?.stageIndex)
    .filter((stage): stage is number => stage !== undefined)
  if (dependencyStages.length > 0) {
    block.stageIndex = Math.max(block.stageIndex, Math.max(...dependencyStages) + 1)
  }
  normalizeDependentStages()
}

function normalizeDependentStages() {
  // 编辑器只允许选择列表中更早的工序，因此按顺序单次传播即可保证下游阶段合法。
  recipe.value.actionBlocks.forEach(current => {
    const dependencyStages = getUpstreamBlockIds(current)
      .map(id => recipe.value.actionBlocks.find(item => item.id === id)?.stageIndex)
      .filter((stage): stage is number => stage !== undefined)
    if (dependencyStages.length > 0) {
      current.stageIndex = Math.max(current.stageIndex, Math.max(...dependencyStages) + 1)
    }
  })
}

function toggleFinalBlock(e: Event) {
  const checked = (e.target as HTMLInputElement).checked
  if (checked) {
    recipe.value.finalBlock = {
      method: 'serve',
      role: 'outcome',
      label: '完成'
    }
  } else {
    recipe.value.finalBlock = undefined
  }
}

function setFinalBlockRole(role: 'operation' | 'outcome') {
  const finalBlock = recipe.value.finalBlock
  if (!finalBlock) return

  finalBlock.role = role
  if (role === 'outcome') {
    finalBlock.label = '完成'
    finalBlock.temperatureC = undefined
    finalBlock.temperatureF = undefined
    finalBlock.durationMinMinutes = undefined
    finalBlock.durationMaxMinutes = undefined
    finalBlock.durationText = undefined
    finalBlock.instructions = undefined
    if (!finalBlock.method) finalBlock.method = 'serve'
  } else if (finalBlock.label === '完成') {
    finalBlock.method = 'bake'
    finalBlock.label = '烘焙'
  }
}

// 载入已有食谱或范例
async function handleLoadSavedRecipe(e: Event) {
  const val = (e.target as HTMLSelectElement).value
  if (!val) return

  await clearV3Draft()

  if (val === 'preset-brownies') {
    recipe.value = JSON.parse(JSON.stringify(espressoBrowniesV3))
  } else if (val === 'preset-hongshaorou') {
    recipe.value = JSON.parse(JSON.stringify(hongShaoRouV3))
  } else if (val === 'preset-salad') {
    recipe.value = JSON.parse(JSON.stringify(caesarSaladV3))
  } else if (val.startsWith('saved-')) {
    const id = val.replace('saved-', '')
    const found = savedRecipes.value.find(r => r.id === id)
    if (found) {
      recipe.value = JSON.parse(JSON.stringify(found))
    }
  }

  toastMessage.value = `已成功载入食谱: "${recipe.value.title}"`
}

// 保存逻辑
async function handleSaveDraft() {
  if (cloudStateUnavailable.value) {
    toastMessage.value = '云端状态尚未确认，已暂停保存；请刷新并重新连接后再试。'
    return
  }
  const previousStatus = recipe.value.status
  recipe.value.status = 'draft'
  const result = await saveV3Recipe(recipe.value)
  if (result.ok) {
    if (result.contentVersion !== undefined) recipe.value.contentVersion = result.contentVersion
    const listConfirmed = await refreshSavedRecipes()
    const score = result.validation.completenessScore
    toastMessage.value = listConfirmed
      ? '草稿已保存（完整度 ' + score + '%）'
      : '草稿已由云端确认保存；列表暂时无法重新读取，请稍后刷新。'
    if (result.validation.warnings.length > 0) {
      showHealthPanel.value = true
    }
  } else {
    recipe.value.status = previousStatus
    showHealthPanel.value = true
    if (result.syncStatus === 'conflict') {
      const remoteConfirmed = await refreshRemoteRecipeAfterConflict()
      toastMessage.value = remoteConfirmed
        ? '保存冲突：已重新读取最新云端版本；当前编辑内容未覆盖远端，请重新确认。'
        : '保存冲突：远端内容未被覆盖，但暂时无法重新读取最新版本。'
    } else if (result.syncStatus === 'unknown') {
      await refreshSavedRecipes()
      toastMessage.value = `保存结果暂时无法确认：${result.message || '请保留当前编辑内容并稍后重试。'}`
    } else {
      toastMessage.value = `保存失败：${result.message || '请检查数据健康面板或云端连接'}`
    }
  }
}

async function handleSaveComplete() {
  if (cloudStateUnavailable.value) {
    toastMessage.value = '云端状态尚未确认，已暂停发布；请刷新并重新连接后再试。'
    return
  }
  const previousStatus = recipe.value.status
  recipe.value.status = 'published'
  const result = await saveV3Recipe(recipe.value)

  if (!result.ok) {
    recipe.value.status = previousStatus
    showHealthPanel.value = true
    if (result.syncStatus === 'conflict') {
      const remoteConfirmed = await refreshRemoteRecipeAfterConflict()
      toastMessage.value = remoteConfirmed
        ? '发布冲突：已重新读取最新云端版本；当前编辑内容未覆盖远端。'
        : '发布冲突：远端内容未被覆盖，但暂时无法重新读取最新版本。'
    } else if (result.syncStatus === 'unknown') {
      await refreshSavedRecipes()
      toastMessage.value = `发布结果暂时无法确认：${result.message || '请保留当前编辑内容并稍后重试。'}`
    } else {
      toastMessage.value = result.validation.errors.length > 0
        ? '发布失败：存在 ' + result.validation.errors.length + ' 个必须修复的问题，请查看下方数据健康面板'
        : `发布失败：${result.message || '云端没有确认保存'}`
    }
    return
  }

  if (result.contentVersion !== undefined) recipe.value.contentVersion = result.contentVersion
  const listConfirmed = await refreshSavedRecipes()
  toastMessage.value = listConfirmed
    ? '食谱「' + recipe.value.title + '」已成功发布！'
    : '食谱已由云端确认发布；列表暂时无法重新读取，请稍后刷新。'
  showSaveModal.value = true
}
</script>
