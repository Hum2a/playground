/**
 * Weakness Discovered — finite strike reveals permanent WEAK state.
 * iframe-safe; no storage / parent / network.
 */

const HIT_MS = 420
const REVEAL_MS = 280

let busy = false
let done = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-wkd]')
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
  const el = document.querySelector('[data-wkd-live]')
  if (el) el.textContent = text
}

function setPhase(phase) {
  rootEl()?.setAttribute('data-phase', phase)
}

function revealWeak() {
  const trait = document.querySelector('[data-wkd-trait]')
  const enemy = document.querySelector('[data-wkd-enemy]')
  if (trait) {
    trait.textContent = 'WEAK'
    trait.classList.add('is-weak')
  }
  enemy?.classList.remove('is-hit')
  setPhase('weak')
  setLive('Weakness discovered. WEAK locked.')
  done = true
  busy = false
  const strike = document.querySelector('[data-wkd-strike]')
  if (strike) strike.disabled = true
}

export function runWeaknessDiscovered() {
  if (busy || done) return Promise.resolve()
  const enemy = document.querySelector('[data-wkd-enemy]')
  if (!enemy) return Promise.resolve()

  busy = true
  clearTimers()
  setLive('Striking target.')

  if (prefersReducedMotion()) {
    revealWeak()
    return Promise.resolve()
  }

  setPhase('hit')
  enemy.classList.remove('is-hit')
  void enemy.offsetWidth
  enemy.classList.add('is-hit')

  return new Promise((resolve) => {
    later(HIT_MS, () => {
      revealWeak()
      resolve()
    })
  })
}

export function resetWeaknessDiscovered() {
  clearTimers()
  busy = false
  done = false
  setPhase('idle')
  const trait = document.querySelector('[data-wkd-trait]')
  if (trait) {
    trait.textContent = '???'
    trait.classList.remove('is-weak')
  }
  document.querySelector('[data-wkd-enemy]')?.classList.remove('is-hit')
  const strike = document.querySelector('[data-wkd-strike]')
  if (strike) strike.disabled = false
  setLive('Target affinity unknown.')
  void REVEAL_MS
}

function bindUi() {
  document.querySelector('[data-wkd-strike]')?.addEventListener('click', () => {
    void runWeaknessDiscovered()
  })
  document
    .querySelector('[data-wkd-reset]')
    ?.addEventListener('click', resetWeaknessDiscovered)
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetWeaknessDiscovered()
  })
}

bindUi()
resetWeaknessDiscovered()
