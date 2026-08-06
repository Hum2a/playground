import type { Specimen } from '../types'

export const missionCompleteBurst: Specimen = {
  id: 'mission-complete-burst',
  ref: 'SPX-2104',
  title: 'Mission Complete Burst',
  blurb:
    'Four telemetry widgets collapse inward then burst into a giant COMPLETE panel with RANK A.',
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
    reducedMotionNote: 'COMPLETE burst appears immediately without widget collapse.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 400,
    height: 320,
    background: 'dark',

    label: 'Mission complete burst',
  },
  integration: [
    'FINALIZE triggers collapse + burst; clip to stage overflow.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Widgets collapse then COMPLETE / RANK A burst shows',
    'RESET restores four widgets',
    'Reduced motion shows burst immediately',
  ],
}
