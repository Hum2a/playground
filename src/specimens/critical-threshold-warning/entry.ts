import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#0a0b0e;">
  {{specimen}}
</div>
`.trim()

export const criticalThresholdWarning: Specimen = {
  id: 'critical-threshold-warning',
  ref: 'SPX-025',
  title: 'Critical Threshold Warning',
  blurb:
    'System load climbs past a 90% limit: the marker tenses, clamps trap the threshold, fill turns red, and CRITICAL locks in — restrictive, not celebratory.',
  origin: {
    project: 'Original',
    surface: 'Specimen Archive',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-5'],
  },
  tags: ['threshold', 'warning', 'metric'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Immediately shows 94% critical with static clamps and CRITICAL / 94% LOAD under prefers-reduced-motion or data-force-reduced-motion; no approach or clamp travel.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 380,
    height: 340,
    background: 'dark',
    scaffold,
    label: 'System load meter',
  },
  integration: [
    'Mount inside a relative overflow-hidden frame (~380×320+) so clamps and the CRITICAL label clip safely.',
    'Import demo.css verbatim; keep the 90% marker, clamp travel (−35px / +35px), and red critical fill discrete.',
    'Drive ctw--critical from logical value > 90 — never from animation completion alone.',
    'Wire increaseCriticalThreshold / resetCriticalThreshold; one-shot sequence, no pulse loop.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with an immediate 94% critical state.',
  ],
  acceptance: [
    'Initial metric is below the 90% threshold',
    '90% threshold is visibly marked (90 // LIMIT)',
    'Approach visually slows; marker reacts before crossing',
    'Crossing triggers upper/lower clamps; marker does not explode',
    'Critical region fill changes to red; CRITICAL appears once; final state is static',
    'Reset restores safe load; reduced motion is immediate',
    'No external dependencies, assets, or network',
  ],
}
