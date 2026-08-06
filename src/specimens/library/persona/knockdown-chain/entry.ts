import type { Specimen } from '../../../types'

export const knockdownChain: Specimen = {
  id: 'knockdown-chain',
  ref: 'SPX-2998',
  title: 'Knockdown Chain',
  blurb: 'One weakness hit sends a completion pulse through dependent enemy targets.',
  origin: { project: 'Original', surface: 'Persona 4 — battle / weakness' },
  facets: { kind: 'loop', tech: 'css-only', scope: 'card', intensity: 'graphic' },
  inspiredBy: { franchise: 'persona', works: ['persona-4'] },
  tags: ["knockdown","chain","pulse"],
  deps: 'none',
  motion: { loops: true, respectsReducedMotion: true, reducedMotionNote: 'All targets show knocked-down state with no pulse travel.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 380, height: 240, background: 'dark', label: 'Knockdown chain' },
}
