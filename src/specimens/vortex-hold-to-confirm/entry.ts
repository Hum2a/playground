import type { Specimen } from '../types'

export const vortexHoldToConfirm: Specimen = {
  id: 'vortex-hold-to-confirm',
  ref: 'SPX-2482',
  title: 'Vortex Hold-to-Confirm',
  blurb: 'Hold builds a vortex; release confirms the action.',
  origin: {
    project: 'Original',
    surface: 'Naruto / ninja-fiction action-language study',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'naruto',
  },
  tags: ['hold'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the resolved state appears immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 320,
    background: 'dark',
    label: 'Vortex Hold-to-Confirm',
  },
}
