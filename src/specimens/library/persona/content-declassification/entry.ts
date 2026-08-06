import type { Specimen } from '../../../types'
export const contentDeclassification: Specimen = {
  id: 'content-declassification',
  ref: 'SPX-315',
  title: 'Content Declassification',
  blurb:
    'Classified archive sheet where a DECLASSIFIED stamp lands, then five redaction bars are split, peeled, or struck away in sequence until clearance is accepted.',
  origin: {
    project: 'Original',
    surface: 'Specimen Archive',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-5'],
  },
  tags: ['unlock', 'redaction', 'disclosure'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Stamp slam and sequential bar removals are skipped under prefers-reduced-motion or data-force-reduced-motion; the sheet reveals immediately with static DECLASSIFIED and CLEARANCE ACCEPTED marks.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 380,
    background: 'dark',

    label: 'Content declassification',
  },

}
