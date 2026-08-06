import type { Specimen } from '../../../types'
export const overchargeWarning: Specimen = {
  id: 'overcharge-warning',
  ref: 'SPX-970',
  title: 'Overcharge Warning',
  blurb:
    'COMPUTE RESERVE climbs 72→100, holds as NOMINAL MAXIMUM, then unfolds a 100–125% overflow bay ending at 118% OVERCHARGED without crossing the hard limit.',
  origin: {
    project: 'Original',
    surface: 'Dragon Ball–inspired overcharge / capacity overflow (abstract)',
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
  tags: ['capacity', 'overflow', 'warning'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, INCREASE LOAD immediately shows 118%, expanded overflow region, hatching, and OVERCHARGED.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 440,
    height: 320,
    background: 'dark',

    label: 'Overcharge past safe capacity',
  },

}
