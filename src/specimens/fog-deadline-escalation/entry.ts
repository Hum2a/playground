import type { Specimen } from '../types'

export const fogDeadlineEscalation: Specimen = {
  id: 'fog-deadline-escalation',
  ref: 'SPX-2943',
  title: 'Fog Deadline Escalation',
  blurb:
    'A deadline approaching causes progressively denser fog obstruction and warning geometry.',
  origin: {
    project: 'Original',
    surface: 'Persona 4 fog and calendar-pressure study',
  },
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
  tags: ['fog', 'deadline', 'pressure', 'warning'],
  deps: 'none',
  motion: {
    loops: true,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Warning pulse and meter transitions stop under reduced motion; static fog levels remain.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 320,
    background: 'dark',
    label: 'Deadline fog escalation',
  },
}
