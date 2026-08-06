import type { Specimen } from '../types'

export const sealStampConfirmation: Specimen = {
  id: 'seal-stamp-confirmation',
  ref: 'SPX-2379',
  title: 'Seal Stamp Confirmation',
  blurb:
    'A stamp descends and strikes a document in one decisive motion, leaving a single ink seal mark as the confirmation.',
  origin: {
    project: 'Original',
    surface: 'Naruto / ninja-fiction mission-filing language — one-stamp confirmation',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'naruto',
  },
  tags: ['stamp', 'confirmation', 'impact'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the stamp appears already struck with the ink mark visible; no descent or impact plays.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 340,
    height: 320,
    background: 'dark',
    label: 'Seal stamp confirmation',
  },
}
