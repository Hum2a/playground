/**
 * Evidence Connection Draw — select two clues; line draws between them.
 * iframe-safe; no storage / parent / network.
 */

/** @type {string | null} */
let first = null

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

function setLive(text) {
  const el = document.querySelector('[data-ecd-live]')
  if (el) el.textContent = text
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
    setLive(`Selected ${btn.getAttribute('data-ecd-label')}.`)
    setStatus('Relationship: selecting…')
    return
  }

  document.querySelector(`[data-ecd-clue="${first}"]`)?.setAttribute('data-selected', 'true')
  btn.setAttribute('data-selected', 'true')
  drawLine()

  if (prefersReducedMotion()) {
    setPhase('linked')
  } else {
    setPhase('drawing')
    window.setTimeout(() => setPhase('linked'), 480)
  }

  const aLabel = document.querySelector('[data-ecd-clue="a"]')?.getAttribute('data-ecd-label')
  const bLabel = document.querySelector('[data-ecd-clue="b"]')?.getAttribute('data-ecd-label')
  setLive(`Linked ${aLabel} and ${bLabel}.`)
  setStatus('Relationship: linked')
}

function resetConnection() {
  first = null
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
  setLive('Select two clues to connect.')
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
