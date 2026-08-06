import type { Specimen } from '../../../types'

export const deadlinePressureMeter: Specimen = {
  id: 'deadline-pressure-meter',
  ref: 'SPX-3021',
  title: 'Deadline Pressure Meter',
  blurb:
    'Days remaining compress visually as a deadline approaches — segments squeeze toward a yellow warning zone.',
  origin: { project: 'Specimen Archive', surface: 'Persona 4–inspired motion language' },
  facets: {
    kind: 'loop',
    tech: 'css-only',
    scope: 'inline',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-4'],
  },
  tags: ["deadline","calendar","pressure","meter"],
  deps: 'none',
  motion: {
    loops: true,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Meter holds at minimum-days state under reduced motion.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 200,
    background: 'dark',
    label: 'Deadline meter',
  },
}
