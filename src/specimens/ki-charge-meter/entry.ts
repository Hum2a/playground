import type { Specimen } from '../types'
export const kiChargeMeter: Specimen = {
  id: 'ki-charge-meter',
  ref: 'SPX-966',
  title: 'Ki Charge Meter',
  blurb:
    'Twenty-four fixed energy units converge in four accelerating groups, growing a flat circular-diamond operation node into a static READY state.',
  origin: {
    project: 'Original',
    surface: 'Dragon Ball ki-charge–inspired progress aggregation (abstract)',
  },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'inline', intensity: 'graphic' },
  inspiredBy: { franchise: 'dragonball' },
  tags: ['progress', 'aggregation', 'processing'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Reduced motion immediately consumes all 24 units, sets the full 82px node, and announces 100% READY.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 360, height: 370, background: 'dark', label: 'Ki charge meter' },

}
