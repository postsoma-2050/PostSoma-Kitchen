<template>
  <article class="pk-surface overflow-hidden" aria-labelledby="ai-suggestion-title">
    <header class="px-5 pb-5 pt-6 sm:px-7 sm:pb-6 sm:pt-7">
      <div class="flex flex-wrap items-center gap-2">
        <p class="text-xs font-bold tracking-[0.12em] text-[color:var(--pk-accent)]">
          AI 即时建议 · 临时生成
        </p>
        <span
          v-if="isStale"
          class="rounded bg-[color:var(--pk-surface-muted)] px-2 py-0.5 text-xs font-semibold text-[color:var(--pk-ink-secondary)] border border-[color:var(--pk-border)]"
        >
          上一版参考
        </span>
      </div>
      <h3 id="ai-suggestion-title" class="mt-3 text-2xl font-bold leading-tight text-[color:var(--pk-ink)] sm:text-[1.75rem]">
        {{ suggestion.title }}
      </h3>
      <p class="mt-2 max-w-3xl text-[0.95rem] leading-7 text-[color:var(--pk-ink-secondary)]">
        {{ suggestion.summary }}
      </p>
      <p v-if="usedIngredientNames.length" class="mt-3 text-xs leading-6 text-[color:var(--pk-ink-muted)]">
        <span class="font-bold text-[color:var(--pk-ink-secondary)]">使用库存</span>
        <span class="mx-2" aria-hidden="true">·</span>
        {{ usedIngredientNames.join('、') }}
      </p>
      <p class="mt-3 text-xs leading-5 text-[color:var(--pk-ink-muted)]">
        临时生成 · 未经人工审核 · 不会保存为正式食谱
      </p>
    </header>

    <div class="border-t border-[color:var(--pk-border)] px-5 py-5 sm:px-7 sm:py-6">
      <div v-if="suggestion.criticalMissing.length || suggestion.optionalAdditions.length" class="grid gap-5 sm:grid-cols-2 sm:gap-8">
        <section v-if="suggestion.criticalMissing.length" aria-labelledby="ai-missing-heading">
          <h4 id="ai-missing-heading" class="text-sm font-bold text-[color:var(--pk-ink)]">现在需要</h4>
          <p class="mt-1.5 text-sm leading-6 text-[color:var(--pk-ink-secondary)]">
            {{ suggestion.criticalMissing.join('；') }}
          </p>
        </section>
        <section v-if="suggestion.optionalAdditions.length" aria-labelledby="ai-optional-heading">
          <h4 id="ai-optional-heading" class="text-sm font-bold text-[color:var(--pk-ink)]">可选加入</h4>
          <p class="mt-1.5 text-sm leading-6 text-[color:var(--pk-ink-secondary)]">
            {{ suggestion.optionalAdditions.join('、') }}
          </p>
        </section>
      </div>

      <section class="mt-6 border-t border-[color:var(--pk-border)] pt-5" aria-labelledby="ai-steps-heading">
        <h4 id="ai-steps-heading" class="text-sm font-bold text-[color:var(--pk-ink)]">做法</h4>
        <ol class="mt-2.5 space-y-2.5">
          <li
            v-for="(step, index) in suggestion.steps"
            :key="`${index}-${step}`"
            class="grid grid-cols-[1.4rem_minmax(0,1fr)] gap-2 text-sm leading-6 text-[color:var(--pk-ink-secondary)]"
          >
            <span class="font-bold tabular-nums text-[color:var(--pk-ink)]" aria-hidden="true">{{ index + 1 }}.</span>
            <span>{{ step }}</span>
          </li>
        </ol>
      </section>

      <section class="mt-6 border-t border-[color:var(--pk-border)] pt-5" aria-labelledby="ai-expectation-heading">
        <h4 id="ai-expectation-heading" class="text-sm font-bold text-[color:var(--pk-ink)]">预计</h4>
        <p class="mt-1.5 text-sm leading-6 text-[color:var(--pk-ink-secondary)]">
          {{ timeLabel }} · {{ difficultyLabel }}
        </p>
      </section>

      <section class="mt-5 rounded-xl bg-[color:var(--pk-surface-muted)] px-4 py-4" aria-labelledby="ai-safety-heading">
        <h4 id="ai-safety-heading" class="text-sm font-bold text-[color:var(--pk-ink)]">安全提醒</h4>
        <p class="mt-1.5 text-sm leading-6 text-[color:var(--pk-ink-secondary)]">
          {{ suggestion.safetyNotes.join('；') }}
        </p>
      </section>

      <section v-if="flavorComplements.length" class="mt-5 border-t border-[color:var(--pk-border)] pt-5" aria-labelledby="ai-complements-heading">
        <h4 id="ai-complements-heading" class="text-xs font-bold text-[color:var(--pk-ink-secondary)]">
          风味搭配参考（The Flavor Bible）
        </h4>
        <p class="mt-1.5 text-sm leading-6 text-[color:var(--pk-ink-muted)]">
          烹调时加入少量以下辅料可增强风味层次：{{ flavorComplements.join('、') }}
        </p>
      </section>

      <section v-if="relatedRecipes.length" class="mt-5" aria-labelledby="ai-related-heading">
        <h4 id="ai-related-heading" class="text-xs font-bold text-[color:var(--pk-ink-secondary)]">相关正式食谱</h4>
        <p class="mt-1.5 text-sm leading-6 text-[color:var(--pk-ink-secondary)]">
          {{ relatedRecipeTitles }}
        </p>
      </section>

      <footer class="mt-6 flex flex-col gap-3 border-t border-[color:var(--pk-border)] pt-5 sm:flex-row">
        <router-link
          v-if="primaryRelatedRecipe"
          :to="`/recipe/${primaryRelatedRecipe.id}`"
          class="pk-button pk-button-secondary w-full sm:w-auto"
        >
          查看相关正式食谱
        </router-link>
        <button type="button" class="pk-button pk-button-primary w-full sm:w-auto" @click="emit('regenerate')">
          重新生成
        </button>
      </footer>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { AiIngredientSnapshot, AiInstantSuggestion } from '@/domain/fridge'

