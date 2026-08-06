/**
 * Crooked Menu Stack — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 */

const CONTRACT_MS = 90
const ATTACK_MS = 140
const NEIGHBOR_MS = 140
const SETTLE_MS = 40
/** Total ≈ 320ms */

let busy = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function root() {
  return document.querySelector('[data-crooked-menu]')
}

function items(el) {
  return Array.from(el.querySelectorAll('[data-cms-item]'))
}

function applySelection(el, list, index, { animate }) {
  const next = Math.max(0, Math.min(list.length - 1, index))
  el.setAttribute('data-selected', String(next))

  list.forEach((btn, i) => {
    const on = i === next
    btn.classList.toggle('cms__item--active', on)
    btn.setAttribute('aria-checked', on ? 'true' : 'false')
    btn.tabIndex = on ? 0 : -1
    if (!animate) {
      btn.classList.remove('cms__item--exit', 'cms__item--enter')
    }
  })
}

/**
 * Select a menu index (0–4). Recomposition moves neighbours via CSS data-selected.
 * @param {number} index
 * @returns {Promise<void>}
 */
export function selectCrookedMenu(index) {
  const el = root()
  if (!el) return Promise.resolve()

  const list = items(el)
  const next = Math.max(0, Math.min(list.length - 1, index | 0))
  const prev = Number(el.getAttribute('data-selected') ?? '0')

  if (next === prev && list[next]?.classList.contains('cms__item--active')) {
    return Promise.resolve()
  }

  if (prefersReducedMotion()) {
    busy = false
    el.classList.remove('cms--settling', 'cms--settle')
    applySelection(el, list, next, { animate: false })
    return Promise.resolve()
  }

  if (busy) return Promise.resolve()
  busy = true
  el.classList.add('cms--settling')
  el.classList.remove('cms--settle')

  const outgoing = list[prev]
  const incoming = list[next]

  if (outgoing) {
    outgoing.classList.add('cms__item--exit')
    outgoing.classList.remove('cms__item--active', 'cms__item--enter')
    outgoing.setAttribute('aria-checked', 'false')
    outgoing.tabIndex = -1
  }

  // Neighbours begin moving as soon as data-selected updates
  el.setAttribute('data-selected', String(next))

  return new Promise((resolve) => {
    window.setTimeout(() => {
      if (outgoing) outgoing.classList.remove('cms__item--exit')

      if (incoming) {
        incoming.classList.add('cms__item--enter', 'cms__item--active')
        incoming.setAttribute('aria-checked', 'true')
        incoming.tabIndex = 0
      }

      window.setTimeout(() => {
        if (incoming) incoming.classList.remove('cms__item--enter')
        el.classList.add('cms--settle')
        window.setTimeout(() => {
          el.classList.remove('cms--settling', 'cms--settle')
          busy = false
          resolve()
        }, SETTLE_MS)
      }, ATTACK_MS + NEIGHBOR_MS - 70)
    }, CONTRACT_MS)
  })
}

function bind() {
  const el = root()
  if (!el) return
  const rail = el.querySelector('[data-cms-rail]')
  const list = items(el)

  list.forEach((btn) => {
    btn.addEventListener('click', () => {
      const index = Number(btn.getAttribute('data-index') ?? '0')
      void selectCrookedMenu(index)
    })
  })

  rail?.addEventListener('keydown', (event) => {
    const current = Number(el.getAttribute('data-selected') ?? '0')
    let next = current
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault()
      next = (current + 1) % list.length
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
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
    void selectCrookedMenu(next).then(() => {
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
    applySelection(el, items(el), 0, { animate: false })
    el.classList.remove('cms--settling', 'cms--settle')
  }
})

bind()
