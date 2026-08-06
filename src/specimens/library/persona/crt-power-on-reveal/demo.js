/**
 * CRT Power-On Reveal — dead screen → line → bloom → UI resolve.
 * iframe-safe; no storage / parent / network.
 */

const LINE_MS = 180
const EXPAND_MS = 320
const BLOOM_MS = 280
const RESOLVE_MS = 360

let busy = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-cpo]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
}

function setPhase(phase) {
  rootEl()?.setAttribute('data-phase', phase)
}

function setLive(text) {
  const el = document.querySelector('[data-cpo-live]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-cpo-run], [data-cpo-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showUi() {
  setPhase('done')
  setLive('Signal ready. Channel interface online.')
}

function resetVisual() {
  setPhase('off')
  setLive('Screen off.')
}

export function runCrtPowerOn() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()

  busy = true
  clearTimers()
  resetVisual()
  setButtons(false)
  void root.offsetWidth

  if (prefersReducedMotion()) {
    showUi()
    busy = false
    setButtons(true)
    return Promise.resolve()
  }

  setPhase('line')
  setLive('Bright line.')

  return new Promise((resolve) => {
    later(LINE_MS, () => {
      setPhase('expand')
      setLive('Expanding.')

      later(EXPAND_MS, () => {
        setPhase('bloom')
        setLive('Bloom.')

        later(BLOOM_MS, () => {
          setPhase('resolve')
          setLive('Resolving UI.')

          later(RESOLVE_MS, () => {
            showUi()
            busy = false
            setButtons(true)
            resolve()
          })
        })
      })
    })
  })
}

export function resetCrtPowerOn() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
}

export async function replayCrtPowerOn() {
  if (busy) return
  resetCrtPowerOn()
  void rootEl()?.offsetWidth
  await runCrtPowerOn()
}

function bindUi() {
  document.querySelector('[data-cpo-run]')?.addEventListener('click', () => {
    void runCrtPowerOn()
  })
  document.querySelector('[data-cpo-replay]')?.addEventListener('click', () => {
    void replayCrtPowerOn()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayCrtPowerOn()
  })
}

bindUi()
resetCrtPowerOn()
