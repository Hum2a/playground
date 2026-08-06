/**
 * Deletion Guillotine — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 * Visual demo only — no persistent deletion.
 *
 * Timing (ms from confirmDeletion start):
 *   0–140   anticipate  (scaleY 1→.97 + red diagonal)
 *   140–300 blade       (~160ms travel, UR→LL, −18deg)
 *   300–540 separate    (pieces exit opposite directions)
 *   460–760 deleted flash then PROJECT REMOVED
 */

const ANTICIPATE_MS = 140
const BLADE_MS = 160
const SEPARATE_MS = 240
const DELETED_MS = 300
const BLADE_AT = ANTICIPATE_MS
const SEPARATE_AT = ANTICIPATE_MS + BLADE_MS // 300
const DELETED_AT = 460
const REMOVED_AT = DELETED_AT + DELETED_MS // 760

const PHASES = [
  'dg--confirm',
  'dg--anticipate',
  'dg--blade',
  'dg--separate',
  'dg--deleted-flash',
  'dg--removed',
  'dg--busy',
]

let busy = false
let removed = false
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-deletion-guillotine]')
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
  const status = root.querySelector('[data-dg-status]')
  if (!status) return
  status.textContent = ''
  void status.offsetWidth
  status.textContent = text
}

function show(el, on) {
  if (!el) return
  if (on) el.removeAttribute('hidden')
  else el.setAttribute('hidden', '')
}

/**
 * Open deliberate confirmation (does not cut yet).
 */
export function requestDeletion() {
  const root = rootEl()
  if (!root || busy || removed) return

  clearPhases(root)
  root.classList.add('dg--confirm')
  root.setAttribute('data-state', 'confirm')
  show(root.querySelector('[data-dg-confirm]'), true)
  show(root.querySelector('[data-dg-removed]'), false)
  setStatus(root, 'Confirm deletion of Project Nightfall. Demo only.')
  root.querySelector('[data-dg-confirm-yes]')?.focus()
}

/**
 * Cancel confirmation and restore the card.
 */
export function cancelDeletion() {
  const root = rootEl()
  if (!root || busy || removed) return

  clearPhases(root)
  root.setAttribute('data-state', 'idle')
  show(root.querySelector('[data-dg-confirm]'), false)
  setStatus(root, '')
  root.querySelector('[data-dg-delete]')?.focus()
}

/**
 * Run the guillotine cut after confirmation.
 * @returns {Promise<void>}
 */
export function confirmDeletion() {
  const root = rootEl()
  if (!root || busy || removed) return Promise.resolve()

  busy = true
  clearTimers()
  clearPhases(root)
  show(root.querySelector('[data-dg-confirm]'), false)
  show(root.querySelector('[data-dg-removed]'), false)
  root.classList.add('dg--busy')
  root.setAttribute('data-state', 'cutting')
  setStatus(root, '')
  void root.offsetWidth

  if (prefersReducedMotion()) {
    root.classList.add('dg--removed')
    show(root.querySelector('[data-dg-removed]'), true)
    root.setAttribute('data-state', 'removed')
    removed = true
    busy = false
    setStatus(root, 'Project Nightfall removed.')
    return Promise.resolve()
  }

  root.classList.add('dg--anticipate')

  return new Promise((resolve) => {
    later(BLADE_AT, () => {
      root.classList.remove('dg--anticipate')
      root.classList.add('dg--blade')
    })

    later(SEPARATE_AT, () => {
      root.classList.remove('dg--blade')
      root.classList.add('dg--separate')
    })

    later(DELETED_AT, () => {
      root.classList.remove('dg--separate')
      root.classList.add('dg--deleted-flash')
    })

    later(REMOVED_AT, () => {
      root.classList.remove('dg--deleted-flash', 'dg--busy')
      root.classList.add('dg--removed')
      show(root.querySelector('[data-dg-removed]'), true)
      root.setAttribute('data-state', 'removed')
      removed = true
      busy = false
      setStatus(root, 'Project Nightfall removed.')
      resolve()
    })
  })
}

/**
 * Restore intact card — deterministic demo reset.
 * @returns {Promise<void>}
 */
export function resetDeletionGuillotine() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()

  clearTimers()
  clearPhases(root)
  busy = false
  removed = false
  root.setAttribute('data-state', 'idle')
  show(root.querySelector('[data-dg-confirm]'), false)
  show(root.querySelector('[data-dg-removed]'), false)
  setStatus(root, '')
  void root.offsetWidth
  return Promise.resolve()
}

/**
 * Reset then idle — harness restart.
 * @returns {Promise<void>}
 */
export async function replayDeletionGuillotine() {
  if (busy) return
  await resetDeletionGuillotine()
}

function bindUi() {
  const root = rootEl()
  if (!root) return

  root.querySelector('[data-dg-delete]')?.addEventListener('click', () => {
    requestDeletion()
  })

  root.querySelector('[data-dg-confirm-yes]')?.addEventListener('click', () => {
    void confirmDeletion()
  })

  root.querySelector('[data-dg-confirm-no]')?.addEventListener('click', () => {
    cancelDeletion()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayDeletionGuillotine()
  })
}

bindUi()

