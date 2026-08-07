import type { Specimen } from '../../../types'

export const fusionPreview: Specimen = {
  id: 'fusion-preview',
  ref: 'SPX-2988',
  title: 'Fusion Preview',
  blurb: 'Two selected model inputs project a finite ghost preview of the fusion result.',
  origin: { project: 'Original', surface: 'Persona 4 — persona fusion' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'graphic' },
  inspiredBy: { franchise: 'persona', works: ['persona-4'] },
  tags: ['fusion', 'preview', 'ghost'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'SIGMA preview appears immediately when preview is run.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 380, height: 300, background: 'dark', label: 'Fusion preview' },
}
