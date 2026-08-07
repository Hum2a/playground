import type { Specimen } from '../../../types'

export const waterWavePageTransition: Specimen = {
  id: 'water-wave-page-transition',
  ref: 'SPX-2451',
  title: 'Water Wave Page Transition',
  blurb:
    'A jagged blue wave mask sweeps horizontally across the stage, exchanging page content mid-sweep — graphic CSS water, not a fluid simulation.',
  origin: {
    project: 'Original',
    surface: 'Naruto / ninja-fiction action-language study — water-style page transitions',
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
  tags: ['wipe', 'clip-path'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the page swaps immediately with no wave sweep.',
  },
  acceptance: [
    'Wave wipe uses frozen clip-path steps',
    'Page B identity visible after wipe completes',
    'Reduced motion instant page swap',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 380,
    height: 360,
    background: 'dark',
    label: 'Water wave page transition',
  },
}
