/**
 * Apply flat contracts + entry/spec/payload + CSS timing vars + key metaphor patches
 * for the 18 Naruto wave-2c specimens. One run updates working tree; commits are separate.
 */
import { readFileSync, writeFileSync, copyFileSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = 'src/specimens/library/naruto'
const PAPER = {
  ink: '#1A1612',
  parchment: '#EBE2D0',
  chakra: '#B83228',
  olive: '#6A5E4E',
  off: '#F7F2E8',
  palette: 'mission-paper',
}
const SENSOR = {
  ink: '#070B0E',
  parchment: '#C8E8DC',
  chakra: '#3DCEA8',
  olive: '#1A6B58',
  off: '#D7F5EC',
  palette: 'sensor-phosphor',
}

const d = (id) => join(ROOT, id)
const w = (id, f, c) => writeFileSync(join(d(id), f), c.endsWith('\n') ? c : c + '\n')
const r = (id, f) => readFileSync(join(d(id), f), 'utf8')
const sync = (id) => copyFileSync(join(d(id), 'demo.css'), join(d(id), 'demo.style.txt'))

function injectAfterOff(css, root, lines) {
  if (!lines?.length || css.includes(lines[0])) return css
  const re = new RegExp(`(\\.${root}\\s*\\{[\\s\\S]*?--off:\\s*[^;]+;)`)
  return re.test(css) ? css.replace(re, `$1\n${lines.join('\n')}`) : css
}

function updatePayload(id, bg) {
  let src = r(id, 'payload.ts')
  src = src.replace(/acceptance:\s*\[[\s\S]*?\],/, 'acceptance: contract.acceptance,')
  src = src.replace(/background:#[0-9a-fA-F]{3,8}/gi, `background:${bg}`)
  w(id, 'payload.ts', src)
}

function writeEntry(e) {
  const acc = e.acceptance.map((a) => `    '${a.replace(/'/g, "\\'")}',`).join('\n')
  let preview = ''
  for (const [k, v] of Object.entries(e.preview)) {
    if (typeof v === 'string' && v.includes('<')) preview += `    ${k}: \`${v}\`,\n`
    else if (typeof v === 'string') preview += `    ${k}: '${v}',\n`
    else preview += `    ${k}: ${v},\n`
  }
  w(
    e.id,
    'entry.ts',
    `import type { Specimen } from '../../../types'

export const ${e.exportName}: Specimen = {
  id: '${e.id}',
  ref: '${e.ref}',
  title: '${e.title}',
  blurb:
    '${e.blurb.replace(/'/g, "\\'")}',
  origin: {
    project: 'Original',
    surface: '${e.surface.replace(/'/g, "\\'")}',
  },
  facets: {
    kind: '${e.kind}',
    tech: 'tiny-js',
    scope: 'card',
    intensity: '${e.intensity}',
  },
  inspiredBy: {
    franchise: 'naruto',
  },
  tags: ${JSON.stringify(e.tags)},
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      '${e.rm.replace(/'/g, "\\'")}',
  },
  acceptance: [
${acc}
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
${preview.trimEnd()}
  },
}
`,
  )
}

function applyMeta(s) {
  w(s.id, 'contract.json', JSON.stringify(s.contract, null, 2) + '\n')
  writeEntry(s.entry)
  w(s.id, 'spec.md', s.spec)
  let css = r(s.id, 'demo.css')
  css = injectAfterOff(css, s.root, s.cssVars)
  w(s.id, 'demo.css', css)
  if (s.patch) s.patch()
  updatePayload(s.id, s.bg)
  sync(s.id)
}

const CATALOG = []

function add(s) {
  CATALOG.push(s)
}

// ─── 1 mission-rank-reveal ─────────────────────────────────────────
add({
  id: 'mission-rank-reveal',
  ref: 'SPX-2534',
  title: 'Mission Rank Reveal',
  why: 'Rank glyph slams 56px then wax stamp settles at -12°, transform-led not opacity fade.',
  bg: PAPER.ink,
  root: 'mrr',
  cssVars: [
    '  --mrr-card-ms: 280ms;',
    '  --mrr-stamp-ms: 240ms;',
    '  --mrr-travel-y: 56px;',
    '  --mrr-approach-deg: -8deg;',
    '  --mrr-stamp-approach-deg: -18deg;',
    '  --mrr-stamp-settle-deg: -12deg;',
    '  --mrr-stamp-approach-scale: 2.4;',
  ],
  contract: {
    name: 'mission-rank-reveal',
    intent:
      'Rank glyph card slams into the briefing with a frozen overshoot, then a wax stamp settles at a fixed angle to confirm.',
    catalogue: { nr: 'NR-191', ref: 'SPX-2534' },
    copy: {
      system: 'RANK // REVEAL',
      idle: 'PENDING',
      confirmed: 'RANK CONFIRMED',
      stamp: 'CONFIRMED',
      rank: 'B',
    },
    geometry: {
      cardTravelYPx: 56,
      cardApproachDeg: -8,
      stampApproachScale: 2.4,
      stampApproachDeg: -18,
      stampSettleDeg: -12,
    },
    timing: { cardMs: 280, stampMs: 240, settleMs: 100, totalMs: 620 },
    colours: { ...PAPER, alert: PAPER.chakra },
    api: {
      run: 'runMissionRankReveal()',
      reset: 'resetMissionRankReveal()',
      replay: 'replayMissionRankReveal()',
    },
    reducedMotion: {
      behaviour: 'Card and stamp appear already settled at RANK CONFIRMED',
    },
    acceptance: [
      'Rank B card travels 56px down from approachDeg -8 — transform-led, not opacity-only',
      'Stamp approaches at scale 2.4 / -18° then settles at -12° over stampMs 240',
      'Status reaches RANK CONFIRMED only after stamp settleMs 100',
      'Replay clears both data-visible flags before rerunning',
      'Reduced motion (prefers or data-force) shows settled card + stamp immediately',
    ],
  },
  entry: {
    id: 'mission-rank-reveal',
    exportName: 'missionRankReveal',
    ref: 'SPX-2534',
    title: 'Mission Rank Reveal',
    blurb:
      'Rank B glyph slams 56px into the briefing, then a wax stamp settles at -12° to confirm.',
    surface: 'Naruto / mission system — briefing rank reveal',
    kind: 'transition',
    intensity: 'graphic',
    tags: ['rank', 'stamp', 'briefing'],
    rm: 'Under prefers-reduced-motion or data-force-reduced-motion, the rank card and stamp appear already settled at RANK CONFIRMED.',
    acceptance: [
      'Card travels 56px from -8°; stamp settles at -12° after stampMs 240',
      'RANK CONFIRMED only after settleMs 100',
      'Reduced motion shows settled card + stamp immediately',
    ],
    preview: { width: 420, height: 340, background: 'dark', label: 'Mission rank reveal' },
  },
  spec: `# Mission Rank Reveal

Rank **B** glyph slams into the briefing with a frozen overshoot, then a wax stamp settles at **-12°**.

## Behaviour

- Idle: no card, no stamp, status \`PENDING\`.
- Briefing: card travels 56px down from -8° (transform-led).
- Stamping: stamp approaches ×2.4 / -18°, settles at -12°.
- Resolved: \`RANK CONFIRMED\`.
- Reduced motion: settled immediately.

## Freeze

- Card: 280ms · travelY: 56px · approach: -8°
- Stamp: 240ms · approach: -18° / ×2.4 · settle: -12° · hold: 100ms
- Palette (mission paper): \`#1A1612\` / \`#EBE2D0\` / \`#B83228\` / \`#6A5E4E\` / \`#F7F2E8\`
`,
  patch() {
    const id = 'mission-rank-reveal'
    let css = r(id, 'demo.css')
    css = css.replace(
      /  opacity: 0;\n  transform: translateY\(-70px\) rotate\(-6deg\) scale\(0\.9\);\n  transition:\n    opacity 220ms ease-out,\n    transform 220ms cubic-bezier\(0\.34, 1\.4, 0\.4, 1\);\n\}\n\n\.mrr__card\[data-visible='true'\] \{\n  opacity: 1;\n  border-color: var\(--chakra\);\n  transform: translateY\(0\) rotate\(0deg\) scale\(1\);\n\}/,
      `  visibility: hidden;
  transform: translateY(calc(var(--mrr-travel-y) * -1)) rotate(var(--mrr-approach-deg)) scale(0.92);
  transition: transform var(--mrr-card-ms) cubic-bezier(0.34, 1.45, 0.4, 1);
}

.mrr__card[data-visible='true'] {
  visibility: visible;
  border-color: var(--chakra);
  transform: translateY(0) rotate(0deg) scale(1);
}`,
    )
    css = css.replace(
      /  opacity: 0;\n  transform: translate\(-50%, -50%\) rotate\(-14deg\) scale\(2\.4\);\n  transition:\n    opacity 180ms ease-out,\n    transform 180ms cubic-bezier\(0\.2, 0\.9, 0\.25, 1\);\n\}\n\n\.mrr__stamp\[data-visible='true'\] \{\n  opacity: 0\.92;\n  transform: translate\(-50%, -50%\) rotate\(-12deg\) scale\(1\);\n\}/,
      `  visibility: hidden;
  transform: translate(-50%, -50%) rotate(var(--mrr-stamp-approach-deg)) scale(var(--mrr-stamp-approach-scale));
  transition: transform var(--mrr-stamp-ms) cubic-bezier(0.2, 0.9, 0.25, 1);
}

.mrr__stamp[data-visible='true'] {
  visibility: visible;
  opacity: 0.92;
  transform: translate(-50%, -50%) rotate(var(--mrr-stamp-settle-deg)) scale(1);
}`,
    )
    w(id, 'demo.css', css)
    let js = r(id, 'demo.js')
    if (!js.includes('CARD_TRAVEL_Y_PX')) {
      js = js.replace(
        'const TOTAL_MS = CARD_MS + STAMP_MS + SETTLE_MS',
        `const CARD_TRAVEL_Y_PX = 56
const STAMP_SETTLE_DEG = -12
const TOTAL_MS = CARD_MS + STAMP_MS + SETTLE_MS`,
      )
      js = js.replace(
        'void TOTAL_MS\nbindUi()',
        'void TOTAL_MS\nvoid CARD_TRAVEL_Y_PX\nvoid STAMP_SETTLE_DEG\nbindUi()',
      )
    }
    w(id, 'demo.js', js)
  },
})

