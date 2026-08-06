/**
 * Ink Splat Transition — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 */

const COVERED_MS = 500
const EXIT_MS = 520
const TOTAL_MS = 1100
const RM_FLASH_MS = 40

let busy = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

/**
 * @param {() => void} [onCovered] — called once while the viewport is fully obscured
 * @returns {Promise<void>}
 */
export function runInkTransition(onCovered) {
  if (busy) return Promise.resolve()

  const root = document.querySelector('[data-ink-splat]')
  if (!root) return Promise.resolve()

  busy = true

  if (prefersReducedMotion()) {
    return runReduced(root, onCovered)
  }

  return new Promise((resolve) => {
    root.classList.remove('ink-splat--exit', 'ink-splat--rm-flash')
    root.classList.add('ink-splat--active')

    let covered = false
    const coverTimer = window.setTimeout(() => {
      covered = true
      try {
        onCovered?.()
      } catch {
        /* keep transition resilient */
      }
    }, COVERED_MS)

    const exitTimer = window.setTimeout(() => {
      root.classList.add('ink-splat--exit')
    }, EXIT_MS)

    window.setTimeout(() => {
      window.clearTimeout(coverTimer)
      window.clearTimeout(exitTimer)
      if (!covered) {
        try {
          onCovered?.()
        } catch {
          /* ignore */
        }
      }
      root.classList.remove('ink-splat--active', 'ink-splat--exit')
      busy = false
      resolve()
    }, TOTAL_MS)
  })
}

function runReduced(root, onCovered) {
  return new Promise((resolve) => {
    root.classList.add('ink-splat--active', 'ink-splat--rm-flash')
    window.setTimeout(() => {
      try {
        onCovered?.()
      } catch {
        /* ignore */
      }
      root.classList.remove('ink-splat--active', 'ink-splat--rm-flash', 'ink-splat--exit')
      busy = false
      resolve()
    }, RM_FLASH_MS)
  })
}

function swapTo(target) {
  const demo = document.querySelector('[data-ink-splat-demo]')
  if (!demo) return

  const states = demo.querySelectorAll('[data-state]')
  let nextBtn = null
  states.forEach((el) => {
    const match = el.getAttribute('data-state') === target
    el.toggleAttribute('hidden', !match)
    if (match) {
      nextBtn = el.querySelector('[data-ink-splat-trigger]')
    }
  })
  nextBtn?.focus({ preventScroll: true })
}

function bindTriggers() {
  document.querySelectorAll('[data-ink-splat-trigger]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-target')
      if (!target) return
      void runInkTransition(() => swapTo(target))
    })
  })
}

bindTriggers()
