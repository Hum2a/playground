/**
 * Mission Control Spread — workspace overview spread.
 * Sandbox-safe: no parent access, storage, or network.
 *
 * Five windows spread from overlapping desktop to overview layout (520ms).
 * EDITOR select restores desktop coords and brings EDITOR front (460ms).
 */

const OVERVIEW_MS = 520
const RESTORE_MS = 460
const SPACE_LABEL_AT = 0.6

/** @type {{ id: string, label: string, desktop: { x: number, y: number, z: number }, overview: { x: number, y: number, scale: number, z: number } }[]} */
const WINDOWS = [
  {
    id: 'editor',
    label: 'EDITOR',
    desktop: { x: 48, y: 36, z: 3 },
    overview: { x: 22, y: 22, scale: 0.78, z: 1 },
  },
  {
    id: 'terminal',
    label: 'TERMINAL',
    desktop: { x: 168, y: 68, z: 1 },
    overview: { x: 196, y: 22, scale: 0.72, z: 2 },
  },
  {
    id: 'docs',
    label: 'DOCS',
    desktop: { x: 24, y: 112, z: 2 },
    overview: { x: 22, y: 149, scale: 0.72, z: 3 },
  },
  {
    id: 'chat',
    label: 'CHAT',
    desktop: { x: 210, y: 52, z: 4 },
    overview: { x: 196, y: 149, scale: 0.72, z: 4 },
  },
  {
    id: 'preview',
    label: 'PREVIEW',
    desktop: { x: 108, y: 156, z: 5 },
    overview: { x: 109, y: 276, scale: 0.78, z: 5 },
  },
]

/** @type {number[]} */
let timers = []
let busy = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-mission-control]')
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
  const el = document.querySelector('[data-mcs-status]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-mcs-overview]').forEach((btn) => {
    btn.disabled = !on
  })
}

/**
 * @param {'desktop' | 'overview'} mode
 * @param {{ editorFront?: boolean }} [opts]
 */
function applyLayout(mode, opts = {}) {
  const root = rootEl()
  if (!root) return

  for (const win of WINDOWS) {
    const el = document.querySelector(`[data-mcs-window="${win.id}"]`)
    if (!el) continue

    const slot = mode === 'desktop' ? win.desktop : win.overview
    el.style.setProperty('--mcs-x', `${slot.x}px`)
    el.style.setProperty('--mcs-y', `${slot.y}px`)
    el.style.setProperty(
      '--mcs-scale',
      mode === 'desktop' ? '1' : String(win.overview.scale),
    )

    let z = slot.z
    if (mode === 'desktop' && opts.editorFront && win.id === 'editor') {
      z = 10
    }
    el.style.setProperty('--mcs-z', String(z))
    el.dataset.mcsZ = String(z)
  }

  root.setAttribute('data-phase', mode)
  const space = document.querySelector('[data-mcs-space]')
  if (space) {
    space.classList.toggle('is-visible', mode === 'overview')
  }

  document.querySelectorAll('[data-mcs-window]').forEach((el) => {
    const id = el.getAttribute('data-mcs-window')
    const isEditor = id === 'editor'
    el.setAttribute('tabindex', mode === 'overview' && isEditor ? '0' : '-1')
    el.setAttribute('role', mode === 'overview' && isEditor ? 'button' : 'presentation')
    el.setAttribute(
      'aria-label',
      mode === 'overview' && isEditor ? 'Select EDITOR window' : `${id?.toUpperCase()} window`,
    )
    el.setAttribute('aria-hidden', mode === 'overview' && !isEditor ? 'true' : 'false')
  })
}

function runOverview() {
  const root = rootEl()
  if (!root || busy || root.getAttribute('data-phase') === 'overview') return

  busy = true
  clearTimers()
  setButtons(false)
  setStatus('Spreading windows into overview.')
  root.setAttribute('data-phase', 'spreading')
  void root.offsetWidth

  const rm = prefersReducedMotion()
  const duration = rm ? 0 : OVERVIEW_MS

  applyLayout('overview')

  if (!rm) {
    later(Math.round(duration * SPACE_LABEL_AT), () => {
      document.querySelector('[data-mcs-space]')?.classList.add('is-visible')
    })
  } else {
    document.querySelector('[data-mcs-space]')?.classList.add('is-visible')
  }

  later(duration, () => {
    root.setAttribute('data-phase', 'overview')
    setStatus('Overview ready. Select EDITOR to restore.')
    busy = false
    setButtons(true)
  })
}

function runRestore() {
  const root = rootEl()
  if (!root || busy || root.getAttribute('data-phase') !== 'overview') return

  busy = true
  clearTimers()
  setButtons(false)
  setStatus('Restoring desktop layout.')
  root.setAttribute('data-phase', 'restoring')
  document.querySelector('[data-mcs-space]')?.classList.remove('is-visible')
  void root.offsetWidth

  const rm = prefersReducedMotion()
  const duration = rm ? 0 : RESTORE_MS

  applyLayout('desktop', { editorFront: true })

  later(duration, () => {
    root.setAttribute('data-phase', 'desktop')
    setStatus('EDITOR restored to front on desktop.')
    busy = false
    setButtons(true)
  })
}

export function resetMissionControlSpread() {
  clearTimers()
  busy = false
  applyLayout('desktop')
  document.querySelector('[data-mcs-space]')?.classList.remove('is-visible')
  setStatus('Five overlapping windows on desktop.')
  setButtons(true)
}

function bindUi() {
  document.querySelectorAll('[data-mcs-overview]').forEach((btn) => {
    btn.addEventListener('click', () => runOverview())
  })

  document.querySelectorAll('[data-mcs-window="editor"]').forEach((el) => {
    el.addEventListener('click', () => {
      if (rootEl()?.getAttribute('data-phase') === 'overview') runRestore()
    })
    el.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        if (rootEl()?.getAttribute('data-phase') === 'overview') runRestore()
      }
    })
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetMissionControlSpread()
  })
}

bindUi()
resetMissionControlSpread()

export const MISSION_CONTROL_SPREAD_CONTRACT = {
  WINDOWS,
  OVERVIEW_MS,
  RESTORE_MS,
  SPACE_LABEL_AT,
}
