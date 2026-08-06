/**
 * Paper Stack Shuffle — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 */

/** Frozen depth contract: index 0 = front … 3 = back */
export const DEPTH_POSES = [
  { x: 0, y: 0, rot: -2, z: 40 },
  { x: 8, y: 8, rot: 3, z: 30 },
  { x: -5, y: 16, rot: -4, z: 20 },
  { x: 11, y: 23, rot: 2, z: 10 },
]

export const SHEET_LABELS = [
  '01 Motion',
  '02 Typography',
  '03 Overlays',
  '04 Transitions',
]

const TOTAL_MS = 720
const EASE = 'cubic-bezier(0.7, 0, 0.3, 1)'

/** Visual order: sheet ids front → back */
let order = [0, 1, 2, 3]
let busy = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function sheets() {
  return [...document.querySelectorAll('[data-sheet]')].sort(
    (a, b) => Number(a.dataset.sheet) - Number(b.dataset.sheet),
  )
}

function poseTransform(d) {
  const p = DEPTH_POSES[d]
  return `translate(${p.x}px, ${p.y}px) rotate(${p.rot}deg)`
}

function extractX() {
  const demo = document.querySelector('[data-paper-stack-demo]')
  if (!demo) return '78%'
  return getComputedStyle(demo).getPropertyValue('--extract-x').trim() || '78%'
}

function setBusy(on) {
  busy = on
  document.querySelectorAll('[data-paper-prev], [data-paper-next]').forEach((btn) => {
    btn.disabled = on
  })
}

function setStatus() {
  const el = document.querySelector('[data-paper-status]')
  if (!el) return
  el.textContent = `Selected: ${SHEET_LABELS[order[0]]}`
}

function applySettled() {
  const list = sheets()
  list.forEach((el) => {
    el.classList.remove('is-flying', 'is-behind-flight', 'is-active')
    el.getAnimations?.().forEach((a) => a.cancel())
  })
  order.forEach((sheetId, depth) => {
    const el = list[sheetId]
    el.dataset.depth = String(depth)
    el.style.zIndex = String(DEPTH_POSES[depth].z)
    el.style.transform = poseTransform(depth)
    if (depth === 0) el.classList.add('is-active')
  })
  setStatus()
}

function animateTo(el, keyframes, duration, delay = 0) {
  return el.animate(keyframes, {
    duration,
    delay,
    easing: EASE,
    fill: 'forwards',
  }).finished
}

/**
 * @param {'next' | 'prev'} direction
 */
export async function shufflePaperStack(direction) {
  if (busy) return
  if (prefersReducedMotion()) {
    if (direction === 'next') order = [...order.slice(1), order[0]]
    else order = [order[order.length - 1], ...order.slice(0, -1)]
    applySettled()
    return
  }

  setBusy(true)
  const list = sheets()
  const x = extractX()

  try {
    if (direction === 'next') await runNext(list, x)
    else await runPrev(list, x)
  } finally {
    applySettled()
    setBusy(false)
  }
}

async function runNext(list, x) {
  const frontId = order[0]
  const front = list[frontId]
  const rest = order.slice(1).map((id) => list[id])

  front.classList.add('is-flying')
  front.style.zIndex = '50'

  // Phase 1 — lift 0–120
  await animateTo(
    front,
    [
      { transform: poseTransform(0) },
      { transform: 'translate(0px, -8px) scale(1.02) rotate(-4deg)' },
    ],
    120,
  )

  // Phase 2 — extraction 120–360 (240ms) — start stack advance mid-way
  const extract = animateTo(
    front,
    [
      { transform: 'translate(0px, -8px) scale(1.02) rotate(-4deg)' },
      { transform: `translate(${x}, -14%) rotate(9deg)` },
    ],
    240,
  )

  // Phase 3 — stack advance ~260–500 → delay 140 from extract start, duration 240
  const advances = rest.map((el, i) => {
    const from = i + 1
    const to = i
    el.style.zIndex = String(DEPTH_POSES[to].z + 1)
    return animateTo(
      el,
      [{ transform: poseTransform(from) }, { transform: poseTransform(to) }],
      240,
      140,
    )
  })

  await extract

  // Phase 4 — while clear of stack, drop behind then travel to deepest
  front.classList.remove('is-flying')
  front.classList.add('is-behind-flight')
  front.style.zIndex = '5'

  await animateTo(
    front,
    [
      { transform: `translate(${x}, -14%) rotate(9deg)` },
      { transform: `translate(42%, 18%) rotate(4deg)` },
      { transform: poseTransform(3) },
    ],
    290,
  )

  await Promise.all(advances)

  // Phase 5 — settle 650–720 (tiny corrections already at poses; short hold)
  await new Promise((r) => setTimeout(r, 70))

  order = [...order.slice(1), order[0]]
}

async function runPrev(list, x) {
  const backId = order[3]
  const rising = list[backId]
  const others = order.slice(0, 3).map((id) => list[id])

  // Leave deepest via left/side while still behind, then rise clear
  rising.classList.add('is-behind-flight')
  rising.style.zIndex = '5'

  await animateTo(
    rising,
    [
      { transform: poseTransform(3) },
      { transform: 'translate(-48%, 12%) rotate(-8deg)' },
    ],
    160,
  )

  // Now clear — promote above stack and fly to front corridor
  rising.classList.remove('is-behind-flight')
  rising.classList.add('is-flying')
  rising.style.zIndex = '50'

  const emerge = animateTo(
    rising,
    [
      { transform: 'translate(-48%, 12%) rotate(-8deg)' },
      { transform: `translate(${x}, -12%) rotate(7deg)` },
      { transform: 'translate(0px, -8px) scale(1.02) rotate(-4deg)' },
      { transform: poseTransform(0) },
    ],
    420,
  )

  // Push former front→depth1, etc. (delay so rising is clear)
  const retreats = others.map((el, i) => {
    const from = i
    const to = i + 1
    return animateTo(
      el,
      [{ transform: poseTransform(from) }, { transform: poseTransform(to) }],
      260,
      120,
    )
  })

  await emerge
  await Promise.all(retreats)
  await new Promise((r) => setTimeout(r, 40))

  order = [order[3], ...order.slice(0, 3)]
}

function bind() {
  applySettled()
  document.querySelector('[data-paper-next]')?.addEventListener('click', () => {
    void shufflePaperStack('next')
  })
  document.querySelector('[data-paper-prev]')?.addEventListener('click', () => {
    void shufflePaperStack('prev')
  })
}

bind()

// Silence unused TOTAL_MS in case tree-shakers complain — documents contract.
void TOTAL_MS
