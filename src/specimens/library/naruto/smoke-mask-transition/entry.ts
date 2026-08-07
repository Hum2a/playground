import type { Specimen } from '../../../types'

export const smokeMaskTransition: Specimen = {
  id: 'smoke-mask-transition',
  ref: 'SPX-2439',
  title: 'Smoke Mask Transition',
  blurb:
    'Six irregular smoke-blot clips billow to full cover by 300ms, swap content identity under cover, then disperse by 700ms — not a round fade.',
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
  tags: ['reveal', 'cover', 'clip-path', 'smoke'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the state swaps immediately with no puff cover/disperse choreography.',
  },
  acceptance: [
    'Six irregular polygon blot clips cover then disperse',
    'Content swaps only under cover at 300ms',
    'Reduced motion swaps immediately',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 380,
    height: 360,
    background: 'dark',
    label: 'Smoke mask transition',
  },
}
