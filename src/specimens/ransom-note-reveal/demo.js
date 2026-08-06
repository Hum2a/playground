/**
 * Ransom Note Reveal — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 */

const TOTAL_MS = 850
const ARRIVED_SETTLE_MS = 390 + 320 // delay + duration
const IMPACT_MS = 60

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
  return document.querySelector('[data-ransom-note]')
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
  root.classList.remove(
    'rnr--reveal',
    'rnr--impact',
    'rnr--settled',
    'rnr--reduced',
    'rnr--busy',
  )
}

function setStatus(root, text) {
  const status = root.querySelector('[data-ransom-note-status]')
  if (!status) return
  status.textContent = ''
  void status.offsetWidth
  status.textContent = text
}

function announce(root) {
  if (announced) return
  setStatus(root, 'New material has arrived.')
  announced = true
}

/**
 * Assemble the ransom-note collage.
 * @returns {Promise<void>}
 */
export function revealRansomNote() {
  const root = rootEl()
  if (!root || busy || settled) return Promise.resolve()

  busy = true
  announced = false
  clearTimers()
  clearPhases(root)
  root.classList.add('rnr--busy')
  setStatus(root, '')
  void root.offsetWidth

  if (prefersReducedMotion()) {
    root.classList.add('rnr--reduced', 'rnr--settled')
    settled = true
    busy = false
    announce(root)
    return Promise.resolve()
  }

  root.classList.add('rnr--reveal')

  return new Promise((resolve) => {
    later(ARRIVED_SETTLE_MS, () => {
      root.classList.add('rnr--impact')
    })

    later(ARRIVED_SETTLE_MS + IMPACT_MS, () => {
      root.classList.remove('rnr--impact')
    })

    later(TOTAL_MS, () => {
      root.classList.remove('rnr--reveal', 'rnr--impact')
      root.classList.add('rnr--settled')
      settled = true
      busy = false
      announce(root)
      resolve()
    })
  })
}

/**
 * Hide scraps and restore the quiet host / trigger.
 * @returns {Promise<void>}
 */
export function resetRansomNote() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()

  clearTimers()
  clearPhases(root)
  settled = false
  announced = false
  busy = false
  setStatus(root, '')
  void root.offsetWidth
  return Promise.resolve()
}

/**
 * Reset then reveal — deterministic, no DOM accumulation.
 * @returns {Promise<void>}
 */
export async function replayRansomNote() {
  if (busy) return
  await resetRansomNote()
  await revealRansomNote()
}

function bindUi() {
  const root = rootEl()
  const trigger = root?.querySelector('[data-ransom-note-trigger]')

  trigger?.addEventListener('click', () => {
    void revealRansomNote()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayRansomNote()
  })
}

bindUi()
