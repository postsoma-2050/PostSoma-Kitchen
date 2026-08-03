<template>
  <nav class="bg-white/95 backdrop-blur-md border border-[#E5E2DC] max-w-7xl mx-auto rounded-2xl mb-6 shadow-sm no-print">
    <div class="px-4 py-3 md:px-6">
      <!-- 桌面端导航栏 -->
      <div class="hidden md:flex items-center justify-between">
        <!-- Logo 区域 -->
        <router-link to="/" class="flex items-center gap-3 transition-opacity duration-200 hover:opacity-90">
          <div class="w-9 h-9 bg-[#2D5A43] text-white rounded-xl flex items-center justify-center font-bold text-sm shadow-sm border border-[#1F4030]">
            <span>PK</span>
          </div>
          <div>
            <div class="text-base font-black text-[#1C2520] tracking-tight flex items-center gap-2">
              <span>{{ mainTitle }}</span>
              <span class="text-[10px] font-bold text-[#2D5A43] bg-[#EBF2ED] px-2 py-0.5 rounded-md border border-[#C5D8CC]">
                {{ badgeText }}
              </span>
            </div>
            <div class="text-[11px] text-[#58605B] font-medium tracking-wide">{{ subTitle }}</div>
          </div>
        </router-link>

        <!-- 导航按键菜单 -->
        <div class="flex items-center gap-2 text-xs font-bold">
          <!-- 1. 公开食谱库首页 -->
          <router-link
            to="/"
            :class="[
              'flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all border',
              $route.path === '/' ? 'bg-[#1C2520] text-white border-[#1C2520] shadow-sm' : 'bg-[#F4F2EC] text-[#1C2520] border-[#E5E2DC] hover:bg-[#EAE7E0]'
            ]"
          >
            <span>📖</span>
            <span>公开食谱库</span>
          </router-link>

          <!-- 2. 清冰箱食材匹配 -->
          <router-link
            to="/fridge"
            :class="[
              'flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all border',
              $route.path === '/fridge' ? 'bg-[#D49B35] text-white border-[#B87D2B] shadow-sm' : 'bg-[#FAF5EC] text-[#8C5E18] border-[#F0E2CA] hover:bg-[#F5EBD7]'
            ]"
          >
            <span>🧊</span>
            <span>清冰箱匹配</span>
          </router-link>

          <!-- 3. PostSoma Kitchen Studio 管理员后台入口 -->
          <router-link
            to="/admin"
            :class="[
              'flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all border',
              $route.path.startsWith('/admin') ? 'bg-[#2D5A43] text-white border-[#1F4030] shadow-sm' : 'bg-[#F4F2EC] text-[#58605B] border-[#E5E2DC] hover:bg-[#EAE7E0]'
            ]"
          >
            <span>⚙️</span>
            <span>Kitchen Studio</span>
          </router-link>
        </div>
      </div>

      <!-- 移动端导航栏 -->
      <div class="md:hidden">
        <div class="flex items-center justify-between">
          <router-link to="/" class="flex items-center gap-2.5">
            <div class="w-8 h-8 bg-[#2D5A43] text-white rounded-lg flex items-center justify-center font-bold text-xs shadow-sm">
              <span>PK</span>
            </div>
            <div>
              <div class="text-sm font-black text-[#1C2520] tracking-tight">{{ mainTitle }}</div>
              <div class="text-[10px] text-[#58605B]">{{ subTitle }}</div>
            </div>
          </router-link>

          <button
            @click="showMobileMenu = !showMobileMenu"
            type="button"
            class="p-1.5 bg-[#F4F2EC] hover:bg-[#EAE7E0] text-[#1C2520] rounded-lg border border-[#E5E2DC] transition-colors text-xs font-bold"
          >
            {{ showMobileMenu ? '✕ 关 闭' : '☰ 菜 单' }}
          </button>
        </div>

        <!-- 移动端下拉菜单 -->
        <div v-if="showMobileMenu" class="border-t border-[#E5E2DC] pt-3 mt-3">
          <div class="flex gap-2 pb-1 overflow-x-auto text-xs font-bold">
            <router-link
              to="/"
              @click="showMobileMenu = false"
              :class="['px-3 py-2 rounded-xl border whitespace-nowrap', $route.path === '/' ? 'bg-[#1C2520] text-white border-[#1C2520]' : 'bg-[#F4F2EC] text-[#1C2520] border-[#E5E2DC]']"
            >
              📖 食谱库
            </router-link>
            <router-link
              to="/fridge"
              @click="showMobileMenu = false"
              :class="['px-3 py-2 rounded-xl border whitespace-nowrap', $route.path === '/fridge' ? 'bg-[#D49B35] text-white border-[#B87D2B]' : 'bg-[#FAF5EC] text-[#8C5E18] border-[#F0E2CA]']"
            >
              🧊 清冰箱
            </router-link>
            <router-link
              to="/admin"
              @click="showMobileMenu = false"
              :class="['px-3 py-2 rounded-xl border whitespace-nowrap', $route.path.startsWith('/admin') ? 'bg-[#2D5A43] text-white border-[#1F4030]' : 'bg-[#F4F2EC] text-[#58605B] border-[#E5E2DC]']"
            >
              ⚙️ Kitchen Studio
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const showMobileMenu = ref(false)
const route = useRoute()

const mainTitle = computed(() => {
  if (route.path.startsWith('/admin')) return 'PostSoma Kitchen Studio'
  return 'PostSoma Kitchen'
})

const badgeText = computed(() => {
  if (route.path.startsWith('/admin')) return 'Studio Admin'
  return 'Visual Cookbook'
})

const subTitle = computed(() => {
  if (route.path.startsWith('/admin')) return '结构化食谱创作与数据校验后端'
  if (route.path === '/fridge') return '余料智能食材匹配与烹饪组装'
  return 'Visual Recipe Flow Card 核心架构'
})
</script>
