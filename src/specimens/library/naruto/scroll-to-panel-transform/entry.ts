import type { Specimen } from '../../../types'

export const scrollToPanelTransform: Specimen = {
  id: 'scroll-to-panel-transform',
  ref: 'SPX-2366',
  title: 'Scroll-to-Panel Transform',
  blurb:
    'A compact round scroll token morphs its own shape and size into a full rectangular content panel — one continuous container, no cut.',
  origin: {
    project: 'Original',
    surface: 'Naruto / ninja-fiction scroll-language study — token-to-panel morph',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'naruto',
  },
  tags: ['scroll', 'morph', 'container'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the panel appears fully expanded with content visible immediately; no shape morph plays.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 320,
    background: 'dark',
    label: 'Scroll-to-panel transform',
  },
}
