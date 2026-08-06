/**
 * Bounded Touch Ripple — pointer-origin ripple clipped to control bounds.
 */

const RIPPLE_MS = 420
const MAX_OPACITY = 0.18

/** @type {WeakMap<Element, AbortController>} */
const controllers = new WeakMap()

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') ===
    'true'
  return (
    forced ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

function rippleRadius(el, x, y) {
  const w = el.clientWidth
  const h = el.clientHeight
  const corners = [
    [0, 0],
    [w, 0],
    [0, h],
    [w, h],
  ]
  let max = 0
  for (const [cx, cy] of corners) {
    const d = Math.hypot(cx - x, cy - y)
    if (d > max) max = d
  }
  return max
}

function spawnRipple(el, x, y) {
  const reduced = prefersReducedMotion()
  const host = el.querySelector('[data-btr-ripples]') || (() => {
    const layer = document.createElement('span')
    layer.className = 'btr__ripples'
    layer.setAttribute('data-btr-ripples', '')
    layer.setAttribute('aria-hidden', 'true')
    el.appendChild(layer)
    return layer
  })()

  const ripple = document.createElement('span')
  ripple.className = reduced ? 'btr__ripple btr__ripple--flash' : 'btr__ripple'
  const r = rippleRadius(el, x, y)
  ripple.style.left = `${x}px`
  ripple.style.top = `${y}px`
  ripple.style.width = `${r * 2}px`
  ripple.style.height = `${r * 2}px`
  host.appendChild(ripple)
  void ripple.offsetWidth
  ripple.classList.add('is-active')

  const ms = reduced ? 100 : RIPPLE_MS
  window.setTimeout(() => ripple.remove(), ms)
}

function pointerOrigin(el, clientX, clientY) {
  const rect = el.getBoundingClientRect()
  return {
    x: clientX - rect.left,
    y: clientY - rect.top,
  }
}

function centerOrigin(el) {
  return { x: el.clientWidth / 2, y: el.clientHeight / 2 }
}

function bindTarget(el) {
  if (controllers.has(el)) return
  const ac = new AbortController()
  controllers.set(el, ac)
  const { signal } = ac

  el.addEventListener(
    'pointerdown',
    (e) => {
      if (e.button !== 0) return
      const { x, y } = pointerOrigin(el, e.clientX, e.clientY)
      spawnRipple(el, x, y)
      document.querySelector('[data-btr-status]').textContent =
        'Ripple at pointer origin.'
    },
    { signal },
  )

  el.addEventListener(
    'keydown',
    (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return
      e.preventDefault()
      const { x, y } = centerOrigin(el)
      spawnRipple(el, x, y)
      document.querySelector('[data-btr-status]').textContent =
        'Keyboard ripple at centre.'
    },
    { signal },
  )
}

export function resetBoundedTouchRipple() {
  document.querySelectorAll('[data-btr-ripples]').forEach((host) => {
    host.replaceChildren()
  })
  const status = document.querySelector('[data-btr-status]')
  if (status) status.textContent = 'Tap or press Enter on any control.'
}

export function replayBoundedTouchRipple() {
  resetBoundedTouchRipple()
}

function bindUi() {
  document.querySelectorAll('[data-btr-target]').forEach(bindTarget)

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') replayBoundedTouchRipple()
  })
}

bindUi()
resetBoundedTouchRipple()

export const BOUNDED_TOUCH_RIPPLE_CONTRACT = { RIPPLE_MS, MAX_OPACITY }
