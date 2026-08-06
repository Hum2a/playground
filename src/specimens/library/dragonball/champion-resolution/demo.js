/**
 * Champion Resolution — final comparison → decisive champion.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 *
 * Frozen timings from FINALISE (ms):
 *   scores 0–300 · hold 120 · delta · resolve · paths stagger 25ms · stamp → done
 */

const SCORE_MS = 300
const HOLD_MS = 120
const DELTA_MS = 140
const RESOLVE_MS = 280
const PATH_STAGGER = 25
const PATH_DRAW_MS = 220
const STAMP_MS = 180
const PATH_COUNT = 6

const ATLAS_SCORE = 92
const NOVA_SCORE = 87

const DELTA_START = SCORE_MS + HOLD_MS
const RESOLVE_START = DELTA_START + DELTA_MS
const PATHS_START = RESOLVE_START + RESOLVE_MS
const STAMP_START = PATHS_START + (PATH_COUNT - 1) * PATH_STAGGER + PATH_DRAW_MS
const DONE_AT = STAMP_START + STAMP_MS

let busy = false
/** @type {number[]} */
let timers = []
/** @type {number | null} */
let raf = null

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') ===
    'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-cr]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
  if (raf != null) {
    cancelAnimationFrame(raf)
    raf = null
  }
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
  return id
}

function setPhase(phase) {
  const root = rootEl()
  if (root) root.setAttribute('data-phase', phase)
}

function setLive(text) {
  const el = document.querySelector('[data-cr-live]')
  if (el) el.textContent = text
}

function setControls(done) {
  const btn = document.querySelector('[data-cr-finalise]')
  if (btn) btn.disabled = busy || done
}

function setScore(id, n) {
  const el = document.querySelector(`[data-cr-score="${id}"]`)
  if (el) el.textContent = String(n).padStart(2, '0')
  const fill = document.querySelector(`[data-cr-fill="${id}"]`)
  if (fill) fill.style.setProperty('--p', `${n}%`)
}

function animateScores() {
  const start = performance.now()
  function tick(now) {
    const t = Math.min(1, (now - start) / SCORE_MS)
    // ease-out
    const e = 1 - (1 - t) ** 2
    setScore('atlas', Math.round(ATLAS_SCORE * e))
    setScore('nova', Math.round(NOVA_SCORE * e))
    if (t < 1) {
      raf = requestAnimationFrame(tick)
    } else {
      setScore('atlas', ATLAS_SCORE)
      setScore('nova', NOVA_SCORE)
      raf = null
    }
  }
  raf = requestAnimationFrame(tick)
}

function showChampionImmediate() {
  setPhase('done')
  setScore('atlas', ATLAS_SCORE)
  setScore('nova', NOVA_SCORE)
  document.querySelector('[data-cr-card="atlas"]')?.setAttribute('data-role', 'champion')
  document.querySelector('[data-cr-card="nova"]')?.setAttribute('data-role', 'runner-up')
  const title = document.querySelector('[data-cr-title]')
  const status = document.querySelector('[data-cr-status]')
  const badgeA = document.querySelector('[data-cr-badge="atlas"]')
  const badgeN = document.querySelector('[data-cr-badge="nova"]')
  const result = document.querySelector('[data-cr-result]')
  const delta = document.querySelector('[data-cr-delta]')
  if (title) title.textContent = 'CHAMPION'
  if (status) status.textContent = 'COMPLETE'
  if (badgeA) badgeA.textContent = 'CHAMPION'
  if (badgeN) badgeN.textContent = 'RUNNER-UP'
  if (result) result.hidden = false
  if (delta) {
    delta.hidden = false
    delta.setAttribute('aria-hidden', 'false')
  }
  for (let i = 0; i < PATH_COUNT; i++) {
    document
      .querySelector(`[data-cr-path="${i}"]`)
      ?.setAttribute('data-drawn', 'true')
  }
  setLive('Atlas is champion with score 92. Nova runner-up with 87.')
  busy = false
  setControls(true)
}

/**
 * Run champion resolution sequence.
 * @returns {Promise<void>}
 */
