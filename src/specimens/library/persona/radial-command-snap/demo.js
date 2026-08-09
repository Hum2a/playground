/**
 * Radial Command Snap — tiny portable trigger API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 */

const RADIUS_PX = 92
const ANGLES = [0, 72, 144, 216, 288]
const AUTO_STEP_MS = 620

let activeIndex = 0
let autoTimer = null

function rootEl() {
  return document.querySelector('[data-radial-command]')
}

function options() {
  return Array.from(document.querySelectorAll('[data-radial-option]'))
}

function hubLabel() {
  return document.querySelector('[data-radial-hub]')
}

/**
 * Snap the wheel so option `index` sits at the top pointer.
 * @param {number} index
 */
export function selectCommand(index) {
  const opts = options()
  if (index < 0 || index >= opts.length) return
  activeIndex = index
  const rot = ANGLES[index]

  opts.forEach((opt, i) => {
    const theta = ANGLES[i] - rot
    opt.style.transform = `rotate(${theta}deg) translateY(-${RADIUS_PX}px) rotate(${-theta}deg)`
    opt.setAttribute('aria-checked', i === index ? 'true' : 'false')
  })

  const hub = hubLabel()
  if (hub) {
    hub.textContent = opts[index].textContent?.trim() ?? ''
    hub.classList.remove('radial-command__hub-label--punch')
    void hub.offsetWidth
    hub.classList.add('radial-command__hub-label--punch')
  }
}

function stopAuto() {
  if (autoTimer !== null) {
    window.clearInterval(autoTimer)
    autoTimer = null
  }
}

/**
 * Cycle through every command once, snapping the wheel at each step.
 */
export function replayCycle() {
  stopAuto()
  let step = 0
  selectCommand(0)
  autoTimer = window.setInterval(() => {
    step += 1
    if (step >= ANGLES.length) {
      stopAuto()
      return
    }
    selectCommand(step)
  }, AUTO_STEP_MS)
}

function bindUi() {
  const root = rootEl()
  const replay = document.querySelector('[data-radial-command-replay]')

  options().forEach((opt, i) => {
    opt.addEventListener('click', () => {
      stopAuto()
      selectCommand(i)
    })
  })

  replay?.addEventListener('click', () => {
    replayCycle()
  })

  root?.addEventListener('keydown', (event) => {
    const key = /** @type {KeyboardEvent} */ (event).key
    if (key !== 'ArrowRight' && key !== 'ArrowLeft') return
    event.preventDefault()
    stopAuto()
    const delta = key === 'ArrowRight' ? 1 : -1
    selectCommand((activeIndex + delta + ANGLES.length) % ANGLES.length)
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') replayCycle()
  })
}

bindUi()
replayCycle()
