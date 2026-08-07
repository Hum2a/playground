import type { Specimen } from '../../../types'

export const multiFusionAssembly: Specimen = {
  id: 'multi-fusion-assembly',
  ref: 'SPX-2996',
  title: 'Multi-Fusion Assembly',
  blurb: 'Three model inputs converge into one high-tier fusion result.',
  origin: { project: 'Original', surface: 'Persona 4 — persona fusion' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'maximal' },
  inspiredBy: { franchise: 'persona', works: ['persona-4'] },
  tags: ['fusion', 'assembly', 'converge'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'OMEGA result appears immediately with inputs hidden.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 380, height: 320, background: 'dark', label: 'Multi-fusion assembly' },
}
