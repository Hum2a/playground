import type { Specimen } from '../types'
export const energyChargeConfirmation: Specimen = {
  id: 'energy-charge-confirmation',
  ref: 'SPX-522',
  title: 'Energy Charge Confirmation',
  blurb:
    'Hold PURGE CACHE for 900ms while blue energy fills a four-segment frame bottom→left→top→right; early release drains without confirming.',
  origin: {
    project: 'Original',
    surface: 'Persona 3–inspired blue energy hold-confirm',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-3'],
  },
  tags: ['confirmation', 'hold', 'progress'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      '900ms hold remains; frame progress updates in 0/25/50/75/100 steps without travel animation or snap/flash under prefers-reduced-motion or data-force-reduced-motion.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 280,
    background: 'dark',

    label: 'Energy charge confirm',
  },

}
