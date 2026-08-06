import type { Specimen } from '../types'
export const enhancedStateReversion: Specimen = {
  id: 'enhanced-state-reversion',
  ref: 'SPX-029',
  title: 'Enhanced State Reversion',
  blurb:
    'Stage III engine releases its restrained field, retracts channels in pairs 8→6→4→2, folds to baseline geometry, and settles at BASE — while TASKS DONE stays exactly 42.',
  origin: {
    project: 'Original',
    surface: 'Transformation release / capability rollback (non-failure)',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  tags: ['state-reversion', 'rollback', 'deactivation'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Field, channel pairs, fold, and settle skip under prefers-reduced-motion or data-force-reduced-motion; BASE appears immediately with TASKS DONE 42.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 440,
    background: 'dark',

    label: 'Enhanced state reversion demo',
  },

}
