import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:760px;background:#0a0e16;display:grid;place-items:center;padding:0.5rem;">
  {{specimen}}
</div>
`.trim()

export const recentsCardRestore: Specimen = {
  id: 'recents-card-restore',
  ref: 'SPX-1805',
  title: 'Recents Card Restore',
  blurb:
    'Three 286×500 task cards — any selection expands to 390×700 over 380ms; neighbours fade away; OVERVIEW restores order.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired recents restore',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'fullscreen',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['recents', 'restore', 'container-transform'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, geometry swaps immediately with short fade.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 420,
    height: 760,
    background: 'dark',
    scaffold,
    label: 'Recents card restore',
  },
  integration: [
    'Mount inside a relative overflow-hidden host.',
    'Import demo.css verbatim; freeze card 286×500 and 380ms transition.',
    'Wire resetRecentsCardRestore on replay.',
    'Any of three cards can restore.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Any of the three task cards can be restored',
    'Selected card remains visually continuous throughout',
    'Neighbour cards leave before full expansion completes',
    'Returning to overview restores task order',
    'No raster screenshots or network resources',
    'Reduced motion: immediate geometry swap',
  ],
}
