<template>
  <article class="pk-surface flex h-full flex-col p-5 sm:p-6">
    <div class="flex flex-wrap items-center justify-between gap-2 border-b border-[color:var(--pk-border)] pb-4">
      <div class="flex flex-wrap items-center gap-2">
        <span
          v-if="result.isSubstituteMatch && result.keySubstitute"
          class="rounded-full border border-[color:var(--pk-accent)] bg-[color:var(--pk-surface-accent)] px-2.5 py-1 text-xs font-bold text-[color:var(--pk-accent-hover)]"
        >
          ✨ 风味平替激活 · {{ result.keySubstitute.substituteDisplayName }}代{{ result.keySubstitute.originalDisplayName }}
        </span>
        <span
          v-else
          :class="[
            'rounded-full border px-2.5 py-1 text-xs font-bold',
            result.confidence === 'low'
              ? 'border-amber-300 bg-amber-50 text-amber-900'
              : 'border-[color:var(--pk-accent-soft)] bg-[color:var(--pk-surface-accent)] text-[color:var(--pk-accent-hover)]',
          ]"
        >
          {{ recommendationLabel }}
        </span>
        <span
          v-if="hasSubstitutes && !result.isSubstituteMatch"
          class="rounded-full border border-[color:var(--pk-border-strong)] bg-[color:var(--pk-surface-muted)] px-2 py-0.5 text-xs font-semibold text-[color:var(--pk-ink)]"
        >
          可风味平替
        </span>
      </div>
      <span class="text-xs text-[color:var(--pk-ink-muted)]">
        {{ methodLabel }} · {{ durationLabel }}
      </span>
    </div>

    <div class="flex-1 pt-4">
      <h3 class="text-lg font-bold leading-snug tracking-tight text-[color:var(--pk-ink)]">
        {{ displayTitle }}
      </h3>
      <p class="mt-2 line-clamp-2 text-sm leading-relaxed text-[color:var(--pk-ink-secondary)]">
        {{ result.recipe.description || '食谱说明正在整理中，可进入详情查看完整流程。' }}
      </p>

      <!-- 主食材平替激活对比块 -->
      <div
        v-if="result.isSubstituteMatch && result.keySubstitute"
        class="mt-4 rounded-lg border border-[color:var(--pk-border)] bg-[color:var(--pk-surface-muted)] p-3 text-xs"
      >
        <div class="flex items-center gap-1.5 font-bold text-[color:var(--pk-ink)]">
          <AppIcon name="swap" :size="14" class="text-[color:var(--pk-accent)]" />
          <span>主食材风味生态位平替</span>
        </div>
        <div class="mt-2 flex flex-wrap items-center gap-2 text-[color:var(--pk-ink-secondary)]">
          <span class="rounded border border-[color:var(--pk-border)] bg-[color:var(--pk-surface)] px-2 py-0.5 font-medium text-[color:var(--pk-ink-muted)]">
            原方：{{ result.keySubstitute.originalDisplayName }}
          </span>
          <span class="font-bold text-[color:var(--pk-accent)]">➔</span>
          <span class="rounded border border-[color:var(--pk-accent-soft)] bg-[color:var(--pk-surface-accent)] px-2 py-0.5 font-bold text-[color:var(--pk-accent-hover)]">
            手边平替：{{ result.keySubstitute.substituteDisplayName }}
          </span>
          <span class="text-[color:var(--pk-ink-muted)]">
            （风味相似度 {{ result.keySubstitute.score }} · 调味技法通用）
          </span>
        </div>
      </div>

      <dl class="mt-5 space-y-4 text-sm">
        <div>
          <dt class="font-bold text-[color:var(--pk-ink)]">已匹配你的食材</dt>
          <dd class="mt-2 flex flex-wrap gap-2">
            <span
              v-for="item in result.matchedIngredients"
              :key="`matched-${item.conceptId}`"
              class="rounded-md border border-[color:var(--pk-accent-soft)] bg-[color:var(--pk-surface-accent)] px-2.5 py-1 text-xs font-semibold text-[color:var(--pk-accent-hover)]"
            >
              {{ item.displayName }}
            </span>
          </dd>
        </div>

        <div v-if="result.missingKeyIngredients.length">
          <dt class="font-bold text-[color:var(--pk-ink)]">仍缺关键食材</dt>
          <dd class="mt-2 flex flex-wrap gap-2">
            <span
              v-for="item in visibleMissingKey"
              :key="`key-${item.conceptId}`"
              class="rounded-md border border-amber-300 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-950"
            >
              {{ item.displayName }}
            </span>
            <span v-if="result.missingKeyIngredients.length > visibleMissingKey.length" class="px-1 py-1 text-xs text-[color:var(--pk-ink-muted)]">
              另 {{ result.missingKeyIngredients.length - visibleMissingKey.length }} 项
            </span>
          </dd>
        </div>

        <div v-if="result.missingOrdinaryIngredients.length">
          <dt class="font-medium text-[color:var(--pk-ink-secondary)]">其他食材或配方缺口</dt>
          <dd class="mt-2 flex flex-wrap gap-2">
            <span
              v-for="item in visibleMissingOrdinary"
              :key="`ordinary-${item.conceptId}`"
              class="rounded-md border border-[color:var(--pk-border)] bg-[color:var(--pk-surface-muted)] px-2.5 py-1 text-xs text-[color:var(--pk-ink-secondary)]"
            >
              {{ item.displayName }}
            </span>
            <span v-if="result.missingOrdinaryIngredients.length > visibleMissingOrdinary.length" class="px-1 py-1 text-xs text-[color:var(--pk-ink-muted)]">
              另 {{ result.missingOrdinaryIngredients.length - visibleMissingOrdinary.length }} 项
            </span>
          </dd>
        </div>

        <div v-if="hasSubstitutes" class="rounded-lg border border-[color:var(--pk-border)] bg-[color:var(--pk-surface-muted)] p-3">
          <dt class="flex items-center gap-1.5 text-xs font-bold text-[color:var(--pk-ink)]">
            <AppIcon name="swap" :size="14" class="text-[color:var(--pk-accent)]" />
            <span>风味等价平替建议</span>
          </dt>
          <dd class="mt-2 space-y-1.5 text-xs leading-relaxed text-[color:var(--pk-ink-secondary)]">
            <div
              v-for="sub in flavorEvaluation?.substitutes"
              :key="sub.missing"
              class="flex flex-wrap items-center gap-1.5"
            >
              <span>缺</span>
              <span class="font-bold text-[color:var(--pk-ink)]">{{ sub.missing }}</span>
              <span>⇄ 可用库存</span>
              <span class="rounded border border-[color:var(--pk-accent-soft)] bg-[color:var(--pk-surface-accent)] px-1.5 py-0.5 font-bold text-[color:var(--pk-accent-hover)]">
                {{ sub.substituteZh }}
              </span>
              <span class="text-[color:var(--pk-ink-muted)]">（语境相似度 {{ sub.score }}）</span>
            </div>
          </dd>
        </div>

        <div v-if="result.missingPantryIngredients.length" class="border-l-2 border-[color:var(--pk-border-strong)] pl-3">
          <dt class="text-xs font-bold text-[color:var(--pk-ink-secondary)]">尚未选择的常备调味</dt>
          <dd class="mt-1 text-xs leading-relaxed text-[color:var(--pk-ink-muted)]">
            {{ visibleMissingPantry.map(item => item.displayName).join('、') }}<template v-if="result.missingPantryIngredients.length > visibleMissingPantry.length">等 {{ result.missingPantryIngredients.length }} 项</template>
          </dd>
        </div>

        <!-- 风味搭配推荐（The Flavor Bible） -->
        <div
          v-if="flavorComplements && flavorComplements.length > 0"
          class="rounded-lg border border-[color:var(--pk-border)] bg-[color:var(--pk-surface-muted)] p-3 text-xs"
        >
          <dt class="font-bold text-[color:var(--pk-ink)]">
            风味搭配推荐（The Flavor Bible）
          </dt>
          <dd class="mt-2 flex flex-wrap gap-1.5">
            <span
              v-for="comp in flavorComplements"
              :key="comp.zh"
              class="rounded-md border border-[color:var(--pk-border-strong)] bg-[color:var(--pk-surface)] px-2 py-0.5 font-medium text-[color:var(--pk-ink-secondary)]"
              :title="`共现加权得分: ${comp.score}`"
            >
              {{ comp.zh }}
            </span>
          </dd>
        </div>
      </dl>
    </div>

    <div class="mt-5 border-t border-[color:var(--pk-border)] pt-4">
      <p class="text-xs leading-relaxed text-[color:var(--pk-ink-muted)]">
        {{ utilizationLabel }}。实际用量、复合配方与步骤请以正式食谱详情为准。
      </p>
      <router-link
        :to="`/recipe/${result.recipe.id}`"
        class="mt-3 inline-flex min-h-11 w-full items-center justify-between rounded-lg font-bold text-[color:var(--pk-accent)] transition-colors hover:text-[color:var(--pk-accent-hover)] focus:outline-none"
        :aria-label="`查看 ${displayTitle} 的正式食谱流程`"
      >
        <span>查看正式食谱</span>
        <AppIcon name="arrow-right" :size="20" />
      </router-link>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AppIcon from '@/components/common/AppIcon.vue'
