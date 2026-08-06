import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:340px;background:#0a0c10;">
  {{specimen}}
</div>
`.trim()

export const winnerAdvance: Specimen = {
  id: 'winner-advance',
  ref: 'SPX-1142',
  title: 'Winner Advance',
  blurb:
    'QUARTER-FINAL // 02 resolves NOVA 84 over KITE 71 (+13); KITE stays ELIMINATED while a compact NOVA token travels the elbow bracket path into SEMI-FINAL — original matchup remains as history.',
  origin: {
    project: 'Original',
    surface: 'Dragon Ball–inspired bracket winner advancement language',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'dragonball',
  },
  tags: ['progression', 'promotion', 'tournament'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the resolved quarter-final and NOVA in the semi-final appear immediately.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 360,
    background: 'dark',
    scaffold,
    label: 'Winner advance',
  },
  integration: [
    'Mount inside a relative overflow-clipped host sized for the 280×200 board.',
    'Import demo.css verbatim; keep path M 118 72 H 178 V 100 H 214 and travel 320ms.',
    'Call resolveWinnerAdvance() from RESOLVE; resetWinnerAdvance() or harness restart returns to unresolved.',
    'Keep the board aria-hidden; announce the outcome via the polite status region.',
    'Honour both reduced-motion triggers with the immediate resolved state.',
  ],
  acceptance: [
    'Two unresolved candidates; scores 84 and 71; delta +13',
    'NOVA selected with two brackets; KITE remains ELIMINATED; original NOVA node stays',
    'Separate 54×26 token follows bracket path corners into SEMI-FINAL // NOVA',
    'Final state static; reduced motion immediately shows resolved state',
    'No franchise assets; sandbox="allow-scripts" safe',
  ],
}
