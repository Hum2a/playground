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

export const shapeMorphButtonToCard: Specimen = {
  id: 'shape-morph-button-to-card',
  ref: 'SPX-1880',
  title: 'Shape Morph Button-to-Card',
  blurb:
    'Details pill (132×48) morphs into a 320×220 card in one container; radius 24→30px over 360ms; content after 140ms.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired shape morph container transform',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['shape-morph', 'container', 'material-you'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, shape and content swap immediately.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 300,
    background: 'dark',
    scaffold,
    label: 'Shape morph button-to-card',
  },
  integration: [
    'Mount inside a relative overflow-clipped host.',
    'Import demo.css verbatim; freeze 132×48 compact and 320×220 expanded geometry.',
    'One container owns both states — no hidden duplicate card.',
    'Close reverses to exact compact dimensions.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'One container owns both compact and expanded states',
    'Label remains visually continuous',
    'No cloned hidden card sits behind the button',
    'Reverse returns exact compact dimensions',
    'Works inside iframe without external CSS',
    'Reduced motion: immediate shape change',
  ],
}
