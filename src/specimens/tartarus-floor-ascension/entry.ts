import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#030a12;">
  {{specimen}}
</div>
`.trim()

export const tartarusFloorAscension: Specimen = {
  id: 'tartarus-floor-ascension',
  ref: 'SPX-468',
  title: 'Tartarus Floor Ascension',
  blurb:
    'Stacked architectural floor slabs ascend: the current rises past the viewer while the next locks in from below.',
  origin: {
    project: 'Original',
    surface: 'Persona 3–inspired Tartarus vertical progression language',
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
  tags: ['progress', 'navigation', 'vertical'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Vertical travel is skipped under prefers-reduced-motion or data-force-reduced-motion; the active floor and stack positions update immediately.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 340,
    background: 'dark',
    scaffold,
    label: 'Tartarus floor stack',
  },
  integration: [
    'Mount inside a relative overflow-hidden host so offscreen slabs clip.',
    'Import demo.css verbatim; keep frozen stack translates/scales and timing.',
    'Call ascendTartarusFloor / descendTartarusFloor / resetTartarusFloor; rebuild after each move to avoid drift.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion with immediate stack rebuild.',
  ],
  acceptance: [
    'At least three depth layers visible (current / next / future)',
    'ASCEND moves current upward beyond canonical position while scaling up slightly',
    'Next floor rises from below; future advances into next slot',
    'New floor locks with edge brackets and label',
    'Repeated ASCEND rebuilds canonical positions (no cumulative drift)',
    'Floor 043 unknown glass retracts to DISCOVERED after lock',
    'DESCEND uses complementary downward motion (not reverse)',
    'Reduced motion updates stack immediately; live region announces active floor',
    'Works at 320px; no external assets/libraries/network',
  ],
}
