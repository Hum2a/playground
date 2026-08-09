import type { Specimen } from '../../../types'

export const experienceBarFill: Specimen = {
  id: 'experience-bar-fill',
  ref: 'SPX-4353',
  title: 'Experience Bar Fill',
  blurb:
    'A fixed experience reward fills to a threshold, bursts once, and settles at the exact next-level value.',
  origin: { project: 'Original', surface: 'JRPG-style experience reward gauge' },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: { franchise: 'final-fantasy' },
  tags: ['experience', 'progress', 'threshold', 'reward'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'The final level and 17 / 100 XP state render immediately under prefers-reduced-motion or data-force-reduced-motion.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 260,
    background: 'dark',
    label: 'Experience reward gauge',
  },
}
