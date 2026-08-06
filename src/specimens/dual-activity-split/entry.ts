import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:220px;background:#0c0d10;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>
`.trim()

export const dualActivitySplit: Specimen = {
  id: 'dual-activity-split',
  ref: 'SPX-1328',
  title: 'Dual Activity Split',
  blurb:
    'A 196×40 upload capsule splits into 126+12+58 zones over 320ms when a timer task arrives; bridge connects for 90ms then separates.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired dual concurrent live-status split',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['ios'],
  },
  tags: ['split', 'live-activity', 'concurrency'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Immediately switches between single and dual layouts; timer value stays static.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 280,
    height: 220,
    background: 'dark',
    scaffold,
    label: 'Dual activity split',
  },
  integration: [
    'Mount inside a relative overflow-hidden dark host (~280×220).',
    'Import demo.css verbatim; freeze 196→126+12+58 split and 320ms timing.',
    'Wire startDualActivitySplit / endDualActivitySplit / resetDualActivitySplit.',
    'Upload progress mark must remain on the left region.',
    'Bridge visible exactly 90ms; timer digits use vertical clipping.',
  ],
  acceptance: [
    'Starts as one 196×40 activity region',
    'Second task creates a second 58px region with 12px gap',
    'Upload identity never jumps to the wrong region',
    'Gap is exactly 12px; secondary width ends at 58px',
    'One connecting bridge for first 90ms then separates',
    'Ending timer returns to one 196px region',
    'Reduced motion: immediate layout switch',
  ],
}
