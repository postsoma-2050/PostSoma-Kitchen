<template>
  <article class="pk-surface flex h-full flex-col p-5 sm:p-6">
    <div class="flex flex-wrap items-center justify-between gap-2 border-b border-[color:var(--pk-border)] pb-4">
      <span
        :class="[
          'rounded-full border px-2.5 py-1 text-xs font-bold',
          result.confidence === 'low'
            ? 'border-amber-300 bg-amber-50 text-amber-900'
            : 'border-[color:var(--pk-accent-soft)] bg-[color:var(--pk-surface-accent)] text-[color:var(--pk-accent-hover)]',
        ]"
      >
        {{ recommendationLabel }}
      </span>
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

        <div v-if="result.missingPantryIngredients.length" class="border-l-2 border-[color:var(--pk-border-strong)] pl-3">
          <dt class="text-xs font-bold text-[color:var(--pk-ink-secondary)]">尚未选择的常备调味</dt>
          <dd class="mt-1 text-xs leading-relaxed text-[color:var(--pk-ink-muted)]">
            {{ visibleMissingPantry.map(item => item.displayName).join('、') }}<template v-if="result.missingPantryIngredients.length > visibleMissingPantry.length">等 {{ result.missingPantryIngredients.length }} 项</template>
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
        <svg viewBox="0 0 20 20" class="h-5 w-5" fill="none" aria-hidden="true">
          <path d="M4 10h11m-4-4 4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </router-link>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { RecipeIngredientMatchResult } from '@/domain/fridge'
import {
  getRecipeDisplayTitle,
  getRecipeDurationLabel,
  getRecipeMethodLabel,
} from '@/utils/recipeCardPresentation'

const props = defineProps<{
  result: RecipeIngredientMatchResult
}>()

const displayTitle = computed(() => getRecipeDisplayTitle(props.result.recipe.title))
const methodLabel = computed(() => getRecipeMethodLabel(props.result.recipe.finalBlock?.method))
const durationLabel = computed(() => getRecipeDurationLabel(props.result.recipe))
const visibleMissingKey = computed(() => props.result.missingKeyIngredients.slice(0, 4))
const visibleMissingOrdinary = computed(() => props.result.missingOrdinaryIngredients.slice(0, 4))
const visibleMissingPantry = computed(() => props.result.missingPantryIngredients.slice(0, 5))

const recommendationLabel = computed(() => {
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
