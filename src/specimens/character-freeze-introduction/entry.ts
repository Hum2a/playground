import type { Specimen } from '../types'

export const characterFreezeIntroduction: Specimen = {
  id: 'character-freeze-introduction',
  ref: 'SPX-1990',
  title: 'Character Freeze Introduction',
  blurb:
    'An abstract angular silhouette approaches, freezes with accent outline, and an ANALYST profile card slides into lock.',
  origin: {
    project: 'Original',
    surface: 'My Hero Academia–inspired character intro / freeze-frame language',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'my-hero-academia',
  },
  tags: ['freeze', 'intro', 'comic'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, silhouette and card appear immediately in final locked pose.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 340,
    background: 'dark',

    label: 'Character freeze introduction',
  },

}
