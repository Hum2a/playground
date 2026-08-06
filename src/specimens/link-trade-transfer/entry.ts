import type { Specimen } from '../types'
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
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 460,
    height: 360,
    background: 'dark',

    label: 'Link trade transfer',
  },


}
