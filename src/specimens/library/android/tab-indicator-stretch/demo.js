/**
 * Tab Indicator Stretch — single indicator stretches during tab transitions.
 */

const TRANSITION_MS = 300
const INDICATOR_W = 34
const STRIP_W = 336
const TAB_COUNT = 4
const MAX_STRETCH = 70

let active = 0
let animating = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function root() {
  return document.querySelector('[data-tab-indicator-stretch]')
}

function indicator() {
  return document.querySelector('[data-tis-indicator]')
}

function tabCenter(index) {
  const tab = document.querySelector(`[data-tis-tab="${index}"]`)
  const strip = document.querySelector('.tis__tabs')
  if (!tab || !strip) return 0
  const tr = tab.getBoundingClientRect()
  const sr = strip.getBoundingClientRect()
  return tr.left - sr.left + tr.width / 2 - INDICATOR_W / 2
}

function setIndicatorPosition(x, width = INDICATOR_W) {
  const el = indicator()
  if (!el) return
  el.style.setProperty('--tis-ind-x', `${x}px`)
  el.style.width = `${width}px`
}

function setStatus(text) {
  const el = document.querySelector('[data-tis-status]')
  if (el) el.textContent = text
}

function selectTab(index) {
  if (animating || index === active) return
  animating = true

  const fromX = tabCenter(active)
  const toX = tabCenter(index)
  const distance = Math.abs(toX - fromX)
  const stretch = Math.min(MAX_STRETCH, distance * 0.45)
  const maxWidth = INDICATOR_W + stretch

  document.querySelectorAll('[data-tis-tab]').forEach((tab, i) => {
    tab.setAttribute('aria-selected', i === index ? 'true' : 'false')
  })
  document.querySelectorAll('[data-tis-panel]').forEach((panel, i) => {
    if (i === index) panel.removeAttribute('hidden')
    else panel.setAttribute('hidden', '')
  })
  root()?.setAttribute('data-phase', `tab-${index}`)

  const labels = ['Overview', 'Activity', 'Library', 'Settings']
  setStatus(`${labels[index]} selected.`)

  if (prefersReducedMotion()) {
    setIndicatorPosition(toX, INDICATOR_W)
    active = index
    animating = false
    return
  }

  const start = performance.now()
  const movingRight = toX > fromX

  const tick = (now) => {
    const t = Math.min(1, (now - start) / TRANSITION_MS)
    let x
    let w
    if (t <= 0.45) {
      const p = t / 0.45
      w = INDICATOR_W + stretch * p
      x = fromX + (toX - fromX) * p * 0.45
      if (!movingRight) x = fromX - (fromX - toX) * p * 0.45 - (w - INDICATOR_W)
    } else {
      const p = (t - 0.45) / 0.55
      w = maxWidth - (maxWidth - INDICATOR_W) * p
      x = movingRight
        ? toX - (maxWidth - INDICATOR_W) * (1 - p)
        : toX + (maxWidth - INDICATOR_W) * (1 - p) * 0
      if (movingRight) {
        x = fromX + (toX - fromX) * (0.45 + 0.55 * p) - (w - INDICATOR_W)
      } else {
        x = fromX - (fromX - toX) * (0.45 + 0.55 * p)
      }
    }
    setIndicatorPosition(x, w)
    if (t < 1) requestAnimationFrame(tick)
    else {
      setIndicatorPosition(toX, INDICATOR_W)
      active = index
      animating = false
    }
  }

  requestAnimationFrame(tick)
}

function bindUi() {
  document.querySelectorAll('[data-tis-tab]').forEach((tab) => {
    tab.addEventListener('click', () => {
      const idx = Number(tab.getAttribute('data-tis-tab'))
      selectTab(idx)
    })
  })

  root()?.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      selectTab(Math.min(TAB_COUNT - 1, active + 1))
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      selectTab(Math.max(0, active - 1))
    }
  })
}

bindUi()
setIndicatorPosition(tabCenter(0), INDICATOR_W)

export function resetTabIndicatorStretch() {
  active = 0
  animating = false
  document.querySelectorAll('[data-tis-tab]').forEach((tab, i) => {
    tab.setAttribute('aria-selected', i === 0 ? 'true' : 'false')
  })
  document.querySelectorAll('[data-tis-panel]').forEach((panel, i) => {
    if (i === 0) panel.removeAttribute('hidden')
    else panel.setAttribute('hidden', '')
  })
  root()?.setAttribute('data-phase', 'tab-0')
  setIndicatorPosition(tabCenter(0), INDICATOR_W)
  setStatus('Overview selected.')
}

export const TAB_INDICATOR_STRETCH_CONTRACT = {
  TRANSITION_MS,
  INDICATOR_W,
  MAX_STRETCH,
}
