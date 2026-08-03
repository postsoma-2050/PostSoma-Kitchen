<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    @click.self="close"
  >
    <div class="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-5 border border-stone-200 animate-in fade-in zoom-in duration-200">
      <!-- 头部 -->
      <div class="flex items-center justify-between border-b border-stone-100 pb-3">
        <div class="flex items-center gap-2">
          <span class="text-2xl">🔑</span>
          <div>
            <h3 class="text-base font-bold text-stone-900">BYOK AI 密钥设置</h3>
            <p class="text-[11px] text-stone-500">Bring Your Own Key (支持 OpenAI / Gemini / DeepSeek 兼容 API)</p>
          </div>
        </div>
        <button @click="close" type="button" class="text-stone-400 hover:text-stone-700 text-lg font-bold p-1">
          ✕
        </button>
      </div>

      <!-- 隐私安全提示 -->
      <div class="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-900 space-y-1">
        <div class="font-bold flex items-center gap-1">
          <span>🔒 100% 本地隐私保证</span>
        </div>
        <p class="text-[11px] leading-relaxed text-emerald-800">
          你的 API Key 仅安全地存储在当前浏览器的 LocalStorage 中，直接由前端向大模型 API 发起 HTTP 请求，绝对不会上传至任何中转服务器。
        </p>
      </div>

      <!-- 配置表单 -->
      <div class="space-y-4 text-xs">
        <div>
          <label class="block font-bold text-stone-700 mb-1">API Key *</label>
          <input
            v-model="config.apiKey"
            type="password"
            placeholder="sk-..."
            class="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-md font-mono focus:outline-none focus:border-emerald-600"
          />
        </div>

        <div>
          <label class="block font-bold text-stone-700 mb-1">API Base URL</label>
          <input
            v-model="config.baseUrl"
            placeholder="https://api.openai.com/v1"
            class="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-md font-mono focus:outline-none focus:border-emerald-600"
          />
          <p class="text-[10px] text-stone-400 mt-1">如使用第三方代理或 DeepSeek，请填入其兼容的 Base URL</p>
        </div>

        <div>
          <label class="block font-bold text-stone-700 mb-1">Model 名称</label>
          <input
            v-model="config.model"
            placeholder="gpt-3.5-turbo / deepseek-chat / gemini-1.5-flash"
            class="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-md font-mono focus:outline-none focus:border-emerald-600"
          />
        </div>
      </div>

      <!-- 底部按钮 -->
      <div class="flex items-center justify-between pt-3 border-t border-stone-100">
        <button
          v-if="config.apiKey"
          @click="clearKey"
          type="button"
          class="text-xs text-red-600 hover:text-red-800 font-semibold underline cursor-pointer"
        >
          清除已存 Key
        </button>
        <div v-else></div>

        <div class="flex items-center gap-2">
          <button
            @click="close"
            type="button"
            class="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs font-semibold cursor-pointer"
          >
            取消
          </button>
          <button
            @click="handleSave"
            type="button"
            class="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold shadow-sm transition-colors cursor-pointer"
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
