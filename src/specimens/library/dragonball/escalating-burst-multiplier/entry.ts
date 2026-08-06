import type { Specimen } from '../../../types'
export const escalatingBurstMultiplier: Specimen = {
  id: 'escalating-burst-multiplier',
  ref: 'SPX-993',
  title: 'Escalating Burst Multiplier',
  blurb:
    'A temporary worker multiplier stacks 1×→20×: throughput climbs to 2,000/s while stability collapses to UNSTABLE and the intensity field fractures.',
  origin: {
    project: 'Original',
    surface: 'Dragon Ball–inspired temporary multiplier / risk capacity language',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'dragonball',
  },
  tags: ['multiplier', 'boost', 'risk', 'capacity'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Slam, sector shift, and staged field growth are skipped under prefers-reduced-motion or data-force-reduced-motion; the final 20× UNSTABLE metrics appear immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 380,
    background: 'dark',

    label: 'Escalating temporary multiplier',
  },

}
