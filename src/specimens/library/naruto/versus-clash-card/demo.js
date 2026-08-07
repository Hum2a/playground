/**
 * Versus Clash Card — opposing cards slam 28px inward, hold clash, then lock.
 * iframe-safe; no storage / parent / network.
 */

const CLOSE_MS = 240
const CLASH_HOLD_MS = 180
const FLASH_MS = 200
const TRAVEL_PX = 28
const CLASH_GAP_PX = 4

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
  return document.querySelector('[data-vcc]')
}

function vsEl() {
  return document.querySelector('[data-vcc-vs]')
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
      root.setAttribute('data-phase', 'clash')
      setStatus('IMPACT')
      setLive('Clash hold.')
      later(CLASH_HOLD_MS, () => {
        later(FLASH_MS, () => {
          showResolved()
          busy = false
          setButtons(true)
          resolve()
        })
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

void TRAVEL_PX
void CLASH_GAP_PX
bindUi()
resetVersusClashCard()
