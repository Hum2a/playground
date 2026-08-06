/**
 * Blackout Loader — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 */

const COVER_MS = 520
const WARN_AT_MS = 1650
const REVEAL_AT_MS = 1800
const REVEAL_MS = 420
const TOTAL_MS = REVEAL_AT_MS + REVEAL_MS

const PHASES = [
  'bol--consume',
  'bol--covered',
  'bol--loading',
  'bol--warn',
  'bol--reveal',
  'bol--settled',
  'bol--busy',
]

let busy = false
let settled = false
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-blackout-loader]')
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
  const status = root.querySelector('[data-bol-status]')
  if (!status) return
  status.textContent = ''
  void status.offsetWidth
  status.textContent = text
}

function setBusy(root, on) {
  const surface = root.querySelector('[data-bol-surface]')
  if (surface) surface.setAttribute('aria-busy', on ? 'true' : 'false')
}

function setCount(root, text) {
  const count = root.querySelector('[data-bol-count]')
  if (count) count.textContent = text
}

/**
 * Run blackout refresh: consume → load → warn → reveal.
 * @returns {Promise<void>}
 */
export function runBlackoutLoader() {
  const root = rootEl()
  if (!root || busy || settled) return Promise.resolve()

  busy = true
  clearTimers()
  clearPhases(root)
  root.classList.add('bol--busy')
  root.setAttribute('data-state', 'running')
  setBusy(root, true)
  setStatus(root, 'Refreshing archive index.')
  setCount(root, '24 specimens available')
  void root.offsetWidth

  if (prefersReducedMotion()) {
    root.classList.add('bol--covered', 'bol--loading')
    setCount(root, '30 specimens available')
    setStatus(root, 'Loading…')

    return new Promise((resolve) => {
      later(1800, () => {
        clearPhases(root)
        root.classList.add('bol--settled')
        root.setAttribute('data-state', 'settled')
        setBusy(root, false)
        settled = true
        busy = false
        setStatus(root, 'Archive index updated. 30 specimens available.')
        resolve()
      })
    })
  }

  root.classList.add('bol--consume')

  return new Promise((resolve) => {
    later(COVER_MS, () => {
      root.classList.remove('bol--consume')
      root.classList.add('bol--covered', 'bol--loading')
      setCount(root, '30 specimens available')
    })

    later(WARN_AT_MS, () => {
      root.classList.add('bol--warn')
    })

    later(REVEAL_AT_MS, () => {
      root.classList.remove('bol--covered', 'bol--loading', 'bol--warn')
      root.classList.add('bol--reveal')
    })

    later(TOTAL_MS, () => {
      root.classList.remove('bol--reveal', 'bol--busy')
      root.classList.add('bol--settled')
      root.setAttribute('data-state', 'settled')
      setBusy(root, false)
      settled = true
      busy = false
      setStatus(root, 'Archive index updated. 30 specimens available.')
      resolve()
    })
  })
}

/**
 * Restore initial 24-specimen idle state.
 * @returns {Promise<void>}
 */
export function resetBlackoutLoader() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()

  clearTimers()
  clearPhases(root)
  busy = false
  settled = false
  root.setAttribute('data-state', 'idle')
  setBusy(root, false)
  setCount(root, '24 specimens available')
  setStatus(root, '')
  void root.offsetWidth
  return Promise.resolve()
}

/**
 * Reset then run — harness restart.
 * @returns {Promise<void>}
 */
export async function replayBlackoutLoader() {
  if (busy) return
  await resetBlackoutLoader()
  await runBlackoutLoader()
}

function bindUi() {
  const root = rootEl()
  const trigger = root?.querySelector('[data-bol-trigger]')

  trigger?.addEventListener('click', () => {
    void runBlackoutLoader()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayBlackoutLoader()
  })
}

bindUi()
