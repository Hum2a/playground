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

export const progressMilestoneBreakthrough: Specimen = {
  id: 'progress-milestone-breakthrough',
  ref: 'SPX-167',
  title: 'Progress Milestone Breakthrough',
  blurb:
    'Progress fill advances quietly, then collides with a 60% barrier, resists, and breaks through — with a decorative overshoot that never changes the logical value.',
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
  tags: ['progress', 'milestone', 'threshold'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Immediately shows 60% with static MILESTONE — 60% COMPLETE under prefers-reduced-motion or data-force-reduced-motion; no collision or breakthrough choreography.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 380,
    height: 340,
    background: 'dark',
    scaffold,
    label: 'Sync progress',
  },
  integration: [
    'Mount inside a relative overflow-hidden frame (~380×320+) so marker fragments clip safely.',
    'Import demo.css verbatim; keep the 60% marker position and frozen breakthrough transforms.',
    'Drive visual width separately from aria-valuenow — decorative overshoot must never become the semantic value.',
    'Wire addProgressMilestone / resetProgressMilestone; one-shot sequence, no endless loop.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with an immediate 60% final state.',
  ],
  acceptance: [
    'Initial progress is below 60% with a visible blocking marker',
    'Fill slows/stops briefly before the threshold; marker bends before breaking',
    'Marker splits into upper/lower fragments plus ~3 scraps',
    'Fill visually overshoots but semantic value stays exactly 60%',
    'Milestone announcement appears; nothing loops',
    'Reduced motion displays the result immediately',
    'No external dependencies, assets, or network',
  ],
}
