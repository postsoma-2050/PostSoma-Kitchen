import assert from 'node:assert/strict'
import { after } from './cn59-after'
import { compileRecipe, layoutBranchGraph, type Graph } from './branch-layout'

const lanes = { 'cut-beef': 0, mix: 1, marinate: 0, sear: 0, hold: 0, 'prep-veg': 2, 'prep-aroma': 3, aroma: 2, veg: 2, combine: 1, finish: 1 }
const graph = compileRecipe(after, lanes)
const layout = layoutBranchGraph(graph)
assert.equal(layout.nodes.length, after.steps.length + 1)
assert(graph.edges.some(e => e.source === 'hold' && e.target === 'combine' && e.kind === 'material'))
assert(graph.edges.some(e => e.source === 'hold' && e.target === 'aroma' && e.kind === 'order'))
assert(!graph.edges.some(e => e.source === 'hold' && e.target === 'aroma' && e.kind === 'material'))
for (const e of layout.edges) {
  const a = layout.nodes.find(n => n.id === e.source)!, b = layout.nodes.find(n => n.id === e.target)!
  assert(a.rank < b.rank)
  // Every orthogonal segment must avoid the interior of every card.
  const commands = [...e.path.matchAll(/([MHV])\s+([\d.-]+)(?:\s+([\d.-]+))?/g)]
  let x = 0, y = 0
  for (const command of commands) {
    const op = command[1], value = Number(command[2])
    if (op === 'M') { x = value; y = Number(command[3]); continue }
    const nx = op === 'H' ? value : x, ny = op === 'V' ? value : y
    for (const n of layout.nodes) {
      const intersects = op === 'H'
        ? y > n.y && y < n.y + n.h && Math.max(x, nx) > n.x && Math.min(x, nx) < n.x + n.w
        : x > n.x && x < n.x + n.w && Math.max(y, ny) > n.y && Math.min(y, ny) < n.y + n.h
      assert(!intersects, `Edge ${e.id} intersects card ${n.id}`)
    }
    x = nx; y = ny
  }
}
for (let i = 0; i < layout.nodes.length; i++) for (let j = i + 1; j < layout.nodes.length; j++) {
  const a = layout.nodes[i]!, b = layout.nodes[j]!
  assert(!(a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y))
}
const mutate = () => JSON.parse(JSON.stringify(after)) as typeof after
const missing = mutate(); missing.steps[0]!.inputs[0]!.id = 'missing'
assert.throws(() => compileRecipe(missing), /MISSING_PORTION/)
const double = mutate(); double.steps[1]!.inputs.push(double.steps[0]!.inputs[0]!)
assert.throws(() => compileRecipe(double), /DOUBLE_CONSUMPTION/)
const duplicate = mutate(); duplicate.steps.push(duplicate.steps[0]!)
assert.throws(() => compileRecipe(duplicate), /DUPLICATE/)
const cycle = mutate(); cycle.steps[0]!.after.push('combine')
assert.throws(() => compileRecipe(cycle), /CYCLIC/)
const resource = mutate(); resource.steps.find(s => s.id === 'aroma')!.after = []
assert.throws(() => compileRecipe(resource), /UNORDERED_SHARED_EQUIPMENT/)
const reordered: Graph = { nodes: [...graph.nodes].reverse(), edges: [...graph.edges].reverse() }
assert.deepEqual(layoutBranchGraph(reordered), layout)
const packed = layoutBranchGraph({ nodes: [
  { id: 'a', label: '长标题'.repeat(20), detail: '', lane: 0 },
  { id: 'b', label: '同层独立工序', detail: '', lane: 0 },
], edges: [] })
assert.equal(packed.nodes[0]!.rank, packed.nodes[1]!.rank)
assert(packed.nodes[1]!.y >= packed.nodes[0]!.y + packed.nodes[0]!.h)
console.log('PASS: material/control separation, single consumption, DAG, shared equipment, deterministic packing, text height, and edge/card avoidance.')
console.log(JSON.stringify({ actions: after.steps.length, boxes: layout.nodes.length, edges: layout.edges.length, width: layout.width, height: layout.height }))
