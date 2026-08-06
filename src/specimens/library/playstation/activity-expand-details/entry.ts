import type { Specimen } from '../types'

export const activityExpandDetails: Specimen = {
  id: 'activity-expand-details',
  ref: 'SPX-3344',
  title: 'Activity Expand Details',
  blurb: 'A compact objective card expands to expose tasks, rewards, and actions.',
  origin: { project: 'Original', surface: 'PlayStation-inspired system UI motion (abstract)' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'subtle' },
  inspiredBy: { franchise: 'playstation' },
  tags: ["expand","details"],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Expanded/collapsed states apply instantly.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 440, height: 340, background: 'dark', label: 'Activity Expand Details demo' },
}
