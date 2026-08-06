/**
 * AirDrop Transfer Arc — nearby file transfer with acceptance and arc path.
 */

const ACCEPT_DELAY_MS = 260
const ARC_MS = 520
const BRACKET_MS = 100
const SEPARATION_PX = 280
const PROXY_W = 74
const PROXY_H = 44
const PROGRESS_STEPS = [0, 25, 50, 75, 100]

/** @type {boolean} */
let busy = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function root() {
  return document.querySelector('[data-airdrop-transfer-arc]')
}

function recipient() {
  return document.querySelector('[data-ata-recipient]')
}

function proxy() {
  return document.querySelector('[data-ata-proxy]')
}

function recipientStatus() {
  return document.querySelector('[data-ata-recipient-status]')
}

function progressEl() {
  return document.querySelector('[data-ata-progress]')
}

function progressVal() {
  return document.querySelector('[data-ata-progress-val]')
}

function statusEl() {
  return document.querySelector('[data-ata-status]')
}

function sendBtn() {
  return document.querySelector('[data-ata-send]')
}

function setStatus(text) {
  const el = statusEl()
  if (el) el.textContent = text
}

function setPhase(phase) {
  root()?.setAttribute('data-phase', phase)
}

function setRecipientStatus(text) {
  const el = recipientStatus()
  if (el) el.textContent = text
}

function setProgress(pct) {
  const wrap = progressEl()
  const val = progressVal()
  if (wrap) wrap.hidden = false
  if (val) val.textContent = String(pct)
}

/**
 * Quadratic arc interpolation.
 * @param {number} t
 * @param {{x:number,y:number}} a
 * @param {{x:number,y:number}} b
 */
function arcPoint(t, a, b) {
  const cx = (a.x + b.x) / 2
  const cy = Math.min(a.y, b.y) - 48
  const u = 1 - t
  return {
    x: u * u * a.x + 2 * u * t * cx + t * t * b.x,
    y: u * u * a.y + 2 * u * t * cy + t * t * b.y,
  }
}

function runArc() {
  const el = proxy()
  const stage = document.querySelector('[data-ata-stage]')
  const src = document.querySelector('[data-ata-source]')
  const rec = recipient()
  if (!el || !stage || !src || !rec) return

  el.hidden = false
  const sr = stage.getBoundingClientRect()
  const srcR = src.getBoundingClientRect()
  const recR = rec.getBoundingClientRect()
  const start = {
    x: srcR.left - sr.left + srcR.width / 2 - PROXY_W / 2,
    y: srcR.top - sr.top + 48,
  }
  const end = {
    x: recR.left - sr.left + recR.width / 2 - PROXY_W / 2,
    y: recR.top - sr.top + 36,
  }

  if (prefersReducedMotion()) {
    setProgress(100)
    el.style.left = `${end.x}px`
    el.style.top = `${end.y}px`
    finishTransfer()
    return
  }

  const t0 = performance.now()
  let stepIdx = 0

  const tick = (now) => {
    const t = Math.min((now - t0) / ARC_MS, 1)
    const p = arcPoint(t, start, end)
    el.style.left = `${p.x}px`
    el.style.top = `${p.y}px`

    const nextStep = PROGRESS_STEPS[stepIdx + 1]
    if (nextStep !== undefined && t >= nextStep / 100) {
      stepIdx += 1
      setProgress(PROGRESS_STEPS[stepIdx])
    }

    if (t < 1) {
      requestAnimationFrame(tick)
    } else {
      finishTransfer()
    }
  }

  requestAnimationFrame(tick)
}

function finishTransfer() {
  const el = proxy()
  const rec = recipient()
  if (!el || !rec) return

  rec.classList.add('is-receiving')
  el.classList.add('is-compressing')
  setProgress(100)
  setRecipientStatus('RECEIVED')
  setPhase('received')
  setStatus('REPORT.PDF received on DEVICE // B.')

  window.setTimeout(() => {
    el.hidden = true
    el.classList.remove('is-compressing')
    busy = false
    sendBtn()?.removeAttribute('disabled')
  }, prefersReducedMotion() ? 80 : 320)
}

function startSend() {
  if (busy) return
  busy = true
  sendBtn()?.setAttribute('disabled', 'true')
  setPhase('waiting')
  setRecipientStatus('WAITING ACCEPTANCE')
  recipient()?.classList.add('is-acquiring')
  setStatus('Waiting for DEVICE // B to accept transfer.')

  window.setTimeout(() => {
    setRecipientStatus('ACCEPTED')
    setPhase('transferring')
    setStatus('Accepted — file proxy following transfer arc.')
    runArc()
  }, prefersReducedMotion() ? 40 : ACCEPT_DELAY_MS)
}

export function resetAirdropTransferArc() {
  busy = false
  sendBtn()?.removeAttribute('disabled')
  recipient()?.classList.remove('is-acquiring', 'is-receiving')
  proxy()?.classList.remove('is-compressing')
  if (proxy()) {
    proxy().hidden = true
    proxy().style.left = ''
    proxy().style.top = ''
  }
  if (progressEl()) progressEl().hidden = true
  setProgress(0)
  setRecipientStatus('AVAILABLE')
  setPhase('idle')
  setStatus('REPORT.PDF ready. Recipient DEVICE // B is AVAILABLE.')
}

function bindUi() {
  sendBtn()?.addEventListener('click', startSend)
  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      resetAirdropTransferArc()
    }
  })
}

bindUi()
resetAirdropTransferArc()

export const AIRDROP_TRANSFER_ARC_CONTRACT = {
  ACCEPT_DELAY_MS,
  ARC_MS,
  BRACKET_MS,
  SEPARATION_PX,
  PROXY_W,
  PROXY_H,
  PROGRESS_STEPS,
}
