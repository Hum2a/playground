import type { Specimen } from '../../../types'

export const noSignalCard: Specimen = {
  id: 'no-signal-card',
  ref: 'SPX-3045',
  title: 'No Signal Card',
  blurb:
    'Unavailable content becomes a bold broadcast-style no-signal fallback card.',
  origin: {
    project: 'Original',
    surface: 'Persona 4 analogue VHS broadcast study',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-4'],
  },
  tags: ['no-signal', 'broadcast', 'fallback', 'colour-bars'],
  deps: 'none',
  motion: {
    loops: true,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Static overlay flicker stops under reduced motion; card states remain visible.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 300,
    background: 'dark',
    label: 'No signal fallback',
  },
}
