import type { Specimen } from '../../../types'
export const butterflyEntry: Specimen = {
  id: 'butterfly-entry',
  ref: 'SPX-504',
  title: 'Butterfly Entry',
  blurb:
    'Six abstract blue butterfly forms drift in from frozen edge points, sweep a partial orbit, converge, and resolve into a NEW RECORD card for Specimen 043.',
  origin: {
    project: 'Original',
    surface: 'Persona 3 Velvet Room–inspired ephemeral arrival',
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
  tags: ['arrival', 'reveal', 'ephemeral'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Butterflies, orbit, and converge are skipped under prefers-reduced-motion or data-force-reduced-motion; the settled record card appears immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 340,
    background: 'dark',

    label: 'Butterfly arrival demo',
  },

}
