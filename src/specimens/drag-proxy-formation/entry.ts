import type { Specimen } from '../types'
export const dragProxyFormation: Specimen = {
  id: 'drag-proxy-formation',
  ref: 'SPX-1451',
  title: 'Drag Proxy Formation',
  blurb:
    'REPORT // Q3 condenses into a 116×64 portable proxy after 6px drag while the source placeholder remains; valid ARCHIVE drop absorbs, cancel merges back.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired drag proxy condensation',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['ios'],
  },
  tags: ['drag', 'compression', 'portability'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, use a fixed compact proxy immediately with no formation morph.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 360,
    background: 'dark',

    label: 'Drag proxy formation',
  },

}
