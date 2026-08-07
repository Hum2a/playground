import type { Specimen } from '../../../types'

export const deadlinePressureMeter: Specimen = {
  id: 'deadline-pressure-meter',
  ref: 'SPX-3021',
  title: 'Deadline Pressure Meter',
  blurb:
    'Days remaining compress through discrete states (14→7→3→1) as the deadline approaches.',
  origin: { project: 'Specimen Archive', surface: 'Persona 4–inspired motion language' },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-4'],
  },
  tags: ['deadline', 'calendar', 'pressure', 'meter'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'Meter holds at the final 1-day compressed state.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 240,
    background: 'dark',
    label: 'Deadline meter',
  },
}
