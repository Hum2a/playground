import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#0f1218;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim()

export const authenticationSuccessMorph: Specimen = {
  id: 'authentication-success-morph',
  ref: 'SPX-1427',
  title: 'Authentication Success Morph',
  blurb:
    'Eight-node scan field with four brackets morphs to verified strokes; brackets move 6px inward 100ms; nodes converge 180ms; CONTINUE unlocks after settle.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired authentication completion morph',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['ios', 'macos'],
  },
  tags: ['authentication', 'morph', 'completion'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, immediate verified geometry.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 280,
    height: 300,
    background: 'dark',
    scaffold,
    label: 'Authentication success morph',
  },
  integration: [
    'Mount inside a relative overflow-clipped host.',
    'Import demo.css verbatim; freeze bracket/node timings.',
    'Same nodes become completion geometry — no unrelated icon fade-in.',
    'CONTINUE disabled until morph completes.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Same nodes become completion geometry',
    'No unrelated success icon fade-in',
    'CONTINUE locked before completion',
    'Final state static',
    'Reduced motion: instant verified geometry',
  ],
}
