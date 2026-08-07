/**
 * Wave 2b part 2 — body-flicker, high-speed polish, teleport, shuriken, shadow-bind
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

// ——— body-flicker-page-jump ———
{
  const id = 'body-flicker-page-jump'
  const dir = path.join(ROOT, id)
  try {
    write(
      path.join(dir, 'demo.css'),
      `/* SPX-2409 Body Flicker Page Jump — portable contract. */

.bfp {
  --ink: #0c1014;
  --parchment: #d0d6dc;
  --chakra: #8aa0b4;
  --olive: #5a6870;
  --off: #eef2f4;
  --bfp-flicker-ms: 140ms;
  --bfp-settle-ms: 90ms;
  --bfp-streak-count: 5;
  --bfp-streak-angle: 0deg;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  width: 100%;
  min-height: 280px;
  padding: 0.85rem 0.7rem;
  background: var(--ink);
  color: var(--off);
  font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif;
}

.bfp *,
.bfp *::before,
.bfp *::after {
  box-sizing: border-box;
}

.bfp__live {
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

.bfp__system {
  margin: 0;
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--chakra);
}

.bfp__stage {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  width: 100%;
  padding: 1rem 0.75rem;
  border: 1px solid color-mix(in srgb, var(--chakra) 45%, transparent);
  background: rgb(238 242 244 / 0.04);
}

.bfp__viewport {
  position: relative;
  overflow: hidden;
  width: 100%;
  min-height: 120px;
  border: 1.5px solid var(--olive);
  background: rgb(16 19 24 / 0.9);
}

.bfp__view {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;
  text-align: center;
}

.bfp__view-kicker {
  margin: 0;
  font-size: 0.58rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--olive);
}

.bfp__view-title {
  margin: 0;
  font-size: 1rem;
  font-weight: 800;
  color: var(--off);
}

.bfp[data-phase='flickering'] .bfp__view--a {
  visibility: hidden;
}

.bfp[data-phase='arrived'] .bfp__view-kicker,
.bfp[data-phase='settling'] .bfp__view-kicker {
  color: var(--chakra);
}

.bfp__streaks {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  opacity: 0;
  pointer-events: none;
}

.bfp__streak {
  display: block;
  height: 2px;
  width: 100%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--chakra) 40%,
    var(--off) 50%,
    var(--chakra) 60%,
    transparent 100%
  );
  transform: scaleX(0) rotate(var(--bfp-streak-angle));
  transform-origin: left center;
}

.bfp__streak--1 { --bfp-streak-angle: -6deg; }
.bfp__streak--2 { --bfp-streak-angle: -2deg; }
.bfp__streak--3 { --bfp-streak-angle: 0deg; }
.bfp__streak--4 { --bfp-streak-angle: 3deg; }
.bfp__streak--5 { --bfp-streak-angle: 7deg; }

.bfp[data-phase='flickering'] .bfp__streaks {
  opacity: 1;
  animation: bfp-streak-flash var(--bfp-flicker-ms) steps(3, end);
}

.bfp[data-phase='flickering'] .bfp__streak {
  animation: bfp-streak-sweep var(--bfp-flicker-ms) linear;
}

.bfp[data-phase='settling'] .bfp__streaks {
  opacity: 1;
  animation: bfp-streak-fade var(--bfp-settle-ms) ease-out forwards;
}

@keyframes bfp-streak-flash {
  0%,
  100% { opacity: 1; }
  50% { opacity: 0.45; }
}

@keyframes bfp-streak-sweep {
  0% { transform: scaleX(0) rotate(var(--bfp-streak-angle)); }
  55% { transform: scaleX(1.05) rotate(var(--bfp-streak-angle)); }
  100% { transform: scaleX(1) rotate(var(--bfp-streak-angle)); }
}

@keyframes bfp-streak-fade {
  from { opacity: 1; }
  to { opacity: 0; }
}

.bfp__status {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 900;
  letter-spacing: 0.14em;
  color: var(--parchment);
}

