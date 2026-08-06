import type { Specimen } from '../../../types'

export const weakPointDetection: Specimen = {
  id: 'weak-point-detection',
  ref: 'SPX-2490',
  title: 'Weak-Point Detection',
  blurb:
    'A vertical scan sweeps a wireframe diagram and brackets four weak points as it crosses them, resolving to a fully annotated readout.',
  origin: {
    project: 'Original',
    surface: 'Naruto / dojutsu-inspired focus-vision language — analysis overlays',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'naruto',
  },
  tags: ['detection'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, all four weak points appear bracketed immediately with the scan line parked at the base.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 340,
    background: 'dark',
    label: 'Weak-point detection scan',
  },
}
