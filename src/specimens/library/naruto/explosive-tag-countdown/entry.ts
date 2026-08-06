import type { Specimen } from '../../../types'

export const explosiveTagCountdown: Specimen = {
  id: 'explosive-tag-countdown',
  ref: 'SPX-2433',
  title: 'Explosive Tag Countdown',
  blurb:
    'An attached warning tag arms, counts 3-2-1 through increasingly urgent pulses, detonates, and settles cleared — abstract graphic tag, no copyrighted iconography.',
  origin: {
    project: 'Original',
    surface: 'Naruto / ninja-fiction action-language study — paper-bomb-style countdown',
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
  tags: ['countdown', 'warning', 'timer'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the tag resolves directly to CLEAR with no arm/count/burst choreography.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 380,
    height: 380,
    background: 'dark',
    label: 'Explosive tag countdown',
  },
}
