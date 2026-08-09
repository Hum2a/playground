/**
 * Moon Orbit Selection — tiny portable trigger API.
 * iframe-safe; no parent / storage / network.
 */

const ANGLES = [0, 72, 144, 216, 288]

let activeIndex = 0
/** Continuous angle in degrees (may exceed 0–360). */
let currentAngle = 0

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const closest = document.querySelector('[data-force-reduced-motion="true"]')
  return forced || !!closest || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function options() {
  return Array.from(document.querySelectorAll('[data-mos-opt]'))
}

function markerEl() {
  return document.querySelector('[data-mos-marker]')
}

/**
 * Shortest signed delta in (−180, 180].
 * @param {number} from
 * @param {number} to
 */
function shortestDelta(from, to) {
  const fromNorm = ((from % 360) + 360) % 360
  const toNorm = ((to % 360) + 360) % 360
  let delta = toNorm - fromNorm
  if (delta > 180) delta -= 360
  if (delta <= -180) delta += 360
  return delta
}

/**
 * Move the crescent to option `index` along the shortest arc.
 * @param {number} index
 */
export function selectOrbit(index) {
  const opts = options()
  if (index < 0 || index >= opts.length) return
  activeIndex = index

  const target = ANGLES[index]
  currentAngle = currentAngle + shortestDelta(currentAngle, target)

  const marker = markerEl()
  if (marker) {
    if (prefersReducedMotion()) {
      marker.style.transition = 'none'
    } else {
      marker.style.transition = ''
    }
    marker.style.setProperty('--mos-angle', `${currentAngle}deg`)
  }

  opts.forEach((opt, i) => {
    const on = i === index
    opt.setAttribute('aria-checked', on ? 'true' : 'false')
    opt.tabIndex = on ? 0 : -1
  })
}

export function resetOrbit() {
  currentAngle = 0
  selectOrbit(0)
}

function bindUi() {
  const field = document.querySelector('[data-mos-field]')
  const opts = options()

  opts.forEach((opt, i) => {
    opt.addEventListener('click', () => {
      selectOrbit(i)
    })
  })

  field?.addEventListener('keydown', (event) => {
    const key = /** @type {KeyboardEvent} */ (event).key
    const count = ANGLES.length

    if (key === 'ArrowRight' || key === 'ArrowDown') {
      event.preventDefault()
      selectOrbit((activeIndex + 1) % count)
      opts[activeIndex]?.focus()
      return
    }
    if (key === 'ArrowLeft' || key === 'ArrowUp') {
      event.preventDefault()
      selectOrbit((activeIndex - 1 + count) % count)
      opts[activeIndex]?.focus()
      return
    }
    if (key === 'Enter') {
      event.preventDefault()
      const focused = document.activeElement
      const i = opts.indexOf(/** @type {HTMLElement} */ (focused))
      selectOrbit(i >= 0 ? i : activeIndex)
    }
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetOrbit()
  })
}

bindUi()
resetOrbit()
