<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4"
    role="dialog"
    aria-modal="true"
    aria-labelledby="byok-settings-title"
    @click.self="close"
  >
    <div class="pk-surface w-full max-w-lg space-y-5 p-6">
      <!-- 头部 -->
      <div class="flex items-start justify-between gap-4 border-b border-[color:var(--pk-border)] pb-4">
        <div>
          <h3 id="byok-settings-title" class="text-base font-bold text-[color:var(--pk-ink)]">可选排序服务设置</h3>
          <p class="mt-1 text-xs text-[color:var(--pk-ink-secondary)]">使用自己的 API Key，仅为候选食谱补充排序参考与理由。</p>
        </div>
        <button @click="close" type="button" class="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-[color:var(--pk-ink-secondary)] hover:bg-[color:var(--pk-surface-muted)]" aria-label="关闭设置">
          <svg viewBox="0 0 20 20" class="h-5 w-5" fill="none" aria-hidden="true"><path d="m5 5 10 10M15 5 5 15" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" /></svg>
        </button>
      </div>

      <!-- 隐私安全提示 -->
      <div class="space-y-1 border-l-2 border-[color:var(--pk-accent)] bg-[color:var(--pk-surface-accent)] p-3 text-xs">
        <p class="font-bold text-[color:var(--pk-ink)]">本地保存方式</p>
        <p class="text-[11px] leading-relaxed text-[color:var(--pk-ink-secondary)]">
          API Key 保存在当前浏览器的 LocalStorage 中，请求会直接发送至你配置的 API 地址。请仅在可信设备上保存，并自行确认服务商的数据政策。
        </p>
      </div>

      <!-- 配置表单 -->
      <div class="space-y-4 text-xs">
        <div>
          <label for="byok-api-key" class="mb-1 block font-bold text-[color:var(--pk-ink-secondary)]">API Key *</label>
          <input
            id="byok-api-key"
            v-model="config.apiKey"
            type="password"
            placeholder="sk-..."
            class="pk-field w-full p-2.5 font-mono text-base"
          />
        </div>

        <div>
          <label for="byok-base-url" class="mb-1 block font-bold text-[color:var(--pk-ink-secondary)]">API 地址</label>
          <input
            id="byok-base-url"
            v-model="config.baseUrl"
            type="url"
            placeholder="https://api.openai.com/v1"
            class="pk-field w-full p-2.5 font-mono text-base"
          />
          <p class="mt-1 text-[11px] text-[color:var(--pk-ink-muted)]">支持 OpenAI、Gemini、DeepSeek 等兼容接口地址。</p>
        </div>

        <div>
          <label for="byok-model" class="mb-1 block font-bold text-[color:var(--pk-ink-secondary)]">模型名称</label>
          <input
            id="byok-model"
            v-model="config.model"
            placeholder="gpt-3.5-turbo / deepseek-chat / gemini-1.5-flash"
            class="pk-field w-full p-2.5 font-mono text-base"
          />
        </div>
      </div>

      <!-- 底部按钮 -->
      <div class="flex flex-wrap items-center justify-between gap-3 border-t border-[color:var(--pk-border)] pt-4">
        <button
          v-if="config.apiKey"
          @click="clearKey"
          type="button"
          class="min-h-11 rounded-lg px-2 text-xs font-semibold text-[color:var(--pk-danger)] underline underline-offset-4"
        >
          清除已存 Key
        </button>
        <div v-else></div>

        <div class="flex items-center gap-2">
          <button
            @click="close"
            type="button"
            class="pk-button pk-button-secondary"
          >
            取消
          </button>
          <button
            @click="handleSave"
            type="button"
            class="pk-button pk-button-primary"
          >
            保存本地配置
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { getByokConfig, saveByokConfig, type ByokConfig } from '@/services/byokService'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'saved'): void
}>()

const config = ref<ByokConfig>(getByokConfig())

watch(
  () => props.isOpen,
  (val) => {
    if (val) {
      config.value = getByokConfig()
    }
  }
)

function close() {
  emit('close')
}

function handleSave() {
  saveByokConfig(config.value)
  emit('saved')
  close()
}

function clearKey() {
  config.value.apiKey = ''
  saveByokConfig(config.value)
  emit('saved')
}
</script>
