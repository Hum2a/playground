/**
 * Afterimage Navigation — tiny portable rapid-nav API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 *
 * Marker: HOME → SEARCH → BUILD → REVIEW → SHIP
 * Segment ms: 90 / 70 / 65 / 80
 * Afterimage lifetimes from leave: HOME 420 · SEARCH 330 · BUILD 240 · REVIEW 150
 * Exactly 4 afterimages; ticks remain as path evidence.
 */

/** @type {{ id: string, label: string, x: string, y: string, leaveMs: number, ghostMs: number }[]} */
const DESTINATIONS = [
  { id: 'home', label: 'HOME', x: '6%', y: '52%', leaveMs: 0, ghostMs: 420 },
  { id: 'search', label: 'SEARCH', x: '26%', y: '46%', leaveMs: 90, ghostMs: 330 },
  { id: 'build', label: 'BUILD', x: '48%', y: '54%', leaveMs: 160, ghostMs: 240 },
  { id: 'review', label: 'REVIEW', x: '70%', y: '48%', leaveMs: 225, ghostMs: 150 },
  { id: 'ship', label: 'SHIP', x: '90%', y: '52%', leaveMs: 305, ghostMs: 0 },
]

const SEGMENT_MS = [90, 70, 65, 80]
const ARRIVAL_MS = 305
const CLEANUP_MS = ARRIVAL_MS + 420 + 40

/** @type {number[]} */
let timers = []
let busy = false
/** @type {'home' | 'search' | 'build' | 'review' | 'ship'} */
let at = 'home'

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') ===
    'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-afterimage-nav]')
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

