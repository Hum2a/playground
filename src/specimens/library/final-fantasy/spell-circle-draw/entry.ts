import type { Specimen } from '../../../types'

export const spellCircleDraw: Specimen = {
  id: 'spell-circle-draw',
  ref: 'SPX-4368',
  title: 'Spell Circle Draw',
  blurb:
    'An original geometric magic circle draws around a selected action and completes with a finite confirmation beat.',
  origin: { project: 'Original', surface: 'JRPG-style spell confirmation' },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: { franchise: 'final-fantasy' },
  tags: ['magic', 'circle', 'draw', 'confirmation'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'The complete spell circle renders immediately under prefers-reduced-motion or data-force-reduced-motion.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 280,
    background: 'dark',
    label: 'Spell circle confirmation',
  },
}
