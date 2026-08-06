/**
 * Newspaper Headline Drop — tiny portable trigger API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 */

const IMPACT_AT = 300
const ENTER_MS = 480
const NUDGE_MS = 70
const MARKS_MS = 160
const EXIT_MS = 340

let busy = false
let settled = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-newspaper-drop]')
}

function hostEl() {
  return document.querySelector('[data-newspaper-drop-host]')
}

function clearMotionClasses(root) {
  root.classList.remove(
    'newspaper-drop--enter',
    'newspaper-drop--impact',
    'newspaper-drop--settled',
    'newspaper-drop--exit',
    'newspaper-drop--reduced',
  )
}

function setAnnouncing(root, on) {
  root.setAttribute('aria-hidden', on ? 'false' : 'true')
}

/**
 * Drop the newspaper headline onto the host. Reuses the existing DOM node.
 * @returns {Promise<void>}
 */
export function dropNewspaperHeadline() {
  const root = rootEl()
  const host = hostEl()
  if (!root || busy) return Promise.resolve()

  busy = true
  settled = false
  clearMotionClasses(root)
  host?.classList.remove('newspaper-drop-demo__host--nudge')
  void root.offsetWidth
  setAnnouncing(root, true)

  if (prefersReducedMotion()) {
    root.classList.add('newspaper-drop--reduced', 'newspaper-drop--settled')
    busy = false
    settled = true
    return Promise.resolve()
  }

  root.classList.add('newspaper-drop--enter')

  return new Promise((resolve) => {
    window.setTimeout(() => {
      root.classList.add('newspaper-drop--impact')
      host?.classList.add('newspaper-drop-demo__host--nudge')
      window.setTimeout(() => {
        host?.classList.remove('newspaper-drop-demo__host--nudge')
      }, NUDGE_MS)
      window.setTimeout(() => {
        root.classList.remove('newspaper-drop--impact')
      }, MARKS_MS)
    }, IMPACT_AT)

    window.setTimeout(() => {
      root.classList.remove('newspaper-drop--enter')
      root.classList.add('newspaper-drop--settled')
      busy = false
      settled = true
      resolve()
    }, ENTER_MS)
  })
}

/**
 * Eject the strip sideways. No fade.
 * @returns {Promise<void>}
 */
export function dismissNewspaperHeadline() {
  const root = rootEl()
  if (!root || busy || !settled) return Promise.resolve()

  busy = true
  settled = false

  if (prefersReducedMotion()) {
    clearMotionClasses(root)
    setAnnouncing(root, false)
    busy = false
    return Promise.resolve()
  }

  root.classList.remove('newspaper-drop--settled', 'newspaper-drop--reduced')
  root.classList.add('newspaper-drop--exit')

  return new Promise((resolve) => {
    window.setTimeout(() => {
      clearMotionClasses(root)
      setAnnouncing(root, false)
      busy = false
      resolve()
    }, EXIT_MS)
  })
}

/**
 * Dismiss (if settled) then drop again — no DOM accumulation.
 * @returns {Promise<void>}
 */
export async function replayNewspaperHeadline() {
  if (busy) return
  if (settled) await dismissNewspaperHeadline()
  await dropNewspaperHeadline()
}

function bindUi() {
  document.querySelector('[data-newspaper-drop-trigger]')?.addEventListener('click', () => {
    if (settled) {
      void replayNewspaperHeadline()
    } else {
      void dropNewspaperHeadline()
    }
  })

  document.querySelector('[data-newspaper-drop-dismiss]')?.addEventListener('click', () => {
    if (settled && !busy) void dismissNewspaperHeadline()
  })

  document.querySelector('[data-newspaper-drop-replay]')?.addEventListener('click', () => {
    void replayNewspaperHeadline()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayNewspaperHeadline()
  })
}

bindUi()
