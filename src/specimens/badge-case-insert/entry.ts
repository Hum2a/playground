import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:380px;background:#0e0c08;">
  {{specimen}}
</div>
`.trim()

export const badgeCaseInsert: Specimen = {
  id: 'badge-case-insert',
  ref: 'SPX-844',
  title: 'Badge Case Insert',
  blurb:
    'A newly earned abstract badge targets slot 6 of a rigid Trial Archive, docks with a compress, and only then advances the collection from 5/8 to 6/8.',
  origin: {
    project: 'Original',
    surface: 'Pokémon-inspired badge case / collection insert language',
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
  tags: ['collection', 'achievement', 'insert'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, six occupied slots and 6/8 appear immediately with no travel or dock choreography.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 340,
    height: 400,
    background: 'dark',
    scaffold,
    label: 'Badge case insert',
  },
  integration: [
    'Mount inside a relative host (~340×380+).',
    'Import demo.css verbatim; keep 58px slots, 10px gaps, 4×2 grid, and post-dock progress timing.',
    'Call badgeCaseInsert.store() / .reset() or use STORE BADGE / RESET.',
    'Progress text and track must remain 5/8 until docking completes.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with an immediate stored path.',
  ],
  acceptance: [
    'Exactly eight slots; five begin occupied; slots 7–8 stay empty',
    'Slot 6 is visibly targeted with four corner markers before travel',
    'Incoming badge starts outside the case (~80px above, scale 1.25) and docks into slot 6',
    'Travel ~320ms with scale 1.25→0.78; dock compress 0.78→0.70→0.80→0.78',
    'Progress stays 5/8 until dock, then becomes 6/8 with track 62.5%→75%',
    'Final state static; reduced motion immediate; no Pokémon badge art',
  ],
}
