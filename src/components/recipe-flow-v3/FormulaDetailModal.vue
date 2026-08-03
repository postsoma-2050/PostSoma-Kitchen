<template>
  <div
    v-if="formula"
    class="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 no-print overflow-y-auto"
    @click.self="$emit('close')"
    @keydown.esc="$emit('close')"
    tabindex="0"
  >
    <div class="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden border border-stone-200 text-stone-800 animate-in fade-in zoom-in-95 duration-200">
      
      <!-- Modal 头部 -->
      <div class="px-6 py-5 bg-gradient-to-r from-amber-900 to-stone-900 text-white flex items-start justify-between relative overflow-hidden">
        <div class="relative z-10 space-y-1">
          <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-amber-400/20 text-amber-200 border border-amber-400/30 rounded-full text-xs font-bold backdrop-blur-md">
            <span>🥣</span>
            <span>Sub-Recipe Formula 复合配方</span>
          </div>
          <h3 class="text-xl font-black text-white tracking-tight">
            {{ formula.name }}
          </h3>
          <p v-if="formula.yieldText" class="text-xs text-stone-300 font-medium">
            成品基准：{{ formula.yieldText }} (适用于 {{ formula.baseServings || 2 }} 人份)
          </p>
        </div>

        <button
          @click="$emit('close')"
          type="button"
          class="relative z-10 text-stone-300 hover:text-white text-xl font-bold p-1 cursor-pointer transition-colors"
          title="关闭"
        >
          ✕
        </button>
      </div>

      <!-- Modal 主体内容区 -->
      <div class="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
        
        <!-- 1. 动态份量换算器 -->
        <div class="bg-stone-50 p-4 rounded-2xl border border-stone-200/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div class="space-y-0.5">
            <span class="font-bold text-stone-900">动态份量换算</span>
            <span class="block text-[11px] text-stone-500">按目标份数自动调配原料用量</span>
          </div>

          <div class="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-stone-300">
            <button
              v-for="s in [1, 2, 4, 6, 8]"
              :key="s"
              @click="currentServings = s"
              type="button"
              :class="[
                'px-2.5 py-1 rounded-lg font-bold transition-all',
                currentServings === s ? 'bg-amber-600 text-white shadow-sm' : 'text-stone-600 hover:bg-stone-100'
              ]"
            >
              {{ s }}人份
            </button>
          </div>
        </div>

        <!-- 2. 精确原料用量清单表格 -->
        <div class="space-y-2">
          <div class="flex items-center justify-between text-xs font-bold text-stone-900 px-1">
            <span class="flex items-center gap-1">
              <span>⚖️</span>
              <span>配料精确定量表 (份量倍率: {{ scaleRatio.toFixed(1) }}x)</span>
            </span>
            <span class="text-stone-400 font-normal">共 {{ scaledItems.length }} 项原料</span>
          </div>

          <div class="border border-stone-200 rounded-2xl overflow-hidden text-xs">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-stone-100/80 text-stone-600 font-bold border-b border-stone-200">
                  <th class="p-3">原料名称</th>
                  <th class="p-3 text-right">调配用量</th>
                  <th class="p-3">备注</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-stone-100 font-medium">
                <tr v-for="(item, idx) in scaledItems" :key="idx" class="hover:bg-stone-50/80 transition-colors">
                  <td class="p-3 font-bold text-stone-900">{{ item.name }}</td>
                  <td class="p-3 text-right font-mono font-black text-amber-900 bg-amber-50/40">
                    {{ item.formattedAmountText }}
                  </td>
                  <td class="p-3 text-stone-500 text-[11px]">{{ item.note || '-' }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 3. 调制步骤顺序 -->
        <div v-if="formula.steps && formula.steps.length > 0" class="space-y-2">
          <div class="text-xs font-bold text-stone-900 flex items-center gap-1 px-1">
            <span>🥣</span>
            <span>调制顺序与步骤</span>
          </div>
          <div class="bg-amber-50/50 p-4 rounded-2xl border border-amber-200/60 text-xs space-y-2">
            <div v-for="(step, idx) in formula.steps" :key="idx" class="flex items-start gap-2 leading-relaxed text-stone-800">
              <span class="w-4 h-4 rounded-full bg-amber-200 text-amber-950 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                {{ idx + 1 }}
              </span>
              <span>{{ step.replace(/^\d+\.\s*/, '') }}</span>
            </div>
          </div>
        </div>

        <!-- 4. 使用时机与小贴士 -->
        <div v-if="formula.timingTip" class="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200/80 text-xs space-y-1">
          <div class="font-bold text-emerald-950 flex items-center gap-1">
            <span>💡 烹入使用时机与秘诀</span>
          </div>
          <p class="text-emerald-900 leading-relaxed font-medium">{{ formula.timingTip }}</p>
        </div>

        <!-- 5. 【Matrix Flow 语义联动提示】 -->
        <div v-if="actionStageInfo" class="bg-stone-100 p-3.5 rounded-2xl border border-stone-200 text-xs flex items-center justify-between text-stone-600">
          <span class="font-bold text-stone-900">🔗 Matrix Flow 联动指示:</span>
          <span class="font-mono text-emerald-800 font-semibold">{{ actionStageInfo }}</span>
        </div>

      </div>

      <!-- Modal 脚部 -->
      <div class="px-6 py-4 bg-stone-50 border-t border-stone-200 flex justify-end">
        <button
          @click="$emit('close')"
          type="button"
          class="px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
        >
          完成阅读
        </button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { SubRecipeFormula } from '@/types/formula'
import type { VisualRecipeV3 } from '@/types/recipeV3'
import { calculateScaledFormula } from '@/utils/formulaCalculator'

const props = defineProps<{
  formula: SubRecipeFormula | null
  recipe?: VisualRecipeV3 | null
  initialServings?: number
}>()

defineEmits<{
  (e: 'close'): void
}>()

const currentServings = ref(props.initialServings || props.formula?.baseServings || 2)

const scaleRatio = computed(() => {
  if (!props.formula) return 1
  const base = props.formula.baseServings || 2
  return currentServings.value / base
})

const scaledItems = computed(() => {
  if (!props.formula) return []
  return calculateScaledFormula(props.formula, currentServings.value)
})

// 解析与 Matrix Flow 工序节点的关联联动信息
const actionStageInfo = computed(() => {
  if (!props.formula || !props.recipe || !props.recipe.actionBlocks) return null
  const prepBlock = props.recipe.actionBlocks.find(b => b.id === props.formula?.prepActionBlockId)
  const usedBlock = props.recipe.actionBlocks.find(b => props.formula?.usedActionBlockIds?.includes(b.id))

  const parts = []
  if (prepBlock) parts.push(`调制: 阶段 ${prepBlock.stageIndex + 1} (${prepBlock.label})`)
  if (usedBlock) parts.push(`使用: 阶段 ${usedBlock.stageIndex + 1} (${usedBlock.label})`)

  return parts.length > 0 ? parts.join(' ➔ ') : null
})
</script>
