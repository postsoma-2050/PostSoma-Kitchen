<template>
  <div id="app" class="min-h-screen pk-page">
    <GlobalNavigation v-if="showPublicFrame" />
    <router-view />
    <GlobalFooter v-if="showPublicFrame" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import GlobalFooter from '@/components/GlobalFooter.vue'
import GlobalNavigation from '@/components/GlobalNavigation.vue'

const route = useRoute()
const showPublicFrame = computed(() => !route.path.startsWith('/admin'))
</script>
