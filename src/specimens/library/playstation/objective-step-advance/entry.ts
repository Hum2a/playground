import type { Specimen } from '../types'

export const objectiveStepAdvance: Specimen = {
  id: 'objective-step-advance',
  ref: 'SPX-3341',
  title: 'Objective Step Advance',
  blurb: 'One completed step sends focus and progress into the next objective in a short chain.',
  origin: { project: 'Original', surface: 'PlayStation-inspired system UI motion (abstract)' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'subtle' },
  inspiredBy: { franchise: 'playstation' },
  tags: ["objective","workflow"],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'All steps appear complete immediately.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 420, height: 320, background: 'dark', label: 'Objective Step Advance demo' },
}
