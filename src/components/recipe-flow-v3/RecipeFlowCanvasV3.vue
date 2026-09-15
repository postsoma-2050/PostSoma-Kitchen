<template>
  <div class="v3-canvas-wrapper w-full overflow-x-auto p-3 sm:p-5 bg-[#FAF8F5] rounded-2xl border border-stone-200/80 shadow-xs">
    <!-- 1. 连续工序表模式 (Continuous Process Table: 矩阵合并、网格自然连续、无冗余引脚连线) -->
    <svg
      v-if="effectiveMode === 'table' && tableLayout"
      :width="tableLayout.canvasWidth"
      :height="tableLayout.canvasHeight"
      :viewBox="`0 0 ${tableLayout.canvasWidth} ${tableLayout.canvasHeight}`"
      class="v3-matrix-svg select-none mx-auto block shrink-0 rounded-xl"
      :style="`background-color: ${theme.colors.canvasBg}; font-family: ${theme.typography.fontFamily}; min-width: max-content;`"
    >
      <!-- 0. 外围边框 (建筑感中性色实线，严整无重叠) -->
      <rect
        :x="tableLayout.outerRect.x"
        :y="tableLayout.outerRect.y"
        :width="tableLayout.outerRect.w"
        :height="tableLayout.outerRect.h"
        fill="#FFFFFF"
        stroke="#CBD5E1"
        stroke-width="1.5"
      />

      <!-- 1. Header 横栏 (容器大小与预热等前置处理) -->
      <g v-if="tableLayout.header.hasHeader" class="v3-table-header-group">
        <!-- 左侧：材料 表头 -->
        <rect
          :x="tableLayout.outerRect.x"
          :y="tableLayout.header.headerY"
          :width="tableLayout.ingredientColWidth"
          :height="tableLayout.header.headerHeight"
          fill="#F8FAFC"
          stroke="#CBD5E1"
          stroke-width="1.2"
        />
        <text
          :x="tableLayout.outerRect.x + tableLayout.ingredientColWidth / 2"
          :y="tableLayout.header.headerY + tableLayout.header.headerHeight / 2"
          text-anchor="middle"
          dominant-baseline="central"
          font-size="13.5"
          font-weight="700"
          fill="#334155"
        >
          材料
        </text>

        <!-- 右侧：容器大小 -->
        <g v-if="tableLayout.header.hasContainer">
          <rect
            :x="tableLayout.outerRect.x + tableLayout.ingredientColWidth"
            :y="tableLayout.header.headerY"
            :width="tableLayout.outerRect.w - tableLayout.ingredientColWidth"
            height="28"
            fill="#FFFFFF"
            stroke="#CBD5E1"
            stroke-width="1.2"
          />
          <text
            :x="tableLayout.outerRect.x + tableLayout.ingredientColWidth + 14"
            :y="tableLayout.header.headerY + 14"
            dominant-baseline="central"
            font-size="12"
            font-weight="600"
            fill="#0F172A"
          >
            {{ tableLayout.header.containerText }}
          </text>
          <text
            :x="tableLayout.outerRect.x + tableLayout.outerRect.w - 14"
            :y="tableLayout.header.headerY + 14"
            text-anchor="end"
            dominant-baseline="central"
            font-size="11"
            font-weight="700"
            fill="#0F766E"
          >
            容器大小
          </text>
        </g>

        <!-- 右侧：预热等预备处理 -->
        <g v-if="tableLayout.header.hasPreheat">
          <rect
            :x="tableLayout.outerRect.x + tableLayout.ingredientColWidth"
            :y="tableLayout.header.headerY + (tableLayout.header.hasContainer ? 28 : 0)"
            :width="tableLayout.outerRect.w - tableLayout.ingredientColWidth"
            height="28"
            fill="#FFFFFF"
            stroke="#CBD5E1"
            stroke-width="1.2"
          />
          <text
            :x="tableLayout.outerRect.x + tableLayout.ingredientColWidth + 14"
            :y="tableLayout.header.headerY + (tableLayout.header.hasContainer ? 28 : 0) + 14"
            dominant-baseline="central"
            font-size="12"
            font-weight="600"
            fill="#0F172A"
          >
            {{ tableLayout.header.preheatText }}
          </text>
          <text
            :x="tableLayout.outerRect.x + tableLayout.outerRect.w - 14"
            :y="tableLayout.header.headerY + (tableLayout.header.hasContainer ? 28 : 0) + 14"
            text-anchor="end"
            dominant-baseline="central"
            font-size="11"
            font-weight="700"
            fill="#B45309"
          >
            预热等预备处理
          </text>
        </g>
      </g>

      <!-- 2. 等待通道 (Waiting Lanes: 食材未加入阶段的横向延续行，终点附微小汇入圆点) -->
      <g class="v3-table-waiting-lanes">
        <g v-for="(lane, idx) in tableLayout.waitingLanes" :key="`lane-${idx}`">
          <rect
            :x="lane.x"
            :y="lane.y"
            :width="lane.w"
            :height="lane.h"
            fill="#F8FAFC"
            fill-opacity="0.85"
          />
        </g>
      </g>

      <!-- 3. 暂存备用走廊 (Hold-Aside Bridges, 例如 cn-59 暂存牛肉跨过芹菜列回锅) -->
      <g v-if="tableLayout.holdAsideBridges.length > 0" class="v3-table-bridges">
        <g v-for="bridge in tableLayout.holdAsideBridges" :key="bridge.id">
          <rect
            :x="bridge.x"
            :y="bridge.y"
            :width="bridge.w"
            :height="bridge.h"
            fill="#F0FDF4"
            fill-opacity="0.85"
            stroke="#059669"
            stroke-width="1.5"
            stroke-dasharray="5 3"
          />
          <text
            :x="bridge.x + bridge.w / 2"
            :y="bridge.y + bridge.h / 2"
            text-anchor="middle"
            dominant-baseline="central"
            font-size="11"
            font-weight="bold"
            fill="#059669"
          >
            {{ bridge.label }}
          </text>
        </g>
      </g>

      <!-- 4. 单次渲染网格线 (Single-pass Grid Lines: 合并区域内部横线彻底终止，建筑感细线) -->
      <g class="v3-table-grid-lines">
        <line
          v-for="(hl, idx) in tableLayout.horizontalLines"
          :key="`hl-${idx}`"
          :x1="hl.x1"
          :y1="hl.y1"
          :x2="hl.x2"
          :y2="hl.y2"
          stroke="#E2E8F0"
          stroke-width="1.2"
        />
        <line
          v-for="(vl, idx) in tableLayout.verticalLines"
          :key="`vl-${idx}`"
          :x1="vl.x1"
          :y1="vl.y1"
          :x2="vl.x2"
          :y2="vl.y2"
          stroke="#E2E8F0"
          stroke-width="1.2"
        />
      </g>

      <!-- 5. 原料单元格文字 (整洁表格单元格，用量深绿加粗，名称与预备说明区分) -->
      <g class="v3-table-ingredient-cells">
        <g
          v-for="cell in tableLayout.ingredientCells"
          :key="`ing-${cell.ingredient.id}`"
          :transform="`translate(${cell.x}, ${cell.y})`"
        >
          <title>{{ cell.amountText }} {{ cell.nameText }} {{ cell.prepText || '' }}</title>
          <text :x="14" :y="cell.h / 2" dominant-baseline="central" font-size="12" font-weight="500" fill="#0F172A">
            <tspan v-if="cell.amountText" font-weight="700" fill="#047857">{{ cell.amountText }}</tspan>
            <tspan :dx="cell.amountText ? '8' : '0'" font-weight="600" fill="#0F172A">{{ cell.nameText }}</tspan>
            <tspan v-if="cell.prepText" dx="6" font-size="11" font-weight="normal" fill="#64748B">{{ cell.prepText }}</tspan>
          </text>
        </g>
      </g>

      <!-- 6. 工序合并单元格文字与交互 (动词深黑突出，英文副标弱化，火候暖色沉稳，语义事实层级分明) -->
      <g class="v3-table-process-cells">
        <g
          v-for="pCell in tableLayout.processCells"
          :key="`process-${pCell.id}`"
          :transform="`translate(${pCell.x}, ${pCell.y})`"
          class="cursor-pointer transition-opacity hover:opacity-90 focus:outline-none"
          tabindex="0"
          role="button"
          :aria-label="getProcessCellTooltip(pCell)"
          @click="onProcessCellClick(pCell)"
          @keydown.enter="onProcessCellClick(pCell)"
          @keydown.space.prevent="onProcessCellClick(pCell)"
        >
          <title>{{ getProcessCellTooltip(pCell) }}（点击查看详细操作步骤）</title>

          <!-- 半透明触发区域，捕获整格点击与 hover -->
          <rect
            :width="pCell.w"
            :height="pCell.h"
            fill="transparent"
            class="hover:fill-slate-100/40"
          />

          <g :transform="`translate(${pCell.w / 2}, ${pCell.h / 2})`">
            <template v-if="pCell.isFinalBlock">
              <!-- 成品完成动作主标题 (翡翠深绿加粗突出，操作优先) -->
              <text
                text-anchor="middle"
                dominant-baseline="central"
                font-size="14"
                font-weight="800"
                fill="#065F46"
                :y="pCell.durationText ? -16 : 0"
              >
                {{ pCell.label }}
              </text>
              <text
                v-if="pCell.durationText"
                text-anchor="middle"
                dominant-baseline="central"
                font-size="11"
                font-weight="700"
                fill="#047857"
                y="6"
              >
                {{ pCell.durationText }}
              </text>
            </template>

            <template v-else>
              <text text-anchor="middle" dominant-baseline="central">
                <!-- 1. 中文烹饪动词 (最突出，深色清晰) -->
                <tspan
                  v-for="(line, lIdx) in pCell.labelLines"
                  :key="`tbl-lbl-${lIdx}`"
                  x="0"
                  :dy="lIdx === 0 ? getProcessFirstLineDy(pCell) : '1.3em'"
                  font-size="13.5"
                  font-weight="800"
                  fill="#0F172A"
                >
                  {{ line }}
                </tspan>

                <!-- 2. 英文副标题 (常规字重，弱化层级) -->
                <tspan
                  v-for="(sLine, sIdx) in pCell.sublabelLines"
                  :key="`tbl-sub-${sIdx}`"
                  x="0"
                  :dy="sIdx === 0 && pCell.labelLines.length > 0 ? '1.3em' : '1.1em'"
                  font-size="10.5"
                  font-weight="500"
                  fill="#64748B"
                >
                  {{ sLine }}
                </tspan>

                <!-- 3. 火候、耗时与器具 (暖色沉稳) -->
                <tspan
                  v-if="pCell.heatLevel || pCell.durationText || pCell.equipment"
                  x="0"
                  dy="1.3em"
                  font-size="10"
                  font-weight="700"
                  fill="#B45309"
                >
                  {{ pCell.heatLevel ? `${pCell.heatLevel} ` : '' }}{{ pCell.durationText ? `${pCell.durationText} ` : '' }}{{ pCell.equipment ? `· ${pCell.equipment}` : '' }}
                </tspan>

                <!-- 4. 关键流程标记：暂存备用 -->
                <tspan
                  v-if="pCell.holdAsideLabel"
                  x="0"
                  dy="1.3em"
                  font-size="9.5"
                  font-weight="bold"
                  fill="#059669"
                >
                  {{ pCell.holdAsideLabel }}
                </tspan>
              </text>
            </template>
          </g>
        </g>
      </g>
    </svg>

    <!-- 2. 分支流程图模式 (Branching Flow: 针对非连续跳行汇聚与复杂多产物结构的安全回退) -->
    <svg
      v-else-if="effectiveMode === 'flow' && flowLayout"
      :width="flowLayout.canvasWidth"
      :height="flowLayout.canvasHeight"
      :viewBox="`0 0 ${flowLayout.canvasWidth} ${flowLayout.canvasHeight}`"
      class="v3-matrix-svg select-none mx-auto block shrink-0 rounded-xl"
      :style="`background-color: ${theme.colors.canvasBg}; font-family: ${theme.typography.fontFamily}; min-width: max-content;`"
    >
      <!-- 0. 箭头 Marker (多实例 scoped ID 杜绝冲突) -->
      <defs>
        <marker
          :id="`flow-arrow-material-${markerSuffix}`"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto"
        >
          <path d="M 0 1 L 9 5 L 0 9 z" fill="#059669" />
        </marker>
        <marker
          :id="`flow-arrow-order-${markerSuffix}`"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto"
        >
          <path d="M 0 1 L 9 5 L 0 9 z" fill="#64748B" />
        </marker>
      </defs>

      <!-- 0. 外围边框 (统一中性建筑感实线) -->
      <rect
        x="16"
        y="16"
        :width="flowLayout.canvasWidth - 32"
        :height="flowLayout.canvasHeight - 32"
        fill="#FFFFFF"
        stroke="#CBD5E1"
        stroke-width="1.5"
      />

      <!-- 1. Header 横栏 -->
      <g v-if="flowLayout.hasHeader" class="v3-header-group">
        <rect
          x="16"
          :y="flowLayout.headerY"
          width="320"
          :height="flowLayout.headerHeight"
          fill="#F8FAFC"
          stroke="#CBD5E1"
          stroke-width="1.2"
        />
        <text
          x="176"
          :y="flowLayout.headerY + flowLayout.headerHeight / 2"
          text-anchor="middle"
          dominant-baseline="central"
          font-size="13.5"
          font-weight="700"
          fill="#334155"
        >
          材料
        </text>

        <g v-if="flowLayout.hasContainer">
          <rect
            x="336"
            :y="flowLayout.headerY"
            :width="flowLayout.canvasWidth - 352"
            height="28"
            fill="#FFFFFF"
            stroke="#CBD5E1"
            stroke-width="1.2"
          />
          <text
            x="348"
            :y="flowLayout.headerY + 14"
            dominant-baseline="central"
            font-size="12"
            font-weight="600"
            fill="#0F172A"
          >
            {{ recipe.prerequisites.containerSize }}
          </text>
          <text
            :x="flowLayout.canvasWidth - 28"
            :y="flowLayout.headerY + 14"
            text-anchor="end"
            dominant-baseline="central"
            font-size="11"
            font-weight="700"
            fill="#0F766E"
          >
            容器大小
          </text>
        </g>

        <g v-if="flowLayout.hasPreheat">
          <rect
            x="336"
            :y="flowLayout.headerY + (flowLayout.hasContainer ? 28 : 0)"
            :width="flowLayout.canvasWidth - 352"
            height="28"
            fill="#FFFFFF"
            stroke="#CBD5E1"
            stroke-width="1.2"
          />
          <text
            x="348"
            :y="flowLayout.headerY + (flowLayout.hasContainer ? 28 : 0) + 14"
            dominant-baseline="central"
            font-size="12"
            font-weight="600"
            fill="#0F172A"
          >
            {{ recipe.prerequisites.preheat }}
          </text>
          <text
            :x="flowLayout.canvasWidth - 28"
            :y="flowLayout.headerY + (flowLayout.hasContainer ? 28 : 0) + 14"
            text-anchor="end"
            dominant-baseline="central"
            font-size="11"
            font-weight="700"
            fill="#B45309"
          >
            预热等预备处理
          </text>
        </g>
      </g>

      <!-- 2. 食材行 -->
      <g class="v3-ingredients-group">
        <g
          v-for="row in flowLayout.ingredientRows"
          :key="row.ingredient.id"
          :transform="`translate(${row.x}, ${row.y})`"
        >
          <title>{{ getFullIngredientText(row.ingredient) }}</title>
          <rect
            :width="row.w"
            :height="row.h"
            fill="#FFFFFF"
            stroke="#E2E8F0"
            stroke-width="1.2"
          />
          <text x="14" :y="row.h / 2" dominant-baseline="central" font-size="12" font-weight="500" fill="#0F172A">
            <tspan font-weight="700" fill="#047857" v-if="formatIngredientRowDisplay(row.ingredient).amount">
              {{ formatIngredientRowDisplay(row.ingredient).amount }}
            </tspan>
            <tspan :dx="formatIngredientRowDisplay(row.ingredient).amount ? '8' : '0'" font-weight="600" fill="#0F172A">
              {{ formatIngredientRowDisplay(row.ingredient).nameLine1 }} {{ formatIngredientRowDisplay(row.ingredient).nameLine2 }}
            </tspan>
          </text>
        </g>
      </g>

      <!-- 2.4 食材未加工阶段等待路径 (Waiting Paths: 虚线延伸至实际工序，遇中间卡片避障绕行，终点微小圆点) -->
      <g v-if="flowLayout.ingredientWaitingPaths && flowLayout.ingredientWaitingPaths.length > 0" class="v3-flow-waiting-paths">
        <g v-for="wp in flowLayout.ingredientWaitingPaths" :key="wp.id">
          <path
            v-if="wp.pathD"
            :d="wp.pathD"
            fill="none"
            stroke="#CBD5E1"
            stroke-width="1.3"
            stroke-dasharray="3 3"
          />
          <line
            v-else
            :x1="wp.startX"
            :y1="wp.startY"
            :x2="wp.endX"
            :y2="wp.startY"
            stroke="#CBD5E1"
            stroke-width="1.3"
            stroke-dasharray="3 3"
          />
          <circle
            :cx="wp.endX - 3"
            :cy="wp.startY"
            r="2"
            fill="#94A3B8"
          />
        </g>
      </g>

      <!-- 2.5 显式工序依赖分支连接线 -->
      <g v-if="explicitConnectors.length > 0" class="v3-flow-connectors">
        <g v-for="conn in explicitConnectors" :key="conn.id">
          <title>{{ conn.label || (conn.isOrder ? '等待前序工序完成' : (conn.isMaterial ? '物料流动' : '前序工序关联')) }}</title>
          <path
            :d="conn.pathD"
            fill="none"
            :stroke="conn.isOrder ? '#64748B' : (conn.type === 'legacy' ? '#94A3B8' : '#059669')"
            :stroke-dasharray="conn.isOrder ? '5 4' : (conn.type === 'legacy' ? '4 3' : undefined)"
            stroke-width="1.8"
            :marker-end="conn.isOrder ? `url(#flow-arrow-order-${markerSuffix})` : `url(#flow-arrow-material-${markerSuffix})`"
          />
          <!-- 连线中心语义标签 (如 暂存牛肉、物料流动) -->
          <g v-if="conn.label && conn.midPoint" :transform="`translate(${conn.midPoint.x}, ${conn.midPoint.y})`">
            <rect
              :x="-measureTextWidth(conn.label, 9, true) / 2 - 4"
              :y="-9"
              :width="measureTextWidth(conn.label, 9, true) + 8"
              height="18"
              rx="4"
              fill="#FFFFFF"
              :stroke="conn.isOrder ? '#94A3B8' : '#059669'"
              stroke-width="1"
            />
            <text
              text-anchor="middle"
              dominant-baseline="central"
              font-size="9"
              font-weight="bold"
              :fill="conn.isOrder ? '#475569' : '#047857'"
            >
              {{ conn.label }}
            </text>
          </g>
        </g>
      </g>

      <!-- 3. 工序卡片 -->
      <g class="v3-actions-group">
        <g
          v-for="layoutBlock in flowLayout.actionBlockLayouts"
          :key="layoutBlock.block.id"
          :transform="`translate(${layoutBlock.x}, ${layoutBlock.y})`"
          class="cursor-pointer transition-opacity hover:opacity-90 focus:outline-none"
          tabindex="0"
          role="button"
          :aria-label="getActionTooltip(layoutBlock)"
          @click="emit('select-block', layoutBlock.block)"
          @keydown.enter="emit('select-block', layoutBlock.block)"
          @keydown.space.prevent="emit('select-block', layoutBlock.block)"
        >
          <title>{{ getActionTooltip(layoutBlock) }}（点击查看详细操作步骤）</title>
          <rect
            :width="layoutBlock.w"
            :height="layoutBlock.h"
            fill="#FFFFFF"
            stroke="#E2E8F0"
            stroke-width="1.2"
          />
          <g :transform="`translate(${layoutBlock.w / 2}, ${layoutBlock.h / 2})`">
            <template v-if="!layoutBlock.isEmptyPlaceholder">
              <text text-anchor="middle" dominant-baseline="central">
                <tspan
                  v-for="(line, lIdx) in layoutBlock.labelLines"
                  :key="`lbl-${lIdx}`"
                  x="0"
                  :dy="lIdx === 0 ? getFirstLineYOffset(layoutBlock) : '1.3em'"
                  font-size="13.5"
                  font-weight="800"
                  fill="#0F172A"
                >
                  {{ line }}
                </tspan>
                <tspan
                  v-for="(sLine, sIdx) in layoutBlock.sublabelLines"
                  :key="`sub-${sIdx}`"
                  x="0"
                  :dy="sIdx === 0 && layoutBlock.labelLines.length > 0 ? '1.3em' : '1.1em'"
                  font-size="10.5"
                  font-weight="500"
                  fill="#64748B"
                >
                  {{ sLine }}
                </tspan>
                <tspan
                  v-if="layoutBlock.block.heatLevel || layoutBlock.block.durationMinutes"
                  x="0"
                  dy="1.35em"
                  font-size="10"
                  font-weight="700"
                  fill="#B45309"
                >
                  {{ layoutBlock.block.heatLevel ? `${layoutBlock.block.heatLevel} ` : '' }}{{ layoutBlock.block.durationMinutes ? `${layoutBlock.block.durationMinutes}m` : '' }}
                </tspan>
                <tspan
                  v-for="(equipmentLine, equipmentIndex) in layoutBlock.equipmentLines"
                  :key="`equipment-${equipmentIndex}`"
                  x="0"
                  dy="1.25em"
                  font-size="9.5"
                  fill="#64748B"
                >
                  {{ equipmentLine }}
                </tspan>
              </text>
            </template>
            <template v-else>
              <text text-anchor="middle" dominant-baseline="central" font-size="11" fill="#9CA3AF" y="0">
                请选择相关食材
              </text>
            </template>
          </g>
        </g>
      </g>

      <!-- 3.5 食材接入引线、锚点与聚成分段导轨 (置于卡片上方，清晰呈现且不跨中间未参与行) -->
      <g class="v3-intake-rails pointer-events-none">
        <!-- 连续两行及以上的聚合导轨段 -->
        <line
          v-for="rail in flowLayout.intakeRailSegments"
          :key="rail.id"
          :x1="rail.x"
          :y1="rail.startY"
          :x2="rail.x"
          :y2="rail.endY"
          stroke="#059669"
          stroke-width="2.5"
          stroke-linecap="round"
        />
        <!-- 实际参与行的接入引线与精准锚点 -->
        <g v-for="feed in flowLayout.ingredientIntakeFeeds" :key="feed.id">
          <line
            :x1="feed.feedStartX"
            :y1="feed.pinY"
            :x2="feed.pinX"
            :y2="feed.pinY"
            stroke="#059669"
            stroke-width="2"
          />
          <circle
            :cx="feed.pinX"
            :cy="feed.pinY"
            r="3"
            fill="#059669"
          />
        </g>
      </g>

      <!-- 4. 最终完成区 -->
      <g
        class="v3-final-group"
        :transform="`translate(${flowLayout.finalBlockLayout.x}, ${flowLayout.finalBlockLayout.y})`"
      >
        <title>{{ flowLayout.finalBlockLayout.finalBlock.instructions || flowLayout.finalBlockLayout.finalBlock.label }}</title>
        <rect
          :width="flowLayout.finalBlockLayout.w"
          :height="flowLayout.finalBlockLayout.h"
          fill="#FFFFFF"
          stroke="#CBD5E1"
          stroke-width="1.2"
        />
        <g :transform="`translate(${flowLayout.finalBlockLayout.w / 2}, ${flowLayout.finalBlockLayout.h / 2})`">
          <template v-if="flowLayout.finalBlockLayout.isPlaceholder">
            <text text-anchor="middle" dominant-baseline="central" font-size="13" font-weight="bold" fill="#6B7280" y="-10">
              完成方式待补充
            </text>
          </template>
          <template v-else>
            <text x="0" y="-18" text-anchor="middle" dominant-baseline="central" font-size="14" font-weight="800" fill="#065F46">
              {{ flowLayout?.finalBlockLayout?.finalBlock?.label }}
            </text>
            <text text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="700" fill="#047857" y="6">
              {{ flowLayout?.finalBlockLayout?.finalBlock?.durationText || getFinalServingInstructions(recipe) }}
            </text>
            <text
              v-if="flowLayout?.finalBlockLayout?.instructionLines?.length"
              text-anchor="middle"
              dominant-baseline="central"
            >
              <tspan
                v-for="(line, idx) in flowLayout.finalBlockLayout.instructionLines"
                :key="`inst-${idx}`"
                x="0"
                :dy="idx === 0 ? '24px' : '1.3em'"
                font-size="9.5"
                font-weight="500"
                fill="#475569"
              >
                {{ line }}
              </tspan>
            </text>
          </template>
        </g>
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { VisualRecipeV3, V3Ingredient, V3ActionBlock } from '@/types/recipeV3'
import {
  buildV3MatrixLayout,
  type V3MatrixLayoutResult,
  type V3LayoutActionBlock,
  formatIngredientRowDisplay,
  getFinalServingInstructions,
} from '@/utils/matrixFlowLayout'
import {
  buildV3ContinuousTableLayout,
  resolveLayoutMode,
  type ContinuousTableLayoutResult,
  type TableLayoutProcessCell,
} from '@/utils/continuousTableLayout'
import { measureTextWidth } from '@/utils/textMeasurement'
import { flowCardTheme } from '@/theme/flowCardTheme'

