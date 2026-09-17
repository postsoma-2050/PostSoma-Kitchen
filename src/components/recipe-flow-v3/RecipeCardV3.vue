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

      <span class="inline-flex items-center gap-1 text-[11px] font-semibold text-stone-500 bg-stone-200/60 px-2 py-0.5 rounded-full">
        <AppIcon :name="getMethodIconName(recipe.finalBlock?.method)" :size="14" />
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
        <span class="inline-flex items-center gap-1 font-mono"><AppIcon name="seedling" :size="14" />{{ recipe.ingredients?.length || 0 }} 项食材</span>
        <span class="inline-flex items-center gap-1 font-mono"><AppIcon name="steps" :size="14" />{{ recipe.actionBlocks?.length || 0 }} 工序</span>
        <span v-if="recipe.prerequisites?.servings" class="inline-flex items-center gap-1 font-mono text-emerald-800"><AppIcon name="group" :size="14" />{{ recipe.prerequisites.servings }}</span>
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
            :to="{ path: `/admin/edit/${recipe.id}`, query: { returnTo: adminReturnTo } }"
            @click="rememberAdminContext"
            class="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded font-semibold transition-colors cursor-pointer"
          >
            编辑
          </router-link>
          <!-- 次要样式的软删除按钮 -->
          <button
            @click="handleSoftDelete"
            type="button"
            :disabled="pendingAction !== null"
            class="px-2 py-1 text-stone-400 hover:text-rose-700 hover:bg-rose-50 disabled:cursor-wait disabled:opacity-50 rounded transition-colors cursor-pointer text-xs"
            title="把此食谱放入回收站 (可在已删除恢复)"
            :aria-busy="pendingAction === 'soft-delete'"
          >
            <AppIcon v-if="pendingAction !== 'soft-delete'" name="delete" :size="16" />
            <span v-else>确认中…</span>
          </button>
        </template>

        <!-- 回收站已删除模式：恢复与永久删除 -->
        <template v-else>
          <button
            @click="handleRestore"
            type="button"
            :disabled="pendingAction !== null"
            class="px-2.5 py-1 bg-emerald-100 hover:bg-emerald-200 disabled:cursor-wait disabled:opacity-50 text-emerald-900 border border-emerald-300 rounded font-semibold transition-colors cursor-pointer"
            :aria-busy="pendingAction === 'restore'"
          >
            <AppIcon v-if="pendingAction !== 'restore'" name="back" :size="15" />
            <span>{{ pendingAction === 'restore' ? '正在确认…' : '恢复' }}</span>
          </button>
          <button
            @click="beginPermanentDelete"
            type="button"
            :disabled="pendingAction !== null"
            class="px-2 py-1 bg-rose-50 hover:bg-rose-100 disabled:cursor-wait disabled:opacity-50 text-rose-700 border border-rose-300 rounded font-semibold transition-colors cursor-pointer"
            :aria-busy="pendingAction === 'permanent-delete'"
          >
            <AppIcon v-if="pendingAction !== 'permanent-delete'" name="delete" :size="15" />
            <span>{{ pendingAction === 'permanent-delete' ? '正在确认…' : '永久删除' }}</span>
          </button>
        </template>
      </div>
    </div>

    <div
      v-if="recipe.deletedAt && permanentConfirmOpen"
      class="space-y-2 border-t border-rose-200 bg-rose-50 px-4 py-3 text-xs"
    >
      <p class="font-semibold leading-relaxed text-rose-900">
        永久删除不可恢复。请输入完整食谱名称《{{ recipe.title }}》确认。
      </p>
      <input
        v-model="permanentConfirmText"
        type="text"
        :aria-label="`输入《${recipe.title}》确认永久删除`"
        class="w-full rounded-lg border border-rose-300 bg-white px-2.5 py-2 text-stone-900 outline-none focus:border-rose-600"
        autocomplete="off"
      />
      <div class="flex justify-end gap-2">
        <button
          type="button"
          :disabled="pendingAction !== null"
          class="rounded-lg border border-stone-300 bg-white px-3 py-1.5 font-semibold text-stone-700 disabled:opacity-50"
          @click="cancelPermanentDelete"
        >
          取消
        </button>
        <button
          type="button"
          :disabled="permanentConfirmText !== recipe.title || pendingAction !== null"
          class="rounded-lg bg-rose-700 px-3 py-1.5 font-bold text-white disabled:cursor-not-allowed disabled:opacity-40"
          @click="handlePermanentDelete"
        >
          {{ pendingAction === 'permanent-delete' ? '正在确认云端状态…' : '确认永久删除' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { VisualRecipeV3 } from '@/types/recipeV3'
import type { RecipeMutationAction, RecipeMutationResult } from '@/repositories/IRecipeRepository'
import RecipeMiniCanvasV3 from './RecipeMiniCanvasV3.vue'
import { softDeleteRecipe, restoreRecipe, permanentlyDeleteRecipe } from '@/services/v3RecipeStore'
import { rememberAdminScrollPosition, resolveAdminReturnTarget } from '@/utils/adminNavigation'
import AppIcon from '@/components/common/AppIcon.vue'
import type { AppIconName } from '@/types/icon'

const props = defineProps<{
  recipe: VisualRecipeV3
  adminReturnTo?: string
}>()

const adminReturnTo = computed(() => resolveAdminReturnTarget(props.adminReturnTo))

function rememberAdminContext() {
  rememberAdminScrollPosition(adminReturnTo.value, window.scrollY)
}

const emit = defineEmits<{
  (e: 'refresh'): void
  (e: 'mutation-confirmed', result: RecipeMutationResult): void
}>()

const pendingAction = ref<RecipeMutationAction | null>(null)
const permanentConfirmOpen = ref(false)
const permanentConfirmText = ref('')

function handleMutationResult(result: RecipeMutationResult, title: string) {
  if (result.status === 'confirmed') {
    emit('mutation-confirmed', result)
    if (result.action === 'soft-delete') alert(`《${title}》已移入回收站。`)
    if (result.action === 'restore') alert(`《${title}》已恢复到食谱库。`)
    if (result.action === 'permanent-delete') alert(`《${title}》已永久删除。`)
    return
  }

  if (result.status === 'conflict') {
    alert(`操作冲突：${result.message || '云端食谱版本已变化，请重新载入后再试。'}`)
    emit('refresh')
    return
  }

  if (result.status === 'unknown') {
    alert(`操作结果暂时无法确认。系统已重新读取云端状态，但仍未获得明确结果。\n${result.message || '请保持当前页面并稍后重试刷新。'}`)
    emit('refresh')
    return
  }

  alert(result.message || '云端明确拒绝了该操作，页面状态未改变。')
}

function beginPermanentDelete() {
  if (pendingAction.value) return
  permanentConfirmText.value = ''
  permanentConfirmOpen.value = true
}

function cancelPermanentDelete() {
  if (pendingAction.value) return
  permanentConfirmOpen.value = false
  permanentConfirmText.value = ''
}

async function handleSoftDelete() {
  if (pendingAction.value) return
  const title = props.recipe.title || '此食谱'
  if (confirm(`确认把《${title}》移入回收站吗？\n该操作不会删除底层数据，你随时可在“已删除食谱”中找回恢复。`)) {
    pendingAction.value = 'soft-delete'
    try {
      const result = await softDeleteRecipe(props.recipe.id, props.recipe.contentVersion)
      handleMutationResult(result, title)
    } catch (error) {
      console.error('[RecipeCard] 软删除状态确认异常:', error)
      handleMutationResult({
        ok: false,
        action: 'soft-delete',
        id: props.recipe.id,
        status: 'unknown',
        message: '客户端未能完成状态确认，请稍后刷新。',
      }, title)
    } finally {
      pendingAction.value = null
    }
  }
}

async function handleRestore() {
  if (pendingAction.value) return
  const title = props.recipe.title || '此食谱'
  pendingAction.value = 'restore'
  try {
    const result = await restoreRecipe(props.recipe.id, props.recipe.contentVersion)
    handleMutationResult(result, title)
  } catch (error) {
    console.error('[RecipeCard] 恢复状态确认异常:', error)
    handleMutationResult({
      ok: false,
      action: 'restore',
      id: props.recipe.id,
      status: 'unknown',
      message: '客户端未能完成状态确认，请稍后刷新。',
    }, title)
  } finally {
    pendingAction.value = null
  }
}

async function handlePermanentDelete() {
  if (pendingAction.value) return
  const title = props.recipe.title || '此食谱'
  if (permanentConfirmText.value !== title) return

  pendingAction.value = 'permanent-delete'
  try {
    const result = await permanentlyDeleteRecipe(props.recipe.id, props.recipe.contentVersion)
    handleMutationResult(result, title)
    if (result.status === 'confirmed') {
      permanentConfirmOpen.value = false
      permanentConfirmText.value = ''
    }
  } catch (error) {
    console.error('[RecipeCard] 永久删除状态确认异常:', error)
    handleMutationResult({
      ok: false,
      action: 'permanent-delete',
      id: props.recipe.id,
      status: 'unknown',
      message: '客户端未能完成状态确认，请稍后刷新。',
    }, title)
  } finally {
    pendingAction.value = null
  }
}

function getMethodLabel(method?: string): string {
  switch (method) {
    case 'bake': return '烘焙 Bake'
    case 'stew': return '慢炖 Stew'
    case 'fry': return '煎炒 Fry'
    case 'steam': return '蒸制 Steam'
    case 'serve':
    case 'raw': return '冷食拌匀 Serve'
    default: return '烹饪制作'
  }
}

function getMethodIconName(method?: string): AppIconName {
  switch (method) {
    case 'bake': return 'cake'
    case 'stew': return 'bowl'
    case 'fry': return 'fire'
    case 'steam': return 'steam'
    case 'serve':
    case 'raw': return 'leaf'
    default: return 'restaurant'
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
