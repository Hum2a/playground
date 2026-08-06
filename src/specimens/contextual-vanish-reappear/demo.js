/**
 * Contextual Vanish Reappear — tiny portable relocation API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 *
 * No destination scan/lock. Context event (FOCUS ERROR) chooses destination.
 *
 * Timeline (frozen):
 *   0–90ms     error pulse 1 → 1.12 → 1
 *   0–70ms     INSPECT compress .92 → .3
 *   70–130ms   two departure residues fade out (60ms)
 *   130–185ms  gap (55ms) — tool absent, no travel
 *   185ms      two arrival residues
 *   185–295ms  reconstruct .3 → 1.08 → 1 (110ms)
 *   295–375ms  connector ~28px + metadata LINE 72
 */

const ERROR_MS = 90
const VANISH_MS = 70
const RESIDUE_OUT_MS = 60
const GAP_MS = 55
const REAPPEAR_MS = 110
const CONNECTOR_MS = 80

const DEPART_AT = VANISH_MS
const GAP_AT = DEPART_AT + RESIDUE_OUT_MS
const ARRIVE_AT = GAP_AT + GAP_MS
const SETTLE_AT = ARRIVE_AT + REAPPEAR_MS
const DONE_AT = SETTLE_AT + CONNECTOR_MS

/** @type {number[]} */
let timers = []
let busy = false
/** @type {'left' | 'line72'} */
let anchor = 'left'

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') ===
    'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-contextual-vanish]')
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

function setStatus(text) {
  const el = document.querySelector('[data-cvr-status]')
  if (el) el.textContent = text
}

function setMeta(text) {
  const el = document.querySelector('[data-cvr-meta]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-cvr-focus], [data-cvr-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function setPhase(phase) {
  rootEl()?.setAttribute('data-phase', phase)
}

function setAnchor(next) {
  anchor = next
  const root = rootEl()
  root?.setAttribute('data-anchor', next)
}

function applyAttachedImmediate() {
  clearTimers()
  const root = rootEl()
  root?.classList.remove('cvr--reduced')
  setPhase('done')
  setAnchor('line72')
  setMeta('LINE 72')
  setStatus('Inspect anchored at line 72.')
  setButtons(true)
  busy = false
}

/**
 * Context-driven vanish/reappear: left INSPECT → LINE 72.
 * @returns {Promise<void>}
 */
export function runContextualVanish() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()
  if (anchor === 'line72') return Promise.resolve()

  busy = true
  clearTimers()
  root.classList.remove('cvr--reduced')
  setPhase('idle')
  setAnchor('left')
  setMeta('ANCHOR LEFT')
  setButtons(false)
  setStatus('Focusing error. Relocating inspect.')
  void root.offsetWidth

  if (prefersReducedMotion()) {
    root.classList.add('cvr--reduced')
    applyAttachedImmediate()
    return Promise.resolve()
  }

  setPhase('error')

  return new Promise((resolve) => {
    later(0, () => {
      setPhase('vanish')
    })

    later(DEPART_AT, () => {
      setPhase('depart-residue')
    })

    later(GAP_AT, () => {
      setPhase('gap')
      setAnchor('line72')
    })

    later(ARRIVE_AT, () => {
      setPhase('arrive-residue')
    })

    later(ARRIVE_AT + 20, () => {
      setPhase('reappear')
    })

    later(SETTLE_AT, () => {
      setPhase('connect')
      setMeta('LINE 72')
    })

    later(DONE_AT, () => {
      setPhase('done')
      setStatus('Inspect anchored at line 72.')
      busy = false
      setButtons(true)
      resolve()
    })
  })
}

export function resetContextualVanish() {
  clearTimers()
  busy = false
  const root = rootEl()
  root?.classList.remove('cvr--reduced')
  setPhase('idle')
  setAnchor('left')
  setMeta('ANCHOR LEFT')
  setStatus('Inspect anchored left.')
  setButtons(true)
}

/** @returns {Promise<void>} */
export async function replayContextualVanish() {
  if (busy) return
  resetContextualVanish()
  void rootEl()?.offsetWidth
  await runContextualVanish()
}

function bindUi() {
  document.querySelectorAll('[data-cvr-focus]').forEach((btn) => {
    btn.addEventListener('click', () => {
      void runContextualVanish()
    })
  })

  document.querySelectorAll('[data-cvr-replay]').forEach((btn) => {
    btn.addEventListener('click', () => {
      void replayContextualVanish()
    })
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') {
      void replayContextualVanish()
    }
  })
}

bindUi()
resetContextualVanish()

export const CONTEXTUAL_VANISH_TIMING = {
  ERROR_MS,
  VANISH_MS,
  RESIDUE_OUT_MS,
  GAP_MS,
  REAPPEAR_MS,
  CONNECTOR_MS,
  DEPART_AT,
  GAP_AT,
  ARRIVE_AT,
  SETTLE_AT,
  DONE_AT,
}
