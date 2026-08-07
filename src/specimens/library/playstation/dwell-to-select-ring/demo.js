/**
 * Dwell-to-Select Ring (SPX-3463) — 1800ms spatial dwell.
 */

const CIRC = 276.46
const DWELL_MS = 1800
let timer = null
let start = 0
let raf = null

function rm() {
  return (
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true' ||
    matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

function status(t) {
  const el = document.querySelector('[data-dts-status]')
  if (el) el.textContent = t
}

function setProgress(p) {
  const ring = document.querySelector('[data-dts-progress]')
  if (ring) ring.style.strokeDashoffset = String(CIRC * (1 - p))
}

function cancel() {
  if (timer) clearTimeout(timer)
  if (raf) cancelAnimationFrame(raf)
  timer = null
  raf = null
  const root = document.querySelector('[data-dts]')
  if (root?.classList.contains('is-selected')) return
  setProgress(0)
  status('Ready — press and hold target')
}

function select() {
  const root = document.querySelector('[data-dts]')
  root?.classList.add('is-selected')
  setProgress(1)
  status('Selected — 1.8s dwell complete')
}

function tick() {
  const elapsed = performance.now() - start
  const p = Math.min(1, elapsed / DWELL_MS)
  setProgress(p)
  if (p < 1) raf = requestAnimationFrame(tick)
}

function startDwell() {
  const root = document.querySelector('[data-dts]')
  if (!root || root.classList.contains('is-selected')) return
  cancel()
  if (rm()) {
    select()
    return
  }
  start = performance.now()
  status('Dwelling… hold for 1.8s')
  tick()
  timer = setTimeout(select, DWELL_MS)
}

function bind() {
  const target = document.querySelector('[data-dts-target]')
  target?.addEventListener('pointerdown', (e) => {
    e.preventDefault()
    startDwell()
  })
  target?.addEventListener('pointerup', cancel)
  target?.addEventListener('pointerleave', cancel)
  target?.addEventListener('pointercancel', cancel)
  addEventListener('message', (e) => {
    if (e.data?.type === 'restart') {
      document.querySelector('[data-dts]')?.classList.remove('is-selected')
      cancel()
      status('Ready — press and hold target')
    }
  })
}

bind()
