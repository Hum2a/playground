/**
 * Active Bottom-Nav Pill Transfer — single indicator moves between four destinations.
 * Sandbox-safe: no parent, storage, or network.
 */

const PILL_MS = 280
const CONTENT_MS = 240
const NAV_W = 360
const ITEM_COUNT = 4

const PANELS = [
  { heading: 'Overview', body: 'Summary metrics and recent activity for your workspace.' },
  { heading: 'Explore', body: 'Discover trending collections and recommended specimens.' },
  { heading: 'Saved', body: 'Your bookmarked items and pinned references.' },
  { heading: 'More', body: 'Settings, help, and additional navigation options.' },
]

let selected = 0
let transitioning = false
/** @type {number | null} */
let contentTimer = null

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-bottom-nav-pill]')
}

function setStatus(text) {
  const el = document.querySelector('[data-abnpt-status]')
  if (el) el.textContent = text
}

function pillX(index) {
  const slot = NAV_W / ITEM_COUNT
  return slot * index + slot / 2 - 32
}

function applyPill(index, animate) {
  const root = rootEl()
  const pill = document.querySelector('[data-abnpt-pill]')
  if (!root || !pill) return
  root.style.setProperty('--abnpt-pill-x', `${pillX(index)}px`)
  root.classList.toggle('is-animating', animate && !prefersReducedMotion())
}

function updateItems(index) {
  document.querySelectorAll('[data-abnpt-item]').forEach((btn, i) => {
    const active = i === index
    btn.classList.toggle('is-active', active)
    btn.setAttribute('aria-current', active ? 'page' : 'false')
  })
}

function swapContent(index) {
  const heading = document.querySelector('[data-abnpt-heading]')
  const body = document.querySelector('[data-abnpt-body]')
  const content = document.querySelector('[data-abnpt-content]')
  const panel = PANELS[index]
  if (!heading || !body || !content || !panel) return

  const rm = prefersReducedMotion()
  if (rm) {
    heading.textContent = panel.heading
    body.textContent = panel.body
    return
  }

  content.classList.add('is-fading-out')
  if (contentTimer !== null) window.clearTimeout(contentTimer)
  contentTimer = window.setTimeout(() => {
    heading.textContent = panel.heading
    body.textContent = panel.body
    content.classList.remove('is-fading-out')
    content.classList.add('is-fading-in')
    contentTimer = window.setTimeout(() => {
      content.classList.remove('is-fading-in')
      contentTimer = null
    }, CONTENT_MS)
  }, CONTENT_MS * 0.44)
}

export function selectBottomNavItem(index) {
  if (index < 0 || index >= ITEM_COUNT) return
  if (index === selected && !transitioning) return

  const animate = !prefersReducedMotion()
  transitioning = true
  selected = index
  const root = rootEl()
  if (root) root.setAttribute('data-abnpt-index', String(index))

  applyPill(index, animate)
  updateItems(index)
  swapContent(index)
  setStatus(`${PANELS[index].heading} selected.`)

  const duration = animate ? PILL_MS : 0
  window.setTimeout(() => {
    rootEl()?.classList.remove('is-animating')
    transitioning = false
  }, duration)
}

export function resetActiveBottomNavPillTransfer() {
  if (contentTimer !== null) {
    window.clearTimeout(contentTimer)
    contentTimer = null
  }
  selected = 0
  transitioning = false
  const root = rootEl()
  if (root) root.setAttribute('data-abnpt-index', '0')
  applyPill(0, false)
  updateItems(0)
  const heading = document.querySelector('[data-abnpt-heading]')
  const body = document.querySelector('[data-abnpt-body]')
  if (heading) heading.textContent = PANELS[0].heading
  if (body) body.textContent = PANELS[0].body
  document.querySelector('[data-abnpt-content]')?.classList.remove('is-fading-out', 'is-fading-in')
  setStatus('Home selected.')
}

function bindUi() {
  const nav = document.querySelector('[data-abnpt-nav]')
  nav?.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-abnpt-item]')
    if (!btn) return
    const index = Number(btn.getAttribute('data-abnpt-item'))
    selectBottomNavItem(index)
  })

  nav?.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
    e.preventDefault()
    const delta = e.key === 'ArrowRight' ? 1 : -1
    const next = Math.max(0, Math.min(ITEM_COUNT - 1, selected + delta))
    selectBottomNavItem(next)
    const btn = document.querySelector(`[data-abnpt-item="${next}"]`)
    if (btn instanceof HTMLElement) btn.focus()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetActiveBottomNavPillTransfer()
  })
}

bindUi()
resetActiveBottomNavPillTransfer()

export const ACTIVE_BOTTOM_NAV_PILL_TRANSFER_CONTRACT = {
  PILL_MS,
  CONTENT_MS,
  NAV_W,
  PILL_SIZE: { widthPx: 64, heightPx: 32 },
}
