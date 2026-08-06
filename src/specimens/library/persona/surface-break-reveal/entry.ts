import type { Specimen } from '../../../types'
export const surfaceBreakReveal: Specimen = {
  id: 'surface-break-reveal',
  ref: 'SPX-408',
  title: 'Surface Break Reveal',
  blurb:
    'A submerged unknown record rises through a graphic waterline — distorted below, sharp above — then a restrained surface reaction and exit leave RECORD // 045 / RECOVERED clear.',
  origin: {
    project: 'Original',
    surface: 'Persona 3 water / depth reveal language',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-3'],
  },
  tags: ['reveal', 'water', 'threshold'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the recovered clear state appears immediately with no ascent or water travel.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 340,
    background: 'dark',

    label: 'Surface break reveal',
  },

}
