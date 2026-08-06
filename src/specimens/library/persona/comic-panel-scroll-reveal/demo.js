/**
 * Comic Panel Scroll Reveal — tiny portable API.
 * Observes the specimen's own scroll container only (sandbox-safe).
 */

const THRESHOLD = 0.35

/** @type {IntersectionObserver | null} */
let observer = null

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function root() {
  return document.querySelector('[data-comic-panel-scroll]')
}

function scroller(el) {
  return el?.querySelector('[data-cpsr-scroller]') ?? null
}

function sections(el) {
  return Array.from(el.querySelectorAll('[data-cpsr-section]'))
}

function revealSection(section) {
  if (section.classList.contains('cpsr__section--revealed')) return
  section.classList.add('cpsr__section--revealed')
  section.setAttribute('data-revealed', 'true')
}

function coverAll(el) {
  sections(el).forEach((section) => {
    section.classList.remove('cpsr__section--revealed')
    section.removeAttribute('data-revealed')
  })
}

function disconnectObserver() {
  if (observer) {
    observer.disconnect()
    observer = null
  }
}

function bindObserver(el) {
  disconnectObserver()
  const rail = scroller(el)
  if (!rail || prefersReducedMotion()) return

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        if (entry.intersectionRatio < THRESHOLD) return
        const section = entry.target
        if (!(section instanceof HTMLElement)) return
        if (section.getAttribute('data-revealed') === 'true') return
        revealSection(section)
        observer?.unobserve(section)
      })
    },
    {
      root: rail,
      threshold: [THRESHOLD],
    },
  )

  sections(el).forEach((section) => {
    if (section.getAttribute('data-revealed') === 'true') return
    observer?.observe(section)
  })
}

/**
 * Reset scroll position, restore covers, and re-arm observers.
 */
export function resetComicPanelScroll() {
  const el = root()
  if (!el) return
  const rail = scroller(el)
  coverAll(el)
  if (rail) rail.scrollTop = 0

  if (prefersReducedMotion()) {
    disconnectObserver()
    sections(el).forEach((section) => revealSection(section))
    return
  }

  bindObserver(el)
}

function init() {
  const el = root()
  if (!el) return

  if (prefersReducedMotion()) {
    sections(el).forEach((section) => revealSection(section))
    return
  }

  bindObserver(el)
}

window.addEventListener('message', (event) => {
  const data = event.data
  if (!data || typeof data !== 'object') return
  if (data.type === 'restart') {
    resetComicPanelScroll()
  }
})

init()
