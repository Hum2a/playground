/**
 * High-Speed Card Relocation — a card leaves exactly two fading afterimages
 * as it relocates at speed from slot A into slot B.
 * iframe-safe; no storage / parent / network.
 */

const TRAVEL_MS = 200
const GHOSTS = [
  { left: '0%', spawnAt: 0, lifeMs: 220 },
  { left: '25%', spawnAt: 60, lifeMs: 150 },
]
const SETTLE_MS = 40
const TOTAL_MS = TRAVEL_MS + SETTLE_MS

let busy = false
let arrived = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-hcr]')
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
  const el = document.querySelector('[data-hcr-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-hcr-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-hcr-hint]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-hcr-run], [data-hcr-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function ghostHost() {
  return document.querySelector('[data-hcr-ghosts]')
}

function clearGhosts() {
  const host = ghostHost()
  if (host) host.replaceChildren()
}

function spawnGhost(left, lifeMs) {
  const host = ghostHost()
  if (!host) return
  const ghost = document.createElement('span')
  ghost.className = 'hcr__ghost'
  ghost.style.left = left
  ghost.style.setProperty('--hcr-ghost-ms', `${lifeMs}ms`)
  host.appendChild(ghost)
  void ghost.offsetWidth
  ghost.classList.add('is-alive')
  later(lifeMs, () => {
    ghost.classList.add('is-fading')
    later(30, () => ghost.remove())
  })
}

function showArrived() {
  arrived = true
  rootEl()?.setAttribute('data-phase', 'arrived')
  document
    .querySelector('[data-hcr-slot-a]')
    ?.setAttribute('aria-label', 'Slot A empty')
  document
    .querySelector('[data-hcr-slot-b]')
    ?.setAttribute('aria-label', 'Slot B occupied')
  setStatus('SLOT B')
  setHint('Card relocated.')
  setLive('Card relocated to slot B. Slot A empty.')
}

function resetVisual() {
  arrived = false
  clearTimers()
  clearGhosts()
  rootEl()?.setAttribute('data-phase', 'idle')
  document
    .querySelector('[data-hcr-slot-a]')
    ?.setAttribute('aria-label', 'Slot A occupied')
  document
    .querySelector('[data-hcr-slot-b]')
    ?.setAttribute('aria-label', 'Slot B empty')
  setStatus('SLOT A')
  setHint('Press Run to relocate at speed.')
  setLive('Idle. Card resting in slot A.')
}

/**
 * Auto-run full high-speed relocation choreography.
 * @returns {Promise<void>}
 */
export function runHighSpeedCardRelocation() {
  const root = rootEl()
  if (!root || busy || arrived) return Promise.resolve()

  busy = true
  clearTimers()
  clearGhosts()
  root.setAttribute('data-phase', 'idle')
  setButtons(false)
  void root.offsetWidth

  if (prefersReducedMotion()) {
    showArrived()
    busy = false
    setButtons(true)
    return Promise.resolve()
  }

  root.setAttribute('data-phase', 'travelling')
  setStatus('TRAVELLING')
  setHint('Card relocating at speed.')
  setLive('Card relocating at speed.')

  GHOSTS.forEach((g) => {
    later(g.spawnAt, () => spawnGhost(g.left, g.lifeMs))
  })

  return new Promise((resolve) => {
    later(TRAVEL_MS, () => {
      showArrived()
    })
    later(TOTAL_MS, () => {
      busy = false
      setButtons(true)
      resolve()
    })
  })
}

export function resetHighSpeedCardRelocation() {
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayHighSpeedCardRelocation() {
  if (busy) return
  resetHighSpeedCardRelocation()
  void rootEl()?.offsetWidth
  await runHighSpeedCardRelocation()
}

function bindUi() {
  document.querySelector('[data-hcr-run]')?.addEventListener('click', () => {
    void runHighSpeedCardRelocation()
  })
  document.querySelector('[data-hcr-replay]')?.addEventListener('click', () => {
    void replayHighSpeedCardRelocation()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayHighSpeedCardRelocation()
  })
}

bindUi()
resetHighSpeedCardRelocation()
