import type { Specimen } from '../../../types'
export const overchargeWarning: Specimen = {
  id: 'overcharge-warning',
  ref: 'SPX-970',
  title: 'Overcharge Warning',
  blurb:
    'COMPUTE RESERVE climbs to 100%, ruptures at the seam with crack lines and energy bleed past the frame, unfolds a 100–125% overflow bay, and ends at 118% with OVERFLOW RUPTURE alert — not just a label.',
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
