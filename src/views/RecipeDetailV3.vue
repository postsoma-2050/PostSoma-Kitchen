<template>
  <div class="min-h-screen bg-[#FAF8F5] text-stone-800 p-4 md:p-8 font-sans">
    <div class="max-w-6xl mx-auto space-y-6">
      
      <!-- 1. 顶栏返回导航与消费型动作栏 -->
      <div class="flex items-center justify-between gap-4 no-print">
        <router-link
          to="/"
          class="px-4 py-2 bg-white hover:bg-stone-100 text-stone-700 border border-stone-200/80 rounded-xl text-xs font-bold transition-all shadow-sm inline-flex items-center gap-1.5 cursor-pointer"
        >
          <span>←</span>
          <span>返回食谱库</span>
        </router-link>

        <!-- 右侧消费型动作组 (分享 / 复制链接) -->
        <div v-if="recipe" class="flex items-center gap-2">
          <button
            @click="handleShare"
            type="button"
            class="px-4 py-2 bg-white hover:bg-stone-100 text-stone-700 border border-stone-200/80 rounded-xl text-xs font-bold transition-all shadow-sm inline-flex items-center gap-1.5 cursor-pointer"
          >
            <span>🔗</span>
            <span>{{ copySuccess ? '已复制食谱链接！' : '分享食谱' }}</span>
          </button>
        </div>
      </div>

      <!-- 2. 食谱未找到 404 状态 -->
      <div v-if="notFound" class="bg-white rounded-3xl border border-stone-200/80 p-12 text-center space-y-4 shadow-sm">
        <div class="text-4xl">🔍</div>
        <div class="text-base font-bold text-stone-800">未找到指定的食谱</div>
        <p class="text-xs text-stone-400">该食谱可能已被移除，或使用了无效的链接参数。</p>
        <router-link
          to="/"
          class="inline-block px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors"
        >
          返回食谱库
        </router-link>
      </div>

      <!-- 3. Publish 食谱详情主内容区 -->
      <div v-else-if="recipe" class="space-y-6">
        
        <!-- 3.1 封面图片 Hero 头部与料理基本信息 -->
        <div class="bg-white rounded-3xl border border-stone-200/80 shadow-sm overflow-hidden">
          <div class="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden bg-stone-100">
            <img
              v-if="recipe.coverImageUrl && !imgError"
              :src="recipe.coverImageUrl"
              :alt="recipe.title"
              @error="imgError = true"
              class="w-full h-full object-cover"
            />
            <!-- 艺术渐变 Hero 降级方案 -->
            <div
              v-else
              :class="[
                'w-full h-full flex flex-col items-center justify-center p-6 text-center select-none',
                getHeroBg(recipe.finalBlock?.method)
              ]"
            >
              <span class="text-6xl md:text-7xl mb-2 drop-shadow-md">{{ getMethodIcon(recipe.finalBlock?.method) }}</span>
              <span class="text-sm font-bold text-white/90 tracking-widest uppercase">{{ getMethodLabel(recipe.finalBlock?.method) }}</span>
            </div>

            <!-- 浮动遮罩 Hero 信息层 -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 md:p-8 text-white space-y-3">
              <!-- 元信息标签阶梯 -->
              <div class="flex flex-wrap items-center gap-2 text-xs font-bold select-none">
                <span class="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full border border-white/30 flex items-center gap-1">
                  <span>{{ getMethodIcon(recipe.finalBlock?.method) }}</span>
                  <span>{{ getMethodLabel(recipe.finalBlock?.method) }}</span>
                </span>

                <span class="px-3 py-1 bg-black/50 backdrop-blur-md rounded-full border border-white/20 flex items-center gap-1">
                  <span>⏱️</span>
                  <span>{{ estimatedTimeText }}</span>
                </span>

                <span v-if="recipe.prerequisites?.servings" class="px-3 py-1 bg-black/50 backdrop-blur-md rounded-full border border-white/20 flex items-center gap-1">
                  <span>🍽️</span>
                  <span>基准 {{ recipe.prerequisites.servings }}</span>
                </span>

                <span v-if="recipe.difficulty" class="px-3 py-1 bg-black/50 backdrop-blur-md rounded-full border border-white/20">
                  {{ getDifficultyLabel(recipe.difficulty) }}
                </span>
              </div>

              <!-- 核心大标题 -->
              <h1 class="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight drop-shadow-sm leading-tight">
                {{ recipe.title }}
              </h1>
            </div>
          </div>

          <!-- 食谱简介描述 -->
          <div v-if="recipe.description" class="p-6 md:p-8 bg-white border-t border-stone-100 text-stone-600 text-sm leading-relaxed">
            <p>{{ recipe.description }}</p>
          </div>
        </div>

        <!-- 3.2 开火前备料区：食材清单与 Sub-Recipe 复合调料总览 (支持动态份量换算) -->
        <div class="bg-white rounded-3xl border border-stone-200/80 p-6 md:p-8 shadow-sm space-y-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
            <div class="flex items-center gap-2">
              <span class="text-xl">🧺</span>
              <div>
                <h2 class="text-lg font-black text-stone-900 tracking-tight">开火前备料与配方总览</h2>
                <p class="text-xs text-stone-500">点击复合配方可查看完整调配比例与调制顺序</p>
              </div>
            </div>

            <!-- 动态份量换算器 (全盘换算普通食材与 Sub-Recipes) -->
            <div class="flex items-center gap-1.5 bg-stone-100 p-1 rounded-xl border border-stone-200 shrink-0 text-xs font-bold">
              <span class="text-stone-500 text-[11px] px-1 font-medium">份数:</span>
              <button
                v-for="s in [1, 2, 4, 6]"
                :key="s"
                @click="currentServings = s"
                type="button"
                :class="[
                  'px-2.5 py-1 rounded-lg transition-all cursor-pointer',
                  currentServings === s ? 'bg-emerald-700 text-white shadow-sm' : 'text-stone-700 hover:bg-stone-200'
                ]"
              >
                {{ s }}人份
              </button>
            </div>
          </div>

          <!-- 3.2.1 复合调料与秘制酱汁 Sub-Recipe Formulas 专栏 -->
          <div v-if="recipeFormulas.length > 0" class="space-y-3">
            <div class="text-xs font-bold text-amber-900 flex items-center justify-between">
              <span class="flex items-center gap-1">
                <span>🥣</span>
                <span>复合调料与秘制酱汁 (Sub-Recipes & Formulas)</span>
              </span>
              <span class="text-amber-700 font-normal">点击以下卡片弹窗查看精确定量与调制步骤</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                v-for="formula in recipeFormulas"
                :key="formula.id"
                @click="activeFormula = formula"
                class="p-4 bg-gradient-to-br from-amber-50 to-orange-50/40 border border-amber-200/80 rounded-2xl hover:shadow-md hover:border-amber-300 transition-all cursor-pointer flex flex-col justify-between group space-y-2"
              >
                <div class="flex items-start justify-between gap-2">
                  <div>
                    <span class="text-[10px] font-bold text-amber-800 bg-amber-200/60 px-2 py-0.5 rounded-full inline-block mb-1">
                      {{ getFormulaCategoryLabel(formula.category) }}
                    </span>
                    <h3 class="text-sm font-black text-stone-900 group-hover:text-amber-900 transition-colors">
                      {{ formula.name }}
                    </h3>
                  </div>
                  <span class="text-xs text-amber-700 group-hover:translate-x-0.5 transition-transform font-bold">
                    查看配比 →
                  </span>
                </div>

                <div class="text-[11px] text-stone-600 flex items-center justify-between pt-1 border-t border-amber-200/40">
                  <span>包含 {{ formula.items.length }} 项配料</span>
                  <span v-if="formula.timingTip" class="text-amber-800 font-medium truncate max-w-[180px]">
                    💡 {{ formula.timingTip }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- 3.2.2 普通主料与调料配料列表 -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- 食材部分 (占据 2 列) -->
            <div class="md:col-span-2 space-y-4">
              <!-- 主料部分 -->
              <div v-if="mainIngredients.length > 0" class="space-y-2">
                <div class="text-xs font-bold text-emerald-800 flex items-center gap-1">
                  <span>🥩 主料 (Main Ingredients)</span>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div
                    v-for="ing in mainIngredients"
                    :key="ing.id"
                    class="p-3 bg-emerald-50/50 border border-emerald-200/70 rounded-xl flex items-center justify-between text-xs"
                  >
                    <span class="font-bold text-stone-900">{{ ing.name }}</span>
                    <span v-if="ing.amountText" class="font-mono text-emerald-950 font-semibold bg-emerald-100/60 px-2 py-0.5 rounded">
                      {{ getScaledIngredientAmount(ing.amountText) }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- 普通调料 / 辅料部分 -->
              <div v-if="seasoningIngredients.length > 0" class="space-y-2">
                <div class="text-xs font-bold text-stone-600 flex items-center gap-1">
                  <span>🧂 常用调料与辅料 (Seasonings)</span>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div
                    v-for="ing in seasoningIngredients"
                    :key="ing.id"
                    class="p-3 bg-stone-50 border border-stone-200/80 rounded-xl flex items-center justify-between text-xs"
                  >
                    <span class="font-medium text-stone-800">{{ ing.name }}</span>
                    <span v-if="ing.amountText" class="font-mono text-stone-600 font-medium bg-stone-200/60 px-2 py-0.5 rounded">
                      {{ getScaledIngredientAmount(ing.amountText) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 前置准备与器具/设备事项 -->
            <div class="bg-stone-50/80 p-5 rounded-2xl border border-stone-200/80 space-y-4 self-start">
              <div class="text-xs font-bold text-stone-900 border-b border-stone-200 pb-2 flex items-center gap-1.5">
                <span>⚙️ 器具与预热设定</span>
              </div>

              <div class="space-y-3 text-xs">
                <div v-if="recipe.prerequisites?.containerSize">
                  <span class="block text-[11px] text-stone-400 font-medium">推荐器具/容器</span>
                  <span class="font-bold text-stone-800">{{ recipe.prerequisites.containerSize }}</span>
                </div>

                <div v-if="recipe.prerequisites?.preheat">
                  <span class="block text-[11px] text-stone-400 font-medium">设备预热设置</span>
                  <span class="font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block mt-0.5">
                    ♨️ {{ recipe.prerequisites.preheat }}
                  </span>
                </div>

                <div v-if="recipe.prerequisites?.prepNotes">
                  <span class="block text-[11px] text-stone-400 font-medium">预备说明</span>
                  <p class="text-stone-600 mt-0.5 leading-relaxed">{{ recipe.prerequisites.prepNotes }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 3.3 核心 Visual Recipe Flow Card (Matrix Flow 矩阵流程卡) 舞台 -->
        <RecipeFlowWorkspaceV3 :recipe="recipe" />

        <!-- 3.4 烹饪秘诀与 Tips (如有) -->
        <div v-if="recipe.tips && recipe.tips.length > 0" class="bg-amber-50/60 rounded-3xl border border-amber-200/80 p-6 md:p-8 shadow-sm space-y-3">
          <div class="flex items-center gap-2 text-amber-900 font-black text-sm">
            <span>💡 烹饪小贴士 (Chef's Tips)</span>
          </div>
          <ul class="list-disc list-inside space-y-1.5 text-xs text-amber-950/90 leading-relaxed font-medium">
            <li v-for="(tip, idx) in recipe.tips" :key="idx">{{ tip }}</li>
          </ul>
        </div>

      </div>
    </div>

    <!-- SubRecipeFormula 详尽配比与步骤 Modal 弹窗 -->
    <FormulaDetailModal
      :formula="activeFormula"
      :recipe="recipe"
      :initialServings="currentServings"
      @close="activeFormula = null"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { VisualRecipeV3 } from '@/types/recipeV3'
import type { SubRecipeFormula } from '@/types/formula'
import { getV3RecipeById } from '@/services/v3RecipeStore'
import { scaleIngredientAmountText } from '@/utils/formulaCalculator'
import RecipeFlowWorkspaceV3 from '@/components/recipe-flow-v3/RecipeFlowWorkspaceV3.vue'
import FormulaDetailModal from '@/components/recipe-flow-v3/FormulaDetailModal.vue'

const route = useRoute()
const recipe = ref<VisualRecipeV3 | null>(null)
const notFound = ref(false)
const imgError = ref(false)
const copySuccess = ref(false)

const currentServings = ref(2)
const activeFormula = ref<SubRecipeFormula | null>(null)

function loadRecipe() {
  const id = (route.params.id as string) || (route.query.id as string)
  if (!id) {
    notFound.value = true
    return
  }

  const found = getV3RecipeById(id)
  if (found) {
    recipe.value = found
    notFound.value = false
    imgError.value = false
  } else {
    notFound.value = true
  }
}

// 提取本食谱包含的 SubRecipeFormulas 复合配料
const recipeFormulas = computed(() => {
  if (!recipe.value || !Array.isArray(recipe.value.formulas)) return []
  return recipe.value.formulas
})

// 主料分类 (排除属于 formula 的项目)
const mainIngredients = computed(() => {
  if (!recipe.value || !Array.isArray(recipe.value.ingredients)) return []
  return recipe.value.ingredients.filter(i => i.category === 'main' || i.category === 'produce' || i.category === 'dairy' || i.category === 'grain' || (!i.category || i.category === 'other'))
})

// 常用调料/辅料分类 (排除属于 formula 的项目)
const seasoningIngredients = computed(() => {
  if (!recipe.value || !Array.isArray(recipe.value.ingredients)) return []
  return recipe.value.ingredients.filter(i => i.category === 'seasoning')
})

// 计算换算比例倍数 (基准 2 人份)
const servingsScaleRatio = computed(() => {
  return currentServings.value / 2
})

function getScaledIngredientAmount(amountText?: string): string {
  if (!amountText) return ''
  return scaleIngredientAmountText(amountText, servingsScaleRatio.value)
}

function getFormulaCategoryLabel(cat?: string): string {
  switch (cat) {
    case 'sauce': return '🥣 特调酱汁 / 芡汁'
    case 'marinade': return '🥩 滑嫩腌肉料'
    case 'seasoning': return '🧂 复合调味粉'
    case 'glaze': return '🍯 亮泽糖色淋汁'
    default: return '🥣 秘制子配方'
  }
}

const estimatedTimeText = computed(() => {
  if (!recipe.value) return ''
  if (recipe.value.cookingTimeText) return recipe.value.cookingTimeText
  const steps = recipe.value.actionBlocks?.length || 0
  if (steps === 0) return '15 分钟'
  return `约 ${Math.max(10, steps * 8)} 分钟`
})

function handleShare() {
  try {
    navigator.clipboard.writeText(window.location.href)
    copySuccess.value = true
    setTimeout(() => {
      copySuccess.value = false
    }, 2000)
  } catch (e) {
    alert('请复制浏览器地址栏 URL 分享该食谱')
  }
}

function getMethodIcon(method?: string): string {
  switch (method) {
    case 'bake': return '♨️'
    case 'stew': return '🍲'
    case 'fry': return '🍳'
    case 'steam': return '💨'
    case 'serve':
    case 'raw': return '🥗'
    default: return '🍳'
  }
}

function getMethodLabel(method?: string): string {
  switch (method) {
    case 'bake': return '烘焙 Bake'
    case 'stew': return '慢炖 Stew'
    case 'fry': return '煎炒 Fry'
    case 'steam': return '蒸制 Steam'
    case 'serve':
    case 'raw': return '冷拌 Serve'
    default: return '烹饪制作'
  }
}

function getDifficultyLabel(diff?: 'easy' | 'medium' | 'hard'): string {
  switch (diff) {
    case 'easy': return '🟢 简单'
    case 'medium': return '🟡 中等'
    case 'hard': return '🔴 繁复'
    default: return '简单'
  }
}

function getHeroBg(method?: string): string {
  switch (method) {
    case 'bake': return 'bg-gradient-to-br from-amber-600 via-orange-600 to-amber-800'
    case 'stew': return 'bg-gradient-to-br from-red-800 via-amber-900 to-red-950'
    case 'fry': return 'bg-gradient-to-br from-orange-600 via-red-600 to-orange-800'
    case 'steam': return 'bg-gradient-to-br from-teal-700 via-emerald-800 to-teal-900'
    case 'serve':
    case 'raw': return 'bg-gradient-to-br from-emerald-600 via-teal-700 to-emerald-900'
    default: return 'bg-gradient-to-br from-stone-700 via-stone-800 to-stone-900'
  }
}

onMounted(() => {
  loadRecipe()
})

watch(
  () => route.params.id,
  () => {
    loadRecipe()
  }
)
</script>
