<template>
  <main class="pk-page min-h-screen p-4 font-sans md:p-8">
    <div class="max-w-6xl mx-auto space-y-6">
      <!-- 1. 页面头部 Header -->
      <div class="pk-surface flex flex-wrap items-center justify-between gap-4 p-5 md:p-6">
        <div>
          <div class="pk-eyebrow mb-1">内容管理</div>
          <h1 class="flex items-center gap-2 text-xl font-black tracking-tight text-[color:var(--pk-ink)] md:text-2xl">
            <span>PostSoma Kitchen Studio</span>
          </h1>
          <p class="mt-1 text-xs font-medium text-[color:var(--pk-ink-secondary)]">
            结构化食谱创作、质量校验与 Matrix Flow 统一管理
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-2">
          <button
            @click="handleImportBook"
            type="button"
            class="pk-button pk-button-secondary px-3 text-xs"
            title="一键导入弗吉尼亚理工《Home Sweet Home 2003》经典食谱全集"
          >
            <span>导入全集</span>
          </button>

          <button
            type="button"
            class="pk-button pk-button-secondary px-3 text-xs"
            :disabled="coverReconcilePending"
            :aria-busy="coverReconcilePending"
            @click="handleCoverPublicationReconciliation"
          >
            {{ coverReconcilePending ? '正在确认云端状态…' : '按封面整理发布状态' }}
          </button>

          <router-link
            to="/fridge"
            class="pk-button pk-button-secondary px-3 text-xs"
          >
            <span>按食材找方向</span>
          </router-link>

          <button
            @click="isByokOpen = true"
            type="button"
            class="pk-button pk-button-secondary px-3 text-xs"
          >
            <span>辅助排序设置</span>
          </button>

          <router-link
            :to="{ path: '/admin/create', query: { returnTo: adminReturnTo } }"
            @click="rememberCurrentAdminScroll"
            class="pk-button pk-button-primary px-4 text-xs"
          >
            <span>+</span>
            <span>新建食谱</span>
          </router-link>
        </div>
      </div>

      <div
        v-if="loadError"
        class="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs font-semibold text-amber-900"
        role="status"
      >
        {{ loadError }}
      </div>

      <div
        v-if="coverReconcileNotice"
        class="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-semibold leading-relaxed text-emerald-950"
        role="status"
      >
        {{ coverReconcileNotice }}
      </div>

      <!-- 2. 多维度筛选与快捷标签栏 (参考 LKK 多维度筛选) -->
      <div class="pk-surface space-y-4 p-4 md:p-5">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <!-- 维度 1: 烹饪/完成方式 -->
          <div>
            <label class="mb-1 block font-medium text-[color:var(--pk-ink-muted)]">烹饪方式</label>
            <select
              v-model="filterMethod"
              class="pk-field w-full p-2 font-semibold"
            >
              <option value="all">全部烹饪方式</option>
              <option value="fry">中式爆炒</option>
              <option value="stew">砂锅慢炖</option>
              <option value="steam">隔水清蒸</option>
              <option value="bake">西式烘焙</option>
              <option value="serve">冷食拌匀</option>
              <option value="other">其他方式</option>
            </select>
          </div>

          <!-- 维度 2: 工序复杂度 -->
          <div>
            <label class="mb-1 block font-medium text-[color:var(--pk-ink-muted)]">工序复杂度</label>
            <select
              v-model="filterSteps"
              class="pk-field w-full p-2 font-semibold"
            >
              <option value="all">全部步骤数量</option>
              <option value="easy">精简 (1 ~ 2 步)</option>
              <option value="medium">标准 (3 ~ 4 步)</option>
              <option value="hard">多工序 (5 步以上)</option>
            </select>
          </div>

          <!-- 维度 3: 草稿/完整状态 -->
          <div>
            <label class="mb-1 block font-medium text-[color:var(--pk-ink-muted)]">食谱状态</label>
            <select
              v-model="filterStatus"
              class="pk-field w-full p-2 font-semibold"
            >
              <option value="all">全部状态</option>
              <option value="published">公开已发布</option>
              <option value="draft">草稿</option>
            </select>
          </div>
        </div>

        <!-- 快捷分类筛选 Chips (含目标 B: 待分类 筛选视图) -->
        <div class="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-100">
          <span class="mr-1 text-xs font-semibold text-[color:var(--pk-ink-muted)]">快捷过滤</span>
          <button
            @click="setQuickFilter('all')"
            type="button"
            :class="['pk-filter-token', isQuickActive('all') ? 'pk-filter-token-active' : '']"
          >
            全部食谱 ({{ allRecipes.length }})
          </button>

          <button
            @click="setQuickFilter('uncategorized')"
            type="button"
            :class="['pk-filter-token', filterStatus === 'uncategorized' ? 'pk-filter-token-active' : '']"
          >
            <span>待分类确认</span>
            <span v-if="uncategorizedCount > 0" class="rounded bg-amber-100 px-1.5 text-[10px] text-amber-950">{{ uncategorizedCount }}</span>
          </button>

          <button
            @click="setQuickFilter('published')"
            type="button"
            :class="['pk-filter-token', filterStatus === 'published' ? 'pk-filter-token-active' : '']"
          >
            公开已发布
          </button>
          
          <button
            @click="setQuickFilter('draft')"
            type="button"
            :class="['pk-filter-token', filterStatus === 'draft' ? 'pk-filter-token-active' : '']"
          >
            草稿中
          </button>

          <!-- 目标 C: 回收站/已删除 专属视图按钮 -->
          <button
            @click="setQuickFilter('deleted')"
            type="button"
            :class="['pk-filter-token', filterStatus === 'deleted' ? 'border-rose-700 bg-rose-700 text-white' : 'border-rose-200 bg-rose-50 text-rose-800']"
          >
            <span>回收站已删除</span>
            <span v-if="deletedRecipes.length > 0" class="rounded bg-rose-100 px-1.5 text-[10px] text-rose-950">{{ deletedRecipes.length }}</span>
          </button>
          <button
            @click="setQuickFilter('stew')"
            type="button"
            :class="['pk-filter-token', isQuickActive('stew') ? 'pk-filter-token-active' : '']"
          >
            炖煮中餐
          </button>
          <button
            @click="setQuickFilter('serve')"
            type="button"
            :class="['pk-filter-token', isQuickActive('serve') ? 'pk-filter-token-active' : '']"
          >
            冷食饮品
          </button>
        </div>
      </div>

      <!-- 3. 统计结果与排序下拉栏 -->
      <div class="flex items-center justify-between text-xs px-1">
        <div class="text-stone-600 font-medium flex items-center gap-2">
          <span>共 <strong class="text-[color:var(--pk-ink)]">{{ allRecipes.length }}</strong> 道食谱</span>
          <span v-if="filteredRecipes.length !== allRecipes.length" class="text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
            已筛选出 {{ filteredRecipes.length }} 道
          </span>
        </div>

        <div class="flex items-center gap-2">
          <span class="text-stone-400">排序方式:</span>
          <select
            v-model="sortBy"
            class="p-1.5 bg-white border border-stone-300 rounded font-bold text-stone-800 focus:outline-none"
          >
            <option value="updated-desc">更新时间 (最新)</option>
            <option value="updated-asc">更新时间 (最旧)</option>
            <option value="ingredients-desc">食材种类 (由多到少)</option>
            <option value="actions-desc">工序步骤 (由多到少)</option>
          </select>
        </div>
      </div>

      <!-- 4. 食谱卡片网格列表 -->
      <div v-if="filteredRecipes.length === 0" class="bg-white rounded-2xl border border-stone-200 p-12 text-center space-y-4">
        <div class="text-sm font-bold text-[color:var(--pk-ink)]">没有符合筛选条件的食谱</div>
        <p class="text-xs text-stone-400">请尝试重置筛选维度，或新建一道符合条件的可视化食谱。</p>
        <button
          @click="resetFilters"
          type="button"
          class="pk-button pk-button-secondary px-4 text-xs"
        >
          重置所有筛选
        </button>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <RecipeCardV3
          v-for="r in filteredRecipes"
          :key="r.id"
          :recipe="r"
          :admin-return-to="adminReturnTo"
          @refresh="loadRecipes"
          @mutation-confirmed="handleConfirmedMutation"
        />
      </div>
    </div>

    <!-- BYOK 配置模态框 -->
    <ByokSettingsModal
      :isOpen="isByokOpen"
      @close="isByokOpen = false"
    />
  </main>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { VisualRecipeV3 } from '@/types/recipeV3'
