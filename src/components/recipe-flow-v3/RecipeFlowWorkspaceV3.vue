<template>
  <div class="v3-workspace-container space-y-4">
    <!-- 1. 一次性轻量读图指南 Banner (首次进入自动显示或手选打开) -->
    <FlowCardGuideBanner ref="guideBannerRef" />

    <!-- 2. Visual Recipe Flow Card 核心展台外壳 -->
    <div class="bg-white rounded-3xl border border-stone-200/80 shadow-sm overflow-hidden flex flex-col">
      
      <!-- 2.1 流程图卡控制 Header (去重瘦身，突出主流程) -->
      <div class="px-5 py-4 bg-stone-50/80 border-b border-stone-200/80 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div class="flex items-center gap-2">
          <span class="text-base">📊</span>
          <span class="font-black text-stone-900 tracking-tight">Visual Recipe Flow Card</span>
          <span class="text-[10px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
            Matrix V3
          </span>

          <!-- 常驻读图指南触发按键 -->
          <button
            @click="triggerGuide"
            type="button"
            class="ml-1 text-[11px] font-bold text-amber-800 hover:text-amber-950 bg-amber-50 hover:bg-amber-100 border border-amber-200/80 px-2.5 py-0.5 rounded-full transition-colors cursor-pointer inline-flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
            title="查看如何阅读 Flow Card 矩阵图"
          >
            <span>💡</span>
            <span>读图指南</span>
          </button>
        </div>

        <!-- 消费型实用工具按键组 (全屏 / 导出 PNG) -->
        <div class="flex items-center gap-2">
          <!-- 全屏放大查看按钮 -->
          <button
            @click="showFullModal = true"
            type="button"
            class="inline-flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-stone-100 text-stone-700 rounded-xl font-bold border border-stone-200 transition-all shadow-sm cursor-pointer"
            title="全屏放大查看完整 Flow Card 矩阵图"
          >
            <span>🔍</span>
            <span>全屏查看</span>
          </button>

          <!-- 导出 PNG 按钮 -->
          <button
            @click="handleExportPng"
            :disabled="isExporting"
            type="button"
            class="inline-flex items-center gap-1 px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white rounded-xl font-bold shadow-sm transition-all cursor-pointer"
            title="导出高清 PNG 流程卡图"
          >
            <span>📸</span>
            <span>{{ isExporting ? '导出中...' : '导出 PNG' }}</span>
          </button>
        </div>
      </div>

      <!-- 2.2 SVG 矩阵流程卡画布区域 (带窄屏横滑提示) -->
      <div class="relative bg-[#FAF8F5] p-4 md:p-6">
        <!-- 移动端 / 窄屏横滑微提示 -->
        <div class="md:hidden text-center text-[11px] text-stone-400 font-medium mb-2 flex items-center justify-center gap-1 select-none">
          <span>👈</span>
          <span>左右滑动查看完整工序依赖</span>
          <span>👉</span>
        </div>

        <div class="flex justify-center overflow-x-auto pb-2">
          <RecipeFlowCanvasV3 :recipe="recipe" />
        </div>
      </div>
    </div>

    <!-- 3. 全屏放大查看 Modal (包含清晰大图与完整导出快捷操作) -->
    <div
      v-if="showFullModal"
      class="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex flex-col items-center justify-center p-3 md:p-6"
      @click.self="showFullModal = false"
      @keydown.esc="showFullModal = false"
      tabindex="0"
    >
      <div class="bg-white w-full max-w-7xl max-h-[94vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-stone-200">
        <!-- Modal 顶栏 -->
        <div class="px-6 py-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between shrink-0">
          <div class="flex items-center gap-2">
            <span class="text-xl">📊</span>
            <h3 class="text-base font-black text-stone-900">{{ recipe.title }} - 完整 Visual Recipe Flow Card</h3>
          </div>
          <div class="flex items-center gap-2">
            <button
              @click="handleExportPng"
              :disabled="isExporting"
              type="button"
              class="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              导出高清 PNG
            </button>
            <button
              @click="showFullModal = false"
              type="button"
              class="ml-2 text-stone-400 hover:text-stone-700 text-xl font-bold p-1 cursor-pointer transition-colors"
              title="关闭全屏"
            >
              ✕
            </button>
          </div>
        </div>

        <!-- Modal 内部 SVG 画布 -->
        <div class="flex-1 overflow-auto p-6 bg-[#FAF8F5] flex justify-center items-start">
          <RecipeFlowCanvasV3 :recipe="recipe" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { VisualRecipeV3 } from '@/types/recipeV3'
import RecipeFlowCanvasV3 from './RecipeFlowCanvasV3.vue'
import FlowCardGuideBanner from './FlowCardGuideBanner.vue'
import { exportFlowCardAsPng } from '@/utils/exportFlowCard'

const props = defineProps<{
  recipe: VisualRecipeV3
}>()

const guideBannerRef = ref<InstanceType<typeof FlowCardGuideBanner> | null>(null)
const showFullModal = ref(false)
const isExporting = ref(false)

function triggerGuide() {
  guideBannerRef.value?.openGuide()
}

async function handleExportPng() {
  if (isExporting.value) return
  isExporting.value = true
  try {
    await exportFlowCardAsPng(props.recipe, undefined, 'full')
  } catch (err: any) {
    alert(err.message || '导出高清 PNG 图卡失败')
  } finally {
    isExporting.value = false
  }
}
</script>
