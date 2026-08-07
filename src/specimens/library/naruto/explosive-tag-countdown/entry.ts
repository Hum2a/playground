import type { Specimen } from '../../../types'

export const explosiveTagCountdown: Specimen = {
  id: 'explosive-tag-countdown',
  ref: 'SPX-2433',
  title: 'Explosive Tag Countdown',
  blurb:
    'Seal tag arms, counts 3→2→1 with rising pulse intensity, detonates, then CLEAR hold.',
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
      'Under prefers-reduced-motion or data-force-reduced-motion, the tag appears CLEAR immediately.',
  },
    acceptance: [
    'Arm 220ms then count 3→2→1 with rising pulse intensity (480/340/220ms)',
    'Burst 240ms then CLEAR with clearHoldMs 220',
    'Intensity escalation via pulse duration, not opacity-only flash',
    'Replay restores IDLE before rerunning',
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
