/**
 * Card-to-Detail Container Transform — measured container morph.
 */

const DURATION_MS = 420
const META_FADE_MS = 120
const CONTENT_REVEAL_START_MS = 160
const CONTENT_REVEAL_END_MS = 360

/** @type {number | null} */
let animFrame = null
let expanded = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') ===
    'true'
  return (
    forced ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

function rootEl() {
  return document.querySelector('[data-card-to-detail]')
}

function clearTimer() {
  if (animFrame !== null) {
    window.cancelAnimationFrame(animFrame)
    animFrame = null
  }
}

function setStatus(text) {
  const el = document.querySelector('[data-ctd-status]')
  if (el) el.textContent = text
}

function measureRects() {
  const scaffold = document.querySelector('[data-ctd-scaffold]')
  const source = document.querySelector('[data-ctd-source]')
  const detail = document.querySelector('[data-ctd-detail]')
  if (!scaffold || !source || !detail) return null

  const sRect = scaffold.getBoundingClientRect()
  const cRect = source.getBoundingClientRect()
  return {
    scaffold,
    source,
    detail,
    from: {
      x: cRect.left - sRect.left,
      y: cRect.top - sRect.top,
      w: cRect.width,
      h: cRect.height,
    },
    to: {
      x: (sRect.width - 336) / 2,
      y: (sRect.height - 548) / 2,
      w: 336,
      h: 548,
    },
  }
}

function applyMorph(m, t, phase) {
  const { from, to, detail } = m
  const x = from.x + (to.x - from.x) * t
  const y = from.y + (to.y - from.y) * t
  const w = from.w + (to.w - from.w) * t
  const h = from.h + (to.h - from.h) * t
  const radius = 20 + (28 - 20) * t

  detail.style.left = `${x}px`
  detail.style.top = `${y}px`
  detail.style.width = `${w}px`
  detail.style.height = `${h}px`
  detail.style.borderRadius = `${radius}px`
  detail.classList.toggle('is-meta-fading', phase === 'expand' && t < META_FADE_MS / DURATION_MS)
  detail.classList.toggle('is-content-visible', phase === 'expand' && t >= CONTENT_REVEAL_START_MS / DURATION_MS)
  detail.classList.toggle('is-expanded', t >= 1)
}

function animate(phase, onDone) {
  clearTimer()
  const m = measureRects()
  if (!m) return

  const { detail, source } = m
  detail.hidden = false
  source.classList.add('is-morphing')

  if (prefersReducedMotion()) {
    applyMorph(m, phase === 'expand' ? 1 : 0, phase)
    expanded = phase === 'expand'
    rootEl()?.setAttribute('data-ctd-state', expanded ? 'detail' : 'list')
    source.classList.toggle('is-hidden', expanded)
    setStatus(expanded ? 'Route detail · Meridian Trail.' : 'Route list · three cards.')
    onDone?.()
    return
  }

  const start = performance.now()
  const fromT = phase === 'expand' ? 0 : 1
  const toT = phase === 'expand' ? 1 : 0

  function frame(now) {
    const elapsed = now - start
    const raw = Math.min(1, elapsed / DURATION_MS)
    const eased = raw < 0.5 ? 2 * raw * raw : 1 - Math.pow(-2 * raw + 2, 2) / 2
    const t = fromT + (toT - fromT) * eased
    applyMorph(m, t, phase)

    if (raw < 1) {
      animFrame = window.requestAnimationFrame(frame)
    } else {
      expanded = phase === 'expand'
      rootEl()?.setAttribute('data-ctd-state', expanded ? 'detail' : 'list')
      source.classList.toggle('is-hidden', expanded)
      source.classList.remove('is-morphing')
      if (!expanded) detail.hidden = true
      setStatus(expanded ? 'Route detail · Meridian Trail.' : 'Route list · three cards.')
      onDone?.()
    }
  }

  animFrame = window.requestAnimationFrame(frame)
}

function expand() {
  if (expanded) return
  animate('expand')
}

function collapse() {
  if (!expanded) return
  animate('collapse')
}

export function resetCardToDetail() {
  clearTimer()
  expanded = false
  const root = rootEl()
  root?.setAttribute('data-ctd-state', 'list')
  const source = document.querySelector('[data-ctd-source]')
  const detail = document.querySelector('[data-ctd-detail]')
  source?.classList.remove('is-hidden', 'is-morphing')
  if (detail) {
    detail.hidden = true
    detail.classList.remove('is-meta-fading', 'is-content-visible', 'is-expanded')
    detail.style.cssText = ''
  }
  setStatus('Route list · three cards.')
}

export function replayCardToDetail() {
  resetCardToDetail()
}

function bindUi() {
  document.querySelector('[data-ctd-source]')?.addEventListener('click', expand)
  document.querySelector('[data-ctd-back]')?.addEventListener('click', collapse)

  window.addEventListener('resize', () => {
    if (expanded) {
      const m = measureRects()
      if (m) applyMorph(m, 1, 'expand')
    }
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') replayCardToDetail()
  })
}

bindUi()
resetCardToDetail()

export const CARD_TO_DETAIL_CONTRACT = { DURATION_MS, META_FADE_MS, CONTENT_REVEAL_START_MS }
