import type { Specimen } from '../types'

export const platinumStyleCompletion: Specimen = {
  id: 'platinum-style-completion',
  ref: 'SPX-3352',
  title: 'Platinum-Style Completion',
  blurb: 'Completing the final achievement transforms the collection into a master platinum completion state.',
  origin: {
    project: 'Original',
    surface: 'PlayStation-inspired UI study — abstract shapes, no official glyphography',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'playstation',
  },
  tags: ["trophy","completion","burst"],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'Platinum panel appears instantly without glow keyframes.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 320,
    background: 'dark',
    label: 'Platinum-style completion',
  },
}
