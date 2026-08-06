/**
 * Eyecatch Transition — short branded interstitial between major states.
 */

const PRIMARY_MS = 500
const TOTAL_MS = 1150

let busy = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function root() {
  return document.querySelector('[data-eyecatch-transition]')
}

function interstitial() {
  return document.querySelector('[data-eyc-interstitial]')
}

function swapTo(target) {
  const demo = root()
  if (!demo) return
  demo.setAttribute('data-phase', target)
  demo.querySelectorAll('[data-eyc-state]').forEach((el) => {
    const match = el.getAttribute('data-eyc-state') === target
    el.toggleAttribute('hidden', !match)
  })
}

export function runEyecatchTransition(target) {
  const overlay = interstitial()
  if (!overlay || busy) return Promise.resolve()
  busy = true

  if (prefersReducedMotion()) {
    swapTo(target)
    busy = false
    return Promise.resolve()
  }

  overlay.classList.remove('eyc__interstitial--exit')
  overlay.classList.add('eyc__interstitial--active')

  return new Promise((resolve) => {
    window.setTimeout(() => {
      swapTo(target)
    }, PRIMARY_MS * 0.45)

    window.setTimeout(() => {
      overlay.classList.add('eyc__interstitial--exit')
    }, PRIMARY_MS)

    window.setTimeout(() => {
      overlay.classList.remove('eyc__interstitial--active', 'eyc__interstitial--exit')
      busy = false
      resolve()
    }, TOTAL_MS)
  })
}

function bind() {
  document.querySelectorAll('[data-eyc-trigger]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-target')
      if (!target) return
      void runEyecatchTransition(target)
    })
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      busy = false
      interstitial()?.classList.remove('eyc__interstitial--active', 'eyc__interstitial--exit')
      swapTo('a')
    }
  })
}

bind()
