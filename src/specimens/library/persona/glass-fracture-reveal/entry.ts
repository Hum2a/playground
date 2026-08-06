import type { Specimen } from '../../../types'
export const glassFractureReveal: Specimen = {
  id: 'glass-fracture-reveal',
  ref: 'SPX-026',
  title: 'Glass Fracture Reveal',
  blurb:
    'A coherent blue glass pane seals a restricted record until pressure at 63% 42% fractures five major paths, six regions separate, and ACCESS GRANTED sits exposed underneath.',
  origin: {
    project: 'Original',
    surface: 'Specimen Archive',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-3'],
  },
  tags: ['reveal', 'glass', 'disclosure'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Immediately removes the glass pane and exposes the record under prefers-reduced-motion or data-force-reduced-motion; no pressure, cracks, or separation.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 340,
    background: 'dark',

    label: 'Glass fracture disclosure',
  },

}
