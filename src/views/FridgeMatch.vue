<template>
  <main id="main-content" class="pk-page min-h-screen px-4 py-6 font-sans md:px-8 md:py-10">
    <div class="mx-auto max-w-6xl space-y-7 md:space-y-9">
      <header class="border-y border-[color:var(--pk-border)] py-8 md:py-10">
        <div class="max-w-3xl">
          <p class="pk-eyebrow">食材库存 · 正式食谱参考</p>
          <h1 class="pk-display mt-3 text-3xl leading-tight md:text-4xl">手边有什么，就从真实食谱里找方向</h1>
          <p class="pk-muted mt-3 text-sm leading-relaxed md:text-base">
            先建立你的手边库存，再查看哪些已收录食谱真正用得到这些食材。候选来自公开食谱库，不会把基础调味或模糊文字当成可以做菜的依据。
          </p>
        </div>
      </header>

      <div v-if="isLoading" class="pk-surface p-8" role="status" aria-live="polite">
        <div class="space-y-3" aria-hidden="true">
          <div class="h-5 w-36 animate-pulse rounded bg-[color:var(--pk-surface-muted)] motion-reduce:animate-none"></div>
          <div class="h-11 w-full animate-pulse rounded-lg bg-[color:var(--pk-surface-muted)] motion-reduce:animate-none"></div>
          <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            <div v-for="item in 8" :key="item" class="h-12 animate-pulse rounded-lg bg-[color:var(--pk-surface-muted)] motion-reduce:animate-none"></div>
          </div>
        </div>
        <span class="sr-only">正在读取公开食谱与食材索引</span>
      </div>

      <div v-else-if="loadError" class="pk-surface space-y-3 border-[color:var(--pk-danger)] p-8 text-center" role="alert">
        <h2 class="text-lg font-bold text-[color:var(--pk-ink)]">暂时无法读取公开食谱</h2>
        <p class="text-sm text-[color:var(--pk-ink-secondary)]">{{ loadError }}</p>
        <button type="button" class="pk-button pk-button-primary" @click="loadPublishedIngredientIndex">重新读取</button>
      </div>

      <template v-else-if="ingredientIndex">
        <section class="pk-surface p-5 sm:p-6 md:p-8" aria-labelledby="ingredient-heading">
          <div class="flex items-start gap-4 border-b border-[color:var(--pk-border)] pb-5">
            <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[color:var(--pk-border-strong)] text-sm font-bold text-[color:var(--pk-accent)]" aria-hidden="true">01</span>
            <div>
              <h2 id="ingredient-heading" class="text-xl font-bold text-[color:var(--pk-ink)]">手边食材</h2>
              <p class="mt-1 text-sm leading-relaxed text-[color:var(--pk-ink-secondary)]">
                只展示当前公开食谱中已经安全确认的食材概念；状态或复合表达仍待审核的内容不会成为快捷标签。
              </p>
            </div>
          </div>

          <div class="mt-6">
            <label for="ingredient-search" class="text-sm font-bold text-[color:var(--pk-ink)]">搜索可选食材</label>
            <div class="relative mt-2">
              <svg viewBox="0 0 20 20" class="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[color:var(--pk-ink-muted)]" fill="none" aria-hidden="true">
                <circle cx="8.5" cy="8.5" r="5" stroke="currentColor" stroke-width="1.5" />
                <path d="m12.5 12.5 4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
              </svg>
              <input
                id="ingredient-search"
                v-model="ingredientSearch"
                type="search"
                autocomplete="off"
                class="pk-field w-full py-2 pl-10 pr-16 text-base"
                placeholder="搜索鸡肉、番茄、豆腐……"
              />
              <button
                v-if="ingredientSearch"
                type="button"
                class="absolute right-0 top-0 flex h-11 min-w-11 items-center justify-center rounded-lg text-sm font-semibold text-[color:var(--pk-ink-secondary)] hover:bg-[color:var(--pk-surface-muted)]"
                aria-label="清除食材搜索"
                @click="ingredientSearch = ''"
              >
                清除
              </button>
            </div>
          </div>

          <div class="mt-6">
            <label for="ingredient-category" class="text-sm font-bold text-[color:var(--pk-ink)] sm:sr-only">食材分类</label>
            <select id="ingredient-category" v-model="activeCategory" class="pk-field mt-2 w-full px-3 text-base sm:hidden">
              <option v-for="category in availableCategories" :key="category.id" :value="category.id">
                {{ category.label }} · {{ category.count }}
              </option>
            </select>

            <div class="hidden grid-cols-2 gap-2 sm:grid md:grid-cols-4" aria-label="食材分类">
              <button
                v-for="category in availableCategories"
                :key="category.id"
                type="button"
                :aria-pressed="activeCategory === category.id"
                :class="[
                  'min-h-11 rounded-lg border px-3 py-2 text-left text-sm font-semibold transition-colors',
                  activeCategory === category.id
                    ? 'border-[color:var(--pk-accent)] bg-[color:var(--pk-surface-accent)] text-[color:var(--pk-accent-hover)]'
                    : 'border-[color:var(--pk-border)] bg-[color:var(--pk-surface)] text-[color:var(--pk-ink-secondary)] hover:border-[color:var(--pk-border-strong)] hover:bg-[color:var(--pk-surface-muted)]',
                ]"
                @click="activeCategory = category.id"
              >
                <span class="block">{{ category.shortLabel }}</span>
                <span class="mt-0.5 block text-xs font-normal text-[color:var(--pk-ink-muted)]">{{ category.count }} 项</span>
              </button>
            </div>
          </div>

          <div class="mt-6">
            <div class="flex flex-wrap items-end justify-between gap-2">
              <div>
                <h3 class="font-bold text-[color:var(--pk-ink)]">{{ conceptListHeading }}</h3>
                <p class="mt-0.5 text-xs text-[color:var(--pk-ink-muted)]">{{ conceptListDescription }}</p>
              </div>
              <span class="text-xs tabular-nums text-[color:var(--pk-ink-muted)]" aria-live="polite">{{ visibleOrdinaryConcepts.length }} 项</span>
            </div>

            <div v-if="visibleOrdinaryConcepts.length" class="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              <button
                v-for="concept in visibleOrdinaryConcepts"
                :key="concept.id"
                type="button"
                :aria-pressed="selectedConceptIds.includes(concept.id)"
                :class="[
                  'flex min-h-12 items-center justify-between gap-2 rounded-lg border px-3 py-2 text-left text-sm font-semibold transition-colors',
                  selectedConceptIds.includes(concept.id)
                    ? 'border-[color:var(--pk-accent)] bg-[color:var(--pk-accent)] text-white'
                    : 'border-[color:var(--pk-border)] bg-[color:var(--pk-surface)] text-[color:var(--pk-ink-secondary)] hover:border-[color:var(--pk-border-strong)] hover:bg-[color:var(--pk-surface-muted)]',
                ]"
                @click="toggleConcept(concept.id)"
              >
                <span>{{ concept.displayName }}</span>
                <span aria-hidden="true" class="text-base">{{ selectedConceptIds.includes(concept.id) ? '−' : '+' }}</span>
              </button>
            </div>

            <div v-else class="mt-3 rounded-lg border border-dashed border-[color:var(--pk-border-strong)] p-5 text-sm text-[color:var(--pk-ink-secondary)]">
              没有找到已安全确认的食材。你仍可在下方原样加入，它会被标记为暂未识别。
            </div>
          </div>

          <div class="mt-6 border-t border-[color:var(--pk-border)] pt-5">
            <button
              type="button"
              class="flex min-h-11 w-full items-center justify-between gap-3 rounded-lg text-left"
              :aria-expanded="pantryOpen"
              aria-controls="pantry-ingredients"
              @click="pantryOpen = !pantryOpen"
            >
              <span>
                <span class="block text-sm font-bold text-[color:var(--pk-ink)]">常备调味</span>
                <span class="mt-0.5 block text-xs text-[color:var(--pk-ink-muted)]">盐、油、水、生抽等不会默认拥有，也不能单独形成候选</span>
              </span>
              <svg viewBox="0 0 20 20" :class="['h-5 w-5 shrink-0 transition-transform motion-reduce:transition-none', pantryOpen ? 'rotate-180' : '']" fill="none" aria-hidden="true">
                <path d="m5 8 5 5 5-5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
            <div v-show="pantryOpen" id="pantry-ingredients" class="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              <button
                v-for="concept in visiblePantryConcepts"
                :key="concept.id"
                type="button"
                :aria-pressed="selectedConceptIds.includes(concept.id)"
                :class="[
                  'flex min-h-12 items-center justify-between gap-2 rounded-lg border px-3 py-2 text-left text-sm font-semibold transition-colors',
                  selectedConceptIds.includes(concept.id)
                    ? 'border-[color:var(--pk-accent)] bg-[color:var(--pk-accent)] text-white'
                    : 'border-[color:var(--pk-border)] bg-[color:var(--pk-surface-muted)] text-[color:var(--pk-ink-secondary)] hover:border-[color:var(--pk-border-strong)]',
                ]"
                @click="toggleConcept(concept.id)"
              >
                <span>{{ concept.displayName }}</span>
                <span aria-hidden="true" class="text-base">{{ selectedConceptIds.includes(concept.id) ? '−' : '+' }}</span>
              </button>
              <p v-if="visiblePantryConcepts.length === 0" class="col-span-full text-sm text-[color:var(--pk-ink-muted)]">当前搜索没有匹配的常备调味。</p>
            </div>
          </div>

          <form class="mt-6 border-t border-[color:var(--pk-border)] pt-5" @submit.prevent="addCustomIngredients">
            <label for="custom-ingredient" class="text-sm font-bold text-[color:var(--pk-ink)]">输入其他食材</label>
            <p id="custom-ingredient-help" class="mt-1 text-xs leading-relaxed text-[color:var(--pk-ink-muted)]">
              可使用逗号、顿号、分号或换行分隔。能安全识别的内容会归入概念，其余内容保留原文。
            </p>
            <div class="mt-2 flex flex-col gap-2 sm:flex-row sm:items-stretch">
              <textarea
                id="custom-ingredient"
                v-model="customInput"
                rows="2"
                maxlength="800"
                aria-describedby="custom-ingredient-help custom-input-message"
                class="pk-field min-h-[5.5rem] flex-1 resize-y px-3 py-2 text-base sm:min-h-11"
                placeholder="例如：菠菜、鸡蛋、豆腐"
              ></textarea>
              <button type="submit" class="pk-button pk-button-primary sm:self-end">加入库存</button>
            </div>
            <p id="custom-input-message" class="mt-2 min-h-5 text-xs text-[color:var(--pk-danger)]" aria-live="polite">
              {{ inputMessage }}
            </p>
          </form>
        </section>

        <section class="pk-surface p-5 sm:p-6 md:p-8" aria-labelledby="inventory-heading">
          <div class="flex flex-wrap items-start justify-between gap-4 border-b border-[color:var(--pk-border)] pb-5">
            <div class="flex items-start gap-4">
              <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[color:var(--pk-border-strong)] text-sm font-bold text-[color:var(--pk-accent)]" aria-hidden="true">02</span>
              <div>
                <h2 id="inventory-heading" class="text-xl font-bold text-[color:var(--pk-ink)]">已选库存</h2>
                <p class="mt-1 text-sm text-[color:var(--pk-ink-secondary)]">
                  {{ hasSelection ? `共 ${selectedConceptIds.length + customInputs.length} 项；已识别与暂未识别内容分开处理。` : '尚未选择食材。你的库存会一直清楚列在这里。' }}
                </p>
              </div>
            </div>
            <button v-if="hasSelection" type="button" class="pk-button pk-button-secondary" @click="clearSelection">清空库存</button>
          </div>

          <div v-if="hasSelection" class="mt-5 space-y-5">
            <div v-if="selectedConcepts.length">
              <h3 class="text-sm font-bold text-[color:var(--pk-ink)]">已识别食材</h3>
              <div class="mt-2 flex flex-wrap gap-2">
                <button
                  v-for="concept in selectedConcepts"
                  :key="`selected-${concept.id}`"
                  type="button"
                  class="inline-flex min-h-11 items-center gap-2 rounded-lg border border-[color:var(--pk-accent-soft)] bg-[color:var(--pk-surface-accent)] px-3 py-2 text-sm font-semibold text-[color:var(--pk-accent-hover)] hover:border-[color:var(--pk-accent)]"
                  :aria-label="`从库存移除 ${concept.displayName}`"
                  @click="removeConcept(concept.id)"
                >
                  <span>{{ concept.displayName }}</span>
                  <span aria-hidden="true">×</span>
                </button>
              </div>
            </div>

            <div v-if="customInputs.length">
              <h3 class="text-sm font-bold text-[color:var(--pk-ink)]">暂未在食谱库识别</h3>
              <p class="mt-1 text-xs text-[color:var(--pk-ink-muted)]">这些内容会保留给后续功能，但不会提高正式食谱的匹配分数。</p>
              <div class="mt-2 flex flex-wrap gap-2">
                <button
                  v-for="(input, index) in customInputs"
                  :key="`custom-${input.toLowerCase()}`"
                  type="button"
                  class="inline-flex min-h-11 items-center gap-2 rounded-lg border border-dashed border-[color:var(--pk-border-strong)] bg-[color:var(--pk-surface-muted)] px-3 py-2 text-sm font-semibold text-[color:var(--pk-ink-secondary)] hover:border-[color:var(--pk-accent)]"
                  :aria-label="`从库存移除未识别食材 ${input}`"
                  @click="removeCustomInput(index)"
                >
                  <span>{{ input }}</span>
                  <span class="text-xs font-normal text-[color:var(--pk-ink-muted)]">未识别</span>
                  <span aria-hidden="true">×</span>
                </button>
              </div>
            </div>
          </div>

          <div v-else class="mt-5 rounded-lg border border-dashed border-[color:var(--pk-border-strong)] px-5 py-7 text-center">
            <p class="text-sm font-semibold text-[color:var(--pk-ink)]">从上方分类选择，或输入你实际拥有的食材</p>
            <p class="mt-1 text-xs text-[color:var(--pk-ink-muted)]">页面不会自动预选，也不会假设你拥有任何调味料。</p>
          </div>
        </section>

        <section class="space-y-5" aria-labelledby="match-heading">
          <div class="flex items-start gap-4 border-b border-[color:var(--pk-border)] pb-5">
            <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[color:var(--pk-border-strong)] text-sm font-bold text-[color:var(--pk-accent)]" aria-hidden="true">03</span>
            <div>
              <h2 id="match-heading" class="text-xl font-bold text-[color:var(--pk-ink)]">已收录食谱参考</h2>
              <p class="mt-1 text-sm leading-relaxed text-[color:var(--pk-ink-secondary)]" role="status" aria-live="polite">{{ resultSummary }}</p>
            </div>
          </div>

          <div v-if="!hasSelection" class="pk-surface px-5 py-10 text-center sm:p-12">
            <h3 class="text-base font-bold text-[color:var(--pk-ink)]">先建立你的手边库存</h3>
            <p class="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-[color:var(--pk-ink-secondary)]">选择至少一种主要或普通食材后，这里才会出现由正式食谱数据支持的参考方向。</p>
          </div>

          <div v-else-if="matchPage.total === 0" class="pk-surface px-5 py-10 text-center sm:p-12">
            <h3 class="text-base font-bold text-[color:var(--pk-ink)]">{{ noMatchTitle }}</h3>
            <p class="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-[color:var(--pk-ink-secondary)]">{{ noMatchDescription }}</p>
          </div>

          <div v-else class="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <FridgeRecipeMatchCard v-for="result in matchPage.results" :key="result.recipe.id" :result="result" />
          </div>

          <div v-if="matchPage.total > matchPage.results.length" class="flex justify-center pt-1">
            <button type="button" class="pk-button pk-button-secondary min-w-40" @click="visibleLimit += RESULT_BATCH_SIZE">
              继续查看（{{ matchPage.total - matchPage.results.length }}）
            </button>
          </div>
        </section>

        <section class="space-y-5" aria-labelledby="ai-heading">
          <div class="flex flex-wrap items-start justify-between gap-4 border-b border-[color:var(--pk-border)] pb-5">
            <div class="flex items-start gap-4">
              <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[color:var(--pk-border-strong)] text-sm font-bold text-[color:var(--pk-accent)]" aria-hidden="true">04</span>
              <div>
                <h2 id="ai-heading" class="text-xl font-bold text-[color:var(--pk-ink)]">AI 即时建议</h2>
                <p class="mt-1 max-w-2xl text-sm leading-relaxed text-[color:var(--pk-ink-secondary)]">
                  主动请求一条基于当前库存的临时做法。它与上方正式食谱分开，不会保存、发布或生成 Matrix Flow。
                </p>
              </div>
            </div>
            <button
              type="button"
              class="pk-button pk-button-secondary"
              :aria-expanded="aiConfigOpen"
              aria-controls="fridge-ai-config"
              @click="toggleAiConfig"
            >
              {{ aiPublicConfig ? '更改临时配置' : '临时配置 AI' }}
            </button>
          </div>

          <div v-if="aiConfigOpen" id="fridge-ai-config">
            <FridgeAiByokConfigPanel :error="aiConfigError" @close="closeAiConfig" @save="configureAi" />
          </div>

          <div v-if="aiState?.status === 'unconfigured'" class="pk-surface p-5 sm:p-6">
            <h3 class="text-base font-bold text-[color:var(--pk-ink)]">本次页面尚未配置 AI</h3>
            <p class="mt-2 max-w-2xl text-sm leading-relaxed text-[color:var(--pk-ink-secondary)]">
              正式食谱参考不受影响。需要时可临时提供兼容 OpenAI Chat Completions JSON 协议的 HTTPS 地址、模型名称与 Key；配置只留在当前页面内存中。
            </p>
          </div>

          <template v-else-if="aiState && aiPublicConfig">
            <div class="rounded-xl border border-[color:var(--pk-border)] bg-[color:var(--pk-surface-muted)] p-4 sm:p-5">
              <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div class="min-w-0">
                  <p class="text-xs font-bold uppercase tracking-[0.12em] text-[color:var(--pk-ink-muted)]">本次请求目标</p>
                  <p class="mt-1 break-all text-sm font-bold text-[color:var(--pk-ink)]">{{ aiPublicConfig.destinationHost }}</p>
                  <p class="mt-1 break-all text-xs text-[color:var(--pk-ink-secondary)]">模型：{{ aiPublicConfig.model }} · 30 秒超时 · 不自动重试</p>
                </div>
                <button type="button" class="min-h-11 self-start rounded-lg px-2 text-sm font-semibold text-[color:var(--pk-danger)] underline underline-offset-4" @click="clearAiConfig">
                  清除本次配置
                </button>
              </div>
            </div>

            <div class="pk-surface p-5 sm:p-6">
              <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 class="text-base font-bold text-[color:var(--pk-ink)]">用当前库存生成临时做法</h3>
                  <p class="mt-1 text-sm leading-relaxed text-[color:var(--pk-ink-secondary)]">
                    {{ aiEligibilityMessage }}
                  </p>
                </div>
                <button
                  v-if="aiState.status !== 'generating' && aiState.status !== 'success'"
                  type="button"
                  class="pk-button pk-button-primary w-full shrink-0 sm:w-auto"
                  :disabled="!aiCanGenerate"
                  @click="generateAiSuggestion"
                >
                  用这些食材生成临时做法
                </button>
                <button
                  v-else-if="aiState.status === 'generating'"
                  type="button"
                  class="pk-button pk-button-secondary w-full shrink-0 sm:w-auto"
                  @click="cancelAiSuggestionRequest"
                >
                  取消生成
                </button>
              </div>

              <div class="mt-4 border-t border-[color:var(--pk-border)] pt-4" aria-live="polite">
                <p v-if="aiState.status === 'ready'" class="text-sm text-[color:var(--pk-ink-secondary)]">
                  页面不会自动请求；点击按钮后才会把当前结构化食材快照发送至上方主机。
                </p>
                <p v-else-if="aiState.status === 'generating'" class="text-sm font-semibold text-[color:var(--pk-ink)]" role="status">
                  正在生成一条结构化临时建议。你可以取消，正式食谱参考仍可继续使用。
                </p>
                <p v-else-if="aiState.status === 'cancelled'" class="text-sm text-[color:var(--pk-ink-secondary)]">
                  已取消生成，没有保存或修改任何食谱数据。
                </p>
                <div v-else-if="aiState.status === 'stale'" class="text-sm" role="status">
                  <p class="font-bold text-[color:var(--pk-ink)]">库存已变化，请重新生成</p>
                  <p class="mt-1 text-[color:var(--pk-ink-secondary)]">旧建议已退出当前结果区，不会自动使用或重新请求。</p>
                </div>
                <div v-else-if="aiState.status === 'failure'" role="alert">
                  <p class="text-sm font-bold text-[color:var(--pk-danger)]">{{ aiFailureTitle }}</p>
                  <p class="mt-1 text-sm leading-relaxed text-[color:var(--pk-ink-secondary)]">{{ aiFailureDescription }}</p>
                </div>
                <p v-else-if="aiState.status === 'success'" class="text-sm text-[color:var(--pk-ink-secondary)]">
                  建议已经通过结构校验与本地食品安全规则；仍请按实际食材状态谨慎判断。
                </p>
              </div>
            </div>

            <FridgeAiSuggestionCard
              v-if="aiState.status === 'success'"
              :suggestion="aiState.suggestion"
              :snapshot="aiState.snapshot"
              :related-recipes="aiRelatedRecipes"
              @regenerate="generateAiSuggestion"
            />
          </template>
        </section>
      </template>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue'
