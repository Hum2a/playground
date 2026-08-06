/**
 * Android Invalid Drop Return — rejected drag proxy returns with overshoot.
 * Sandbox-safe (no parent / storage / network).
 */

const CARD_W = 220
const CARD_H = 70
const DRAG_THRESHOLD = 6
const RETURN_MS = 260
const OVERSHOOT_MAX = 6
const INVALID_FLASH_MS = 90
const POINTER_OFFSET = 8

let phase = 'idle'
let dragging = false
let proxyActive = false
/** @type {{ x: number; y: number } | null} */
let dragOffset = null
/** @type {{ x: number; y: number } | null} */
let sourcePos = null
/** @type {number} */
let startX = 0
/** @type {number} */
let startY = 0

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function root() {
  return document.querySelector('[data-android-invalid-drop-return]')
}

function proxy() {
  return document.querySelector('[data-aidr-proxy]')
}

function setPhase(next) {
  phase = next
  root()?.setAttribute('data-phase', next)
}

function setStatus(text) {
  const el = document.querySelector('[data-aidr-status]')
  if (el) el.textContent = text
}

function stageRect() {
  return document.querySelector('[data-aidr-stage]')?.getBoundingClientRect()
}

function positionProxy(x, y) {
  const el = proxy()
  if (!el) return
  el.style.transform = `translate(${x}px, ${y}px)`
}

function showProxyAtSource() {
  const source = document.querySelector('[data-aidr-source]')
  const stage = document.querySelector('[data-aidr-stage]')
  const el = proxy()
  const placeholder = document.querySelector('[data-aidr-placeholder]')
  if (!source || !stage || !el) return

  const sr = stage.getBoundingClientRect()
  const sourceRect = source.getBoundingClientRect()
  const x = sourceRect.left - sr.left
  const y = sourceRect.top - sr.top
  sourcePos = { x, y }

  el.hidden = false
  el.setAttribute('aria-hidden', 'false')
  if (placeholder) placeholder.hidden = false
  positionProxy(x, y)
  proxyActive = true
  setPhase('dragging')
}

function hideProxy() {
  const el = proxy()
  const placeholder = document.querySelector('[data-aidr-placeholder]')
  if (el) {
    el.hidden = true
    el.setAttribute('aria-hidden', 'true')
    el.style.transform = ''
  }
  if (placeholder) placeholder.hidden = true
  proxyActive = false
}

function pointIn(el, clientX, clientY) {
  if (!el) return false
  const r = el.getBoundingClientRect()
  return clientX >= r.left && clientX <= r.right && clientY >= r.top && clientY <= r.bottom
}

function proxyCenterClient() {
  const el = proxy()
  if (!el || el.hidden) return null
  const r = el.getBoundingClientRect()
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 }
}

function isOverValid() {
  const center = proxyCenterClient()
  const valid = document.querySelector('[data-aidr-valid]')
  if (!center || !valid) return false
  const r = valid.getBoundingClientRect()
  return (
    center.x >= r.left &&
    center.x <= r.right &&
    center.y >= r.top &&
    center.y <= r.bottom
  )
}

function animateReturn(fromX, fromY, onDone) {
  if (!sourcePos) return
  const toX = sourcePos.x
  const toY = sourcePos.y
  const dx = toX - fromX
  const dy = toY - fromY
  const overshoot = Math.min(OVERSHOOT_MAX, Math.hypot(dx, dy) * 0.08)
  const angle = Math.atan2(dy, dx)
  const overshootX = toX + Math.cos(angle) * overshoot
  const overshootY = toY + Math.sin(angle) * overshoot

  const start = performance.now()

  const tick = (now) => {
    const t = Math.min(1, (now - start) / RETURN_MS)
    let x
    let y
    if (t < 0.72) {
      const p = t / 0.72
      const ease = 1 - Math.pow(1 - p, 2)
      x = fromX + (overshootX - fromX) * ease
      y = fromY + (overshootY - fromY) * ease
    } else {
      const p = (t - 0.72) / 0.28
      const ease = 1 - Math.pow(1 - p, 3)
      x = overshootX + (toX - overshootX) * ease
      y = overshootY + (toY - overshootY) * ease
    }
    positionProxy(x, y)
    if (t < 1) requestAnimationFrame(tick)
    else onDone()
  }

  requestAnimationFrame(tick)
}

