import type { Specimen } from '../types'
export const largeTitleCollapse: Specimen = {
  id: 'large-title-collapse',
  ref: 'SPX-1371',
  title: 'Large Title Collapse',
  blurb:
    'PROJECTS large title (42px) condenses into a 17px compact nav title over 84px scroll; compact established by 72px with 54px upward travel and 12 list rows.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired large title navigation collapse',
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
  tags: ['scroll', 'typography', 'navigation'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Scroll-linked state changes remain; interpolated scale movement removed under both reduced-motion triggers.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 380,
    height: 560,
    background: 'dark',

    label: 'Large title collapse',
  },

}
