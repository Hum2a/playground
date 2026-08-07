import type { Specimen } from '../../../types'

export const knockdownChain: Specimen = {
  id: 'knockdown-chain',
  ref: 'SPX-2998',
  title: 'Knockdown Chain',
  blurb: 'A finite knockdown pulse drops dependent targets in a staggered chain.',
  origin: { project: 'Original', surface: 'Persona 4 — battle / weakness' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'graphic' },
  inspiredBy: { franchise: 'persona', works: ['persona-4'] },
  tags: ['knockdown', 'chain', 'pulse'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'All targets show knocked-down state immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 380, height: 280, background: 'dark', label: 'Knockdown chain' },
}
