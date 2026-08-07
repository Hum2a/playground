/**
 * Boss Introduction Freeze — freeze hold 400ms, slam 520ms, hold to 1100ms total.
 * iframe-safe; no storage / parent / network.
 */

const FREEZE_HOLD_MS = 400
const TOTAL_MS = 1100

let busy = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-bif]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
}

function setLive(text) {
  const el = document.querySelector('[data-bif-live]')
  if (el) el.textContent = text
}

function setPhase(p) {
  rootEl()?.setAttribute('data-phase', p)
}

export function resetBossIntroduction() {
  clearTimers()
  busy = false
  setPhase('idle')
  setLive('Stand by.')
}

export function runBossIntroduction() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()

  busy = true
  clearTimers()
  setPhase('idle')
  void root.offsetWidth

  if (prefersReducedMotion()) {
    setPhase('done')
    setLive('Threat encountered: THREAT // ALPHA.')
    busy = false
    return Promise.resolve()
  }

  setPhase('freeze')
  setLive('Interface frozen.')

  return new Promise((resolve) => {
    later(FREEZE_HOLD_MS, () => {
      setPhase('card')
      setLive('Threat encountered: THREAT // ALPHA.')
      later(TOTAL_MS - FREEZE_HOLD_MS, () => {
        setPhase('done')
        busy = false
        resolve()
      })
    })
  })
}

function bindUi() {
  document.querySelector('[data-bif-trigger]')?.addEventListener('click', () => {
    void runBossIntroduction()
  })
  document.querySelector('[data-bif-reset]')?.addEventListener('click', resetBossIntroduction)
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetBossIntroduction()
  })
}

bindUi()
resetBossIntroduction()
