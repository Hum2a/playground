import type { Specimen } from '../../../types'
export const personaAwakeningReveal: Specimen = {
  id: 'persona-awakening-reveal',
  ref: 'SPX-493',
  title: 'Persona Awakening Reveal',
  blurb:
    'A dark-blue glass shell traps UNKNOWN until pressure, fracture, and energy breach separate five panels to reveal a still AWAKENED identity with an angular blue frame.',
  origin: {
    project: 'Original',
    surface: 'Persona 3 awakening / spectral blue energy language',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-3'],
  },
  tags: ['unlock', 'reveal', 'clip-path', 'stagger'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Pressure, fracture, breach, separation, and streaks are skipped under prefers-reduced-motion or data-force-reduced-motion; AWAKENED with a static angular frame appears immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 320,
    background: 'dark',

    label: 'Identity awakening',
  },

}
