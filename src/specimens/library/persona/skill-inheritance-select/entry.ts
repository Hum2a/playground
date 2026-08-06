import type { Specimen } from '../../../types'

export const skillInheritanceSelect: Specimen = {
  id: 'skill-inheritance-select',
  ref: 'SPX-2989',
  title: 'Skill Inheritance Select',
  blurb: 'Selected skill chips travel from source persona cards into the fusion result.',
  origin: { project: 'Original', surface: 'Persona 4 — persona fusion' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'graphic' },
  inspiredBy: { franchise: 'persona', works: ['persona-4'] },
  tags: ["inheritance","skill","transfer"],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Chips appear in the result slot immediately.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 380, height: 300, background: 'dark', label: 'Skill inheritance select' },
}
