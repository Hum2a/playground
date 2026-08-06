import type { Specimen } from '../../../types'

export const horizonStyleFocusScan: Specimen = {
  id: 'horizon-style-focus-scan',
  ref: 'SPX-3487',
  title: 'Horizon-Style Focus Scan',
  blurb: 'A scanning reticle sweeps a target and reveals metadata panels around it.',
  origin: {
    project: 'Original',
    surface: 'PlayStation-inspired UI study — abstract shapes, no official glyphography',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'playstation',
  },
  tags: ["scan","reticle","metadata"],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'Metadata revealed instantly without scan animation.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 400,
    height: 320,
    background: 'dark',
    label: 'Horizon-style focus scan',
  },
}
