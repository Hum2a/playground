import type { Specimen } from '../../../types'

export const liquidToggle: Specimen = {
  id: 'liquid-toggle',
  ref: 'SPX-414',
  title: 'Liquid Toggle',
  blurb:
    'A rectangular vessel toggles by filling: muted navy at 18% (OFF) rises to bright cyan at 82% (ON), with a brief waterline wave that settles static.',
  origin: {
    project: 'Original',
    surface: 'Persona 3–inspired liquid state control',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-3'],
  },
  tags: ['liquid', 'waterline', 'toggle'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'OFF/ON liquid levels swap immediately; no fill travel or waterline wave under prefers-reduced-motion or data-force-reduced-motion.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 280,
    background: 'dark',
    label: 'Liquid toggle',
  },
}
