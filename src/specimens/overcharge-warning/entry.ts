import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#0a0e12;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>
`.trim()

export const overchargeWarning: Specimen = {
  id: 'overcharge-warning',
  ref: 'SPX-970',
  title: 'Overcharge Warning',
  blurb:
    'COMPUTE RESERVE climbs 72→100, holds as NOMINAL MAXIMUM, then unfolds a 100–125% overflow bay ending at 118% OVERCHARGED without crossing the hard limit.',
  origin: {
    project: 'Original',
    surface: 'Dragon Ball–inspired overcharge / capacity overflow (abstract)',
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
  tags: ['capacity', 'overflow', 'warning'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, INCREASE LOAD immediately shows 118%, expanded overflow region, hatching, and OVERCHARGED.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 440,
    height: 320,
    background: 'dark',
    scaffold,
    label: 'Overcharge past safe capacity',
  },
  integration: [
    'Mount inside a relative host (~440×320+).',
    'Import demo.css verbatim; keep safe width, overflow bay at 25% of normal scale, and frozen ladder.',
    'Wire INCREASE LOAD via runOverchargeWarning; RESET / harness restart via resetOverchargeWarning.',
    'Do not animate fill past the parent by width overflow alone — unfold the 100–125% region.',
    'Announce above-safe-capacity text; no looping shake or strobing.',
  ],
  acceptance: [
    'Starts at 72%; safe maximum marked at 100%; hard limit 125% visible',
    'Holds 160ms at 100% with NOMINAL MAXIMUM before overflow unfolds',
    'Ends at 118% OVERCHARGED with warn markers, one 1px frame shift, and hatching',
    'Warning uses structure + text, not colour alone; no looping shake',
    'Reduced motion immediately shows overcharged final state',
  ],
}
