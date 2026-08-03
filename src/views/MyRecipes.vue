<template>
  <div class="min-h-screen bg-stone-100 text-stone-800 p-4 md:p-8 font-sans">
    <div class="max-w-6xl mx-auto space-y-6">
      <!-- 1. 页面头部 Header -->
      <div class="bg-white p-6 rounded-2xl border border-[#E5E2DC] shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#EBF2ED] text-[#2D5A43] text-[10px] font-bold border border-[#C5D8CC] mb-1">
            Studio Control Panel
          </div>
          <h1 class="text-xl md:text-2xl font-black text-[#1C2520] tracking-tight flex items-center gap-2">
            <span>PostSoma Kitchen Studio</span>
          </h1>
          <p class="text-xs text-[#58605B] mt-1 font-medium">
            结构化食谱创作、质量门槛校验与 Visual Recipe Flow Card 统一管控
          </p>
        </div>

        <div class="flex items-center gap-2">
          <button
            @click="handleImportBook"
            type="button"
            class="px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-300 rounded-lg text-xs font-bold transition-colors inline-flex items-center gap-1 cursor-pointer"
            title="一键导入弗吉尼亚理工《Home Sweet Home 2003》经典食谱全集"
          >
            <span>📖</span>
            <span>导入全集</span>
          </button>

          <router-link
            to="/fridge"
            class="px-3.5 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-lg text-xs font-bold transition-colors inline-flex items-center gap-1 cursor-pointer"
          >
            <span>🧊</span>
            <span>清冰箱匹配</span>
          </router-link>

          <button
            @click="isByokOpen = true"
            type="button"
            class="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-300 rounded-lg text-xs font-bold transition-colors inline-flex items-center gap-1 cursor-pointer"
          >
            <span>🔑</span>
            <span>BYOK 密钥</span>
          </button>

          <router-link
            to="/admin/create"
            class="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors cursor-pointer inline-flex items-center gap-1.5"
          >
            <span>+</span>
            <span>新建食谱</span>
          </router-link>
        </div>
      </div>

      <!-- 2. 多维度筛选与快捷标签栏 (参考 LKK 多维度筛选) -->
      <div class="bg-white p-4 md:p-5 rounded-2xl border border-stone-200 shadow-sm space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <!-- 维度 1: 烹饪/完成方式 -->
          <div>
            <label class="block text-stone-500 font-medium mb-1">烹饪方式 (Cooking Method)</label>
            <select
              v-model="filterMethod"
              class="w-full p-2 bg-stone-50 border border-stone-300 rounded-md font-semibold text-stone-800 focus:outline-none focus:border-emerald-600"
            >
              <option value="all">全部烹饪方式</option>
              <option value="fry">🍳 中式爆炒 Fry</option>
              <option value="stew">🍲 砂锅慢炖 Stew</option>
              <option value="steam">♨️ 隔水清蒸 Steam</option>
              <option value="bake">🍞 西式烘焙 Bake</option>
              <option value="serve">🥗 冷食拌匀 Serve</option>
              <option value="other">🍽️ 其他方式</option>
            </select>
          </div>

          <!-- 维度 2: 工序复杂度 -->
          <div>
            <label class="block text-stone-500 font-medium mb-1">工序复杂度 (Steps Count)</label>
            <select
              v-model="filterSteps"
              class="w-full p-2 bg-stone-50 border border-stone-300 rounded-md font-semibold text-stone-800 focus:outline-none focus:border-emerald-600"
            >
              <option value="all">全部步骤数量</option>
              <option value="easy">精简 (1 ~ 2 步)</option>
              <option value="medium">标准 (3 ~ 4 步)</option>
              <option value="hard">多工序 (5 步以上)</option>
            </select>
          </div>

          <!-- 维度 3: 草稿/完整状态 -->
          <div>
            <label class="block text-stone-500 font-medium mb-1">食谱状态 (Status)</label>
            <select
              v-model="filterStatus"
              class="w-full p-2 bg-stone-50 border border-stone-300 rounded-md font-semibold text-stone-800 focus:outline-none focus:border-emerald-600"
            >
              <option value="all">全部状态</option>
              <option value="complete">✅ 完整食谱</option>
              <option value="draft">📝 草稿</option>
            </select>
          </div>
        </div>

        <!-- 快捷分类筛选 Chips (含目标 B: 待分类 筛选视图) -->
        <div class="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-100">
          <span class="text-stone-400 text-xs font-semibold mr-1">快捷过滤:</span>
          <button
            @click="setQuickFilter('all')"
            type="button"
            :class="['px-2.5 py-1 rounded-full text-xs font-semibold border cursor-pointer transition-colors', isQuickActive('all') ? 'bg-stone-800 text-white border-stone-900' : 'bg-stone-100 text-stone-700 border-stone-200 hover:bg-stone-200']"
          >
            全部食谱 ({{ allRecipes.length }})
          </button>

          <button
            @click="setQuickFilter('uncategorized')"
            type="button"
            :class="['px-2.5 py-1 rounded-full text-xs font-bold border cursor-pointer transition-colors inline-flex items-center gap-1', filterStatus === 'uncategorized' ? 'bg-amber-600 text-white border-amber-700' : 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100']"
          >
            <span>⚠️</span>
            <span>待分类确认</span>
            <span v-if="uncategorizedCount > 0" class="px-1.5 py-0.2 bg-amber-200 text-amber-950 rounded-full text-[10px]">{{ uncategorizedCount }}</span>
          </button>

          <button
            @click="setQuickFilter('published')"
            type="button"
            :class="['px-2.5 py-1 rounded-full text-xs font-semibold border cursor-pointer transition-colors', filterStatus === 'published' ? 'bg-emerald-700 text-white border-emerald-800' : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100']"
          >
            ✅ 公开已发布
          </button>
          
          <button
            @click="setQuickFilter('draft')"
            type="button"
            :class="['px-2.5 py-1 rounded-full text-xs font-semibold border cursor-pointer transition-colors', filterStatus === 'draft' ? 'bg-stone-700 text-white border-stone-800' : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100']"
          >
            📝 草稿中
          </button>

          <!-- 目标 C: 回收站/已删除 专属视图按钮 -->
          <button
            @click="setQuickFilter('deleted')"
            type="button"
            :class="['px-2.5 py-1 rounded-full text-xs font-bold border cursor-pointer transition-colors inline-flex items-center gap-1', filterStatus === 'deleted' ? 'bg-rose-700 text-white border-rose-800' : 'bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100']"
          >
            <span>🗑️</span>
            <span>回收站已删除</span>
            <span v-if="deletedRecipes.length > 0" class="px-1.5 py-0.2 bg-rose-200 text-rose-950 rounded-full text-[10px]">{{ deletedRecipes.length }}</span>
          </button>
          <button
            @click="setQuickFilter('stew')"
            :class="['px-2.5 py-1 rounded-full text-xs font-semibold border cursor-pointer transition-colors', isQuickActive('stew') ? 'bg-emerald-700 text-white border-emerald-800' : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100']"
          >
            🍲 炖煮中餐
          </button>
          <button
            @click="setQuickFilter('serve')"
            :class="['px-2.5 py-1 rounded-full text-xs font-semibold border cursor-pointer transition-colors', isQuickActive('serve') ? 'bg-blue-700 text-white border-blue-800' : 'bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100']"
          >
            🥗 冷食饮品
          </button>
        </div>
      </div>

      <!-- 3. 统计结果与排序下拉栏 -->
      <div class="flex items-center justify-between text-xs px-1">
        <div class="text-stone-600 font-medium flex items-center gap-2">
          <span>共 <strong class="text-stone-900">{{ allRecipes.length }}</strong> 道 Visual Recipes</span>
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
        <div class="text-4xl">🔍</div>
        <div class="text-sm font-bold text-stone-700">没有符合筛选条件的食谱</div>
        <p class="text-xs text-stone-400">请尝试重置筛选维度，或新建一道符合条件的可视化食谱。</p>
        <button
          @click="resetFilters"
          type="button"
          class="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-semibold transition-colors cursor-pointer border border-stone-300"
        >
          重置所有筛选
        </button>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <RecipeCardV3
          v-for="r in filteredRecipes"
          :key="r.id"
          :recipe="r"
          @refresh="loadRecipes"
        />
      </div>
    </div>

    <!-- BYOK 配置模态框 -->
    <ByokSettingsModal
      :isOpen="isByokOpen"
      @close="isByokOpen = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { VisualRecipeV3 } from '@/types/recipeV3'
