import type { Specimen } from '../types'
export const linkedFusionMerge: Specimen = {
  id: 'linked-fusion-merge',
  ref: 'SPX-1022',
  title: 'Linked Fusion Merge',
  blurb:
    'Profiles A and B start unlinked; LINK fills dual nodes, joins a central diamond, tensions, then forces a convergence into Profile C with A+B provenance — driven by an external relationship, not self-synchronisation.',
  origin: {
    project: 'Original',
    surface: 'Dragon Ball–inspired Potara / linked-merge (abstract)',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'dragonball',
  },
  tags: ['merge', 'link', 'relationship', 'consolidation'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, Profile C with A+B provenance appears immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 440,
    height: 360,
    background: 'dark',

    label: 'Linked fusion merge',
  },

}
