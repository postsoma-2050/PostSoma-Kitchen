<template>
  <main id="main-content" class="pk-page min-h-screen p-3 font-sans sm:p-4 md:p-8">
    <div class="max-w-6xl mx-auto space-y-4 md:space-y-6">
      
      <!-- 1. 顶栏返回导航与消费型动作栏 -->
      <div class="flex items-center justify-between gap-4 no-print">
        <div class="flex items-center gap-2">
          <router-link
            to="/"
            class="pk-button pk-button-secondary px-3 text-xs sm:px-4"
          >
            <span>←</span>
            <span>返回食谱库</span>
          </router-link>

          <span v-if="isLocalSource" class="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/90 px-2.5 py-1 rounded-full inline-flex items-center gap-1 shadow-2xs">
            <span>🧪</span>
            <span>本地最新模型预览</span>
          </span>
        </div>

        <!-- 右侧消费型动作组 (分享 / 复制链接) -->
        <div v-if="recipe" class="flex items-center gap-2">
          <button
            @click="handleShare"
            type="button"
            class="pk-button pk-button-secondary px-3 text-xs sm:px-4"
          >
            <svg viewBox="0 0 20 20" class="h-4 w-4" fill="none" aria-hidden="true"><path d="M7.5 11.5 12.5 6.5M6 13.5l-1 1a3 3 0 0 0 4.2 4.2l2-2a3 3 0 0 0 0-4.2M14 6.5l1-1a3 3 0 1 0-4.2-4.2l-2 2a3 3 0 0 0 0 4.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" /></svg>
            <span>{{ copySuccess ? '已复制食谱链接！' : '分享食谱' }}</span>
          </button>
        </div>
      </div>

      <div v-if="isLoading" class="pk-surface p-12 text-center text-sm font-semibold text-[color:var(--pk-ink-secondary)]">
        正在同步公开食谱…
      </div>

      <!-- 2. 食谱未找到 404 状态 -->
      <div v-else-if="notFound" class="pk-surface space-y-4 p-12 text-center">
        <div class="text-base font-bold text-[color:var(--pk-ink)]">未找到指定的食谱</div>
        <p class="text-sm text-[color:var(--pk-ink-secondary)]">该食谱可能已被移除，或使用了无效的链接参数。</p>
        <router-link
          to="/"
          class="pk-button pk-button-primary"
        >
          返回食谱库
        </router-link>
      </div>

      <!-- 3. Publish 食谱详情主内容区 -->
      <div v-else-if="recipe" class="space-y-4 md:space-y-6">
        
        <!-- 3.1 封面图片 Hero 头部与料理基本信息 -->
        <div class="pk-surface overflow-hidden">
          <div
            class="relative h-56 w-full overflow-hidden bg-[color:var(--pk-surface-muted)] sm:h-80 md:h-96"
            :data-cover-state="coverAsset?.state || 'fallback'"
          >
            <img
              v-if="coverAsset && !imgError"
              :src="coverAsset.url"
              :alt="recipe.title"
              @error="imgError = true"
              class="w-full h-full object-cover"
            />
            <div v-else class="recipe-detail-fallback flex h-full w-full items-center justify-center" aria-hidden="true">
              <svg viewBox="0 0 120 120" class="h-24 w-24 text-[color:var(--pk-ink-muted)] opacity-55" fill="none">
                <circle cx="60" cy="60" r="38" stroke="currentColor" stroke-width="1.5" />
                <circle cx="60" cy="60" r="26" stroke="currentColor" stroke-width="1" opacity="0.55" />
                <path d="M39 64c7 10 35 10 42 0M45 52h30" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
              </svg>
            </div>

            <!-- 浮动遮罩 Hero 信息层 -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-4 sm:p-6 md:p-8 text-white space-y-2.5 sm:space-y-3">
              <!-- 元信息标签阶梯 -->
              <div class="flex flex-wrap items-center gap-2 text-xs font-bold select-none">
                <span class="rounded-md border border-white/30 bg-black/40 px-2.5 py-1 sm:px-3">
                  {{ getRecipeMethodLabel(recipe.finalBlock?.method) }}
                </span>

                <span class="rounded-md border border-white/20 bg-black/50 px-2.5 py-1 sm:px-3">
                  {{ durationLabel }}
                </span>

                <span
                  v-if="servingsPresentation"
                  class="inline-flex rounded-md border border-white/20 bg-black/50 px-2.5 py-1 sm:px-3"
                >
                  {{ servingsPresentation.label }}：{{ servingsPresentation.value }}
                </span>

                <span v-if="recipe.difficulty" class="rounded-md border border-white/20 bg-black/50 px-2.5 py-1 sm:px-3">
                  {{ getRecipeDifficultyLabel(recipe.difficulty) }}
                </span>
              </div>

              <!-- 核心大标题 -->
              <h1 class="text-[1.65rem] sm:text-3xl md:text-4xl font-black tracking-tight drop-shadow-sm leading-tight">
                {{ getRecipeDisplayTitle(recipe.title) }}
              </h1>
            </div>
          </div>

          <!-- 食谱简介描述 -->
          <div v-if="recipe.description" class="border-t border-[color:var(--pk-border)] bg-[color:var(--pk-surface)] p-4 text-[13px] leading-relaxed text-[color:var(--pk-ink-secondary)] sm:p-6 sm:text-sm md:p-8">
            <p>{{ recipe.description }}</p>
          </div>
        </div>

        <!-- 3.2 开火前备料区：忠实展示原始食材与 Sub-Recipe 配方 -->
        <div class="pk-surface space-y-5 p-4 sm:p-6 md:space-y-6 md:p-8">
          <div class="border-b border-[color:var(--pk-border)] pb-4">
            <div>
              <h2 class="text-base font-black tracking-tight text-[color:var(--pk-ink)] sm:text-lg">开火前备料与配方总览</h2>
              <p class="mt-1 text-xs text-[color:var(--pk-ink-muted)]">以下内容按食谱原始记录展示；点击复合配方可查看原始配比与调制顺序</p>
            </div>
          </div>

          <!-- 3.2.1 复合调料与秘制酱汁 Sub-Recipe Formulas 专栏 -->
          <div v-if="recipeFormulas.length > 0" class="space-y-3">
            <div class="flex items-center justify-between text-xs font-bold text-amber-900">
              <span>复合调料与秘制酱汁</span>
              <span class="hidden font-normal text-amber-800 sm:inline">点击卡片查看精确定量与调制步骤</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                v-for="formula in recipeFormulas"
                :key="formula.id"
                @click="activeFormula = formula"
                class="group flex cursor-pointer flex-col justify-between space-y-2 rounded-lg border border-amber-200/80 bg-amber-50/55 p-4 transition-colors hover:border-amber-400"
              >
                <div class="flex items-start justify-between gap-2">
                  <div>
                    <span class="mb-1 inline-block rounded-md bg-amber-200/60 px-2 py-0.5 text-[10px] font-bold text-amber-900">
                      {{ getFormulaCategoryLabel(formula.category) }}
                    </span>
                    <h3 class="text-sm font-black text-[color:var(--pk-ink)] transition-colors group-hover:text-amber-950">
                      {{ formula.name }}
                    </h3>
                  </div>
                  <span class="text-xs text-amber-700 group-hover:translate-x-0.5 transition-transform font-bold">
                    查看配比 →
                  </span>
                </div>

                <div class="text-[11px] text-stone-600 flex items-center justify-between pt-1 border-t border-amber-200/40">
                  <span>包含 {{ formula.items.length }} 项配料</span>
                  <span v-if="formula.timingTip" class="max-w-[180px] truncate font-medium text-amber-900">
                    {{ formula.timingTip }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- 3.2.2 普通主料与调料配料列表 -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- 食材部分 (占据 2 列) -->
            <div class="md:col-span-2 space-y-4">
              <!-- 主料部分 -->
              <div v-if="mainIngredients.length > 0" class="space-y-2">
                <div class="flex items-center gap-1 text-xs font-bold text-[color:var(--pk-accent)]">
                  <span>主要食材</span>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div
                    v-for="ing in mainIngredients"
                    :key="ing.id"
                    class="p-3 bg-emerald-50/50 border border-emerald-200/70 rounded-xl flex items-center justify-between text-xs"
                  >
                    <span class="font-bold text-stone-900">{{ ing.name }}</span>
                    <span v-if="ing.amountText" class="font-mono text-emerald-950 font-semibold bg-emerald-100/60 px-2 py-0.5 rounded">
                      {{ ing.amountText }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- 普通调料 / 辅料部分 -->
              <div v-if="seasoningIngredients.length > 0" class="space-y-2">
                <div class="flex items-center gap-1 text-xs font-bold text-[color:var(--pk-ink-secondary)]">
                  <span>常用调料与辅料</span>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div
                    v-for="ing in seasoningIngredients"
                    :key="ing.id"
                    class="p-3 bg-stone-50 border border-stone-200/80 rounded-xl flex items-center justify-between text-xs"
                  >
                    <span class="font-medium text-stone-800">{{ ing.name }}</span>
                    <span v-if="ing.amountText" class="font-mono text-stone-600 font-medium bg-stone-200/60 px-2 py-0.5 rounded">
                      {{ ing.amountText }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 前置准备与器具/设备事项 -->
            <div class="bg-stone-50/80 p-5 rounded-2xl border border-stone-200/80 space-y-4 self-start">
              <div class="text-xs font-bold text-stone-900 border-b border-stone-200 pb-2 flex items-center gap-1.5">
                <span>器具与预热设定</span>
              </div>

              <div class="space-y-3 text-xs">
                <div v-if="recipe.prerequisites?.containerSize">
                  <span class="block text-[11px] text-stone-400 font-medium">推荐器具/容器</span>
                  <span class="font-bold text-stone-800">{{ recipe.prerequisites.containerSize }}</span>
                </div>

                <div v-if="recipe.prerequisites?.preheat">
                  <span class="block text-[11px] text-stone-400 font-medium">设备预热设置</span>
                  <span class="font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block mt-0.5">
                    {{ recipe.prerequisites.preheat }}
                  </span>
                </div>

                <div v-if="recipe.prerequisites?.prepNotes">
                  <span class="block text-[11px] text-stone-400 font-medium">预备说明</span>
                  <p class="text-stone-600 mt-0.5 leading-relaxed">{{ recipe.prerequisites.prepNotes }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 3.3 核心 Visual Recipe Flow Card (Matrix Flow 矩阵流程卡) 舞台 -->
        <RecipeFlowWorkspaceV3 :recipe="recipe" />

        <!-- 3.4 烹饪秘诀与 Tips (如有) -->
        <div v-if="recipe.tips && recipe.tips.length > 0" class="bg-amber-50/60 rounded-3xl border border-amber-200/80 p-6 md:p-8 shadow-sm space-y-3">
          <div class="flex items-center gap-2 text-sm font-black text-amber-950">
            <span>烹饪小贴士</span>
          </div>
          <ul class="list-disc list-inside space-y-1.5 text-xs text-amber-950/90 leading-relaxed font-medium">
            <li v-for="(tip, idx) in recipe.tips" :key="idx">{{ tip }}</li>
          </ul>
        </div>

      </div>
    </div>

    <!-- SubRecipeFormula 详尽配比与步骤 Modal 弹窗 -->
    <FormulaDetailModal
      :formula="activeFormula"
      :recipe="recipe"
      @close="activeFormula = null"
    />
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { VisualRecipeV3 } from '@/types/recipeV3'
import type { SubRecipeFormula } from '@/types/formula'
import { getPublishedRecipeById, getLocalPresetRecipeById } from '@/services/v3RecipeStore'
import { updateSeoMeta } from '@/utils/seoHelper'
import RecipeFlowWorkspaceV3 from '@/components/recipe-flow-v3/RecipeFlowWorkspaceV3.vue'
import FormulaDetailModal from '@/components/recipe-flow-v3/FormulaDetailModal.vue'
import { resolveRecipeCover } from '@/utils/recipeCoverAsset'
import {
  getRecipeDifficultyLabel,
  getRecipeDisplayTitle,
  getRecipeDurationLabel,
  getRecipeMethodLabel,
  getRecipeServingsPresentation,
} from '@/utils/recipeCardPresentation'

const route = useRoute()
const recipe = ref<VisualRecipeV3 | null>(null)
const isLoading = ref(true)
const notFound = ref(false)
const imgError = ref(false)
const copySuccess = ref(false)
const coverAsset = computed(() => recipe.value ? resolveRecipeCover(recipe.value) : null)

const isLocalSource = computed(() => {
  return route.query.source === 'local' || route.query.source === 'preset'
})

const activeFormula = ref<SubRecipeFormula | null>(null)
const servingsPresentation = computed(() => getRecipeServingsPresentation(recipe.value?.prerequisites?.servings))

function updateRecipeSeo(rec: VisualRecipeV3) {
  const canonicalUrl = `https://recipelab.cc/recipe/${rec.id}`
  const displayTitle = getRecipeDisplayTitle(rec.title)
  
  const ingredientsList = rec.ingredients.map(ing => 
    ing.amountText ? `${ing.name} ${ing.amountText}` : ing.name
  )

  const instructionsList = rec.actionBlocks.map((block, idx) => ({
    '@type': 'HowToStep',
    'position': idx + 1,
    'name': block.label,
    'text': block.note || block.action || block.label
  }))

  if (rec.finalBlock) {
    const instrText = Array.isArray(rec.finalBlock.instructions)
      ? rec.finalBlock.instructions.join('; ')
      : (rec.finalBlock.instructions || rec.finalBlock.label || '')
    if (instrText) {
      instructionsList.push({
        '@type': 'HowToStep',
        'position': instructionsList.length + 1,
        'name': rec.finalBlock.label || '装盘成型',
        'text': instrText
      })
    }
  }

  const sourceRef = rec.id.startsWith('cn-')
    ? "Zhang Ye's Steaming, Stewing & Stir-Frying Healthy Recipe Guide (Phase-1 Collection)"
    : rec.id.startsWith('hsh-')
    ? 'PostSoma Home Sweet Home Cooking System'
    : 'PostSoma Kitchen Standard Prototype'

  const recipeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    '@id': `${canonicalUrl}#recipe`,
    'name': displayTitle,
    'description': rec.description || `${displayTitle} - 结构化烹饪流程图与食材配比。`,
    'url': canonicalUrl,
    'image': coverAsset.value?.url ? [coverAsset.value.url] : ['https://recipelab.cc/logo.svg'],
    'publisher': {
      '@type': 'Organization',
      'name': 'PostSoma Kitchen',
      'url': 'https://recipelab.cc/'
    },
    'isBasedOn': sourceRef,
    'recipeCuisine': rec.cuisine || 'Chinese',
    'recipeYield': rec.prerequisites?.servings || '2-3 人份',
    'recipeIngredient': ingredientsList,
    'recipeInstructions': instructionsList
  }

  const breadcrumbsSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${canonicalUrl}#breadcrumbs`,
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': '首页',
        'item': 'https://recipelab.cc/'
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': displayTitle,
        'item': canonicalUrl
      }
    ]
  }

  updateSeoMeta({
    title: displayTitle,
    description: rec.description || `查看 ${displayTitle} 的 Visual Recipe Flow Card，掌握完整食材清单、步骤工序、火候与最佳炊具规格。`,
    canonicalUrl,
    ogImage: coverAsset.value?.url || 'https://recipelab.cc/logo.svg',
    jsonLdSchemas: [
      { id: 'jsonld-recipe', schema: recipeSchema },
      { id: 'jsonld-breadcrumbs', schema: breadcrumbsSchema }
    ]
  })
}