import type { RecipeMutationResult } from '@/repositories/IRecipeRepository'
import { getV3Recipes, getDeletedRecipes, importAllPresets } from '@/services/v3RecipeStore'
import {
  previewCoverPublicationReconciliation,
  reconcileRecipePublicationByCover,
} from '@/services/recipeCoverPublicationService'
import RecipeCardV3 from '@/components/recipe-flow-v3/RecipeCardV3.vue'
import ByokSettingsModal from '@/components/common/ByokSettingsModal.vue'
import { validateRecipe } from '@/utils/taxonomyMatcher'
import {
  buildAdminBrowsePath,
  parseAdminBrowseQuery,
  readAdminScrollPosition,
  rememberAdminScrollPosition,
  serializeAdminBrowseState,
} from '@/utils/adminNavigation'

const route = useRoute()
const router = useRouter()
const initialBrowseState = parseAdminBrowseQuery(route.query)

const isByokOpen = ref(false)
const allRecipes = ref<VisualRecipeV3[]>([])
const deletedRecipes = ref<VisualRecipeV3[]>([])
const loadError = ref('')
const coverReconcilePending = ref(false)
const coverReconcileNotice = ref('')

const uncategorizedCount = computed(() => {
  return allRecipes.value.filter(r => !validateRecipe(r).canPublish).length
})

