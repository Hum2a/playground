/**
 * Quick Look Expansion — matched transition from file row to preview panel.
 */

const DURATION_MS = 380
const BLOCK_STAGGER_MS = 45
const ROW_H = 52
const PREVIEW_W = 420
const PREVIEW_H = 330

/** @type {boolean} */
let open = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function root() {
  return document.querySelector('[data-quick-look-expansion]')
}

function shell() {
  return document.querySelector('[data-qle-shell]')
}

function preview() {
  return document.querySelector('[data-qle-preview]')
}

function selectedRow() {
  return document.querySelector('[data-qle-selected]')
}

function statusEl() {
  return document.querySelector('[data-qle-status]')
}

function blocks() {
  return /** @type {NodeListOf<HTMLElement>} */ (
    document.querySelectorAll('[data-qle-block]')
  )
}

function setStatus(text) {
  const el = statusEl()
  if (el) el.textContent = text
}

function setPhase(phase) {
  root()?.setAttribute('data-phase', phase)
}

function measureOrigin() {
  const row = selectedRow()
  const sh = shell()
  if (!row || !sh) return { x: 16, y: 104, w: 180, h: ROW_H }
  const rr = row.getBoundingClientRect()
  const sr = sh.getBoundingClientRect()
  return {
    x: rr.left - sr.left + 12,
    y: rr.top - sr.top,
    w: 180,
    h: ROW_H,
  }
}

function openPreview() {
  if (open) return
  const panel = preview()
  const sh = shell()
  if (!panel || !sh) return

  open = true
  const origin = measureOrigin()
  panel.hidden = false
  panel.style.setProperty('--qle-ox', `${origin.x}px`)
  panel.style.setProperty('--qle-oy', `${origin.y}px`)
  panel.style.setProperty('--qle-ow', `${origin.w}px`)
  panel.style.setProperty('--qle-oh', `${origin.h}px`)

  sh.classList.add('is-previewing')
  setPhase('opening')

  if (prefersReducedMotion()) {
    panel.classList.add('is-open')
    blocks().forEach((b) => b.classList.add('is-visible'))
    setPhase('open')
    setStatus('DESIGN.PDF preview open. Press CLOSE or Escape.')
    return
  }

  requestAnimationFrame(() => {
    panel.classList.add('is-open')
    setPhase('open')
  })

  blocks().forEach((b, i) => {
    b.classList.remove('is-visible')
    window.setTimeout(() => b.classList.add('is-visible'), DURATION_MS * 0.55 + i * BLOCK_STAGGER_MS)
  })

  setStatus('DESIGN.PDF preview expanding from selected row.')
  window.setTimeout(() => {
    setStatus('DESIGN.PDF preview open. Press CLOSE or Escape.')
    document.querySelector('[data-qle-close]')?.focus()
  }, DURATION_MS + BLOCK_STAGGER_MS * 2)
}

function closePreview() {
  if (!open) return
  const panel = preview()
  const sh = shell()
  if (!panel || !sh) return

  setPhase('closing')
  setStatus('Closing preview back to DESIGN.PDF row.')

  if (prefersReducedMotion()) {
    panel.classList.remove('is-open')
    panel.hidden = true
    blocks().forEach((b) => b.classList.remove('is-visible'))
    sh.classList.remove('is-previewing')
    open = false
    setPhase('list')
    document.querySelector('[data-qle-open]')?.focus()
    setStatus('DESIGN.PDF selected. Open preview to expand from row context.')
    return
  }

  panel.classList.remove('is-open')
  window.setTimeout(() => {
    panel.hidden = true
    blocks().forEach((b) => b.classList.remove('is-visible'))
    sh.classList.remove('is-previewing')
    open = false
    setPhase('list')
    document.querySelector('[data-qle-open]')?.focus()
    setStatus('DESIGN.PDF selected. Open preview to expand from row context.')
  }, DURATION_MS)
}

export function resetQuickLookExpansion() {
  open = false
  preview()?.classList.remove('is-open')
  if (preview()) preview().hidden = true
  shell()?.classList.remove('is-previewing')
  blocks().forEach((b) => b.classList.remove('is-visible'))
  setPhase('list')
  setStatus('DESIGN.PDF selected. Open preview to expand from row context.')
}

function bindUi() {
  document.querySelector('[data-qle-open]')?.addEventListener('click', openPreview)
  document.querySelector('[data-qle-close]')?.addEventListener('click', closePreview)
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && open) {
      event.preventDefault()
      closePreview()
    }
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      resetQuickLookExpansion()
    }
  })
}

bindUi()
resetQuickLookExpansion()

export const QUICK_LOOK_EXPANSION_CONTRACT = {
  DURATION_MS,
  BLOCK_STAGGER_MS,
  ROW_H,
  PREVIEW_W,
  PREVIEW_H,
}
