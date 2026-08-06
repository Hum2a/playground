import type { Specimen } from '../../../types'

export const trophyUnlockPop: Specimen = {
  id: 'trophy-unlock-pop',
  ref: 'SPX-3347',
  title: 'Trophy Unlock Pop',
  blurb: 'A compact achievement notification enters, shines once, and settles.',
  origin: { project: 'Original', surface: 'PlayStation-inspired system UI motion (abstract)' },
  facets: { kind: 'overlay', tech: 'tiny-js', scope: 'card', intensity: 'graphic' },
  inspiredBy: { franchise: 'playstation' },
  tags: ["trophy","notification"],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Notification appears settled with no entrance animation.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 400, height: 300, background: 'dark', label: 'Trophy Unlock Pop demo' },
}
