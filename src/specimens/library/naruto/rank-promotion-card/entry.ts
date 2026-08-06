import type { Specimen } from '../../../types'

export const rankPromotionCard: Specimen = {
  id: 'rank-promotion-card',
  ref: 'SPX-2544',
  title: 'Rank Promotion Card',
  blurb:
    'A ninja profile card transforms from one rank treatment into the next — the current badge folds away and the new rank settles in.',
  origin: {
    project: 'Original',
    surface: 'Naruto / ninja-rank-promotion — profile transformation',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'naruto',
  },
  tags: ['promotion', 'rank', 'profile'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the card shows the promoted rank immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 340,
    background: 'dark',
    label: 'Rank promotion card',
  },
}
