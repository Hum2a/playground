/**
 * Rail Page Snap (SPX-3136) — tiny portable interaction.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 *
 * A scroll-snap rail advances by exactly one card boundary per NEXT/PREV
 * click and settles precisely on that boundary even after a manual drag
 * scroll (rounded to the nearest card on scroll end).
 */

const CARD_WIDTH = 120
const GAP = 12
const STEP = CARD_WIDTH + GAP
const COUNT = 6

let index = 0
let scrollTimer = null

function rootEl() {
  return document.querySelector('[data-rail-page-snap]')
}

function prefersReducedMotion() {
  const forced = document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function render(root) {
  const prev = root.querySelector('[data-rps-prev]')
  const next = root.querySelector('[data-rps-next]')
  if (prev) prev.disabled = index === 0
  if (next) next.disabled = index === COUNT - 1

  const status = root.querySelector('[data-rps-status]')
  if (status) status.textContent = `Card ${index + 1} of ${COUNT}`
}

function goTo(root, next) {
  index = Math.max(0, Math.min(COUNT - 1, next))
  const viewport = root.querySelector('[data-rps-viewport]')
  viewport?.scrollTo({
    left: index * STEP,
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
  })
  render(root)
}

function bindUi() {
  const root = rootEl()
  if (!root) return
  const viewport = root.querySelector('[data-rps-viewport]')

  root.querySelector('[data-rps-prev]')?.addEventListener('click', () => goTo(root, index - 1))
  root.querySelector('[data-rps-next]')?.addEventListener('click', () => goTo(root, index + 1))

  viewport?.addEventListener('scroll', () => {
    window.clearTimeout(scrollTimer)
    scrollTimer = window.setTimeout(() => {
      const nearest = Math.round(viewport.scrollLeft / STEP)
      index = Math.max(0, Math.min(COUNT - 1, nearest))
      viewport.scrollTo({ left: index * STEP, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
      render(root)
    }, 120)
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      index = 0
      viewport?.scrollTo({ left: 0, behavior: 'auto' })
      render(root)
    }
  })

  render(root)
}

bindUi()
