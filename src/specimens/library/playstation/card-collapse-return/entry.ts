import type { Specimen } from '../types'

export const cardCollapseReturn: Specimen = {
  id: 'card-collapse-return',
  ref: 'SPX-3383',
  title: 'Card Collapse Return',
  blurb: 'Expanded tile reconstructs its exact original geometry on return.',
  origin: { project: 'Original', surface: 'PlayStation-inspired system UI motion (abstract)' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'inline', intensity: 'subtle' },
  inspiredBy: { franchise: 'playstation' },
  tags: ["collapse","return"],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Expand/collapse states apply instantly.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 480, height: 260, background: 'dark', label: 'Card Collapse Return demo' },
}
