/**
 * Directional Speed Wipe — 24 predetermined RTL manga speed lines.
 * iframe-safe; no storage / parent / network.
 */

const LINE_COUNT = 24
const TOTAL_MS = 580

/**
 * Predetermined geometry (identical every replay).
 * len 80–260, th 2–6, ang ±2deg, top %, delay 0–60ms.
 * @type {{ top: string, len: number, th: number, ang: number, delay: number }[]}
 */
const LINES = [
  { top: '4%', len: 120, th: 3, ang: -1.2, delay: 0 },
  { top: '8%', len: 200, th: 4, ang: 0.5, delay: 12 },
  { top: '12%', len: 95, th: 2, ang: -0.8, delay: 4 },
  { top: '16%', len: 240, th: 5, ang: 1.5, delay: 20 },
  { top: '20%', len: 160, th: 3, ang: 0, delay: 8 },
  { top: '24%', len: 110, th: 6, ang: -1.8, delay: 28 },
  { top: '28%', len: 255, th: 2, ang: 1.0, delay: 0 },
  { top: '32%', len: 180, th: 4, ang: -0.3, delay: 16 },
  { top: '36%', len: 88, th: 3, ang: 1.8, delay: 36 },
  { top: '40%', len: 210, th: 5, ang: -1.5, delay: 6 },
  { top: '44%', len: 145, th: 2, ang: 0.2, delay: 24 },
  { top: '48%', len: 230, th: 4, ang: -0.6, delay: 10 },
  { top: '52%', len: 100, th: 3, ang: 1.2, delay: 40 },
  { top: '56%', len: 175, th: 6, ang: -1.0, delay: 2 },
  { top: '60%', len: 250, th: 3, ang: 0.8, delay: 18 },
  { top: '64%', len: 130, th: 4, ang: -1.6, delay: 32 },
  { top: '68%', len: 190, th: 2, ang: 0.4, delay: 14 },
  { top: '72%', len: 82, th: 5, ang: 1.6, delay: 44 },
  { top: '76%', len: 220, th: 3, ang: -0.2, delay: 22 },
  { top: '80%', len: 155, th: 4, ang: 1.1, delay: 8 },
  { top: '84%', len: 205, th: 2, ang: -1.4, delay: 48 },
  { top: '88%', len: 115, th: 5, ang: 0.6, delay: 26 },
  { top: '92%', len: 245, th: 3, ang: -0.9, delay: 52 },
  { top: '96%', len: 170, th: 4, ang: 1.3, delay: 60 },
]

let busy = false
let linesBuilt = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-mdsw]')
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

function setLive(text) {
  const el = document.querySelector('[data-mdsw-live]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-mdsw-run], [data-mdsw-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function setPhase(phase) {
  rootEl()?.setAttribute('data-phase', phase)
}

function ensureLines() {
  const host = document.querySelector('[data-mdsw-lines]')
  if (!host || linesBuilt) return
  if (LINES.length !== LINE_COUNT) {
    throw new Error(`Expected ${LINE_COUNT} lines, got ${LINES.length}`)
  }
  const frag = document.createDocumentFragment()
  for (const line of LINES) {
    const el = document.createElement('span')
    el.className = 'mdsw__line'
    el.style.setProperty('--top', line.top)
    el.style.setProperty('--len', `${line.len}px`)
    el.style.setProperty('--th', `${line.th}px`)
    el.style.setProperty('--ang', `${line.ang}deg`)
    el.style.setProperty('--delay', `${line.delay}ms`)
    frag.appendChild(el)
  }
  host.appendChild(frag)
  linesBuilt = true
}

function clearLineNodes() {
  const host = document.querySelector('[data-mdsw-lines]')
  if (!host) return
  host.replaceChildren()
  linesBuilt = false
}

function showDone() {
  const out = document.querySelector('[data-mdsw-out]')
  const inn = document.querySelector('[data-mdsw-in]')
  setPhase('done')
  out?.setAttribute('aria-hidden', 'true')
  inn?.setAttribute('aria-hidden', 'false')
  clearLineNodes()
  setLive('Panel B. Destination settled.')
}

function resetVisual() {
  const out = document.querySelector('[data-mdsw-out]')
  const inn = document.querySelector('[data-mdsw-in]')
  setPhase('idle')
  out?.setAttribute('aria-hidden', 'false')
  inn?.setAttribute('aria-hidden', 'true')
  clearLineNodes()
  ensureLines()
  setLive('Panel A. Ready for directional speed wipe.')
}

/** @returns {Promise<void>} */
export function runMangaDirectionalSpeedWipe() {
  const root = rootEl()
  if (!root || busy) {
    return Promise.resolve()
  }

  busy = true
  clearTimers()
  setButtons(false)
  resetVisual()
  void root.offsetWidth

  if (prefersReducedMotion()) {
    showDone()
    busy = false
    setButtons(true)
    return Promise.resolve()
  }

  ensureLines()
  setPhase('wipe')
  setLive('Speed lines travelling right to left.')

  return new Promise((resolve) => {
    later(TOTAL_MS, () => {
      showDone()
      busy = false
      setButtons(true)
      resolve()
    })
  })
}

export function resetMangaDirectionalSpeedWipe() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayMangaDirectionalSpeedWipe() {
  if (busy) return
  resetMangaDirectionalSpeedWipe()
  void rootEl()?.offsetWidth
  await runMangaDirectionalSpeedWipe()
}

function bindUi() {
  document.querySelector('[data-mdsw-run]')?.addEventListener('click', () => {
    void runMangaDirectionalSpeedWipe()
  })
  document.querySelector('[data-mdsw-replay]')?.addEventListener('click', () => {
    void replayMangaDirectionalSpeedWipe()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayMangaDirectionalSpeedWipe()
  })
}

ensureLines()
bindUi()
resetMangaDirectionalSpeedWipe()
