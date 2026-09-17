<template>
  <footer class="mx-auto mt-12 w-[calc(100%-2rem)] max-w-7xl border-t border-[color:var(--pk-border)] px-4 py-10 md:w-[calc(100%-4rem)] no-print">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-[color:var(--pk-border)] text-left">
      <!-- 品牌与使命 -->
      <div class="md:col-span-2 space-y-2">
        <div class="flex items-center gap-2">
          <img src="/logo.svg" alt="" class="h-6 w-6" />
          <span class="text-base font-bold tracking-tight text-[color:var(--pk-ink)]">PostSoma Kitchen</span>
        </div>
        <p class="text-xs leading-relaxed text-[color:var(--pk-ink-muted)] max-w-md">
          多源健康食谱标准化建模引擎 (VisualRecipeV3.0)。将多元料理、营养体系与私房配料交织渲染为直观的二维矩阵流程图。
        </p>
        <p class="text-[11px] text-[color:var(--pk-ink-subtle)] font-mono">
          Canonical Host: <a href="https://recipelab.cc/" class="hover:underline text-[color:var(--pk-accent)]">https://recipelab.cc/</a>
        </p>
      </div>

      <!-- 快速导航 -->
      <div class="space-y-2">
        <h3 class="text-xs font-bold text-[color:var(--pk-ink)] uppercase tracking-wider">站内导航</h3>
        <ul class="space-y-1.5 text-xs text-[color:var(--pk-ink-secondary)]">
          <li><router-link to="/" class="hover:text-[color:var(--pk-accent)]">结构化食谱档案</router-link></li>
          <li><router-link to="/fridge" class="hover:text-[color:var(--pk-accent)]">按食材找方向 (清冰箱)</router-link></li>
          <li><router-link to="/about" class="hover:text-[color:var(--pk-accent)]">关于与 E-E-A-T 权威声明</router-link></li>
          <li><router-link to="/admin" class="hover:text-[color:var(--pk-accent)]">Kitchen Studio</router-link></li>
        </ul>
      </div>

      <!-- AI 知识喂料与机器入口 -->
      <div class="space-y-2">
        <h3 class="text-xs font-bold text-[color:var(--pk-ink)] uppercase tracking-wider">AI Machine Feeds (GEO)</h3>
        <ul class="space-y-1.5 text-xs text-[color:var(--pk-ink-secondary)]">
          <li><a href="/llms.txt" target="_blank" class="hover:text-[color:var(--pk-accent)]">llms.txt (LLM 索引)</a></li>
          <li><a href="/llms-full.txt" target="_blank" class="hover:text-[color:var(--pk-accent)]">llms-full.txt (170 道食谱全量喂料)</a></li>
          <li><a href="/sitemap.xml" target="_blank" class="hover:text-[color:var(--pk-accent)]">sitemap.xml (站点地图)</a></li>
          <li><a href="/robots.txt" target="_blank" class="hover:text-[color:var(--pk-accent)]">robots.txt (AI 爬虫规则)</a></li>
        </ul>
      </div>
    </div>

    <!-- 底部版权 -->
    <div class="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-[11px] text-[color:var(--pk-ink-subtle)]">
      <p>
        Multi-Source Recipe Standardization Engine · Phase-1 Inaugural Collection (170 Audited V3 Recipes).
      </p>
      <p>© 2026 PostSoma Kitchen. Made by postsoma-2050.</p>
    </div>
  </footer>
</template>
