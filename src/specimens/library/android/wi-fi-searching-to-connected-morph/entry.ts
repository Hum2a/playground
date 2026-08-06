import type { Specimen } from '../types'
export const wiFiSearchingToConnectedMorph: Specimen = {
  id: 'wi-fi-searching-to-connected-morph',
  ref: 'SPX-1854',
  title: 'Wi-Fi Searching-to-Connected Morph',
  blurb:
    '300×180 card — arcs illuminate every 180ms, centre dot 540ms cycle; after 900ms resolves to Connected or Fail with Try again.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired connectivity acquisition morph',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['connectivity', 'state', 'finite'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, arcs step through discrete states.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 320,
    height: 240,
    background: 'dark',

    label: 'Wi-Fi searching morph',
  },

}
