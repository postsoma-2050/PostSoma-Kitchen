<template>
  <main id="main-content" class="pk-page min-h-screen px-4 py-6 font-sans md:px-8 md:py-10">
    <div class="mx-auto max-w-5xl space-y-8">
      
      <!-- 1. Page Header -->
      <section class="border-y border-[color:var(--pk-border)] py-8 md:py-10">
        <div class="max-w-3xl">
          <p class="pk-eyebrow">E-E-A-T 权威声明与系统架构</p>
          <h1 class="pk-display mt-3 text-3xl leading-tight md:text-4xl">
            PostSoma Kitchen
          </h1>
          <p class="text-sm font-semibold text-[color:var(--pk-accent)] mt-1">
            多源健康食谱标准化建模引擎 (Visual Recipe Matrix V3.0)
          </p>
          <p class="pk-muted mt-3 text-sm leading-relaxed md:text-base">
            PostSoma Kitchen 致力于把不同来源的健康食谱，整理成清晰、可执行、可沉淀的二维矩阵烹饪流程图 (Visual Recipe Flow Card)。平台不局限于单一配方，而是提供一套通用的食谱工程化与可视化计算框架。
          </p>
        </div>
      </section>

      <!-- 2. Core Positioning & Engine Capabilities -->
      <section class="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div class="pk-surface p-6 space-y-3">
          <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-[color:var(--pk-surface-accent)] text-[color:var(--pk-accent)]"><AppIcon name="layout" :size="26" /></div>
          <h2 class="text-base font-bold text-[color:var(--pk-ink)]">Matrix Flow 矩阵流程图</h2>
          <p class="text-xs leading-relaxed text-[color:var(--pk-ink-secondary)]">
            打破传统文本干瘪的排版，将食材准备、工序节点、火候控制与时间动态交织渲染为直观的可视化二维图表。
          </p>
        </div>
        <div class="pk-surface p-6 space-y-3">
          <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-[color:var(--pk-surface-accent)] text-[color:var(--pk-accent)]"><AppIcon name="flask" :size="26" /></div>
          <h2 class="text-base font-bold text-[color:var(--pk-ink)]">多源食谱转译与计算</h2>
          <p class="text-xs leading-relaxed text-[color:var(--pk-ink-secondary)]">
            支持万能酱汁与复合配方 (Formula Scaler) 动态倍率换算，自动计算用量并标注炊具规格与蒸/炖/炒分类码。
          </p>
        </div>
        <div class="pk-surface p-6 space-y-3">
          <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-[color:var(--pk-surface-accent)] text-[color:var(--pk-accent)]"><AppIcon name="lock" :size="26" /></div>
          <h2 class="text-base font-bold text-[color:var(--pk-ink)]">隐私优先与离线引擎</h2>
          <p class="text-xs leading-relaxed text-[color:var(--pk-ink-secondary)]">
            采用 Local-First 本地优先架构，支持无网离线运行；云端可选存储采用 Supabase Postgres RPC 乐观锁防冲突。
          </p>
        </div>
      </section>

      <!-- 3. Recipe Provenance & Knowledge Lineage Map -->
      <section class="pk-surface p-6 md:p-8 space-y-5">
        <div>
          <h2 class="text-xl font-bold text-[color:var(--pk-ink)] flex items-center gap-2">
            <AppIcon name="map" :size="22" class="text-[color:var(--pk-accent)]" />
            <span>食谱来源与知识谱系 (Recipe Provenance Map)</span>
          </h2>
          <p class="text-sm leading-relaxed text-[color:var(--pk-ink-secondary)] mt-1">
            PostSoma Kitchen 采用开放图谱架构，显式区分平台建模引擎与原始食谱出处。所有收录体系均具备可追溯的数据源标注：
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <!-- 首期示范数据集 1 -->
          <div class="border border-[color:var(--pk-border)] p-4 rounded-lg bg-[color:var(--pk-surface-muted)] space-y-2">
            <div class="flex items-center justify-between">
              <span class="inline-flex items-center gap-1.5 font-bold text-sm text-[color:var(--pk-ink)]"><AppIcon name="global" :size="16" />中餐健康营养首发示范库</span>
              <span class="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-100 text-emerald-800">首期示范数据集</span>
            </div>
            <p class="text-[color:var(--pk-ink-muted)] leading-relaxed">
              <strong>原始参考</strong>：知名营养师张晔《蒸炖炒，营养师的健康食谱》。<br/>
              <strong>工程验证目标</strong>：用于验证“蒸/炖/炒/拌”四类低油低盐中餐工序的量词标准化、火候节点与 7 维闭环巡检算法。
            </p>
          </div>

          <!-- 首期示范数据集 2 -->
          <div class="border border-[color:var(--pk-border)] p-4 rounded-lg bg-[color:var(--pk-surface-muted)] space-y-2">
            <div class="flex items-center justify-between">
              <span class="inline-flex items-center gap-1.5 font-bold text-sm text-[color:var(--pk-ink)]"><AppIcon name="global" :size="16" />美式私房与烘焙示例库</span>
              <span class="px-2 py-0.5 text-[10px] font-bold rounded bg-blue-100 text-blue-800">首期示例数据集</span>
            </div>
            <p class="text-[color:var(--pk-ink-muted)] leading-relaxed">
              <strong>原始参考</strong>：经典美式家庭私房烹饪与烘焙配方。<br/>
              <strong>工程验证目标</strong>：用于验证烘焙干湿料分类、华氏/摄氏温度转换及复合酱汁 (Formula Scaler) 的倍率自动计算。
            </p>
          </div>
        </div>

        <!-- 未来拓展规划 -->
        <div class="border-t border-[color:var(--pk-border)] pt-4">
          <h3 class="text-xs font-bold text-[color:var(--pk-ink)] uppercase tracking-wider mb-2">开放图谱扩展规划 (Open Lineage Architecture)</h3>
          <p class="text-xs leading-relaxed text-[color:var(--pk-ink-muted)]">
            随着平台的演进，我们将持续引入多位专业营养师指南、名厨私房配方、传统烹饪图书及开源社区配方。每一道新食谱均会显式标注原作者、出处链接与转译适配说明，保持高度的版权尊重与数据透明。
          </p>
        </div>
      </section>

      <!-- 4. E-E-A-T & Quality Review Pipeline -->
      <section class="pk-surface p-6 md:p-8 space-y-4">
        <h2 class="text-xl font-bold text-[color:var(--pk-ink)] flex items-center gap-2">
          <AppIcon name="stethoscope" :size="22" class="text-[color:var(--pk-accent)]" />
          <span>E-E-A-T 质量审查与数据透明度</span>
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-[color:var(--pk-ink-muted)]">
          <div class="border border-[color:var(--pk-border)] p-4 rounded-lg bg-[color:var(--pk-surface-muted)]">
            <span class="font-bold text-sm text-[color:var(--pk-ink)] block mb-1">来源可追溯 (Provenance)</span>
            <p>每道食谱在 JSON-LD 结构化数据与大模型喂料中，均明确区分平台（Publisher）与原始参考出处（isBasedOn / citation），确保归因准确。</p>
          </div>
          <div class="border border-[color:var(--pk-border)] p-4 rounded-lg bg-[color:var(--pk-surface-muted)]">
            <span class="font-bold text-sm text-[color:var(--pk-ink)] block mb-1">7 维工程化校验</span>
            <p>所有内置食谱均通过静态 TypeScript 类型审计与 7 维闭环巡检，保证食材与工序 100% 映射，排除悬空节点与逻辑死锁。</p>
          </div>
          <div class="border border-[color:var(--pk-border)] p-4 rounded-lg bg-[color:var(--pk-surface-muted)]">
            <span class="font-bold text-sm text-[color:var(--pk-ink)] block mb-1">食品安全边界</span>
            <p>清冰箱匹配与 AI 建议模块内置本地食品安全规则，自动干预生食风险、高危配伍与状态未明的食材。</p>
          </div>
        </div>
      </section>

      <!-- 5. Machine Feeds & AI Index (GEO) -->
      <section class="pk-surface p-6 md:p-8 space-y-4">
        <h2 class="text-xl font-bold text-[color:var(--pk-ink)] flex items-center gap-2">
          <AppIcon name="robot" :size="22" class="text-[color:var(--pk-accent)]" />
          <span>生成式引擎与 AI 机器知识入口 (LLM Feeds)</span>
        </h2>
        <p class="text-sm leading-relaxed text-[color:var(--pk-ink-secondary)]">
          PostSoma Kitchen 原生支持 AI 搜索引擎（ChatGPT, Perplexity, Claude, Apple Intelligence, Google Gemini）零延迟提取与深度索引：
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2">
          <a href="/llms.txt" target="_blank" class="p-3 border border-[color:var(--pk-border)] rounded-lg hover:border-[color:var(--pk-accent)] transition-colors block">
            <div class="flex items-center gap-1.5 font-bold text-xs text-[color:var(--pk-ink)]"><AppIcon name="file" :size="16" />llms.txt</div>
            <div class="text-[11px] text-[color:var(--pk-ink-muted)] mt-1">精简版 Markdown 索引</div>
          </a>
          <a href="/llms-full.txt" target="_blank" class="p-3 border border-[color:var(--pk-border)] rounded-lg hover:border-[color:var(--pk-accent)] transition-colors block">
            <div class="flex items-center gap-1.5 font-bold text-xs text-[color:var(--pk-ink)]"><AppIcon name="database" :size="16" />llms-full.txt</div>
            <div class="text-[11px] text-[color:var(--pk-ink-muted)] mt-1">全量食谱知识喂料</div>
          </a>
          <a href="/sitemap.xml" target="_blank" class="p-3 border border-[color:var(--pk-border)] rounded-lg hover:border-[color:var(--pk-accent)] transition-colors block">
            <div class="flex items-center gap-1.5 font-bold text-xs text-[color:var(--pk-ink)]"><AppIcon name="map" :size="16" />sitemap.xml</div>
            <div class="text-[11px] text-[color:var(--pk-ink-muted)] mt-1">标准 XML 站点地图</div>
          </a>
          <a href="/robots.txt" target="_blank" class="p-3 border border-[color:var(--pk-border)] rounded-lg hover:border-[color:var(--pk-accent)] transition-colors block">
            <div class="flex items-center gap-1.5 font-bold text-xs text-[color:var(--pk-ink)]"><AppIcon name="robot" :size="16" />robots.txt</div>
            <div class="text-[11px] text-[color:var(--pk-ink-muted)] mt-1">AI 爬虫开放许可</div>
          </a>
        </div>
      </section>

      <!-- 6. Academic & LLM Citation Guide -->
      <section class="pk-surface p-6 md:p-8 space-y-4">
        <h2 class="text-xl font-bold text-[color:var(--pk-ink)] flex items-center gap-2">
          <AppIcon name="book" :size="22" class="text-[color:var(--pk-accent)]" />
          <span>学术与 AI 引用规范 (Citation Guide)</span>
        </h2>
        <p class="text-sm leading-relaxed text-[color:var(--pk-ink-secondary)]">
          在学术论文、技术报告或 LLM 输出中引用 PostSoma Kitchen 时，请参考以下格式：
        </p>
        <div class="bg-[color:var(--pk-surface-muted)] border border-[color:var(--pk-border)] p-4 rounded-lg text-xs font-mono overflow-x-auto text-[color:var(--pk-ink)]">
