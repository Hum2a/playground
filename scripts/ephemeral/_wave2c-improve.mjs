/**
 * WAVE 2c — mission paper + sensory/barrier metaphor harden.
 * Run: node scripts/ephemeral/_wave2c-improve.mjs [id...]
 */
import fs from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve('src/specimens/library/naruto')

const PAPER = {
  ink: '#1A1612',
  parchment: '#EBE2D0',
  chakra: '#B83228',
  olive: '#6A5E4E',
  off: '#F7F2E8',
  rgbAccent: '184 50 40',
}
const SENSOR = {
  ink: '#070B0E',
  parchment: '#C8E8DC',
  chakra: '#3DCEA8',
  olive: '#1A6B58',
  off: '#D7F5EC',
  danger: '#D94A38',
  rgbAccent: '61 206 168',
  rgbDanger: '217 74 56',
}

function read(id, file) {
  return fs.readFileSync(path.join(ROOT, id, file), 'utf8')
}
function write(id, file, body) {
  fs.writeFileSync(path.join(ROOT, id, file), body)
}
function syncTwin(id) {
  const css = read(id, 'demo.css')
  write(id, 'demo.style.txt', css)
}
function stripBlue(css, rgbAccent) {
  return css
    .replaceAll('rgb(58 155 217 / 0.45)', `rgb(${rgbAccent} / 0.45)`)
    .replaceAll('rgb(58 155 217 / 0.5)', `rgb(${rgbAccent} / 0.5)`)
    .replaceAll('rgb(58 155 217 / 0.14)', `rgb(${rgbAccent} / 0.14)`)
    .replaceAll('rgb(58 155 217 / 0.12)', `rgb(${rgbAccent} / 0.12)`)
    .replaceAll('rgb(58 155 217 / 0.55)', `rgb(${rgbAccent} / 0.55)`)
    .replaceAll('rgb(217 74 56 / 0.55)', `rgb(${rgbAccent} / 0.55)`)
    .replaceAll('rgb(217 74 56 / 0.14)', `rgb(${rgbAccent} / 0.14)`)
    .replaceAll('rgb(217 74 56 / 0)', `rgb(${rgbAccent} / 0)`)
}

function patchEntry(id, { blurb, intensity, reducedMotionNote, acceptance, scaffold }) {
  let src = read(id, 'entry.ts')
  if (blurb) {
    src = src.replace(/blurb:\s*\n\s*'[^']*',/, `blurb:\n    '${blurb}',`)
    src = src.replace(/blurb:\s*'[^']*',/, `blurb:\n    '${blurb}',`)
  }
  if (intensity) {
    src = src.replace(/intensity:\s*'[^']*'/, `intensity: '${intensity}'`)
  }
  if (reducedMotionNote) {
    src = src.replace(
      /reducedMotionNote:\s*\n\s*'[^']*',/,
      `reducedMotionNote:\n      '${reducedMotionNote}',`,
    )
  }
  if (acceptance) {
    const block = `  acceptance: [\n${acceptance.map((a) => `    '${a}',`).join('\n')}\n  ],\n`
    if (/acceptance:\s*\[/.test(src)) {
      src = src.replace(/acceptance:\s*\[[^\]]*\],?/, block.trimEnd() + ',')
    } else {
      src = src.replace(
        /loadPayload:/,
        `${block}  loadPayload:`,
      )
    }
  }
  if (scaffold && /preview:\s*\{/.test(src)) {
    if (/scaffold:/.test(src)) {
      src = src.replace(/scaffold:\s*`[^`]*`/, `scaffold: \`${scaffold}\``)
      src = src.replace(/scaffold:\s*'[^']*'/, `scaffold: \`${scaffold}\``)
    }
  }
  write(id, 'entry.ts', src)
}

