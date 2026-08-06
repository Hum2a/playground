import type { Specimen } from '../types'
export const ransomNoteReveal: Specimen = {
  id: 'ransom-note-reveal',
  ref: 'SPX-019',
  title: 'Ransom Note Reveal',
  blurb:
    'Irregular printed paper scraps slam in from different directions and assemble NEW MATERIAL HAS ARRIVED! as a one-shot collage announcement.',
  origin: {
    project: 'Original',
    surface: 'Persona 5 collage / cut-paper announcement language',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-5'],
  },
  tags: ['announcement', 'paper', 'clip-path', 'stagger'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Flying scraps, overshoots, and the final composition nudge are skipped under prefers-reduced-motion or data-force-reduced-motion; the completed collage appears immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 280,
    background: 'card',

    label: 'Quiet announcement surface',
  },

}
