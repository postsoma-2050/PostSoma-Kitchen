<template>
  <nav class="mx-auto mt-4 w-[calc(100%-2rem)] max-w-7xl border-b border-[color:var(--pk-border)] md:w-[calc(100%-4rem)] no-print" aria-label="主要导航">
    <a href="#main-content" class="pk-skip-link">跳到主要内容</a>

    <div class="flex min-h-16 items-center justify-between gap-4 py-3">
      <router-link to="/" class="group flex min-h-11 items-center gap-3 rounded-lg focus:outline-none">
        <img src="/logo.svg" alt="" aria-hidden="true" class="h-9 w-9 shrink-0" />
        <span class="min-w-0">
          <span class="block text-sm font-bold tracking-tight text-[color:var(--pk-ink)]">PostSoma Kitchen</span>
          <span class="block truncate text-[11px] text-[color:var(--pk-ink-muted)]">结构化食谱与可视流程</span>
        </span>
      </router-link>

      <div class="hidden items-center gap-1 md:flex" aria-label="桌面导航">
        <router-link
          to="/"
          :class="navLinkClass(isLibraryActive)"
          :aria-current="isLibraryActive ? 'page' : undefined"
        >
          食谱档案
        </router-link>
        <router-link
          to="/fridge"
          :class="navLinkClass(route.path === '/fridge')"
          :aria-current="route.path === '/fridge' ? 'page' : undefined"
        >
          按食材找方向
        </router-link>
        <router-link
          to="/about"
          :class="navLinkClass(route.path === '/about')"
          :aria-current="route.path === '/about' ? 'page' : undefined"
        >
          关于 & E-E-A-T
        </router-link>
        <span class="mx-2 h-5 w-px bg-[color:var(--pk-border)]" aria-hidden="true"></span>
        <router-link to="/admin" class="pk-button pk-button-secondary">
          Kitchen Studio
        </router-link>
      </div>

      <button
        type="button"
        class="pk-button pk-button-secondary px-3 md:hidden"
        :aria-expanded="showMobileMenu"
        aria-controls="mobile-primary-navigation"
        :aria-label="showMobileMenu ? '关闭导航菜单' : '打开导航菜单'"
        @click="showMobileMenu = !showMobileMenu"
      >
        <AppIcon :name="showMobileMenu ? 'close' : 'menu'" :size="20" />
        <span>导航</span>
      </button>
    </div>

    <div v-if="showMobileMenu" id="mobile-primary-navigation" class="grid gap-1 border-t border-[color:var(--pk-border)] py-3 md:hidden">
      <router-link
        to="/"
        :class="navLinkClass(isLibraryActive)"
        :aria-current="isLibraryActive ? 'page' : undefined"
        @click="showMobileMenu = false"
      >
        食谱档案
      </router-link>
      <router-link
        to="/fridge"
        :class="navLinkClass(route.path === '/fridge')"
        :aria-current="route.path === '/fridge' ? 'page' : undefined"
        @click="showMobileMenu = false"
      >
        按食材找方向
      </router-link>
      <router-link
        to="/about"
        :class="navLinkClass(route.path === '/about')"
        :aria-current="route.path === '/about' ? 'page' : undefined"
        @click="showMobileMenu = false"
      >
        关于 & E-E-A-T
      </router-link>
      <router-link to="/admin" class="min-h-11 rounded-lg px-3 py-2.5 text-sm font-semibold text-[color:var(--pk-ink-secondary)] hover:bg-[color:var(--pk-surface-muted)]" @click="showMobileMenu = false">
        Kitchen Studio
      </router-link>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import AppIcon from '@/components/common/AppIcon.vue'

const route = useRoute()
const showMobileMenu = ref(false)
const isLibraryActive = computed(() => route.path === '/' || route.path.startsWith('/recipe/'))

function navLinkClass(active: boolean): string[] {
  return [
    'min-h-11 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors focus:outline-none',
    active
      ? 'bg-[color:var(--pk-surface-accent)] text-[color:var(--pk-accent-hover)]'
      : 'text-[color:var(--pk-ink-secondary)] hover:bg-[color:var(--pk-surface-muted)] hover:text-[color:var(--pk-ink)]',
  ]
}

watch(() => route.fullPath, () => {
  showMobileMenu.value = false
})
</script>
