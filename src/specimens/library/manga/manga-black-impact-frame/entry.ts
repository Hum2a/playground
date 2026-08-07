import type { Specimen } from '../../../types'

export const mangaBlackImpactFrame: Specimen = {
  id: 'manga-black-impact-frame',
  ref: 'SPX-4097',
  title: 'Black Impact Frame',
  blurb:
    'A finite 296ms black/white impact frame punches a consequential confirm — anticipation, 72ms ink plate, optional inverse beat, then recovery. Never loops.',
  origin: {
    project: 'Original',
    surface: 'Manga motion-language study — black impact frame',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'manga',
  },
  tags: ['impact', 'hit-stop'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, full-surface inversion/flashing is removed; the completed card receives a static 6px black border emphasis instead.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 340,
    background: 'card',
    label: 'Black impact frame',
  },
}
