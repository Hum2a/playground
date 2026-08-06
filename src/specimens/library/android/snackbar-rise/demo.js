/**
 * Snackbar Rise — temporary feedback with UNDO restore.
 * Sandbox-safe (no parent / storage / network).
 */

const ENTRY_MS = 250
const DWELL_MS = 4500
const RESTORE_DWELL_MS = 900
const EXIT_MS = 200

/** @type {number[]} */
let timers = []
let dwellDeadline = 0
let paused = false
let snackbarVisible = false
/** @type {HTMLElement | null} */
let removedRow = null
/** @type {HTMLElement | null} */
let removedNext = null

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-snackbar-rise]')
}

function snackbarEl() {
  return document.querySelector('[data-sbr-snackbar]')
}

function statusEl() {
  return document.querySelector('[data-sbr-status]')
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
  const el = statusEl()
  if (el) el.textContent = text
}

function setPhase(phase) {
  rootEl()?.setAttribute('data-phase', phase)
}

function scheduleExit(ms = DWELL_MS) {
  clearTimers()
  dwellDeadline = Date.now() + ms
  later(ms, () => {
    if (!paused) hideSnackbar()
  })
}

function hideSnackbar() {
  setPhase('exiting')
  const snackbar = snackbarEl()
  const ms = prefersReducedMotion() ? 0 : EXIT_MS
  later(ms, () => {
    if (snackbar) snackbar.hidden = true
    snackbarVisible = false
    removedRow = null
    removedNext = null
    setPhase('idle')
    setStatus('Delete a row to show the snackbar.')
  })
}

function showSnackbar(copy) {
  const snackbar = snackbarEl()
  const copyEl = document.querySelector('[data-sbr-copy]')
  if (!snackbar) return
  snackbar.hidden = false
  if (copyEl) copyEl.textContent = copy
  snackbarVisible = true
  paused = false

  if (prefersReducedMotion()) {
    setPhase('visible')
    scheduleExit()
    return
  }

  snackbar.style.transform = 'translateY(76px)'
  snackbar.style.opacity = '0'
  requestAnimationFrame(() => {
    setPhase('visible')
    snackbar.style.transform = 'translateY(0)'
    snackbar.style.opacity = '1'
    later(ENTRY_MS, () => scheduleExit())
  })
}

function deleteRow(row) {
  if (!row || row.classList.contains('is-removing')) return

  if (snackbarVisible && removedRow && removedRow !== row) {
    removedRow.remove()
    removedRow = null
    removedNext = null
  }

  removedRow = row
  removedNext = row.nextElementSibling
  row.classList.add('is-removing')
  setStatus('Row collapsed. Snackbar rising.')
  later(prefersReducedMotion() ? 0 : 200, () => {
    showSnackbar('Item removed')
    setStatus('Snackbar visible. UNDO restores row.')
  })
}

function undoDelete() {
  if (!removedRow) return
  const list = document.querySelector('[data-sbr-list]')
  if (!list) return
  removedRow.classList.remove('is-removing')
  if (removedNext) list.insertBefore(removedRow, removedNext)
  else list.appendChild(removedRow)
  const copyEl = document.querySelector('[data-sbr-copy]')
  if (copyEl) copyEl.textContent = 'Restored'
  setPhase('restored')
  setStatus('Row restored. Snackbar shows Restored.')
  scheduleExit(RESTORE_DWELL_MS)
  removedRow = null
  removedNext = null
}

function pauseDwell() {
  if (!snackbarVisible || paused) return
  paused = true
  clearTimers()
  setStatus('Dismissal paused.')
}

function resumeDwell() {
  if (!snackbarVisible || !paused) return
  paused = false
  const remaining = Math.max(0, dwellDeadline - Date.now())
  scheduleExit(remaining)
  setStatus('Dismissal resumed.')
}

export function resetSnackbarRise() {
  clearTimers()
  paused = false
  snackbarVisible = false
  const snackbar = snackbarEl()
  if (snackbar) {
    snackbar.hidden = true
    snackbar.style.transform = ''
    snackbar.style.opacity = ''
  }
  document.querySelectorAll('[data-sbr-row]').forEach((row) => {
    row.classList.remove('is-removing')
  })
  const copyEl = document.querySelector('[data-sbr-copy]')
  if (copyEl) copyEl.textContent = 'Item removed'
  removedRow = null
  removedNext = null
  setPhase('idle')
  setStatus('Delete a row to show the snackbar.')
}

function bindUi() {
  document.querySelectorAll('[data-sbr-delete]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const row = btn.closest('[data-sbr-row]')
      deleteRow(row)
    })
  })

  document.querySelector('[data-sbr-undo]')?.addEventListener('click', undoDelete)

  const snackbar = snackbarEl()
  snackbar?.addEventListener('mouseenter', pauseDwell)
  snackbar?.addEventListener('mouseleave', resumeDwell)
  snackbar?.addEventListener('focus', pauseDwell)
  snackbar?.addEventListener('blur', resumeDwell)
  snackbar?.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') hideSnackbar()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      resetSnackbarRise()
    }
  })
}

bindUi()
resetSnackbarRise()

export const SNACKBAR_RISE_CONTRACT = {
  ENTRY_MS,
  DWELL_MS,
  RESTORE_DWELL_MS,
  SNACKBAR_W: 344,
  SNACKBAR_H: 52,
}
