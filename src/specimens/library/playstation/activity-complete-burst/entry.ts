import type { Specimen } from '../types'

export const activityCompleteBurst: Specimen = {
  id: 'activity-complete-burst',
  ref: 'SPX-3340',
  title: 'Activity Complete Burst',
  blurb: 'A completed activity receives a concise celebratory geometric burst before settling.',
  origin: { project: 'Original', surface: 'PlayStation-inspired system UI motion (abstract)' },
  facets: { kind: 'overlay', tech: 'tiny-js', scope: 'card', intensity: 'graphic' },
  inspiredBy: { franchise: 'playstation' },
  tags: ["burst","completion"],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Burst skipped; card shows completed state immediately.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 400, height: 300, background: 'dark', label: 'Activity Complete Burst demo' },
}
