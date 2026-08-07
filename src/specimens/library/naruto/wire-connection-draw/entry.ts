import type { Specimen } from '../../../types'

export const wireConnectionDraw: Specimen = {
  id: 'wire-connection-draw',
  ref: 'SPX-2427',
  title: 'Wire Connection Draw',
  blurb:
    'A wire draws pathLength 76 between nodes in 180ms, then endpoints snap to LINKED (80ms) — stroke-draw link, not a fade.',
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
    'Wire draws pathLength 76 in 180ms via dashoffset',
    'Endpoints pulse; LINKED after 80ms settle',
    'Reduced motion shows fully drawn LINKED',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 400,
    height: 280,
    background: 'dark',
    label: 'Wire connection draw',
  },
}
