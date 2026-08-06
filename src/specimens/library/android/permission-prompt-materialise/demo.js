/**
 * Permission Prompt Materialise — simulated microphone permission dialog.
 */

const MATERIALISE_MS = 220
const SNACKBAR_MS = 3200

let lastFocus = null

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function root() {
  return document.querySelector('[data-permission-prompt-materialise]')
}

function dialog() {
  return document.querySelector('[data-ppm-dialog]')
}

function setPhase(phase) {
  root()?.setAttribute('data-phase', phase)
}

function setStatus(text) {
  const el = document.querySelector('[data-ppm-status]')
  if (el) el.textContent = text
}

function setFeatureEnabled(enabled) {
  root()?.setAttribute('data-enabled', enabled ? 'true' : 'false')
  const state = document.querySelector('[data-ppm-feature-state]')
  if (state) state.textContent = enabled ? 'Enabled' : 'Disabled'
}

function openPrompt() {
  const scrim = document.querySelector('[data-ppm-scrim]')
  const dlg = dialog()
  const trigger = document.querySelector('[data-ppm-trigger]')
  if (!dlg) return

  lastFocus = trigger
  scrim?.removeAttribute('hidden')
  scrim?.setAttribute('aria-hidden', 'false')
  dlg.showModal()
  setPhase('open')
  setStatus('Permission prompt open — choose an action.')
  dlg.querySelector('[data-ppm-while]')?.focus()
}

function closePrompt() {
  const scrim = document.querySelector('[data-ppm-scrim]')
  const dlg = dialog()
  dlg?.close()
  scrim?.setAttribute('hidden', '')
  scrim?.setAttribute('aria-hidden', 'true')
  setPhase('idle')
  if (lastFocus) lastFocus.focus()
}

function showSnackbar() {
  const bar = document.querySelector('[data-ppm-snackbar]')
  if (!bar) return
  bar.removeAttribute('hidden')
  window.setTimeout(() => bar.setAttribute('hidden', ''), SNACKBAR_MS)
}

function grant() {
  setFeatureEnabled(true)
  closePrompt()
  setStatus('Microphone enabled while using app.')
}

function deny() {
  setFeatureEnabled(false)
  closePrompt()
  showSnackbar()
  setStatus('Permission denied — corrective snackbar shown.')
}

function bindUi() {
  document.querySelector('[data-ppm-trigger]')?.addEventListener('click', openPrompt)
  document.querySelector('[data-ppm-while]')?.addEventListener('click', grant)
  document.querySelector('[data-ppm-once]')?.addEventListener('click', grant)
  document.querySelector('[data-ppm-deny]')?.addEventListener('click', deny)

  dialog()?.addEventListener('cancel', (e) => {
    e.preventDefault()
    deny()
  })

  document.querySelector('[data-ppm-scrim]')?.addEventListener('click', deny)
}

bindUi()

export function resetPermissionPromptMaterialise() {
  closePrompt()
  setFeatureEnabled(false)
  document.querySelector('[data-ppm-snackbar]')?.setAttribute('hidden', '')
  setStatus('Tap Use microphone to open prompt.')
}

export const PERMISSION_PROMPT_MATERIALISE_CONTRACT = { MATERIALISE_MS, SNACKBAR_MS }
