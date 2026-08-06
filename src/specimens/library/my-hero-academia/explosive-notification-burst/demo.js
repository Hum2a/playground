/**
 * Explosive Notification Burst — center point expands to jagged card.
 * iframe-safe; no storage / parent / network.
 */

const BURST_MS = 420
const SETTLE_MS = 650
const TOTAL_MS = BURST_MS + SETTLE_MS

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
  return document.querySelector('[data-enb]')
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

function setPhase(phase) {
  rootEl()?.setAttribute('data-phase', phase)
}

function setLive(text) {
  const el = document.querySelector('[data-enb-live]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-enb-run], [data-enb-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showCard() {
  const card = document.querySelector('[data-enb-card]')
  if (card) card.hidden = false
  setLive('Alert notification active.')
}

function resetVisual() {
  const card = document.querySelector('[data-enb-card]')
  if (card) card.hidden = true
  setLive('Channel clear.')
}

/** @returns {Promise<void>} */
export function runExplosiveNotificationBurst() {
  const root = rootEl()
  if (!root || busy || root.getAttribute('data-phase') === 'done') {
    return Promise.resolve()
  }

  busy = true
  clearTimers()
  resetVisual()
  setButtons(false)
  setPhase('idle')
  void root.offsetWidth

  if (prefersReducedMotion()) {
    showCard()
    setPhase('done')
    busy = false
    setButtons(true)
    return Promise.resolve()
  }

  setPhase('burst')
  setLive('Burst expanding.')

  return new Promise((resolve) => {
    later(BURST_MS, () => {
      showCard()
      setPhase('done')
      later(SETTLE_MS, () => {
        busy = false
        setButtons(true)
        resolve()
      })
    })
  })
}

export function resetExplosiveNotificationBurst() {
  clearTimers()
  busy = false
  resetVisual()
  setPhase('idle')
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayExplosiveNotificationBurst() {
  if (busy) return
  resetExplosiveNotificationBurst()
  void rootEl()?.offsetWidth
  await runExplosiveNotificationBurst()
}

function bindUi() {
  document.querySelector('[data-enb-run]')?.addEventListener('click', () => {
    void runExplosiveNotificationBurst()
  })
  document.querySelector('[data-enb-replay]')?.addEventListener('click', () => {
    void replayExplosiveNotificationBurst()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayExplosiveNotificationBurst()
  })
}

bindUi()
resetExplosiveNotificationBurst()