async function loadRecipes() {
  try {
    const [active, deleted] = await Promise.all([getV3Recipes(), getDeletedRecipes()])
    allRecipes.value = active
    deletedRecipes.value = deleted
    loadError.value = ''
  } catch (error) {
    console.error('[Kitchen Studio] 云端列表重新确认失败:', error)
    loadError.value = '暂时无法重新确认云端列表；当前页面保留最近一次已确认状态，请稍后重试。'
  }
}

function upsertRecipe(list: VisualRecipeV3[], recipe: VisualRecipeV3): VisualRecipeV3[] {
  return [recipe, ...list.filter(item => item.id !== recipe.id)]
}

function handleConfirmedMutation(result: RecipeMutationResult) {
  if (!result.ok) return

  if (result.action === 'soft-delete' && result.recipe) {
    allRecipes.value = allRecipes.value.filter(recipe => recipe.id !== result.id)
    deletedRecipes.value = upsertRecipe(deletedRecipes.value, result.recipe)
  } else if (result.action === 'restore' && result.recipe) {
    deletedRecipes.value = deletedRecipes.value.filter(recipe => recipe.id !== result.id)
    allRecipes.value = upsertRecipe(allRecipes.value, result.recipe)
  } else if (result.action === 'permanent-delete') {
    allRecipes.value = allRecipes.value.filter(recipe => recipe.id !== result.id)
    deletedRecipes.value = deletedRecipes.value.filter(recipe => recipe.id !== result.id)
  }

  // 先应用已由云端确认的状态，再后台读取一次完整列表进行最终对账。
  void loadRecipes()
}

async function handleImportBook() {
  try {
    const result = await importAllPresets()
    await loadRecipes()
    if (result.failedCount > 0) {
      alert(`有 ${result.failedCount} 道食谱导入失败，请检查云端权限或数据健康面板。`)
      return
    }
    if (result.addedCount > 0) {
      alert(`成功导入 ${result.addedCount} 道《Home Sweet Home 2003》与《中式蒸炖炒》经典食谱。`)
    } else {
      alert(`已完成检查，全部 ${result.totalCount} 道中西预置食谱均已在你的食谱库中。`)
    }
  } catch (error) {
    console.error('[Kitchen Studio] 导入前云端状态确认失败:', error)
    alert('无法确认云端食谱列表，本次未继续执行导入。')
  }
}

async function handleCoverPublicationReconciliation() {
  if (coverReconcilePending.value) return
  coverReconcileNotice.value = ''
  try {
    const preview = await previewCoverPublicationReconciliation()
    const changeCount = preview.plan.toPublish.length + preview.plan.toDraft.length
    const approved = confirm(
      `将按正式 recipe.coverImageUrl 整理发布状态：\n\n`
      + `• 目标已发布：${preview.plan.targetPublishedCount} 道\n`
      + `• 目标草稿：${preview.plan.targetDraftCount} 道\n`
      + `• 本次转为已发布：${preview.plan.toPublish.length} 道\n`
      + `• 本次转为草稿：${preview.plan.toDraft.length} 道\n`
      + `• 回收站保持不变：${preview.deletedCount} 道\n\n`
      + `仅修改 status；不会改写封面、食材、流程或删除状态。${changeCount ? '确认继续？' : '当前已经一致。'}`,
    )
    if (!approved || changeCount === 0) {
      if (changeCount === 0) coverReconcileNotice.value = '当前发布状态已经与正式封面覆盖情况一致。'
      return
    }

    coverReconcilePending.value = true
    const result = await reconcileRecipePublicationByCover()
    await loadRecipes()
    if (result.failures.length) {
      const failure = result.failures[0]
      alert(`已确认更新 ${result.applied.length} 道后停止。\n《${failure.title}》未获得云端确认：${failure.message}\n列表已重新读取，请确认状态后再重试。`)
      return
    }
    coverReconcileNotice.value = `整理完成：${result.applied.length} 道状态已由云端确认；当前未删除食谱应为 ${result.plan.targetPublishedCount} 道已发布、${result.plan.targetDraftCount} 道草稿，回收站 ${result.deletedCount} 道未改动。`
  } catch (error) {
    console.error('[Kitchen Studio] 封面发布状态整理失败:', error)
    alert('无法完成封面发布状态整理；未确认的操作不会在页面中显示为成功。')
    await loadRecipes()
  } finally {
    coverReconcilePending.value = false
  }
}

