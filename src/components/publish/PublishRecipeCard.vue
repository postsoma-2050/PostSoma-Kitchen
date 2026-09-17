<template>
  <router-link
    :to="`/recipe/${recipe.id}`"
    class="publish-recipe-card group flex h-full flex-col overflow-hidden rounded-2xl border border-[color:var(--pk-border)] bg-[color:var(--pk-surface)] text-left shadow-[var(--pk-shadow-rest)] transition-[border-color,box-shadow] duration-200 hover:border-[color:var(--pk-border-strong)] hover:shadow-[var(--pk-shadow-raised)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--pk-accent)] focus-visible:ring-offset-2 motion-reduce:transition-none"
    :aria-label="`查看 ${displayTitle} 的食谱流程`"
  >
    <div
      class="relative aspect-[4/3] w-full shrink-0 overflow-hidden border-b border-[color:var(--pk-border)] bg-[color:var(--pk-surface-muted)]"
      :data-cover-state="coverAsset.state === 'manual' && !userImgFailed ? 'manual' : 'fallback'"
    >
      <img
        v-if="!fallbackImgFailed"
        :src="displayCoverUrl"
        :alt="displayTitle"
        class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        loading="lazy"
        decoding="async"
        @error="handleCoverError"
      />

      <div v-else class="recipe-cover-fallback flex h-full w-full items-center justify-center" aria-hidden="true">
        <AppIcon name="restaurant" :size="56" class="text-[color:var(--pk-ink-muted)] opacity-45" />
      </div>
    </div>

    <div class="flex flex-1 flex-col p-5">
      <div class="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold text-[color:var(--pk-ink-muted)]">
        <span class="text-[color:var(--pk-accent)]">{{ methodLabel }}</span>
        <span aria-hidden="true" class="text-[color:var(--pk-border-strong)]">/</span>
        <span>{{ durationLabel }}</span>
      </div>

      <h3 class="mt-2 line-clamp-2 text-lg font-bold leading-snug tracking-tight text-[color:var(--pk-ink)] transition-colors duration-200 group-hover:text-[color:var(--pk-accent)] motion-reduce:transition-none">
        {{ displayTitle }}
      </h3>

      <p class="mt-2 line-clamp-2 min-h-[42px] text-sm leading-relaxed text-[color:var(--pk-ink-secondary)]">
        {{ recipe.description || '这道食谱的简要说明正在整理中。' }}
      </p>

      <div class="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-[color:var(--pk-border)] pt-4 text-xs text-[color:var(--pk-ink-muted)]">
        <span>{{ recipe.ingredients?.length || 0 }} 种食材</span>
        <span aria-hidden="true" class="text-[color:var(--pk-border-strong)]">·</span>
        <span>{{ recipe.actionBlocks?.length || 0 }} 道工序</span>
        <span aria-hidden="true" class="text-[color:var(--pk-border-strong)]">·</span>
        <span>{{ difficultyLabel }}</span>
      </div>

      <div class="mt-auto flex items-center justify-end pt-4 text-sm font-bold text-[color:var(--pk-accent)]">
        <span>查看流程</span>
        <AppIcon name="arrow-right" :size="16" class="ml-1 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { VisualRecipeV3 } from '@/types/recipeV3'
import { DEFAULT_RECIPE_COVER, resolveRecipeCover } from '@/utils/recipeCoverAsset'
import AppIcon from '@/components/common/AppIcon.vue'
import {
  getRecipeDifficultyLabel,
  getRecipeDisplayTitle,
  getRecipeDurationLabel,
  getRecipeMethodLabel,
} from '@/utils/recipeCardPresentation'

const props = defineProps<{
  recipe: VisualRecipeV3
}>()

const emit = defineEmits<{
  (event: 'cover-error', recipeId: string): void
}>()

const userImgFailed = ref(false)
const fallbackImgFailed = ref(false)

const coverAsset = computed(() => resolveRecipeCover(props.recipe))
const displayTitle = computed(() => getRecipeDisplayTitle(props.recipe.title))
const methodLabel = computed(() => getRecipeMethodLabel(props.recipe.finalBlock?.method))
const durationLabel = computed(() => getRecipeDurationLabel(props.recipe))
const difficultyLabel = computed(() => getRecipeDifficultyLabel(props.recipe.difficulty))

const displayCoverUrl = computed(() => {
  // 1. 最高优先级：如果用户在后台设置了自定义图片，且该图片尚未加载报错，则展示用户上传的照片
  if (coverAsset.value.state === 'manual' && !userImgFailed.value) {
    return coverAsset.value.url
  }
  // 2. 默认通用降级：如果没有设置照片或外链图片加载失败，展示中立、有食欲且代表烹饪准备工序的通用大图
  return DEFAULT_RECIPE_COVER
})

function handleCoverError() {
  if (coverAsset.value.state === 'manual' && !userImgFailed.value) {
    // 用户自定义外链失效，无缝切换为通用厨房准备氛围图，避免页面出现难看的破损框
    userImgFailed.value = true
    emit('cover-error', props.recipe.id)
  } else {
    // 本地通用图片极端情况下失败时的终极兜底
    fallbackImgFailed.value = true
  }
}

watch(() => props.recipe.coverImageUrl, () => {
  userImgFailed.value = false
  fallbackImgFailed.value = false
})
</script>

<style scoped>
.recipe-cover-fallback {
  background-color: var(--pk-surface-muted);
  background-image:
    linear-gradient(rgba(79, 90, 83, 0.055) 1px, transparent 1px),
    linear-gradient(90deg, rgba(79, 90, 83, 0.055) 1px, transparent 1px);
  background-size: 28px 28px;
}
</style>
