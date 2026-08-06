import type { Specimen } from '../types'
export const fusionSelectionMerge: Specimen = {
  id: 'fusion-selection-merge',
  ref: 'SPX-509',
  title: 'Fusion Selection Merge',
  blurb:
    'Two selected source cards converge, compress across a blue seam, and dissolve under glass polygons into one result that inherits traits from both.',
  origin: {
    project: 'Original',
    surface: 'Persona 3–inspired fusion merge language',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-3', 'persona-3-reload'],
  },
  tags: ['merge', 'combine', 'transformation'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, FUSE immediately replaces both sources with Result C and static FUSION COMPLETE.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 380,
    background: 'dark',

    label: 'Fusion selection merge',
  },

}
