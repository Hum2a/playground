/**
 * Dialog Materialise — scrim + scale dialog with confirm working state.
 * Sandbox-safe (no parent / storage / network).
 */

const WORK_MS = 700

/** @type {HTMLElement | null} */
let lastFocus = null
/** @type {number | null} */
let workTimer = null

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function root() {
  return document.querySelector('[data-dialog-materialise]')
}

function dialog() {
  return document.querySelector('[data-dlg-dialog]')
}

function scrim() {
  return document.querySelector('[data-dlg-scrim]')
}

function openBtn() {
  return document.querySelector('[data-dlg-open]')
}

function statusEl() {
  return document.querySelector('[data-dlg-status]')
}

function setStatus(text) {
  const el = statusEl()
  if (el) el.textContent = text
}

function setPhase(phase) {
  root()?.setAttribute('data-phase', phase)
}

function setOriginFromTrigger(trigger) {
  const dlg = dialog()
  const host = root()
  if (!dlg || !host || !trigger) return
  const t = trigger.getBoundingClientRect()
  const h = host.getBoundingClientRect()
  const x = ((t.left + t.width / 2 - h.left) / h.width) * 100
  const y = ((t.top + t.height / 2 - h.top) / h.height) * 100
  dlg.style.setProperty('--dlg-origin-x', `${x}%`)
  dlg.style.setProperty('--dlg-origin-y', `${y}%`)
}

function showDialog(show) {
  const d = dialog()
  const s = scrim()
  if (d) d.hidden = !show
  if (s) s.hidden = !show
}

function openDialog() {
  const trigger = openBtn()
  lastFocus = trigger
  setOriginFromTrigger(trigger)
  showDialog(true)
  setPhase('open')
  setStatus('Scrim 180ms; dialog scale .92→1 over 240ms.')
  dialog()?.querySelector('[data-dlg-cancel]')?.focus()
}

function closeDialog() {
  if (workTimer !== null) {
    clearTimeout(workTimer)
    workTimer = null
  }
  setPhase('closed')
  showDialog(false)
  document.querySelector('[data-dlg-working]')?.setAttribute('hidden', '')
  document.querySelector('[data-dlg-success]')?.setAttribute('hidden', '')
  document.querySelector('[data-dlg-actions]')?.removeAttribute('hidden')
  lastFocus?.focus()
  lastFocus = null
  setStatus('Dialog closed — focus returned to trigger.')
}

function confirmDialog() {
  setPhase('working')
  document.querySelector('[data-dlg-actions]')?.setAttribute('hidden', '')
  const working = document.querySelector('[data-dlg-working]')
  working?.removeAttribute('hidden')
  setStatus('Confirm working state — 700ms finite.')

  workTimer = window.setTimeout(() => {
    working?.setAttribute('hidden', '')
    document.querySelector('[data-dlg-success]')?.removeAttribute('hidden')
    setPhase('success')
    setStatus('Success — closing shortly.')

    workTimer = window.setTimeout(() => {
      closeDialog()
      setStatus('Open the dialog from Delete account.')
    }, prefersReducedMotion() ? 400 : 600)
  }, WORK_MS)
}

export function resetDialogMaterialise() {
  closeDialog()
  setStatus('Open the dialog from Delete account.')
}

function bindUi() {
  openBtn()?.addEventListener('click', openDialog)
  document.querySelector('[data-dlg-cancel]')?.addEventListener('click', closeDialog)
  scrim()?.addEventListener('click', closeDialog)
  document.querySelector('[data-dlg-confirm]')?.addEventListener('click', confirmDialog)

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && root()?.getAttribute('data-phase') !== 'closed') {
      closeDialog()
    }
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      resetDialogMaterialise()
    }
  })
}

bindUi()
resetDialogMaterialise()

export const DIALOG_MATERIALISE_CONTRACT = {
  DIALOG_W: 304,
  DIALOG_H: 220,
  SCRIM_MS: 180,
  DIALOG_MS: 240,
  WORK_MS,
  SCALE_FROM: 0.92,
}
