import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:200px;background:#0f1218;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim()

export const pressedControlCompression: Specimen = {
  id: 'pressed-control-compression',
  ref: 'SPX-1365',
  title: 'Pressed Control Compression',
  blurb:
    'RUN BUILD control compresses on press (.965 scale, 3px padding), release inside bounces to RUNNING; outside release cancels.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired pressed control tactile response',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['ios'],
  },
  tags: ['press', 'compression', 'button'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, structural pressed boundary without scale.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 220,
    height: 220,
    background: 'dark',
    scaffold,
    label: 'Pressed control compression',
  },
  integration: [
    'Mount inside a relative overflow-hidden host.',
    'Import demo.css verbatim; freeze control 180×52 and press/release timings.',
    'Wire resetPressedControlCompression.',
    'Keyboard Space/Enter activation supported.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Press compresses once without loop',
    'Release inside activates READY → RUNNING',
    'Release/cancel outside does not activate',
    'Keyboard activation works',
    'Reduced motion: structural boundary only',
  ],
}
