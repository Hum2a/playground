import type { Specimen } from '../../../types'
export const propagatedShockwave: Specimen = {
  id: 'propagated-shockwave',
  ref: 'SPX-1088',
  title: 'Propagated Shockwave',
  blurb:
    'CONFIG // ROOT impacts, emits three concentric rings, and updates six distance-ordered dependents from STALE to UPDATED.',
  origin: {
    project: 'Original',
    surface: 'Dragon Ball–inspired shockwave / consequence-propagation feedback',
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
  tags: ['propagation', 'dependency', 'impact'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, APPLY CHANGE immediately shows PROPAGATED root and all six UPDATED nodes.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 400,
    height: 440,
    background: 'dark',

    label: 'Propagated shockwave demo',
  },

}
