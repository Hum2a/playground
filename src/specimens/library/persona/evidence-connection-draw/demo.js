/**
 * Evidence Connection Draw — select two clues; line draws between them.
 * iframe-safe; no storage / parent / network.
 */

const DRAW_MS = 480

/** @type {string | null} */
let first = null
/** @type {number | null} */
let drawTimer = null

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-ecd]')
}

function setPhase(phase) {
  rootEl()?.setAttribute('data-phase', phase)
}

function setStatus(text) {
  const el = document.querySelector('[data-ecd-status]')
  if (el) el.textContent = text
}

function clueCenter(id) {
  const btn = document.querySelector(`[data-ecd-clue="${id}"]`)
  const stage = document.querySelector('[data-ecd-stage]')
  if (!btn || !stage) return { x: 0, y: 0 }
  const br = btn.getBoundingClientRect()
  const sr = stage.getBoundingClientRect()
  return {
    x: br.left + br.width / 2 - sr.left,
    y: br.top + br.height / 2 - sr.top,
  }
}

function drawLine() {
  if (!first) return
  const second = first === 'a' ? 'b' : 'a'
  const a = clueCenter(first)
  const b = clueCenter(second)
  const line = document.querySelector('[data-ecd-line]')
  if (!line) return
  line.setAttribute('x1', String(a.x))
  line.setAttribute('y1', String(a.y))
  line.setAttribute('x2', String(b.x))
  line.setAttribute('y2', String(b.y))
}

function selectClue(id) {
  const btn = document.querySelector(`[data-ecd-clue="${id}"]`)
  if (!btn) return

  if (first === id) return

  if (!first) {
    first = id
    btn.setAttribute('data-selected', 'true')
    setPhase('selecting')
    setStatus(`Selected ${btn.getAttribute('data-ecd-label')}.`)
    return
  }

  document.querySelector(`[data-ecd-clue="${first}"]`)?.setAttribute('data-selected', 'true')
  btn.setAttribute('data-selected', 'true')
  drawLine()

  if (prefersReducedMotion()) {
    setPhase('linked')
  } else {
    setPhase('drawing')
    if (drawTimer != null) window.clearTimeout(drawTimer)
    drawTimer = window.setTimeout(() => setPhase('linked'), DRAW_MS)
  }

  const aLabel = document.querySelector('[data-ecd-clue="a"]')?.getAttribute('data-ecd-label')
  const bLabel = document.querySelector('[data-ecd-clue="b"]')?.getAttribute('data-ecd-label')
  setStatus(`Linked ${aLabel} and ${bLabel}.`)
}

export function resetConnection() {
  first = null
  if (drawTimer != null) {
    window.clearTimeout(drawTimer)
    drawTimer = null
  }
  document.querySelectorAll('[data-ecd-clue]').forEach((btn) => {
    btn.setAttribute('data-selected', 'false')
  })
  const line = document.querySelector('[data-ecd-line]')
  if (line) {
    line.setAttribute('x1', '0')
    line.setAttribute('y1', '0')
    line.setAttribute('x2', '0')
    line.setAttribute('y2', '0')
  }
  setPhase('idle')
  setStatus('Relationship: none')
}

function bindUi() {
  document.querySelectorAll('[data-ecd-clue]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-ecd-clue')
      if (id) selectClue(id)
    })
  })
  document.querySelector('[data-ecd-reset]')?.addEventListener('click', resetConnection)
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetConnection()
  })
}

bindUi()
resetConnection()
