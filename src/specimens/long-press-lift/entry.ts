import type { Specimen } from '../types'
export const longPressLift: Specimen = {
  id: 'long-press-lift',
  ref: 'SPX-1391',
  title: 'Long-Press Lift',
  blurb:
    'Hold MESSAGE // 04 for 420ms to lift the card (scale 1.035, −4px); neighbours recede to 0.975; four corner ticks and COPY PIN DELETE rail appear after 160ms.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired long-press context lift',
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
  tags: ['press', 'context', 'elevation'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, lifted/context state appears instantly without scale or translation.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 380,
    background: 'dark',

    label: 'Long-press lift',
  },

}