// 筛选状态
const filterMethod = ref(initialBrowseState.method)
const filterSteps = ref(initialBrowseState.steps)
const filterStatus = ref(initialBrowseState.status)
const adminPage = ref(initialBrowseState.page)

// 排序状态
const sortBy = ref(initialBrowseState.sort)

const adminReturnTo = computed(() => buildAdminBrowsePath({
  method: filterMethod.value,
  steps: filterSteps.value,
  status: filterStatus.value,
  sort: sortBy.value,
  page: adminPage.value,
}))

function rememberCurrentAdminScroll() {
  rememberAdminScrollPosition(adminReturnTo.value, window.scrollY)
}

onMounted(async () => {
  await loadRecipes()
  await nextTick()
  const savedScroll = readAdminScrollPosition(adminReturnTo.value)
  if (savedScroll !== null) window.scrollTo({ top: savedScroll, behavior: 'auto' })
})

watch(
  () => route.query,
  query => {
    const state = parseAdminBrowseQuery(query)
    filterMethod.value = state.method
    filterSteps.value = state.steps
    filterStatus.value = state.status
    sortBy.value = state.sort
    adminPage.value = state.page
  },
)

watch(
  [filterMethod, filterSteps, filterStatus, sortBy, adminPage],
  () => {
    const nextQuery = serializeAdminBrowseState({
      method: filterMethod.value,
      steps: filterSteps.value,
      status: filterStatus.value,
      sort: sortBy.value,
      page: adminPage.value,
    })
    const currentQuery = serializeAdminBrowseState(parseAdminBrowseQuery(route.query))
    if (JSON.stringify(nextQuery) === JSON.stringify(currentQuery)) return
    void router.replace({ path: '/admin', query: nextQuery })
  },
)

const filteredRecipes = computed(() => {
  let list = [...allRecipes.value]

  // 1. 烹饪方式筛选
  if (filterMethod.value !== 'all') {
    list = list.filter(r => {
      const m = r.finalBlock?.method || 'other'
      if (filterMethod.value === 'serve') {
        return m === 'serve' || m === 'raw'
      }
      if (filterMethod.value === 'other') {
        return m !== 'bake' && m !== 'stew' && m !== 'serve' && m !== 'raw'
      }
      return m === filterMethod.value
    })
  }

  // 2. 步骤数筛选
  if (filterSteps.value !== 'all') {
    list = list.filter(r => {
      const count = r.actionBlocks?.length || 0
      if (filterSteps.value === 'easy') return count <= 2
      if (filterSteps.value === 'medium') return count >= 3 && count <= 4
      if (filterSteps.value === 'hard') return count >= 5
      return true
    })
  }

  // 3. 状态筛选 (含目标 B & C: 待分类视角与回收站视角)
  if (filterStatus.value !== 'all') {
    if (filterStatus.value === 'uncategorized') {
      list = list.filter(r => !validateRecipe(r).canPublish)
    } else if (filterStatus.value === 'deleted') {
      list = [...deletedRecipes.value]
    } else {
      list = list.filter(r => r.status === filterStatus.value)
    }
  }

  // 4. 排序
  list.sort((a, b) => {
    if (sortBy.value === 'updated-desc') {
      return new Date(b.updatedAt || b.createdAt).getTime() - new Date(a.updatedAt || a.createdAt).getTime()
    }
    if (sortBy.value === 'updated-asc') {
      return new Date(a.updatedAt || a.createdAt).getTime() - new Date(b.updatedAt || b.createdAt).getTime()
    }
    if (sortBy.value === 'ingredients-desc') {
      return (b.ingredients?.length || 0) - (a.ingredients?.length || 0)
    }
    if (sortBy.value === 'actions-desc') {
      return (b.actionBlocks?.length || 0) - (a.actionBlocks?.length || 0)
    }
    return 0
  })

  return list
})

function setQuickFilter(value: 'all' | 'stew' | 'serve' | 'published' | 'draft' | 'deleted' | 'uncategorized') {
  filterMethod.value = 'all'
  filterStatus.value = 'all'

  if (value === 'published' || value === 'draft' || value === 'deleted' || value === 'uncategorized') {
    filterStatus.value = value
    return
  }

  filterMethod.value = value
}

function isQuickActive(method: string): boolean {
  return filterMethod.value === method
}

function resetFilters() {
  filterMethod.value = 'all'
  filterSteps.value = 'all'
  filterStatus.value = 'all'
  sortBy.value = 'updated-desc'
  adminPage.value = 1
}
</script>
