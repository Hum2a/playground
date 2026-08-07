const COLLAPSE_MS = 320
const MASTER_MS = 480
let busy = false
let timers = []

function rm() {
  return (
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true' ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

function clearTimers() {
  timers.forEach((t) => window.clearTimeout(t))
  timers = []
}

function later(fn, ms) {
  timers.push(window.setTimeout(fn, ms))
}

function root() {
  return document.querySelector('[data-psc]')
}

function announce(phase) {
  const r = root()
  if (!r) return
  const live = r.querySelector('[data-psc-live]')
  const status = r.querySelector('[data-psc-status]')
  const unlock = r.querySelector('[data-psc-unlock]')
  const map = {
    collection: [
      'Collection: 4 of 5 earned.',
      '4 of 5 earned — unlock the final slot to transform the collection.',
    ],
    locking: ['Final slot locking.', 'Phase: locking final achievement.'],
    transform: ['Collection collapsing into master state.', 'Phase: collection → master transform.'],
    master: [
      'Master complete — collection transformed.',
      'MASTER COMPLETE — collection replaced by master emblem.',
    ],
  }
  const pair = map[phase] || map.collection
  if (live) live.textContent = pair[0]
  if (status) status.textContent = pair[1]
  if (unlock) unlock.disabled = phase !== 'collection'
}

function setMasterVisible(on) {
  const master = root()?.querySelector('[data-psc-master]')
  if (master) master.hidden = !on
}

function paintFinalEarned(on) {
  const slot = root()?.querySelector('[data-psc-slot="4"]')
  if (!slot) return
  slot.classList.toggle('is-earned', on)
  const mark = slot.querySelector('.psc__mark')
  const label = slot.querySelector('.psc__slot-label')
  if (mark) {
    mark.className = on ? 'psc__mark psc__mark--platinum' : 'psc__mark psc__mark--empty'
  }
  if (label) label.textContent = on ? 'P' : '?'
}

function unlock() {
  const r = root()
  if (!r || busy || r.getAttribute('data-phase') !== 'collection') return
  busy = true
  clearTimers()

  if (rm()) {
    paintFinalEarned(true)
    setMasterVisible(true)
    r.setAttribute('data-phase', 'master')
    announce('master')
    busy = false
    return
  }

  paintFinalEarned(true)
  r.setAttribute('data-phase', 'locking')
  announce('locking')
  later(() => {
    setMasterVisible(true)
    r.setAttribute('data-phase', 'transform')
    announce('transform')
    later(() => {
      r.setAttribute('data-phase', 'master')
      announce('master')
      busy = false
    }, MASTER_MS)
  }, COLLAPSE_MS)
}

function reset() {
  clearTimers()
  busy = false
  const r = root()
  if (!r) return
  paintFinalEarned(false)
  setMasterVisible(false)
  r.setAttribute('data-phase', 'collection')
  announce('collection')
}

function bind() {
  root()?.querySelector('[data-psc-unlock]')?.addEventListener('click', unlock)
  root()?.querySelector('[data-psc-reset]')?.addEventListener('click', reset)
  window.addEventListener('message', (e) => {
    if (e.data?.type === 'restart') reset()
  })
  reset()
}

bind()
