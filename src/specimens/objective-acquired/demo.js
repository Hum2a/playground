/**
 * Objective Acquired — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 */

const TOTAL_MS = 850
const STATUS_COPY =
  'New objective: Build the Archive. Create 50 portable specimens.'

let busy = false
let settled = false
let announced = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-objective-acquired]')
}

function statusEl() {
  return document.querySelector('[data-objective-acquired-status]')
}

function clearMotionClasses(root) {
  root.classList.remove(
    'objective-acquired--assemble',
    'objective-acquired--settled',
    'objective-acquired--reduced',
  )
}

function announceOnce() {
  if (announced) return
  const status = statusEl()
  if (!status) return
  status.textContent = ''
  void status.offsetWidth
  status.textContent = STATUS_COPY
  announced = true
}

/**
 * Assemble the objective card. Remains persistent after settle.
 * @returns {Promise<void>}
 */
export function acquireObjective() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()

  // Already persistent — ignore until reset/replay
  if (settled && root.classList.contains('objective-acquired--settled')) {
    return Promise.resolve()
  }

  busy = true
  settled = false
  announced = false
  clearMotionClasses(root)
  root.hidden = false
  const status = statusEl()
  if (status) status.textContent = ''
  void root.offsetWidth

  if (prefersReducedMotion()) {
    root.classList.add('objective-acquired--reduced', 'objective-acquired--settled')
    announceOnce()
    busy = false
    settled = true
    return Promise.resolve()
  }

  root.classList.add('objective-acquired--assemble')

  return new Promise((resolve) => {
    window.setTimeout(() => {
      announceOnce()
    }, 380)

    window.setTimeout(() => {
      root.classList.remove('objective-acquired--assemble')
      root.classList.add('objective-acquired--settled')
      busy = false
      settled = true
      resolve()
    }, TOTAL_MS)
  })
}

/**
 * Clear the persistent card so it can assemble again.
 * @returns {Promise<void>}
 */
export function clearObjective() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()

  clearMotionClasses(root)
  root.hidden = true
  settled = false
  announced = false
  const status = statusEl()
  if (status) status.textContent = ''
  return Promise.resolve()
}

/**
 * Clear then reassemble — deterministic replay.
 * @returns {Promise<void>}
 */
export async function replayObjective() {
  if (busy) return
  await clearObjective()
  await acquireObjective()
}

function bindUi() {
  document
    .querySelector('[data-objective-acquired-trigger]')
    ?.addEventListener('click', () => {
      void replayObjective()
    })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayObjective()
  })
}

bindUi()
