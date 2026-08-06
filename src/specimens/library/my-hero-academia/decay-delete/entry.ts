import type { Specimen } from '../types'
export const decayDelete: Specimen = {
  id: 'decay-delete',
  ref: 'SPX-2076',
  title: 'Decay Delete',
  blurb:
    'Destructive delete causes FILE // 09 to crumble into accent shards from contact outward, leaving RECORD REMOVED void.',
  origin: {
    project: 'Original',
    surface: 'My Hero Academia-inspired villain corruption delete language',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'maximal',
  },
  inspiredBy: {
    franchise: 'my-hero-academia',
  },
  tags: ['decay', 'delete', 'destruction', 'comic'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under reduced motion, target vanishes immediately and RECORD REMOVED void appears without shard crumble.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 280,
    background: 'card',

    label: 'Target record',
  },

}
