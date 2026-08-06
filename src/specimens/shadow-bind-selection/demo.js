/**
 * Shadow Bind Selection — a shadow tendril extends from source to target and locks both.
 * iframe-safe; no storage / parent / network.
 */

const EXTEND_MS = 260
const LOCK_MS = 220
const TOTAL_MS = EXTEND_MS + LOCK_MS // ~480ms principal sequence

let busy = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-sbs]')
}

function targetEl() {
  return document.querySelector('[data-sbs-target]')
}

let timers = []

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
  return id
}

function setLive(text) {
  const el = document.querySelector('[data-sbs-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-sbs-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-sbs-hint]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-sbs-run], [data-sbs-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showResolved() {
  const target = targetEl()
  rootEl()?.setAttribute('data-phase', 'done')
  target?.setAttribute('data-lock', 'true')
  setStatus('BOUND')
  setHint('Target bound.')
  setLive('Target bound to shadow source.')
}

function resetVisual() {
  const target = targetEl()
  target?.removeAttribute('data-lock')
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('FREE')
  setHint('Press Run to bind the target.')
  setLive('Target unbound. Shadow source idle.')
}

/**
 * Auto-run the full bind sequence.
 * @returns {Promise<void>}
 */
export function runShadowBindSelection() {
  const root = rootEl()
  if (!root || busy || root.getAttribute('data-phase') === 'done') {
    return Promise.resolve()
  }

  busy = true
  clearTimers()
  resetVisual()
  setButtons(false)
  void root.offsetWidth

  if (prefersReducedMotion()) {
    showResolved()
    busy = false
    setButtons(true)
    return Promise.resolve()
  }

  root.setAttribute('data-phase', 'active')
  setStatus('BINDING')
  setLive('Shadow tendril extending toward target.')

  return new Promise((resolve) => {
    later(EXTEND_MS, () => {
      later(LOCK_MS, () => {
        showResolved()
        busy = false
        setButtons(true)
        resolve()
      })
    })
  })
}

export function resetShadowBindSelection() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayShadowBindSelection() {
  if (busy) return
  resetShadowBindSelection()
  void rootEl()?.offsetWidth
  await runShadowBindSelection()
}

function bindUi() {
  document.querySelector('[data-sbs-run]')?.addEventListener('click', () => {
    void runShadowBindSelection()
  })
  document.querySelector('[data-sbs-replay]')?.addEventListener('click', () => {
    void replayShadowBindSelection()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayShadowBindSelection()
  })
}

void TOTAL_MS
bindUi()
resetShadowBindSelection()
