import { mkdirSync, writeFileSync, copyFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const dir = join(
  process.cwd(),
  'src/specimens/library/manga/manga-hit-stop-freeze',
)
mkdirSync(dir, { recursive: true })

const html = `<div class="mhs" data-manga-hit-stop-freeze data-phase="idle">
  <div class="mhs__plate" aria-hidden="true">
    <div class="mhs__strokes" data-mhs-strokes>
      <span class="mhs__stroke mhs__stroke--1"></span>
      <span class="mhs__stroke mhs__stroke--2"></span>
      <span class="mhs__stroke mhs__stroke--3"></span>
      <span class="mhs__stroke mhs__stroke--4"></span>
      <span class="mhs__stroke mhs__stroke--5"></span>
      <span class="mhs__stroke mhs__stroke--6"></span>
    </div>
    <button type="button" class="mhs__card" data-mhs-card tabindex="-1">
      <span class="mhs__card-kicker">ACTION</span>
      <span class="mhs__card-title">COMMIT</span>
    </button>
  </div>
  <div class="mhs__controls">
    <button type="button" class="mhs__trigger" data-mhs-trigger>REPLAY</button>
    <p class="mhs__status" role="status" aria-live="polite" data-mhs-status>
      Ready. Hit-stop freezes impact pose for 110ms.
    </p>
  </div>
</div>
`

const css = `/* manga-hit-stop-freeze — portable specimen styles. Do not restyle to host tokens. */

.mhs {
  --mhs-ink: #111111;
  --mhs-paper: #f4f1e8;
  --mhs-windup-ms: 120ms;
  --mhs-impact-ms: 90ms;
  --mhs-hitstop-ms: 110ms;
  --mhs-recoil-ms: 90ms;
  --mhs-settle-ms: 180ms;
  --mhs-ease-snap: cubic-bezier(0.2, 0.9, 0.2, 1);
  --mhs-ease-out: cubic-bezier(0.22, 0.8, 0.2, 1);
  box-sizing: border-box;
  width: 420px;
  max-width: 100%;
  margin: 0 auto;
  padding: 12px;
  color: var(--mhs-ink);
  background: var(--mhs-paper);
  font-family: 'Iowan Old Style', 'Palatino Linotype', Palatino, 'Book Antiqua', Georgia, serif;
}

.mhs *,
.mhs *::before,
.mhs *::after {
  box-sizing: border-box;
}

.mhs__plate {
  position: relative;
  width: 100%;
  height: 260px;
  overflow: hidden;
  border: 4px solid var(--mhs-ink);
  background:
    linear-gradient(90deg, color-mix(in srgb, var(--mhs-ink) 6%, transparent) 1px, transparent 1px) 0 0 / 24px 24px,
    linear-gradient(0deg, color-mix(in srgb, var(--mhs-ink) 6%, transparent) 1px, transparent 1px) 0 0 / 24px 24px,
    var(--mhs-paper);
}

.mhs__strokes {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0;
}

.mhs[data-phase='hitstop'] .mhs__strokes,
.mhs[data-phase='reduced'] .mhs__strokes {
  opacity: 1;
}

.mhs__stroke {
  position: absolute;
  width: 18px;
  height: 3px;
  background: var(--mhs-ink);
  border-radius: 0;
  left: 50%;
  top: 50%;
  transform-origin: center;
}

.mhs__stroke--1 { transform: translate(-50%, -50%) translate(0, -58px) rotate(0deg); }
.mhs__stroke--2 { transform: translate(-50%, -50%) translate(50px, -29px) rotate(60deg); }
.mhs__stroke--3 { transform: translate(-50%, -50%) translate(50px, 29px) rotate(120deg); }
.mhs__stroke--4 { transform: translate(-50%, -50%) translate(0, 58px) rotate(180deg); }
.mhs__stroke--5 { transform: translate(-50%, -50%) translate(-50px, 29px) rotate(240deg); }
.mhs__stroke--6 { transform: translate(-50%, -50%) translate(-50px, -29px) rotate(300deg); }

.mhs__card {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 168px;
  height: 92px;
  margin: 0;
  padding: 0.85rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.25rem;
  border: 4px solid var(--mhs-ink);
  border-radius: 0;
  background: var(--mhs-paper);
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: default;
  transform: translate(-50%, -50%) scale(1) rotate(0deg);
  transform-origin: center center;
  transition: transform var(--mhs-settle-ms) var(--mhs-ease-out);
}

.mhs[data-phase='windup'] .mhs__card {
  transform: translate(-50%, -50%) scale(0.96) rotate(0deg);
  transition-duration: var(--mhs-windup-ms);
  transition-timing-function: linear;
}

.mhs[data-phase='impact'] .mhs__card,
.mhs[data-phase='hitstop'] .mhs__card {
  transform: translate(-50%, -50%) scale(1.08) rotate(-1.2deg);
}

.mhs[data-phase='impact'] .mhs__card {
  transition-duration: var(--mhs-impact-ms);
  transition-timing-function: var(--mhs-ease-snap);
}

.mhs[data-phase='hitstop'] .mhs__card {
  /* Explicit freeze plateau — no transition during the 110ms hold. */
  transition: none;
}

.mhs[data-phase='recoil'] .mhs__card {
  transform: translate(-50%, -50%) scale(0.985) rotate(0.4deg);
  transition-duration: var(--mhs-recoil-ms);
  transition-timing-function: var(--mhs-ease-out);
}

.mhs[data-phase='settle'] .mhs__card,
.mhs[data-phase='idle'] .mhs__card,
.mhs[data-phase='done'] .mhs__card {
  transform: translate(-50%, -50%) scale(1) rotate(0deg);
}

.mhs[data-phase='settle'] .mhs__card {
  transition-duration: var(--mhs-settle-ms);
  transition-timing-function: var(--mhs-ease-out);
}

.mhs[data-phase='reduced'] .mhs__card {
  transform: translate(-50%, -50%) scale(1) rotate(0deg);
  transition: none;
  box-shadow: inset 0 0 0 3px var(--mhs-ink);
}

.mhs__card-kicker {
  font-size: 0.68rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  opacity: 0.72;
}

.mhs__card-title {
  font-size: 1.55rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  line-height: 1;
}

.mhs__controls {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 10px;
}

.mhs__trigger {
  flex: 0 0 auto;
  margin: 0;
  padding: 0.45rem 0.85rem;
  border: 3px solid var(--mhs-ink);
  border-radius: 0;
  background: var(--mhs-ink);
  color: var(--mhs-paper);
  font: inherit;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  cursor: pointer;
}

.mhs__trigger:focus-visible {
  outline: 2px solid var(--mhs-ink);
  outline-offset: 3px;
}

.mhs__trigger:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.mhs__status {
  margin: 0;
  font-size: 0.72rem;
  line-height: 1.3;
  opacity: 0.75;
}

@media (prefers-reduced-motion: reduce) {
  .mhs__card {
    transition: none !important;
  }
}

html[data-force-reduced-motion='true'] .mhs__card {
  transition: none !important;
}
`

const js = `/**
 * Manga Hit Stop Freeze — impact emphasis with an explicit motionless plateau.
 * Sandbox-safe (no parent / storage / network).
 *
 * wind-up 120 → impact 90 → HIT STOP 110 (frozen) → recoil 90 → settle 180
 */

const WINDUP_MS = 120
const IMPACT_MS = 90
const HITSTOP_MS = 110
const RECOIL_MS = 90
const SETTLE_MS = 180
const REDUCED_HOLD_MS = 250

/** @type {number[]} */
let timers = []
let busy = false

function rootEl() {
  return document.querySelector('[data-manga-hit-stop-freeze]')
}

function triggerEl() {
  return document.querySelector('[data-mhs-trigger]')
}

function statusEl() {
  return document.querySelector('[data-mhs-status]')
}

function prefersReducedMotion() {
  return (
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true' ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

function clearTimers() {
  timers.forEach((id) => window.clearTimeout(id))
  timers = []
}

/**
 * @param {number} ms
 * @param {() => void} fn
 */
function after(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
}

/**
 * @param {string} text
 */
function setStatus(text) {
  const el = statusEl()
  if (el) el.textContent = text
}

/**
 * @param {string} phase
 */
function setPhase(phase) {
  const root = rootEl()
  if (!root) return
  root.dataset.phase = phase
}

function setBusy(on) {
  busy = on
  const btn = triggerEl()
  if (btn) btn.disabled = on
}

function finishIdle() {
  setPhase('idle')
  setBusy(false)
  setStatus('Ready. Hit-stop freezes impact pose for 110ms.')
}

export function resetMangaHitStopFreeze() {
  clearTimers()
  setBusy(false)
  setPhase('idle')
  setStatus('Ready. Hit-stop freezes impact pose for 110ms.')
}

/**
 * @returns {Promise<void>}
 */
export function runMangaHitStopFreeze() {
  if (busy) return Promise.resolve()
  const root = rootEl()
  if (!root) return Promise.resolve()

  clearTimers()
  setBusy(true)

  if (prefersReducedMotion()) {
    setPhase('reduced')
    setStatus('Reduced motion: static impact marks, no freeze motion.')
    return new Promise((resolve) => {
      after(REDUCED_HOLD_MS, () => {
        finishIdle()
        resolve()
      })
    })
  }

  setPhase('windup')
  setStatus('Wind-up.')

  return new Promise((resolve) => {
    after(WINDUP_MS, () => {
      setPhase('impact')
      setStatus('Impact.')
    })

    after(WINDUP_MS + IMPACT_MS, () => {
      setPhase('hitstop')
      setStatus('Hit stop — frozen 110ms at scale(1.08) rotate(-1.2deg).')
    })

    after(WINDUP_MS + IMPACT_MS + HITSTOP_MS, () => {
      setPhase('recoil')
      setStatus('Recoil.')
    })

    after(WINDUP_MS + IMPACT_MS + HITSTOP_MS + RECOIL_MS, () => {
      setPhase('settle')
      setStatus('Settle.')
    })

    after(WINDUP_MS + IMPACT_MS + HITSTOP_MS + RECOIL_MS + SETTLE_MS, () => {
      finishIdle()
      resolve()
    })
  })
}

function bindUi() {
  document.querySelectorAll('[data-mhs-trigger]').forEach((btn) => {
    btn.addEventListener('click', () => {
      void runMangaHitStopFreeze()
    })
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      resetMangaHitStopFreeze()
    }
  })
}

bindUi()

export const MANGA_HIT_STOP_FREEZE_CONTRACT = {
  WINDUP_MS,
  IMPACT_MS,
  HITSTOP_MS,
  RECOIL_MS,
  SETTLE_MS,
  REDUCED_HOLD_MS,
}
`

const entry = `import type { Specimen } from '../../../types'

export const mangaHitStopFreeze: Specimen = {
  id: 'manga-hit-stop-freeze',
  ref: 'SPX-4101',
  title: 'Hit Stop Freeze',
  blurb:
    'A chunky action card winds up, slams to an impact pose, freezes motionless for exactly 110ms with six strokes, then recoils and settles.',
  origin: {
    project: 'Original',
    surface: 'Manga/anime hit-stop impact emphasis as a reusable UI commit beat',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: { franchise: 'manga' },
  tags: ['hit-stop', 'impact', 'freeze', 'commit'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Skips wind-up, scale impact, rotation and recoil; shows six static strokes for ~250ms with a strong inset border.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 340,
    background: 'page',
    scaffold:
      '<div style="width:420px;max-width:100%;margin:0 auto;overflow:hidden">{{specimen}}</div>',
    label: 'Manga hit stop freeze',
  },
  integration: [
    'Copy the effect wrapper and focal element structure.',
    'Mount around the host action/card.',
    'Trigger the supplied active class/function when an important action commits.',
    'Do not use for ordinary hover feedback.',
    'Preserve the explicit hit-stop timing plateau.',
    'Preserve trigger locking and reduced-motion behaviour.',
  ],
  acceptance: [
    'Normal mode contains a measurable 110ms interval where the focal transform does not change.',
    'Freeze occurs at scale(1.08) rotate(-1.2deg).',
    'Exactly six impact strokes appear.',
    'Impact strokes disappear after the sequence.',
    'Final transform is exactly scale(1) rotate(0).',
    'Repeated triggers cannot stack animations.',
    'Reduced motion contains no wind-up, recoil or aggressive scaling.',
  ],
}
`

const payload = `import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for \`*.css?raw\`; keep demo.css as the portable
// artifact and import the twin \`.txt\` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  files: { html, css, js },
  spec,
  contract,
}

export default payload
`

const spec = `# Hit Stop Freeze (portable recreation spec)

Manga/anime-style hit stop: motion freezes at the exact impact pose before
release. The defining feature is the motionless plateau — not a bounce.

## Visual intent

Chunky monochrome action card on warm paper. On commit: wind-up → impact →
**110ms frozen hold with six strokes** → recoil → settle.

## DOM structure

\`\`\`html
<div class="mhs" data-manga-hit-stop-freeze data-phase="idle">
  <div class="mhs__plate">
    <div class="mhs__strokes"><!-- 6 strokes --></div>
    <button class="mhs__card" data-mhs-card>COMMIT</button>
  </div>
  <button data-mhs-trigger>REPLAY</button>
</div>
\`\`\`

## Timing contract

| Phase | Duration | Transform |
| ----- | -------- | --------- |
| Wind-up | \`120ms\` | \`scale(0.96)\` |
| Impact | \`90ms\` | \`scale(1.08) rotate(-1.2deg)\` |
| **Hit stop** | **\`110ms\` frozen** | **same impact pose, \`transition: none\`** |
| Recoil | \`90ms\` | \`scale(0.985) rotate(0.4deg)\` |
| Settle | \`180ms\` | \`scale(1) rotate(0)\` |

Total ≈ \`590ms\`. Exactly **6** impact strokes during hit stop only.

## Colours

| Token | Value |
| ----- | ----- |
| Ink | \`#111111\` |
| Paper | \`#F4F1E8\` |

## Host

Relative \`420 × 260px\` plate with clear space for six strokes around a centred card.

## Interaction

- \`REPLAY\` / trigger runs the sequence.
- Ignore additional triggers while \`busy\` so animations cannot stack.

## Reduced motion

No wind-up, scale slam, rotation, or recoil. Enter completed/static state and
show six strokes for ≈\`250ms\` with a strong inset border.

## API

- \`runMangaHitStopFreeze()\`
- \`resetMangaHitStopFreeze()\`
`

const contract = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'https://playground.humza-butt.space/contracts/manga-hit-stop-freeze.schema.json',
  title: 'MangaHitStopFreeze',
  description:
    'Portable contract for manga/anime hit-stop: wind-up, impact, an explicit 110ms motionless freeze with six strokes, recoil, and settle.',
  type: 'object',
  additionalProperties: false,
  required: [
    'name',
    'intent',
    'preview',
    'colors',
    'phases',
    'strokes',
    'interaction',
    'reducedMotion',
    'classNames',
  ],
  properties: {
    name: { type: 'string', const: 'manga-hit-stop-freeze' },
    intent: {
      type: 'string',
      const: "Demonstrate manga/anime-style hit stop as a reusable software interaction: freeze motionless at the exact impact pose before release.",
    },
    preview: {
      type: 'object',
      additionalProperties: false,
      required: ['plateWidthPx', 'plateHeightPx'],
      properties: {
        plateWidthPx: { type: 'number', const: 420 },
        plateHeightPx: { type: 'number', const: 260 },
      },
    },
    colors: {
      type: 'object',
      additionalProperties: false,
      required: ['ink', 'paper'],
      properties: {
        ink: { type: 'string', const: '#111111' },
        paper: { type: 'string', const: '#F4F1E8' },
      },
    },
    phases: {
      type: 'object',
      additionalProperties: false,
      required: ['windup', 'impact', 'hitStop', 'recoil', 'settle', 'totalApproxMs'],
      properties: {
        windup: {
          type: 'object',
          additionalProperties: false,
          required: ['durationMs', 'scale'],
          properties: {
            durationMs: { type: 'number', const: 120 },
            scale: { type: 'number', const: 0.96 },
          },
        },
        impact: {
          type: 'object',
          additionalProperties: false,
          required: ['durationMs', 'scale', 'rotateDeg'],
          properties: {
            durationMs: { type: 'number', const: 90 },
            scale: { type: 'number', const: 1.08 },
            rotateDeg: { type: 'number', const: -1.2 },
          },
        },
        hitStop: {
          type: 'object',
          additionalProperties: false,
          required: ['durationMs', 'scale', 'rotateDeg', 'motionless'],
          properties: {
            durationMs: { type: 'number', const: 110 },
            scale: { type: 'number', const: 1.08 },
            rotateDeg: { type: 'number', const: -1.2 },
            motionless: { type: 'boolean', const: true },
          },
        },
        recoil: {
          type: 'object',
          additionalProperties: false,
          required: ['durationMs', 'scale', 'rotateDeg'],
          properties: {
            durationMs: { type: 'number', const: 90 },
            scale: { type: 'number', const: 0.985 },
            rotateDeg: { type: 'number', const: 0.4 },
          },
        },
        settle: {
          type: 'object',
          additionalProperties: false,
          required: ['durationMs', 'scale', 'rotateDeg'],
          properties: {
            durationMs: { type: 'number', const: 180 },
            scale: { type: 'number', const: 1 },
            rotateDeg: { type: 'number', const: 0 },
          },
        },
        totalApproxMs: { type: 'number', const: 590 },
      },
    },
    strokes: {
      type: 'object',
      additionalProperties: false,
      required: ['count', 'visibleDuring'],
      properties: {
        count: { type: 'number', const: 6 },
        visibleDuring: { type: 'string', const: 'hitstop' },
      },
    },
    interaction: {
      type: 'object',
      additionalProperties: false,
      required: ['replayControl', 'lockWhileRunning'],
      properties: {
        replayControl: { type: 'boolean', const: true },
        lockWhileRunning: { type: 'boolean', const: true },
      },
    },
    reducedMotion: {
      type: 'object',
      additionalProperties: false,
      required: ['triggers', 'behavior', 'staticHoldMs'],
      properties: {
        triggers: {
          type: 'array',
          const: ['prefers-reduced-motion', 'data-force-reduced-motion'],
        },
        behavior: {
          type: 'string',
          const: 'Skip wind-up, scale impact, rotation and recoil; show six static strokes ~250ms with strong border.',
        },
        staticHoldMs: { type: 'number', const: 250 },
      },
    },
    classNames: {
      type: 'object',
      additionalProperties: false,
      required: ['root', 'plate', 'card', 'strokes', 'stroke', 'trigger'],
      properties: {
        root: { type: 'string', const: 'mhs' },
        plate: { type: 'string', const: 'mhs__plate' },
        card: { type: 'string', const: 'mhs__card' },
        strokes: { type: 'string', const: 'mhs__strokes' },
        stroke: { type: 'string', const: 'mhs__stroke' },
        trigger: { type: 'string', const: 'mhs__trigger' },
      },
    },
  },
}

writeFileSync(join(dir, 'demo.html'), html)
writeFileSync(join(dir, 'demo.css'), css)
writeFileSync(join(dir, 'demo.style.txt'), css)
writeFileSync(join(dir, 'demo.js'), js)
writeFileSync(join(dir, 'entry.ts'), entry)
writeFileSync(join(dir, 'payload.ts'), payload)
writeFileSync(join(dir, 'spec.md'), spec)
writeFileSync(join(dir, 'contract.json'), JSON.stringify(contract, null, 2) + '\n')

console.log('wrote', readdirSync(dir).sort().join(', '))
