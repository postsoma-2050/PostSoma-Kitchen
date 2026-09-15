import type { BranchRecipe, Input } from './cn59-after'
import { wrapTextToLines } from '../../../src/utils/textMeasurement'

export interface GraphNode { id: string; label: string; detail: string; lane: number; meta?: string[]; secondary?: string }
export interface Edge { id: string; source: string; target: string; kind: 'material' | 'order'; label: string }
export interface Graph { nodes: GraphNode[]; edges: Edge[] }
export interface Box extends GraphNode { x: number; y: number; w: number; h: number; rank: number; lines: string[]; metaLines: string[]; secondaryLines: string[] }
export interface RoutedEdge extends Edge { path: string }
export interface Layout { nodes: Box[]; edges: RoutedEdge[]; width: number; height: number }

function unique<T extends { id: string }>(values: T[], name: string): Map<string, T> {
  const map = new Map(values.map(v => [v.id, v]))
  if (map.size !== values.length || values.some(v => !v.id)) throw new Error(`DUPLICATE_OR_EMPTY_${name}`)
  return map
}

// One output per step keeps this reference implementation small. Production split
// operations must explicitly produce several separately allocated outputs.
export function compileRecipe(recipe: BranchRecipe, lanes: Record<string, number> = {}): Graph {
  const steps = unique(recipe.steps, 'STEP')
  if (steps.has('finish')) throw new Error('RESERVED_FINISH_ID')
  const ingredients = unique(recipe.ingredients, 'INGREDIENT')
  const portions = unique(recipe.portions, 'PORTION')
  const equipment = unique(recipe.equipment, 'EQUIPMENT')
  unique(recipe.formulas, 'FORMULA')
  unique(recipe.groups, 'GROUP')
  const outputs = new Map<string, string>()
  for (const s of recipe.steps) {
    if (!s.output.id || outputs.has(s.output.id)) throw new Error('DUPLICATE_OUTPUT')
    outputs.set(s.output.id, s.id)
    if (!equipment.has(s.equipmentId) || !equipment.has(s.output.location)) throw new Error('MISSING_EQUIPMENT')
  }
  for (const p of recipe.portions) {
    if (!ingredients.has(p.ingredientId)) throw new Error('MISSING_INGREDIENT')
    if (p.quantity.kind === 'measured' && (!Number.isFinite(p.quantity.value) || p.quantity.value <= 0)) throw new Error('INVALID_QUANTITY')
  }
  for (const g of [...recipe.formulas, ...recipe.groups]) {
    if (!g.portionIds.length || new Set(g.portionIds).size !== g.portionIds.length || g.portionIds.some(id => !portions.has(id))) throw new Error('INVALID_GROUP')
  }
  for (const f of recipe.formulas) {
    const prep = steps.get(f.prepStepId)
    if (!prep || f.portionIds.some(id => !prep.inputs.some(i => i.kind === 'portion' && i.id === id))) throw new Error('INVALID_FORMULA_PREP')
  }
  const edges: Edge[] = []
  const consumed = new Set<string>()
  const inputsText = (inputs: Input[], target: string) => inputs.map(input => {
    const key = `${input.kind}:${input.id}`
    if (consumed.has(key)) throw new Error(`DOUBLE_CONSUMPTION:${key}`)
    consumed.add(key)
    if (input.kind === 'portion') {
      const portion = portions.get(input.id)
      if (!portion) throw new Error(`MISSING_PORTION:${input.id}`)
      const amount = portion.quantity.kind === 'unknown' ? '用量待核实' : `${portion.quantity.value} ${portion.quantity.unit}`
      return `${ingredients.get(portion.ingredientId)!.name} ${amount}`
    }
    const source = outputs.get(input.id)
    if (!source) throw new Error(`MISSING_OUTPUT:${input.id}`)
    const name = steps.get(source)!.output.name
    edges.push({ id: `material:${input.id}:${target}`, source, target, kind: 'material', label: name })
    return name
  }).join('；')
  const nodes: GraphNode[] = recipe.steps.map(s => ({
    id: s.id, label: s.label,
    detail: `${inputsText(s.inputs, s.id)}。${s.instruction}`,
    lane: lanes[s.id] ?? 0,
    meta: [
      `${s.heat === 'off' ? '不加热' : s.heat === 'high' ? '大火' : '火候待核实'} · ${s.duration.kind === 'unknown' ? '时长待核实' : `${s.duration.minSeconds}–${s.duration.maxSeconds}秒`}`,
      s.operation === 'transfer' ? `移至${equipment.get(s.output.location)!.name}` : equipment.get(s.equipmentId)!.name,
    ],
  }))
  nodes.push({ id: 'finish', label: recipe.finish.label,
    detail: `${inputsText([recipe.finish.input], 'finish')}。${recipe.finish.instruction} ${recipe.finish.expectedResult}`,
    secondary: recipe.finish.expectedResult, lane: lanes.finish ?? 0 })
  for (const s of recipe.steps) for (const source of new Set(s.after)) {
    if (!steps.has(source)) throw new Error(`MISSING_ORDER_SOURCE:${source}`)
    if (!edges.some(e => e.source === source && e.target === s.id))
      edges.push({ id: `order:${source}:${s.id}`, source, target: s.id, kind: 'order', label: '完成前一步后操作' })
  }
  for (const id of portions.keys()) if (!consumed.has(`portion:${id}`)) throw new Error(`UNUSED_PORTION:${id}`)
  for (const id of outputs.keys()) if (!consumed.has(`output:${id}`)) throw new Error(`UNUSED_OUTPUT:${id}`)
  const graph = { nodes, edges }
  // Cycle/reference validation precedes any geometry or resource reachability test.
  topological(graph)
  const reaches = (source: string, target: string, seen = new Set<string>()): boolean => {
    if (source === target) return true
    if (seen.has(source)) return false
    seen.add(source)
    return edges.filter(e => e.source === source).some(e => reaches(e.target, target, seen))
  }
  for (let i = 0; i < recipe.steps.length; i++) for (let j = i + 1; j < recipe.steps.length; j++) {
    const a = recipe.steps[i]!, b = recipe.steps[j]!
    if (a.equipmentId === b.equipmentId && !reaches(a.id, b.id) && !reaches(b.id, a.id))
      throw new Error(`UNORDERED_SHARED_EQUIPMENT:${a.id}:${b.id}`)
  }
  return graph
}

