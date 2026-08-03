<template>
  <div v-if="isVisible" class="flow-card-guide-banner bg-amber-50/90 border border-amber-200/80 rounded-2xl p-3.5 md:p-4 text-xs text-amber-900 shadow-sm transition-all duration-300 no-print flex items-start justify-between gap-3">
    <div class="flex items-start gap-2.5">
      <span class="text-base shrink-0 select-none">💡</span>
      <div class="space-y-1">
        <div class="font-bold text-amber-950 flex items-center gap-1.5">
          <span>新手读图指南：怎么看懂这张 Visual Recipe Flow Card？</span>
        </div>
        <p class="text-amber-800/90 leading-relaxed">
          1. <strong>左侧</strong>是食材清单；<br class="hidden sm:inline" />
          2. <strong>从左到右</strong>代表烹饪的时间推进阶段；<br class="hidden sm:inline" />
          3. <strong>跨行卡片</strong>代表该工序具体合并与处理的食材（如“鸡丁蛋清上浆”只覆盖鸡丁行）。
        </p>
      </div>
    </div>

    <!-- 关闭按钮 -->
    <button
      @click="dismissGuide"
      type="button"
      class="text-amber-700/60 hover:text-amber-900 hover:bg-amber-100 p-1 rounded-lg transition-colors cursor-pointer shrink-0 text-sm font-bold"
      title="关闭提示 (下次不再自动显示)"
    >
      ✕
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const STORAGE_KEY = 'has-seen-flowcard-guide'
const isVisible = ref(false)

onMounted(() => {
  try {
    const hasSeen = localStorage.getItem(STORAGE_KEY)
    if (!hasSeen) {
      isVisible.value = true
    }
  } catch (e) {
    isVisible.value = true
  }
})

function dismissGuide() {
  isVisible.value = false
  try {
    localStorage.setItem(STORAGE_KEY, 'true')
  } catch (e) {
    // 忽略 localStorage 失败
  }
}

function openGuide() {
  isVisible.value = true
}

defineExpose({
  openGuide,
  dismissGuide,
  isVisible
})
</script>
