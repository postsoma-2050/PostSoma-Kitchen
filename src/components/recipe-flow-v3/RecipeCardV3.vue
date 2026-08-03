<template>
  <div class="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-all duration-300">
    <!-- 1. 卡片头部：状态与烹饪方式标签 -->
    <div class="px-4 py-3 bg-stone-50/80 border-b border-stone-100 flex items-center justify-between">
      <div class="flex items-center gap-1.5">
        <span
          :class="[
            'w-2 h-2 rounded-full',
            recipe.deletedAt
              ? 'bg-rose-500 ring-2 ring-rose-200'
              : (recipe.status === 'published' ? 'bg-emerald-500 ring-2 ring-emerald-100' : 'bg-amber-500 ring-2 ring-amber-100')
          ]"
        ></span>
        <span class="text-xs font-bold text-stone-700">
          {{ recipe.deletedAt ? '已放入回收站' : (recipe.status === 'published' ? '已发布' : '草稿') }}
        </span>
      </div>

      <span class="text-[11px] font-semibold text-stone-500 bg-stone-200/60 px-2 py-0.5 rounded-full">
        {{ getMethodLabel(recipe.finalBlock?.method) }}
      </span>
    </div>

    <!-- 2. 中间：迷你 Flow Card 流程图缩略图 -->
    <div class="p-3 bg-[#FAF8F5] border-b border-stone-100 overflow-x-auto flex justify-center items-center min-h-[160px]">
      <RecipeMiniCanvasV3 :recipe="recipe" />
    </div>

    <!-- 3. 核心文本区：菜名与简述 -->
    <div class="p-4 flex-1 flex flex-col justify-between space-y-2">
      <div>
        <h3 class="font-bold text-stone-900 text-sm line-clamp-1 group-hover:text-emerald-800 transition-colors">
          {{ recipe.title || '未命名食谱' }}
        </h3>
        <p class="text-xs text-stone-500 line-clamp-2 mt-1 leading-relaxed">
          {{ recipe.description || '暂无描述信息' }}
        </p>
      </div>

      <div class="pt-2 border-t border-stone-50 flex items-center justify-between text-xs text-stone-500">
        <span class="font-mono">🥕 {{ recipe.ingredients?.length || 0 }} 项食材</span>
        <span class="font-mono">⚡ {{ recipe.actionBlocks?.length || 0 }} 工序</span>
        <span v-if="recipe.prerequisites?.servings" class="font-mono text-emerald-800">🍽️ {{ recipe.prerequisites.servings }}</span>
      </div>
    </div>

    <!-- 4. 底部：更新时间与操作按键 (目标 B & C: 软删除、恢复、永久删除按钮) -->
    <div class="px-4 py-3 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-xs">
      <span class="text-[10px] text-stone-400">
        {{ formatDate(recipe.updatedAt || recipe.createdAt) }}
      </span>

      <div class="flex items-center gap-1.5">
        <!-- 正常模式：查看、编辑、删除 -->
        <template v-if="!recipe.deletedAt">
          <router-link
            :to="`/recipe/${recipe.id}`"
            class="px-2 py-1 bg-white hover:bg-stone-100 text-stone-700 rounded border border-stone-300 font-medium transition-colors cursor-pointer"
          >
            查看
          </router-link>
          <router-link
            :to="`/admin/edit/${recipe.id}`"
            class="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded font-semibold transition-colors cursor-pointer"
          >
            编辑
          </router-link>
          <!-- 次要样式的软删除按钮 -->
          <button
            @click="handleSoftDelete"
            type="button"
            class="px-2 py-1 text-stone-400 hover:text-rose-700 hover:bg-rose-50 rounded transition-colors cursor-pointer text-xs"
            title="把此食谱放入回收站 (可在已删除恢复)"
          >
            🗑️
          </button>
        </template>

        <!-- 回收站已删除模式：恢复与永久删除 -->
        <template v-else>
          <button
            @click="handleRestore"
            type="button"
            class="px-2.5 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300 rounded font-semibold transition-colors cursor-pointer"
          >
            ↩️ 恢复
          </button>
          <button
            @click="handlePermanentDelete"
            type="button"
            class="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-300 rounded font-semibold transition-colors cursor-pointer"
          >
            🔥 永久删除
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { VisualRecipeV3 } from '@/types/recipeV3'
import RecipeMiniCanvasV3 from './RecipeMiniCanvasV3.vue'
import { softDeleteRecipe, restoreRecipe, permanentlyDeleteRecipe } from '@/services/v3RecipeStore'

const props = defineProps<{
  recipe: VisualRecipeV3
}>()

const emit = defineEmits<{
  (e: 'refresh'): void
}>()

function handleSoftDelete() {
  const title = props.recipe.title || '此食谱'
  if (confirm(`确认把《${title}》移入回收站吗？\n该操作不会删除底层数据，你随时可在“已删除食谱”中找回恢复。`)) {
    softDeleteRecipe(props.recipe.id)
    emit('refresh')
  }
}

function handleRestore() {
  const title = props.recipe.title || '此食谱'
  restoreRecipe(props.recipe.id)
  alert(`🎉 《${title}》已成功恢复并回到你的食谱库！`)
  emit('refresh')
}

function handlePermanentDelete() {
  const title = props.recipe.title || '此食谱'
  const userInput = prompt(`⚠️ 警告：永久删除后数据将物理物理彻底抹除，无法找回！\n如确需永久删除，请输入食谱名称《${title}》确认：`)
  if (userInput === title) {
    permanentlyDeleteRecipe(props.recipe.id)
    alert(`已彻底物理清除《${title}》。`)
    emit('refresh')
  } else if (userInput !== null) {
    alert('输入名称不匹配，操作已取消。')
  }
}

function getMethodLabel(method?: string): string {
  switch (method) {
    case 'bake': return '♨️ 烘焙 Bake'
    case 'stew': return '🍲 慢炖 Stew'
    case 'fry': return '🍳 煎炒 Fry'
    case 'steam': return '💨 蒸制 Steam'
    case 'serve':
    case 'raw': return '🥗 冷食拌匀 Serve'
    default: return '🍳 烹饪制作'
  }
}

function formatDate(isoText?: string) {
  if (!isoText) return ''
  try {
    return new Date(isoText).toLocaleDateString('zh-CN', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch (e) {
    return isoText
  }
}
</script>
