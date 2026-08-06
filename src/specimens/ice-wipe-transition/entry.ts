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
  integration: [
    'Mount stage with overflow hidden; import demo.css verbatim.',
    'Grow 740ms then fracture 380ms; total 1390ms.',
    'Wire Transition / Replay to runIceWipeTransition.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Six ice shards grow to cover stage',
    'Shards fracture away revealing scene B',
    'Replay returns to scene A',
    'Effect clipped to stage',
    'Reduced motion: instant scene swap',
  ],
}
