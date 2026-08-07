import type { Specimen } from '../../../types'

export const wireConnectionDraw: Specimen = {
  id: 'wire-connection-draw',
  ref: 'SPX-2427',
  title: 'Wire Connection Draw',
  blurb:
    'A pathLength-100 stroke draws in 180ms between nodes A and B, then snaps (90ms) to LINKED.',
  origin: {
    project: 'Original',
    surface: 'Naruto / ninja-fiction action-language study — wire / binding tools',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'naruto',
  },
  tags: ['wire', 'connection', 'stroke-draw', 'snap'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the wire appears fully drawn as LINKED with no stroke animation.',
  },
  acceptance: [
    'pathLength 100 stroke draws in 180ms then snap 90ms',
    'Endpoints pulse on LINKED',
    'Reduced motion shows LINKED immediately',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 400,
    height: 280,
    background: 'dark',
    label: 'Wire connection draw',
  },
}
