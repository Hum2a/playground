import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:380px;background:#0b0f14;">
  {{specimen}}
</div>
`.trim()

export const branchEvolutionChoice: Specimen = {
  id: 'branch-evolution-choice',
  ref: 'SPX-731',
  title: 'Branch Evolution Choice',
  blurb:
    'A shared stem grows into three structural futures; choose PERFORMANCE, BALANCED, or PORTABLE, then watch the current build travel the selected branch while others retract.',
  origin: {
    project: 'Original',
    surface: 'Pokémon-inspired branching evolution language (abstract)',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'pokemon',
  },
  tags: ['decision', 'branching', 'transformation'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, branches appear immediately; selection snaps; Choose jumps to the final identity with no travel/retract choreography.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 400,
    height: 400,
    background: 'dark',
    scaffold,
    label: 'Branch evolution choice',
  },
  integration: [
    'Mount inside a relative host (~400×380+).',
    'Import demo.css verbatim; keep frozen SVG path geometry and stem/branch timings.',
    'Wire evolve → select (radiogroup) → choose via window.branchEvolutionChoice or the controls.',
    'Selection emphasis must thicken the corresponding branch path — do not teleport highlight alone.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with immediate structure / final identity.',
  ],
  acceptance: [
    'One current BUILD // STANDARD; exactly three futures',
    'Branches physically grow from a shared ~45px stem (not fade-only cards)',
    'Keyboard left/right selects; emphasis stays on branch geometry',
    'CHOOSE retracts unselected branches (~220ms); current travels the kept path',
    'Final identity is BUILD // {chosen}; other futures gone; static',
    'Reduced motion usable; no external assets; sandbox allow-scripts',
  ],
}
