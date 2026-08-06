/**
 * Comic Panel Wipe — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 */

const COVERED_MS = 450
const EXIT_MS = 520
const TOTAL_MS = 1050
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
export function runComicWipe(onCovered) {
  if (busy) return Promise.resolve()

  const root = document.querySelector('[data-comic-wipe]')
  if (!root) return Promise.resolve()

  busy = true

  if (prefersReducedMotion()) {
    return runReduced(root, onCovered)
  }

  return new Promise((resolve) => {
    root.classList.remove('comic-wipe--exit', 'comic-wipe--rm-flash')
    root.classList.add('comic-wipe--active')

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
      root.classList.add('comic-wipe--exit')
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
      root.classList.remove('comic-wipe--active', 'comic-wipe--exit')
      busy = false
      resolve()
    }, TOTAL_MS)
  })
}

function runReduced(root, onCovered) {
  return new Promise((resolve) => {
    root.classList.add('comic-wipe--active', 'comic-wipe--rm-flash')
    window.setTimeout(() => {
      try {
        onCovered?.()
      } catch {
        /* ignore */
      }
      root.classList.remove('comic-wipe--active', 'comic-wipe--rm-flash', 'comic-wipe--exit')
      busy = false
      resolve()
    }, RM_FLASH_MS)
  })
}

function swapTo(target) {
  const demo = document.querySelector('[data-comic-wipe-demo]')
  if (!demo) return

  const states = demo.querySelectorAll('[data-state]')
  let nextBtn = null
  states.forEach((el) => {
    const match = el.getAttribute('data-state') === target
    el.toggleAttribute('hidden', !match)
    if (match) {
      nextBtn = el.querySelector('[data-comic-wipe-trigger]')
    }
  })
  nextBtn?.focus({ preventScroll: true })
}

function bindTriggers() {
  document.querySelectorAll('[data-comic-wipe-trigger]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-target')
      if (!target) return
      void runComicWipe(() => swapTo(target))
    })
  })
}

bindTriggers()
