import type { Specimen } from '../types'

export const falseLeadStrikeout: Specimen = {
  id: 'false-lead-strikeout',
  ref: 'SPX-TODO',
  title: 'False Lead Strikeout',
  blurb: 'An invalid hypothesis is aggressively crossed out and demoted.',
  origin: { project: 'Original', surface: 'Persona 4 investigation / mystery visual language' },
  facets: { kind: 'overlay', tech: 'tiny-js', scope: 'card', intensity: 'graphic' },
  inspiredBy: { franchise: 'persona', works: ['persona-4'] },
  tags: ["investigation","strikeout","false-lead"],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Strike lines and demote label appear instantly under reduced motion.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 360, height: 260, background: 'dark', scaffold: `<div style="position:relative;overflow:hidden;width:100%;height:280px;border:1px solid #2a2a2a;border-radius:2px;background:#101010;">
  {{specimen}}
</div>`, label: 'False lead strikeout' },
}
