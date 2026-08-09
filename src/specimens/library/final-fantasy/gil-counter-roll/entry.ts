import type { Specimen } from '../../../types'

export const gilCounterRoll: Specimen = {
  id: 'gil-counter-roll',
  ref: 'SPX-4352',
  title: 'Gil Counter Roll',
  blurb: 'A deterministic vertical reward odometer settles on 8500 fictional credits.',
  origin: { project: 'Original', surface: 'JRPG-style reward counter' },
  facets: {
    kind: 'interaction', tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: { franchise: 'final-fantasy' },
  tags: ['counter', 'odometer', 'reward'],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: '8500 renders immediately without intermediate values.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 260, background: 'dark', label: 'JRPG credits reward',
  },
}