.bfp[data-phase='flickering'] .bfp__status,
.bfp[data-phase='arrived'] .bfp__status,
.bfp[data-phase='settling'] .bfp__status {
  color: var(--chakra);
}

.bfp__hint {
  margin: 0;
  font-size: 0.68rem;
  letter-spacing: 0.04em;
  color: var(--olive);
  text-align: center;
}

.bfp__controls {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.bfp__btn {
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

.bfp__btn--primary {
  border-color: var(--chakra);
  background: color-mix(in srgb, var(--chakra) 28%, transparent);
}

.bfp__btn:hover:not(:disabled) {
  border-color: var(--parchment);
}

.bfp__btn:focus-visible {
  outline: 2px solid var(--chakra);
  outline-offset: 2px;
}

.bfp__btn:disabled {
  opacity: 0.45;
  cursor: default;
}

@media (prefers-reduced-motion: reduce) {
  .bfp__streaks,
  .bfp__streak {
    animation: none !important;
  }
}

html[data-force-reduced-motion='true'] .bfp__streaks,
html[data-force-reduced-motion='true'] .bfp__streak {
  animation: none !important;
}
`,
    )

    write(
      path.join(dir, 'demo.html'),
      `<div class="bfp" data-bfp data-phase="idle">
  <p class="bfp__live" data-bfp-live aria-live="polite">
    Idle. Viewing HOME.
  </p>

  <p class="bfp__system">JUMP // BODY FLICKER</p>

  <div class="bfp__stage" data-bfp-stage>
    <div class="bfp__viewport" data-bfp-viewport>
      <div class="bfp__view bfp__view--a" data-bfp-view-a>
        <p class="bfp__view-kicker">HOME</p>
        <p class="bfp__view-title">Overview</p>
      </div>
      <div class="bfp__view bfp__view--b" data-bfp-view-b hidden>
        <p class="bfp__view-kicker">DESTINATION</p>
        <p class="bfp__view-title">Mission Board</p>
      </div>

      <div class="bfp__streaks" data-bfp-streaks aria-hidden="true">
        <span class="bfp__streak bfp__streak--1"></span>
        <span class="bfp__streak bfp__streak--2"></span>
        <span class="bfp__streak bfp__streak--3"></span>
        <span class="bfp__streak bfp__streak--4"></span>
        <span class="bfp__streak bfp__streak--5"></span>
      </div>
    </div>

    <p class="bfp__status" data-bfp-status>HOME</p>
    <p class="bfp__hint" data-bfp-hint>Press Run to jump to Mission Board.</p>
  </div>

  <div class="bfp__controls">
    <button type="button" class="bfp__btn bfp__btn--primary" data-bfp-run>Run</button>
    <button type="button" class="bfp__btn" data-bfp-replay>Replay</button>
  </div>
</div>
`,
    )

    write(
      path.join(dir, 'contract.json'),
      JSON.stringify(
        {
          name: 'body-flicker-page-jump',
          intent:
            'Five directional streaks compress the source view in flickerMs 140 (scaleX, not fade), then destination identity appears after settleMs 90.',
          catalogue: { nr: 'NR-066', ref: 'SPX-2409' },
          copy: {
            system: 'JUMP // BODY FLICKER',
            origin: 'HOME',
            destination: 'MISSION BOARD',
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
            'Exactly 5 streaks at angles [-6,-2,0,3,7] fire for flickerMs 140 via scaleX (not opacity fade-as-travel)',
            'Origin view is hidden mid-flicker; destination identity after settleMs 90',
            'Replay returns to HOME before re-jumping',
            'Reduced motion (prefers or data-force) shows destination immediately with animations disabled',
          ],
        },
        null,
        2,
      ),
    )

    // keep JS mostly same — just ensure swap hides a during flicker (CSS handles) and auto-play
    let js = fs.readFileSync(path.join(dir, 'demo.js'), 'utf8')
    js = js.replace(/\/\* wave2-polish \*\//g, '')
    if (!js.includes('requestAnimationFrame')) {
      js = js.replace(
        /bindUi\(\)\s*\nresetBodyFlickerPageJump\(\)/,
        `bindUi()
resetBodyFlickerPageJump()
requestAnimationFrame(() => {
  void runBodyFlickerPageJump()
})`,
      )
    }
    write(path.join(dir, 'demo.js'), js)

    patchEntry(dir, {
      blurb:
        'Five directional streaks (−6°…7°) compress the view in 140ms, then Mission Board snaps in after 90ms — body-flicker jump, no fade-as-travel.',
      acceptance: [
        '5 streaks at [-6,-2,0,3,7]° fire for 140ms (scaleX)',
        'Origin hidden mid-flicker; destination after 90ms',
        'Reduced motion shows destination immediately',
      ],
      reducedMotionNote:
        'Under prefers-reduced-motion or data-force-reduced-motion, the destination view appears immediately with no streaks.',
    })
    patchPayload(dir, {
      bg: '#0C1014',
      freezeLine: 'flickerMs 140 / settleMs 90 / streakCount 5 / angles [-6,-2,0,3,7]',
    })
    write(
      path.join(dir, 'spec.md'),
      `# Body Flicker Page Jump

The current view flickers into compressed directional streaks, then hands off abruptly to a new destination view.

## Behaviour

- Idle: HOME / Overview.
- Flickering: 5 angled streaks sweep 140ms; origin hidden.
- Settling: streaks clear 90ms; Mission Board identity visible.
- Reduced motion: destination immediately.

## Freeze

- Flicker: 140ms · settle: 90ms · streaks: 5 · angles: −6/−2/0/3/7°
- Palette: \`#0C1014\` / \`#D0D6DC\` / \`#8AA0B4\` / \`#5A6870\` / \`#EEF2F4\`
`,
    )
    syncTwin(dir)
    commit(
      dir,
      'SPX-2409',
      'Body Flicker Page Jump',
      'Replace fade-as-travel with five frozen-angle scaleX streaks and a mid-flicker origin hide so destination identity snaps in.',
    )
  } catch (e) {
    console.error(id, e)
    results.failed.push(`${id}: ${e.message}`)
  }
}

