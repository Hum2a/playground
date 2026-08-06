/**
 * SPX-1022 Linked Fusion Merge (DB-057 Potara Fusion)
 *
 * External shared link forces merge (unlike synchronous self-alignment).
 *
 * Timing from LINK (ms):
 *   0–90       nodes fill
 *   90–270     lines to midpoint (180ms)
 *   270–350    diamond forms (~80ms) → LINK ACTIVE
 *   350–470    tension +4/-4 then 2px out (120ms)
 *   470–750    converge 280ms (rot ±9deg, scale →.78)
 *   750–820    diamond 14→34 hold 70ms (~18px gap)
 *   820–920    sources collapse 100ms
 *   920–1140   C expands .55→1.08→1 (220ms); lines retract
 */

const NODE_FILL_MS = 90
const LINE_MS = 180
const DIAMOND_MS = 80
const TENSION_MS = 120
const CONVERGE_MS = 280
const DIAMOND_HOLD_MS = 70
const COLLAPSE_MS = 100
const EXPAND_MS = 220

const T0 = 0
const T_LINES = T0 + NODE_FILL_MS
const T_DIAMOND = T_LINES + LINE_MS
const T_ACTIVE = T_DIAMOND + DIAMOND_MS
const T_TENSION = T_ACTIVE
const T_CONVERGE = T_TENSION + TENSION_MS
const T_HOLD = T_CONVERGE + CONVERGE_MS
const T_COLLAPSE = T_HOLD + DIAMOND_HOLD_MS
const T_EXPAND = T_COLLAPSE + COLLAPSE_MS
const T_DONE = T_EXPAND + EXPAND_MS

/** @type {number[]} */
let timers = []
let busy = false
let done = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') ===
    'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-linked-fusion]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
}

function setAnnounce(root, text) {
  const el = root.querySelector('[data-lfm-announce]')
  if (!el) return
  el.textContent = ''
  void el.offsetWidth
  el.textContent = text
}

function setRel(root, text) {
  const el = root.querySelector('[data-lfm-rel]')
  if (el) el.textContent = text
}

function setControls(root, { link, resetVisible }) {
  const linkBtn = root.querySelector('[data-lfm-link]')
  const resetBtn = root.querySelector('[data-lfm-reset]')
  if (linkBtn) linkBtn.disabled = !link
  if (resetBtn) resetBtn.hidden = !resetVisible
}

function clearPhases(root) {
  root.classList.remove(
    'is-linking',
    'is-lined',
    'is-diamond',
    'is-active',
    'is-tension',
    'is-converge',
    'is-hold',
    'is-collapse',
    'is-expand',
    'is-complete',
    'is-reduced',
  )
}

function finish(root) {
  clearPhases(root)
  root.classList.add('is-complete')
  root.dataset.state = 'complete'
  setRel(root, 'LINKED MERGE')
  setAnnounce(root, 'Profiles A and B merged into Profile C.')
  busy = false
  done = true
  setControls(root, { link: false, resetVisible: true })
}

/**
 * Run linked fusion: external relationship → forced convergence → Profile C.
 * @returns {Promise<void>}
 */
export function runLinkedFusion() {
  const root = rootEl()
  if (!root || busy || done) return Promise.resolve()

  busy = true
  clearTimers()
  clearPhases(root)
  root.dataset.state = 'running'
  setControls(root, { link: false, resetVisible: false })
  setRel(root, 'UNLINKED')
  setAnnounce(root, 'Establishing shared link between Profile A and Profile B.')
  void root.offsetWidth

  if (prefersReducedMotion()) {
    root.classList.add('is-reduced', 'is-complete')
    finish(root)
    return Promise.resolve()
  }

  return new Promise((resolve) => {
    root.classList.add('is-linking')

    later(T_LINES, () => {
      root.classList.add('is-lined')
    })

    later(T_DIAMOND, () => {
      root.classList.add('is-diamond')
    })

    later(T_ACTIVE, () => {
      root.classList.add('is-active')
      setRel(root, 'LINK ACTIVE')
      setAnnounce(root, 'Link active. Relationship pulling profiles together.')
      root.classList.add('is-tension')
    })

    later(T_CONVERGE, () => {
      root.classList.remove('is-tension')
      root.classList.add('is-converge')
      setAnnounce(root, 'Profiles converging under shared link.')
    })

    later(T_HOLD, () => {
      root.classList.add('is-hold')
    })

    later(T_COLLAPSE, () => {
      root.classList.remove('is-hold', 'is-converge')
      root.classList.add('is-collapse')
    })

    later(T_EXPAND, () => {
      root.classList.remove('is-collapse', 'is-linking', 'is-lined', 'is-diamond')
      root.classList.add('is-expand')
    })

    later(T_DONE, () => {
      finish(root)
      resolve()
    })
  })
}

/**
 * Restore unlinked A/B idle state.
 * @returns {Promise<void>}
 */
export function resetLinkedFusion() {
  const root = rootEl()
  if (!root) return Promise.resolve()

  clearTimers()
  busy = false
  done = false
  clearPhases(root)
  root.dataset.state = 'idle'
  setRel(root, 'UNLINKED')
  setAnnounce(root, '')
  setControls(root, { link: true, resetVisible: false })
  void root.offsetWidth
  return Promise.resolve()
}

function bindUi() {
  const root = rootEl()
  if (!root || root.dataset.lfmBound === '1') return
  root.dataset.lfmBound = '1'

  setRel(root, 'UNLINKED')
  setControls(root, { link: true, resetVisible: false })

  root.querySelector('[data-lfm-link]')?.addEventListener('click', () => {
    void runLinkedFusion()
  })

  root.querySelector('[data-lfm-reset]')?.addEventListener('click', () => {
    void resetLinkedFusion()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void resetLinkedFusion()
  })
}

bindUi()
