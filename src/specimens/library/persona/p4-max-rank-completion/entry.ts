import type { Specimen } from '../../../types'

export const p4MaxRankCompletion: Specimen = {
  id: 'p4-max-rank-completion',
  ref: 'SPX-2977',
  title: 'Max Rank Completion',
  blurb:
    'The final social-link rank transforms the entire progression card into a completed golden state.',
  origin: { project: 'Specimen Archive', surface: 'Persona 4–inspired motion language' },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-4'],
  },
  tags: ["social-link","rank","completion","arcana"],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Completed card state shows immediately under reduced motion.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 340,
    background: 'dark',
    label: 'Max rank',
  },
}
