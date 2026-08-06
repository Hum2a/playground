/**
 * Tactical Command Wheel — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 * Discrete 90° steps; final 30° snaps faster; labels stay upright.
 */

const COMMANDS = ['VIEW', 'EDIT', 'COPY', 'DELETE']
const TRAVEL_MS = 160
const SNAP_MS = 60
/** Full step ≈ TRAVEL + SNAP = 220ms */

let busy = false
/** @type {number[]} */
let timers = []
let bound = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') ===
    'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-tactical-wheel]')
}

function options(root) {
  return Array.from(root.querySelectorAll('[data-tcw-option]'))
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
}

function mod(n, m) {
  return ((n % m) + m) % m
}

function rotationFor(index) {
  return -index * 90
}

/**
 * Shortest signed delta in degrees between two wheel angles (multiples of 90).
 * @param {number} fromDeg
 * @param {number} toDeg
 */
function shortestDelta(fromDeg, toDeg) {
  let delta = toDeg - fromDeg
  while (delta > 180) delta -= 360
  while (delta < -180) delta += 360
  return delta
}

function setLive(root, index) {
  const live = root.querySelector('[data-tcw-live]')
  if (live) live.textContent = `${COMMANDS[index]} selected.`
}

function syncRadios(root, index) {
  options(root).forEach((btn, i) => {
    const on = i === index
    btn.classList.toggle('tcw__option--active', on)
    btn.setAttribute('aria-checked', on ? 'true' : 'false')
    btn.tabIndex = on ? 0 : -1
  })
}

function setHub(root, index) {
  const hub = root.querySelector('[data-tcw-hub]')
  if (hub) hub.textContent = COMMANDS[index]
}

function applyImmediate(root, index) {
  clearTimers()
  busy = false
  root.classList.remove('tcw--busy', 'tcw--travel', 'tcw--snap')
  root.setAttribute('data-selected', String(index))
  root.style.setProperty('--tcw-rot', `${rotationFor(index)}deg`)
  syncRadios(root, index)
  setHub(root, index)
  setLive(root, index)
}

/**
 * Rotate wheel so command `index` occupies the east (selected) position.
 * @param {number} index — 0–3
 * @returns {Promise<void>}
 */
export function selectCommand(index) {
  const root = rootEl()
  if (!root) return Promise.resolve()

  const next = mod(index | 0, COMMANDS.length)
  const prev = Number(root.getAttribute('data-selected') ?? '0')

  if (next === prev && !busy) {
    syncRadios(root, next)
    setHub(root, next)
    setLive(root, next)
    return Promise.resolve()
  }

  if (prefersReducedMotion()) {
    applyImmediate(root, next)
    return Promise.resolve()
  }

  if (busy) {
    clearTimers()
    root.classList.remove('tcw--travel', 'tcw--snap')
    busy = false
  }

  busy = true
  root.classList.add('tcw--busy')

  // Semantic selection + data-selected commit immediately; hub waits for snap.
  root.setAttribute('data-selected', String(next))
  syncRadios(root, next)
  setLive(root, next)

  // Keep continuous absolute angle so CSS can interpolate without jumping.
  const currentAttr = root.style.getPropertyValue('--tcw-rot').trim()
  const current = currentAttr
    ? Number.parseFloat(currentAttr)
    : rotationFor(prev)
  const delta = shortestDelta(current, rotationFor(next))
  const target = current + delta
  const mid = current + delta * (60 / 90)

  root.style.setProperty('--tcw-rot', `${current}deg`)
  // Force style flush before enabling transition.
  void root.offsetWidth

  root.classList.add('tcw--travel')
  root.style.setProperty('--tcw-rot', `${mid}deg`)

  return new Promise((resolve) => {
    later(TRAVEL_MS, () => {
      root.classList.remove('tcw--travel')
      root.classList.add('tcw--snap')
      root.style.setProperty('--tcw-rot', `${target}deg`)

      later(SNAP_MS, () => {
        root.classList.remove('tcw--snap', 'tcw--busy')
        // Normalize stored angle to canonical -index*90 for next shortest-path math.
        root.style.setProperty('--tcw-rot', `${rotationFor(next)}deg`)
        setHub(root, next)
        busy = false
        resolve()
      })
    })
  })
}

export function rotateNext() {
  const root = rootEl()
  if (!root) return Promise.resolve()
  const cur = Number(root.getAttribute('data-selected') ?? '0')
  return selectCommand(cur + 1)
}

export function rotatePrev() {
  const root = rootEl()
  if (!root) return Promise.resolve()
  const cur = Number(root.getAttribute('data-selected') ?? '0')
  return selectCommand(cur - 1)
}

function onListKeydown(event) {
  const root = rootEl()
  if (!root) return
  const key = event.key
  if (
    key !== 'ArrowRight' &&
    key !== 'ArrowDown' &&
    key !== 'ArrowLeft' &&
    key !== 'ArrowUp' &&
    key !== 'Home' &&
    key !== 'End'
  ) {
    return
  }
  event.preventDefault()
  const cur = Number(root.getAttribute('data-selected') ?? '0')
  if (key === 'Home') {
    selectCommand(0)
    return
  }
  if (key === 'End') {
    selectCommand(COMMANDS.length - 1)
    return
  }
  if (key === 'ArrowRight' || key === 'ArrowDown') {
    selectCommand(cur + 1)
    return
  }
  selectCommand(cur - 1)
}

function bind() {
  if (bound) return
  const root = rootEl()
  if (!root) return
  bound = true

  const list = root.querySelector('[data-tcw-list]')
  if (list) list.addEventListener('keydown', onListKeydown)

  options(root).forEach((btn) => {
    btn.addEventListener('click', () => {
      const index = Number(btn.getAttribute('data-index') ?? '0')
      selectCommand(index)
    })
  })

  const prev = root.querySelector('[data-tcw-prev]')
  const next = root.querySelector('[data-tcw-next]')
  if (prev) prev.addEventListener('click', () => rotatePrev())
  if (next) next.addEventListener('click', () => rotateNext())
}

export const tacticalCommandWheel = {
  select: selectCommand,
  next: rotateNext,
  prev: rotatePrev,
}

if (typeof window !== 'undefined') {
  window.tacticalCommandWheel = tacticalCommandWheel
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bind, { once: true })
  } else {
    bind()
  }
}