function handleInvalidReturn(releaseX, releaseY) {
  const invalid = document.querySelector('[data-aidr-invalid]')
  const stage = stageRect()
  if (!stage || !sourcePos) return

  const fromX = releaseX - stage.left - (dragOffset?.x ?? 0)
  const fromY = releaseY - stage.top - (dragOffset?.y ?? 0)

  const finish = () => {
    invalid?.classList.remove('is-flash')
    positionProxy(sourcePos.x, sourcePos.y)
    window.setTimeout(() => {
      hideProxy()
      setPhase('idle')
      setStatus('Invalid drop — task returned to source.')
      dragging = false
    }, prefersReducedMotion() ? 0 : 40)
  }

  if (prefersReducedMotion()) {
    invalid?.classList.add('is-flash')
    window.setTimeout(() => finish(), INVALID_FLASH_MS)
    return
  }

  invalid?.classList.add('is-flash')
  setPhase('returning')
  setStatus('LOCKED — returning task.')
  window.setTimeout(() => {
    animateReturn(fromX, fromY, finish)
  }, INVALID_FLASH_MS)
}

function handleValidDrop() {
  const valid = document.querySelector('[data-aidr-valid]')
  valid?.classList.add('is-active')
  setPhase('dropped')
  setStatus('Task moved to INBOX.')
  window.setTimeout(() => {
    hideProxy()
    document.querySelector('[data-aidr-source]')?.remove()
    valid?.classList.remove('is-active')
    dragging = false
  }, prefersReducedMotion() ? 80 : 200)
}

function bindUi() {
  const source = document.querySelector('[data-aidr-source]')
  const el = proxy()
  if (!source || !el) return

  source.addEventListener('pointerdown', (event) => {
    if (phase !== 'idle' || event.button !== 0) return
    dragging = true
    proxyActive = false
    startX = event.clientX
    startY = event.clientY
    source.setPointerCapture(event.pointerId)
  })

  source.addEventListener('pointermove', (event) => {
    if (!dragging) return
    const dist = Math.hypot(event.clientX - startX, event.clientY - startY)
    if (!proxyActive && dist >= DRAG_THRESHOLD) {
      showProxyAtSource()
      const rect = el.getBoundingClientRect()
      dragOffset = { x: event.clientX - rect.left, y: event.clientY - rect.top }
    }
    if (proxyActive && dragOffset && stageRect()) {
      const sr = stageRect()
      positionProxy(
        event.clientX - sr.left - dragOffset.x,
        event.clientY - sr.top - dragOffset.y,
      )
      const valid = document.querySelector('[data-aidr-valid]')
      valid?.classList.toggle('is-active', isOverValid())
    }
  })

  const onUp = (event) => {
    if (!dragging) return
    source.releasePointerCapture(event.pointerId)
    if (!proxyActive) {
      dragging = false
      return
    }

    document.querySelector('[data-aidr-valid]')?.classList.remove('is-active')

    if (isOverValid()) {
      handleValidDrop()
    } else if (pointIn(document.querySelector('[data-aidr-invalid]'), event.clientX, event.clientY)) {
      handleInvalidReturn(event.clientX, event.clientY)
    } else {
      const stage = stageRect()
      if (stage && sourcePos) {
        const fromX = event.clientX - stage.left - (dragOffset?.x ?? 0)
        const fromY = event.clientY - stage.top - (dragOffset?.y ?? 0)
        if (prefersReducedMotion()) {
          hideProxy()
          setPhase('idle')
          dragging = false
          setStatus('Released outside target — task returned.')
        } else {
          setPhase('returning')
          animateReturn(fromX, fromY, () => {
            hideProxy()
            setPhase('idle')
            dragging = false
            setStatus('Released outside target — task returned.')
          })
        }
      }
    }
    dragOffset = null
  }

  source.addEventListener('pointerup', onUp)
  source.addEventListener('pointercancel', onUp)
}

bindUi()

export function resetAndroidInvalidDropReturn() {
  dragging = false
  proxyActive = false
  setPhase('idle')
  setStatus('Drag task card to INBOX or LOCKED.')
}

export const ANDROID_INVALID_DROP_RETURN_CONTRACT = {
  CARD_W,
  CARD_H,
  RETURN_MS,
  OVERSHOOT_MAX,
  INVALID_FLASH_MS,
}
