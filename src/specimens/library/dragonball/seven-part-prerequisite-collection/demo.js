/**
 * Seven-Part Prerequisite Collection — signal-radar collection API.
 * Sandboxed iframe only; no parent / storage / network.
 *
 * Frozen timeline (ms from ACQUIRE SIGNAL):
 *   0–300    seventh star signal flies to vacant APPROVAL receptacle
 *   300–420  shape seats (1 → 1.14 → 1); count becomes 7/7
 *   420–560  hold complete constellation
 *   560–800  seven SVG links draw hub-ward (28ms stagger)
 *   800+     hub flares; COMPLETE / PUBLISH READY
 */

const ACQUIRE_MS = 300
const DOCK_MS = 120
const HOLD_MS = 140
const LINK_MS = 240
const FLARE_MS = 280

/** @type {number[]} */
let timers = []
let busy = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function root() {
  return document.querySelector('[data-prerequisite-collection]')
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

function setCopy(el, { count, status, sr }) {
  const countEl = el.querySelector('[data-spc-count]')
  const statusEl = el.querySelector('[data-spc-status]')
  const srEl = el.querySelector('[data-spc-sr]')
  if (countEl) countEl.textContent = count
  if (statusEl) statusEl.textContent = status
  if (srEl) srEl.textContent = sr
}

function setControls(el, { receive, reset, publish }) {
  const receiveBtn = el.querySelector('[data-spc-receive]')
  const resetBtn = el.querySelector('[data-spc-reset]')
  const publishBtn = el.querySelector('[data-spc-publish]')
  const lockEl = el.querySelector('[data-spc-lock]')
  if (receiveBtn) {
    receiveBtn.disabled = !receive
    receiveBtn.hidden = !receive
  }
  if (resetBtn) resetBtn.hidden = !reset
  if (publishBtn) publishBtn.disabled = !publish
  if (lockEl) lockEl.textContent = publish ? 'READY' : 'LOCKED'
}

function applyReady(el) {
  el.dataset.state = 'ready'
  setCopy(el, {
    count: '7 / 7',
    status: 'COMPLETE',
    sr: '7 of 7 collection signals resolved. Constellation linked. Publish ready.',
  })
  setControls(el, { receive: false, reset: true, publish: true })
  busy = false
}

function receive() {
  const el = root()
  if (!el || busy || el.dataset.state === 'ready') return

  busy = true
  clearTimers()
  setControls(el, { receive: false, reset: false, publish: false })

  if (prefersReducedMotion()) {
    applyReady(el)
    return
  }

  el.dataset.state = 'acquire'
  setCopy(el, {
    count: '6 / 7',
    status: 'ACQUIRING',
    sr: 'Acquiring approval signal toward vacant star receptacle.',
  })

  later(ACQUIRE_MS, () => {
    el.dataset.state = 'dock'
    setCopy(el, {
      count: '7 / 7',
      status: 'SEATING',
      sr: '7 of 7 collection signals resolved. Star seating in matched receptacle.',
    })

    later(DOCK_MS, () => {
      el.dataset.state = 'hold'
      setCopy(el, {
        count: '7 / 7',
        status: 'INCOMPLETE',
        sr: '7 of 7 collection signals resolved. Holding before constellation link.',
      })

      later(HOLD_MS, () => {
        el.dataset.state = 'link'
        setCopy(el, {
          count: '7 / 7',
          status: 'LINKING',
          sr: 'Seven links drawing toward central hub.',
        })

        later(LINK_MS, () => {
          applyReady(el)
        })
      })
    })
  })
}

function reset() {
  const el = root()
  if (!el) return

  clearTimers()
  busy = false
  el.dataset.state = 'idle'
  setCopy(el, {
    count: '6 / 7',
    status: 'INCOMPLETE',
    sr: '6 of 7 collection signals resolved. Approval slot vacant. Publish locked.',
  })
  setControls(el, { receive: true, reset: false, publish: false })
}

function init() {
  const el = root()
  if (!el || el.dataset.bound === '1') return
  el.dataset.bound = '1'
  el.querySelector('[data-spc-receive]')?.addEventListener('click', receive)
  el.querySelector('[data-spc-reset]')?.addEventListener('click', reset)

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') reset()
  })
}

window.sevenPartPrerequisiteCollection = { receive, reset, init }

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true })
} else {
  init()
}
