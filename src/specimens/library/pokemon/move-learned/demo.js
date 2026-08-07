/**
 * Move Learned — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 *
 * Canonical: PROCESS // 04 with SCAN / FILTER / EXPORT / empty → LEARN SYNC
 *
 * Timing (ms) from LEARN:
 *   0–260     token travels into empty slot; outline expands; 4 corners
 *   260–320   vertical compress scaleY(.82) then return
 *   260–400   missing outline segments construct (140ms)
 *   400–510   pale lock sweep L→R (110ms); empty styling removed
 *   510–690   NEW CAPABILITY → SYNC LEARNED clip (180ms)
 */

const TRAVEL_MS = 260
const COMPRESS_MS = 60
const OUTLINE_MS = 140
const SWEEP_MS = 110
const CONFIRM_MS = 180

const PHASES = [
  'mvl--approach',
  'mvl--install',
  'mvl--lock',
  'mvl--confirm',
  'mvl--busy',
  'mvl--done',
  'mvl--reduced',
]

let busy = false
let done = false
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-move-learned]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
}

function clearPhases(root) {
  root.classList.remove(...PHASES)
}

function setStatus(root, text) {
  const status = root.querySelector('[data-mvl-status]')
  if (!status) return
  status.textContent = ''
  void status.offsetWidth
  status.textContent = text
}

function setListText(root, text) {
  const el = root.querySelector('[data-mvl-list-text]')
  if (el) el.textContent = text
}

function showSyncInSlot(root) {
  const emptyLabel = root.querySelector('[data-mvl-empty-label]')
  const syncLabel = root.querySelector('[data-mvl-sync-label]')
  if (emptyLabel) emptyLabel.hidden = true
  if (syncLabel) syncLabel.hidden = false
  const empty = root.querySelector('[data-mvl-empty]')
  if (empty) {
    empty.classList.remove('mvl__slot--empty')
    empty.classList.add('mvl__slot--filled')
  }
}

function setFinal(root) {
  clearPhases(root)
  root.classList.add('mvl--done', 'mvl--reduced')
  root.setAttribute('data-state', 'done')
  showSyncInSlot(root)
  setListText(
    root,
    'Capabilities: SCAN, FILTER, EXPORT, SYNC. Sync learned.',
  )
  const btn = root.querySelector('[data-mvl-learn]')
  if (btn) btn.disabled = true
  const replay = root.querySelector('[data-mvl-replay]')
  if (replay) replay.hidden = false
  done = true
  busy = false
  setStatus(root, 'New capability learned: Sync.')
}

/**
 * Run SYNC install into empty slot.
 * @returns {Promise<void>}
 */
export function runMoveLearned() {
  const root = rootEl()
  if (!root || busy || done) return Promise.resolve()

  busy = true
  clearTimers()
  clearPhases(root)
  root.classList.add('mvl--busy')
  root.setAttribute('data-state', 'running')
  setStatus(root, 'Learning Sync.')
  const btn = root.querySelector('[data-mvl-learn]')
  if (btn) btn.disabled = true
  const replay = root.querySelector('[data-mvl-replay]')
  if (replay) replay.hidden = true
  void root.offsetWidth

  if (prefersReducedMotion()) {
    setFinal(root)
    return Promise.resolve()
  }

  const tInstall = TRAVEL_MS
  const tLock = tInstall + Math.max(COMPRESS_MS, OUTLINE_MS)
  const tConfirm = tLock + SWEEP_MS
  const tDone = tConfirm + CONFIRM_MS

  return new Promise((resolve) => {
    root.setAttribute('data-state', 'approach')
    root.classList.add('mvl--approach')

    later(tInstall, () => {
      root.setAttribute('data-state', 'installing')
      root.classList.remove('mvl--approach')
      root.classList.add('mvl--install')
    })

    later(tLock, () => {
      root.setAttribute('data-state', 'locking')
      root.classList.remove('mvl--install')
      root.classList.add('mvl--lock')
      showSyncInSlot(root)
      setListText(root, 'Capabilities: SCAN, FILTER, EXPORT, SYNC.')
      setStatus(root, 'Sync installed. Locking capability set.')
    })

    later(tConfirm, () => {
      root.setAttribute('data-state', 'confirming')
      root.classList.add('mvl--confirm')
    })

    later(tDone, () => {
      clearPhases(root)
      root.classList.add('mvl--done')
      root.setAttribute('data-state', 'done')
      showSyncInSlot(root)
      setListText(
        root,
        'Capabilities: SCAN, FILTER, EXPORT, SYNC. Sync learned.',
      )
      done = true
      busy = false
      if (replay) replay.hidden = false
      setStatus(root, 'New capability learned: Sync.')
      resolve()
    })
  })
}

/**
 * Restore empty slot + SYNC token.
 * @returns {Promise<void>}
 */
export function resetMoveLearned() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()

  clearTimers()
  clearPhases(root)
  done = false
  busy = false
  root.setAttribute('data-state', 'idle')

  const empty = root.querySelector('[data-mvl-empty]')
  if (empty) {
    empty.classList.add('mvl__slot--empty')
    empty.classList.remove('mvl__slot--filled')
  }
  const emptyLabel = root.querySelector('[data-mvl-empty-label]')
  const syncLabel = root.querySelector('[data-mvl-sync-label]')
  if (emptyLabel) emptyLabel.hidden = false
  if (syncLabel) syncLabel.hidden = true

  setListText(root, 'Capabilities: SCAN, FILTER, EXPORT, empty slot.')
  setStatus(root, '')

  const btn = root.querySelector('[data-mvl-learn]')
  if (btn) {
    btn.disabled = false
  }
  const replay = root.querySelector('[data-mvl-replay]')
  if (replay) replay.hidden = true
  void root.offsetWidth
  return Promise.resolve()
}

/**
 * Harness restart.
 * @returns {Promise<void>}
 */
export async function replayMoveLearned() {
  const root = rootEl()
  if (!root) return
  if (busy) {
    clearTimers()
    busy = false
  }
  await resetMoveLearned()
  await runMoveLearned()
}

function bindUi() {
  const root = rootEl()
  if (!root) return

  root.querySelector('[data-mvl-learn]')?.addEventListener('click', () => {
    void runMoveLearned()
  })
  root.querySelector('[data-mvl-replay]')?.addEventListener('click', () => {
    void replayMoveLearned()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayMoveLearned()
  })
}

bindUi()
