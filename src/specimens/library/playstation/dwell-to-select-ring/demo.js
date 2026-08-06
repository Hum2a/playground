const CIRC = 276.46
const DWELL = 1800
let timer = null
let start = 0
let raf = null

function rm() {
  return document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
    || matchMedia('(prefers-reduced-motion: reduce)').matches
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
  setProgress(0)
}

function select() {
  const root = document.querySelector('[data-dts]')
  root?.classList.add('is-selected')
  status('Selected — dwell complete')
}

function tick() {
  const elapsed = performance.now() - start
  const p = Math.min(1, elapsed / DWELL)
  setProgress(p)
  if (p < 1) raf = requestAnimationFrame(tick)
}

function startDwell() {
  const root = document.querySelector('[data-dts]')
  if (!root || root.classList.contains('is-selected')) return
  cancel()
  if (rm()) { select(); return }
  start = performance.now()
  status('Dwelling…')
  tick()
  timer = setTimeout(select, DWELL)
}

function bind() {
  const target = document.querySelector('[data-dts-target]')
  target?.addEventListener('pointerdown', (e) => { e.preventDefault(); startDwell() })
  target?.addEventListener('pointerup', cancel)
  target?.addEventListener('pointerleave', cancel)
  addEventListener('message', (e) => {
    if (e.data?.type === 'restart') {
      document.querySelector('[data-dts]')?.classList.remove('is-selected')
      cancel()
      status('Ready — press and hold target')
    }
  })
}

bind()
