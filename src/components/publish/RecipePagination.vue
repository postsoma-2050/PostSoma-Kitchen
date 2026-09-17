<template>
  <nav
    v-if="totalItems > 0 && totalPages > 1"
    class="flex flex-col items-center justify-between gap-3 border-t border-[color:var(--pk-border)] pt-5 sm:flex-row"
    aria-label="食谱结果分页"
  >
    <p class="text-sm tabular-nums text-[color:var(--pk-ink-secondary)]">
      第 <strong class="text-[color:var(--pk-ink)]">{{ rangeStart }}–{{ rangeEnd }}</strong> 道，共 {{ totalItems }} 道
    </p>

    <div class="flex w-full sm:w-auto items-center justify-between sm:justify-end gap-2">
      <button
        type="button"
        :disabled="currentPage <= 1"
        class="pk-button pk-button-secondary px-3 sm:px-4"
        aria-label="上一页食谱"
        @click="$emit('change', currentPage - 1)"
      >
        <AppIcon name="arrow-left" :size="16" />
        <span>上一页</span>
      </button>

      <div class="hidden sm:flex items-center gap-1" aria-label="页码">
        <template v-for="item in items" :key="item">
          <span
            v-if="typeof item === 'string'"
            class="flex h-11 min-w-8 items-center justify-center text-[color:var(--pk-ink-muted)]"
            aria-hidden="true"
          >
            …
          </span>
          <button
            v-else
            type="button"
            class="h-11 min-w-11 rounded-lg border text-sm font-bold tabular-nums transition-colors focus:outline-none"
            :class="item === currentPage
              ? 'border-[color:var(--pk-accent)] bg-[color:var(--pk-accent)] text-white'
              : 'border-[color:var(--pk-border-strong)] bg-[color:var(--pk-surface)] text-[color:var(--pk-ink-secondary)] hover:bg-[color:var(--pk-surface-muted)]'"
            :aria-label="`第 ${item} 页`"
            :aria-current="item === currentPage ? 'page' : undefined"
            @click="$emit('change', item)"
          >
            {{ item }}
          </button>
        </template>
      </div>

      <span class="text-sm font-bold tabular-nums text-[color:var(--pk-ink-secondary)] sm:hidden" aria-live="polite">
        {{ currentPage }} / {{ totalPages }}
      </span>

      <button
        type="button"
        :disabled="currentPage >= totalPages"
        class="pk-button pk-button-secondary px-3 sm:px-4"
        aria-label="下一页食谱"
        @click="$emit('change', currentPage + 1)"
      >
        <span>下一页</span>
        <AppIcon name="arrow-right" :size="16" />
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AppIcon from '@/components/common/AppIcon.vue'
import { getPaginationItems, RECIPE_PAGE_SIZE } from '@/utils/recipeBrowseState'

const props = defineProps<{
  currentPage: number
  totalPages: number
  totalItems: number
}>()

defineEmits<{
  change: [page: number]
}>()

const items = computed(() => getPaginationItems(props.currentPage, props.totalPages))
const rangeStart = computed(() => (props.currentPage - 1) * RECIPE_PAGE_SIZE + 1)
const rangeEnd = computed(() => Math.min(props.currentPage * RECIPE_PAGE_SIZE, props.totalItems))
</script>
