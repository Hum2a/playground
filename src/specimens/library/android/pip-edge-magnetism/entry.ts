import type { Specimen } from '../../../types'
export const pipEdgeMagnetism: Specimen = {
  id: 'pip-edge-magnetism',
  ref: 'SPX-1816',
  title: 'PiP Edge Magnetism',
  blurb:
    '176×99 PiP drags freely; 35% attraction within 56px of edges; snaps to corner slots in 180ms; fling >0.8 px/ms biases edge.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired PiP edge magnetism',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['pip', 'drag', 'snap'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'No magnetic interpolation during drag; instant snap on release under both reduced-motion triggers.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 700,
    background: 'dark',

    label: 'PiP edge magnetism',
  },

}
