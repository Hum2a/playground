import type { Specimen } from '../../../types'
export const memoryFragmentReveal: Specimen = {
  id: 'memory-fragment-reveal',
  ref: 'SPX-622',
  title: 'Memory Fragment Reveal',
  blurb:
    'Six translucent blue fragments carrying partial memory text converge into MEMORY // 03 / ARCHIVE — reconstruction before comprehension, seams still visible.',
  origin: {
    project: 'Original',
    surface: 'Persona 3–inspired memory / identity reconstruction',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-3', 'persona-3-reload'],
  },
  tags: ['reconstruction', 'reveal', 'memory'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the assembled plate with seams, rule, and secondary copy appears immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 360,
    background: 'dark',

    label: 'Memory fragment reconstruction',
  },

}
