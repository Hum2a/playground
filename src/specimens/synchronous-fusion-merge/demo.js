/**
 * Synchronous Fusion Merge — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 * Sync → converge → hold → compress → expand C.
 */

const SYNC_MS = 280
const CONVERGE_MS = 300
const HOLD_MS = 80
const COMPRESS_MS = 100
const EXPAND_MS = 220

const CONVERGE_AT = SYNC_MS
const HOLD_AT = CONVERGE_AT + CONVERGE_MS
const COMPRESS_AT = HOLD_AT + HOLD_MS
const EXPAND_AT = COMPRESS_AT + COMPRESS_MS
const TOTAL_MS = EXPAND_AT + EXPAND_MS

let busy = false
let complete = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') ===
    'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-sync-fusion]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
}

function setStatus(root, text) {
  const status = root.querySelector('[data-sfm-status]')
  if (!status) return
  status.textContent = ''
  void status.offsetWidth
  status.textContent = text
}

function setBusyUi(root, isBusy) {
  const btn = root.querySelector('[data-sfm-fuse]')
  if (btn) btn.disabled = isBusy || complete
}

function applyReducedComplete(root) {
  clearTimers()
  busy = false
  complete = true
  root.classList.add('sfm--reduced')
  root.setAttribute('data-state', 'complete')
  setStatus(root, 'Source A and Source B merged into Model C.')
  setBusyUi(root, false)
}

/**
 * Run synchronous fusion choreography.
 * @returns {Promise<void>}
 */
export function fuseSyncMerge() {
  const root = rootEl()
  if (!root || busy || complete) return Promise.resolve()

  busy = true
  clearTimers()
  root.classList.remove('sfm--reduced')
  setBusyUi(root, true)
  setStatus(root, 'Source A and Source B are independent.')

  if (prefersReducedMotion()) {
    applyReducedComplete(root)
    return Promise.resolve()
  }

  root.setAttribute('data-state', 'sync')
  void root.offsetWidth
  setStatus(root, 'Source A and Source B are synchronising.')

  return new Promise((resolve) => {
    later(CONVERGE_AT, () => {
      root.setAttribute('data-state', 'converge')
      setStatus(root, 'Source A and Source B are converging.')
    })

    later(HOLD_AT, () => {
      root.setAttribute('data-state', 'hold')
    })

    later(COMPRESS_AT, () => {
      root.setAttribute('data-state', 'compress')
      setStatus(root, 'Source A and Source B are merging.')
    })

    later(EXPAND_AT, () => {
      root.setAttribute('data-state', 'expand')
      setStatus(root, 'Source A and Source B merged into Model C.')
    })

    later(TOTAL_MS, () => {
      root.setAttribute('data-state', 'complete')
      complete = true
      busy = false
      setBusyUi(root, false)
      resolve()
    })
  })
}

/**
 * Restore independent A/B sources.
 * @returns {Promise<void>}
 */
export function resetSyncMerge() {
  const root = rootEl()
  if (!root) return Promise.resolve()

  clearTimers()
  busy = false
  complete = false
  root.classList.remove('sfm--reduced')
  root.setAttribute('data-state', 'idle')
  void root.offsetWidth
  setStatus(root, 'Source A and Source B are independent.')
  setBusyUi(root, false)
  return Promise.resolve()
}

function bind() {
  const root = rootEl()
  if (!root) return

  root.querySelector('[data-sfm-fuse]')?.addEventListener('click', () => {
    void fuseSyncMerge()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') {
      void resetSyncMerge()
    }
  })
}

bind()
