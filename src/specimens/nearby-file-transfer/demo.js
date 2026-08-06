/**
 * Nearby File Transfer — curved proxy path with reject and determinate progress.
 */

const SEPARATION_PX = 240
const DOC_W = 52
const DOC_H = 64
const PROXY_W = 34
const PROXY_H = 42
const TRANSFER_MS = 650
const PROGRESS_MS = 1100
const REJECT_OUT_PX = 40
const REJECT_RETURN_MS = 320

/** @type {boolean} */
let busy = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function root() {
  return document.querySelector('[data-nearby-file-transfer]')
}

function doc() {
  return document.querySelector('[data-nft-doc]')
}

function proxy() {
  return document.querySelector('[data-nft-proxy]')
}

function ring() {
  return document.querySelector('[data-nft-ring]')
}

function ringFill() {
  return document.querySelector('[data-nft-ring-fill]')
}

function ringVal() {
  return document.querySelector('[data-nft-ring-val]')
}

function received() {
  return document.querySelector('[data-nft-received]')
}

function statusEl() {
  return document.querySelector('[data-nft-status]')
}

function sendBtn() {
  return document.querySelector('[data-nft-send]')
}

function rejectBtn() {
  return document.querySelector('[data-nft-reject]')
}

function setStatus(text) {
  const el = statusEl()
  if (el) el.textContent = text
}

function setPhase(phase) {
  root()?.setAttribute('data-phase', phase)
}

function clearTimers() {
  timers.forEach((id) => window.clearTimeout(id))
  timers = []
}

function setProgress(pct) {
  const fill = ringFill()
  const val = ringVal()
  const circumference = 125.6
  if (fill) fill.style.strokeDashoffset = String(circumference * (1 - pct / 100))
  if (val) val.textContent = `${pct}%`
}

/**
 * @param {number} t
 * @param {{x:number,y:number}} a
 * @param {{x:number,y:number}} b
 */
function arcPoint(t, a, b) {
  const cx = (a.x + b.x) / 2
  const cy = Math.min(a.y, b.y) - 36
  const u = 1 - t
  return {
    x: u * u * a.x + 2 * u * t * cx + t * t * b.x,
    y: u * u * a.y + 2 * u * t * cy + t * t * b.y,
  }
}

function getPositions() {
  const stage = document.querySelector('[data-nft-stage]')
  const source = document.querySelector('[data-nft-source]')
  const recipient = document.querySelector('[data-nft-recipient]')
  if (!stage || !source || !recipient) return null
  const sr = stage.getBoundingClientRect()
  const srcR = source.getBoundingClientRect()
  const recR = recipient.getBoundingClientRect()
  return {
    start: {
      x: srcR.left - sr.left + srcR.width / 2 - PROXY_W / 2,
      y: srcR.top - sr.top + 48,
    },
    end: {
      x: recR.left - sr.left + recR.width / 2 - PROXY_W / 2,
      y: recR.top - sr.top + 36,
    },
  }
}

function showProxyAt(pos) {
  const el = proxy()
  if (!el) return
  el.hidden = false
  el.classList.add('is-condensed')
  el.style.left = `${pos.x}px`
  el.style.top = `${pos.y}px`
}

function runTransfer() {
  const el = proxy()
  const positions = getPositions()
  if (!el || !positions) return

  doc()?.classList.add('is-hidden')
  showProxyAt(positions.start)
  setPhase('transferring')
  setStatus('Transfer proxy moving along curved path.')

  if (prefersReducedMotion()) {
    showProxyAt(positions.end)
    absorbAndProgress()
    return
  }

  const t0 = performance.now()
  const tick = (now) => {
    const t = Math.min((now - t0) / TRANSFER_MS, 1)
    const p = arcPoint(t, positions.start, positions.end)
    el.style.left = `${p.x}px`
    el.style.top = `${p.y}px`
    if (t < 1) requestAnimationFrame(tick)
    else absorbAndProgress()
  }
  requestAnimationFrame(tick)
}

