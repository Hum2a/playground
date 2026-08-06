const SCAN_MS = 660

let selected = -1
let busy = false
/** @type {number | null} */
let timer = null

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function root() {
  return document.querySelector('[data-target-acquisition]')
}

function cards() {
  return Array.from(document.querySelectorAll('[data-tac-target]'))
}

function setLive(text) {
  const el = document.querySelector('[data-tac-live]')
  if (el) el.textContent = text
}

function pick(index) {
  selected = index
  cards().forEach((c, i) => {
    c.classList.toggle('is-picked', i === index)
  })
  const r = root()
  if (r) {
    r.dataset.selected = String(index)
    r.dataset.phase = 'idle'
  }
  setLive(`Target ${index + 1} selected. Ready to scan.`)
  const scan = document.querySelector('[data-tac-scan]')
  if (scan) scan.disabled = false
}

function applyLocked() {
  const r = root()
  if (!r) return
  r.dataset.phase = 'locked'
  const name = cards()[selected]?.querySelector('.tac__name')?.textContent || 'TARGET'
  setLive(`${name} locked. Confidence 92%.`)
  const scan = document.querySelector('[data-tac-scan]')
  if (scan) scan.disabled = true
}

function resetAll() {
  if (timer) window.clearTimeout(timer)
  timer = null
  busy = false
  selected = -1
  cards().forEach((c) => c.classList.remove('is-picked'))
  const r = root()
  if (r) {
    r.dataset.selected = ''
    r.dataset.phase = 'idle'
  }
  setLive('Select a target to scan.')
  const scan = document.querySelector('[data-tac-scan]')
  if (scan) scan.disabled = true
}

export function runTargetAcquisition() {
  if (busy || selected < 0) return Promise.resolve()
  const r = root()
  if (!r || r.dataset.phase === 'locked') return Promise.resolve()

  busy = true
  if (timer) window.clearTimeout(timer)
  r.dataset.phase = 'scan'
  setLive('Acquiring target…')
  void r.offsetWidth

  if (prefersReducedMotion()) {
    applyLocked()
    busy = false
    return Promise.resolve()
  }

  return new Promise((resolve) => {
    timer = window.setTimeout(() => {
      applyLocked()
      busy = false
      timer = null
      resolve()
    }, SCAN_MS)
  })
}

export function resetTargetAcquisition() {
  resetAll()
  void root()?.offsetWidth
}

export async function replayTargetAcquisition() {
  if (busy) return
  const idx = selected >= 0 ? selected : 0
  resetAll()
  pick(idx)
  void root()?.offsetWidth
  await runTargetAcquisition()
}

function bind() {
  cards().forEach((card) => {
    card.addEventListener('click', () => {
      if (root()?.dataset.phase === 'locked') return
      pick(Number(card.dataset.index || 0))
    })
  })
  document.querySelector('[data-tac-scan]')?.addEventListener('click', () => {
    void runTargetAcquisition()
  })
  window.addEventListener('message', (e) => {
    if (e.data?.type === 'restart') resetAll()
  })
  const scan = document.querySelector('[data-tac-scan]')
  if (scan) scan.disabled = true
}

bind()
