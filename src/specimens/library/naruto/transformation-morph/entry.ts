import type { Specimen } from '../../../types'

export const transformationMorph: Specimen = {
  id: 'transformation-morph',
  ref: 'SPX-2402',
  title: 'Transformation Morph',
  blurb:
    'Scout collapses into an ink silhouette, then expands into Sentinel with a visible FROM SCOUT inheritance mark.',
  origin: {
    project: 'Original',
    surface: 'Naruto / ninja-fiction transformation study — identity morph',
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
  tags: ['morph', 'ink', 'identity', 'inheritance'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, Profile B appears immediately with no collapse or ink hold.',
  },
  acceptance: [
    'Collapse → ink hold 120ms → expand Profile B',
    'Resolved card shows FROM SCOUT trait inheritance',
    'Reduced motion shows Profile B immediately',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 340,
    height: 320,
    background: 'dark',
    label: 'Transformation morph',
  },
}
