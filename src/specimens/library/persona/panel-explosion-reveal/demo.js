/**
 * Panel Explosion Reveal — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 */

const IMPACT_MS = 80
const CRACK_MS = 140 // 80–220
const SEPARATE_MS = 400 // 220–620
const TOTAL_MS = IMPACT_MS + CRACK_MS + SEPARATE_MS + 80

let busy = false
let revealed = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function els() {
  return {
    demo: document.querySelector('[data-panel-burst-demo]'),
    cover: document.querySelector('[data-panel-burst]'),
    trigger: document.querySelector('[data-panel-burst-trigger]'),
  }
}

function clearPhases(cover) {
  cover.classList.remove('is-impact', 'is-crack', 'is-separate')
  cover.querySelectorAll('.panel-burst__panel').forEach((p) => {
    p.style.transform = ''
    p.getAnimations?.().forEach((a) => a.cancel())
  })
}

/**
 * Restore every panel to its interlocking cover pose.
 */
export function resetPanelExplosion() {
  const { demo, cover, trigger } = els()
  if (!demo || !cover) return
  busy = false
  revealed = false
  demo.classList.remove('is-revealed', 'is-separating')
  clearPhases(cover)
  cover.hidden = false
  if (trigger) {
    trigger.disabled = false
    trigger.hidden = false
  }
}

/**
 * Run the break sequence. Idempotent while busy / already revealed.
 * @returns {Promise<void>}
 */
export function runPanelExplosion() {
  if (busy || revealed) return Promise.resolve()
  const { demo, cover, trigger } = els()
  if (!demo || !cover) return Promise.resolve()

  busy = true
  if (trigger) trigger.disabled = true

  if (prefersReducedMotion()) {
    clearPhases(cover)
    cover.hidden = true
    demo.classList.add('is-revealed')
    revealed = true
    busy = false
    return Promise.resolve()
  }

  return new Promise((resolve) => {
    clearPhases(cover)
    cover.hidden = false
    cover.classList.add('is-impact')

    window.setTimeout(() => {
      cover.classList.add('is-crack')
    }, IMPACT_MS)

    window.setTimeout(() => {
      cover.classList.remove('is-impact')
      cover.classList.add('is-separate')
      demo.classList.add('is-separating')
    }, IMPACT_MS + CRACK_MS)

    window.setTimeout(() => {
      cover.hidden = true
      clearPhases(cover)
      demo.classList.remove('is-separating')
      demo.classList.add('is-revealed')
      revealed = true
      busy = false
      resolve()
    }, TOTAL_MS)
  })
}

function bind() {
  const trigger = document.querySelector('[data-panel-burst-trigger]')
  trigger?.addEventListener('click', () => {
    void runPanelExplosion()
  })
}

bind()
