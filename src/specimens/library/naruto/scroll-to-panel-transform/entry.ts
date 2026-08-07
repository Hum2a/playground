import type { Specimen } from '../../../types'

export const scrollToPanelTransform: Specimen = {
  id: 'scroll-to-panel-transform',
  ref: 'SPX-2366',
  title: 'Scroll-to-Panel Transform',
  blurb:
    'A 64px scroll token morphs via scale and clip-path (480ms) into a 176px panel — one continuous container, no content crossfade.',
  origin: {
    project: 'Original',
    surface: 'Naruto / ninja-fiction scroll-language study — token-to-panel morph',
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
  tags: ['scroll', 'morph', 'container', 'clip-path'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the panel appears fully expanded with content visible immediately; no shape morph plays.',
  },
  acceptance: [
    'Morph uses scale/clip (not opacity crossfade)',
    'Token 64px → panel 176px in 480ms',
    'Reduced motion shows OPENED immediately',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 320,
    background: 'dark',
    label: 'Scroll-to-panel transform',
  },
}
