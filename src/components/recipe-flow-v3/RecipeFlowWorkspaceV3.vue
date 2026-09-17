<template>
  <div class="v3-workspace-container space-y-4">
    <!-- 1. 一次性轻量读图指南 Banner (首次进入自动显示或手选打开) -->
    <FlowCardGuideBanner ref="guideBannerRef" :mode="activeLayoutMode" />

    <!-- 2. Visual Recipe Flow Card 核心展台外壳 -->
    <div class="bg-white rounded-3xl border border-stone-200/80 shadow-sm overflow-hidden flex flex-col">
      
      <!-- 2.1 流程图卡控制 Header (去重瘦身，突出主流程) -->
      <div class="px-4 py-3 sm:px-5 bg-stone-50/80 border-b border-stone-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div class="flex flex-wrap items-center gap-2">
          <AppIcon name="chart" :size="19" class="text-emerald-800" />
          <span class="font-black text-stone-900 tracking-tight">Visual Recipe Flow Card</span>

          <!-- 模式切换：连续工序表 vs 分支流程图 -->
          <div class="flex items-center bg-stone-200/60 p-0.5 rounded-xl text-xs gap-1 ml-1">
            <button
              type="button"
              @click="canRenderStatus.canRender && (userMode = 'table')"
              :disabled="!canRenderStatus.canRender"
              :class="[
                'px-2.5 py-1 rounded-lg font-bold transition-all inline-flex items-center gap-1.5',
                activeLayoutMode === 'table'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900',
                !canRenderStatus.canRender ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
              ]"
              :title="canRenderStatus.canRender ? '以连续合并表格展示工序' : `拓扑限制不可用: ${canRenderStatus.reason}`"
            >
              <AppIcon name="table" :size="16" />
              <span>连续工序表</span>
            </button>
            <button
              type="button"
              @click="userMode = 'flow'"
              :class="[
                'px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer inline-flex items-center gap-1.5',
                activeLayoutMode === 'flow'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              ]"
              title="以显式分支连接展示工序流程图"
            >
              <AppIcon name="branch" :size="16" />
              <span>分支流程图</span>
            </button>
          </div>

          <!-- 消费端友好模式提示 (降低主界面技术诊断占比，提供轻量说明展开) -->
          <div
            v-if="!canRenderStatus.canRender"
            class="inline-flex items-center gap-1.5 text-[11px] text-stone-600 bg-stone-100/90 border border-stone-200/80 px-2.5 py-1 rounded-lg"
          >
            <button
              type="button"
              @click="showDiagnosticReason = !showDiagnosticReason"
              class="text-[10px] text-emerald-700 hover:text-emerald-800 font-bold underline cursor-pointer ml-0.5"
            >
              {{ showDiagnosticReason ? '收起说明' : '模式说明' }}
            </button>
          </div>

          <!-- 常驻读图指南触发按键 -->
          <button
            @click="triggerGuide"
            type="button"
            class="ml-1 text-[11px] font-bold text-amber-800 hover:text-amber-950 bg-amber-50 hover:bg-amber-100 border border-amber-200/80 px-2.5 py-0.5 rounded-full transition-colors cursor-pointer inline-flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
            title="查看如何阅读 Flow Card 矩阵图"
          >
            <AppIcon name="guide" :size="16" />
            <span>读图指南</span>
          </button>
        </div>

        <!-- 消费型实用工具按键组 (全屏 / 导出 PNG) -->
        <div class="grid grid-cols-2 sm:flex sm:items-center gap-2 w-full sm:w-auto">
          <!-- 全屏放大查看按钮 -->
          <button
            @click="showFullModal = true"
            type="button"
            class="inline-flex items-center justify-center gap-1 px-3 py-2 sm:py-1.5 bg-white hover:bg-stone-100 text-stone-700 rounded-xl font-bold border border-stone-200 transition-all shadow-sm cursor-pointer"
            title="全屏放大查看完整 Flow Card 矩阵图"
          >
            <AppIcon name="fullscreen" :size="17" />
            <span class="sm:hidden">矩阵全图</span>
            <span class="hidden sm:inline">全屏查看</span>
          </button>

          <!-- 导出 PNG 按钮 -->
          <button
            @click="handleExportPng"
            :disabled="isExporting"
            type="button"
            class="inline-flex items-center justify-center gap-1 px-3.5 py-2 sm:py-1.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white rounded-xl font-bold shadow-sm transition-all cursor-pointer"
            title="导出高清 PNG 流程卡图"
          >
            <AppIcon name="download" :size="17" />
            <span>{{ isExporting ? '导出中...' : '导出 PNG' }}</span>
          </button>
        </div>

        <!-- 模式说明轻量展开卡片 (消费端友好，主视觉不吵闹) -->
        <div
          v-if="!canRenderStatus.canRender && showDiagnosticReason"
          class="col-span-full w-full bg-stone-50 border border-stone-200/90 rounded-xl p-3 text-xs text-stone-700 flex items-start justify-between gap-3 mt-1"
        >
          <div class="space-y-1">
            <p class="font-bold text-stone-900 flex items-center gap-1.5">
              <AppIcon name="info" :size="16" />
              <span>为什么当前菜品以分支流程图呈现？</span>
            </p>
            <p class="text-[11px] leading-relaxed text-stone-600">
              本食谱包含多支线并行烹饪或跳行汇流结构，系统已安全呈现为清晰的分支流程图。<br />
              <span class="text-stone-500">技术诊断：{{ canRenderStatus.reason }}</span>
            </p>
          </div>
          <button
            type="button"
            @click="showDiagnosticReason = false"
            class="text-stone-400 hover:text-stone-700 font-bold text-xs p-1"
            aria-label="关闭模式说明"
          >
            <AppIcon name="close" :size="17" />
          </button>
        </div>
      </div>

      <!-- 2.2 手机纵向 Cook Mode / 桌面矩阵画布 -->
      <div class="relative bg-[#FAF8F5] p-3 sm:p-5">
        <RecipeFlowMobileV3 :recipe="recipe" />

        <div class="hidden md:flex justify-center overflow-x-auto pb-2">
          <RecipeFlowCanvasV3 :recipe="recipe" :mode="activeLayoutMode" @select-block="selectedBlock = $event" />
        </div>
      </div>
    </div>

    <!-- 2.5 烹饪工序操作明细 (全渠道可访问性保证：键盘、触屏与文本读者专属) -->
    <div class="bg-white rounded-2xl border border-stone-200/80 shadow-xs p-4 sm:p-5 space-y-3">
      <div class="flex items-center justify-between cursor-pointer select-none" @click="showStepsList = !showStepsList">
        <div class="flex items-center gap-2">
          <AppIcon name="steps" :size="18" class="text-emerald-800" />
          <h3 class="text-xs sm:text-sm font-black text-stone-900">烹饪工序操作明细 (全步骤操作指导)</h3>
          <span class="text-[10px] font-bold text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full">
            共 {{ recipe.actionBlocks.length }} 步
          </span>
        </div>
        <button type="button" class="inline-flex items-center gap-1 text-xs text-stone-500 hover:text-stone-800 font-bold cursor-pointer">
          <span>{{ showStepsList ? '收起' : '展开详细步骤' }}</span>
          <AppIcon name="arrow-down" :size="15" class="transition-transform" :class="showStepsList ? 'rotate-180' : ''" />
        </button>
      </div>

      <div v-show="showStepsList" class="space-y-3 pt-2 border-t border-stone-100">
        <div
          v-for="(block, bIdx) in recipe.actionBlocks"
          :key="block.id"
          class="p-3 bg-stone-50 rounded-xl border border-stone-200/80 text-xs space-y-2"
        >
          <div class="flex items-start justify-between gap-2">
            <div class="flex items-center gap-2">
              <span class="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-700 text-white text-[11px] font-bold">
                {{ bIdx + 1 }}
              </span>
              <span class="font-bold text-stone-900 text-xs sm:text-sm">{{ block.label }}</span>
              <span v-if="block.sublabel" class="text-stone-500 text-[11px] font-medium">{{ block.sublabel }}</span>
            </div>
            <div class="flex items-center gap-2 text-[10px] text-stone-500 shrink-0">
              <span v-if="block.heatLevel" class="font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                {{ block.heatLevel }}
              </span>
              <span v-if="block.durationMinutes" class="font-bold text-stone-700 bg-stone-100 px-1.5 py-0.5 rounded">
                {{ block.durationMinutes }}m
              </span>
              <span v-if="block.equipment" class="text-stone-600 bg-stone-100 px-1.5 py-0.5 rounded">
                {{ block.equipment }}
              </span>
            </div>
          </div>

          <!-- 食材清单 -->
          <div v-if="getBlockIngredients(block).length > 0" class="flex flex-wrap gap-1.5 pt-1">
            <span
              v-for="ing in getBlockIngredients(block)"
              :key="ing.id"
              class="px-2 py-0.5 rounded bg-white border border-stone-200 text-[11px] text-stone-700"
            >
              <strong v-if="formatIngredientBadge(ing).amount" class="text-emerald-800 font-bold mr-1">{{ formatIngredientBadge(ing).amount }}</strong>
              <span>{{ formatIngredientBadge(ing).name }}</span>
            </span>
          </div>

          <!-- 准出状态与产出物料 -->
          <div v-if="block.completionState" class="text-[11px] text-emerald-900 bg-emerald-50/80 px-2.5 py-1.5 rounded-lg border border-emerald-200">
            <span class="font-bold">准出状态：</span>{{ block.completionState }}
          </div>
          <div v-if="block.outputItem" class="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
            <span>产出半成品：</span>
            <span class="inline-flex items-center gap-1 bg-emerald-100/90 text-emerald-900 px-2 py-0.5 rounded">{{ block.outputItem }}<AppIcon name="arrow-right" :size="14" /></span>
          </div>

          <!-- 操作说明与要点 -->
          <p v-if="block.note || block.notes" class="text-stone-700 text-[11.5px] leading-relaxed bg-white p-2.5 rounded-lg border border-stone-200/60">
            {{ block.note || block.notes }}
          </p>
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
        <div class="px-4 py-3 sm:px-6 sm:py-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between gap-3 shrink-0">
          <div class="flex items-center gap-2 min-w-0">
            <AppIcon name="chart" :size="22" class="text-emerald-800" />
            <h3 class="text-sm sm:text-base font-black text-stone-900 truncate">{{ recipe.title }} - 完整 Visual Recipe Flow Card</h3>
          </div>
          <div class="flex items-center gap-2">
            <button
              @click="handleExportPng"
              :disabled="isExporting"
              type="button"
              class="hidden sm:inline-flex px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              导出高清 PNG
            </button>
            <button
              @click="showFullModal = false"
              type="button"
              class="ml-2 text-stone-400 hover:text-stone-700 text-xl font-bold p-1 cursor-pointer transition-colors"
              title="关闭全屏"
            >
              <AppIcon name="close" :size="20" />
            </button>
          </div>
        </div>

        <!-- Modal 内部 SVG 画布 -->
        <div class="flex-1 overflow-auto p-2 sm:p-6 bg-[#FAF8F5] flex justify-start md:justify-center items-start">
          <RecipeFlowCanvasV3 :recipe="recipe" :mode="activeLayoutMode" @select-block="selectedBlock = $event" />
        </div>
      </div>
    </div>

    <!-- 4. 单步工序详情浮层 Modal (点击画布卡片时触发，具备完整 WAI-ARIA 对话框键盘闭环) -->
    <div
      v-if="selectedBlock"
      ref="stepModalRef"
      role="dialog"
      aria-modal="true"
      aria-labelledby="step-detail-title"
      class="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 outline-none"
      @click.self="closeStepModal"
      @keydown="handleModalKeydown"
      tabindex="-1"
    >
      <div
        ref="modalCardRef"
        class="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden border border-stone-200 p-5 space-y-4"
      >
        <div class="flex items-start justify-between gap-3 border-b border-stone-100 pb-3">
          <div>
            <h3 id="step-detail-title" class="text-base font-black text-stone-900">{{ selectedBlock.label }}</h3>
            <p v-if="selectedBlock.sublabel" class="text-xs text-stone-500 font-medium mt-0.5">{{ selectedBlock.sublabel }}</p>
          </div>
          <button
            ref="closeBtnRef"
            type="button"
            @click="closeStepModal"
            class="text-stone-400 hover:text-stone-700 text-lg font-bold p-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-600 rounded-lg transition-colors"
            aria-label="关闭工序详情对话框"
          >
            <AppIcon name="close" :size="19" />
          </button>
        </div>

        <div class="grid grid-cols-3 gap-2 text-xs">
          <div v-if="selectedBlock.heatLevel" class="bg-amber-50 p-2 rounded-lg border border-amber-200/80">
            <span class="block text-[10px] text-amber-700 font-semibold">火候</span>
            <span class="font-bold text-amber-950">{{ selectedBlock.heatLevel }}</span>
          </div>
          <div v-if="selectedBlock.durationMinutes" class="bg-stone-50 p-2 rounded-lg border border-stone-200">
            <span class="block text-[10px] text-stone-500 font-semibold">耗时</span>
            <span class="font-bold text-stone-800">{{ selectedBlock.durationMinutes }} 分钟</span>
          </div>
          <div v-if="selectedBlock.equipment" class="bg-stone-50 p-2 rounded-lg border border-stone-200">
            <span class="block text-[10px] text-stone-500 font-semibold">器具</span>
            <span class="font-bold text-stone-800">{{ selectedBlock.equipment }}</span>
          </div>
        </div>

        <div v-if="getBlockIngredients(selectedBlock).length > 0" class="space-y-1.5">
          <h4 class="text-xs font-bold text-stone-600">关联食材：</h4>
          <div class="flex flex-wrap gap-1.5">
            <span
              v-for="ing in getBlockIngredients(selectedBlock)"
              :key="ing.id"
              class="px-2 py-1 rounded-md bg-stone-100 text-xs text-stone-800 font-medium"
            >
              <strong v-if="formatIngredientBadge(ing).amount" class="text-emerald-700 font-bold mr-1">{{ formatIngredientBadge(ing).amount }}</strong>
              <span>{{ formatIngredientBadge(ing).name }}</span>
            </span>
          </div>
        </div>

        <div v-if="selectedBlock.completionState" class="space-y-1">
          <h4 class="text-xs font-bold text-emerald-900">达成准出状态：</h4>
          <p class="text-xs text-emerald-900 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 font-medium">
            {{ selectedBlock.completionState }}
          </p>
        </div>

        <div v-if="selectedBlock.outputItem" class="flex items-center gap-2 text-xs font-bold text-emerald-800">
          <span>产出半成品：</span>
          <span class="inline-flex items-center gap-1 bg-emerald-100 text-emerald-900 px-2.5 py-1 rounded-lg">{{ selectedBlock.outputItem }}<AppIcon name="arrow-right" :size="14" /></span>
        </div>

        <div v-if="selectedBlock.note || selectedBlock.notes" class="space-y-1">
          <h4 class="text-xs font-bold text-stone-700">工序说明与要点：</h4>
          <p class="text-xs text-stone-600 bg-stone-50 p-3 rounded-xl border border-stone-200/80 leading-relaxed whitespace-pre-line">
            {{ selectedBlock.note || selectedBlock.notes }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import type { VisualRecipeV3, V3ActionBlock, V3Ingredient } from '@/types/recipeV3'
import { canRenderArrangedTable, resolveLayoutMode } from '@/utils/continuousTableLayout'
import RecipeFlowCanvasV3 from './RecipeFlowCanvasV3.vue'
import RecipeFlowMobileV3 from './RecipeFlowMobileV3.vue'
import FlowCardGuideBanner from './FlowCardGuideBanner.vue'
import AppIcon from '@/components/common/AppIcon.vue'

const props = defineProps<{
  recipe: VisualRecipeV3
}>()

const route = useRoute()
const guideBannerRef = ref<InstanceType<typeof FlowCardGuideBanner> | null>(null)
const showFullModal = ref(false)
const isExporting = ref(false)
const selectedBlock = ref<V3ActionBlock | null>(null)
const showStepsList = ref(true)
const showDiagnosticReason = ref(false)

const userMode = ref<'auto' | 'table' | 'flow'>('auto')

// 支持从 URL 参数指定布局模式 (?layout=flow 或 ?layout=table)
if (route?.query?.layout === 'flow') {
  userMode.value = 'flow'
} else if (route?.query?.layout === 'table') {
  userMode.value = 'table'
}

watch(() => route?.query?.layout, (newVal) => {
  if (newVal === 'flow') userMode.value = 'flow'
  else if (newVal === 'table') userMode.value = 'table'
})

const canRenderStatus = computed(() => canRenderArrangedTable(props.recipe))
const activeLayoutMode = computed<'table' | 'flow'>(() => {
  return resolveLayoutMode(props.recipe, userMode.value)
})

const stepModalRef = ref<HTMLElement | null>(null)
const modalCardRef = ref<HTMLElement | null>(null)
const closeBtnRef = ref<HTMLButtonElement | null>(null)
let previousActiveElement: HTMLElement | null = null

function formatIngredientBadge(ing: V3Ingredient): { amount: string; name: string } {
  const name = (ing.name || '').trim()
  let amount = (ing.amountText || '').trim()
  if (amount && name && amount.includes(name)) {
    amount = amount.replace(name, '').trim()
  }
  return { amount, name }
}

function getBlockIngredients(block: V3ActionBlock) {
  const ids = new Set(block.ingredientIds || [])
  return (props.recipe.ingredients || []).filter(ing => ids.has(ing.id))
}

function triggerGuide() {
  guideBannerRef.value?.openGuide()
}

function closeStepModal() {
  selectedBlock.value = null
}

function handleModalKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    e.preventDefault()
    e.stopPropagation()
    closeStepModal()
    return
  }

  if (e.key === 'Tab' && modalCardRef.value) {
    const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    const focusables = Array.from(modalCardRef.value.querySelectorAll<HTMLElement>(focusableSelectors))
      .filter(el => !el.hasAttribute('disabled') && el.offsetParent !== null)
    if (focusables.length === 0) return

    const first = focusables[0]
    const last = focusables[focusables.length - 1]

    if (e.shiftKey) {
      if (document.activeElement === first || document.activeElement === stepModalRef.value) {
        e.preventDefault()
        last.focus()
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
  }
}

function onWindowKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    if (selectedBlock.value) {
      e.preventDefault()
      closeStepModal()
    } else if (showFullModal.value) {
      e.preventDefault()
      showFullModal.value = false
    }
  }
}

watch(selectedBlock, (newVal, oldVal) => {
  if (newVal && !oldVal) {
    previousActiveElement = document.activeElement as HTMLElement | null
    nextTick(() => {
      if (closeBtnRef.value) {
        closeBtnRef.value.focus()
      } else if (stepModalRef.value) {
        stepModalRef.value.focus()
      }
    })
  } else if (!newVal && oldVal) {
    nextTick(() => {
      previousActiveElement?.focus()
      previousActiveElement = null
    })
  }
})

onMounted(() => {
  window.addEventListener('keydown', onWindowKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onWindowKeydown)
})

async function handleExportPng() {
  if (isExporting.value) return
  isExporting.value = true
  try {
    const { exportFlowCardAsPng } = await import('@/utils/exportFlowCard')
    await exportFlowCardAsPng(props.recipe, undefined, 'full', activeLayoutMode.value)
  } catch (err: any) {
    alert(err.message || '导出高清 PNG 图卡失败')
  } finally {
    isExporting.value = false
  }
}
</script>
