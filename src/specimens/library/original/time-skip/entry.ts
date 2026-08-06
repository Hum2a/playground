import type { Specimen } from '../../../types'
export const timeSkip: Specimen = {
  id: 'time-skip',
  ref: 'SPX-028',
  title: 'Time Skip',
  blurb:
    'Five horizontal slices of the schedule card jump on fixed offsets, swap to evening one by one, flash +02:50, then realign — time advances from 16:20 After School to 19:10 Evening.',
  origin: {
    project: 'Original',
    surface: 'Temporal slice skip / schedule advance',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  tags: ['time', 'temporal', 'stagger'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Skip, offsets, marker, and realign are skipped under prefers-reduced-motion or data-force-reduced-motion; 19:10 Evening appears immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 420,
    background: 'dark',

    label: 'Time skip schedule demo',
  },


}
