import type { Specimen } from '../../../types'

export const suspectCardReveal: Specimen = {
  id: 'suspect-card-reveal',
  ref: 'SPX-TODO',
  title: 'Suspect Card Reveal',
  blurb: 'A partially redacted identity card opens as confidence rises.',
  origin: {
    project: 'Original',
    surface: 'Persona 4 investigation / mystery visual language',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-4'],
  },
  tags: ['investigation', 'redaction', 'identity'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Redaction bars and confidence meter jump to revealed state under both reduced-motion triggers.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 280,
    background: 'dark',
    scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:280px;border:1px solid #2a2a2a;border-radius:2px;background:#101010;">
  {{specimen}}
</div>
`.trim(),
    label: 'Suspect card reveal',
  },
}
