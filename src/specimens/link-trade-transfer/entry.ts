import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:340px;background:#0e1218;">
  {{specimen}}
</div>
`.trim()

export const linkTradeTransfer: Specimen = {
  id: 'link-trade-transfer',
  ref: 'SPX-829',
  title: 'Link Trade Transfer',
  blurb:
    'VECTOR and PRISM leave two endpoints, cross on offset paths through a joined link channel, and arrive opposite — ownership labels update only after arrival.',
  origin: {
    project: 'Original',
    surface: 'Pokémon link-trade–inspired ownership exchange (abstract)',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'pokemon',
  },
  tags: ['transfer', 'exchange', 'ownership'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, TRADE immediately swaps ownership (A→PRISM, B→VECTOR) and shows TRADE COMPLETE.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 460,
    height: 360,
    background: 'dark',
    scaffold,
    label: 'Link trade transfer',
  },
  integration: [
    'Mount inside a relative host (~460×340+; scales down near 320px).',
    'Import demo.css verbatim; keep frozen ±10px path offsets and phase timings.',
    'Call trade/reset via window.linkTradeTransfer or the controls.',
    'Do not update ownership labels until entities arrive at opposite endpoints.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with an immediate swap.',
  ],
  acceptance: [
    'Two endpoints NODE // A and NODE // B with VECTOR and PRISM',
    'Link segments join (~160ms); both entities shrink and depart together',
    'Paths offset ±10px; entities cross at centre with one diamond flash',
    'Ownership text swaps only after arrival; link tears down (~180ms)',
    'Final state static with exchanged ownership; reduced motion immediate',
    'No external assets; works under sandbox="allow-scripts"',
  ],
}