import { getPublishedRecipes } from '@/services/v3RecipeStore'
import { updateSeoMeta } from '@/utils/seoHelper'
import {
  AiSuggestionChannel,
  MemoryOpenAiCompatibleByokGateway,
  addFridgeIngredientInput,
  buildFridgeIngredientIndex,
  createAiIngredientSnapshot,
  getPublicSelectableConcepts,
  matchPublishedRecipes,
  type AiSuggestionErrorCode,
  type AiSuggestionState,
  type FridgeIngredientIndex,
  type IngredientConcept,
  type IngredientPublicCategory,
  type OpenAiCompatibleByokConfigInput,
  type OpenAiCompatibleByokPublicConfig,
} from '@/domain/fridge'
import { FRIDGE_CATEGORY_BY_ID, FRIDGE_CATEGORY_PRESENTATIONS } from '@/config/fridgePresentation'
import FridgeRecipeMatchCard from '@/components/fridge/FridgeRecipeMatchCard.vue'
import FridgeAiByokConfigPanel from '@/components/fridge/FridgeAiByokConfigPanel.vue'
import FridgeAiSuggestionCard from '@/components/fridge/FridgeAiSuggestionCard.vue'
import { getRecipeDisplayTitle } from '@/utils/recipeCardPresentation'

const RESULT_BATCH_SIZE = 6
const ingredientIndex = ref<FridgeIngredientIndex | null>(null)
const isLoading = ref(true)
const loadError = ref('')
const ingredientSearch = ref('')
const customInput = ref('')
const inputMessage = ref('')
const selectedConceptIds = ref<string[]>([])
const customInputs = ref<string[]>([])
const activeCategory = ref<IngredientPublicCategory>('meat_poultry_eggs_tofu')
const pantryOpen = ref(false)
const visibleLimit = ref(RESULT_BATCH_SIZE)
const aiConfigOpen = ref(false)
const aiConfigError = ref('')
const aiPublicConfig = ref<OpenAiCompatibleByokPublicConfig | null>(null)
const aiState = shallowRef<AiSuggestionState | null>(null)
const aiChannel = shallowRef<AiSuggestionChannel | null>(null)
const aiGateway = new MemoryOpenAiCompatibleByokGateway()
let unsubscribeAiState: (() => void) | undefined

