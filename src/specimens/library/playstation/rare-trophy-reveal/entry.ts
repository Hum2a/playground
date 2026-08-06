import type { Specimen } from '../types'

export const rareTrophyReveal: Specimen = {
  id: 'rare-trophy-reveal',
  ref: 'SPX-3348',
  title: 'Rare Trophy Reveal',
  blurb: 'A higher-tier achievement uses a more elaborate but finite reveal sequence.',
  origin: { project: 'Original', surface: 'PlayStation-inspired system UI motion (abstract)' },
  facets: { kind: 'overlay', tech: 'tiny-js', scope: 'card', intensity: 'graphic' },
  inspiredBy: { franchise: 'playstation' },
  tags: ["trophy","reveal"],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Final rare trophy state shown immediately.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 420, height: 340, background: 'dark', label: 'Rare Trophy Reveal demo' },
}
