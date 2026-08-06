import type { Specimen } from '../../../types'
export const blueprintAssembly: Specimen = {
  id: 'blueprint-assembly',
  ref: 'SPX-2085',
  title: 'Blueprint Assembly',
  blurb:
    'Four exploded blueprint parts converge on a grid stage and resolve into a finished CAPTURE RIG device diagram.',
  origin: {
    project: 'Original',
    surface: 'My Hero Academia-inspired support-course gadget blueprint UI',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'my-hero-academia',
  },
  tags: ['blueprint', 'assembly', 'gadget', 'comic'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under reduced motion, parts hide immediately and CAPTURE RIG device appears at center.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 280,
    background: 'card',

    label: 'Gadget blueprint',
  },

}
