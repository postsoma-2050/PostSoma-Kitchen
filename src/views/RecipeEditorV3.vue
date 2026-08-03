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
            <span class="text-xs text-stone-500">
              发布状态: <strong class="text-emerald-700">{{ recipe.status === 'published' ? '🟢 已发布 (访客可见)' : '🟡 草稿箱 (内部可见)' }}</strong>
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
          <router-link
            to="/admin"
            class="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 rounded-md text-xs font-bold transition-colors inline-flex items-center gap-1 cursor-pointer"
          >
            <span>⚙️</span>
            <span>Admin 管理台</span>
          </router-link>

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
            <optgroup v-if="savedRecipes.length > 0" label="本地食谱库">
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
            <span>↩️</span>
            <span>撤销</span>
            <span v-if="undoCount > 0" class="text-[10px] text-stone-400 font-mono">({{ undoCount }})</span>
          </button>

          <button
            @click="handleSaveDraft"
            type="button"
            class="px-3.5 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-md text-xs font-semibold transition-colors"
          >
            存为草稿
          </button>

          <button
            @click="handleSaveComplete"
            type="button"
            class="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-md text-xs font-semibold shadow-sm transition-colors"
          >
            发布食谱
          </button>
        </div>
      </div>

      <!-- 保存或提示 Toast 区域 -->
      <div
        v-if="toastMessage"
        :class="[
          'px-4 py-2 rounded-lg text-xs font-medium flex items-center justify-between',
          toastMessage.startsWith('❌') ? 'bg-red-50 border border-red-300 text-red-800' : 'bg-emerald-50 border border-emerald-300 text-emerald-800'
        ]"
      >
        <span>{{ toastMessage }}</span>
        <button @click="toastMessage = ''" class="font-bold ml-2">✕</button>
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
            <span>{{ liveValidation.errors.length > 0 ? '❌' : liveValidation.warnings.length > 0 ? '⚠️' : '✅' }}</span>
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
          <span class="text-stone-400">{{ showHealthPanel ? '▲' : '▼' }}</span>
        </button>

        <!-- 展开内容：分 error / warning 两栏 -->
        <div v-if="showHealthPanel" class="px-5 pb-4 pt-2 space-y-3 border-t border-stone-100">
          <!-- 错误项（发布阻断）-->
          <div v-if="liveValidation.errors.length > 0" class="space-y-1.5">
            <p class="text-[11px] font-bold text-red-700 uppercase tracking-wide">⛔ 发布阻断项（必须修复）</p>
            <div
              v-for="issue in liveValidation.errors"
              :key="issue.code"
              class="flex items-start gap-2 bg-red-50 border border-red-100 rounded-lg px-3 py-2 text-xs text-red-800"
            >
              <span class="mt-0.5 shrink-0">🔴</span>
              <div>
                <span class="font-bold">[{{ issue.field }}]</span>
                {{ issue.message }}
              </div>
            </div>
          </div>

          <!-- 警告项（建议修复）-->
          <div v-if="liveValidation.warnings.length > 0" class="space-y-1.5">
            <p class="text-[11px] font-bold text-amber-700 uppercase tracking-wide">⚠️ 建议改善项（不阻断草稿保存）</p>
            <div
              v-for="issue in liveValidation.warnings"
              :key="issue.code"
              class="flex items-start gap-2 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 text-xs text-amber-800"
            >
              <span class="mt-0.5 shrink-0">🟡</span>
              <div>
                <span class="font-bold">[{{ issue.field }}]</span>
                {{ issue.message }}
              </div>
            </div>
          </div>

          <div v-if="liveValidation.issues.length === 0" class="text-xs text-emerald-700 font-medium py-1">
            ✅ 所有校验项均通过，数据结构完整可发布！
          </div>
        </div>
      </div>

      <!-- 碰撞平移轻量提示 -->
      <div v-if="collisionNotices.length > 0" class="bg-amber-50 border border-amber-300 text-amber-900 px-4 py-2 rounded-lg text-xs space-y-1">
        <div class="font-bold flex items-center gap-1">
          <span>⚠️</span>
          <span>布局提示：为避免工序重叠，系统已自动平移以下工序至下一阶段：</span>
        </div>
        <ul class="list-disc list-inside text-amber-800 pl-2">
          <li v-for="n in collisionNotices" :key="n.blockId">
            工序「{{ n.blockLabel }}」已从第 {{ n.originalStage + 1 }} 阶段平移至第 {{ n.adjustedStage + 1 }} 阶段
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
              <span>📋</span>
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
                <label class="block font-semibold text-stone-700 mb-1">🌐 菜系风味 (Cuisine Style)</label>
                <select
                  v-model="recipe.cuisine"
                  class="w-full p-2 bg-stone-50 border border-stone-300 rounded font-medium focus:border-emerald-600 focus:outline-none"
                >
                  <option v-for="c in CUISINE_STYLES" :key="c.code" :value="c.code">
                    {{ c.icon }} {{ c.label }} ({{ c.labelEn }})
                  </option>
                </select>
              </div>

              <!-- 难度等级下拉选择 (含半自动建议) -->
              <div>
                <div class="flex items-center justify-between mb-1">
                  <label class="font-semibold text-stone-700">🎯 烹饪难度 (Difficulty)</label>
                  <span class="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                    建议: {{ getDifficultyOption(suggestedDifficulty).label }}
                  </span>
                </div>
                <select
                  v-model="recipe.difficulty"
                  class="w-full p-2 bg-stone-50 border border-stone-300 rounded font-medium focus:border-emerald-600 focus:outline-none"
                >
                  <option v-for="d in DIFFICULTIES" :key="d.code" :value="d.code">
                    {{ d.icon }} {{ d.label }} ({{ d.labelEn }})
                  </option>
                </select>
              </div>
            </div>
          </div>

          <!-- 2. 食材行物理顺序管理 (Ingredients) -->
          <div class="bg-white p-5 rounded-xl border border-stone-200 shadow-sm space-y-4">
            <div class="flex items-center justify-between border-b border-stone-100 pb-2">
              <h3 class="text-sm font-bold text-stone-800 flex items-center gap-2">
                <span>🥕</span>
                <span>2. 食材列表 (物理顺序即流程图行顺序)</span>
              </h3>
              <button
                @click="handleAddIngredient"
                type="button"
                class="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded text-xs font-semibold transition-colors"
              >
                + 新增食材
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
                    ▲
                  </button>
                  <button
                    @click="moveIngredient(index, 1)"
                    :disabled="index === recipe.ingredients.length - 1"
                    type="button"
                    class="px-1.5 py-0.5 text-stone-500 hover:text-stone-800 disabled:opacity-30 disabled:hover:text-stone-500 text-xs font-bold"
                    title="下移"
                  >
                    ▼
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
                  {{ ing.category === 'seasoning' ? '🧂 调料' : '🥩 主料' }}
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
                          <span>🌿 {{ sugg.canonicalName }}</span>
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
                        + 存为别名
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
                  ✕
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
                <span>⚙️</span>
                <span>3. 工序节点 (关联食材与阶段)</span>
              </h3>
              <button
                @click="handleAddActionBlock"
                type="button"
                class="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded text-xs font-semibold transition-colors"
              >
                + 新增工序
              </button>
            </div>

            <div class="space-y-4">
              <div
                v-for="(block, bIndex) in recipe.actionBlocks"
                :key="block.id"
                class="p-3 bg-stone-50 rounded-lg border border-stone-200 space-y-3"
              >
                <!-- 头部：名称、阶段控制与删除 -->
                <div class="flex items-center justify-between gap-2 border-b border-stone-200 pb-2">
                  <div class="flex items-center gap-2">
                    <span class="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                      第 {{ block.stageIndex + 1 }} 阶段
                    </span>
                    <input
                      v-model="block.label"
                      placeholder="工序名称 (如: 融化)"
                      class="text-xs font-bold text-stone-900 border-b border-stone-300 focus:border-emerald-600 focus:outline-none bg-transparent"
                    />
                    <input
                      v-model="block.sublabel"
                      placeholder="英文 (如: melt)"
                      class="text-xs text-stone-500 border-b border-stone-300 focus:border-emerald-600 focus:outline-none bg-transparent w-20"
                    />
                  </div>

                  <div class="flex items-center gap-1">
                    <button
                      @click="changeBlockStage(block, -1)"
                      :disabled="block.stageIndex <= 0"
                      type="button"
                      class="px-2 py-0.5 bg-stone-200 hover:bg-stone-300 disabled:opacity-40 rounded text-xs font-medium"
                    >
                      ◀ 移至上一阶段
                    </button>
                    <button
                      @click="changeBlockStage(block, 1)"
                      type="button"
                      class="px-2 py-0.5 bg-stone-200 hover:bg-stone-300 rounded text-xs font-medium"
                    >
                      移至下一阶段 ▶
                    </button>
                    <button
                      @click="removeActionBlock(bIndex)"
                      type="button"
                      class="text-red-500 hover:text-red-700 text-xs font-bold ml-2"
                    >
                      ✕
                    </button>
                  </div>
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
                </div>
              </div>

              <div v-if="recipe.actionBlocks.length === 0" class="text-xs text-stone-400 text-center py-4 border border-dashed border-stone-300 rounded-lg">
                暂无工序，点击右上方“+ 新增工序”添加
              </div>
            </div>
          </div>

          <!-- 4. 最终完成栏 (Final Cooking Outcome) -->
          <div class="bg-white p-5 rounded-xl border border-stone-200 shadow-sm space-y-4">
            <div class="flex items-center justify-between border-b border-stone-100 pb-2">
              <h3 class="text-sm font-bold text-stone-800 flex items-center gap-2">
                <span>🔥</span>
                <span>4. 最终烹饪与完成方式</span>
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
                <label class="block text-xs font-medium text-stone-600 mb-1">说明与操作指南</label>
                <textarea
                  v-model="recipe.finalBlock.instructions"
                  rows="2"
                  placeholder="如: 倒入抹油防沾的 8x8 寸方模中，烘焙至表面结壳。"
                  class="w-full text-xs p-2 border border-stone-300 rounded focus:border-emerald-600 focus:outline-none"
                ></textarea>
              </div>
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
                <span>👁️</span>
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
    >
      <div class="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4 border border-stone-200 animate-in fade-in zoom-in duration-200">
        <div class="flex items-center gap-3 text-emerald-800 border-b border-stone-100 pb-3">
          <span class="text-3xl">🎉</span>
          <div>
            <h3 class="text-base font-bold text-stone-900">完整食谱已成功保存！</h3>
            <p class="text-xs text-stone-500 mt-0.5">已写入本地食谱库 (what-to-eat-v3-recipes)</p>
          </div>
        </div>

        <p class="text-xs text-stone-600 leading-relaxed">
          你创建的 Visual Recipe Flow Card 已准备就绪。你可以选择直接大图预览、前往我的食谱库查看管理，或留在当前页面继续调整。
        </p>

        <div class="flex flex-col sm:flex-row gap-2 pt-2">
          <router-link
            :to="`/recipe/${recipe.id}`"
            class="flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-center rounded-lg text-xs font-bold shadow-sm transition-colors cursor-pointer"
          >
            查看食谱详情
          </router-link>

          <router-link
            to="/"
            class="flex-1 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-center rounded-lg text-xs font-semibold border border-stone-300 transition-colors cursor-pointer"
          >
            返回食谱库
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import type { VisualRecipeV3, V3ActionBlock } from '@/types/recipeV3'
import {
  CUISINE_STYLES,
  DIFFICULTIES,
  getDifficultyOption,
  calculateSuggestedDifficulty
} from '@/constants/taxonomy'
import { validateRecipe } from '@/utils/taxonomyMatcher'
import { espressoBrowniesV3, hongShaoRouV3, caesarSaladV3 } from '@/data/v3Examples'
import { buildV3MatrixLayout } from '@/utils/matrixFlowLayout'
import { saveV3Recipe, getV3Recipes, getV3Draft, saveV3Draft, clearV3Draft } from '@/services/v3RecipeStore'
import { findMatchingIngredients, addAlias } from '@/services/ingredientRegistryStore'
import type { IngredientEntry } from '@/types/ingredientRegistry'
import RecipeFlowWorkspaceV3 from '@/components/recipe-flow-v3/RecipeFlowWorkspaceV3.vue'