// Export catalog builder for continuation
export { CATALOG, add, applyMeta, PAPER, SENSOR, w, r, sync, injectAfterOff, updatePayload, writeEntry }

const only = process.argv.slice(2)
// Load more catalog entries
const { registerMore } = await import('./_improve-naruto-wave2c-catalog.mjs')
registerMore({ add, PAPER, SENSOR, w, r })

/** Correct run* API names for paper specimens generated via exportName heuristic. */
const API_FIX = {
  'versus-clash-card': [
    'runVersusClashCard',
    'resetVersusClashCard',
    'replayVersusClashCard',
  ],
  'objective-chain-advance': [
    'runObjectiveChainAdvance',
    'resetObjectiveChainAdvance',
    'replayObjectiveChainAdvance',
  ],
  'technique-mastery-tree': [
    'runTechniqueMasteryTree',
    'resetTechniqueMasteryTree',
    'replayTechniqueMasteryTree',
  ],
  'three-person-cell-formation': [
    'runThreePersonCellFormation',
    'resetThreePersonCellFormation',
    'replayThreePersonCellFormation',
  ],
}
for (const s of CATALOG) {
  const fix = API_FIX[s.id]
  if (fix && s.contract?.api) {
    s.contract.api = {
      run: `${fix[0]}()`,
      reset: `${fix[1]}()`,
      replay: `${fix[2]}()`,
    }
  }
}

const list = only.length ? CATALOG.filter((x) => only.includes(x.id)) : CATALOG
const out = []
for (const s of list) {
  console.log('→', s.id)
  applyMeta(s)
  out.push({ id: s.id, ref: s.ref, title: s.title, why: s.why })
}
writeFileSync('scripts/ephemeral/_wave2c-results.json', JSON.stringify(out, null, 2))
console.log('done', out.length)
