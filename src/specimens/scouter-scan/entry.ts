import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:340px;background:#151c1c;">
  {{specimen}}
</div>
`.trim()

export const scouterScan: Specimen = {
  id: 'scouter-scan',
  ref: 'SPX-TODO',
  title: 'Scouter Scan',
  blurb:
    'Four angular brackets acquire an abstract node, one scan sweep structures it, and deterministic metrics settle on OUTPUT 8,471 / 24ms / 82% / EXTREME.',
  origin: {
    project: 'Original',
    surface: 'Dragon Ball–inspired diagnostic / targeting language',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'dragonball',
  },
  tags: ['scan', 'analysis', 'target-lock', 'diagnostic'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Bracket search, sweep, metric cycling, and pulse are skipped under prefers-reduced-motion or data-force-reduced-motion; the completed EXTREME report appears immediately.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 420,
    height: 360,
    background: 'dark',
    scaffold,
    label: 'Diagnostic scouter scan',
  },
  integration: [
    'Mount inside a relative host (~420×340+).',
    'Import demo.css verbatim; freeze bracket offsets, 8px lock, 2px sweep, and metric sequences from contract.json.',
    'Wire runScouterScan / resetScouterScan; announce only the final NODE 07 report sentence.',
    'Do not randomise metrics; keep CLASS resolution after measurements settle.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with an immediate completed report.',
  ],
  acceptance: [
    'Target begins unresolved; SCAN starts acquisition',
    'Four brackets search with deterministic offsets then lock at ~8px outside',
    'Exactly one left→right 2px sweep; internals reveal behind the beam',
    'OUTPUT / LATENCY / LOAD cycle deterministically and end on 8,471 / 24ms / 82%',
    'CLASS stays UNKNOWN until metrics settle, then EXTREME with bar',
    'Brackets nudge +3px inward once; diamond pulses once; nothing loops',
    'Reduced motion immediate; works ~320–768px; geometry frozen in contract.json',
  ],
}
