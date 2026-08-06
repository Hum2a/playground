import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#0a0908;">
  {{specimen}}
</div>
`.trim()

export const timeSkip: Specimen = {
  id: 'time-skip',
  ref: 'SPX-028',
  title: 'Time Skip',
  blurb:
    'Five horizontal slices of the schedule card jump on fixed offsets, swap to evening one by one, flash +02:50, then realign — time advances from 16:20 After School to 19:10 Evening.',
  origin: {
    project: 'Original',
    surface: 'Temporal slice skip / schedule advance',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  tags: ['time', 'temporal', 'stagger'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Skip, offsets, marker, and realign are skipped under prefers-reduced-motion or data-force-reduced-motion; 19:10 Evening appears immediately.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 420,
    background: 'dark',
    scaffold,
    label: 'Time skip schedule demo',
  },
  integration: [
    'Mount in a relative overflow-hidden host so shifted slices clip cleanly.',
    'Import demo.css verbatim; keep five slices and frozen offsets (−18 / +22 / −12 on slices 1 / 3 / 5).',
    'Wire timeSkip.pass / reset; do not randomise offsets or loop glitch frames.',
    'Announce before/skipping/after via the live status region; keep slices decorative.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion with an immediate evening state.',
  ],
  acceptance: [
    'Exactly five horizontal slices',
    'Slice 1 −18px, slice 3 +22px, slice 5 −12px; hold ~60ms',
    'Destination replaces slice-by-slice with ~40ms stagger (not noisy glitch)',
    '+02:50 marker appears ~140ms mid-skip',
    'Destination realigns into a complete 19:10 / EVENING card by ~480ms',
    'Reduced motion jumps straight to destination with updated time',
  ],
}
