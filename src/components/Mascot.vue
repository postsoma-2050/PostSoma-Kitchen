<template>
  <aside class="pk-mascot-dock" aria-label="水墨小主廚"
    :data-mode="snapshot.mode" :data-behavior="snapshot.behavior || 'idle'"
    :style="dockStyle"
    @transitionend="(event) => { if (event.target === event.currentTarget && event.propertyName === 'transform') queue({ type: 'transition_end' }) }">
    <button ref="buttonRef" class="pk-mascot-button" type="button" aria-label="與水墨小主廚互動"
      @mouseenter="queue({ type: 'hover', anchorX: anchorX() })"
      @click="queue({ type: 'tap', at: Date.now(), anchorX: anchorX() })">
      <span class="pk-mascot-stage" aria-hidden="true">
        <span class="pk-mascot-core">
          <img class="pk-mascot-plate" :src="mascotConfig.core.light" alt="" draggable="false" />
          <span class="pk-mascot-sprout" :style="sproutStyle">
            <img :src="mascotConfig.core.sprout.light" alt="" draggable="false" />
          </span>
          <span class="pk-mascot-hat" :style="hatStyle">
            <img :src="mascotConfig.slots.hat.src" alt="" draggable="false" />
          </span>
          <span class="pk-mascot-spatula" :style="spatulaStyle">
            <img :src="mascotConfig.slots.spatula.src" alt="" draggable="false" />
          </span>
          <svg class="pk-mascot-eyes" :viewBox="`0 0 ${mascotConfig.core.width} ${mascotConfig.core.height}`">
            <g v-for="(eye, index) in mascotConfig.core.eyes" :key="index" class="pk-mascot-eye"
              :style="{ transformOrigin: `${eye.x}px ${eye.y}px` }">
              <circle class="pk-mascot-eye-halo" :cx="eye.x" :cy="eye.y" :r="eye.haloRadius" />
              <circle class="pk-mascot-eye-center" :cx="eye.x" :cy="eye.y" :r="eye.moonRadius" />
            </g>
          </svg>
        </span>
      </span>
    </button>
  </aside>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { MascotEngine, type MascotSignal, type MascotSnapshot } from '../mascot/engine'
import { mascotConfig } from '../mascot.config'

const snapshot = ref<MascotSnapshot>({
  mode: 'rest', behavior: null,
  xPercent: mascotConfig.motion.startHorizontalPercent,
  transitionMs: 700, actionMs: 0,
  drives: { ...mascotConfig.drives.defaults }
})
const buttonRef = ref<HTMLButtonElement | null>(null)
const pending: MascotSignal[] = []
let cleanup = () => {}