const props = withDefaults(defineProps<{
  suggestion: AiInstantSuggestion
  snapshot: AiIngredientSnapshot
  relatedRecipes: Array<{ id: string; title: string }>
  isStale?: boolean
}>(), {
  isStale: false,
})

const emit = defineEmits<{
  regenerate: []
}>()

const timeLabels = {
  quick: '较快完成',
  moderate: '需要一些准备时间',
  long: '需要较长时间',
  unknown: '时间暂无法可靠估计',
}
const difficultyLabels = {
  easy: '容易执行',
  medium: '需要基本烹饪经验',
  hard: '步骤相对复杂',
  unknown: '难度暂无法可靠估计',
}

const ingredientNameById = computed(() => new Map([
  ...props.snapshot.selectedIngredients.map(item => [item.conceptId, item.displayName] as const),
  ...props.snapshot.customIngredients.map(item => [item.id, item.displayName] as const),
]))
const usedIngredientNames = computed(() => [
  ...props.suggestion.usedConceptIds,
  ...props.suggestion.usedCustomIngredientIds,
].map(id => ingredientNameById.value.get(id)).filter((name): name is string => Boolean(name)))
const primaryRelatedRecipe = computed(() => props.relatedRecipes[0])
const relatedRecipeTitles = computed(() => props.relatedRecipes.map(recipe => recipe.title).join('、'))
const timeLabel = computed(() => timeLabels[props.suggestion.timeExpectation])
const difficultyLabel = computed(() => difficultyLabels[props.suggestion.difficulty])
const flavorComplements = computed(() => props.snapshot.flavorContext?.complements || [])
</script>
