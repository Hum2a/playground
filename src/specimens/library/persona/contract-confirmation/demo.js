/**
 * Contract Confirmation — assemble then seal stamp.
 * iframe-safe; no storage / parent / network.
 */

const ASSEMBLE_MS = 500
const SIGNED_MS = 1000

let busy = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-ccn]')
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
  const el = document.querySelector('[data-ccn-live]')
  if (el) el.textContent = text
}

export function resetContractConfirmation() {
  clearTimers()
  busy = false
  const root = rootEl()
  if (root) root.setAttribute('data-phase', 'idle')
  setLive('Contract pending.')
}

export function runContractConfirmation() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()

  busy = true
  clearTimers()
  root.setAttribute('data-phase', 'idle')
  void root.offsetWidth

  if (prefersReducedMotion()) {
    root.setAttribute('data-phase', 'signed')
    setLive('Contract signed and sealed.')
    busy = false
    return Promise.resolve()
  }

  root.setAttribute('data-phase', 'assemble')
  setLive('Assembling agreement.')

  return new Promise((resolve) => {
    later(ASSEMBLE_MS, () => {
      root.setAttribute('data-phase', 'seal')
      setLive('Applying seal…')
      later(SIGNED_MS - ASSEMBLE_MS, () => {
        root.setAttribute('data-phase', 'signed')
        setLive('Contract signed and sealed.')
        busy = false
        resolve()
      })
    })
  })
}

function bindUi() {
  document.querySelector('[data-ccn-sign]')?.addEventListener('click', () => {
    void runContractConfirmation()
  })
  document.querySelector('[data-ccn-reset]')?.addEventListener('click', resetContractConfirmation)
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetContractConfirmation()
  })
}

bindUi()
resetContractConfirmation()
