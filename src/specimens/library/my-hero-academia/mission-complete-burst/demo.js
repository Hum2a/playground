const COLLAPSE_MS = 420
const COLLAPSE_STAGGER_MS = 40
const WIDGET_COUNT = 4
const BURST_DELAY_MS = 400
const STAMP_MS = 360

const COLLAPSE_TOTAL_MS = (WIDGET_COUNT - 1) * COLLAPSE_STAGGER_MS + COLLAPSE_MS
const TOTAL_MS = BURST_DELAY_MS + STAMP_MS

let busy = false
/** @type {number | null} */
let timer = null

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function root() {
  return document.querySelector('[data-mission-complete]')
}

function setLive(text) {
  const el = document.querySelector('[data-mcb-live]')
  if (el) el.textContent = text
}

function applyDone() {
  const r = root()
  const burst = document.querySelector('[data-mcb-burst]')
  if (burst) burst.setAttribute('aria-hidden', 'false')
  if (r) r.dataset.phase = 'done'
  setLive('Mission complete. Rank A.')
  const run = document.querySelector('[data-mcb-run]')
  const reset = document.querySelector('[data-mcb-reset]')
  if (run) run.disabled = true
  if (reset) reset.hidden = false
}

export function runMissionCompleteBurst() {
  const r = root()
  if (!r || busy || r.dataset.phase === 'done') return Promise.resolve()

  busy = true
  if (timer) window.clearTimeout(timer)
  setLive('Collapsing telemetry…')
  void r.offsetWidth

  if (prefersReducedMotion()) {
    applyDone()
    busy = false
    return Promise.resolve()
  }

  r.dataset.phase = 'collapse'

  return new Promise((resolve) => {
    timer = window.setTimeout(() => {
      r.dataset.phase = 'burst'
      setLive('Completion stamp.')

      timer = window.setTimeout(() => {
        applyDone()
        busy = false
        timer = null
        resolve()
      }, TOTAL_MS)
    }, COLLAPSE_TOTAL_MS)
  })
}

export function resetMissionCompleteBurst() {
  if (timer) window.clearTimeout(timer)
  timer = null
  busy = false
  const r = root()
  const burst = document.querySelector('[data-mcb-burst]')
  if (burst) burst.setAttribute('aria-hidden', 'true')
  if (r) r.dataset.phase = 'idle'
  setLive('Mission telemetry active.')
  const run = document.querySelector('[data-mcb-run]')
  const reset = document.querySelector('[data-mcb-reset]')
  if (run) run.disabled = false
  if (reset) reset.hidden = true
  void r?.offsetWidth
}

export async function replayMissionCompleteBurst() {
  if (busy) return
  resetMissionCompleteBurst()
  void root()?.offsetWidth
  await runMissionCompleteBurst()
}

function bind() {
  document.querySelector('[data-mcb-run]')?.addEventListener('click', () => {
    void runMissionCompleteBurst()
  })
  document.querySelector('[data-mcb-reset]')?.addEventListener('click', () => {
    resetMissionCompleteBurst()
  })
  window.addEventListener('message', (e) => {
    if (e.data?.type === 'restart') resetMissionCompleteBurst()
  })
}

bind()
