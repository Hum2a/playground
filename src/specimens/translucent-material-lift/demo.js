/**
 * Translucent Material Lift — layered translucent panel with subtle spatial lift.
 * Sandbox-safe (no parent / storage / network).
 */

const PANEL_W = 286
const PANEL_H = 214
const OPEN_MS = 220

/** @type {number | null} */
let closeTimer = null

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-translucent-material]')
}

function hostEl() {
  return document.querySelector('[data-tml-host]')
}

function panelEl() {
  return document.querySelector('[data-tml-panel]')
}

function backdropEl() {
  return document.querySelector('[data-tml-backdrop]')
}

function statusEl() {
  return document.querySelector('[data-tml-status]')
}

function setPhase(phase) {
  const root = rootEl()
  if (root) root.setAttribute('data-phase', phase)
}

function setStatus(text) {
  const el = statusEl()
  if (el) el.textContent = text
}

export function openTranslucentPanel() {
  const panel = panelEl()
  const backdrop = backdropEl()
  const host = hostEl()
  if (!panel || !backdrop || !host) return

  setPhase('open')
  backdrop.hidden = false
  panel.showModal()
  host.classList.add('is-receded')

  if (prefersReducedMotion()) {
    panel.classList.add('is-open')
    setStatus('Filters panel open. Underlying grid remains visible.')
    return
  }

  panel.classList.add('is-opening')
  window.setTimeout(() => {
    panel.classList.remove('is-opening')
    panel.classList.add('is-open')
  }, OPEN_MS)
  setStatus('Filters panel opening with material lift.')
}

export function closeTranslucentPanel() {
  const panel = panelEl()
  const backdrop = backdropEl()
  const host = hostEl()
  if (!panel || !backdrop || !host) return

  if (prefersReducedMotion()) {
    panel.close()
    panel.classList.remove('is-open', 'is-opening')
    backdrop.hidden = true
    host.classList.remove('is-receded')
    setPhase('closed')
    setStatus('Dense document grid behind. Open filters panel.')
    return
  }

  setPhase('closing')
  panel.classList.remove('is-open')
  panel.classList.add('is-closing')
  host.classList.remove('is-receded')

  if (closeTimer !== null) window.clearTimeout(closeTimer)
  closeTimer = window.setTimeout(() => {
    panel.close()
    panel.classList.remove('is-closing')
    backdrop.hidden = true
    setPhase('closed')
    setStatus('Dense document grid behind. Open filters panel.')
    closeTimer = null
  }, OPEN_MS)
}

export function resetTranslucentMaterialLift() {
  closeTranslucentPanel()
}

function bindUi() {
  const open = document.querySelector('[data-tml-open]')
  const close = document.querySelector('[data-tml-close]')
  const panel = panelEl()

  if (open) open.addEventListener('click', () => openTranslucentPanel())
  if (close) close.addEventListener('click', () => closeTranslucentPanel())
  if (panel) {
    panel.addEventListener('cancel', (e) => {
      e.preventDefault()
      closeTranslucentPanel()
    })
  }

  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      resetTranslucentMaterialLift()
    }
  })
}

bindUi()

export const TRANSLUCENT_MATERIAL_LIFT_CONTRACT = {
  PANEL_W,
  PANEL_H,
  OPEN_MS,
}
