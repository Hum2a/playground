import type { Specimen } from '../../../types'

export const waterWavePageTransition: Specimen = {
  id: 'water-wave-page-transition',
  ref: 'SPX-2451',
  title: 'Water Wave Page Transition',
  blurb:
    'A cool-cyan jagged wave clip sweeps −108%→108% in 650ms, swapping page identity at 320ms — water wipe, distinct from wind blades.',
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
    'Wave sweeps -108%→108% in 650ms with frozen clipSteps',
    'Page swaps at 320ms under cover; water cyan ≠ wind steel',
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
