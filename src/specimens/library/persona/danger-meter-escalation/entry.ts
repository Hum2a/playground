import type { Specimen } from '../../../types'

export const dangerMeterEscalation: Specimen = {
  id: 'danger-meter-escalation',
  ref: 'SPX-3012',
  title: 'Danger Meter Escalation',
  blurb:
    'Threat rises through discrete CLEAR → CAUTION → WARNING → CRITICAL states on a finite escalate run.',
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
  tags: ['danger', 'meter', 'dungeon', 'threat'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'Meter holds at CRITICAL statically under reduced motion.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 300,
    background: 'dark',
    label: 'Danger meter',
  },
}
