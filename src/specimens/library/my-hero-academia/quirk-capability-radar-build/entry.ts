import type { Specimen } from '../../../types'
export const quirkCapabilityRadarBuild: Specimen = {
  id: 'quirk-capability-radar-build',
  ref: 'SPX-2283',
  title: 'Quirk Capability Radar Build',
  blurb:
    'A five-axis capability radar polygon draws from center to fixed profile values and locks with a PROFILE LOCKED readout.',
  origin: {
    project: 'Original',
    surface: 'My Hero Academia-inspired comic/anime action language',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'my-hero-academia',
  },
  tags: ['radar', 'analysis', 'stats', 'polygon'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under reduced motion, the final radar polygon and readout appear immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 320,
    height: 340,
    background: 'dark',

    label: 'Capability radar build',
  },

}