const route = useRoute()
const showSaveModal = ref(false)

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
      { id: 'b0', stageIndex: 0, ingredientIds: ['i0'], action: 'melt', label: '融化', sublabel: 'melt' }
    ],
    finalBlock: {
      method: 'bake',
      label: '烘焙 bake',
      temperatureC: 170,
      durationText: '30 min'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
}

const recipe = ref<VisualRecipeV3>(createDefaultBlankRecipe())
const savedRecipes = ref<VisualRecipeV3[]>([])
const toastMessage = ref('')

// ── 实时数据校验状态 ──────────────────────────────────────────────
const showHealthPanel = ref(false)

// 实时计算数据健康度
const liveValidation = computed(() => validateRecipe(recipe.value))

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
    toastMessage.value = `↩️ 已撤销上一步编辑 (仍可撤销 ${undoCount.value} 步)`
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
      saveV3Draft(newVal)
    }, 800)
  },
  { deep: true }
)

onMounted(() => {
  savedRecipes.value = getV3Recipes()
  
  // 校验 URL 中的 route.params.id 或 route.query.id
  const targetId = (route.params.id as string) || (route.query.id as string)
  
  if (targetId) {
    // 【编辑模式】：精确根据指定 ID 载入食谱
    const found = savedRecipes.value.find(r => r.id === targetId)
    if (found) {
      recipe.value = JSON.parse(JSON.stringify(found))
      toastMessage.value = `已加载食谱进行编辑: "${recipe.value.title}"`
      return
    }
  }

  // 【新建模式】(/admin/create)：只有草稿属于新建的未命名食谱时才恢复，否则强制使用干净的全新空白表单
  const isCreateRoute = route.path.includes('/admin/create') || !targetId
  if (isCreateRoute) {
    const draft = getV3Draft()
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

// 工序逻辑
function handleAddActionBlock() {
  const newId = `b_${Date.now()}`
  recipe.value.actionBlocks.push({
    id: newId,
    stageIndex: 0,
    ingredientIds: [],
    action: 'mix',
    label: '混合',
    sublabel: 'mix'
  })
}

function removeActionBlock(index: number) {
  recipe.value.actionBlocks.splice(index, 1)
}

function changeBlockStage(block: V3ActionBlock, delta: number) {
  block.stageIndex = Math.max(0, block.stageIndex + delta)
}

function toggleFinalBlock(e: Event) {
  const checked = (e.target as HTMLInputElement).checked
  if (checked) {
    recipe.value.finalBlock = {
      method: 'bake',
      label: '烘焙 bake',
      temperatureC: 170
    }
  } else {
    recipe.value.finalBlock = undefined
  }
}

// 载入已有食谱或范例
function handleLoadSavedRecipe(e: Event) {
  const val = (e.target as HTMLSelectElement).value
  if (!val) return

  clearV3Draft()

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
function handleSaveDraft() {
  recipe.value.status = 'draft'
  const result = saveV3Recipe(recipe.value)
  if (result.ok) {
    savedRecipes.value = getV3Recipes()
    const score = result.validation.completenessScore
    toastMessage.value = '✅ 草稿已保存（完整度 ' + score + '%）'
    if (result.validation.warnings.length > 0) {
      showHealthPanel.value = true
    }
  } else {
    showHealthPanel.value = true
    toastMessage.value = '❌ 保存失败，请先解决数据健康面板中的阻断问题'
  }
}

function handleSaveComplete() {
  recipe.value.status = 'published'
  const result = saveV3Recipe(recipe.value)

  if (!result.ok) {
    showHealthPanel.value = true
    toastMessage.value = '❌ 发布失败：存在 ' + result.validation.errors.length + ' 个必须修复的问题，请查看下方数据健康面板'
    return
  }

  savedRecipes.value = getV3Recipes()
  toastMessage.value = '🎉 食谱「' + recipe.value.title + '」已成功发布！'
  showSaveModal.value = true
}
</script>
