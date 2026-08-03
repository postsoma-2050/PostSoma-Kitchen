<template>
  <footer class="bg-white border border-[#E5E2DC] max-w-7xl mx-auto rounded-2xl p-5 text-center mt-10 shadow-sm no-print">
    <div class="space-y-2">
      <!-- 主要信息与 PostSoma 生态背书 -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs">
        <span class="font-black tracking-tight text-[#1C2520]">PostSoma Kitchen</span>
        <span class="hidden sm:inline text-[#D5D1C8]">|</span>
        <span class="text-[#58605B] font-medium">Visual Cookbook</span>
        <span class="hidden sm:inline text-[#D5D1C8]">|</span>
        <span class="text-[#8A928C] italic">A PostSoma Craft & Memory Workspace</span>
      </div>

      <p class="text-[11px] text-[#8A928C]">
        把每一道料理，整理成清晰、可执行、可沉淀的 Visual Recipe Flow Card。
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
// PostSoma Kitchen Footer 零复杂逻辑组件
</script>

<style scoped>
footer {
  transition: border-color 0.2s ease;
}
</style>