interface Props {
  recipe: VisualRecipeV3
  mode?: 'auto' | 'table' | 'flow'
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'auto',
})

const emit = defineEmits<{
  (e: 'select-block', block: V3ActionBlock): void
}>()

const theme = flowCardTheme

const markerSuffix = computed(() => {
  return (props.recipe.id || 'canvas').replace(/[^a-zA-Z0-9_-]/g, '_')
})

const effectiveMode = computed<'table' | 'flow'>(() => {
  if (!props.recipe) return 'flow'
  return resolveLayoutMode(props.recipe, props.mode)
})

const tableLayout = computed<ContinuousTableLayoutResult | null>(() => {
  if (!props.recipe || effectiveMode.value !== 'table') return null
  return buildV3ContinuousTableLayout(props.recipe)
})

const flowLayout = computed<V3MatrixLayoutResult | null>(() => {
  if (!props.recipe || effectiveMode.value !== 'flow') return null
  return buildV3MatrixLayout(props.recipe)
})

const explicitConnectors = computed(() => {
  return (flowLayout.value?.connectorLayouts || []).filter(c => c.explicit)
})

function getActionTooltip(layoutBlock: V3LayoutActionBlock): string {
  const block = layoutBlock.block
  return [
    `工序：${block.label || '未命名工序'}`,
    block.heatLevel,
    block.durationMinutes ? `${block.durationMinutes} 分钟` : '',
    block.equipment ? `器具：${block.equipment}` : '',
    block.note,
  ].filter(Boolean).join(' · ')
}

