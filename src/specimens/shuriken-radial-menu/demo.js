/**
 * Shuriken Radial Menu — abstract four-point glyph rotates open into four
 * radial action sectors.
 * iframe-safe; no storage / parent / network.
 */

const OPEN_MS = 260
const SETTLE_MS = 40
const TOTAL_MS = OPEN_MS + SETTLE_MS

let busy = false
let open = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-srm]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
  return id
}

function setLive(text) {
  const el = document.querySelector('[data-srm-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-srm-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-srm-hint]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-srm-run], [data-srm-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function sectors() {
  return Array.from(document.querySelectorAll('[data-srm-sector]'))
}

function setSectorsReachable(reachable) {
  sectors().forEach((sector) => {
    sector.tabIndex = reachable ? 0 : -1
  })
  const host = document.querySelector('[data-srm-sectors]')
  if (host) host.setAttribute('aria-hidden', reachable ? 'false' : 'true')
}

function setHubLabel(text) {
  const hub = document.querySelector('[data-srm-hub]')
  if (hub) hub.setAttribute('aria-label', text)
}

function showOpen() {
  open = true
  rootEl()?.setAttribute('data-phase', 'open')
  setSectorsReachable(true)
  setHubLabel('Close action menu')
  setStatus('OPEN')
  setHint('Four actions available.')
  setLive('Menu open. Four actions available.')
}

function resetVisual() {
  open = false
  rootEl()?.setAttribute('data-phase', 'closed')
  setSectorsReachable(false)
  setHubLabel('Open action menu')
  setStatus('CLOSED')
  setHint('Press Run to open the radial menu.')
  setLive('Menu closed.')
}

/**
 * Auto-run full rotate → radial-open choreography.
 * @returns {Promise<void>}
 */
export function runShurikenRadialMenu() {
  const root = rootEl()
  if (!root || busy || open) return Promise.resolve()

  busy = true
  clearTimers()
  setButtons(false)
  void root.offsetWidth

  if (prefersReducedMotion()) {
    showOpen()
    busy = false
    setButtons(true)
    return Promise.resolve()
  }

  root.setAttribute('data-phase', 'opening')
  setStatus('OPENING')
  setHint('Rotating open.')
  setLive('Menu opening.')

  return new Promise((resolve) => {
    later(TOTAL_MS, () => {
      showOpen()
      busy = false
      setButtons(true)
      resolve()
    })
  })
}

export function resetShurikenRadialMenu() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayShurikenRadialMenu() {
  if (busy) return
  resetShurikenRadialMenu()
  void rootEl()?.offsetWidth
  await runShurikenRadialMenu()
}

function bindUi() {
  document.querySelector('[data-srm-run]')?.addEventListener('click', () => {
    void runShurikenRadialMenu()
  })
  document.querySelector('[data-srm-replay]')?.addEventListener('click', () => {
    void replayShurikenRadialMenu()
  })
  document.querySelector('[data-srm-hub]')?.addEventListener('click', () => {
    if (busy) return
    if (open) resetShurikenRadialMenu()
    else void runShurikenRadialMenu()
  })
  sectors().forEach((sector, i) => {
    sector.addEventListener('click', () => {
      if (busy || !open) return
      setLive(`Action ${i + 1} selected. Menu closing.`)
      resetShurikenRadialMenu()
    })
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayShurikenRadialMenu()
  })
}

bindUi()
resetShurikenRadialMenu()