// ——— high-speed-card-relocation polish ———
{
  const id = 'high-speed-card-relocation'
  const dir = path.join(ROOT, id)
  try {
    let css = fs.readFileSync(path.join(dir, 'demo.css'), 'utf8')
    const before = css
    css = css.replace(/\s*\/\* wave2-polish \*\//g, '')
    css = css.replace(/--hcr-path-pct: 50;/, '--hcr-path-pct: 100;')
    if (css === before && !css.includes('wave2')) {
      // still update contract path if needed
    }
    write(path.join(dir, 'demo.css'), css)

    let contract = JSON.parse(fs.readFileSync(path.join(dir, 'contract.json'), 'utf8'))
    contract.geometry = {
      ...(contract.geometry || {}),
      ghostCount: 2,
      ghostLeftPct: [0, 25],
      pathPct: 100,
      cardAbsentMidTravel: true,
    }
    if (contract.colours) contract.colours.palette = 'wind'
    write(path.join(dir, 'contract.json'), JSON.stringify(contract, null, 2))

    patchEntry(dir, {
      blurb:
        'The card is absent mid-travel while two afterimages at 0%/25% mark a 100% path (200ms), then docks in slot B.',
      acceptance: [
        'Card absent mid-travel; 2 afterimages at 0%/25%',
        'Path length frozen at 100%; docks in slot B after 200ms',
        'Reduced motion places card in slot B immediately',
      ],
    })
    patchPayload(dir, {
      bg: '#0C1014',
      freezeLine: 'travelMs 200 / ghostCount 2 / leftPct [0,25] / pathPct 100',
    })
    syncTwin(dir)
    commit(
      dir,
      'SPX-2410',
      'High-Speed Card Relocation',
      'Strip batch polish markers and freeze pathPct 100 with mid-travel card absence so afterimages alone mark the path.',
    )
  } catch (e) {
    console.error(id, e)
    results.failed.push(`${id}: ${e.message}`)
  }
}

console.log(JSON.stringify(results, null, 2))
