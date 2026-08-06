/**
 * Moon Phase Progress — tiny portable progress API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 *
 * Phase mapping (waxing right → left):
 *   --moon-progress = 0..100
 *   Shade circle translates by calc(var(--moon-progress) * -1%) of moon diameter.
 *   0%: shade centered (new/dark). 50%: half. 100%: shade fully off (full).
 */

const STEP_MS = 260
const JUMP_MS = 420
const TICK_MS = 160
const MILESTONES = [25, 50, 75]

let progress = 0
/** @type {Set<number>} */
let crossed = new Set()
/** @type {number[]} */
let timers = []
let busy = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-moon-phase]')
}

function moonEl() {
  return document.querySelector('[data-moon]')
}

function barEl() {
  return document.querySelector('[data-moon-progressbar]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
  return id
}

function clamp(n) {
  return Math.max(0, Math.min(100, Math.round(n)))
}

function setSemantic(value) {
  const bar = barEl()
  if (!bar) return
  bar.setAttribute('aria-valuenow', String(value))
  bar.setAttribute(
    'aria-valuetext',
    `Archive completion, ${value} percent.`,
  )
}

function setVisualValue(value) {
  const el = document.querySelector('[data-moon-value]')
  if (el) el.textContent = `${value}%`
}

function setFull(on) {
  const root = rootEl()
  const label = document.querySelector('[data-moon-full]')
  root?.classList.toggle('moon-phase--complete', on)
  if (label) label.hidden = !on
  root?.setAttribute('data-state', on ? 'complete' : 'idle')
}

function clearTicks() {
  document.querySelectorAll('[data-moon-tick]').forEach((el) => {
    el.classList.remove('moon-phase__tick--flash')
  })
}

function flashTick(milestone) {
  if (prefersReducedMotion()) return
  const el = document.querySelector(`[data-moon-tick="${milestone}"]`)
  if (!el) return
  el.classList.remove('moon-phase__tick--flash')
  void el.offsetWidth
  el.classList.add('moon-phase__tick--flash')
  later(TICK_MS, () => {
    el.classList.remove('moon-phase__tick--flash')
  })
}

function checkMilestones(from, to) {
  for (const m of MILESTONES) {
    if (from < m && to >= m && !crossed.has(m)) {
      crossed.add(m)
      flashTick(m)
    }
  }
  if (to < 25) crossed.delete(25)
  if (to < 50) crossed.delete(50)
  if (to < 75) crossed.delete(75)
}

function applyProgress(next, { animate = true, durationMs = STEP_MS } = {}) {
  const moon = moonEl()
  const root = rootEl()
  if (!moon || !root) return

  const from = progress
  const to = clamp(next)
  const reduced = prefersReducedMotion()
  const ms = reduced || !animate ? 0 : durationMs

  moon.style.setProperty('--moon-duration', `${ms}ms`)
  moon.style.setProperty('--moon-progress', String(to))

  // Semantic value updates immediately with the logical progress.
  progress = to
  setSemantic(to)
  setVisualValue(to)
  checkMilestones(from, to)

  if (to >= 100) {
    if (from < 100) {
      if (!reduced) {
        root.classList.remove('moon-phase--halo')
        void root.offsetWidth
        root.classList.add('moon-phase--halo')
        later(300, () => {
          root.classList.remove('moon-phase--halo')
          setFull(true)
        })
      } else {
        setFull(true)
      }
    } else {
      setFull(true)
    }
  } else {
    root.classList.remove('moon-phase--halo')
    setFull(false)
  }
}

/**
 * Set absolute progress 0–100.
 * @param {number} value
 * @param {{ animate?: boolean, durationMs?: number }} [opts]
 */
export function setMoonProgress(value, opts = {}) {
  applyProgress(value, opts)
}

/**
 * Increment progress by delta (clamped).
 * @param {number} delta
 */
export function bumpMoonProgress(delta) {
  if (busy) return
  const abs = Math.abs(delta)
  const durationMs = abs <= 10 ? STEP_MS : JUMP_MS
  applyProgress(progress + delta, { animate: true, durationMs })
}

/** Reset to 0% immediately for demo replay. */
export function resetMoonProgress() {
  clearTimers()
  busy = false
  crossed = new Set()
  clearTicks()
  const root = rootEl()
  root?.classList.remove('moon-phase--halo')
  applyProgress(0, { animate: false, durationMs: 0 })
}

function bindUi() {
  document.querySelectorAll('[data-moon-inc]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const delta = Number(btn.getAttribute('data-moon-inc') || '0')
      bumpMoonProgress(delta)
    })
  })
  document.querySelector('[data-moon-reset]')?.addEventListener('click', () => {
    resetMoonProgress()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetMoonProgress()
  })
}

bindUi()
applyProgress(0, { animate: false })
