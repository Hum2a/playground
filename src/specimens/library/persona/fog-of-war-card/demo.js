/**
 * Fog-of-War Card — pointer scrub erases fog to reveal hidden content.
 * iframe-safe; no storage / parent / network.
 */

const BRUSH = 42
const REVEAL_THRESHOLD = 0.42

/** @type {CanvasRenderingContext2D | null} */
let ctx = null
/** @type {HTMLCanvasElement | null} */
let canvas = null
let cleared = 0
let total = 1

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function setLive(text) {
  const el = document.querySelector('[data-fow-live]')
  if (el) el.textContent = text
}

function paintFog() {
  if (!ctx || !canvas) return
  ctx.globalCompositeOperation = 'source-over'
  ctx.fillStyle = 'rgba(232, 232, 232, 0.92)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  const grad = ctx.createRadialGradient(
    canvas.width * 0.3,
    canvas.height * 0.25,
    10,
    canvas.width * 0.5,
    canvas.height * 0.5,
    canvas.width * 0.7,
  )
  grad.addColorStop(0, 'rgba(247, 243, 232, 0.35)')
  grad.addColorStop(1, 'rgba(16, 16, 16, 0.55)')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  cleared = 0
  total = canvas.width * canvas.height
}

function resizeCanvas() {
  const card = document.querySelector('[data-fow-card]')
  canvas = document.querySelector('[data-fow-canvas]')
  if (!card || !canvas) return

  const rect = card.getBoundingClientRect()
  const dpr = window.devicePixelRatio || 1
  canvas.width = Math.max(1, Math.floor(rect.width * dpr))
  canvas.height = Math.max(1, Math.floor(rect.height * dpr))
  canvas.style.width = `${rect.width}px`
  canvas.style.height = `${rect.height}px`
  ctx = canvas.getContext('2d')
  paintFog()
}

function revealAt(clientX, clientY) {
  if (!ctx || !canvas) return
  const rect = canvas.getBoundingClientRect()
  const dpr = window.devicePixelRatio || 1
  const x = (clientX - rect.left) * dpr
  const y = (clientY - rect.top) * dpr

  ctx.globalCompositeOperation = 'destination-out'
  ctx.beginPath()
  ctx.arc(x, y, BRUSH * dpr, 0, Math.PI * 2)
  ctx.fill()

  const image = ctx.getImageData(0, 0, canvas.width, canvas.height)
  let transparent = 0
  for (let i = 3; i < image.data.length; i += 4) {
    if (image.data[i] === 0) transparent += 1
  }
  cleared = transparent
  const ratio = cleared / total
  if (ratio >= REVEAL_THRESHOLD) {
    document.querySelector('[data-fow]')?.setAttribute('data-revealed', 'true')
    setLive('Card fully revealed.')
  } else if (ratio >= 0.12) {
    setLive('Partial reveal in progress.')
  }
}

function revealAll() {
  if (!ctx || !canvas) return
  ctx.globalCompositeOperation = 'destination-out'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  document.querySelector('[data-fow]')?.setAttribute('data-revealed', 'true')
  setLive('Card fully revealed.')
}

function pointerHandler(event) {
  if (prefersReducedMotion()) {
    revealAll()
    return
  }
  revealAt(event.clientX, event.clientY)
}

function bindUi() {
  const card = document.querySelector('[data-fow-card]')
  if (!card) return

  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)

  card.addEventListener('pointerdown', (event) => {
    card.setPointerCapture(event.pointerId)
    pointerHandler(event)
  })
  card.addEventListener('pointermove', (event) => {
    if (event.buttons !== 1) return
    pointerHandler(event)
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') {
      document.querySelector('[data-fow]')?.removeAttribute('data-revealed')
      resizeCanvas()
      setLive('Card obscured. Scrub to reveal.')
    }
  })
}

bindUi()
setLive('Card obscured. Scrub to reveal.')
