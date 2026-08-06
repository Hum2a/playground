import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#12141a;">
  {{specimen}}
</div>
`.trim()

export const ultraStateOptimisation: Specimen = {
  id: 'ultra-state-optimisation',
  ref: 'SPX-992',
  title: 'Ultra State Optimisation',
  blurb:
    'A noisy runtime pauses, sheds wasted motion and overhead, and settles into a calmer high-performance ULTRA state — same useful work, less noise.',
  origin: {
    project: 'Original',
    surface: 'Dragon Ball–inspired calm high-performance optimisation language',
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
  tags: ['optimisation', 'transformation', 'performance'],
  deps: 'none',
  motion: {
    loops: true,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Initial loops are suppressed under prefers-reduced-motion or data-force-reduced-motion; OPTIMISE immediately shows the final ULTRA state with no travel choreography.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 340,
    background: 'dark',
    scaffold,
    label: 'Runtime optimisation stage',
  },
  integration: [
    'Mount inside a relative overflow-hidden host.',
    'Keep frozen counts (12 markers, 2 spins, 3 bars) and metric sequences from contract.json.',
    'Call runUltraOptimise / resetUltraOptimise; honour the 90ms hard pause before subtraction.',
    'Final ULTRA state must have zero looping animation and no franchise naming in the UI.',
  ],
  acceptance: [
    'Initial state shows activity noise with exactly 12 markers, 2 rotators, 3 bars',
    'OPTIMISE begins with a deliberate 90ms hard pause',
    'Markers retract in 3 groups of 4; rotators stop then shrink; bars reduce to one',
    'CPU 84→31, QUEUE 17→0, TASKS stays 42',
    'Four of six peripherals retract; core scales to ~92%',
    'Final state: one static 8×8 diamond, MODE ULTRA, no loops, no glow aura',
    'Reduced motion shows ULTRA immediately',
    'No franchise names/symbols in specimen chrome',
  ],
}
