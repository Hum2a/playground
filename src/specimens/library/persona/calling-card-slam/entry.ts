import type { Specimen } from '../../../types'
export const callingCardSlam: Specimen = {
  id: 'calling-card-slam',
  ref: 'SPX-003',
  title: 'Calling card slam',
  blurb:
    'Crooked black-and-white paper card that violently slams onto a host surface, overshoots, recoils, and settles at an angle.',
  origin: {
    project: 'Original',
    surface: 'Specimen Archive',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-5'],
  },
  tags: ['announcement', 'slam', 'clip-path'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Slam, recoil, and impact shards are skipped under prefers-reduced-motion or data-force-reduced-motion; the final static card at -5deg appears immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 280,
    background: 'card',

    label: 'Locked lesson card',
  },


}
