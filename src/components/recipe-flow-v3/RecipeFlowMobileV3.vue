<template>
  <div class="md:hidden space-y-5" aria-label="手机竖向烹饪流程">
    <div>
      <div>
        <p class="text-[10px] font-black tracking-[0.18em] text-emerald-800 uppercase">Cook Mode</p>
        <h3 class="text-base font-black text-stone-900 mt-0.5">纵向烹饪卡</h3>
        <p class="text-[11px] text-stone-500 mt-1">按页面顺序向下阅读，并遵循工序的前置等待关系</p>
      </div>
    </div>

    <div
      v-if="recipe.prerequisites.containerSize || recipe.prerequisites.preheat"
      class="grid grid-cols-1 gap-2 rounded-2xl border border-stone-200 bg-stone-50/80 p-3"
    >
      <div v-if="recipe.prerequisites.containerSize" class="flex items-start gap-2 text-xs">
        <span class="mt-0.5 text-stone-400">器具</span>
        <span class="font-bold text-stone-800">{{ recipe.prerequisites.containerSize }}</span>
      </div>
      <div v-if="recipe.prerequisites.preheat" class="flex items-start gap-2 text-xs">
        <span class="mt-0.5 text-stone-400">准备</span>
        <span class="font-bold text-emerald-800">{{ recipe.prerequisites.preheat }}</span>
      </div>
    </div>

    <div class="space-y-5">
      <section v-for="stage in stageGroups" :key="stage.stageIndex" class="space-y-3">
        <div v-if="stage.blocks.length > 1" class="flex items-center justify-between gap-3">
          <p class="text-xs font-black text-stone-700">并行工序</p>
          <p class="text-[10px] font-medium text-stone-500">以下卡片可同时准备</p>
        </div>

        <div class="space-y-3">
          <article
            v-for="layoutBlock in stage.blocks"
            :key="layoutBlock.block.id"
            class="relative overflow-hidden rounded-2xl border p-4 shadow-sm"
            :aria-label="getDependencyLabels(layoutBlock).length ? `工序 ${layoutBlock.block.label || ''}，前序：${getDependencyLabels(layoutBlock).join('、')}` : undefined"
            :style="{
              backgroundColor: getStageFill(stage.stageIndex),
              borderColor: getStageStroke(stage.stageIndex),
            }"
          >
            <span
              class="absolute inset-y-0 left-0 w-1"
              :style="{ backgroundColor: getStageAccent(stage.stageIndex) }"
            />

            <div
              v-if="getCategorizedDependencies(layoutBlock).materials.length > 0 || getCategorizedDependencies(layoutBlock).orders.length > 0 || getCategorizedDependencies(layoutBlock).legacies.length > 0"
              class="mb-2.5 flex flex-wrap gap-1.5"
            >
              <div
                v-if="getCategorizedDependencies(layoutBlock).materials.length > 0"
                class="inline-flex items-center gap-1 rounded-md bg-emerald-100/90 px-2 py-0.5 text-[10px] font-bold text-emerald-800"
              >
                <span>承接物料：</span>
                <span>{{ getCategorizedDependencies(layoutBlock).materials.join('、') }}</span>
              </div>
              <div
                v-if="getCategorizedDependencies(layoutBlock).orders.length > 0"
                class="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700 border border-slate-200/80"
              >
                <span>等待前序：</span>
                <span>{{ getCategorizedDependencies(layoutBlock).orders.join('、') }}</span>
              </div>
              <div
                v-if="getCategorizedDependencies(layoutBlock).legacies.length > 0"
                class="inline-flex items-center gap-1 rounded-md bg-stone-100 px-2 py-0.5 text-[10px] font-bold text-stone-600"
              >
                <span>前序关联：</span>
                <span>{{ getCategorizedDependencies(layoutBlock).legacies.join('、') }}</span>
              </div>
            </div>

            <div class="flex items-start justify-between gap-3">
              <div class="min-w-0">
                <h4 class="text-[15px] font-black leading-snug text-stone-900">
                  {{ layoutBlock.block.label || '未命名工序' }}
                </h4>
                <p v-if="shouldRenderSublabel(recipe.cuisine, layoutBlock.block.sublabel)" class="mt-0.5 text-[11px] font-medium text-stone-500">
                  {{ layoutBlock.block.sublabel }}
                </p>
              </div>
              <span
                v-if="layoutBlock.block.durationMinutes"
                class="shrink-0 rounded-full bg-white/80 px-2 py-1 text-[11px] font-black text-amber-800 ring-1 ring-amber-200"
              >
                {{ layoutBlock.block.durationMinutes }} min
              </span>
            </div>

            <div v-if="getIngredients(layoutBlock).length > 0" class="mt-3 flex flex-wrap gap-1.5">
              <span
                v-for="ingredient in getIngredients(layoutBlock)"
                :key="ingredient.id"
                class="rounded-lg bg-white/75 px-2 py-1 text-[11px] font-semibold text-stone-700 ring-1 ring-stone-200/80"
              >
                <span v-if="formatIngredientRowDisplay(ingredient).amount" class="font-black text-emerald-800">{{ formatIngredientRowDisplay(ingredient).amount }}</span>
                {{ [formatIngredientRowDisplay(ingredient).nameLine1, formatIngredientRowDisplay(ingredient).nameLine2].filter(Boolean).join(' ') }}
              </span>
            </div>

            <div
              v-if="layoutBlock.block.heatLevel || layoutBlock.block.equipment"
              class="mt-3 grid grid-cols-1 gap-1.5 border-t border-stone-900/10 pt-3 text-[11px]"
            >
              <p v-if="layoutBlock.block.heatLevel" class="flex gap-2">
                <span class="text-stone-400">火候</span>
                <span class="font-bold text-amber-900">{{ layoutBlock.block.heatLevel }}</span>
              </p>
              <p v-if="layoutBlock.block.equipment" class="flex gap-2">
                <span class="text-stone-400">器具</span>
                <span class="font-bold text-stone-700">{{ layoutBlock.block.equipment }}</span>
              </p>
            </div>

            <p v-if="layoutBlock.block.note || layoutBlock.block.notes" class="mt-3 rounded-xl bg-white/60 px-3 py-2 text-[11px] leading-relaxed text-stone-600">
              {{ layoutBlock.block.note || layoutBlock.block.notes }}
            </p>

            <!-- 达成准出状态与产出半成品 -->
            <div v-if="layoutBlock.block.completionState" class="mt-2.5 rounded-lg bg-emerald-50/90 border border-emerald-200/80 px-2.5 py-1.5 text-[11px] text-emerald-950">
              <span class="font-bold text-emerald-800">达成状态：</span>
              <span>{{ layoutBlock.block.completionState }}</span>
            </div>
            <div v-if="layoutBlock.block.outputItem" class="mt-1.5 flex items-center gap-1 text-[11px] font-bold text-emerald-800">
              <span class="inline-flex items-center gap-1"><AppIcon name="arrow-right" :size="14" />产出半成品：</span>
              <span class="bg-emerald-100/90 px-2 py-0.5 rounded text-emerald-900">{{ layoutBlock.block.outputItem }}</span>
            </div>
          </article>
        </div>
      </section>
    </div>

    <div
      class="relative overflow-hidden rounded-2xl border-2 p-5 shadow-sm"
      :class="isColdFinal ? 'border-emerald-300 bg-emerald-50' : 'border-amber-300 bg-amber-50'"
    >
      <div class="flex items-center gap-3">
        <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-xl shadow-sm">
          <AppIcon :name="getMethodIconName(recipe.finalBlock?.method)" :size="24" />
        </span>
        <div class="min-w-0">
          <p class="text-[10px] font-black uppercase tracking-[0.16em]" :class="isColdFinal ? 'text-emerald-700' : 'text-amber-700'">
            Finish
          </p>
          <h4 class="text-base font-black text-stone-900">
            {{ recipe.finalBlock?.label || '完成方式待补充' }}
          </h4>
        </div>
      </div>
      <p v-if="finalMeta" class="mt-3 text-xs font-bold" :class="isColdFinal ? 'text-emerald-800' : 'text-amber-900'">
        {{ finalMeta }}
      </p>
      <p v-if="recipe.finalBlock?.instructions" class="mt-2 text-xs leading-relaxed text-stone-700">
        {{ recipe.finalBlock.instructions }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { VisualRecipeV3, V3Ingredient } from '@/types/recipeV3'
import {
  buildV3MatrixLayout,
  type V3LayoutActionBlock,
  isColdFinalBlock,
  getFinalServingInstructions,
  shouldRenderSublabel,
  formatIngredientRowDisplay,
} from '@/utils/matrixFlowLayout'
import { flowCardTheme } from '@/theme/flowCardTheme'
import AppIcon from '@/components/common/AppIcon.vue'
import type { AppIconName } from '@/types/icon'

const props = defineProps<{ recipe: VisualRecipeV3 }>()

const layout = computed(() => buildV3MatrixLayout(props.recipe))
const ingredientById = computed(() => new Map(props.recipe.ingredients.map(item => [item.id, item])))
const actionBlockMap = computed(() => new Map(props.recipe.actionBlocks.map(item => [item.id, item])))

function getCategorizedDependencies(layoutBlock: V3LayoutActionBlock): {
  materials: string[]
  orders: string[]
  legacies: string[]
} {
  const materials: string[] = []
  const orders: string[] = []
  const legacies: string[] = []
  const block = layoutBlock.block

  if (block.dependencies && block.dependencies.length > 0) {
    for (const dep of block.dependencies) {
      const srcBlock = actionBlockMap.value.get(dep.sourceBlockId)
      const text = dep.label || srcBlock?.label
      if (!text) continue
      if (dep.type === 'material') materials.push(text)
      else if (dep.type === 'order') orders.push(text)
      else legacies.push(text)
    }
  } else {
    for (const id of block.afterBlockIds || []) {
      const label = actionBlockMap.value.get(id)?.label
      if (label) orders.push(label)
    }
    for (const id of block.inputBlockIds || []) {
      const label = actionBlockMap.value.get(id)?.label
      if (label && !orders.includes(label)) legacies.push(label)
    }
  }

  return { materials, orders, legacies }
}

function getDependencyLabels(layoutBlock: V3LayoutActionBlock): string[] {
  const cat = getCategorizedDependencies(layoutBlock)
  return [...cat.materials, ...cat.orders, ...cat.legacies]
}

const stageGroups = computed(() => {
  const groups = new Map<number, V3LayoutActionBlock[]>()
  layout.value.actionBlockLayouts.forEach(block => {
    const current = groups.get(block.computedColIndex) || []
    current.push(block)
    groups.set(block.computedColIndex, current)
  })
  return [...groups.entries()]
    .sort(([left], [right]) => left - right)
    .map(([stageIndex, blocks]) => ({
      stageIndex,
      blocks: [...blocks].sort((left, right) => left.computedStartRow - right.computedStartRow),
    }))
})

const isColdFinal = computed(() => {
  return isColdFinalBlock(props.recipe)
})

const finalMeta = computed(() => {
  const finalBlock = props.recipe.finalBlock
  if (!finalBlock) return ''
  const items = [
    finalBlock.temperatureC ? `${finalBlock.temperatureC}°C` : '',
    finalBlock.temperatureF ? `${finalBlock.temperatureF}°F` : '',
    finalBlock.durationText || '',
  ].filter(Boolean)
  if (items.length > 0) return items.join(' · ')
  return getFinalServingInstructions(props.recipe)
})

function getStageToken(tokens: readonly string[], stageIndex: number): string {
  return tokens[stageIndex % tokens.length]
}

function getStageFill(stageIndex: number): string {
  return getStageToken(flowCardTheme.colors.actionStageFills, stageIndex)
}

function getStageStroke(stageIndex: number): string {
  return getStageToken(flowCardTheme.colors.actionStageStrokes, stageIndex)
}

function getStageAccent(stageIndex: number): string {
  return getStageToken(flowCardTheme.colors.actionStageAccents, stageIndex)
}

function getIngredients(layoutBlock: V3LayoutActionBlock): V3Ingredient[] {
  return (layoutBlock.block.ingredientIds || [])
    .map(id => ingredientById.value.get(id))
    .filter((ingredient): ingredient is V3Ingredient => Boolean(ingredient))
}

function getMethodIconName(method?: string): AppIconName {
  switch (method) {
    case 'bake': return 'cake'
    case 'stew': return 'bowl'
    case 'fry': return 'fire'
    case 'steam': return 'steam'
    case 'raw': return 'leaf'
    case 'serve': return isColdFinal.value ? 'leaf' : 'restaurant'
    default: return 'restaurant'
  }
}
</script>
