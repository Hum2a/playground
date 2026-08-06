import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:700px;background:#141218;display:grid;place-items:center;padding:0.5rem;">
  {{specimen}}
</div>
`.trim()

export const navigationDrawerEdgePull: Specimen = {
  id: 'navigation-drawer-edge-pull',
  ref: 'SPX-1683',
  title: 'Navigation Drawer Edge Pull',
  blurb:
    '304px left drawer acquired from 24px edge zone; app shifts 24px, scrim 0.32; opens at 46% progress or >0.5 px/ms velocity.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired navigation drawer gesture',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['drawer', 'gesture', 'navigation'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Direct drag preserved; release snaps instantly under both reduced-motion triggers.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 420,
    height: 700,
    background: 'dark',
    scaffold,
    label: 'Navigation drawer edge pull',
  },
  integration: [
    'Mount inside a relative overflow-hidden host (700px preview height).',
    'Import demo.css verbatim; freeze drawer 304px, edge 24px, open 46%, velocity 0.5 px/ms.',
    'Wire resetNavigationDrawerEdgePull.',
    'Scrim click and Escape close drawer.',
    'Honour prefers-reduced-motion and data-force-reduced-motion.',
  ],
  acceptance: [
    'Closed drawer only acquired from first 24px edge zone',
    'Drawer position tracks pointer during drag',
    'Scrim opacity maps 0→0.32 with progress',
    'Release above 46% or velocity opens drawer',
    'Scrim click closes drawer',
    'Escape closes drawer and restores focus',
    'Five destinations with one moving selected pill',
    'Reduced motion: direct drag, instant snap on release',
  ],
}
