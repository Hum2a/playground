import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:340px;background:#0a1016;">
  {{specimen}}
</div>
`.trim()

export const darkHourConversion: Specimen = {
  id: 'dark-hour-conversion',
  ref: 'SPX-444',
  title: 'Dark Hour conversion',
  blurb:
    'A travelling conversion boundary progressively reveals a Dark Hour nocturnal interface — structural alternate state, not a colour-theme fade.',
  origin: {
    project: 'Original',
    surface: 'Persona 3–inspired Dark Hour temporal conversion',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-3', 'persona-3-reload'],
  },
  tags: ['state-change', 'transformation', 'temporal'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'After the clock becomes 00:00, the Dark Hour state appears immediately with no travelling boundary.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 360,
    background: 'dark',
    scaffold,
    label: 'Temporal conversion',
  },
  integration: [
    'Mount both normal and Dark Hour layers in one relative overflow-hidden stage.',
    'Import demo.css verbatim; drive --dhc-wipe for the clip boundary (−5% → 105%).',
    'Call runDarkHourConversion / restoreDarkHour; keep decorative boundary aria-hidden.',
    'Flip aria-hidden so only one semantic layer is exposed at a time.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with the instant settle path.',
  ],
  acceptance: [
    'Starts ordinary; clock reaches 00:00 before transformation',
    'Visible irregular boundary travels top-to-bottom revealing Dark Hour behind it',
    'Dark Hour includes structural geometry changes, not only colour',
    'Four deterministic anomaly streaks; no random glitching; final state is static',
    'Restore retreats upward (~520ms); reduced motion switches immediately after midnight',
    'Sandbox-safe; timings and geometry documented in contract.json',
  ],
}
