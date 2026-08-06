/**
 * Window Snap Preview — drag window near left zone shows snap preview.
 * Sandbox-safe (no parent / storage / network).
 *
 * Desktop 520×380 · window 260×190 · zone 54px · preview 120ms · commit 260ms
 */

const DESKTOP_W = 520
const DESKTOP_H = 380
const WINDOW_W = 260
const WINDOW_H = 190
const ZONE_W = 54
const PREVIEW_IN_MS = 120
const PREVIEW_OUT_MS = 90
const COMMIT_MS = 260
const PREVIEW_LEFT = 10
const PREVIEW_TOP = 10
const PREVIEW_W = (DESKTOP_W - 30) / 2
const PREVIEW_H = DESKTOP_H - 20

let phase = 'idle'
let dragging = false
let previewVisible = false
/** @type {{ x: number; y: number } | null} */
let dragOffset = null
/** @type {{ left: number; top: number } | null} */
let freePos = { left: 130, top: 95 }

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-window-snap-preview]')
}

function setStatus(text) {
  const el = document.querySelector('[data-wsp-status]')
  if (el) el.textContent = text
}

function setPhase(next) {
  phase = next
  rootEl()?.setAttribute('data-phase', next)
}

function windowEl() {
  return document.querySelector('[data-wsp-window]')
}

function setWindowPos(left, top) {
  const win = windowEl()
  if (!win) return
  win.style.left = `${left}px`
  win.style.top = `${top}px`
}

function pointerInZone(clientX) {
  const desktop = document.querySelector('[data-wsp-desktop]')
  if (!desktop) return false
  const rect = desktop.getBoundingClientRect()
  return clientX - rect.left <= ZONE_W
}

function showPreview() {
  const preview = document.querySelector('[data-wsp-preview]')
  if (!preview || previewVisible) return
  preview.hidden = false
  preview.setAttribute('aria-hidden', 'false')
  preview.classList.remove('is-hiding')
  previewVisible = true
  setPhase('preview')
  setStatus('Snap preview active. Release to commit.')
}

function hidePreview() {
  const preview = document.querySelector('[data-wsp-preview]')
  if (!preview || !previewVisible) return
  preview.classList.add('is-hiding')
  previewVisible = false
  setPhase('idle')
  setStatus('Drag EDITOR near left edge for snap preview.')

  window.setTimeout(() => {
    if (!previewVisible) {
      preview.hidden = true
      preview.setAttribute('aria-hidden', 'true')
      preview.classList.remove('is-hiding')
    }
  }, prefersReducedMotion() ? 0 : PREVIEW_OUT_MS)
}

function commitSnap() {
  setPhase('snapped')
  hidePreview()
  setWindowPos(PREVIEW_LEFT, PREVIEW_TOP)
  const win = windowEl()
  if (win) {
    win.style.width = `${PREVIEW_W}px`
    win.style.height = `${PREVIEW_H}px`
  }
  setStatus('Window snapped to left half.')
}

function bindDrag() {
  const win = windowEl()
  if (!win) return

  win.addEventListener('pointerdown', (event) => {
    if (phase === 'snapped') return
    dragging = true
    win.classList.add('is-grabbing')
    const rect = win.getBoundingClientRect()
    const desktop = document.querySelector('[data-wsp-desktop]')
    const desktopRect = desktop?.getBoundingClientRect()
    if (!desktopRect) return
    dragOffset = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }
    win.setPointerCapture(event.pointerId)
  })

  win.addEventListener('pointermove', (event) => {
    if (!dragging || !dragOffset) return
    const desktop = document.querySelector('[data-wsp-desktop]')
    if (!desktop) return
    const desktopRect = desktop.getBoundingClientRect()
    const left = event.clientX - desktopRect.left - dragOffset.x
    const top = event.clientY - desktopRect.top - dragOffset.y
    setWindowPos(left, top)
    freePos = { left, top }

    if (pointerInZone(event.clientX)) {
      showPreview()
    } else if (previewVisible) {
      hidePreview()
    }
  })

  const onPointerUp = (event) => {
    if (!dragging) return
    dragging = false
    win.classList.remove('is-grabbing')
    dragOffset = null

    if (previewVisible || pointerInZone(event.clientX)) {
      if (prefersReducedMotion()) {
        commitSnap()
      } else {
        window.setTimeout(commitSnap, 0)
      }
    } else {
      setStatus('Window released at free position.')
    }
  }

  win.addEventListener('pointerup', onPointerUp)
  win.addEventListener('pointercancel', onPointerUp)
}

export function resetWindowSnap() {
  const win = windowEl()
  if (win) {
    win.style.width = `${WINDOW_W}px`
    win.style.height = `${WINDOW_H}px`
  }
  setWindowPos(130, 95)
  freePos = { left: 130, top: 95 }
  previewVisible = false
  const preview = document.querySelector('[data-wsp-preview]')
  if (preview) {
    preview.hidden = true
    preview.setAttribute('aria-hidden', 'true')
  }
  setPhase('idle')
  setStatus('Drag EDITOR near left edge for snap preview.')
}

bindDrag()

window.addEventListener('message', (event) => {
  const data = event.data
  if (!data || typeof data !== 'object') return
  if (data.type === 'restart') resetWindowSnap()
})

export const WINDOW_SNAP_PREVIEW_CONTRACT = {
  DESKTOP_W,
  DESKTOP_H,
  WINDOW_W,
  WINDOW_H,
  ZONE_W,
  PREVIEW_IN_MS,
  PREVIEW_OUT_MS,
  COMMIT_MS,
  PREVIEW_BOUNDS: { left: PREVIEW_LEFT, top: PREVIEW_TOP, width: PREVIEW_W, height: PREVIEW_H },
}
