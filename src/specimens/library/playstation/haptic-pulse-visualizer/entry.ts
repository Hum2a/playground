import type { Specimen } from '../../../types'

export const hapticPulseVisualizer: Specimen = {
  id: 'haptic-pulse-visualizer',
  ref: 'SPX-3365',
  title: 'Haptic Pulse Visualizer',
  blurb: 'An action button emits a short radial wave pattern representing tactile feedback on each pulse.',
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
  },
  tags: ["dualsense","haptic"],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'Under reduced motion pulses show a static highlight ring without expanding waves.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 380,
    height: 320,
    background: 'dark',
    label: 'Haptic Pulse Visualizer demo',
  },
}