function patchPayload(id, { acceptance, integration, scaffoldBg }) {
  let src = read(id, 'payload.ts')
  if (acceptance) {
    const block = `  acceptance: [\n${acceptance.map((a) => `    '${a}',`).join('\n')}\n  ],`
    src = src.replace(/acceptance:\s*\[[^\]]*\],?/s, block)
  }
  if (integration) {
    const block = `  integration: [\n${integration.map((a) => `    '${a}',`).join('\n')}\n  ],`
    src = src.replace(/integration:\s*\[[^\]]*\],?/s, block)
  }
  if (scaffoldBg) {
    src = src.replace(/background:#[0-9a-fA-F]{3,8}/g, `background:${scaffoldBg}`)
  }
  write(id, 'payload.ts', src)
}

/** @type {Record<string, () => void>} */
const IMPROVERS = {
  'mission-rank-reveal'() {
    const id = 'mission-rank-reveal'
    let css = stripBlue(read(id, 'demo.css'), PAPER.rgbAccent)
    css = css.replace(
      `.mrr__stamp {
  position: absolute;
  top: 52%;
  left: 50%;
  padding: 0.35rem 0.9rem;
  border: 3px double var(--alert);
  color: var(--alert);
  font-size: 0.9rem;
  font-weight: 900;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  opacity: 0;
  transform: translate(-50%, -50%) rotate(-14deg) scale(2.4);
  transition:
    opacity 180ms ease-out,
    transform 180ms cubic-bezier(0.2, 0.9, 0.25, 1);
}

.mrr__stamp[data-visible='true'] {
  opacity: 0.92;
  transform: translate(-50%, -50%) rotate(-12deg) scale(1);
}`,
      `.mrr__stamp {
  position: absolute;
  top: 52%;
  left: 50%;
  padding: 0.35rem 0.9rem;
  border: 3px double var(--alert);
  color: var(--alert);
  font-size: 0.9rem;
  font-weight: 900;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  opacity: 0;
  transform: translate(-50%, -50%) rotate(var(--mrr-stamp-overshoot, -22deg)) scale(2.4);
  transition: none;
}

.mrr__stamp[data-phase='impact'] {
  opacity: 0.95;
  transition:
    opacity 80ms linear,
    transform 180ms cubic-bezier(0.2, 0.9, 0.25, 1.35);
  transform: translate(-50%, -50%) rotate(var(--mrr-stamp-overshoot, -22deg)) scale(1.08);
}

.mrr__stamp[data-phase='settle'],
.mrr__stamp[data-visible='true'] {
  opacity: 0.92;
  transition: transform 120ms cubic-bezier(0.34, 1.2, 0.4, 1);
  transform: translate(-50%, -50%) rotate(var(--mrr-stamp-settle, -12deg)) scale(1);
}`,
    )
    write(id, 'demo.css', css)

    let js = read(id, 'demo.js')
    js = js.replace(
      /const CARD_MS = 280\nconst STAMP_MS = 240\nconst SETTLE_MS = 100\nconst TOTAL_MS = CARD_MS \+ STAMP_MS \+ SETTLE_MS/,
      `const CARD_MS = 280
const STAMP_IMPACT_MS = 180
const STAMP_SETTLE_MS = 120
const SETTLE_MS = 90
const STAMP_OVERSHOOT_DEG = -22
const STAMP_SETTLE_DEG = -12
const TOTAL_MS = CARD_MS + STAMP_IMPACT_MS + STAMP_SETTLE_MS + SETTLE_MS`,
    )
    js = js.replace(
      `function showResolved() {
  card()?.setAttribute('data-visible', 'true')
  stamp()?.setAttribute('data-visible', 'true')
  rootEl()?.setAttribute('data-phase', 'done')
  setStatus('RANK CONFIRMED')
  setHint('Mission rank B confirmed.')
  setLive('Mission rank confirmed. Rank B.')
}

function resetVisual() {
  card()?.setAttribute('data-visible', 'false')
  stamp()?.setAttribute('data-visible', 'false')
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('PENDING')
  setHint('Press Run to reveal the mission rank.')
  setLive('Briefing idle. Rank pending.')
}`,
      `function showResolved() {
  card()?.setAttribute('data-visible', 'true')
  const s = stamp()
  s?.setAttribute('data-visible', 'true')
  s?.setAttribute('data-phase', 'settle')
  rootEl()?.setAttribute('data-phase', 'done')
  setStatus('RANK CONFIRMED')
  setHint('Mission rank B confirmed.')
  setLive('Mission rank confirmed. Rank B.')
}

function resetVisual() {
  card()?.setAttribute('data-visible', 'false')
  const s = stamp()
  s?.setAttribute('data-visible', 'false')
  s?.removeAttribute('data-phase')
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('PENDING')
  setHint('Press Run to reveal the mission rank.')
  setLive('Briefing idle. Rank pending.')
}`,
    )
    js = js.replace(
      `    later(CARD_MS, () => {
      setStatus('STAMPING')
      setLive('Stamping mission rank.')
      stamp()?.setAttribute('data-visible', 'true')
      later(STAMP_MS, () => {
        later(SETTLE_MS, () => {
          showResolved()
          busy = false
          setButtons(true)
          resolve()
        })
      })
    })`,
      `    later(CARD_MS, () => {
      setStatus('STAMPING')
      setLive('Wax stamp impact.')
      const s = stamp()
      s?.setAttribute('data-visible', 'true')
      s?.setAttribute('data-phase', 'impact')
      later(STAMP_IMPACT_MS, () => {
        s?.setAttribute('data-phase', 'settle')
        later(STAMP_SETTLE_MS + SETTLE_MS, () => {
          showResolved()
          busy = false
          setButtons(true)
          resolve()
        })
      })
    })`,
    )
    js = js.replace('void TOTAL_MS', 'void TOTAL_MS\nvoid STAMP_OVERSHOOT_DEG\nvoid STAMP_SETTLE_DEG')
    write(id, 'demo.js', js)

    write(
      id,
      'contract.json',
      JSON.stringify(
        {
          $schema: 'https://json-schema.org/draft/2020-12/schema',
          $id: 'https://playground.humza-butt.space/contracts/mission-rank-reveal.schema.json',
          title: 'MissionRankReveal',
          description:
            'Rank B card lands, then a wax stamp impacts at −22° and settles to −12°.',
          type: 'object',
          additionalProperties: false,
          required: [
            'name',
            'rank',
            'cardMs',
            'stampImpactMs',
            'stampSettleMs',
            'stampOvershootDeg',
            'stampSettleDeg',
            'colours',
            'reducedMotion',
          ],
          properties: {
            name: { type: 'string', const: 'mission-rank-reveal' },
            rank: { type: 'string', const: 'B' },
            cardMs: { type: 'number', const: 280 },
            stampImpactMs: { type: 'number', const: 180 },
            stampSettleMs: { type: 'number', const: 120 },
            settleMs: { type: 'number', const: 90 },
            stampOvershootDeg: { type: 'number', const: -22 },
            stampSettleDeg: { type: 'number', const: -12 },
            colours: {
              type: 'object',
              additionalProperties: false,
              required: ['ink', 'parchment', 'chakra', 'alert', 'olive', 'off'],
              properties: {
                ink: { type: 'string', const: PAPER.ink },
                parchment: { type: 'string', const: PAPER.parchment },
                chakra: { type: 'string', const: PAPER.chakra },
                alert: { type: 'string', const: PAPER.chakra },
                olive: { type: 'string', const: PAPER.olive },
                off: { type: 'string', const: PAPER.off },
              },
            },
            reducedMotion: {
              type: 'object',
              additionalProperties: false,
              required: ['immediateConfirmed'],
              properties: { immediateConfirmed: { type: 'boolean', const: true } },
            },
          },
        },
        null,
        2,
      ) + '\n',
    )

    const acceptance = [
      'Rank B card lands over 280ms before the wax stamp appears',
      'Stamp impacts at −22° overshoot then settles to −12° over 120ms',
      'Resolved shows RANK CONFIRMED with settled stamp angle',
      'Replay clears card and stamp before rerunning',
      'Reduced motion shows settled card + −12° stamp immediately',
    ]
    patchEntry(id, {
      blurb:
        'A Rank B card lands in the briefing, then a wax stamp impacts at −22° and settles to −12° CONFIRMED.',
      intensity: 'graphic',
      reducedMotionNote:
        'Under prefers-reduced-motion or data-force-reduced-motion, Rank B and the −12° CONFIRMED stamp appear already settled.',
      acceptance,
    })
    patchPayload(id, {
      acceptance,
      integration: [
        'Mount inside a relative host (~420×320+).',
        'Import demo.css verbatim; freeze card 280ms / stamp impact 180ms / settle −22°→−12° from contract.json.',
        'Wire runMissionRankReveal / resetMissionRankReveal / replayMissionRankReveal.',
        'Honour both reduced-motion triggers; listen for `{ type: "restart" }` postMessage.',
      ],
      scaffoldBg: '#1a1612',
    })
    write(
      id,
      'spec.md',
      `# Mission Rank Reveal

Rank **B** card lands (280ms), then a wax stamp impacts at **−22°** and settles to **−12°**.

## Freeze

- Card: 280ms · stamp impact: 180ms · stamp settle: 120ms
- Angles: overshoot −22° · settle −12°
- Palette: \`${PAPER.ink}\` / \`${PAPER.parchment}\` / \`${PAPER.chakra}\` / \`${PAPER.olive}\` / \`${PAPER.off}\`
`,
    )
    syncTwin(id)
  },

  'mission-complete-stamp'() {
    const id = 'mission-complete-stamp'
    let css = stripBlue(read(id, 'demo.css'), PAPER.rgbAccent)
    css = css.replace(
      `.mcs[data-phase='active'] .mcs__stamp {
  opacity: 1;
  transition:
    transform 220ms cubic-bezier(0.32, 0.1, 0.2, 1.35),
    opacity 80ms linear;
  transform: translate(-50%, -50%) rotate(-14deg) scale(1);
}

.mcs[data-phase='done'] .mcs__stamp {
  opacity: 1;
  transform: translate(-50%, -50%) rotate(-14deg) scale(1);
}`,
      `.mcs[data-phase='active'] .mcs__stamp {
  opacity: 1;
  transition:
    transform 220ms cubic-bezier(0.32, 0.1, 0.2, 1.45),
    opacity 80ms linear;
  transform: translate(-50%, -50%) rotate(-18deg) scale(1.06);
}

.mcs[data-phase='done'] .mcs__stamp {
  opacity: 1;
  transition: transform 100ms cubic-bezier(0.34, 1.2, 0.4, 1);
  transform: translate(-50%, -50%) rotate(-14deg) scale(1);
}`,
    )
    css = css.replace(
      `transform: translate(-50%, -240%) rotate(-14deg) scale(1.5);`,
      `transform: translate(-50%, -240%) rotate(-18deg) scale(1.55);`,
    )
    write(id, 'demo.css', css)

    let js = read(id, 'demo.js')
    js = js.replace(
      /const SLAM_MS = 220\nconst RING_MS = 260\nconst TOTAL_MS = SLAM_MS \+ RING_MS \/\/ ~480ms principal sequence/,
      `const SLAM_MS = 220
const SETTLE_MS = 100
const RING_MS = 260
const STAMP_OVERSHOOT_DEG = -18
const STAMP_SETTLE_DEG = -14
const TOTAL_MS = SLAM_MS + SETTLE_MS + RING_MS`,
    )
    js = js.replace(
      `  return new Promise((resolve) => {
    later(SLAM_MS, () => {
      later(RING_MS, () => {
        showResolved()
        busy = false
        setButtons(true)
        resolve()
      })
    })
  })`,
      `  return new Promise((resolve) => {
    later(SLAM_MS, () => {
      root.setAttribute('data-phase', 'done')
      later(SETTLE_MS, () => {
        later(RING_MS, () => {
          showResolved()
          busy = false
          setButtons(true)
          resolve()
        })
      })
    })
  })`,
    )
    js = js.replace(
      'void TOTAL_MS',
      'void TOTAL_MS\nvoid STAMP_OVERSHOOT_DEG\nvoid STAMP_SETTLE_DEG',
    )
    write(id, 'demo.js', js)

    write(
      id,
      'contract.json',
      JSON.stringify(
        {
          $schema: 'https://json-schema.org/draft/2020-12/schema',
          $id: 'https://playground.humza-butt.space/contracts/mission-complete-stamp.schema.json',
          title: 'MissionCompleteStamp',
          description:
            'COMPLETE wax stamp slams at −18° then settles to −14° with one ring pulse.',
          type: 'object',
          additionalProperties: false,
          required: [
            'name',
            'slamMs',
            'settleMs',
            'ringMs',
            'stampOvershootDeg',
            'stampSettleDeg',
            'colours',
            'reducedMotion',
          ],
          properties: {
            name: { type: 'string', const: 'mission-complete-stamp' },
            slamMs: { type: 'number', const: 220 },
            settleMs: { type: 'number', const: 100 },
            ringMs: { type: 'number', const: 260 },
            stampOvershootDeg: { type: 'number', const: -18 },
            stampSettleDeg: { type: 'number', const: -14 },
            colours: {
              type: 'object',
              additionalProperties: false,
              required: ['ink', 'parchment', 'chakra', 'alarm', 'olive', 'off'],
              properties: {
                ink: { type: 'string', const: PAPER.ink },
                parchment: { type: 'string', const: PAPER.parchment },
                chakra: { type: 'string', const: PAPER.chakra },
                alarm: { type: 'string', const: PAPER.chakra },
                olive: { type: 'string', const: PAPER.olive },
                off: { type: 'string', const: PAPER.off },
              },
            },
            reducedMotion: {
              type: 'object',
              additionalProperties: false,
              required: ['immediateComplete'],
              properties: { immediateComplete: { type: 'boolean', const: true } },
            },
          },
        },
        null,
        2,
      ) + '\n',
    )

    const acceptance = [
      'Idle briefing shows PENDING with stamp off-card',
      'Slam lands at −18° overshoot over 220ms then settles to −14°',
      'Exactly one ring pulse (260ms) then COMPLETE latches',
      'Replay clears stamp off-card before rerunning',
      'Reduced motion shows −14° COMPLETE immediately with no slam',
    ]
    patchEntry(id, {
      blurb:
        'A briefing card takes a COMPLETE wax stamp: slam at −18°, settle to −14°, one ring pulse, then latch.',
      intensity: 'graphic',
      reducedMotionNote:
        'Under prefers-reduced-motion or data-force-reduced-motion, the −14° COMPLETE stamp appears already settled with no slam or ring.',
      acceptance,
    })
    patchPayload(id, {
      acceptance,
      integration: [
        'Mount inside a relative host (~420×320+) with preview.scaffold host card.',
        'Import demo.css verbatim; freeze slam 220ms / settle −18°→−14° / ring 260ms from contract.json.',
        'Wire runMissionCompleteStamp / resetMissionCompleteStamp / replayMissionCompleteStamp.',
        'Honour both reduced-motion triggers.',
      ],
      scaffoldBg: '#1a1612',
    })
    write(
      id,
      'spec.md',
      `# Mission Complete Stamp

COMPLETE wax stamp slams at **−18°**, settles to **−14°**, then one ring pulse.

## Freeze

- Slam: 220ms · angle settle: 100ms · ring: 260ms
- Angles: overshoot −18° · settle −14°
- Palette: mission paper wax
`,
    )
    syncTwin(id)
  },

  'mission-board-dispatch'() {
    const id = 'mission-board-dispatch'
    let css = stripBlue(read(id, 'demo.css'), PAPER.rgbAccent)
    // Freeze travel via CSS vars defaults matching contract
    css = css.replace(
      `--mbd-dx: 0px;\n  --mbd-dy: 0px;`,
      `--mbd-dx: 0px;\n  --mbd-dy: 0px;\n  --mbd-travel-ms: 280ms;\n  --mbd-settle-ms: 160ms;`,
    )
    css = css.replace(
      `transition: transform 260ms cubic-bezier(0.4, 0, 0.2, 1);`,
      `transition: transform var(--mbd-travel-ms) cubic-bezier(0.22, 0.8, 0.25, 1);`,
    )
    css = css.replace(
      `animation: mbd-settle 200ms ease-out;`,
      `animation: mbd-settle var(--mbd-settle-ms) ease-out;`,
    )
    write(id, 'demo.css', css)

    let js = read(id, 'demo.js')
    js = js.replace(
      /const TRAVEL_MS = 260\nconst SETTLE_MS = 200\nconst TOTAL_MS = TRAVEL_MS \+ SETTLE_MS \/\/ ~460ms principal sequence/,
      `const TRAVEL_MS = 280
const SETTLE_MS = 160
const TRAVEL_DX_PX = 148
const TRAVEL_DY_PX = 0
const TOTAL_MS = TRAVEL_MS + SETTLE_MS`,
    )
    js = js.replace(
      `function applyOffset() {
  const card = cardEl()
  const { dx, dy } = measureOffset()
  card?.style.setProperty('--mbd-dx', \`\${dx}px\`)
  card?.style.setProperty('--mbd-dy', \`\${dy}px\`)
}`,
      `function applyOffset() {
  const card = cardEl()
  // Prefer measured lane dock; fall back to frozen contract travel.
  const measured = measureOffset()
  const dx = Number.isFinite(measured.dx) && measured.dx !== 0 ? measured.dx : TRAVEL_DX_PX
  const dy = Number.isFinite(measured.dy) ? measured.dy : TRAVEL_DY_PX
  card?.style.setProperty('--mbd-dx', \`\${dx}px\`)
  card?.style.setProperty('--mbd-dy', \`\${dy}px\`)
}`,
    )
    js = js.replace('void TOTAL_MS', 'void TOTAL_MS\nvoid TRAVEL_DX_PX\nvoid TRAVEL_DY_PX')
    write(id, 'demo.js', js)

    write(
      id,
      'contract.json',
      JSON.stringify(
        {
          $schema: 'https://json-schema.org/draft/2020-12/schema',
          $id: 'https://playground.humza-butt.space/contracts/mission-board-dispatch.schema.json',
          title: 'MissionBoardDispatch',
          description:
            'Job card travels from Unassigned into Team Lane along a frozen path then docks.',
          type: 'object',
          additionalProperties: false,
          required: [
            'name',
            'travelMs',
            'settleMs',
            'travelDxPx',
            'travelDyPx',
            'colours',
            'reducedMotion',
          ],
          properties: {
            name: { type: 'string', const: 'mission-board-dispatch' },
            travelMs: { type: 'number', const: 280 },
            settleMs: { type: 'number', const: 160 },
            travelDxPx: { type: 'number', const: 148 },
            travelDyPx: { type: 'number', const: 0 },
            colours: {
              type: 'object',
              additionalProperties: false,
              required: ['ink', 'parchment', 'chakra', 'alarm', 'olive', 'off'],
              properties: {
                ink: { type: 'string', const: PAPER.ink },
                parchment: { type: 'string', const: PAPER.parchment },
                chakra: { type: 'string', const: PAPER.chakra },
                alarm: { type: 'string', const: PAPER.chakra },
                olive: { type: 'string', const: PAPER.olive },
                off: { type: 'string', const: PAPER.off },
              },
            },
            reducedMotion: {
              type: 'object',
              additionalProperties: false,
              required: ['immediateAssigned'],
              properties: { immediateAssigned: { type: 'boolean', const: true } },
            },
          },
        },
        null,
        2,
      ) + '\n',
    )

    const acceptance = [
      'Idle card sits in Unassigned; lane slot is empty dashed',
      'Card travels into Team Lane over 280ms (fallback path +148px, 0px)',
      'Dock settle pulse 160ms then ASSIGNED latches with solid lane border',
      'Replay returns card to Unassigned before rerunning',
      'Reduced motion docks card in lane immediately',
    ]
    patchEntry(id, {
      blurb:
        'A C-Rank Escort job card travels from Unassigned into the Team Lane (+148px path) and docks ASSIGNED.',
      intensity: 'subtle',
      reducedMotionNote:
        'Under prefers-reduced-motion or data-force-reduced-motion, the card appears already docked in the Team Lane as ASSIGNED.',
      acceptance,
    })
    patchPayload(id, {
      acceptance,
      integration: [
        'Mount inside a relative host (~420×300+).',
        'Import demo.css verbatim; freeze travel 280ms / settle 160ms / fallback +148px from contract.json.',
        'Wire runMissionBoardDispatch / resetMissionBoardDispatch / replayMissionBoardDispatch.',
        'Honour both reduced-motion triggers.',
      ],
      scaffoldBg: '#1a1612',
    })
    write(
      id,
      'spec.md',
      `# Mission Board Dispatch

Job card travels Unassigned → Team Lane over **280ms** (fallback **+148px**), then docks.

## Freeze

- Travel: 280ms · settle: 160ms · path fallback: +148px / 0px
- Palette: mission paper
`,
    )
    syncTwin(id)
  },

  'rank-promotion-card'() {
    const id = 'rank-promotion-card'
    let css = stripBlue(read(id, 'demo.css'), PAPER.rgbAccent)
    // Add mid morph collapse phase
    css = css.replace(
      `.rpc[data-phase='active'] .rpc__badge--current,
.rpc[data-phase='done'] .rpc__badge--current {
  transform: rotateY(180deg);
}

.rpc[data-phase='active'] .rpc__badge--next,
.rpc[data-phase='done'] .rpc__badge--next {
  transform: rotateY(0deg);
}`,
      `.rpc[data-phase='collapse'] .rpc__badge--current {
  transform: rotateY(90deg) scale(0.92);
  transition: transform 140ms cubic-bezier(0.4, 0, 0.2, 1);
}

.rpc[data-phase='collapse'] .rpc__badge--next {
  transform: rotateY(-90deg) scale(0.92);
}

.rpc[data-phase='expand'] .rpc__badge--current,
.rpc[data-phase='done'] .rpc__badge--current {
  transform: rotateY(180deg);
}

.rpc[data-phase='expand'] .rpc__badge--next,
.rpc[data-phase='done'] .rpc__badge--next {
  transform: rotateY(0deg) scale(1);
  transition: transform 180ms cubic-bezier(0.2, 0.9, 0.25, 1.15);
}`,
    )
    write(id, 'demo.css', css)

    let js = read(id, 'demo.js')
    js = js.replace(
      /const FOLD_MS = 260\nconst GLOW_MS = 320\nconst TOTAL_MS = FOLD_MS \+ GLOW_MS \/\/ ~580ms principal sequence/,
      `const COLLAPSE_MS = 140
const EXPAND_MS = 180
const GLOW_MS = 280
const FROM_RANK = 'GENIN'
const TO_RANK = 'CHUNIN'
const TOTAL_MS = COLLAPSE_MS + EXPAND_MS + GLOW_MS`,
    )
    js = js.replace(
      `  root.setAttribute('data-phase', 'active')
  setStatus('PROMOTING')
  setLive('Rank promotion in progress.')

  return new Promise((resolve) => {
    later(FOLD_MS, () => {
      later(GLOW_MS, () => {
        showResolved()
        busy = false
        setButtons(true)
        resolve()
      })
    })
  })`,
      `  root.setAttribute('data-phase', 'collapse')
  setStatus('PROMOTING')
  setLive('Collapsing Genin badge.')

  return new Promise((resolve) => {
    later(COLLAPSE_MS, () => {
      root.setAttribute('data-phase', 'expand')
      setLive('Expanding Chunin badge.')
      later(EXPAND_MS, () => {
        later(GLOW_MS, () => {
          showResolved()
          busy = false
          setButtons(true)
          resolve()
        })
      })
    })
  })`,
    )
    js = js.replace('void TOTAL_MS', 'void TOTAL_MS\nvoid FROM_RANK\nvoid TO_RANK')
    write(id, 'demo.js', js)

    write(
      id,
      'contract.json',
      JSON.stringify(
        {
          $schema: 'https://json-schema.org/draft/2020-12/schema',
          $id: 'https://playground.humza-butt.space/contracts/rank-promotion-card.schema.json',
          title: 'RankPromotionCard',
          description: 'Profile badge morphs GENIN→CHUNIN via collapse → expand → glow phases.',
          type: 'object',
          additionalProperties: false,
          required: [
            'name',
            'fromRank',
            'toRank',
            'collapseMs',
            'expandMs',
            'glowMs',
            'colours',
            'reducedMotion',
          ],
          properties: {
            name: { type: 'string', const: 'rank-promotion-card' },
            fromRank: { type: 'string', const: 'GENIN' },
            toRank: { type: 'string', const: 'CHUNIN' },
            collapseMs: { type: 'number', const: 140 },
            expandMs: { type: 'number', const: 180 },
            glowMs: { type: 'number', const: 280 },
            colours: {
              type: 'object',
              additionalProperties: false,
              required: ['ink', 'parchment', 'chakra', 'alarm', 'olive', 'off'],
              properties: {
                ink: { type: 'string', const: PAPER.ink },
                parchment: { type: 'string', const: PAPER.parchment },
                chakra: { type: 'string', const: PAPER.chakra },
                alarm: { type: 'string', const: PAPER.chakra },
                olive: { type: 'string', const: PAPER.olive },
                off: { type: 'string', const: PAPER.off },
              },
            },
            reducedMotion: {
              type: 'object',
              additionalProperties: false,
              required: ['immediatePromoted'],
              properties: { immediatePromoted: { type: 'boolean', const: true } },
            },
          },
        },
        null,
        2,
      ) + '\n',
    )

    const acceptance = [
      'Idle shows GENIN badge only (CURRENT)',
      'Morph phases: collapse 140ms → expand CHUNIN 180ms → glow 280ms',
      'Resolved shows CHUNIN with PROMOTED status',
      'Replay restores GENIN before rerunning',
      'Reduced motion shows CHUNIN / PROMOTED immediately',
    ]
    patchEntry(id, {
      blurb:
        'A profile badge morphs GENIN→CHUNIN through collapse (140ms), expand (180ms), and glow (280ms) phases.',
      intensity: 'graphic',
      reducedMotionNote:
        'Under prefers-reduced-motion or data-force-reduced-motion, the profile shows CHUNIN / PROMOTED immediately with no morph.',
      acceptance,
    })
    patchPayload(id, {
      acceptance,
      integration: [
        'Mount inside a relative host (~420×300+).',
        'Import demo.css verbatim; freeze collapse 140ms / expand 180ms / glow 280ms and GENIN→CHUNIN from contract.json.',
        'Wire runRankPromotionCard / resetRankPromotionCard / replayRankPromotionCard.',
        'Honour both reduced-motion triggers.',
      ],
      scaffoldBg: '#1a1612',
    })
    write(
      id,
      'spec.md',
      `# Rank Promotion Card

GENIN → CHUNIN via **collapse 140ms → expand 180ms → glow 280ms**.

## Freeze

- fromRank: GENIN · toRank: CHUNIN
- Palette: mission paper
`,
    )
    syncTwin(id)
  },
}

const args = process.argv.slice(2)
const ids = args.length ? args : Object.keys(IMPROVERS)
for (const id of ids) {
  if (!IMPROVERS[id]) {
    console.error('no improver', id)
    process.exitCode = 1
    continue
  }
  IMPROVERS[id]()
  console.log('improved', id)
}
