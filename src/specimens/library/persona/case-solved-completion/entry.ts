import type { Specimen } from '../../../types'

export const caseSolvedCompletion: Specimen = {
  id: 'case-solved-completion',
  ref: 'SPX-TODO',
  title: 'Case Solved Completion',
  blurb: 'Multiple clues collapse into a clean solved-state title card.',
  origin: { project: 'Original', surface: 'Persona 4 investigation / mystery visual language' },
  facets: { kind: 'overlay', tech: 'tiny-js', scope: 'card', intensity: 'maximal' },
  inspiredBy: { franchise: 'persona', works: ['persona-4'] },
  tags: ["success","title-card","investigation"],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Title card appears instantly; clues hidden under reduced motion.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 400, height: 280, background: 'dark', scaffold: `<div style="position:relative;overflow:hidden;width:100%;height:280px;border:1px solid #2a2a2a;border-radius:2px;background:#101010;">
  {{specimen}}
</div>`, label: 'Case solved completion' },
}
