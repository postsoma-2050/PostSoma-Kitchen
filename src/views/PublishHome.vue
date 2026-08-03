<template>
  <div class="min-h-screen bg-[#FAF8F5] text-stone-800 p-4 md:p-8 font-sans">
    <div class="max-w-7xl mx-auto space-y-6">
      
      <!-- 1. PostSoma Kitchen 沉浸式 Hero 发现展台 -->
      <div class="relative bg-gradient-to-br from-[#1F4030] via-[#2D5A43] to-[#1C2520] text-white p-6 md:p-10 rounded-3xl shadow-lg overflow-hidden border border-[#1F4030]">
        <!-- 背景柔和草本光斑 decoration -->
        <div class="absolute -top-24 -right-24 w-96 h-96 bg-[#2D5A43]/20 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-[#D49B35]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div class="relative z-10 space-y-6">
          <!-- 顶部标题与强化 CTA -->
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div class="space-y-2">
              <div class="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-emerald-100 border border-white/20 rounded-full text-xs font-bold backdrop-blur-md">
                <span>PostSoma Kitchen</span>
                <span class="text-white/40">|</span>
                <span>Visual Cookbook</span>
              </div>
              <h1 class="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
                整理每一道料理的清晰流程
              </h1>
              <p class="text-xs sm:text-sm text-emerald-100/80 max-w-2xl leading-relaxed">
                Visual Recipe Flow Card 视觉流程卡，清晰呈现食材与时序依赖，让下厨从容不慌乱。
              </p>
            </div>

            <!-- 核心入口：清冰箱智能匹配 CTA 卡片 -->
            <router-link
              to="/fridge"
              class="shrink-0 bg-[#D49B35] hover:bg-[#C28C2B] text-white p-4 sm:p-5 rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.01] transition-all duration-200 flex items-center gap-3 border border-[#B87D2B] group"
            >
              <div class="w-11 h-11 rounded-xl bg-black/15 backdrop-blur-md flex items-center justify-center text-xl group-hover:scale-105 transition-transform">
                🧊
              </div>
              <div>
                <div class="text-sm font-black leading-tight flex items-center gap-1">
                  <span>清冰箱食材匹配</span>
                  <span class="text-xs">→</span>
                </div>
                <div class="text-[11px] text-amber-100 font-medium mt-0.5">现有余料一键组合菜谱</div>
              </div>
            </router-link>
          </div>

          <!-- 中央放大搜索框 + 热搜 Chips -->
          <div class="pt-2 max-w-3xl space-y-3">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="搜索菜名、主料食材 (如: 鸡肉 / 布朗尼 / 黄油 / 炖肉)..."
                class="w-full pl-11 pr-24 py-3.5 bg-white/95 text-stone-900 placeholder-stone-400 rounded-2xl text-sm font-semibold shadow-inner focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all"
              />
              <span class="absolute left-4 top-3.5 text-stone-400 text-base">🔍</span>
              <button
                v-if="searchQuery"
                @click="searchQuery = ''"
                type="button"
                class="absolute right-4 top-3.5 text-stone-400 hover:text-stone-700 text-xs font-bold"
              >
                清空
              </button>
            </div>

            <!-- 热搜推荐 Chips (LKK Discovery Style) -->
            <div class="flex flex-wrap items-center gap-2 text-xs text-stone-300">
              <span class="text-stone-400 font-medium">🔥 热门搜索:</span>
              <button
                v-for="hot in hotTags"
                :key="hot.query"
                @click="applyHotTag(hot.query)"
                type="button"
                class="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-stone-200 rounded-full border border-white/15 transition-all text-[11px] font-medium"
              >
                #{{ hot.label }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. 多维 Pill 筛选器 (LKK 风格 Pill 为主) -->
      <div class="bg-white p-5 rounded-3xl border border-stone-200/80 shadow-sm space-y-4">
        <!-- 维度 1: 烹饪方式 Pill -->
        <div class="space-y-1.5">
          <div class="text-[11px] font-bold text-stone-400 uppercase tracking-wider">烹饪方式 (Cooking Method)</div>
          <div class="flex flex-wrap items-center gap-2 overflow-x-auto pb-1 text-xs">
            <button
              v-for="m in methodOptions"
              :key="m.value"
              @click="filterMethod = m.value"
              type="button"
              :class="[
                'px-3.5 py-1.5 rounded-full font-bold transition-all border shrink-0',
                filterMethod === m.value
                  ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                  : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
              ]"
            >
              <span>{{ m.icon }}</span>
              <span class="ml-1">{{ m.label }}</span>
            </button>
          </div>
        </div>

        <!-- 维度 2 & 3: 菜系风味与难度 Pill -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-stone-100">
          <div class="space-y-1.5">
            <div class="text-[11px] font-bold text-stone-400 uppercase tracking-wider">菜系风味 (Cuisine Style)</div>
            <div class="flex flex-wrap items-center gap-2 text-xs">
              <button
                v-for="c in cuisineOptions"
                :key="c.value"
                @click="filterCuisine = c.value"
                type="button"
                :class="[
                  'px-3 py-1.5 rounded-full font-bold transition-all border',
                  filterCuisine === c.value
                    ? 'bg-emerald-700 text-white border-emerald-800 shadow-sm'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                ]"
              >
                <span>{{ c.icon }}</span>
                <span class="ml-1">{{ c.label }}</span>
              </button>
            </div>
          </div>

          <div class="space-y-1.5">
            <div class="text-[11px] font-bold text-stone-400 uppercase tracking-wider">烹饪难度 (Difficulty)</div>
            <div class="flex flex-wrap items-center gap-2 text-xs">
              <button
                v-for="d in difficultyOptions"
                :key="d.value"
                @click="filterDifficulty = d.value"
                type="button"
                :class="[
                  'px-3 py-1.5 rounded-full font-bold transition-all border',
                  filterDifficulty === d.value
                    ? 'bg-amber-600 text-white border-amber-700 shadow-sm'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                ]"
              >
                <span>{{ d.icon }}</span>
                <span class="ml-1">{{ d.label }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 3. 已选 Chips 面包屑 + 结果计数 + 排序下拉 -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-stone-100/60 p-4 rounded-2xl border border-stone-200/60 text-xs">
        <div class="flex flex-wrap items-center gap-2">
          <span class="text-stone-500 font-medium">已选条件:</span>

          <!-- 动态已选 Chips -->
          <template v-if="hasActiveFilter">
            <span v-if="searchQuery" class="inline-flex items-center gap-1 px-2.5 py-1 bg-white text-stone-800 border border-stone-300 rounded-full font-bold">
              <span>关键词: {{ searchQuery }}</span>
              <button @click="searchQuery = ''" class="hover:text-rose-600 font-bold ml-0.5">✕</button>
            </span>

            <span v-if="filterMethod !== 'all'" class="inline-flex items-center gap-1 px-2.5 py-1 bg-white text-stone-800 border border-stone-300 rounded-full font-bold">
              <span>方式: {{ getOptionLabel(methodOptions, filterMethod) }}</span>
              <button @click="filterMethod = 'all'" class="hover:text-rose-600 font-bold ml-0.5">✕</button>
            </span>

            <span v-if="filterCuisine !== 'all'" class="inline-flex items-center gap-1 px-2.5 py-1 bg-white text-stone-800 border border-stone-300 rounded-full font-bold">
              <span>菜系: {{ getOptionLabel(cuisineOptions, filterCuisine) }}</span>
              <button @click="filterCuisine = 'all'" class="hover:text-rose-600 font-bold ml-0.5">✕</button>
            </span>

            <span v-if="filterDifficulty !== 'all'" class="inline-flex items-center gap-1 px-2.5 py-1 bg-white text-stone-800 border border-stone-300 rounded-full font-bold">
              <span>难度: {{ getOptionLabel(difficultyOptions, filterDifficulty) }}</span>
              <button @click="filterDifficulty = 'all'" class="hover:text-rose-600 font-bold ml-0.5">✕</button>
            </span>

            <button
              @click="resetFilters"
              type="button"
              class="text-emerald-700 hover:text-emerald-900 font-bold underline ml-1 cursor-pointer"
            >
              清除全部
            </button>
          </template>

          <span v-else class="text-stone-400 italic">全部食谱库</span>
        </div>

        <!-- 结果数量与排序下拉 -->
        <div class="flex items-center justify-between sm:justify-end gap-4 shrink-0">
          <span class="text-stone-600">
            共找到 <strong class="text-stone-900 font-black text-sm">{{ filteredRecipes.length }}</strong> 道精选食谱
          </span>

          <div class="flex items-center gap-1.5">
            <span class="text-stone-400">排序:</span>
            <select
              v-model="sortBy"
              class="px-2.5 py-1.5 bg-white border border-stone-300 rounded-xl font-bold text-stone-800 focus:outline-none focus:border-emerald-600"
            >
              <option value="updated-desc">最新发布</option>
              <option value="ingredients-desc">食材丰富度</option>
              <option value="steps-asc">工序步数 (最少)</option>
            </select>
          </div>
        </div>
      </div>

      <!-- 4. 食谱卡片网格列表 (LKK 高颜值网格) -->
      <div>
        <div v-if="filteredRecipes.length === 0" class="bg-white rounded-3xl border border-stone-200 p-12 text-center space-y-3">
          <div class="text-4xl">🔍</div>
          <div class="text-base font-bold text-stone-800">暂无符合条件的食谱</div>
          <p class="text-xs text-stone-400">尝试更换搜索关键字或重置筛选条件</p>
          <button
            @click="resetFilters"
            class="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold border border-stone-300 transition-colors"
          >
            重置所有筛选
          </button>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PublishRecipeCard
            v-for="r in filteredRecipes"
            :key="r.id"
            :recipe="r"
          />
        </div>
      </div>

      <!-- Footer 隐蔽的管理后台入口 -->
      <div class="pt-8 pb-4 text-center text-xs text-stone-400 flex items-center justify-center gap-4 border-t border-stone-200/60 no-print">
        <span>© Time_to_eat · Visual Recipe System</span>
        <span>•</span>
        <router-link to="/admin" class="hover:text-stone-600 transition-colors font-medium">
          ⚙️ 食谱管理后台 (Admin)
        </router-link>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { VisualRecipeV3 } from '@/types/recipeV3'
import { getPublishedRecipes } from '@/services/v3RecipeStore'
import PublishRecipeCard from '@/components/publish/PublishRecipeCard.vue'

const publishedRecipes = ref<VisualRecipeV3[]>([])

const searchQuery = ref('')
const filterMethod = ref('all')
const filterCuisine = ref('all')
const filterDifficulty = ref('all')
const sortBy = ref('updated-desc')

// 热门搜索推荐 Tags
const hotTags = [
  { label: '快手炒菜', query: '鸡肉' },
  { label: '蒸制甜品', query: '布朗尼' },
  { label: '浓郁慢炖', query: '五花肉' },
  { label: '下饭经典', query: '黄油' }
]

// 烹饪方式选项
const methodOptions = [
  { label: '全部方式', value: 'all', icon: '🍽️' },
  { label: '烘焙 Bake', value: 'bake', icon: '♨️' },
  { label: '慢炖 Stew', value: 'stew', icon: '🍲' },
  { label: '煎炒爆炒 Fry', value: 'fry', icon: '🍳' },
  { label: '蒸制 Steam', value: 'steam', icon: '💨' },
  { label: '冷拌 Serve', value: 'serve', icon: '🥗' }
]

// 菜系选项
const cuisineOptions = [
  { label: '全部菜系', value: 'all', icon: '🌐' },
  { label: '中式经典', value: 'chinese', icon: '🇨🇳' },
  { label: '西式家常', value: 'western', icon: '🌎' }
]

// 难度选项
const difficultyOptions = [
  { label: '全部难度', value: 'all', icon: '📊' },
  { label: '简单易做', value: 'easy', icon: '🟢' },
  { label: '中等进阶', value: 'medium', icon: '🟡' },
  { label: '繁复大菜', value: 'hard', icon: '🔴' }
]

onMounted(() => {
  publishedRecipes.value = getPublishedRecipes()
})

function applyHotTag(query: string) {
  searchQuery.value = query
}

function getOptionLabel(options: { label: string; value: string }[], val: string): string {
  const found = options.find(o => o.value === val)
  return found ? found.label : val
}

const hasActiveFilter = computed(() => {
  return searchQuery.value !== '' || filterMethod.value !== 'all' || filterCuisine.value !== 'all' || filterDifficulty.value !== 'all'
})

function resetFilters() {
  searchQuery.value = ''
  filterMethod.value = 'all'
  filterCuisine.value = 'all'
  filterDifficulty.value = 'all'
}

const filteredRecipes = computed(() => {
  let list = [...publishedRecipes.value]

  // 1. 关键字搜索
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.trim().toLowerCase()
    list = list.filter(r => {
      const matchTitle = r.title.toLowerCase().includes(q)
      const matchDesc = r.description?.toLowerCase().includes(q)
      const matchIng = r.ingredients?.some(i => i.name.toLowerCase().includes(q))
      return matchTitle || matchDesc || matchIng
    })
  }

  // 2. 烹饪方式筛选
  if (filterMethod.value !== 'all') {
    list = list.filter(r => {
      const m = r.finalBlock?.method || 'other'
      if (filterMethod.value === 'serve') {
        return m === 'serve' || m === 'raw'
      }
      return m === filterMethod.value
    })
  }

  // 3. 菜系筛选
  if (filterCuisine.value !== 'all') {
    list = list.filter(r => {
      const isChinese = r.id.startsWith('cn-') || r.cuisine === 'chinese'
      if (filterCuisine.value === 'chinese') return isChinese
      if (filterCuisine.value === 'western') return !isChinese
      return true
    })
  }

  // 4. 难度筛选
  if (filterDifficulty.value !== 'all') {
    list = list.filter(r => r.difficulty === filterDifficulty.value)
  }

  // 5. 排序
  if (sortBy.value === 'updated-desc') {
    list.sort((a, b) => new Date(b.updatedAt || b.createdAt).getTime() - new Date(a.updatedAt || a.createdAt).getTime())
  } else if (sortBy.value === 'ingredients-desc') {
    list.sort((a, b) => (b.ingredients?.length || 0) - (a.ingredients?.length || 0))
  } else if (sortBy.value === 'steps-asc') {
    list.sort((a, b) => (a.actionBlocks?.length || 0) - (b.actionBlocks?.length || 0))
  }

  return list
})
</script>
