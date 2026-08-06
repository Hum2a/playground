import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:360px;background:#0f1218;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim()

export const widgetResizeMorph: Specimen = {
  id: 'widget-resize-morph',
  ref: 'SPX-1874',
  title: 'Widget Resize Morph',
  blurb:
    'Activity widget morphs between 2×1, 2×2, and 4×2 grid sizes over 300ms with semantic content reflow and top-left anchor.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired home-screen widget resize',
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
  tags: ['widget', 'resize', 'adaptive'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, size changes instantly without morph travel.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 360,
    background: 'dark',
    scaffold,
    label: 'Widget resize morph',
  },
  integration: [
    'Mount inside a relative overflow-clipped host.',
    'Import demo.css verbatim; freeze 152×72, 152×152, 320×152 sizes.',
    'Only valid grid dimensions; top-left anchor fixed.',
    'Handles visible only while widget is selected.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Only valid grid dimensions can be reached',
    'Top-left grid anchor remains fixed',
    'Content genuinely reflows by size',
    'Handles disappear when deselected',
    'No overlap with neighbouring scaffold items',
    'Reduced motion: instant size change',
  ],
}
