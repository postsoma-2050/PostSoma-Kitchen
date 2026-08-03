<template>
  <div class="v3-canvas-wrapper w-full overflow-x-auto p-5 bg-[#FAF8F5] rounded-2xl border border-stone-200/80 shadow-md">
    <svg
      v-if="layout"
      :width="layout.canvasWidth"
      :height="layout.canvasHeight"
      :viewBox="`0 0 ${layout.canvasWidth} ${layout.canvasHeight}`"
      class="v3-matrix-svg select-none mx-auto block shrink-0 rounded-xl"
      :style="`background-color: ${theme.colors.canvasBg}; font-family: ${theme.typography.fontFamily}; min-width: max-content; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.03));`"
    >
      <defs>
        <marker
          id="v3-flow-arrow"
          viewBox="0 0 10 10"
          refX="6"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M 0 1 L 8 5 L 0 9 z" fill="#94A3B8" />
        </marker>
      </defs>

      <!-- 0. 最外层纸张底板 -->
      <rect
        x="16"
        y="16"
        :width="layout.canvasWidth - 32"
        :height="layout.canvasHeight - 32"
        :fill="theme.colors.paperBg"
        :stroke="theme.colors.paperStroke"
        :stroke-width="theme.strokes.paperWidth"
        :rx="theme.radii.card"
      />

      <!-- 1. Header 横栏 -->
      <g v-if="layout.hasHeader" class="v3-header-group">
        <g v-if="layout.hasContainer">
          <rect
            x="16"
            :y="layout.headerY"
            width="75"
            height="28"
            :fill="theme.colors.headerEquipmentFill"
            :stroke="theme.colors.paperStroke"
            :stroke-width="theme.strokes.blockWidth"
          />
          <text
            x="53.5"
            :y="layout.headerY + 18"
            text-anchor="middle"
            font-size="12"
            font-weight="900"
            :fill="theme.colors.headerEquipmentText"
          >
            设备
          </text>

          <rect
            x="91"
            :y="layout.headerY"
            :width="layout.canvasWidth - 107"
            height="28"
            :fill="theme.colors.headerEquipmentBodyFill"
            :stroke="theme.colors.paperStroke"
            :stroke-width="theme.strokes.blockWidth"
          />
          <text
            x="103"
            :y="layout.headerY + 18"
            font-size="12"
            font-weight="bold"
            :fill="theme.colors.headerEquipmentBodyText"
          >
            {{ recipe.prerequisites.containerSize }}
          </text>
        </g>

        <g v-if="layout.hasPreheat">
          <g :transform="`translate(0, ${layout.hasContainer ? 30 : 0})`">
            <rect
              x="16"
              :y="layout.headerY"
              width="75"
              height="28"
              :fill="theme.colors.headerPreheatFill"
              :stroke="theme.colors.paperStroke"
              :stroke-width="theme.strokes.blockWidth"
            />
            <text
              x="53.5"
              :y="layout.headerY + 18"
              text-anchor="middle"
              font-size="12"
              font-weight="900"
              :fill="theme.colors.headerPreheatText"
            >
              准备
            </text>

            <rect
              x="91"
              :y="layout.headerY"
              :width="layout.canvasWidth - 107"
              height="28"
              :fill="theme.colors.headerPreheatBodyFill"
              :stroke="theme.colors.paperStroke"
              :stroke-width="theme.strokes.blockWidth"
            />
            <text
              x="103"
              :y="layout.headerY + 18"
              font-size="12"
              font-weight="bold"
              :fill="theme.colors.headerPreheatBodyText"
            >
              {{ recipe.prerequisites.preheat }}
            </text>
          </g>
        </g>
      </g>

      <!-- 2. 网格背景线 -->
      <g class="v3-grid-lines">
        <line
          v-for="(line, idx) in layout.gridLines"
          :key="`gl-${idx}`"
          :x1="line.x1"
          :y1="line.y1"
          :x2="line.x2"
          :y2="line.y2"
          :stroke="theme.colors.gridLine"
          :stroke-width="theme.strokes.gridWidth"
          :stroke-dasharray="theme.strokes.dashArray"
        />
      </g>

      <!-- 3. 左侧食材行 (方向 3: 主料 vs 调料/辅料 分级视效) -->
      <g class="v3-ingredients-group">
        <g
          v-for="row in layout.ingredientRows"
          :key="row.ingredient.id"
          :transform="`translate(${row.x}, ${row.y})`"
        >
          <title>{{ getFullIngredientText(row.ingredient) }}</title>
          <rect
            :width="row.w"
            :height="row.h"
            :fill="row.ingredient.category === 'formula' || row.ingredient.formulaId ? '#FFFBEB' : theme.colors.ingredientFill"
            :stroke="row.ingredient.category === 'formula' || row.ingredient.formulaId ? '#FCD34D' : theme.colors.ingredientStroke"
            :stroke-width="theme.strokes.blockWidth"
            :rx="theme.radii.block"
          />

          <!-- 分级指示线: 复合配料为琥珀金，主料为深翡翠绿，辅料调料为柔和蓝灰 -->
          <rect
            x="0"
            y="0"
            width="3.5"
            :height="row.h"
            :fill="row.ingredient.category === 'formula' || row.ingredient.formulaId ? '#D97706' : (isMainIngredient(row.ingredient) ? theme.colors.ingredientMainAccent : theme.colors.ingredientSeasoningAccent)"
            :rx="2"
          />

          <text x="14" y="20" font-size="11.5" font-weight="600" :fill="isMainIngredient(row.ingredient) ? theme.colors.ingredientMainNameText : theme.colors.ingredientSeasoningNameText">
            <tspan :font-weight="isMainIngredient(row.ingredient) ? 'bold' : '600'" :fill="isMainIngredient(row.ingredient) ? theme.colors.ingredientMainAmountText : theme.colors.ingredientSeasoningAmountText" v-if="row.ingredient.amountText">
              {{ row.ingredient.category === 'formula' || row.ingredient.formulaId ? '🥣 ' : '' }}{{ row.ingredient.amountText }}
            </tspan>
            <tspan dx="6" :font-weight="isMainIngredient(row.ingredient) ? 'bold' : '500'" :fill="isMainIngredient(row.ingredient) ? theme.colors.ingredientMainNameText : theme.colors.ingredientSeasoningNameText">
              {{ getIngredientLine1(row.ingredient.name) }}
            </tspan>
            <tspan x="14" dy="16" font-size="10.5" :fill="theme.colors.ingredientSubText" v-if="getIngredientLine2(row.ingredient.name)">
              {{ getIngredientLine2(row.ingredient.name) }}
            </tspan>
          </text>
        </g>
      </g>

      <!-- 流程指示连接箭头 -->
      <g class="v3-flow-connectors">
        <g v-for="lb in layout.actionBlockLayouts" :key="`arrow-${lb.block.id}`">
          <line
            v-if="lb.computedColIndex < layout.numActionCols - 1"
            :x1="lb.x + lb.w + 0.5"
            :y1="lb.y + lb.h / 2"
            :x2="lb.x + lb.w + 2"
            :y2="lb.y + lb.h / 2"
            stroke="#94A3B8"
            stroke-width="1.5"
            marker-end="url(#v3-flow-arrow)"
          />
        </g>
      </g>

      <!-- 4. 中间矩阵工序块 -->
      <g class="v3-actions-group">
        <g
          v-for="layoutBlock in layout.actionBlockLayouts"
          :key="layoutBlock.block.id"
          :transform="`translate(${layoutBlock.x}, ${layoutBlock.y})`"
        >
          <title>{{ layoutBlock.block.label || '未命名工序' }}</title>

          <rect
            :width="layoutBlock.w"
            :height="layoutBlock.h"
            :fill="layoutBlock.isEmptyPlaceholder ? theme.colors.actionPlaceholderFill : theme.colors.actionFill"
            :stroke="theme.colors.actionStroke"
            :stroke-dasharray="layoutBlock.isEmptyPlaceholder ? theme.strokes.dashArray : 'none'"
            :stroke-width="theme.strokes.blockWidth"
            :rx="theme.radii.block"
          />

          <g :transform="`translate(${layoutBlock.w / 2}, ${layoutBlock.h / 2})`">
            <template v-if="!layoutBlock.isEmptyPlaceholder">
              <text text-anchor="middle" dominant-baseline="central">
                <!-- 主标题 -->
                <tspan
                  v-for="(line, lIdx) in layoutBlock.labelLines"
                  :key="`lbl-${lIdx}`"
                  x="0"
                  :dy="lIdx === 0 ? getFirstLineYOffset(layoutBlock) : '1.3em'"
                  font-size="13"
                  font-weight="bold"
                  :fill="theme.colors.actionLabelText"
                >
                  {{ lIdx === 0 ? `${getCircledNumber(layoutBlock.computedColIndex + 1)} ${line}` : line }}
                </tspan>

                <!-- 副标题 -->
                <tspan
                  v-for="(sLine, sIdx) in layoutBlock.sublabelLines"
                  :key="`sub-${sIdx}`"
                  x="0"
                  :dy="sIdx === 0 && layoutBlock.labelLines.length > 0 ? '1.4em' : '1.2em'"
                  font-size="11"
                  font-weight="500"
                  :fill="theme.colors.actionSublabelText"
                >
                  {{ sLine }}
                </tspan>

                <!-- 火候/时长 -->
                <tspan
                  v-if="layoutBlock.block.heatLevel || layoutBlock.block.durationMinutes"
                  x="0"
                  dy="1.4em"
                  font-size="10"
                  :fill="theme.colors.actionHeatText"
                >
                  {{ layoutBlock.block.heatLevel || '' }} {{ layoutBlock.block.durationMinutes ? `${layoutBlock.block.durationMinutes}m` : '' }}
                </tspan>
              </text>
            </template>

            <template v-else>
              <text
                text-anchor="middle"
                dominant-baseline="central"
                font-size="11"
                fill="#9CA3AF"
                y="0"
              >
                请选择相关食材
              </text>
            </template>
          </g>
        </g>
      </g>

      <!-- 5. 最右侧最终完成区 -->
      <g
        class="v3-final-group"
        :transform="`translate(${layout.finalBlockLayout.x}, ${layout.finalBlockLayout.y})`"
      >
        <title>{{ layout.finalBlockLayout.finalBlock.instructions || layout.finalBlockLayout.finalBlock.label }}</title>

        <rect
          :width="layout.finalBlockLayout.w"
          :height="layout.finalBlockLayout.h"
          :fill="layout.finalBlockLayout.isPlaceholder ? theme.colors.finalPlaceholderFill : (isColdFinal ? theme.colors.finalColdFill : theme.colors.finalBakeFill)"
          :stroke="layout.finalBlockLayout.isPlaceholder ? theme.colors.actionStroke : (isColdFinal ? theme.colors.finalColdStroke : theme.colors.finalBakeStroke)"
          :stroke-dasharray="layout.finalBlockLayout.isPlaceholder ? theme.strokes.dashArray : 'none'"
          :stroke-width="1.8"
          :rx="theme.radii.block"
        />

        <g :transform="`translate(${layout.finalBlockLayout.w / 2}, ${layout.finalBlockLayout.h / 2})`">
          <template v-if="layout.finalBlockLayout.isPlaceholder">
            <text
              text-anchor="middle"
              dominant-baseline="central"
              font-size="12"
              font-weight="bold"
              fill="#6B7280"
              y="-10"
            >
              完成方式待补充
            </text>
            <text
              text-anchor="middle"
              dominant-baseline="central"
              font-size="10"
              fill="#9CA3AF"
              y="12"
            >
              (设定最终烹饪或装盘)
            </text>
          </template>

          <template v-else>
            <circle
              cx="0"
              cy="-36"
              r="15"
              :fill="isColdFinal ? theme.colors.finalColdBadge : theme.colors.finalBakeBadge"
            />
            <text
              x="0"
              y="-35"
              text-anchor="middle"
              dominant-baseline="central"
              font-size="14"
              fill="#FFFFFF"
            >
              {{ getMethodIcon(recipe.finalBlock?.method) }}
            </text>

            <text
              text-anchor="middle"
              dominant-baseline="central"
              font-size="13.5"
              font-weight="bold"
              :fill="isColdFinal ? theme.colors.finalColdText : theme.colors.finalBakeText"
              y="-10"
            >
              {{ layout.finalBlockLayout.finalBlock.label }}
            </text>

            <text
              v-if="!isColdFinal && (layout.finalBlockLayout.finalBlock.temperatureF || layout.finalBlockLayout.finalBlock.temperatureC)"
              text-anchor="middle"
              dominant-baseline="central"
              font-size="11.5"
              font-weight="600"
              fill="#B45309"
              y="14"
            >
              {{ layout.finalBlockLayout.finalBlock.temperatureF ? `${layout.finalBlockLayout.finalBlock.temperatureF}°F` : '' }}
              {{ layout.finalBlockLayout.finalBlock.temperatureC ? `(${layout.finalBlockLayout.finalBlock.temperatureC}°C)` : '' }}
            </text>

            <text
              v-if="!isColdFinal && layout.finalBlockLayout.finalBlock.durationText"
              text-anchor="middle"
              dominant-baseline="central"
              font-size="10.5"
              font-weight="500"
              fill="#B45309"
              y="32"
            >
              {{ layout.finalBlockLayout.finalBlock.durationText }}
            </text>

            <text
              v-if="isColdFinal"
              text-anchor="middle"
              dominant-baseline="central"
              font-size="10.5"
              font-weight="500"
              fill="#059669"
              y="16"
            >
              免加热 / 拌匀即享
            </text>
          </template>
        </g>
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { VisualRecipeV3, V3Ingredient } from '@/types/recipeV3'
import { buildV3MatrixLayout, type V3MatrixLayoutResult, type V3LayoutActionBlock } from '@/utils/matrixFlowLayout'
import { flowCardTheme } from '@/theme/flowCardTheme'

