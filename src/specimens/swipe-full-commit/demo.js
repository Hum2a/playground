/**
 * Swipe Full Commit — two-threshold destructive row swipe with auto-delete.
 */

const ROW_W = 340
const REVEAL_THRESHOLD = 72
const COMMIT_THRESHOLD = 190
const ACTION_OPEN = 88
const COLLAPSE_MS = 220
const ROW_H = 64

/** @type {boolean} */
let dragging = false
/** @type {boolean} */
let deleted = false
/** @type {number} */
let offset = 0
/** @type {number} */
let startX = 0
/** @type {number} */
let pointerId = -1

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function root() {
  return document.querySelector('[data-swipe-full-commit]')
}

function row() {
  return document.querySelector('[data-sfc-row]')
}

function rowWrap() {
  return document.querySelector('[data-sfc-row-wrap]')
}

function action() {
  return document.querySelector('[data-sfc-action]')
}

function commitMarker() {
  return document.querySelector('[data-sfc-commit-marker]')
}

function undoBtn() {
  return document.querySelector('[data-sfc-undo]')
}

function statusEl() {
  return document.querySelector('[data-sfc-status]')
}

function setStatus(text) {
  const el = statusEl()
  if (el) el.textContent = text
}

function setPhase(phase) {
  root()?.setAttribute('data-phase', phase)
}

/**
 * @param {number} x negative = left swipe
 */
function applyOffset(x) {
  offset = Math.min(0, x)
  const r = row()
  const act = action()
  const marker = commitMarker()
  if (!r || !act) return

  const abs = Math.abs(offset)
  r.style.transform = `translate3d(${offset}px, 0, 0)`
  act.classList.toggle('is-readable', abs >= REVEAL_THRESHOLD)
  act.classList.toggle('is-full', abs >= COMMIT_THRESHOLD)
  marker?.classList.toggle('is-visible', abs >= COMMIT_THRESHOLD)

  if (abs >= COMMIT_THRESHOLD) {
    setPhase('commit-armed')
    setStatus('Full commit threshold — release to delete automatically.')
  } else if (abs >= REVEAL_THRESHOLD) {
    setPhase('action-open')
    setStatus('DELETE fully readable — continue or release.')
  } else if (abs > 0) {
    setPhase('swiping')
    setStatus(`Swiping ${abs}px.`)
  } else {
    setPhase('idle')
    setStatus('Swipe CACHE // BUILD-04 left. DELETE readable at 72px; full commit at 190px.')
  }
}

function animateTo(target, onDone) {
  if (prefersReducedMotion()) {
    applyOffset(target)
    onDone?.()
    return
  }
  const from = offset
  const t0 = performance.now()
  const duration = 220
  const tick = (now) => {
    const t = Math.min((now - t0) / duration, 1)
    const eased = 1 - Math.pow(1 - t, 3)
    applyOffset(from + (target - from) * eased)
    if (t < 1) requestAnimationFrame(tick)
    else onDone?.()
  }
  requestAnimationFrame(tick)
}

function collapseRow() {
  deleted = true
  const wrap = rowWrap()
  const undo = undoBtn()
  if (!wrap) return

  setPhase('deleting')
  wrap.classList.add('is-collapsing')
  if (prefersReducedMotion()) {
    wrap.style.height = '0px'
    wrap.style.opacity = '0'
    finishDelete()
    return
  }

  wrap.style.transition = `height ${COLLAPSE_MS}ms ease, opacity ${COLLAPSE_MS}ms ease`
  wrap.style.height = '0px'
  wrap.style.opacity = '0'
  window.setTimeout(finishDelete, COLLAPSE_MS)
}

function finishDelete() {
  rowWrap()?.classList.add('is-deleted')
  undoBtn()?.removeAttribute('hidden')
  setPhase('deleted')
  setStatus('CACHE // BUILD-04 deleted. UNDO restores row.')
}

function settleAfterRelease() {
  const abs = Math.abs(offset)
  if (abs >= COMMIT_THRESHOLD) {
    applyOffset(-ROW_W)
    collapseRow()
    return
  }

  if (abs >= ACTION_OPEN || (abs >= REVEAL_THRESHOLD && abs < COMMIT_THRESHOLD && abs > (REVEAL_THRESHOLD + ACTION_OPEN) / 2)) {
    animateTo(-ACTION_OPEN, () => setStatus('Action revealed at 88px — swipe further or close.'))
    return
  }

  animateTo(0)
}

function onPointerDown(event) {
  if (deleted || event.button !== 0) return
  dragging = true
  startX = event.clientX - offset
  pointerId = event.pointerId
  row()?.setPointerCapture(event.pointerId)
}

function onPointerMove(event) {
  if (!dragging || deleted) return
  const x = event.clientX - startX
  if (x > 0) return
  event.preventDefault()
  applyOffset(x)
}

function onPointerUp(event) {
  if (!dragging) return
  dragging = false
  row()?.releasePointerCapture(pointerId)
  settleAfterRelease()
}

export function undoSwipeFullCommit() {
  const wrap = rowWrap()
  const undo = undoBtn()
  if (!wrap) return

  deleted = false
  wrap.classList.remove('is-collapsing', 'is-deleted')
  wrap.style.height = ''
  wrap.style.opacity = ''
  wrap.style.transition = ''
  offset = 0
  applyOffset(0)
  undo?.setAttribute('hidden', '')
  setPhase('idle')
  setStatus('CACHE // BUILD-04 restored. Swipe left for DELETE.')
}

export function resetSwipeFullCommit() {
  undoSwipeFullCommit()
}

function bindUi() {
  const r = row()
  if (!r) return
  r.addEventListener('pointerdown', onPointerDown)
  r.addEventListener('pointermove', onPointerMove)
  r.addEventListener('pointerup', onPointerUp)
  r.addEventListener('pointercancel', onPointerUp)
  undoBtn()?.addEventListener('click', undoSwipeFullCommit)
  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      resetSwipeFullCommit()
    }
  })
}

bindUi()
resetSwipeFullCommit()

export const SWIPE_FULL_COMMIT_CONTRACT = {
  ROW_W,
  REVEAL_THRESHOLD,
  COMMIT_THRESHOLD,
  ACTION_OPEN,
  COLLAPSE_MS,
  ROW_H,
}
