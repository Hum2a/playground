/**
 * Deadline Panic — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 * Uses performance.now() + rAF so the countdown does not accumulate setTimeout drift.
 */

const DURATION_MS = 10000
const COLLAPSE_MS = 120
const IMPACT_MS = 300

let busy = false
let running = false
let startAt = 0
/** @type {number} */
let rafId = 0
/** @type {number[]} */
let timers = []
let lastDisplaySec = 10

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') ===
    'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-deadline-panic]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
}

function cancelRaf() {
  if (rafId) {
    window.cancelAnimationFrame(rafId)
    rafId = 0
  }
}

function setButtons(root, { go, reset }) {
  const g = root.querySelector('[data-dp-start]')
  const r = root.querySelector('[data-dp-reset]')
  if (g) g.disabled = !go
  if (r) r.disabled = !reset
}

function setLive(root, text) {
  const live = root.querySelector('[data-dp-live]')
  if (!live) return
  live.textContent = ''
  void live.offsetWidth
  live.textContent = text
}

function setSr(root, text) {
  const sr = root.querySelector('[data-dp-sr]')
  if (sr) sr.textContent = text
}

function phaseFor(sec) {
  if (sec >= 6) return 'stable'
  if (sec >= 4) return 'tense'
  if (sec === 3) return 'split'
  if (sec === 2) return 'scatter'
  if (sec === 1) return 'shatter'
  return 'zero'
}

function formatDigits(sec) {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return [
    String(Math.floor(m / 10)),
    String(m % 10),
    String(Math.floor(s / 10)),
    String(s % 10),
  ]
}

function paintDigits(root, sec, { nudge }) {
  const digits = formatDigits(sec)
  root.querySelectorAll('[data-dp-digit]').forEach((el) => {
    const i = Number(el.getAttribute('data-dp-digit') ?? '0')
    const next = digits[i] ?? '0'
    const prev = el.textContent
    el.textContent = next
    if (nudge && prev !== next && !prefersReducedMotion()) {
      el.classList.remove('dp__digit--nudge')
      void el.offsetWidth
      el.classList.add('dp__digit--nudge')
    }
  })
}

function setPhase(root, phase, secs) {
  root.setAttribute('data-phase', phase)
  root.setAttribute('data-secs', String(secs))
  root.dataset.secs = String(secs)
}

function showTimeUp(root, on) {
  const panel = root.querySelector('[data-dp-timeup]')
  const timer = root.querySelector('[data-dp-timer]')
  if (panel) {
    if (on) panel.removeAttribute('hidden')
    else panel.setAttribute('hidden', '')
  }
  if (timer) timer.hidden = on
}

function finishTimeUp(root) {
  cancelRaf()
  clearTimers()
  running = false
  busy = false
  setPhase(root, 'timeup', 0)
  root.setAttribute('data-state', 'expired')
  showTimeUp(root, true)
  root.classList.add('dp--timeup')
  root.classList.remove('dp--collapse', 'dp--busy')
  setSr(root, 'Time expired')
  setLive(root, 'Time expired.')
  setButtons(root, { go: false, reset: true })
}

function onZero(root) {
  setPhase(root, 'zero', 0)
  paintDigits(root, 0, { nudge: false })
  setSr(root, '0 seconds remaining')

  if (prefersReducedMotion()) {
    finishTimeUp(root)
    return
  }

  root.classList.add('dp--collapse')
  later(COLLAPSE_MS, () => {
    root.classList.remove('dp--collapse')
    root.classList.add('dp--impact')
    showTimeUp(root, true)
    later(IMPACT_MS, () => {
      root.classList.remove('dp--impact')
      finishTimeUp(root)
    })
  })
}

function frame(now) {
  const root = rootEl()
  if (!root || !running) return

  const elapsed = now - startAt
  const remainingMs = Math.max(0, DURATION_MS - elapsed)
  const displaySec = Math.max(0, Math.ceil(remainingMs / 1000))

  if (displaySec !== lastDisplaySec) {
    lastDisplaySec = displaySec
    const phase = phaseFor(displaySec)
    setPhase(root, phase, displaySec)
    paintDigits(root, displaySec, { nudge: phase === 'stable' })
    // Quiet SR text update — not aria-live, so AT is not spammed each second
    setSr(
      root,
      displaySec === 1
        ? '1 second remaining'
        : `${displaySec} seconds remaining`,
    )
  }

  if (remainingMs <= 0) {
    onZero(root)
    return
  }

  rafId = window.requestAnimationFrame(frame)
}

/**
 * Start the 10s countdown from a wall-clock anchor.
 * @returns {Promise<void>}
 */
export function startDeadlinePanic() {
  const root = rootEl()
  if (!root || busy || running) return Promise.resolve()

  busy = true
  running = true
  clearTimers()
  cancelRaf()
  root.classList.remove('dp--timeup', 'dp--collapse', 'dp--impact', 'dp--rm')
  root.classList.add('dp--busy')
  root.setAttribute('data-state', 'running')
  showTimeUp(root, false)
  setLive(root, '')
  setButtons(root, { go: false, reset: false })

  lastDisplaySec = 10
  setPhase(root, 'stable', 10)
  paintDigits(root, 10, { nudge: false })
  setSr(root, '10 seconds remaining')

  if (prefersReducedMotion()) {
    root.classList.add('dp--rm')
  }

  startAt = performance.now()
  busy = false
  rafId = window.requestAnimationFrame(frame)
  return Promise.resolve()
}

/** Restore idle 00:10. */
export function resetDeadlinePanic() {
  const root = rootEl()
  if (!root) return Promise.resolve()
  if (running && busy) return Promise.resolve()

  cancelRaf()
  clearTimers()
  running = false
  busy = false
  lastDisplaySec = 10
  root.classList.remove(
    'dp--busy',
    'dp--timeup',
    'dp--collapse',
    'dp--impact',
    'dp--rm',
  )
  root.setAttribute('data-state', 'idle')
  setPhase(root, 'idle', 10)
  paintDigits(root, 10, { nudge: false })
  showTimeUp(root, false)
  setSr(root, '10 seconds remaining')
  setLive(root, '')
  setButtons(root, { go: true, reset: true })
  void root.offsetWidth
  return Promise.resolve()
}

/** @returns {Promise<void>} */
export async function replayDeadlinePanic() {
  await resetDeadlinePanic()
  await startDeadlinePanic()
}

function bindUi() {
  const root = rootEl()
  root?.querySelector('[data-dp-start]')?.addEventListener('click', () => {
    void startDeadlinePanic()
  })
  root?.querySelector('[data-dp-reset]')?.addEventListener('click', () => {
    // Allow reset mid-run
    running = false
    busy = false
    void resetDeadlinePanic()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayDeadlinePanic()
  })
}

bindUi()
{
  const root = rootEl()
  if (root) {
    setButtons(root, { go: true, reset: true })
    paintDigits(root, 10, { nudge: false })
  }
}