async function loadPublishedIngredientIndex() {
  isLoading.value = true
  loadError.value = ''
  try {
    const publishedRecipes = await getPublishedRecipes()
    ingredientIndex.value = buildFridgeIngredientIndex(publishedRecipes)
    const firstAvailable = availableCategories.value[0]
    if (firstAvailable && !availableCategories.value.some(category => category.id === activeCategory.value)) {
      activeCategory.value = firstAvailable.id
    }
    syncAiSnapshot()
  } catch (error) {
    console.error('[FridgeMatch] 读取公开食谱索引失败:', error)
    loadError.value = '公开食谱读取失败，请稍后重试。现有库存选择没有写入任何数据。'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  void loadPublishedIngredientIndex()
  updateSeoMeta({
    title: '按食材找方向 · 清冰箱智能配菜',
    description: '输入你手头的食材，自动检索 PostSoma Kitchen 121 道精细中餐与私房食谱，看哪些料理真正用得了这些食材。',
    canonicalUrl: 'https://recipelab.cc/fridge',
    jsonLdSchemas: [
      {
        id: 'jsonld-fridge-app',
        schema: {
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          '@id': 'https://recipelab.cc/fridge#app',
          'name': 'PostSoma Kitchen 清冰箱食材智能匹配器',
          'applicationCategory': 'HealthApplication',
          'operatingSystem': 'Web',
          'url': 'https://recipelab.cc/fridge',
          'description': '手边有什么食材，就从真实食谱库里找方向。'
        }
      },
      {
        id: 'jsonld-fridge-breadcrumbs',
        schema: {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          '@id': 'https://recipelab.cc/fridge#breadcrumbs',
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
              'name': '按食材找方向',
              'item': 'https://recipelab.cc/fridge'
            }
          ]
        }
      }
    ]
  })
})

