import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:440px;background:#111318;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim()

export const scrollRubberBand: Specimen = {
  id: 'scroll-rubber-band',
  ref: 'SPX-1361',
  title: 'Scroll Rubber Band',
  blurb:
    'ACTIVITY LOG list with non-linear top overscroll resistance, boundary stretch, RELEASE marker at 60px, and ~420ms spring return — no refresh.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired scroll boundary physics',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['ios'],
  },
  tags: ['scroll', 'physics', 'spring', 'rubber-band'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, overscroll is capped at 12px static resist and returns immediately on release.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 440,
    background: 'dark',
    scaffold,
    label: 'Activity log rubber band',
  },
  integration: [
    'Mount inside a relative overflow-hidden host (~360×440 viewport).',
    'Import demo.css verbatim; freeze resistance formula, 90px cap, 24px boundary stretch, and 420ms settle.',
    'Wire pointer pull at scrollTop 0 and wheel overscroll; normal list scrolling must remain functional.',
    'RELEASE marker appears at 60px displayed overscroll; no refresh action.',
    'Honour both reduced-motion triggers with ≤12px static resist and immediate return.',
  ],
  acceptance: [
    'Viewport 360×440 with 12 fixed ACTIVITY LOG rows starting at scroll top',
    'Overscroll activates only when scrollTop is 0 and user pulls downward',
    'displayOffset = 90 * (1 - exp(-dragDistance / 120)), clamped to 90px',
    'Top boundary stretches 0→24px proportional to overscroll',
    'RELEASE marker visible at ≥60px displayed overscroll',
    'Release springs to 0 in ~420ms with ≤4px overshoot; no refresh',
    'Normal list scrolling still works',
    'Reduced motion: ≤12px static resist, immediate return on release',
  ],
}
