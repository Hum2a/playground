import type { Specimen } from '../types'
export const truthShotNotification: Specimen = {
  id: 'truth-shot-notification',
  ref: 'SPX-007',
  title: 'Truth shot notification',
  blurb:
    'Kinetic clue notification: a targeting streak and projectile fire in, impact rings flash, then a skewed evidence card snaps open.',
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
    franchise: 'danganronpa',
  },
  tags: ['notification', 'projectile', 'clip-path'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Streak, projectile, and impact rings are skipped under prefers-reduced-motion or data-force-reduced-motion; the final notification card appears immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 280,
    background: 'card',

    label: 'Evidence feed',
  },


}
