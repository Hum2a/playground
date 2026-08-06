import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:340px;background:#0f1218;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim()

export const listToIconViewMorph: Specimen = {
  id: 'list-to-icon-view-morph',
  ref: 'SPX-1463',
  title: 'List-to-Icon View Morph',
  blurb:
    'Six files morph from 44px list rows to 3×2 grid cells at 116×104 over 420ms; filenames persist; metadata collapses in first 35%.',
  origin: {
    project: 'Original',
    surface: 'macOS-inspired collection view morph',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['macos'],
  },
  tags: ['layout', 'identity-preservation', 'grid'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, immediate re-layout.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 400,
    height: 340,
    background: 'dark',
    scaffold,
    label: 'List to icon view morph',
  },
  integration: [
    'Mount inside a relative overflow-clipped host.',
    'Import demo.css verbatim; freeze six persistent items and 420ms morph.',
    'No duplicate items or cross-fades.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Exactly six persistent items',
    'Every filename preserved',
    'Grid 3×2',
    'No identity swapping',
    'Return restores exact list order',
    'Reduced motion: instant re-layout',
  ],
}
