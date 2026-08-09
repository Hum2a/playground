import type { Specimen } from '../../../types'

export const currentDirectionIndicator: Specimen = {
  id: 'current-direction-indicator',
  ref: 'SPX-417',
  title: 'Current Direction Indicator',
  blurb:
    'A slim current channel with seven travelling chevrons and three curved flow lines; reverse flips the semantic East/West direction without restarting its continuous travel.',
  origin: {
    project: 'Original',
    surface: 'Persona 3 Reload water / depth interface language',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-3-reload'],
  },
  tags: ['water', 'hud', 'navigation'],
  deps: 'none',
  motion: {
    loops: true,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Both reduced-motion modes keep the curved current lines and seven chevrons static while preserving the explicit East or West label.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 480,
    height: 72,
    background: 'dark',
    label: 'Current direction indicator',
  },
}
