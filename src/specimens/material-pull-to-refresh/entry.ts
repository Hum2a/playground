import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:540px;background:#141218;display:grid;place-items:center;padding:0.5rem;">
  {{specimen}}
</div>
`.trim()

export const materialPullToRefresh: Specimen = {
  id: 'material-pull-to-refresh',
  ref: 'SPX-1750',
  title: 'Material Pull-to-Refresh',
  blurb:
    'Resisted pull at scrollTop 0 with 270° arc to 120°; threshold 72px; 900ms load prepends one deterministic row.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired pull-to-refresh gesture',
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
  tags: ['pull-to-refresh', 'gesture', 'scroll'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Threshold and static arc preserved; no spinning under both reduced-motion triggers.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 380,
    height: 540,
    background: 'dark',
    scaffold,
    label: 'Material pull-to-refresh',
  },
  integration: [
    'Mount inside a relative overflow-hidden host.',
    'Import demo.css verbatim; freeze resistance formula, threshold 72px, load 900ms.',
    'Wire resetMaterialPullToRefresh.',
    'Pull only activates at scrollTop 0.',
    'Honour prefers-reduced-motion and data-force-reduced-motion.',
  ],
  acceptance: [
    'Pull only activates at scrollTop 0',
    'Resistance increases with distance',
    'Below-threshold pull never refreshes',
    'Successful refresh inserts exactly one known row',
    'Indicator disappears after settle',
    'Reduced motion: no spinning animation',
  ],
}
