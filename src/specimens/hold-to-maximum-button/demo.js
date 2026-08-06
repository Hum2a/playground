const CIRC = 326.73
const HOLD_MS = 1200
const TICK_MS = 40

let fill = 0
let charging = false
let done = false
/** @type {number | null} */
let interval = null

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function root() {
  return document.querySelector('[data-hold-max]')
}

function setLive(text) {
  const el = document.querySelector('[data-htm-live]')
  if (el) el.textContent = text
}

function applyFill(pct) {
  fill = pct
  const r = root()
  if (!r) return
  r.dataset.fill = String(pct)
  const ring = document.querySelector('[data-htm-ring]')
  if (ring) {
    ring.style.strokeDashoffset = String(CIRC - (pct / 100) * CIRC)
  }
  const pctEl = document.querySelector('[data-htm-pct]')
  if (pctEl) pctEl.textContent = `${pct}%`
}

function applyDone() {
  const r = root()
  if (!r) return
  done = true
  charging = false
  r.dataset.phase = 'done'
  applyFill(100)
  setLive('Maximum output committed.')
  const hint = document.querySelector('[data-htm-hint]')
  if (hint) hint.textContent = 'MAXIMUM OUTPUT'
  const btn = document.querySelector('[data-htm-btn]')
  if (btn) btn.disabled = true
  const reset = document.querySelector('[data-htm-reset]')
  if (reset) reset.hidden = false
}

function stopCharge() {
  if (interval) window.clearInterval(interval)
  interval = null
  charging = false
  if (!done) {
    const r = root()
    if (r) r.dataset.phase = 'idle'
    setLive('Charge released.')
  }
}

function startCharge() {
  if (done || charging) return
  const r = root()
  if (!r) return

  if (prefersReducedMotion()) {
    applyDone()
    return
  }

  charging = true
  r.dataset.phase = 'charging'
  setLive('Charging output…')

  const step = (100 / HOLD_MS) * TICK_MS
  interval = window.setInterval(() => {
    const next = Math.min(100, fill + step)
    applyFill(Math.round(next))
    if (next >= 100) {
      stopCharge()
      applyDone()
    }
  }, TICK_MS)
}

export function resetHoldToMaximumButton() {
  stopCharge()
  done = false
  fill = 0
  const r = root()
  if (r) r.dataset.phase = 'idle'
  applyFill(0)
  setLive('Ready to charge.')
  const hint = document.querySelector('[data-htm-hint]')
  if (hint) hint.textContent = 'Hold OUTPUT to charge.'
  const btn = document.querySelector('[data-htm-btn]')
  if (btn) btn.disabled = false
  const reset = document.querySelector('[data-htm-reset]')
  if (reset) reset.hidden = true
  void r?.offsetWidth
}

function bind() {
  const btn = document.querySelector('[data-htm-btn]')
  if (!btn) return

  btn.addEventListener('pointerdown', (e) => {
    e.preventDefault()
    startCharge()
  })
  btn.addEventListener('pointerup', () => {
    if (!done && fill < 100) stopCharge()
  })
  btn.addEventListener('pointerleave', () => {
    if (!done && fill < 100) stopCharge()
  })

  document.querySelector('[data-htm-reset]')?.addEventListener('click', () => {
    resetHoldToMaximumButton()
  })

  window.addEventListener('message', (e) => {
    if (e.data?.type === 'restart') resetHoldToMaximumButton()
  })
}

bind()
applyFill(0)
