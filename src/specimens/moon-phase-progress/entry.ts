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

export const moonPhaseProgress: Specimen = {
  id: 'moon-phase-progress',
  ref: 'SPX-456',
  title: 'Moon Phase Progress',
  blurb:
    'Archive completion as a waxing moon: a dark shade slides off a pale disc so 0% reads new, 50% half, and 100% full — with restrained milestone ticks and a single completion halo.',
  origin: {
    project: 'Original',
    surface: 'Lunar progress visualisation',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-3'],
  },
  tags: ['progress', 'lunar', 'visualisation'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Shade snaps to the target phase under prefers-reduced-motion or data-force-reduced-motion; milestone ticks and the 100% halo are omitted.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 340,
    background: 'dark',
    scaffold,
    label: 'Archive completion moon',
  },
  integration: [
    'Mount inside a relative host; keep the moon circular via equal width/height and border-radius 50%.',
    'Import demo.css verbatim; keep shade translateX(calc(progress * -1%)) mapping and frozen palette.',
    'Wire setMoonProgress / bumpMoonProgress / resetMoonProgress; use type=button controls under sandbox allow-scripts.',
    'Expose role=progressbar with immediate aria-valuetext; keep moon geometry aria-hidden.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion with an immediate phase snap.',
  ],
  acceptance: [
    'Moon is the primary progress visual; no conventional progress bar',
    '0% reads dark/new; 25% crescent; 50% half; 75% gibbous; 100% full',
    'Intermediate values continuously alter shade occlusion geometry',
    'Mapping is deterministic: shade translateX = progress * -1% of diameter, waxing right→left',
    'Milestone ticks at 25/50/75 fire once each (~160ms); 100% gets one halo then FULL',
    'Nothing loops after completion; RESET returns to 0%',
    'role=progressbar announces Archive completion, N percent.',
    'Reduced motion snaps phase; no halo/ticks; no external imagery/libraries',
    'Exact phase construction frozen in contract.json',
  ],
}
