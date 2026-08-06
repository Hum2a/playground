/**
 * Hero Assignment Drag — profile card becomes a compact dispatch proxy.
 */

const PRIMARY_MS = 740
const TOTAL_MS = 1390

let busy = false
let timer = null

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function root() {
  return document.querySelector('[data-hero-assignment-drag]')
}

function setStatus(text) {
  const el = document.querySelector('[data-had-status]')
  if (el) el.textContent = text
}

export function resetHeroAssignmentDrag() {
  if (timer !== null) window.clearTimeout(timer)
  busy = false
  const el = root()
  const card = document.querySelector('[data-had-card]')
  const proxy = document.querySelector('[data-had-proxy]')
  const zone = document.querySelector('[data-had-zone]')
  if (!el || !card || !proxy || !zone) return
  el.classList.remove('had--dragging', 'had--assigned')
  el.setAttribute('data-phase', 'idle')
  card.classList.remove('had__card--placeholder')
  proxy.hidden = true
  zone.classList.remove('had__zone--filled')
  setStatus('Assign HERO // 07 to dispatch zone.')
}

export function runHeroAssignmentDrag() {
  const el = root()
  const card = document.querySelector('[data-had-card]')
  const proxy = document.querySelector('[data-had-proxy]')
  const zone = document.querySelector('[data-had-zone]')
  if (!el || !card || !proxy || !zone || busy) return Promise.resolve()
  busy = true

  if (prefersReducedMotion()) {
    el.classList.add('had--assigned')
    el.setAttribute('data-phase', 'assigned')
    card.classList.add('had__card--placeholder')
    proxy.hidden = true
    zone.classList.add('had__zone--filled')
    setStatus('HERO // 07 assigned to dispatch.')
    busy = false
    return Promise.resolve()
  }

  el.classList.add('had--dragging')
  el.setAttribute('data-phase', 'dragging')
  card.classList.add('had__card--placeholder')
  proxy.hidden = false
  setStatus('Condensing profile into dispatch proxy…')

  return new Promise((resolve) => {
    timer = window.setTimeout(() => {
      el.classList.remove('had--dragging')
      el.classList.add('had--assigned')
      proxy.hidden = true
      zone.classList.add('had__zone--filled')
      el.setAttribute('data-phase', 'assigned')
      setStatus('HERO // 07 assigned to dispatch.')
      busy = false
      timer = null
      resolve()
    }, PRIMARY_MS)
  })
}

function bind() {
  document.querySelector('[data-had-trigger]')?.addEventListener('click', () => {
    if (root()?.classList.contains('had--assigned')) {
      resetHeroAssignmentDrag()
      return
    }
    void runHeroAssignmentDrag()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      resetHeroAssignmentDrag()
    }
  })
}

bind()
