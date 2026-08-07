import type { Specimen } from '../../../types'

export const mangaPageTurn: Specimen = {
  id: 'manga-page-turn',
  ref: 'SPX-4080',
  title: 'Manga Page Turn',
  blurb:
    'An original right-to-left manga-page turn lifts a monochrome current sheet from its outer edge and exposes the next page beneath.',
  origin: {
    project: 'Original',
    surface: 'Physical manga reading direction translated into software navigation',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: { franchise: 'manga' },
  tags: ['page-turn', 'rtl', 'paper', 'fold'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'NEXT immediately swaps to the flat destination page when reduced motion is requested.',
  },
  loadPayload: () => import('./payload').then((module) => module.default),
  preview: {
    width: 560,
    height: 400,
    background: 'page',
    label: 'Manga page turn',
  },
}
