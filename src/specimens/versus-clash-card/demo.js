/**
 * Versus Clash Card — two competitor cards close in and clash into a locked state.
 * iframe-safe; no storage / parent / network.
 */

const CLOSE_MS = 220
const FLASH_MS = 220
const TOTAL_MS = CLOSE_MS + FLASH_MS // ~440ms principal sequence

let busy = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-vcc]')
}

function vsEl() {
  return document.querySelector('[data-vcc-vs]')
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
  const el = document.querySelector('[data-vcc-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-vcc-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-vcc-hint]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-vcc-run], [data-vcc-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showResolved() {
  const vs = vsEl()
  rootEl()?.setAttribute('data-phase', 'done')
  vs?.setAttribute('data-flash', 'true')
  setStatus('CLASH')
  setHint('Match locked in.')
  setLive('Profile A and Profile B have clashed.')
}

function resetVisual() {
  const vs = vsEl()
  vs?.removeAttribute('data-flash')
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('STANDBY')
  setHint('Press Run to start the clash.')
  setLive('Match standby. Competitors apart.')
}

/**
 * Auto-run the full clash sequence.
 * @returns {Promise<void>}
 */
export function runVersusClashCard() {
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
  setStatus('CLOSING')
  setLive('Competitors closing in.')

  return new Promise((resolve) => {
    later(CLOSE_MS, () => {
      later(FLASH_MS, () => {
        showResolved()
        busy = false
        setButtons(true)
        resolve()
      })
    })
  })
}

export function resetVersusClashCard() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayVersusClashCard() {
  if (busy) return
  resetVersusClashCard()
  void rootEl()?.offsetWidth
  await runVersusClashCard()
}

function bindUi() {
  document.querySelector('[data-vcc-run]')?.addEventListener('click', () => {
    void runVersusClashCard()
  })
  document.querySelector('[data-vcc-replay]')?.addEventListener('click', () => {
    void replayVersusClashCard()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayVersusClashCard()
  })
}

void TOTAL_MS
bindUi()
resetVersusClashCard()
