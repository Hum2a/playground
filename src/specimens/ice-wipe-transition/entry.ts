import type { Specimen } from '../types'
export const iceWipeTransition: Specimen = {
  id: 'ice-wipe-transition',
  ref: 'SPX-2132',
  title: 'Ice Wipe Transition',
  blurb:
    'Crystalline ice facets grow across the stage, then fracture away to reveal the destination scene.',
  origin: {
    project: 'Original',
    surface: 'anime/comic action language study',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'my-hero-academia',
  },
  tags: ['ice', 'wipe', 'shard'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under reduced motion, scene B appears immediately without facet animation.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 320,
    background: 'dark',

    label: 'Scene transition',
  },

}
