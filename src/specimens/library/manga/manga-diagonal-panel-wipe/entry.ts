import type { Specimen } from '../../../types'

export const mangaDiagonalPanelWipe: Specimen = {
  id: 'manga-diagonal-panel-wipe',
  ref: 'SPX-4072',
  title: 'Manga Diagonal Panel Wipe',
  blurb:
    'A manga-style diagonal panel gutter travels right to left, separating outgoing and incoming surfaces with an off-white strip, trailing ink rule, and brief speed strokes.',
  origin: {
    project: 'Original',
    surface: 'Manga-medium-inspired page transition (abstract gutter wipe)',
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
  tags: ['panel', 'gutter', 'wipe'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Gutter travel and speed strokes are skipped; destination shows immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 620,
    height: 420,
    background: 'page',
    label: 'Manga diagonal panel wipe demo',
    scaffold:
      '<div style="position:relative;overflow:hidden;width:620px;height:360px;max-width:100%;margin:0 auto;">{{specimen}}</div>',
  },
}