function getProcessCellTooltip(pCell: TableLayoutProcessCell): string {
  if (pCell.isFinalBlock && pCell.finalBlock) {
    return [
      `完成：${pCell.finalBlock.label || '出锅装盘'}`,
      pCell.finalBlock.durationText,
      pCell.finalBlock.instructions,
    ].filter(Boolean).join(' · ')
  }
  if (pCell.block) {
    return [
      `工序：${pCell.block.label || '未命名工序'}`,
      pCell.incomingMaterials?.length ? `承接: ${pCell.incomingMaterials.join('、')}` : '',
      pCell.newIngredients?.length ? `放入: ${pCell.newIngredients.join('、')}` : '',
      pCell.block.heatLevel,
      pCell.block.durationMinutes ? `${pCell.block.durationMinutes} 分钟` : '',
      pCell.block.equipment ? `器具：${pCell.block.equipment}` : '',
      pCell.completionState ? `准出状态：${pCell.completionState}` : '',
      pCell.outputItem ? `产出半成品：${pCell.outputItem}` : '',
      pCell.block.note || pCell.block.notes,
    ].filter(Boolean).join(' · ')
  }
  return pCell.label
}

function onProcessCellClick(pCell: TableLayoutProcessCell) {
  if (pCell.block) {
    emit('select-block', pCell.block)
  } else if (pCell.finalBlock) {
    const final = pCell.finalBlock
    emit('select-block', {
      id: 'final-outcome-detail',
      stageIndex: pCell.colIndex,
      ingredientIds: [],
      label: pCell.label,
      equipment: final.appliance,
      note: [final.durationText, final.instructions, final.note || final.notes].filter(Boolean).join(' · '),
    })
  }
}

