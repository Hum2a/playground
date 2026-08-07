/**
 * Three-Person Cell Formation — freeze snap positions then draw links.
 * iframe-safe; no storage / parent / network.
 */

const SNAP_MS = 260
const LINK_MS = 180
const NODE_COUNT = 3
const FORMED = {
  lead: { top: '14%', left: '50%' },
  scout: { top: '78%', left: '24%' },
  support: { top: '78%', left: '76%' },
}
const TOTAL_MS = SNAP_MS + LINK_MS

let busy = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-tpcf]')
}

function nodes() {
  return Array.from(document.querySelectorAll('[data-tpcf-node]'))
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
  const el = document.querySelector('[data-tpcf-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-tpcf-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-tpcf-hint]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-tpcf-run], [data-tpcf-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showResolved() {
  rootEl()?.setAttribute('data-phase', 'done')
  nodes().forEach((node) => {
    node.setAttribute('data-pulse', 'true')
    later(LINK_MS, () => node.removeAttribute('data-pulse'))
  })
  setStatus('FORMED')
  setHint('Cell formed and linked.')
  setLive('Three-person cell formed at frozen triangle positions with links drawn.')
}

function resetVisual() {
  nodes().forEach((node) => node.removeAttribute('data-pulse'))
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('SCATTERED')
  setHint('Press Run to form the cell.')
  setLive('Cell scattered. Three profiles unformed.')
}

export function runThreePersonCellFormation() {
  const root = rootEl()
  if (!root || busy || root.getAttribute('data-phase') === 'done') {
    return Promise.resolve()
  }

  busy = true
  clearTimers()
  resetVisual()
  setButtons(false)
  void root.offsetWidth

  if (prefersReducedMotion()) {
    showResolved()
    busy = false
    setButtons(true)
    return Promise.resolve()
  }

  root.setAttribute('data-phase', 'active')
  setStatus('FORMING')
  setLive('Profiles snapping into frozen triangle positions.')

  return new Promise((resolve) => {
    later(SNAP_MS, () => {
      root.setAttribute('data-phase', 'linking')
      setStatus('LINKING')
      setLive('Drawing cell links.')
      later(LINK_MS, () => {
        showResolved()
        busy = false
        setButtons(true)
        resolve()
      })
    })
  })
}

export function resetThreePersonCellFormation() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

export async function replayThreePersonCellFormation() {
  if (busy) return
  resetThreePersonCellFormation()
  void rootEl()?.offsetWidth
  await runThreePersonCellFormation()
}

function bindUi() {
  document.querySelector('[data-tpcf-run]')?.addEventListener('click', () => {
    void runThreePersonCellFormation()
  })
  document.querySelector('[data-tpcf-replay]')?.addEventListener('click', () => {
    void replayThreePersonCellFormation()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayThreePersonCellFormation()
  })
}

void TOTAL_MS
void NODE_COUNT
void FORMED
bindUi()
resetThreePersonCellFormation()
