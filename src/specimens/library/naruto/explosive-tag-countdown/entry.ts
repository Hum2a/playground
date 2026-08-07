import type { Specimen } from '../../../types'

export const explosiveTagCountdown: Specimen = {
  id: 'explosive-tag-countdown',
  ref: 'SPX-2433',
  title: 'Explosive Tag Countdown',
  blurb:
    'Tag arms 220ms, counts 3→2→1 at 480ms with escalating pulse (1.04→1.14), bursts 240ms, then CLEAR — abstract warning tag, no copyrighted iconography.',
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
  acceptance: [
    'Arm 220ms then digits 3→2→1 at 480ms each (pulse 1.04/1.08/1.14)',
    'Burst 240ms then CLEAR settle 200ms',
    'Reduced motion shows CLEAR immediately',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 380,
    height: 380,
    background: 'dark',
    label: 'Explosive tag countdown',
  },
}
