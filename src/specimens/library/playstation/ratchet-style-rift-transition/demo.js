/**
 * Ratchet-Style Rift Transition (SPX-3490) — slit open → travel → Zone B emerge.
 */

const SLIT_MS = 420
const TRAVEL_MS = 620
const EMERGE_MS = 520
let busy = false

function status(t) {
  const el = document.querySelector('[data-rrt-status]')
  if (el) el.textContent = t
}

function rm() {
  return (
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true' ||
    matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

function run() {
  const root = document.querySelector('[data-rrt]')
  if (!root || busy) return
  busy = true
  const btn = root.querySelector('[data-rrt-run]')
  if (btn) btn.disabled = true

  if (rm()) {
    root.classList.add('is-open', 'is-traveling')
    root.querySelector('[data-rrt-b]').hidden = false
    root.querySelector('[data-rrt-a]').hidden = true
    status('Zone B active — reconstruction complete')
    busy = false
    if (btn) btn.disabled = false
    return
  }

  root.classList.add('is-open')
  status('Rift slit opening…')
  setTimeout(() => {
    root.classList.add('is-traveling')
    root.querySelector('[data-rrt-b]').hidden = false
    status('Traveling through rift…')
    setTimeout(() => {
      status('Zone B active — reconstruction complete')
      busy = false
      if (btn) btn.disabled = false
    }, TRAVEL_MS + EMERGE_MS)
  }, SLIT_MS)
}

function reset() {
  const root = document.querySelector('[data-rrt]')
  if (!root) return
  root.classList.remove('is-open', 'is-traveling')
  root.querySelector('[data-rrt-b]').hidden = true
  root.querySelector('[data-rrt-a]').hidden = false
  status('Zone A active — rift closed')
  busy = false
  const btn = root.querySelector('[data-rrt-run]')
  if (btn) btn.disabled = false
}

function bind() {
  document.querySelector('[data-rrt-run]')?.addEventListener('click', run)
  addEventListener('message', (e) => {
    if (e.data?.type === 'restart') reset()
  })
}

bind()
