import type { Specimen } from '../types'

export const levelUpBurst: Specimen = {
  id: 'level-up-burst',
  ref: 'SPX-3007',
  title: 'Level-Up Burst',
  blurb: 'A level value rolls upward and stat rows reorganise in a gold burst.',
  origin: { project: 'Original', surface: 'Persona 4 — battle results' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'graphic' },
  inspiredBy: { franchise: 'persona', works: ['persona-4'] },
  tags: ["level-up","burst","stats"],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Final level and stats appear immediately with static burst.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 340, height: 300, background: 'dark', label: 'Level-up burst' },
}
