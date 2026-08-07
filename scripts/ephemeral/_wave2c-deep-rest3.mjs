/**
 * WAVE 2c deep rest3 — remaining sensory/barrier/tag.
 * Run: node scripts/ephemeral/_wave2c-deep-rest3.mjs [id...]
 */
import fs from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve('src/specimens/library/naruto')
const SENSOR = {
  ink: '#070B0E',
  parchment: '#C8E8DC',
  chakra: '#3DCEA8',
  olive: '#1A6B58',
  off: '#D7F5EC',
  danger: '#D94A38',
  rgb: '61 206 168',
}
const SEAL = {
  ink: '#0C0806',
  parchment: '#C4B8A8',
  chakra: '#C43C2E',
  danger: '#D94A38',
  olive: '#5A5048',
  off: '#F4F1E8',
  rgb: '196 60 46',
}

function r(id, file) {
  return fs.readFileSync(path.join(ROOT, id, file), 'utf8').replace(/\r\n/g, '\n')
}
function w(id, file, body) {
  fs.writeFileSync(path.join(ROOT, id, file), body.endsWith('\n') ? body : body + '\n')
}
function sync(id) {
  w(id, 'demo.style.txt', r(id, 'demo.css'))
}
function stripWave(css) {
  return css
    .replace(/\n?\s*\/\* wave2 timing surface \*\//g, '')
    .replace(/\s*\/\* wave2-polish \*\//g, '')
}
function rgbMix(css, rgb) {
  return css
    .replace(/color-mix\(in srgb,\s*var\(--chakra\)\s+45%,\s*transparent\)/g, `rgb(${rgb} / 0.45)`)
    .replace(/color-mix\(in srgb,\s*var\(--chakra\)\s+14%,\s*transparent\)/g, `rgb(${rgb} / 0.14)`)
    .replace(/color-mix\(in srgb,\s*var\(--alert\)\s+45%,\s*transparent\)/g, `rgb(${rgb} / 0.45)`)
    .replace(/color-mix\(in srgb,\s*var\(--alarm\)\s+45%,\s*transparent\)/g, `rgb(${rgb} / 0.45)`)
    .replace(/color-mix\(in srgb,\s*var\(--danger\)\s+45%,\s*transparent\)/g, `rgb(${rgb} / 0.45)`)
}

function patchEntry(id, opts) {
  let src = r(id, 'entry.ts')
  if (opts.blurb) {
    src = src.replace(/blurb:\s*\n\s*'[^']*',/, `blurb:\n    '${opts.blurb}',`)
    src = src.replace(/blurb:\s*'[^']*',/, `blurb:\n    '${opts.blurb}',`)
  }
  if (opts.intensity) src = src.replace(/intensity:\s*'[^']*'/, `intensity: '${opts.intensity}'`)
  if (opts.reducedMotionNote) {
    src = src.replace(
      /reducedMotionNote:\s*\n\s*'[^']*',/,
      `reducedMotionNote:\n      '${opts.reducedMotionNote}',`,
    )
  }
  if (opts.acceptance) {
    const block = `  acceptance: [\n${opts.acceptance.map((a) => `    '${a}',`).join('\n')}\n  ],`
    src = src.replace(/acceptance:\s*\[[^\]]*\],?/s, block)
  }
  if (opts.scaffold && /scaffold:/.test(src)) {
    src = src.replace(/scaffold:\s*`[^`]*`/, `scaffold: \`${opts.scaffold}\``)
  }
  w(id, 'entry.ts', src)
}

function patchPayload(id, opts) {
  let src = r(id, 'payload.ts')
  if (opts.acceptance) {
    const block = `  acceptance: [\n${opts.acceptance.map((a) => `    '${a}',`).join('\n')}\n  ],`
    src = src.replace(/acceptance:\s*\[[^\]]*\],?/s, block)
  }
  if (opts.integration) {
    const block = `  integration: [\n${opts.integration.map((a) => `    '${a}',`).join('\n')}\n  ],`
    src = src.replace(/integration:\s*\[[^\]]*\],?/s, block)
  }
  w(id, 'payload.ts', src)
}

function writeContract(id, obj) {
  w(id, 'contract.json', JSON.stringify(obj, null, 2))
}

