import type { Specimen } from '../../../types'

export const jrpgTurnOrderAssemble: Specimen = {
  id: 'jrpg-turn-order-assemble',
  ref: 'SPX-1215',
  title: 'JRPG Turn Order Assemble',
  blurb:
    'Six original battle actors snap from scattered positions into a fixed, readable action queue.',
  origin: { project: 'Original', surface: 'JRPG-style battle turn-order HUD' },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  tags: ['timeline', 'queue', 'turn-order', 'assembly'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'All six tokens appear at their fixed queue positions immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 260,
    background: 'dark',
    label: 'JRPG turn-order timeline',
  },
}
