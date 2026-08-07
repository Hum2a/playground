/**
 * Knockdown Chain — finite A→B→C knockdown with frozen stagger.
 * iframe-safe; no storage / parent / network.
 */

const STAGGER_MS = 220
const DOWN_MS = 220
const PULSE_MS = 660

let busy = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-kdc]')
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
  const el = document.querySelector('[data-kdc-live]')
  if (el) el.textContent = text
}

function setPhase(phase) {
  rootEl()?.setAttribute('data-phase', phase)
}

function setButtons(on) {
  document.querySelectorAll('[data-kdc-run], [data-kdc-reset]').forEach((btn) => {
    btn.disabled = !on
  })
}

function knockAll() {
  ;['a', 'b', 'c'].forEach((key) => {
    document.querySelector(`[data-kdc-target="${key}"]`)?.classList.add('is-down')
  })
  setPhase('done')
  setLive('Chain complete. A, B, C down.')
  busy = false
  setButtons(true)
  const run = document.querySelector('[data-kdc-run]')
  if (run) run.disabled = true
}

export function runKnockdownChain() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()
  if (root.getAttribute('data-phase') === 'done') return Promise.resolve()

  busy = true
  clearTimers()
  setButtons(false)
  ;['a', 'b', 'c'].forEach((key) => {
    document.querySelector(`[data-kdc-target="${key}"]`)?.classList.remove('is-down')
  })
  void root.offsetWidth

  if (prefersReducedMotion()) {
    knockAll()
    return Promise.resolve()
  }

  setPhase('chain')
  setLive('Knockdown chain running.')

  const keys = ['a', 'b', 'c']
  return new Promise((resolve) => {
    keys.forEach((key, i) => {
      later(i * STAGGER_MS, () => {
        document.querySelector(`[data-kdc-target="${key}"]`)?.classList.add('is-down')
        setLive(`Target ${key.toUpperCase()} down.`)
      })
    })

    later(STAGGER_MS * 2 + DOWN_MS, () => {
      setPhase('done')
      setLive('Chain complete. A, B, C down.')
      busy = false
      setButtons(true)
      const run = document.querySelector('[data-kdc-run]')
      if (run) run.disabled = true
      resolve()
    })
  })
}

export function resetKnockdownChain() {
  clearTimers()
  busy = false
  setPhase('idle')
  ;['a', 'b', 'c'].forEach((key) => {
    document.querySelector(`[data-kdc-target="${key}"]`)?.classList.remove('is-down')
  })
  setLive('Targets standing. Run chain.')
  setButtons(true)
  void PULSE_MS
}

function bindUi() {
  document.querySelector('[data-kdc-run]')?.addEventListener('click', () => {
    void runKnockdownChain()
  })
  document.querySelector('[data-kdc-reset]')?.addEventListener('click', resetKnockdownChain)
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetKnockdownChain()
  })
}

bindUi()
resetKnockdownChain()
