import type { Specimen } from '../types'
export const widgetResizeMorph: Specimen = {
  id: 'widget-resize-morph',
  ref: 'SPX-1874',
  title: 'Widget Resize Morph',
  blurb:
    'Activity widget morphs between 2×1, 2×2, and 4×2 grid sizes over 300ms with semantic content reflow and top-left anchor.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired home-screen widget resize',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['widget', 'resize', 'adaptive'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, size changes instantly without morph travel.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 360,
    background: 'dark',

    label: 'Widget resize morph',
  },

}
