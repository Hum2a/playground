import type { Specimen } from '../../../types'

export const scrollToPanelTransform: Specimen = {
  id: 'scroll-to-panel-transform',
  ref: 'SPX-2366',
  title: 'Scroll-to-Panel Transform',
  blurb:
    'A 64px round scroll token morphs width/height/radius into a 176px panel over 480ms — continuous shape transform, not a crossfade.',
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
    '64px circle morphs to 176px panel (radius 50%→10px) in 480ms',
    'Panel copy delays 260ms; no dual-card crossfade',
    'Reduced motion shows expanded panel immediately',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 320,
    background: 'dark',
    label: 'Scroll-to-panel transform',
  },
}
