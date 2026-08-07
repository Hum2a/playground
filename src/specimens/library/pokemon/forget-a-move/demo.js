/**
 * SPX-816 Forget a Move (PK-117)
 * Four capabilities; REPLACE removes the selected slot and installs SYNC.
 *
 * Timing (ms) from REPLACE (full motion):
 *   0–80      compress scaleX 1→.9
 *   80–260    outline breaks to corners; label exits −70px
 *   260–360   vacant hold
 *   360–580   SYNC travel + segments rebuild inward
 *   580–740   horizontal sweep lock
 *
 * Reduced motion: selection remains; REPLACE instantly swaps the label.
 */

const COMPRESS_MS = 80
const BREAK_MS = 180
const VACANCY_MS = 100
const INSTALL_MS = 220
const SWEEP_MS = 160

const SLOT_PHASES = [
  'is-compressing',
  'is-breaking',
  'is-vacant',
  'is-installing',
  'is-locked',
]

const ROOT_PHASES = ['is-installing', 'is-sweeping']

const DEFAULT_SLOT = 'cache'
const INCOMING = 'SYNC'

/** @type {number[]} */
let timers = []
let busy = false
let done = false
/** @type {string} */
let selected = DEFAULT_SLOT

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') ===
    'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-forget-move]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
}

function slots(root) {
  return Array.from(root.querySelectorAll('[data-fm-slot]'))
}

function slotById(root, id) {
  return root.querySelector(`[data-fm-slot="${id}"]`)
}

function setAnnounce(root, text) {
  const el = root.querySelector('[data-fm-announce]')
  if (!el) return
  el.textContent = ''
  void el.offsetWidth
  el.textContent = text
}

function clearSlotPhases(slot) {
  slot.classList.remove(...SLOT_PHASES)
}

function clearRootPhases(root) {
  root.classList.remove(...ROOT_PHASES)
}

function setControls(root, { replace, resetVisible }) {
  const replaceBtn = root.querySelector('[data-fm-replace]')
  const resetBtn = root.querySelector('[data-fm-reset]')
  if (replaceBtn) replaceBtn.disabled = !replace
  if (resetBtn) resetBtn.hidden = !resetVisible
}

function setSlotInteractive(root, enabled) {
  slots(root).forEach((btn) => {
    btn.disabled = !enabled
  })
}

function syncSelection(root, id) {
  const list = slots(root)
  const next = list.some((b) => b.dataset.fmSlot === id) ? id : DEFAULT_SLOT
  selected = next
  list.forEach((btn) => {
    const on = btn.dataset.fmSlot === next
    btn.setAttribute('aria-checked', on ? 'true' : 'false')
    btn.tabIndex = on ? 0 : -1
  })
  setControls(root, { replace: !done && !busy, resetVisible: done })
}

function labelFor(root, id) {
  const btn = slotById(root, id)
  return (btn?.dataset.fmLabel || id || '').toUpperCase()
}

function applyInstantReplace(root, targetId, outgoing) {
  const slot = slotById(root, targetId)
  if (!slot) return

  clearRootPhases(root)
  slots(root).forEach(clearSlotPhases)

  const label = slot.querySelector('[data-fm-slot-label]')
  if (label) label.textContent = INCOMING
  slot.dataset.fmLabel = INCOMING
  slot.classList.add('is-locked')

  const sync = root.querySelector('[data-fm-sync]')
  if (sync) sync.style.visibility = 'hidden'

  root.dataset.state = 'done'
  done = true
  busy = false
  setSlotInteractive(root, false)
  setControls(root, { replace: false, resetVisible: true })
  setAnnounce(root, `SYNC replaced ${outgoing}. Capability set locked.`)
}

/**
 * Run forget / replace choreography for the selected capability.
 * Canonical demo selects CACHE → SYNC.
 * @returns {Promise<void>}
 */
