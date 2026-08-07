/**
 * Wave 2b part 3 — teleport, shuriken tool palette, shadow-bind
 */
import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'

const ROOT = path.resolve('src/specimens/library/naruto')
const results = { committed: [], failed: [] }

function write(p, s) {
  fs.writeFileSync(p, s.endsWith('\n') ? s : `${s}\n`)
}
function syncTwin(dir) {
  write(path.join(dir, 'demo.style.txt'), fs.readFileSync(path.join(dir, 'demo.css'), 'utf8'))
}
function commit(dir, ref, title, why) {
  const rel = path.relative(process.cwd(), dir).replace(/\\/g, '/')
  execSync(`git add -- "${rel}"`, { stdio: 'pipe' })
  execSync(
    `git commit -m ${JSON.stringify(`Improve ${ref} ${title}.`)} -m ${JSON.stringify(why)}`,
    { stdio: 'inherit' },
  )
  results.committed.push(`${ref} ${title}`)
}
function patchEntry(dir, { blurb, acceptance, reducedMotionNote, intensity }) {
  let s = fs.readFileSync(path.join(dir, 'entry.ts'), 'utf8')
  if (blurb) {
    s = s.replace(/blurb:\s*\n?\s*'[^']*'/, `blurb:\n    '${blurb.replace(/'/g, "\\'")}'`)
  }
  if (reducedMotionNote) {
    s = s.replace(
      /reducedMotionNote:\s*\n?\s*'[^']*'/,
      `reducedMotionNote:\n      '${reducedMotionNote.replace(/'/g, "\\'")}'`,
    )
  }
  if (acceptance) {
    const acc = acceptance.map((a) => `    '${a.replace(/'/g, "\\'")}',`).join('\n')
    s = s.replace(/acceptance:\s*\[[\s\S]*?\],/, `acceptance: [\n${acc}\n  ],`)
  }
  if (intensity) s = s.replace(/intensity: '[^']*'/, `intensity: '${intensity}'`)
  write(path.join(dir, 'entry.ts'), s)
}
function patchPayload(dir, { bg, freezeLine }) {
  let s = fs.readFileSync(path.join(dir, 'payload.ts'), 'utf8')
  if (!s.includes('acceptance: contract.acceptance')) {
    s = s.replace(/acceptance:\s*\[[\s\S]*?\],/, 'acceptance: contract.acceptance,')
  }
  if (bg) s = s.replace(/background:#[0-9A-Fa-f]{6}/, `background:${bg}`)
  if (freezeLine && /Import demo\.css verbatim;[^']*'/.test(s)) {
    s = s.replace(
      /Import demo\.css verbatim;[^']*'/,
      `Import demo.css verbatim; freeze ${freezeLine} from contract.json.'`,
    )
  }
  write(path.join(dir, 'payload.ts'), s)
}

// ——— teleport-card-transfer ———
{
  const id = 'teleport-card-transfer'
  const dir = path.join(ROOT, id)
  try {
    write(
      path.join(dir, 'demo.css'),
      `/* SPX-2677 Teleport Card Transfer — portable contract. */

.tct {
  --ink: #070b0e;
  --parchment: #c8e8dc;
  --chakra: #3dcea8;
  --alarm: #3dcea8;
  --olive: #1a6b58;
  --off: #d7f5ec;
  --tct-compress-ms: 200ms;
  --tct-empty-hold-ms: 120ms;
  --tct-reconstruct-ms: 220ms;
  --tct-aperture-from: 8px;
  --tct-aperture-to: 72px;
  --tct-dx: 0px;
  --tct-dy: 0px;
  --tct-scale: 1;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  width: 100%;
  min-height: 300px;
  padding: 0.85rem 0.7rem;
  background: var(--ink);
  color: var(--off);
  font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif;
}

.tct *,
.tct *::before,
.tct *::after {
  box-sizing: border-box;
}

.tct__live {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.tct__system {
  margin: 0;
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--chakra);
}

.tct__stage {
  position: relative;
  overflow: hidden;
  display: grid;
  gap: 0.65rem;
  justify-items: center;
  width: 100%;
  padding: 1rem 0.75rem;
  border: 1px solid color-mix(in srgb, var(--chakra) 40%, transparent);
  background: rgb(215 245 236 / 0.04);
}

.tct__lane {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.4rem;
  width: 100%;
  max-width: 20rem;
}

.tct__slot {
  position: relative;
  display: grid;
  place-items: center;
  height: 4rem;
  border: 1.5px dashed color-mix(in srgb, var(--olive) 70%, transparent);
  background: rgb(7 11 14 / 0.55);
}

.tct__slot--dest {
  border-color: color-mix(in srgb, var(--chakra) 45%, transparent);
}

.tct__aperture {
  position: absolute;
  inset: 0;
  margin: auto;
  width: var(--tct-aperture-from);
  height: var(--tct-aperture-from);
  border-radius: 50%;
  border: 2px solid var(--chakra);
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--chakra) 35%, transparent);
  opacity: 0;
  transform: scale(1);
  pointer-events: none;
}

.tct__aperture[data-open='true'] {
  animation: tct-aperture-open var(--tct-compress-ms) cubic-bezier(0.2, 0.8, 0.25, 1) both;
}

.tct__aperture--dest[data-open='true'] {
  animation-name: tct-aperture-open;
  animation-duration: var(--tct-reconstruct-ms);
}

@keyframes tct-aperture-open {
  0% {
    opacity: 0.95;
    width: var(--tct-aperture-from);
    height: var(--tct-aperture-from);
  }
  55% {
    opacity: 1;
    width: var(--tct-aperture-to);
    height: var(--tct-aperture-to);
  }
  100% {
    opacity: 0;
    width: var(--tct-aperture-from);
    height: var(--tct-aperture-from);
  }
}

.tct__card {
  position: absolute;
  inset: 0;
  margin: auto;
  display: grid;
  place-items: center;
  width: 5.4rem;
  height: 2.6rem;
  border: 1.5px solid var(--parchment);
  background: color-mix(in srgb, var(--chakra) 12%, transparent);
  color: var(--parchment);
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  transform: translate(var(--tct-dx), var(--tct-dy)) scale(var(--tct-scale));
  clip-path: inset(0 0 0 0 round 0);
  transition:
    transform var(--tct-compress-ms) cubic-bezier(0.4, 0, 0.2, 1),
    clip-path var(--tct-compress-ms) cubic-bezier(0.4, 0, 0.2, 1),
    visibility 0ms linear;
  visibility: visible;
}

.tct__card[data-instant='true'] {
  transition: none !important;
}

.tct[data-phase='compress'] .tct__card {
  --tct-scale: 0;
  clip-path: circle(8% at 50% 50%);
}

.tct[data-phase='empty'] .tct__card {
  --tct-scale: 0;
  visibility: hidden;
  clip-path: circle(0% at 50% 50%);
}

.tct[data-phase='reconstruct'] .tct__card,
.tct[data-phase='done'] .tct__card {
  --tct-scale: 1;
  visibility: visible;
  clip-path: inset(0 0 0 0 round 0);
  transition:
    transform var(--tct-reconstruct-ms) cubic-bezier(0.2, 0.85, 0.25, 1),
    clip-path var(--tct-reconstruct-ms) cubic-bezier(0.2, 0.85, 0.25, 1);
}

.tct[data-phase='done'] .tct__card {
  border-color: var(--chakra);
  color: var(--chakra);
}

.tct__status {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 900;
  letter-spacing: 0.14em;
  color: var(--parchment);
}

.tct[data-phase='done'] .tct__status {
  color: var(--chakra);
}

.tct__hint {
  margin: 0;
  font-size: 0.68rem;
  letter-spacing: 0.04em;
  color: var(--olive);
  text-align: center;
}

.tct__controls {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.tct__btn {
  appearance: none;
  margin: 0;
  padding: 0.45rem 0.85rem;
  border: 1px solid var(--olive);
  background: transparent;
  color: var(--off);
  font: inherit;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  cursor: pointer;
}

.tct__btn--primary {
  border-color: var(--chakra);
  background: color-mix(in srgb, var(--chakra) 28%, transparent);
}

.tct__btn:hover:not(:disabled) {
  border-color: var(--parchment);
}

.tct__btn:focus-visible {
  outline: 2px solid var(--chakra);
  outline-offset: 2px;
}

.tct__btn:disabled {
  opacity: 0.45;
  cursor: default;
}

@media (prefers-reduced-motion: reduce) {
  .tct__card,
  .tct__aperture[data-open='true'] {
    transition: none !important;
    animation: none !important;
  }
}

html[data-force-reduced-motion='true'] .tct__card,
html[data-force-reduced-motion='true'] .tct__aperture[data-open='true'] {
  transition: none !important;
  animation: none !important;
}
`,
    )

    write(
      path.join(dir, 'demo.js'),
      `/**
 * Teleport Card Transfer — aperture compress → empty hold → reconstruct.
 * iframe-safe; no storage / parent / network.
 */

const COMPRESS_MS = 200
const EMPTY_HOLD_MS = 120
const RECONSTRUCT_MS = 220
const APERTURE_FROM_PX = 8
const APERTURE_TO_PX = 72

let busy = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-tct]')
}

function cardEl() {
  return document.querySelector('[data-tct-card]')
}

function destEl() {
  return document.querySelector('[data-tct-dest]')
}

function sourceApertureEl() {
  return document.querySelector('[data-tct-aperture-source]')
}

function destApertureEl() {
  return document.querySelector('[data-tct-aperture-dest]')
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
  const el = document.querySelector('[data-tct-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-tct-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-tct-hint]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-tct-run], [data-tct-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function measureOffset() {
  const card = cardEl()
  const dest = destEl()
  if (!card || !dest) return { dx: 0, dy: 0 }
  const cardRect = card.getBoundingClientRect()
  const destRect = dest.getBoundingClientRect()
  const dx =
    destRect.left + destRect.width / 2 - (cardRect.left + cardRect.width / 2)
  const dy =
    destRect.top + destRect.height / 2 - (cardRect.top + cardRect.height / 2)
  return { dx, dy }
}

function showResolved() {
  rootEl()?.setAttribute('data-phase', 'done')
  setStatus('ARRIVED')
  setHint('Card reconstructed at destination.')
  setLive('Card arrived at destination.')
}

function resetVisual() {
  const card = cardEl()
  sourceApertureEl()?.removeAttribute('data-open')
  destApertureEl()?.removeAttribute('data-open')
  if (card) {
    card.setAttribute('data-instant', 'true')
    card.style.setProperty('--tct-dx', '0px')
    card.style.setProperty('--tct-dy', '0px')
    card.style.setProperty('--tct-scale', '1')
    void card.offsetWidth
    card.removeAttribute('data-instant')
  }
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('SOURCE')
  setHint('Press Run to teleport the card.')
  setLive('Card at source slot. Destination empty.')
}

/**
 * Compress → empty mid hold → reconstruct at destination.
 * @returns {Promise<void>}
 */
export function runTeleportCardTransfer() {
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
    const card = cardEl()
    const { dx, dy } = measureOffset()
    if (card) {
      card.setAttribute('data-instant', 'true')
      card.style.setProperty('--tct-dx', \`\${dx}px\`)
      card.style.setProperty('--tct-dy', \`\${dy}px\`)
      void card.offsetWidth
      card.removeAttribute('data-instant')
    }
    showResolved()
    busy = false
    setButtons(true)
    return Promise.resolve()
  }

  const card = cardEl()
  root.setAttribute('data-phase', 'compress')
  sourceApertureEl()?.setAttribute('data-open', 'true')
  setStatus('COMPRESS')
  setLive('Card compressing into source aperture.')
  setHint(\`Aperture \${APERTURE_FROM_PX}→\${APERTURE_TO_PX}px.\`)

  return new Promise((resolve) => {
    later(COMPRESS_MS, () => {
      root.setAttribute('data-phase', 'empty')
      sourceApertureEl()?.removeAttribute('data-open')
      setStatus('EMPTY')
      setLive('Mid-transfer empty hold.')
      setHint(\`Empty hold \${EMPTY_HOLD_MS}ms.\`)

      later(EMPTY_HOLD_MS, () => {
        const { dx, dy } = measureOffset()
        if (card) {
          card.setAttribute('data-instant', 'true')
          card.style.setProperty('--tct-dx', \`\${dx}px\`)
          card.style.setProperty('--tct-dy', \`\${dy}px\`)
          void card.offsetWidth
          card.removeAttribute('data-instant')
        }
        destApertureEl()?.setAttribute('data-open', 'true')
        root.setAttribute('data-phase', 'reconstruct')
        setStatus('RECONSTRUCT')
        setLive('Card reconstructing at destination aperture.')

        later(RECONSTRUCT_MS, () => {
          destApertureEl()?.removeAttribute('data-open')
          showResolved()
          busy = false
          setButtons(true)
          resolve()
        })
      })
    })
  })
}

export function resetTeleportCardTransfer() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayTeleportCardTransfer() {
  if (busy) return
  resetTeleportCardTransfer()
  void rootEl()?.offsetWidth
  await runTeleportCardTransfer()
}

function bindUi() {
  document.querySelector('[data-tct-run]')?.addEventListener('click', () => {
    void runTeleportCardTransfer()
  })
  document.querySelector('[data-tct-replay]')?.addEventListener('click', () => {
    void replayTeleportCardTransfer()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayTeleportCardTransfer()
  })
}

bindUi()
resetTeleportCardTransfer()
requestAnimationFrame(() => {
  void runTeleportCardTransfer()
})
`,
    )

    // Fix template literals - I used escaped backticks incorrectly in the write. Let me write the file properly without escaping issues.
    // Actually in a template literal for the Write tool content, I used \` which will write literal backticks with backslashes. Need to fix.
  } catch (e) {
    console.error(id, e)
    results.failed.push(`${id}: ${e.message}`)
  }
}

console.log('part3 scaffold start — teleport js needs clean write')
