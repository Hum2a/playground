import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:360px;background:#0c0a12;">
  {{specimen}}
</div>
`.trim()

export const evolutionComplete: Specimen = {
  id: 'evolution-complete',
  ref: 'SPX-726',
  title: 'Evolution Complete',
  blurb:
    'Form 02 is already present but unregistered — it settles, a ring contracts with four cardinal locks, then a hard sweep makes the identity CANONICAL while PREVIOUS // FORM 01 archives.',
  origin: {
    project: 'Original',
    surface: 'Pokémon-inspired evolution completion / registration language',
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
  tags: ['completion', 'transformation', 'identity'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, CANONICAL Form 02 with archived previous marker appears immediately.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 320,
    height: 380,
    background: 'dark',
    scaffold,
    label: 'Evolution complete',
  },
  integration: [
    'Mount inside a relative host (~320×360+).',
    'Import demo.css verbatim; keep Form B clip-path, settle 180ms, ring 160%→112% / 260ms, and four cardinals.',
    'Call evolutionComplete.run() / .reset() or use REGISTER / RESET.',
    'Status must wipe with the sweep — no opacity fade between UNREGISTERED and CANONICAL.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with an immediate canonical path.',
  ],
  acceptance: [
    'Begins with Form 02 already present and UNREGISTERED',
    'Entity settles from scale 1.08 / translateY(-6px) to rest over ~180ms',
    'Registration ring contracts ~160% → 112% over ~260ms',
    'Exactly four cardinal markers lock onto the ring',
    'Status becomes CANONICAL only during the left→right sweep (no fade)',
    'PREVIOUS // FORM 01 remains as historical metadata in an archive position',
    'Final state is static; reduced motion immediate; no Pokémon assets',
  ],
}
