import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:340px;background:#07140f;">
  {{specimen}}
</div>
`.trim()

export const measurementOverload: Specimen = {
  id: 'measurement-overload',
  ref: 'SPX-1185',
  title: 'Measurement Overload',
  blurb:
    'An analyser built for 0–9,999 climbs a frozen reading sequence, holds at maximum, then fails representation into > 9,999 with a broken frame — controlled overflow, not a glitch loop.',
  origin: {
    project: 'Original',
    surface: 'Dragon Ball scouter overload–inspired measurement failure (abstract)',
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
  tags: ['overflow', 'measurement', 'warning'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, MEASURE jumps to the static broken-frame state with > 9,999 and RANGE EXCEEDED.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 360,
    background: 'dark',
    scaffold,
    label: 'Measurement overload',
  },
  integration: [
    'Mount inside a relative host (~360×340+).',
    'Import demo.css verbatim; keep frozen sequence, timings, three fragments, and −18° fracture.',
    'Call window.measurementOverload.run() / .reset() or use MEASURE / RESET.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with an immediate overflow path.',
  ],
  acceptance: [
    'Supported range visibly 0 — 9,999',
    'Deterministic climb through 0142…9999 then ---- then > 9,999',
    '9999 holds 180ms before ---- (90ms) then overflow',
    'Exactly three right-side frame fragments and one −18° fracture',
    'Final overflow remains static and readable; no looping glitch',
    'Reduced motion is immediate; a11y announces range exceeded',
  ],
}
