/**
 * Multi-Key Seal — three prerequisite key nodes must arm before petals open.
 * iframe-safe; no storage / parent / network.
 */

const KEY_COUNT = 3
const KEY_STEP_MS = 150
const PETAL_OPEN_MS = 300
const CORE_PULSE_MS = 150
const SETTLE_MS = 90

let busy = false
let armed = 0
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-mks]')
}

function nodes() {
  return Array.from(document.querySelectorAll('[data-mks-node]'))
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
  const el = document.querySelector('[data-mks-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-mks-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-mks-hint]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-mks-run], [data-mks-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function paintNodes(count) {
  nodes().forEach((node, i) => {
    const on = i < count
    node.setAttribute('data-armed', on ? 'true' : 'false')
    node.setAttribute('aria-label', `Key node ${i + 1} ${on ? 'armed' : 'unarmed'}`)
  })
}

function openSeal() {
  const root = rootEl()
  if (!root) return
  root.setAttribute('data-phase', 'done')
  root.setAttribute('data-pulse', 'true')
  setStatus('OPEN')
  setHint('Seal opened.')
  setLive('All three key nodes armed. Seal open.')
  later(CORE_PULSE_MS, () => root.removeAttribute('data-pulse'))
}

function resetVisual() {
  armed = 0
  paintNodes(0)
  const root = rootEl()
  root?.setAttribute('data-phase', 'idle')
  root?.removeAttribute('data-pulse')
  setStatus('SEALED')
  setHint('Press Run to arm the three key nodes.')
  setLive('Seal closed. No key nodes armed.')
}

/**
 * Auto-run the full key-arm + open sequence (demo Run).
 * @returns {Promise<void>}
 */
export function runMultiKeySeal() {
  const root = rootEl()
  if (!root || busy || root.getAttribute('data-phase') === 'done') {
    return Promise.resolve()
  }

  busy = true
  clearTimers()
  resetVisual()
  setButtons(false)
  void root.offsetWidth

  if (prefersReducedMotion()) {
    paintNodes(KEY_COUNT)
    openSeal()
    busy = false
    setButtons(true)
    return Promise.resolve()
  }

  root.setAttribute('data-phase', 'arming')
  setStatus('ARMING')
  setLive('Arming key nodes.')

  return new Promise((resolve) => {
    let step = 0
    const tick = () => {
      if (step >= KEY_COUNT) {
        later(PETAL_OPEN_MS, () => {
          openSeal()
          later(SETTLE_MS, () => {
            busy = false
            setButtons(true)
            resolve()
          })
        })
        return
      }
      armed = step + 1
      paintNodes(armed)
      setLive(`Key node ${armed} of ${KEY_COUNT} armed.`)
      step += 1
      later(KEY_STEP_MS, tick)
    }
    tick()
  })
}

export function resetMultiKeySeal() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayMultiKeySeal() {
  if (busy) return
  resetMultiKeySeal()
  void rootEl()?.offsetWidth
  await runMultiKeySeal()
}

/**
 * Manual key path: keys 1–3 in order arm one node each.
 * @param {number} index 0-based
 */
function armOne(index) {
  const root = rootEl()
  if (!root || busy || root.getAttribute('data-phase') === 'done') return
  if (index !== armed) return
  if (prefersReducedMotion()) {
    paintNodes(KEY_COUNT)
    openSeal()
    return
  }
  root.setAttribute('data-phase', 'arming')
  setStatus('ARMING')
  armed = index + 1
  paintNodes(armed)
  setLive(`Key node ${armed} of ${KEY_COUNT} armed.`)
  if (armed >= KEY_COUNT) {
    later(PETAL_OPEN_MS, () => openSeal())
  }
}

function bindUi() {
  document.querySelector('[data-mks-run]')?.addEventListener('click', () => {
    void runMultiKeySeal()
  })
  document.querySelector('[data-mks-replay]')?.addEventListener('click', () => {
    void replayMultiKeySeal()
  })
  window.addEventListener('keydown', (event) => {
    if (event.metaKey || event.ctrlKey || event.altKey) return
    const n = Number(event.key)
    if (n >= 1 && n <= KEY_COUNT) {
      event.preventDefault()
      armOne(n - 1)
    }
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayMultiKeySeal()
  })
}

bindUi()
resetMultiKeySeal()
