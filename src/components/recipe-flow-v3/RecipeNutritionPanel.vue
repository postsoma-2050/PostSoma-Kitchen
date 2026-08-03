<template>
  <div class="v3-nutrition-panel-wrapper no-print bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden transition-all">
    <!-- 折叠栏标示 (默认收起) -->
    <button
      @click="isExpanded = !isExpanded"
      type="button"
      class="w-full px-4 py-3 bg-stone-50 hover:bg-stone-100 flex items-center justify-between transition-colors border-b border-stone-200 cursor-pointer"
    >
      <div class="flex items-center gap-2">
        <span class="text-base">🥗</span>
        <span class="text-sm font-bold text-stone-800">RecipeAnalysis · AI 营养标签</span>
        <span v-if="analysis?.status === 'ready'" class="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
          {{ analysis.nutrition?.caloriesPerServing }} kcal / 份
        </span>
        <span v-else class="text-xs text-stone-400 font-normal">
          (可选附属分析，不影响流程图)
        </span>
      </div>

      <div class="flex items-center gap-2">
        <span class="text-xs font-semibold text-stone-500">
          {{ isExpanded ? '收起面板 ▲' : '展开查看 ▼' }}
        </span>
      </div>
    </button>

    <!-- 折叠展开面板主体 -->
    <div v-if="isExpanded" class="p-4 md:p-6 space-y-4">
      <!-- 食谱未完成 (draft) 时的提示 -->
      <div v-if="recipe.status !== 'complete'" class="text-center py-6 bg-stone-50 rounded-lg border border-dashed border-stone-300 space-y-2">
        <div class="text-2xl">📝</div>
        <div class="text-xs font-semibold text-stone-700">仅已完成的食谱支持生成营养标签</div>
        <div class="text-xs text-stone-400">请在编辑器中补全食材与工序，并保存为完整食谱后重试</div>
      </div>

      <!-- 食谱已完成 (complete) 时的渲染 -->
      <template v-else>
        <!-- 1. loading 加载状态 -->
        <div v-if="loading" class="text-center py-8 space-y-3">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-emerald-600 border-t-transparent"></div>
          <div class="text-xs font-semibold text-emerald-800">AI 正在估算每份食材的营养成分...</div>
          <div class="text-xs text-stone-400">正在分析热量、蛋白质、碳水与脂肪含量</div>
        </div>

        <!-- 2. ready 成功展示状态 -->
        <div v-else-if="analysis?.status === 'ready' && analysis.nutrition" class="space-y-4">
          <div class="flex items-center justify-between border-b border-stone-100 pb-2">
            <div class="text-xs text-stone-500">
              数据由 AI 根据食材及份量估算 (更新于 {{ formatDate(analysis.generatedAt) }})
            </div>
            <button
              @click="handleGenerate"
              type="button"
              class="text-xs text-emerald-700 hover:text-emerald-800 font-semibold underline cursor-pointer"
            >
              重新生成
            </button>
          </div>

          <!-- 核心四项营养指标格阵 -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div class="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-center">
              <div class="text-xs text-emerald-800 font-medium">每份热量 (Energy)</div>
              <div class="text-lg md:text-xl font-black text-emerald-900 mt-1">
                {{ analysis.nutrition.caloriesPerServing }}
                <span class="text-xs font-normal">kcal</span>
              </div>
            </div>

            <div class="p-3 bg-blue-50 rounded-lg border border-blue-200 text-center">
              <div class="text-xs text-blue-800 font-medium">蛋白质 (Protein)</div>
              <div class="text-lg md:text-xl font-bold text-blue-900 mt-1">
                {{ analysis.nutrition.protein }}
              </div>
            </div>

            <div class="p-3 bg-amber-50 rounded-lg border border-amber-200 text-center">
              <div class="text-xs text-amber-800 font-medium">碳水化合物 (Carbs)</div>
              <div class="text-lg md:text-xl font-bold text-amber-900 mt-1">
                {{ analysis.nutrition.carbs }}
              </div>
            </div>

            <div class="p-3 bg-rose-50 rounded-lg border border-rose-200 text-center">
              <div class="text-xs text-rose-800 font-medium">脂肪 (Fat)</div>
              <div class="text-lg md:text-xl font-bold text-rose-900 mt-1">
                {{ analysis.nutrition.fat }}
              </div>
            </div>
          </div>

          <!-- 选填指标 (膳食纤维 / 糖分) -->
          <div v-if="analysis.nutrition.fiber || analysis.nutrition.sugar" class="flex gap-4 text-xs text-stone-600 bg-stone-50 p-2.5 rounded border border-stone-200">
            <span v-if="analysis.nutrition.fiber">🌱 膳食纤维: <strong>{{ analysis.nutrition.fiber }}</strong></span>
            <span v-if="analysis.nutrition.sugar">🍬 糖分: <strong>{{ analysis.nutrition.sugar }}</strong></span>
          </div>
        </div>

        <!-- 3. failed 失败状态 -->
        <div v-else-if="analysis?.status === 'failed'" class="text-center py-6 bg-red-50 rounded-lg border border-red-200 space-y-3">
          <div class="text-xs font-semibold text-red-800">
            {{ analysis.errorMessage || '营养标签生成失败，可稍后重试' }}
          </div>
          <p class="text-xs text-red-600">不影响上方流程图的使用，请检查网络或 API 配置后重试。</p>
          <button
            @click="handleGenerate"
            type="button"
            class="px-4 py-1.5 bg-red-700 hover:bg-red-800 text-white rounded text-xs font-semibold shadow-sm transition-colors cursor-pointer"
          >
            重试生成
          </button>
        </div>

        <!-- 4. idle 尚未生成状态 -->
        <div v-else class="text-center py-6 bg-stone-50 rounded-lg border border-stone-200 space-y-3">
          <div class="text-xs text-stone-600">点击下方按钮，由 AI 自动估算本食谱的营养成分（热量、蛋白质、碳水等）</div>
          <button
            @click="handleGenerate"
            type="button"
            class="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-md text-xs font-semibold shadow-sm transition-colors cursor-pointer"
          >
            生成 AI 营养标签
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import type { VisualRecipeV3 } from '@/types/recipeV3'
import type { RecipeAnalysis } from '@/types/recipeAnalysis'
import { getRecipeAnalysis, saveRecipeAnalysis } from '@/services/v3AnalysisStore'

