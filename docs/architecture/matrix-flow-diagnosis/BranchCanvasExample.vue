<!-- Integration reference; intentionally not registered in the production application. -->
<script setup lang="ts">
import { computed, getCurrentInstance } from 'vue'
import type { Graph } from './branch-layout'
import { layoutBranchGraph } from './branch-layout'

const props = defineProps<{ graph: Graph }>()
const arrowId = `branch-arrow-${getCurrentInstance()!.uid}`
const result = computed(() => {
  try { return { layout: layoutBranchGraph(props.graph), error: '' } }
  catch (error) { return { layout: null, error: error instanceof Error ? error.message : '布局失败' } }
})
</script>

<template>
  <p v-if="result.error" role="alert">流程数据需要修复：{{ result.error }}</p>
  <template v-else-if="result.layout">
    <p>实线表示食材或半成品流向；虚线表示操作先后。横向阶段不代表等比例时间。</p>
    <div class="branch-scroll" tabindex="0" role="region" aria-label="烹饪分支流程图，可横向滚动">
      <svg :width="result.layout.width" :height="result.layout.height"
        :viewBox="`0 0 ${result.layout.width} ${result.layout.height}`"
        role="img" aria-label="烹饪流程图，完整步骤及依赖列于下方">
        <defs>
          <marker :id="arrowId" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#334155" />
          </marker>
        </defs>
        <!-- Connections sit below cards. Geometry reserves gutters and long-edge tracks. -->
        <g fill="none" stroke="#334155" stroke-width="1.5">
          <path v-for="edge in result.layout.edges" :key="edge.id" :d="edge.path"
            :stroke-dasharray="edge.kind === 'order' ? '5 4' : undefined"
            :marker-end="`url(#${arrowId})`">
            <title>{{ edge.label }}</title>
          </path>
        </g>
        <g v-for="node in result.layout.nodes" :key="node.id" :transform="`translate(${node.x},${node.y})`">
          <title>{{ node.detail }}</title>
          <rect :width="node.w" :height="node.h" rx="8" fill="#f8fafc" stroke="#64748b" />
          <text fill="#0f172a" font-size="14" font-weight="600">
            <tspan v-for="(line, index) in node.lines" :key="index" x="12" :y="24 + index * 20">{{ line }}</tspan>
          </text>
          <text fill="#334155" font-size="12">
            <tspan v-for="(line, index) in node.metaLines" :key="index" x="12" :y="28 + node.lines.length * 20 + index * 18">{{ line }}</tspan>
          </text>
          <text fill="#475569" font-size="12">
            <tspan v-for="(line, index) in node.secondaryLines" :key="index" x="12" :y="28 + node.lines.length * 20 + node.metaLines.length * 18 + index * 18">{{ line }}</tspan>
          </text>
        </g>
      </svg>
    </div>
    <!-- Touch/keyboard access to full instructions never depends on SVG title/hover. -->
    <ol>
      <li v-for="node in result.layout.nodes" :key="node.id">
        <strong>{{ node.label }}</strong>
        <p>{{ node.detail }}</p>
        <p v-for="edge in result.layout.edges.filter(e => e.target === node.id)" :key="edge.id">
          {{ edge.kind === 'material' ? '承接' : '等待' }}：{{ result.layout.nodes.find(n => n.id === edge.source)?.label }}（{{ edge.label }}）
        </p>
      </li>
    </ol>
  </template>
</template>

<style scoped>
.branch-scroll { overflow-x: auto; max-width: 100%; }
.branch-scroll:focus-visible { outline: 2px solid #0f766e; outline-offset: 3px; }
svg { display: block; font-family: sans-serif; }
li { margin-block: 1rem; }
p { line-height: 1.6; }
</style>
