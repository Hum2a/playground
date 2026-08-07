import type { Specimen } from '../../../types'
export const achievementEncounter: Specimen = {
  id: 'achievement-encounter',
  ref: 'SPX-010',
  title: 'Legendary Encounter',
  blurb:
    'An original abstract rare encounter: restrained streaks reveal an arena, a geometric signal flashes into view, then a message identifies the anomaly.',
  origin: {
    project: 'Original',
    surface: 'Abstract rare-encounter reveal language',
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
  tags: ['encounter', 'rare', 'reveal'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Streak sweep is skipped under prefers-reduced-motion or data-force-reduced-motion; final arena, signal, and message appear immediately with a one-shot status announcement.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 280,
    background: 'card',

    label: 'Abstract legendary encounter',
  },

}
