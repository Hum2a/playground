import type { Specimen } from '../../../types'

export const hapticPulseVisualizer: Specimen = {
  id: 'haptic-pulse-visualizer',
  ref: 'SPX-3365',
  title: 'Haptic Pulse Visualizer',
  blurb:
    'Radial radar core emits staggered concentric rings for DualSense-style haptic pulses — not a hold meter.',
  origin: {
    project: 'Original',
    surface: 'PlayStation-inspired system UI motion study (abstract)',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'playstation',
    works: ['ps5'],
  },
  tags: ['dualsense', 'haptic'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'Under reduced motion a static radial highlight shows without expanding rings.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 380,
    height: 340,
    background: 'dark',
    label: 'Haptic Pulse Visualizer demo',
  },
}
