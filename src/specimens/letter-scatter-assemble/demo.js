/**
 * Letter Scatter Assemble — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 */

/** Finale letter delay + duration (456 + 520), then brief recoil. */
const FINALE_LAND_MS = 976
const RECOIL_MS = 90
const SHARD_AT_MS = 520
const SHARD_MS = 120
const TOTAL_MS = FINALE_LAND_MS + RECOIL_MS

const PHASES = [
  'lsa--assemble',
  'lsa--shards',
  'lsa--recoil',
  'lsa--settled',
  'lsa--reduced',
  'lsa--busy',
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
  return document.querySelector('[data-letter-scatter]')
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

function setStatus(root, text) {
  const status = root.querySelector('[data-letter-scatter-status]')
  if (!status) return
  status.textContent = ''
  void status.offsetWidth
  status.textContent = text
}

function announce(root) {
  if (announced) return
  setStatus(root, 'New material available')
  announced = true
}

/**
 * Scatter → assemble the headline.
 * @returns {Promise<void>}
 */
export function assembleLetterScatter() {
  const root = rootEl()
  if (!root || busy || settled) return Promise.resolve()

  busy = true
  announced = false
  clearTimers()
  clearPhases(root)
  root.classList.add('lsa--busy')
  setStatus(root, '')
  void root.offsetWidth

  if (prefersReducedMotion()) {
    root.classList.add('lsa--reduced', 'lsa--settled')
    settled = true
    busy = false
    announce(root)
    return Promise.resolve()
  }

  root.classList.add('lsa--assemble')

  return new Promise((resolve) => {
    later(SHARD_AT_MS, () => {
      root.classList.add('lsa--shards')
    })

    later(SHARD_AT_MS + SHARD_MS, () => {
      root.classList.remove('lsa--shards')
    })

    later(FINALE_LAND_MS, () => {
      root.classList.add('lsa--recoil')
    })

    later(TOTAL_MS, () => {
      root.classList.remove('lsa--assemble', 'lsa--shards', 'lsa--recoil')
      root.classList.add('lsa--settled')
      settled = true
      busy = false
      announce(root)
      resolve()
    })
  })
}

/**
 * Restore quiet host / identical scatter origins.
 * @returns {Promise<void>}
 */
export function resetLetterScatter() {
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
 * Reset then assemble — deterministic, no DOM accumulation.
 * @returns {Promise<void>}
 */
export async function replayLetterScatter() {
  if (busy) return
  await resetLetterScatter()
  await assembleLetterScatter()
}

function bindUi() {
  const root = rootEl()
  const trigger = root?.querySelector('[data-letter-scatter-trigger]')

  trigger?.addEventListener('click', () => {
    void assembleLetterScatter()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayLetterScatter()
  })

  if (root && prefersReducedMotion()) {
    root.classList.add('lsa--reduced', 'lsa--settled')
    settled = true
    announce(root)
  }
}

bindUi()