const selectableConcepts = computed(() => ingredientIndex.value ? getPublicSelectableConcepts(ingredientIndex.value) : [])
const ordinaryConcepts = computed(() => selectableConcepts.value.filter(concept => !concept.isBasicPantry))
const pantryConcepts = computed(() => selectableConcepts.value.filter(concept => concept.isBasicPantry))

const availableCategories = computed(() => FRIDGE_CATEGORY_PRESENTATIONS.map(category => ({
  ...category,
  count: ordinaryConcepts.value.filter(concept => concept.category === category.id).length,
})).filter(category => category.count > 0))

function conceptMatchesSearch(concept: IngredientConcept, query: string): boolean {
  if (!query) return true
  const normalized = query.normalize('NFKC').trim().toLowerCase()
  return [concept.displayName, ...concept.aliases].some(value => value.normalize('NFKC').toLowerCase().includes(normalized))
}

const visibleOrdinaryConcepts = computed(() => {
  const query = ingredientSearch.value.trim()
  const source = query
    ? ordinaryConcepts.value
    : ordinaryConcepts.value.filter(concept => concept.category === activeCategory.value)
  return source.filter(concept => conceptMatchesSearch(concept, query))
})

const visiblePantryConcepts = computed(() => pantryConcepts.value.filter(concept => conceptMatchesSearch(concept, ingredientSearch.value)))

