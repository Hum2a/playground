/**
 * Blue Glass Shard Transition (SPX-005) — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 *
 * Timing (ms):
 *   Cover checkpoint  ~410  (panes achieve effective full coverage)
 *   Exit begins         420
 *   Total               850
 *   Destination settle  180 (after swap, during exit)
 */

const COVERED_MS = 410
const EXIT_MS = 420
const TOTAL_MS = 850
const DEST_SETTLE_MS = 180
const RM_FLASH_MS = 50

let busy = false
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
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

/**
 * @param {() => void} [onCovered] — called once while glass coverage is complete
 * @returns {Promise<void>}
 */
export function runShardTransition(onCovered) {
  if (busy) return Promise.resolve()

  const root = document.querySelector('[data-azure-shard]')
  if (!root) return Promise.resolve()

  busy = true
  clearTimers()

  if (prefersReducedMotion()) {
    return runReduced(root, onCovered)
  }

  return new Promise((resolve) => {
    root.classList.remove('azure-shard--exit', 'azure-shard--rm-flash')
    root.classList.add('azure-shard--active')

    let covered = false

    later(COVERED_MS, () => {
      covered = true
      try {
        onCovered?.()
      } catch {
        /* keep transition resilient */
      }
      startDestinationSettle()
    })

    later(EXIT_MS, () => {
      root.classList.add('azure-shard--exit')
    })

    later(TOTAL_MS, () => {
      if (!covered) {
        try {
          onCovered?.()
        } catch {
          /* ignore */
        }
      }
      root.classList.remove('azure-shard--active', 'azure-shard--exit')
      stopDestinationSettle()
      busy = false
      resolve()
    })
  })
}

function startDestinationSettle() {
  const demo = document.querySelector('[data-azure-shard-demo]')
  if (!demo) return
  demo.classList.remove('azure-shard-demo--settle')
  void demo.offsetWidth
  demo.classList.add('azure-shard-demo--settle')
  later(DEST_SETTLE_MS + 20, () => {
    demo.classList.remove('azure-shard-demo--settle')
  })
}

function stopDestinationSettle() {
  document
    .querySelector('[data-azure-shard-demo]')
    ?.classList.remove('azure-shard-demo--settle')
}

function runReduced(root, onCovered) {
  return new Promise((resolve) => {
    root.classList.add('azure-shard--active', 'azure-shard--rm-flash')
    later(RM_FLASH_MS, () => {
      try {
        onCovered?.()
      } catch {
        /* ignore */
      }
      root.classList.remove(
        'azure-shard--active',
        'azure-shard--rm-flash',
        'azure-shard--exit',
      )
      busy = false
      resolve()
    })
  })
}

function swapTo(target) {
  const demo = document.querySelector('[data-azure-shard-demo]')
  if (!demo) return

  const states = demo.querySelectorAll('[data-state]')
  let nextBtn = null
  states.forEach((el) => {
    const match = el.getAttribute('data-state') === target
    el.toggleAttribute('hidden', !match)
    if (match) {
      nextBtn = el.querySelector('[data-azure-shard-trigger]')
    }
  })
  nextBtn?.focus({ preventScroll: true })
}

/**
 * Deterministic reset to State A — no accumulated panes.
 * @returns {Promise<void>}
 */
export function resetShardTransition() {
  if (busy) return Promise.resolve()
  clearTimers()
  const root = document.querySelector('[data-azure-shard]')
  root?.classList.remove(
    'azure-shard--active',
    'azure-shard--exit',
    'azure-shard--rm-flash',
  )
  stopDestinationSettle()
  swapTo('a')
  return Promise.resolve()
}

/**
 * Harness restart — reset to State A.
 * @returns {Promise<void>}
 */
export async function replayShardTransition() {
  if (busy) return
  await resetShardTransition()
}

function bindTriggers() {
  document.querySelectorAll('[data-azure-shard-trigger]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-target')
      if (!target) return
      void runShardTransition(() => swapTo(target))
    })
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayShardTransition()
  })
}

bindTriggers()
