<template>
  <div id="app" class="min-h-screen pk-page">
    <GlobalNavigation v-if="showPublicFrame" />
    <router-view />
    <GlobalFooter v-if="showPublicFrame" />
    <!-- 水墨小主厨 (Recipe 配件皮肤：高耸白厨师帽 + 原木锅铲) -->
    <Mascot v-if="showPublicFrame" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue"
import { useRoute } from "vue-router"
import GlobalFooter from "@/components/GlobalFooter.vue"
import GlobalNavigation from "@/components/GlobalNavigation.vue"
import Mascot from "@/components/Mascot.vue"
import { updateSeoMeta, GLOBAL_ROOT_SCHEMAS } from "@/utils/seoHelper"

const route = useRoute()
const showPublicFrame = computed(() => !route.path.startsWith("/admin"))

onMounted(() => {
  // 注入根级全站 Schema (WebSite, Organization, SoftwareApplication)
  updateSeoMeta({
    jsonLdSchemas: GLOBAL_ROOT_SCHEMAS
  })
})
</script>
