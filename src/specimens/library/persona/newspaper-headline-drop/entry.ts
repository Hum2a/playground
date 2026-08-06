import type { Specimen } from '../../../types'
export const newspaperHeadlineDrop: Specimen = {
  id: 'newspaper-headline-drop',
  ref: 'SPX-018',
  title: 'Newspaper Headline Drop',
  blurb:
    'Oversized newsprint headline strip drops onto a host with overshoot and rebound, then ejects sideways on dismiss.',
  origin: {
    project: 'Original',
    surface: 'Persona 5–inspired newspaper / print interruption language',
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
  tags: ['announcement', 'interruption', 'paper'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Fall, rebound, host nudge, and impact marks are skipped under prefers-reduced-motion or data-force-reduced-motion; the settled strip at -2deg appears immediately and dismisses instantly.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 280,
    background: 'card',

    label: 'Newspaper headline interruption',
  },

}
