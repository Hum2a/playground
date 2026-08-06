import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#040914;">
  {{specimen}}
</div>
`.trim()

export const victoryResultsTally: Specimen = {
  id: 'victory-results-tally',
  ref: 'SPX-014',
  title: 'Victory Results Tally',
  blurb:
    'Elegant post-completion results plate with sequential row reveals and deterministic count-up tallies ending in LEVEL UP.',
  origin: {
    project: 'Original',
    surface: 'Specimen Archive',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'final-fantasy',
  },
  tags: ['tally', 'results', 'count-up'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'All final values and LEVEL UP appear immediately under prefers-reduced-motion or data-force-reduced-motion; no counting or flare movement.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 320,
    background: 'dark',
    scaffold,
    label: 'Activity complete',
  },
  integration: [
    'Mount inside a container with position: relative and overflow: hidden.',
    'Import demo.css verbatim; keep the frozen hex colours, timings, and padded targets.',
    'Call runVictoryResultsTally() from your activity-complete trigger (or wire FINISH ACTIVITY).',
    'Show TOTAL only after SCORE and BONUS have settled; LEVEL UP last with the CSS flare.',
    'Announce finals once via a polite live region — do not expose intermediate count ticks to AT.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with immediate finals.',
  ],
  acceptance: [
    'Rows reveal in fixed order (SCORE → BONUS → TIME → TOTAL → LEVEL UP)',
    'Number animation always lands exactly on 02450 / +0350 / 01:42 / 02800',
    'TOTAL appears only after SCORE and BONUS settle',
    'LEVEL UP appears last with a gold horizontal flare',
    'Reduced motion shows final values immediately',
    'No external assets',
    'Replays reset cleanly to zero/start state via restart',
  ],
}
