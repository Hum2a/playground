import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:360px;background:#070d14;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>
`.trim()

export const chargeRelease: Specimen = {
  id: 'charge-release',
  ref: 'SPX-969',
  title: 'Charge Release',
  blurb:
    'LOCAL charges DEPLOY through a frozen ladder; RELEASE unlocks at 70%, launches at 85% with three afterimages, and commits PRODUCTION to DEPLOYED.',
  origin: {
    project: 'Original',
    surface: 'Dragon Ball–inspired charge → release / commit (abstract)',
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
  tags: ['commit', 'execution', 'charge'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, charge steps may snap; RELEASE immediately shows PRODUCTION DEPLOYED, charge 0%, and COMMITTED with no travel.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 520,
    height: 360,
    background: 'dark',
    scaffold,
    label: 'Charge then release deploy',
  },
  integration: [
    'Mount inside a relative host (~520×360+).',
    'Import demo.css verbatim; keep charge ladder, node sizes, and release timings frozen.',
    'CHARGE auto-sequences discrete percents; RELEASE stays disabled below 70%.',
    'Canonical API: runChargeRelease charges to 85% then commits; resetChargeRelease restores REVERSIBLE idle.',
    'After release begins, metadata is COMMITTED and the operation cannot be cancelled.',
  ],
  acceptance: [
    'RELEASE disabled below 70%; available at 70%+ with READY TO RELEASE',
    'Canonical release at 85%; node grows through frozen sizes',
    'Release compresses, travels ~340ms with exactly three afterimages, one impact ring',
    'Metadata REVERSIBLE → COMMITTED; target DEPLOYED; charge resets to 0%',
    'Final state static; reduced motion skips travel on release',
  ],
}
