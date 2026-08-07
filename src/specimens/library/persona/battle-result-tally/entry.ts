import type { Specimen } from '../../../types'

export const battleResultTally: Specimen = {
  id: 'battle-result-tally',
  ref: 'SPX-3005',
  title: 'Battle Result Tally',
  blurb: 'XP and score values count sequentially into fixed post-battle result rows.',
  origin: { project: 'Original', surface: 'Persona 4 — battle results' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'subtle' },
  inspiredBy: { franchise: 'persona', works: ['persona-4'] },
  tags: ['tally', 'results', 'count-up'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'All final values appear immediately with no counting.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 360, height: 320, background: 'dark', label: 'Battle result tally' },
}
