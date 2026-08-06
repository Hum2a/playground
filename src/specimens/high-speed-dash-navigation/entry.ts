import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:280px;background:#0e1016;">
  {{specimen}}
</div>
`.trim()

export const highSpeedDashNavigation: Specimen = {
  id: 'high-speed-dash-navigation',
  ref: 'SPX-1099',
  title: 'High-Speed Dash Navigation',
  blurb:
    'Selection dashes OVERVIEW → LOGS across 320px with opposite anticipation, five fixed speed traces, a METRICS pass bump, brake stretch, and four lock ticks.',
  origin: {
    project: 'Original',
    surface: 'Dragon Ball–inspired high-speed dash navigation (abstract)',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'dragonball',
  },
  tags: ['navigation', 'movement', 'velocity'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, GO TO LOGS immediately selects LOGS.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 400,
    height: 300,
    background: 'dark',
    scaffold,
    label: 'High-speed dash demo',
  },
  integration: [
    'Keep frozen 320px OVERVIEW→LOGS span and single continuous travel animation.',
    'Exactly five trace lengths 18/30/44/62/78px — no random trails.',
    'Call runHighSpeedDash / resetHighSpeedDash; METRICS only reacts on pass.',
    'Traces must fully retract on lock; no residual motion.',
  ],
  acceptance: [
    'Starts at OVERVIEW with opposite-direction anticipation',
    'Path remains perceptible; exactly five speed traces; METRICS reacts when passed',
    'Accelerates then brakes; four destination ticks; ends at LOGS static',
    'No residual trails; reduced motion immediately selects LOGS',
  ],
}