function setStatus(text) {
  const el = document.querySelector('[data-ain-status]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-ain-jump], [data-ain-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function clearGhosts() {
  const host = document.querySelector('[data-ain-ghosts]')
  if (host) host.replaceChildren()
}

function clearTicks() {
  document.querySelectorAll('[data-ain-tick]').forEach((tick) => {
    tick.classList.remove('is-on')
  })
}

function setTick(id) {
  document.querySelector(`[data-ain-tick="${id}"]`)?.classList.add('is-on')
}

/**
 * @param {string} id
 * @param {{ locked?: boolean }} [opts]
 */
function placeMarker(id, opts = {}) {
  const dest = DESTINATIONS.find((d) => d.id === id)
  const marker = document.querySelector('[data-ain-marker]')
  const root = rootEl()
  if (!dest || !marker || !root) return

  at = /** @type {typeof at} */ (id)
  root.setAttribute('data-at', id)
  marker.style.setProperty('--ain-mx', dest.x)
  marker.style.setProperty('--ain-my', dest.y)
  marker.classList.toggle('is-locked', Boolean(opts.locked))
  marker.classList.toggle('is-moving', false)
}

/**
 * @param {string} fromId
 * @param {string} toId
 * @param {number} durationMs
 */
function moveMarker(fromId, toId, durationMs) {
  const from = DESTINATIONS.find((d) => d.id === fromId)
  const to = DESTINATIONS.find((d) => d.id === toId)
  const marker = document.querySelector('[data-ain-marker]')
  const root = rootEl()
  if (!from || !to || !marker || !root) return

  root.setAttribute('data-at', toId)
  marker.classList.remove('is-locked')
  marker.classList.add('is-moving')
  marker.style.setProperty('--ain-mx', from.x)
  marker.style.setProperty('--ain-my', from.y)
  marker.style.setProperty('--ain-tx', to.x)
  marker.style.setProperty('--ain-ty', to.y)
  marker.style.setProperty('--ain-move-ms', `${durationMs}ms`)
  void marker.offsetWidth
  marker.classList.add('is-travel')
  later(durationMs, () => {
    marker.classList.remove('is-travel', 'is-moving')
    placeMarker(toId)
  })
}

/**
 * @param {string} id
 * @param {number} lifeMs
 */
function spawnGhost(id, lifeMs) {
  const dest = DESTINATIONS.find((d) => d.id === id)
  const host = document.querySelector('[data-ain-ghosts]')
  if (!dest || !host) return

  const ghost = document.createElement('span')
  ghost.className = `ain__ghost ain__ghost--${id}`
  ghost.style.setProperty('--ain-gx', dest.x)
  ghost.style.setProperty('--ain-gy', dest.y)
  ghost.style.setProperty('--ain-ghost-ms', `${lifeMs}ms`)
  host.appendChild(ghost)
  void ghost.offsetWidth
  ghost.classList.add('is-alive')

  later(lifeMs, () => {
    ghost.remove()
  })
}

function applyShipImmediate() {
  clearTimers()
  clearGhosts()
  const root = rootEl()
  root?.setAttribute('data-phase', 'done')
  ;['home', 'search', 'build', 'review'].forEach(setTick)
  placeMarker('ship', { locked: true })
  setStatus('Destination ship.')
  setButtons(true)
  busy = false
}

/**
 * Rapid jump HOME → … → SHIP with afterimages.
 * @returns {Promise<void>}
 */
export function runAfterimageNav() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()
  if (at === 'ship' && root.getAttribute('data-phase') === 'done') {
    return Promise.resolve()
  }

  busy = true
  clearTimers()
  clearGhosts()
  clearTicks()
  root.setAttribute('data-phase', 'jumping')
  placeMarker('home')
  setButtons(false)
  setStatus('Destination home.')
  void root.offsetWidth

  if (prefersReducedMotion()) {
    applyShipImmediate()
    return Promise.resolve()
  }

  return new Promise((resolve) => {
    const hops = [
      { from: 'home', to: 'search', ms: SEGMENT_MS[0] },
      { from: 'search', to: 'build', ms: SEGMENT_MS[1] },
      { from: 'build', to: 'review', ms: SEGMENT_MS[2] },
      { from: 'review', to: 'ship', ms: SEGMENT_MS[3] },
    ]

    let t = 0
    for (let i = 0; i < hops.length; i += 1) {
      const hop = hops[i]
      const leaveDest = DESTINATIONS[i]
      later(t, () => {
        if (!busy) return
        spawnGhost(leaveDest.id, leaveDest.ghostMs)
        setTick(leaveDest.id)
        moveMarker(hop.from, hop.to, hop.ms)
      })
      t += hop.ms
    }

    later(ARRIVAL_MS, () => {
      if (!busy) return
      placeMarker('ship', { locked: true })
      setStatus('Destination ship.')
      root.setAttribute('data-phase', 'settling')
    })

    later(CLEANUP_MS, () => {
      root.setAttribute('data-phase', 'done')
      busy = false
      setButtons(true)
      resolve()
    })
  })
}

export function resetAfterimageNav() {
  clearTimers()
  clearGhosts()
  clearTicks()
  busy = false
  const root = rootEl()
  root?.setAttribute('data-phase', 'idle')
  placeMarker('home')
  setStatus('Destination home.')
  setButtons(true)
}

/** @returns {Promise<void>} */
export async function replayAfterimageNav() {
  if (busy) return
  resetAfterimageNav()
  void rootEl()?.offsetWidth
  await runAfterimageNav()
}

function bindUi() {
  document.querySelectorAll('[data-ain-jump]').forEach((btn) => {
    btn.addEventListener('click', () => {
      void runAfterimageNav()
    })
  })

  document.querySelectorAll('[data-ain-replay]').forEach((btn) => {
    btn.addEventListener('click', () => {
      void replayAfterimageNav()
    })
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') {
      void replayAfterimageNav()
    }
  })
}

bindUi()
resetAfterimageNav()

export const AFTERIMAGE_NAV_CONTRACT = {
  DESTINATIONS: DESTINATIONS.map(({ id, x, y, leaveMs, ghostMs }) => ({
    id,
    x,
    y,
    leaveMs,
    ghostMs,
  })),
  SEGMENT_MS,
  ARRIVAL_MS,
}
