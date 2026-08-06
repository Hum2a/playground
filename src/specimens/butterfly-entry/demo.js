/**
 * Butterfly Entry — tiny portable arrival API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 *
 * Timeline (frozen):
 *   0–500ms   approach (stagger 48/56/64/72/40/80ms)
 *   450–650ms partial orbit (~150deg)
 *   620–760ms converge to centre
 *   760–1020ms card construct + backing shards
 */

const ORBIT_AT = 450
const CONVERGE_AT = 620
const CONSTRUCT_AT = 760
const SETTLE_AT = 1020

const PHASES = [
  'butterfly-entry--arrive',
  'butterfly-entry--orbit',
  'butterfly-entry--converge',
  'butterfly-entry--construct',
  'butterfly-entry--settled',
  'butterfly-entry--reduced',
]

let busy = false
let arrived = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-butterfly-entry]')
}

function cardEl() {
  return document.querySelector('[data-bf-card]')
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

function clearPhases(root) {
  root.classList.remove(...PHASES)
}

function setStatus(text) {
  const el = document.querySelector('[data-bf-status]')
  if (el) el.textContent = text
}

function syncButtons() {
  const receive = document.querySelector('[data-bf-receive]')
  const dismiss = document.querySelector('[data-bf-dismiss]')
  if (receive instanceof HTMLButtonElement) receive.disabled = busy || arrived
  if (dismiss instanceof HTMLButtonElement) dismiss.disabled = busy || !arrived
}

function showCard(on) {
  const card = cardEl()
  if (!card) return
  card.hidden = !on
}

function announce() {
  setStatus('New record received. Specimen 043.')
}

/**
 * Play the butterfly arrival once.
 * @returns {Promise<void>}
 */
export function receiveButterflyRecord() {
  const root = rootEl()
  if (!root || busy || arrived) return Promise.resolve()

  busy = true
  syncButtons()
  clearTimers()
  clearPhases(root)
  showCard(false)
  setStatus('')
  root.setAttribute('data-state', 'arriving')

  if (prefersReducedMotion()) {
    root.classList.add('butterfly-entry--reduced', 'butterfly-entry--settled')
    showCard(true)
    announce()
    arrived = true
    busy = false
    root.setAttribute('data-state', 'settled')
    syncButtons()
    return Promise.resolve()
  }

  void root.offsetWidth
  root.classList.add('butterfly-entry--arrive')

  return new Promise((resolve) => {
    later(ORBIT_AT, () => {
      root.classList.add('butterfly-entry--orbit')
    })

    later(CONVERGE_AT, () => {
      root.classList.remove('butterfly-entry--arrive', 'butterfly-entry--orbit')
      root.classList.add('butterfly-entry--converge')
    })

    later(CONSTRUCT_AT, () => {
      root.classList.remove('butterfly-entry--converge')
      root.classList.add('butterfly-entry--construct')
      showCard(true)
      announce()
    })

    later(SETTLE_AT, () => {
      clearPhases(root)
      root.classList.add('butterfly-entry--settled')
      arrived = true
      busy = false
      root.setAttribute('data-state', 'settled')
      syncButtons()
      resolve()
    })
  })
}

/** Immediate dismiss — no reverse butterfly choreography. */
export function dismissButterflyRecord() {
  const root = rootEl()
  if (!root || busy || !arrived) return

  clearTimers()
  busy = false
  arrived = false
  clearPhases(root)
  showCard(false)
  setStatus('')
  root.setAttribute('data-state', 'idle')
  syncButtons()
}

/** @returns {Promise<void>} */
export async function replayButterflyEntry() {
  if (busy) return
  if (arrived) dismissButterflyRecord()
  await receiveButterflyRecord()
}

function bindUi() {
  document.querySelector('[data-bf-receive]')?.addEventListener('click', () => {
    void receiveButterflyRecord()
  })
  document.querySelector('[data-bf-dismiss]')?.addEventListener('click', () => {
    dismissButterflyRecord()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayButterflyEntry()
  })

  syncButtons()
}

bindUi()
