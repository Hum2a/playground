/**
 * Memory Fragment Reveal — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 * Contemplative reconstruction: start → staggered converge → lock → rule → secondary.
 */

const START_MS = 180
const STAGGER_MS = 42
const TRAVEL_MS = 340
const LOCK_MS = 180
const RULE_MS = 220
const SECONDARY_MS = 200
/** Fragments: 6. Last arrival ≈ START + 5*STAGGER + TRAVEL = 730ms */
const LAST_ARRIVE_MS = START_MS + 5 * STAGGER_MS + TRAVEL_MS
/** Semantic reveal once 4 fragments have landed */
const REVEAL_AFTER_MS = START_MS + 3 * STAGGER_MS + TRAVEL_MS
const LOCK_END_MS = LAST_ARRIVE_MS + LOCK_MS
/** Rule + secondary CSS animations begin at complete (LOCK_END_MS). */
const FINALE_MS = LOCK_END_MS + RULE_MS + SECONDARY_MS

const FRAG_COUNT = 6

let busy = false
let complete = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') ===
    'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-memory-fragment]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
}

function setStatus(root, text) {
  const status = root.querySelector('[data-mfr-status]')
  if (!status) return
  status.textContent = ''
  void status.offsetWidth
  status.textContent = text
}

function setBusyUi(root, isBusy) {
  const reconstruct = root.querySelector('[data-mfr-reconstruct]')
  const scatter = root.querySelector('[data-mfr-scatter]')
  if (reconstruct) reconstruct.disabled = isBusy || complete
  if (scatter) scatter.disabled = isBusy
}

function clearAligned(root) {
  root.querySelectorAll('[data-frag]').forEach((frag) => {
    frag.classList.remove('mfr__frag--aligned')
  })
}

function applyReducedComplete(root) {
  clearTimers()
  busy = false
  complete = true
  root.classList.add('mfr--reduced')
  root.setAttribute('data-state', 'complete')
  clearAligned(root)
  root.querySelectorAll('[data-frag]').forEach((frag) => {
    frag.classList.add('mfr__frag--aligned')
  })
  setStatus(
    root,
    'Memory restored. Archive. The missing record has been restored.',
  )
  setBusyUi(root, false)
}

/**
 * Reconstruct the six memory fragments into ARCHIVE / MEMORY // 03.
 * @returns {Promise<void>}
 */
export function reconstructMemoryFragments() {
  const root = rootEl()
  if (!root || busy || complete) return Promise.resolve()

  busy = true
  clearTimers()
  clearAligned(root)
  root.classList.remove('mfr--reduced')
  setBusyUi(root, true)
  setStatus(root, 'Memory fragmented.')

  if (prefersReducedMotion()) {
    applyReducedComplete(root)
    return Promise.resolve()
  }

  root.setAttribute('data-state', 'starting')
  void root.offsetWidth

  return new Promise((resolve) => {
    later(START_MS, () => {
      root.setAttribute('data-state', 'converging')
      void root.offsetWidth

      for (let i = 0; i < FRAG_COUNT; i += 1) {
        const arriveAt = START_MS + i * STAGGER_MS + TRAVEL_MS
        later(arriveAt - START_MS, () => {
          const frag = root.querySelector(`[data-frag="${i + 1}"]`)
          frag?.classList.add('mfr__frag--aligned')
        })
      }
    })

    later(REVEAL_AFTER_MS, () => {
      setStatus(
        root,
        'Memory restored. Archive. The missing record has been restored.',
      )
    })

    later(LAST_ARRIVE_MS, () => {
      root.setAttribute('data-state', 'locking')
    })

    later(LOCK_END_MS, () => {
      root.setAttribute('data-state', 'complete')
      complete = true
      busy = false
      setBusyUi(root, false)
    })

    later(FINALE_MS, () => {
      resolve()
    })
  })
}

/**
 * Return fragments to the frozen scatter composition.
 * @returns {Promise<void>}
 */
export function scatterMemoryFragments() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()

  clearTimers()
  complete = false
  busy = false
  clearAligned(root)
  root.classList.remove('mfr--reduced')
  root.setAttribute('data-state', 'scattered')
  void root.offsetWidth
  setStatus(root, 'Memory fragmented.')
  setBusyUi(root, false)
  return Promise.resolve()
}

function bind() {
  const root = rootEl()
  if (!root) return

  root
    .querySelector('[data-mfr-reconstruct]')
    ?.addEventListener('click', () => {
      void reconstructMemoryFragments()
    })

  root.querySelector('[data-mfr-scatter]')?.addEventListener('click', () => {
    void scatterMemoryFragments()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') {
      void scatterMemoryFragments()
    }
  })

  setStatus(root, 'Memory fragmented.')
}

bind()
