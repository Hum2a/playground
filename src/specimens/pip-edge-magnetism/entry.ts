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

export const pipEdgeMagnetism: Specimen = {
  id: 'pip-edge-magnetism',
  ref: 'SPX-1816',
  title: 'PiP Edge Magnetism',
  blurb:
    '176×99 PiP drags freely; 35% attraction within 56px of edges; snaps to corner slots in 180ms; fling >0.8 px/ms biases edge.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired PiP edge magnetism',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['pip', 'drag', 'snap'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'No magnetic interpolation during drag; instant snap on release under both reduced-motion triggers.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 420,
    height: 700,
    background: 'dark',
    scaffold,
    label: 'PiP edge magnetism',
  },
  integration: [
    'Mount inside a relative overflow-hidden host (700px height).',
    'Import demo.css verbatim; freeze window 176×99, attract zone 56px, snap 180ms.',
    'Wire resetPipEdgeMagnetism.',
    'Four valid corner slots with 12px minimum inset.',
    'Honour prefers-reduced-motion and data-force-reduced-motion.',
  ],
  acceptance: [
    'Free drag feels unconstrained away from edges',
    'Attraction visible only inside 56px zone',
    'Window always finishes at a valid slot',
    'Velocity can bias chosen edge',
    'Window remains entirely accessible',
    'Reduced motion: no magnetic drag, instant snap',
  ],
}