const theme = flowCardTheme

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

/**
 * 判断是否为主料 (结合 category 字段与启发式算法兜底)
 */
function isMainIngredient(ing: V3Ingredient): boolean {
  if (ing.category === 'main') return true
  if (ing.category === 'seasoning') return false

  const name = ing.name || ''
  const mainKeywords = ['肉', '鸡', '鸭', '鱼', '虾', '牛', '羊', '排骨', '米', '面', '豆腐', '笋', '黄油', '土豆', '鳗', '鳝', 'butter', 'chicken', 'beef', 'pork']
  const isMatchName = mainKeywords.some(kw => name.toLowerCase().includes(kw))

  const amt = ing.amountText || ''
  const isLargeAmount = /[0-9]{2,}\s*(g|克|oz)/.test(amt) || /cup|磅|kg/.test(amt.toLowerCase())

  return isMatchName || isLargeAmount
}

function getCircledNumber(n: number): string {
  const circles = ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩']
  return circles[n - 1] || `${n}.`
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

function getFullIngredientText(ing: V3Ingredient): string {
  const amt = ing.amountText || ''
  return `${amt} ${ing.name}`.trim()
}

function getIngredientLine1(name: string): string {
  if (!name) return ''
  const parts = name.split(/\s(?=[\u4e00-\u9fa5])/)
  if (parts.length >= 2) {
    return parts[0]
  }
  return name
}

function getIngredientLine2(name: string): string {
  if (!name) return ''
  const parts = name.split(/\s(?=[\u4e00-\u9fa5])/)
  if (parts.length >= 2) {
    return parts.slice(1).join(' ')
  }
  return ''
}

function getFirstLineYOffset(block: V3LayoutActionBlock): string {
  const lCount = block.labelLines.length
  const sCount = block.sublabelLines.length
  const hasHeat = Boolean(block.block.heatLevel || block.block.durationMinutes)

  const totalLines = lCount + sCount + (hasHeat ? 1 : 0)
  if (totalLines <= 1) return '0em'
  
  const startOffset = -((totalLines - 1) * 0.6)
  return `${startOffset}em`
}
</script>

<style scoped>
.v3-matrix-svg text {
  font-family: inherit;
}
</style>