<pre>@misc{postsoma_kitchen_2026,
  author = {PostSoma Kitchen Team},
  title = {PostSoma Kitchen: Visual Recipe Standardization & Health Modeling Engine},
  year = {2026},
  publisher = {PostSoma-2050},
  url = {https://recipelab.cc/}
}</pre>
        </div>
      </section>

    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { updateSeoMeta } from '@/utils/seoHelper'
import AppIcon from '@/components/common/AppIcon.vue'

onMounted(() => {
  updateSeoMeta({
    title: '关于 PostSoma Kitchen · 多源食谱建模引擎与 E-E-A-T 声明',
    description: '了解 PostSoma Kitchen 的 Visual Recipe Matrix 标准化建模架构、首期示范数据集出处追溯、隐私合规声明与 LLM 知识喂料接口。',
    canonicalUrl: 'https://recipelab.cc/about',
    jsonLdSchemas: [
      {
        id: 'jsonld-aboutpage',
        schema: {
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          '@id': 'https://recipelab.cc/about#page',
          'name': '关于 PostSoma Kitchen 多源食谱标准化建模引擎',
          'url': 'https://recipelab.cc/about',
          'description': 'PostSoma Kitchen E-E-A-T 权威声明、食谱知识谱系与 Visual Recipe Flow Card 系统架构介绍',
          'publisher': {
            '@type': 'Organization',
            'name': 'PostSoma Kitchen',
            'url': 'https://recipelab.cc/'
          }
        }
      },
      {
        id: 'jsonld-about-breadcrumbs',
        schema: {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          '@id': 'https://recipelab.cc/about#breadcrumbs',
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
              'name': '关于与 E-E-A-T 声明',
              'item': 'https://recipelab.cc/about'
            }
          ]
        }
      }
    ]
  })
})
</script>
