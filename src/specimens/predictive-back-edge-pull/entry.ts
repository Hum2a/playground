import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:720px;background:#141218;display:grid;place-items:center;padding:0;">
  {{specimen}}
</div>
`.trim()

export const predictiveBackEdgePull: Specimen = {
  id: 'predictive-back-edge-pull',
  ref: 'SPX-1601',
  title: 'Predictive Back Edge Pull',
  blurb:
    'Left-edge back gesture: current surface translates, scales, and rounds while the destination reveals underneath; commit at 112px or >0.55 px/ms velocity.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired predictive back navigation',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'fullscreen',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['gesture', 'navigation', 'predictive-back'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Gesture thresholds preserved; scale interpolation removed; immediate snap after release.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 390,
    height: 720,
    background: 'dark',
    scaffold,
    label: 'Predictive back edge pull',
  },
  integration: [
    'Mount inside a relative overflow-hidden host (~390×720).',
    'Import demo.css verbatim; freeze edge 24px, max drag 140px, translate factor 0.72, commit 112px, velocity 0.55 px/ms.',
    'Wire resetPredictiveBackEdgePull / replayPredictiveBackEdgePull.',
    'Gesture starts only in left 24px edge zone.',
    'Honour prefers-reduced-motion and data-force-reduced-motion.',
  ],
  acceptance: [
    'Gesture can only begin in the left 24px edge zone',
    'Current and previous surfaces visibly coexist during drag',
    'Below-threshold release restores exact starting state',
    'Above-threshold or velocity release completes navigation',
    'Repeated runs do not accumulate transforms or listeners',
    'Reduced motion preserves drag distance and threshold semantics',
  ],
}
