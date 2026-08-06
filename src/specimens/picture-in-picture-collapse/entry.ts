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

export const pictureInPictureCollapse: Specimen = {
  id: 'picture-in-picture-collapse',
  ref: 'SPX-1814',
  title: 'Picture-in-Picture Collapse',
  blurb:
    '16:9 player collapses to 176×99 PiP at lower-right over 380ms; draggable within bounds; tap restores inline.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired picture-in-picture container transform',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['pip', 'media', 'container-transform'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Direct rectangle switch plus opacity handoff under both reduced-motion triggers.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 420,
    height: 700,
    background: 'dark',
    scaffold,
    label: 'Picture-in-picture collapse',
  },
  integration: [
    'Mount inside a relative overflow-hidden host (700px height).',
    'Import demo.css verbatim; freeze PiP 176×99, margin 16px, anim 380ms.',
    'Wire resetPictureInPictureCollapse.',
    'Same media container is visually continuous.',
    'Honour prefers-reduced-motion and data-force-reduced-motion.',
  ],
  acceptance: [
    'Same media container is visually continuous',
    'PiP lands at defined lower-right position',
    'Drag cannot move window fully offscreen',
    'Tap restores original player region',
    'No actual video or network dependency',
  ],
}
