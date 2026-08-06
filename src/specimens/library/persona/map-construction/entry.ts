import type { Specimen } from '../types'

export const mapConstruction: Specimen = {
  id: 'map-construction',
  ref: 'SPX-3010',
  title: 'Map Construction',
  blurb:
    'Explored dungeon corridors draw themselves stroke-by-stroke as movement progresses through a fogged grid.',
  origin: { project: 'Specimen Archive', surface: 'Persona 4–inspired motion language' },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-4'],
  },
  tags: ["dungeon","map","explore","draw"],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Corridors appear instantly at final explored state under reduced motion.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 320,
    background: 'dark',
    label: 'Dungeon map',
  },
}
