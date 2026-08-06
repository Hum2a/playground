import type { Specimen } from '../../../types'
export const cardToDetailContainerTransform: Specimen = {
  id: 'card-to-detail-container-transform',
  ref: 'SPX-1558',
  title: 'Card-to-Detail Container Transform',
  blurb:
    'Middle list card morphs into a detail surface over 420ms with persistent title, metadata fade, and measured geometry.',
  origin: {
    project: 'Original',
    surface: 'Android Material container transform',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['container-transform', 'navigation'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Immediate geometry switch with short opacity handoff ≤100ms.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 620,
    background: 'dark',

    label: 'Card to detail transform',
  },

}
