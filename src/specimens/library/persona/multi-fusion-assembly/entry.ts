import type { Specimen } from '../types'

export const multiFusionAssembly: Specimen = {
  id: 'multi-fusion-assembly',
  ref: 'SPX-2996',
  title: 'Multi-Fusion Assembly',
  blurb: 'Three persona inputs converge into one high-tier fusion result.',
  origin: { project: 'Original', surface: 'Persona 4 — persona fusion' },
  facets: { kind: 'loop', tech: 'css-only', scope: 'card', intensity: 'maximal' },
  inspiredBy: { franchise: 'persona', works: ['persona-4'] },
  tags: ["fusion","assembly","converge"],
  deps: 'none',
  motion: { loops: true, respectsReducedMotion: true, reducedMotionNote: 'All three inputs rest merged at centre with result visible.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 380, height: 280, background: 'dark', label: 'Multi-fusion assembly' },
}
