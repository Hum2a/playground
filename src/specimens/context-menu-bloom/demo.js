/**
 * Context Menu Bloom — anchored contextual menu expansion.
 * Sandbox-safe (no parent / storage / network).
 *
 * Anchor 6px · 60ms → boundary 188×176 · 180ms → rows 35ms stagger
 * Dismiss: outside click / ESC · collapse 150ms
 */

const ANCHOR_MS = 60
const EXPAND_MS = 180
const ROW_STAGGER_MS = 35
const DISMISS_MS = 150
const ACTIONS = ['OPEN', 'RENAME', 'DUPLICATE', 'DELETE']

/** @type {number[]} */
let timers = []
let open = false
let busy = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-context-menu-bloom]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
  return id
}

function setStatus(text) {
  const el = document.querySelector('[data-cmb-status]')
  if (el) el.textContent = text
}

function sourceBtn() {
  return document.querySelector('[data-cmb-source]')
}

function menuHost() {
  return document.querySelector('[data-cmb-host]')
}

function menuEl() {
  return document.querySelector('[data-cmb-menu]')
}

function itemEls() {
  return /** @type {HTMLButtonElement[]} */ (
    Array.from(document.querySelectorAll('[data-cmb-item]'))
  )
}

function showMenuInstant() {
  const root = rootEl()
  const host = menuHost()
  const menu = menuEl()
  const source = sourceBtn()
  if (!root || !host || !menu || !source) return

  host.hidden = false
  menu.hidden = false
  root.setAttribute('data-phase', 'open')
  host.classList.add('is-active')
  source.setAttribute('aria-expanded', 'true')
  itemEls().forEach((item, i) => {
    item.classList.add('is-visible')
    item.classList.toggle('is-active', i === 0)
    item.tabIndex = i === 0 ? 0 : -1
  })
  itemEls()[0]?.focus()
  setStatus('Context menu open. Four actions available.')
  open = true
  busy = false
}

function hideMenuInstant() {
  const root = rootEl()
  const host = menuHost()
  const menu = menuEl()
  const source = sourceBtn()
  if (!root || !host || !menu || !source) return

  root.setAttribute('data-phase', 'idle')
  host.classList.remove('is-active')
  host.hidden = true
  menu.hidden = true
  source.setAttribute('aria-expanded', 'false')
  itemEls().forEach((item) => {
    item.classList.remove('is-visible', 'is-active')
    item.tabIndex = -1
  })
  source.focus()
  setStatus('Context menu closed.')
  open = false
  busy = false
}

export function openContextMenuBloom() {
  const root = rootEl()
  const host = menuHost()
  const menu = menuEl()
  const source = sourceBtn()
  if (!root || !host || !menu || !source || open || busy) return

  busy = true
  clearTimers()
  host.hidden = false
  menu.hidden = false
  source.setAttribute('aria-expanded', 'true')
  host.classList.add('is-active')

  if (prefersReducedMotion()) {
    showMenuInstant()
    return
  }

  root.setAttribute('data-phase', 'anchor')
  setStatus('Anchor constructing.')

  later(ANCHOR_MS, () => {
    root.setAttribute('data-phase', 'expanding')
    setStatus('Menu boundary expanding.')
  })

  later(ANCHOR_MS + EXPAND_MS, () => {
    root.setAttribute('data-phase', 'open')
    itemEls().forEach((item, i) => {
      later(i * ROW_STAGGER_MS, () => {
        item.classList.add('is-visible')
        item.classList.toggle('is-active', i === 0)
        if (i === 0) item.tabIndex = 0
      })
    })
    later((ACTIONS.length - 1) * ROW_STAGGER_MS + 20, () => {
      itemEls()[0]?.focus()
      setStatus('Context menu open. Four actions available.')
      open = true
      busy = false
    })
  })
}

export function dismissContextMenuBloom() {
  const root = rootEl()
  if (!root || !open || busy) return

  busy = true
  clearTimers()

  if (prefersReducedMotion()) {
    hideMenuInstant()
    return
  }

  root.setAttribute('data-phase', 'dismissing')
  setStatus('Menu collapsing toward anchor.')
  itemEls().forEach((item) => {
    item.classList.remove('is-visible', 'is-active')
    item.tabIndex = -1
  })

  later(DISMISS_MS, () => {
    hideMenuInstant()
  })
}

function bindUi() {
  const source = sourceBtn()
  source?.addEventListener('click', (event) => {
    event.stopPropagation()
    if (open) dismissContextMenuBloom()
    else openContextMenuBloom()
  })

  document.addEventListener('click', (event) => {
    if (!open) return
    const target = /** @type {Node | null} */ (event.target)
    const menu = menuEl()
    const src = sourceBtn()
    if (menu?.contains(target) || src?.contains(target)) return
    dismissContextMenuBloom()
  })

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && open) {
      event.preventDefault()
      dismissContextMenuBloom()
      return
    }
    if (!open) return
    const items = itemEls().filter((item) => item.classList.contains('is-visible'))
    const current = document.activeElement
    const idx = items.indexOf(/** @type {HTMLButtonElement} */ (current))
    if (event.key === 'ArrowDown' && idx >= 0) {
      event.preventDefault()
      const next = items[(idx + 1) % items.length]
      items.forEach((item) => {
        item.tabIndex = -1
        item.classList.remove('is-active')
      })
      next.tabIndex = 0
      next.classList.add('is-active')
      next.focus()
    }
    if (event.key === 'ArrowUp' && idx >= 0) {
      event.preventDefault()
      const prev = items[(idx - 1 + items.length) % items.length]
      items.forEach((item) => {
        item.tabIndex = -1
        item.classList.remove('is-active')
      })
      prev.tabIndex = 0
      prev.classList.add('is-active')
      prev.focus()
    }
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') dismissContextMenuBloom()
  })
}

bindUi()
hideMenuInstant()

export const CONTEXT_MENU_BLOOM_CONTRACT = {
  ANCHOR_MS,
  EXPAND_MS,
  ROW_STAGGER_MS,
  DISMISS_MS,
  MENU_SIZE: { width: 188, height: 176 },
  ACTIONS,
}
