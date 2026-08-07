import type { Specimen } from '../../../types'

export const fogForecastWarning: Specimen = {
  id: 'fog-forecast-warning',
  ref: 'SPX-3023',
  title: 'Fog Forecast Warning',
  blurb:
    'Upcoming fog/deadline escalates through WATCH → ADVISORY → ALERT stages on a forecast card.',
  origin: { project: 'Specimen Archive', surface: 'Persona 4–inspired motion language' },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-4'],
  },
  tags: ['fog', 'forecast', 'warning', 'deadline'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'Final ALERT stage shown immediately under reduced motion.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 300,
    background: 'dark',
    label: 'Fog forecast',
  },
}
