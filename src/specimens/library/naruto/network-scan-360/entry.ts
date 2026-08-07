import type { Specimen } from '../../../types'

export const networkScan360: Specimen = {
  id: 'network-scan-360',
  ref: 'SPX-2497',
  title: '360° Network Scan',
  blurb:
    'A 360° phosphor sweep wires five nodes at 0/72/144/216/288° on 150ms discovery steps.',
  origin: {
    project: 'Original',
    surface: 'Naruto / sensory network — 360° scan',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'naruto',
  },
  tags: ["scan","network","radar"],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the resolved 360° Network Scan state appears immediately.',
  },
  acceptance: [
    'Sweep discovers nodes at anglesDeg [0,72,144,216,288] in order at stepMs 150',
    'Links activate with nodes; inventory complete only after node 5 + settleMs 100',
    'Replay deactivates all five nodes/links before rerunning',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 340,
    background: 'dark',
    label: '360° Network Scan',
  },
}
