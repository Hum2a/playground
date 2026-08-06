import type { Specimen } from '../../../types'
export const velvetDoorTransition: Specimen = {
  id: 'velvet-door-transition',
  ref: 'SPX-502',
  title: 'Velvet Door Transition',
  blurb:
    'A pale vertical seam grows from centre, then angular blue panels part to reveal a deep-blue private context that already waits behind the doorway.',
  origin: {
    project: 'Original',
    surface: 'Persona 3 Velvet Room–inspired contextual doorway',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'fullscreen',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-3'],
  },
  tags: ['door', 'context', 'seam'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Seam growth and panel travel are skipped under prefers-reduced-motion or data-force-reduced-motion; the destination (or public) context appears immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 320,
    background: 'dark',

    label: 'Velvet doorway demo',
  },

}
