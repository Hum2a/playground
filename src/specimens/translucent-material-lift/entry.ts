import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:360px;background:#0e1116;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim()

export const translucentMaterialLift: Specimen = {
  id: 'translucent-material-lift',
  ref: 'SPX-1536',
  title: 'Translucent Material Lift',
  blurb:
    'FILTERS panel lifts over a dense document grid with semi-transparent material, inner highlight, outer border, and 220ms spatial open.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired translucent material hierarchy',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['ios', 'macos'],
  },
  tags: ['material', 'translucent', 'panel'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, panel appears without scale or translation.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 340,
    height: 400,
    background: 'dark',
    scaffold,
    label: 'Translucent material lift',
  },
  integration: [
    'Mount inside a relative overflow-hidden host.',
    'Import demo.css verbatim; freeze panel 286×214 and 220ms open.',
    'backdrop-filter is enhancement; semi-transparent fallback required.',
    'Wire open/close and resetTranslucentMaterialLift.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Panel readable without backdrop-filter',
    'Underlying context remains visible',
    'Exactly two boundary layers (outer + inner highlight)',
    'Lift is subtle — no giant shadow',
    'Close reverses hierarchy',
    'Reduced motion: immediate material state',
  ],
}
