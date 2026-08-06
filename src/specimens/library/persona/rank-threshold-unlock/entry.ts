import type { Specimen } from '../../../types'

export const rankThresholdUnlock: Specimen = {
  id: 'rank-threshold-unlock',
  ref: 'SPX-2975',
  title: 'Rank Threshold Unlock',
  blurb: 'Relationship progress crosses a fixed threshold and unlocks a new interaction tier.',
  origin: { project: 'Original', surface: 'Persona 4 — social links / bonds' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'subtle' },
  inspiredBy: { franchise: 'persona', works: ['persona-4'] },
  tags: ["progress","threshold","unlock"],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Bar and unlock appear at final values immediately.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 360, height: 260, background: 'card', label: 'Rank threshold unlock' },
}
