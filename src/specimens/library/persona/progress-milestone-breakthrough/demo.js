/**
 * Progress Milestone Breakthrough — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 * Visual fill may overshoot; logical aria value never exceeds the real %.
 */

const STEP_A_MS = 300 // 54 → 57
const STEP_B_MS = 220 // 57 → 59
const RESIST_MS = 110
const BREAK_MS = 180
const SETTLE_MS = 140
const ANNOUNCE_MS = 240
const DETAIL_LAG_MS = 70

const PHASES = [
  'pmb--step-a',
  'pmb--step-b',
  'pmb--resist',
  'pmb--break',
  'pmb--overshoot',
  'pmb--settle',
  'pmb--announce',
  'pmb--settled',
  'pmb--busy',
]

let busy = false
let settled = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') ===
    'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-progress-milestone]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
}

function clearPhases(root) {
  root.classList.remove(...PHASES)
}

function setLogical(root, pct) {
  root.setAttribute('data-value', String(pct))
  const bar = root.querySelector('[data-pmb-bar]')
  if (!bar) return
  bar.setAttribute('aria-valuenow', String(pct))
  bar.setAttribute('aria-valuetext', `${pct}% complete`)
}

function setVisual(root, pct) {
  const fill = root.querySelector('[data-pmb-fill]')
  if (fill) fill.style.width = `${pct}%`
}

function setLive(root, text) {
  const live = root.querySelector('[data-pmb-live]')
  if (!live) return
  live.textContent = ''
  void live.offsetWidth
  live.textContent = text
}

function setButtons(root, { go, reset }) {
  const g = root.querySelector('[data-pmb-go]')
  const r = root.querySelector('[data-pmb-reset]')
  if (g) g.disabled = !go
  if (r) r.disabled = !reset
}

function showTick(root, on) {
  const tick = root.querySelector('[data-pmb-tick]')
  const marker = root.querySelector('[data-pmb-marker]')
  if (tick) {
    if (on) tick.removeAttribute('hidden')
    else tick.setAttribute('hidden', '')
  }
  if (marker) marker.hidden = on
}

function finishSettled(root, { reduced } = { reduced: false }) {
  clearPhases(root)
  root.classList.add('pmb--settled')
  if (reduced) root.classList.add('pmb--rm')
  else root.classList.remove('pmb--rm')
  root.setAttribute('data-state', 'settled')
  setLogical(root, 60)
  setVisual(root, 60)
  showTick(root, true)
  settled = true
  busy = false
  setButtons(root, { go: false, reset: true })
  setLive(root, '60% complete. Milestone reached.')
}

/**
 * Run 54 → 57 → 59 → resist → breakthrough → 60.
 * @returns {Promise<void>}
 */
export function addProgressMilestone() {
  const root = rootEl()
  if (!root || busy || settled) return Promise.resolve()

  busy = true
  clearTimers()
  clearPhases(root)
  root.classList.remove('pmb--rm')
  root.classList.add('pmb--busy')
  root.setAttribute('data-state', 'running')
  setLive(root, '')
  setButtons(root, { go: false, reset: false })
  showTick(root, false)
  void root.offsetWidth

  if (prefersReducedMotion()) {
    finishSettled(root, { reduced: true })
    return Promise.resolve()
  }

  // Step A: 54 → 57
  setLogical(root, 57)
  root.classList.add('pmb--step-a')
  setVisual(root, 57)

  return new Promise((resolve) => {
    later(STEP_A_MS, () => {
      root.classList.remove('pmb--step-a')
      root.classList.add('pmb--step-b')
      setLogical(root, 59)
      setVisual(root, 59)
    })

    later(STEP_A_MS + STEP_B_MS, () => {
      root.classList.remove('pmb--step-b')
      root.classList.add('pmb--resist')
    })

    later(STEP_A_MS + STEP_B_MS + RESIST_MS, () => {
      root.classList.remove('pmb--resist')
      root.classList.add('pmb--break', 'pmb--overshoot')
      // Logical milestone crossed — never expose decorative 62%
      setLogical(root, 60)
      setVisual(root, 62)
    })

    later(STEP_A_MS + STEP_B_MS + RESIST_MS + BREAK_MS, () => {
      root.classList.remove('pmb--break', 'pmb--overshoot')
      root.classList.add('pmb--settle')
      setVisual(root, 60)
      showTick(root, true)
    })

    later(STEP_A_MS + STEP_B_MS + RESIST_MS + BREAK_MS + SETTLE_MS, () => {
      root.classList.remove('pmb--settle')
      root.classList.add('pmb--announce')
    })

    later(
      STEP_A_MS +
        STEP_B_MS +
        RESIST_MS +
        BREAK_MS +
        SETTLE_MS +
        DETAIL_LAG_MS +
        ANNOUNCE_MS,
      () => {
        finishSettled(root, { reduced: false })
        root.classList.add('pmb--announce')
        resolve()
      },
    )
  })
}

/** Restore 54% idle. */
export function resetProgressMilestone() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()

  clearTimers()
  clearPhases(root)
  settled = false
  busy = false
  root.classList.remove('pmb--rm')
  root.setAttribute('data-state', 'idle')
  setLogical(root, 54)
  setVisual(root, 54)
  showTick(root, false)
  setLive(root, '')
  setButtons(root, { go: true, reset: true })
  void root.offsetWidth
  return Promise.resolve()
}

/** @returns {Promise<void>} */
export async function replayProgressMilestone() {
  if (busy) return
  await resetProgressMilestone()
  await addProgressMilestone()
}

function bindUi() {
  const root = rootEl()
  root?.querySelector('[data-pmb-go]')?.addEventListener('click', () => {
    void addProgressMilestone()
  })
  root?.querySelector('[data-pmb-reset]')?.addEventListener('click', () => {
    void resetProgressMilestone()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayProgressMilestone()
  })
}

bindUi()
{
  const root = rootEl()
  if (root) setButtons(root, { go: true, reset: true })
}