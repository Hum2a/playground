import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:600px;background:#10141c;display:grid;place-items:center;padding:0.5rem;">
  {{specimen}}
</div>
`.trim()

export const sheetRubberBandLimit: Specimen = {
  id: 'sheet-rubber-band-limit',
  ref: 'SPX-1315',
  title: 'Sheet Rubber-Band Limit',
  blurb:
    'TASK DETAILS sheet at 520px expanded detent resists upward overshoot with exponential formula, two limit ticks at 32px, and 360ms settle.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired sheet overscroll resistance',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['ios'],
  },
  tags: ['sheet', 'rubber-band', 'overscroll'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, upward overshoot capped at 8px with immediate snap back.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 420,
    height: 600,
    background: 'dark',
    scaffold,
    label: 'Sheet rubber-band limit',
  },
  integration: [
    'Mount inside a relative overflow-hidden host (600px preview height).',
    'Import demo.css verbatim; freeze expanded 520px and overshoot formula.',
    'Wire resetSheetRubberBandLimit.',
    'Downward drag retains normal sheet movement.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Sheet starts fully expanded at 520px',
    'Upward drag meets increasing resistance',
    'Overshoot max 54px displayed',
    'Exactly two limit ticks at 32px overshoot',
    'Release always returns to same expanded detent',
    'Reduced motion: 8px clamp and immediate snap',
  ],
}