function getProcessFirstLineDy(cell: TableLayoutProcessCell): string {
  const lCount = cell.labelLines.length
  const sCount = cell.sublabelLines.length
  const hasHeat = Boolean(cell.heatLevel || cell.durationText || cell.equipment)
  const hasHold = Boolean(cell.holdAsideLabel)
  const total = lCount + sCount + (hasHeat ? 1 : 0) + (hasHold ? 1 : 0)
  if (total <= 1) return '0em'
  return `${-((total - 1) * 0.62)}em`
}

function getFullIngredientText(ing: V3Ingredient): string {
  const display = formatIngredientRowDisplay(ing)
  return [display.amount, display.nameLine1, display.nameLine2].filter(Boolean).join(' ')
}

function getFirstLineYOffset(block: V3LayoutActionBlock): string {
  const lCount = block.labelLines.length
  const sCount = block.sublabelLines.length
  const gCount = block.guidanceLines?.length || 0
  const hasHeat = Boolean(block.block.heatLevel || block.block.durationMinutes)
  const equipmentCount = block.equipmentLines.length

  const totalLines = lCount + sCount + gCount + (hasHeat ? 1 : 0) + equipmentCount
  if (totalLines <= 1) return '0em'
  
  const startOffset = -((totalLines - 1) * 0.58)
  return `${startOffset}em`
}
</script>

<style scoped>
.v3-matrix-svg text {
  font-family: inherit;
}
.v3-matrix-svg [role="button"]:focus-visible > rect {
  stroke: #047857;
  stroke-width: 2;
}
</style>
