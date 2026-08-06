import type { Specimen } from '../../../types'

export const activityProgressFill: Specimen = {
  id: 'activity-progress-fill',
  ref: 'SPX-3339',
  title: 'Activity Progress Fill',
  blurb: 'A compact activity card shows objective progress filling toward a fixed completion boundary.',
  origin: { project: 'Original', surface: 'PlayStation-inspired system UI motion (abstract)' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'subtle' },
  inspiredBy: { franchise: 'playstation' },
  tags: ["progress","activity"],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Fill jumps to target percent instantly; completion state still visible.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 400, height: 280, background: 'dark', label: 'Activity Progress Fill demo' },
}
