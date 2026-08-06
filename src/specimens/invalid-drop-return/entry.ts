import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:280px;background:#0f1218;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim()

export const invalidDropReturn: Specimen = {
  id: 'invalid-drop-return',
  ref: 'SPX-1455',
  title: 'Invalid Drop Return',
  blurb:
    'CONFIG.JSON drag rejected over READ ONLY — 3px refusal, 70ms pause, 360ms quadratic return, merge 1.04→1, DROP REJECTED 700ms.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired drag rejection and restoration',
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
  tags: ['drag', 'rejection', 'restoration'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, proxy immediately restores to source and shows rejection status.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 380,
    height: 280,
    background: 'dark',
    scaffold,
    label: 'Invalid drop return',
  },
  integration: [
    'Mount inside a relative overflow-clipped host (~380×280).',
    'Import demo.css verbatim; freeze refusal 3px, pause 70ms, return 360ms.',
    'ARCHIVE visible for contrast; only READ ONLY triggers rejection.',
    'Placeholder prevents layout collapse during drag.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Invalid target READ ONLY is visibly distinct from ARCHIVE',
    'Rejected proxy returns to exact source',
    'One refusal movement only on invalid target',
    'Placeholder prevents layout collapse',
    'No duplicate proxy remains after merge',
    'Reduced motion: instant restore with rejection status',
  ],
}
