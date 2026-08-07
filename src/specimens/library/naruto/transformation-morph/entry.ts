import type { Specimen } from '../../../types'

export const transformationMorph: Specimen = {
  id: 'transformation-morph',
  ref: 'SPX-2402',
  title: 'Transformation Morph',
  blurb:
    'Profile A collapses into an ink blot, holds, then expands into Profile B — SPEED carries over as inherited trait.',
  origin: {
    project: 'Original',
    surface: 'Naruto / ninja-fiction action-language study — transformation & disguise',
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
  tags: ['morph', 'identity', 'silhouette'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the second profile appears immediately with no ink intermediate.',
  },
  acceptance: [
    'Collapse 160ms → ink hold 120ms → expand 180ms with SPEED trait inheritance',
    'Intermediate is an ink blot (scale/geometry), not a simple crossfade',
    'Reduced motion shows Profile B immediately',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 380,
    height: 340,
    background: 'dark',
    label: 'Transformation morph',
  },
}
