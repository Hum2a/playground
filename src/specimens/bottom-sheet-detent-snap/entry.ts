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

export const bottomSheetDetentSnap: Specimen = {
  id: 'bottom-sheet-detent-snap',
  ref: 'SPX-1314',
  title: 'Bottom Sheet Detent Snap',
  blurb:
    'ROUTE DETAILS sheet snaps between collapsed 112px, medium 318px, and expanded 520px visible heights with velocity override and ≤8px spring overshoot.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired bottom sheet detents',
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
  tags: ['sheet', 'drag', 'spring'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Direct drag preserved; release snaps 160ms without overshoot; forced RM immediate.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 420,
    height: 600,
    background: 'dark',
    scaffold,
    label: 'Bottom sheet detent snap',
  },
  integration: [
    'Mount inside a relative overflow-hidden host (600px preview height).',
    'Import demo.css verbatim; freeze detents 112/318/520, handle 36×5, corners 18px.',
    'Wire resetBottomSheetDetentSnap.',
    'Progressive reveal for metrics and steps — no DOM swap.',
    'Honour prefers-reduced-motion and data-force-reduced-motion.',
  ],
  acceptance: [
    'Exactly three detents at 112 / 318 / 520px visible',
    'Sheet draggable in both directions via handle',
    'Release selects deterministic detent (nearest or velocity)',
    'Velocity can advance or retreat one detent',
    'Overshoot never exceeds 8px',
    'Expanded steps not visible in collapsed state',
    'Sheet always rests on exact detent after settle',
    'Reduced motion: 160ms snap or immediate under forced RM',
  ],
}