export function runForgetMove() {
  const root = rootEl()
  if (!root || busy || done) return Promise.resolve()

  const targetId = selected || DEFAULT_SLOT
  const slot = slotById(root, targetId)
  if (!slot) return Promise.resolve()

  const outgoing = labelFor(root, targetId)

  busy = true
  clearTimers()
  clearRootPhases(root)
  slots(root).forEach(clearSlotPhases)
  root.dataset.state = 'running'
  setControls(root, { replace: false, resetVisible: false })
  setSlotInteractive(root, false)
  setAnnounce(root, `Replace ${outgoing} with SYNC.`)
  void root.offsetWidth

  if (prefersReducedMotion()) {
    applyInstantReplace(root, targetId, outgoing)
    return Promise.resolve()
  }

  return new Promise((resolve) => {
    root.dataset.state = 'compressing'
    slot.classList.add('is-compressing')

    later(COMPRESS_MS, () => {
      root.dataset.state = 'breaking'
      slot.classList.remove('is-compressing')
      slot.classList.add('is-breaking')
    })

    later(COMPRESS_MS + BREAK_MS, () => {
      root.dataset.state = 'vacant'
      slot.classList.remove('is-breaking')
      slot.classList.add('is-vacant')
      const label = slot.querySelector('[data-fm-slot-label]')
      if (label) label.textContent = ''
    })

    later(COMPRESS_MS + BREAK_MS + VACANCY_MS, () => {
      root.dataset.state = 'installing'
      slot.classList.remove('is-vacant')
      slot.classList.add('is-installing')
      root.classList.add('is-installing')
      const label = slot.querySelector('[data-fm-slot-label]')
      if (label) label.textContent = INCOMING
      slot.dataset.fmLabel = INCOMING
    })

    later(COMPRESS_MS + BREAK_MS + VACANCY_MS + INSTALL_MS, () => {
      root.dataset.state = 'locking'
      slot.classList.remove('is-installing')
      root.classList.remove('is-installing')
      slot.classList.add('is-locked')
      root.classList.add('is-sweeping')
      const sync = root.querySelector('[data-fm-sync]')
      if (sync) sync.style.visibility = 'hidden'
    })

    later(
      COMPRESS_MS + BREAK_MS + VACANCY_MS + INSTALL_MS + SWEEP_MS,
      () => {
        root.classList.remove('is-sweeping')
        root.dataset.state = 'done'
        done = true
        busy = false
        setControls(root, { replace: false, resetVisible: true })
        setAnnounce(root, `SYNC replaced ${outgoing}. Capability set locked.`)
        resolve()
      },
    )
  })
}

/**
 * Restore SCAN / FILTER / EXPORT / CACHE idle state with CACHE selected.
 * @returns {Promise<void>}
 */
export function resetForgetMove() {
  const root = rootEl()
  if (!root) return Promise.resolve()

  clearTimers()
  busy = false
  done = false
  clearRootPhases(root)
  root.dataset.state = 'idle'

  const defaults = [
    ['scan', 'SCAN'],
    ['filter', 'FILTER'],
    ['export', 'EXPORT'],
    ['cache', 'CACHE'],
  ]

  defaults.forEach(([id, text]) => {
    const btn = slotById(root, id)
    if (!btn) return
    clearSlotPhases(btn)
    btn.dataset.fmLabel = text
    const label = btn.querySelector('[data-fm-slot-label]')
    if (label) label.textContent = text
  })

  const sync = root.querySelector('[data-fm-sync]')
  if (sync) {
    sync.style.visibility = ''
    sync.style.animation = ''
  }

  setAnnounce(root, '')
  setSlotInteractive(root, true)
  syncSelection(root, DEFAULT_SLOT)
  setControls(root, { replace: true, resetVisible: false })
  void root.offsetWidth
  return Promise.resolve()
}

/**
 * Restore the initial choice and run the same replacement sequence.
 * @returns {Promise<void>}
 */
export async function replayForgetMove() {
  if (busy) {
    clearTimers()
    busy = false
  }
  await resetForgetMove()
  await runForgetMove()
}

function bindUi() {
  const root = rootEl()
  if (!root || root.dataset.fmBound === '1') return
  root.dataset.fmBound = '1'

  slots(root).forEach((btn) => {
    btn.addEventListener('click', () => {
      if (busy || done) return
      syncSelection(root, btn.dataset.fmSlot || DEFAULT_SLOT)
    })
  })

  const grid = root.querySelector('[data-fm-grid]')
  grid?.addEventListener('keydown', (event) => {
    if (busy || done) return
    const list = slots(root)
    const ids = list.map((b) => b.dataset.fmSlot)
    let idx = ids.indexOf(selected)
    if (idx < 0) idx = ids.indexOf(DEFAULT_SLOT)
    let next = idx

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault()
      next = (idx + 1) % list.length
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault()
      next = (idx - 1 + list.length) % list.length
    } else if (event.key === 'Home') {
      event.preventDefault()
      next = 0
    } else if (event.key === 'End') {
      event.preventDefault()
      next = list.length - 1
    } else if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault()
      void runForgetMove()
      return
    } else {
      return
    }

    const id = ids[next]
    if (!id) return
    syncSelection(root, id)
    list[next]?.focus()
  })

  root.querySelector('[data-fm-replace]')?.addEventListener('click', () => {
    void runForgetMove()
  })

  root.querySelector('[data-fm-reset]')?.addEventListener('click', () => {
    void resetForgetMove()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayForgetMove()
  })

  // Default select CACHE on bind
  syncSelection(root, DEFAULT_SLOT)
  setControls(root, { replace: true, resetVisible: false })
  setAnnounce(root, '')
}

bindUi()
