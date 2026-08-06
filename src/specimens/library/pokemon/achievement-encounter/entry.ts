import type { Specimen } from '../../../types'
export const achievementEncounter: Specimen = {
  id: 'achievement-encounter',
  ref: 'SPX-010',
  title: 'Achievement Encounter',
  blurb:
    'Achievement unlock staged as a rare encounter: battle streaks, a sky/grass arena, a flashing geometric badge, then a rising message box.',
  origin: {
    project: 'Original',
    surface: 'Classic creature-battle encounter presentation language',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'pokemon',
  },
  tags: ['battle', 'announcement', 'achievement'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Streak sweep is skipped under prefers-reduced-motion or data-force-reduced-motion; final arena, badge, and message appear immediately with a one-shot status announcement.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 280,
    background: 'card',

    label: 'Achievement unlock encounter',
  },

}