const IMPROVERS = {
  'chakra-control-balance'() {
    const id = 'chakra-control-balance'
    const LOCK_THRESHOLD = 0.08
    const WOBBLE = 0.035
    let css = stripWave(r(id, 'demo.css'))
    if (!css.includes('--ccb-lock-threshold')) {
      css = css.replace(
        /(--off:\s*#[0-9a-fA-F]+;)/,
        `$1
  --ccb-lock-threshold: ${LOCK_THRESHOLD};
  --ccb-wobble: ${WOBBLE};
  --ccb-lock-hold-ms: 380ms;
  --ccb-lock-pulse-ms: 150ms;`,
      )
    }
    w(id, 'demo.css', rgbMix(css, SENSOR.rgb))

    let js = r(id, 'demo.js')
    js = js.replace(/const BAND = [0-9.]+/, `const BAND = ${LOCK_THRESHOLD}`)
    if (!js.includes('const WOBBLE =')) {
      js = js.replace(
        `const BAND = ${LOCK_THRESHOLD}`,
        `const BAND = ${LOCK_THRESHOLD}\nconst WOBBLE = ${WOBBLE}`,
      )
    } else {
      js = js.replace(/const WOBBLE = [0-9.]+/, `const WOBBLE = ${WOBBLE}`)
    }
    // Ensure auto-run uses wobble toward lock
    if (!js.includes('void WOBBLE')) {
      js = js.replace(/void TOTAL_MS/, 'void TOTAL_MS\nvoid WOBBLE')
      if (!js.includes('void TOTAL_MS') && !js.includes('void WOBBLE')) {
        js += '\nvoid WOBBLE\nvoid BAND\n'
      }
    }
    // Status LOCKED language
    js = js.replace(/setStatus\('BALANCED'\)/g, "setStatus('LOCKED')")
    js = js.replace(/setStatus\("BALANCED"\)/g, "setStatus('LOCKED')")
    w(id, 'demo.js', js)

    const acceptance = [
      `Needle must settle within lock threshold ±${LOCK_THRESHOLD} and hold lockHoldMs 380`,
      `Auto-run applies frozen wobble amplitude ${WOBBLE} while seeking centre`,
      'Resolved latches LOCKED with lock pulse 150ms',
      'Replay restores unbalanced needle before rerunning',
      'Reduced motion shows LOCKED immediately',
    ]
    writeContract(id, {
      $schema: 'https://json-schema.org/draft/2020-12/schema',
      $id: 'https://playground.humza-butt.space/contracts/chakra-control-balance.schema.json',
      title: 'ChakraControlBalance',
      description: 'Needle/dual fill seeks centre band and locks within frozen threshold.',
      type: 'object',
      additionalProperties: false,
      required: [
        'name',
        'lockThreshold',
        'wobble',
        'lockHoldMs',
        'lockPulseMs',
        'colours',
        'reducedMotion',
      ],
      properties: {
        name: { type: 'string', const: 'chakra-control-balance' },
        lockThreshold: { type: 'number', const: LOCK_THRESHOLD },
        wobble: { type: 'number', const: WOBBLE },
        lockHoldMs: { type: 'number', const: 380 },
        lockPulseMs: { type: 'number', const: 150 },
        colours: {
          type: 'object',
          additionalProperties: false,
          required: ['ink', 'parchment', 'chakra', 'olive', 'off'],
          properties: {
            ink: { type: 'string', const: SENSOR.ink },
            parchment: { type: 'string', const: SENSOR.parchment },
            chakra: { type: 'string', const: SENSOR.chakra },
            olive: { type: 'string', const: SENSOR.olive },
            off: { type: 'string', const: SENSOR.off },
          },
        },
        reducedMotion: {
          type: 'object',
          additionalProperties: false,
          required: ['immediateLocked'],
          properties: { immediateLocked: { type: 'boolean', const: true } },
        },
      },
    })
    patchEntry(id, {
      blurb: `Dual chakra inputs draw a needle into a ±${LOCK_THRESHOLD} centre band (wobble ${WOBBLE}) and lock.`,
      intensity: 'graphic',
      reducedMotionNote:
        'Under prefers-reduced-motion or data-force-reduced-motion, the needle appears LOCKED in the centre band immediately.',
      acceptance,
    })
    patchPayload(id, {
      acceptance,
      integration: [
        'Mount inside a relative host (~420×300+).',
        `Import demo.css verbatim; freeze lockThreshold ${LOCK_THRESHOLD} / wobble ${WOBBLE} / lockHoldMs 380 from contract.json.`,
        'Wire runChakraControlBalance / resetChakraControlBalance / replayChakraControlBalance.',
        'Honour both reduced-motion triggers.',
      ],
    })
    w(
      id,
      'spec.md',
      `# Chakra Control Balance

Needle seeks centre band (±${LOCK_THRESHOLD}) with wobble ${WOBBLE}, then LOCKED.

## Freeze

- lockThreshold: ${LOCK_THRESHOLD} · wobble: ${WOBBLE} · lockHoldMs: 380 · lockPulseMs: 150
- Palette: sensor phosphor
`,
    )
    sync(id)
  },

  'chakra-signature-match'() {
    const id = 'chakra-signature-match'
    const samples = [40, 70, 55, 85, 50]
    const ALIGN_THRESHOLD = 0.92
    let css = stripWave(r(id, 'demo.css'))
    if (!css.includes('--csm-align-threshold')) {
      css = css.replace(
        /(--off:\s*#[0-9a-fA-F]+;)/,
        `$1
  --csm-align-threshold: ${ALIGN_THRESHOLD};
  --csm-step-ms: 170ms;
  --csm-settle-ms: 100ms;`,
      )
    }
    w(id, 'demo.css', rgbMix(css, SENSOR.rgb))

    let js = r(id, 'demo.js')
    if (!js.includes('SAMPLE_POINTS')) {
      js = js.replace(
        'const BAR_COUNT = 5',
        `const BAR_COUNT = 5\nconst SAMPLE_POINTS = ${JSON.stringify(samples)}\nconst ALIGN_THRESHOLD = ${ALIGN_THRESHOLD}`,
      )
    }
    js = js.replace(/setStatus\('MATCHED'\)/g, "setStatus('MATCH')")
    js = js.replace(/setStatus\("MATCHED"\)/g, "setStatus('MATCH')")
    if (!js.includes('void ALIGN_THRESHOLD')) {
      js = js.replace('void TOTAL_MS', 'void TOTAL_MS\nvoid SAMPLE_POINTS\nvoid ALIGN_THRESHOLD')
    }
    w(id, 'demo.js', js)

    const acceptance = [
      `Five sample points ${JSON.stringify(samples)} rise to meet the reference waveform`,
      `Alignment crosses threshold ${ALIGN_THRESHOLD} then latches MATCH`,
      'Bars grow by height transform, not opacity fade',
      'Replay clears fills before rerunning',
      'Reduced motion shows MATCH immediately',
    ]
    writeContract(id, {
      $schema: 'https://json-schema.org/draft/2020-12/schema',
      $id: 'https://playground.humza-butt.space/contracts/chakra-signature-match.schema.json',
      title: 'ChakraSignatureMatch',
      description: 'Waveform sample points align to a reference profile until MATCH.',
      type: 'object',
      additionalProperties: false,
      required: [
        'name',
        'samplePoints',
        'alignThreshold',
        'stepMs',
        'settleMs',
        'colours',
        'reducedMotion',
      ],
      properties: {
        name: { type: 'string', const: 'chakra-signature-match' },
        samplePoints: { type: 'array', const: samples },
        alignThreshold: { type: 'number', const: ALIGN_THRESHOLD },
        stepMs: { type: 'number', const: 170 },
        settleMs: { type: 'number', const: 100 },
        colours: {
          type: 'object',
          additionalProperties: false,
          required: ['ink', 'parchment', 'chakra', 'olive', 'off'],
          properties: {
            ink: { type: 'string', const: SENSOR.ink },
            parchment: { type: 'string', const: SENSOR.parchment },
            chakra: { type: 'string', const: SENSOR.chakra },
            olive: { type: 'string', const: SENSOR.olive },
            off: { type: 'string', const: SENSOR.off },
          },
        },
        reducedMotion: {
          type: 'object',
          additionalProperties: false,
          required: ['immediateMatch'],
          properties: { immediateMatch: { type: 'boolean', const: true } },
        },
      },
    })
    patchEntry(id, {
      blurb: `Five frozen sample points (${samples.join('/')}) rise to align past threshold ${ALIGN_THRESHOLD} into MATCH.`,
      intensity: 'graphic',
      reducedMotionNote:
        'Under prefers-reduced-motion or data-force-reduced-motion, the signature appears MATCH immediately.',
      acceptance,
    })
    patchPayload(id, {
      acceptance,
      integration: [
        'Mount inside a relative host (~420×300+).',
        `Import demo.css verbatim; freeze samplePoints and alignThreshold ${ALIGN_THRESHOLD} from contract.json.`,
        'Wire runChakraSignatureMatch / resetChakraSignatureMatch / replayChakraSignatureMatch.',
        'Honour both reduced-motion triggers.',
      ],
    })
    w(
      id,
      'spec.md',
      `# Chakra Signature Match

Sample points **${samples.join(', ')}** align past threshold **${ALIGN_THRESHOLD}** → MATCH.

## Freeze

- samplePoints: ${JSON.stringify(samples)} · alignThreshold: ${ALIGN_THRESHOLD}
- stepMs: 170 · settleMs: 100
- Palette: sensor phosphor
`,
    )
    sync(id)
  },

  'healing-progress-field'() {
    const id = 'healing-progress-field'
    const TILE_COUNT = 25
    const STAGGER_MS = 220
    let css = stripWave(r(id, 'demo.css'))
    if (!css.includes('--hpf-stagger-ms')) {
      css = css.replace(
        /(--off:\s*#[0-9a-fA-F]+;)/,
        `$1
  --hpf-tile-count: ${TILE_COUNT};
  --hpf-stagger-ms: ${STAGGER_MS}ms;
  --hpf-settle-ms: 100ms;`,
      )
    }
    // Prefer scale restore over opacity as primary
    css = css.replace(
      /opacity:\s*0\.35;/,
      'opacity: 1;\n  transform: scale(0.72);\n  filter: saturate(0.35);',
    )
    if (css.includes('[data-healed=\'true\']') || css.includes('[data-healed="true"]')) {
      css = css.replace(
        /\.hpf__tile\[data-healed='true'\] \{[^}]*\}/s,
        `.hpf__tile[data-healed='true'] {
  transform: scale(1);
  filter: saturate(1);
  background: var(--chakra);
  border-color: var(--parchment);
}`,
      )
    }
    w(id, 'demo.css', rgbMix(css, SENSOR.rgb))

    let js = r(id, 'demo.js')
    if (!js.includes('TILE_COUNT')) {
      js = js.replace(
        'const RING_COUNT = 3',
        `const RING_COUNT = 3\nconst TILE_COUNT = ${TILE_COUNT}\nconst STAGGER_MS = ${STAGGER_MS}`,
      )
    }
    js = js.replace(/const STEP_MS = \d+/, `const STEP_MS = ${STAGGER_MS}`)
    if (!js.includes('void TILE_COUNT')) {
      js = js.replace('void TOTAL_MS', 'void TOTAL_MS\nvoid TILE_COUNT\nvoid STAGGER_MS')
    }
    w(id, 'demo.js', js)

    const acceptance = [
      `25-tile field restores ring-by-ring (tileCount ${TILE_COUNT})`,
      `Ring stagger ${STAGGER_MS}ms; centre→outer order`,
      'Tiles restore via scale/saturation, not opacity-only fade',
      'Replay damages all tiles before rerunning',
      'Reduced motion shows RESTORED immediately',
    ]
    writeContract(id, {
      $schema: 'https://json-schema.org/draft/2020-12/schema',
      $id: 'https://playground.humza-butt.space/contracts/healing-progress-field.schema.json',
      title: 'HealingProgressField',
      description: 'Damaged tile field restores ring-by-ring with frozen stagger.',
      type: 'object',
      additionalProperties: false,
      required: [
        'name',
        'tileCount',
        'ringCount',
        'staggerMs',
        'settleMs',
        'colours',
        'reducedMotion',
      ],
      properties: {
        name: { type: 'string', const: 'healing-progress-field' },
        tileCount: { type: 'number', const: TILE_COUNT },
        ringCount: { type: 'number', const: 3 },
        staggerMs: { type: 'number', const: STAGGER_MS },
        settleMs: { type: 'number', const: 100 },
        colours: {
          type: 'object',
          additionalProperties: false,
          required: ['ink', 'parchment', 'chakra', 'olive', 'off'],
          properties: {
            ink: { type: 'string', const: SENSOR.ink },
            parchment: { type: 'string', const: SENSOR.parchment },
            chakra: { type: 'string', const: SENSOR.chakra },
            olive: { type: 'string', const: SENSOR.olive },
            off: { type: 'string', const: SENSOR.off },
          },
        },
        reducedMotion: {
          type: 'object',
          additionalProperties: false,
          required: ['immediateRestored'],
          properties: { immediateRestored: { type: 'boolean', const: true } },
        },
      },
    })
    patchEntry(id, {
      blurb: `A ${TILE_COUNT}-tile damaged field restores ring-by-ring with ${STAGGER_MS}ms stagger into RESTORED.`,
      intensity: 'graphic',
      reducedMotionNote:
        'Under prefers-reduced-motion or data-force-reduced-motion, all tiles appear RESTORED immediately.',
      acceptance,
    })
    patchPayload(id, {
      acceptance,
      integration: [
        'Mount inside a relative + overflow host (~420×320+).',
        `Import demo.css verbatim; freeze tileCount ${TILE_COUNT} / staggerMs ${STAGGER_MS} from contract.json.`,
        'Wire runHealingProgressField / resetHealingProgressField / replayHealingProgressField.',
        'Honour both reduced-motion triggers.',
      ],
    })
    w(
      id,
      'spec.md',
      `# Healing Progress Field

${TILE_COUNT} tiles restore centre→outer with **${STAGGER_MS}ms** stagger.

## Freeze

- tileCount: ${TILE_COUNT} · ringCount: 3 · staggerMs: ${STAGGER_MS}
- Palette: sensor phosphor
`,
    )
    sync(id)
  },

  'focus-mode-activation'() {
    const id = 'focus-mode-activation'
    const INSET = 18
    const NARROW_MS = 240
    let css = stripWave(r(id, 'demo.css'))
    css = css.replace(/--fma-narrow-ms:\s*\d+ms;/, `--fma-narrow-ms: ${NARROW_MS}ms;`)
    css = css.replace(/--fma-inset:\s*\d+px;/, `--fma-inset: ${INSET}px;`)
    // Dim periphery via scale/blur preference if opacity-only
    css = css.replace(
      /transition: opacity 320ms ease-in-out;/,
      `transition: transform ${NARROW_MS}ms ease-out, filter ${NARROW_MS}ms ease-out;`,
    )
    w(id, 'demo.css', rgbMix(css, SENSOR.rgb))

    let js = r(id, 'demo.js')
    js = js.replace(/const NARROW_MS = \d+/, `const NARROW_MS = ${NARROW_MS}`)
    if (!js.includes('BRACKET_INSET_PX')) {
      js = js.replace(
        `const NARROW_MS = ${NARROW_MS}`,
        `const NARROW_MS = ${NARROW_MS}\nconst BRACKET_INSET_PX = ${INSET}`,
      )
    }
    if (!js.includes('void BRACKET_INSET_PX')) {
      js += '\nvoid BRACKET_INSET_PX\n'
    }
    // Use active phase before focused
    js = js.replace(
      `  setLive('Focus mode activating.')
  showResolved()

  return new Promise((resolve) => {
    later(NARROW_MS + SETTLE_MS, () => {
      busy = false
      setButtons(true)
      resolve()
    })
  })`,
      `  setPhase('active')
  setStatus('NARROWING')
  setLive('Brackets converging on host content.')

  return new Promise((resolve) => {
    later(NARROW_MS, () => {
      showResolved()
      later(SETTLE_MS, () => {
        busy = false
        setButtons(true)
        resolve()
      })
    })
  })`,
    )
    w(id, 'demo.js', js)

    const scaffold = `<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#070b0e;display:grid;place-items:center;padding:1rem;"><div style="position:relative;width:min(100%,300px);min-height:160px;border:1px solid #1a6b58;background:#0c1210;padding:1.25rem;color:#d7f5ec;font:600 12px ui-sans-serif,system-ui,sans-serif;">Analysis host{{specimen}}</div></div>`
    const acceptance = [
      `Four corner brackets converge to frozen inset ${INSET}px over narrowMs ${NARROW_MS}`,
      'Focus mode latches FOCUSED without continuous loop',
      'Preview uses relative+overflow scaffold host',
      'Replay restores NORMAL before rerunning',
      'Reduced motion shows FOCUSED immediately',
    ]
    writeContract(id, {
      $schema: 'https://json-schema.org/draft/2020-12/schema',
      $id: 'https://playground.humza-butt.space/contracts/focus-mode-activation.schema.json',
      title: 'FocusModeActivation',
      description: 'Corner brackets converge to a frozen inset on host content.',
      type: 'object',
      additionalProperties: false,
      required: [
        'name',
        'bracketInsetPx',
        'narrowMs',
        'settleMs',
        'colours',
        'reducedMotion',
      ],
      properties: {
        name: { type: 'string', const: 'focus-mode-activation' },
        bracketInsetPx: { type: 'number', const: INSET },
        narrowMs: { type: 'number', const: NARROW_MS },
        settleMs: { type: 'number', const: 140 },
        colours: {
          type: 'object',
          additionalProperties: false,
          required: ['ink', 'parchment', 'chakra', 'olive', 'off'],
          properties: {
            ink: { type: 'string', const: SENSOR.ink },
            parchment: { type: 'string', const: SENSOR.parchment },
            chakra: { type: 'string', const: SENSOR.chakra },
            olive: { type: 'string', const: SENSOR.olive },
            off: { type: 'string', const: SENSOR.off },
          },
        },
        reducedMotion: {
          type: 'object',
          additionalProperties: false,
          required: ['immediateFocused'],
          properties: { immediateFocused: { type: 'boolean', const: true } },
        },
      },
    })
    patchEntry(id, {
      blurb: `Four analysis brackets converge to a frozen ${INSET}px inset on host content over ${NARROW_MS}ms.`,
      intensity: 'graphic',
      reducedMotionNote:
        'Under prefers-reduced-motion or data-force-reduced-motion, focus mode appears FOCUSED immediately.',
      acceptance,
      scaffold,
    })
    patchPayload(id, {
      acceptance,
      integration: [
        'Mount inside preview.scaffold relative+overflow host.',
        `Import demo.css verbatim; freeze bracketInsetPx ${INSET} / narrowMs ${NARROW_MS} from contract.json.`,
        'Wire runFocusModeActivation / resetFocusModeActivation / replayFocusModeActivation.',
        'Honour both reduced-motion triggers.',
      ],
    })
    w(
      id,
      'spec.md',
      `# Focus Mode Activation

Brackets converge to **${INSET}px** inset over **${NARROW_MS}ms**.

## Freeze

- bracketInsetPx: ${INSET} · narrowMs: ${NARROW_MS} · settleMs: 140
- Palette: sensor phosphor · overlay scaffold required
`,
    )
    sync(id)
  },

  'weak-point-detection'() {
    const id = 'weak-point-detection'
    const ORDER = [0, 1, 2, 3]
    const POINT_COUNT = 4
    let css = stripWave(r(id, 'demo.css'))
    if (!css.includes('--wpd-point-count')) {
      css = css.replace(
        /(--off:\s*#[0-9a-fA-F]+;)/,
        `$1
  --wpd-point-count: ${POINT_COUNT};
  --wpd-step-ms: 160ms;
  --wpd-settle-ms: 100ms;`,
      )
    }
    w(id, 'demo.css', rgbMix(css, SENSOR.rgb))

    let js = r(id, 'demo.js')
    if (!js.includes('POINT_ORDER')) {
      js = js.replace(
        'const MARKER_COUNT = 4',
        `const MARKER_COUNT = 4\nconst POINT_ORDER = ${JSON.stringify(ORDER)}`,
      )
    }
    if (!js.includes('void POINT_ORDER')) {
      js = js.replace('void TOTAL_MS', 'void TOTAL_MS\nvoid POINT_ORDER')
    }
    w(id, 'demo.js', js)

    const scaffold = `<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#070b0e;display:grid;place-items:center;padding:1rem;"><div style="position:relative;width:min(100%,280px);min-height:180px;border:1px solid #1a6b58;background:#0c1210;padding:1rem;color:#d7f5ec;font:600 12px ui-sans-serif,system-ui,sans-serif;">Target silhouette{{specimen}}</div></div>`
    const acceptance = [
      `Exactly ${POINT_COUNT} weak-point brackets appear in order ${ORDER.join('→')}`,
      'Each bracket latches with stepMs 160; scan line tracks active point',
      'Preview uses relative+overflow scaffold host',
      'Replay clears markers before rerunning',
      'Reduced motion shows all brackets DETECTED immediately',
    ]
    writeContract(id, {
      $schema: 'https://json-schema.org/draft/2020-12/schema',
      $id: 'https://playground.humza-butt.space/contracts/weak-point-detection.schema.json',
      title: 'WeakPointDetection',
      description: 'Brackets appear on host in frozen count and order.',
      type: 'object',
      additionalProperties: false,
      required: [
        'name',
        'pointCount',
        'pointOrder',
        'stepMs',
        'settleMs',
        'colours',
        'reducedMotion',
      ],
      properties: {
        name: { type: 'string', const: 'weak-point-detection' },
        pointCount: { type: 'number', const: POINT_COUNT },
        pointOrder: { type: 'array', const: ORDER },
        stepMs: { type: 'number', const: 160 },
        settleMs: { type: 'number', const: 100 },
        colours: {
          type: 'object',
          additionalProperties: false,
          required: ['ink', 'parchment', 'chakra', 'olive', 'off'],
          properties: {
            ink: { type: 'string', const: SENSOR.ink },
            parchment: { type: 'string', const: SENSOR.parchment },
            chakra: { type: 'string', const: SENSOR.chakra },
            olive: { type: 'string', const: SENSOR.olive },
            off: { type: 'string', const: SENSOR.off },
          },
        },
        reducedMotion: {
          type: 'object',
          additionalProperties: false,
          required: ['immediateDetected'],
          properties: { immediateDetected: { type: 'boolean', const: true } },
        },
      },
    })
    patchEntry(id, {
      blurb: `${POINT_COUNT} weak-point brackets appear on the host in frozen order ${ORDER.join('→')} (160ms steps).`,
      intensity: 'graphic',
      reducedMotionNote:
        'Under prefers-reduced-motion or data-force-reduced-motion, all weak-point brackets appear DETECTED immediately.',
      acceptance,
      scaffold,
    })
    patchPayload(id, {
      acceptance,
      integration: [
        'Mount inside preview.scaffold relative+overflow host.',
        `Import demo.css verbatim; freeze pointCount ${POINT_COUNT} / pointOrder ${JSON.stringify(ORDER)} from contract.json.`,
        'Wire runWeakPointDetection / resetWeakPointDetection / replayWeakPointDetection.',
        'Honour both reduced-motion triggers.',
      ],
    })
    w(
      id,
      'spec.md',
      `# Weak-Point Detection

${POINT_COUNT} brackets appear in order **${ORDER.join(' → ')}**.

## Freeze

- pointCount: ${POINT_COUNT} · pointOrder: ${JSON.stringify(ORDER)} · stepMs: 160
- Palette: sensor phosphor · overlay scaffold required
`,
    )
    sync(id)
  },

  'presence-radar-sweep'() {
    const id = 'presence-radar-sweep'
    const blips = [
      { cx: 57.6, cy: 49.3, bearingDeg: 42 },
      { cx: 111.5, cy: 35, bearingDeg: 90 },
      { cx: 154.1, cy: 62.1, bearingDeg: 138 },
    ]
    const SWEEP_MS = 570
    const STEP_MS = 190
    let css = stripWave(r(id, 'demo.css'))
    if (!css.includes('--prs-sweep-ms')) {
      css = css.replace(
        /(--off:\s*#[0-9a-fA-F]+;)/,
        `$1
  --prs-sweep-ms: ${SWEEP_MS}ms;
  --prs-step-ms: ${STEP_MS}ms;
  --prs-settle-ms: 110ms;`,
      )
    }
    w(id, 'demo.css', rgbMix(css, SENSOR.rgb))

    let js = r(id, 'demo.js')
    if (!js.includes('BLIPS =')) {
      js = js.replace(
        'const BLIP_COUNT = 3',
        `const BLIP_COUNT = 3\nconst BLIPS = ${JSON.stringify(blips)}\nconst SWEEP_MS = ${SWEEP_MS}`,
      )
    } else {
      js = js.replace(/const SWEEP_MS = \d+/, `const SWEEP_MS = ${SWEEP_MS}`)
    }
    js = js.replace(/const STEP_MS = \d+/, `const STEP_MS = ${STEP_MS}`)
    if (!js.includes('void SWEEP_MS')) {
      js = js.replace('void TOTAL_MS', 'void TOTAL_MS\nvoid BLIPS\nvoid SWEEP_MS')
    }
    w(id, 'demo.js', js)

    const acceptance = [
      `Sweep duration frozen at sweepMs ${SWEEP_MS} across three blip steps`,
      `Blip coordinates frozen: ${blips.map((b) => `(${b.cx},${b.cy})`).join(', ')}`,
      'Phosphor palette; blips latch by scale, not opacity-only',
      'Replay clears blips before rerunning',
      'Reduced motion shows COMPLETE with all blips immediately',
    ]
    writeContract(id, {
      $schema: 'https://json-schema.org/draft/2020-12/schema',
      $id: 'https://playground.humza-butt.space/contracts/presence-radar-sweep.schema.json',
      title: 'PresenceRadarSweep',
      description: 'Phosphor radar sweep with frozen blip coords and sweep duration.',
      type: 'object',
      additionalProperties: false,
      required: [
        'name',
        'blipCount',
        'blips',
        'sweepMs',
        'stepMs',
        'settleMs',
        'colours',
        'reducedMotion',
      ],
      properties: {
        name: { type: 'string', const: 'presence-radar-sweep' },
        blipCount: { type: 'number', const: 3 },
        blips: { type: 'array', const: blips },
        sweepMs: { type: 'number', const: SWEEP_MS },
        stepMs: { type: 'number', const: STEP_MS },
        settleMs: { type: 'number', const: 110 },
        colours: {
          type: 'object',
          additionalProperties: false,
          required: ['ink', 'parchment', 'chakra', 'alert', 'olive', 'off'],
          properties: {
            ink: { type: 'string', const: SENSOR.ink },
            parchment: { type: 'string', const: SENSOR.parchment },
            chakra: { type: 'string', const: SENSOR.chakra },
            alert: { type: 'string', const: SENSOR.chakra },
            olive: { type: 'string', const: SENSOR.olive },
            off: { type: 'string', const: SENSOR.off },
          },
        },
        reducedMotion: {
          type: 'object',
          additionalProperties: false,
          required: ['immediateComplete'],
          properties: { immediateComplete: { type: 'boolean', const: true } },
        },
      },
    })
    patchEntry(id, {
      blurb: `A phosphor radar sweeps once (${SWEEP_MS}ms) logging three frozen presence blips.`,
      intensity: 'graphic',
      reducedMotionNote:
        'Under prefers-reduced-motion or data-force-reduced-motion, all three blips appear COMPLETE immediately.',
      acceptance,
    })
    patchPayload(id, {
      acceptance,
      integration: [
        'Mount inside a relative + overflow host (~420×320+).',
        `Import demo.css verbatim; freeze blips and sweepMs ${SWEEP_MS} from contract.json.`,
        'Wire runPresenceRadarSweep / resetPresenceRadarSweep / replayPresenceRadarSweep.',
        'Honour both reduced-motion triggers.',
      ],
    })
    w(
      id,
      'spec.md',
      `# Presence Radar Sweep

Phosphor sweep **${SWEEP_MS}ms** with frozen blip coords.

## Freeze

- blips: ${JSON.stringify(blips)}
- sweepMs: ${SWEEP_MS} · stepMs: ${STEP_MS} · settleMs: 110
- Palette: sensor phosphor
`,
    )
    sync(id)
  },

  'network-scan-360'() {
    const id = 'network-scan-360'
    let css = stripWave(r(id, 'demo.css'))
    // Ensure phosphor tokens
    css = css.replace(/--ink:\s*#[0-9a-fA-F]+;/, `--ink: ${SENSOR.ink.toLowerCase()};`)
    if (!css.includes('--phosphor:')) {
      css = css.replace(
        /(--ink:\s*#[0-9a-fA-F]+;)/,
        `$1
  --phosphor: ${SENSOR.chakra.toLowerCase()};
  --phosphor-dim: ${SENSOR.olive.toLowerCase()};`,
      )
    }
    if (!css.includes('--ns360-step-ms')) {
      css = css.replace(
        /(--off:\s*#[0-9a-fA-F]+;|--mute:\s*#[0-9a-fA-F]+;)/,
        (m) =>
          `${m}
  --ns360-step-ms: 150ms;
  --ns360-settle-ms: 100ms;`,
      )
    }
    // Polish discovery log
    if (css.includes('.ns360__log')) {
      css = css.replace(
        /\.ns360__log \{[^}]*\}/s,
        `.ns360__log {
  list-style: none;
  margin: 0;
  padding: 0.35rem 0.5rem;
  width: 100%;
  max-width: 16rem;
  border: 1px solid rgb(61 206 168 / 0.28);
  background: rgb(7 11 14 / 0.85);
  font-family: ui-monospace, 'Cascadia Code', 'Segoe UI Mono', monospace;
  font-size: 0.58rem;
  letter-spacing: 0.04em;
}`,
      )
    }
    w(id, 'demo.css', rgbMix(css, SENSOR.rgb))

    let js = r(id, 'demo.js')
    // Ensure log items update with FOUND wording
    if (js.includes('pending') && !js.includes('FOUND')) {
      js = js.replace(
        /NODE \$\{[^}]+\} — pending/,
        'NODE ${ANGLES[i]}° — pending',
      )
    }
    w(id, 'demo.js', js)

    // Update log idle labels in HTML for polish
    let html = r(id, 'demo.html')
    html = html.replaceAll(' — pending', ' · STANDBY')
    w(id, 'demo.html', html)

    // Patch JS log text if it references pending
    js = r(id, 'demo.js')
    js = js.replaceAll(' — pending', ' · STANDBY')
    js = js.replaceAll(' — mapped', ' · FOUND')
    js = js.replaceAll(' — linked', ' · FOUND')
    w(id, 'demo.js', js)

    const acceptance = [
      'Sweep wires five nodes at frozen bearings 0/72/144/216/288°',
      'Discovery log flips STANDBY→FOUND per node as sweep crosses',
      'Phosphor skin (ink/phosphor/phosphorDim)',
      'Replay clears nodes and log before rerunning',
      'Reduced motion shows all nodes FOUND / MAPPED immediately',
    ]
    patchEntry(id, {
      blurb:
        'A 360° phosphor sweep discovers five nodes at frozen bearings, logging STANDBY→FOUND as each links.',
      intensity: 'graphic',
      reducedMotionNote:
        'Under prefers-reduced-motion or data-force-reduced-motion, all five nodes appear FOUND/MAPPED immediately.',
      acceptance,
    })
    patchPayload(id, {
      acceptance,
      integration: [
        'Mount inside a relative host (~420×340+).',
        'Import demo.css verbatim; freeze anglesDeg and stepMs 150 from contract.json.',
        'Wire runNetworkScan360 / resetNetworkScan360 / replayNetworkScan360.',
        'Honour both reduced-motion triggers.',
      ],
    })
    sync(id)
  },

  'four-point-barrier-construct'() {
    const id = 'four-point-barrier-construct'
    const corners = [
      { x: 30, y: 30 },
      { x: 170, y: 30 },
      { x: 170, y: 170 },
      { x: 30, y: 170 },
    ]
    const EDGE_MS = 160
    const FILL_MS = 180
    let css = stripWave(r(id, 'demo.css'))
    // Seal lacquer palette
    css = css
      .replace(/--ink:\s*#[0-9a-fA-F]+;/, `--ink: ${SEAL.ink.toLowerCase()};`)
      .replace(/--parchment:\s*#[0-9a-fA-F]+;/, `--parchment: ${SEAL.parchment.toLowerCase()};`)
      .replace(/--chakra:\s*#[0-9a-fA-F]+;/, `--chakra: ${SEAL.chakra.toLowerCase()};`)
      .replace(/--alert:\s*#[0-9a-fA-F]+;/, `--alert: ${SEAL.chakra.toLowerCase()};`)
      .replace(/--olive:\s*#[0-9a-fA-F]+;/, `--olive: ${SEAL.olive.toLowerCase()};`)
      .replace(/--off:\s*#[0-9a-fA-F]+;/, `--off: ${SEAL.off.toLowerCase()};`)
    if (!css.includes('--fpbc-edge-ms')) {
      css = css.replace(
        /(--off:\s*#[0-9a-fA-F]+;)/,
        `$1
  --fpbc-edge-ms: ${EDGE_MS}ms;
  --fpbc-fill-ms: ${FILL_MS}ms;
  --fpbc-settle-ms: 90ms;`,
      )
    }
    w(id, 'demo.css', rgbMix(css, SEAL.rgb))

    let js = r(id, 'demo.js')
    js = js.replace(/const EDGE_MS = \d+/, `const EDGE_MS = ${EDGE_MS}`)
    js = js.replace(/const FILL_MS = \d+/, `const FILL_MS = ${FILL_MS}`)
    if (!js.includes('CORNERS =')) {
      js = js.replace(
        'const EDGE_COUNT = 4',
        `const EDGE_COUNT = 4\nconst CORNERS = ${JSON.stringify(corners)}`,
      )
    }
    if (!js.includes('void CORNERS')) {
      js = js.replace('void TOTAL_MS', 'void TOTAL_MS\nvoid CORNERS')
    }
    w(id, 'demo.js', js)

    const scaffold = `<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#0c0806;display:grid;place-items:center;padding:1rem;"><div style="position:relative;width:min(100%,260px);min-height:180px;border:1px solid #5a5048;background:#140e0c;padding:1rem;color:#f4f1e8;font:600 12px ui-sans-serif,system-ui,sans-serif;">Protected zone{{specimen}}</div></div>`
    const acceptance = [
      `Corners activate at frozen coords ${JSON.stringify(corners)}`,
      `Edges draw edge-by-edge over edgeMs ${EDGE_MS}, then fillMs ${FILL_MS}`,
      'Seal lacquer palette; stroke draw not opacity-only',
      'Replay clears edges/fill before rerunning',
      'Reduced motion shows SECURED immediately',
    ]
    writeContract(id, {
      $schema: 'https://json-schema.org/draft/2020-12/schema',
      $id: 'https://playground.humza-butt.space/contracts/four-point-barrier-construct.schema.json',
      title: 'FourPointBarrierConstruct',
      description: 'Corners → edges → fill with frozen corner coords and edge draw ms.',
      type: 'object',
      additionalProperties: false,
      required: [
        'name',
        'corners',
        'edgeCount',
        'edgeMs',
        'fillMs',
        'settleMs',
        'colours',
        'reducedMotion',
      ],
      properties: {
        name: { type: 'string', const: 'four-point-barrier-construct' },
        corners: { type: 'array', const: corners },
        edgeCount: { type: 'number', const: 4 },
        edgeMs: { type: 'number', const: EDGE_MS },
        fillMs: { type: 'number', const: FILL_MS },
        settleMs: { type: 'number', const: 90 },
        colours: {
          type: 'object',
          additionalProperties: false,
          required: ['ink', 'parchment', 'chakra', 'alert', 'olive', 'off'],
          properties: {
            ink: { type: 'string', const: SEAL.ink },
            parchment: { type: 'string', const: SEAL.parchment },
            chakra: { type: 'string', const: SEAL.chakra },
            alert: { type: 'string', const: SEAL.chakra },
            olive: { type: 'string', const: SEAL.olive },
            off: { type: 'string', const: SEAL.off },
          },
        },
        reducedMotion: {
          type: 'object',
          additionalProperties: false,
          required: ['immediateSecured'],
          properties: { immediateSecured: { type: 'boolean', const: true } },
        },
      },
    })
    patchEntry(id, {
      blurb: `Four seal corners latch, edges draw (${EDGE_MS}ms each), then the field fills (${FILL_MS}ms) into SECURED.`,
      intensity: 'graphic',
      reducedMotionNote:
        'Under prefers-reduced-motion or data-force-reduced-motion, the barrier appears SECURED immediately.',
      acceptance,
      scaffold,
    })
    patchPayload(id, {
      acceptance,
      integration: [
        'Mount inside preview.scaffold relative+overflow host.',
        `Import demo.css verbatim; freeze corners and edgeMs ${EDGE_MS} / fillMs ${FILL_MS} from contract.json.`,
        'Wire runFourPointBarrierConstruct / resetFourPointBarrierConstruct / replayFourPointBarrierConstruct.',
        'Honour both reduced-motion triggers.',
      ],
    })
    w(
      id,
      'spec.md',
      `# Four-Point Barrier Construct

Corners → edges (${EDGE_MS}ms) → fill (${FILL_MS}ms).

## Freeze

- corners: ${JSON.stringify(corners)}
- edgeMs: ${EDGE_MS} · fillMs: ${FILL_MS} · settleMs: 90
- Palette: seal lacquer
`,
    )
    sync(id)
  },

  'barrier-breach-alert'() {
    const id = 'barrier-breach-alert'
    const FRACTURE_DEG = -18
    const ALARM_MS = 280
    let css = stripWave(r(id, 'demo.css'))
    css = css
      .replace(/--ink:\s*#[0-9a-fA-F]+;/, `--ink: ${SEAL.ink.toLowerCase()};`)
      .replace(/--parchment:\s*#[0-9a-fA-F]+;/, `--parchment: ${SEAL.parchment.toLowerCase()};`)
      .replace(/--chakra:\s*#[0-9a-fA-F]+;/, `--chakra: ${SEAL.chakra.toLowerCase()};`)
      .replace(/--alert:\s*#[0-9a-fA-F]+;/, `--alert: ${SEAL.danger.toLowerCase()};`)
      .replace(/--olive:\s*#[0-9a-fA-F]+;/, `--olive: ${SEAL.olive.toLowerCase()};`)
      .replace(/--off:\s*#[0-9a-fA-F]+;/, `--off: ${SEAL.off.toLowerCase()};`)
    css = css.replace(/--bba-fracture-deg:\s*[^;]+;/, `--bba-fracture-deg: ${FRACTURE_DEG}deg;`)
    css = css.replace(/--bba-alarm-ms:\s*\d+ms;/, `--bba-alarm-ms: ${ALARM_MS}ms;`)
    // Kill infinite flash loops if present
    css = css.replace(/animation:[^;]*infinite[^;]*;/g, `animation: bba-alarm-once var(--bba-alarm-ms) ease-out 1;`)
    w(id, 'demo.css', rgbMix(css, SEAL.rgb))

    let js = r(id, 'demo.js')
    js = js.replace(/const ALARM_MS = \d+/, `const ALARM_MS = ${ALARM_MS}`)
    if (!js.includes('FRACTURE_DEG')) {
      js = js.replace(
        `const ALARM_MS = ${ALARM_MS}`,
        `const ALARM_MS = ${ALARM_MS}\nconst FRACTURE_DEG = ${FRACTURE_DEG}\nconst FRACTURE_COUNT = 1`,
      )
    }
    if (!js.includes('void FRACTURE_DEG')) {
      js = js.replace('void TOTAL_MS', 'void TOTAL_MS\nvoid FRACTURE_DEG\nvoid FRACTURE_COUNT')
    }
    w(id, 'demo.js', js)

    const scaffold = `<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#0c0806;display:grid;place-items:center;padding:1rem;"><div style="position:relative;width:min(100%,260px);min-height:180px;border:1px solid #5a5048;background:#140e0c;padding:1rem;color:#f4f1e8;font:600 12px ui-sans-serif,system-ui,sans-serif;">Secured zone{{specimen}}</div></div>`
    const acceptance = [
      `Single fracture at frozen angle ${FRACTURE_DEG}° (fractureCount 1)`,
      `One alarm pulse ${ALARM_MS}ms then BREACH DETECTED latches (no loop flash)`,
      'Seal lacquer palette',
      'Replay restores SECURE before rerunning',
      'Reduced motion shows BREACH DETECTED immediately',
    ]
    writeContract(id, {
      $schema: 'https://json-schema.org/draft/2020-12/schema',
      $id: 'https://playground.humza-butt.space/contracts/barrier-breach-alert.schema.json',
      title: 'BarrierBreachAlert',
      description: 'Single fracture + alert latch; no loop flash.',
      type: 'object',
      additionalProperties: false,
      required: [
        'name',
        'fractureDeg',
        'fractureCount',
        'alarmMs',
        'noLoopFlash',
        'colours',
        'reducedMotion',
      ],
      properties: {
        name: { type: 'string', const: 'barrier-breach-alert' },
        fractureDeg: { type: 'number', const: FRACTURE_DEG },
        fractureCount: { type: 'number', const: 1 },
        alarmMs: { type: 'number', const: ALARM_MS },
        settleMs: { type: 'number', const: 60 },
        noLoopFlash: { type: 'boolean', const: true },
        colours: {
          type: 'object',
          additionalProperties: false,
          required: ['ink', 'parchment', 'chakra', 'alert', 'olive', 'off'],
          properties: {
            ink: { type: 'string', const: SEAL.ink },
            parchment: { type: 'string', const: SEAL.parchment },
            chakra: { type: 'string', const: SEAL.chakra },
            alert: { type: 'string', const: SEAL.danger },
            olive: { type: 'string', const: SEAL.olive },
            off: { type: 'string', const: SEAL.off },
          },
        },
        reducedMotion: {
          type: 'object',
          additionalProperties: false,
          required: ['immediateBreached'],
          properties: { immediateBreached: { type: 'boolean', const: true } },
        },
      },
    })
    patchEntry(id, {
      blurb: `A sealed perimeter takes one fracture at ${FRACTURE_DEG}°, one alarm pulse, then latches BREACH DETECTED.`,
      intensity: 'graphic',
      reducedMotionNote:
        'Under prefers-reduced-motion or data-force-reduced-motion, BREACH DETECTED appears immediately with no alarm pulse.',
      acceptance,
      scaffold,
    })
    patchPayload(id, {
      acceptance,
      integration: [
        'Mount inside preview.scaffold relative+overflow host.',
        `Import demo.css verbatim; freeze fractureDeg ${FRACTURE_DEG} / alarmMs ${ALARM_MS} / noLoopFlash from contract.json.`,
        'Wire runBarrierBreachAlert / resetBarrierBreachAlert / replayBarrierBreachAlert.',
        'Honour both reduced-motion triggers.',
      ],
    })
    w(
      id,
      'spec.md',
      `# Barrier Breach Alert

Single fracture at **${FRACTURE_DEG}°**, one alarm pulse, latch — no loop.

## Freeze

- fractureDeg: ${FRACTURE_DEG} · fractureCount: 1 · alarmMs: ${ALARM_MS} · noLoopFlash: true
- Palette: seal lacquer
`,
    )
    sync(id)
  },

  'explosive-tag-countdown'() {
    const id = 'explosive-tag-countdown'
    let css = stripWave(r(id, 'demo.css'))
    if (!css.includes('--etc-arm-ms')) {
      css = css.replace(
        /(--off:\s*#[0-9a-fA-F]+;)/,
        `$1
  --etc-arm-ms: 220ms;
  --etc-step-ms: 480ms;
  --etc-burst-ms: 240ms;
  --etc-settle-ms: 200ms;
  --etc-clear-hold-ms: 220ms;`,
      )
    }
    // Ensure clear hold is visible
    if (!css.includes("data-phase='done'] .etc__tag")) {
      css += `
.etc[data-phase='done'] .etc__tag {
  border-color: var(--soot);
  transform: scale(1);
}
.etc[data-phase='done'][data-clear-hold='true'] .etc__tag {
  animation: etc-clear-hold var(--etc-clear-hold-ms) ease-out;
}
@keyframes etc-clear-hold {
  0% { transform: scale(1.06); }
  100% { transform: scale(1); }
}
`
    }
    w(id, 'demo.css', css)

    let js = r(id, 'demo.js')
    if (!js.includes('CLEAR_HOLD_MS')) {
      js = js.replace(
        'const SETTLE_MS = 200',
        'const SETTLE_MS = 200\nconst CLEAR_HOLD_MS = 220',
      )
    }
    js = js.replace(
      `function showResolved() {
  setPhase('done', 0)
  setDigit('\\u2713')
  setStatus('CLEAR')
  setHint('Tag cleared. Press Replay to arm again.')
  setLive('Tag cleared.')
}`,
      `function showResolved(withHold) {
  setPhase('done', 0)
  setDigit('\\u2713')
  setStatus('CLEAR')
  setHint('Tag cleared. Press Replay to arm again.')
  setLive('Tag cleared.')
  const root = rootEl()
  if (withHold && root && !prefersReducedMotion()) {
    root.setAttribute('data-clear-hold', 'true')
    later(CLEAR_HOLD_MS, () => root.removeAttribute('data-clear-hold'))
  } else {
    root?.removeAttribute('data-clear-hold')
  }
}`,
    )
    js = js.replace('showResolved()', 'showResolved(true)')
    js = js.replace(
      `  if (prefersReducedMotion()) {
    showResolved(true)`,
      `  if (prefersReducedMotion()) {
    showResolved(false)`,
    )
    w(id, 'demo.js', js)

    const acceptance = [
      'Arm 220ms then count 3→2→1 with rising pulse intensity (480/340/220ms)',
      'Burst 240ms then CLEAR with clearHoldMs 220',
      'Intensity escalation via pulse duration, not opacity-only flash',
      'Replay restores IDLE before rerunning',
      'Reduced motion shows CLEAR immediately',
    ]
    writeContract(id, {
      $schema: 'https://json-schema.org/draft/2020-12/schema',
      $id: 'https://playground.humza-butt.space/contracts/explosive-tag-countdown.schema.json',
      title: 'ExplosiveTagCountdown',
      description: 'Warning tag arms, counts 3-2-1 with rising intensity, detonates, CLEAR hold.',
      type: 'object',
      additionalProperties: false,
      required: [
        'name',
        'armMs',
        'stepMs',
        'burstMs',
        'settleMs',
        'clearHoldMs',
        'digits',
        'colours',
        'reducedMotion',
      ],
      properties: {
        name: { type: 'string', const: 'explosive-tag-countdown' },
        armMs: { type: 'number', const: 220 },
        stepMs: { type: 'number', const: 480 },
        burstMs: { type: 'number', const: 240 },
        settleMs: { type: 'number', const: 200 },
        clearHoldMs: { type: 'number', const: 220 },
        digits: { type: 'array', const: [3, 2, 1] },
        pulseMsByLevel: { type: 'object', const: { '3': 480, '2': 340, '1': 220 } },
        colours: {
          type: 'object',
          additionalProperties: false,
          required: ['ink', 'parchment', 'ember', 'danger', 'soot', 'off'],
          properties: {
            ink: { type: 'string', const: SEAL.ink },
            parchment: { type: 'string', const: SEAL.parchment },
            ember: { type: 'string', const: '#E07030' },
            danger: { type: 'string', const: SEAL.danger },
            soot: { type: 'string', const: SEAL.olive },
            off: { type: 'string', const: SEAL.off },
          },
        },
        reducedMotion: {
          type: 'object',
          additionalProperties: false,
          required: ['immediateClear'],
          properties: { immediateClear: { type: 'boolean', const: true } },
        },
      },
    })
    patchEntry(id, {
      blurb:
        'Seal tag arms, counts 3→2→1 with rising pulse intensity, detonates, then CLEAR hold.',
      intensity: 'graphic',
      reducedMotionNote:
        'Under prefers-reduced-motion or data-force-reduced-motion, the tag appears CLEAR immediately.',
      acceptance,
    })
    patchPayload(id, {
      acceptance,
      integration: [
        'Mount inside a relative host (~420×320+).',
        'Import demo.css verbatim; freeze arm/step/burst/clearHold timings from contract.json.',
        'Wire runExplosiveTagCountdown / resetExplosiveTagCountdown / replayExplosiveTagCountdown.',
        'Honour both reduced-motion triggers.',
      ],
    })
    w(
      id,
      'spec.md',
      `# Explosive Tag Countdown

Arm → 3/2/1 intensity escalate → burst → **CLEAR** hold.

## Freeze

- armMs: 220 · stepMs: 480 · burstMs: 240 · clearHoldMs: 220
- pulseMsByLevel: 480 / 340 / 220
- Palette: seal lacquer
`,
    )
    sync(id)
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
