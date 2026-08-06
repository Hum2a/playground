import type { Specimen } from '../types'

export const vhsTrackingScrub: Specimen = {
  id: 'vhs-tracking-scrub',
  ref: 'SPX-3037',
  title: 'VHS Tracking Scrub',
  blurb:
    'A tracking slider deliberately introduces and then removes horizontal tracking errors on a VHS-style feed.',
  origin: {
    project: 'Original',
    surface: 'Persona 4 analogue VHS broadcast study',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-4'],
  },
  tags: ['vhs', 'tracking', 'tear', 'scrub'],
  deps: 'none',
  motion: {
    loops: true,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Tear and drift animations stop under reduced motion; static offset remains visible.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 300,
    background: 'dark',
    label: 'VHS tracking dial',
  },
}
