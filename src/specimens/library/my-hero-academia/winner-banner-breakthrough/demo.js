const BREAK_MS = 740
const TICK_MS = 180
const TICK_DELAY_MS = 520

let busy = false
/** @type {number | null} */
let timer = null

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function root() {
  return document.querySelector('[data-winner-banner]')
}

function setLive(text) {
  const el = document.querySelector('[data-wbb-live]')
  if (el) el.textContent = text
}

function showBanner() {
  const r = root()
  const banner = document.querySelector('[data-wbb-banner]')
  if (banner) banner.setAttribute('aria-hidden', 'false')
  if (r) r.dataset.phase = 'done'
  setLive('Team A declared winner.')
  const run = document.querySelector('[data-wbb-run]')
  const reset = document.querySelector('[data-wbb-reset]')
  if (run) run.disabled = true
  if (reset) reset.hidden = false
}

export function runWinnerBannerBreakthrough() {
  const r = root()
  if (!r || busy || r.dataset.phase === 'done') return Promise.resolve()

  busy = true
  if (timer) window.clearTimeout(timer)
  setLive('Banner breaking through…')
  void r.offsetWidth

  if (prefersReducedMotion()) {
    showBanner()
    busy = false
    return Promise.resolve()
  }

  r.dataset.phase = 'break'

  return new Promise((resolve) => {
    timer = window.setTimeout(() => {
      showBanner()
      busy = false
      timer = null
      resolve()
    }, BREAK_MS)
  })
}

export function resetWinnerBannerBreakthrough() {
  if (timer) window.clearTimeout(timer)
  timer = null
  busy = false
  const r = root()
  const banner = document.querySelector('[data-wbb-banner]')
  if (banner) banner.setAttribute('aria-hidden', 'true')
  if (r) r.dataset.phase = 'idle'
  setLive('Scores settled. Awaiting declaration.')
  const run = document.querySelector('[data-wbb-run]')
  const reset = document.querySelector('[data-wbb-reset]')
  if (run) run.disabled = false
  if (reset) reset.hidden = true
  void r?.offsetWidth
}

export async function replayWinnerBannerBreakthrough() {
  if (busy) return
  resetWinnerBannerBreakthrough()
  void root()?.offsetWidth
  await runWinnerBannerBreakthrough()
}

function bind() {
  document.querySelector('[data-wbb-run]')?.addEventListener('click', () => {
    void runWinnerBannerBreakthrough()
  })
  document.querySelector('[data-wbb-reset]')?.addEventListener('click', () => {
    resetWinnerBannerBreakthrough()
  })
  window.addEventListener('message', (e) => {
    if (e.data?.type === 'restart') resetWinnerBannerBreakthrough()
  })
}

bind()
