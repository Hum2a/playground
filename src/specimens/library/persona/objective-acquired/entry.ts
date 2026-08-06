import type { Specimen } from '../../../types'
export const objectiveAcquired: Specimen = {
  id: 'objective-acquired',
  ref: 'SPX-319',
  title: 'Objective Acquired',
  blurb:
    'Independent graphic pieces assemble into a persistent NEW OBJECTIVE card — red strip, black panel, slamming title, late progress, and finishing corner pins.',
  origin: {
    project: 'Original',
    surface: 'Graphic objective-activation announcement',
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
  tags: ['objective', 'announcement', 'activation'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Assembly is skipped under prefers-reduced-motion or data-force-reduced-motion; the final objective card appears immediately and stays.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 320,
    background: 'dark',

    label: 'Objective assembly demo',
  },

}
