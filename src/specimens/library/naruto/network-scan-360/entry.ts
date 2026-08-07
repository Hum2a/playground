import type { Specimen } from '../../../types'

export const networkScan360: Specimen = {
  id: 'network-scan-360',
  ref: 'SPX-2497',
  title: '360° Network Scan',
  blurb: 'A 360° sweep discovers network nodes around a hub.',
  origin: {
    project: 'Original',
    surface: 'Naruto / ninja-fiction action-language study',
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
  tags: ['scan'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the resolved state appears immediately.',
  },
  acceptance: [
    'Sweep hits nodes at 0/72/144/216/288° with 150ms steps',
    'Five links activate in order; final MAPPED',
    'Reduced motion shows all five mapped immediately',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 320,
    background: 'dark',
    label: '360° Network Scan',
  },
}
