<template>
  <router-link
    :to="`/recipe/${recipe.id}`"
    class="publish-recipe-card group bg-white rounded-2xl border border-stone-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col overflow-hidden text-left focus:outline-none focus:ring-2 focus:ring-emerald-600/40"
    :aria-label="`查看 ${recipe.title} 的可视化食谱流程图`"
  >
    <!-- 1. 16:9 封面高光区域 (含左上/右上浮动印章) -->
    <div class="relative w-full aspect-[16/9] overflow-hidden bg-stone-100 shrink-0">
      <img
        v-if="recipe.coverImageUrl && !imgError"
        :src="recipe.coverImageUrl"
        :alt="recipe.title"
        @error="imgError = true"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
        loading="lazy"
      />
      <!-- 无封面图时的优雅渐变占位符降级 (按烹饪方式配颜色) -->
      <div
        v-else
        :class="[
          'w-full h-full flex flex-col items-center justify-center p-4 text-center group-hover:scale-105 transition-transform duration-300 ease-out',
          getPlaceholderBg(recipe.finalBlock?.method)
        ]"
      >
        <span class="text-4xl mb-1 drop-shadow-md select-none">{{ getMethodIcon(recipe.finalBlock?.method) }}</span>
        <span class="text-xs font-bold text-white/90 tracking-wider uppercase drop-shadow-sm select-none">
          {{ getMethodLabel(recipe.finalBlock?.method) }}
        </span>
      </div>

      <!-- 左上角: 耗时 / 步骤印章 -->
      <span
        class="absolute top-3 left-3 text-[11px] font-bold px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 flex items-center gap-1 select-none"
        :aria-label="`准备及烹饪大约需要 ${estimatedTimeText}`"
      >
        <span>⏱️</span>
        <span>{{ estimatedTimeText }}</span>
      </span>

      <!-- 右上角: 磨砂玻璃烹饪方式徽章 -->
      <span
        class="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-stone-800 shadow-sm border border-white/40 flex items-center gap-1 select-none"
      >
        <span>{{ getMethodIcon(recipe.finalBlock?.method) }}</span>
        <span>{{ getMethodLabel(recipe.finalBlock?.method) }}</span>
      </span>
    </div>

    <!-- 2. 卡片中部: 菜名、描述与元数据阶梯 -->
    <div class="p-5 flex-1 flex flex-col justify-between space-y-3">
      <div class="space-y-1.5">
        <h3 class="text-lg font-black text-stone-900 line-clamp-1 group-hover:text-emerald-700 transition-colors tracking-tight">
          {{ recipe.title }}
        </h3>
        <p class="text-xs text-stone-500 line-clamp-2 leading-relaxed min-h-[36px]">
          {{ recipe.description || '精选个人私房食谱，包含完整 Flow Card 矩阵可视化流程。' }}
        </p>
      </div>

      <!-- 元数据阶梯 (食材种数 · 步骤数 · 容器/难度) -->
      <div class="grid grid-cols-3 gap-2 pt-2 border-t border-stone-100 text-center text-xs">
        <div class="p-1.5 bg-emerald-50/70 text-emerald-950 rounded-lg border border-emerald-100/80">
          <span class="block text-[10px] text-emerald-800 font-medium select-none">食材</span>
          <span class="font-black text-stone-900">{{ recipe.ingredients?.length || 0 }} 种</span>
        </div>

        <div class="p-1.5 bg-amber-50/70 text-amber-950 rounded-lg border border-amber-100/80">
          <span class="block text-[10px] text-amber-800 font-medium select-none">步骤</span>
          <span class="font-black text-stone-900">{{ recipe.actionBlocks?.length || 0 }} 步</span>
        </div>

        <div class="p-1.5 bg-stone-100/80 text-stone-800 rounded-lg border border-stone-200/60">
          <span class="block text-[10px] text-stone-500 font-medium select-none">难度</span>
          <span class="font-bold text-stone-800">{{ getDifficultyLabel(recipe.difficulty) }}</span>
        </div>
      </div>
    </div>

    <!-- 3. 固定脚注条: Matrix Flow 独占卖点标识与箭头 CTA -->
    <div class="px-5 py-3 bg-stone-50/90 border-t border-stone-100 flex items-center justify-between text-xs group-hover:bg-emerald-50/50 transition-colors">
      <span class="font-semibold text-stone-600 group-hover:text-emerald-800 transition-colors flex items-center gap-1.5">
        <span class="text-emerald-600">💡</span>
        <span>Matrix Flow 可视化流程图</span>
      </span>

      <span class="text-emerald-700 font-bold flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
        <span>查看流程</span>
        <span>→</span>
      </span>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { VisualRecipeV3 } from '@/types/recipeV3'

const props = defineProps<{
  recipe: VisualRecipeV3
}>()

const imgError = ref(false)

// 估算显示耗时或步数
const estimatedTimeText = computed(() => {
  if (props.recipe.cookingTimeText) {
    return props.recipe.cookingTimeText
  }
  const steps = props.recipe.actionBlocks?.length || 0
  if (steps === 0) return '15 分钟'
  // 根据步数推算估算时间
  const estMin = Math.max(10, steps * 8)
  return `约 ${estMin} 分钟`
})

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

function getPlaceholderBg(method?: string): string {
  switch (method) {
    case 'bake': return 'bg-gradient-to-br from-amber-600 to-orange-700'
    case 'stew': return 'bg-gradient-to-br from-red-700 to-amber-900'
    case 'fry': return 'bg-gradient-to-br from-orange-500 to-red-600'
    case 'steam': return 'bg-gradient-to-br from-teal-600 to-emerald-800'
    case 'serve':
    case 'raw': return 'bg-gradient-to-br from-emerald-600 to-teal-700'
    default: return 'bg-gradient-to-br from-stone-600 to-stone-800'
  }
}
</script>
