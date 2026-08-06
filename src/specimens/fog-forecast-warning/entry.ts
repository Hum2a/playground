import type { Specimen } from '../types'

export const fogForecastWarning: Specimen = {
  id: 'fog-forecast-warning',
  ref: 'SPX-3023',
  title: 'Fog Forecast Warning',
  blurb:
    'Upcoming fog/deadline creates a prominent forecast alert with pulsing hazard framing.',
  origin: { project: 'Specimen Archive', surface: 'Persona 4–inspired motion language' },
  facets: {
    kind: 'overlay',
    tech: 'css-only',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-4'],
  },
  tags: ["fog","forecast","warning","deadline"],
  deps: 'none',
  motion: {
    loops: true,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Static warning card under reduced motion; pulse stops.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 260,
    background: 'dark',
    label: 'Fog forecast',
  },
}
