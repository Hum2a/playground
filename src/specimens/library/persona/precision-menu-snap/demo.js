/**
 * Precision Menu Snap — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 */

const CONTRACT_MS = 90
const SNAP_MS = 110
const RECOIL_MS = 60
/** Full selection change ≈ CONTRACT + SNAP + RECOIL = 260ms */

let busy = false
let bound = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function getRoot() {
  return document.querySelector('[data-precision-menu]')
}

function getOptions(root) {
  return Array.from(root.querySelectorAll('[data-precision-menu-option]'))
}

function clearPhaseClasses(options) {
  for (const opt of options) {
    opt.classList.remove('pms__option--exit', 'pms__option--enter', 'pms__option--selected')
  }
}

/**
 * @param {number} index — 0–3
 * @returns {Promise<void>}
 */
export function selectPrecisionMenu(index) {
  const root = getRoot()
  if (!root) return Promise.resolve()

  const options = getOptions(root)
  const next = Math.max(0, Math.min(options.length - 1, index | 0))
  const currentAttr = root.getAttribute('data-selected')
  const current = currentAttr == null ? 0 : Number(currentAttr)

  if (next === current && options[next]?.classList.contains('pms__option--selected')) {
    return Promise.resolve()
  }

  if (busy && !prefersReducedMotion()) return Promise.resolve()

  if (prefersReducedMotion()) {
    applyImmediate(root, options, next)
    return Promise.resolve()
  }

  busy = true
  root.classList.add('pms--settling')
  root.classList.remove('pms--recoil')

  const prev = options[current]
  const incoming = options[next]

  if (prev) {
    prev.classList.add('pms__option--exit')
    prev.classList.remove('pms__option--selected', 'pms__option--enter')
    prev.setAttribute('aria-checked', 'false')
    prev.tabIndex = -1
  }

  root.setAttribute('data-selected', String(next))

  return new Promise((resolve) => {
    window.setTimeout(() => {
      if (prev) prev.classList.remove('pms__option--exit')

      if (incoming) {
        incoming.classList.add('pms__option--enter', 'pms__option--selected')
        incoming.setAttribute('aria-checked', 'true')
        incoming.tabIndex = 0
      }

      window.setTimeout(() => {
        if (incoming) incoming.classList.remove('pms__option--enter')
        root.classList.add('pms--recoil')
        window.setTimeout(() => {
          root.classList.remove('pms--settling', 'pms--recoil')
          busy = false
          resolve()
        }, RECOIL_MS)
      }, SNAP_MS)
    }, CONTRACT_MS)
  })
}

function applyImmediate(root, options, next) {
  clearPhaseClasses(options)
  root.classList.remove('pms--settling', 'pms--recoil')
  root.setAttribute('data-selected', String(next))

  options.forEach((opt, i) => {
    const selected = i === next
    opt.classList.toggle('pms__option--selected', selected)
    opt.setAttribute('aria-checked', selected ? 'true' : 'false')
    opt.tabIndex = selected ? 0 : -1
  })
  busy = false
}

function moveSelection(root, delta) {
  const options = getOptions(root)
  const current = Number(root.getAttribute('data-selected') || '0')
  const next = (current + delta + options.length) % options.length
  void selectPrecisionMenu(next).then(() => {
    options[next]?.focus({ preventScroll: true })
  })
}

function jumpSelection(root, index) {
  const options = getOptions(root)
  void selectPrecisionMenu(index).then(() => {
    options[index]?.focus({ preventScroll: true })
  })
}

export function initPrecisionMenu() {
  const root = getRoot()
  if (!root || bound) return
  bound = true

  if (!root.hasAttribute('data-selected')) {
    root.setAttribute('data-selected', '0')
  }

  const options = getOptions(root)
  options.forEach((opt, i) => {
    opt.addEventListener('click', () => {
      void selectPrecisionMenu(i).then(() => {
        opt.focus({ preventScroll: true })
      })
    })
  })

  const rail = root.querySelector('[data-precision-menu-rail]')
  rail?.addEventListener('keydown', (event) => {
    const key = event.key
    if (key === 'ArrowDown' || key === 'ArrowRight') {
      event.preventDefault()
      moveSelection(root, 1)
    } else if (key === 'ArrowUp' || key === 'ArrowLeft') {
      event.preventDefault()
      moveSelection(root, -1)
    } else if (key === 'Home') {
      event.preventDefault()
      jumpSelection(root, 0)
    } else if (key === 'End') {
      event.preventDefault()
      jumpSelection(root, options.length - 1)
    }
  })
}

initPrecisionMenu()
