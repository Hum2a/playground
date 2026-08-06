/**
 * Healing Progress Field — a damaged 5×5 grid heals ring-by-ring from the centre.
 * iframe-safe; no storage / parent / network.
 */

const RING_COUNT = 3
const STEP_MS = 220
const SETTLE_MS = 100
const TOTAL_MS = RING_COUNT * STEP_MS + SETTLE_MS

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
  return document.querySelector('[data-hpf]')
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
  const el = document.querySelector('[data-hpf-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-hpf-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-hpf-hint]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-hpf-run], [data-hpf-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function tiles() {
  return Array.from(document.querySelectorAll('[data-hpf-tile]'))
}

function tilesInRing(ring) {
  return tiles().filter((tile) => Number(tile.dataset.ring) === ring)
}

function healRing(ring) {
  tilesInRing(ring).forEach((tile) => {
    tile.setAttribute('data-healed', 'true')
    tile.setAttribute('data-pulse', 'true')
    later(STEP_MS, () => tile.removeAttribute('data-pulse'))
  })
}

function showResolved() {
  for (let r = 0; r < RING_COUNT; r += 1) {
    tilesInRing(r).forEach((tile) => tile.setAttribute('data-healed', 'true'))
  }
  rootEl()?.setAttribute('data-phase', 'done')
  setStatus('RESTORED')
  setHint('Field fully restored.')
  setLive('Field recovery complete. All tiles restored.')
}

function resetVisual() {
  tiles().forEach((tile) => {
    tile.setAttribute('data-healed', 'false')
    tile.removeAttribute('data-pulse')
  })
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('DAMAGED')
  setHint('Press Run to begin recovery.')
  setLive('Field damaged. Healing pending.')
}

/**
 * Auto-run the full recovery (Run / replay).
 * @returns {Promise<void>}
 */
export function runHealingProgressField() {
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
  setStatus('HEALING')
  setLive('Healing field from the centre outward.')

  return new Promise((resolve) => {
    let ring = 0
    const tick = () => {
      if (ring >= RING_COUNT) {
        later(SETTLE_MS, () => {
          showResolved()
          busy = false
          setButtons(true)
          resolve()
        })
        return
      }
      healRing(ring)
      setLive(`Ring ${ring + 1} of ${RING_COUNT} healed.`)
      ring += 1
      later(STEP_MS, tick)
    }
    tick()
  })
}

export function resetHealingProgressField() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayHealingProgressField() {
  if (busy) return
  resetHealingProgressField()
  void rootEl()?.offsetWidth
  await runHealingProgressField()
}

function bindUi() {
  document.querySelector('[data-hpf-run]')?.addEventListener('click', () => {
    void runHealingProgressField()
  })
  document.querySelector('[data-hpf-replay]')?.addEventListener('click', () => {
    void replayHealingProgressField()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayHealingProgressField()
  })
}

void TOTAL_MS
bindUi()
resetHealingProgressField()
