import type { Specimen } from '../types'
export const bindingWrapLock: Specimen = {
  id: 'binding-wrap-lock',
  ref: 'SPX-2154',
  title: 'Binding Wrap Lock',
  blurb:
    'Four binding strips rapidly wrap a target card and settle into a LOCKED restricted state.',
  origin: {
    project: 'Original',
    surface: 'anime/comic action language study',
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
  tags: ['binding', 'lock', 'restrict', 'wrap'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under reduced motion, strips and LOCKED label appear instantly.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 320,
    background: 'card',

    label: 'Target card',
  },

}