const dockStyle = computed(() => ({
  left: `${snapshot.value.xPercent}%`,
  '--pk-transition-ms': `${snapshot.value.transitionMs}ms`,
  '--pk-action-ms': `${snapshot.value.actionMs}ms`,
  '--pk-travel-ms': snapshot.value.behavior === 'wander_slide'
    ? `${snapshot.value.actionMs}ms` : '650ms'
}))
const sproutStyle = {
  left: mascotConfig.core.sprout.left, top: mascotConfig.core.sprout.top,
  width: mascotConfig.core.sprout.displayWidth,
  height: mascotConfig.core.sprout.displayHeight,
  transformOrigin: mascotConfig.core.sprout.pivot
}
const hatStyle = {
  left: mascotConfig.slots.hat.left, top: mascotConfig.slots.hat.top,
  width: mascotConfig.slots.hat.width, transformOrigin: mascotConfig.slots.hat.pivot
}
const spatulaStyle = {
  right: mascotConfig.slots.spatula.right, top: mascotConfig.slots.spatula.top,
  width: mascotConfig.slots.spatula.width, transformOrigin: mascotConfig.slots.spatula.pivot
}
function queue(signal: MascotSignal) { pending.push(signal) }
function anchorX() {
  const rect = buttonRef.value?.getBoundingClientRect()
  return rect ? (rect.left + rect.width / 2) / window.innerWidth * 100 : snapshot.value.xPercent
}
function isEditing(target: Element | null) {
  return Boolean(target?.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"])'))
}

onMounted(() => {
  let storage: Storage | null = null
  try { storage = window.localStorage } catch { /* Private browsing still works. */ }
  const engine = new MascotEngine(storage, Date.now())
  snapshot.value = engine.snapshot()
  engine.consumeChanged()
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  let lastScrollY = window.scrollY
  let lastPointer = { x: 0, y: 0, at: 0 }
  let lastActivityAt = 0

  const onVisibility = () => queue({ type: 'document_hidden', value: document.hidden })
  const onFullscreen = () => queue({ type: 'fullscreen', value: Boolean(document.fullscreenElement) })
  const onFocusIn = (event: FocusEvent) => queue({ type: 'busy', value: isEditing(event.target as Element) })
  const onFocusOut = (event: FocusEvent) => {
    if (isEditing(event.target as Element) && !isEditing(event.relatedTarget as Element))
      queue({ type: 'busy', value: false })
  }
  const onScroll = () => {
    const next = window.scrollY
    if (Math.abs(next - lastScrollY) >= mascotConfig.scheduler.scrollThresholdPx) {
      queue({ type: 'scroll' })
      lastScrollY = next
    }
  }
  const onPointerMove = (event: PointerEvent) => {
    const current = { x: event.clientX, y: event.clientY, at: Date.now() }
    if (current.at - lastActivityAt >= 1_000) {
      queue({ type: 'pointer_activity', near: false })
      lastActivityAt = current.at
    }
    const elapsed = current.at - lastPointer.at
    if (lastPointer.at && elapsed > 0) {
      const speed = Math.hypot(current.x - lastPointer.x, current.y - lastPointer.y) / elapsed * 1000
      const rect = buttonRef.value?.getBoundingClientRect()
      const distance = rect ? Math.hypot(current.x - (rect.left + rect.width / 2),
        current.y - (rect.top + rect.height / 2)) : Infinity
      if (speed >= mascotConfig.scheduler.rapidPointerSpeedPxPerSecond &&
        distance < mascotConfig.scheduler.nearbyRadiusPx) queue({ type: 'nearby' })
    }
    lastPointer = current
  }

  document.addEventListener('visibilitychange', onVisibility)
  document.addEventListener('fullscreenchange', onFullscreen)
  document.addEventListener('focusin', onFocusIn)
  document.addEventListener('focusout', onFocusOut)
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('pointermove', onPointerMove, { passive: true })
  onVisibility(); onFullscreen()
  queue({ type: 'busy', value: isEditing(document.activeElement) })

  const interval = window.setInterval(() => {
    engine.tick(Date.now(), pending.splice(0), reducedMotion.matches)
    if (engine.consumeChanged()) snapshot.value = engine.snapshot()
  }, mascotConfig.scheduler.tickMs)

  cleanup = () => {
    window.clearInterval(interval)
    document.removeEventListener('visibilitychange', onVisibility)
    document.removeEventListener('fullscreenchange', onFullscreen)
    document.removeEventListener('focusin', onFocusIn)
    document.removeEventListener('focusout', onFocusOut)
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('pointermove', onPointerMove)
    pending.length = 0
  }
})
onUnmounted(() => cleanup())
</script>

<style scoped>
.pk-mascot-dock {
  --rest: 68px; --peek: 55px; --hat-only: 106px; --hidden: 160px;
  position: fixed; z-index: 40; bottom: 0; width: 118px; height: 129px;
  pointer-events: none; user-select: none;
  transform: translate3d(-50%, var(--rest), 0);
  transition: left var(--pk-travel-ms, 650ms) cubic-bezier(.22,.72,.22,1),
    transform var(--pk-transition-ms, 700ms) cubic-bezier(.22,.72,.22,1);
}
.pk-mascot-dock[data-mode="peek"], .pk-mascot-dock[data-mode="alert"] { transform: translate3d(-50%, var(--peek), 0); }
.pk-mascot-dock[data-mode="companion"], .pk-mascot-dock[data-mode="shock"],
.pk-mascot-dock[data-mode="cooking"] { transform: translate3d(-50%, 0, 0); }
.pk-mascot-dock[data-mode="hat_only"] { transform: translate3d(-50%, var(--hat-only), 0); }
.pk-mascot-dock[data-mode="guarded"] { transform: translate3d(-50%, var(--hidden), 0); }
.pk-mascot-button { position: relative; display: block; width: 100%; height: 100%; padding: 0; border: 0; background: transparent; cursor: pointer; pointer-events: auto; -webkit-tap-highlight-color: transparent; }
.pk-mascot-dock[data-mode="guarded"] .pk-mascot-button,
.pk-mascot-dock[data-mode="hat_only"] .pk-mascot-button { pointer-events: none; }
.pk-mascot-button:focus-visible { outline: 2px solid #285840; outline-offset: 2px; border-radius: 50%; }
.pk-mascot-stage, .pk-mascot-core { position: absolute; inset: 0; display: block; }
.pk-mascot-stage { filter: drop-shadow(0 10px 16px rgba(25,35,30,.18)); }
.pk-mascot-core { transform-origin: 50% 80%; animation: pk-breathe 3.4s ease-in-out infinite; }
.pk-mascot-plate, .pk-mascot-sprout img, .pk-mascot-hat img, .pk-mascot-spatula img { display: block; width: 100%; height: 100%; object-fit: contain; }
.pk-mascot-plate { position: absolute; inset: 0; }
.pk-mascot-sprout { position: absolute; z-index: 4; animation: pk-sprout 3.4s ease-in-out infinite; }
.pk-mascot-hat { position: absolute; z-index: 3; aspect-ratio: 746 / 893; animation: pk-hat-breeze 3.4s ease-in-out infinite; }
.pk-mascot-spatula { position: absolute; z-index: 4; aspect-ratio: 528 / 1250; animation: pk-spatula-breeze 3.4s ease-in-out infinite; }
.pk-mascot-eyes { position: absolute; inset: 0; z-index: 5; width: 100%; height: 100%; overflow: visible; }
.pk-mascot-eye { animation: pk-blink 5.2s ease-in-out infinite; }
.pk-mascot-eye:nth-child(2) { animation-delay: 120ms; }
.pk-mascot-eye-halo { fill: #242320; stroke: #fbfaf7; stroke-width: 13; }
.pk-mascot-eye-center { fill: #fffdf9; }
.pk-mascot-dock[data-behavior="hover_wiggle"] .pk-mascot-stage { animation: pk-wiggle 560ms ease-in-out both; }
.pk-mascot-dock[data-behavior="click_react"] .pk-mascot-stage { animation: pk-hop 760ms cubic-bezier(.2,.8,.22,1) both; }
.pk-mascot-dock[data-behavior="click_react"] .pk-mascot-spatula { animation: pk-spatula-flick 760ms ease-in-out both; }
.pk-mascot-dock[data-behavior="click_react"] .pk-mascot-hat { animation: pk-hat-nod 760ms ease-in-out both; }
.pk-mascot-dock[data-behavior="flinch"] .pk-mascot-stage { animation: pk-flinch 480ms ease-in-out both; }
.pk-mascot-dock[data-behavior="flinch"] .pk-mascot-spatula { animation: pk-spatula-jitter 480ms ease-in-out both; }
.pk-mascot-dock[data-behavior="flinch"] .pk-mascot-hat { animation: pk-hat-nod 480ms ease-in-out both; }
.pk-mascot-dock[data-behavior="cook"] .pk-mascot-stage { animation: pk-cook-hop 2100ms cubic-bezier(.3,.7,.25,1) both; }
.pk-mascot-dock[data-behavior="cook"] .pk-mascot-spatula { animation: pk-cook-spatula 2100ms cubic-bezier(.3,.7,.25,1) both; }
.pk-mascot-dock[data-behavior="cook"] .pk-mascot-hat { animation: pk-cook-hat 2100ms ease-in-out both; }
.pk-mascot-dock[data-behavior="cook"] .pk-mascot-sprout { animation: pk-cook-sprout 2100ms ease-in-out both; }
.pk-mascot-dock[data-behavior="recipe_antic"] .pk-mascot-spatula { animation: pk-spatula-flick 1100ms ease-in-out both; }
.pk-mascot-dock[data-behavior="peek_curious"] .pk-mascot-stage { animation: pk-curious var(--pk-action-ms, 1800ms) ease-in-out both; }
.pk-mascot-dock[data-behavior="wander_slide"] .pk-mascot-stage { animation: pk-waddle 900ms ease-in-out infinite; }
.pk-mascot-dock[data-behavior="subtle_tilt"] .pk-mascot-stage { animation: pk-tilt var(--pk-action-ms, 1200ms) ease-in-out both; }
.pk-mascot-dock[data-behavior="sprout_sway"] .pk-mascot-sprout { animation: pk-sprout-long var(--pk-action-ms, 3500ms) ease-in-out both; }

@keyframes pk-breathe { 0%,100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-2px) scale(.992,1.019); } }
@keyframes pk-blink { 0%,43%,47%,100% { transform: scaleY(1); } 45% { transform: scaleY(.08); } }
@keyframes pk-sprout { 0%,100% { transform: rotate(-6deg); } 50% { transform: rotate(6deg); } }
@keyframes pk-sprout-long { 0%,100% { transform: rotate(-6deg); } 30% { transform: rotate(6deg); } 65% { transform: rotate(-4deg); } }
@keyframes pk-hat-breeze { 0%,100% { transform: rotate(-12deg); } 50% { transform: rotate(-8deg); } }
@keyframes pk-spatula-breeze { 0%,100% { transform: rotate(18deg); } 50% { transform: rotate(14deg) translateY(-2px); } }
@keyframes pk-wiggle { 0%,100% { transform: rotate(0); } 24% { transform: rotate(-25deg); } 48% { transform: rotate(10deg); } 70% { transform: rotate(-9deg); } 86% { transform: rotate(4deg); } }
@keyframes pk-hop { 0%,100% { transform: translateY(0) scale(1); } 28% { transform: translateY(-13px) scale(.97,1.04); } 55% { transform: translateY(0) scale(1.03,.96); } 75% { transform: translateY(-3px); } }
@keyframes pk-spatula-flick { 0%,100% { transform: rotate(18deg); } 32% { transform: rotate(-15deg) translateY(-5px); } 64% { transform: rotate(25deg); } }
@keyframes pk-hat-nod { 0%,100% { transform: rotate(-12deg); } 35% { transform: rotate(-19deg) translateY(-2px); } 70% { transform: rotate(-7deg); } }
@keyframes pk-flinch { 0%,100% { transform: scale(1) rotate(0); } 25% { transform: scale(1.07,.88) rotate(-5deg); } 60% { transform: scale(.94,1.06) rotate(5deg); } }
@keyframes pk-spatula-jitter { 0%,100% { transform: rotate(18deg); } 25% { transform: rotate(35deg); } 50% { transform: rotate(4deg); } 75% { transform: rotate(28deg); } }
@keyframes pk-cook-hop { 0%,100% { transform: translateY(0) rotate(0); } 18% { transform: translateY(2px) scale(1.04,.95) rotate(-2deg); } 40% { transform: translateY(-10px) rotate(2deg); } 57% { transform: translateY(-15px) rotate(-2deg); } 72% { transform: translateY(2px) scale(1.04,.96); } 86% { transform: translateY(-3px); } }
@keyframes pk-cook-spatula { 0%,100% { transform: rotate(18deg); } 20% { transform: rotate(5deg) translateY(2px); } 42% { transform: rotate(-34deg) translate(-3px,-11px); } 57% { transform: rotate(35deg) translate(3px,-1px); } 75% { transform: rotate(-11deg) translateY(-4px); } }
@keyframes pk-cook-hat { 0%,100% { transform: rotate(-12deg); } 42% { transform: rotate(-18deg) translateY(2px); } 57% { transform: rotate(-5deg) translateY(-3px); } 75% { transform: rotate(-14deg); } }
@keyframes pk-cook-sprout { 0%,100% { transform: rotate(-6deg); } 42% { transform: rotate(-10deg); } 57% { transform: rotate(10deg); } 75% { transform: rotate(-4deg); } }
@keyframes pk-curious { 0%,100% { transform: rotate(0); } 35%,65% { transform: rotate(3deg); } }
@keyframes pk-waddle { 0%,100% { transform: rotate(-2deg); } 50% { transform: rotate(2deg); } }
@keyframes pk-tilt { 0%,100% { transform: rotate(0); } 45% { transform: rotate(-7deg); } 70% { transform: rotate(4deg); } }
@media (min-width: 768px) {
  .pk-mascot-dock { --rest: 77px; --peek: 63px; --hat-only: 119px; --hidden: 176px; width: 132px; height: 145px; }
}
@media (prefers-reduced-motion: reduce) {
  .pk-mascot-dock, .pk-mascot-stage, .pk-mascot-core, .pk-mascot-sprout,
  .pk-mascot-hat, .pk-mascot-spatula, .pk-mascot-eye { animation: none !important; transition-duration: 1ms !important; }
}
</style>
