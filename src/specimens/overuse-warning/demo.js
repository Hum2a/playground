const LEVELS = [25, 45, 65, 85, 100]
const LABELS = ['NOMINAL', 'ELEVATED', 'STRAINED', 'WARNING', 'EXHAUSTED']

let level = 0

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function root() {
  return document.querySelector('[data-overuse-warning]')
}

function apply(lvl) {
  const r = root()
  if (!r) return
  level = lvl
  const pct = LEVELS[lvl]
  r.dataset.level = String(lvl)
  r.dataset.phase = lvl >= 4 ? 'done' : lvl > 0 ? 'active' : 'idle'
  const fill = r.querySelector('[data-ouw-fill]')
  if (fill) fill.style.width = `${pct}%`
  const pctEl = r.querySelector('[data-ouw-pct]')
  if (pctEl) pctEl.textContent = `${pct}%`
  const label = r.querySelector('[data-ouw-label]')
  if (label) label.textContent = LABELS[lvl]
  const meter = r.querySelector('.ouw__meter')
  if (meter) {
    meter.setAttribute('aria-valuenow', String(pct))
    meter.setAttribute('aria-valuetext', `${pct}% strain, ${LABELS[lvl]}`)
  }
  const live = r.querySelector('[data-ouw-live]')
  if (live) live.textContent = `Strain ${LABELS[lvl].toLowerCase()} at ${pct}%.`
  const run = r.querySelector('[data-ouw-run]')
  const reset = r.querySelector('[data-ouw-reset]')
  if (run) run.disabled = lvl >= 4
  if (reset) reset.hidden = lvl < 4
}

export function runOveruseWarning() {
  if (level >= 4) return Promise.resolve()
  apply(level + 1)
  if (prefersReducedMotion()) void root()?.offsetWidth
  return Promise.resolve()
}

export function resetOveruseWarning() {
  apply(0)
  void root()?.offsetWidth
}

export async function replayOveruseWarning() {
  resetOveruseWarning()
  for (let i = 0; i < 4; i++) await runOveruseWarning()
}

function bind() {
  document.querySelector('[data-ouw-run]')?.addEventListener('click', () => {
    void runOveruseWarning()
  })
  document.querySelector('[data-ouw-reset]')?.addEventListener('click', () => {
    resetOveruseWarning()
  })
  window.addEventListener('message', (e) => {
    if (e.data?.type === 'restart') resetOveruseWarning()
  })
}

bind()
apply(0)
