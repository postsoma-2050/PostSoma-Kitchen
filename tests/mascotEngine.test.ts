import assert from 'node:assert/strict'
import { MascotEngine, type MascotSignal } from '../src/mascot/engine'

let now = 1_000
const saved = new Map<string, string>()
const storage = {
  getItem: (key: string) => saved.get(key) ?? null,
  setItem: (key: string, value: string) => { saved.set(key, value) },
}
const engine = new MascotEngine(storage, now, () => 0.5)
function tick(ms: number, signals: MascotSignal[] = []) {
  now += ms
  engine.tick(now, signals, false)
  return engine.snapshot()
}
function tap(ms: number) {
  now += ms
  engine.tick(now, [{ type: 'tap', at: now, anchorX: 70 }], false)
  return engine.snapshot()
}

assert.equal(tick(100).mode, 'rest')
assert.equal(tick(100, [{ type: 'hover', anchorX: 70 }]).behavior, 'hover_wiggle')
tick(600)
tap(100)
assert.equal(tick(400).mode, 'companion')
tap(900); tap(100)
assert.equal(tick(400).mode, 'shock')
tick(600)
tap(100); tap(100)
assert.equal(tap(100).mode, 'cooking')
assert.equal(tick(2_200).mode, 'hat_only')
assert.equal(tick(3_200).mode, 'rest')
assert.equal(tick(100, [{ type: 'busy', value: true }]).mode, 'guarded')
assert.equal(tick(100, [{ type: 'busy', value: false }]).mode, 'rest')

console.log('✅ Kitchen 桌宠：hover、单击、双击、三击、帽子过渡及忙碌守卫通过')
