import type { Specimen } from '../../../types'

export const transformationMorph: Specimen = {
  id: 'transformation-morph',
  ref: 'SPX-2402',
  title: 'Transformation Morph',
  blurb:
    'Scout collapses to scale 0.12, holds as an ink blot (120ms), then expands into Sentinel — inheriting the PEAK trait mark.',
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
  tags: ['morph', 'identity', 'ink'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, Profile B appears immediately with the inherited PEAK mark.',
  },
  acceptance: [
    'Collapse → ink intermediate (120ms) → expand; collapse scale frozen at 0.12',
    'Profile B inherits MARK · PEAK — intermediate is not a crossfade',
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
