import type { Specimen } from '../types'
export const quirkCooldownRing: Specimen = {
  id: 'quirk-cooldown-ring',
  ref: 'SPX-2000',
  title: 'Quirk Cooldown Ring',
  blurb:
    'A comic stroke ring drains from 100% to empty then pops to READY with accent-coloured completion readout.',
  origin: {
    project: 'Original',
    surface: 'My Hero Academia–inspired ability cooldown / readiness ring language',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'my-hero-academia',
  },
  tags: ['cooldown', 'ring', 'meter'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, READY shows immediately with empty ring.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 320,
    height: 340,
    background: 'dark',

    label: 'Quirk cooldown ring',
  },

}
