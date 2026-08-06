import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:160px;background:#f4f5f7;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim()

export const buttonLoadingMorph: Specimen = {
  id: 'button-loading-morph',
  ref: 'SPX-1714',
  title: 'Button Loading Morph',
  blurb:
    '160×48 Save changes: label fades in 80ms; 20px arc rotates 900ms; check morph 180ms; Saved dwell 1200ms — width never changes.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired button progress state',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['button', 'progress', 'state'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, static arc fills over 900ms with no rotation.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 220,
    height: 180,
    background: 'card',
    scaffold,
    label: 'Button loading morph',
  },
  integration: [
    'Mount inside a relative overflow-clipped host.',
    'Import demo.css verbatim; freeze 160×48 button and 900ms load cycle.',
    'Wire resetButtonLoadingMorph; ignore clicks while busy.',
    'Success uses same button surface — no second dialog.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Button width never changes',
    'Repeated clicks are ignored while busy',
    'Loading always has a finite completion',
    'Success state is visually distinct',
    'Reset restores original label exactly',
    'Reduced motion: determinate fill, no spin',
  ],
}
