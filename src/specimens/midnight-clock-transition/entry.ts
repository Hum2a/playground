import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#020912;">
  {{specimen}}
</div>
`.trim()

export const midnightClockTransition: Specimen = {
  id: 'midnight-clock-transition',
  ref: 'SPX-531',
  title: 'Midnight Clock Transition',
  blurb:
    'An abstract clock accelerates from 23:54 to midnight; hands align at 12, a pale seam splits the host, and panels wipe into 07 APR / MIDNIGHT.',
  origin: {
    project: 'Original',
    surface: 'Persona 3 Dark Hour–inspired temporal threshold',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-3'],
  },
  tags: ['time', 'threshold'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Hand travel, seam, and panel wipe are skipped under prefers-reduced-motion or data-force-reduced-motion; the midnight state appears immediately.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 340,
    background: 'dark',
    scaffold,
    label: 'Midnight threshold demo',
  },
  integration: [
    'Mount inside a relative overflow-hidden host so the seam and outward panel exit clip cleanly.',
    'Import demo.css verbatim; keep frozen 23:54 hand angles, minute 1008deg travel, and 900ms timeline.',
    'Wire advanceToMidnight / resetMidnightClock; reset must return exactly to 23:54 / 06 APR.',
    'Keep the clock decorative; announce only evening and final Midnight. 7 April. statuses.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion with an immediate state swap.',
  ],
  acceptance: [
    'Clock begins at ~23:54 with hour 357deg and minute 324deg',
    'Minute hand moves significantly faster than hour; motion accelerates toward midnight',
    'Digital display steps through 23:54→23:56→23:58→23:59→00:00 without semantic spam',
    'Hands align at 12; alignment triggers a ~2px vertical pale seam',
    'Panels expand from the seam and cover the host; date/state swap under coverage',
    'Destination remains at 00:00 / 07 APR / MIDNIGHT; nothing loops',
    'Reduced motion swaps immediately; exact rotations/keyframes frozen in contract.json',
  ],
}
