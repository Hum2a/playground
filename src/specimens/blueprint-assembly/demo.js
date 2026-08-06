/**
 * Blueprint Assembly — exploded parts converge into finished device.
 */

const ASSEMBLE_MS = 660
const SETTLE_MS = 1310

let busy = false
let settled = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function root() {
  return document.querySelector('[data-blueprint-assembly]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  timers.push(window.setTimeout(fn, ms))
}

function setStatus(text) {
  const el = root()?.querySelector('[data-bpa-status]')
  if (!el) return
  el.textContent = ''
  void el.offsetWidth
  el.textContent = text
}

export function runBlueprintAssembly() {
  const el = root()
  if (!el || busy || settled) return Promise.resolve()

  busy = true
  clearTimers()
  const trigger = el.querySelector('[data-bpa-trigger]')
  const device = el.querySelector('[data-bpa-device]')
  if (trigger) trigger.disabled = true

  el.classList.add('bpa--assemble')

  const deviceDelay = prefersReducedMotion() ? 0 : ASSEMBLE_MS - 100
  const settleDelay = prefersReducedMotion() ? 0 : SETTLE_MS

  return new Promise((resolve) => {
    later(deviceDelay, () => {
      if (device) device.removeAttribute('hidden')
      el.classList.add('bpa--settled')
      setStatus('Capture Rig assembled and ready.')
    })
    later(settleDelay, () => {
      settled = true
      busy = false
      resolve()
    })
  })
}

export function resetBlueprintAssembly() {
  const el = root()
  if (!el || busy) return Promise.resolve()

  clearTimers()
  settled = false
  busy = false
  el.classList.remove('bpa--assemble', 'bpa--settled')

  const trigger = el.querySelector('[data-bpa-trigger]')
  const device = el.querySelector('[data-bpa-device]')
  if (trigger) trigger.disabled = false
  if (device) device.setAttribute('hidden', '')

  setStatus('')
  void el.offsetWidth
  return Promise.resolve()
}

export async function replayBlueprintAssembly() {
  if (busy) return
  await resetBlueprintAssembly()
  await runBlueprintAssembly()
}

function bindUi() {
  root()?.querySelector('[data-bpa-trigger]')?.addEventListener('click', () => {
    void runBlueprintAssembly()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      void replayBlueprintAssembly()
    }
  })
}

bindUi()
