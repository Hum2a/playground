import type { Specimen } from '../../../types'

export const missionCompleteBurst: Specimen = {
  id: 'mission-complete-burst',
  ref: 'SPX-2104',
  title: 'Mission Complete Burst',
  blurb:
    'Telemetry widgets collapse in order; COMPLETE and RANK A slam in as an angular stamp.',
  origin: {
    project: 'Original',
    surface: 'My Hero Academia–inspired mission debrief UI',
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
  tags: ['mission', 'complete', 'burst'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'COMPLETE stamp appears immediately without widget collapse.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 400,
    height: 320,
    background: 'dark',

    label: 'Mission complete burst',
  },

}