const conceptListHeading = computed(() => {
  if (ingredientSearch.value.trim()) return `“${ingredientSearch.value.trim()}”的安全概念结果`
  return FRIDGE_CATEGORY_BY_ID.get(activeCategory.value)?.label || '可选食材'
})

const conceptListDescription = computed(() => {
  if (ingredientSearch.value.trim()) return '搜索只覆盖已经人工确认的显示名与安全别名'
  return FRIDGE_CATEGORY_BY_ID.get(activeCategory.value)?.description || ''
})

const selectedConcepts = computed(() => selectedConceptIds.value
  .map(id => ingredientIndex.value?.conceptById.get(id))
  .filter((concept): concept is IngredientConcept => Boolean(concept)))

const hasSelection = computed(() => selectedConceptIds.value.length > 0 || customInputs.value.length > 0)
const hasRecognizedNonPantry = computed(() => selectedConcepts.value.some(concept => !concept.isBasicPantry))
const aiCanGenerate = computed(() => hasRecognizedNonPantry.value || customInputs.value.length > 0)
const aiEligibilityMessage = computed(() => {
  if (!hasSelection.value) return '请先选择至少一种非基础调味食材，或输入一种自定义食材。'
  if (!aiCanGenerate.value) return '盐、油、水、生抽等基础调味不能单独触发 AI 请求。'
  if (customInputs.value.length) return '未识别食材会以结构化数据发送，其安全属性可能不完整。'
  return `将使用当前 ${selectedConceptIds.value.length} 项已识别库存生成，不会自动补入未选择的主要食材。`
})

