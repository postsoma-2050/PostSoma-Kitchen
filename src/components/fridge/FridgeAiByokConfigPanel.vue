<template>
  <form class="rounded-xl border border-[color:var(--pk-border-strong)] bg-[color:var(--pk-surface)] p-4 sm:p-5" @submit.prevent="submit">
    <div class="flex items-start justify-between gap-4">
      <div>
        <h3 class="text-sm font-bold text-[color:var(--pk-ink)]">临时连接 OpenAI-compatible API</h3>
        <p class="mt-1 text-xs leading-relaxed text-[color:var(--pk-ink-secondary)]">
          Key 只保存在当前页面的 JavaScript 内存中。刷新、关闭或离开本页后会清除。
        </p>
      </div>
      <button
        type="button"
        class="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-[color:var(--pk-ink-secondary)] hover:bg-[color:var(--pk-surface-muted)]"
        aria-label="关闭临时 AI 配置"
        @click="close"
      >
        <AppIcon name="close" :size="20" />
      </button>
    </div>

    <div class="mt-4 grid gap-4">
      <div>
        <label for="fridge-ai-base-url" class="text-sm font-bold text-[color:var(--pk-ink)]">HTTPS API 地址</label>
        <input
          id="fridge-ai-base-url"
          v-model="baseUrl"
          type="url"
          inputmode="url"
          autocomplete="off"
          spellcheck="false"
          class="pk-field mt-2 w-full px-3 font-mono text-base"
          placeholder="https://your-provider.example/v1"
        />
        <p class="mt-1 text-xs leading-relaxed text-[color:var(--pk-ink-muted)]">
          仅支持 Chat Completions 风格的 OpenAI-compatible JSON 协议；地址不能包含账号、query 或 hash。
        </p>
      </div>

      <div class="grid gap-4 sm:grid-cols-2">
        <div>
          <label for="fridge-ai-model" class="text-sm font-bold text-[color:var(--pk-ink)]">模型名称</label>
          <input
            id="fridge-ai-model"
            v-model="model"
            type="text"
            autocomplete="off"
            spellcheck="false"
            class="pk-field mt-2 w-full px-3 font-mono text-base"
            placeholder="provider-model-name"
          />
        </div>
        <div>
          <label for="fridge-ai-key" class="text-sm font-bold text-[color:var(--pk-ink)]">API Key</label>
          <input
            id="fridge-ai-key"
            v-model="apiKey"
            type="password"
            autocomplete="new-password"
            spellcheck="false"
            class="pk-field mt-2 w-full px-3 font-mono text-base"
            placeholder="仅本次页面会话使用"
          />
        </div>
      </div>
    </div>

    <p v-if="error" class="mt-4 rounded-lg border border-[color:var(--pk-danger)] px-3 py-2 text-sm text-[color:var(--pk-danger)]" role="alert">
      {{ error }}
    </p>

    <div class="mt-5 flex flex-col-reverse gap-2 border-t border-[color:var(--pk-border)] pt-4 sm:flex-row sm:justify-end">
      <button type="button" class="pk-button pk-button-secondary" @click="close">取消</button>
      <button type="submit" class="pk-button pk-button-primary">仅为本次页面启用</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppIcon from '@/components/common/AppIcon.vue'
import type { OpenAiCompatibleByokConfigInput } from '@/domain/fridge'

defineProps<{
  error: string
}>()

const emit = defineEmits<{
  (event: 'close'): void
  (event: 'save', config: OpenAiCompatibleByokConfigInput): void
}>()

const baseUrl = ref('')
const model = ref('')
const apiKey = ref('')

function clearFields() {
  baseUrl.value = ''
  model.value = ''
  apiKey.value = ''
}

function close() {
  clearFields()
  emit('close')
}

function submit() {
  emit('save', {
    baseUrl: baseUrl.value,
    model: model.value,
    apiKey: apiKey.value,
  })
}

defineExpose({ clearFields })
</script>
