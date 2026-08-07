/**
 * Wave 2b deep metaphor pass for remaining Naruto specimens.
 * One Improve commit per specimen. Does not push.
 */
import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'

const ROOT = path.resolve('src/specimens/library/naruto')

function write(p, s) {
  fs.writeFileSync(p, s.endsWith('\n') ? s : `${s}\n`)
}

function syncTwin(dir) {
  write(path.join(dir, 'demo.style.txt'), fs.readFileSync(path.join(dir, 'demo.css'), 'utf8'))
}

function commit(dir, ref, title, why) {
  const rel = path.relative(process.cwd(), dir).replace(/\\/g, '/')
  execSync(`git add -- "${rel}"`, { stdio: 'pipe' })
  // PowerShell-safe multi-line via -m twice
  const msg = `Improve ${ref} ${title}.`
  const body = why
  execSync(`git commit -m ${JSON.stringify(msg)} -m ${JSON.stringify(body)}`, {
    stdio: 'inherit',
  })
  console.log('committed', msg)
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
  if (intensity) {
    s = s.replace(/intensity: '[^']*'/, `intensity: '${intensity}'`)
  }
  write(path.join(dir, 'entry.ts'), s)
}

function patchPayload(dir, { bg, freezeLine }) {
  let s = fs.readFileSync(path.join(dir, 'payload.ts'), 'utf8')
  if (!s.includes('acceptance: contract.acceptance')) {
    s = s.replace(/acceptance:\s*\[[\s\S]*?\],/, 'acceptance: contract.acceptance,')
  }
  if (bg) {
    s = s.replace(/background:#[0-9A-Fa-f]{6}/, `background:${bg}`)
  }
  if (freezeLine) {
    if (/Import demo\.css verbatim;[^']*'/.test(s)) {
      s = s.replace(
        /Import demo\.css verbatim;[^']*'/,
        `Import demo.css verbatim; freeze ${freezeLine} from contract.json.'`,
      )
    }
  }
  write(path.join(dir, 'payload.ts'), s)
}

const results = { committed: [], failed: [], skipped: [] }

// ——— 1. water-wave-page-transition ———
{
  const id = 'water-wave-page-transition'
  const dir = path.join(ROOT, id)
  try {
    let css = fs.readFileSync(path.join(dir, 'demo.css'), 'utf8')
    css = css.replace(/\s*\/\* wave2 timing surface \*\//g, '')
    if (!css.includes('--wwt-total-ms')) {
      css = css.replace(
        /(--off: #[^;]+;)/,
        `$1
  --wwt-total-ms: 650ms;
  --wwt-swap-at-ms: 320ms;
  --wwt-settle-ms: 150ms;
  --wwt-start-x: -108%;
  --wwt-end-x: 108%;`,
      )
    }
    css = css
      .replace(
        /animation: wwt-sweep 650ms cubic-bezier\(0\.4, 0, 0\.2, 1\) both;/g,
        'animation: wwt-sweep var(--wwt-total-ms) cubic-bezier(0.4, 0, 0.2, 1) both;',
      )
      .replace(
        /animation: wwt-sweep-foam 650ms cubic-bezier\(0\.4, 0, 0\.2, 1\) both;/g,
        'animation: wwt-sweep-foam var(--wwt-total-ms) cubic-bezier(0.4, 0, 0.2, 1) both;',
      )
      .replace(/transform: translateX\(-108%\);/g, 'transform: translateX(var(--wwt-start-x));')
      .replace(/transform: translateX\(108%\);/g, 'transform: translateX(var(--wwt-end-x));')

    // Freeze clip-path morph steps on the wave edge (primary language, not fade)
    if (!css.includes('@keyframes wwt-edge')) {
      css = css.replace(
        `@keyframes wwt-sweep {
  0% {
    transform: translateX(var(--wwt-start-x));
  }
  100% {
    transform: translateX(var(--wwt-end-x));
  }
}`,
        `@keyframes wwt-sweep {
  0% {
    transform: translateX(var(--wwt-start-x));
    clip-path: polygon(
      0% 0%, 12% 0%, 18% 12%, 10% 28%, 22% 44%, 8% 60%, 24% 76%, 10% 92%, 16% 100%, 0% 100%
    );
  }
  50% {
    transform: translateX(0%);
    clip-path: polygon(
      0% 0%, 58% 0%, 70% 9%, 62% 20%, 76% 32%, 64% 46%, 80% 58%, 66% 71%, 82% 84%, 64% 100%, 0% 100%
    );
  }
  100% {
    transform: translateX(var(--wwt-end-x));
    clip-path: polygon(
      0% 0%, 58% 0%, 70% 9%, 62% 20%, 76% 32%, 64% 46%, 80% 58%, 66% 71%, 82% 84%, 64% 100%, 0% 100%
    );
  }
}`,
      )
    }
    write(path.join(dir, 'demo.css'), css)

    let js = fs.readFileSync(path.join(dir, 'demo.js'), 'utf8')
    if (!js.includes('void runWaterWavePageTransition()') || !js.includes('requestAnimationFrame')) {
      js = js.replace(
        /bindUi\(\)\s*\nresetWaterWavePageTransition\(\)/,
        `bindUi()
resetWaterWavePageTransition()
requestAnimationFrame(() => {
  void runWaterWavePageTransition()
})`,
      )
      write(path.join(dir, 'demo.js'), js)
    }

    write(
      path.join(dir, 'contract.json'),
      JSON.stringify(
        {
          name: 'water-wave-page-transition',
          intent:
            'Cool-cyan water wave wipe sweeps -108%→108% in 650ms; page identity swaps at 320ms under cover. Clip-path edge steps frozen — distinct from wind blades.',
          catalogue: { nr: 'NR-108', ref: 'SPX-2451' },
          copy: {
            system: 'WIPE // WATER WAVE',
            pageA: 'PAGE 01',
            pageB: 'PAGE 02',
          },
          geometry: {
            startX: '-108%',
            endX: '108%',
            foamWidthPx: 6,
            clipSteps: [
              'polygon(0% 0%, 12% 0%, 18% 12%, 10% 28%, 22% 44%, 8% 60%, 24% 76%, 10% 92%, 16% 100%, 0% 100%)',
              'polygon(0% 0%, 58% 0%, 70% 9%, 62% 20%, 76% 32%, 64% 46%, 80% 58%, 66% 71%, 82% 84%, 64% 100%, 0% 100%)',
            ],
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
            'Wave body travels startX -108% → endX 108% over totalMs 650 with frozen jagged clipSteps (not opacity fade)',
            'Page identity swaps at swapAtMs 320 mid-sweep; settleMs 150 after',
            'Water cyan palette (#3A9EC9) distinct from wind steel',
            'Reduced motion (prefers or data-force) swaps instantly with wave animations disabled',
          ],
        },
        null,
        2,
      ),
    )

    patchEntry(dir, {
      blurb:
        'A cool-cyan jagged wave clip sweeps −108%→108% in 650ms, swapping page identity at 320ms — water wipe, distinct from wind blades.',
      acceptance: [
        'Wave sweeps -108%→108% in 650ms with frozen clipSteps',
        'Page swaps at 320ms under cover; water cyan ≠ wind steel',
        'Reduced motion instant page swap',
      ],
      reducedMotionNote:
        'Under prefers-reduced-motion or data-force-reduced-motion, the page swaps immediately with no wave sweep.',
    })
    patchPayload(dir, {
      bg: '#071018',
      freezeLine: 'totalMs 650 / swapAtMs 320 / settleMs 150 / clipSteps (2 polygons)',
    })
    write(
      path.join(dir, 'spec.md'),
      `# Water Wave Page Transition

A jagged cool-cyan wave mask sweeps horizontally across the stage, exchanging page content mid-sweep.

## Behaviour

- Idle: PAGE 01 visible.
- Sweep: wave + foam travel −108% → 108% (650ms) with frozen edge clipSteps.
- Swap: at 320ms under the wave, page identity flips.
- Settled after settle 150ms.
- Reduced motion: instant swap.

## Freeze

- Total: 650ms · swapAt: 320ms · settle: 150ms · travel: −108%→108%
- Palette: \`#071018\` / \`#C8D8E4\` / \`#3A9EC9\` / \`#4A6A78\` / \`#E8F2F8\`
`,
    )
    syncTwin(dir)
    commit(
      dir,
      'SPX-2451',
      'Water Wave Page Transition',
      'Freeze jagged water clipSteps and travel vars so the wipe reads as a distinct cool-cyan wave, not a soft fade or wind cut.',
    )
    results.committed.push('SPX-2451 water-wave-page-transition')
  } catch (e) {
    console.error(id, e)
    results.failed.push(`${id}: ${e.message}`)
  }
}

// ——— 2. wind-slice-transition ———
{
  const id = 'wind-slice-transition'
  const dir = path.join(ROOT, id)
  try {
    let css = fs.readFileSync(path.join(dir, 'demo.css'), 'utf8')
    css = css.replace(/\s*\/\* wave2 timing surface \*\//g, '')
    if (!css.includes('--wst-blade-ms')) {
      css = css.replace(
        /(--off: #[^;]+;)/,
        `$1
  --wst-total-ms: 600ms;
  --wst-swap-at-ms: 420ms;
  --wst-settle-ms: 150ms;
  --wst-blade-ms: 380ms;
  --wst-stagger-ms: 70ms;
  --wst-blade-count: 4;
  --wst-skew-1: -22deg;
  --wst-skew-2: -16deg;
  --wst-skew-3: -10deg;
  --wst-skew-4: -4deg;`,
      )
    }
    css = css.replace(
      /\.wst__blade \{\n  position: absolute;\n  top: 0;\n  width: 30%;\n  height: 100%;\n  transform: skewX\([^)]+\) translateX\(-220%\);\n  opacity: 0;\n\}/,
      `.wst__blade {
  position: absolute;
  top: 0;
  width: 30%;
  height: 100%;
  transform: skewX(var(--wst-skew-deg, -16deg)) translateX(-220%);
  opacity: 0;
  clip-path: polygon(0 0, 72% 0, 100% 50%, 72% 100%, 0 100%, 16% 50%);
}`,
    )
    // per-blade skew
    css = css
      .replace(
        /\.wst__blade--1 \{\n  left: 0%;\n  background:[^;]+;\n\}/,
        `.wst__blade--1 {
  left: 0%;
  --wst-skew-deg: var(--wst-skew-1);
  background: linear-gradient(100deg, var(--off), var(--olive) 70%);
}`,
      )
      .replace(
        /\.wst__blade--2 \{\n  left: 22%;\n  background:[^;]+;\n\}/,
        `.wst__blade--2 {
  left: 22%;
  --wst-skew-deg: var(--wst-skew-2);
  background: linear-gradient(100deg, var(--parchment), var(--olive) 75%);
}`,
      )
      .replace(
        /\.wst__blade--3 \{\n  left: 44%;\n  background:[^;]+;\n\}/,
        `.wst__blade--3 {
  left: 44%;
  --wst-skew-deg: var(--wst-skew-3);
  background: linear-gradient(100deg, var(--off), var(--olive) 65%);
}`,
      )
      .replace(
        /\.wst__blade--4 \{\n  left: 66%;\n  background:[^;]+;\n\}/,
        `.wst__blade--4 {
  left: 66%;
  --wst-skew-deg: var(--wst-skew-4);
  background: linear-gradient(100deg, var(--parchment), var(--olive) 70%);
}`,
      )

    css = css
      .replace(
        /animation: wst-slice 380ms cubic-bezier\(0\.6, 0, 0\.35, 1\) both;/g,
        'animation: wst-slice var(--wst-blade-ms) cubic-bezier(0.6, 0, 0.35, 1) both;',
      )
      .replace(
        /\.wst\[data-phase='run'\] \.wst__blade--2 \{[\s\S]*?animation-delay: 70ms;/,
        (m) => m.replace('animation-delay: 70ms;', 'animation-delay: var(--wst-stagger-ms);'),
      )
      .replace(
        /\.wst\[data-phase='run'\] \.wst__blade--3 \{[\s\S]*?animation-delay: 140ms;/,
        (m) =>
          m.replace(
            'animation-delay: 140ms;',
            'animation-delay: calc(var(--wst-stagger-ms) * 2);',
          ),
      )
      .replace(
        /\.wst\[data-phase='run'\] \.wst__blade--4 \{[\s\S]*?animation-delay: 210ms;/,
        (m) =>
          m.replace(
            'animation-delay: 210ms;',
            'animation-delay: calc(var(--wst-stagger-ms) * 3);',
          ),
      )
      .replace(/skewX\(-16deg\)/g, 'skewX(var(--wst-skew-deg, -16deg))')

    write(path.join(dir, 'demo.css'), css)

    let html = fs.readFileSync(path.join(dir, 'demo.html'), 'utf8')
    html = html.replace('WIPE // WIND SLICE', 'CUT // WIND SLICE')
    write(path.join(dir, 'demo.html'), html)

    let js = fs.readFileSync(path.join(dir, 'demo.js'), 'utf8')
    if (!js.includes('requestAnimationFrame')) {
      js = js.replace(
        /bindUi\(\)\s*\nresetWindSliceTransition\(\)/,
        `bindUi()
resetWindSliceTransition()
requestAnimationFrame(() => {
  void runWindSliceTransition()
})`,
      )
      write(path.join(dir, 'demo.js'), js)
    }

    write(
      path.join(dir, 'contract.json'),
      JSON.stringify(
        {
          name: 'wind-slice-transition',
          intent:
            'Four clipped steel blades at skewDeg [-22,-16,-10,-4] sweep with staggerMs 70; content swaps at swapAtMs 420.',
          catalogue: { nr: 'NR-115', ref: 'SPX-2458' },
          copy: {
            system: 'CUT // WIND SLICE',
            stateA: 'STATE 01',
            stateB: 'STATE 02',
          },
          geometry: {
            bladeCount: 4,
            bladeDeg: [-22, -16, -10, -4],
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
            '--wst-skew-1',
            '--wst-skew-2',
            '--wst-skew-3',
            '--wst-skew-4',
          ],
          reducedMotion: {
            behaviour: 'Instant content swap; blades suppressed',
          },
          acceptance: [
            'Exactly bladeCount 4 blades at bladeDeg [-22,-16,-10,-4] with staggerMs 70',
            'Each blade runs bladeMs 380 with clip-path polygon; content swaps at swapAtMs 420',
            'Wind steel palette distinct from water cyan; motion is blade travel not fade',
            'Reduced motion (prefers or data-force) swaps instantly with animations disabled',
          ],
        },
        null,
        2,
      ),
    )

    patchEntry(dir, {
      blurb:
        'Four clipped steel blades at −22/−16/−10/−4° sweep with a 70ms stagger (380ms each); content swaps at 420ms — wind cut, not water wave.',
      acceptance: [
        '4 blades at [-22,-16,-10,-4]° with 70ms stagger',
        'Content swaps at 420ms; clip-path blades not fade',
        'Reduced motion instant swap',
      ],
    })
    patchPayload(dir, {
      bg: '#0C1014',
      freezeLine: 'bladeCount 4 / bladeDeg [-22,-16,-10,-4] / staggerMs 70 / swapAtMs 420',
    })
    write(
      path.join(dir, 'spec.md'),
      `# Wind Slice Transition

Four staggered diagonal blades sweep across the stage, exchanging content mid-sweep.

## Behaviour

- Idle: STATE 01 visible.
- Slice: 4 clipped blades at −22/−16/−10/−4°, staggered 70ms, each 380ms.
- Swap: at 420ms under blades, content flips.
- Settled after total 600ms + settle 150ms.
- Reduced motion: instant swap.

## Freeze

- Total: 600ms · swapAt: 420ms · blade: 380ms · stagger: 70ms · blades: 4 · deg: −22/−16/−10/−4
- Palette: \`#0C1014\` / \`#D0D6DC\` / \`#8AA0B4\` / \`#5A6870\` / \`#EEF2F4\`
`,
    )
    syncTwin(dir)
    commit(
      dir,
      'SPX-2458',
      'Wind Slice Transition',
      'Freeze per-blade skew angles and staggered clip-path cuts so the wipe reads as wind steel, not a water wave or opacity fade.',
    )
    results.committed.push('SPX-2458 wind-slice-transition')
  } catch (e) {
    console.error(id, e)
    results.failed.push(`${id}: ${e.message}`)
  }
}

console.log(JSON.stringify(results, null, 2))
