import type { Specimen } from '../../../types'

export const deductionLockIn: Specimen = {
  id: 'deduction-lock-in',
  ref: 'SPX-TODO',
  title: 'Deduction Lock-In',
  blurb: 'Several observations converge into one conclusion card.',
  origin: { project: 'Original', surface: 'Persona 4 investigation / mystery visual language' },
  facets: { kind: 'overlay', tech: 'tiny-js', scope: 'card', intensity: 'graphic' },
  inspiredBy: { franchise: 'persona', works: ['persona-4'] },
  tags: ["investigation","convergence","deduction"],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Conclusion card appears instantly; observations hidden under reduced motion.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 400, height: 280, background: 'dark', scaffold: `<div style="position:relative;overflow:hidden;width:100%;height:280px;border:1px solid #2a2a2a;border-radius:2px;background:#101010;">
  {{specimen}}
</div>`, label: 'Deduction lock-in' },
}
