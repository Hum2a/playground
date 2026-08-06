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

export const appToRecentsShrink: Specimen = {
  id: 'app-to-recents-shrink',
  ref: 'SPX-1802',
  title: 'App-to-Recents Shrink',
  blurb:
    '390×700 GALLERY app shrinks to 300×520 centre task card over 380ms; adjacent MAIL/MAPS cards at ±250px.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired recents overview',
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
  tags: ['recents', 'task-card', 'gesture'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, overview geometry switches instantly.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 420,
    height: 780,
    background: 'dark',
    scaffold,
    label: 'App-to-recents shrink',
  },
  integration: [
    'Mount inside a relative overflow-hidden host.',
    'Import demo.css verbatim; freeze card 300×520 and 380ms transition.',
    'Wire resetAppToRecentsShrink on replay.',
    'OVERVIEW button and bottom swipe both enter overview.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Active application becomes centre task card',
    'Adjacent tasks appear as overview establishes',
    'No screenshot image required',
    'Active task remains visually dominant',
    'Restore reverses cleanly to full-screen',
    'Reduced motion: direct geometry switch',
  ],
}
