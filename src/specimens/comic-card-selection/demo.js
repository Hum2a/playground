/**
 * Comic Card Selection — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 */

const CONTRACT_MS = 100
const ATTACK_MS = 170
const NEIGHBOR_MS = 170
const SETTLE_MS = 30
/** Total ≈ 300ms (contract 0–100; attack 70–240; neighbours 100–270; settle 270–300) */

let busy = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function root() {
  return document.querySelector('[data-comic-card-selection]')
}

function cards(el) {
  return Array.from(el.querySelectorAll('[data-ccs-card]'))
}

function applySelection(el, list, index, { animate }) {
  const next = Math.max(0, Math.min(list.length - 1, index))
  el.setAttribute('data-selected', String(next))

  list.forEach((btn, i) => {
    const on = i === next
    btn.classList.toggle('ccs__card--active', on)
    btn.setAttribute('aria-checked', on ? 'true' : 'false')
    btn.tabIndex = on ? 0 : -1
    if (!animate) {
      btn.classList.remove('ccs__card--exit', 'ccs__card--enter')
    }
  })
}

/**
 * Select a comic card index (0–2). Neighbours recompose via CSS data-selected.
 * @param {number} index
 * @returns {Promise<void>}
 */
export function selectComicCard(index) {
  const el = root()
  if (!el) return Promise.resolve()

  const list = cards(el)
  const next = Math.max(0, Math.min(list.length - 1, index | 0))
  const prev = Number(el.getAttribute('data-selected') ?? '0')

  if (next === prev && list[next]?.classList.contains('ccs__card--active')) {
    return Promise.resolve()
  }

  if (prefersReducedMotion()) {
    busy = false
    el.classList.remove('ccs--settling', 'ccs--settle')
    applySelection(el, list, next, { animate: false })
    return Promise.resolve()
  }

  if (busy) return Promise.resolve()
  busy = true
  el.classList.add('ccs--settling')
  el.classList.remove('ccs--settle')

  const outgoing = list[prev]
  const incoming = list[next]

  if (outgoing) {
    outgoing.classList.add('ccs__card--exit')
    outgoing.classList.remove('ccs__card--active', 'ccs__card--enter')
    outgoing.setAttribute('aria-checked', 'false')
    outgoing.tabIndex = -1
  }

  // Neighbours begin moving as soon as data-selected updates (≈100–270ms window)
  el.setAttribute('data-selected', String(next))

  return new Promise((resolve) => {
    window.setTimeout(() => {
      if (outgoing) outgoing.classList.remove('ccs__card--exit')

      if (incoming) {
        incoming.classList.add('ccs__card--enter', 'ccs__card--active')
        incoming.setAttribute('aria-checked', 'true')
        incoming.tabIndex = 0
      }

      window.setTimeout(() => {
        if (incoming) incoming.classList.remove('ccs__card--enter')
        el.classList.add('ccs--settle')
        window.setTimeout(() => {
          el.classList.remove('ccs--settling', 'ccs--settle')
          busy = false
          resolve()
        }, SETTLE_MS)
      }, Math.max(ATTACK_MS, NEIGHBOR_MS) - 30)
    }, CONTRACT_MS)
  })
}

function bind() {
  const el = root()
  if (!el) return
  const rail = el.querySelector('[data-ccs-rail]')
  const list = cards(el)

  list.forEach((btn) => {
    btn.addEventListener('click', () => {
      const index = Number(btn.getAttribute('data-index') ?? '0')
      void selectComicCard(index)
    })
  })

  rail?.addEventListener('keydown', (event) => {
    const current = Number(el.getAttribute('data-selected') ?? '0')
    let next = current
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault()
      next = (current + 1) % list.length
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault()
      next = (current - 1 + list.length) % list.length
    } else if (event.key === 'Home') {
      event.preventDefault()
      next = 0
    } else if (event.key === 'End') {
      event.preventDefault()
      next = list.length - 1
    } else {
      return
    }
    void selectComicCard(next).then(() => {
      list[next]?.focus({ preventScroll: true })
    })
  })
}

window.addEventListener('message', (event) => {
  const data = event.data
  if (!data || typeof data !== 'object') return
  if (data.type === 'restart') {
    const el = root()
    if (!el) return
    busy = false
    applySelection(el, cards(el), 0, { animate: false })
    el.classList.remove('ccs--settling', 'ccs--settle')
  }
})

bind()
