/**
 * Sector Radar Search — tiny portable instrument API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 *
 * Timeline (frozen):
 *   Pass 1 (0–1200ms): wedge sweep; blips B/D/C/A lock at 100/300/550/850ms
 *   Pass 2 (1200–2400ms): second sweep; reject B/C/A; D locks
 *   ~2040ms: triangulation lines + brackets; TARGET LOCKED
 */

const SWEEP_MS = 1200
const LOCK_MS = 180
const TOTAL_MS = 2040

/** First-pass discovery order with ms offsets */
const DISCOVERIES = [
  ['B', 100],
  ['D', 300],
  ['C', 550],
  ['A', 850],
]

const REJECT_TIMES = [
  ['B', 1390],
  ['C', 1640],
  ['A', 1880],
]

/** @type {number[]} */
let timers = []
let busy = false
let done = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-sector-radar]')
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

function setPhase(phase) {
  const root = rootEl()
  if (!root) return
  root.setAttribute('data-phase', phase)
}

function setCount(n) {
  const el = document.querySelector('[data-srs-count]')
  if (el) el.textContent = `SIGNALS // ${n}`
}

function setReadout({ result, target, dist }) {
  const r = document.querySelector('[data-srs-result]')
  const t = document.querySelector('[data-srs-target]')
  const d = document.querySelector('[data-srs-dist]')
  if (r) r.textContent = result
  if (t) t.textContent = target
  if (d) d.textContent = dist
}

function setStatus(text) {
  const el = document.querySelector('[data-srs-status]')
  if (el) el.textContent = text
}

function setButtons({ search, reset }) {
  const searchBtn = document.querySelector('[data-srs-search]')
  const resetBtn = document.querySelector('[data-srs-reset]')
  if (searchBtn) searchBtn.disabled = !search
  if (resetBtn) resetBtn.disabled = !reset
}

function blip(id) {
  return document.querySelector(`[data-id="${id}"]`)
}

function applyLocked(announce) {
  const root = rootEl()
  if (!root) return

  root.classList.add('srs--locked')
  setPhase('locked')
  root.dataset.state = 'locked'

  root.querySelectorAll('.srs__blip').forEach((el) => {
    el.classList.add('is-found')
  })
  ;['B', 'C', 'A'].forEach((id) => {
    blip(id)?.classList.add('is-reject')
  })

  setCount(4)
  setReadout({
    result: 'TARGET LOCKED',
    target: 'NODE D',
    dist: '2.4',
  })
  setButtons({ search: false, reset: true })

  if (announce) {
    setStatus('Target locked. Node D. Distance 2.4.')
  }

  busy = false
  done = true
}

function clearVisuals() {
  const root = rootEl()
  if (!root) return

  root.className = 'srs'
  setPhase('idle')
  root.dataset.state = 'idle'

  root.querySelectorAll('.srs__blip').forEach((el) => {
    el.classList.remove('is-found', 'is-reject')
  })

  setCount(0)
  setReadout({ result: 'SEARCHING', target: '—', dist: '—' })
  setButtons({ search: true, reset: false })
  setStatus('Region 12 instrument ready.')
}

/**
 * Run one sector search sequence.
 * @returns {Promise<void>}
 */
export function runSectorRadarSearch() {
  const root = rootEl()
  if (!root || busy || done) return Promise.resolve()

  busy = true
  clearTimers()
  clearVisuals()
  setButtons({ search: false, reset: false })

  if (prefersReducedMotion()) {
    applyLocked(true)
    return Promise.resolve()
  }

  setPhase('sweep-1')
  root.classList.add('srs--sweep-1')
  setStatus('Sector sweep pass one.')

  return new Promise((resolve) => {
    DISCOVERIES.forEach(([id, time], index) => {
      later(time, () => {
        blip(id)?.classList.add('is-found')
        setCount(index + 1)
      })
    })

    later(SWEEP_MS, () => {
      root.classList.remove('srs--sweep-1')
      setPhase('sweep-2')
      root.classList.add('srs--sweep-2')
      setStatus('Sector sweep pass two. Comparing candidates.')
    })

    REJECT_TIMES.forEach(([id, time]) => {
      later(time, () => {
        blip(id)?.classList.add('is-reject')
      })
    })

    later(TOTAL_MS, () => {
      applyLocked(true)
      resolve()
    })
  })
}

/**
 * Restore idle instrument.
 * @returns {Promise<void>}
 */
export function resetSectorRadarSearch() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()

  clearTimers()
  busy = false
  done = false
  clearVisuals()
  return Promise.resolve()
}

/** @returns {Promise<void>} */
export async function replaySectorRadarSearch() {
  if (busy) return
  await resetSectorRadarSearch()
  void rootEl()?.offsetWidth
  await runSectorRadarSearch()
}

function bindUi() {
  const root = rootEl()
  if (!root) return

  root.querySelector('[data-srs-search]')?.addEventListener('click', () => {
    void runSectorRadarSearch()
  })
  root.querySelector('[data-srs-reset]')?.addEventListener('click', () => {
    void resetSectorRadarSearch()
  })

  window.addEventListener('message', (event) => {
    if (event.data?.type === 'restart') {
      void replaySectorRadarSearch()
    }
  })
}

bindUi()
resetSectorRadarSearch()
