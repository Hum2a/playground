import type { Specimen } from '../../../types'

export const mangaDirectionalSpeedWipe: Specimen = {
  id: 'manga-directional-speed-wipe',
  ref: 'SPX-4089',
  title: 'Directional Speed Wipe',
  blurb:
    'Twenty-four predetermined ink speed lines carry a panel right-to-left while the destination settles from +38px to zero.',
  origin: {
    project: 'Original',
    surface: 'Manga motion-language study — directional speed wipe',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'manga',
  },
  tags: ['speed-lines', 'wipe', 'navigation'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, Panel B replaces Panel A immediately with no travelling speed lines.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 340,
    background: 'card',
    label: 'Directional speed wipe',
  },
}
