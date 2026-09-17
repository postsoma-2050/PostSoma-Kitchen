<template>
  <div v-if="isVisible" class="flow-card-guide-banner bg-amber-50/90 border border-amber-200/80 rounded-2xl p-3.5 md:p-4 text-xs text-amber-900 shadow-sm transition-all duration-300 no-print flex items-start justify-between gap-3">
    <div class="flex items-start gap-2.5">
      <AppIcon name="guide" :size="19" class="shrink-0 text-amber-800" />
      <div class="space-y-1">
        <div class="font-bold text-amber-950 flex items-center gap-1.5">
          <span class="sm:hidden">手机做菜模式读法</span>
          <span class="hidden sm:inline">
            {{ mode === 'flow' ? '分支速览：看食材如何加入、支线如何汇合' : '流程速览：沿食材行，从左向右阅读' }}
          </span>
        </div>
        <p class="sm:hidden text-amber-800/90 leading-relaxed">
          按页面顺序<strong>向下阅读</strong>；按工序的<strong>先后与等待关系</strong>操作；点击「矩阵全图」查看完整横向结构。
        </p>
        <p v-if="mode === 'table'" class="hidden sm:block text-amber-800/90 leading-relaxed">
          <strong>左侧</strong>是食材清单，<strong>从左到右</strong>是烹饪顺序；<br class="hidden sm:inline" />
          食材行进入<strong>加工区域</strong>后汇合；继续延伸的行表示稍后加入。
        </p>
        <p v-else class="hidden sm:block text-amber-800/90 leading-relaxed">
          食材只在<strong>首次使用</strong>处接入动作节点；绿色实线表示物料继续流转，灰蓝虚线表示先后等待。<br class="hidden sm:inline" />
          悬停或键盘聚焦食材与工序，可高亮它的完整上下游路径。
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
      <AppIcon name="close" :size="17" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AppIcon from '@/components/common/AppIcon.vue'

withDefaults(defineProps<{ mode?: 'table' | 'flow' }>(), {
  mode: 'table',
})

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
