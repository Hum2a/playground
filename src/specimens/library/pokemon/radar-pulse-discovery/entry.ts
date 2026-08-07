import type { Specimen } from '../../../types'
export const radarPulseDiscovery: Specimen = {
  id: 'radar-pulse-discovery',
  ref: 'SPX-946',
  title: 'Radar Pulse Discovery',
  blurb:
    'Three staggered concentric pulses expand from a fixed origin through a marker field; hidden targets react only when a leading edge reaches them, and NODE // C locks as the discovered result.',
  origin: {
    project: 'Original',
    surface: 'Pokémon radar-style spatial search / discovery',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'pokemon',
  },
  tags: ['search', 'radar', 'discovery'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Expanding rings and staggered target reactions are skipped; origin, NODE // C, origin→C link, and SIGNAL FOUND appear immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 440,
    height: 420,
    background: 'dark',

    label: 'Radar pulse discovery demo',
  },

}
