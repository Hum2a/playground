import type { Specimen } from '../../../types'
export const scrollRubberBand: Specimen = {
  id: 'scroll-rubber-band',
  ref: 'SPX-1361',
  title: 'Scroll Rubber Band',
  blurb:
    'ACTIVITY LOG list with non-linear top overscroll resistance, boundary stretch, RELEASE marker at 60px, and ~420ms spring return — no refresh.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired scroll boundary physics',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['ios'],
  },
  tags: ['scroll', 'physics', 'spring', 'rubber-band'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, overscroll is capped at 12px static resist and returns immediately on release.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 440,
    background: 'dark',

    label: 'Activity log rubber band',
  },

}
