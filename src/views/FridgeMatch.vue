<template>
  <div class="min-h-screen bg-[#FAF8F5] text-stone-800 p-4 md:p-8 font-sans">
    <div class="max-w-5xl mx-auto space-y-6">
      <!-- 1. 顶部 Header -->
      <div class="bg-white p-6 md:p-8 rounded-3xl border border-stone-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div class="space-y-1">
          <div class="flex items-center gap-2">
            <router-link to="/" class="text-xs font-bold text-[#2D5A43] hover:underline">
              ← 返回公开食谱库
            </router-link>
            <span class="text-stone-300">|</span>
            <span class="text-xs font-bold px-2.5 py-0.5 bg-[#EBF2ED] text-[#2D5A43] rounded-full border border-[#C5D8CC]">
              PostSoma Kitchen
            </span>
          </div>
          <h1 class="text-2xl md:text-3xl font-black text-stone-900 flex items-center gap-2">
            <span>🧊</span>
            <span>清冰箱智能食材匹配</span>
          </h1>
          <p class="text-xs md:text-sm text-stone-500">
            勾选或输入你冰箱里现有的食材，算法将自动从食谱库中找出重合度最高、最适合立刻开做美味佳肴。
          </p>
        </div>

        <button
          @click="isByokOpen = true"
          type="button"
          class="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-300 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <span>🔑</span>
          <span>{{ hasKey ? 'BYOK 已配置 (支持 AI 推荐)' : '配置 BYOK Key' }}</span>
        </button>
      </div>

      <!-- 2. 食材挑选与输入区 -->
      <div class="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-sm space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <h3 class="text-sm font-bold text-stone-900 flex items-center gap-2">
            <span>🥦</span>
            <span>选择或输入现有食材 (已选 {{ selectedIngredients.length }} 项)</span>
          </h3>
          <button
            v-if="selectedIngredients.length > 0"
            @click="selectedIngredients = []"
            class="text-xs text-stone-400 hover:text-stone-600 font-medium"
          >
            清空已选
          </button>
        </div>

        <!-- 常用食材快速勾选 Chips -->
        <div class="flex flex-wrap gap-2 text-xs">
          <button
            v-for="ing in commonIngredients"
            :key="ing"
            @click="toggleIngredient(ing)"
            :class="[
              'px-3 py-1.5 rounded-xl border transition-all cursor-pointer font-medium flex items-center gap-1',
              selectedIngredients.includes(ing)
                ? 'bg-emerald-700 text-white border-emerald-800 shadow-sm font-bold'
                : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
            ]"
          >
            <span>{{ selectedIngredients.includes(ing) ? '✓' : '+' }}</span>
            <span>{{ ing }}</span>
          </button>
        </div>

        <!-- 自定义食材手动输入框 -->
        <div class="flex gap-2 pt-2">
          <input
            v-model="customInput"
            @keyup.enter="addCustomIngredient"
            placeholder="手动输入冰箱里的其他食材 (如: 菠菜、鸡蛋、豆腐)..."
            class="flex-1 p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-medium focus:outline-none focus:border-emerald-600"
          />
          <button
            @click="addCustomIngredient"
            class="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            添加
          </button>
        </div>
      </div>

      <!-- 3. 匹配结果显示区 -->
      <div v-if="selectedIngredients.length > 0" class="space-y-6">
        <!-- AI 智能搭配建议卡片 (若配置了 BYOK Key) -->
        <div v-if="aiAdvice || isAiLoading" class="bg-gradient-to-r from-emerald-900 to-teal-900 text-white p-6 rounded-3xl shadow-md space-y-2">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2 text-emerald-300 font-bold text-xs">
              <span>🤖</span>
              <span>BYOK AI 厨房管家推荐理由</span>
            </div>
          </div>
          <div v-if="isAiLoading" class="text-xs text-emerald-100 animate-pulse py-2">
            正在基于你的现有食材生成智能调配建议...
          </div>
          <p v-else class="text-xs md:text-sm text-emerald-50 leading-relaxed font-medium">
            {{ aiAdvice }}
          </p>
        </div>

        <!-- 触发 AI 理由推荐按钮栏 -->
        <div class="flex items-center justify-between px-1 text-xs">
          <span class="text-stone-500">
            为你匹配到 <strong class="text-stone-900 font-bold">{{ matchResults.length }}</strong> 道符合条件的公开食谱
          </span>

          <button
            @click="handleFetchAiAdvice"
            :disabled="isAiLoading"
            class="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>✨</span>
            <span>{{ isAiLoading ? 'AI 正在分析...' : (hasKey ? '生成 AI 智能推荐理由' : '使用 AI 生成推荐理由 (需 Key)') }}</span>
          </button>
        </div>

        <!-- 无匹配结果反馈 -->
        <div v-if="matchResults.length === 0" class="bg-white rounded-3xl border border-stone-200 p-12 text-center space-y-3">
          <div class="text-4xl">🍳</div>
          <div class="text-base font-bold text-stone-800">暂无包含这组食材的已发布食谱</div>
          <p class="text-xs text-stone-400">尝试多勾选几种常用调料（如“酱油”、“蒜蓉”等）再试。</p>
        </div>

        <!-- 匹配卡片列表 -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div
            v-for="res in matchResults"
            :key="res.recipe.id"
            class="bg-white p-5 rounded-3xl border border-stone-200/80 shadow-sm hover:shadow-lg transition-all duration-200 space-y-4 flex flex-col justify-between"
          >
            <div class="space-y-3">
              <!-- 头部：标题与匹配度百分比 -->
              <div class="flex items-start justify-between gap-2">
                <h4 class="text-base font-bold text-stone-900">
                  <router-link :to="`/recipe/${res.recipe.id}`" class="hover:text-emerald-700 transition-colors">
                    {{ res.recipe.title }}
                  </router-link>
                </h4>
                <div class="text-right shrink-0">
                  <span class="text-base font-black text-emerald-700">{{ res.matchPercentage }}%</span>
                  <span class="block text-[10px] text-stone-400 font-medium">匹配度</span>
                </div>
              </div>

              <!-- 匹配度进度条 -->
              <div class="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                <div
                  class="bg-gradient-to-r from-emerald-500 to-teal-600 h-full rounded-full transition-all duration-500"
                  :style="`width: ${res.matchPercentage}%`"
                ></div>
              </div>

              <!-- 食材匹配明细 -->
              <div class="space-y-1.5 text-xs">
                <div v-if="res.matchedIngredientNames.length > 0" class="flex flex-wrap items-center gap-1">
                  <span class="text-stone-400 font-medium shrink-0">已有食材:</span>
                  <span
                    v-for="mName in res.matchedIngredientNames"
                    :key="`m-${mName}`"
                    class="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded font-semibold text-[11px]"
                  >
                    ✓ {{ mName }}
                  </span>
                </div>

                <div v-if="res.missingIngredientNames.length > 0" class="flex flex-wrap items-center gap-1">
                  <span class="text-stone-400 font-medium shrink-0">还需补买:</span>
                  <span
                    v-for="missName in res.missingIngredientNames"
                    :key="`miss-${missName}`"
                    class="px-2 py-0.5 bg-stone-100 text-stone-600 border border-stone-200 rounded text-[11px]"
                  >
                    + {{ missName }}
                  </span>
                </div>
              </div>
            </div>

            <!-- 卡片底部跳转按钮 -->
            <div class="pt-3 border-t border-stone-100 flex items-center justify-between">
              <span class="text-[11px] text-stone-400 font-medium">
                {{ res.missingIngredientNames.length === 0 ? '🎉 食材全齐，可以直接开做！' : `只差 ${res.missingIngredientNames.length} 样食材` }}
              </span>

              <router-link
                :to="`/recipe/${res.recipe.id}`"
                class="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold shadow-sm transition-colors"
              >
                查看食谱流程卡 →
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="bg-white rounded-3xl border border-stone-200/80 p-12 text-center space-y-3">
        <div class="text-4xl">🧊</div>
        <div class="text-base font-bold text-stone-800">在上方选择你冰箱里现有的食材</div>
        <p class="text-xs text-stone-400 max-w-md mx-auto">
          系统会基于食材重合度自动计算，即便没有配置 BYOK Key 也能离线使用纯本地算法查找适合的菜品！
        </p>
      </div>

      <!-- BYOK 模态框 -->
      <ByokSettingsModal
        :isOpen="isByokOpen"
        @close="isByokOpen = false"
        @saved="checkKey"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { getPublishedRecipes } from '@/services/v3RecipeStore'
