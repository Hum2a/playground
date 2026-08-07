import type { Specimen } from '../../../types'

export const mangaDoublePageSpreadOpen: Specimen = {
  id: 'manga-double-page-spread-open',
  ref: 'SPX-3973',
  title: 'Manga Double-Page Spread Open',
  blurb:
    'Two cropped page halves expand across a wide gutter into a full double-page spread; a spanning headline resolves only as the spine collapses.',
  origin: {
    project: 'Original',
    surface: 'Manga editorial-layout–inspired milestone / completion UI',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'manga',
  },
  tags: ['spread', 'gutter', 'headline', 'spine'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the complete double-page spread appears immediately with no expand.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 720,
    height: 400,
    background: 'dark',
    label: 'Manga double-page spread open',
  },
}
