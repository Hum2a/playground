import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:280px;background:#14161c;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>
`.trim()

export const boundedTouchRipple: Specimen = {
  id: 'bounded-touch-ripple',
  ref: 'SPX-1593',
  title: 'Bounded Touch Ripple',
  blurb:
    'Pointer-origin circular ripple clipped to each control border radius; keyboard Enter/Space uses centre; reduced motion uses 100ms flash.',
  origin: {
    project: 'Original',
    surface: 'Android Material touch feedback',
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
  tags: ['ripple', 'touch-feedback', 'css-js'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Radial expansion replaced with 100ms whole-control background flash.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 320,
    height: 280,
    background: 'dark',
    scaffold,
    label: 'Bounded touch ripple',
  },
  integration: [
    'Mount inside a relative overflow-hidden host.',
    'Import demo.css verbatim; freeze ripple 420ms, opacity 0.18→0.',
    'Wire resetBoundedTouchRipple / replayBoundedTouchRipple.',
    'Each control uses shared ripple primitive via data-btr-target.',
    'Honour prefers-reduced-motion and data-force-reduced-motion.',
  ],
  acceptance: [
    'Pointer-origin visibly changes when clicking different target areas',
    'Ripple reaches every corner without escaping the control',
    'Rapid repeated presses do not leave orphaned nodes',
    'Keyboard activation receives equivalent feedback',
    'Each control can use the primitive without bespoke JS',
  ],
}
