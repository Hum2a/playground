import type { Specimen } from '../types'

export const mediaCardFocusExpand: Specimen = {
  id: 'media-card-focus-expand',
  ref: 'SPX-3379',
  title: 'Media Card Focus Expand',
  blurb: 'Focused card expands to reveal richer metadata and action affordances.',
  origin: { project: 'Original', surface: 'PlayStation-inspired system UI motion (abstract)' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'inline', intensity: 'subtle' },
  inspiredBy: { franchise: 'playstation' },
  tags: ["focus","metadata"],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Focus expand states apply instantly.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 480, height: 280, background: 'dark', label: 'Media Card Focus Expand demo' },
}