export function runChampionResolution() {
  const root = rootEl()
  if (!root || busy || root.getAttribute('data-phase') === 'done') {
    return Promise.resolve()
  }

  busy = true
  setControls(false)
  clearTimers()
  setLive('Finalising Model Arena 08')

  if (prefersReducedMotion()) {
    showChampionImmediate()
    return Promise.resolve()
  }

  setPhase('idle')
  void root.offsetWidth
  setPhase('scoring')
  animateScores()

  return new Promise((resolve) => {
    later(SCORE_MS, () => {
      setPhase('hold')
      setLive('Scores locked — Atlas 92, Nova 87')
    })

    later(DELTA_START, () => {
      setPhase('delta')
      const delta = document.querySelector('[data-cr-delta]')
      if (delta) {
        delta.hidden = false
        delta.setAttribute('aria-hidden', 'false')
      }
      setLive('Margin +05')
    })

    later(RESOLVE_START, () => {
      setPhase('resolve')
      document
        .querySelector('[data-cr-card="nova"]')
        ?.setAttribute('data-role', 'runner-up')
      document
        .querySelector('[data-cr-card="atlas"]')
        ?.setAttribute('data-role', 'champion')
      const badgeN = document.querySelector('[data-cr-badge="nova"]')
      if (badgeN) badgeN.textContent = 'RUNNER-UP'
      setLive('Atlas advancing — Nova runner-up')
    })

    later(PATHS_START, () => {
      setPhase('converge')
      setLive('Historical paths converging on Atlas')
    })

    for (let i = 0; i < PATH_COUNT; i++) {
      later(PATHS_START + i * PATH_STAGGER, () => {
        document
          .querySelector(`[data-cr-path="${i}"]`)
          ?.setAttribute('data-drawn', 'true')
      })
    }

    later(STAMP_START, () => {
      setPhase('stamp')
      const title = document.querySelector('[data-cr-title]')
      const status = document.querySelector('[data-cr-status]')
      const badgeA = document.querySelector('[data-cr-badge="atlas"]')
      const result = document.querySelector('[data-cr-result]')
      if (title) title.textContent = 'CHAMPION'
      if (status) status.textContent = 'COMPLETE'
      if (badgeA) badgeA.textContent = 'CHAMPION'
      if (result) result.hidden = false
      setLive('Atlas is champion with score 92. Nova runner-up with 87.')
    })

    later(DONE_AT, () => {
      setPhase('done')
      busy = false
      setControls(true)
      resolve()
    })
  })
}

export function resetChampionResolution() {
  clearTimers()
  busy = false
  setPhase('idle')
  setScore('atlas', 0)
  setScore('nova', 0)
  document.querySelector('[data-cr-card="atlas"]')?.setAttribute('data-role', 'finalist')
  document.querySelector('[data-cr-card="nova"]')?.setAttribute('data-role', 'finalist')
  const title = document.querySelector('[data-cr-title]')
  const status = document.querySelector('[data-cr-status]')
  const badgeA = document.querySelector('[data-cr-badge="atlas"]')
  const badgeN = document.querySelector('[data-cr-badge="nova"]')
  const result = document.querySelector('[data-cr-result]')
  const delta = document.querySelector('[data-cr-delta]')
  if (title) title.textContent = 'FINAL'
  if (status) status.textContent = 'ACTIVE'
  if (badgeA) badgeA.textContent = ''
  if (badgeN) badgeN.textContent = ''
  if (result) result.hidden = true
  if (delta) {
    delta.hidden = true
    delta.setAttribute('aria-hidden', 'true')
  }
  for (let i = 0; i < PATH_COUNT; i++) {
    document
      .querySelector(`[data-cr-path="${i}"]`)
      ?.removeAttribute('data-drawn')
  }
  setLive('Model Arena 08 final — Atlas versus Nova. Ready to finalise.')
  setControls(false)
  const root = rootEl()
  if (root) void root.offsetWidth
}

function bindUi() {
  document.querySelector('[data-cr-finalise]')?.addEventListener('click', () => {
    void runChampionResolution()
  })
  document.querySelector('[data-cr-reset]')?.addEventListener('click', () => {
    resetChampionResolution()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetChampionResolution()
  })
}

bindUi()
resetChampionResolution()
