import type { Specimen } from '../../../types'
export const letterScatterAssemble: Specimen = {
  id: 'letter-scatter-assemble',
  ref: 'SPX-042',
  title: 'Letter Scatter Assemble',
  blurb:
    'Individual letters start scattered around a host and rapidly assemble into NEW MATERIAL / AVAILABLE with overshoot, collision shards, and a finale recoil.',
  origin: {
    project: 'Original',
    surface: 'Persona 5 kinetic typography / unstable layout language',
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
  tags: ['stagger', 'reveal', 'announcement'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Scatter, overshoot, shards, and recoil are skipped under prefers-reduced-motion or data-force-reduced-motion; the final headline appears immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 280,
    background: 'card',

    label: 'Typographic assemble surface',
  },

}
