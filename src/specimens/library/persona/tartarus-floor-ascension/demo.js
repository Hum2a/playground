/**
 * Tartarus Floor Ascension — tiny portable stack API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 */

const ANTICIPATE_MS = 120
const TRAVEL_END_MS = 480
const LOCK_START_MS = 430
const LOCK_END_MS = 600
const GLASS_RETRACT_MS = 180

/** @type {{ id: number, status: 'cleared' | 'unknown' | 'discovered' }[]} */
const FLOORS = [
  { id: 41, status: 'cleared' },
  { id: 42, status: 'cleared' },
  { id: 43, status: 'unknown' },
  { id: 44, status: 'cleared' },
]

const ROLE_CLASSES = [
  'tartarus-ascend__slab--current',
  'tartarus-ascend__slab--next',
  'tartarus-ascend__slab--future',
  'tartarus-ascend__slab--exit',
  'tartarus-ascend__slab--lock',
  'tartarus-ascend__slab--glass',
  'tartarus-ascend__slab--reveal',
]

const PHASE_CLASSES = [
  'tartarus-ascend--anticipate',
  'tartarus-ascend--travel',
  'tartarus-ascend--lock',
  'tartarus-ascend--descend-anticipate',
  'tartarus-ascend--descend-travel',
  'tartarus-ascend--descend-lock',
]

let index = 0
let busy = false
/** @type {number[]} */
let timers = []
/** Rotate which physical node plays current/next/future — content is rebound each rebuild. */
let nodeCursor = 0

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-tartarus-ascend]')
}