function absorbAndProgress() {
  const el = proxy()
  el?.classList.add('is-absorbing')
  ring()?.removeAttribute('hidden')
  setPhase('progress')
  setStatus('Recipient absorbing file — progress ring 0→100%.')

  const start = performance.now()
  const tick = (now) => {
    const t = Math.min((now - start) / PROGRESS_MS, 1)
    setProgress(Math.round(t * 100))
    if (t < 1) requestAnimationFrame(tick)
    else finishReceived()
  }
  requestAnimationFrame(tick)
}

function finishReceived() {
  proxy()?.setAttribute('hidden', 'true')
  received()?.removeAttribute('hidden')
  setPhase('received')
  setStatus('ARCHIVE.ZIP received.')
  busy = false
  sendBtn()?.removeAttribute('disabled')
  rejectBtn()?.removeAttribute('disabled')
}

function startSend() {
  if (busy) return
  busy = true
  sendBtn()?.setAttribute('disabled', 'true')
  rejectBtn()?.setAttribute('disabled', 'true')
  runTransfer()
}

function runReject() {
  if (busy) return
  busy = true
  sendBtn()?.setAttribute('disabled', 'true')
  rejectBtn()?.setAttribute('disabled', 'true')
  setPhase('rejecting')
  setStatus('Rejecting — proxy returns to source.')

  const positions = getPositions()
  const el = proxy()
  if (!positions || !el) return

  doc()?.classList.add('is-hidden')
  showProxyAt(positions.start)

  const mid = {
    x: positions.start.x + (positions.end.x - positions.start.x) * 0.18 + REJECT_OUT_PX,
    y: positions.start.y + (positions.end.y - positions.start.y) * 0.18,
  }

  if (prefersReducedMotion()) {
    resetNearbyFileTransfer()
    return
  }

  const t0 = performance.now()
  const half = REJECT_RETURN_MS / 2
  const tick = (now) => {
    const elapsed = now - t0
    if (elapsed < half) {
      const t = elapsed / half
      el.style.left = `${positions.start.x + (mid.x - positions.start.x) * t}px`
      el.style.top = `${positions.start.y + (mid.y - positions.start.y) * t}px`
      requestAnimationFrame(tick)
    } else if (elapsed < REJECT_RETURN_MS) {
      const t = (elapsed - half) / half
      el.style.left = `${mid.x + (positions.start.x - mid.x) * t}px`
      el.style.top = `${mid.y + (positions.start.y - mid.y) * t}px`
      requestAnimationFrame(tick)
    } else {
      resetNearbyFileTransfer()
      setStatus('Transfer rejected — ARCHIVE.ZIP restored at source.')
    }
  }
  requestAnimationFrame(tick)
}

export function resetNearbyFileTransfer() {
  clearTimers()
  busy = false
  sendBtn()?.removeAttribute('disabled')
  rejectBtn()?.removeAttribute('disabled')
  doc()?.classList.remove('is-hidden')
  const el = proxy()
  if (el) {
    el.hidden = true
    el.classList.remove('is-condensed', 'is-absorbing')
    el.style.left = ''
    el.style.top = ''
  }
  ring()?.setAttribute('hidden', 'true')
  received()?.setAttribute('hidden', 'true')
  setProgress(0)
  setPhase('idle')
  setStatus('ARCHIVE.ZIP ready beside SOURCE. Send or reject before transfer begins.')
}

function bindUi() {
  sendBtn()?.addEventListener('click', startSend)
  rejectBtn()?.addEventListener('click', runReject)
  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      resetNearbyFileTransfer()
    }
  })
}

bindUi()
resetNearbyFileTransfer()

export const NEARBY_FILE_TRANSFER_CONTRACT = {
  SEPARATION_PX,
  DOC_W,
  DOC_H,
  PROXY_W,
  PROXY_H,
  TRANSFER_MS,
  PROGRESS_MS,
  REJECT_OUT_PX,
}