const matchPage = computed(() => {
  if (!ingredientIndex.value || !hasSelection.value) {
    return { results: [], unrecognizedUserInputs: [], total: 0, offset: 0, limit: visibleLimit.value }
  }
  return matchPublishedRecipes(ingredientIndex.value, {
    conceptIds: selectedConceptIds.value,
    customInputs: customInputs.value,
  }, { limit: visibleLimit.value })
})

const resultSummary = computed(() => {
  if (!hasSelection.value) return '结果区会随库存变化即时更新，不保留旧候选。'
  if (matchPage.value.total === 0) return '当前库存没有产生可安全解释的正式食谱候选。'
  return `找到 ${matchPage.value.total} 道正式食谱参考；当前显示 ${matchPage.value.results.length} 道。`
})

const noMatchTitle = computed(() => {
  if (!hasRecognizedNonPantry.value && selectedConceptIds.value.length > 0) return '常备调味不能单独形成候选'
  if (selectedConceptIds.value.length === 0 && customInputs.value.length > 0) return '自定义食材已保留，但尚不能用于数据库匹配'
  return '数据库中暂无可安全匹配的正式食谱'
})

const noMatchDescription = computed(() => {
  if (!hasRecognizedNonPantry.value && selectedConceptIds.value.length > 0) return '盐、油、水、生抽等只有在你明确选择后才算具备，但仍需加入至少一种主要或普通食材。'
  if (selectedConceptIds.value.length === 0 && customInputs.value.length > 0) return '未识别内容不会被强行映射或虚增分数。可再选择一个已确认的食材概念，或等待后续索引审核。'
  return '可以调整已选食材，但系统不会为了产生结果而使用模糊包含或错误食材。'
})

