/**
 * Rank Up Impact — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 */

const ANTICIPATE_MS = 180
const REJECT_MS = 240 // 180–420
const RINGS_AT = 350
const IMPACT_AT = 520
const RANKUP_AT = 760
const ABILITY_AT = 980
const SETTLE_AT = 1300
const TOTAL_MS = 1550

const PHASES = [
  'rui--anticipate',
  'rui--reject',
  'rui--rings',
  'rui--impact',
  'rui--rankup',
  'rui--ability',
  'rui--settle',
  'rui--settled',
  'rui--reduced',
  'rui--busy',
]

let busy = false
let settled = false
let announced = false
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-rank-up]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  timers.push(window.setTimeout(fn, ms))
}

function clearPhases(root) {
  root.classList.remove(...PHASES)
}

function show(el, visible) {
  if (!el) return
  if (visible) el.removeAttribute('hidden')
  else el.setAttribute('hidden', '')
}

function setStatus(root, text) {
  const status = root.querySelector('[data-rank-up-status]')
  if (!status) return
  status.textContent = ''
  void status.offsetWidth
  status.textContent = text
}

function announce(root) {
  if (announced) return
  setStatus(root, 'Rank increased to 5. Advanced Filters unlocked.')
  announced = true
}

/**
 * Run the rank-up celebration sequence.
 * @returns {Promise<void>}
 */
export function runRankUp() {
  const root = rootEl()
  if (!root || busy || settled) return Promise.resolve()

  busy = true
  announced = false
  clearTimers()
  clearPhases(root)

  const fx = root.querySelector('[data-rank-up-fx]')
  const result = root.querySelector('[data-rank-up-result]')
  const idle = root.querySelector('[data-rank-up-idle]')

  show(result, false)
  setStatus(root, '')
  root.classList.add('rui--busy')
  void root.offsetWidth

  if (prefersReducedMotion()) {
    show(fx, false)
    if (idle) idle.style.visibility = 'hidden'
    show(result, true)
    root.classList.add('rui--reduced', 'rui--settled')
    settled = true
    busy = false
    announce(root)
    return Promise.resolve()
  }

  show(fx, true)
  root.classList.add('rui--anticipate')

  return new Promise((resolve) => {
    later(ANTICIPATE_MS, () => {
      if (idle) idle.style.visibility = 'hidden'
      root.classList.add('rui--reject')
    })

    later(RINGS_AT, () => {
      root.classList.add('rui--rings')
    })

    later(IMPACT_AT, () => {
      root.classList.add('rui--impact')
    })

    later(RANKUP_AT, () => {
      root.classList.add('rui--rankup')
    })

    later(ABILITY_AT, () => {
      root.classList.add('rui--ability')
    })

    later(SETTLE_AT, () => {
      root.classList.add('rui--settle')
    })

    later(TOTAL_MS, () => {
      show(fx, false)
      show(result, true)
      root.classList.remove(
        'rui--anticipate',
        'rui--reject',
        'rui--rings',
        'rui--impact',
        'rui--rankup',
        'rui--ability',
        'rui--settle',
      )
      root.classList.add('rui--settled')
      settled = true
      busy = false
      announce(root)
      resolve()
    })
  })
}

/**
 * Restore rank 04 idle card.
 * @returns {Promise<void>}
 */
export function resetRankUp() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()

  clearTimers()
  clearPhases(root)
  settled = false
  announced = false
  busy = false

  const fx = root.querySelector('[data-rank-up-fx]')
  const result = root.querySelector('[data-rank-up-result]')
  const idle = root.querySelector('[data-rank-up-idle]')

  show(fx, false)
  show(result, false)
  if (idle) idle.style.visibility = ''
  setStatus(root, '')
  void root.offsetWidth
  return Promise.resolve()
}

/**
 * Reset then run again — deterministic, no DOM accumulation.
 * @returns {Promise<void>}
 */
export async function replayRankUp() {
  if (busy) return
  await resetRankUp()
  await runRankUp()
}

function bindUi() {
  const root = rootEl()
  root?.querySelector('[data-rank-up-trigger]')?.addEventListener('click', () => {
    void runRankUp()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayRankUp()
  })
}

bindUi()
