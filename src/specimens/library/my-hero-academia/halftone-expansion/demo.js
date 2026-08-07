/**
 * Halftone Expansion — halftone dots expand from interaction point as transition mask.
 */

const PRIMARY_MS = 420
const COVER_MS = 220
const EXIT_MS = 320
const TOTAL_MS = PRIMARY_MS + EXIT_MS + 330

let busy = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function root() {
  return document.querySelector('[data-halftone-expansion]')
}

function mask() {
  return document.querySelector('[data-htx-mask]')
}

function setLive(text) {
  const el = document.querySelector('[data-htx-live]')
  if (el) el.textContent = text
}

function phaseFor(target) {
  return target === 'b' ? 'complete' : 'standby'
}

function liveFor(target) {
  return target === 'b'
    ? 'Complete zone active. Output engaged.'
    : 'Standby zone restored. Output idle.'
}

function swapTo(target) {
  const demo = root()
  if (!demo) return
  demo.setAttribute('data-phase', phaseFor(target))
  demo.querySelectorAll('[data-htx-state]').forEach((el) => {
    const match = el.getAttribute('data-htx-state') === target
    el.toggleAttribute('hidden', !match)
  })
  setLive(liveFor(target))
}

export function runHalftoneExpansion(target, originX = 50, originY = 50) {
  const overlay = mask()
  if (!overlay || busy) return Promise.resolve()
  busy = true

  overlay.style.setProperty('--htx-ox', `${originX}%`)
  overlay.style.setProperty('--htx-oy', `${originY}%`)

  if (prefersReducedMotion()) {
    swapTo(target)
    busy = false
    return Promise.resolve()
  }

  setLive('Halftone mask expanding…')
  overlay.classList.remove('htx__mask--exit')
  overlay.classList.add('htx__mask--active')

  return new Promise((resolve) => {
    window.setTimeout(() => {
      swapTo(target)
    }, COVER_MS)

    window.setTimeout(() => {
      overlay.classList.add('htx__mask--exit')
      setLive('Halftone mask contracting…')
    }, PRIMARY_MS)

    window.setTimeout(() => {
      overlay.classList.remove('htx__mask--active', 'htx__mask--exit')
      busy = false
      resolve()
    }, TOTAL_MS)
  })
}

export function resetHalftoneExpansion() {
  busy = false
  mask()?.classList.remove('htx__mask--active', 'htx__mask--exit')
  swapTo('a')
}

function bind() {
  document.querySelectorAll('[data-htx-trigger]').forEach((btn) => {
    btn.addEventListener('click', (event) => {
      const target = btn.getAttribute('data-target')
      if (!target) return
      const rect = btn.getBoundingClientRect()
      const host = root()?.getBoundingClientRect()
      const ox = host ? ((rect.left + rect.width / 2 - host.left) / host.width) * 100 : 50
      const oy = host ? ((rect.top + rect.height / 2 - host.top) / host.height) * 100 : 50
      void runHalftoneExpansion(target, ox, oy)
    })
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      resetHalftoneExpansion()
    }
  })
}

bind()
resetHalftoneExpansion()
