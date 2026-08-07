import type { Specimen } from '../../../types'

export const evidenceChainAdvance: Specimen = {
  id: 'evidence-chain-advance',
  ref: 'SPX-2953',
  title: 'Evidence Chain Advance',
  blurb: 'One confirmed clue activates the next inference node.',
  origin: { project: 'Original', surface: 'Persona 4 investigation / mystery visual language' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'graphic' },
  inspiredBy: { franchise: 'persona', works: ['persona-4'] },
  tags: ["investigation","chain","inference"],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'Active nodes and full links appear instantly at each step under reduced motion.',
  },
  acceptance: [
    'ADVANCE draws scaleX links between nodes with frozen stagger',
    'Visible status reports chain step',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 400, height: 200, background: 'dark', scaffold: `<div style="position:relative;overflow:hidden;width:100%;height:280px;border:1px solid #2a2a2a;border-radius:2px;background:#101010;">
  {{specimen}}
</div>`, label: 'Evidence chain advance' },
}
