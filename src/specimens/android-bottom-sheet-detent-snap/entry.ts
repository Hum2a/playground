import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:760px;background:#0c1018;display:grid;place-items:center;padding:0.5rem;">
  {{specimen}}
</div>
`.trim()

export const androidBottomSheetDetentSnap: Specimen = {
  id: 'android-bottom-sheet-detent-snap',
  ref: 'SPX-1675',
  title: 'Bottom Sheet Detent Snap',
  blurb:
    'Draggable sheet with detents at 96, 360, and 640px; velocity bias >0.55 px/ms; scrim 0→0.34; scroll only when expanded.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired standard bottom sheet',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'fullscreen',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['bottom-sheet', 'gesture', 'detents'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, direct drag remains; release snaps instantly.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 420,
    height: 760,
    background: 'dark',
    scaffold,
    label: 'Bottom sheet detent snap',
  },
  integration: [
    'Mount inside a relative overflow-hidden host.',
    'Import demo.css verbatim; freeze detents 96/360/640px.',
    'Wire resetBottomSheetDetentSnap on replay.',
    'Scrim click returns to collapsed.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Exactly three stable detents',
    'Velocity can change destination',
    'Sheet never travels beyond viewport',
    'Scrim tracks sheet progress',
    'Content scrollable only at expanded detent',
    'Reduced motion: instant detent snap',
  ],
}
