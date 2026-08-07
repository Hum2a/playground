/**
 * Wave 2b — improve remaining Naruto specimens (elements/transitions/speed/menu/wire/tag).
 * Metaphor CSS vars + frozen contracts + measurable acceptance + sync demo.style.txt.
 * Commits one Improve SPX-NNNN Title. per specimen (PowerShell-safe).
 *
 * Usage: node scripts/ephemeral/_improve-naruto-wave2b.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'

const ROOT = path.resolve('src/specimens/library/naruto')

function write(p, s) {
  fs.writeFileSync(p, s.endsWith('\n') ? s : s + '\n')
}

function syncTwin(dir) {
  const css = fs.readFileSync(path.join(dir, 'demo.css'), 'utf8')
  write(path.join(dir, 'demo.style.txt'), css)
}

function injectCssVars(css, rootClass, varsBlock) {
  const lines = varsBlock
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.startsWith('--'))
  const missing = lines.filter((l) => {
    const name = l.split(':')[0]
    return !css.includes(name + ':')
  })
  if (!missing.length) return css
  const inject = missing.map((l) => `  ${l}`).join('\n')
  const re = new RegExp(
    `(\\.${rootClass} \\{[\\s\\S]*?--(?:off|soot|alarm):[^;]+;)`,
  )
  if (!re.test(css)) throw new Error(`Cannot inject vars into .${rootClass}`)
  return css.replace(re, `$1\n${inject}`)
}

function replaceAll(css, pairs) {
  let out = css
  for (const [from, to] of pairs) {
    if (!out.includes(from)) {
      // allow already-patched
      continue
    }
    out = out.split(from).join(to)
  }
  return out
}

function patchEntry(dir, { blurb, acceptance, reducedMotionNote }) {
  let s = fs.readFileSync(path.join(dir, 'entry.ts'), 'utf8')
  if (blurb) {
    s = s.replace(/blurb:\s*\n?\s*'[^']*'/, `blurb:\n    '${blurb}'`)
  }
  if (reducedMotionNote) {
    s = s.replace(
      /reducedMotionNote:\s*\n?\s*'[^']*'/,
      `reducedMotionNote:\n      '${reducedMotionNote}'`,
    )
  }
  if (acceptance) {
    const acc = acceptance.map((a) => `    '${a}',`).join('\n')
    s = s.replace(/acceptance:\s*\[[\s\S]*?\],/, `acceptance: [\n${acc}\n  ],`)
  }
  // intensity bump for wire
  if (dir.endsWith('wire-connection-draw')) {
    s = s.replace(/intensity: 'subtle'/, "intensity: 'graphic'")
  }
  write(path.join(dir, 'entry.ts'), s)
}

function patchPayload(dir, { bg, freezeLine, apiNames }) {
  let s = fs.readFileSync(path.join(dir, 'payload.ts'), 'utf8')
  s = s.replace(
    /acceptance:\s*\[[\s\S]*?\],/,
    'acceptance: contract.acceptance,',
  )
  if (bg) {
    s = s.replace(/background:#[0-9A-Fa-f]{6}/, `background:${bg}`)
  }
  if (freezeLine) {
    s = s.replace(
      /Import demo\.css verbatim;[^']*'/,
      `Import demo.css verbatim; freeze ${freezeLine} from contract.json.'`,
    )
  }
  if (apiNames) {
    s = s.replace(/Wire [^.]+/, `Wire ${apiNames}`)
  }
  write(path.join(dir, 'payload.ts'), s)
}

function writeSpec(dir, title, body) {
  write(path.join(dir, 'spec.md'), `# ${title}\n\n${body}\n`)
}

function commit(dir, ref, title) {
  const rel = path.relative(process.cwd(), dir).replace(/\\/g, '/')
  execSync(`git add "${rel}"`, { stdio: 'pipe' })
  const msg = `Improve ${ref} ${title}.`
  // PowerShell-safe: pass message via -m without HEREDOC
  execSync(`git commit -m ${JSON.stringify(msg)}`, { stdio: 'inherit' })
  console.log('committed', msg)
}

const SPECS = [
  {
    id: 'element-merge-recipe',
    ref: 'SPX-2476',
    title: 'Element Merge Recipe',
    nr: 'NR-133',
    palette: 'fire',
    bg: '#0C0806',
    improve(dir) {
      let css = fs.readFileSync(path.join(dir, 'demo.css'), 'utf8')
      css = injectCssVars(
        css,
        'emr',
        `  --emr-travel-ms: 340ms;
  --emr-merge-ms: 200ms;
  --emr-settle-ms: 160ms;
  --emr-travel-px: 104px;
  --emr-result-ms: 220ms;
  --emr-seam-px: 30;`,
      )
      css = replaceAll(css, [
        [
          'animation: emr-travel-a 340ms ease-in forwards;',
          'animation: emr-travel-a var(--emr-travel-ms) ease-in forwards;',
        ],
        [
          'animation: emr-travel-b 340ms ease-in forwards;',
          'animation: emr-travel-b var(--emr-travel-ms) ease-in forwards;',
        ],
        ['transform: translateX(104px);', 'transform: translateX(var(--emr-travel-px));'],
        ['transform: translateX(-104px);', 'transform: translateX(calc(var(--emr-travel-px) * -1));'],
        [
          'animation: emr-flash 200ms ease-out forwards;',
          'animation: emr-flash var(--emr-merge-ms) ease-out forwards;',
        ],
        [
          'animation: emr-result-in 220ms cubic-bezier(0.2, 0.85, 0.25, 1) forwards;',
          'animation: emr-result-in var(--emr-result-ms) cubic-bezier(0.2, 0.85, 0.25, 1) forwards;',
        ],
      ])
      // inheritance marks on result
      if (!css.includes('emr__result::before')) {
        css = css.replace(
          '.emr__result {',
          `.emr__result::before,
.emr__result::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 6px;
  height: 6px;
  margin-top: -3px;
  border-radius: 1px;
  background: var(--off);
}
.emr__result::before {
  left: 6px;
  box-shadow: 0 0 0 1px rgb(224 112 48 / 0.9);
}
.emr__result::after {
  right: 6px;
  border-radius: 50%;
  box-shadow: 0 0 0 1px rgb(217 74 56 / 0.9);
}

.emr__result {`,
        )
      }
      write(path.join(dir, 'demo.css'), css)

      // HTML: add mark labels on orbs via data attrs already present; enhance result visible marks via CSS
      let html = fs.readFileSync(path.join(dir, 'demo.html'), 'utf8')
      if (!html.includes('emr__mark')) {
        html = html
          .replace(
            '<span class="emr__orb emr__orb--a" data-emr-orb-a aria-hidden="true"></span>',
            `<span class="emr__orb emr__orb--a" data-emr-orb-a aria-hidden="true"><i class="emr__mark emr__mark--a"></i></span>`,
          )
          .replace(
            '<span class="emr__orb emr__orb--b" data-emr-orb-b aria-hidden="true"></span>',
            `<span class="emr__orb emr__orb--b" data-emr-orb-b aria-hidden="true"><i class="emr__mark emr__mark--b"></i></span>`,
          )
        write(path.join(dir, 'demo.html'), html)
        css = fs.readFileSync(path.join(dir, 'demo.css'), 'utf8')
        if (!css.includes('.emr__mark')) {
          css = css.replace(
            '.emr__orb--a {',
            `.emr__mark {
  position: absolute;
  inset: 0;
  margin: auto;
  width: 8px;
  height: 8px;
  background: var(--off);
}
.emr__mark--a {
  clip-path: polygon(50% 0, 100% 100%, 0 100%);
}
.emr__mark--b {
  border-radius: 50%;
  width: 7px;
  height: 7px;
}

.emr__orb--a {`,
          )
          write(path.join(dir, 'demo.css'), css)
        }
      }

      write(
        path.join(dir, 'contract.json'),
        JSON.stringify(
          {
            name: 'element-merge-recipe',
            intent:
              'Two marked orbs travel 104px into a 30px seam, flash-merge, then a dual-tone result token inherits both marks.',
            catalogue: { nr: 'NR-133', ref: 'SPX-2476' },
            copy: {
              system: 'RECIPE // ELEMENT MERGE',
              idle: 'IDLE',
              combining: 'COMBINING',
              merging: 'MERGING',
              done: 'RESULT READY',
            },
            geometry: {
              travelPx: 104,
              seamPx: 30,
              trackPx: 240,
              inputMarks: ['triangle', 'dot'],
              resultHalfDeg: 180,
            },
            timing: {
              travelMs: 340,
              mergeMs: 200,
              settleMs: 160,
              resultMs: 220,
            },
            colours: {
              ink: '#0C0806',
              parchment: '#C4B8A8',
              chakra: '#E07030',
              danger: '#D94A38',
              olive: '#5A5048',
              off: '#F4F1E8',
              palette: 'fire',
            },
            api: {
              run: 'runElementMergeRecipe()',
              reset: 'resetElementMergeRecipe()',
              replay: 'replayElementMergeRecipe()',
            },
            cssVars: [
              '--emr-travel-ms',
              '--emr-merge-ms',
              '--emr-settle-ms',
              '--emr-travel-px',
              '--emr-result-ms',
              '--emr-seam-px',
            ],
            reducedMotion: {
              behaviour: 'Result token appears directly; no travel/merge flash',
            },
            acceptance: [
              'Orbs A/B travel travelPx 104 into seamPx 30 in travelMs 340',
              'Merge flash mergeMs 200 then dual-tone result (180° halves) inherits triangle+dot marks',
              'Status RESULT READY after settleMs 160; Replay resets to IDLE',
              'Reduced motion (prefers or data-force) shows RESULT READY immediately with animations disabled',
            ],
          },
          null,
          2,
        ),
      )

      patchEntry(dir, {
        blurb:
          'Two marked orbs travel 104px into a 30px seam (340ms), flash-merge (200ms), then a dual-tone result inherits both marks — elemental recipe commit, no copyrighted iconography.',
        acceptance: [
          'Orbs travel 104px into 30px seam in 340ms then merge flash 200ms',
          'Result token inherits triangle+dot marks before RESULT READY',
          'Reduced motion shows RESULT READY immediately',
        ],
        reducedMotionNote:
          'Under prefers-reduced-motion or data-force-reduced-motion, the dual-tone result appears directly with no travel/merge choreography.',
      })
      patchPayload(dir, {
        bg: '#0C0806',
        freezeLine: 'travelMs 340 / mergeMs 200 / settleMs 160 / travelPx 104',
        apiNames:
          'runElementMergeRecipe / resetElementMergeRecipe / replayElementMergeRecipe.',
      })
      writeSpec(
        dir,
        'Element Merge Recipe',
        `Two marked element orbs travel into a central seam, flash-merge, and leave a dual-tone result that inherits both marks.

## Behaviour

- Idle: orbs at rest with distinct marks (triangle / dot), status \`IDLE\`.
- Combining: each orb travels 104px toward the 30px seam (340ms).
- Merging: inputs hide, radial flash (200ms).
- Result: dual-tone token with inherited marks, status \`RESULT READY\`.
- Reduced motion: jump straight to the result token.

## Freeze

- Travel: 340ms · merge: 200ms · settle: 160ms · result: 220ms · travelPx: 104 · seamPx: 30
- Palette: \`#0C0806\` / \`#C4B8A8\` / \`#E07030\` / \`#D94A38\` / \`#5A5048\` / \`#F4F1E8\``,
      )
    },
  },
  {
    id: 'vortex-hold-to-confirm',
    ref: 'SPX-2482',
    title: 'Vortex Hold-to-Confirm',
    improve(dir) {
      let css = fs.readFileSync(path.join(dir, 'demo.css'), 'utf8')
      css = injectCssVars(
        css,
        'vhc',
        `  --vhc-confirm-pulse-ms: 180ms;
  --vhc-ring-count: 3;
  --vhc-core-px: 108;
  --vhc-ring-spin-ms: 900ms;`,
      )
      // ensure hold/cancel already present; wire ring spin to var if hardcoded
      css = replaceAll(css, [
        ['animation: vhc-spin 900ms', 'animation: vhc-spin var(--vhc-ring-spin-ms)'],
        ['animation: vhc-spin 1.1s', 'animation: vhc-spin var(--vhc-ring-spin-ms)'],
        ['animation: vhc-spin 1.35s', 'animation: vhc-spin calc(var(--vhc-ring-spin-ms) * 1.2)'],
        ['animation: vhc-spin 1.6s', 'animation: vhc-spin calc(var(--vhc-ring-spin-ms) * 1.4)'],
      ])
      write(path.join(dir, 'demo.css'), css)

      write(
        path.join(dir, 'contract.json'),
        JSON.stringify(
          {
            name: 'vortex-hold-to-confirm',
            intent:
              'Hold builds three concentric rotating rings over holdMs 900; early release cancels in cancelMs 200; full hold confirms.',
            catalogue: { nr: 'NR-139', ref: 'SPX-2482' },
            copy: {
              system: 'HOLD // VORTEX CONFIRM',
              idle: 'IDLE',
              holding: 'HOLDING',
              cancelled: 'CANCELLED',
              confirmed: 'CONFIRMED',
            },
            geometry: {
              ringCount: 3,
              corePx: 108,
              ringRadiiPx: [52, 72, 94],
            },
            timing: {
              holdMs: 900,
              cancelMs: 200,
              confirmPulseMs: 180,
              ringSpinMs: 900,
            },
            colours: {
              ink: '#070B0E',
              parchment: '#C8E8DC',
              chakra: '#3DCEA8',
              olive: '#1A6B58',
              off: '#D7F5EC',
              palette: 'sensor',
            },
            api: {
              run: 'runVortexHoldToConfirm()',
              reset: 'resetVortexHoldToConfirm()',
              replay: 'replayVortexHoldToConfirm()',
            },
            cssVars: [
              '--vhc-hold-ms',
              '--vhc-cancel-ms',
              '--vhc-confirm-pulse-ms',
              '--vhc-ring-count',
              '--vhc-core-px',
              '--vhc-ring-spin-ms',
            ],
            reducedMotion: {
              behaviour:
                'Manual holds still require 900ms without ring spin; Run auto-confirms immediately',
            },
            acceptance: [
              'Early release before holdMs 900 never reaches CONFIRMED (cancelMs 200 unwind)',
              'Full hold builds exactly 3 rings then CONFIRMED after confirmPulseMs 180',
              'Run auto-hold uses the same holdMs 900 threshold',
              'Reduced motion (prefers or data-force): Run jumps to CONFIRMED; manual holds skip spin but keep threshold',
            ],
          },
          null,
          2,
        ),
      )

      patchEntry(dir, {
        blurb:
          'Hold the 108px core for 900ms to build three concentric rings; release early cancels in 200ms — vortex confirm gate, no copyrighted iconography.',
        acceptance: [
          'Early release before 900ms never confirms (200ms cancel)',
          'Full hold builds 3 rings then CONFIRMED (180ms pulse)',
          'Reduced motion keeps 900ms manual threshold; Run auto-confirms',
        ],
        reducedMotionNote:
          'Under prefers-reduced-motion or data-force-reduced-motion, ring spin is disabled; manual holds still require 900ms, while Run/Replay resolve directly to CONFIRMED.',
      })
      patchPayload(dir, {
        bg: '#070B0E',
        freezeLine: 'holdMs 900 / cancelMs 200 / confirmPulseMs 180 / ringCount 3',
      })
      writeSpec(
        dir,
        'Vortex Hold-to-Confirm',
        `Holding a central core builds three concentric rotating rings. Releasing early cancels; holding the full threshold confirms.

## Behaviour

- Idle: core alone, status \`IDLE\`.
- Holding: rings engage progressively over 900ms.
- Early release: unwind in 200ms, never CONFIRMED.
- Confirmed: flash pulse 180ms, status \`CONFIRMED\`.
- Reduced motion: no spin; manual holds keep threshold; Run auto-confirms.

## Freeze

- Hold: 900ms · cancel: 200ms · confirm pulse: 180ms · rings: 3 · core: 108px
- Palette: \`#070B0E\` / \`#C8E8DC\` / \`#3DCEA8\` / \`#1A6B58\` / \`#D7F5EC\``,
      )
    },
  },
  {
    id: 'smoke-mask-transition',
    ref: 'SPX-2439',
    title: 'Smoke Mask Transition',
    improve(dir) {
      let css = fs.readFileSync(path.join(dir, 'demo.css'), 'utf8')
      css = injectCssVars(
        css,
        'smt',
        `  --smt-total-ms: 700ms;
  --smt-cover-at-ms: 300ms;
  --smt-settle-ms: 140ms;
  --smt-circle-count: 6;
  --smt-cover-scale: 2.4;`,
      )
      css = replaceAll(css, [
        ['700ms', 'var(--smt-total-ms)'],
        ['animation-delay: 40ms', 'animation-delay: 40ms'],
      ])
      // only replace animation durations carefully — already may use vars
      if (!css.includes('var(--smt-total-ms)')) {
        css = css.replace(/(\.smt\[data-phase='run'\][\s\S]*?)700ms/g, '$1var(--smt-total-ms)')
      }
      write(path.join(dir, 'demo.css'), css)

      write(
        path.join(dir, 'contract.json'),
        JSON.stringify(
          {
            name: 'smoke-mask-transition',
            intent:
              'Six overlapping circles billow to full cover by coverAtMs 300, swap A↔B under mask, then disperse by totalMs 700.',
            catalogue: { nr: 'NR-096', ref: 'SPX-2439' },
            copy: {
              system: 'COVER // SMOKE MASK',
              stateA: 'STATE 01',
              stateB: 'STATE 02',
            },
            geometry: {
              circleCount: 6,
              coverScale: 2.4,
              hostPx: [null, 190],
            },
            timing: {
              totalMs: 700,
              coverAtMs: 300,
              settleMs: 140,
            },
            colours: {
              ink: '#071018',
              parchment: '#C8D8E4',
              chakra: '#3A9EC9',
              olive: '#4A6A78',
              off: '#E8F2F8',
              palette: 'water',
            },
            api: {
              run: 'runSmokeMaskTransition()',
              reset: 'resetSmokeMaskTransition()',
              replay: 'replaySmokeMaskTransition()',
            },
            cssVars: [
              '--smt-total-ms',
              '--smt-cover-at-ms',
              '--smt-settle-ms',
              '--smt-circle-count',
              '--smt-cover-scale',
            ],
            reducedMotion: {
              behaviour: 'Instant A↔B swap; no circle billow/disperse',
            },
            acceptance: [
              'Exactly 6 circles cover the host by coverAtMs 300 before content identity swaps',
              'After totalMs 700 the revealed panel identity differs from pre-cover (A≠B)',
              'Replay re-runs cover → swap → disperse; settleMs 140 after disperse',
              'Reduced motion (prefers or data-force) swaps instantly with animations disabled',
            ],
          },
          null,
          2,
        ),
      )

      patchEntry(dir, {
        blurb:
          'Six smoke circles billow to full cover by 300ms, swap state identity under the mask, then disperse by 700ms — graphic CSS smoke, no photographic assets.',
        acceptance: [
          '6 circles fully cover by 300ms before A↔B swap',
          'After 700ms revealed identity differs (A≠B)',
          'Reduced motion instant swaps without choreography',
        ],
      })
      patchPayload(dir, {
        bg: '#071018',
        freezeLine: 'totalMs 700 / coverAtMs 300 / settleMs 140 / circleCount 6',
      })
      writeSpec(
        dir,
        'Smoke Mask Transition',
        `Overlapping abstract circles billow in to cover the stage, a content swap happens under cover, then the circles disperse.

## Behaviour

- Idle: STATE 01 visible.
- Cover: 6 circles expand to full cover by 300ms.
- Swap: under full cover, panel identity flips A↔B.
- Disperse: circles clear by 700ms; settle 140ms.
- Reduced motion: instant swap.

## Freeze

- Total: 700ms · coverAt: 300ms · settle: 140ms · circles: 6 · coverScale: 2.4
- Palette: \`#071018\` / \`#C8D8E4\` / \`#3A9EC9\` / \`#4A6A78\` / \`#E8F2F8\``,
      )
    },
  },
  {
    id: 'water-wave-page-transition',
    ref: 'SPX-2451',
    title: 'Water Wave Page Transition',
    improve(dir) {
      let css = fs.readFileSync(path.join(dir, 'demo.css'), 'utf8')
      css = injectCssVars(
        css,
        'wwt',
        `  --wwt-total-ms: 650ms;
  --wwt-swap-at-ms: 320ms;
  --wwt-settle-ms: 150ms;
  --wwt-start-x: -108%;
  --wwt-end-x: 108%;`,
      )
      css = replaceAll(css, [
        [
          'animation: wwt-sweep 650ms cubic-bezier(0.4, 0, 0.2, 1) both;',
          'animation: wwt-sweep var(--wwt-total-ms) cubic-bezier(0.4, 0, 0.2, 1) both;',
        ],
        [
          'animation: wwt-sweep-foam 650ms cubic-bezier(0.4, 0, 0.2, 1) both;',
          'animation: wwt-sweep-foam var(--wwt-total-ms) cubic-bezier(0.4, 0, 0.2, 1) both;',
        ],
        ['transform: translateX(-108%);', 'transform: translateX(var(--wwt-start-x));'],
        ['transform: translateX(108%);', 'transform: translateX(var(--wwt-end-x));'],
      ])
      write(path.join(dir, 'demo.css'), css)

      write(
        path.join(dir, 'contract.json'),
        JSON.stringify(
          {
            name: 'water-wave-page-transition',
            intent:
              'Jagged water clip-path wave sweeps -108%→108% in totalMs 650; page identity swaps at swapAtMs 320.',
            catalogue: { nr: 'NR-108', ref: 'SPX-2451' },
            copy: {
              system: 'WIPE // WATER WAVE',
              pageA: 'PAGE // 01',
              pageB: 'PAGE // 02',
            },
            geometry: {
              startX: '-108%',
              endX: '108%',
              clipSteps: 10,
              foamWidthPx: 6,
            },
            timing: {
              totalMs: 650,
              swapAtMs: 320,
              settleMs: 150,
            },
            colours: {
              ink: '#071018',
              parchment: '#C8D8E4',
              chakra: '#3A9EC9',
              olive: '#4A6A78',
              off: '#E8F2F8',
              palette: 'water',
            },
            api: {
              run: 'runWaterWavePageTransition()',
              reset: 'resetWaterWavePageTransition()',
              replay: 'replayWaterWavePageTransition()',
            },
            cssVars: [
              '--wwt-total-ms',
              '--wwt-swap-at-ms',
              '--wwt-settle-ms',
              '--wwt-start-x',
              '--wwt-end-x',
            ],
            reducedMotion: {
              behaviour: 'Instant page swap; wave hidden',
            },
            acceptance: [
              'Wave body+foam travel startX -108% → endX 108% over totalMs 650',
              'Page identity swaps at swapAtMs 320 mid-sweep; settleMs 150 after',
              'Clip-path uses frozen jagged polygon (10 steps), not a soft fade',
              'Reduced motion (prefers or data-force) swaps instantly with wave animations disabled',
            ],
          },
          null,
          2,
        ),
      )

      patchEntry(dir, {
        blurb:
          'A jagged water clip-path sweeps -108%→108% in 650ms, swapping page identity at 320ms mid-wipe — CSS water wipe, distinct from wind blades.',
        acceptance: [
          'Wave sweeps -108%→108% in 650ms with frozen jagged clip',
          'Page B identity visible after swap at 320ms',
          'Reduced motion instant page swap',
        ],
      })
      patchPayload(dir, {
        bg: '#071018',
        freezeLine: 'totalMs 650 / swapAtMs 320 / settleMs 150 / startX -108%',
      })
      writeSpec(
        dir,
        'Water Wave Page Transition',
        `A jagged blue wave mask sweeps horizontally across the stage, exchanging page content mid-sweep.

## Behaviour

- Idle: PAGE 01 visible.
- Sweep: wave + foam travel -108% → 108% (650ms).
- Swap: at 320ms under the wave, page identity flips.
- Settled: PAGE 02 (or back) visible after settle 150ms.
- Reduced motion: instant swap.

## Freeze

- Total: 650ms · swapAt: 320ms · settle: 150ms · travel: -108%→108%
- Palette: \`#071018\` / \`#C8D8E4\` / \`#3A9EC9\` / \`#4A6A78\` / \`#E8F2F8\``,
      )
    },
  },
  {
    id: 'wind-slice-transition',
    ref: 'SPX-2458',
    title: 'Wind Slice Transition',
    improve(dir) {
      let css = fs.readFileSync(path.join(dir, 'demo.css'), 'utf8')
      css = injectCssVars(
        css,
        'wst',
        `  --wst-total-ms: 600ms;
  --wst-swap-at-ms: 420ms;
  --wst-settle-ms: 150ms;
  --wst-blade-ms: 380ms;
  --wst-stagger-ms: 70ms;
  --wst-blade-count: 4;
  --wst-skew-deg: -16deg;`,
      )
      css = replaceAll(css, [
        ['skewX(-16deg)', 'skewX(var(--wst-skew-deg))'],
        [
          'animation: wst-slice 380ms cubic-bezier(0.6, 0, 0.35, 1) both;',
          'animation: wst-slice var(--wst-blade-ms) cubic-bezier(0.6, 0, 0.35, 1) both;',
        ],
        ['animation-delay: 0ms;', 'animation-delay: 0ms;'],
        ['animation-delay: 70ms;', 'animation-delay: var(--wst-stagger-ms);'],
        [
          'animation-delay: 140ms;',
          'animation-delay: calc(var(--wst-stagger-ms) * 2);',
        ],
        [
          'animation-delay: 210ms;',
          'animation-delay: calc(var(--wst-stagger-ms) * 3);',
        ],
      ])
      // sharpen blades with clip
      if (!css.includes('clip-path: polygon(0 0, 70% 0')) {
        css = css.replace(
          '.wst__blade {\n  position: absolute;\n  top: 0;\n  width: 30%;\n  height: 100%;\n  transform: skewX(var(--wst-skew-deg)) translateX(-220%);\n  opacity: 0;\n}',
          `.wst__blade {
  position: absolute;
  top: 0;
  width: 30%;
  height: 100%;
  transform: skewX(var(--wst-skew-deg)) translateX(-220%);
  opacity: 0;
  clip-path: polygon(0 0, 70% 0, 100% 50%, 70% 100%, 0 100%, 18% 50%);
}`,
        )
      }
      write(path.join(dir, 'demo.css'), css)

      write(
        path.join(dir, 'contract.json'),
        JSON.stringify(
          {
            name: 'wind-slice-transition',
            intent:
              'Four clipped blades at skewDeg -16 sweep with staggerMs 70; content swaps at swapAtMs 420.',
            catalogue: { nr: 'NR-115', ref: 'SPX-2458' },
            copy: {
              system: 'CUT // WIND SLICE',
              pageA: 'PAGE // 01',
              pageB: 'PAGE // 02',
            },
            geometry: {
              bladeCount: 4,
              skewDeg: -16,
              bladeWidthPct: 30,
              staggerStartsMs: [0, 70, 140, 210],
            },
            timing: {
              totalMs: 600,
              swapAtMs: 420,
              settleMs: 150,
              bladeMs: 380,
              staggerMs: 70,
            },
            colours: {
              ink: '#0C1014',
              parchment: '#D0D6DC',
              chakra: '#8AA0B4',
              olive: '#5A6870',
              off: '#EEF2F4',
              palette: 'wind',
            },
            api: {
              run: 'runWindSliceTransition()',
              reset: 'resetWindSliceTransition()',
              replay: 'replayWindSliceTransition()',
            },
            cssVars: [
              '--wst-total-ms',
              '--wst-swap-at-ms',
              '--wst-settle-ms',
              '--wst-blade-ms',
              '--wst-stagger-ms',
              '--wst-blade-count',
              '--wst-skew-deg',
            ],
            reducedMotion: {
              behaviour: 'Instant content swap; blades suppressed',
            },
            acceptance: [
              'Exactly 4 blades at skewDeg -16 with staggerMs 70 (starts 0/70/140/210)',
              'Each blade runs bladeMs 380; content swaps at swapAtMs 420 within totalMs 600',
              'Blade geometry uses clip-path polygon (not opacity fade as primary)',
              'Reduced motion (prefers or data-force) swaps instantly with animations disabled',
            ],
          },
          null,
          2,
        ),
      )

      // system label
      let html = fs.readFileSync(path.join(dir, 'demo.html'), 'utf8')
      html = html.replace('WIPE // WIND SLICE', 'CUT // WIND SLICE')
      write(path.join(dir, 'demo.html'), html)

      patchEntry(dir, {
        blurb:
          'Four clipped blades at -16° skew sweep with a 70ms stagger (380ms each); content swaps at 420ms — wind cut wipe, distinct from water wave.',
        acceptance: [
          '4 blades at -16° with 70ms stagger (380ms each)',
          'Content swaps at 420ms; total 600ms',
          'Reduced motion instant swap',
        ],
      })
      patchPayload(dir, {
        bg: '#0C1014',
        freezeLine: 'bladeCount 4 / skewDeg -16 / staggerMs 70 / swapAtMs 420',
      })
      writeSpec(
        dir,
        'Wind Slice Transition',
        `Four staggered diagonal blades sweep across the stage, exchanging content mid-sweep.

## Behaviour

- Idle: page A visible.
- Slice: 4 clipped blades at -16° skew, staggered 70ms, each 380ms.
- Swap: at 420ms under blades, content flips.
- Settled after total 600ms + settle 150ms.
- Reduced motion: instant swap.

## Freeze

- Total: 600ms · swapAt: 420ms · blade: 380ms · stagger: 70ms · blades: 4 · skew: -16°
- Palette: \`#0C1014\` / \`#D0D6DC\` / \`#8AA0B4\` / \`#5A6870\` / \`#EEF2F4\``,
      )
    },
  },
  {
    id: 'scroll-to-panel-transform',
    ref: 'SPX-2366',
    title: 'Scroll-to-Panel Transform',
    improve(dir) {
      let css = fs.readFileSync(path.join(dir, 'demo.css'), 'utf8')
      css = injectCssVars(
        css,
        'stp',
        `  --stp-morph-ms: 480ms;
  --stp-settle-ms: 90ms;
  --stp-content-delay-ms: 260ms;
  --stp-token-px: 64;
  --stp-panel-h-px: 176;
  --stp-radius-from: 50%;
  --stp-radius-to: 10px;`,
      )
      css = replaceAll(css, [
        [
          `transition:
    width 480ms cubic-bezier(0.2, 0.8, 0.25, 1),
    height 480ms cubic-bezier(0.2, 0.8, 0.25, 1),
    border-radius 480ms cubic-bezier(0.2, 0.8, 0.25, 1);`,
          `transition:
    width var(--stp-morph-ms) cubic-bezier(0.2, 0.8, 0.25, 1),
    height var(--stp-morph-ms) cubic-bezier(0.2, 0.8, 0.25, 1),
    border-radius var(--stp-morph-ms) cubic-bezier(0.2, 0.8, 0.25, 1);`,
        ],
        ['width: 64px;\n  height: 64px;', 'width: calc(var(--stp-token-px) * 1px);\n  height: calc(var(--stp-token-px) * 1px);'],
        ['height: 176px;', 'height: calc(var(--stp-panel-h-px) * 1px);'],
        ['border-radius: 10px;', 'border-radius: var(--stp-radius-to);'],
        ['transition-delay: 260ms;', 'transition-delay: var(--stp-content-delay-ms);'],
      ])
      // clip emphasis on token without duplicating selector
      if (!css.includes('clip-path: inset(40%')) {
        css = css.replace(
          `.stp[data-phase='active'] .stp__token,
.stp[data-phase='done'] .stp__token {
  opacity: 0;
}`,
          `.stp__token {
  clip-path: inset(0 0 0 0);
  transition:
    opacity 150ms ease-out,
    clip-path var(--stp-morph-ms) cubic-bezier(0.2, 0.8, 0.25, 1);
}

.stp[data-phase='active'] .stp__token,
.stp[data-phase='done'] .stp__token {
  opacity: 0;
  clip-path: inset(40% 40% 40% 40%);
}`,
        )
      }
      write(path.join(dir, 'demo.css'), css)

      write(
        path.join(dir, 'contract.json'),
        JSON.stringify(
          {
            name: 'scroll-to-panel-transform',
            intent:
              'Round 64px scroll token morphs width/height/radius into a 176px panel over morphMs 480 — scale/clip, not crossfade.',
            catalogue: { nr: 'NR-023', ref: 'SPX-2366' },
            copy: {
              system: 'MORPH // SCROLL PANEL',
              idle: 'SCROLL',
              done: 'PANEL',
            },
            geometry: {
              tokenPx: 64,
              panelHPx: 176,
              radiusFrom: '50%',
              radiusTo: '10px',
            },
            timing: {
              morphMs: 480,
              settleMs: 90,
              contentDelayMs: 260,
            },
            colours: {
              ink: '#1A1612',
              parchment: '#EBE2D0',
              chakra: '#B83228',
              olive: '#6A5E4E',
              off: '#F7F2E8',
              palette: 'mission',
            },
            api: {
              run: 'runScrollToPanelTransform()',
              reset: 'resetScrollToPanelTransform()',
              replay: 'replayScrollToPanelTransform()',
            },
            cssVars: [
              '--stp-morph-ms',
              '--stp-settle-ms',
              '--stp-content-delay-ms',
              '--stp-token-px',
              '--stp-panel-h-px',
              '--stp-radius-to',
            ],
            reducedMotion: {
              behaviour: 'Expanded panel shown immediately; no morph transition',
            },
            acceptance: [
              'Token morphs from tokenPx 64 circle to full-width panelHPx 176 with radius 50%→10px in morphMs 480',
              'Panel copy appears after contentDelayMs 260 (not a crossfade of two separate cards)',
              'Status reads PANEL after settleMs 90',
              'Reduced motion (prefers or data-force) shows expanded panel immediately with transitions disabled',
            ],
          },
          null,
          2,
        ),
      )

      patchEntry(dir, {
        blurb:
          'A 64px round scroll token morphs width/height/radius into a 176px panel over 480ms — continuous shape transform, not a crossfade.',
        acceptance: [
          '64px circle morphs to 176px panel (radius 50%→10px) in 480ms',
          'Panel copy delays 260ms; no dual-card crossfade',
          'Reduced motion shows expanded panel immediately',
        ],
      })
      patchPayload(dir, {
        bg: '#1A1612',
        freezeLine: 'morphMs 480 / settleMs 90 / tokenPx 64 / panelHPx 176',
      })
      writeSpec(
        dir,
        'Scroll-to-Panel Transform',
        `A compact round scroll token morphs its own shape and size into a full rectangular content panel.

## Behaviour

- Idle: 64px circular token, status scroll.
- Morph: width/height/radius animate 480ms into 176px panel.
- Content: briefing copy fades in after 260ms delay on the same surface.
- Reduced motion: expanded panel immediately.

## Freeze

- Morph: 480ms · settle: 90ms · content delay: 260ms · token: 64px · panelH: 176px
- Palette: \`#1A1612\` / \`#EBE2D0\` / \`#B83228\` / \`#6A5E4E\` / \`#F7F2E8\``,
      )
    },
  },
  {
    id: 'body-flicker-page-jump',
    ref: 'SPX-2409',
    title: 'Body Flicker Page Jump',
    improve(dir) {
      let css = fs.readFileSync(path.join(dir, 'demo.css'), 'utf8')
      css = injectCssVars(
        css,
        'bfp',
        `  --bfp-flicker-ms: 140ms;
  --bfp-settle-ms: 90ms;
  --bfp-streak-count: 5;
  --bfp-streak-angle: 0deg;`,
      )
      css = replaceAll(css, [
        [
          'animation: bfp-streak-flash 140ms steps(3, end);',
          'animation: bfp-streak-flash var(--bfp-flicker-ms) steps(3, end);',
        ],
        [
          'animation: bfp-streak-sweep 140ms linear;',
          'animation: bfp-streak-sweep var(--bfp-flicker-ms) linear;',
        ],
        [
          'animation: bfp-streak-fade 90ms ease-out forwards;',
          'animation: bfp-streak-fade var(--bfp-settle-ms) ease-out forwards;',
        ],
      ])
      // directional streak angles
      if (!css.includes('bfp__streak--1')) {
        css = css.replace(
          `.bfp__streak {
  display: block;
  height: 2px;
  width: 100%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--chakra) 45%,
    var(--chakra) 55%,
    transparent 100%
  );
  transform: scaleX(0);
  transform-origin: left center;
}`,
          `.bfp__streak {
  display: block;
  height: 2px;
  width: 100%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--chakra) 45%,
    var(--chakra) 55%,
    transparent 100%
  );
  transform: scaleX(0) rotate(var(--bfp-streak-angle));
  transform-origin: left center;
}
.bfp__streak--1 { --bfp-streak-angle: -6deg; }
.bfp__streak--2 { --bfp-streak-angle: -2deg; }
.bfp__streak--3 { --bfp-streak-angle: 0deg; }
.bfp__streak--4 { --bfp-streak-angle: 3deg; }
.bfp__streak--5 { --bfp-streak-angle: 7deg; }`,
        )
      }
      write(path.join(dir, 'demo.css'), css)

      let html = fs.readFileSync(path.join(dir, 'demo.html'), 'utf8')
      if (!html.includes('bfp__streak--1')) {
        html = html.replace(
          /<div class="bfp__streaks"[^>]*>[\s\S]*?<\/div>/,
          `<div class="bfp__streaks" data-bfp-streaks aria-hidden="true">
        <span class="bfp__streak bfp__streak--1"></span>
        <span class="bfp__streak bfp__streak--2"></span>
        <span class="bfp__streak bfp__streak--3"></span>
        <span class="bfp__streak bfp__streak--4"></span>
        <span class="bfp__streak bfp__streak--5"></span>
      </div>`,
        )
        write(path.join(dir, 'demo.html'), html)
      }

      write(
        path.join(dir, 'contract.json'),
        JSON.stringify(
          {
            name: 'body-flicker-page-jump',
            intent:
              'Five directional streaks compress the source view in flickerMs 140, then destination identity appears after settleMs 90 — no fade-as-travel.',
            catalogue: { nr: 'NR-066', ref: 'SPX-2409' },
            copy: {
              system: 'JUMP // BODY FLICKER',
              origin: 'ORIGIN',
              destination: 'DESTINATION',
            },
            geometry: {
              streakCount: 5,
              streakAnglesDeg: [-6, -2, 0, 3, 7],
            },
            timing: {
              flickerMs: 140,
              settleMs: 90,
              totalMs: 230,
            },
            colours: {
              ink: '#0C1014',
              parchment: '#D0D6DC',
              chakra: '#8AA0B4',
              olive: '#5A6870',
              off: '#EEF2F4',
              palette: 'wind',
            },
            api: {
              run: 'runBodyFlickerPageJump()',
              reset: 'resetBodyFlickerPageJump()',
              replay: 'replayBodyFlickerPageJump()',
            },
            cssVars: [
              '--bfp-flicker-ms',
              '--bfp-settle-ms',
              '--bfp-streak-count',
              '--bfp-streak-angle',
            ],
            reducedMotion: {
              behaviour: 'Destination view shown immediately; streaks suppressed',
            },
            acceptance: [
              'Exactly 5 streaks at angles [-6,-2,0,3,7] fire for flickerMs 140 (scaleX, not opacity fade)',
              'Destination identity appears after settleMs 90; origin view is gone mid-flicker',
              'Replay returns to origin before re-jumping',
              'Reduced motion (prefers or data-force) shows destination immediately with animations disabled',
            ],
          },
          null,
          2,
        ),
      )

      patchEntry(dir, {
        blurb:
          'Five directional streaks (−6°…7°) compress the view in 140ms, then the destination identity snaps in after 90ms — body-flicker jump, no fade-as-travel.',
        acceptance: [
          '5 streaks at [-6,-2,0,3,7]° fire for 140ms (scaleX travel)',
          'Destination identity after 90ms settle; no fade-as-travel',
          'Reduced motion shows destination immediately',
        ],
      })
      patchPayload(dir, {
        bg: '#0C1014',
        freezeLine: 'flickerMs 140 / settleMs 90 / streakCount 5 / angles [-6,-2,0,3,7]',
      })
      writeSpec(
        dir,
        'Body Flicker Page Jump',
        `The current view flickers into compressed directional streaks, then hands off abruptly to a new destination view.

## Behaviour

- Idle: origin view.
- Flickering: 5 angled streaks sweep 140ms; origin suppressed.
- Settling: streaks fade 90ms; destination identity visible.
- Reduced motion: destination immediately.

## Freeze

- Flicker: 140ms · settle: 90ms · streaks: 5 · angles: -6/-2/0/3/7°
- Palette: \`#0C1014\` / \`#D0D6DC\` / \`#8AA0B4\` / \`#5A6870\` / \`#EEF2F4\``,
      )
    },
  },
  {
    id: 'high-speed-card-relocation',
    ref: 'SPX-2410',
    title: 'High-Speed Card Relocation',
    improve(dir) {
      let css = fs.readFileSync(path.join(dir, 'demo.css'), 'utf8')
      css = injectCssVars(
        css,
        'hcr',
        `  --hcr-travel-ms: 200ms;
  --hcr-settle-ms: 40ms;
  --hcr-ghost-count: 2;
  --hcr-path-pct: 50;`,
      )
      // ensure travel transitions use the var when still hardcoded
      css = css.replace(
        /transition:\s*([^;]*?)200ms/g,
        'transition: $1var(--hcr-travel-ms)',
      )
      write(path.join(dir, 'demo.css'), css)

      write(
        path.join(dir, 'contract.json'),
        JSON.stringify(
          {
            name: 'high-speed-card-relocation',
            intent:
              'Card leaves two afterimages at 0%/25% along the path during travelMs 200, absent mid-travel, then docks in slot B.',
            catalogue: { nr: 'NR-067', ref: 'SPX-2410' },
            copy: {
              system: 'RELOCATE // HIGH SPEED',
              slotA: 'SLOT A',
              slotB: 'SLOT B',
            },
            geometry: {
              ghostCount: 2,
              ghostLeftPct: [0, 25],
              ghostSpawnAtMs: [0, 60],
              ghostLifeMs: [220, 150],
              pathPct: 50,
            },
            timing: {
              travelMs: 200,
              settleMs: 40,
              totalMs: 240,
            },
            colours: {
              ink: '#0C1014',
              parchment: '#D0D6DC',
              chakra: '#8AA0B4',
              olive: '#5A6870',
              off: '#EEF2F4',
              palette: 'wind',
            },
            api: {
              run: 'runHighSpeedCardRelocation()',
              reset: 'resetHighSpeedCardRelocation()',
              replay: 'replayHighSpeedCardRelocation()',
            },
            cssVars: [
              '--hcr-travel-ms',
              '--hcr-settle-ms',
              '--hcr-ghost-count',
              '--hcr-path-pct',
            ],
            reducedMotion: {
              behaviour: 'Card appears in slot B immediately; no afterimages',
            },
            acceptance: [
              'Exactly 2 afterimages at leftPct 0 and 25 during travelMs 200',
              'Card is absent from both slots mid-travel; docks in slot B after settleMs 40',
              'Replay returns card to slot A before relocating',
              'Reduced motion (prefers or data-force) places card in slot B immediately',
            ],
          },
          null,
          2,
        ),
      )

      patchEntry(dir, {
        blurb:
          'A card leaves exactly two afterimages at 0% and 25% along a 200ms path, absent mid-travel, then docks in slot B.',
        acceptance: [
          '2 afterimages at 0%/25% during 200ms travel',
          'Card absent mid-travel; docks in slot B after 40ms settle',
          'Reduced motion places card in slot B immediately',
        ],
      })
      patchPayload(dir, {
        bg: '#0C1014',
        freezeLine: 'travelMs 200 / settleMs 40 / ghostCount 2 / leftPct [0,25]',
      })
      writeSpec(
        dir,
        'High-Speed Card Relocation',
        `A selected card leaves exactly two fading afterimages as it relocates at speed into a second container slot.

## Behaviour

- Idle: card in slot A.
- Travel: 200ms path with ghosts at 0% (life 220ms) and 25% (spawn 60ms, life 150ms).
- Mid-travel: card absent from both slots.
- Docked: card in slot B after settle 40ms.
- Reduced motion: card in B immediately.

## Freeze

- Travel: 200ms · settle: 40ms · ghosts: 2 at 0%/25%
- Palette: \`#0C1014\` / \`#D0D6DC\` / \`#8AA0B4\` / \`#5A6870\` / \`#EEF2F4\``,
      )
    },
  },
  {
    id: 'teleport-card-transfer',
    ref: 'SPX-2677',
    title: 'Teleport Card Transfer',
    improve(dir) {
      let css = fs.readFileSync(path.join(dir, 'demo.css'), 'utf8')
      css = injectCssVars(
        css,
        'tct',
        `  --tct-compress-ms: 200ms;
  --tct-reconstruct-ms: 220ms;
  --tct-aperture-open-px: 44;
  --tct-aperture-closed-px: 0;
  --tct-empty-hold-ms: 80ms;`,
      )
      css = css.replace(
        /\/\* wave2 timing surface \*\//,
        '/* frozen aperture transfer */',
      )
      write(path.join(dir, 'demo.css'), css)

      write(
        path.join(dir, 'contract.json'),
        JSON.stringify(
          {
            name: 'teleport-card-transfer',
            intent:
              'Card compresses into a 44px aperture at source (compressMs 200), mid empty hold, then reconstructs from matching aperture at destination (reconstructMs 220).',
            catalogue: { nr: 'NR-334', ref: 'SPX-2677' },
            copy: {
              system: 'TRANSFER // TELEPORT',
              source: 'SOURCE',
              destination: 'DESTINATION',
            },
            geometry: {
              apertureOpenPx: 44,
              apertureClosedPx: 0,
            },
            timing: {
              compressMs: 200,
              emptyHoldMs: 80,
              reconstructMs: 220,
              totalMs: 420,
            },
            colours: {
              ink: '#070B0E',
              parchment: '#C8E8DC',
              chakra: '#3DCEA8',
              alarm: '#3DCEA8',
              olive: '#1A6B58',
              off: '#D7F5EC',
              palette: 'sensor',
            },
            api: {
              run: 'runTeleportCardTransfer()',
              reset: 'resetTeleportCardTransfer()',
              replay: 'replayTeleportCardTransfer()',
            },
            cssVars: [
              '--tct-compress-ms',
              '--tct-reconstruct-ms',
              '--tct-aperture-open-px',
              '--tct-aperture-closed-px',
              '--tct-empty-hold-ms',
            ],
            reducedMotion: {
              behaviour: 'Card reconstructed at destination immediately',
            },
            acceptance: [
              'Source aperture opens to apertureOpenPx 44 during compressMs 200; card gone mid-hold',
              'Destination reconstructs only after reconstructMs 220 following empty hold',
              'Both apertures close to 0px when transfer completes',
              'Reduced motion (prefers or data-force) shows reconstructed destination immediately',
            ],
          },
          null,
          2,
        ),
      )

      patchEntry(dir, {
        blurb:
          'A card compresses into a 44px aperture (200ms), holds empty, then reconstructs from a matching aperture at the destination (220ms) — phosphor teleport transfer.',
        acceptance: [
          'Source aperture 44px compress 200ms; mid-transfer empty',
          'Destination reconstructs in 220ms after empty hold',
          'Reduced motion shows reconstructed destination',
        ],
      })
      patchPayload(dir, {
        bg: '#070B0E',
        freezeLine:
          'compressMs 200 / reconstructMs 220 / apertureOpenPx 44 / emptyHoldMs 80',
      })
      writeSpec(
        dir,
        'Teleport Card Transfer',
        `A card compresses into a circular aperture at its source slot and reconstructs out of a matching aperture at the destination.

## Behaviour

- Idle: card in source slot.
- Compress: 200ms into 44px aperture; source empty.
- Reconstruct: 220ms out of destination aperture.
- Done: card only at destination; apertures closed.
- Reduced motion: destination immediately.

## Freeze

- Compress: 200ms · reconstruct: 220ms · aperture: 44px · empty hold: 80ms
- Palette: \`#070B0E\` / \`#C8E8DC\` / \`#3DCEA8\` / \`#1A6B58\` / \`#D7F5EC\``,
      )
    },
  },
  {
    id: 'shuriken-radial-menu',
    ref: 'SPX-2415',
    title: 'Shuriken Radial Menu',
    improve(dir) {
      let css = fs.readFileSync(path.join(dir, 'demo.css'), 'utf8')
      css = injectCssVars(
        css,
        'srm',
        `  --srm-open-ms: 260ms;
  --srm-settle-ms: 40ms;
  --srm-sector-count: 4;
  --srm-radius: 3.6rem;
  --srm-hub-px: 48;`,
      )
      css = replaceAll(css, [
        ['translate(0, -3.6rem)', 'translate(0, calc(var(--srm-radius) * -1))'],
        ['translate(3.6rem, 0)', 'translate(var(--srm-radius), 0)'],
        ['translate(0, 3.6rem)', 'translate(0, var(--srm-radius))'],
        ['translate(-3.6rem, 0)', 'translate(calc(var(--srm-radius) * -1), 0)'],
        [
          'transform 140ms cubic-bezier(0.25, 0.85, 0.3, 1.3)',
          'transform var(--srm-open-ms) cubic-bezier(0.25, 0.85, 0.3, 1.3)',
        ],
      ])
      write(path.join(dir, 'demo.css'), css)

      write(
        path.join(dir, 'contract.json'),
        JSON.stringify(
          {
            name: 'shuriken-radial-menu',
            intent:
              'Four-point hub opens into four sectors at N/E/S/W (angles 0/90/180/270) on radius 3.6rem over openMs 260.',
            catalogue: { nr: 'NR-072', ref: 'SPX-2415' },
            copy: {
              system: 'MENU // RADIAL',
              closed: 'CLOSED',
              open: 'OPEN',
              sectors: ['N', 'E', 'S', 'W'],
            },
            geometry: {
              sectorCount: 4,
              anglesDeg: [0, 90, 180, 270],
              radius: '3.6rem',
              hubPx: 48,
            },
            timing: {
              openMs: 260,
              settleMs: 40,
              totalMs: 300,
            },
            colours: {
              ink: '#0C1014',
              parchment: '#D0D6DC',
              chakra: '#8AA0B4',
              olive: '#5A6870',
              off: '#EEF2F4',
              palette: 'wind',
            },
            api: {
              run: 'runShurikenRadialMenu()',
              reset: 'resetShurikenRadialMenu()',
              replay: 'replayShurikenRadialMenu()',
            },
            cssVars: [
              '--srm-open-ms',
              '--srm-settle-ms',
              '--srm-sector-count',
              '--srm-radius',
              '--srm-hub-px',
            ],
            reducedMotion: {
              behaviour: 'Sectors appear open immediately; no rotation',
            },
            acceptance: [
              'Exactly 4 sectors open to anglesDeg [0,90,180,270] at radius 3.6rem in openMs 260',
              'Selecting a sector commits that label; menu can fold closed',
              'No continuous idle spin; reduced motion shows open sectors immediately',
              'Replay closes then re-opens through the same geometry',
            ],
          },
          null,
          2,
        ),
      )

      patchEntry(dir, {
        blurb:
          'A four-point hub opens into N/E/S/W sectors at 3.6rem radius in 260ms — tool palette radial, not a spinning fan HUD.',
        acceptance: [
          '4 sectors at 0/90/180/270° open to 3.6rem radius in 260ms',
          'Selecting a sector commits that label',
          'Reduced motion shows open sectors immediately (no spin)',
        ],
      })
      patchPayload(dir, {
        bg: '#0C1014',
        freezeLine: 'openMs 260 / radius 3.6rem / anglesDeg [0,90,180,270] / sectorCount 4',
      })
      writeSpec(
        dir,
        'Shuriken Radial Menu',
        `An abstract four-point glyph opens into four radial action sectors at fixed bearings, then folds closed.

## Behaviour

- Closed: hub only.
- Open: 4 sectors at 0/90/180/270° on 3.6rem radius (260ms).
- Select: committing a sector updates status.
- Reduced motion: sectors open immediately.

## Freeze

- Open: 260ms · settle: 40ms · radius: 3.6rem · angles: 0/90/180/270
- Palette: \`#0C1014\` / \`#D0D6DC\` / \`#8AA0B4\` / \`#5A6870\` / \`#EEF2F4\``,
      )
    },
  },
  {
    id: 'wire-connection-draw',
    ref: 'SPX-2427',
    title: 'Wire Connection Draw',
    improve(dir) {
      let css = fs.readFileSync(path.join(dir, 'demo.css'), 'utf8')
      css = injectCssVars(
        css,
        'wcd',
        `  --wcd-draw-ms: 180ms;
  --wcd-settle-ms: 80ms;
  --wcd-path-length: 76;
  --wcd-snap-ms: 60ms;`,
      )
      css = replaceAll(css, [
        [
          'stroke-dasharray: 76;\n  stroke-dashoffset: 76;\n  transition: stroke-dashoffset 180ms linear;',
          'stroke-dasharray: var(--wcd-path-length);\n  stroke-dashoffset: var(--wcd-path-length);\n  transition: stroke-dashoffset var(--wcd-draw-ms) linear;',
        ],
      ])
      write(path.join(dir, 'demo.css'), css)

      write(
        path.join(dir, 'contract.json'),
        JSON.stringify(
          {
            name: 'wire-connection-draw',
            intent:
              'SVG wire draws via pathLength 76 in drawMs 180 from node A→B, then endpoints snap/pulse to LINKED in settleMs 80.',
            catalogue: { nr: 'NR-084', ref: 'SPX-2427' },
            copy: {
              system: 'LINK // WIRE',
              unlinked: 'UNLINKED',
              linked: 'LINKED',
            },
            geometry: {
              viewBox: [0, 0, 100, 40],
              line: { x1: 14, y1: 20, x2: 86, y2: 20 },
              pathLength: 76,
            },
            timing: {
              drawMs: 180,
              settleMs: 80,
              snapMs: 60,
              totalMs: 260,
            },
            colours: {
              ink: '#070B0E',
              parchment: '#C8E8DC',
              chakra: '#3DCEA8',
              olive: '#1A6B58',
              off: '#D7F5EC',
              palette: 'sensor',
            },
            api: {
              run: 'runWireConnectionDraw()',
              reset: 'resetWireConnectionDraw()',
              replay: 'replayWireConnectionDraw()',
            },
            cssVars: [
              '--wcd-draw-ms',
              '--wcd-settle-ms',
              '--wcd-path-length',
              '--wcd-snap-ms',
            ],
            reducedMotion: {
              behaviour: 'Fully drawn LINKED wire immediately',
            },
            acceptance: [
              'Wire stroke draws pathLength 76 in drawMs 180 (dashoffset, not fade)',
              'Endpoints pulse then status LINKED after settleMs 80',
              'Replay clears stroke to UNLINKED before re-drawing',
              'Reduced motion (prefers or data-force) shows fully drawn LINKED immediately',
            ],
          },
          null,
          2,
        ),
      )

      patchEntry(dir, {
        blurb:
          'A wire draws pathLength 76 between nodes in 180ms, then endpoints snap to LINKED (80ms) — stroke-draw link, not a fade.',
        acceptance: [
          'Wire draws pathLength 76 in 180ms via dashoffset',
          'Endpoints pulse; LINKED after 80ms settle',
          'Reduced motion shows fully drawn LINKED',
        ],
      })
      patchPayload(dir, {
        bg: '#070B0E',
        freezeLine: 'drawMs 180 / settleMs 80 / pathLength 76',
      })
      writeSpec(
        dir,
        'Wire Connection Draw',
        `A thin wire rapidly draws between two nodes, then both endpoints pulse to confirm a linked connection.

## Behaviour

- Idle: UNLINKED, stroke undrawn.
- Drawing: dashoffset animates pathLength 76 over 180ms.
- Linked: endpoint pulse, status LINKED after 80ms.
- Reduced motion: fully drawn LINKED immediately.

## Freeze

- Draw: 180ms · settle: 80ms · pathLength: 76 · line: (14,20)→(86,20)
- Palette: \`#070B0E\` / \`#C8E8DC\` / \`#3DCEA8\` / \`#1A6B58\` / \`#D7F5EC\``,
      )
    },
  },
  {
    id: 'explosive-tag-countdown',
    ref: 'SPX-2433',
    title: 'Explosive Tag Countdown',
    improve(dir) {
      let css = fs.readFileSync(path.join(dir, 'demo.css'), 'utf8')
      css = injectCssVars(
        css,
        'etc',
        `  --etc-arm-ms: 220ms;
  --etc-step-ms: 480ms;
  --etc-burst-ms: 240ms;
  --etc-settle-ms: 200ms;
  --etc-digits: 3;`,
      )
      // escalate pulse scale per level if not present
      if (!css.includes('data-level=\'3\']')) {
        css = css.replace(
          /\[data-level='2'\][\s\S]*?\{[\s\S]*?\}/,
          (m) => m,
        )
      }
      if (!css.includes('--etc-pulse-scale')) {
        css = css.replace(
          /--etc-digits: 3;/,
          `--etc-digits: 3;
  --etc-pulse-scale: 1;`,
        )
        if (!css.includes("[data-level='1']")) {
          css += `

.etc[data-level='1'] { --etc-pulse-scale: 1.04; }
.etc[data-level='2'] { --etc-pulse-scale: 1.08; }
.etc[data-level='3'] { --etc-pulse-scale: 1.14; }
`
        }
      }
      write(path.join(dir, 'demo.css'), css)

      write(
        path.join(dir, 'contract.json'),
        JSON.stringify(
          {
            name: 'explosive-tag-countdown',
            intent:
              'Tag arms 220ms, counts 3→2→1 at 480ms each with escalating pulse, bursts 240ms, settles CLEAR 200ms.',
            catalogue: { nr: 'NR-090', ref: 'SPX-2433' },
            copy: {
              system: 'TAG // COUNTDOWN',
              idle: 'IDLE',
              armed: 'ARMED',
              clear: 'CLEAR',
              digits: ['3', '2', '1'],
            },
            geometry: {
              digitCount: 3,
              pulseScaleByLevel: [1.04, 1.08, 1.14],
            },
            timing: {
              armMs: 220,
              stepMs: 480,
              burstMs: 240,
              settleMs: 200,
              totalMs: 220 + 480 * 3 + 240 + 200,
            },
            colours: {
              ink: '#0C0806',
              parchment: '#C4B8A8',
              ember: '#E07030',
              danger: '#D94A38',
              soot: '#5A5048',
              off: '#F4F1E8',
              palette: 'fire',
            },
            api: {
              run: 'runExplosiveTagCountdown()',
              reset: 'resetExplosiveTagCountdown()',
              replay: 'replayExplosiveTagCountdown()',
            },
            cssVars: [
              '--etc-arm-ms',
              '--etc-step-ms',
              '--etc-burst-ms',
              '--etc-settle-ms',
              '--etc-digits',
              '--etc-pulse-scale',
            ],
            reducedMotion: {
              behaviour: 'CLEAR immediately; no arm/count/burst',
            },
            acceptance: [
              'Arm armMs 220 then digits 3→2→1 each stepMs 480 with escalating pulseScale 1.04/1.08/1.14',
              'Burst burstMs 240 then CLEAR after settleMs 200',
              'Replay returns to IDLE before re-arming',
              'Reduced motion (prefers or data-force) shows CLEAR immediately with animations disabled',
            ],
          },
          null,
          2,
        ),
      )

      patchEntry(dir, {
        blurb:
          'Tag arms 220ms, counts 3→2→1 at 480ms with escalating pulse (1.04→1.14), bursts 240ms, then CLEAR — abstract warning tag, no copyrighted iconography.',
        acceptance: [
          'Arm 220ms then digits 3→2→1 at 480ms each (pulse 1.04/1.08/1.14)',
          'Burst 240ms then CLEAR settle 200ms',
          'Reduced motion shows CLEAR immediately',
        ],
      })
      patchPayload(dir, {
        bg: '#0C0806',
        freezeLine: 'armMs 220 / stepMs 480 / burstMs 240 / settleMs 200',
      })
      writeSpec(
        dir,
        'Explosive Tag Countdown',
        `An attached warning tag arms, counts 3-2-1 through increasingly urgent pulses, detonates, and settles cleared.

## Behaviour

- Idle → Arm (220ms).
- Countdown: 3 → 2 → 1 at 480ms each with rising pulse scale.
- Burst 240ms → CLEAR after settle 200ms.
- Reduced motion: CLEAR immediately.

## Freeze

- Arm: 220ms · step: 480ms · burst: 240ms · settle: 200ms · pulse: 1.04/1.08/1.14
- Palette: \`#0C0806\` / \`#C4B8A8\` / \`#E07030\` / \`#D94A38\` / \`#5A5048\` / \`#F4F1E8\``,
      )
    },
  },
]

// Skip already-improved if present as CLI filter
const only = process.argv.slice(2)
const list = only.length ? SPECS.filter((s) => only.includes(s.id)) : SPECS

for (const spec of list) {
  const dir = path.join(ROOT, spec.id)
  if (!fs.existsSync(dir)) {
    console.warn('missing', spec.id)
    continue
  }
  console.log('improving', spec.id)
  spec.improve(dir)
  syncTwin(dir)
  commit(dir, spec.ref, spec.title)
}

console.log('done', list.length)
