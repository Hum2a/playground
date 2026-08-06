import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#161d21;">
  {{specimen}}
</div>
`.trim()

export const superEffectiveHit: Specimen = {
  id: 'super-effective-hit',
  ref: 'SPX-324',
  title: 'Super Effective Hit',
  blurb:
    'An action token hits a target card; a small contact response is followed by a stronger secondary burst of six wedges and a diagonal slash, then MATCH // OPTIMAL.',
  origin: {
    project: 'Original',
    surface: 'Pokémon super-effective–inspired impact feedback (original geometry)',
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
  tags: ['impact', 'feedback', 'effective'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Travel, contact, and secondary burst are skipped; MATCH // OPTIMAL, HIGH EFFECTIVENESS, and a static accent appear immediately under prefers-reduced-motion or data-force-reduced-motion.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 300,
    background: 'dark',
    scaffold,
    label: 'Super effective hit demo',
  },
  integration: [
    'Mount in a relative overflow-hidden host with room for the ~90px token approach.',
    'Import demo.css verbatim; freeze travel/contact/secondary timings and six wedge lengths/angles.',
    'Wire runSuperEffectiveHit / resetSuperEffectiveHit; state text updates only after secondary impact.',
    'Keep token/wedges/slash aria-hidden; announce via polite status + OPTIMAL / HIGH EFFECTIVENESS text.',
    'Honour both reduced-motion triggers with an immediate optimal state.',
  ],
  acceptance: [
    'Action token visibly travels into the target',
    'Target gives a small initial contact response, then a clearly stronger secondary response',
    'Exactly six impact wedges; secondary is temporally distinct (~55ms after contact)',
    'State changes only after effectiveness feedback; MATCH // OPTIMAL via vertical clip + HIGH EFFECTIVENESS from below',
    'No looping impact or screen shake; final state is static',
    'Reduced motion immediately shows OPTIMAL; works ~320–768px',
  ],
}
