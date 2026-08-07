import type { Specimen } from '../../../types'

export const multiKeySeal: Specimen = {
  id: 'multi-key-seal',
  ref: 'SPX-2378',
  title: 'Multi-Key Seal',
  blurb:
    'Three prerequisite keys snap-arm in order; only then do the seal petals translate open along −90°/30°/150° offsets.',
  origin: {
    project: 'Original',
    surface: 'Naruto / ninja-fiction fūinjutsu study — multi-key seal opening',
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
  tags: ['seal', 'prerequisite', 'unlock'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, all three key nodes appear armed and the seal petals appear already open.',
  },
  acceptance: [
    'Exactly 3 keys arm at 150ms steps before petals translate open over 300ms',
    'Petal offsets frozen at [0,-13]/[11,7]/[-11,7] px along −90°/30°/150° — not opacity fade',
    'Core scale-pulses once for 150ms on OPEN; reduced motion shows armed+open immediately',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 360,
    background: 'dark',
    label: 'Multi-key seal',
  },
}
