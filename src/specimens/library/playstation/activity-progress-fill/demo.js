const STEPS = [0, 28, 55, 82, 100]
const FILL_MS = 480
let idx = 0
let busy = false
let timer = 0

function rm() {
  return (
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true' ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

function root() {
  return document.querySelector('[data-apf]')
}

function paint() {
  const r = root()
  if (!r) return
  const pct = STEPS[idx]
  const fill = r.querySelector('[data-apf-fill]')
  const bar = r.querySelector('[data-apf-bar]')
  const chip = r.querySelector('[data-apf-chip]')
  const live = r.querySelector('[data-apf-live]')
  const status = r.querySelector('[data-apf-status]')
  const run = r.querySelector('[data-apf-run]')

  if (fill) fill.style.width = pct + '%'
  if (bar) bar.setAttribute('aria-valuenow', String(pct))
  if (chip) chip.textContent = pct + '%'

  const phase = pct >= 100 ? 'done' : idx === 0 ? 'idle' : 'active'
  r.setAttribute('data-phase', phase)

  if (live) {
    live.textContent =
      pct >= 100
        ? 'Activity complete at the completion boundary.'
        : 'Activity at ' + pct + ' percent.'
  }
  if (status) {
    status.textContent =
      pct >= 100
        ? 'Fill reached the 100% completion boundary.'
        : 'Filling toward the completion boundary — next step ' +
          (STEPS[Math.min(idx + 1, STEPS.length - 1)]) +
          '%.'
  }
  if (run) run.disabled = pct >= 100 || busy
}

function reset() {
  window.clearTimeout(timer)
  idx = 0
  busy = false
  paint()
}

function advance() {
  if (busy || idx >= STEPS.length - 1) return
  busy = true
  if (rm()) {
    idx = STEPS.length - 1
    paint()
    busy = false
    return
  }
  idx += 1
  paint()
  timer = window.setTimeout(() => {
    busy = false
    paint()
  }, FILL_MS + 20)
}

function bind() {
  const r = root()
  if (!r) return
  r.querySelector('[data-apf-run]')?.addEventListener('click', advance)
  r.querySelector('[data-apf-reset]')?.addEventListener('click', reset)
  window.addEventListener('message', (e) => {
    if (e.data?.type === 'restart') reset()
  })
  paint()
}

bind()
