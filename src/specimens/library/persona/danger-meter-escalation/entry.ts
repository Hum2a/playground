import type { Specimen } from '../../../types'

export const dangerMeterEscalation: Specimen = {
  id: 'danger-meter-escalation',
  ref: 'SPX-3012',
  title: 'Danger Meter Escalation',
  blurb:
    'Threat rises through discrete structural states as exploration continues — bars stack through caution tiers.',
  origin: { project: 'Specimen Archive', surface: 'Persona 4–inspired motion language' },
  facets: {
    kind: 'loop',
    tech: 'css-only',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-4'],
  },
  tags: ["danger","meter","dungeon","threat"],
  deps: 'none',
  motion: {
    loops: true,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Meter holds at the highest tier statically under reduced motion.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 280,
    background: 'dark',
    label: 'Danger meter',
  },
}
