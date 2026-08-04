<template>
  <div class="md:hidden space-y-5" aria-label="手机竖向烹饪流程">
    <div>
      <div>
        <p class="text-[10px] font-black tracking-[0.18em] text-emerald-800 uppercase">Cook Mode</p>
        <h3 class="text-base font-black text-stone-900 mt-0.5">纵向烹饪卡</h3>
        <p class="text-[11px] text-stone-500 mt-1">按页面顺序向下阅读；同组卡片可以并行处理</p>
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
            :style="{
              backgroundColor: getStageFill(stage.stageIndex),
              borderColor: getStageStroke(stage.stageIndex),
            }"
          >
            <span
              class="absolute inset-y-0 left-0 w-1"
              :style="{ backgroundColor: getStageAccent(stage.stageIndex) }"
            />

            <div class="flex items-start justify-between gap-3">
              <div class="min-w-0">
                <h4 class="text-[15px] font-black leading-snug text-stone-900">
                  {{ layoutBlock.block.label || '未命名工序' }}
                </h4>
                <p v-if="layoutBlock.block.sublabel" class="mt-0.5 text-[11px] font-medium text-stone-500">
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
                <span v-if="ingredient.amountText" class="font-black text-emerald-800">{{ ingredient.amountText }}</span>
                {{ ingredient.name }}
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

            <p v-if="layoutBlock.block.note" class="mt-3 rounded-xl bg-white/60 px-3 py-2 text-[11px] leading-relaxed text-stone-600">
              {{ layoutBlock.block.note }}
            </p>
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
          {{ getMethodIcon(recipe.finalBlock?.method) }}
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
import { buildV3MatrixLayout, type V3LayoutActionBlock } from '@/utils/matrixFlowLayout'
import { flowCardTheme } from '@/theme/flowCardTheme'

const props = defineProps<{ recipe: VisualRecipeV3 }>()

const layout = computed(() => buildV3MatrixLayout(props.recipe))
const ingredientById = computed(() => new Map(props.recipe.ingredients.map(item => [item.id, item])))

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
  const method = props.recipe.finalBlock?.method
  return method === 'raw' || method === 'serve'
})

const finalMeta = computed(() => {
  const finalBlock = props.recipe.finalBlock
  if (!finalBlock) return ''
  return [
    finalBlock.temperatureC ? `${finalBlock.temperatureC}°C` : '',
    finalBlock.temperatureF ? `${finalBlock.temperatureF}°F` : '',
    finalBlock.durationText || '',
  ].filter(Boolean).join(' · ')
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

function getMethodIcon(method?: string): string {
  switch (method) {
    case 'bake': return '♨️'
    case 'stew': return '🍲'
    case 'fry': return '🍳'
    case 'steam': return '💨'
    case 'serve':
    case 'raw': return '🥗'
    default: return '🍽️'
  }
}
</script>
