import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:380px;background:#10131a;display:grid;place-items:center;padding:16px;">
  {{specimen}}
</div>
`.trim()

export const powerLevelReadout: Specimen = {
  id: 'power-level-readout',
  ref: 'SPX-997',
  title: 'Power Level Readout',
  blurb:
    'A monospace measurement display walks a frozen sample ladder that accelerates then converges on 8,471 — thresholds lock scale markers before ABOVE BASELINE classification.',
  origin: {
    project: 'Original',
    surface: 'Dragon Ball scouter-style power-level reading (abstract instrument)',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'dragonball',
  },
  tags: ['measurement', 'analysis', 'numeric-resolution'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Sample ladder and threshold motion are skipped; 8,471 with ABOVE BASELINE appears immediately under prefers-reduced-motion or data-force-reduced-motion.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 420,
    height: 400,
    background: 'dark',
    scaffold,
    label: 'Power level readout demo',
  },
  integration: [
    'Mount inline; keep system monospace stack — do not load an external display font.',
    'Import demo.css verbatim; preserve the frozen 16-sample ladder and HOLD_MS timings.',
    'Call runPowerLevelReadout / runPowerLevelReset; do not drive the display with a continuous counter.',
    'Announce only the final measurement via the polite live region.',
    'Honour both reduced-motion triggers with an immediate final state.',
  ],
  acceptance: [
    'Begins unresolved (----); MEASURE walks exactly the frozen sample sequence',
    'Holds accelerate from ~70ms toward ~35ms then slow 45/55/80ms near the end',
    'Thresholds lock once at 1000 (×10³), 5000 (rule), and 8000 (frame +4px)',
    'Ends at 8,471 with settle, brackets, and ABOVE BASELINE after the number',
    'No random values, no infinite flicker; reduced motion is immediate',
  ],
}