export function topological(graph: Graph): GraphNode[] {
  const nodes = unique(graph.nodes, 'NODE')
  unique(graph.edges, 'EDGE')
  const incoming = new Map(graph.nodes.map(n => [n.id, 0]))
  const outgoing = new Map(graph.nodes.map(n => [n.id, [] as string[]]))
  for (const e of graph.edges) {
    if (!nodes.has(e.source) || !nodes.has(e.target)) throw new Error('MISSING_EDGE_ENDPOINT')
    incoming.set(e.target, incoming.get(e.target)! + 1)
    outgoing.get(e.source)!.push(e.target)
  }
  const ready = graph.nodes.filter(n => !incoming.get(n.id)).map(n => n.id).sort()
  const result: GraphNode[] = []
  while (ready.length) {
    const id = ready.shift()!
    result.push(nodes.get(id)!)
    for (const target of outgoing.get(id)!) {
      incoming.set(target, incoming.get(target)! - 1)
      if (!incoming.get(target)) { ready.push(target); ready.sort() }
    }
  }
  if (result.length !== nodes.size) throw new Error('CYCLIC_GRAPH')
  return result
}

// Geometry is view-only. Physical/data order determines rank; packing never changes it.
// Adjacent edges use column gutters; long edges use individually reserved overhead tracks.
// This guarantees node avoidance, not globally optimal edge crossings.
export function layoutBranchGraph(graph: Graph): Layout {
  const sorted = topological(graph)
  if (!sorted.length) return { nodes: [], edges: [], width: 32, height: 32 }
  const rank = new Map<string, number>()
  for (const n of sorted) rank.set(n.id, Math.max(0, ...graph.edges.filter(e => e.target === n.id).map(e => rank.get(e.source)! + 1)))
  const maxRank = Math.max(...rank.values())
  const width = 184, padding = 20, track = 10
  const edges = [...graph.edges].sort((a, b) => a.id.localeCompare(b.id))
  const longEdges = edges.filter(e => rank.get(e.target)! - rank.get(e.source)! > 1)
  const header = padding + longEdges.length * track + 30
  const xs = [padding]
  for (let r = 0; r < maxRank; r++) {
    const count = edges.filter(e => rank.get(e.source) === r || rank.get(e.target) === r + 1).length
    xs.push(xs[r]! + width + 40 + count * track)
  }
  const lines = new Map(sorted.map(n => [n.id, wrapTextToLines(n.label, width - 24, 14, true)]))
  const metaLines = new Map(sorted.map(n => [n.id, (n.meta ?? []).flatMap(t => wrapTextToLines(t, width - 24, 12, false))]))
  const secondaryLines = new Map(sorted.map(n => [n.id, n.secondary ? wrapTextToLines(n.secondary, width - 24, 12, false) : []]))
  const heights = new Map(sorted.map(n => [n.id, Math.max(64,
    lines.get(n.id)!.length * 20 + metaLines.get(n.id)!.length * 18 + secondaryLines.get(n.id)!.length * 18 + 28)]))
  const pitch = Math.max(...heights.values()) + 32
  const occupied = new Map<number, Set<number>>()
  const nodes: Box[] = sorted.map(n => {
    const r = rank.get(n.id)!
    if (!Number.isInteger(n.lane) || n.lane < 0) throw new Error('INVALID_LANE')
    const used = occupied.get(r) ?? new Set<number>()
    let lane = n.lane
    while (used.has(lane)) lane++
    used.add(lane); occupied.set(r, used)
    return { ...n, lane, rank: r, x: xs[r]!, y: header + lane * pitch, w: width, h: heights.get(n.id)!, lines: lines.get(n.id)!, metaLines: metaLines.get(n.id)!, secondaryLines: secondaryLines.get(n.id)! }
  })
  const byId = new Map(nodes.map(n => [n.id, n]))
  const gutterIndex = new Map<number, number>()
  const allocateGutter = (r: number) => {
    const index = gutterIndex.get(r) ?? 0
    gutterIndex.set(r, index + 1)
    return xs[r]! + width + 20 + index * track
  }
  const routed = edges.map(e => {
    const a = byId.get(e.source)!, b = byId.get(e.target)!
    const incoming = edges.filter(x => x.target === b.id)
    const outgoing = edges.filter(x => x.source === a.id)
    const sy = a.y + a.h * (outgoing.indexOf(e) + 1) / (outgoing.length + 1)
    const ty = b.y + b.h * (incoming.indexOf(e) + 1) / (incoming.length + 1)
    const sx = a.x + a.w, tx = b.x
    const gx = allocateGutter(a.rank)
    let path: string
    if (b.rank === a.rank + 1) path = `M ${sx} ${sy} H ${gx} V ${ty} H ${tx}`
    else {
      const ex = allocateGutter(b.rank - 1)
      const roof = padding + longEdges.indexOf(e) * track
      path = `M ${sx} ${sy} H ${gx} V ${roof} H ${ex} V ${ty} H ${tx}`
    }
    return { ...e, path }
  })
  return { nodes, edges: routed, width: xs[maxRank]! + width + padding,
    height: Math.max(...nodes.map(n => n.y + n.h)) + padding }
}
