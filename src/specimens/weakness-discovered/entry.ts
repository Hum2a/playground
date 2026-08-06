import type { Specimen } from '../types'

export const weaknessDiscovered: Specimen = {
  id: 'weakness-discovered',
  ref: 'SPX-2997',
  title: 'Weakness Discovered',
  blurb: 'An unknown enemy property is struck and permanently identified as a weakness.',
  origin: { project: 'Original', surface: 'Persona 4 — battle / weakness' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'graphic' },
  inspiredBy: { franchise: 'persona', works: ['persona-4'] },
  tags: ["weakness","strike","reveal"],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'WEAK label appears immediately with no strike flash.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 340, height: 280, background: 'dark', label: 'Weakness discovered' },
}
