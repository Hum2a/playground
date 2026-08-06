/**
 * Notification Expand — compact notification expands into actionable detail.
 * Sandbox-safe (no parent / storage / network).
 *
 * Compact 330×76 · expanded 330×184 · height 280ms · details after 120px
 */

const EXPAND_MS = 280
const DETAIL_THRESHOLD_PX = 120
const BUTTON_STAGGER_MS = 40
const COMPACT_H = 76
const EXPANDED_H = 184

let expanded = false
let busy = false
/** @type {number | null} */
let timerId = null

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-notification-expand]')
}

function setStatus(text) {
  const el = document.querySelector('[data-nex-status]')
  if (el) el.textContent = text
}

function clearTimer() {
  if (timerId !== null) {
    window.clearTimeout(timerId)
    timerId = null
  }
}

function updateA11y() {
  const card = document.querySelector('[data-nex-card]')
  const details = document.querySelector('[data-nex-details]')
  const closeBtn = document.querySelector('[data-nex-close]')
  if (!card) return
  card.setAttribute('aria-expanded', expanded ? 'true' : 'false')
  if (details) details.setAttribute('aria-hidden', expanded ? 'false' : 'true')
  if (closeBtn) closeBtn.hidden = !expanded
}

export function expandNotification() {
  const root = rootEl()
  if (!root || expanded || busy) return

  busy = true
  clearTimer()
  root.setAttribute('data-phase', 'expanding')
  setStatus('Expanding notification.')

  const finish = () => {
    root.setAttribute('data-phase', 'expanded')
    expanded = true
    updateA11y()
    setStatus('Expanded. Actions available.')
    busy = false
  }

  if (prefersReducedMotion()) {
    finish()
    return
  }

  timerId = window.setTimeout(finish, EXPAND_MS)
}

export function collapseNotification() {
  const root = rootEl()
  if (!root || !expanded || busy) return

  busy = true
  clearTimer()
  root.setAttribute('data-phase', 'collapsing')
  setStatus('Collapsing notification.')

  const finish = () => {
    root.setAttribute('data-phase', 'compact')
    expanded = false
    updateA11y()
    setStatus('Compact notification. Click to expand.')
    busy = false
  }

  if (prefersReducedMotion()) {
    finish()
    return
  }

  timerId = window.setTimeout(finish, EXPAND_MS)
}

function bindUi() {
  const card = document.querySelector('[data-nex-card]')
  const closeBtn = document.querySelector('[data-nex-close]')

  card?.addEventListener('click', (event) => {
    if (expanded) return
    const target = /** @type {HTMLElement} */ (event.target)
    if (target.closest('[data-nex-close]') || target.closest('.nex__btn')) return
    expandNotification()
  })

  card?.addEventListener('keydown', (event) => {
    if (expanded) return
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      expandNotification()
    }
  })

  closeBtn?.addEventListener('click', (event) => {
    event.stopPropagation()
    collapseNotification()
  })

  document.querySelector('[data-nex-open]')?.addEventListener('click', (event) => {
    event.stopPropagation()
    setStatus('OPEN action selected.')
  })

  document.querySelector('[data-nex-approve]')?.addEventListener('click', (event) => {
    event.stopPropagation()
    setStatus('APPROVE action selected.')
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart' && expanded) collapseNotification()
  })
}

bindUi()
updateA11y()

export const NOTIFICATION_EXPAND_CONTRACT = {
  EXPAND_MS,
  DETAIL_THRESHOLD_PX,
  BUTTON_STAGGER_MS,
  COMPACT: { width: 330, height: COMPACT_H },
  EXPANDED: { width: 330, height: EXPANDED_H },
}
