import type { Specimen } from '../../../types'
export const paperStackShuffle: Specimen = {
  id: 'paper-stack-shuffle',
  ref: 'SPX-015',
  title: 'Paper stack shuffle',
  blurb:
    'Four irregular paper sheets shuffle like a physical stack: front lifts out, others advance, extracted card settles at the back.',
  origin: {
    project: 'Original',
    surface: 'Persona 5–inspired paper/collage interface language',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-5'],
  },
  tags: ['selection', 'content-switch', 'paper', 'stack'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'No extraction flight; selection and depth poses update immediately while the stacked composition remains.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 340,
    background: 'dark',

    label: 'Paper stack selection',
  },

}
