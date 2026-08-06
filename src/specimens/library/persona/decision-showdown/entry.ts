import type { Specimen } from '../../../types'
export const decisionShowdown: Specimen = {
  id: 'decision-showdown',
  ref: 'SPX-196',
  title: 'Decision Showdown',
  blurb:
    'Confrontational YES/NO confirmation where opposing graphic panels expand and retreat — selection moves both sides, with distinct DELETED vs CANCELLED demo outcomes.',
  origin: {
    project: 'Original',
    surface: 'Persona 5 confrontational confirmation language',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-5'],
  },
  tags: ['confirmation', 'selection', 'clip-path'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Selection snaps between final YES/NO compositions and confirmation jumps to DELETED/CANCELLED under prefers-reduced-motion or data-force-reduced-motion.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 300,
    background: 'dark',

    label: 'Destructive confirmation (demo)',
  },

}
