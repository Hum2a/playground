import type { Specimen } from '../types'

export const confrontationCardSlam: Specimen = {
  id: 'confrontation-card-slam',
  ref: 'SPX-2964',
  title: 'Confrontation Card Slam',
  blurb:
    'A hidden issue interrupts the interface with a high-impact challenge card that slams into frame.',
  origin: { project: 'Specimen Archive', surface: 'Persona 4–inspired motion language' },
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
  tags: ["confrontation","slam","interrupt"],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Card appears in final locked position under reduced motion.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 380,
    height: 320,
    background: 'dark',
    label: 'Confrontation card',
  },
}
