/**
 * Invalid Drop Return — rejected drag returns along fixed path to source.
 * Sandbox-safe (no parent / storage / network).
 *
 * Refusal 3px · pause 70ms · return 360ms · merge scale 1.04→1 · status 700ms
 */

const REFUSAL_PX = 3
const PAUSE_MS = 70
const RETURN_MS = 360
const REJECTED_HOLD_MS = 700

let phase = 'idle'
let dragging = false
/** @type {{ x: number; y: number } | null} */
let dragOffset = null
/** @type {{ x: number; y: number } | null} */
let sourcePos = null

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-invalid-drop-return]')
}

function setStatus(text) {
  const el = document.querySelector('[data-idr-status]')
  if (el) el.textContent = text
}

function setPhase(next) {
  phase = next
  rootEl()?.setAttribute('data-phase', next)
}

function proxyEl() {
  return document.querySelector('[data-idr-proxy]')
}

function positionProxy(x, y) {
  const proxy = proxyEl()
  if (!proxy) return
  proxy.style.transform = `translate(${x}px, ${y}px)`
}

function showProxyAtSource() {
  const source = document.querySelector('[data-idr-source]')
  const stage = document.querySelector('[data-idr-stage]')
  const proxy = proxyEl()
  const placeholder = document.querySelector('[data-idr-placeholder]')
  if (!source || !stage || !proxy) return

  const stageRect = stage.getBoundingClientRect()
  const sourceRect = source.getBoundingClientRect()
  const x = sourceRect.left - stageRect.left
  const y = sourceRect.top - stageRect.top
  sourcePos = { x, y }

  proxy.hidden = false
  proxy.setAttribute('aria-hidden', 'false')
  if (placeholder) placeholder.hidden = false
  positionProxy(x, y)
}

function hideProxy() {
  const proxy = proxyEl()
  const placeholder = document.querySelector('[data-idr-placeholder]')
  if (proxy) {
    proxy.hidden = true
    proxy.setAttribute('aria-hidden', 'true')
  }
  if (placeholder) placeholder.hidden = true
}

function isOverInvalid(clientX, clientY) {
  const invalid = document.querySelector('[data-idr-invalid]')
  if (!invalid) return false
  const rect = invalid.getBoundingClientRect()
  return (
    clientX >= rect.left &&
    clientX <= rect.right &&
    clientY >= rect.top &&
    clientY <= rect.bottom
  )
}

function animateReturn(onDone) {
  if (!sourcePos) return
  const proxy = proxyEl()
  if (!proxy) return

  const start = performance.now()
  const fromX = parseFloat(proxy.style.transform?.match(/translate\(([-\d.]+)px/)?.[1] || '0')
  const fromY = parseFloat(proxy.style.transform?.match(/translate\([-\d.]+px,\s*([-\d.]+)px/)?.[1] || '0')
  const toX = sourcePos.x
  const toY = sourcePos.y
  const midX = (fromX + toX) / 2
  const midY = Math.min(fromY, toY) - 48

  const tick = (now) => {
    const t = Math.min(1, (now - start) / RETURN_MS)
    const ease = 1 - (1 - t) * (1 - t)
    const x = (1 - ease) * (1 - ease) * fromX + 2 * (1 - ease) * ease * midX + ease * ease * toX
    const y = (1 - ease) * (1 - ease) * fromY + 2 * (1 - ease) * ease * midY + ease * ease * toY
    positionProxy(x, y)
    if (t < 1) {
      requestAnimationFrame(tick)
    } else {
      onDone()
    }
  }

  requestAnimationFrame(tick)
}

function handleInvalidDrop() {
  const invalid = document.querySelector('[data-idr-invalid]')
  invalid?.classList.add('is-refusing')

  const finish = () => {
    invalid?.classList.remove('is-refusing')
    setPhase('merging')
    positionProxy(sourcePos?.x || 0, sourcePos?.y || 0)

    window.setTimeout(() => {
      hideProxy()
      setPhase('rejected')
      setStatus('DROP REJECTED')
      window.setTimeout(() => {
        setPhase('idle')
        setStatus('Drag CONFIG.JSON to a target.')
      }, REJECTED_HOLD_MS)
    }, prefersReducedMotion() ? 0 : 120)
  }

  if (prefersReducedMotion()) {
    positionProxy(sourcePos?.x || 0, sourcePos?.y || 0)
    finish()
    return
  }

  window.setTimeout(() => {
    setPhase('returning')
    setStatus('Returning to source.')
    animateReturn(() => {
      window.setTimeout(finish, PAUSE_MS)
    })
  }, PAUSE_MS)
}

function bindDrag() {
  const source = document.querySelector('[data-idr-source]')
  const proxy = proxyEl()
  if (!source || !proxy) return

  source.addEventListener('pointerdown', (event) => {
    if (phase !== 'idle' && phase !== 'rejected') return
    dragging = true
    showProxyAtSource()
    setPhase('dragging')
    setStatus('Dragging CONFIG.JSON.')
    const rect = proxy.getBoundingClientRect()
    dragOffset = { x: event.clientX - rect.left, y: event.clientY - rect.top }
    proxy.classList.add('is-grabbing')
    proxy.setPointerCapture(event.pointerId)
  })

  proxy.addEventListener('pointermove', (event) => {
    if (!dragging || !dragOffset) return
    const stage = document.querySelector('[data-idr-stage]')
    if (!stage) return
    const stageRect = stage.getBoundingClientRect()
    positionProxy(event.clientX - stageRect.left - dragOffset.x, event.clientY - stageRect.top - dragOffset.y)
  })

  const onPointerUp = (event) => {
    if (!dragging) return
    dragging = false
    proxy.classList.remove('is-grabbing')
    dragOffset = null

    if (isOverInvalid(event.clientX, event.clientY)) {
      handleInvalidDrop()
    } else {
      hideProxy()
      setPhase('idle')
      setStatus('Drag CONFIG.JSON to a target.')
    }
  }

  proxy.addEventListener('pointerup', onPointerUp)
  proxy.addEventListener('pointercancel', onPointerUp)
}

bindDrag()

export const INVALID_DROP_RETURN_CONTRACT = {
  REFUSAL_PX,
  PAUSE_MS,
  RETURN_MS,
  REJECTED_HOLD_MS,
  SOURCE: 'CONFIG.JSON',
  INVALID_TARGET: 'READ ONLY',
}
