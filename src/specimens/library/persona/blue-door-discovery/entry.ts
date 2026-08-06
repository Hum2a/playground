import type { Specimen } from '../../../types'
export const blueDoorDiscovery: Specimen = {
  id: 'blue-door-discovery',
  ref: 'SPX-621',
  title: 'Blue Door Discovery',
  blurb:
    'An ordinary archive surface hides a doorway: INSPECT brightens a tiny clue, a seam grows, door geometry appears only then, and panels open onto secret content that was already behind — discovery, not a known entrance.',
  origin: {
    project: 'Original',
    surface: 'Persona 3–inspired mysterious blue-door discovery language',
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
  tags: ['discovery', 'reveal', 'hidden-content'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the open discovered composition appears immediately with status announcement — no seam/door travel.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 400,
    height: 320,
    background: 'card',

    label: 'Hidden doorway discovery (demo)',
  },

}
