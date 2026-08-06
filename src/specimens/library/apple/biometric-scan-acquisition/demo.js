/**
 * Biometric Scan Acquisition — abstract identity scan sequence.
 * Sandbox-safe (no parent / storage / network / camera).
 *
 * Field 180×180 · 16 nodes · two passes 420ms · brackets inward 6px · hold 120ms
 */

const PASS_MS = 420
const VALIDATION_HOLD_MS = 120
const NODE_COUNT = 16
const FIRST_PASS_COUNT = 10

/** @type {number[]} */
const NODE_ORDER = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

let scanning = false
let verified = false
/** @type {number | null} */
let timerId = null
/** @type {number[]} */
const timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-biometric-scan-acquisition]')
}

function setStatus(text) {
  const el = document.querySelector('[data-bsa-status]')
  if (el) el.textContent = text
}

function clearTimers() {
  if (timerId !== null) {
    window.clearTimeout(timerId)
    timerId = null
  }
  while (timers.length) {
    const id = timers.pop()
    if (id !== undefined) window.clearTimeout(id)
  }
}

function resetNodes() {
  document.querySelectorAll('[data-bsa-node]').forEach((node) => {
    node.classList.remove('is-acquired')
  })
}

function acquireNode(index) {
  const node = document.querySelector(`[data-bsa-node="${index}"]`)
  node?.classList.add('is-acquired')
}

function setVaultEnabled(enabled) {
  const vault = document.querySelector('[data-bsa-vault]')
  if (vault) vault.disabled = !enabled
}

function setScanEnabled(enabled) {
  const scan = document.querySelector('[data-bsa-scan]')
  if (scan) scan.disabled = !enabled
}

function finishVerification() {
  const root = rootEl()
  if (!root) return
  root.setAttribute('data-phase', 'verified')
  verified = true
  scanning = false
  setStatus('VERIFIED')
  setVaultEnabled(true)
  setScanEnabled(false)
}

function runPass(startIdx, count, onDone) {
  const slice = NODE_ORDER.slice(startIdx, startIdx + count)
  const interval = PASS_MS / count

  slice.forEach((nodeIndex, i) => {
    const id = window.setTimeout(() => acquireNode(nodeIndex), interval * i)
    timers.push(id)
  })

  const doneId = window.setTimeout(onDone, PASS_MS)
  timers.push(doneId)
}

export function startBiometricScan() {
  const root = rootEl()
  if (!root || scanning || verified) return

  clearTimers()
  resetNodes()
  scanning = true
  setScanEnabled(false)
  setVaultEnabled(false)
  root.setAttribute('data-phase', 'scanning')
  setStatus('SCANNING')

  if (prefersReducedMotion()) {
    NODE_ORDER.forEach((i) => acquireNode(i))
    root.setAttribute('data-phase', 'validating')
    timerId = window.setTimeout(finishVerification, VALIDATION_HOLD_MS)
    return
  }

  runPass(0, FIRST_PASS_COUNT, () => {
    runPass(FIRST_PASS_COUNT, NODE_COUNT - FIRST_PASS_COUNT, () => {
      root.setAttribute('data-phase', 'validating')
      timerId = window.setTimeout(finishVerification, VALIDATION_HOLD_MS)
    })
  })
}

export function openVault() {
  if (!verified) return
  setStatus('VAULT OPENED')
}

function bindUi() {
  document.querySelector('[data-bsa-scan]')?.addEventListener('click', () => {
    startBiometricScan()
  })

  document.querySelector('[data-bsa-vault]')?.addEventListener('click', () => {
    openVault()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') {
      clearTimers()
      resetNodes()
      scanning = false
      verified = false
      rootEl()?.setAttribute('data-phase', 'idle')
      setStatus('LOCKED')
      setVaultEnabled(false)
      setScanEnabled(true)
    }
  })
}

bindUi()

export const BIOMETRIC_SCAN_CONTRACT = {
  PASS_MS,
  VALIDATION_HOLD_MS,
  NODE_COUNT,
  FIRST_PASS_COUNT,
  FIELD_SIZE: { width: 180, height: 180 },
  BRACKET_INSET_PX: 6,
}
