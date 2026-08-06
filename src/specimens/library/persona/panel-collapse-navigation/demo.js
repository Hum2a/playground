/**
 * Panel Collapse Navigation — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 */

const COVERED_MS = 550
const EXIT_MS = 600
const TOTAL_MS = 980
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
export function runPanelCollapse(onCovered) {
  if (busy) return Promise.resolve()

  const root = document.querySelector('[data-panel-collapse]')
  const demo = document.querySelector('[data-panel-collapse-demo]')
  if (!root || !demo) return Promise.resolve()

  busy = true

  if (prefersReducedMotion()) {
    return runReduced(root, demo, onCovered)
  }

  return new Promise((resolve) => {
    root.classList.remove('panel-collapse--exit', 'panel-collapse--rm-flash')
    demo.classList.remove('panel-collapse-demo--crushing', 'panel-collapse-demo--covered')
    void root.offsetWidth

    root.classList.add('panel-collapse--active')
    demo.classList.add('panel-collapse-demo--crushing')

    let covered = false
    const coverTimer = window.setTimeout(() => {
      covered = true
      demo.classList.add('panel-collapse-demo--covered')
      try {
        onCovered?.()
      } catch {
        /* keep transition resilient */
      }
    }, COVERED_MS)

    const exitTimer = window.setTimeout(() => {
      root.classList.add('panel-collapse--exit')
      demo.classList.remove('panel-collapse-demo--crushing', 'panel-collapse-demo--covered')
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
      root.classList.remove('panel-collapse--active', 'panel-collapse--exit')
      demo.classList.remove('panel-collapse-demo--crushing', 'panel-collapse-demo--covered')
      busy = false
      resolve()
    }, TOTAL_MS)
  })
}

function runReduced(root, demo, onCovered) {
  return new Promise((resolve) => {
    root.classList.add('panel-collapse--active', 'panel-collapse--rm-flash')
    demo.classList.add('panel-collapse-demo--covered')
    window.setTimeout(() => {
      try {
        onCovered?.()
      } catch {
        /* ignore */
      }
      root.classList.remove('panel-collapse--active', 'panel-collapse--rm-flash', 'panel-collapse--exit')
      demo.classList.remove('panel-collapse-demo--crushing', 'panel-collapse-demo--covered')
      busy = false
      resolve()
    }, RM_FLASH_MS)
  })
}

function swapTo(target) {
  const demo = document.querySelector('[data-panel-collapse-demo]')
  if (!demo) return

  const states = demo.querySelectorAll('[data-state]')
  let nextBtn = null
  states.forEach((el) => {
    const match = el.getAttribute('data-state') === target
    el.toggleAttribute('hidden', !match)
    if (match) {
      nextBtn = el.querySelector('[data-panel-collapse-trigger]')
    }
  })
  nextBtn?.focus({ preventScroll: true })
}

function bindTriggers() {
  document.querySelectorAll('[data-panel-collapse-trigger]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-target')
      if (!target) return
      void runPanelCollapse(() => swapTo(target))
    })
  })
}

bindTriggers()
