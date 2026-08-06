/**
 * Azure Shard Transition — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 */

const COVERED_MS = 560
const EXIT_MS = 650
const TOTAL_MS = 1250
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
export function runShardTransition(onCovered) {
  if (busy) return Promise.resolve()

  const root = document.querySelector('[data-azure-shard]')
  if (!root) return Promise.resolve()

  busy = true

  if (prefersReducedMotion()) {
    return runReduced(root, onCovered)
  }

  return new Promise((resolve) => {
    root.classList.remove('azure-shard--exit', 'azure-shard--rm-flash')
    root.classList.add('azure-shard--active')

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
      root.classList.add('azure-shard--exit')
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
      root.classList.remove('azure-shard--active', 'azure-shard--exit')
      busy = false
      resolve()
    }, TOTAL_MS)
  })
}

function runReduced(root, onCovered) {
  return new Promise((resolve) => {
    root.classList.add('azure-shard--active', 'azure-shard--rm-flash')
    window.setTimeout(() => {
      try {
        onCovered?.()
      } catch {
        /* ignore */
      }
      root.classList.remove('azure-shard--active', 'azure-shard--rm-flash', 'azure-shard--exit')
      busy = false
      resolve()
    }, RM_FLASH_MS)
  })
}

function swapTo(target) {
  const demo = document.querySelector('[data-azure-shard-demo]')
  if (!demo) return

  const states = demo.querySelectorAll('[data-state]')
  let nextBtn = null
  states.forEach((el) => {
    const match = el.getAttribute('data-state') === target
    el.toggleAttribute('hidden', !match)
    if (match) {
      nextBtn = el.querySelector('[data-azure-shard-trigger]')
    }
  })
  nextBtn?.focus({ preventScroll: true })
}

function bindTriggers() {
  document.querySelectorAll('[data-azure-shard-trigger]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-target')
      if (!target) return
      void runShardTransition(() => swapTo(target))
    })
  })
}

bindTriggers()