const aiFailureTitle = computed(() => {
  if (aiState.value?.status !== 'failure') return ''
  const labels: Partial<Record<AiSuggestionErrorCode, string>> = {
    'invalid-input': '当前库存不足以生成',
    timeout: 'AI 服务响应超时',
    'rate-limited': 'AI 服务暂时限流',
    network: '无法连接 AI 服务',
    'provider-rejected': 'AI 服务拒绝了请求',
    'invalid-response': 'AI 返回内容无法安全使用',
    'safety-blocked': 'AI 建议已被食品安全规则拦截',
    'not-configured': '本次页面尚未配置 AI',
  }
  return labels[aiState.value.error.code] || 'AI 建议生成失败'
})

const aiFailureDescription = computed(() => {
  if (aiState.value?.status !== 'failure') return ''
  const retryAfter = aiState.value.error.retryAfterSeconds
  if (aiState.value.error.code === 'rate-limited' && retryAfter) {
    return `${aiState.value.message}。服务端建议约 ${retryAfter} 秒后再试；页面不会自动重试。`
  }
  return `${aiState.value.message}。${aiState.value.error.retryable ? '你可以检查配置后主动重试。' : '本次结果没有进入页面，也没有写入任何数据。'}`
})

const aiRelatedRecipes = computed(() => {
  if (aiState.value?.status !== 'success' || !ingredientIndex.value) return []
  const allowedIds = new Set(aiState.value.snapshot.relatedRecipeIds)
  const recipeById = new Map(ingredientIndex.value.recipes
    .filter(item => item.recipe.status === 'published' && !item.recipe.deletedAt)
    .map(item => [item.recipe.id, item.recipe] as const))
  return aiState.value.suggestion.relatedRecipeIds
    .filter(id => allowedIds.has(id))
    .map(id => recipeById.get(id))
    .filter((recipe): recipe is NonNullable<typeof recipe> => Boolean(recipe))
    .map(recipe => ({ id: recipe.id, title: getRecipeDisplayTitle(recipe.title) }))
})

