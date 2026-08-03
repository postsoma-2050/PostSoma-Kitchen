<template>
  <div class="v3-mini-canvas w-full h-36 bg-stone-50 rounded-lg overflow-hidden border border-stone-200 flex items-center justify-center p-2">
    <svg
      v-if="layout"
      :width="layout.canvasWidth"
      :height="layout.canvasHeight"
      :viewBox="`0 0 ${layout.canvasWidth} ${layout.canvasHeight}`"
      class="w-full h-full max-h-32 select-none font-sans"
      style="background-color: #FAF9F6;"
      preserveAspectRatio="xMidYMid meet"
    >
      <!-- 0. 最外层纸张底板 -->
      <rect
        x="16"
        y="16"
        :width="layout.canvasWidth - 32"
        :height="layout.canvasHeight - 32"
        fill="#FFFFFF"
        stroke="#15803D"
        stroke-width="2"
        rx="2"
      />

      <!-- 1. Header 极简线框 -->
      <rect
        v-if="layout.hasHeader"
        x="16"
        :y="layout.headerY"
        :width="layout.canvasWidth - 32"
        :height="layout.headerHeight"
        fill="#F0FDF4"
        stroke="#15803D"
        stroke-width="1"
      />

      <!-- 2. 食材行极简块 -->
      <g class="v3-mini-ingredients">
        <rect
          v-for="row in layout.ingredientRows"
          :key="`mini-ing-${row.ingredient.id}`"
          :x="row.x"
          :y="row.y"
          :width="row.w"
          :height="row.h"
          fill="#F9FAFB"
          stroke="#15803D"
          stroke-width="1"
        />
      </g>

      <!-- 3. 工序块极简块 (带有图标或简短文案) -->
      <g class="v3-mini-actions">
        <g
          v-for="layoutBlock in layout.actionBlockLayouts"
          :key="`mini-act-${layoutBlock.block.id}`"
          :transform="`translate(${layoutBlock.x}, ${layoutBlock.y})`"
        >
          <rect
            :width="layoutBlock.w"
            :height="layoutBlock.h"
            fill="#FEF2F2"
            stroke="#B91C1C"
            stroke-width="1.5"
            rx="1"
          />
          <text
            :x="layoutBlock.w / 2"
            :y="layoutBlock.h / 2"
            text-anchor="middle"
            dominant-baseline="central"
            font-size="11"
            font-weight="bold"
            fill="#991B1B"
          >
            {{ layoutBlock.block.label ? layoutBlock.block.label.substring(0, 4) : '工序' }}
          </text>
        </g>
      </g>

      <!-- 4. 最右侧终点块极简块 -->
      <g
        class="v3-mini-final"
        :transform="`translate(${layout.finalBlockLayout.x}, ${layout.finalBlockLayout.y})`"
      >
        <rect
          :width="layout.finalBlockLayout.w"
          :height="layout.finalBlockLayout.h"
          :fill="isColdFinal ? '#ECFDF5' : '#FFFBEB'"
          stroke="#15803D"
          stroke-width="1.5"
          rx="1"
        />
        <text
          :x="layout.finalBlockLayout.w / 2"
          :y="layout.finalBlockLayout.h / 2"
          text-anchor="middle"
          dominant-baseline="central"
          font-size="12"
          font-weight="bold"
          :fill="isColdFinal ? '#047857' : '#92400E'"
        >
          {{ layout.finalBlockLayout.finalBlock.label ? layout.finalBlockLayout.finalBlock.label.substring(0, 4) : '完成' }}
        </text>
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { VisualRecipeV3 } from '@/types/recipeV3'
import { buildV3MatrixLayout, type V3MatrixLayoutResult } from '@/utils/matrixFlowLayout'

const props = defineProps<{
  recipe: VisualRecipeV3
}>()

const layout = computed<V3MatrixLayoutResult>(() => {
  return buildV3MatrixLayout(props.recipe)
})

const isColdFinal = computed(() => {
  if (!props.recipe.finalBlock) return false
  const m = props.recipe.finalBlock.method
  return m === 'raw' || m === 'serve'
})
</script>
