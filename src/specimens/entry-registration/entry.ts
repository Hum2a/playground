import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:360px;background:#19252a;">
  {{specimen}}
</div>
`.trim()

export const entryRegistration: Specimen = {
  id: 'entry-registration',
  ref: 'SPX-786',
  title: 'Entry Registration',
  blurb:
    'A vertical scan resolves an unknown silhouette into structured geometry, swaps UNKNOWN metadata at fixed thresholds, cycles seven index candidates, then locks ENTRY // 086 as a permanent registered record.',
  origin: {
    project: 'Original',
    surface: 'Pokémon Pokédex–inspired registration language (abstract)',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'pokemon',
  },
  tags: ['registration', 'discovery', 'catalogue'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, REGISTER jumps straight to the final ENTRY // 086 registered record with no scan or index flicker.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 380,
    height: 380,
    background: 'dark',
    scaffold,
    label: 'Entry registration',
  },
  integration: [
    'Mount inside a relative host (~380×360+).',
    'Import demo.css verbatim; keep frozen scan 620ms, thresholds 30%/55%, and seven index values.',
    'Wire register/reset via window.entryRegistration or the controls.',
    'Never announce intermediate index numbers to assistive tech — only idle and final registration.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with an immediate registered record.',
  ],
  acceptance: [
    'Initial metadata visibly UNKNOWN / UNREGISTERED',
    'Scanner travels left→right in ~620ms; silhouette resolves behind the beam',
    'NAME reveals at 30%, CLASS at 55%; STATUS waits until lock',
    'Index cycles exactly seven deterministic values then locks 086',
    'Four brackets lock; STATUS → REGISTERED; underline grows; final state static',
    'Reduced motion immediate; no external assets; sandbox allow-scripts',
  ],
}
