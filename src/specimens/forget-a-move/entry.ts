import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:360px;background:#141a1e;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>
`.trim()

export const forgetAMove: Specimen = {
  id: 'forget-a-move',
  ref: 'SPX-816',
  title: 'Forget a Move',
  blurb:
    'Four capabilities hold SCAN FILTER EXPORT CACHE; REPLACE compresses the selected slot, breaks its outline, then installs SYNC into the vacant place before a sweep locks the new set.',
  origin: {
    project: 'Original',
    surface: 'Pokémon-inspired forget-a-move / capability replacement (abstract)',
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
  tags: ['replacement', 'capability', 'decision'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, radiogroup selection remains; REPLACE instantly swaps the selected label to SYNC with no compress/break/travel choreography.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 420,
    height: 360,
    background: 'dark',
    scaffold,
    label: 'Forget a Move capability replacement',
  },
  integration: [
    'Mount inside a relative host (~420×360+).',
    'Import demo.css verbatim; keep compress / break / vacancy / install / sweep timings.',
    'Wire REPLACE via runForgetMove; RESET / harness restart via resetForgetMove.',
    'Default selection is CACHE; selected slot shows exactly four corner brackets without permanent text resize.',
    'Announce “Replace {label} with SYNC.” once on REPLACE; honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Idle shows SCAN FILTER EXPORT CACHE with incoming SYNC',
    'Radiogroup selects one slot; selected has exactly four angular corner brackets',
    'REPLACE compresses, breaks outline into four segments, holds vacant 100ms, then installs SYNC',
    'Final set is SCAN FILTER EXPORT SYNC after a 160ms horizontal sweep',
    'Reduced motion: selection usable; REPLACE instantly swaps label to SYNC',
    'Status announces Replace CACHE with SYNC. (canonical)',
  ],
}
