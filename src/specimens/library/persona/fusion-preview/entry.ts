import type { Specimen } from '../types'

export const fusionPreview: Specimen = {
  id: 'fusion-preview',
  ref: 'SPX-2988',
  title: 'Fusion Preview',
  blurb: 'Two persona inputs project a deterministic ghost preview of the fusion result.',
  origin: { project: 'Original', surface: 'Persona 4 — persona fusion' },
  facets: { kind: 'loop', tech: 'css-only', scope: 'card', intensity: 'graphic' },
  inspiredBy: { franchise: 'persona', works: ['persona-4'] },
  tags: ["fusion","preview","ghost"],
  deps: 'none',
  motion: { loops: true, respectsReducedMotion: true, reducedMotionNote: 'Ghost preview stays visible at full opacity between inputs.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 380, height: 260, background: 'dark', label: 'Fusion preview' },
}
