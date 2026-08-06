import type { Specimen } from '../types'

export const timelineReconstruction: Specimen = {
  id: 'timeline-reconstruction',
  ref: 'SPX-TODO',
  title: 'Timeline Reconstruction',
  blurb: 'Disconnected event cards slide into chronological order.',
  origin: { project: 'Original', surface: 'Persona 4 investigation / mystery visual language' },
  facets: { kind: 'overlay', tech: 'tiny-js', scope: 'card', intensity: 'graphic' },
  inspiredBy: { franchise: 'persona', works: ['persona-4'] },
  tags: ["investigation","timeline","sort"],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Cards jump to sorted positions under reduced motion.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 420, height: 280, background: 'dark', scaffold: `<div style="position:relative;overflow:hidden;width:100%;height:280px;border:1px solid #2a2a2a;border-radius:2px;background:#101010;">
  {{specimen}}
</div>`, label: 'Timeline reconstruction' },
}
