/**
 * Pixel HP Drain (SPX-859) — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 *
 * 20 discrete blocks. Start 18 filled. Remove 11 right→left at 45ms/block.
 * No width transitions — stepped class toggles only.
 */

const MAX = 20
const START = 18
const DAMAGE = 11
const END = START - DAMAGE // 7
const BLOCK_MS = 45
const IMPACT_MS = 45
const THRESH_MID = 10
const THRESH_LOW = 5

let busy = false
let hp = START
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
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

function rootEl() {
  return document.querySelector('[data-pixel-hp]')
}

function setStatus(root, text) {
  const status = root.querySelector('[data-php-status]')
  if (!status) return
  status.textContent = ''
  void status.offsetWidth
  status.textContent = text
}

function blocks() {
  return Array.from(document.querySelectorAll('[data-php-block]'))
}

function setHp(value) {
  hp = value
  const root = rootEl()
  if (!root) return

  const current = root.querySelector('[data-php-current]')
  const meter = root.querySelector('[data-php-bar]')
  const low = root.querySelector('[data-php-low]')

  if (current) current.textContent = String(value)
  if (meter) {
    meter.setAttribute('aria-valuenow', String(value))
    meter.setAttribute('aria-valuetext', `${value} of ${MAX}`)
  }

  // Tone from remaining filled count
  let tone = 'high'
  if (value <= THRESH_LOW) tone = 'low'
  else if (value <= THRESH_MID) tone = 'mid'
  root.setAttribute('data-tone', tone)

  if (low) low.hidden = value > THRESH_LOW

  const els = blocks()
  for (let i = 0; i < els.length; i++) {
    // Blocks 0..value-1 filled (left = full), rightmost filled is value-1
    if (i < value) els[i].classList.add('is-filled')
    else els[i].classList.remove('is-filled')
  }
}

function setState(state) {
  rootEl()?.setAttribute('data-state', state)
}

function setBusy(on) {
  busy = on
  const root = rootEl()
  if (!root) return
  const dmg = root.querySelector('[data-php-damage]')
  const reset = root.querySelector('[data-php-reset]')
  if (dmg) dmg.disabled = on
  if (reset) reset.disabled = on && hp !== END
}

/**
 * Run discrete pixel damage drain: 18 → 7.
 * @returns {Promise<void>}
 */
export function runPixelHpDrain() {
  if (busy) return Promise.resolve()
  if (hp <= END) return Promise.resolve()

  const root = rootEl()
  if (!root) return Promise.resolve()

  busy = true
  clearTimers()
  setBusy(true)
  setState('draining')

  const delta = root.querySelector('[data-php-delta]')
  if (delta) delta.classList.add('is-on')

  if (prefersReducedMotion()) {
    setHp(END)
    setState('done')
    if (delta) delta.classList.remove('is-on')
    setBusy(false)
    busy = false
    setStatus(root, `HP ${END} of ${MAX}.`)
    return Promise.resolve()
  }

  // Impact: 2 logical pixels right, then return (stepped)
  root.classList.add('is-impact')

  return new Promise((resolve) => {
    later(IMPACT_MS, () => {
      root.classList.remove('is-impact')
      root.classList.add('is-impact-back')
    })

    later(IMPACT_MS * 2, () => {
      root.classList.remove('is-impact-back')

      let remaining = hp
      let step = 0

      function tick() {
        if (step >= DAMAGE) {
          setHp(END)
          setState('done')
          if (delta) delta.classList.remove('is-on')
          setBusy(false)
          busy = false
          setStatus(root, `HP ${END} of ${MAX}.`)
          resolve()
          return
        }
        remaining -= 1
        setHp(remaining)
        step += 1
        later(BLOCK_MS, tick)
      }

      tick()
    })
  })
}

/**
 * Restore HP 18/20.
 * @returns {Promise<void>}
 */
export function runPixelHpReset() {
  clearTimers()
  busy = false
  const root = rootEl()
  root?.classList.remove('is-impact', 'is-impact-back')
  const delta = root?.querySelector('[data-php-delta]')
  if (delta) delta.classList.remove('is-on')
  setHp(START)
  setState('idle')
  setBusy(false)
  if (root) setStatus(root, '')
  return Promise.resolve()
}

function bindUi() {
  document.querySelector('[data-php-damage]')?.addEventListener('click', () => {
    void runPixelHpDrain()
  })
  document.querySelector('[data-php-reset]')?.addEventListener('click', () => {
    void runPixelHpReset()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') {
      void runPixelHpReset().then(() => runPixelHpDrain())
    }
  })
}

setHp(START)
bindUi()
