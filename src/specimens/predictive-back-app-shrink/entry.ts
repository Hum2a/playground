import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:720px;background:#12141a;display:grid;place-items:center;padding:0;">
  {{specimen}}
</div>
`.trim()

export const predictiveBackAppShrink: Specimen = {
  id: 'predictive-back-app-shrink',
  ref: 'SPX-1602',
  title: 'Predictive Back App Shrink',
  blurb:
    'Back gesture shrinks the active surface into a floating card with progressive inset, radius, and scale while revealing the destination on all four edges.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired predictive back app shrink',
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
  tags: ['gesture', 'navigation', 'transform'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Gesture preview preserved; scale animation after release removed; immediate snap.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 390,
    height: 720,
    background: 'dark',
    scaffold,
    label: 'Predictive back app shrink',
  },
  integration: [
    'Mount inside a relative overflow-hidden host (~390×720).',
    'Import demo.css verbatim; freeze edge 24px, max drag 160px, commit 118px, cancel 220ms, commit 180ms.',
    'Wire resetPredictiveBackAppShrink / replayPredictiveBackAppShrink.',
    'Internal border appears when scale drops below 0.97.',
    'Honour prefers-reduced-motion and data-force-reduced-motion.',
  ],
  acceptance: [
    'Shrink is continuously controlled by pointer distance',
    'Underlying surface is visible before commit',
    'Radius and inset increase progressively rather than switching',
    'Cancel returns to pixel-identical start geometry',
    'Works with mouse and touch-style pointer events',
  ],
}
