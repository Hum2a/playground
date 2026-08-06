import type { Specimen } from '../types'
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
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 360,
    background: 'dark',

    label: 'Winner advance',
  },

}