import type { RecipeIngredientMatchResult } from '@/domain/fridge'
import type { FlavorComplementItem, RecipeMatchEvaluation } from '@/domain/flavor'
import {
  getRecipeDisplayTitle,
  getRecipeDurationLabel,
  getRecipeMethodLabel,
} from '@/utils/recipeCardPresentation'

const props = defineProps<{
  result: RecipeIngredientMatchResult
  flavorEvaluation?: RecipeMatchEvaluation | null
  flavorComplements?: FlavorComplementItem[]
}>()

const displayTitle = computed(() => getRecipeDisplayTitle(props.result.recipe.title))
const methodLabel = computed(() => getRecipeMethodLabel(props.result.recipe.finalBlock?.method))
const durationLabel = computed(() => getRecipeDurationLabel(props.result.recipe))
const visibleMissingKey = computed(() => props.result.missingKeyIngredients.slice(0, 4))
const visibleMissingOrdinary = computed(() => props.result.missingOrdinaryIngredients.slice(0, 4))
const visibleMissingPantry = computed(() => props.result.missingPantryIngredients.slice(0, 5))

const hasSubstitutes = computed(() => {
  return props.flavorEvaluation?.status === 'substitutable' && props.flavorEvaluation.substitutes.length > 0
})

const recommendationLabel = computed(() => {
  if (props.result.isSubstituteMatch && props.result.keySubstitute) {
    return `风味平替激活 · ${props.result.keySubstitute.substituteDisplayName}代${props.result.keySubstitute.originalDisplayName}`
  }
  if (props.result.confidence === 'low') return '低置信度 · 仅供参考'
  if (props.result.missingKeyIngredients.length === 0) return '主要食材已匹配'
  if (props.result.matchedIngredients.filter(item => item.role === 'key').length > 1) return '同时利用多项主食材'
  return '命中关键食材 · 可参考'
})

const utilizationLabel = computed(() => {
  const utilization = props.result.userIngredientUtilization
  if (utilization.totalCount === 0) return '未使用基础调味计算主食材利用情况'
  if (utilization.unusedConceptIds.length === 0) return `本食谱会用到已选的 ${utilization.matchedCount} 项非基础食材`
  return `会用到 ${utilization.matchedCount} 项已选食材，另有 ${utilization.unusedConceptIds.length} 项不会用于此食谱`
})
</script>
