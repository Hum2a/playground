/**
 * Scroll-to-Panel Transform — a round token morphs shape into a panel.
 * iframe-safe; no storage / parent / network.
 */

const MORPH_MS = 480
const SETTLE_MS = 90

let busy = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-stp]')
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

function setLive(text) {
  const el = document.querySelector('[data-stp-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-stp-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-stp-hint]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-stp-run], [data-stp-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showResolved() {
  rootEl()?.setAttribute('data-phase', 'done')
  setStatus('OPENED')
  setHint('Panel opened.')
  setLive('Scroll morphed into an opened content panel.')
}

function resetVisual() {
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('SEALED')
  setHint('Press Run to unseal the scroll into a panel.')
  setLive('Scroll token collapsed. Panel hidden.')
}

/**
 * Auto-run the token-to-panel morph (demo Run).
 * @returns {Promise<void>}
 */
export function runScrollToPanelTransform() {
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
  setStatus('MORPHING')
  setLive('Scroll morphing into a panel.')

  return new Promise((resolve) => {
    later(MORPH_MS + SETTLE_MS, () => {
      showResolved()
      busy = false
      setButtons(true)
      resolve()
    })
  })
}

export function resetScrollToPanelTransform() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayScrollToPanelTransform() {
  if (busy) return
  resetScrollToPanelTransform()
  void rootEl()?.offsetWidth
  await runScrollToPanelTransform()
}

function bindUi() {
  document.querySelector('[data-stp-run]')?.addEventListener('click', () => {
    void runScrollToPanelTransform()
  })
  document.querySelector('[data-stp-replay]')?.addEventListener('click', () => {
    void replayScrollToPanelTransform()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayScrollToPanelTransform()
  })
}

bindUi()
resetScrollToPanelTransform()
