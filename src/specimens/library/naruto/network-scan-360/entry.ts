import type { Specimen } from '../../../types'

export const networkScan360: Specimen = {
  id: 'network-scan-360',
  ref: 'SPX-2497',
  title: '360° Network Scan',
  blurb:
    'A 360° sweep discovers five network nodes at 0/72/144/216/288° into a readable inventory log.',
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
  tags: ['scan'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, all five nodes appear discovered immediately.',
  },
  acceptance: [
    'Five nodes at frozen bearings 0/72/144/216/288 discover in order',
    'Sweep completes one revolution; discovery log marks each node',
    'Resolved inventory shows all five nodes active',
    'Replay clears nodes/log before rerunning',
    'Reduced motion shows full inventory immediately',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 320,
    background: 'dark',
    label: '360° Network Scan',
  },
}
