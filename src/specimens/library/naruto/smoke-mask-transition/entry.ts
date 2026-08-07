import type { Specimen } from '../../../types'

export const smokeMaskTransition: Specimen = {
  id: 'smoke-mask-transition',
  ref: 'SPX-2439',
  title: 'Smoke Mask Transition',
  blurb:
    'Six smoke circles billow to full cover by 300ms, swap state identity under the mask, then disperse by 700ms — graphic CSS smoke, no photographic assets.',
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
    '6 circles fully cover by 300ms before A↔B swap',
    'After 700ms revealed identity differs (A≠B)',
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
