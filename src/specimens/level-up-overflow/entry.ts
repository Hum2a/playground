import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#e4e2dc;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>
`.trim()

export const levelUpOverflow: Specimen = {
  id: 'level-up-overflow',
  ref: 'SPX-762',
  title: 'Level Up Overflow',
  blurb:
    'SPECIMEN MASTERY: Level 12 at 87/100 receives +38 XP, fills to 100%, levels to 13, resets, then carries 25 XP into the new bar — threshold crossing without lost progress.',
  origin: {
    project: 'Original',
    surface: 'Pokemon-inspired XP level-up overflow progression',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'pokemon',
  },
  tags: ['progress', 'threshold', 'overflow'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, jumps to Level 13 at 25/100 with optional +38 XP APPLIED — no intermediate fill.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 380,
    height: 300,
    background: 'card',
    scaffold,
    label: 'Mastery XP overflow (demo)',
  },
  integration: [
    'Mount inline; keep the 300×12px bar and clipped level slot as the portable contract.',
    'Call runLevelUpOverflow from ADD XP; never animate 87%→25% directly.',
    'Reset progressbar semantics when the level increments (0/100 then 25/100).',
    'Exactly two threshold ticks at 100%; announce final level and XP once.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with an immediate final state.',
  ],
  acceptance: [
    'Starts Level 12 at 87/100; reward is exactly +38',
    'Bar reaches 100% before reset; level increments only after threshold; exactly two markers',
    'Bar resets only after level becomes 13; remaining 25 XP fills the new level',
    'Ends Level 13 at 25/100; no progress visually lost; final state static',
    'Reduced motion presents correct final state immediately',
  ],
}