function syncAiSnapshot() {
  if (!ingredientIndex.value) return
  const snapshotResult = createAiIngredientSnapshot(ingredientIndex.value, {
    conceptIds: selectedConceptIds.value,
    customInputs: customInputs.value,
  })
  if (!snapshotResult.ok) return

  if (!aiChannel.value) {
    const channel = new AiSuggestionChannel(snapshotResult.value, aiGateway)
    aiChannel.value = channel
    unsubscribeAiState?.()
    unsubscribeAiState = channel.subscribe(state => {
      aiState.value = state
    })
    return
  }
  aiChannel.value.updateSnapshot(snapshotResult.value)
}

function toggleAiConfig() {
  aiConfigError.value = ''
  aiConfigOpen.value = !aiConfigOpen.value
}

function closeAiConfig() {
  aiConfigError.value = ''
  aiConfigOpen.value = false
}

function configureAi(config: OpenAiCompatibleByokConfigInput) {
  aiChannel.value?.cancel()
  const result = aiGateway.configure(config)
  if (!result.ok) {
    aiConfigError.value = result.errors.join('；')
    return
  }
  aiPublicConfig.value = result.value
  aiConfigError.value = ''
  aiConfigOpen.value = false
  aiChannel.value?.refreshReadiness()
}

function clearAiConfig() {
  aiChannel.value?.cancel()
  aiGateway.clear()
  aiPublicConfig.value = null
  aiConfigError.value = ''
  aiConfigOpen.value = false
  aiChannel.value?.refreshReadiness()
}

function generateAiSuggestion() {
  void aiChannel.value?.requestSuggestion()
}

function cancelAiSuggestionRequest() {
  aiChannel.value?.cancel()
}

function toggleConcept(conceptId: string) {
  inputMessage.value = ''
  if (selectedConceptIds.value.includes(conceptId)) removeConcept(conceptId)
  else selectedConceptIds.value = [...selectedConceptIds.value, conceptId]
}

function removeConcept(conceptId: string) {
  selectedConceptIds.value = selectedConceptIds.value.filter(id => id !== conceptId)
}

function removeCustomInput(index: number) {
  customInputs.value = customInputs.value.filter((_, itemIndex) => itemIndex !== index)
}

function clearSelection() {
  selectedConceptIds.value = []
  customInputs.value = []
  customInput.value = ''
  inputMessage.value = ''
}

function addCustomIngredients() {
  if (!ingredientIndex.value) return
  if (!customInput.value.trim()) {
    inputMessage.value = '请输入至少一种食材。'
    return
  }
  const update = addFridgeIngredientInput(ingredientIndex.value, {
    conceptIds: selectedConceptIds.value,
    customInputs: customInputs.value,
  }, customInput.value)
  selectedConceptIds.value = update.selection.conceptIds
  customInputs.value = update.selection.customInputs || []
  inputMessage.value = update.errors.join('；')
  if (update.addedConceptIds.length || update.addedCustomInputs.length) customInput.value = ''
}

watch(ingredientSearch, query => {
  if (query.trim() && visiblePantryConcepts.value.length) pantryOpen.value = true
})

watch([selectedConceptIds, customInputs], () => {
  visibleLimit.value = RESULT_BATCH_SIZE
  syncAiSnapshot()
}, { deep: true })

onBeforeUnmount(() => {
  aiChannel.value?.cancel()
  aiChannel.value?.dispose()
  unsubscribeAiState?.()
  unsubscribeAiState = undefined
  aiGateway.clear()
  aiPublicConfig.value = null
})
</script>
