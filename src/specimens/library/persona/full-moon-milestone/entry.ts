import type { Specimen } from '../types'
export const fullMoonMilestone: Specimen = {
  id: 'full-moon-milestone',
  ref: 'SPX-461',
  title: 'Full Moon Milestone',
  blurb:
    'Numeric progress ticks 74→75, then a symbolic lunar sweep fills to a full moon with ring, eight radial marks, and PHASE III — while the progressbar stays honestly at 75%.',
  origin: {
    project: 'Original',
    surface: 'Persona 3–inspired lunar milestone language',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-3', 'persona-3-reload'],
  },
  tags: ['milestone', 'completion', 'lunar'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, jumps to 75% with a static full-moon emblem, PHASE III, and MILESTONE COMPLETE — no sweep or radial marks.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 360,
    background: 'dark',

    label: 'Full moon milestone',
  },

}
