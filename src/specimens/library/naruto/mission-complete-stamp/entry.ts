import type { Specimen } from '../../../types'

export const missionCompleteStamp: Specimen = {
  id: 'mission-complete-stamp',
  ref: 'SPX-2537',
  title: 'Mission Complete Stamp',
  blurb:
    'A briefing card receives a large original completion seal — the stamp slams down, rings, and settles into COMPLETE.',
  origin: {
    project: 'Original',
    surface: 'Naruto / mission-system — completion feedback',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'naruto',
  },
  tags: ['complete', 'stamp', 'briefing'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the stamp appears already settled in the COMPLETE state.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 340,
    background: 'dark',
    label: 'Mission complete stamp',
  },
}
