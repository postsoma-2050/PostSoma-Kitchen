<template>
  <div class="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center p-4">
    <div class="w-full max-w-md bg-white border border-[#E5E2DC] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
      
      <!-- 头部 Brand 标识 -->
      <div class="text-center space-y-2">
        <div class="inline-flex items-center gap-2 px-3 py-1 bg-[#EBF2ED] text-[#2D5A43] border border-[#C5D8CC] rounded-full text-xs font-bold">
          <span>PostSoma Kitchen Studio</span>
        </div>
        <h1 class="text-2xl font-black text-[#1C2520] tracking-tight">
          管理员登录认证
        </h1>
        <p class="text-xs text-[#58605B] font-medium">
          验证 Studio 管理员身份以访问食谱创作、校验与版本快照
        </p>
      </div>

      <!-- Supabase 未配置或 Local 模式降级提示 -->
      <div v-if="!isSupabaseConfigured || storageMode === 'local'" class="bg-[#FAF5EC] border border-[#F0E2CA] rounded-2xl p-4 text-xs text-[#8C5E18] space-y-2">
        <div class="font-bold flex items-center gap-1.5">
          <AppIcon name="lightbulb" :size="17" />
          <span>系统处于本地直通模式 (Local Mode)</span>
        </div>
        <p class="leading-relaxed">
          当前环境未开启 Supabase 云端配置，系统将自动允许通过本地模式使用 Kitchen Studio。
        </p>
        <button
          @click="handleBypassLocal"
          type="button"
          class="inline-flex w-full items-center justify-center gap-1.5 py-2 bg-[#D49B35] hover:bg-[#C28C2B] text-white font-bold rounded-xl transition-colors text-xs"
        >
          <span>直接进入 Local 模式后台</span>
          <AppIcon name="arrow-right" :size="16" />
        </button>
      </div>

      <!-- 登录表单 -->
      <form v-else @submit.prevent="handleLogin" class="space-y-4">
        <!-- 错误提示 Banner -->
        <div v-if="errorMessage" class="bg-red-50 border border-red-200 text-red-800 text-xs px-3.5 py-2.5 rounded-xl font-medium flex items-center gap-2">
          <AppIcon name="alert" :size="18" />
          <span>{{ errorMessage }}</span>
        </div>

        <div class="space-y-1">
          <label class="block text-xs font-bold text-[#1C2520]">管理员邮箱 (Email)</label>
          <input
            v-model="email"
            type="email"
            required
            placeholder="admin@postsoma.kitchen"
            class="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E5E2DC] rounded-xl text-xs text-[#1C2520] font-semibold focus:outline-none focus:border-[#2D5A43] transition-colors"
          />
        </div>

        <div class="space-y-1">
          <label class="block text-xs font-bold text-[#1C2520]">密码 (Password)</label>
          <input
            v-model="password"
            type="password"
            required
            placeholder="••••••••"
            class="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E5E2DC] rounded-xl text-xs text-[#1C2520] font-semibold focus:outline-none focus:border-[#2D5A43] transition-colors"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full py-3 bg-[#2D5A43] hover:bg-[#1F4030] disabled:opacity-50 text-white font-bold rounded-xl transition-all shadow-sm text-xs cursor-pointer flex items-center justify-center gap-2"
        >
          <AppIcon v-if="loading" name="loader" :size="18" class="animate-spin" />
          <span>{{ loading ? '正在验证身份...' : '验证并进入 Kitchen Studio' }}</span>
        </button>
      </form>

      <!-- 底部返回入口 -->
      <div class="text-center pt-2 border-t border-[#E5E2DC]">
        <router-link to="/" class="inline-flex items-center gap-1.5 text-xs font-bold text-[#58605B] hover:text-[#1C2520] transition-colors">
          <AppIcon name="arrow-left" :size="16" />
          <span>返回 PostSoma Kitchen 公开首页</span>
        </router-link>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { isSupabaseConfigured } from '@/services/supabaseClient'
import { loginWithEmail } from '@/services/authService'
import AppIcon from '@/components/common/AppIcon.vue'

const route = useRoute()
const router = useRouter()

const storageMode = import.meta.env.VITE_STORAGE_MODE || 'local'
const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')

async function handleLogin() {
  errorMessage.value = ''
  loading.value = true
  try {
    const res = await loginWithEmail(email.value, password.value)
    if (!res.ok) {
      errorMessage.value = res.message || '登录验证失败'
      return
    }

    const redirect = (route.query.redirect as string) || '/admin'
    router.push(redirect)
  } catch (e: any) {
    errorMessage.value = e?.message || '登录系统异常'
  } finally {
    loading.value = false
  }
}

function handleBypassLocal() {
  const redirect = (route.query.redirect as string) || '/admin'
  router.push(redirect)
}
</script>