async function loadRecipe() {
  isLoading.value = true
  const id = (route.params.id as string) || (route.query.id as string)
  const source = route.query.source as string | undefined
  if (!id) {
    notFound.value = true
    isLoading.value = false
    return
  }

  try {
    if (source === 'local' || source === 'preset') {
      const localFound = await getLocalPresetRecipeById(id)
      if (localFound) {
        recipe.value = localFound
        notFound.value = false
        imgError.value = false
        return
      }
    }

    const found = await getPublishedRecipeById(id)
    if (found) {
      recipe.value = found
      notFound.value = false
      updateRecipeSeo(found)
    } else {
      const localFallback = await getLocalPresetRecipeById(id)
      if (localFallback) {
        recipe.value = localFallback
        notFound.value = false
        imgError.value = false
      } else {
        recipe.value = null
        notFound.value = true
      }
    }
  } finally {
    isLoading.value = false
  }
}

// 提取本食谱包含的 SubRecipeFormulas 复合配料
const recipeFormulas = computed(() => {
  if (!recipe.value || !Array.isArray(recipe.value.formulas)) return []
  return recipe.value.formulas
})

// 主料分类 (排除属于 formula 的项目)
const mainIngredients = computed(() => {
  if (!recipe.value || !Array.isArray(recipe.value.ingredients)) return []
  return recipe.value.ingredients.filter(i => i.category === 'main' || i.category === 'produce' || i.category === 'dairy' || i.category === 'grain' || (!i.category || i.category === 'other'))
})

