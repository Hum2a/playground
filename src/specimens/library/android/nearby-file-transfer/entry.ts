import type { Specimen } from '../../../types'
export const nearbyFileTransfer: Specimen = {
  id: 'nearby-file-transfer',
  ref: 'SPX-1868',
  title: 'Nearby File Transfer',
  blurb:
    'ARCHIVE.ZIP condenses to a 34×42px proxy along a curved 650ms path; recipient ring progresses 0→100% over 1100ms; REJECT returns proxy.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired nearby file transfer arc',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['nearby', 'transfer', 'progress'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, proxy jumps between nodes while progress remains determinate.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 220,
    background: 'dark',

    label: 'Nearby file transfer',
  },

}
