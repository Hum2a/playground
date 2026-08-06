/**
 * Cross-Out Status Swap — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 * Discrete status invalidation → authoritative replacement (not arbitrary values).
 */

const SECOND_AT_MS = 120
const REJECT_AT_MS = 220
const ATTACK_AT_MS = 300
const CURRENT_AT_MS = 500
const TOTAL_MS = 650

const PHASES = [
  'coss--slash',
  'coss--second',
  'coss--reject',
  'coss--attack',
  'coss--current',
  'coss--settled',
  'coss--busy',
]

let busy = false
let settled = false
let announced = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') ===
    'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-cross-out-status]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
}

function clearPhases(root) {
  root.classList.remove(...PHASES)
}

function setLive(root, text) {
  const live = root.querySelector('[data-coss-live]')
  if (!live) return
  live.textContent = ''
  void live.offsetWidth
  live.textContent = text
}

function announceOnce(root) {
  if (announced) return
  setLive(root, 'Export request status: approved.')
  announced = true
}

function setAria(root, settledNow) {
  const oldEl = root.querySelector('[data-coss-old]')
  const newEl = root.querySelector('[data-coss-new]')
  if (oldEl) oldEl.setAttribute('aria-hidden', settledNow ? 'true' : 'false')
  if (newEl) newEl.setAttribute('aria-hidden', settledNow ? 'false' : 'true')
}

function setTriggers(root, { advance, reset }) {
  const adv = root.querySelector('[data-coss-advance]')
  const rst = root.querySelector('[data-coss-reset]')
  if (adv) adv.disabled = !advance
  if (rst) rst.disabled = !reset
}

/**
 * Invalidate PENDING and install APPROVED as authoritative status.
 * @returns {Promise<void>}
 */
export function advanceCrossOutStatus() {
  const root = rootEl()
  if (!root || busy || settled) return Promise.resolve()

  busy = true
  announced = false
  clearTimers()
  clearPhases(root)
  root.classList.add('coss--busy')
  root.setAttribute('data-state', 'running')
  setLive(root, '')
  setTriggers(root, { advance: false, reset: false })
  void root.offsetWidth

  if (prefersReducedMotion()) {
    root.classList.add('coss--settled')
    root.setAttribute('data-state', 'settled')
    setAria(root, true)
    settled = true
    busy = false
    setTriggers(root, { advance: false, reset: true })
    announceOnce(root)
    return Promise.resolve()
  }

  root.classList.add('coss--slash')

  return new Promise((resolve) => {
    later(SECOND_AT_MS, () => {
      root.classList.add('coss--second')
    })

    later(REJECT_AT_MS, () => {
      root.classList.add('coss--reject')
    })

    later(ATTACK_AT_MS, () => {
      root.classList.add('coss--attack')
      setAria(root, true)
    })

    later(CURRENT_AT_MS, () => {
      root.classList.add('coss--current')
    })

    later(TOTAL_MS, () => {
      root.classList.remove(
        'coss--slash',
        'coss--second',
        'coss--reject',
        'coss--attack',
        'coss--current',
        'coss--busy',
      )
      root.classList.add('coss--settled')
      root.setAttribute('data-state', 'settled')
      settled = true
      busy = false
      setTriggers(root, { advance: false, reset: true })
      announceOnce(root)
      resolve()
    })
  })
}

/**
 * Restore PENDING idle — deterministic, no transform accumulation.
 * @returns {Promise<void>}
 */
export function resetCrossOutStatus() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()

  clearTimers()
  clearPhases(root)
  settled = false
  announced = false
  busy = false
  root.setAttribute('data-state', 'idle')
  setAria(root, false)
  setLive(root, '')
  setTriggers(root, { advance: true, reset: true })
  void root.offsetWidth
  return Promise.resolve()
}

/** @returns {Promise<void>} */
export async function replayCrossOutStatus() {
  if (busy) return
  await resetCrossOutStatus()
  await advanceCrossOutStatus()
}

function bindUi() {
  const root = rootEl()
  root?.querySelector('[data-coss-advance]')?.addEventListener('click', () => {
    void advanceCrossOutStatus()
  })
  root?.querySelector('[data-coss-reset]')?.addEventListener('click', () => {
    void resetCrossOutStatus()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayCrossOutStatus()
  })
}

bindUi()
{
  const root = rootEl()
  if (root) setTriggers(root, { advance: true, reset: true })
}
