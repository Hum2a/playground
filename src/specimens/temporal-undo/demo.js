/**
 * Temporal Undo — reverse of Erasure Delete geometry (SPX-1119 companion).
 * Boundary travels top-left → bottom-right; 12 fragments return from scatter.
 * Portable; does not import erasure-delete.
 *
 * Frozen timings from UNDO:
 *   timeline 650ms NOW→-3 · reverse erase 620ms · hold 80ms · timeline retract
 */

const REWIND_MS = 620
const TIMELINE_MS = 650
const HOLD_MS = 80
const RETRACT_MS = 160
const DONE_AT = TIMELINE_MS + HOLD_MS + RETRACT_MS

let busy = false
/** @type {number[]} */
let timers = []

function root() {
  return document.querySelector('[data-temporal-undo]')
}

function reduced() {
  return (
    document.documentElement.getAttribute('data-force-reduced-motion') ===
      'true' ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

function later(ms, fn) {
  timers.push(window.setTimeout(fn, ms))
}

function clear() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function setLive(el, text) {
  const s = el.querySelector('[data-tu-status]')
  if (s) s.textContent = text
}

function setButtons(el, undo, reset) {
  const u = el.querySelector('[data-tu-undo]')
  const r = el.querySelector('[data-tu-reset]')
  if (u) {
    u.hidden = !undo
    u.disabled = !undo
  }
  if (r) r.hidden = !reset
}

function showRestored(el) {
  el.dataset.state = 'restored'
  el.querySelector('[data-tu-deleted]').hidden = true
  const card = el.querySelector('[data-tu-card]')
  card.hidden = false
  el.querySelector('[data-tu-restored]').hidden = false
  el.querySelector('[data-tu-timeline]').setAttribute('aria-hidden', 'true')
  setLive(el, 'Record 028 restored.')
  setButtons(el, false, true)
  busy = false
}

/**
 * Run temporal undo / reverse erasure.
 */
export function runTemporalUndo() {
  const el = root()
  if (!el || busy || el.dataset.state === 'restored') return Promise.resolve()

  busy = true
  setButtons(el, false, false)

  if (reduced()) {
    showRestored(el)
    return Promise.resolve()
  }

  el.querySelector('[data-tu-deleted]').hidden = true
  const card = el.querySelector('[data-tu-card]')
  card.hidden = false
  el.querySelector('[data-tu-restored]').hidden = true
  el.querySelector('[data-tu-timeline]').setAttribute('aria-hidden', 'false')

  el.dataset.state = 'rewinding'
  setLive(el, 'Rewinding Record 028')

  return new Promise((resolve) => {
    later(REWIND_MS, () => {
      el.dataset.state = 'locking'
      setLive(el, 'Record 028 restored.')
    })

    later(TIMELINE_MS + HOLD_MS, () => {
      el.dataset.state = 'retracting'
    })

    later(DONE_AT, () => {
      showRestored(el)
      resolve()
    })
  })
}

export function resetTemporalUndo() {
  const el = root()
  if (!el) return
  clear()
  busy = false
  el.dataset.state = 'deleted'
  el.querySelector('[data-tu-deleted]').hidden = false
  el.querySelector('[data-tu-card]').hidden = true
  el.querySelector('[data-tu-restored]').hidden = true
  el.querySelector('[data-tu-timeline]').setAttribute('aria-hidden', 'true')
  setLive(el, 'Record 028 deleted.')
  setButtons(el, true, false)
  void el.offsetWidth
}

function bind() {
  const el = root()
  if (!el || el.dataset.bound) return
  el.dataset.bound = '1'
  el.querySelector('[data-tu-undo]')?.addEventListener('click', () => {
    void runTemporalUndo()
  })
  el.querySelector('[data-tu-reset]')?.addEventListener('click', () => {
    resetTemporalUndo()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetTemporalUndo()
  })
}

bind()
resetTemporalUndo()

window.temporalUndo = {
  undo: runTemporalUndo,
  reset: resetTemporalUndo,
}
