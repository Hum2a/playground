/**
 * Connection Severed — tiny portable unlink API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 */

const TENSION_MS = 180
const SNAP_MS = 80
const RECOIL_START_MS = 240
const RECOIL_END_MS = 480
const RECONNECT_MS = 220

const PHASES = [
  'connection-severed--tension',
  'connection-severed--snap',
  'connection-severed--recoil',
  'connection-severed--severed',
  'connection-severed--reconnect',
  'connection-severed--reduced',
]

let busy = false
let linked = true
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-connection-severed]')
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
  const el = document.querySelector('[data-cs-status]')
  if (el) el.textContent = text
}

function setUnlinkedLabels(on) {
  document.querySelectorAll('[data-cs-unlinked]').forEach((el) => {
    el.setAttribute('aria-hidden', on ? 'false' : 'true')
  })
}

function setLinkedState(on) {
  linked = on
  const root = rootEl()
  if (!root) return
  root.setAttribute('data-state', on ? 'linked' : 'severed')
  const disconnect = document.querySelector('[data-cs-disconnect]')
  const reconnect = document.querySelector('[data-cs-reconnect]')
  if (disconnect instanceof HTMLButtonElement) disconnect.disabled = !on || busy
  if (reconnect instanceof HTMLButtonElement) reconnect.disabled = on || busy
}

function syncButtons() {
  const disconnect = document.querySelector('[data-cs-disconnect]')
  const reconnect = document.querySelector('[data-cs-reconnect]')
  if (disconnect instanceof HTMLButtonElement) {
    disconnect.disabled = !linked || busy
  }
  if (reconnect instanceof HTMLButtonElement) {
    reconnect.disabled = linked || busy
  }
}

/**
 * Play the disconnect sequence once.
 * @returns {Promise<void>}
 */
export function severConnection() {
  const root = rootEl()
  if (!root || busy || !linked) return Promise.resolve()

  busy = true
  syncButtons()
  clearTimers()
  clearPhases(root)

  if (prefersReducedMotion()) {
    root.classList.add('connection-severed--reduced', 'connection-severed--severed')
    setUnlinkedLabels(true)
    setStatus('Archive disconnected from Portfolio.')
    setLinkedState(false)
    busy = false
    syncButtons()
    return Promise.resolve()
  }

  root.classList.add('connection-severed--tension')

  return new Promise((resolve) => {
    later(TENSION_MS, () => {
      root.classList.remove('connection-severed--tension')
      root.classList.add('connection-severed--snap')
    })

    later(RECOIL_START_MS, () => {
      root.classList.add('connection-severed--recoil')
    })

    later(RECOIL_END_MS, () => {
      clearPhases(root)
      root.classList.add('connection-severed--severed')
      setUnlinkedLabels(true)
      setStatus('Archive disconnected from Portfolio.')
      setLinkedState(false)
      busy = false
      syncButtons()
      resolve()
    })
  })
}

/**
 * Restore the tether for demo replay.
 * @returns {Promise<void>}
 */
export function reconnectConnection() {
  const root = rootEl()
  if (!root || busy || linked) return Promise.resolve()

  busy = true
  syncButtons()
  clearTimers()
  clearPhases(root)
  setUnlinkedLabels(false)

  if (prefersReducedMotion()) {
    root.classList.remove('connection-severed--severed')
    setStatus('Archive connected to Portfolio.')
    setLinkedState(true)
    busy = false
    syncButtons()
    return Promise.resolve()
  }

  root.classList.add('connection-severed--reconnect')

  return new Promise((resolve) => {
    later(RECONNECT_MS, () => {
      clearPhases(root)
      setStatus('Archive connected to Portfolio.')
      setLinkedState(true)
      busy = false
      syncButtons()
      resolve()
    })
  })
}

/** @returns {Promise<void>} */
export async function replayConnectionSevered() {
  if (busy) return
  if (!linked) await reconnectConnection()
  await severConnection()
}

function bindUi() {
  document.querySelectorAll('[data-cs-disconnect]').forEach((btn) => {
    btn.addEventListener('click', () => {
      void severConnection()
    })
  })
  document.querySelectorAll('[data-cs-reconnect]').forEach((btn) => {
    btn.addEventListener('click', () => {
      void reconnectConnection()
    })
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayConnectionSevered()
  })

  syncButtons()
}

bindUi()
