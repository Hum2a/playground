import type { Specimen } from '../../../types'

export const cardToDetailsMorph: Specimen = {
  id: 'card-to-details-morph',
  ref: 'SPX-3380',
  title: 'Card-to-Details Morph',
  blurb: 'A compact tile becomes a larger information surface with spatial continuity.',
  origin: { project: 'Original', surface: 'PlayStation-inspired system UI motion (abstract)' },
  facets: { kind: 'transition', tech: 'tiny-js', scope: 'card', intensity: 'subtle' },
  inspiredBy: { franchise: 'playstation' },
  tags: ["morph","details"],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Morph end states apply instantly.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 440, height: 320, background: 'dark', label: 'Card-to-Details Morph demo' },
}
