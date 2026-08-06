import type { Specimen } from '../types'

export const redactionReveal: Specimen = {
  id: 'redaction-reveal',
  ref: 'SPX-TODO',
  title: 'Redaction Reveal',
  blurb: 'Authorised content removes black bars in a deterministic sweep.',
  origin: { project: 'Original', surface: 'Persona 4 investigation / mystery visual language' },
  facets: { kind: 'overlay', tech: 'tiny-js', scope: 'card', intensity: 'graphic' },
  inspiredBy: { franchise: 'persona', works: ['persona-4'] },
  tags: ["investigation","redaction","sweep"],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Bars retract instantly under reduced motion.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 360, height: 220, background: 'dark', scaffold: `<div style="position:relative;overflow:hidden;width:100%;height:280px;border:1px solid #2a2a2a;border-radius:2px;background:#101010;">
  {{specimen}}
</div>`, label: 'Redaction reveal' },
}
