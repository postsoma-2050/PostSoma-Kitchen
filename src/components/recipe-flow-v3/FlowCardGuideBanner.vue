<template>
  <div v-if="isVisible" class="flow-card-guide-banner bg-amber-50/90 border border-amber-200/80 rounded-2xl p-3.5 md:p-4 text-xs text-amber-900 shadow-sm transition-all duration-300 no-print flex items-start justify-between gap-3">
    <div class="flex items-start gap-2.5">
      <span class="text-base shrink-0 select-none">💡</span>
      <div class="space-y-1">
        <div class="font-bold text-amber-950 flex items-center gap-1.5">
          <span class="sm:hidden">手机做菜模式读法</span>
          <span class="hidden sm:inline">流程速览：沿食材行，从左向右阅读</span>
        </div>
        <p class="sm:hidden text-amber-800/90 leading-relaxed">
          按页面顺序<strong>向下阅读</strong>；按工序的<strong>先后与等待关系</strong>操作；点击「矩阵全图」查看完整横向结构。
        </p>
        <p class="hidden sm:block text-amber-800/90 leading-relaxed">
          <strong>左侧</strong>是食材清单，<strong>从左到右</strong>是烹饪顺序；<br class="hidden sm:inline" />
          食材行进入<strong>加工区域</strong>后汇合；继续延伸的行表示稍后加入。
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
