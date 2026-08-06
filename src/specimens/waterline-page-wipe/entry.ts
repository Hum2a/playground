import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:300px;border:1px solid #1a2a38;border-radius:2px;background:#020b16;">
  {{specimen}}
</div>
`.trim()

export const waterlinePageWipe: Specimen = {
  id: 'waterline-page-wipe',
  ref: 'SPX-400',
  title: 'Waterline Page Wipe',
  blurb:
    'A stylised blue water mass with a lobed waterline rises from below, fully covers for a hard A↔B swap, then continues upward to reveal the destination — graphic CSS water, not fluid sim.',
  origin: {
    project: 'Original',
    surface: 'Persona 3 water / depth transition language',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-3'],
  },
  tags: ['wipe', 'water', 'clip-path'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Water travel, lobe drift, and refraction tracking are skipped under prefers-reduced-motion or data-force-reduced-motion; surfaces switch immediately.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 320,
    background: 'dark',
    scaffold,
    label: 'Waterline page transition',
  },
  integration: [
    'Mount host states and the water overlay inside a relative overflow-hidden frame.',
    'Import demo.css verbatim; freeze lobe clip-paths, waterline 110% → -8% → exit, and ~850ms timing.',
    'Call runWaterlineWipe(); swap destination only under full coverage (~460ms) — no crossfade.',
    'Water continues upward after the swap; do not reverse or fall.',
    'Honour both reduced-motion triggers with an immediate state switch.',
  ],
  acceptance: [
    'Water begins below the host (waterline ~110%)',
    'Irregular waterline uses 5–7 large lobes, not tiny waves',
    'Water rises continuously; lobes shift 3–7px only during the rise',
    'Narrow ~26px refractive band tracks the waterline with 2–3px offset',
    'Host fully covered ~430–500ms; content swaps only then (no crossfade)',
    'Water continues upward; destination reveals from the trailing edge',
    'State B settles translateY 4px → 0 over ~180ms',
    'Nothing loops; no canvas/WebGL/SVG filters',
    'Reduced motion switches immediately',
    'Works at narrow (~320) and wider preview sizes',
  ],
}