import { matchRecipesByIngredients, generateFridgeAiAdvice, type MatchedRecipeResult } from '@/services/fridgeMatcher'
import { hasValidByokConfig } from '@/services/byokService'
import ByokSettingsModal from '@/components/common/ByokSettingsModal.vue'

const isByokOpen = ref(false)
const hasKey = ref(false)
const customInput = ref('')
const selectedIngredients = ref<string[]>(['鸡肉', '干辣椒', '黄油', '鸡蛋'])

const commonIngredients = [
  '鸡肉', '黄油', '鸡蛋', '干辣椒', '花椒', '冬笋', '花生仁',
  '砂糖', '豆腐', '蒜蓉', '豆豉', '生抽', '白鳝'
]

const aiAdvice = ref('')
const isAiLoading = ref(false)

function checkKey() {
  hasKey.value = hasValidByokConfig()
}

onMounted(() => {
  checkKey()
})

function toggleIngredient(ing: string) {
  const idx = selectedIngredients.value.indexOf(ing)
  if (idx >= 0) {
    selectedIngredients.value.splice(idx, 1)
  } else {
    selectedIngredients.value.push(ing)
  }
}

function addCustomIngredient() {
  if (!customInput.value.trim()) return
  const val = customInput.value.trim()
  if (!selectedIngredients.value.includes(val)) {
    selectedIngredients.value.push(val)
  }
  customInput.value = ''
}

const matchResults = computed<MatchedRecipeResult[]>(() => {
  const published = getPublishedRecipes()
  return matchRecipesByIngredients(selectedIngredients.value, published)
})

async function handleFetchAiAdvice() {
  if (!hasKey.value) {
    isByokOpen.value = true
    return
  }

  if (matchResults.value.length === 0) {
    alert('请先选择食材以匹配菜品。')
    return
  }

  isAiLoading.value = true
  aiAdvice.value = ''
  try {
    const text = await generateFridgeAiAdvice(selectedIngredients.value, matchResults.value)
    aiAdvice.value = text
  } catch (e: any) {
    alert(e.message || '获取 AI 智能分析失败')
  } finally {
    isAiLoading.value = false
  }
}
</script>