function nodes() {
  const root = rootEl()
  if (!root) return []
  return ['a', 'b', 'c'].map((id) => root.querySelector(`[data-tartarus-node="${id}"]`))
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

function padFloor(n) {
  return String(n).padStart(3, '0')
}

function statusLabel(status) {
  if (status === 'unknown') return 'UNKNOWN'
  if (status === 'discovered') return 'DISCOVERED'
  return 'CLEARED'
}

function announce() {
  const live = document.querySelector('[data-tartarus-live]')
  const floor = FLOORS[index]
  if (!live || !floor) return
  const state =
    floor.status === 'unknown'
      ? 'unknown'
      : floor.status === 'discovered'
        ? 'discovered'
        : 'cleared'
  live.textContent = `Floor ${floor.id}, ${state}.`
}

function fillSlab(slab, floor, { glass = false } = {}) {
  if (!slab || !floor) return
  const label = slab.querySelector('[data-slab-label]')
  const status = slab.querySelector('[data-slab-status]')
  if (label) label.textContent = `FLOOR // ${padFloor(floor.id)}`
  if (status) {
    status.textContent = statusLabel(floor.status)
    status.setAttribute('data-kind', floor.status)
  }
  slab.classList.toggle('tartarus-ascend__slab--glass', Boolean(glass))
  slab.classList.remove('tartarus-ascend__slab--reveal')
}

function clearPhases(root) {
  root.classList.remove(...PHASE_CLASSES)
}

function updateControls() {
  const up = document.querySelector('[data-tartarus-ascend-btn]')
  const down = document.querySelector('[data-tartarus-descend]')
  if (up) up.disabled = busy || index >= FLOORS.length - 1
  if (down) down.disabled = busy || index <= 0
}

function floorAt(offset) {
  const base = FLOORS[index]
  const found = FLOORS[index + offset]
  if (found) return found
  return {
    id: (base?.id || 41) + offset,
    status: 'cleared',
  }
}

/**
 * Rebuild three layers at canonical transforms from `index`.
 * Prevents cumulative translate drift across repeated ASCEND.
 */
function rebuildStack({ discovering = false } = {}) {
  const root = rootEl()
  const all = nodes().filter(Boolean)
  if (!root || all.length < 3) return

  clearPhases(root)

  const order = [0, 1, 2].map((i) => all[(nodeCursor + i) % 3])
  const current = order[0]
  const next = order[1]
  const future = order[2]

  for (const el of all) {
    el.classList.remove(...ROLE_CLASSES)
    el.style.animation = 'none'
    el.style.transform = ''
    el.style.opacity = ''
  }

  current.classList.add('tartarus-ascend__slab--current')
  next.classList.add('tartarus-ascend__slab--next')
  future.classList.add('tartarus-ascend__slab--future')
  current.setAttribute('data-tartarus-slab', 'current')
  next.setAttribute('data-tartarus-slab', 'next')
  future.setAttribute('data-tartarus-slab', 'future')

  const curFloor = floorAt(0)
  const nextFloor = floorAt(1)
  const futureFloor = floorAt(2)

  fillSlab(current, curFloor, {
    glass: discovering && curFloor.status === 'unknown',
  })
  fillSlab(next, nextFloor, { glass: nextFloor.status === 'unknown' })
  fillSlab(future, futureFloor)

  for (const el of all) {
    void el.offsetWidth
    el.style.animation = ''
  }

  if (!discovering) current.classList.add('tartarus-ascend__slab--lock')

  announce()
  updateControls()
  return { current, next, future }
}

function markDiscoveredIfNeeded() {
  const floor = FLOORS[index]
  if (!floor || floor.status !== 'unknown') return false
  floor.status = 'discovered'
  return true
}

/**
 * Ascend one floor.
 * @returns {Promise<void>}
 */
export function ascendTartarusFloor() {
  const root = rootEl()
  if (!root || busy || index >= FLOORS.length - 1) return Promise.resolve()

  busy = true
  clearTimers()
  clearPhases(root)
  updateControls()

  if (prefersReducedMotion()) {
    index += 1
    nodeCursor = (nodeCursor + 1) % 3
    const discovering = FLOORS[index]?.status === 'unknown'
    const stack = rebuildStack({ discovering })
    if (discovering && stack) {
      markDiscoveredIfNeeded()
      fillSlab(stack.current, FLOORS[index], { glass: false })
      stack.current.classList.add('tartarus-ascend__slab--lock')
      announce()
    }
    busy = false
    updateControls()
    return Promise.resolve()
  }

  const current = root.querySelector('[data-tartarus-slab="current"]')
  const next = root.querySelector('[data-tartarus-slab="next"]')
  current?.classList.remove('tartarus-ascend__slab--lock')

  root.classList.add('tartarus-ascend--anticipate')

  return new Promise((resolve) => {
    later(ANTICIPATE_MS, () => {
      root.classList.remove('tartarus-ascend--anticipate')
      root.classList.add('tartarus-ascend--travel')
      current?.classList.add('tartarus-ascend__slab--exit')
    })

    later(LOCK_START_MS, () => {
      root.classList.remove('tartarus-ascend--travel')
      root.classList.add('tartarus-ascend--lock')
      next?.classList.add('tartarus-ascend__slab--lock')
    })

    later(LOCK_END_MS, () => {
      index += 1
      nodeCursor = (nodeCursor + 1) % 3
      const arriving = FLOORS[index]
      const discovering = arriving?.status === 'unknown'
      const stack = rebuildStack({ discovering })

      if (discovering && stack) {
        stack.current.classList.add(
          'tartarus-ascend__slab--reveal',
          'tartarus-ascend__slab--lock',
        )
        later(GLASS_RETRACT_MS, () => {
          markDiscoveredIfNeeded()
          fillSlab(stack.current, FLOORS[index], { glass: false })
          stack.current.classList.add('tartarus-ascend__slab--lock')
          announce()
          busy = false
          updateControls()
          resolve()
        })
        return
      }

      busy = false
      updateControls()
      resolve()
    })
  })
}

/**
 * Descend one floor (complementary motion, not reverse).
 * @returns {Promise<void>}
 */
export function descendTartarusFloor() {
  const root = rootEl()
  if (!root || busy || index <= 0) return Promise.resolve()

  busy = true
  clearTimers()
  clearPhases(root)
  updateControls()

  if (prefersReducedMotion()) {
    index -= 1
    nodeCursor = (nodeCursor + 2) % 3
    rebuildStack()
    busy = false
    updateControls()
    return Promise.resolve()
  }

  const current = root.querySelector('[data-tartarus-slab="current"]')
  const next = root.querySelector('[data-tartarus-slab="next"]')
  const future = root.querySelector('[data-tartarus-slab="future"]')
  current?.classList.remove('tartarus-ascend__slab--lock')

  const prevFloor = FLOORS[index - 1]
  fillSlab(future, prevFloor)
  future.classList.remove(...ROLE_CLASSES)
  future.classList.add('tartarus-ascend__slab--exit')
  future.setAttribute('data-tartarus-slab', 'exit')
  future.style.transform = 'translateY(-190px) scale(1.1)'
  future.style.opacity = '0.2'
  void future.offsetWidth
  future.style.transform = ''
  future.style.opacity = ''

  root.classList.add('tartarus-ascend--descend-anticipate')

  return new Promise((resolve) => {
    later(ANTICIPATE_MS, () => {
      root.classList.remove('tartarus-ascend--descend-anticipate')
      root.classList.add('tartarus-ascend--descend-travel')
    })

    later(LOCK_START_MS, () => {
      root.classList.remove('tartarus-ascend--descend-travel')
      root.classList.add('tartarus-ascend--descend-lock')
      future?.classList.add('tartarus-ascend__slab--lock')
    })

    later(LOCK_END_MS, () => {
      index -= 1
      nodeCursor = (nodeCursor + 2) % 3
      rebuildStack()
      busy = false
      updateControls()
      resolve()
    })
  })
}

/**
 * Reset to floor 041 and restore unknown on 043.
 */
export function resetTartarusFloor() {
  clearTimers()
  busy = false
  index = 0
  nodeCursor = 0
  FLOORS[2].status = 'unknown'
  rebuildStack()
}

/**
 * Repeated ASCEND smoke test — asserts roles rebuild without drift.
 * @param {number} [times]
 * @returns {Promise<{ ok: boolean, steps: number, finalIndex: number }>}
 */
export async function testRepeatedAscension(times = 3) {
  resetTartarusFloor()
  const root = rootEl()
  if (!root) return { ok: false, steps: 0, finalIndex: index }

  let steps = 0
  for (let i = 0; i < times; i += 1) {
    if (index >= FLOORS.length - 1) break
    await ascendTartarusFloor()
    steps += 1
    const current = root.querySelector('[data-tartarus-slab="current"]')
    const next = root.querySelector('[data-tartarus-slab="next"]')
    const future = root.querySelector('[data-tartarus-slab="future"]')
    const label = current?.querySelector('[data-slab-label]')?.textContent || ''
    const expected = `FLOOR // ${padFloor(FLOORS[index].id)}`
    const okRoles =
      current?.classList.contains('tartarus-ascend__slab--current') &&
      next?.classList.contains('tartarus-ascend__slab--next') &&
      future?.classList.contains('tartarus-ascend__slab--future') &&
      label === expected
    if (!okRoles) return { ok: false, steps, finalIndex: index }
  }

  return { ok: true, steps, finalIndex: index }
}

function bindUi() {
  document.querySelector('[data-tartarus-ascend-btn]')?.addEventListener('click', () => {
    void ascendTartarusFloor()
  })
  document.querySelector('[data-tartarus-descend]')?.addEventListener('click', () => {
    void descendTartarusFloor()
  })
  document.querySelector('[data-tartarus-reset]')?.addEventListener('click', () => {
    resetTartarusFloor()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetTartarusFloor()
  })
}

bindUi()
resetTartarusFloor()