// 常用调料/辅料分类（包含液体调料，排除属于 formula 的项目）
const seasoningIngredients = computed(() => {
  if (!recipe.value || !Array.isArray(recipe.value.ingredients)) return []
  return recipe.value.ingredients.filter(i => i.category === 'seasoning' || i.category === 'liquid')
})

function getFormulaCategoryLabel(cat?: string): string {
  switch (cat) {
    case 'sauce': return '特调酱汁 / 芡汁'
    case 'marinade': return '滑嫩腌肉料'
    case 'seasoning': return '复合调味粉'
    case 'glaze': return '亮泽糖色淋汁'
    default: return '子配方'
  }
}

const durationLabel = computed(() => recipe.value ? getRecipeDurationLabel(recipe.value) : '')

function handleShare() {
  try {
    navigator.clipboard.writeText(window.location.href)
    copySuccess.value = true
    setTimeout(() => {
      copySuccess.value = false
    }, 2000)
  } catch (e) {
    alert('请复制浏览器地址栏 URL 分享该食谱')
  }
}


onMounted(() => {
  void loadRecipe()
})

watch(
  () => route.params.id,
  () => {
    void loadRecipe()
  }
)
</script>

<style scoped>
.recipe-detail-fallback {
  background-color: var(--pk-surface-muted);
  background-image:
    linear-gradient(rgba(79, 90, 83, 0.055) 1px, transparent 1px),
    linear-gradient(90deg, rgba(79, 90, 83, 0.055) 1px, transparent 1px);
  background-size: 32px 32px;
}
</style>
