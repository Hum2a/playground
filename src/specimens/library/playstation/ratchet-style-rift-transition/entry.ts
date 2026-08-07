import type { Specimen } from '../../../types'

export const ratchetStyleRiftTransition: Specimen = {
  id: 'ratchet-style-rift-transition',
  ref: 'SPX-3490',
  title: 'Ratchet-Style Rift Transition',
  blurb: 'Content is pulled through a dimensional slit and reconstructs on the far side.',
  origin: {
    project: 'Original',
    surface: 'PlayStation-inspired UI study — abstract shapes, no official glyphography',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'fullscreen',
    intensity: 'maximal',
  },
  inspiredBy: {
    franchise: 'playstation',
    works: ['ps5'],
  },
  tags: ['rift', 'dimensional', 'slit'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'Zone B shown instantly without rift choreography.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 320,
    background: 'dark',
    label: 'Ratchet-style rift transition',
  },
}
