/**
 * Hero Assignment Drag — profile card becomes a compact dispatch proxy.
 */

const PRIMARY_MS = 740

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

function setLive(text) {
  const el = document.querySelector('[data-had-live]')
  if (el) el.textContent = text
}

export function resetHeroAssignmentDrag() {
  if (timer !== null) window.clearTimeout(timer)
  busy = false
  const el = root()
  const card = document.querySelector('[data-had-card]')
  const proxy = document.querySelector('[data-had-proxy]')
  const zone = document.querySelector('[data-had-zone]')
  const trigger = document.querySelector('[data-had-trigger]')
  if (!el || !card || !proxy || !zone) return
  el.classList.remove('had--dragging', 'had--assigned')
  el.setAttribute('data-phase', 'idle')
  card.classList.remove('had__card--placeholder')
  proxy.hidden = true
  zone.classList.remove('had__zone--filled')
  if (trigger) trigger.textContent = 'Assign'
  setLive('Assign HERO // 07 to dispatch zone.')
}

function finishAssign() {
  const el = root()
  const proxy = document.querySelector('[data-had-proxy]')
  const zone = document.querySelector('[data-had-zone]')
  const trigger = document.querySelector('[data-had-trigger]')
  if (!el || !proxy || !zone) return
  el.classList.remove('had--dragging')
  el.classList.add('had--assigned')
  proxy.hidden = true
  zone.classList.add('had__zone--filled')
  el.setAttribute('data-phase', 'assigned')
  if (trigger) trigger.textContent = 'Reset'
  setLive('HERO // 07 assigned to dispatch.')
  busy = false
  timer = null
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
    const trigger = document.querySelector('[data-had-trigger]')
    if (trigger) trigger.textContent = 'Reset'
    setLive('HERO // 07 assigned to dispatch.')
    busy = false
    return Promise.resolve()
  }

  el.classList.add('had--dragging')
  el.setAttribute('data-phase', 'dragging')
  card.classList.add('had__card--placeholder')
  proxy.hidden = false
  setLive('Condensing profile into dispatch proxy…')

  return new Promise((resolve) => {
    timer = window.setTimeout(() => {
      finishAssign()
      resolve()
    }, PRIMARY_MS)
  })
}

export function cancelHeroAssignmentDrag() {
  if (!busy) return
  if (timer !== null) window.clearTimeout(timer)
  const el = root()
  const card = document.querySelector('[data-had-card]')
  const proxy = document.querySelector('[data-had-proxy]')
  if (!el || !card || !proxy) return
  el.classList.remove('had--dragging')
  el.setAttribute('data-phase', 'idle')
  card.classList.remove('had__card--placeholder')
  proxy.hidden = true
  busy = false
  timer = null
  setLive('Assignment cancelled. HERO // 07 returned to roster.')
}

function onAssignOrReset() {
  if (root()?.classList.contains('had--assigned')) {
    resetHeroAssignmentDrag()
    return
  }
  void runHeroAssignmentDrag()
}

function bind() {
  document.querySelector('[data-had-trigger]')?.addEventListener('click', onAssignOrReset)

  document.querySelector('[data-had-card]')?.addEventListener('click', () => {
    if (!root()?.classList.contains('had--assigned') && !busy) onAssignOrReset()
  })

  document.querySelector('[data-had-card]')?.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    if (!root()?.classList.contains('had--assigned') && !busy) onAssignOrReset()
  })

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && busy) {
      event.preventDefault()
      cancelHeroAssignmentDrag()
    }
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      resetHeroAssignmentDrag()
    }
  })
}

bind()
resetHeroAssignmentDrag()
