import type { Specimen } from '../types'
export const deadlineClock: Specimen = {
  id: 'deadline-clock',
  ref: 'SPX-535',
  title: 'Deadline Clock',
  blurb:
    'A pale clock perimeter closes around a submission window as time runs out — enclosure marks and compressed type, not a remaining-progress bar.',
  origin: {
    project: 'Original',
    surface: 'Persona 3–inspired temporal deadline language',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-3'],
  },
  tags: ['time', 'deadline', 'enclosure'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Arc growth and letter-spacing transitions are skipped under prefers-reduced-motion or data-force-reduced-motion; deadline states change immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 340,
    background: 'dark',

    label: 'Deadline enclosure clock',
  },

}