import { getV3Recipes, getDeletedRecipes, importAllPresets } from '@/services/v3RecipeStore'
import RecipeCardV3 from '@/components/recipe-flow-v3/RecipeCardV3.vue'
import { validateRecipeTaxonomyForPublish } from '@/utils/taxonomyMatcher'

const isByokOpen = ref(false)
const allRecipes = ref<VisualRecipeV3[]>([])
const deletedRecipes = ref<VisualRecipeV3[]>([])

const uncategorizedCount = computed(() => {
  return allRecipes.value.filter(r => !validateRecipeTaxonomyForPublish(r).isValid).length
})

function loadRecipes() {
  allRecipes.value = getV3Recipes()
  deletedRecipes.value = getDeletedRecipes()
}

function handleImportBook() {
  const result = importAllPresets()
  loadRecipes()
  if (result.addedCount > 0) {
    alert(`🎉 成功导入 ${result.addedCount} 道《Home Sweet Home 2003》与《中式蒸炖炒》经典食谱！`)
  } else {
    alert(`已完成检查，全部 ${result.totalCount} 道中西预置食谱均已在你的食谱库中。`)
  }
}

// 筛选状态
const filterMethod = ref<string>('all')
const filterSteps = ref<string>('all')
const filterStatus = ref<string>('all')

// 排序状态
const sortBy = ref<string>('updated-desc')

onMounted(() => {
  allRecipes.value = getV3Recipes()
})

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
      list = list.filter(r => !validateRecipeTaxonomyForPublish(r).isValid)
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

function setQuickFilter(method: string) {
  filterMethod.value = method
}

function isQuickActive(method: string): boolean {
  return filterMethod.value === method
}

function resetFilters() {
  filterMethod.value = 'all'
  filterSteps.value = 'all'
  filterStatus.value = 'all'
  sortBy.value = 'updated-desc'
}
</script>
