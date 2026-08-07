import type { Specimen } from '../../../types'

export const smokeMaskTransition: Specimen = {
  id: 'smoke-mask-transition',
  ref: 'SPX-2439',
  title: 'Smoke Mask Transition',
  blurb:
    'Overlapping abstract circles billow in to fully cover the stage, a content swap happens under cover, then the circles disperse to reveal the new state — graphic CSS smoke, no photographic assets.',
  origin: {
    project: 'Original',
    surface: 'Naruto / ninja-fiction action-language study — smoke-concealment transitions',
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
  tags: ['reveal', 'cover'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the state swaps immediately with no circle cover/disperse choreography.',
  },
  acceptance: [
    'Smoke mask covers then content identity swaps mid-cover',
    'Mask keyframes frozen; A≠B after swap',
    'Reduced motion instant swaps without choreography',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 380,
    height: 360,
    background: 'dark',
    label: 'Smoke mask transition',
  },
}
