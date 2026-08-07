import type { Specimen } from '../../../types'

export const mangaPanelShatterTransition: Specimen = {
  id: 'manga-panel-shatter-transition',
  ref: 'SPX-4073',
  title: 'Manga Panel Shatter Transition',
  blurb:
    'A six-panel manga page briefly thickens its gutters, then releases those exact panels as rigid fragments that fly outward to expose a destination surface underneath.',
  origin: {
    project: 'Original',
    surface: 'Manga-medium-inspired page shatter transition (panel fragments, not glass)',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'fullscreen',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'manga',
  },
  tags: ['panel', 'gutter', 'shatter'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Fragmentation is skipped; destination displays immediately with no flying pieces.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 620,
    height: 460,
    background: 'page',
    label: 'Manga panel shatter transition demo',
    scaffold:
      '<div style="position:relative;overflow:hidden;width:620px;height:400px;max-width:100%;margin:0 auto;">{{specimen}}</div>',
  },
}
