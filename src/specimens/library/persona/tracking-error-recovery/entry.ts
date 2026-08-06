import type { Specimen } from '../../../types'

export const trackingErrorRecovery: Specimen = {
  id: 'tracking-error-recovery',
  ref: 'SPX-2925',
  title: 'Tracking Error Recovery',
  blurb:
    'Horizontal tearing bands destabilise content until a calibration action fixes the broadcast feed.',
  origin: {
    project: 'Original',
    surface: 'Persona 4 midnight-channel broadcast study',
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
  tags: ['crt', 'tracking', 'tear', 'calibrate'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Tear band animations stop under reduced motion; stable state appears immediately on calibrate.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 300,
    background: 'dark',
    label: 'Tracking calibration',
  },
}
