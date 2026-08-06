/**
 * Energy Transfer Sync — tiny portable sync API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 * One packet travels source → target; copy sync (source stays READY).
 */

const INIT_MS = 140
const TRAVEL_MS = 480
const ARRIVE_MS = 160
const SWAP_MS = 200
const ARRIVE_AT = INIT_MS + TRAVEL_MS // 620
const SETTLE_AT = ARRIVE_AT + ARRIVE_MS // 780
const SYNCED_AT = SETTLE_AT + SWAP_MS // 980

/** @type {number[]} */
let timers = []
let busy = false
let synced = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-energy-transfer]')
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
  const root = rootEl()
  if (root) root.setAttribute('data-phase', phase)
}

function setLive(text) {
  const el = document.querySelector('[data-ets-live]')
  if (el) el.textContent = text
}

function setSyncEnabled(on) {
  const btn = document.querySelector('[data-ets-sync]')
  if (btn) btn.disabled = !on
}

function applySyncedUi() {
  setPhase('synced')
  synced = true
  setLive('Playground synchronised to version 1.4.')
  setSyncEnabled(false)
}

export function resetEnergyTransfer() {
  clearTimers()
  busy = false
  synced = false
  setPhase('idle')
  setLive('Archive ready. Playground outdated.')
  setSyncEnabled(true)
}

/**
 * Run one source→target sync. Source remains READY (copy, not move).
 * @returns {Promise<void>}
 */
export function runEnergyTransfer() {
  const root = rootEl()
  if (!root || busy || synced) return Promise.resolve()

  busy = true
  clearTimers()
  setSyncEnabled(false)
  setPhase('idle')
  void root.offsetWidth

  if (prefersReducedMotion()) {
    applySyncedUi()
    busy = false
    return Promise.resolve()
  }

  setPhase('initiate')
  setLive('Synchronising.')

  return new Promise((resolve) => {
    later(INIT_MS, () => {
      setPhase('transfer')
    })

    later(ARRIVE_AT, () => {
      setPhase('arrive')
    })

    later(SETTLE_AT, () => {
      setPhase('settle')
    })

    later(SYNCED_AT, () => {
      applySyncedUi()
      busy = false
      resolve()
    })
  })
}

/** @returns {Promise<void>} */
export async function replayEnergyTransfer() {
  if (busy) return
  resetEnergyTransfer()
  void rootEl()?.offsetWidth
  await runEnergyTransfer()
}

function bindUi() {
  document.querySelectorAll('[data-ets-sync]').forEach((btn) => {
    btn.addEventListener('click', () => {
      void runEnergyTransfer()
    })
  })

  document.querySelectorAll('[data-ets-reset]').forEach((btn) => {
    btn.addEventListener('click', () => {
      resetEnergyTransfer()
    })
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayEnergyTransfer()
  })
}

bindUi()
resetEnergyTransfer()
