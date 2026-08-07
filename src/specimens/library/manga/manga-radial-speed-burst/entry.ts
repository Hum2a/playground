import type { Specimen } from '../../../types'

export const mangaRadialSpeedBurst: Specimen = {
  id: 'manga-radial-speed-burst',
  ref: 'SPX-4081',
  title: 'Manga Radial Speed Burst',
  blurb:
    'Thirty-six predetermined tapered speed lines rush inward toward a protected circular dead zone around a focal result card, then clear — identical on every replay.',
  origin: {
    project: 'Original',
    surface: 'Generic manga action-line / speed-line emphasis grammar',
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
  tags: ['radial', 'speed-lines', 'burst', 'impact'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, no line movement — a static set of 12 restrained rays and a heavy focus border emphasise the subject.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 480,
    height: 420,
    background: 'card',
    label: 'Manga radial speed burst',
  },
}