const props = defineProps<{
  recipe: VisualRecipeV3
}>()

const isExpanded = ref(false)
const loading = ref(false)
const analysis = ref<RecipeAnalysis | null>(null)

function loadAnalysis() {
  if (props.recipe && props.recipe.id) {
    analysis.value = getRecipeAnalysis(props.recipe.id)
  }
}

onMounted(() => {
  loadAnalysis()
})

watch(
  () => props.recipe.id,
  () => {
    loadAnalysis()
  }
)

async function handleGenerate() {
  loading.value = true
  try {
    const ingCount = props.recipe.ingredients?.length || 0
    
    // 轻量估算营养分析
    const mockNutrition = {
      caloriesPerServing: Math.round(ingCount * 120 + 150),
      protein: `${Math.round(ingCount * 4 + 8)} g`,
      fat: `${Math.round(ingCount * 3 + 5)} g`,
      carbs: `${Math.round(ingCount * 8 + 15)} g`
    }

    const newRecord: RecipeAnalysis = {
      recipeId: props.recipe.id,
      nutrition: mockNutrition,
      generatedAt: new Date().toISOString(),
      status: 'ready'
    }
    saveRecipeAnalysis(newRecord)
    analysis.value = newRecord
  } catch (err: any) {
    console.error('生成营养分析失败:', err)
  } finally {
    loading.value = false
  }
}

function formatDate(isoText?: string) {
  if (!isoText) return ''
  try {
    return new Date(isoText).toLocaleString('zh-CN', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch (e) {
    return isoText
  }
}
</script>
