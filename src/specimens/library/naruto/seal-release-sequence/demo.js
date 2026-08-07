/**
 * Seal Release Sequence — staggered outward ring disengage; open glyph last.
 * iframe-safe; no storage / parent / network.
 */

const RING_COUNT = 3
/** Outer → inner stagger (ms). */
const RING_STAGGER_MS = [0, 120, 240]
const RING_ANIM_MS = 300
const GLYPH_MS = 160
const SETTLE_MS = 90
const EXPAND = [1.38, 1.32, 1.26]

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
  return document.querySelector('[data-srs]')
}

function rings() {
  return Array.from(document.querySelectorAll('[data-srs-ring]')).sort(
    (a, b) => Number(a.getAttribute('data-index')) - Number(b.getAttribute('data-index')),
  )
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
  const el = document.querySelector('[data-srs-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-srs-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-srs-hint]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-srs-run], [data-srs-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showResolved() {
  rings().forEach((ring) => ring.setAttribute('data-disengaged', 'true'))
  rootEl()?.setAttribute('data-phase', 'done')
  setStatus('UNLOCKED')
  setHint('Seal released.')
  setLive('All seal rings disengaged outward. Open glyph latched.')
}

function resetVisual() {
  rings().forEach((ring) => ring.removeAttribute('data-disengaged'))
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('ENGAGED')
  setHint('Press Run to disengage the seal rings.')
  setLive('Seal engaged. Three rings locked.')
}

/**
 * Auto-run the staggered ring release (demo Run).
 * @returns {Promise<void>}
 */
export function runSealReleaseSequence() {
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
  setStatus('RELEASING')
  setLive('Disengaging seal rings outward.')

  return new Promise((resolve) => {
    const list = rings()
    list.forEach((ring, i) => {
      later(RING_STAGGER_MS[i] ?? i * 120, () => {
        ring.setAttribute('data-disengaged', 'true')
        setLive(
          `Ring ${i + 1} of ${RING_COUNT} expanded to ×${EXPAND[i]} (stagger ${RING_STAGGER_MS[i]}ms).`,
        )
      })
    })

    const lastRingEnd =
      (RING_STAGGER_MS[RING_COUNT - 1] ?? 240) + RING_ANIM_MS
    later(lastRingEnd, () => {
      root.setAttribute('data-phase', 'done')
      setStatus('UNLOCKED')
      setHint('Seal released.')
      setLive('Open glyph latched after final ring disengage.')
      later(GLYPH_MS + SETTLE_MS, () => {
        busy = false
        setButtons(true)
        resolve()
      })
    })
  })
}

export function resetSealReleaseSequence() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replaySealReleaseSequence() {
  if (busy) return
  resetSealReleaseSequence()
  void rootEl()?.offsetWidth
  await runSealReleaseSequence()
}

function bindUi() {
  document.querySelector('[data-srs-run]')?.addEventListener('click', () => {
    void runSealReleaseSequence()
  })
  document.querySelector('[data-srs-replay]')?.addEventListener('click', () => {
    void replaySealReleaseSequence()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replaySealReleaseSequence()
  })
}

bindUi()
resetSealReleaseSequence()
