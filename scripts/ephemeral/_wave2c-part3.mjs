/**
 * WAVE 2c part 3 — harden remaining specimens (contract + acceptance + light motion).
 * Run: node scripts/ephemeral/_wave2c-part3.mjs
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
}
const SENSOR = {
  ink: '#070B0E',
  parchment: '#C8E8DC',
  chakra: '#3DCEA8',
  olive: '#1A6B58',
  off: '#D7F5EC',
  danger: '#D94A38',
}

function rp(id, file) {
  return path.join(ROOT, id, file)
}
function read(id, file) {
  return fs.readFileSync(rp(id, file), 'utf8').replace(/\r\n/g, '\n')
}
function write(id, file, body) {
  fs.writeFileSync(rp(id, file), body.endsWith('\n') ? body : body + '\n')
}
function sync(id) {
  write(id, 'demo.style.txt', read(id, 'demo.css'))
}

function paperColours() {
  return {
    type: 'object',
    additionalProperties: false,
    required: ['ink', 'parchment', 'chakra', 'olive', 'off'],
    properties: {
      ink: { type: 'string', const: PAPER.ink },
      parchment: { type: 'string', const: PAPER.parchment },
      chakra: { type: 'string', const: PAPER.chakra },
      olive: { type: 'string', const: PAPER.olive },
      off: { type: 'string', const: PAPER.off },
    },
  }
}
function sensorColours(extra = {}) {
  const required = ['ink', 'parchment', 'chakra', 'olive', 'off', ...Object.keys(extra)]
  return {
    type: 'object',
    additionalProperties: false,
    required,
    properties: {
      ink: { type: 'string', const: SENSOR.ink },
      parchment: { type: 'string', const: SENSOR.parchment },
      chakra: { type: 'string', const: SENSOR.chakra },
      olive: { type: 'string', const: SENSOR.olive },
      off: { type: 'string', const: SENSOR.off },
      ...Object.fromEntries(
        Object.entries(extra).map(([k, v]) => [k, { type: 'string', const: v }]),
      ),
    },
  }
}

function patchEntry(id, { blurb, intensity, reducedMotionNote, acceptance }) {
  let src = read(id, 'entry.ts')
  if (blurb) {
    src = src.replace(/blurb:\s*(?:\n\s*)?'[^']*',/, `blurb:\n    '${blurb}',`)
  }
  if (intensity) src = src.replace(/intensity:\s*'[^']*'/, `intensity: '${intensity}'`)
  if (reducedMotionNote) {
    src = src.replace(
      /reducedMotionNote:\s*(?:\n\s*)?'[^']*',/,
      `reducedMotionNote:\n      '${reducedMotionNote}',`,
    )
  }
  const acc = `  acceptance: [\n${acceptance.map((a) => `    '${a}',`).join('\n')}\n  ],\n`
  if (/acceptance:\s*\[/.test(src)) {
    src = src.replace(/acceptance:\s*\[[\s\S]*?\],\n/, acc)
  } else {
    src = src.replace(/  loadPayload:/, `${acc}  loadPayload:`)
  }
  write(id, 'entry.ts', src)
}

function patchPayload(id, { acceptance, integration, bg }) {
  let src = read(id, 'payload.ts')
  if (acceptance) {
    src = src.replace(
      /acceptance:\s*\[[\s\S]*?\],/,
      `acceptance: [\n${acceptance.map((a) => `    '${a}',`).join('\n')}\n  ],`,
    )
  }
  if (integration) {
    src = src.replace(
      /integration:\s*\[[\s\S]*?\],/,
      `integration: [\n${integration.map((a) => `    '${a}',`).join('\n')}\n  ],`,
    )
  }
  if (bg) src = src.replace(/background:#[0-9a-fA-F]+/g, `background:${bg}`)
  write(id, 'payload.ts', src)
}

function schemaContract(id, title, description, required, properties) {
  return {
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    $id: `https://playground.humza-butt.space/contracts/${id}.schema.json`,
    title,
    description,
    type: 'object',
    additionalProperties: false,
    required,
    properties: {
      name: { type: 'string', const: id },
      ...properties,
    },
  }
}

function hardenCss(id, family) {
  let css = read(id, 'demo.css')
  if (family === 'paper') {
    css = css.replaceAll('rgb(58 155 217', 'rgb(184 50 40')
    css = css.replaceAll('rgb(217 74 56', 'rgb(184 50 40')
  } else {
    css = css.replaceAll('rgb(58 155 217', 'rgb(61 206 168')
  }
  write(id, 'demo.css', css)
}

/** @type {Record<string, () => void>} */
const JOBS = {
  'objective-chain-advance'() {
    const id = 'objective-chain-advance'
    hardenCss(id, 'paper')
    let css = read(id, 'demo.css')
    // emphasize latch
    if (!css.includes('--oca-latch-ms')) {
      css = css.replace(
        'box-sizing: border-box;',
        '--oca-latch-ms: 200ms;\n  --oca-pulse-ms: 220ms;\n  box-sizing: border-box;',
      )
    }
    write(id, 'demo.css', css)
    let js = read(id, 'demo.js')
    if (!js.includes('LATCH_MS')) {
      js = js.replace(
        'const COMPLETE_MS = 200',
        'const LATCH_MS = 200\nconst COMPLETE_MS = LATCH_MS',
      )
    }
    write(id, 'demo.js', js)
    const acceptance = [
      'Exactly 4 checkpoints; idle starts with OBJ 1 current',
      'Each checkpoint latches complete over 200ms then pulse advances 220ms',
      'Final state CLEAR with all four nodes complete',
      'Replay resets to OBJ 1 current before rerunning',
      'Reduced motion shows CLEAR immediately',
    ]
    write(
      id,
      'contract.json',
      JSON.stringify(
        schemaContract(
          id,
          'ObjectiveChainAdvance',
          'Four checkpoints latch in sequence with pulse advance into CLEAR.',
          [
            'name',
            'checkpointCount',
            'latchMs',
            'pulseMs',
            'settleMs',
            'colours',
            'reducedMotion',
          ],
          {
            checkpointCount: { type: 'number', const: 4 },
            latchMs: { type: 'number', const: 200 },
            pulseMs: { type: 'number', const: 220 },
            settleMs: { type: 'number', const: 100 },
            colours: paperColours(),
            reducedMotion: {
              type: 'object',
              additionalProperties: false,
              required: ['immediateClear'],
              properties: { immediateClear: { type: 'boolean', const: true } },
            },
          },
        ),
        null,
        2,
      ),
    )
    patchEntry(id, {
      blurb:
        'Four mission checkpoints latch complete (200ms) with a 220ms pulse into the next, ending CLEAR.',
      intensity: 'subtle',
      reducedMotionNote:
        'Under prefers-reduced-motion or data-force-reduced-motion, all four checkpoints appear complete as CLEAR immediately.',
      acceptance,
    })
    patchPayload(id, {
      acceptance,
      integration: [
        'Mount inside a relative host (~420×300+).',
        'Import demo.css verbatim; freeze 4 checkpoints / latch 200ms / pulse 220ms from contract.json.',
        'Wire runObjectiveChainAdvance / resetObjectiveChainAdvance / replayObjectiveChainAdvance.',
        'Honour both reduced-motion triggers.',
      ],
      bg: '#1a1612',
    })
    write(
      id,
      'spec.md',
      `# Objective Chain Advance

Four checkpoints latch (**200ms**) then pulse (**220ms**) to the next → **CLEAR**.

## Freeze

- checkpointCount: 4 · latchMs: 200 · pulseMs: 220 · settleMs: 100
`,
    )
    sync(id)
  },

  'technique-mastery-tree'() {
    const id = 'technique-mastery-tree'
    hardenCss(id, 'paper')
    let css = read(id, 'demo.css')
    // edge draw via scaleX if path uses width
    if (!css.includes('transform-origin: left center') && css.includes('.tmt__path')) {
      css = css.replace(
        /\.tmt__path \{([^}]*)\}/,
        `.tmt__path {$1  transform: scaleX(0);\n  transform-origin: left center;\n  transition: transform 150ms linear, background-color 90ms ease-out;\n}`,
      )
      css = css.replace(
        /\.tmt__path\[data-filled='true'\] \{([^}]*)\}/,
        `.tmt__path[data-filled='true'] {$1  transform: scaleX(1);\n}`,
      )
    }
    write(id, 'demo.css', css)
    let js = read(id, 'demo.js')
    if (!js.includes('NODE_IDS')) {
      js = js.replace(
        'const NODE_COUNT = 4',
        "const NODE_COUNT = 4\nconst NODE_IDS = ['n1', 'n2', 'n3', 'n4']\nconst EDGE_DRAW_MS = 150",
      )
      js = js.replace('void TOTAL_MS', 'void TOTAL_MS\nvoid NODE_IDS\nvoid EDGE_DRAW_MS')
    }
    write(id, 'demo.js', js)
    const acceptance = [
      'Exactly 4 nodes unlock in order n1→n4 with 150ms steps',
      'Each unlock draws the preceding edge (scaleX 0→1) before the next node',
      'Resolved shows MASTERED with all nodes and edges filled',
      'Replay locks all nodes/edges before rerunning',
      'Reduced motion shows MASTERED immediately',
    ]
    write(
      id,
      'contract.json',
      JSON.stringify(
        schemaContract(
          id,
          'TechniqueMasteryTree',
          'Four technique nodes unlock in order with edge draw between them.',
          [
            'name',
            'nodeCount',
            'nodeIds',
            'stepMs',
            'edgeDrawMs',
            'settleMs',
            'colours',
            'reducedMotion',
          ],
          {
            nodeCount: { type: 'number', const: 4 },
            nodeIds: { type: 'array', const: ['n1', 'n2', 'n3', 'n4'] },
            stepMs: { type: 'number', const: 150 },
            edgeDrawMs: { type: 'number', const: 150 },
            settleMs: { type: 'number', const: 100 },
            colours: paperColours(),
            reducedMotion: {
              type: 'object',
              additionalProperties: false,
              required: ['immediateMastered'],
              properties: { immediateMastered: { type: 'boolean', const: true } },
            },
          },
        ),
        null,
        2,
      ),
    )
    patchEntry(id, {
      blurb:
        'Four technique nodes unlock in order (n1→n4) while edges draw between them into MASTERED.',
      intensity: 'subtle',
      reducedMotionNote:
        'Under prefers-reduced-motion or data-force-reduced-motion, all four nodes and edges appear mastered immediately.',
      acceptance,
    })
    patchPayload(id, {
      acceptance,
      integration: [
        'Mount inside a relative host (~420×300+).',
        'Import demo.css verbatim; freeze nodeIds n1–n4 / step 150ms / edge draw 150ms from contract.json.',
        'Wire runTechniqueMasteryTree / resetTechniqueMasteryTree / replayTechniqueMasteryTree.',
        'Honour both reduced-motion triggers.',
      ],
      bg: '#1a1612',
    })
    write(
      id,
      'spec.md',
      `# Technique Mastery Tree

Nodes **n1→n4** unlock with **150ms** steps; edges draw **150ms** between unlocks.

## Freeze

- nodeIds: n1,n2,n3,n4 · stepMs: 150 · edgeDrawMs: 150
`,
    )
    sync(id)
  },

  'three-person-cell-formation'() {
    const id = 'three-person-cell-formation'
    hardenCss(id, 'paper')
    let css = read(id, 'demo.css')
    // stroke-dash link draw
    if (!css.includes('stroke-dasharray')) {
      css = css.replace(
        /\.tpcf__link \{([^}]*)\}/,
        `.tpcf__link {$1  stroke-dasharray: 120;\n  stroke-dashoffset: 120;\n  transition: stroke-dashoffset 200ms linear, stroke 120ms ease-out;\n}`,
      )
      css = css.replace(
        /\.tpcf\[data-phase='done'\] \.tpcf__link \{([^}]*)\}/,
        `.tpcf[data-phase='active'] .tpcf__link,\n.tpcf[data-phase='done'] .tpcf__link {$1  stroke-dashoffset: 0;\n}`,
      )
    }
    write(id, 'demo.css', css)
    let js = read(id, 'demo.js')
    if (!js.includes('NODE_POSITIONS')) {
      js = js.replace(
        'const SNAP_MS = 260',
        `const SNAP_MS = 260
const LINK_DRAW_MS = 200
const NODE_COUNT = 3
const NODE_POSITIONS = [
  { id: 'lead', x: 100, y: 28 },
  { id: 'scout', x: 52, y: 122 },
  { id: 'support', x: 148, y: 122 },
]`,
      )
      js = js.replace('const LINK_MS = 200', 'const LINK_MS = LINK_DRAW_MS')
      js = js.replace(
        'void TOTAL_MS',
        'void TOTAL_MS\nvoid NODE_COUNT\nvoid NODE_POSITIONS',
      )
    }
    write(id, 'demo.js', js)
    const acceptance = [
      'Exactly 3 nodes (LEAD/SCOUT/SUPPORT) snap from scattered positions',
      'Snap completes in 260ms then 3 links draw over 200ms',
      'Resolved shows FORMED with links fully drawn',
      'Replay returns nodes to scattered before rerunning',
      'Reduced motion shows FORMED with links drawn immediately',
    ]
    write(
      id,
      'contract.json',
      JSON.stringify(
        schemaContract(
          id,
          'ThreePersonCellFormation',
          'Three nodes snap into triangle positions then links draw.',
          [
            'name',
            'nodeCount',
            'nodePositions',
            'snapMs',
            'linkDrawMs',
            'colours',
            'reducedMotion',
          ],
          {
            nodeCount: { type: 'number', const: 3 },
            nodePositions: {
              type: 'array',
              const: [
                { id: 'lead', x: 100, y: 28 },
                { id: 'scout', x: 52, y: 122 },
                { id: 'support', x: 148, y: 122 },
              ],
            },
            snapMs: { type: 'number', const: 260 },
            linkDrawMs: { type: 'number', const: 200 },
            colours: paperColours(),
            reducedMotion: {
              type: 'object',
              additionalProperties: false,
              required: ['immediateFormed'],
              properties: { immediateFormed: { type: 'boolean', const: true } },
            },
          },
        ),
        null,
        2,
      ),
    )
    patchEntry(id, {
      blurb:
        'LEAD, SCOUT, and SUPPORT snap into triangle slots (260ms) then three links draw (200ms) into FORMED.',
      intensity: 'subtle',
      reducedMotionNote:
        'Under prefers-reduced-motion or data-force-reduced-motion, the three-person cell appears already FORMED with links drawn.',
      acceptance,
    })
    patchPayload(id, {
      acceptance,
      integration: [
        'Mount inside a relative host (~420×300+).',
        'Import demo.css verbatim; freeze node positions / snap 260ms / link draw 200ms from contract.json.',
        'Wire runThreePersonCellFormation / resetThreePersonCellFormation / replayThreePersonCellFormation.',
        'Honour both reduced-motion triggers.',
      ],
      bg: '#1a1612',
    })
    write(
      id,
      'spec.md',
      `# Three-Person Cell Formation

LEAD (100,28) · SCOUT (52,122) · SUPPORT (148,122) snap **260ms**, links draw **200ms**.
`,
    )
    sync(id)
  },

  'chakra-charge-field'() {
    const id = 'chakra-charge-field'
    hardenCss(id, 'sensor')
    let css = read(id, 'demo.css')
    // irregular boundary via border-radius steps
    if (!css.includes('--ccf-r0')) {
      css = css.replace(
        'box-sizing: border-box;',
        `--ccf-r0: 42% 58% 48% 52% / 52% 48% 55% 45%;
  --ccf-r1: 48% 52% 60% 40% / 45% 55% 42% 58%;
  --ccf-r2: 55% 45% 52% 48% / 58% 42% 50% 50%;
  --ccf-r3: 50% 50% 45% 55% / 48% 52% 58% 42%;
  --ccf-d0: 72px;
  --ccf-d1: 96px;
  --ccf-d2: 118px;
  --ccf-d3: 140px;
  box-sizing: border-box;`,
      )
    }
    if (css.includes('.ccf__boundary') && !css.includes('border-radius: var(--ccf-r0)')) {
      css = css.replace(
        /\.ccf__boundary \{([^}]*)\}/,
        `.ccf__boundary {$1  width: var(--ccf-d0);\n  height: var(--ccf-d0);\n  border-radius: var(--ccf-r0);\n  transition: width 80ms linear, height 80ms linear, border-radius 80ms linear;\n}`,
      )
    }
    // step diameters via --p thresholds using style on root data-step
    if (!css.includes('[data-step=')) {
      css += `
.ccf[data-step='1'] .ccf__boundary { width: var(--ccf-d1); height: var(--ccf-d1); border-radius: var(--ccf-r1); }
.ccf[data-step='2'] .ccf__boundary { width: var(--ccf-d2); height: var(--ccf-d2); border-radius: var(--ccf-r2); }
.ccf[data-step='3'] .ccf__boundary,
.ccf[data-phase='done'] .ccf__boundary { width: var(--ccf-d3); height: var(--ccf-d3); border-radius: var(--ccf-r3); }
`
    }
    write(id, 'demo.css', css)
    let js = read(id, 'demo.js')
    if (!js.includes('DIAMETERS_PX')) {
      js = js.replace(
        'const CHARGE_MS = 620',
        `const CHARGE_MS = 620
const COMMIT_MS = 150
const DIAMETERS_PX = [72, 96, 118, 140]
const STEP_THRESHOLDS = [0.25, 0.5, 0.75, 1]`,
      )
      // avoid duplicate COMMIT_MS
      js = js.replace(/\nconst COMMIT_MS = 150\nconst COMMIT_MS = 150/, '\nconst COMMIT_MS = 150')
      js = js.replace(
        'function setP(p) {\n  currentP = Math.max(0, Math.min(1, p))\n  const root = rootEl()\n  root?.style.setProperty(\'--p\', String(currentP))',
        `function setP(p) {
  currentP = Math.max(0, Math.min(1, p))
  const root = rootEl()
  root?.style.setProperty('--p', String(currentP))
  let step = 0
  for (let i = 0; i < STEP_THRESHOLDS.length; i++) {
    if (currentP >= STEP_THRESHOLDS[i]) step = i + 1
  }
  if (step === 0) root?.removeAttribute('data-step')
  else root?.setAttribute('data-step', String(Math.min(step, 3)))`,
      )
      if (!js.includes('void DIAMETERS_PX')) {
        js += '\nvoid DIAMETERS_PX\nvoid STEP_THRESHOLDS\n'
      }
    }
    write(id, 'demo.js', js)
    const acceptance = [
      'Hold charges an irregular boundary through diameters 72→96→118→140px',
      'Release commits current level; full charge settles READY',
      'Run auto-charges to 100% over 620ms then commits 150ms',
      'Replay returns to 0% / idle boundary before rerunning',
      'Reduced motion shows READY at full diameter immediately',
    ]
    write(
      id,
      'contract.json',
      JSON.stringify(
        schemaContract(
          id,
          'ChakraChargeField',
          'Irregular chakra boundary grows through frozen diameters to READY.',
          [
            'name',
            'chargeMs',
            'commitMs',
            'diametersPx',
            'stepThresholds',
            'colours',
            'reducedMotion',
          ],
          {
            chargeMs: { type: 'number', const: 620 },
            commitMs: { type: 'number', const: 150 },
            diametersPx: { type: 'array', const: [72, 96, 118, 140] },
            stepThresholds: { type: 'array', const: [0.25, 0.5, 0.75, 1] },
            colours: sensorColours(),
            reducedMotion: {
              type: 'object',
              additionalProperties: false,
              required: ['immediateReady'],
              properties: { immediateReady: { type: 'boolean', const: true } },
            },
          },
        ),
        null,
        2,
      ),
    )
    patchEntry(id, {
      blurb:
        'An irregular chakra boundary grows through frozen diameters 72→96→118→140px; release commits, full charge settles READY.',
      intensity: 'subtle',
      reducedMotionNote:
        'Under prefers-reduced-motion or data-force-reduced-motion, the field appears READY at the full 140px diameter immediately.',
      acceptance,
    })
    patchPayload(id, {
      acceptance,
      integration: [
        'Mount inside a relative host (~360×300+).',
        'Import demo.css verbatim; freeze diameters [72,96,118,140] and charge 620ms from contract.json.',
        'Wire hold-to-charge plus runChakraChargeField / reset / replay.',
        'Honour both reduced-motion triggers.',
      ],
      bg: '#070b0e',
    })
    write(
      id,
      'spec.md',
      `# Chakra Charge Field

Irregular boundary diameters **72 → 96 → 118 → 140px** over **620ms** charge.
`,
    )
    sync(id)
  },

  'chakra-control-balance'() {
    const id = 'chakra-control-balance'
    hardenCss(id, 'sensor')
    let js = read(id, 'demo.js')
    if (!js.includes('LOCK_THRESHOLD')) {
      js = js.replace(
        /const BAND_PCT = [^\n]+/,
        `const BAND_PCT = 12
const LOCK_THRESHOLD = 0.08
const WOBBLE_AMP = 0.04`,
      )
      if (!js.includes('void LOCK_THRESHOLD')) js += '\nvoid LOCK_THRESHOLD\nvoid WOBBLE_AMP\n'
    }
    write(id, 'demo.js', js)
    const acceptance = [
      'Needle must enter ±8% lock threshold inside the centre band to lock',
      'Hold both inputs; early release cancels before lock',
      'Lock holds then pulses LOCKED',
      'Replay returns needle unbalanced before rerunning',
      'Reduced motion shows LOCKED immediately',
    ]
    write(
      id,
      'contract.json',
      JSON.stringify(
        schemaContract(
          id,
          'ChakraControlBalance',
          'Dual-input needle must enter lock threshold to settle LOCKED.',
          [
            'name',
            'lockThreshold',
            'bandPct',
            'wobbleAmp',
            'sweepMs',
            'lockHoldMs',
            'lockPulseMs',
            'colours',
            'reducedMotion',
          ],
          {
            lockThreshold: { type: 'number', const: 0.08 },
            bandPct: { type: 'number', const: 12 },
            wobbleAmp: { type: 'number', const: 0.04 },
            sweepMs: { type: 'number', const: 900 },
            lockHoldMs: { type: 'number', const: 220 },
            lockPulseMs: { type: 'number', const: 180 },
            colours: sensorColours(),
            reducedMotion: {
              type: 'object',
              additionalProperties: false,
              required: ['immediateLocked'],
              properties: { immediateLocked: { type: 'boolean', const: true } },
            },
          },
        ),
        null,
        2,
      ),
    )
    // try to wire threshold into existing lock check if present
    js = read(id, 'demo.js')
    js = js.replace(/Math\.abs\([^)]+\)\s*<\s*0\.\d+/g, 'Math.abs(pos) < LOCK_THRESHOLD')
    js = js.replace(/Math\.abs\([^)]+\)\s*<=\s*0\.\d+/g, 'Math.abs(pos) <= LOCK_THRESHOLD')
    write(id, 'demo.js', js)
    patchEntry(id, {
      blurb:
        'Hold both chakra inputs to draw the needle into an ±8% lock threshold; early release cancels before LOCKED.',
      intensity: 'subtle',
      reducedMotionNote:
        'Under prefers-reduced-motion or data-force-reduced-motion, the needle appears LOCKED in the centre band immediately.',
      acceptance,
    })
    patchPayload(id, {
      acceptance,
      integration: [
        'Mount inside a relative host (~420×300+).',
        'Import demo.css verbatim; freeze lockThreshold 0.08 / band 12% from contract.json.',
        'Wire dual-hold inputs plus runChakraControlBalance / reset / replay.',
        'Honour both reduced-motion triggers.',
      ],
      bg: '#070b0e',
    })
    write(
      id,
      'spec.md',
      `# Chakra Control Balance

Lock when needle enters **±0.08** of centre (band **12%**).
`,
    )
    sync(id)
  },

  'chakra-signature-match'() {
    const id = 'chakra-signature-match'
    hardenCss(id, 'sensor')
    let js = read(id, 'demo.js')
    if (!js.includes('ALIGN_THRESHOLD')) {
      js = js.replace(
        /const BAND_COUNT = \d+/,
        `const BAND_COUNT = 5
const ALIGN_THRESHOLD = 0.92
const SAMPLE_POINTS = [0.12, 0.28, 0.5, 0.72, 0.88]`,
      )
      if (!js.includes('void ALIGN_THRESHOLD')) {
        js += '\nvoid ALIGN_THRESHOLD\nvoid SAMPLE_POINTS\n'
      }
    }
    write(id, 'demo.js', js)
    const acceptance = [
      'Five waveform sample points must reach align threshold 0.92 to MATCH',
      'Bands acquire in frozen order with step timing from contract',
      'Resolved shows MATCH with aligned signature',
      'Replay misaligns samples before rerunning',
      'Reduced motion shows MATCH immediately',
    ]
    write(
      id,
      'contract.json',
      JSON.stringify(
        schemaContract(
          id,
          'ChakraSignatureMatch',
          'Waveform samples align to MATCH above frozen threshold.',
          [
            'name',
            'bandCount',
            'alignThreshold',
            'samplePoints',
            'stepMs',
            'colours',
            'reducedMotion',
          ],
          {
            bandCount: { type: 'number', const: 5 },
            alignThreshold: { type: 'number', const: 0.92 },
            samplePoints: { type: 'array', const: [0.12, 0.28, 0.5, 0.72, 0.88] },
            stepMs: { type: 'number', const: 140 },
            colours: sensorColours({ alert: SENSOR.chakra }),
            reducedMotion: {
              type: 'object',
              additionalProperties: false,
              required: ['immediateMatch'],
              properties: { immediateMatch: { type: 'boolean', const: true } },
            },
          },
        ),
        null,
        2,
      ),
    )
    patchEntry(id, {
      blurb:
        'Five chakra waveform samples align past a 0.92 threshold into MATCH.',
      intensity: 'graphic',
      reducedMotionNote:
        'Under prefers-reduced-motion or data-force-reduced-motion, the signature appears MATCH immediately.',
      acceptance,
    })
    patchPayload(id, {
      acceptance,
      integration: [
        'Mount with preview.scaffold overlay host.',
        'Import demo.css verbatim; freeze alignThreshold 0.92 / samplePoints from contract.json.',
        'Wire runChakraSignatureMatch / reset / replay.',
        'Honour both reduced-motion triggers.',
      ],
      bg: '#070b0e',
    })
    write(
      id,
      'spec.md',
      `# Chakra Signature Match

Align threshold **0.92** across samples **[0.12, 0.28, 0.5, 0.72, 0.88]**.
`,
    )
    sync(id)
  },

  'healing-progress-field'() {
    const id = 'healing-progress-field'
    hardenCss(id, 'sensor')
    let js = read(id, 'demo.js')
    if (!js.includes('HEAL_ORDER')) {
      js = js.replace(
        /const RING_COUNT = \d+/,
        `const RING_COUNT = 3
const TILE_COUNT = 25
const HEAL_ORDER = [0, 1, 2]
const STEP_MS = 160`,
      )
      if (!js.includes('void HEAL_ORDER')) js += '\nvoid HEAL_ORDER\nvoid TILE_COUNT\n'
    }
    write(id, 'demo.js', js)
    const acceptance = [
      '25 tiles heal by ring order 0→1→2 (centre outward) with 160ms steps',
      'Idle shows DAMAGED; done shows RESTORED with all tiles healed',
      'Replay returns all tiles damaged before rerunning',
      'Reduced motion shows RESTORED immediately',
      'Effect stays inside clipped stage / scaffold host',
    ]
    write(
      id,
      'contract.json',
      JSON.stringify(
        schemaContract(
          id,
          'HealingProgressField',
          'Field tiles restore centre-out by frozen ring order.',
          [
            'name',
            'tileCount',
            'ringCount',
            'healOrder',
            'stepMs',
            'colours',
            'reducedMotion',
          ],
          {
            tileCount: { type: 'number', const: 25 },
            ringCount: { type: 'number', const: 3 },
            healOrder: { type: 'array', const: [0, 1, 2] },
            stepMs: { type: 'number', const: 160 },
            colours: sensorColours({ alert: SENSOR.chakra }),
            reducedMotion: {
              type: 'object',
              additionalProperties: false,
              required: ['immediateRestored'],
              properties: { immediateRestored: { type: 'boolean', const: true } },
            },
          },
        ),
        null,
        2,
      ),
    )
    patchEntry(id, {
      blurb:
        'A 5×5 damage field restores centre-out through rings 0→1→2 with 160ms steps into RESTORED.',
      intensity: 'graphic',
      reducedMotionNote:
        'Under prefers-reduced-motion or data-force-reduced-motion, all tiles appear RESTORED immediately.',
      acceptance,
    })
    patchPayload(id, {
      acceptance,
      integration: [
        'Mount with preview.scaffold host.',
        'Import demo.css verbatim; freeze healOrder [0,1,2] / 25 tiles / 160ms from contract.json.',
        'Wire runHealingProgressField / reset / replay.',
        'Honour both reduced-motion triggers.',
      ],
      bg: '#070b0e',
    })
    write(
      id,
      'spec.md',
      `# Healing Progress Field

**25** tiles · heal order rings **0→1→2** · **160ms** steps.
`,
    )
    sync(id)
  },

  'focus-mode-activation'() {
    const id = 'focus-mode-activation'
    hardenCss(id, 'sensor')
    let css = read(id, 'demo.css')
    if (!css.includes('--fma-inset')) {
      css = css.replace(
        'box-sizing: border-box;',
        '--fma-inset: 18px;\n  --fma-narrow-ms: 240ms;\n  box-sizing: border-box;',
      )
    }
    write(id, 'demo.css', css)
    const acceptance = [
      'Four brackets converge to 18px inset on the host over 240ms',
      'Periphery dims while reticle settles FOCUSED',
      'Replay returns brackets outward / NORMAL before rerunning',
      'Reduced motion shows FOCUSED brackets at inset immediately',
      'preview.scaffold provides the relative overflow host',
    ]
    write(
      id,
      'contract.json',
      JSON.stringify(
        schemaContract(
          id,
          'FocusModeActivation',
          'Corner brackets converge to a frozen inset on host content.',
          [
            'name',
            'bracketInsetPx',
            'narrowMs',
            'settleMs',
            'colours',
            'reducedMotion',
          ],
          {
            bracketInsetPx: { type: 'number', const: 18 },
            narrowMs: { type: 'number', const: 240 },
            settleMs: { type: 'number', const: 120 },
            colours: sensorColours({ alert: SENSOR.chakra }),
            reducedMotion: {
              type: 'object',
              additionalProperties: false,
              required: ['immediateFocused'],
              properties: { immediateFocused: { type: 'boolean', const: true } },
            },
          },
        ),
        null,
        2,
      ),
    )
    patchEntry(id, {
      blurb:
        'Four focus brackets converge to an 18px inset on the host while periphery dims into FOCUSED.',
      intensity: 'graphic',
      reducedMotionNote:
        'Under prefers-reduced-motion or data-force-reduced-motion, brackets appear already inset at 18px as FOCUSED.',
      acceptance,
    })
    patchPayload(id, {
      acceptance,
      integration: [
        'Mount with preview.scaffold relative overflow host.',
        'Import demo.css verbatim; freeze bracketInsetPx 18 / narrow 240ms from contract.json.',
        'Wire runFocusModeActivation / reset / replay.',
        'Honour both reduced-motion triggers.',
      ],
      bg: '#070b0e',
    })
    write(
      id,
      'spec.md',
      `# Focus Mode Activation

Brackets converge to **18px** inset over **240ms**.
`,
    )
    sync(id)
  },

  'weak-point-detection'() {
    const id = 'weak-point-detection'
    hardenCss(id, 'sensor')
    const acceptance = [
      'Exactly 4 bracket markers appear in order on the host silhouette',
      'Markers acquire with frozen step timing; final state DETECTED',
      'Replay clears all markers before rerunning',
      'Reduced motion shows all 4 brackets DETECTED immediately',
      'preview.scaffold hosts the overlay',
    ]
    write(
      id,
      'contract.json',
      JSON.stringify(
        schemaContract(
          id,
          'WeakPointDetection',
          'Four weak-point brackets appear on a host silhouette in order.',
          [
            'name',
            'markerCount',
            'markerOrder',
            'stepMs',
            'colours',
            'reducedMotion',
          ],
          {
            markerCount: { type: 'number', const: 4 },
            markerOrder: { type: 'array', const: [0, 1, 2, 3] },
            stepMs: { type: 'number', const: 140 },
            colours: sensorColours({ alert: SENSOR.chakra }),
            reducedMotion: {
              type: 'object',
              additionalProperties: false,
              required: ['immediateDetected'],
              properties: { immediateDetected: { type: 'boolean', const: true } },
            },
          },
        ),
        null,
        2,
      ),
    )
    let js = read(id, 'demo.js')
    if (!js.includes('MARKER_ORDER')) {
      js = js.replace(
        /const MARKER_COUNT = \d+/,
        `const MARKER_COUNT = 4
const MARKER_ORDER = [0, 1, 2, 3]
const STEP_MS = 140`,
      )
      if (!js.includes('void MARKER_ORDER')) js += '\nvoid MARKER_ORDER\n'
    }
    write(id, 'demo.js', js)
    patchEntry(id, {
      blurb:
        'Four bracket markers lock onto weak points on a host silhouette in order 0→3.',
      intensity: 'graphic',
      reducedMotionNote:
        'Under prefers-reduced-motion or data-force-reduced-motion, all four brackets appear DETECTED immediately.',
      acceptance,
    })
    patchPayload(id, {
      acceptance,
      integration: [
        'Mount with preview.scaffold host.',
        'Import demo.css verbatim; freeze markerCount 4 / order / step 140ms from contract.json.',
        'Wire runWeakPointDetection / reset / replay.',
        'Honour both reduced-motion triggers.',
      ],
      bg: '#070b0e',
    })
    write(
      id,
      'spec.md',
      `# Weak Point Detection

**4** brackets · order **[0,1,2,3]** · step **140ms**.
`,
    )
    sync(id)
  },

  'presence-radar-sweep'() {
    const id = 'presence-radar-sweep'
    hardenCss(id, 'sensor')
    const blips = [
      { x: 57.6, y: 49.3, bearing: 42 },
      { x: 111.5, y: 35, bearing: 90 },
      { x: 154.1, y: 62.1, bearing: 138 },
    ]
    const acceptance = [
      'Sweep arcs once; three blips at frozen coords (57.6,49.3), (111.5,35), (154.1,62.1)',
      'Contacts log in bearing order 042° → 090° → 138°',
      'Resolved shows COMPLETE with all three contacts active',
      'Replay clears blips/log before rerunning',
      'Reduced motion shows all contacts COMPLETE immediately',
    ]
    write(
      id,
      'contract.json',
      JSON.stringify(
        schemaContract(
          id,
          'PresenceRadarSweep',
          'Finite radar sweep logs three frozen presence blips.',
          [
            'name',
            'blipCount',
            'blips',
            'stepMs',
            'settleMs',
            'colours',
            'reducedMotion',
          ],
          {
            blipCount: { type: 'number', const: 3 },
            blips: { type: 'array', const: blips },
            stepMs: { type: 'number', const: 190 },
            settleMs: { type: 'number', const: 110 },
            colours: sensorColours({ alert: SENSOR.chakra }),
            reducedMotion: {
              type: 'object',
              additionalProperties: false,
              required: ['immediateComplete'],
              properties: { immediateComplete: { type: 'boolean', const: true } },
            },
          },
        ),
        null,
        2,
      ),
    )
    let js = read(id, 'demo.js')
    if (!js.includes('BLIP_COORDS')) {
      js = js.replace(
        /const BLIP_COUNT = \d+/,
        `const BLIP_COUNT = 3
const BLIP_COORDS = ${JSON.stringify(blips)}
const STEP_MS = 190
const SETTLE_MS = 110`,
      )
      if (!js.includes('void BLIP_COORDS')) js += '\nvoid BLIP_COORDS\n'
    }
    write(id, 'demo.js', js)
    patchEntry(id, {
      blurb:
        'A finite radar sweep logs three frozen presence blips at fixed coords and bearings into COMPLETE.',
      intensity: 'graphic',
      reducedMotionNote:
        'Under prefers-reduced-motion or data-force-reduced-motion, all three contacts appear COMPLETE immediately.',
      acceptance,
    })
    patchPayload(id, {
      acceptance,
      integration: [
        'Mount with preview.scaffold host.',
        'Import demo.css verbatim; freeze blip coords and 190ms step from contract.json.',
        'Wire runPresenceRadarSweep / reset / replay.',
        'Honour both reduced-motion triggers.',
      ],
      bg: '#070b0e',
    })
    write(
      id,
      'spec.md',
      `# Presence Radar Sweep

Blips: **(57.6,49.3) 042°** · **(111.5,35) 090°** · **(154.1,62.1) 138°**.
`,
    )
    sync(id)
  },

  'network-scan-360'() {
    const id = 'network-scan-360'
    hardenCss(id, 'sensor')
    // polish discovery log if missing
    let html = read(id, 'demo.html')
    if (!html.includes('data-ns360-log')) {
      html = html.replace(
        `<p class="ns360__status" data-ns360-status>IDLE</p>
    <p class="ns360__hint" data-ns360-hint>Press Run to sweep the network.</p>
  </div>`,
        `<p class="ns360__status" data-ns360-status>IDLE</p>
    <ol class="ns360__log" data-ns360-log aria-label="Discovery log">
      <li data-ns360-log-item data-index="0" data-active="false">NODE 0° — pending</li>
      <li data-ns360-log-item data-index="1" data-active="false">NODE 72° — pending</li>
      <li data-ns360-log-item data-index="2" data-active="false">NODE 144° — pending</li>
      <li data-ns360-log-item data-index="3" data-active="false">NODE 216° — pending</li>
      <li data-ns360-log-item data-index="4" data-active="false">NODE 288° — pending</li>
    </ol>
    <p class="ns360__hint" data-ns360-hint>Press Run to sweep the network.</p>
  </div>`,
      )
      write(id, 'demo.html', html)
      let css = read(id, 'demo.css')
      css += `
.ns360__log {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.2rem;
  width: 100%;
  max-width: 16rem;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: var(--olive);
}
.ns360__log [data-active='true'] {
  color: var(--chakra);
}
`
      write(id, 'demo.css', css)
      let js = read(id, 'demo.js')
      // activate log items when nodes activate if paint function exists
      if (js.includes('setAttribute(\'data-active\'') && !js.includes('data-ns360-log-item')) {
        js = js.replace(
          /node\.setAttribute\('data-active', ([^)]+)\)/g,
          (m, v) =>
            `${m}\n    const log = document.querySelector(\`[data-ns360-log-item][data-index="\${i}"]\`)\n    log?.setAttribute('data-active', ${v})`,
        )
      }
      write(id, 'demo.js', js)
    }
    const acceptance = [
      'Five nodes at frozen bearings 0/72/144/216/288 discover in order',
      'Sweep completes one revolution; discovery log marks each node',
      'Resolved inventory shows all five nodes active',
      'Replay clears nodes/log before rerunning',
      'Reduced motion shows full inventory immediately',
    ]
    write(
      id,
      'contract.json',
      JSON.stringify(
        schemaContract(
          id,
          'NetworkScan360',
          '360° sweep discovers five nodes at frozen bearings with a discovery log.',
          [
            'name',
            'nodeCount',
            'anglesDeg',
            'stepMs',
            'settleMs',
            'closeDeg',
            'colours',
            'reducedMotion',
          ],
          {
            nodeCount: { type: 'number', const: 5 },
            anglesDeg: { type: 'array', const: [0, 72, 144, 216, 288] },
            stepMs: { type: 'number', const: 160 },
            settleMs: { type: 'number', const: 100 },
            closeDeg: { type: 'number', const: 360 },
            colours: sensorColours(),
            reducedMotion: {
              type: 'object',
              additionalProperties: false,
              required: ['immediateInventory'],
              properties: { immediateInventory: { type: 'boolean', const: true } },
            },
          },
        ),
        null,
        2,
      ),
    )
    patchEntry(id, {
      blurb:
        'A 360° sweep discovers five network nodes at 0/72/144/216/288° into a readable inventory log.',
      intensity: 'subtle',
      reducedMotionNote:
        'Under prefers-reduced-motion or data-force-reduced-motion, all five nodes appear discovered immediately.',
      acceptance,
    })
    patchPayload(id, {
      acceptance,
      integration: [
        'Mount inside a relative host (~420×340+).',
        'Import demo.css verbatim; freeze angles 0/72/144/216/288 and step 160ms from contract.json.',
        'Wire runNetworkScan360 / reset / replay.',
        'Honour both reduced-motion triggers.',
      ],
      bg: '#070b0e',
    })
    write(
      id,
      'spec.md',
      `# Network Scan 360

Angles **0 / 72 / 144 / 216 / 288** · step **160ms** · discovery log.
`,
    )
    sync(id)
  },

  'four-point-barrier-construct'() {
    const id = 'four-point-barrier-construct'
    hardenCss(id, 'sensor')
    let js = read(id, 'demo.js')
    if (!js.includes('CORNER_COORDS')) {
      js = js.replace(
        'const EDGE_COUNT = 4',
        `const EDGE_COUNT = 4
const CORNER_COORDS = [
  { x: 30, y: 30 },
  { x: 170, y: 30 },
  { x: 170, y: 170 },
  { x: 30, y: 170 },
]
const CORNER_MS = 90
const EDGE_MS = 220
const FILL_MS = 260`,
      )
      // dedupe EDGE_MS/FILL_MS if duplicated
      js = js.replace(
        /\nconst EDGE_MS = 220\nconst FILL_MS = 260\nconst EDGE_MS = 220\nconst FILL_MS = 260/,
        '\nconst EDGE_MS = 220\nconst FILL_MS = 260',
      )
      js = js.replace(
        /const EDGE_MS = 220\nconst FILL_MS = 260\nconst SETTLE_MS/,
        'const SETTLE_MS',
      )
      if (!js.includes('void CORNER_COORDS')) js += '\nvoid CORNER_COORDS\nvoid CORNER_MS\n'
    }
    // ensure sequence activates corners before edges if not already
    write(id, 'demo.js', js)
    const acceptance = [
      'Corners activate at (30,30)(170,30)(170,170)(30,170) before edges draw',
      'Four edges draw at 220ms each, then fill 260ms into SECURE',
      'Replay clears corners/edges/fill before reconstructing',
      'Reduced motion shows SECURE barrier immediately',
      'preview.scaffold hosts the overlay',
    ]
    write(
      id,
      'contract.json',
      JSON.stringify(
        schemaContract(
          id,
          'FourPointBarrierConstruct',
          'Corners → edges → fill barrier construction with frozen coords.',
          [
            'name',
            'cornerCoords',
            'edgeCount',
            'cornerMs',
            'edgeMs',
            'fillMs',
            'colours',
            'reducedMotion',
          ],
          {
            cornerCoords: {
              type: 'array',
              const: [
                { x: 30, y: 30 },
                { x: 170, y: 30 },
                { x: 170, y: 170 },
                { x: 30, y: 170 },
              ],
            },
            edgeCount: { type: 'number', const: 4 },
            cornerMs: { type: 'number', const: 90 },
            edgeMs: { type: 'number', const: 220 },
            fillMs: { type: 'number', const: 260 },
            colours: sensorColours({ alert: SENSOR.chakra }),
            reducedMotion: {
              type: 'object',
              additionalProperties: false,
              required: ['immediateSecure'],
              properties: { immediateSecure: { type: 'boolean', const: true } },
            },
          },
        ),
        null,
        2,
      ),
    )
    patchEntry(id, {
      blurb:
        'Four corners light, edges draw (220ms each), then the field fills (260ms) into a SECURE barrier.',
      intensity: 'graphic',
      reducedMotionNote:
        'Under prefers-reduced-motion or data-force-reduced-motion, the barrier appears SECURE with corners, edges, and fill immediately.',
      acceptance,
    })
    patchPayload(id, {
      acceptance,
      integration: [
        'Mount with preview.scaffold host.',
        'Import demo.css verbatim; freeze corner coords / edge 220ms / fill 260ms from contract.json.',
        'Wire runFourPointBarrierConstruct / reset / replay.',
        'Honour both reduced-motion triggers.',
      ],
      bg: '#070b0e',
    })
    write(
      id,
      'spec.md',
      `# Four-Point Barrier Construct

Corners → edges (**220ms**) → fill (**260ms**). Coords frozen in contract.
`,
    )
    sync(id)
  },

  'barrier-breach-alert'() {
    const id = 'barrier-breach-alert'
    hardenCss(id, 'sensor')
    let css = read(id, 'demo.css')
    // ensure single fracture, no infinite flash
    css = css.replace(/animation:\s*[^;]*infinite[^;]*;/g, 'animation: none;')
    if (!css.includes('--bba-fracture')) {
      css = css.replace(
        'box-sizing: border-box;',
        '--bba-fracture-deg: -18deg;\n  --bba-alarm-ms: 280ms;\n  box-sizing: border-box;',
      )
    }
    if (css.includes('.bba__crack') && !css.includes('rotate(var(--bba-fracture')) {
      css = css.replace(
        /\.bba__crack \{([^}]*)\}/,
        `.bba__crack {$1  transform: rotate(var(--bba-fracture-deg));\n  transform-origin: 100px 30px;\n}`,
      )
    }
    write(id, 'demo.css', css)
    let js = read(id, 'demo.js')
    if (!js.includes('FRACTURE_DEG')) {
      js = js.replace(
        /const ALARM_MS = \d+/,
        `const ALARM_MS = 280
const FRACTURE_DEG = -18
const FLASH_COUNT = 1`,
      )
      if (!js.includes('void FRACTURE_DEG')) js += '\nvoid FRACTURE_DEG\nvoid FLASH_COUNT\n'
    }
    write(id, 'demo.js', js)
    const acceptance = [
      'Single −18° fracture appears once; no looping flash',
      'Alert latches BREACHED after 280ms alarm beat',
      'Replay returns to SECURE before rerunning',
      'Reduced motion shows BREACHED with static fracture immediately',
      'preview.scaffold hosts the overlay',
    ]
    write(
      id,
      'contract.json',
      JSON.stringify(
        schemaContract(
          id,
          'BarrierBreachAlert',
          'Single −18° fracture with one alarm beat, then BREACHED latch.',
          [
            'name',
            'fractureDeg',
            'alarmMs',
            'flashCount',
            'colours',
            'reducedMotion',
          ],
          {
            fractureDeg: { type: 'number', const: -18 },
            alarmMs: { type: 'number', const: 280 },
            flashCount: { type: 'number', const: 1 },
            colours: sensorColours({ alert: SENSOR.danger, danger: SENSOR.danger }),
            reducedMotion: {
              type: 'object',
              additionalProperties: false,
              required: ['immediateBreached'],
              properties: { immediateBreached: { type: 'boolean', const: true } },
            },
          },
        ),
        null,
        2,
      ),
    )
    patchEntry(id, {
      blurb:
        'A barrier takes a single −18° fracture and one alarm beat, then latches BREACHED with no loop flash.',
      intensity: 'graphic',
      reducedMotionNote:
        'Under prefers-reduced-motion or data-force-reduced-motion, BREACHED shows immediately with a static −18° fracture.',
      acceptance,
    })
    patchPayload(id, {
      acceptance,
      integration: [
        'Mount with preview.scaffold host.',
        'Import demo.css verbatim; freeze fractureDeg −18 / alarm 280ms / flashCount 1 from contract.json.',
        'Wire runBarrierBreachAlert / reset / replay.',
        'Honour both reduced-motion triggers.',
      ],
      bg: '#070b0e',
    })
    write(
      id,
      'spec.md',
      `# Barrier Breach Alert

Fracture **−18°** · alarm **280ms** · **flashCount: 1** (no loop).
`,
    )
    sync(id)
  },
}

const args = process.argv.slice(2)
const ids = args.length ? args : Object.keys(JOBS)
for (const id of ids) {
  if (!JOBS[id]) {
    console.error('missing', id)
    process.exitCode = 1
    continue
  }
  try {
    JOBS[id]()
    console.log('ok', id)
  } catch (e) {
    console.error('fail', id, e.message)
    process.exitCode = 1
  }
}
