import type { Specimen } from '../../../types'

export const classifiedDossierReveal: Specimen = {
  id: 'classified-dossier-reveal',
  ref: 'SPX-TODO',
  title: 'Classified Dossier Reveal',
  blurb: 'A locked case file removes redactions after verification.',
  origin: { project: 'Original', surface: 'Persona 4 investigation / mystery visual language' },
  facets: { kind: 'overlay', tech: 'tiny-js', scope: 'card', intensity: 'graphic' },
  inspiredBy: { franchise: 'persona', works: ['persona-4'] },
  tags: ["mystery","classified","redaction"],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Stamp and bars clear instantly under reduced motion.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 360, height: 280, background: 'dark', scaffold: `<div style="position:relative;overflow:hidden;width:100%;height:280px;border:1px solid #2a2a2a;border-radius:2px;background:#101010;">
  {{specimen}}
</div>`, label: 'Classified dossier reveal' },
}
