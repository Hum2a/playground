import type { Specimen } from '../../../types'

export const moonOrbitSelection: Specimen = {
  id: 'moon-orbit-selection',
  ref: 'SPX-465',
  title: 'Moon Orbit Selection',
  blurb:
    'Five fixed destinations sit around a 260px orbit while a 34px crescent moon travels the shortest arc to the active option.',
  origin: {
    project: 'Original',
    surface: 'Persona 3–inspired lunar selection ring',
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
  tags: ['lunar', 'orbit', 'selection'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'The crescent jumps to the target slot with no travel under prefers-reduced-motion or data-force-reduced-motion.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 620,
    height: 420,
    background: 'dark',
    label: 'Moon orbit selection',
  },
}
