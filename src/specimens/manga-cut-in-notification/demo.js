/**
 * Manga Cut-In Notification — tiny portable trigger API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 */

const SLIT_MS = 100
const OPEN_MS = 200
const CONTENT_MS = 200
const HOLD_MS = 900
const EXIT_MS = 260

const PHASES = [
  'manga-cut-in--slit',
  'manga-cut-in--open',
  'manga-cut-in--content',
  'manga-cut-in--hold',
  'manga-cut-in--exit',
  'manga-cut-in--reduced',
]

let busy = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-manga-cut-in]')
}

function hostEl() {
  return document.querySelector('[data-manga-cut-in-host]')
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

function clearPhases(root) {
  root.classList.remove(...PHASES)
}

function setStatus(text) {
  const el = document.querySelector('[data-manga-cut-in-status]')
  if (el) el.textContent = text
}

function setHostSplit(on) {
  if (prefersReducedMotion()) return
  hostEl()?.classList.toggle('manga-cut-in-host--split', on)
}

/**
 * Play the cut-in notification sequence once.
 * @returns {Promise<void>}
 */
export function fireMangaCutIn() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()

  busy = true
  clearTimers()
  clearPhases(root)
  root.hidden = false
  void root.offsetWidth

  if (prefersReducedMotion()) {
    root.classList.add('manga-cut-in--reduced', 'manga-cut-in--hold')
    setStatus('Build complete. 12 artifacts compiled.')
    later(HOLD_MS, () => {
      root.hidden = true
      clearPhases(root)
      setStatus('')
      busy = false
    })
    return Promise.resolve()
  }

  root.classList.add('manga-cut-in--slit')
  setHostSplit(true)

  return new Promise((resolve) => {
    later(SLIT_MS, () => {
      root.classList.remove('manga-cut-in--slit')
      root.classList.add('manga-cut-in--open')
    })

    later(SLIT_MS + OPEN_MS, () => {
      root.classList.remove('manga-cut-in--open')
      root.classList.add('manga-cut-in--content')
      setStatus('Build complete. 12 artifacts compiled.')
    })

    later(SLIT_MS + OPEN_MS + CONTENT_MS, () => {
      root.classList.remove('manga-cut-in--content')
      root.classList.add('manga-cut-in--hold')
    })

    later(SLIT_MS + OPEN_MS + CONTENT_MS + HOLD_MS, () => {
      root.classList.remove('manga-cut-in--hold')
      root.classList.add('manga-cut-in--exit')
      setHostSplit(false)
    })

    later(SLIT_MS + OPEN_MS + CONTENT_MS + HOLD_MS + EXIT_MS, () => {
      root.hidden = true
      clearPhases(root)
      setStatus('')
      busy = false
      resolve()
    })
  })
}

/** @returns {Promise<void>} */
export async function replayMangaCutIn() {
  if (busy) return
  const root = rootEl()
  if (root) {
    clearTimers()
    clearPhases(root)
    root.hidden = true
    setHostSplit(false)
    setStatus('')
    busy = false
    void root.offsetWidth
  }
  await fireMangaCutIn()
}

function bindUi() {
  document.querySelectorAll('[data-manga-cut-in-trigger]').forEach((btn) => {
    btn.addEventListener('click', () => {
      void fireMangaCutIn()
    })
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayMangaCutIn()
  })
}

bindUi()
