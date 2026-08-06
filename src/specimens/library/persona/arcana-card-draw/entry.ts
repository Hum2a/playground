import type { Specimen } from '../../../types'

export const arcanaCardDraw: Specimen = {
  id: 'arcana-card-draw',
  ref: 'SPX-2980',
  title: 'Arcana Card Draw',
  blurb: 'A tarot card rises from a deck, flips, and reveals its arcana category.',
  origin: { project: 'Original', surface: 'Persona 4 — tarot / arcana cards' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'graphic' },
  inspiredBy: { franchise: 'persona', works: ['persona-4'] },
  tags: ["tarot","flip","reveal"],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Card appears face-up at rest with no rise or flip.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 320, height: 300, background: 'dark', label: 'Arcana card draw' },
}
